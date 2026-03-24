import wholesaleHero from "../assets/images/Frame-9.webp";

export default function WholesaleBanner() {
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
            fetchPriority="high"
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
            max-content
          "
        >
          <div
            className="
              pt-[12vh]
              max-w-[754px]
              mx-auto
              flex
              flex-col
              items-center
              text-center
              text-brand-beige
            "
          >
            <h2
              className="
                font-['Montserrat']
                font-medium
                leading-[0.95]
                mb-10
                text-h1
              "
            >
              Гуртовим клієнтам
            </h2>

            <p
              className="
                font-['Montserrat']
                leading-[1.5]
                text-brand-beige
                mb-8
                text-body
              "
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
                min-h-[44px]
                font-['Montserrat']
                tracking-[0.02em]
                bg-brand-beige
                text-brand-black
                hover:bg-brand-sand
                active:bg-brand-gray
                transition-colors
                text-body
                focus-visible:ring-2
                focus-visible:ring-brand-gold
                focus-visible:ring-offset-2
                focus-visible:ring-offset-black
                focus-visible:outline-none
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