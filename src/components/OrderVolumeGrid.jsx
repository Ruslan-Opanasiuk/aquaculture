// src/components/OrderVolumeGrid.jsx

import { useEffect, useRef, useState } from "react";
import OrderVolumeItem from "./OrderVolumeItem";
import OrderSummary from "./OrderSummary";

export default function OrderVolumeGrid({
  packages,
  maxColumns = 4,
  maxSize = 120,
  minSize = 100,
  gap = 10,
}) {
  const ref = useRef(null);

  const [layout, setLayout] = useState({
    columns: 1,
    size: maxSize,
  });

  // кількість кожної фасовки
  const [quantities, setQuantities] = useState(() =>
    packages.map(() => 0)
  );

  // якщо зміниться список фасовок — синхронізуємось
  useEffect(() => {
    setQuantities(packages.map(() => 0));
  }, [packages]);

  // бізнес-правило по колонках
  const allowedMaxColumns =
    packages.length >= 7 ? 4 : 3;

  // layout-двигун
  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;

      const maxCols = Math.min(
        allowedMaxColumns,
        maxColumns,
        packages.length
      );

      for (let cols = maxCols; cols >= 1; cols--) {
        const gaps = (cols - 1) * gap;
        const rawSize = (width - gaps) / cols;

        if (rawSize >= minSize) {
          const size = Math.min(
            Math.max(rawSize, minSize),
            maxSize
          );

          setLayout((prev) => {
            if (
              prev.columns === cols &&
              prev.size === size
            ) {
              return prev;
            }
            return { columns: cols, size };
          });

          return;
        }
      }
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [
    packages.length,
    allowedMaxColumns,
    maxColumns,
    minSize,
    maxSize,
    gap,
  ]);

  const updateQuantity = (index, value) => {
    const numericValue = Math.max(0, Number(value) || 0);

    setQuantities((prev) =>
      prev.map((v, i) => (i === index ? numericValue : v))
    );
  };

  const isFullRow =
    packages.length % layout.columns === 0;

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // ⬅️ центр усього блоку
      }}
    >
      {/* SECTION TITLE */}
      <div
        style={{
          fontSize: "var(--body-font-size)",
          textAlign: "center",
          marginBottom: 24,
        }}
      >
        СКЛАДІТЬ СВІЙ НАБІР
      </div>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${layout.columns}, ${layout.size}px)`,
          gap,
          justifyContent: "center", // ⬅️ грід по центру
        }}
      >
        {packages.map((pkg, index) => (
          <OrderVolumeItem
            key={pkg.id}
            size={layout.size}
            imageSrc={pkg.image}
            grams={pkg.grams}
            price={pkg.price}
            value={quantities[index]}
            onIncrement={() =>
              updateQuantity(index, quantities[index] + 1)
            }
            onDecrement={() =>
              updateQuantity(
                index,
                quantities[index] - 1
              )
            }
            onChange={(val) =>
              updateQuantity(index, val)
            }
          />
        ))}

        {/* WHOLESALE CTA */}
        <a
          href="#wholesale-form"
          onClick={() => {
            document.documentElement.classList.add("smooth-scroll");
          }}
          aria-label="Перейти до гуртової анкети"
          style={{
            backgroundColor: "#E9E5DB", // ⬅️ як фасовки
            color: "#000",
            borderRadius: 20,
            fontWeight: 600,

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",

            padding: 12,
            boxSizing: "border-box",
            textDecoration: "none",
            cursor: "pointer",

            gridColumn: isFullRow
              ? `1 / span ${layout.columns}`
              : "span 1",

            minHeight: isFullRow
              ? layout.size / 3
              : layout.size,
          }}
        >
          Ви — гуртовик?
        </a>
      </div>

      {/* SUMMARY */}
      <OrderSummary
        packages={packages}
        quantities={quantities}
      />
    </div>
  );
}
