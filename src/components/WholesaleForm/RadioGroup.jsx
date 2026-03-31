import React, { useId } from "react";

export default function RadioGroup({ label, options, selected, onChange, error }) {
  // Генеруємо унікальний ID для зв'язки заголовка і групи
  const labelId = useId();

  return (
    <div 
      className="w-full flex flex-col font-['Montserrat']"
      role="radiogroup"
      aria-labelledby={labelId}
    >
      <p 
        id={labelId}
        className="mb-[12px] text-body font-medium text-brand-black"
      >
        {label}
      </p>

      <div className="flex flex-col gap-[12px]">
        {options.map((item) => (
          <label
            key={item}
            className="flex items-center gap-[12px] cursor-pointer group select-none"
          >
            <input
              type="radio"
              name={label}
              value={item}
              checked={selected === item}
              onChange={() => onChange(item)}
              aria-invalid={Boolean(error)}
              className="peer sr-only"
            />

            <span
              className={`
                w-[24px]
                h-[24px]
                rounded-full
                border
                bg-brand-light
                flex items-center justify-center
                flex-shrink-0
                transition-all
                duration-200
                peer-focus-visible:ring-2 
                peer-focus-visible:ring-brand-gold 
                peer-focus-visible:ring-offset-2 
                peer-focus-visible:ring-offset-brand-sand
                ${error 
                  ? "border-error" 
                  : selected === item 
                    ? "border-brand-dark" 
                    : "border-brand-gray group-hover:border-brand-gold"
                }
              `}
            >
              <span 
                className={`
                  w-[10px] 
                  h-[10px] 
                  bg-brand-dark 
                  rounded-full 
                  transition-transform 
                  duration-200
                  ${selected === item ? "scale-100" : "scale-0"}
                `}
              />
            </span>

            <span className="text-body-small text-brand-black leading-tight">
              {item}
            </span>
          </label>
        ))}
      </div>

      {/* Повідомлення про помилку */}
      {error && (
        <p role="alert" className="text-error text-[12px] mt-[8px]">
          {error}
        </p>
      )}
    </div>
  );
}