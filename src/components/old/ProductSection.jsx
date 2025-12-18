import { useRef, useState, useEffect } from "react";
import ProductCard from "./ProductCard";

/* SVG-іконка стрілки */
const ArrowIcon = ({ className }) => (
  <svg 
    className={className}          /* розмір, обертання і стилі іконки */
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path 
      strokeLinecap="round"        /* округлі кінці ліній */
      strokeLinejoin="round"       /* округлі стики */
      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
    />
  </svg>
);

function ProductSection({ 
  title, 
  description, 
  products, 
  sectionBg, 
  cardBg 
}) {

  /* Розділяємо заголовок на два стилізовані сегменти */
  const words = title.split(" ");
  const firstWord = words[0];                      /* слово з основним шрифтом */
  const secondWord = words.slice(1).join(" ");     /* слово з іншим шрифтом */

  /* Індекс активної картки в мобільному слайдері */
  const [activeIndex, setActiveIndex] = useState(0);

  /* Реф для контейнера горизонтального скролу */
  const scrollContainerRef = useRef(null);

  /* Обробка кліків по кнопках навігації */
  const handleNavigation = (direction) => {
    setActiveIndex((prevIndex) => {
      if (direction === "left") {
        return prevIndex === 0 ? products.length - 1 : prevIndex - 1;
      } else {
        return prevIndex === products.length - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  /* Прокручуємо контейнер так, щоб активна картка опинилася по центру */
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const targetCard = container.children[activeIndex];

      if (targetCard) {
        const scrollPos = targetCard.offsetLeft;
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
        relative                 /* кнопки позиціонуються поверх контенту */
        w-full                   /* секція розтягується на всю ширину */
        max-w-[1204px]           /* максимальна ширина */
        mx-auto                  /* центрування */
        rounded-[20px]           /* згладжені кути */
        px-[20px] md:px-[32px]   /* внутрішні відступи по боках */
        pt-[1px] 
        pb-[24px]             /* нижній відступ секції */
        group/section            /* група для майбутніх hover-ефектів */
      "
      style={{
        backgroundColor: sectionBg, /* фоновий колір секції */
      }}
    >

    {/* Заголовок секції */}
    <h2 
      className="
        mt-[clamp(1.34rem,2.6cqi,2rem)]  /* мобільний адаптивний відступ */
        text-[clamp(2.68rem,5.2cqi,4rem)] /* мобільний адаптивний розмір */
        md:text-[58px]                    /* фіксований desktop-розмір */
        leading-none                      /* щільний line-height */
        font-semibold                     /* жирність для обох слів */
      "
    >
      {/* Перше слово — наприклад, Cormorant Garamond */}
      <span className="font-['Cormorant_Infant'] font-medium">
        {firstWord}
      </span>{" "}

      {/* Друге слово — інший шрифт, наприклад Montserrat або інший serif */}
      <span className="font-['Cormorant_Garamond'] italic font-medium">
        {secondWord}
      </span>
    </h2>

    {/* Підзаголовок */}
    <p
      className="
        max-w-[750px]                    /* текст не ширший за 750px */

        /* === MOBILE адаптив === */
        mt-[clamp(1rem,2cqi,1.5rem)]     /* адаптивний top-margin */
        mb-[clamp(1.34rem,2.6cqi,2rem)]  /* адаптивний bottom-margin */
        text-[clamp(0.5rem,1cqi,0.75rem)]/* адаптивний розмір тексту */
        
        /* === DESKTOP фіксовані значення === */
        md:mt-[24px]
        md:mb-[43px]
        md:text-[18.87px]

        font-['Montserrat'] font-semibold /* строгий сучасний шрифт */
        text-[#121212]/75                 /* приглушений чорний */
        uppercase                         /* великі літери */
        leading-[1.225]                     /* комфортний line-height */
      "
    >
      {description}
    </p>


      {/* Обгортка слайдера + кнопки */}
      <div className="relative w-full">
        
        {/* Кнопка вліво (тільки мобільний режим) */}
        <button
          onClick={() => handleNavigation("left")}
          className="
            absolute left-0 top-1/2 -translate-y-1/2 /* вертикальне центрування */
            z-20                                       /* поверх контенту */
            w-[40px] h-[40px]                          /* розмір кнопки */
            bg-white rounded-full shadow-lg            /* стиль кнопки */
            flex items-center justify-center           /* центрування іконки */
            md:hidden                                  /* приховано на desktop */
            opacity-90 active:scale-95                 /* інтерактивність */
            transition-transform cursor-pointer        /* плавність */
            -ml-[10px]                                 /* легкий зсув */
          "
          aria-label="Scroll left"
        >
          <ArrowIcon className="w-5 h-5 rotate-180 text-[#121212]" />
        </button>

        {/* Кнопка вправо (тільки мобільний режим) */}
        <button
          onClick={() => handleNavigation("right")}
          className="
            absolute right-0 top-1/2 -translate-y-1/2 /* центрування */
            z-20
            w-[40px] h-[40px]
            bg-white rounded-full shadow-lg
            flex items-center justify-center
            md:hidden
            opacity-90 active:scale-95
            transition-transform cursor-pointer
            -mr-[10px]
          "
          aria-label="Scroll right"
        >
          <ArrowIcon className="w-5 h-5 text-[#121212]" />
        </button>

        {/* Контейнер мобільного слайдера + desktop грід */}
        <div
          ref={scrollContainerRef}
          className="
            flex                         /* горизонтальний ряд карток */
            w-full                       /* займає всю ширину */
            overflow-hidden              /* приховує прокрутку */
            gap-[20px]                   /* проміжок між картками */

            snap-x snap-mandatory        /* мобільне прилипання */

            /* Desktop layout — грід */
            md:grid
            md:grid-cols-[repeat(auto-fit,minmax(281px,1fr))]
            md:overflow-visible
            md:gap-[32px]
          "
        >
          {products.map((p, i) => (
            <div 
              key={i}
              className="
                w-full
                flex-shrink-0            /* необхідно для мобільного snap */
                snap-center              /* центрування картки */
                md:w-full md:max-w-none md:min-w-0 
              "
            >
              <ProductCard 
                {...p}
                cardBg={cardBg}
                isActive={i === activeIndex} /* активна картка */
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductSection;
