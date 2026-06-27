import { useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Введіть коректну email адресу");
      return;
    }

    setError("");
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.message);

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("idle");
      setError("Не вдалося підписатися. Спробуйте пізніше.");
    }
  };

  return (
    <footer className="w-full flex justify-center p-[10px]">
      <div
        className="
          w-full
          bg-footer
          text-brand-beige
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
            tablet:max-w-[var(--max-width-content-tablet)]
            desktop:max-w-[var(--max-width-content-desktop)]
            py-[64px]
            font-['Montserrat']
            text-body
            leading-[1.6]
          "
        >
          {/* NEWSLETTER ROW */}
          <div className="grid grid-cols-1 desktop:grid-cols-2 gap-[32px] desktop:gap-0 pb-[48px]">
            <div className="flex flex-col gap-[8px]">
              <p className="font-bold tracking-[0.08em]">БУДЬ В КУРСІ</p>
              <p className="text-brand-beige-80">
                Підпишіться на останні оновлення та дізнавайтеся про новинки та
                спеціальні пропозиції першими.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="w-full desktop:max-w-[360px]"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  id="newsletter-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ваш email"
                  disabled={status === "loading" || status === "success"}
                  className={`
                    w-full
                    h-[44px]
                    rounded-full
                    bg-light
                    text-main
                    placeholder:text-brand-gray
                    pl-[18px]
                    pr-[48px]
                    text-body
                    outline-none
                    ${error ? "ring-2 ring-error" : status === "success" ? "ring-2 ring-success" : ""}
                  `}
                />

                <button
                  type="submit"
                  aria-label="Підписатися"
                  disabled={status === "loading" || status === "success"}
                  className="
                    absolute
                    right-[4px]
                    top-1/2
                    -translate-y-1/2
                    w-[36px]
                    h-[36px]
                    rounded-full
                    bg-footer
                    hover:opacity-90
                    flex
                    items-center
                    justify-center
                    transition-all
                    duration-200
                    active:scale-90
                    hover:bg-card
                    disabled:opacity-50
                    disabled:pointer-events-none
                  "
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-5 h-5 text-brand-beige"
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
                <p role="alert" className="text-error text-[12px] mt-[6px]">
                  {error}
                </p>
              )}
              {status === "success" && (
                <p role="status" className="text-success text-[12px] mt-[6px]">
                  Дякуємо! Ви підписані на оновлення.
                </p>
              )}
              {status !== "success" && (
                <p className="text-brand-beige-60 text-[11px] mt-[8px] leading-[1.5]">
                  Підписуючись, ви погоджуєтесь з нашою{" "}
                  <a
                    href="/privacy"
                    className="underline hover:text-brand-beige-80 transition-colors"
                  >
                    Політикою конфіденційності
                  </a>
                  .
                </p>
              )}
            </form>
          </div>

          {/* LINE */}
          <div className="w-full h-[0.5px] border-sand border-t mb-[48px]" />

          {/* BOTTOM GRID */}
          <div
            className="
              grid
              grid-cols-1
              tablet:grid-cols-[2fr_1fr_1fr]
              gap-[48px]
            "
          >
            {/* ABOUT */}
            <div className="flex flex-col gap-[12px]">
              <p className="font-bold tracking-[0.08em]">ПРО НАС</p>
              <p className="text-brand-beige-80">
                Ми спеціалізуємось на гуртових постачаннях червоної ікри для
                ресторанів, магазинів та корпоративних клієнтів.
              </p>
              <p className="text-brand-beige-80">
                Працюємо безпосередньо з виробниками та гарантуємо стабільну
                якість і свіжість кожної партії.
              </p>
            </div>

            {/* CATALOG */}
            <div className="flex flex-col gap-[8px]">
              <p className="font-bold tracking-[0.08em]">КАТАЛОГ</p>
              <Link
                to="/catalog#red-caviar"
                className="text-brand-beige-80 hover:text-brand-beige transition-colors"
              >
                Червона ікра
              </Link>
              <Link
                to="/catalog#black-caviar"
                className="text-brand-beige-80 hover:text-brand-beige transition-colors"
              >
                Чорна ікра
              </Link>
              <Link
                to="/catalog#white-caviar"
                className="text-brand-beige-80 hover:text-brand-beige transition-colors"
              >
                Біла ікра
              </Link>
              <Link
                to="/catalog#welcome_pack"
                className="text-brand-beige-80 hover:text-brand-beige transition-colors"
              >
                Welcome Pack
              </Link>
            </div>

            {/* CONTACTS */}
            <div className="flex flex-col gap-[8px]">
              <p className="font-bold tracking-[0.08em]">КОНТАКТИ</p>
              <a
                href="tel:+380509999999"
                className="text-brand-beige-80 hover:text-brand-beige transition-colors"
              >
                +38 050 999 99 99
              </a>
              <a
                href="tel:+380509999999"
                className="text-brand-beige-80 hover:text-brand-beige transition-colors"
              >
                +38 050 999 99 99
              </a>
              <a
                href="mailto:poshta@gmail.com"
                className="text-brand-beige-80 hover:text-brand-beige transition-colors"
              >
                poshta@gmail.com
              </a>
              <p className="font-bold tracking-[0.08em] mt-[12px]">ПРАЦЮЄМО</p>
              <p className="text-brand-beige-80">Пн-Нд: 10:00–19:00</p>
            </div>
          </div>

          {/* LINE */}
          <div className="w-full h-[0.5px] border-sand border-t mt-[48px] mb-[32px]" />

          {/* LEGAL */}
          <p className="text-[12px] text-brand-beige-60 text-center tablet:text-left">
            © 2025 Aquaculture | Всі права захищені | Договір публічної оферти |
            Політика конфіденційності
          </p>
        </div>
      </div>
    </footer>
  );
}
