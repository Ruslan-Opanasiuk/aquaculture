import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputDir = "src/assets/images/raw";
const outputDir = "src/assets/images/optimized";

const sizes = [
  { size: 512, suffix: "1x" },
  { size: 1024, suffix: "2x" }
];

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdirSync(inputDir).forEach(async (file) => {
  if (!/\.(jpe?g|png|webp|avif)$/i.test(file)) return;

  const inputPath = path.join(inputDir, file);
  const name = path.parse(file).name;

  for (const { size, suffix } of sizes) {
    try {
      await sharp(inputPath)
        .ensureAlpha()
        .resize(size, size, {
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 },
          // kernel: sharp.kernel.lanczos3 // Найкращий алгоритм для деталей
        })
        // Підвищуємо чіткість (параметри підібрані під гравюру)
        .sharpen({
            sigma: 0.5,
            m1: 2,
            m2: 20
        }) 
        .webp({ 
          lossless: true, // Вмикаємо режим "БЕЗ ВТРАТ"
          effort: 6       // Максимальне стиснення файлу при 100% якості
        })
        .toFile(`${outputDir}/${name}-${suffix}.webp`);

      console.log(`✅ ${name} @${suffix} optimized (LOSSLESS)`);
    } catch (err) {
      console.error(`❌ Error with ${file}:`, err);
    }
  }
});