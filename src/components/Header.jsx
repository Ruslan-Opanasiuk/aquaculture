// src/components/Header.jsx

import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

/*
  TODO:
  Зараз використовується PNG логотип.
  Коли буде готовий SVG — замінити імпорт на SVG.
*/

import logoPng from "../assets/images/logo.png";
import cartPng from "../assets/images/cart.png";

export default function Header() {
  // Рахуємо загальну кількість одиниць товару в кошику
  const cartCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <header
      className="
        fixed top-0 left-0 right-0
        h-[80px]
        z-50
        bg-[var(--color-brand-beige)]
        transition-colors duration-300
      "
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
          {/* 
            Висота зафіксована → це запобігає CLS.
            width:auto дозволяє логотипу масштабуватись пропорційно.
          */}
          <img
            src={logoPng}
            alt="AQUACULTURE"
            className="h-[48px] w-auto select-none"
            draggable="false"
          />
        </Link>

        {/* КНОПКА КОШИКА */}
        <div className="ml-auto flex items-center">
          <Link
            to="/cart"
            className="
              relative
              w-11 h-11
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
              className="w-7 h-7 select-none"
              draggable="false"
            />

            {/* COUNTER */}
            {cartCount > 0 && (
              <span
                className="
                  absolute
                  -top-1 -right-1
                  min-w-[18px]
                  h-[18px]
                  px-[4px]
                  flex items-center justify-center
                  rounded-full
                  bg-black
                  text-white
                  text-[11px]
                  font-semibold
                  leading-none
                "
              >
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}