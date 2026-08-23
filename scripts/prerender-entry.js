// Джерело маршрутів для prerender. Свідомо тягне ті самі модулі й ті самі
// функції, що й React-сторінки, — щоб мета-теги в HTML і в застосунку не
// могли розійтися. Якщо додається новий маршрут із <SEO>, його треба додати
// і сюди (і в public/sitemap.xml).

import {
  SITE_URL,
  SITE_NAME,
  SEO_PAGES,
  organizationJsonLd,
  breadcrumbJsonLd,
  productTitle,
  productDescription,
  productJsonLd,
} from "../src/data/seoConfig.jsx";
import { caviarCatalog } from "../src/data/caviarPackages.jsx";

export const site = { SITE_URL, SITE_NAME };

export function getRoutes() {
  const routes = [
    {
      path: "/",
      ...SEO_PAGES.home,
      jsonLd: organizationJsonLd,
    },
    {
      path: "/catalog",
      ...SEO_PAGES.catalog,
      jsonLd: breadcrumbJsonLd([
        { name: "Головна", path: "/" },
        { name: "Каталог", path: "/catalog" },
      ]),
    },
    {
      path: "/privacy",
      ...SEO_PAGES.privacy,
      jsonLd: breadcrumbJsonLd([
        { name: "Головна", path: "/" },
        { name: "Політика конфіденційності", path: "/privacy" },
      ]),
    },
    {
      path: "/oferta",
      ...SEO_PAGES.oferta,
      jsonLd: breadcrumbJsonLd([
        { name: "Головна", path: "/" },
        { name: "Договір публічної оферти", path: "/oferta" },
      ]),
    },
    { path: "/cart", ...SEO_PAGES.cart },
  ];

  for (const [key, product] of Object.entries(caviarCatalog)) {
    routes.push({
      path: `/product/${key}`,
      title: productTitle(product),
      description: productDescription(product),
      canonical: `${SITE_URL}/product/${key}`,
      image: product.ogImage,
      imageAlt: `${productTitle(product)} — ${SITE_NAME}`,
      type: "product",
      jsonLd: [
        productJsonLd(product, key),
        breadcrumbJsonLd([
          { name: "Головна", path: "/" },
          { name: "Каталог", path: "/catalog" },
          { name: product.title, path: `/product/${key}` },
        ]),
      ],
    });
  }

  return routes;
}
