// InputField.jsx
import React from "react";

export default function InputField({ label, value, onChange, error, type = "text" }) {
  const borderClass = error ? "border-[#b00020]" : "border-[#A8A8A8]";

  return (
    <div className="w-full flex flex-col mt-[17px] items-center">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label.toUpperCase()}
        aria-invalid={Boolean(error)}
        className={`
          w-full
          bg-transparent
          focus:outline-none
          pb-[17px]
          font-[Montserrat]
          text-[17px]
          text-[#000000]
          text-center
          placeholder:text-[#A8A8A8]
          placeholder:text-[16px]
          border-b-[1px]
          ${borderClass}
          transition-colors
        `}
      />

      {error && (
        <p className="mt-[8px] font-[Montserrat] text-[14px] text-[#b00020] leading-[1.2] text-center">
          {error}
        </p>
      )}
    </div>
  );
}
