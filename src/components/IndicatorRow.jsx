// src/components/IndicatorRow.jsx

export default function IndicatorRow({ label, leftLabel, rightLabel, value = 3 }) {
  const total = 5;

  return (
    // На вузьких телефонах не влазить в один рядок — ділимо на дві лінії
    // (назва / значення), з меншим відступом між ними, ніж між сусідніми
    // характеристиками (py-2 нижче). Від phone-wide — як було, один рядок.
    <div className="flex flex-col gap-1 phone-wide:flex-row phone-wide:items-center phone-wide:gap-0 font-['Montserrat'] py-2">

      {/* 1. НАЗВА
         w-[120px] — ширина, достатня для слова "ПРУЖНІСТЬ" (тільки від phone-wide).
      */}
      <span className="font-medium text-brand-dark/75 uppercase tracking-wider phone-wide:w-[120px] phone-wide:shrink-0 text-body-small">
        {label}
      </span>

      {/* 2. ЗНАЧЕННЯ: лівий текст + крапки + правий текст — завжди в один рядок */}
      <div className="flex items-center">
        <span className="text-left text-brand-dark/60 whitespace-nowrap w-[70px] shrink-0 text-body">
          {leftLabel}
        </span>

        <div className="flex justify-center gap-[6px] w-[80px] shrink-0 mx-3">
          {[...Array(total)].map((_, i) => (
            <div
              key={i}
              className={`rounded-full shrink-0 w-[10px] h-[10px] ${i < value ? "bg-brand-gold" : "bg-brand-gold/30"}`}
            ></div>
          ))}
        </div>

        <span className="text-left text-brand-dark/60 whitespace-nowrap text-body">
          {rightLabel}
        </span>
      </div>

    </div>
  );
}