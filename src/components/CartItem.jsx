// src/components/CartItem.jsx
import QuantityPicker from "./QuantityPicker";

function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M6 6L18 18M6 18L18 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function CartItem({
  item,
  onIncrement,
  onDecrement,
  onChange,
  onRemove,
}) {
  const total = item.price * item.quantity;

  return (
    <div
      className="w-full flex items-center"
      style={{
        height: "150px",
        borderBottom: "2px solid var(--color-brand-sand)",
      }}
    >
      {/* REMOVE BUTTON */}
      <button
        onClick={onRemove}
        className="w-[36px] h-[36px] rounded-full flex items-center justify-center flex-shrink-0 active:scale-[0.95]"
        style={{
          backgroundColor: "var(--color-brand-sand)",
          color: "var(--color-brand-dark)",
        }}
      >
        <CloseIcon className="w-4 h-4" />
      </button>

      {/* GAP */}
      <div className="w-[32px] flex-shrink-0" />

      {/* IMAGE */}
      <div
        className="flex-shrink-0"
        style={{
          width: "125px",
          height: "125px",
          backgroundColor: "var(--color-brand-beige)",
          borderRadius: "16px",
        }}
      >
        <img
          src={item.image}
          alt={item.title}
          style={{
            width: "125px",
            height: "125px",
            objectFit: "contain",
          }}
          draggable={false}
        />
      </div>

      {/* GAP */}
      <div className="w-[32px] flex-shrink-0" />

      {/* TITLE + WEIGHT */}
      <div className="flex flex-col justify-center min-w-[200px]">
        <h3
          style={{
            fontSize: "var(--h3-font-size)",
            fontWeight: 600,
            color: "var(--color-brand-dark)",
          }}
        >
          {item.title}
        </h3>

        <p
          style={{
            fontSize: "var(--body-font-size)",
            color: "var(--color-brand-dark)",
            marginTop: "6px",
          }}
        >
          Фасовка: {item.grams}г
        </p>
      </div>

      {/* FLEX SPACE */}
      <div className="flex-1" />

      {/* QUANTITY */}
      <div className="flex-shrink-0">
        <QuantityPicker
          value={item.quantity}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          onChange={onChange}
          size={120}
        />
      </div>

      {/* GAP */}
      <div className="w-[32px] flex-shrink-0" />

      {/* PRICE BLOCK */}
      <div className="flex flex-col items-end flex-shrink-0 min-w-[140px]">
        <span
          style={{
            fontSize: "var(--body-font-size)",
            color: "var(--color-brand-dark)",
          }}
        >
          {new Intl.NumberFormat("uk-UA").format(item.price)} ₴ / шт
        </span>

        <span
          style={{
            fontSize: "var(--body-font-size)",
            fontWeight: 600,
            color: "var(--color-brand-dark)",
            marginTop: "6px",
          }}
        >
          {new Intl.NumberFormat("uk-UA").format(total)} ₴
        </span>
      </div>
    </div>
  );
}