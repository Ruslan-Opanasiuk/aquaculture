// src/components/OrderSummary.jsx

import { useMemo } from "react";

export default function OrderSummary({ packages, quantities }) {
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

  /* ========= BREAKPOINT CONFIG ========= */

  const breakpoints = [3, 6, 12, 24];
  const discountPerBreakpoint = 7;
  const maxDiscount = breakpoints.length * discountPerBreakpoint;

  const segmentCount = breakpoints.length + 1;
  const segmentWidth = 100 / segmentCount;

  /* ========= HYBRID PROGRESS ========= */

  let progressPercent = 0;

  if (totalKg > 0) {
    let prev = 0;

    for (let i = 0; i < breakpoints.length; i++) {
      const bp = breakpoints[i];

      if (totalKg < bp) {
        const segmentProgress =
          (totalKg - prev) / (bp - prev);

        progressPercent =
          i * segmentWidth +
          segmentProgress * segmentWidth;
        break;
      }

      prev = bp;

      if (i === breakpoints.length - 1) {
        progressPercent = segmentCount * segmentWidth;
      }
    }
  }

  /* ========= DISCOUNT INFO ========= */

  const achievedBreakpoints = breakpoints.filter(
    (bp) => totalKg >= bp
  ).length;

  const currentDiscount =
    achievedBreakpoints * discountPerBreakpoint;

  const nextBreakpoint = breakpoints.find(
    (bp) => bp > totalKg
  );

  const remainingKg =
    nextBreakpoint !== undefined
      ? (nextBreakpoint - totalKg).toFixed(2)
      : null;

  const isMaxDiscount = remainingKg === null;

  /* ========= LEGEND LOGIC ========= */

  const nextLegendKg = breakpoints.find(
    (bp) => totalKg < bp
  );

  /* =================================== */

  return (
    <div
      style={{
        marginTop: 40,
        fontFamily: "Montserrat",
        color: "rgba(0,0,0,0.85)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* TOTAL WEIGHT */}
      <div
        style={{
          fontSize: "var(--body-font-size)",
          fontWeight: 400,
          marginBottom: 56,
        }}
      >
        Загальний обʼєм:{" "}
        <span style={{ fontSize: "var(--h3-font-size)", fontWeight: 600 }}>
          {formattedKg} кг
        </span>
      </div>

      {/* BREAKPOINT BAR */}
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          position: "relative",
        }}
      >
        {/* BASE BAR */}
        <div
          style={{
            height: 8,
            width: "100%",
            backgroundColor: "#E9E5DB",
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          {/* FILLED BAR */}
          <div
            style={{
              height: "100%",
              width: `${progressPercent}%`,
              backgroundColor: "#DAC284",
              transition: "width 0.35s ease",
            }}
          />
        </div>

        {/* LABELS */}
        {breakpoints.map((kg, index) => {
          const isCompleted = totalKg >= kg;
          const isNext = nextLegendKg === kg;
          const isActive = isCompleted || isNext;

          return (
            <div
              key={kg}
              style={{
                position: "absolute",
                bottom: 18,
                left: `${((index + 1) / segmentCount) * 100}%`,
                transform: "translateX(-50%)",
                fontSize: "var(--body-font-size)",
                fontWeight: 600,
                whiteSpace: "nowrap",
                color: isActive
                  ? "rgba(0,0,0,0.85)"
                  : "rgba(0,0,0,0.5)",
              }}
            >
              {kg} кг
            </div>
          );
        })}

        {/* DOTS */}
        {breakpoints.map((kg, index) => {
          const isActive = totalKg >= kg;

          return (
            <div
              key={kg}
              style={{
                position: "absolute",
                top: "50%",
                left: `${((index + 1) / segmentCount) * 100}%`,
                transform: "translate(-50%, -50%)",
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: "#F5F1E7",
                boxSizing: "border-box",
                border: `4px solid ${
                  isActive ? "#DAC284" : "#E9E5DB"
                }`,
                transition: "border-color 0.3s ease",
              }}
            />
          );
        })}
      </div>

      {/* DISCOUNT MESSAGE */}
      <div
        style={{
          marginTop: 16,
          fontSize: "var(--body-font-size)",
          fontWeight: 400,
          marginBottom: 48,
        }}
      >
        {isMaxDiscount ? (
          <>
            Максимальну знижку{" "}
            <span style={{ fontWeight: 600 }}>
              {maxDiscount}%
            </span>{" "}
            на весь кошик досягнуто
          </>
        ) : (
          <>
            До знижки{" "}
            <span style={{ fontWeight: 600 }}>
              {currentDiscount + discountPerBreakpoint}%
            </span>{" "}
            на весь кошик залишилось:{" "}
            <span style={{ fontWeight: 600 }}>
              {remainingKg} кг
            </span>
          </>
        )}
      </div>

      {/* TOTAL PRICE */}
      <div
        style={{
          fontSize: "var(--body-font-size)",
          fontWeight: 400,
          marginBottom: 32,
        }}
      >
        Загальна сума:{" "}
        <span style={{ fontSize: "var(--h3-font-size)", fontWeight: 600 }}>
          {formattedPrice} ₴
        </span>
      </div>

      {/* ADD TO CART */}
      <div
        style={{
          fontSize: "var(--body-font-size)",
          fontWeight: 600,
          color: hasSelection
            ? "rgba(0,0,0,0.85)"
            : "rgba(0,0,0,0.4)",
          transition: "color 0.2s ease",
        }}
      >
        ДОДАТИ В КОШИК
      </div>
    </div>
  );
}
