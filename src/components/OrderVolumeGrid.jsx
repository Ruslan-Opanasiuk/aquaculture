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
  const [layout, setLayout] = useState({ columns: 1, size: maxSize });
  const [quantities, setQuantities] = useState(() => packages.map(() => 0));

  useEffect(() => {
    setQuantities(packages.map(() => 0));
  }, [packages]);

  /* ================= SMART GRID ENGINE ================= */
  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      const count = packages.length;

      // 1. Спершу дізнаємось, скільки колонок взагалі може влізти фізично
      let maxPhysical = 1;
      for (let c = maxColumns; c >= 1; c--) {
        const gaps = (c - 1) * gap;
        if ((width - gaps) / c >= minSize) {
          maxPhysical = c;
          break;
        }
      }

      // 2. Тепер шукаємо найкращу кількість колонок (bestCols) серед тих, що влазять
      // Ми хочемо таку кількість, щоб залишок був 0 або 1
      let bestCols = 1;
      
      // Шукаємо від найбільшої можливої фізично вниз
      for (let c = maxPhysical; c >= 2; c--) {
        const remainder = count % c;
        // Умова: або рядок повний (0), або не вистачає рівно одного до повного (c - 1)
        // Тобто філер або ляже вниз (0), або займе 1 місце (c-1)
        if (remainder === 0 || remainder === c - 1) {
          bestCols = c;
          break;
        }
      }

      // Якщо для 2, 3, 4 колонок ніде немає ідеального залишку,
      // беремо просто maxPhysical, або залишаємо 1 (якщо це телефон)
      if (bestCols === 1 && maxPhysical > 1) {
        bestCols = maxPhysical;
      }

      // 3. Рахуємо фінальний розмір для обраної кількости колонок
      const finalGaps = (bestCols - 1) * gap;
      const rawSize = (width - finalGaps) / bestCols;
      const finalSize = Math.min(Math.max(rawSize, minSize), maxSize);

      setLayout({ columns: bestCols, size: finalSize });
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [packages.length, maxColumns, minSize, maxSize, gap]);

  /* ================= FILLER CALCULATION ================= */
  
  const count = packages.length;
  const { columns, size } = layout;
  const remainder = count % columns;
  
  // Якщо remainder === 0, значить всі товари зайняли повні рядки. Філер йде вниз на всю ширину.
  // Якщо remainder > 0, філер має зайняти решту місця в рядку (columns - remainder).
  const isFullRow = remainder === 0;
  const emptySlots = isFullRow ? columns : columns - remainder;
  
  const ctaSpan = `span ${emptySlots}`;
  const ctaGridColumn = isFullRow ? `1 / span ${columns}` : `auto / span ${emptySlots}`;

  /* ================= HANDLERS ================= */

  const updateQuantity = (index, value) => {
    const numericValue = Math.max(0, Number(value) || 0);
    setQuantities((prev) => prev.map((v, i) => (i === index ? numericValue : v)));
  };

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      <div style={{ fontSize: "var(--body-font-size)", textAlign: "center", marginBottom: 32 }}>
        СКЛАДІТЬ СВІЙ НАБІР
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, ${size}px)`,
          gap,
          justifyContent: "center",
        }}
      >
        {packages.map((pkg, index) => (
          <OrderVolumeItem
            key={pkg.id}
            size={size}
            imageSrc={pkg.image}
            grams={pkg.grams}
            price={pkg.price}
            value={quantities[index]}
            onIncrement={() => updateQuantity(index, quantities[index] + 1)}
            onDecrement={() => updateQuantity(index, quantities[index] - 1)}
            onChange={(val) => updateQuantity(index, val)}
          />
        ))}

        <button
          onClick={() => document.getElementById("wholesale-form")?.scrollIntoView({ behavior: "smooth" })}
          style={{
            backgroundColor: "#E9E5DB",
            color: "#000",
            borderRadius: 20,
            fontWeight: 600,
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: 12,
            cursor: "pointer",
            gridColumn: ctaGridColumn,
            // Якщо філер займає весь рядок (окремо), робимо його вужчим
            minHeight: isFullRow ? size / 2.5 : size,
            transition: "all 0.2s ease",
          }}
        >
          Ви — гуртовик?
        </button>
      </div>

      <OrderSummary
        packages={packages}
        quantities={quantities}
        onAddToCart={() => setQuantities(packages.map(() => 0))}
      />
    </div>
  );
}