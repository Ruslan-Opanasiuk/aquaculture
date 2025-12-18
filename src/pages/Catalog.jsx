import CatalogSection from "../components/CatalogSection";
import { catalogSections } from "../data/catalogData";
import WholesaleBanner from "../components/WholesaleBanner";

export default function Catalog() {
  return (
    <main className="bg-[#E9E5DB] pt-[120px] pb-[120px] flex flex-col gap-[120px]">
      
      <WholesaleBanner />

      <CatalogSection {...catalogSections[0]} />
      <CatalogSection {...catalogSections[2]} />
      <CatalogSection {...catalogSections[1]} />
      <CatalogSection {...catalogSections[3]} />
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

    //   <WholesaleForm />

    // </main>