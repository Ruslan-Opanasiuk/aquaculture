import React from "react";

export default function RadioGroup({ label, options, selected, onChange, error }) {
  
  return (
    <div className="w-full mt-[17px]" role="radiogroup" aria-invalid={Boolean(error)}>
      {/* Заголовок: завжди чорний, 17px */}
      <p
        className="
          font-[Montserrat]
          text-[17px]
          tracking-wide
          mb-[12px]
          text-[#000000]
        "
      >
        {label.toUpperCase()}
      </p>

      <div className="flex flex-col gap-[12px] mt-[17px]">
        {options.map((item) => (
          <label
            key={item}
            className="flex items-start gap-[12px] cursor-pointer select-none"
          >
            {/* Outer circle */}
            <span
              className={`
                w-[24px]
                h-[24px]
                rounded-full
                border-[1px]
                "border-[#000000]"
                flex items-center justify-center
                flex-shrink-0
                self-start
                transition-colors
              `}
              onClick={() => onChange(item)}
            >
              {/* Inner dot */}
              {selected === item && (
                <span className="w-[12px] h-[12px] bg-black rounded-full"></span>
              )}
            </span>

            {/* Text: пункти вибору 16px */}
            <span
              onClick={() => onChange(item)}
              className="
                font-[Montserrat]
                text-[#000000]
                text-[16px]
                leading-[1.2]
                flex-1
              "
            >
              {item}
            </span>
          </label>
        ))}
      </div>

      {/* Помилка: 14px, не центруємо (radio виняток) */}
      {error && (
        <p className="mt-[8px] font-[Montserrat] text-[14px] text-[#b00020] leading-[1.2]">
          {error}
        </p>
      )}
    </div>
  );
}
