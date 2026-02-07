// src/components/OrderVolumeItem.jsx

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
  const buttonSize = Math.round(size * 0.3333);
  const borderColor = "#E9E5DB";

  const isActive = Number(value) > 0;

  return (
    <div
      style={{
        width: size,
        aspectRatio: "3 / 4",
        backgroundColor: "#E9E5DB",
        borderRadius: 20,
        fontFamily: "Montserrat",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ВЕРХ — ФОТО */}
      <div
        style={{
          width: "90%",
          margin: "0 auto",
          position: "relative",
        }}
      >
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

            /* 👇 ВАЖЛИВА ЛОГІКА */
            filter: isActive ? "grayscale(0)" : "grayscale(1)",
            opacity: isActive ? 1 : 0.5,
            transition: "filter 0.25s ease, opacity 0.25s ease",
          }}
        />

        {/* ФАСОВКА — ~70% від верху фото */}
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

      {/* ЦІНА — під фото */}
      <div
        style={{
          marginTop: -10,
          textAlign: "center",
          fontWeight: 600,
          color: "#000",
          fontSize: "var(--body-font-size)",
        }}
      >
        {price} ₴
      </div>

      {/* НИЗ — КНОПКИ */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* – */}
        <button
          onClick={onDecrement}
          style={{
            width: buttonSize,
            height: buttonSize,
            borderRadius: "50%",
            backgroundColor: "#FEFAF3",
            color: "#000",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
            border: `1px solid ${borderColor}`,
            fontSize: "var(--body-font-size)",
          }}
        >
          −
        </button>

        {/* count */}
        <input
          value={value}
          inputMode="numeric"
          pattern="[0-9]*"
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: buttonSize,
            textAlign: "center",
            fontWeight: 600,
            color: "#000",
            background: "transparent",
            border: "none",
            outline: "none",
            fontSize: "var(--body-font-size)",
          }}
        />

        {/* + */}
        <button
          onClick={onIncrement}
          style={{
            width: buttonSize,
            height: buttonSize,
            borderRadius: "50%",
            backgroundColor: "#000",
            color: "#fff",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
            border: `1px solid ${borderColor}`,
            fontSize: "var(--body-font-size)",
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}
