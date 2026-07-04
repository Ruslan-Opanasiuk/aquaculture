import React from "react";
import FadeImage from "../FadeImage";
// ❗ Заміни на .webp формат, коли оптимізуєш графіку
import atmosphericHero from "../../assets/images/001.png";

export default function AtmosphericBanner() {
  return (
    <section className="relative w-full h-vh-stable flex justify-center">
      <div className="absolute left-0 right-0 bottom-0 top-[80px] p-2.5"> 

        
        <div className="relative w-full h-full overflow-hidden rounded-2xl bg-brand-dark/10">
          
          <FadeImage
            src={atmosphericHero}
            alt="Естетика та смак"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-[32%_50%]"
          />

          <div
            className="absolute inset-0 bg-brand-dark/45"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="relative z-10 w-full h-[calc(100%-80px)] mt-[80px]">
        <div className="w-full h-full px-layout-gap mx-auto max-content flex flex-col items-center justify-center">
          {/* Контент */}
        </div>
      </div>
    </section>
  );
}