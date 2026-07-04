import React from "react";
import { Link } from "react-router-dom"; 

// Компоненти з підпапки home
import HomeHeroBanner from "../components/home/HomeHeroBanner"; 
import AtmosphericBanner from "../components/home/AtmosphericBanner"; 
import TestimonialsSection from "../components/home/TestimonialsSection";
import PartnersSection from "../components/home/PartnersSection";
import FeatureGrid from "../components/home/FeatureGrid";
import CatalogSection from "../components/CatalogSection";
import FadeImage from "../components/FadeImage";

import { brandFeatures, collaborationFeatures } from "../data/homeFeatures";

// Нові оптимізовані фото для вступного блоку
import introImage1x from "../assets/images/home_grid/main-256.webp"; 
import introImage2x from "../assets/images/home_grid/main-512.webp"; 

import SEO from "../components/SEO";
import { SEO_PAGES } from "../data/seoConfig";

export default function Home() {
  
  const bestsellers = ["chavicha", "shchuka", "beluga"];

  return (
    <>
    <SEO {...SEO_PAGES.home} />

    <main className="min-h-screen flex flex-col font-['Montserrat'] bg-brand-beige pb-20">

      <HomeHeroBanner />
      
      {/* ВСТУПНИЙ БЛОК | mt-20 (80px) */}
      <section className="mt-20 flex flex-col items-center">
        {/* mb-10 (40px) */}
        <div className="w-full max-w-[980px] px-layout-gap mx-auto mb-10 flex justify-center">
          <FadeImage
            src={introImage1x}
            srcSet={`${introImage1x} 1x, ${introImage2x} 2x`}
            alt="Вступне фото: Aquaculture Selection"
            className="h-[250px] w-auto object-contain mix-blend-multiply"
            width="256"
            height="250"
          />
        </div>
        <div className="flex flex-col items-center text-center px-layout-gap">
          <h2 className="text-body font-medium text-brand-dark mb-8 tracking-widest uppercase">
            ІКРА, ЯКУ ОБИРАЮТЬ ЗА РЕЗУЛЬТАТ
          </h2>
          <p className="text-body text-brand-dark max-w-[660px] leading-relaxed">
            Ми працюємо з перевіреними постачальниками та відбираємо ікру за її природними характеристиками — смаком, текстурою та свіжістю. Без зайвої обробки. Лише продукт, який відповідає своєму походженню.
          </p>
        </div>
      </section>

      {/* БЕСТСЕЛЕРИ | mt-32 (128px) */}
      <section className="mt-32 flex flex-col items-center w-full">
        <h2 className="text-body font-medium text-brand-dark mb-8 tracking-widest text-center uppercase">
          ЛІДЕРИ ПРОДАЖІВ
        </h2>
        <CatalogSection id="bestsellers" products={bestsellers} />
      </section>

      {/* НАШІ ПЕРЕВАГИ | mt-20 (80px) */}
      <div className="mt-20">
        <FeatureGrid 
          title="НАШІ ПЕРЕВАГИ"
          bodyText="Ікра — це походження, відбір і точність на кожному етапі. Ми контролюємо кожен із них, щоб ви отримували стабільний результат."
          columns={3}
          items={brandFeatures}
        />
      </div>

      <AtmosphericBanner />

      {/* ДЛЯ КОГО ПРАЦЮЄМО | mt-20 (80px) */}
      <div className="mt-20">
        <FeatureGrid 
          title="ДЛЯ КОГО І ЯК МИ ПРАЦЮЄМО"
          bodyText="Ми співпрацюємо з ресторанами, бізнесом і приватними клієнтами. Процес побудований так, щоб ви швидко отримували потрібний результат — від запиту до доставки."
          columns={3}
          items={collaborationFeatures}
        />
      </div>

      {/* CTA БЛОК | mt-32 (128px) */}
      <section className="mt-32 w-full flex flex-col items-center text-center px-layout-gap mx-auto max-w-[760px]">
        <h2 className="text-body font-medium text-brand-dark mb-6 tracking-widest uppercase">
          Зробіть свій вибір
        </h2>
        
        <p className="text-body text-brand-dark leading-relaxed mb-10 max-w-[600px]">
          Ми вже відібрали ікру з перевіреним походженням і стабільною якістю. Вам залишається обрати продукт, який відповідає вашій задачі.
        </p>

        <Link
          to="/catalog"
          className="
            inline-flex
            items-center
            justify-center
            rounded-full
            px-10
            min-h-[52px]
            font-['Montserrat']
            bg-brand-dark
            text-brand-beige
            hover:opacity-90
            active:scale-95
            transition-all
            text-body
            focus-visible:ring-2
            focus-visible:ring-brand-gold
            focus-visible:ring-offset-2
            focus-visible:ring-offset-brand-beige
            focus-visible:outline-none
          "
        >
          Перейти до каталогу
        </Link>
      </section>

      {/* ВІДГУКИ | mt-20 (80px) */}
      <div className="mt-20">
        <TestimonialsSection />
      </div>

      {/* ПАРТНЕРИ */}
      <div className="mt-10">
        <PartnersSection />
      </div>

    </main>
  </>
  );
}