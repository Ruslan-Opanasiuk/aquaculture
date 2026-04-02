import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputDir = "src/assets/images/raw";
const outputDir = "src/assets/images/optimized";

const sizes = [512, 1024];

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdirSync(inputDir).forEach(file => {
  const inputPath = path.join(inputDir, file);
  const name = path.parse(file).name;

  sizes.forEach(size => {
    sharp(inputPath)
      .resize(size)
      .webp({ quality: 80 })
      .toFile(`${outputDir}/${name}-${size}.webp`)
      .then(() => {
        console.log(`✅ ${name}-${size}.webp created`);
      })
      .catch(err => console.error(err));
  });
});