// src/components/Header.jsx
import { Link } from "react-router-dom";
import logoPng from "../assets/images/logo.png";
import searchPng from "../assets/images/search.png";
import cartPng from "../assets/images/cart.png";

export default function Header() {
  return (
    <header
      className="
        fixed top-0 left-0 right-0
        h-[80px]
        z-50
        transition-colors duration-300
      "
      style={{
        backgroundColor: "var(--color-brand-beige)"
      }}
    >
      <div
        className="
          w-full h-full
          px-layout-gap
          tablet:max-w-[var(--max-width-content-tablet)]
          desktop:max-w-[var(--max-width-content-desktop)]
          mx-auto
          relative
          flex items-center
        "
      >
        {/* ЛОГОТИП — ПЕРЕХІД НА ГОЛОВНУ */}
        <Link
          to="/"
          className="
            inline-flex items-center
            tablet:absolute tablet:left-1/2 tablet:-translate-x-1/2
            transition-opacity hover:opacity-80
          "
          aria-label="На головну"
        >
          <img
            src={logoPng}
            alt="AQUACULTURE"
            className="h-[50px] w-auto select-none"
            draggable="false"
          />
        </Link>

        {/* ІКОНКИ ПРАВОРУЧ */}
        <div className="ml-auto flex items-center gap-4">
          {/* ПОШУК (ПОКИ КНОПКА) */}
          <button
            type="button"
            className="
              w-10 h-10 
              flex items-center justify-center 
              rounded-full 
              transition-colors
              hover:bg-[var(--color-brand-sand)]
              active:scale-95
            "
            aria-label="Пошук"
          >
            <img
              src={searchPng}
              alt=""
              className="w-6 h-6 select-none"
              draggable="false"
            />
          </button>

          {/* КОШИК — ПЕРЕХІД НА СТОРІНКУ КОШИКА */}
          <Link
            to="/cart"
            className="
              w-10 h-10 
              flex items-center justify-center 
              rounded-full 
              transition-colors
              hover:bg-[var(--color-brand-sand)]
              active:scale-95
            "
            aria-label="Кошик"
          >
            <img
              src={cartPng}
              alt=""
              className="w-8 h-8 select-none"
              draggable="false"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}