// src/components/Footer.jsx
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Введіть коректну email адресу");
      return;
    }

    setError("");
    console.log("EMAIL:", email);

    // тут пізніше буде інтеграція з сервісом розсилки
  };

  return (
    <footer className="w-full flex justify-center p-[10px]">
      <div
        className="
          w-full
          bg-[var(--bg-footer)]
          text-white
          rounded-[20px]
          flex
          justify-center
          overflow-hidden
        "
      >
        <div
          className="
            w-full
            px-layout-gap
            tablet:max-w-[794px]
            desktop:max-w-[1180px]
            py-[64px]

            font-['Montserrat']
            text-[15px]
            leading-[1.6]
          "
        >
          {/* GRID */}
          <div
            className="
              grid
              grid-cols-1
              tablet:grid-cols-2
              desktop:grid-cols-[2fr_1fr_1fr_1fr]
              gap-[48px]
            "
          >
            {/* ABOUT */}
            <div className="flex flex-col gap-[12px]">
              <p className="font-bold tracking-[0.08em] mb-2">ПРО НАС</p>

              <p className="text-white/80">
                Ми спеціалізуємось на гуртових постачаннях червоної ікри для
                ресторанів, магазинів та корпоративних клієнтів.
              </p>

              <p className="text-white/80">
                Працюємо безпосередньо з виробниками та гарантуємо стабільну
                якість і свіжість кожної партії.
              </p>
            </div>

            {/* CATALOG */}
            <div className="flex flex-col gap-[10px]">
              <p className="font-bold tracking-[0.08em] mb-2">КАТАЛОГ</p>

              <p className="text-white/80">Червона ікра</p>
              <p className="text-white/80">Чорна ікра</p>
              <p className="text-white/80">Біла ікра</p>
            </div>

            {/* CONTACTS */}
            <div className="flex flex-col gap-[10px] whitespace-nowrap">
              <p className="font-bold tracking-[0.08em] mb-2">КОНТАКТИ</p>

              <a
                href="tel:+380509999999"
                className="text-white/80 hover:text-white transition-colors"
              >
                +38 050 999 99 99
              </a>

              <a
                href="tel:+380509999999"
                className="text-white/80 hover:text-white transition-colors"
              >
                +38 050 999 99 99
              </a>

              <a
                href="mailto:poshta@gmail.com"
                className="text-white/80 hover:text-white transition-colors"
              >
                poshta@gmail.com
              </a>
            </div>

            {/* NEWSLETTER */}
            <div className="flex flex-col gap-[14px]">
              <p className="font-bold tracking-[0.08em] mb-2">РОЗСИЛКА</p>

              <p className="text-white/80">
                Отримуйте новини та спеціальні пропозиції.
              </p>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="w-full max-w-[320px]"
              >
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ваш email"
                    className={`
                      w-full
                      h-[44px]
                      rounded-full
                      bg-[var(--color-brand-beige)]
                      text-[var(--text-main)]
                      placeholder:text-gray-500
                      pl-[18px]
                      pr-[48px]
                      text-[14px]
                      outline-none
                      ${error ? "ring-2 ring-red-400" : ""}
                    `}
                  />

                  <button
                    type="submit"
                    className="
                      absolute
                      right-[4px]
                      top-1/2
                      -translate-y-1/2
                      w-[36px]
                      h-[36px]
                      rounded-full
                      bg-black
                      text-[#F5F1E7]
                      flex
                      items-center
                      justify-center
                      transition-all
                      duration-200
                      active:scale-90
                      hover:bg-[#262626]
                    "
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-5 h-5"
                    >
                      <path
                        d="M9 18l6-6-6-6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                {error && (
                  <p className="text-red-400 text-[12px] mt-[6px] pl-[18px]">
                    {error}
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* LINE */}
          <div className="w-full h-[0.5px] bg-[var(--color-brand-sand)] mt-[64px] mb-[24px]" />

          {/* LEGAL */}
          <p className="text-[13px] text-[var(--color-brand-sand)] text-center tablet:text-left">
            © 2025 Aquaculture Всі права захищені | Договір публічної оферти |
            Політика конфіденційності
          </p>
        </div>
      </div>
    </footer>
  );
}