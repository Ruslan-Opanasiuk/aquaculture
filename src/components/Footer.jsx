// src/components/Footer.jsx
import logoPng from "../assets/images/logo.png";

export default function Footer() {
  return (
    <footer className="w-full flex justify-center p-[10px]"> {/* Зовнішній відступ як у Hero */}
      <div
        className="
          w-full
          bg-black 
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
            py-[80px]      /* Трохи зменшив зі 100px для балансу закруглень */
            tablet:py-[100px]
            font-['Montserrat']
            text-[16px]
            leading-[1.6]
            flex flex-col
            gap-[64px]      /* Трохи компактніше на мобілці */
            tablet:flex-row
            tablet:justify-between
            tablet:gap-[40px]
          "
        >
          {/* LOGO & DESCRIPTION */}
          <div className="max-w-[390px] flex flex-col gap-[16px]">
            <img
              src={logoPng}
              alt="AQUACULTURE"
              className="
                h-[40px]     /* Трохи менше лого для мобілки */
                tablet:h-[50px]
                w-auto
                max-w-none
                object-contain
                select-none
                invert
                block
              "
              draggable="false"
            />

            <p className="text-white/85 text-[15px] tablet:text-[16px]">
              Ми спеціалізуємось на гуртових постачаннях червоної ікри для ресторанів, магазинів та
              корпоративних клієнтів.
              <span className="block tablet:mt-2">
                Працюємо безпосередньо з виробниками, гарантуємо стабільну якість і свіжість кожної
                партії.
              </span>
            </p>
          </div>

          {/* CONTACTS */}
          <div className="flex flex-col gap-[12px] whitespace-nowrap">
            <p className="font-bold tracking-[0.08em] mb-2">КОНТАКТИ</p>

            <div className="flex flex-col gap-[8px]">
              <p className="text-white/85">
                email:{" "}
                <a
                  className="underline underline-offset-4 hover:text-white transition-colors"
                  href="mailto:poshta@gmail.com"
                >
                  poshta@gmail.com
                </a>
              </p>

              <p className="text-white/85">
                тел:{" "}
                <a
                  className="underline underline-offset-4 hover:text-white transition-colors"
                  href="tel:+380509999999"
                >
                  +38 050 999 99 99
                </a>
              </p>

              <p className="text-white/85">
                тел:{" "}
                <a
                  className="underline underline-offset-4 hover:text-white transition-colors"
                  href="tel:+380509999999"
                >
                  +38 050 999 99 99
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}