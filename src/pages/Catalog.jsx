// src/pages/Catalog.jsx

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import CatalogSection from "../components/CatalogSection";
import { catalogSections } from "../data/catalogData";
import WholesaleBanner from "../components/WholesaleBanner";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WholesaleForm from "../components/WholesaleForm/WholesaleForm";
import PageHeader from "../components/PageHeader";

export default function Catalog() {
  const location = useLocation();

  // ===== SCROLL TO HASH =====
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);

      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 50);
      }
    }
  }, [location]);

  // ===== ORDER OF SECTIONS =====
  const sectionsInOrder = [
    { ...catalogSections[0], id: "red-caviar" },
    { ...catalogSections[2], id: "black-caviar" },
    { ...catalogSections[1], id: "white-caviar" },
    { ...catalogSections[3], id: "welcome_pack" },
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
            { label: "Каталог" },
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
              id={section.id}
            />
          );
        })}

        {/* ===== WHOLESALE FORM ===== */}
        <section
          id="wholesale-form"
          className="scroll-mt-[100px]"
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