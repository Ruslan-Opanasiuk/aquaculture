// src/pages/Catalog.jsx
import CatalogSection from "../components/CatalogSection";
import { catalogSections } from "../data/catalogData";
import WholesaleBanner from "../components/WholesaleBanner";
import Header from "../components/Header";
// import WholesaleForm from "../components/old/WholesaleForm";

export default function Catalog() {
  const sectionsInOrder = [
    catalogSections[0],
    catalogSections[2],
    catalogSections[1],
    catalogSections[3],
  ];

  let offset = 0;

  return (
    <div className="bg-[#E9E5DB] min-h-screen">
      <Header />

      <main className="bg-[#E9E5DB] pb-[120px] flex flex-col gap-[120px]">
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

        {/* <WholesaleForm /> */}
      </main>
    </div>
  );
}





    // <main className="min-h-screen bg-[#FEFAF3] px-[0px] py-[50px]">
    //   <ProductSection
    //     title="червона ікра"
    //     description="ОТРИМАНА З НАЙЦІННІШИХ ВИДІВ ЛОСОСЕВИХ РИБ, ЧЕРВОНА ІКРА МАЄ НАСИЧЕНИЙ СМАК МОРЯ ТА НІЖНУ, МАСЛЯНИСТУ ТЕКСТУРУ. ЇЇ ЗЕРНА ПРУЖНІ, БЛИСКУЧІ."
    //     sectionBg="#E9E5DB"
    //     cardBg="#FEFAF3"
    //     products={redCaviarProducts}
    //   />

    //   

    // </main>