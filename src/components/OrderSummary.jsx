// src/components/OrderSummary.jsx

import { useMemo } from "react";

function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function OrderSummary({
  packages,
  quantities,
  onAddToCart,
}) {
  const { totalGrams, totalPrice } = useMemo(() => {
    return packages.reduce(
      (acc, pkg, index) => {
        const qty = Number(quantities[index] || 0);
        acc.totalGrams += qty * pkg.grams;
        acc.totalPrice += qty * pkg.price;
        return acc;
      },
      { totalGrams: 0, totalPrice: 0 }
    );
  }, [packages, quantities]);

  const totalKg = totalGrams / 1000;
  const formattedKg = totalKg.toFixed(2);
  const formattedPrice = new Intl.NumberFormat("uk-UA").format(totalPrice);
  const hasSelection = totalKg > 0;

  /* ================= PROGRESS BAR LOGIC ================= */
  const breakpoints = [3, 6, 12, 24];
  const discountPerBreakpoint = 7;
  const maxDiscount = breakpoints.length * discountPerBreakpoint;
  const segmentCount = breakpoints.length + 1;
  const segmentWidth = 100 / segmentCount;

  let progressPercent = 0;
  if (totalKg > 0) {
    let prev = 0;
    for (let i = 0; i < breakpoints.length; i++) {
      const bp = breakpoints[i];
      if (totalKg < bp) {
        const segmentProgress = (totalKg - prev) / (bp - prev);
        progressPercent = i * segmentWidth + segmentProgress * segmentWidth;
        break;
      }
      prev = bp;
      if (i === breakpoints.length - 1) {
        progressPercent = 100;
      }
    }
  }

  const achievedBreakpoints = breakpoints.filter((bp) => totalKg >= bp).length;
  const currentDiscount = achievedBreakpoints * discountPerBreakpoint;
  const nextBreakpoint = breakpoints.find((bp) => bp > totalKg);
  const remainingKg = nextBreakpoint !== undefined ? (nextBreakpoint - totalKg).toFixed(2) : null;
  const isMaxDiscount = remainingKg === null;
  const nextLegendKg = breakpoints.find((bp) => totalKg < bp);

  /* ================= HANDLERS ================= */
  const handleClick = () => {
    if (!hasSelection) return;
    if (typeof onAddToCart === "function") {
      onAddToCart();
    }
  };

  return (
    <div
      style={{
        marginTop: 40,
        fontFamily: "Montserrat, sans-serif",
        color: "#262626",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        width: "100%",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      }}
    >
      {/* TOTAL WEIGHT */}
      <div style={{ fontSize: "var(--body-font-size)", fontWeight: 400, marginBottom: 56 }}>
        Загальний обʼєм{" "}
        <span style={{ fontSize: "var(--h3-font-size)", fontWeight: 600 }}>
          {formattedKg} кг
        </span>
      </div>

      {/* BREAKPOINT BAR */}
      <div style={{ width: "100%", maxWidth: 400, position: "relative", marginBottom: 24 }}>
        <div style={{ height: 8, width: "100%", backgroundColor: "#E9E5DB", borderRadius: 4, overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${progressPercent}%`,
              backgroundColor: "#DAC284",
              transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </div>

        {breakpoints.map((kg, index) => {
          const isCompleted = totalKg >= kg;
          const isActive = isCompleted || nextLegendKg === kg;
          const position = ((index + 1) / segmentCount) * 100;

          return (
            <div key={kg}>
              <div
                style={{
                  position: "absolute",
                  bottom: 18,
                  left: `${position}%`,
                  transform: "translateX(-50%)",
                  fontSize: "var(--body-font-size)",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  color: isActive ? "#262626" : "#B8B5AD", 
                  transition: "color 0.3s ease",
                }}
              >
                {kg} кг
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: `${position}%`,
                  transform: "translate(-50%, -50%)",
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  backgroundColor: "#F5F1E7",
                  border: `4px solid ${isCompleted ? "#DAC284" : "#E9E5DB"}`,
                  transition: "all 0.3s ease",
                  zIndex: 2,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* DISCOUNT MESSAGE */}
      <div style={{ fontSize: "var(--body-font-size)", fontWeight: 400, marginBottom: 48, minHeight: "1.5em" }}>
        {isMaxDiscount ? (
          <>Максимальну знижку <span style={{ fontWeight: 600 }}>{maxDiscount}%</span> досягнуто</>
        ) : (
          <>До знижки <span style={{ fontWeight: 600 }}>{currentDiscount + discountPerBreakpoint}%</span> залишилось <span style={{ fontWeight: 600 }}>{remainingKg} кг</span></>
        )}
      </div>

      {/* TOTAL PRICE */}
      <div style={{ fontSize: "var(--body-font-size)", fontWeight: 400, marginBottom: 32 }}>
        Загальна сума{" "}
        <span style={{ fontSize: "var(--h3-font-size)", fontWeight: 600 }}>
          {formattedPrice} ₴
        </span>
      </div>

      {/* ADD TO CART BUTTON */}
      <div
        onClick={handleClick}
        className={`
          flex items-center gap-4 select-none transition-all duration-300
          ${hasSelection ? "group cursor-pointer scale-100" : "pointer-events-none"}
        `}
      >
        <button
          type="button"
          className={`
            w-[44px] h-[44px]
            rounded-full
            flex items-center justify-center
            border-[2px]
            transition-all duration-200
            ${
              hasSelection
                ? `
                    border-black
                    bg-black text-[#F5F1E7]
                    lg:bg-transparent lg:text-black lg:group-hover:bg-black lg:group-hover:text-[#F5F1E7]
                    active:scale-90
                  `
                : `
                    border-[#B8B5AD] 
                    text-[#B8B5AD] 
                    bg-transparent
                  `
            }
          `}
        >
          <ArrowIcon className="w-6 h-6" />
        </button>

        <span
          className={`
            font-semibold tracking-wider
            transition-colors duration-200
            ${hasSelection ? "text-[#262626]" : "text-[#B8B5AD]"}
          `}
          style={{ fontSize: "var(--body-font-size)" }}
        >
          ДОДАТИ В КОШИК
        </span>
      </div>
    </div>
  );
}