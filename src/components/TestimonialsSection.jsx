import React, { useState } from "react";

// Три штучні відгуки
const reviews = [
  {
    id: 1,
    title: "Неймовірний смак",
    text: "Це найкраща ікра, яку ми коли-небудь їли за цю ціну! Не можна повірити глибині смаку. Ця ікра є зіркою, їсти її прямо з банки – це досвід, який варто отримати!",
    author: "Олександр М.",
  },
  {
    id: 2,
    title: "Ідеально для свята",
    text: "Замовляли чорну ікру на ювілей. Якість пакування і швидкість доставки приємно вразили. Смак дуже ніжний, ікринки одна до одної. Гості були в захваті.",
    author: "Олена К.",
  },
  {
    id: 3,
    title: "Справжній преміум",
    text: "Довго шукав надійного постачальника. Ця ікра дійсно без компромісів. Чудова текстура і той самий автентичний післясмак. Рекомендую всім поціновувачам.",
    author: "Дмитро В.",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Функції для перемикання
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const currentReview = reviews[currentIndex];

  return (
    <section className="w-full py-[64px] flex justify-center font-['Montserrat'] bg-brand-sand">
      <div className="w-full max-w-[980px] px-layout-gap mx-auto">
        
        {/* Головний заголовок секції */}
        <h2 className="text-body font-medium text-brand-black mb-8 tracking-widest text-center uppercase">
          Що говорять клієнти
        </h2>

        {/* Контейнер каруселі */}
        <div className="relative flex items-center justify-center min-h-[300px]">
          
          {/* Ліва кнопка */}
          <button
            onClick={handlePrev}
            aria-label="Попередній відгук"
            className="absolute left-[-7px] z-10 w-10 h-10 tablet:w-12 tablet:h-12 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors focus:outline-none"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-black">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>

          {/* Контент відгуку */}
          <div 
            key={currentReview.id} 
            className="flex flex-col items-center text-center px-[50px] tablet:px-[80px] max-w-[660px] animate-fade-in-up"
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
                <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-brand-gold">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>

            <span className="text-body text-brand-black">
              {currentReview.author}
            </span>
          </div>

          {/* Права кнопка */}
          <button
            onClick={handleNext}
            aria-label="Наступний відгук"
            className="absolute right-0 tablet:right-4 z-10 w-10 h-10 tablet:w-12 tablet:h-12 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors focus:outline-none"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-black">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>

        </div>
      </div>
    </section>
  );
}