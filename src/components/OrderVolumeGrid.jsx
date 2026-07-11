// src/components/OrderVolumeGrid.jsx

import { useEffect, useRef, useState } from "react";
import OrderVolumeItem from "./OrderVolumeItem";
import OrderSummary from "./OrderSummary";
import { useCartStore } from "../store/cartStore";

export default function OrderVolumeGrid({
  packages,
  productImage,
  productTitle,
  productKey, // ✅ додали
  maxColumns = 4,
  maxSize = 120,
  minSize = 100,
  gap = 10,
}) {
  const ref = useRef(null);
  const [layout, setLayout] = useState({ columns: 1, size: maxSize });
  const [quantities, setQuantities] = useState(() => packages.map(() => 0));

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    setQuantities(packages.map(() => 0));
  }, [packages]);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      const count = packages.length;

      let maxPhysical = 1;
      for (let c = maxColumns; c >= 1; c--) {
        const gaps = (c - 1) * gap;
        if ((width - gaps) / c >= minSize) {
          maxPhysical = c;
          break;
        }
      }

      let bestCols = 1;
      for (let c = maxPhysical; c >= 2; c--) {
        const remainder = count % c;
        if (remainder === 0 || remainder === c - 1) {
          bestCols = c;
          break;
        }
      }

      if (bestCols === 1 && maxPhysical > 1) {
        bestCols = maxPhysical;
      }

      const finalGaps = (bestCols - 1) * gap;
      const rawSize = (width - finalGaps) / bestCols;
      const finalSize = Math.min(Math.max(rawSize, minSize), maxSize);

      setLayout({ columns: bestCols, size: finalSize });
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [packages.length, maxColumns, minSize, maxSize, gap]);

  const count = packages.length;
  const { columns, size } = layout;
  const remainder = count % columns;

  const isFullRow = remainder === 0;
  const emptySlots = isFullRow ? columns : columns - remainder;

  const ctaGridColumn = isFullRow
    ? `1 / span ${columns}`
    : `auto / span ${emptySlots}`;

  const updateQuantity = (index, value) => {
    const numericValue = Math.max(0, Number(value) || 0);
    setQuantities((prev) => prev.map((v, i) => (i === index ? numericValue : v)));
  };

  return (
    <div
      ref={ref}
      className="
        flex flex-col w-full
        items-center
        tablet:items-start
      "
    >
      <div className="text-center tablet:text-left mb-8 text-body">
        СКЛАДІТЬ СВІЙ НАБІР
      </div>

      <div
        className="grid justify-center tablet:justify-start grid-cols-[repeat(var(--ovg-cols),var(--ovg-size))] gap-[var(--ovg-gap)]"
        style={{ "--ovg-cols": columns, "--ovg-size": `${size}px`, "--ovg-gap": `${gap}px` }}
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
          onClick={() =>
            document.getElementById("wholesale-form")?.scrollIntoView({ behavior: "smooth" })
          }
          className="bg-brand-sand text-brand-dark rounded-[20px] font-semibold border-none flex items-center justify-center text-center p-3 cursor-pointer transition-all duration-200 [grid-column:var(--ovg-cta-col)] min-h-[var(--ovg-cta-min-h)]"
          style={{
            "--ovg-cta-col": ctaGridColumn,
            "--ovg-cta-min-h": `${isFullRow ? size / 2.5 : size}px`,
          }}
        >
          Ви — гуртовик?
        </button>
      </div>

      <OrderSummary
        packages={packages}
        quantities={quantities}
        onAddToCart={() => {
          const itemsToAdd = packages
            .map((pkg, index) => ({
              id: pkg.id,
              productKey,          // ✅ додали
              title: productTitle,
              grams: pkg.grams,
              price: pkg.price,
              quantity: quantities[index],
              image: productImage,
            }))
            .filter((item) => item.quantity > 0);

          if (itemsToAdd.length === 0) return;

          addToCart(itemsToAdd);
          setQuantities(packages.map(() => 0));
        }}
      />
    </div>
  );
}