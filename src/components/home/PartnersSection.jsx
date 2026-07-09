import React from "react";

import fora1x from "../../assets/images/optimized/partners/fora-48.webp";
import fora2x from "../../assets/images/optimized/partners/fora-96.webp";
import silpo1x from "../../assets/images/optimized/partners/silpo-48.webp";
import silpo2x from "../../assets/images/optimized/partners/silpo-96.webp";
import atb1x from "../../assets/images/optimized/partners/atb-48.webp";
import atb2x from "../../assets/images/optimized/partners/atb-96.webp";
import megamarket1x from "../../assets/images/optimized/partners/megamarket-48.webp";
import megamarket2x from "../../assets/images/optimized/partners/megamarket-96.webp";

const PARTNERS = [
  { name: "Фора", src1x: fora1x, src2x: fora2x, width: 163, height: 48 },
  { name: "Сільпо", src1x: silpo1x, src2x: silpo2x, width: 120, height: 48 },
  { name: "АТБ", src1x: atb1x, src2x: atb2x, width: 128, height: 48 },
  { name: "Мегамаркет", src1x: megamarket1x, src2x: megamarket2x, width: 149, height: 48 },
];

function PartnerLogo({ partner, hidden = false }) {
  return (
    <img
      src={partner.src1x}
      srcSet={`${partner.src1x} 1x, ${partner.src2x} 2x`}
      width={partner.width}
      height={partner.height}
      alt={hidden ? "" : partner.name}
      aria-hidden={hidden || undefined}
      loading="lazy"
      className="h-9 tablet:h-12 w-auto max-w-none flex-shrink-0 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"
    />
  );
}

export default function PartnersSection() {
  return (
    <section className="w-full py-20 flex flex-col items-center">

      <h2 className="text-body font-medium text-brand-dark mb-10 tablet:mb-14 tracking-widest uppercase text-center">
        Нам довіряють
      </h2>

      <div className="w-full max-w-[940px] px-layout-gap mx-auto relative overflow-hidden group">
        <div className="flex w-max items-center animate-marquee will-change-transform">

          <div className="flex items-center gap-10 tablet:gap-20 pr-10 tablet:pr-20 justify-around flex-shrink-0">
            {PARTNERS.map((partner) => (
              <PartnerLogo key={`original-${partner.name}`} partner={partner} />
            ))}
          </div>

          <div
            className="flex items-center gap-10 tablet:gap-20 pr-10 tablet:pr-20 justify-around flex-shrink-0"
            aria-hidden="true"
          >
            {PARTNERS.map((partner) => (
              <PartnerLogo key={`duplicate-${partner.name}`} partner={partner} hidden />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}