import React from "react";
// ❗ Заміни на .webp формат перед релізом
import logotest from "../../assets/images/fora.png";

export default function PartnersSection() {
  return (
    <section className="w-full py-20 flex flex-col items-center">
      
      <h2 className="text-body font-medium text-brand-black mb-10 tablet:mb-14 tracking-widest uppercase text-center">
        Нам довіряють
      </h2>
      
      <div className="w-full max-w-[940px] px-layout-gap mx-auto relative overflow-hidden group">
        <div className="flex w-max items-center animate-marquee will-change-transform">
        
          <div className="flex items-center gap-10 tablet:gap-20 pr-10 tablet:pr-20 justify-around flex-shrink-0">
            {[1, 2, 3, 4, 5].map((index) => (
              <img 
                key={`original-${index}`}
                src={logotest}
                width="200"
                height="59"
                alt={`Партнер ${index}`}
                loading="lazy"
                className="h-9 tablet:h-12 w-auto max-w-none flex-shrink-0 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"
              />
            ))}
          </div>

          <div 
            className="flex items-center gap-10 tablet:gap-20 pr-10 tablet:pr-20 justify-around flex-shrink-0"
            aria-hidden="true"
          >
            {[1, 2, 3, 4, 5].map((index) => (
              <img 
                key={`duplicate-${index}`}
                src={logotest}
                width="200"
                height="59"
                alt={`Партнер копія ${index}`}
                loading="lazy"
                className="h-9 tablet:h-12 w-auto max-w-none flex-shrink-0 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}