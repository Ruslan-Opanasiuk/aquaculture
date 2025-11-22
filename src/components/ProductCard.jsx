import IndicatorRow from "./IndicatorRow";

function ProductCard({
  image,
  name,
  description,
  price,
  cardBg,
  indicators = [],
  isActive = false, // Новий пропс для активації
}) {
  
  // Класи для керування рухом контенту (слайд вгору)
  const contentTranslate = isActive 
    ? '-translate-y-[7.484cqh]' 
    : 'translate-y-0';

  // Класи для керування масштабуванням фото
  const imageScale = isActive 
    ? 'scale-105' 
    : 'scale-100';
    
  // Класи для керування прозорістю індикаторів
  const indicatorsOpacity = isActive
    ? 'opacity-100'
    : 'opacity-0';

  return (
    <div
      className="
        group relative w-full aspect-[405/628] rounded-[12px] 
        overflow-hidden cursor-pointer
        container-type-size
      "
      style={{ backgroundColor: cardBg }}
    >
      {/* Внутрішній блок, що плавно рухається */}
      <div
        className={`
          absolute left-0 w-full flex flex-col items-center 
          will-change-transform transition-transform duration-500 ease-out 
          px-[8.88cqw]
          
          /* isActive або group-hover керують рухом вгору */
          ${contentTranslate}
          group-hover:-translate-y-[7.484cqh] 
        `}
      >
        {/* Фото */}
        <div
          className={`
            mt-[13.217cqh] w-full aspect-square overflow-hidden
            transition-transform duration-500 ease-out
            
            /* isActive або group-hover керують масштабуванням */
            ${imageScale}
            group-hover:scale-105
          `}
        >
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Назва (без змін) */}
        <h2 
            className="
                mt-[1.27cqh] 
                text-[clamp(1.8125rem,10.37cqi,2.8125rem)]
                font italic font-['Cormorant_Garamond']
            "
        >
          {name}
        </h2>

        {/* Опис */}
        <p 
            className="
                mt-[1.23cqh] 
                text-[clamp(0.5rem,2.96cqi,0.8125rem)]
                font-light font-['Montserrat'] whitespace-pre-line text-center leading-[1.3]
            "
        >
          {description}
        </p>
        
        {/* Ціна */}
        <p 
            className="
                mt-[1.98cqh] 
                text-[clamp(0.5rem,2.96cqi,0.8125rem)]
                font-semibold font-['Montserrat']
            "
        >
          від ₴ {price}.00
        </p>
      </div>

      {/* 2. Блок індикаторів */}
      <div
        className={`
          absolute left-0 bottom-[5cqh] w-full 
          transition-opacity duration-500 ease-out delay-100
          px-[8.88cqw]
          flex flex-col items-center gap-[2.3885cqh]
          
          /* isActive або group-hover керують видимістю */
          ${indicatorsOpacity}
          group-hover:opacity-100
        `}
      >
        {/* Роздільча лінія */}
        <div className="w-full h-[0.5px] bg-[#DAC284]" />

        {/* Індикатори (динамічний список) */}
        <div className="w-full flex flex-col gap-[1.2739cqh]">
          {indicators.map((indicator) => (
            <IndicatorRow
              key={indicator.label}
              label={indicator.label}
              leftLabel={indicator.leftLabel}
              rightLabel={indicator.rightLabel}
              value={indicator.value}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;