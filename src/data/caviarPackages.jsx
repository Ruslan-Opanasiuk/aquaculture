// --- Імпорти упаковок (WebP, retina 1x/2x) ---
import g100_1x from "../assets/images/optimized/packaging/100-256.webp";
import g100_2x from "../assets/images/optimized/packaging/100-512.webp";
import g100_tin_1x from "../assets/images/optimized/packaging/100-tin-256.webp";
import g100_tin_2x from "../assets/images/optimized/packaging/100-tin-512.webp";
import g100_tin_box_1x from "../assets/images/optimized/packaging/100-tin-box-256.webp";
import g100_tin_box_2x from "../assets/images/optimized/packaging/100-tin-box-512.webp";
import g200_1x from "../assets/images/optimized/packaging/200-256.webp";
import g200_2x from "../assets/images/optimized/packaging/200-512.webp";
import g250_1x from "../assets/images/optimized/packaging/250-256.webp";
import g250_2x from "../assets/images/optimized/packaging/250-512.webp";
import g310_jar_1x from "../assets/images/optimized/packaging/310-jar-256.webp";
import g310_jar_2x from "../assets/images/optimized/packaging/310-jar-512.webp";
import g500_1x from "../assets/images/optimized/packaging/500-256.webp";
import g500_2x from "../assets/images/optimized/packaging/500-512.webp";
import g500_jar_1x from "../assets/images/optimized/packaging/500-jar-256.webp";
import g500_jar_2x from "../assets/images/optimized/packaging/500-jar-512.webp";

const g100 = { src1x: g100_1x, src2x: g100_2x };
const g100_tin = { src1x: g100_tin_1x, src2x: g100_tin_2x };
const g100_tin_box = { src1x: g100_tin_box_1x, src2x: g100_tin_box_2x };
const g200 = { src1x: g200_1x, src2x: g200_2x };
const g250 = { src1x: g250_1x, src2x: g250_2x };
const g310_jar = { src1x: g310_jar_1x, src2x: g310_jar_2x };
const g500 = { src1x: g500_1x, src2x: g500_2x };
const g500_jar = { src1x: g500_jar_1x, src2x: g500_jar_2x };

// ============================================================================
// --- ОПТИМІЗОВАНІ ФОТО ІКРИ ТА КРИШКИ (RETINA READY) ---
// ============================================================================

// Універсальна кришка (тепер використовується для всіх товарів)
import Lid1x from "../assets/images/optimized/products/trout_lid-512.webp";
import Lid2x from "../assets/images/optimized/products/trout_lid-1024.webp";

// --- ЧЕРВОНА ІКРА ---
import redCaviarChavicha1x from "../assets/images/optimized/products/red_caviar_chavicha-512.webp";
import redCaviarChavicha2x from "../assets/images/optimized/products/red_caviar_chavicha-1024.webp";

import redCaviarForel1x from "../assets/images/optimized/products/red_caviar_forel-512.webp";
import redCaviarForel2x from "../assets/images/optimized/products/red_caviar_forel-1024.webp";

import redCaviarGorbusha1x from "../assets/images/optimized/products/red_caviar_gorbusha-512.webp";
import redCaviarGorbusha2x from "../assets/images/optimized/products/red_caviar_gorbusha-1024.webp";

import redCaviarKeta1x from "../assets/images/optimized/products/red_caviar_keta-512.webp";
import redCaviarKeta2x from "../assets/images/optimized/products/red_caviar_keta-1024.webp";

import redCaviarKizhuch1x from "../assets/images/optimized/products/red_caviar_kizhuch-512.webp";
import redCaviarKizhuch2x from "../assets/images/optimized/products/red_caviar_kizhuch-1024.webp";

import redCaviarNerka1x from "../assets/images/optimized/products/red_caviar_nerka-512.webp";
import redCaviarNerka2x from "../assets/images/optimized/products/red_caviar_nerka-1024.webp";

// --- ЧОРНА ІКРА ---
import blackCaviarBeluga1x from "../assets/images/optimized/products/black_caviar_beluga-512.webp";
import blackCaviarBeluga2x from "../assets/images/optimized/products/black_caviar_beluga-1024.webp";

