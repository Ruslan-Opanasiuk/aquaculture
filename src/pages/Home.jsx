import React from "react";
import { Link } from "react-router-dom"; 
import HomeHeroBanner from "../components/HomeHeroBanner"; 
import AtmosphericBanner from "../components/AtmosphericBanner"; 
import FeatureGrid from "../components/FeatureGrid";
import CatalogSection from "../components/CatalogSection";
import TestimonialsSection from "../components/TestimonialsSection";
import iconOrigin from "../assets/images/grid/test-512.webp";
import introImage from "../assets/images/grid/test2.png";
import logotest from "../assets/images/fora.png";

export default function Home() {

  const bestsellers = ["chavicha", "shchuka", "beluga"];

  const advantagesItems = [
    {
      id: "origin",
      imageSrc: iconOrigin,
      title: "Натуральне походження",
      description: "Смак, що формується природою"
    },
    {
      id: "texture",
      imageSrc: iconOrigin,
      title: "Автентична текстура",
      description: "Текстура і колір без втручання"
    },
    {
      id: "selection",
      imageSrc: iconOrigin,
      title: "Відбір як мистецтво",
      description: "Кожне зерно — результат відбору"
    },
    {
      id: "traceability",
      imageSrc: iconOrigin,
      title: "Прозоре походження",
      description: "Ми знаємо походження кожного зерна"
    },
    {
      id: "quality",
      imageSrc: iconOrigin,
      title: "Гарантія якості",
      description: "Якість, за яку ми відповідаємо"
    },
    {
      id: "delivery",
      imageSrc: iconOrigin,
      title: "Швидкість і точність",
      description: "Свіжість без затримок"
    }
  ];

  return (
    <main className="min-h-screen flex flex-col font-['Montserrat'] bg-brand-beige">
      
      {/* Твій Hero Banner */}
      <HomeHeroBanner />
      
      {/* ===== ОНОВЛЕНИЙ БЛОК ФОТО ===== */}
      <div className="w-full max-w-[980px] px-layout-gap mx-auto mt-[80px] mb-[40px] flex justify-center">
        <img 
          src={introImage} 
          alt="Вступне фото" 
          loading="lazy"
          className="h-[250px] w-auto object-contain" 
        />
      </div>

      <div className="flex flex-col items-center text-center mb-[64px]">
        <h2 className="text-body font-medium text-brand-black mb-8 tracking-widest px-layout-gap">
          ІКРА, ЯКУ ОБИРАЮТЬ ЗА СМАК, А НЕ СЛОВА
        </h2>
        <p className="text-body text-brand-black max-w-[660px] px-layout-gap">
          Ми працюємо з перевіреними постачальниками та відбираємо ікру за її природними характеристиками — смаком, текстурою та свіжістю. Без зайвої обробки, без компромісів. Лише продукт, який відповідає своєму походженню.
        </p>
      </div>

      <h2 className="text-body font-medium text-brand-black mb-8 mt-20 tracking-widest text-center">
        ЛІДЕРИ ПРОДАЖІВ
      </h2>

      {/* ТВІЙ CATALOG SECTION У РОЛІ БЕСТСЕЛЕРІВ */}
      <CatalogSection 
        id="bestsellers"
        products={bestsellers}  
      />

      {/* Виклик сітки з новими даними */}
      <FeatureGrid 
        title="НАШІ ПЕРЕВАГИ"
        bodyText="Ікра — це більше, ніж продукт. Це походження, відбір і точність на кожному етапі. Ми працюємо так, щоб у кожній банці зберігався її природний смак — без компромісів і випадковостей."
        columns={3}
        items={advantagesItems}
      />

      <AtmosphericBanner />

      {/* Виклик сітки з новими даними */}
      <FeatureGrid 
        title="ДЛЯ КОГО І ЯК МИ ПРАЦЮЄМО"
        bodyText="Ікра — це більше, ніж продукт. Це походження, відбір і точність на кожному етапі. Ми працюємо так, щоб у кожній банці зберігався її природний смак — без компромісів і випадковостей."
        columns={3}
        items={advantagesItems}
      />

      {/* СЕКЦІЯ ЗАКЛИКУ ДО ДІЇ (CTA) */}
      <div className="w-full flex flex-col items-center text-center px-layout-gap py-[128px] mx-auto max-w-[760px]">
        <h2 className="text-body font-medium text-brand-black mb-6 tracking-widest uppercase">
          Зробіть свій вибір
        </h2>
        
        <p className="text-body text-brand-black leading-[1.6] mb-10 max-w-[600px]">
          Ми вже виконали найскладнішу роботу — відібрали ікру з бездоганним походженням та еталонною текстурою. Вам залишається лише обрати свій ідеальний смак для особливої події чи вишуканого подарунка.
        </p>

        <Link
          to="/catalog"
          className="
            inline-flex
            items-center
            justify-center
            rounded-full
            px-8
            min-h-[48px]
            font-['Montserrat']
            bg-brand-black
            text-brand-beige
            hover:opacity-80
            transition-opacity
            text-body
            font-medium
            focus-visible:ring-2
            focus-visible:ring-brand-gold
            focus-visible:ring-offset-2
            focus-visible:ring-offset-white
            focus-visible:outline-none
          "
        >
          Перейти до каталогу
        </Link>
      </div>

      <TestimonialsSection />


{/* СЕКЦІЯ "НАМ ДОВІРЯЮТЬ" */}
      <section className="w-full py-[80px] flex flex-col items-center">
        <h2 className="text-body font-medium text-brand-black mb-10 tablet:mb-14 tracking-widest uppercase text-center">
          Нам довіряють
        </h2>
        
        {/* ПЕРЕНЕСЛИ overflow-hidden СЮДИ */}
        <div className="w-full max-w-[940px] px-layout-gap mx-auto relative overflow-hidden group">
          
          <div className="flex w-max items-center animate-marquee will-change-transform">
            
            {/* Набір №1 (оригінал) */}
            <div className="flex items-center gap-10 tablet:gap-[80px] pr-10 tablet:pr-[80px] justify-around flex-shrink-0">
              {[1, 2, 3, 4, 5].map((index) => (
                <img 
                  key={`original-${index}`}
                  src={logotest} 
                  alt={`Партнер ${index}`}
                  loading="lazy"
                  className="h-[36px] tablet:h-[48px] w-auto max-w-none flex-shrink-0 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              ))}
            </div>

            {/* Набір №2 (копія) */}
            <div className="flex items-center gap-10 tablet:gap-[80px] pr-10 tablet:pr-[80px] justify-around flex-shrink-0">
              {[1, 2, 3, 4, 5].map((index) => (
                <img 
                  key={`duplicate-${index}`}
                  src={logotest} 
                  alt={`Партнер копія ${index}`}
                  loading="lazy"
                  className="h-[36px] tablet:h-[48px] w-auto max-w-none flex-shrink-0 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              ))}
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}