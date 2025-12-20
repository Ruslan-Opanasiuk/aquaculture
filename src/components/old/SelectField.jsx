import React, { useState } from "react";
import { questionnaireFonts } from "../../theme/old/fontSizes";

export default function SelectField({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full flex flex-col mt-[17px] relative">
      {/* Поле */}
      <div
        className="
          w-full
          pb-[5px]
          border-b-[1px]
          border-[#e4d7a7]
          font-[Montserrat]
          text-[#000000]
          flex justify-between items-center
          cursor-pointer
          select-none
        "
        style={{
          fontSize: questionnaireFonts.placeholder,
        }}
        onClick={() => setOpen(!open)}
      >
        <span className={value ? "text-[#000000]" : "text-[#A8A8A8]"}>
          {value ? value : label.toUpperCase()}
        </span>

        {/* Стрілочка */}
        <span
          className={`
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
          className="
            absolute 
            left-0 
            right-0 
            top-full 
            mt-[4px]
            bg-white 
            border 
            border-[#e4d7a7] 
            rounded-[6px]
            shadow-md
            z-10
          "
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
                cursor-pointer
                hover:bg-[#f5f0e6]
                transition-colors
              "
              style={{
                fontSize: questionnaireFonts.placeholder,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
