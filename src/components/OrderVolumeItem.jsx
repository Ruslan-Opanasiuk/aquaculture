// src/components/OrderVolumeItem.jsx
import QuantityPicker from "./QuantityPicker";

export default function OrderVolumeItem({
  size,
  value,
  onIncrement,
  onDecrement,
  onChange,
  imageSrc,
  grams,
  price,
}) {
  const isActive = Number(value) > 0;

  return (
    <div
      style={{
        width: size,
        aspectRatio: "3 / 4",
        backgroundColor: "#E9E5DB",
        borderRadius: 15,
        fontFamily: "Montserrat, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ВЕРХ — ФОТО */}
      <div style={{ width: "90%", margin: "0 auto", position: "relative" }}>
        <img
          src={imageSrc}
          alt=""
          draggable={false}
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
            mixBlendMode: "multiply",
            userSelect: "none",
            pointerEvents: "none",
            display: "block",
            filter: isActive ? "grayscale(0)" : "grayscale(1)",
            opacity: isActive ? 1 : 0.5,
            transition: "filter 0.25s ease, opacity 0.25s ease",
          }}
        />

        {/* ФАСОВКА */}
        <div
          style={{
            position: "absolute",
            top: "70%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#fff",
            fontWeight: 600,
            pointerEvents: "none",
            textShadow: "0 1px 2px rgba(0,0,0,0.35)",
            fontSize: "var(--body-font-size)",
          }}
        >
          {grams}г
        </div>
      </div>

      {/* ЦІНА */}
      <div
        style={{
          marginTop: -5,
          textAlign: "center",
          fontWeight: 600,
          color: "#000",
          fontSize: "var(--body-font-size)",
        }}
      >
        {price} ₴
      </div>

      {/* НИЗ — КНОПКИ (використовуємо QuantityPicker) */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
        }}
      >
        <QuantityPicker 
          value={value}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          onChange={onChange}
          size={size}
        />
      </div>
    </div>
  );
}