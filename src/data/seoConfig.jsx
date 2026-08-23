// Поточний домен деплою. Він потрапляє в canonical, og:url і og:image, тому
// має бути справжнім: на неіснуючому домені Telegram не завантажить картинку
// і покаже картку без зображення.
// Купите власний домен — міняти тут, у public/robots.txt і public/sitemap.xml.
export const SITE_URL = "https://aquaculture-five.vercel.app";
export const SITE_NAME = "Aquaculture";

// Картка без зображення поруч із картками товарів виглядає як недоробка, тому
// сторінки без власного фото (кошик, оферта, політика, 404) отримують логотип
// на фоні бренду. Генерується src/generate-og.js разом з рештою OG-картинок.
export const DEFAULT_OG_IMAGE = "/og/default.jpg";

// Телефони й пошта дублюються у футері. Тут вони потрібні для structured data —
// саме з неї Google бере контакти у видачі та в панель знання.
export const ORG_PHONES = ["+380675535808", "+380982960608"];
export const ORG_EMAIL = "opanasiukruslan2003@gmail.com";

// description тримаємо в межах ~150–160 символів: довше Google обрізає
// трикрапкою, коротше — марно втрачений простір у видачі.
export const SEO_PAGES = {
  home: {
    title: "Преміальна ікра",
    description:
      "Червона, чорна та біла ікра преміального класу з контрольованим походженням. Доставка по Україні, гуртові ціни для ресторанів і корпоративних клієнтів.",
    canonical: SITE_URL,
    image: "/og/home.jpg",
    imageAlt: "Преміальна червона ікра Aquaculture",
  },

  catalog: {
    title: "Каталог ікри",
    description:
      "Каталог преміальної ікри: форель, горбуша, кета, чавича, кіжуч, нерка, білуга, осетр, щука. Фасування від 100 г до 500 г, знижки від 3 кг.",
    canonical: `${SITE_URL}/catalog`,
    image: "/og/catalog.jpg",
    imageAlt: "Каталог преміальної ікри Aquaculture",
  },

  privacy: {
    title: "Політика конфіденційності",
    description:
      "Як Aquaculture збирає, використовує та зберігає персональні дані користувачів: склад даних, мета обробки, строк зберігання і права користувача.",
    canonical: `${SITE_URL}/privacy`,
  },

  oferta: {
    title: "Договір публічної оферти",
    description:
      "Умови продажу ікри Aquaculture: оформлення замовлення, ціни та оплата, доставка, гарантії якості та відповідальність сторін.",
    canonical: `${SITE_URL}/oferta`,
  },

  // Кошик і 404 у sitemap не входять і закриті від індексації, але мета-теги
  // їм потрібні: без них у картці посилання буде порожній заголовок.
  cart: {
    title: "Кошик",
    description: "Ваше замовлення преміальної ікри Aquaculture.",
    noindex: true,
  },

  notFound: {
    title: "Сторінку не знайдено",
    description: "На жаль, такої сторінки не існує в нашому магазині.",
    noindex: true,
  },
};

// --- Structured data (schema.org) --------------------------------------------

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  description:
    "Постачальник преміальної червоної, чорної та білої ікри для приватних, корпоративних і гуртових клієнтів.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: ORG_PHONES[0],
    email: ORG_EMAIL,
    contactType: "sales",
    areaServed: "UA",
    availableLanguage: "Ukrainian",
  },
};

export const breadcrumbJsonLd = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
});

// "Ікра кети", а не "Ікра Кета" — саме в родовому відмінку люди шукають ікру,
// і саме так товар підписаний у виробника. titleGenitive живе в caviarPackages.
export const productTitle = (product) =>
  `Ікра ${product.titleGenitive || product.title.toLowerCase()}`;

// Опис товару для видачі збираємо з даних, а не пишемо руками: shortDescription
// сам по собі закороткий (~30 символів), а Google дає під опис усі ~160.
export const productDescription = (product) => {
  const grams = (product.packages || []).map((p) => p.grams);
  const prices = (product.packages || []).map((p) => p.price);
  const short = product.shortDescription.replace(/\.$/, "");
  const details = [];

  if (grams.length) {
    details.push(`фасування ${Math.min(...grams)}–${Math.max(...grams)} г`);
  }
  if (prices.length) {
    details.push(`ціна від ${Math.min(...prices)} ₴`);
  }

  const lead = `${productTitle(product)} — ${short.charAt(0).toLowerCase()}${short.slice(1)}.`;
  const specs = details.length
    ? ` ${details.join(", ").replace(/^./, (c) => c.toUpperCase())}.`
    : "";

  return `${lead}${specs} Доставка по Україні.`;
};

// Product з offers — те, завдяки чому Google може показати ціну «від» і
// наявність прямо у видачі. Ціни беремо з packages, а не хардкодимо.
export const productJsonLd = (product, productKey) => {
  const prices = (product.packages || []).map((p) => p.price);
  const image = product.ogImage;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productTitle(product),
    description: product.longDescription?.[0] || product.shortDescription,
    ...(image ? { image: `${SITE_URL}${image}` } : {}),
    brand: { "@type": "Brand", name: SITE_NAME },
    category: "Ікра",
    url: `${SITE_URL}/product/${productKey}`,
    ...(prices.length
      ? {
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "UAH",
            lowPrice: Math.min(...prices),
            highPrice: Math.max(...prices),
            offerCount: prices.length,
            availability: "https://schema.org/InStock",
            seller: { "@type": "Organization", name: SITE_NAME },
          },
        }
      : {}),
  };
};
