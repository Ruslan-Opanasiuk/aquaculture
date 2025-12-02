import React from "react";

export default function InputField({ label, value, onChange }) {
  return (
    <div className="w-full flex flex-col mt-[17px]">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label.toUpperCase()}
        className="
          w-full
          bg-transparent
          focus:outline-none
          pb-[5px]
          text-[17px]
          font-[Montserrat]
          text-[#000000]
          placeholder:text-[#A8A8A8]
          border-b-[1px]
          border-[#e4d7a7]
          transition-colors
        "
      />
    </div>
  );
}
