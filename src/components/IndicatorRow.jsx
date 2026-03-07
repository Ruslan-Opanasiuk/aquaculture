// src/components/IndicatorRow.jsx

export default function IndicatorRow({ label, leftLabel, rightLabel, value = 3 }) {
  const total = 5;

  return (
    <div className="flex items-center font-['Montserrat'] py-2">
      
      {/* 1. КОЛОНКА: НАЗВА
         w-[120px] — ширина, достатня для слова "ПРУЖНІСТЬ".
         shrink-0 — забороняємо стискатися.
      */}
      <span
        className="font-medium text-[#121212]/75 uppercase tracking-wider w-[120px] shrink-0"
        style={{ fontSize: "var(--body-small-font-size)" }}
      >
        {label}
      </span>

      {/* 2. КОЛОНКА: ЛІВИЙ ТЕКСТ
         w-[70px] — фіксована ширина для вирівнювання.
         text-right — притискаємо текст до крапок.
      */}
      <span
        className="text-right text-black/60 whitespace-nowrap w-[70px] shrink-0"
        style={{ fontSize: "var(--body-font-size)" }}
      >
        {leftLabel}
      </span>

      {/* 3. КОЛОНКА: КРАПКИ
         w-[80px] — фіксована ширина контейнера для крапок.
         justify-center — центруємо крапки всередині цих 80px.
         mx-3 — безпечні відступи зліва і справа.
      */}
      <div className="flex justify-center gap-[6px] w-[80px] shrink-0 mx-3">
        {[...Array(total)].map((_, i) => (
          <div
            key={i}
            className="rounded-full shrink-0"
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: i < value ? "#DAC284" : "rgba(218, 194, 132, 0.3)",
            }}
          ></div>
        ))}
      </div>

      {/* 4. КОЛОНКА: ПРАВИЙ ТЕКСТ */}
      <span
        className="text-left text-black/60 whitespace-nowrap"
        style={{ fontSize: "var(--body-font-size)" }}
      >
        {rightLabel}
      </span>
      
    </div>
  );
}