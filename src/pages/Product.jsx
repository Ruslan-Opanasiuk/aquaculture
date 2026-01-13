// src/pages/Product.jsx

import { useEffect, useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

import productImage1 from "../assets/images/product1.png";
import productImage2 from "../assets/images/product2.png";

export default function Product() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // запускаємо анімацію після першого рендера
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#E9E5DB] min-h-screen flex flex-col">
      <Header />

      <main className="bg-[#E9E5DB] flex-1 pt-[80px] pb-[120px]">
        <section className="w-full flex justify-center">
          <div
            className="
              w-full
              px-layout-gap
              tablet:max-w-[794px]
              desktop:max-w-[1180px]
            "
          >
            <div
              className="
                grid
                grid-cols-1
                tablet:grid-cols-2
                mt-[100px]
              "
            >
              {/* ЛІВИЙ СТОВПЧИК — ФОТО */}
              <div className="w-full p-[20px]">
                <div
                  className="
                    relative
                    w-full
                    aspect-square
                    rounded-[20px]
                    flex
                    items-center
                    justify-center
                    overflow-hidden
                  "
                >
                  {/* Фото 1 — рухається вправо */}
                  <img
                    src={productImage1}
                    alt="Фото товару 1"
                    className={`
                      absolute
                      max-w-[350px]
                      max-h-[350px]
                      w-full
                      h-auto
                      object-contain
                      select-none
                      transition-transform
                      duration-[1200ms]
                      ease-out
                      ${animate ? "translate-x-[90px]" : "translate-x-0"}
                    `}
                    draggable="false"
                  />

                  {/* Фото 2 — рухається вліво */}
                  <img
                    src={productImage2}
                    alt="Фото товару 2"
                    className={`
                      absolute
                      max-w-[350px]
                      max-h-[350px]
                      w-full
                      h-auto
                      object-contain
                      select-none
                      transition-transform
                      duration-[1200ms]
                      ease-out
                      ${animate ? "-translate-x-[90px]" : "translate-x-0"}
                    `}
                    draggable="false"
                  />
                </div>
              </div>

              {/* ПРАВИЙ СТОВПЧИК — КОНТЕНТ */}
              <div className="p-[20px] flex flex-col gap-[20px] font-['Montserrat']">
                <h1 className="text-[56px] leading-[1.1] font-semibold">
                  Форель
                </h1>

                <p className="text-[17px] leading-[1.6] text-black/80">
                  Ікра форелі — це гармонія смаку, кольору й текстури у доступному
                  та якісному виконанні. Ікринки мають глибокий
                  червоно-помаранчевий колір, менші за розміром, ніж у горбуші,
                  та щільніші на дотик.
                </p>

                <p className="text-[17px] leading-[1.6] text-black/80">
                  Насичений смак із легкою солоністю робить її ідеальною для
                  канапок, тарталеток і закусок. Продукт добре тримає форму,
                  не розтікається та приємно хрумтить.
                </p>

                <p className="text-[17px] leading-[1.6] text-black/80 whitespace-pre-line">
                  Ікра форелі  
                  Упаковка — вак./склобанка, 100 г  
                  Виробник — ПП СВ-ІМПЕКС КО  
                  Термін зберігання — 12 міс.  
                  Без ГМО, HACCP
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
