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
  },
];

// --- Банери: повнокадрові фото, без прозорості. Пропорційний resize по
// ширині (без contain/паддінгу), lossy — для фото це в рази менша вага при
// візуально нерозрізнимій якості. "2x" = реальний розмір оригіналу,
// "1x" = половина. ---
const bannerJob = {
  name: "banners",
  inputDir: `${ROOT}/raw/banners`,
  outputDir: `${ROOT}/optimized/banners`,
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

async function runSquareJob({ name, inputDir, outputDir, sizes, lossless, quality, sharpen }) {
  ensureDir(outputDir);
  const files = fs.readdirSync(inputDir).filter(isImage);

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const base = path.parse(file).name;

    for (const size of sizes) {
      try {
        let pipeline = sharp(inputPath)
          .ensureAlpha()
          .resize(size, size, {
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

async function runBannerJob({ name, inputDir, outputDir }) {
  ensureDir(outputDir);
  const files = fs.readdirSync(inputDir).filter(isImage);

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const base = path.parse(file).name;

    try {
      const meta = await sharp(inputPath).metadata();
      const fullWidth = meta.width;
      const halfWidth = Math.round(fullWidth / 2);

      for (const width of [fullWidth, halfWidth]) {
        await sharp(inputPath)
          .resize({ width })
          .webp({ quality: 84, effort: 6 })
          .toFile(`${outputDir}/${base}-${width}.webp`);

        console.log(`✅ [${name}] ${base} @${width}px (lossy q84)`);
      }
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
