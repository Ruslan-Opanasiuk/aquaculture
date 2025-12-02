import IndicatorRow from "./IndicatorRow";
import { aspectRatio, cardSizes} from "../theme/sizes";
import { cardFonts } from "../theme/fontSizes";

function ProductCard({
  image,
  name,
  description,
  price,
  cardBg,
  indicators = [],
  isActive = false, 
}) {
  
  // Класи для керування рухом контенту (слайд вгору)
  const contentTranslate = isActive 
    ? '-translate-y-[var(--hover-lift)]' 
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
          group relative w-full rounded-[12px] 
          overflow-hidden cursor-pointer
          container-type-size
        "
        style={{ 
          backgroundColor: cardBg,
          aspectRatio: aspectRatio
        }}
      >
      {/* Внутрішній блок, що плавно рухається */}
      <div
        className={`
          absolute left-0 w-full flex flex-col items-center 
          will-change-transform transition-transform duration-500 ease-out 
          ${contentTranslate}
          md:translate-y-0
          group-hover:-translate-y-[var(--hover-lift)]
        `}
        style={{
          paddingLeft: cardSizes.paddingX,
          paddingRight: cardSizes.paddingX,
          "--hover-lift": cardSizes.hoverLift
        }}
      >
        {/* Фото */}
        <div
          className={`
            w-full aspect-square overflow-hidden
            transition-transform duration-500 ease-out
            
            ${imageScale}
            group-hover:scale-105
            md:scale-100
          `}
          style={{
            marginTop: cardSizes.imageMarginTop,
          }}
        >
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Назва */}
        <h2 
          className="
            font italic font-['Cormorant_Garamond']
          "
          style={{
            marginTop: cardSizes.titleMarginTop,
            fontSize: cardFonts.title,
          }}
        >
          {name}
        </h2>

        {/* Опис */}
        <p
          className="
            font-light font-['Montserrat'] whitespace-pre-line text-center leading-[1.3]
          "
          style={{
            marginTop: cardSizes.descriptionMarginTop,
            fontSize: cardFonts.subtitle,
          }}
        >
          {description}
        </p>
        
        {/* Ціна */}
        <p
          className="
            font-semibold font-['Montserrat']
          "
          style={{
            marginTop: cardSizes.priceMarginTop,
            fontSize: cardFonts.price,
          }}
        >
          від ₴ {price}.00
        </p>
      </div>

      {/* 2. Блок індикаторів */}
      <div
        className={`
          absolute left-0 w-full 
          transition-opacity duration-500 ease-out delay-100
          flex flex-col items-center

          ${indicatorsOpacity}    
          group-hover:opacity-100  
          md:opacity-0           
        `}
        style={{
          bottom: cardSizes.overlayBottom,
          paddingLeft: cardSizes.paddingX,
          paddingRight: cardSizes.paddingX,
          gap: cardSizes.lineBottom,
        }}
      >

        
        {/* Роздільча лінія */}
        <div className="w-full h-[1px] bg-[#DAC284]" />

        {/* Індикатори (динамічний список) */}
        <div className="
          w-full flex flex-col
        "
        style={{
            gap: cardSizes.overlayGap,
          }}>
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