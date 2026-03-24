import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import CatalogSection from "../components/CatalogSection";
import { catalogSections } from "../data/catalogData";
import WholesaleBanner from "../components/WholesaleBanner";
import WholesaleForm from "../components/WholesaleForm/WholesaleForm";
import PageHeader from "../components/PageHeader";


import SEO from "../components/SEO";
import { SEO_PAGES } from "../data/seoConfig";


export default function Catalog() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);

      if (el) {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: "smooth" });
        });
      }
    }
  }, [location]);

  return (
    <>
      <SEO {...SEO_PAGES.catalog} />

      <div className="min-h-screen flex flex-col animate-fadeIn bg-main">
        <main className="pb-[120px] flex flex-col gap-[80px] flex-1 bg-main">
          <WholesaleBanner />

          <PageHeader
            title="Каталог"
            breadcrumbs={[
              { label: "Головна", link: "/" },
              { label: "Каталог" },
            ]}
          />

          {catalogSections.map((section) => (
            <CatalogSection
              key={section.id}
              {...section}
            />
          ))}

          <section id="wholesale-form" className="scroll-mt-[100px]">
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
    </>
  );
}