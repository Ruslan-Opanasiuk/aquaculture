// src/components/Footer.jsx
import logoPng from "../assets/images/logo.png";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white flex justify-center">
      <div
        className="
          w-full
          px-layout-gap
          tablet:max-w-[794px]
          desktop:max-w-[1180px]
          py-[100px]
          font-['Montserrat']
          text-[17px]
          leading-[1.6]
          flex flex-col
          gap-[72px]
          tablet:flex-row
          tablet:justify-between
          tablet:gap-[40px]
        "
      >
        <div className="max-w-[390px] flex flex-col gap-[16px]">
          <img
            src={logoPng}
            alt="AQUACULTURE"
            className="
              h-[50px]
              w-auto
              max-w-none
              object-contain
              select-none
              invert
              block
            "
            draggable="false"
          />

          <p className="text-white/85">
            Ми спеціалізуємось на гуртових постачаннях червоної ікри для ресторанів, магазинів та
            корпоративних клієнтів.
            <span className="block">
              Працюємо безпосередньо з виробниками, гарантуємо стабільну якість і свіжість кожної
              партії.
            </span>
          </p>
        </div>

        <div className="flex flex-col gap-[8px] whitespace-nowrap">
          <p className="font-semibold tracking-[0.08em]">КОНТАКТИ</p>

          <p className="text-white/85">
            email:{" "}
            <a
              className="underline underline-offset-4 hover:text-white"
              href="mailto:poshta@gmail.com"
            >
              poshta@gmail.com
            </a>
          </p>

          <p className="text-white/85">
            тел:{" "}
            <a
              className="underline underline-offset-4 hover:text-white"
              href="tel:+380509999999"
            >
              +38 050 999 99 99
            </a>
          </p>

          <p className="text-white/85">
            тел:{" "}
            <a
              className="underline underline-offset-4 hover:text-white"
              href="tel:+380509999999"
            >
              +38 050 999 99 99
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
