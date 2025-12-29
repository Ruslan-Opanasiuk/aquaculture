import redImg from "../assets/images/red.webp";
import blackImg from "../assets/images/black.webp";
import whiteImg from "../assets/images/white.webp";
import welcomeImg from "../assets/images/welcome.webp";


const priceText = "від 1234.00 грн\nгурт - за запитом";


export const productVariants = {
  chavicha: { title: "Чавича", imageSrc: redImg, priceText },
  kizhuch: { title: "Кіжуч", imageSrc: redImg, priceText },
  nerka: { title: "Нерка", imageSrc: redImg, priceText },
  gorbusha: { title: "Горбуша", imageSrc: redImg, priceText },
  keta: { title: "Кета", imageSrc: redImg, priceText },
  forel: { title: "Форель", imageSrc: redImg, priceText },
  beluga: { title: "Белуга", imageSrc: blackImg, priceText },
  osetr: { title: "Осетр", imageSrc: blackImg, priceText },
  shchuka: { title: "Щука", imageSrc: whiteImg, priceText },
  set1: { title: "Набір 1", imageSrc: welcomeImg, priceText },
  set2: { title: "Набір 2", imageSrc: welcomeImg, priceText },
  set3: { title: "Набір 3", imageSrc: welcomeImg, priceText },
};

export const productVariantsList = Object.entries(productVariants).map(([key, v]) => ({
  key,
  ...v,
}));

export const catalogSections = [
  {
    title: "Червона ікра",
    subtitle:
      "Добірна ікра з насиченим смаком та делікатною текстурою, відібрана з різних регіонів для найвищої якості.",
    count: 6,
  },
  {
    title: "Біла ікра",
    subtitle:
      "Рідкісна біла ікра з м’яким, чистим смаком та ніжною зернистістю, ідеальна для поціновувачів делікатесів.",
    count: 1,
  },
  {
    title: "Чорна ікра",
    subtitle:
      "Ексклюзивна чорна ікра з глибоким смаком та оксамитовою консистенцією, представлена у лімітованих преміальних партіях.\n\n",
    count: 2,
  },
  {
    title: "Welcome pack",
    subtitle:
      "Набір найпопулярніших смаків для знайомства з нашою колекцією, підібраний спеціально для першого замовлення.",
    count: 3,
  },
];
