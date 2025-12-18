import { cardFonts } from "../theme/fontSizes";
import { indicatorSizes } from "../theme/sizes";

function IndicatorRow({ label, leftLabel, rightLabel, value = 3 }) {

  const total = 5; // кількість кружечків-індикаторів

  return (
    <div
      className="
        w-full                 /* рядок займає всю доступну ширину */
        flex items-center      /* вирівнюємо елементи по центру по вертикалі */
        justify-between        /* розкидуємо текст зліва і правий блок по краях */
      "
    >

      {/* Назва параметра (лівий текст) */}
      <span
        className="
          font-['Montserrat']          /* шрифт */
          font-medium                  /* жирність */
          text-[#121212]/75            /* колір */
          uppercase                    /* усі літери великі */
        "
        style={{
          fontSize: cardFonts.indicator,  /* розмір шрифту — дизайн-токен */
        }}
      >
        {label}
      </span>

      {/* Права частина (лівий опис + індикатори + правий опис) */}
      <div
        className="
          flex items-center justify-between   /* елементи в один ряд, з рівним розподілом */
        "
        style={{
          width: indicatorSizes.rightBlock,   /* загальна ширина групи справа */
        }}
      >

        {/* Лівий опис */}
        <span
          className="
            font-['Montserrat']          /* шрифт */
            text-right                   /* вирівнювання тексту праворуч */
          "
          style={{
            width: indicatorSizes.sideLabel,      /* фіксована ширина, щоб нічого не стрибало */
            fontSize: cardFonts.indicator,        /* розмір шрифту */
          }}
        >
          {leftLabel}
        </span>

        {/* Кружечки-індикатори */}
        <div
          className="
            flex justify-center         /* рівне положення кружечків у своїй області */
          "
          style={{
            width: indicatorSizes.dotsBlock,  /* така ж ширина, щоб три блоки були симетричні */
            gap: indicatorSizes.dotsGap,      /* відстань між кружечками */
          }}
        >
          {[...Array(total)].map((_, i) => (
            <div
              key={i}
              className="
                rounded-full             /* робить елемент ідеальним кругом */
              "
              style={{
                width: indicatorSizes.dotSize,   /* діаметр кружечка */
                height: indicatorSizes.dotSize,  /* діаметр кружечка */
                backgroundColor:
                  i < value                   /* заповнення залежить від value */
                    ? "#DAC284"               /* активний кружечок */
                    : "rgba(218, 194, 132, 0.5)",  /* пасивний кружечок */
              }}
            ></div>
          ))}
        </div>

        {/* Правий опис */}
        <span
          className="
            font-['Montserrat']          /* шрифт */
            text-left                    /* текст вирівняний ліворуч */
          "
          style={{
            width: indicatorSizes.sideLabel,   /* фіксована ширина */
            fontSize: cardFonts.indicator,     /* розмір шрифту */
          }}
        >
          {rightLabel}
        </span>

      </div>
    </div>
  );
}

export default IndicatorRow;
