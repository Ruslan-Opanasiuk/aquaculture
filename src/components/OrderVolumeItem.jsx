// src/components/OrderVolumeItem.jsx
import QuantityPicker from "./QuantityPicker";

export default function OrderVolumeItem({
  size,
  value,
  onIncrement,
  onDecrement,
  onChange,
  imageSrc,
  imageSrcSet,
  grams,
  price,
}) {
  const isActive = Number(value) > 0;

  return (
    <div
      className="aspect-[3/4] bg-brand-sand rounded-[15px] font-['Montserrat'] relative overflow-hidden w-[var(--ovi-size)]"
      style={{ "--ovi-size": `${size}px` }}
    >
      {/* ВЕРХ — ФОТО */}
      <div className="w-[90%] mx-auto relative">
        <img
          src={imageSrc}
          srcSet={imageSrcSet}
          alt=""
          width="512"
          height="512"
          draggable={false}
          className={`w-full h-auto object-contain mix-blend-multiply select-none pointer-events-none block transition-[filter,opacity] duration-[250ms] ease-[ease] ${
            isActive ? "grayscale-0 opacity-100" : "grayscale opacity-50"
          }`}
        />

        {/* ФАСОВКА */}
        <div className="absolute top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-semibold pointer-events-none text-body [text-shadow:0_1px_2px_rgba(0,0,0,0.35)]">
          {grams}г
        </div>
      </div>

      {/* ЦІНА */}
      <div className="mt-[-5px] text-center font-semibold text-brand-dark text-body">
        {price} ₴
      </div>

      {/* НИЗ — КНОПКИ (використовуємо QuantityPicker) */}
      <div className="absolute bottom-0 left-0 w-full">
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