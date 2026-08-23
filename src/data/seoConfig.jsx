import ogHome from "../assets/images/optimized/banners/home-hero-desktop-1536.webp";
import ogCatalog from "../assets/images/optimized/banners/atmospheric-1536.webp";

// Домен — заглушка до підключення реального. Міняти тут, у public/robots.txt
// і public/sitemap.xml (в index.html домену вже немає — canonical ставить SEO.jsx).
export const SITE_URL = "https://aquaculture.com";
export const SITE_NAME = "Aquaculture";

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
    image: ogHome,
    imageAlt: "Преміальна червона ікра Aquaculture",
  },

  catalog: {
    title: "Каталог ікри",
    description:
      "Каталог преміальної ікри: форель, горбуша, кета, чавича, кіжуч, нерка, білуга, осетр, щука. Фасування від 100 г до 500 г, знижки від 3 кг.",
    canonical: `${SITE_URL}/catalog`,
    image: ogCatalog,
    imageAlt: "Каталог преміальної ікри Aquaculture",
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
  const image = product.images?.jar?.src2x;

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
