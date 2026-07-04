import React from "react";

export default function FeatureGrid({
  title,
  bodyText,
  columns = 3,
  items = [],
}) {
  const desktopColsClass = columns === 2 ? "tablet:grid-cols-2" : "tablet:grid-cols-3";

  return (
    <section className="w-full flex justify-center font-['Montserrat']">
      <div className="w-full max-w-[980px] px-layout-gap mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          {title && (
            <h2 className="text-body font-medium text-brand-dark mb-8 tracking-widest uppercase">
              {title}
            </h2>
          )}
          {bodyText && (
            <p className="text-body text-brand-dark max-w-[660px] leading-relaxed">
              {bodyText}
            </p>
          )}
        </div>

        <div 
          className={`
            grid 
            grid-cols-2
            ${desktopColsClass}
            gap-x-4 tablet:gap-x-10
            gap-y-[50px] tablet:gap-y-16
          `}
        >
          {items.map((item, index) => (
            <div 
              key={item.id || index} 
              className="relative flex flex-col items-center text-center group w-full isolation-isolate"
            >
              {/* Контейнер іконки з aspect-square для запобігання CLS */}
              <div className="w-[100%] tablet:w-[70%] aspect-square mb-4 tablet:mb-6 relative transition-transform duration-500 ease-out group-hover:scale-105 isolation-isolate rounded-2xl overflow-hidden">
                {item.images && (
                  <img 
                    src={item.images.src1x} 
                    srcSet={`${item.images.src1x} 1x, ${item.images.src2x} 2x`}
                    alt={item.title}
                    loading="lazy"
                    width="256"
                    height="256"
                    className="w-full h-full object-contain mix-blend-multiply grayscale contrast-[1.2] brightness-[1.1] p-4"
                  />
                )}
              </div>
              
              <h3 className="text-body font-medium text-brand-dark mb-2 tablet:mb-3 px-2">
                {item.title}
              </h3>
              
              {item.description && (
                <p className="text-body text-brand-dark opacity-80 px-2">
                  {item.description}
                </p>
              )} 

              {/* Декоративна лінія знизу при ховері */}
              <div className="
                  absolute 
                  -bottom-4 
                  left-0 
                  w-full 
                  h-[2px] 
                  rounded-full
                  bg-brand-gold 
                  scale-x-0 
                  opacity-0 
                  transition-all 
                  duration-500 
                  ease-out 
                  origin-center
                  group-hover:scale-x-[0.3] 
                  group-hover:opacity-100
              " />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}