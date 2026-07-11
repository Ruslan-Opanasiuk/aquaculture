// src/components/QuantityPicker.jsx

// Капсульна форма (rounded-[15px]), висота завжди 30px — константа, не
// залежить від пропсів. Ширина кнопок/інпута залежить від size — через
// CSS custom property, бо Tailwind arbitrary values мають бути статичними.
const BASE_BUTTON_CLASS =
  "w-[var(--qp-w)] h-[30px] rounded-[15px] font-semibold flex items-center justify-center box-border border border-[var(--qp-border)] text-body cursor-pointer select-none";

export default function QuantityPicker({
  value,
  onIncrement,
  onDecrement,
  onChange,
  size = 120,
  borderColor = "#E9E5DB",
}) {
  const buttonWidth = Math.round(size * 0.3333);
  const cssVars = { "--qp-w": `${buttonWidth}px`, "--qp-border": borderColor };

  return (
    <div className="flex justify-center items-end w-full h-[30px]">
      <button
        type="button"
        onClick={onDecrement}
        className={`bg-brand-beige hover:bg-hover-tint transition-colors text-brand-dark ${BASE_BUTTON_CLASS}`}
        style={cssVars}
      >
        −
      </button>

      <input
        value={value}
        inputMode="numeric"
        pattern="[0-9]*"
        onChange={(e) => onChange(e.target.value)}
        className="text-center font-semibold text-brand-dark bg-transparent border-none outline-none text-body font-['Montserrat'] flex items-center w-[var(--qp-w)] h-[30px]"
        style={{ "--qp-w": `${buttonWidth}px` }}
      />

      <button
        type="button"
        onClick={onIncrement}
        className={`hover:opacity-90 transition-opacity bg-brand-dark text-white ${BASE_BUTTON_CLASS}`}
        style={cssVars}
      >
        +
      </button>
    </div>
  );
}