import blackCaviarOsetr1x from "../assets/images/optimized/products/black_caviar_osetr-512.webp";
import blackCaviarOsetr2x from "../assets/images/optimized/products/black_caviar_osetr-1024.webp";

// --- БІЛА ІКРА ---
import whiteCaviarShchuka1x from "../assets/images/optimized/products/white_caviar_shchuka-512.webp";
import whiteCaviarShchuka2x from "../assets/images/optimized/products/white_caviar_shchuka-1024.webp";


export const caviarCatalog = {
  // =========================================================================
  // --- ЧЕРВОНА ІКРА ---
  // =========================================================================
  forel: {
    id: "forel",
    title: "Форель",
    subtitle: "Аквакультура",
    shortDescription: "Ніжна, яскрава, збалансована.",
    indicators: [
      { label: "Колір", leftLabel: "Світлий", rightLabel: "Темний", value: 2 },
      { label: "Пружність", leftLabel: "М'яка", rightLabel: "Щільна", value: 3 },
      { label: "Розмір", leftLabel: "Дрібний", rightLabel: "Великий", value: 2 },
    ],
    longDescription: [
      "Ікра форелі вирізняється дрібним, яскраво-помаранчевим зерном і делікатною, майже прозорою оболонкою, яка легко розкривається на язиці. М’яка текстура і збалансований, некрикливий смак роблять її природним вибором для щоденної преміальності — без зайвого пафосу.",
      "Вирощена в контрольованих умовах аквакультури, ця ікра відзначається стабільною якістю від партії до партії. Ніжний вершковий післясмак і рівномірний колір зерна — ознаки продукту, який однаково добре почувається і на святковому столі, і в буденній подачі."
    ],
    specs: "СКЛАД\nікра, сіль, масло, Е 200, Е 211.\nПерший сорт.\n\nТЕРМІН ПРИДАТНОСТІ\n12 місяців",
    images: {
      jar: { src1x: redCaviarForel1x, src2x: redCaviarForel2x },
      lid: { src1x: Lid1x, src2x: Lid2x }
    },
    // Ціни — чернетка для презентації, потребують звірки перед реальним запуском.
    packages: [
      { id: "forel-100-tin", grams: 100, price: 500, image: g100_tin },
      { id: "forel-100-tin-box", grams: 100, price: 510, image: g100_tin_box },
      { id: "forel-100", grams: 100, price: 500, image: g100 },
      { id: "forel-200", grams: 200, price: 975, image: g200 },
      { id: "forel-250", grams: 250, price: 1260, image: g250 },
      { id: "forel-500", grams: 500, price: 2440, image: g500 }
    ]
  },

  gorbusha: {
    id: "gorbusha",
    title: "Горбуша",
    subtitle: "Аквакультура",
    shortDescription: "Класичний м’який морський смак.",
    indicators: [
      { label: "Колір", leftLabel: "Світлий", rightLabel: "Темний", value: 2 },
      { label: "Пружність", leftLabel: "М'яка", rightLabel: "Щільна", value: 2 },
      { label: "Розмір", leftLabel: "Дрібний", rightLabel: "Великий", value: 2 },
    ],
    longDescription: [
      "Горбуша — це класика червоної ікри: дрібне й середнє зерно природного помаранчевого відтінку, м’яка оболонка та впізнаваний морський смак без зайвої солоності. Це той смак ікри, з якого починається знайомство з продуктом.",
      "Ми відбираємо горбушу за рівномірністю зерна та свіжістю кожної партії. Універсальна у застосуванні — підходить і для класичних бутербродів, і як основа для сучасних подач, зберігаючи природну текстуру."
    ],
    specs: "СКЛАД\nікра, сіль, масло, Е 200, Е 211.\nПерший сорт.\n\nТЕРМІН ПРИДАТНОСТІ\n12 місяців",
    images: {
      jar: { src1x: redCaviarGorbusha1x, src2x: redCaviarGorbusha2x },
      lid: { src1x: Lid1x, src2x: Lid2x }
    },
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
    indicators: [
      { label: "Колір", leftLabel: "Світлий", rightLabel: "Темний", value: 3 },
      { label: "Пружність", leftLabel: "М'яка", rightLabel: "Щільна", value: 4 },
      { label: "Розмір", leftLabel: "Дрібний", rightLabel: "Великий", value: 5 },
    ],
    longDescription: [
      "Кета вирізняється одним із найбільших зерен серед лососевих ікор — щільним, глянцевим, насиченого бурштиново-помаранчевого кольору. Оболонка щільніша, ніж у горбуші, тому зерно тримає форму і не втрачає соковитості.",
      "Смак кети — вершковий, з м’якою солоністю і легким горіховим відтінком у післясмаку. Через розмір зерна ця ікра особливо ефектно виглядає у чистій подачі — на грінці чи в тарталетці, без додаткового декору."
    ],
    specs: "СКЛАД\nікра, сіль, масло, Е 200, Е 211.\nПерший сорт.\n\nТЕРМІН ПРИДАТНОСТІ\n12 місяців",
    images: {
      jar: { src1x: redCaviarKeta1x, src2x: redCaviarKeta2x },
      lid: { src1x: Lid1x, src2x: Lid2x }
    },
    // Ціни — чернетка для презентації, потребують звірки перед реальним запуском.
    packages: [
      { id: "keta-100-tin", grams: 100, price: 620, image: g100_tin },
      { id: "keta-100-tin-box", grams: 100, price: 630, image: g100_tin_box },
      { id: "keta-100", grams: 100, price: 620, image: g100 },
      { id: "keta-200", grams: 200, price: 1210, image: g200 },
      { id: "keta-250", grams: 250, price: 1565, image: g250 },
      { id: "keta-310-jar", grams: 310, price: 1995, image: g310_jar },
      { id: "keta-500", grams: 500, price: 3035, image: g500 },
      { id: "keta-500-jar", grams: 500, price: 3235, image: g500_jar }
    ]
  },

  chavicha: {
    id: "chavicha",
    title: "Чавича",
    subtitle: "Аквакультура",
    shortDescription: "Насичений королівський смак.",
    indicators: [
      { label: "Колір", leftLabel: "Світлий", rightLabel: "Темний", value: 4 },
      { label: "Пружність", leftLabel: "М'яка", rightLabel: "Щільна", value: 4 },
      { label: "Розмір", leftLabel: "Дрібний", rightLabel: "Великий", value: 5 },
    ],
    longDescription: [
      "Чавича вважається королівською серед лососевих ікор — найбільше і найщільніше зерно, глибокий бурштиново-червоний колір і насичений, багатошаровий смак. Це рідкісний вид, тому обсяги вилову традиційно обмежені.",
      "Ікринки чавичі мають виражену пружність і легкий маслянистий післясмак, який розкривається повільно. Через свою рідкісність і насиченість смаку чавича — вибір для моментів, коли варто подати щось справді ексклюзивне."
    ],
    specs: "СКЛАД\nікра, сіль, масло, Е 200, Е 211.\nПерший сорт.\n\nТЕРМІН ПРИДАТНОСТІ\n12 місяців",
    images: {
      jar: { src1x: redCaviarChavicha1x, src2x: redCaviarChavicha2x },
      lid: { src1x: Lid1x, src2x: Lid2x }
    },
    // Ціни — чернетка для презентації, потребують звірки перед реальним запуском.
    packages: [
      { id: "chavicha-100", grams: 100, price: 685, image: g100 },
      { id: "chavicha-200", grams: 200, price: 1335, image: g200 },
      { id: "chavicha-250", grams: 250, price: 1725, image: g250 },
      { id: "chavicha-500", grams: 500, price: 3340, image: g500 }
    ]
  },

  kizhuch: {
    id: "kizhuch",
    title: "Кіжуч",
    subtitle: "Аквакультура",
    shortDescription: "Щільна текстура, легка гірчинка.",
    indicators: [
      { label: "Колір", leftLabel: "Світлий", rightLabel: "Темний", value: 4 },
      { label: "Пружність", leftLabel: "М'яка", rightLabel: "Щільна", value: 4 },
      { label: "Розмір", leftLabel: "Дрібний", rightLabel: "Великий", value: 3 },
    ],
    longDescription: [
      "Кіжуч має щільне зерно середнього розміру насиченого червоно-помаранчевого кольору і виражену пружну оболонку, яка при розкушуванні дає характерний легкий «хрускіт». Смак глибший і трохи терпкіший, ніж у горбуші чи форелі.",
      "Легка благородна гірчинка в післясмаку робить кіжуч цікавим вибором для тих, хто вже знайомий з червоною ікрою і шукає більш виразний, дорослий смаковий профіль."
    ],
    specs: "СКЛАД\nікра, сіль, масло, Е 200, Е 211.\nПерший сорт.\n\nТЕРМІН ПРИДАТНОСТІ\n12 місяців",
    images: {
      jar: { src1x: redCaviarKizhuch1x, src2x: redCaviarKizhuch2x },
      lid: { src1x: Lid1x, src2x: Lid2x }
    },
    // Ціни — чернетка для презентації, потребують звірки перед реальним запуском.
    packages: [
      { id: "kizhuch-100", grams: 100, price: 605, image: g100 },
      { id: "kizhuch-200", grams: 200, price: 1180, image: g200 },
      { id: "kizhuch-250", grams: 250, price: 1525, image: g250 },
      { id: "kizhuch-500", grams: 500, price: 2955, image: g500 }
    ]
  },

  nerka: {
    id: "nerka",
    title: "Нерка",
    subtitle: "Аквакультура",
    shortDescription: "Дрібне зерно, інтенсивний смак.",
    indicators: [
      { label: "Колір", leftLabel: "Світлий", rightLabel: "Темний", value: 5 },
      { label: "Пружність", leftLabel: "М'яка", rightLabel: "Щільна", value: 4 },
      { label: "Розмір", leftLabel: "Дрібний", rightLabel: "Великий", value: 2 },
    ],
    longDescription: [
      "Нерка — це найглибший, майже бордовий колір зерна серед лососевих ікор при відносно невеликому розмірі ікринки. Саме ця концентрація кольору й сигналізує про інтенсивність смаку — найнасиченішого серед «дрібнозернистих» видів.",
      "Щільна пружна оболонка й виразна морська нота роблять нерку впізнаваною навіть серед досвідчених поціновувачів. Невеликий розмір зерна не применшує враження — навпаки, кожна ікринка «звучить» яскравіше."
    ],
    specs: "СКЛАД\nікра, сіль, масло, Е 200, Е 211.\nПерший сорт.\n\nТЕРМІН ПРИДАТНОСТІ\n12 місяців",
    images: {
      jar: { src1x: redCaviarNerka1x, src2x: redCaviarNerka2x },
      lid: { src1x: Lid1x, src2x: Lid2x }
    },
    // Ціни — чернетка для презентації, потребують звірки перед реальним запуском.
    packages: [
      { id: "nerka-100", grams: 100, price: 565, image: g100 },
      { id: "nerka-200", grams: 200, price: 1105, image: g200 },
      { id: "nerka-250", grams: 250, price: 1430, image: g250 },
      { id: "nerka-500", grams: 500, price: 2775, image: g500 }
    ]
  },

  // =========================================================================
  // --- ЧОРНА ІКРА ---
  // =========================================================================
  beluga: {
    id: "beluga",
    title: "Белуга",
    subtitle: "Аквакультура",
    shortDescription: "Делікатний смак, великі зерна.",
    indicators: [
      { label: "Колір", leftLabel: "Світлий", rightLabel: "Темний", value: 5 },
      { label: "Пружність", leftLabel: "М'яка", rightLabel: "Щільна", value: 2 },
      { label: "Розмір", leftLabel: "Дрібний", rightLabel: "Великий", value: 5 },
    ],
    longDescription: [
      "Белужа ікра — еталон чорної ікри: найбільше зерно серед усіх видів, м’яка масляниста оболонка і надзвичайно делікатний, майже вершковий смак без різкої солоності. Колір варіюється від темно-сірого до майже чорного з характерним перламутровим відблиском.",
      "Через рідкісність белуги ця ікра традиційно вважається найпрестижнішою у світі. М’яка текстура і довгий, багатий післясмак розкриваються найкраще в чистій подачі — без хліба чи додаткових акцентів, які можуть перебити тонкий баланс смаку."
    ],
    specs: "СКЛАД\nікра, сіль, масло, Е 200, Е 211.\nПерший сорт.\n\nТЕРМІН ПРИДАТНОСТІ\n12 місяців",
    images: { 
      jar: { src1x: blackCaviarBeluga1x, src2x: blackCaviarBeluga2x }, 
      lid: { src1x: Lid1x, src2x: Lid2x } 
    },
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
    indicators: [
      { label: "Колір", leftLabel: "Світлий", rightLabel: "Темний", value: 4 },
      { label: "Пружність", leftLabel: "М'яка", rightLabel: "Щільна", value: 4 },
      { label: "Розмір", leftLabel: "Дрібний", rightLabel: "Великий", value: 3 },
    ],
    longDescription: [
      "Осетрова ікра — класика чорної ікри: зерно середнього розміру, щільна пружна оболонка і горіховий, злегка мінеральний присмак, який відрізняє її від м’якшої белуги. Колір — від бронзово-коричневого до темно-сірого.",
      "Стабільна щільна текстура робить осетрову ікру зручною для найрізноманітніших подач — від класичних канапе до сучасної гастрономії. Це впізнаваний, збалансований смак чорної ікри без зайвої екстравагантності."
    ],
    specs: "СКЛАД\nікра, сіль, масло, Е 200, Е 211.\nПерший сорт.\n\nТЕРМІН ПРИДАТНОСТІ\n12 місяців",
    images: { 
      jar: { src1x: blackCaviarOsetr1x, src2x: blackCaviarOsetr2x }, 
      lid: { src1x: Lid1x, src2x: Lid2x } 
    },
    packages: [
      { id: "osetr-50", grams: 50, price: 1530, image: g100 },
      { id: "osetr-100", grams: 100, price: 2980, image: g200 },
      { id: "osetr-250", grams: 250, price: 7425, image: g250 }
    ]
  },

  // =========================================================================
  // --- БІЛА ІКРА ---
  // =========================================================================
  shchuka: {
    id: "shchuka",
    title: "Щука",
    subtitle: "Аквакультура",
    shortDescription: "Світле зерно, м’який смак.",
    indicators: [
      { label: "Колір", leftLabel: "Світлий", rightLabel: "Темний", value: 1 },
      { label: "Пружність", leftLabel: "М'яка", rightLabel: "Щільна", value: 3 },
      { label: "Розмір", leftLabel: "Дрібний", rightLabel: "Великий", value: 1 },
    ],
    longDescription: [
      "Ікра щуки — єдиний представник білої ікри в нашій колекції: дрібне світле, майже бурштинове зерно з тонкою, майже прозорою оболонкою. Смак м’який, свіжий, з ледь відчутною річковою нотою — без важкості, притаманної червоній чи чорній ікрі.",
      "Через свою делікатність і світлий колір ікра щуки — ефектний контрастний елемент у подачі: додає візуальної легкості поруч із насиченими кольорами червоної чи чорної ікри, не змагаючись з ними за смакову увагу."
    ],
    specs: "СКЛАД\nікра, сіль, масло, Е 200, Е 211.\nПерший сорт.\n\nТЕРМІН ПРИДАТНОСТІ\n12 місяців",
    images: { 
      jar: { src1x: whiteCaviarShchuka1x, src2x: whiteCaviarShchuka2x }, 
      lid: { src1x: Lid1x, src2x: Lid2x } 
    },
    packages: [
      { id: "shchuka-100", grams: 100, price: 475, image: g100 },
      { id: "shchuka-230", grams: 230, price: 1115, image: g200 }
    ]
  }
};