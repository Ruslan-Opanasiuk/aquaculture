import React, { useState } from "react";
import { reviews } from "../../data/homeFeatures";
import ActionArrowButton from "../ActionArrowButton";

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
        
        <h2 className="text-body font-medium text-brand-dark mb-8 tracking-widest text-center uppercase">
          Що говорять клієнти
        </h2>

        <div className="relative flex items-center justify-center min-h-[300px]">
          
          {/* Ліва кнопка */}
          <ActionArrowButton
            onClick={handlePrev}
            ariaLabel="Попередній відгук"
            direction="left"
            tone="subtle"
            ringOffsetClassName="focus-visible:ring-offset-[#F4F0EB]"
            className="absolute -left-2 tablet:left-4 z-10"
          />

          {/* Контент відгуку + aria-live="polite" */}
          <div 
            key={currentReview.id} 
            aria-live="polite"
            className="flex flex-col items-center text-center px-12 tablet:px-20 max-w-[660px] animate-fade-in-up"
          >
            <h3 className="text-body text-brand-dark mb-6">
              {currentReview.title}
            </h3>
            
            <p className="text-body leading-[1.4] text-brand-dark mb-8">
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

            <span className="text-body text-brand-dark">
              {currentReview.author}
            </span>
          </div>

          {/* Права кнопка */}
          <ActionArrowButton
            onClick={handleNext}
            ariaLabel="Наступний відгук"
            direction="right"
            tone="subtle"
            ringOffsetClassName="focus-visible:ring-offset-[#F4F0EB]"
            className="absolute right-0 tablet:right-4 z-10"
          />

        </div>
      </div>
    </section>
  );
}