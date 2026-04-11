import React from "react";
// Тимчасовий імпорт фото. Заміни на свій файл.
import atmosphericHero from "../assets/images/001.png";

export default function AtmosphericBanner() {
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
          left-0
          right-0
          bottom-0
          top-[80px]
          p-[10px]
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
            src={atmosphericHero}
            alt="Естетика та смак"
            fetchPriority="high"
            className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
              object-[32%_50%]
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
            w-full
            h-full
            px-layout-gap
            mx-auto
            max-content
            flex
            flex-col
            items-center
            justify-center
          "
        >
          {/* <div
            className="
              max-w-[754px]
              mx-auto
              flex
              flex-col
              items-center
              text-center
              text-brand-beige
            "
          >
            <h2
              className="
                font-['Montserrat']
                font-medium
                leading-[0.95]
                mb-6
                text-h3
              "
            >
              Справжнє мистецтво смаку
            </h2>

            <p
              className="
                font-['Montserrat']
                leading-[1.5]
                text-brand-beige
                text-body
              "
            >
              Кожна банка нашої ікри — це результат безкомпромісного відбору, 
              поваги до природи та збереження багаторічних традицій.
            </p>
          </div> */}
        </div>
      </div>
    </section>
  );
}