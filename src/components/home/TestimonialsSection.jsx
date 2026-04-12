import React, { useState } from "react";
import { reviews } from "../../data/homeFeatures";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const currentReview = reviews[currentIndex];

  return (
    <section className="w-full py-20 flex justify-center font-['Montserrat'] bg-brand-sand">
      <div className="w-full max-w-[980px] px-layout-gap mx-auto">
        
        <h2 className="text-body font-medium text-brand-black mb-8 tracking-widest text-center uppercase">
          Що говорять клієнти
        </h2>

        <div className="relative flex items-center justify-center min-h-[300px]">
          
          {/* Ліва кнопка + Правильний Focus-visible */}
          <button
            onClick={handlePrev}
            aria-label="Попередній відгук"
            className="
              absolute -left-2 tablet:left-4 z-10 w-10 h-10 tablet:w-12 tablet:h-12 
              flex items-center justify-center rounded-full bg-black/5 
              hover:bg-black/10 transition-colors 
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F0EB]
            "
          >
            <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-black">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>

          {/* Контент відгуку + aria-live="polite" */}
          <div 
            key={currentReview.id} 
            aria-live="polite"
            className="flex flex-col items-center text-center px-12 tablet:px-20 max-w-[660px] animate-fade-in-up"
          >
            <h3 className="text-body text-brand-black mb-6">
              {currentReview.title}
            </h3>
            
            <p className="text-body leading-[1.4] text-brand-black mb-8">
              {currentReview.text}
            </p>
            
            {/* 5 Зірочок */}
            <div className="flex gap-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <svg aria-hidden="true" key={i} width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-brand-gold">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>

            <span className="text-body text-brand-black">
              {currentReview.author}
            </span>
          </div>

          {/* Права кнопка + Правильний Focus-visible */}
          <button
            onClick={handleNext}
            aria-label="Наступний відгук"
            className="
              absolute right-0 tablet:right-4 z-10 w-10 h-10 tablet:w-12 tablet:h-12 
              flex items-center justify-center rounded-full bg-black/5 
              hover:bg-black/10 transition-colors 
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F0EB]
            "
          >
            <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-black">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>

        </div>
      </div>
    </section>
  );
}