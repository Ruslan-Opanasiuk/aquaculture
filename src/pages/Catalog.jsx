// src/pages/Catalog.jsx

import CatalogSection from "../components/CatalogSection";
import { catalogSections } from "../data/catalogData";
import WholesaleBanner from "../components/WholesaleBanner";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WholesaleForm from "../components/WholesaleForm/WholesaleForm";

export default function Catalog() {
  const sectionsInOrder = [
    catalogSections[0],
    catalogSections[2],
    catalogSections[1],
    catalogSections[3],
  ];

  let offset = 0;

  return (
    <div className="bg-[#F5F1E7] min-h-screen flex flex-col">
      <Header />

      <main className="bg-[#F5F1E7] pb-[120px] flex flex-col gap-[120px] flex-1">
        <WholesaleBanner />

        {sectionsInOrder.map((section) => {
          const startIndex = offset;
          offset += section.count;

          return (
            <CatalogSection
              key={section.title}
              {...section}
              startIndex={startIndex}
            />
          );
        })}

        {/* ===== WHOLESALE FORM ===== */}
        <section
          id="wholesale-form"
          className="scroll-mt-[50px]"
        >
          <div className="w-full flex justify-center">
            <div
              className="
                w-full
                px-layout-gap
                tablet:max-w-[794px]
                desktop:max-w-[1180px]
              "
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
