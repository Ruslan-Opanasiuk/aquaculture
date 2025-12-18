import wholesaleHero from "../assets/images/test_baner.webp";

export default function WholesaleBanner() {
  return (
    <section className="w-full flex justify-center">
      <div className="w-full px-layout-gap tablet:max-w-[754px] desktop:max-w-[1140px]">
        {/* Блок з фото */}
        <div className="relative overflow-hidden rounded-[24px] tablet:rounded-[28px] desktop:rounded-[32px]">
          <img
            src={wholesaleHero}
            alt="Преміальна ікра для гуртових клієнтів"
            className="
              w-full 
              h-[220px] 
              phone-wide:h-[240px] 
              tablet:h-[320px] 
              desktop:h-[360px]
              object-cover 
              object-center
              align-middle
            "
          />

          {/* Градієнт + текст поверх фото — тільки tablet+ */}
          <div className="hidden tablet:block absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/20" />

            <div className="absolute inset-0 flex items-center">
              <div
                className="
                  px-layout-gap 
                  tablet:px-10 
                  desktop:px-12 
                  py-6 
                  tablet:py-10
                  max-w-[540px]
                  text-white
                "
              >

                <h2 className="text-section-title font-semibold mb-3">
                  Спеціальні умови для гуртових клієнтів
                </h2>

                <p className="text-section-subtitle leading-[1.5] text-[#F5F5F5] mb-5 max-w-[32rem]">
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
        </div>

        {/* Мобільний варіант: текст під фото, без оверлею */}
        <div className="mt-4 tablet:hidden">

          <h2 className="text-section-title font-semibold mb-2">
            Спеціальні умови для гуртових клієнтів
          </h2>

          <p className="text-section-subtitle leading-[1.5] text-caviar-text mb-4">
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
              bg-black text-white
              hover:bg-[#222222]
              active:bg-[#111111]
              transition-colors
            "
          >
            Запитати гуртовий прайс
          </button>
        </div>
      </div>
    </section>
  );
}
