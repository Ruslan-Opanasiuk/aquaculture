// src/data/productData.js (умовний шлях)

// --- Заглушки (placeholders) для секцій, які ще не мають нових фото ---
import welcomePlaceholderImg from "../assets/images/welcome.webp";

// =========================================================================
// --- Оптимізовані фото ЧЕРВОНОЇ ікри (Retina Ready) ---
// =========================================================================
// Чавича
import redCaviarChavicha1x from "../assets/images/optimized/red_caviar_chavicha-512.webp";
import redCaviarChavicha2x from "../assets/images/optimized/red_caviar_chavicha-1024.webp";
// Форель
import redCaviarForel1x from "../assets/images/optimized/red_caviar_forel-512.webp";
import redCaviarForel2x from "../assets/images/optimized/red_caviar_forel-1024.webp";
// Горбуша
import redCaviarGorbusha1x from "../assets/images/optimized/red_caviar_gorbusha-512.webp";
import redCaviarGorbusha2x from "../assets/images/optimized/red_caviar_gorbusha-1024.webp";
// Кета
import redCaviarKeta1x from "../assets/images/optimized/red_caviar_keta-512.webp";
import redCaviarKeta2x from "../assets/images/optimized/red_caviar_keta-1024.webp";
// Кіжуч
import redCaviarKizhuch1x from "../assets/images/optimized/red_caviar_kizhuch-512.webp";
import redCaviarKizhuch2x from "../assets/images/optimized/red_caviar_kizhuch-1024.webp";
// Нерка
import redCaviarNerka1x from "../assets/images/optimized/red_caviar_nerka-512.webp";
import redCaviarNerka2x from "../assets/images/optimized/red_caviar_nerka-1024.webp";

// =========================================================================
// --- Оптимізовані фото ЧОРНОЇ ікри (Retina Ready) ---
// =========================================================================
// Белуга
import blackCaviarBeluga1x from "../assets/images/optimized/black_caviar_beluga-512.webp";
import blackCaviarBeluga2x from "../assets/images/optimized/black_caviar_beluga-1024.webp";
// Осетр
import blackCaviarOsetr1x from "../assets/images/optimized/black_caviar_osetr-512.webp";
import blackCaviarOsetr2x from "../assets/images/optimized/black_caviar_osetr-1024.webp";

// =========================================================================
// --- Оптимізовані фото БІЛОЇ ікри (Retina Ready) ---
// =========================================================================
// Щука
import whiteCaviarShchuka1x from "../assets/images/optimized/white_caviar_shchuka-512.webp";
import whiteCaviarShchuka2x from "../assets/images/optimized/white_caviar_shchuka-1024.webp";


const priceText = "від 1234.00 грн\nгурт - за запитом";

export const productVariants = {
  // =========================================================================
  // --- ЧЕРВОНА ІКРА ---
  // =========================================================================
  chavicha: {
    title: "Чавича",
    images: {
      src1x: redCaviarChavicha1x,
      src2x: redCaviarChavicha2x,
    },
    priceText,
  },
  kizhuch: {
    title: "Кіжуч",
    images: {
      src1x: redCaviarKizhuch1x,
      src2x: redCaviarKizhuch2x,
    },
    priceText,
  },
  nerka: {
    title: "Нерка",
    images: {
      src1x: redCaviarNerka1x,
      src2x: redCaviarNerka2x,
    },
    priceText,
  },
  gorbusha: {
    title: "Горбуша",
    images: {
      src1x: redCaviarGorbusha1x,
      src2x: redCaviarGorbusha2x,
    },
    priceText,
  },
  keta: {
    title: "Кета",
    images: {
      src1x: redCaviarKeta1x,
      src2x: redCaviarKeta2x,
    },
    priceText,
  },
  forel: {
    title: "Форель",
    images: {
      src1x: redCaviarForel1x,
      src2x: redCaviarForel2x,
    },
    priceText,
  },

  // =========================================================================
  // --- ЧОРНА ІКРА (ОНОВЛЕНО) ---
  // =========================================================================
  beluga: {
    title: "Белуга",
    images: {
      src1x: blackCaviarBeluga1x,
      src2x: blackCaviarBeluga2x,
    },
    priceText,
  },
  osetr: {
    title: "Осетр",
    images: {
      src1x: blackCaviarOsetr1x,
      src2x: blackCaviarOsetr2x,
    },
    priceText,
  },

  // =========================================================================
  // --- БІЛА ІКРА (ОНОВЛЕНО) ---
  // =========================================================================
  shchuka: {
    title: "Щука",
    images: {
      src1x: whiteCaviarShchuka1x,
      src2x: whiteCaviarShchuka2x,
    },
    priceText,
  },

  // =========================================================================
  // --- Welcome Pack (ПОКИ ЩО ЗАГЛУШКИ) ---
  // =========================================================================
  set1: {
    title: "Набір 1",
    images: {
      src1x: welcomePlaceholderImg,
      src2x: welcomePlaceholderImg, 
    },
    priceText,
  },
  set2: {
    title: "Набір 2",
    images: {
      src1x: welcomePlaceholderImg,
      src2x: welcomePlaceholderImg, 
    },
    priceText,
  },
  set3: {
    title: "Набір 3",
    images: {
      src1x: welcomePlaceholderImg,
      src2x: welcomePlaceholderImg, 
    },
    priceText,
  },
};

export const catalogSections = [
  {
    id: "red-caviar",
    title: "Червона ікра",
    subtitle:
      "Добірна ікра з насиченим смаком та делікатною текстурою, відібрана з різних регіонів для найвищої якості.",
    products: [
      "chavicha",
      "kizhuch",
      "nerka",
      "gorbusha",
      "keta",
      "forel",
    ],
  },
  {
    id: "black-caviar",
    title: "Чорна ікра",
    subtitle:
      "Ексклюзивна чорна ікра з глибоким смаком та оксамитовою консистенцією, представлена у лімітованих преміальних партіях.",
    products: ["beluga", "osetr"],
  },
  {
    id: "white-caviar",
    title: "Біла ікра",
    subtitle:
      "Рідкісна біла ікра з м’яким, чистим смаком та ніжною зернистістю, ідеальна для поціновувачів делікатесів.",
    products: ["shchuka"],
  },
  // {
  //   id: "welcome_pack",
  //   title: "Welcome pack",
  //   subtitle:
  //     "Набір найпопулярніших смаків для знайомства з нашою колекцією, підібраний спеціально для першого замовлення.",
  //   products: ["set1", "set2", "set3"],
  // },
];