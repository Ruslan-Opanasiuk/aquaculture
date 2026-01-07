// SelectField.jsx
import React, { useState } from "react";

export default function SelectField({ label, options, value, onChange, error }) {
  const [open, setOpen] = useState(false);

  const borderClass = error ? "border-[#b00020]" : "border-[#A8A8A8]";
  const dropdownBorderClass = error ? "border-[#b00020]" : "border-[#A8A8A8]";

  const isPlaceholder = !value;

  return (
    <div className="w-full flex flex-col mt-[17px] relative items-center">
      {/* Поле */}
      <div
        className={`
          w-full
          pb-[17px]
          border-b-[1px]
          ${borderClass}
          font-[Montserrat]
          text-[#000000]
          flex items-center
          cursor-pointer
          select-none
          transition-colors
        `}
        aria-invalid={Boolean(error)}
        onClick={() => setOpen(!open)}
      >
        {/* Значення / плейсхолдер */}
        <span
          className={`
            flex-1
            text-center
            ${isPlaceholder ? "text-[#A8A8A8] text-[16px]" : "text-[#000000] text-[17px]"}
          `}
        >
          {value ? value : label.toUpperCase()}
        </span>

        {/* Стрілочка */}
        <span
          className={`
            w-[24px]
            text-right
            transition-transform
            ${open ? "rotate-180" : "rotate-0"}
          `}
        >
          ▼
        </span>
      </div>

      {/* Випадаючий список */}
      {open && (
        <div
          className={`
            absolute
            left-0
            right-0
            top-full
            mt-[4px]
            bg-white
            border
            ${dropdownBorderClass}
            rounded-[6px]
            shadow-md
            z-10
          `}
        >
          {options.map((item) => (
            <div
              key={item}
              onClick={() => {
                onChange(item);
                setOpen(false);
              }}
              className="
                px-[12px]
                py-[8px]
                font-[Montserrat]
                text-[16px]
                text-center
                cursor-pointer
                hover:bg-[#f5f0e6]
                transition-colors
              "
            >
              {item}
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="mt-[8px] font-[Montserrat] text-[14px] text-[#b00020] leading-[1.2] text-center">
          {error}
        </p>
      )}
    </div>
  );
}
