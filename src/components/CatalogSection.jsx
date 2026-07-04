import ProductCard from "./ProductCard";
import { caviarCatalog } from "../data/caviarPackages";

const WHOLESALE_NOTE = "гурт — за запитом";

// Ціна для каталогу = мінімальна ціна пакування ("від X"). Джерело — caviarPackages.
function catalogPrice(productId) {
  const packages = caviarCatalog[productId]?.packages ?? [];
  if (packages.length === 0) return WHOLESALE_NOTE;
  const min = Math.min(...packages.map((p) => p.price));
  return `від ${new Intl.NumberFormat("uk-UA").format(min)} ₴\n${WHOLESALE_NOTE}`;
}

export default function CatalogSection({ products, title, subtitle, id }) {
  const items = products.map((key) => {
    const product = caviarCatalog[key];
    return {
      key,
      title: product.title,
      images: product.images.jar,
    };
  });

  return (
    <section
      id={id}
      className="w-full flex justify-center scroll-mt-[100px]"
    >
      <div className="w-full px-layout-gap max-content">
        
        {/* Тепер заголовок рендериться лише якщо його передано */}
        {title && (
          <h2 className="font-['Montserrat'] font-semibold mb-3 text-h2 text-brand-dark">
            {title}
          </h2>
        )}

        {/* Опис також рендериться лише за наявності */}
        {subtitle && (
          <p className="font-['Montserrat'] leading-[1.5] max-w-[754px] mb-4 text-body text-brand-dark">
            {subtitle}
          </p>
        )}

        <ul
          className="
            flex gap-layout-gap overflow-x-auto snap-x snap-mandatory py-6 -mx-layout-gap px-layout-gap
            phone-wide:-mx-layout-gap
            tablet:mx-0 tablet:px-0 tablet:grid tablet:overflow-visible tablet:snap-none tablet:grid-cols-2
            desktop:grid-cols-3 desktop:justify-items-start
          "
        >
          {items.map((p) => (
            <li
              key={p.key}
              className="
                flex-shrink-0
                snap-center
                max-w-card
                w-full
                phone-wide:w-[74vw]
                tablet:w-full
              "
            >
              <ProductCard
                id={p.key}
                title={p.title}
                price={catalogPrice(p.key)}
                images={p.images}
                imageAlt={p.title}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}