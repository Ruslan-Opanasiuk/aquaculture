import { useState } from "react";
import { useParams } from "react-router-dom";
import OrderVolumeGrid from "../components/OrderVolumeGrid";
import WholesaleForm from "../components/WholesaleForm/WholesaleForm";
import IndicatorRow from "../components/IndicatorRow";
import SEO from "../components/SEO";
import FadeImage from "../components/FadeImage";
import NotFound from "./NotFound";

import { caviarCatalog } from "../data/caviarPackages";

// Банка і кришка — це один візуальний об'єкт, тому мають з'явитись одночасно:
// чекаємо, поки завантажаться ОБИДВА фото, і показуємо разом (інакше видно,
// що це два окремі шари, коли одне зʼявляється раніше за інше).
function ProductJarLid({ product }) {
  const [lidLoaded, setLidLoaded] = useState(false);
  const [jarLoaded, setJarLoaded] = useState(false);
  const bothLoaded = lidLoaded && jarLoaded;

  return (
    <div className="w-full relative flex justify-center items-center py-[20%]">
      {/* Invisible spacer to maintain proportions. width/height (512x512, реальні пропорції
          оптимізованих фото) — резервує висоту блоку одразу, без стрибка макета під час завантаження */}
      <img
        src={product.images.jar.src1x}
        alt=""
        width="512"
        height="512"
        className="w-[80%] h-auto opacity-0 pointer-events-none select-none"
      />

      {/* LID - Fixed at the top position */}
      <FadeImage
        src={product.images.lid.src1x}
        srcSet={`${product.images.lid.src1x} 1x, ${product.images.lid.src2x} 2x`}
        alt={`Кришка від ${product.title}`}
        fetchPriority="high"
        width="512"
        height="512"
        onLoad={() => setLidLoaded(true)}
        ready={bothLoaded}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[80%] h-auto object-contain z-[20] -translate-y-[75%]"
      />

      {/* JAR - Fixed at the bottom position */}
      <FadeImage
        src={product.images.jar.src1x}
        srcSet={`${product.images.jar.src1x} 1x, ${product.images.jar.src2x} 2x`}
        alt={`Банка ${product.title}`}
        fetchPriority="high"
        width="512"
        height="512"
        onLoad={() => setJarLoaded(true)}
        ready={bothLoaded}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[80%] h-auto object-contain z-[10] translate-y-[-25%]"
      />
    </div>
  );
}

export default function Product() {
  const { productId } = useParams();
  const productKey = productId;
  const product = caviarCatalog[productKey];

  if (!product) return <NotFound />;

  return (
    <>
      <SEO 
        title={product.title} 
        description={product.shortDescription} 
        canonical={`https://aquaculture.com/product/${productKey}`}
      />

      <div className="min-h-screen flex flex-col font-['Montserrat'] bg-brand-beige">
        {/* pb-24 (96px) або pb-32 (128px) для відступу знизу */}
        <main className="flex-1 pb-32 flex flex-col gap-24 tablet:gap-32">
          
          {/* ===== HERO / PRODUCT SECTION ===== */}
          <section className="w-full flex justify-center">
            <div className="w-full px-layout-gap max-content">
              {/* mt-30 (120px) — для відступу від хедера */}
              <div className="flex flex-col tablet:grid tablet:grid-cols-2 mt-30 gap-y-10">
                
                {/* 1. TEXT INFO */}
                <div className="
                  order-1
                  tablet:order-2
                  flex
                  flex-col
                  items-center
                  text-center
                  tablet:items-start
                  tablet:text-left
                  tablet:pl-16
                  text-brand-dark
                ">
                  <h1 className="font-semibold leading-[1.1] text-h2 uppercase tracking-tight">
                    {product.title}
                  </h1>

                  <p className="mt-5 tablet:mt-4 leading-relaxed max-w-[400px] opacity-90 text-body">
                    {product.shortDescription}
                  </p>

                  {/* --- DESKTOP DETAILS --- */}
                  <div className="hidden tablet:flex flex-col w-full">
                    <div className="mt-14">
                      <OrderVolumeGrid
                        packages={product.packages || []}
                        productImage={product.images.jar}
                        productTitle={product.title}
                        productKey={productKey}
                      />
                    </div>

                    <div className="mt-20 flex flex-col gap-5 leading-relaxed opacity-90 text-left text-body">
                      {product.indicators && product.indicators.length > 0 && (
                        <div className="flex flex-col w-full mb-4 pb-4 border-b border-brand-dark/10">
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

                      <p className="whitespace-pre-line opacity-60 text-body-small italic">
                        {product.specs}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. IMAGES (STATIC POSITION) */}
                <div className="
                  order-2
                  tablet:order-1
                  w-full
                  tablet:sticky
                  tablet:top-30
                  tablet:self-start
                ">
                  <ProductJarLid product={product} key={productKey} />
                </div>

                {/* 3. MOBILE DETAILS */}
                <div className="order-3 tablet:hidden flex flex-col">
                  <div className="w-full flex justify-center text-center">
                    <div className="w-full max-w-[450px]">
                      <OrderVolumeGrid
                        packages={product.packages || []}
                        productImage={product.images.jar}
                        productTitle={product.title}
                        productKey={productKey}
                      />
                    </div>
                  </div>

                  <div className="mt-20 flex flex-col gap-5 leading-relaxed text-left items-start text-body text-brand-dark">
                    {product.indicators && product.indicators.length > 0 && (
                      <div className="flex flex-col w-full mb-2 pb-4 border-b border-brand-dark/10">
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

                    <p className="whitespace-pre-line opacity-60 text-body-small italic">
                      {product.specs}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ===== WHOLESALE FORM ===== */}
          <section id="wholesale-form" className="scroll-mt-24">
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