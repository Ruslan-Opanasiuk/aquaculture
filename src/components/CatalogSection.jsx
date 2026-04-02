import ProductCard from "./ProductCard";
import { productVariants } from "../data/catalogData";

export default function CatalogSection({ products, title, subtitle, id }) {
  const items = products.map((key) => ({
    key,
    ...productVariants[key],
  }));

  return (
    <section
      id={id}
      className="w-full flex justify-center scroll-mt-[100px]"
    >
      <div className="w-full px-layout-gap max-content">
        
        <h2 className="font-['Montserrat'] font-semibold mb-3 text-h2 text-brand-black">
          {title}
        </h2>

        {subtitle && (
          <p className="font-['Montserrat'] leading-[1.5] max-w-[754px] mb-4 text-body text-brand-black">
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
                price={p.priceText}
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