function IndicatorRow({ label, leftLabel, rightLabel, value = 3 }) {

  const total = 5;
  const fontSizeClass = "text-[clamp(0.5rem,2.72cqi,0.75rem)]"; 

  return (
    <div className="w-full flex items-center justify-between">
      
      {/* Назва параметра */}
      <span 
          className={`
              font-['Montserrat'] font-semibold 
              ${fontSizeClass}
              text-[#121212]/75 uppercase
          `}
      >
        {label}
      </span>

      {/* Права частина */}
      <div 
          className="flex items-center justify-between w-[49.38cqi]"
      >
        {/* Лівий опис */}
        <span 
            className={`
                w-[14.81cqi] 
                ${fontSizeClass}
                font-['Montserrat'] font-light uppercase text-right
            `}
        >
          {leftLabel}
        </span>

        {/* Кружечки */}
        <div 
            className="flex justify-center gap-[0.99cqi] w-[14.81cqi]"
        >
          {[...Array(total)].map((_, i) => (
            <div
              key={i}
              className="w-[1.98cqi] h-[1.98cqi] rounded-full" 
              style={{
                backgroundColor:
                  i < value ? "#DAC284" : "rgba(218, 194, 132, 0.5)",
              }}
            ></div>
          ))}
        </div>

        {/* Правий опис */}
        <span 
            className={`
                w-[14.81cqi] 
                ${fontSizeClass}
                font-['Montserrat'] font-light uppercase text-left
            `}
        >
          {rightLabel}
        </span>
      </div>
    </div>
  );
}

export default IndicatorRow;