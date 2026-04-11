import React, { useState, useId, useRef, useEffect } from "react";

export default function SelectField({ 
  label, 
  placeholder, 
  options, 
  value, 
  onChange, 
  error,
  searchable = false // ДОДАНО: пропс для включення пошуку
}) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value || ""); // Стан для тексту в полі
  const id = useId();
  const dropdownRef = useRef(null);

  // Синхронізуємо текст у полі з реальним значенням, коли меню закривається
  useEffect(() => {
    if (!open) {
      setInputValue(value || "");
    }
  }, [value, open]);

  // Закриваємо при кліку поза полем
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Фільтруємо список, якщо увімкнено пошук
  const filteredOptions = searchable
    ? options.filter((item) =>
        item.toLowerCase().includes(inputValue.toLowerCase())
      )
    : options;

  return (
    <div className="w-full flex flex-col font-['Montserrat'] relative" ref={dropdownRef}>
      <label 
        htmlFor={`${id}-input`}
        className="mb-[6px] text-body font-medium text-brand-black"
      >
        {label}
      </label>

      {/* Поле-таблетка */}
      <div
        className={`
          relative
          w-full
          h-[44px]
          rounded-full
          bg-brand-light
          px-[18px]
          transition-all
          duration-200
          flex
          items-center
          justify-between
          cursor-pointer
          ${error 
            ? "ring-2 ring-error" 
            : open 
              ? "ring-2 ring-brand-gold" 
              : "focus-within:ring-2 focus-within:ring-brand-gold"
          }
        `}
        onClick={() => {
          if (!open) setOpen(true);
        }}
      >
        <input
          id={`${id}-input`}
          role="combobox"
          aria-expanded={open}
          aria-controls={`${id}-listbox`}
          aria-invalid={Boolean(error)}
          readOnly={!searchable} // Якщо не searchable, інпут лише для читання
          value={searchable && open ? inputValue : (value || "")}
          placeholder={value && searchable && open ? value : placeholder}
          className={`
            w-full 
            bg-transparent 
            outline-none 
            text-body
            ${!searchable ? "cursor-pointer select-none" : ""}
            ${value && !open ? "text-brand-black" : "text-brand-black"}
            placeholder:text-brand-gray
          `}
          onChange={(e) => {
            if (searchable) {
              setInputValue(e.target.value);
              setOpen(true);
            }
          }}
          onFocus={() => {
            if (searchable) {
              setInputValue(""); // Очищаємо поле для зручного нового пошуку
            }
          }}
        />

        {/* Подвійна стрілочка SVG */}
        <span className="flex items-center text-brand-gray pointer-events-none ml-2">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor" 
            className="w-5 h-5"
          >
            <path 
              fillRule="evenodd" 
              d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" 
              clipRule="evenodd" 
            />
          </svg>
        </span>
      </div>

      {/* Випадаючий список */}
      {open && (
        <ul
          id={`${id}-listbox`}
          role="listbox"
          className="
            absolute
            left-0
            right-0
            top-[calc(100%+8px)]
            bg-brand-light
            border
            border-brand-sand
            rounded-[20px]
            max-h-[220px] /* Обмежуємо висоту для довгого списку міст */
            overflow-y-auto /* Додаємо скрол */
            shadow-lg
            z-20
            flex
            flex-col
            py-[8px]
            animate-fadeIn
            /* Стилізація скролбара (опціонально) */
            scrollbar-thin scrollbar-thumb-brand-sand scrollbar-track-transparent
          "
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((item) => (
              <li
                key={item}
                role="option"
                aria-selected={value === item}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(item);
                  setInputValue(item);
                  setOpen(false);
                }}
                className={`
                  px-[18px]
                  py-[10px]
                  text-body
                  cursor-pointer
                  transition-colors
                  text-left
                  ${value === item 
                    ? "bg-brand-beige text-brand-black font-semibold" 
                    : "text-brand-black hover:bg-brand-beige/50"
                  }
                `}
              >
                {item}
              </li>
            ))
          ) : (
            <li className="px-[18px] py-[10px] text-body text-brand-gray text-center">
              Нічого не знайдено
            </li>
          )}
        </ul>
      )}

      {error && (
        <p role="alert" className="text-error text-[12px] mt-[6px]">
          {error}
        </p>
      )}
    </div>
  );
}