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
    <div className="bg-[#E9E5DB] min-h-screen flex flex-col">
      <Header />

      <main className="bg-[#E9E5DB] pb-[120px] flex flex-col gap-[120px] flex-1">
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

        <section id="wholesale-form" className="scroll-mt-[100px]">
          <WholesaleForm />
        </section>

      </main>

      <Footer />
    </div>
  );
}
