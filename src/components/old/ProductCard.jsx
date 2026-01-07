import IndicatorRow from "./IndicatorRow";
import { aspectRatio, cardSizes } from "../theme/sizes";
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

  // Керує зсувом всього контенту при hover
  const contentTranslate = isActive
    ? "-translate-y-[var(--hover-lift)]"  // активна картка піднімається
    : "translate-y-0";                    // звичайний стан

  // Масштабування фото при hover
  const imageScale = isActive
    ? "scale-100"   // легкий zoom
    : "scale-100";  // нормальний розмір

  // Прозорість нижнього блоку з індикаторами
  const indicatorsOpacity = isActive
    ? "opacity-100" // видно при активності
    : "opacity-0";  // сховано
  

  return (
    <div
      className="
        group                       /* група для group-hover */
        relative                    /* всередині є абсолютні елементи */
        w-full                      /* картка займає всю ширину контейнера */
        rounded-[12px]              /* радіус кутів */
        overflow-hidden             /* приховує вихід контенту */
        cursor-pointer              /* курсор — як кнопка */
        container-type-size         /* дозволяє використовувати cqi/cqh */
      "
      style={{
        backgroundColor: cardBg,    /* динамічний фон картки */
        aspectRatio: aspectRatio,   /* співвідношення сторін */
      }}
    >

      {/* Блок, який рухається вгору при hover */}
      <div
        className={`
          absolute                 /* розміщення поверх фону */
          left-0                   /* вирівнювання зліва */
          w-full                   /* на всю ширину */
          flex flex-col            /* вертикальна колонка */
          items-center             /* горизонтальне вирівнювання по центру */
          will-change-transform    /* оптимізація анімації */
          transition-transform     /* плавність руху */
          duration-500             /* тривалість 0.5s */
          ease-out                 /* плавне сповільнення */
          ${contentTranslate}      /* динамічний зсув блока */
          md:translate-y-0         /* на desktop без слайду */
          group-hover:-translate-y-[var(--hover-lift)] /* підняття при hover */
        `}
        style={{
          paddingLeft: cardSizes.paddingX,    /* відступи по боках */
          paddingRight: cardSizes.paddingX,
          "--hover-lift": cardSizes.hoverLift /* кастомна змінна для підняття */
        }}
      >

        {/* Фото продукту */}
        <div
          className={`
            aspect-square                /* квадратна область */
            overflow-hidden              /* обрізає zoom */
            transition-transform         /* плавне масштабування */
            duration-500 ease-out        /* анімація */
            ${imageScale}                /* динамічний scale */
            group-hover:scale-100        /* zoom при hover */
            md:scale-100                 /* на desktop без автозбільшення */
          `}
          style={{
            width: cardSizes.imageWidth,         /* розмір фото */  
            marginTop: cardSizes.imageMarginTop, /* відстань від верху */
          }}
        >
          <img
            src={image}
            alt={name}
            className="
              w-full             /* зображення заповнює контейнер */
              h-full             /* зберігає пропорції */
              object-cover       /* обрізання без спотворення */
            "
          />
        </div>

        {/* Назва продукту */}
        <h2
          className="
            font italic                        /* курсивний serif */
            font-['Cormorant_Garamond']        /* брутальний преміальний шрифт */
          "
          style={{
            marginTop: cardSizes.titleMarginTop, /* відступ до назви */
            fontSize: cardFonts.title,           /* адаптивний розмір */
          }}
        >
          {name}
        </h2>

        {/* Опис */}
        <p
          className="
            font-light                      /* легка товщина */
            font-['Montserrat']             /* чистий сучасний шрифт */
            whitespace-pre-line             /* зберігає перенос рядків */
            text-center                     /* вирівнювання по центру */
            leading-[1.225]                 /* міжрядковий інтервал */
          "
          style={{
            marginTop: cardSizes.descriptionMarginTop, /* відступ */
            fontSize: cardFonts.subtitle,               /* токен */
          }}
        >
          {description}
        </p>

        {/* Ціна */}
        <p
          className="
            font-semibold               /* жирний для акценту */
            font-['Montserrat']         /* консистентний шрифт */
          "
          style={{
            marginTop: cardSizes.priceMarginTop, /* відступ */
            fontSize: cardFonts.price,           /* розмір */
          }}
        >
          від ₴ {price}.00
        </p>

      </div>

      {/* Блок індикаторів (зʼявляється при активності) */}
      <div
        className={`
          absolute left-0 w-full               /* позиція та ширина */
          transition-opacity duration-500      /* плавна поява */
          ease-out delay-100                   /* легка затримка */
          flex flex-col items-center           /* вертикальне вирівнювання */
          ${indicatorsOpacity}                 /* динамічна прозорість */
          group-hover:opacity-100              /* показ на hover */
          md:opacity-0                         /* приховано на desktop */
        `}
        style={{
          bottom: cardSizes.overlayBottom,     /* відступ знизу */
          paddingLeft: cardSizes.paddingX,     /* бокові відступи */
          paddingRight: cardSizes.paddingX,
          gap: cardSizes.lineBottom,           /* відступ між лінією та індикаторами */
        }}
      >

        {/* Лінія-розділювач */}
        <div
          className="
            w-full           /* на всю ширину */
            h-[1px]          /* тонка лінія */
            bg-[#DAC284]     /* брендований колір */
          "
        />

        {/* Самі індикатори */}
        <div
          className="
            w-full            /* розтягується на ширину */
            flex flex-col     /* колонка */
          "
          style={{
            gap: cardSizes.overlayGap, /* інтервал між рядками індикаторів */
          }}
        >
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
