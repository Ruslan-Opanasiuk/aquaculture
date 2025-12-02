import { cardFonts } from "../theme/fontSizes";
import { indicatorSizes } from "../theme/sizes";

function IndicatorRow({ label, leftLabel, rightLabel, value = 3 }) {

  const total = 5;

  return (
    <div className="w-full flex items-center justify-between">

      {/* Назва параметра */}
      <span
        className="font-['Montserrat'] font-semibold text-[#121212]/75 uppercase"
        style={{ fontSize: cardFonts.indicator }}
      >
        {label}
      </span>

      {/* Права частина */}
      <div
        className="flex items-center justify-between"
        style={{ width: indicatorSizes.rightBlock }}
      >

        {/* Лівий опис */}
        <span
          className="font-['Montserrat'] font-light uppercase text-right"
          style={{
            width: indicatorSizes.sideLabel,
            fontSize: cardFonts.indicator,
          }}
        >
          {leftLabel}
        </span>

        {/* Кружечки */}
        <div
          className="flex justify-center"
          style={{
            width: indicatorSizes.sideLabel,
            gap: indicatorSizes.dotsGap,
          }}
        >
          {[...Array(total)].map((_, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: indicatorSizes.dotSize,
                height: indicatorSizes.dotSize,
                backgroundColor:
                  i < value ? "#DAC284" : "rgba(218, 194, 132, 0.5)",
              }}
            ></div>
          ))}
        </div>

        {/* Правий опис */}
        <span
          className="font-['Montserrat'] font-light uppercase text-left"
          style={{
            width: indicatorSizes.sideLabel,
            fontSize: cardFonts.indicator,
          }}
        >
          {rightLabel}
        </span>

      </div>
    </div>
  );
}

export default IndicatorRow;
