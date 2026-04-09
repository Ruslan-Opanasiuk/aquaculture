import React from "react";

export default function FeatureGrid({
  title,
  bodyText,
  columns = 3,
  items = [],
}) {
  const desktopColsClass = {
    2: "desktop:grid-cols-2",
    3: "desktop:grid-cols-3",
    4: "desktop:grid-cols-4",
  }[columns] || "desktop:grid-cols-3";

  return (
    <section className="w-full py-[80px] flex justify-center font-['Montserrat'] bg-brand-beige">
      <div className="w-full max-content px-layout-gap mx-auto">
        <div className="flex flex-col items-center text-center mb-[60px]">
          {title && (
            <h2 className="text-h3 font-semibold text-brand-black mb-4">
              {title}
            </h2>
          )}
          {bodyText && (
            <p className="text-body text-brand-black max-w-[660px]">
              {bodyText}
            </p>
          )}
        </div>

        <div 
          className={`
            grid 
            grid-cols-1 
            tablet:grid-cols-2 
            ${desktopColsClass} 
            gap-x-[40px] 
            gap-y-[60px] 
            tablet:gap-y-[80px]
          `}
        >
          {items.map((item, index) => (
            <div 
              key={item.id || index} 
              className="flex flex-col items-center text-center group"
            >
              {/* ЗМІНЕНО: Додано isolation-isolate 
                Це фіксить блимання білого фону при scale анімації
              */}
              <div className="w-[200px] h-[200px] mb-6 relative transition-transform duration-500 ease-out group-hover:scale-110 isolation-isolate">
                <img 
                  src={item.imageSrc} 
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-contain mix-blend-multiply grayscale contrast-[1.2] brightness-[1.1]"
                />
              </div>
              
              <h3 className="text-body font-medium text-brand-black mb-3">
                {item.title}
              </h3>
              
              {item.description && (
                <p className="text-body-small text-brand-black max-w-[200px]">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}