import { useRef, useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const ArrowIcon = ({ className }) => (
  <svg 
    className={className} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

function ProductSection({ 
  title, 
  description, 
  products, 
  sectionBg, 
  cardBg 
}) {
  const words = title.split(" ");
  const firstWord = words[0];
  const secondWord = words.slice(1).join(" ");
  
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const handleNavigation = (direction) => {
    setActiveIndex((prevIndex) => {
      if (direction === "left") {
        return prevIndex === 0 ? products.length - 1 : prevIndex - 1;
      } else {
        return prevIndex === products.length - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const targetCard = container.children[activeIndex];

      if (targetCard) {
        // Тут важливо: враховуємо нову геометрію
        const scrollPos = 
          targetCard.offsetLeft - 
          (container.clientWidth / 2) + 
          (targetCard.clientWidth / 2);

        container.scrollTo({
          left: scrollPos,
          behavior: "smooth",
        });
      }
    }
  }, [activeIndex, products.length]);

  return (
    <section
      className="
        relative w-full max-w-[1240px] mx-auto
        rounded-[20px]
        px-[24px] pt-[16px] pb-[24px]
        group/section
      "
      style={{ backgroundColor: sectionBg }}
    >
      {/* Заголовок і текст залишаються в межах padding */}
      <h2 className="text-[clamp(2.68rem,5.2cqi,4rem)] font-['Cormorant_Garamond'] leading-none">
        <span className="font-medium">{firstWord}</span>{" "}
        <span className="font-medium italic">{secondWord}</span>
      </h2>

      <p className="
          max-w-[600px] mt-[clamp(1rem,2cqi,1.5rem)] mb-[clamp(1.34rem,2.6cqi,2rem)]
          text-[clamp(0.5rem,1cqi,0.75rem)] font-['Montserrat'] font-semibold
          text-[#121212]/75 uppercase leading-[1.4]
        ">
        {description}
      </p>


      <div className="relative mx-[-24px] md:mx-0">
        <button
          onClick={() => handleNavigation("left")}
          className="
            absolute left-[12px] top-1/2 -translate-y-1/2 z-20
            w-[40px] h-[40px] bg-white rounded-full shadow-lg
            flex items-center justify-center
            md:hidden opacity-90 active:scale-95 transition-transform cursor-pointer
          "
          aria-label="Scroll left"
        >
           <ArrowIcon className="w-5 h-5 rotate-180 text-[#121212]" />
        </button>

        <button
          onClick={() => handleNavigation("right")}
          className="
            absolute right-[12px] top-1/2 -translate-y-1/2 z-20
            w-[40px] h-[40px] bg-white rounded-full shadow-lg
            flex items-center justify-center
            md:hidden opacity-90 active:scale-95 transition-transform cursor-pointer
          "
          aria-label="Scroll right"
        >
          <ArrowIcon className="w-5 h-5 text-[#121212]" />
        </button>

        {/* КОНТЕЙНЕР СПИСКУ */}
        <div
          ref={scrollContainerRef}
          className="
            flex overflow-hidden gap-[24px]
            px-[24px]
            
            md:grid md:grid-cols-[repeat(auto-fit,minmax(281px,1fr))] 
            md:overflow-visible md:px-0
          "
        >
          {products.map((p, i) => (
            <div 
              key={i} 
              className="
                w-[87%] max-w-[320px] flex-shrink-0                
                md:w-full md:max-w-none md:min-w-0
              "
            >
              {/* === ПЕРЕДАЧА ПРОПСУ === */}
              <ProductCard 
                {...p} 
                cardBg={cardBg} 
                isActive={i === activeIndex} // Перевіряємо, чи індекс картки відповідає активному індексу
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default ProductSection;