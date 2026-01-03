import React from "react";
import { questionnaireFonts } from "../../theme/old/fontSizes";

export default function RadioGroup({ label, options, selected, onChange }) {
  return (
    <div className="w-full mt-[17px]">
      <p className="font-[Montserrat] text-[#000000] text-[17px] tracking-wide mb-[12px]">
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
              className="
                w-[24px]
                h-[24px]
                rounded-full
                border-[1px]
                border-[#000000]
                flex items-center justify-center
                flex-shrink-0
                self-start
              "
              onClick={() => onChange(item)}
            >
              {/* Inner dot */}
              {selected === item && (
                <span className="w-[12px] h-[12px] bg-black rounded-full"></span>
              )}
            </span>

            {/* Text */}
            <span
              onClick={() => onChange(item)}
              className="
                font-[Montserrat]
                text-[#000000]
                text-[17px]
                leading-[1.2]
                flex-1
              "
            >
              {item}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
