export default function CatalogSection({
  count,
  title,
  subtitle,
}) {
  return (
    <section className="w-full flex justify-center">
      <div
        className="
          w-full px-layout-gap 
          tablet:max-w-[794px] 
          desktop:max-w-[1180px]
        "
      >
        <h2 className="text-section-title font-semibold mb-3">
          {title}
        </h2>

        {subtitle && (
          <p className="text-section-subtitle leading-[1.5] text-caviar-text max-w-[67%] mb-4">
            {subtitle}
          </p>
        )}

        <div
          className="
            flex gap-layout-gap overflow-x-auto snap-x snap-mandatory
            py-6
            -mx-layout-gap 
            px-layout-gap
            phone-wide:-mx-layout-gap 
            phone-wide:px-[26vw]
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
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              className="
                bg-caviar-cream  
                rounded-[20px]
                shadow-card-custom
                aspect-[1/1.5]
                flex-shrink-0
                snap-center
                max-w-card
                w-full
                phone-wide:w-[74vw] 
                tablet:w-full
              "
            />
          ))}
        </div>
      </div>
    </section>
  );
}



// TODO: нормальну логіку для max-w subtitle
// TODO: нормальну логіку для phone-wide
// TODO: нормальну логіку для ключів key={i} 
// TODO: логіку активних карток
