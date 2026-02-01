// src/components/OrderVolumeGrid.jsx

import { useEffect, useRef, useState } from "react";
import OrderVolumeItem from "./OrderVolumeItem";

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
    setQuantities((prev) =>
      prev.map((v, i) => (i === index ? value : v))
    );
  };

  const isFullRow =
    packages.length % layout.columns === 0;

  return (
    <div ref={ref}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${layout.columns}, ${layout.size}px)`,
          gap,
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
                Math.max(0, quantities[index] - 1)
              )
            }
            onChange={(val) => updateQuantity(index, val)}
          />
        ))}

        {/* Текстовий спец-блок / CTA */}
        <a
          href="#wholesale-form"
          onClick={() => {
            document.documentElement.classList.add("smooth-scroll");
          }}
          aria-label="Перейти до гуртової анкети"
          style={{
            backgroundColor: "#000",
            color: "#fff",
            borderRadius: 20,

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",

            padding: 12,
            boxSizing: "border-box",
            textDecoration: "none",
            cursor: "pointer",

            transition: "background-color 0.2s ease",

            gridColumn: isFullRow
              ? `1 / span ${layout.columns}`
              : "span 1",

            minHeight: isFullRow
              ? layout.size / 3
              : layout.size,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#111";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#000";
          }}
        >
          Ви — гуртовик?
        </a>
      </div>
    </div>
  );
}
