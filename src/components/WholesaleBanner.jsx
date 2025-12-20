import wholesaleHero from "../assets/images/Frame-9.webp";

export default function WholesaleHero() {
  return (
    <section className="relative w-full h-screen flex justify-center">
      {/* Фото-фон */}
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

      {/* Затемнення для читабельності тексту */}
      <div
        className="
          absolute inset-0
          bg-black/45
        "
        aria-hidden="true"
      />

      {/* Контент поверх фото */}
      <div className="relative z-10 w-full h-full">
        <div
          className="
            w-full h-full
            px-layout-gap
            tablet:max-w-[754px]
            desktop:max-w-[1140px]
            mx-auto
          "
        >
          <div
            className="
              pt-[10vh]
              max-w-[520px]
              text-white
            "
          >
            <h1 className="text-section-title font-semibold mb-3">
              СПЕЦІАЛЬНІ УМОВИ ДЛЯ ГУРТОВИХ КЛІЄНТІВ
            </h1>

            <p className="text-section-subtitle leading-[1.5] text-[#F5F5F5] mb-5">
              Прямі поставки преміальної ікри для вашого бізнесу. Ціни в каталозі — роздрібні. 
              Отримайте індивідуальний прайс та гарантію стабільності.
            </p>

            <button
              type="button"
              className="
                inline-flex items-center justify-center
                rounded-full
                px-6 py-3
                text-[15px] font-medium
                bg-white text-black
                hover:bg-[#F5F1E8]
                active:bg-[#E2D8C8]
                transition-colors
              "
            >
              Запитати гуртовий прайс
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
