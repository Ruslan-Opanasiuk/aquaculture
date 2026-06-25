// src/data/catalogData.jsx — структура каталогу (які товари в якій секції).
// Назви, фото та ціни НЕ дублюються тут: CatalogSection бере їх з caviarPackages.

export const catalogSections = [
  {
    id: "red-caviar",
    title: "Червона ікра",
    subtitle:
      "Добірна ікра з насиченим смаком та делікатною текстурою, відібрана з різних регіонів для найвищої якості.",
    products: ["chavicha", "kizhuch", "nerka", "gorbusha", "keta", "forel"],
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
