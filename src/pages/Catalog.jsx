import CatalogSection from "../components/CatalogSection";
import { catalogSections } from "../data/catalogData";
import WholesaleBanner from "../components/WholesaleBanner";
import Header from "../components/Header";
import WholesaleForm from "../components/old/WholesaleForm";

export default function Catalog() {
  return (
    <div className="bg-[#E9E5DB] min-h-screen">
      <Header />

      <main className="bg-[#E9E5DB] pb-[120px] flex flex-col gap-[120px]">
        {/* Hero-банер на повен екран, під хедером, але візуально перекривається ним */}
        <WholesaleBanner />

        {/* Каталог — у тому самому порядку, який ти задав */}
        <CatalogSection {...catalogSections[0]} />
        <CatalogSection {...catalogSections[2]} />
        <CatalogSection {...catalogSections[1]} />
        <CatalogSection {...catalogSections[3]} />

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