// src/components/Header.jsx
import logoPng from "../assets/images/logo.png";
import searchPng from "../assets/images/search.png";
import cartPng from "../assets/images/cart.png";

export default function Header() {
  return (
    <header
      className="
        fixed top-0 left-0 right-0
        h-[80px]
        bg-[#E9E5DB]
        shadow-[0_4px_16px_rgba(0,0,0,0.08)]
        z-50
      "
    >
      <div
        className="
          w-full h-full
          px-layout-gap
          tablet:max-w-[794px]
          desktop:max-w-[1180px]
          mx-auto
          relative
          flex items-center
        "
      >
        <a
          href="/"
          className="
            inline-flex items-center
            tablet:absolute tablet:left-1/2 tablet:-translate-x-1/2
          "
          aria-label="AQUACULTURE"
        >
          <img
            src={logoPng}
            alt="AQUACULTURE"
            className="h-[50px] w-auto select-none"
            draggable="false"
          />
        </a>

        <div className="ml-auto flex items-center gap-4">
          <button
            type="button"
            className="w-10 h-10 flex items-center justify-center rounded-full"
            aria-label="Пошук"
          >
            <img
              src={searchPng}
              alt=""
              className="w-6 h-6 select-none"
              draggable="false"
            />
          </button>

          <button
            type="button"
            className="w-10 h-10 flex items-center justify-center rounded-full"
            aria-label="Кошик"
          >
            <img
              src={cartPng}
              alt=""
              className="w-8 h-8 select-none"
              draggable="false"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
