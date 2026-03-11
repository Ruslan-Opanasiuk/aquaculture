// src/pages/Catalog.jsx

import CatalogSection from "../components/CatalogSection";
import { catalogSections } from "../data/catalogData";
import WholesaleBanner from "../components/WholesaleBanner";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WholesaleForm from "../components/WholesaleForm/WholesaleForm";
import PageHeader from "../components/PageHeader";


export default function Catalog() {
  const sectionsInOrder = [
    catalogSections[0],
    catalogSections[2],
    catalogSections[1],
    catalogSections[3],
  ];

  let offset = 0;

  return (
    <div 
      className="min-h-screen flex flex-col animate-fadeIn"
      style={{ backgroundColor: "var(--color-brand-beige)" }}
    >


      <main 
        className="pb-[120px] flex flex-col gap-[80px] flex-1"
        style={{ backgroundColor: "var(--color-brand-beige)" }}
      >
        <WholesaleBanner />

        <PageHeader
          title="Каталог"
          breadcrumbs={[
            { label: "Головна", link: "/" },
            { label: "Каталог" }
          ]}
        />

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
          className="scroll-mt-[100px]" // Збільшив відступ для кращого візуального фокусу
        >
          <div className="w-full flex justify-center">
            <div
              className="
                w-full
                px-layout-gap
                tablet:max-w-[var(--max-width-content-tablet)]
                desktop:max-w-[var(--max-width-content-desktop)]
              "
            >
              <WholesaleForm />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}