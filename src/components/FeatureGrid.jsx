import React from "react";

export default function FeatureGrid({
  title,
  bodyText,
  columns = 3,
  items = [],
}) {
  const desktopColsClass = columns === 2 ? "tablet:grid-cols-2" : "tablet:grid-cols-3";

  return (
    <section className="w-full mt-[80px] flex justify-center font-['Montserrat']">
      <div className="w-full max-w-[980px] px-layout-gap mx-auto">
        <div className="flex flex-col items-center text-center mb-[64px]">
          {title && (
            <h2 className="text-body font-medium text-brand-black mb-8 tracking-widest">
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
            grid-cols-2
            ${desktopColsClass}
            gap-x-4 tablet:gap-x-[40px]
            gap-y-[50px] tablet:gap-y-[40px]
          `}
        >
          {items.map((item, index) => (
            <div 
              key={item.id || index} 
              className="flex flex-col items-center text-center group w-full"
            >
              {/* 1) Адаптивне фото: відсотки + aspect-square замість фіксованих пікселів */}
              <div className="w-[100%] tablet:w-[70%] aspect-square mb-4 tablet:mb-6 relative transition-transform duration-500 ease-out group-hover:scale-110 isolation-isolate">
                <img 
                  src={item.imageSrc} 
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-contain mix-blend-multiply grayscale contrast-[1.2] brightness-[1.1]"
                />
              </div>
              
              <h3 className="text-body font-medium text-brand-black mb-2 tablet:mb-3">
                {item.title}
              </h3>
              
              {item.description && (
                <p className="text-body text-brand-black ">
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