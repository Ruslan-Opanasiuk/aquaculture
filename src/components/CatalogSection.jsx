// src/components/CatalogSection.jsx
import ProductCard from "./ProductCard";
import { productVariantsList } from "../data/catalogData";

export default function CatalogSection({
  count,
  title,
  subtitle,
  startIndex = 0,
}) {
  const items = productVariantsList.slice(
    startIndex,
    startIndex + count
  );

  return (
    <section
      className="
        w-full
        flex
        justify-center
      "
    >
      <div
        className="
          w-full
          px-layout-gap
        "
        style={{
          maxWidth: "var(--content-max-width)",
        }}
      >
        <h2
          className="
            font-['Montserrat']
            font-medium
            mb-3
          "
          style={{
            fontSize: "var(--h2-font-size)",
          }}
        >
          {title}
        </h2>

        {subtitle && (
          <p
            className="
              font-['Montserrat']
              leading-[1.5]
              max-w-[754px]
              mb-4
            "
            style={{
              fontSize: "var(--body-font-size)",
            }}
          >
            {subtitle}
          </p>
        )}

        <div
          className="
            flex
            gap-layout-gap
            overflow-x-auto
            snap-x
            snap-mandatory
            py-6
            -mx-layout-gap
            px-layout-gap

            phone-wide:-mx-layout-gap

            tablet:mx-0
            tablet:px-0
            tablet:grid
            tablet:overflow-visible
            tablet:snap-none
            tablet:grid-cols-2

            desktop:grid-cols-3
            desktop:justify-items-start
          "
        >
          {items.map((p) => (
            <div
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
                title={p.title}
                price={p.priceText}
                imageSrc={p.imageSrc}
                imageAlt={p.title}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
