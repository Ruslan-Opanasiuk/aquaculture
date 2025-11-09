function IndicatorRow({ label, leftLabel, rightLabel, value = 3 }) {
  const total = 5;

  return (
    <div className="w-[340px] flex items-center justify-between">
      {/* Назва параметра */}
      <span className="font-['Montserrat'] font-semibold text-[11px] text-[#121212]/75 uppercase">
        {label}
      </span>

      {/* Права частина */}
      <div className="flex items-center justify-between w-[200px]">
        {/* Лівий опис */}
        <span className="w-[60px] text-[11px] font-['Montserrat'] font-normal uppercase text-right">
          {leftLabel}
        </span>

        {/* Кружечки */}
        <div className="flex justify-center gap-[4px] w-[60px]">
          {[...Array(total)].map((_, i) => (
            <div
              key={i}
              className="w-[8px] h-[8px] rounded-full"
              style={{
                backgroundColor:
                  i < value ? "#DAC284" : "rgba(218, 194, 132, 0.5)",
              }}
            ></div>
          ))}
        </div>

        {/* Правий опис */}
        <span className="w-[60px] text-[11px] font-['Montserrat'] font-normal uppercase text-left">
          {rightLabel}
        </span>
      </div>
    </div>
  );
}

export default IndicatorRow;
