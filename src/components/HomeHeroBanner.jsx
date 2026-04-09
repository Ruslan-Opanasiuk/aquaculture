import React from "react";
import { Link } from "react-router-dom"; 
import wholesaleHeroDesktop from "../assets/images/002.png"; 
import wholesaleHeroMobile from "../assets/images/003.png"; 

export default function HomeHeroBanner() {
  return (
    <section
      className="
        relative
        w-full
        h-screen
        flex
        justify-center
      "
    >
      <div
        className="
          absolute
          inset-0
          p-[10px]
          mt-[80px] 
        "
      >
        <div
          className="
            relative
            w-full
            h-full
            overflow-hidden
            rounded-[20px]
          "
        >
          <img
            src={wholesaleHeroMobile}
            alt="Преміальна червона та чорна ікра"
            fetchPriority="high"
            className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
              object-center
              block
              desktop:hidden
            "
          />

          <img
            src={wholesaleHeroDesktop}
            alt="Преміальна червона та чорна ікра"
            fetchPriority="high"
            className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
              object-[78%_50%]
              hidden
              desktop:block
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-black/45
            "
            aria-hidden="true"
          />
        </div>
      </div>

      <div
        className="
          relative
          z-10
          w-full
          h-[calc(100%-80px)]
          mt-[80px]
        "
      >
        <div
          className="
            relative
            w-full
            h-full
            px-layout-gap
            mx-auto
            max-content
          "
        >
          <div
            className="
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
            <h2
              className="
                font-['Montserrat']
                font-medium
                leading-[0.95]
                mb-6
                text-h2
              "
            >
              Ікра без <br /> компромісів
            </h2>

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
                text-brand-black
                hover:bg-brand-sand
                transition-colors
                text-body
                focus-visible:ring-2
                focus-visible:ring-brand-gold
                focus-visible:ring-offset-2
                focus-visible:ring-offset-black
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