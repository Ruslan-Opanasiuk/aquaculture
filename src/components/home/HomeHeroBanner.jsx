import React from "react";
import { Link } from "react-router-dom";
import FadeImage from "../FadeImage";
import heroDesktop1x from "../../assets/images/optimized/banners/home-hero-desktop-768.webp";
import heroDesktop2x from "../../assets/images/optimized/banners/home-hero-desktop-1536.webp";
import heroMobile1x from "../../assets/images/optimized/banners/home-hero-mobile-450.webp";
import heroMobile2x from "../../assets/images/optimized/banners/home-hero-mobile-900.webp";

export default function HomeHeroBanner() {
  return (
    <section className="relative w-full h-vh-stable flex justify-center">
      <div className="absolute inset-0 p-2.5 mt-[80px]">
        <div className="relative w-full h-full overflow-hidden rounded-2xl">
          <picture className="absolute inset-0 w-full h-full block">
            <source
              media="(min-width: 1024px)"
              srcSet={`${heroDesktop1x} 1x, ${heroDesktop2x} 2x`}
            />
            <FadeImage
              src={heroMobile1x}
              srcSet={`${heroMobile1x} 1x, ${heroMobile2x} 2x`}
              alt="Преміальна червона та чорна ікра"
              fetchPriority="high"
              className="w-full h-full object-cover object-center desktop:object-[78%_50%]"
            />
          </picture>

        </div>
      </div>

      <div className="relative z-10 w-full h-[calc(100%-80px)] mt-[80px]">
        <div className="relative w-full h-full px-layout-gap mx-auto max-content">
          <div className="
              absolute
              w-full
              max-w-[800px]
              flex
              flex-col
              items-center
              text-center
              text-brand-beige
              top-[83%]
              left-1/2
              -translate-x-1/2
              -translate-y-1/2
              desktop:top-[50%]
              desktop:left-[20%]
            "
          >
            <h1
              className="font-['Montserrat'] font-medium leading-[0.95] mb-6"
              style={{ fontSize: "clamp(1.5rem, 12.8vw, var(--h2-font-size))" }}
            >
              Ікра без <br /> компромісів
            </h1>

            <Link
              to="/catalog"
              className="
                inline-flex
                items-center
                justify-center
                rounded-full
                px-6
                min-h-[44px]
                font-['Montserrat']
                bg-brand-beige
                text-brand-dark
                hover:opacity-90
                transition-opacity
                text-body
                focus-visible:ring-2
                focus-visible:ring-brand-gold
                focus-visible:ring-offset-2
                focus-visible:ring-offset-brand-dark
                focus-visible:outline-none
              "
            >
              Перейти до каталогу
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}