import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Хуки роутера
import Header from "../components/Header";
import Footer from "../components/Footer";
import OrderVolumeGrid from "../components/OrderVolumeGrid";
import WholesaleForm from "../components/WholesaleForm/WholesaleForm";

// Імпорт словника даних
import { caviarCatalog } from "../data/caviarPackages";

const FullScreenLoader = () => (
  <div className="fixed inset-0 bg-[#F5F1E7] z-50 flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-black/10 border-t-black rounded-full animate-spin"></div>
  </div>
);

export default function Product() {
  // 1. Отримуємо ID з адреси (наприклад, "trout")
  const { productId } = useParams(); 
  const navigate = useNavigate();

  // 2. Знаходимо потрібний продукт у базі
  // Якщо productId undefined (наприклад, просто /product), пробуємо дефолтний 'trout' або null
  const productKey = productId || 'trout'; 
  const product = caviarCatalog[productKey];

  const [isLoading, setIsLoading] = useState(true);
  const [animate, setAnimate] = useState(false);

  // Якщо продукту немає в базі — редірект на головну
  useEffect(() => {
    if (!product) {
      navigate("/");
    }
  }, [product, navigate]);

  // Скидаємо анімацію при зміні продукту
  useEffect(() => {
    setIsLoading(true);
    setAnimate(false);
  }, [productKey]);

  // Завантаження картинок
  useEffect(() => {
    if (!product) return;

    const imagesToLoad = [product.images.jar, product.images.lid];

    const loadImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
      });
    };

    Promise.all(imagesToLoad.map(loadImage)).then(() => {
      setIsLoading(false);
      setTimeout(() => {
        setAnimate(true);
      }, 100);
    });
  }, [product]);

  if (!product) return null;
  if (isLoading) return <FullScreenLoader />;

  return (
    <div className="bg-[#F5F1E7] min-h-screen flex flex-col font-['Montserrat'] animate-fadeIn">
      <Header />

      <main className="bg-[#F5F1E7] flex-1 pt-[32px] pb-[120px] flex flex-col gap-[100px] tablet:gap-[160px]">
        {/* ===== HERO / PRODUCT SECTION ===== */}
        <section className="w-full flex justify-center">
          <div className="w-full px-layout-gap" style={{ maxWidth: "var(--content-max-width)" }}>
            <div className="flex flex-col tablet:grid tablet:grid-cols-2 mt-[60px] tablet:mt-[100px] gap-y-[40px]">
              
              {/* 1. TEXT INFO */}
              <div className="order-1 tablet:order-2 flex flex-col items-center text-center">
                <span className="uppercase tracking-[0.12em] text-black/50" style={{ fontSize: "13px" }}>
                  {product.subtitle}
                </span>

                <h1 className="font-semibold leading-[1.1]" style={{ fontSize: "var(--h2-font-size)" }}>
                  {product.title}
                </h1>

                <p className="mt-[20px] tablet:mt-[16px] leading-[1.6] text-black/80 max-w-[400px]" style={{ fontSize: "var(--body-font-size)" }}>
                  {product.shortDescription}
                </p>

                {/* DESKTOP DETAILS */}
                <div className="hidden tablet:flex flex-col w-full">
                  <div className="mt-[56px] mx-[-10px] tablet:mx-0">
                    <OrderVolumeGrid packages={product.packages} />
                  </div>

                  <div className="mt-[80px] flex flex-col gap-[20px] leading-[1.6] text-black/80 text-left" style={{ fontSize: "var(--body-font-size)" }}>
                    {/* Вивід абзаців */}
                    {product.longDescription.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                    
                    <p className="whitespace-pre-line opacity-60" style={{ fontSize: "15px" }}>
                      {product.specs}
                    </p>
                  </div>
                </div>
              </div>

              {/* 2. IMAGES (ANIMATION) */}
              <div className="order-2 tablet:order-1 w-full">
                <div className="w-full relative flex justify-center items-center py-[20%]">
                  {/* Placeholder for sizing */}
                  <img src={product.images.jar} alt="" className="w-[80%] h-auto opacity-0 pointer-events-none select-none" />

                  {/* Lid */}
                  <img
                    src={product.images.lid}
                    alt="Кришка"
                    className={`
                      absolute top-1/2 left-1/2 -translate-x-1/2 w-[80%] h-auto object-contain z-[20]
                      transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                      ${animate ? "-translate-y-[75%]" : "-translate-y-1/2"}
                    `}
                  />

                  {/* Jar */}
                  <img
                    src={product.images.jar}
                    alt="Банка"
                    className={`
                      absolute top-1/2 left-1/2 -translate-x-1/2 w-[80%] h-auto object-contain z-[10]
                      transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                      ${animate ? "translate-y-[-25%]" : "-translate-y-1/2"}
                    `}
                  />
                </div>
              </div>

              {/* 3. MOBILE DETAILS */}
              <div className="order-3 tablet:hidden flex flex-col">
                <div className="w-full flex justify-center text-center">
                  <div className="w-full max-w-[450px]">
                    <OrderVolumeGrid packages={product.packages} />
                  </div>
                </div>

                <div className="mt-[80px] flex flex-col gap-[20px] leading-[1.6] text-black/80 text-left items-start" style={{ fontSize: "var(--body-font-size)" }}>
                  {product.longDescription.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                  <p className="whitespace-pre-line opacity-60" style={{ fontSize: "15px" }}>
                    {product.specs}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ===== WHOLESALE FORM ===== */}
        <section id="wholesale-form" className="scroll-mt-[50px]">
          <div className="w-full flex justify-center">
            <div className="w-full px-layout-gap" style={{ maxWidth: "var(--content-max-width)" }}>
              <WholesaleForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}