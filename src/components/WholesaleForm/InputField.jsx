import React, { useId } from "react";

export default function InputField({ label, placeholder, value, onChange, error, type = "text" }) {
  // Генеруємо унікальний ID для зв'язки label та input (важливо для доступності)
  const id = useId();

  return (
    <div className="w-full flex flex-col font-['Montserrat']">
      <label 
        htmlFor={id} 
        className="mb-[6px] text-body font-medium text-brand-black"
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className={`
          w-full
          h-[44px]
          rounded-full
          bg-brand-light
          text-brand-black
          px-[18px]
          text-body
          placeholder:text-brand-gray
          outline-none
          transition-all
          duration-200
          ${error ? "ring-2 ring-error" : "focus:ring-2 focus:ring-brand-gold"}
        `}
      />

      {error && (
        <p role="alert" className="text-error text-[12px] mt-[6px]">
          {error}
        </p>
      )}
    </div>
  );
}