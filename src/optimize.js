import sharp from "sharp";
import fs from "fs";
import path from "path";

// Єдиний пайплайн оптимізації зображень для всього сайту.
// Кожна категорія має свою raw/ → optimized/ підпапку та свій набір правил
// (кадрування, lossless/lossy, розміри), але суфікс завжди означає реальний
// піксельний розмір готового файлу — жодних довільних "1x"/"2x" ярликів.
//
// Нові оригінали кидай у відповідну raw/<категорія>/, тоді:
//   node src/optimize.js

const ROOT = "src/assets/images";

// --- Категорії з фіксованим квадратним розміром (contain у квадрат,
// прозоре тло). "products" — реальні фото (багато дрібних деталей: бліки,
// напівпрозорість ікри) → lossless тут роздуває вагу в рази без приросту
// видимої якості, тому lossy у високій якості зі збереженою альфа-прозорістю.
// "grid" — графічні ілюстрації (лінії, штрихування) → lossless виправдана,
// вага невелика навіть без втрат. ---
const squareJobs = [
  {
    name: "products",
    inputDir: `${ROOT}/raw/products`,
    outputDir: `${ROOT}/optimized/products`,
    sizes: [512, 1024],
    lossless: false,
    quality: 90,
    sharpen: false,
  },
  {
    name: "grid",
    inputDir: `${ROOT}/raw/grid`,
    outputDir: `${ROOT}/optimized/grid`,
    sizes: [256, 512],
    lossless: true,
    sharpen: true,
    // Джерела — непрозорі PNG (білий фон запечений у пікселі, без alpha).
    // Сайт покладався на CSS mix-blend-multiply, щоб імітувати прозорість —
    // ламається (а) якщо колір фону не 1-в-1 співпадає з фоном сторінки,
    // (б) на hover, бо transform + mix-blend-mode — відома пастка браузерів
    // (transform піднімає елемент в окремий compositing-шар, blend перестає
    // бачити фон під ним). Тому ріжемо білий у справжню альфу тут.
    whiteToAlpha: true,
  },
  {
    name: "packaging",
    inputDir: `${ROOT}/raw/packaging`,
    outputDir: `${ROOT}/optimized/packaging`,
    sizes: [256, 512],
    lossless: true,
    sharpen: true,
    // Плоскі чорні силуети на білому тлі (той самий mix-blend-multiply
    // патерн, що й grid) — та сама причина різати білий у альфу.
    whiteToAlpha: true,
  },
];

// --- Банери: повнокадрові фото на весь екран (h-vh-stable, object-cover) —
// ширина рендеру залежить від viewport, а не густини пікселів. Density-свіч
// (1x/2x) тут була помилкою: на звичайному (не-ретіна) широкому моніторі
// браузер свідомо бере менший "1x"-варіант і розтягує на весь екран — звідси
// мутність. Джерела й так лише ~1536px завширшки (стеля без нових фото-
// оригіналів), тому віддаємо ОДИН максимальний розмір без штучного
// зменшення — це найкраща доступна якість на будь-якому екрані. ---
const bannerJob = {
  name: "banners",
  inputDir: `${ROOT}/raw/banners`,
  outputDir: `${ROOT}/optimized/banners`,
  quality: 90,
};

// --- Партнерські лого: плоска графіка з прозорістю, resize по висоті
// (пропорції в кожного логотипа різні — квадратний contain тут не підходить),
// lossless. 48px = 1x під h-12 (48px) в розмітці, 96px = retina. ---
const partnersJob = {
  name: "partners",
  inputDir: `${ROOT}/raw/partners`,
  outputDir: `${ROOT}/optimized/partners`,
  heights: [48, 96],
};

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function isImage(file) {
  return /\.(jpe?g|png|webp|avif)$/i.test(file);
}

// Ріже білий/близький-до-білого фон у справжню альфа-прозорість:
// alpha = 255 - min(R,G,B) — чим світліший піксель, тим прозоріший.
// Колір пікселів не чіпаємо (лишає нюанси тону лінійної графіки).
//
// Джерела рідко бувають ідеально (255,255,255) — фон типу (253,248,241) без
// порогу лишає ~5% залишкової непрозорості. На каліброваному екрані (Mac/
// iPhone) це непомітно, на VA-матриці з іншою гамою — видно ледь інший
// відтінок прямокутника. WHITE_CUTOFF примусово зануляє все, що й так уже
// "майже фон", замість плавно тягнути залишковий відсоток до нуля.
const WHITE_CUTOFF = 20; // alpha нижче цього — примусово 0

async function whiteToAlphaBuffer(inputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += info.channels) {
    const whiteness = Math.min(data[i], data[i + 1], data[i + 2]);
    let alpha = Math.round((255 - whiteness) * (data[i + 3] / 255));
    if (alpha < WHITE_CUTOFF) alpha = 0;
    data[i + 3] = alpha;
  }

  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: info.channels },
  });
}

async function runSquareJob({ name, inputDir, outputDir, sizes, lossless, quality, sharpen, whiteToAlpha }) {
  ensureDir(outputDir);
  const files = fs.readdirSync(inputDir).filter(isImage);

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const base = path.parse(file).name;

    for (const size of sizes) {
      try {
        let pipeline = whiteToAlpha
          ? await whiteToAlphaBuffer(inputPath)
          : sharp(inputPath).ensureAlpha();

        pipeline = pipeline.resize(size, size, {
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        });

        if (sharpen) {
          // Підвищуємо чіткість (параметри підібрані під графічні ілюстрації)
          pipeline = pipeline.sharpen({ sigma: 0.5, m1: 2, m2: 20 });
        }

        await pipeline
          .webp(lossless ? { lossless: true, effort: 6 } : { quality, alphaQuality: 100, effort: 6 })
          .toFile(`${outputDir}/${base}-${size}.webp`);

        console.log(`✅ [${name}] ${base} @${size}px (${lossless ? "lossless" : `lossy q${quality}`})`);
      } catch (err) {
        console.error(`❌ [${name}] ${file}:`, err.message);
      }
    }
  }
}

async function runBannerJob({ name, inputDir, outputDir, quality }) {
  ensureDir(outputDir);
  const files = fs.readdirSync(inputDir).filter(isImage);

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const base = path.parse(file).name;

    try {
      const meta = await sharp(inputPath).metadata();
      const width = meta.width;

      await sharp(inputPath)
        .webp({ quality, effort: 6 })
        .toFile(`${outputDir}/${base}-${width}.webp`);

      console.log(`✅ [${name}] ${base} @${width}px (lossy q${quality}, оригінальна роздільність)`);
    } catch (err) {
      console.error(`❌ [${name}] ${file}:`, err.message);
    }
  }
}

async function runPartnersJob({ name, inputDir, outputDir, heights }) {
  ensureDir(outputDir);
  const files = fs.readdirSync(inputDir).filter(isImage);

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const base = path.parse(file).name;

    for (const height of heights) {
      try {
        await sharp(inputPath)
          .ensureAlpha()
          .resize({ height, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .webp({ lossless: true, effort: 6 })
          .toFile(`${outputDir}/${base}-${height}.webp`);

        console.log(`✅ [${name}] ${base} @${height}px (lossless)`);
      } catch (err) {
        console.error(`❌ [${name}] ${file}:`, err.message);
      }
    }
  }
}

async function main() {
  for (const job of squareJobs) await runSquareJob(job);
  await runBannerJob(bannerJob);
  await runPartnersJob(partnersJob);
}

main();
