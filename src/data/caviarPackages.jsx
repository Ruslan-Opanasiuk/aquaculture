import g100 from "../assets/images/packaging/100.png";
import g100_tin from "../assets/images/packaging/100-tin.png";
import g100_tin_box from "../assets/images/packaging/100-tin-box.png";
import g200 from "../assets/images/packaging/200.png";
import g250 from "../assets/images/packaging/250.png";
import g310_jar from "../assets/images/packaging/310-jar.png";
import g500 from "../assets/images/packaging/500.png";
import g500_jar from "../assets/images/packaging/500-jar.png";

import troutJar from "../assets/images/product1.png";
import troutLid from "../assets/images/product2.png";

export const caviarCatalog = {
  forel: {
    id: "forel",
    title: "Форель",
    subtitle: "Аквакультура",
    shortDescription: "Ніжна, яскрава, збалансована.",
    longDescription: [],
    specs: "",
    images: { jar: troutJar, lid: troutLid },
    packages: [
      { id: "forel-100-tin", grams: 100, price: 525, image: g100_tin },
      { id: "forel-100-tin-box", grams: 100, price: 535, image: g100_tin_box },
      { id: "forel-100", grams: 100, price: 525, image: g100 },
      { id: "forel-200", grams: 200, price: 1025, image: g200 },
      { id: "forel-250", grams: 250, price: 1325, image: g250 },
      { id: "forel-500", grams: 500, price: 2570, image: g500 }
    ]
  },

  gorbusha: {
    id: "gorbusha",
    title: "Горбуша",
    subtitle: "Аквакультура",
    shortDescription: "Класичний м’який морський смак.",
    longDescription: [],
    specs: "",
    images: { jar: troutJar, lid: troutLid },
    packages: [
      { id: "gorbusha-100-tin", grams: 100, price: 525, image: g100_tin },
      { id: "gorbusha-100-tin-box", grams: 100, price: 535, image: g100_tin_box },
      { id: "gorbusha-100", grams: 100, price: 525, image: g100 },
      { id: "gorbusha-200", grams: 200, price: 1025, image: g200 },
      { id: "gorbusha-250", grams: 250, price: 1325, image: g250 },
      { id: "gorbusha-310-jar", grams: 310, price: 1690, image: g310_jar },
      { id: "gorbusha-500", grams: 500, price: 2570, image: g500 },
      { id: "gorbusha-500-jar", grams: 500, price: 2740, image: g500_jar }
    ]
  },

  keta: {
    id: "keta",
    title: "Кета",
    subtitle: "Аквакультура",
    shortDescription: "Великі зерна, вершковий присмак.",
    longDescription: [],
    specs: "",
    images: { jar: troutJar, lid: troutLid },
    packages: [
      { id: "keta-100-tin", grams: 100, price: 525, image: g100_tin },
      { id: "keta-100-tin-box", grams: 100, price: 535, image: g100_tin_box },
      { id: "keta-100", grams: 100, price: 525, image: g100 },
      { id: "keta-200", grams: 200, price: 1025, image: g200 },
      { id: "keta-250", grams: 250, price: 1325, image: g250 },
      { id: "keta-310-jar", grams: 310, price: 1690, image: g310_jar },
      { id: "keta-500", grams: 500, price: 2570, image: g500 },
      { id: "keta-500-jar", grams: 500, price: 2740, image: g500_jar }
    ]
  },

  chavicha: {
    id: "chavicha",
    title: "Чавича",
    subtitle: "Аквакультура",
    shortDescription: "Насичений королівський смак.",
    longDescription: [],
    specs: "",
    images: { jar: troutJar, lid: troutLid },
    packages: [
      { id: "chavicha-100", grams: 100, price: 525, image: g100 },
      { id: "chavicha-200", grams: 200, price: 1025, image: g200 },
      { id: "chavicha-250", grams: 250, price: 1325, image: g250 },
      { id: "chavicha-500", grams: 500, price: 2570, image: g500 }
    ]
  },

  kizhuch: {
    id: "kizhuch",
    title: "Кіжуч",
    subtitle: "Аквакультура",
    shortDescription: "Щільна текстура, легка гірчинка.",
    longDescription: [],
    specs: "",
    images: { jar: troutJar, lid: troutLid },
    packages: [
      { id: "kizhuch-100", grams: 100, price: 525, image: g100 },
      { id: "kizhuch-200", grams: 200, price: 1025, image: g200 },
      { id: "kizhuch-250", grams: 250, price: 1325, image: g250 },
      { id: "kizhuch-500", grams: 500, price: 2570, image: g500 }
    ]
  },

  nerka: {
    id: "nerka",
    title: "Нерка",
    subtitle: "Аквакультура",
    shortDescription: "Дрібне зерно, інтенсивний смак.",
    longDescription: [],
    specs: "",
    images: { jar: troutJar, lid: troutLid },
    packages: [
      { id: "nerka-100", grams: 100, price: 525, image: g100 },
      { id: "nerka-200", grams: 200, price: 1025, image: g200 },
      { id: "nerka-250", grams: 250, price: 1325, image: g250 },
      { id: "nerka-500", grams: 500, price: 2570, image: g500 }
    ]
  },

  beluga: {
    id: "beluga",
    title: "Белуга",
    subtitle: "Аквакультура",
    shortDescription: "Делікатний смак, великі зерна.",
    longDescription: [],
    specs: "",
    images: { jar: troutJar, lid: troutLid },
    packages: [
      { id: "beluga-50", grams: 50, price: 1600, image: g100 },
      { id: "beluga-100", grams: 100, price: 3125, image: g200 },
      { id: "beluga-250", grams: 250, price: 7795, image: g250 }
    ]
  },

  osetr: {
    id: "osetr",
    title: "Осетр",
    subtitle: "Аквакультура",
    shortDescription: "Класичний чорний делікатес.",
    longDescription: [],
    specs: "",
    images: { jar: troutJar, lid: troutLid },
    packages: [
      { id: "osetr-50", grams: 50, price: 1530, image: g100 },
      { id: "osetr-100", grams: 100, price: 2980, image: g200 },
      { id: "osetr-250", grams: 250, price: 7425, image: g250 }
    ]
  },

  shchuka: {
    id: "shchuka",
    title: "Щука",
    subtitle: "Аквакультура",
    shortDescription: "Світле зерно, м’який смак.",
    longDescription: [],
    specs: "",
    images: { jar: troutJar, lid: troutLid },
    packages: [
      { id: "shchuka-100", grams: 100, price: 475, image: g100 },
      { id: "shchuka-230", grams: 230, price: 1115, image: g200 }
    ]
  },

  set1: {
    id: "set1",
    title: "Набір 1",
    subtitle: "Аквакультура",
    shortDescription: "Три смаки для знайомства.",
    longDescription: [],
    specs: "",
    images: { jar: troutJar, lid: troutLid },
    packages: []
  },

  set2: {
    id: "set2",
    title: "Набір 2",
    subtitle: "Аквакультура",
    shortDescription: "Добірка для гурманів.",
    longDescription: [],
    specs: "",
    images: { jar: troutJar, lid: troutLid },
    packages: []
  },

  set3: {
    id: "set3",
    title: "Набір 3",
    subtitle: "Аквакультура",
    shortDescription: "Максимальний преміум набір.",
    longDescription: [],
    specs: "",
    images: { jar: troutJar, lid: troutLid },
    packages: []
  }
};
