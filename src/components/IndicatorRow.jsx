// src/components/IndicatorRow.jsx

export default function IndicatorRow({ label, leftLabel, rightLabel, value = 3 }) {
  const total = 5;

  return (
    // На вузьких телефонах не влазить в один рядок — ділимо на дві лінії
    // (назва / значення), з меншим відступом між ними, ніж між сусідніми
    // характеристиками (py-2 нижче). Від phone-wide — як було, один рядок.
    // Ширина назви й лівого тексту — за вмістом (не фіксована): свідомо
    // жертвуємо вирівнюванням крапок у колонку між рядками заради того,
    // щоб рядок був компактнішим і не ламався на вузьких екранах.
    <div className="flex flex-col gap-1 phone-wide:flex-row phone-wide:items-center phone-wide:gap-0 font-['Montserrat'] py-2">

      {/* 1. НАЗВА */}
      <span
        className="font-medium text-brand-dark/75 uppercase tracking-wider whitespace-nowrap"
        style={{ fontSize: "var(--body-small-font-size)" }}
      >
        {label}
      </span>

      {/* 2. ЗНАЧЕННЯ: лівий текст + крапки + правий текст — завжди в один рядок */}
      <div className="flex items-center">
        <span
          className="text-right text-brand-dark/60 whitespace-nowrap"
          style={{ fontSize: "var(--body-font-size)" }}
        >
          {leftLabel}
        </span>

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

        <span
          className="text-left text-brand-dark/60 whitespace-nowrap"
          style={{ fontSize: "var(--body-font-size)" }}
        >
          {rightLabel}
        </span>
      </div>

    </div>
  );
}