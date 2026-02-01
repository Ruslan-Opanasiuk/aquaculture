// src/pages/Product.jsx

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import OrderVolumeGrid from "../components/OrderVolumeGrid";
import WholesaleForm from "../components/WholesaleForm/WholesaleForm";

import productImage1 from "../assets/images/product1.png";
import productImage2 from "../assets/images/product2.png";

import { caviarCatalog } from "../data/caviarPackages";

export default function Product() {
  const product = caviarCatalog.trout;
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setAnimate(true);
    }, 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="
        bg-[#F5F1E7]
        min-h-screen
        flex
        flex-col
        font-['Montserrat']
      "
    >
      <Header />

      <main
        className="
          bg-[#F5F1E7]
          flex-1
          pt-[40px]
          pb-[120px]
          flex
          flex-col
          gap-[100px]
          tablet:gap-[160px]
        "
      >
        {/* ===== HERO / PRODUCT SECTION ===== */}
        <section
          className="
            w-full
            flex
            justify-center
          "
        >
          <div
            className="
              w-full
              px-layout-gap
            "
            style={{
              maxWidth: "var(--content-max-width)",
            }}
          >
            <div
              className="
                flex
                flex-col
                tablet:grid
                tablet:grid-cols-2
                mt-[60px]
                tablet:mt-[100px]
                gap-y-[40px]
              "
            >
              {/* 1. TOP TEXT */}
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
                "
              >
                <span
                  className="
                    uppercase
                    tracking-[0.12em]
                    text-black/50
                  "
                  style={{
                    fontSize: "13px",
                  }}
                >
                  Аквакультура
                </span>

                <h1
                  className="
                    font-semibold
                    leading-[1.1]
                  "
                  style={{
                    fontSize: "var(--h2-font-size)",
                  }}
                >
                  Форель
                </h1>

                <p
                  className="
                    mt-[20px]
                    tablet:mt-[30px]
                    leading-[1.6]
                    text-black/80
                    max-w-[400px]
                    tablet:max-w-none
                  "
                  style={{
                    fontSize: "var(--body-font-size)",
                  }}
                >
                  Ніжна, збалансована та яскрава за смаком.
                </p>

                {/* DESKTOP ONLY */}
                <div
                  className="
                    hidden
                    tablet:flex
                    flex-col
                    w-full
                  "
                >
                  <div
                    className="
                      mt-[40px]
                      mx-[-10px]
                      tablet:mx-0
                    "
                  >
                    <OrderVolumeGrid packages={product.packages} />
                  </div>

                  <div
                    className="
                      mt-[20px]
                      flex
                      flex-col
                      gap-[20px]
                      leading-[1.6]
                      text-black/80
                      text-left
                    "
                    style={{
                      fontSize: "var(--body-font-size)",
                    }}
                  >
                    <p>
                      Ікра форелі — це гармонія смаку, кольору й текстури у доступному
                      та якісному виконанні. Ікринки мають глибокий
                      червоно-помаранчевий колір, менші за розміром, ніж у горбуші,
                      та щільніші на дотик.
                    </p>
                    <p>
                      Насичений смак із легкою солоністю робить її ідеальною для
                      канапок, тарталеток і закусок.
                    </p>
                    <p
                      className="
                        whitespace-pre-line
                        opacity-60
                      "
                      style={{
                        fontSize: "15px",
                      }}
                    >
                      Ікра форелі{"\n"}
                      Упаковка — вак./склобанка, 100 г{"\n"}
                      Виробник — ПП СВ-ІМПЕКС КО{"\n"}
                      Термін зберігання — 12 міс.{"\n"}
                      Без ГМО, HACCP
                    </p>
                  </div>
                </div>
              </div>

              {/* 2. IMAGES */}
              <div
                className="
                  order-2
                  tablet:order-1
                  w-full
                "
              >
                <div
                  className="
                    w-full
                    relative
                    flex
                    justify-center
                    items-center
                    py-[20%]
                  "
                >
                  <img
                    src={productImage1}
                    alt=""
                    className="
                      w-[80%]
                      h-auto
                      opacity-0
                      pointer-events-none
                      select-none
                    "
                    aria-hidden="true"
                  />

                  <img
                    src={productImage2}
                    alt="Кришка"
                    className={`
                      absolute
                      top-1/2
                      left-1/2
                      -translate-x-1/2
                      w-[80%]
                      h-auto
                      object-contain
                      z-[20]
                      transition-transform
                      duration-[1200ms]
                      ease-[cubic-bezier(0.22,1,0.36,1)]
                      ${animate ? "-translate-y-[75%]" : "-translate-y-1/2"}
                    `}
                  />

                  <img
                    src={productImage1}
                    alt="Банка"
                    className={`
                      absolute
                      top-1/2
                      left-1/2
                      -translate-x-1/2
                      w-[80%]
                      h-auto
                      object-contain
                      z-[10]
                      transition-transform
                      duration-[1200ms]
                      ease-[cubic-bezier(0.22,1,0.36,1)]
                      ${animate ? "translate-y-[-25%]" : "-translate-y-1/2"}
                    `}
                  />
                </div>
              </div>

              {/* 3. MOBILE CONTENT */}
              <div
                className="
                  order-3
                  tablet:hidden
                  flex
                  flex-col
                "
              >
                <div
                  className="
                    w-full
                    flex
                    justify-center
                    text-center
                  "
                >
                  <div
                    className="
                      w-full
                      max-w-[450px]
                    "
                  >
                    <OrderVolumeGrid packages={product.packages} />
                  </div>
                </div>

                <div
                  className="
                    mt-[40px]
                    flex
                    flex-col
                    gap-[20px]
                    leading-[1.6]
                    text-black/80
                    text-left
                    items-start
                  "
                  style={{
                    fontSize: "var(--body-font-size)",
                  }}
                >
                  <p>
                    Ікра форелі — це гармонія смаку, кольору й текстури у доступному
                    та якісному виконанні. Ікринки мають глибокий
                    червоно-помаранчевий колір, менші за розміром, ніж у горбуші,
                    та щільніші на дотик.
                  </p>
                  <p>
                    Насичений смак із легкою солоністю робить її ідеальною для
                    канапок, тарталеток і закусок. Продукт добре тримає форму,
                    не розтікається та приємно хрумтить.
                  </p>
                  <p
                    className="
                      whitespace-pre-line
                      opacity-60
                    "
                    style={{
                      fontSize: "15px",
                    }}
                  >
                    Ікра форелі{"\n"}
                    Упаковка — вак./склобанка, 100 г{"\n"}
                    Виробник — ПП СВ-ІМПЕКС КО{"\n"}
                    Термін зберігання — 12 міс.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== WHOLESALE FORM ===== */}
        <section
          id="wholesale-form"
          className="scroll-mt-[50px]"
        >
          <div
            className="
              w-full
              flex
              justify-center
            "
          >
            <div
              className="
                w-full
                px-layout-gap
              "
              style={{
                maxWidth: "var(--content-max-width)",
              }}
            >
              <WholesaleForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
