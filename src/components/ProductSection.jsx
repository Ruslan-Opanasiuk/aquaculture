import ProductCard from "./ProductCard";

function ProductSection({ 
  title, 
  description, 
  products, 
  sectionBg,   // фон блоку
  cardBg       // фон карток
}) {
  // розбиваємо заголовок на два слова
  const [firstWord, secondWord] = title.split(" ");

  return (
    <section
      className="
        w-full max-w-[1240px] mx-auto
        rounded-[20px]
        px-[24px] pt-[16px] pb-[24px]
      "
      style={{ backgroundColor: sectionBg }}
    >
      {/* Заголовок */}
      <h2 className="text-[64px] font-['Cormorant_Garamond'] mb-[8px] leading-none">
        <span className="font-medium">{firstWord}</span>{" "}
        <span className="font-medium italic">{secondWord}</span>
      </h2>

      {/* Опис */}
      <p
        className="
            max-w-[600px]
            mt-[24px]
            text-[12px] font-['Montserrat'] font-semibold
            text-[#121212]/75
            uppercase
            mb-[32px]
            leading-[1.4]
        "
        >
        {description}
        </p>


      {/* Сітка карток */}
      <div
        className="
          grid grid-cols-[repeat(auto-fit,minmax(281px,1fr))]
          gap-[24px]
        "
      >
        {products.map((p, i) => (
          <ProductCard key={i} {...p} cardBg={cardBg} />
        ))}
      </div>
    </section>
  );
}

export default ProductSection;
