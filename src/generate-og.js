import sharp from "sharp";
import fs from "fs";
import path from "path";

// OG-зображення для карток у соцмережах (Telegram, Facebook, Viber, LinkedIn).
//
// Чому окремо від optimize.js:
//  1. Розмір 1200×630 (канон OG) — не квадрат і не банерна ширина.
//  2. Формат JPEG, а не WebP: Telegram і частина месенджерів досі не
//     показують WebP-превʼю.
//  3. Результат кладеться в public/ зі СТАБІЛЬНИМИ іменами — Vite не додає
//     до них хеш, тому prerender може вписати шлях у HTML наперед.
//
//   node src/generate-og.js

const SRC = "src/assets/images/optimized";
const OUT = "public/og";

// Товари — фото банки на брендовому фоні; банери вже широкі, їх просто кадруємо.
const jobs = [
  { in: `${SRC}/banners/home-hero-desktop-1536.webp`, out: "home.jpg", mode: "cover" },
  { in: `${SRC}/banners/atmospheric-1536.webp`, out: "catalog.jpg", mode: "cover" },
  ...[
    "red_caviar_forel", "red_caviar_gorbusha", "red_caviar_keta",
    "red_caviar_chavicha", "red_caviar_kizhuch", "red_caviar_nerka",
    "black_caviar_beluga", "black_caviar_osetr", "white_caviar_shchuka",
  ].map((name) => ({
    in: `${SRC}/products/${name}-1024.webp`,
    out: `${name}.jpg`,
    mode: "contain",
  })),
];

const WIDTH = 1200;
const HEIGHT = 630;
const BRAND_BEIGE = { r: 254, g: 250, b: 243 };

// Заглушка для сторінок без власного зображення (кошик, оферта, політика, 404).
// Без неї їхні картки в месенджерах — голий текст, і поруч із картками товарів
// це виглядає як недоробка. Фото ікри тут не підходить: на політиці
// конфіденційності воно недоречне, тому — логотип на фоні бренду.
async function buildFallback() {
  const LOGO = "src/assets/images/logo.png";
  if (!fs.existsSync(LOGO)) {
    console.warn("  пропущено default.jpg (немає логотипа)");
    return 0;
  }

  const logo = await sharp(LOGO)
    .resize({ width: Math.round(WIDTH * 0.5) }) // половина ширини — лишаємо повітря навколо
    .toBuffer();

  await sharp({
    create: {
      width: WIDTH,
      height: HEIGHT,
      channels: 3,
      background: BRAND_BEIGE,
    },
  })
    .composite([{ input: logo, gravity: "centre" }])
    .jpeg({ quality: 88, progressive: true })
    .toFile(path.join(OUT, "default.jpg"));

  return 1;
}

async function run() {
  fs.mkdirSync(OUT, { recursive: true });

  let done = 0;
  for (const job of jobs) {
    if (!fs.existsSync(job.in)) {
      console.warn(`  пропущено (немає файлу): ${job.in}`);
      continue;
    }

    const pipeline = sharp(job.in).resize(WIDTH, HEIGHT, {
      fit: job.mode,
      position: "centre",
      // contain лишає поля — заповнюємо їх кольором фону сайту, щоб картка
      // виглядала частиною бренду, а не фото на випадковому тлі.
      background: BRAND_BEIGE,
    });

    await pipeline
      .flatten({ background: BRAND_BEIGE }) // JPEG не має альфи
      .jpeg({ quality: 82, progressive: true })
      .toFile(path.join(OUT, job.out));

    done++;
  }

  done += await buildFallback();

  console.log(`OG-зображення: ${done}/${jobs.length + 1} → ${OUT}/ (${WIDTH}×${HEIGHT})`);
}

run().catch((err) => {
  console.error("Помилка генерації OG:", err.message);
  process.exit(1);
});
