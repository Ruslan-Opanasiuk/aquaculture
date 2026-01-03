import wholesaleHero from "../assets/images/Frame-9.webp";

export default function WholesaleHero() {
  return (
    <section className="relative w-full h-screen flex justify-center">
      <div className="absolute inset-0 tablet:px-[10px] desktop:px-[10px]">
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={wholesaleHero}
            alt="Преміальна ікра для гуртових клієнтів"
            className="
              absolute inset-0
              w-full h-full
              object-cover
              object-[28%_72%]
            "
          />

          <div
            className="
              absolute inset-0
              bg-black/45
            "
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="relative z-10 w-full h-full">
        <div
          className="
            w-full h-full
            px-layout-gap
            tablet:max-w-[794px]
            desktop:max-w-[1180px]
            mx-auto
          "
        >
          <div className="pt-[20vh] max-w-[520px] text-white">
            <h1
              className="
                font-['Montserrat']
                text-[28px]
                font-semibold
                leading-[0.95]
                mb-10
              "
            >
              Гуртовим клієнтам
            </h1>

            <p
              className="
                font-['Montserrat']
                text-[17px]
                leading-[1.5]
                text-[#F5F5F5]
                mb-6
              "
            >
              Прямі поставки преміальної ікри для вашого бізнесу. Ціни в каталозі — роздрібні.
              Отримайте індивідуальний прайс та гарантію стабільності.
            </p>

            <button
              type="button"
              onClick={() => {
                document.getElementById("wholesale-form")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="
                inline-flex items-center justify-center
                rounded-full
                px-6 py-2.5
                font-['Montserrat']
                text-[17px]
                tracking-[0.02em]
                bg-white text-black
                hover:bg-[#F5F1E8]
                active:bg-[#E2D8C8]
                transition-colors
              "
            >
              Оформити анкету
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
