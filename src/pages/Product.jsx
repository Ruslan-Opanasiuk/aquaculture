import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import OrderVolumeGrid from "../components/OrderVolumeGrid";
import WholesaleForm from "../components/WholesaleForm/WholesaleForm";
import IndicatorRow from "../components/IndicatorRow";
import SEO from "../components/SEO"; 
import NotFound from "./NotFound";

import { caviarCatalog } from "../data/caviarPackages";

const FullScreenLoader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-beige">
    <div 
      className="
        w-12 h-12 
        border-4 
        rounded-full 
        animate-spin 
        border-black/5 
        border-t-brand-dark
      "
    ></div>
  </div>
);

export default function Product() {
  const { productId } = useParams();

  const productKey = productId;
  const product = caviarCatalog[productKey];

  const [isLoading, setIsLoading] = useState(true);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setAnimate(false);
  }, [productKey]);

  useEffect(() => {
    if (!product) return;

    // ЗМІНЕНО: Оскільки тепер це об'єкти, беремо src1x для прелоадера
    const imagesToLoad = [product.images.jar.src1x, product.images.lid.src1x];

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

  if (!product) return <NotFound />;
  
  if (isLoading) return <FullScreenLoader />;

  return (
    <>
      <SEO 
        title={product.title} 
        description={product.shortDescription} 
        canonical={`https://aquaculture.com/product/${productKey}`}
      />

      <div className="min-h-screen flex flex-col font-['Montserrat'] animate-fadeIn bg-brand-beige">
        <main className="flex-1 pb-[120px] flex flex-col gap-[100px] tablet:gap-[160px]">
          
          {/* ===== HERO / PRODUCT SECTION ===== */}
          <section className="w-full flex justify-center">
            <div className="w-full px-layout-gap max-content">
              <div className="flex flex-col tablet:grid tablet:grid-cols-2 mt-[100px] tablet:mt-[100px] gap-y-[40px]">
                
                {/* 1. TEXT INFO */}
                <div
                  className="
                    order-1
                    tablet:order-2
                    flex
                    flex-col
                    items-center
                    text-center
                    tablet:items-start
                    tablet:text-left
                    tablet:pl-[60px]
                    text-brand-black
                  "
                >
                  <h1 className="font-semibold leading-[1.1] text-h2">
                    {product.title}
                  </h1>

                  <p className="mt-[20px] tablet:mt-[16px] leading-[1.6] max-w-[400px] opacity-90 text-body">
                    {product.shortDescription}
                  </p>

                  {/* --- DESKTOP DETAILS --- */}
                  <div className="hidden tablet:flex flex-col w-full">
                    <div className="mt-[56px] mx-[-10px] tablet:mx-0">
                      <OrderVolumeGrid
                        packages={product.packages || []}
                        // ЗМІНЕНО: Передаємо весь об'єкт { src1x, src2x }
                        productImage={product.images.jar}
                        productTitle={product.title}
                        productKey={productKey}
                      />
                    </div>

                    <div className="mt-[80px] flex flex-col gap-[20px] leading-[1.6] opacity-90 text-left text-body">
                      {product.indicators && product.indicators.length > 0 && (
                        <div className="flex flex-col w-full mb-4 pb-4 border-b border-brand-sand">
                          {product.indicators.map((indicator, index) => (
                            <IndicatorRow
                              key={index}
                              label={indicator.label}
                              leftLabel={indicator.leftLabel}
                              rightLabel={indicator.rightLabel}
                              value={indicator.value}
                            />
                          ))}
                        </div>
                      )}

                      {product.longDescription && product.longDescription.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}

                      <p className="whitespace-pre-line opacity-60 text-body-small">
                        {product.specs}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. IMAGES (ANIMATION) */}
                <div
                  className="
                    order-2
                    tablet:order-1
                    w-full
                    tablet:sticky
                    tablet:top-[120px]
                    tablet:self-start
                  "
                >
                  <div className="w-full relative flex justify-center items-center py-[20%]">
                    {/* ЗМІНЕНО: Додано srcSet до всіх трьох зображень */}
                    <img
                      src={product.images.jar.src1x}
                      srcSet={`${product.images.jar.src1x} 1x, ${product.images.jar.src2x} 2x`}
                      alt=""
                      className="w-[80%] h-auto opacity-0 pointer-events-none select-none"
                    />
                    <img
                      src={product.images.lid.src1x}
                      srcSet={`${product.images.lid.src1x} 1x, ${product.images.lid.src2x} 2x`}
                      alt={`Кришка від ${product.title}`}
                      fetchPriority="high"
                      className={`
                        absolute top-1/2 left-1/2 -translate-x-1/2 w-[80%] h-auto object-contain z-[20]
                        transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                        ${animate ? "-translate-y-[75%]" : "-translate-y-1/2"}
                      `}
                    />
                    <img
                      src={product.images.jar.src1x}
                      srcSet={`${product.images.jar.src1x} 1x, ${product.images.jar.src2x} 2x`}
                      alt={`Банка ${product.title}`}
                      fetchPriority="high"
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
                      <OrderVolumeGrid
                        packages={product.packages || []}
                        // ЗМІНЕНО: Передаємо весь об'єкт { src1x, src2x }
                        productImage={product.images.jar}
                        productTitle={product.title}
                        productKey={productKey}
                      />
                    </div>
                  </div>

                  <div className="mt-[80px] flex flex-col gap-[20px] leading-[1.6] text-left items-start text-body text-brand-black">
                    {product.indicators && product.indicators.length > 0 && (
                      <div className="flex flex-col w-full mb-2 pb-4 border-b border-brand-sand">
                        {product.indicators.map((indicator, index) => (
                          <IndicatorRow
                            key={index}
                            label={indicator.label}
                            leftLabel={indicator.leftLabel}
                            rightLabel={indicator.rightLabel}
                            value={indicator.value}
                          />
                        ))}
                      </div>
                    )}

                    {product.longDescription && product.longDescription.map((paragraph, idx) => (
                      <p key={idx} className="opacity-90">
                        {paragraph}
                      </p>
                    ))}

                    <p className="whitespace-pre-line opacity-60 text-body-small">
                      {product.specs}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ===== WHOLESALE FORM ===== */}
          <section id="wholesale-form" className="scroll-mt-[100px]">
            <div className="w-full flex justify-center">
              <div className="w-full px-layout-gap max-content">
                <WholesaleForm />
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}