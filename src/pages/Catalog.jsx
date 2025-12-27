// src/pages/Catalog.jsx (або де в тебе Catalog)
import CatalogSection from "../components/CatalogSection";
import WholesaleBanner from "../components/WholesaleBanner";
import { catalogSections, productVariantsList } from "../data/catalogData";

export default function Catalog() {
  let cursor = 0;

  return (
    <main className="bg-[#E9E5DB] pb-[120px] flex flex-col gap-[120px]">
      <WholesaleBanner />

      {catalogSections.map((section) => {
        const items = productVariantsList
          .slice(cursor, cursor + section.count)
          .map((p, idx) => ({ ...p, key: `${p.key}-${cursor + idx}` }));

        cursor += section.count;

        return (
          <CatalogSection
            key={section.title}
            title={section.title}
            subtitle={section.subtitle}
            items={items}
          />
        );
      })}

      {/* <WholesaleForm /> */}
    </main>
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