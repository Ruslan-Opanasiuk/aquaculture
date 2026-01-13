import wholesaleHero from "../assets/images/Frame-9.webp";

export default function WholesaleHero() {
  return (
    <section
      className="
        relative
        w-full
        h-screen
        flex
        justify-center
      "
    >
      <div
        className="
          absolute
          left-0
          right-0
          bottom-0
          top-[80px]
          p-[10px]
        "
      >
        <div
          className="
            relative
            w-full
            h-full
            overflow-hidden
            rounded-[20px]
          "
        >
          <img
            src={wholesaleHero}
            alt="Преміальна ікра для гуртових клієнтів"
            className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
              object-[28%_72%]
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-black/45
            "
            aria-hidden="true"
          />
        </div>
      </div>

      <div
        className="
          relative
          z-10
          w-full
          h-[calc(100%-80px)]
          mt-[80px]
        "
      >
        <div
          className="
            w-full
            h-full
            px-layout-gap
            mx-auto
          "
          style={{
            maxWidth: "var(--content-max-width)",
          }}
        >
          <div
            className="
              pt-[12vh]
              max-w-[754px]
              mx-auto
              text-white
              flex
              flex-col
              items-center
              text-center
            "
          >
            <h1
              className="
                font-['Montserrat']
                font-medium
                leading-[0.95]
                mb-10
              "
              style={{
                fontSize: "var(--h1-font-size)",
              }}
            >
              Гуртовим клієнтам
            </h1>

            <p
              className="
                font-['Montserrat']
                leading-[1.5]
                text-[#F5F5F5]
                mb-8
              "
              style={{
                fontSize: "var(--body-font-size)",
              }}
            >
              Прямі поставки преміальної ікри для вашого бізнесу. Ціни в каталозі — роздрібні.
              Отримайте індивідуальний прайс та гарантію стабільності.
            </p>

            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("wholesale-form")
                  ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
              }}
              className="
                inline-flex
                items-center
                justify-center
                rounded-full
                px-6
                py-2.5
                font-['Montserrat']
                tracking-[0.02em]
                bg-white
                text-black
                hover:bg-[#F5F1E8]
                active:bg-[#E2D8C8]
                transition-colors
              "
              style={{
                fontSize: "var(--body-font-size)",
              }}
            >
              Оформити анкету
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
