// Домен — заглушка до підключення реального. Міняти тут, в index.html
// (canonical + og:url), у public/robots.txt і public/sitemap.xml.
export const SITE_URL = "https://aquaculture.com";

// og:image свідомо не задаємо: файлів /og-*.jpg не існує, а мертве посилання
// гірше за його відсутність — соцмережі показують порожню картку замість
// фолбеку. Додати разом із реальними зображеннями 1200×630.
export const SEO_PAGES = {
  home: {
    title: "Преміальна ікра",
    description:
      "Преміальна чорна та червона ікра Aquaculture.",
    canonical: SITE_URL,
  },

  catalog: {
    title: "Каталог ікри",
    description:
      "Каталог преміальної чорної та червоної ікри Aquaculture.",
    canonical: `${SITE_URL}/catalog`,
  },
}
