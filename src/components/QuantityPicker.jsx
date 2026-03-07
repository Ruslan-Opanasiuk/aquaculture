// src/components/QuantityPicker.jsx

export default function QuantityPicker({ 
  value, 
  onIncrement, 
  onDecrement, 
  onChange, 
  size = 120, 
  borderColor = "#E9E5DB" 
}) {
  const buttonWidth = Math.round(size * 0.3333);
  const buttonHeight = 30; 

  const baseButtonStyle = {
    width: buttonWidth,
    height: buttonHeight,
    borderRadius: "15px", // Капсульна форма
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    border: `1px solid ${borderColor}`,
    fontSize: "var(--body-font-size)",
    cursor: "pointer",
    userSelect: "none",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end", // Притискаємо вміст до низу самого контейнера
        width: "100%",
        height: buttonHeight, // Фіксуємо висоту всього рядка лічильника
      }}
    >
      <button
        type="button"
        onClick={onDecrement}
        style={{ ...baseButtonStyle, backgroundColor: "#FEFAF3", color: "#000" }}
      >
        −
      </button>

      <input
        value={value}
        inputMode="numeric"
        pattern="[0-9]*"
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: buttonWidth,
          height: buttonHeight, // Додав висоту, щоб текст був по центру кнопок
          textAlign: "center",
          fontWeight: 600,
          color: "#000",
          background: "transparent",
          border: "none",
          outline: "none",
          fontSize: "var(--body-font-size)",
          fontFamily: "Montserrat, sans-serif",
          display: "flex",
          alignItems: "center",
        }}
      />

      <button
        type="button"
        onClick={onIncrement}
        style={{ ...baseButtonStyle, backgroundColor: "#000", color: "#fff" }}
      >
        +
      </button>
    </div>
  );
}