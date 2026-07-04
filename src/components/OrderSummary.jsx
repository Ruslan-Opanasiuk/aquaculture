// src/components/OrderSummary.jsx

import { useMemo } from "react";
import { useCartStore } from "../store/cartStore"; // 👈 Імпортуємо наш магазин
import { breakpoints, discountPerBreakpoint, calculateDiscount } from "./discount";
import DiscountProgressBar from "./DiscountProgressBar";
import ActionArrowButton from "./ActionArrowButton";

export default function OrderSummary({
  packages,
  quantities,
  onAddToCart,
}) {
  // 1. Дістаємо товари, які ВЖЕ лежать у глобальному кошику
  const cartItems = useCartStore((state) => state.items);

  // 2. Рахуємо вагу товарів у глобальному кошику
  const cartTotalGrams = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.grams * item.quantity), 0);
  }, [cartItems]);

  // 3. Рахуємо вагу і суму товарів, які обрані на екрані ПРЯМО ЗАРАЗ
  const { localTotalGrams, localTotalPrice } = useMemo(() => {
    return packages.reduce(
      (acc, pkg, index) => {
        const qty = Number(quantities[index] || 0);
        acc.localTotalGrams += qty * pkg.grams;
        acc.localTotalPrice += qty * pkg.price;
        return acc;
      },
      { localTotalGrams: 0, localTotalPrice: 0 }
    );
  }, [packages, quantities]);

  // 4. ФІНАЛЬНА ВАГА (Кошик + Екран) для шкали знижок
  const grandTotalGrams = cartTotalGrams + localTotalGrams;
  const totalKg = grandTotalGrams / 1000;
  
  const formattedKg = totalKg.toFixed(2);
  const formattedPrice = new Intl.NumberFormat("uk-UA").format(localTotalPrice);
  
  // Кнопка активна тільки якщо користувач обрав щось нове на екрані
  const hasSelection = localTotalGrams > 0;

  /* ================= PROGRESS BAR LOGIC ================= */
  const maxDiscount = breakpoints.length * discountPerBreakpoint;

  const currentDiscount = calculateDiscount(grandTotalGrams);
  const nextBreakpoint = breakpoints.find((bp) => bp > totalKg);
  const remainingKg = nextBreakpoint !== undefined ? (nextBreakpoint - totalKg).toFixed(2) : null;
  const isMaxDiscount = remainingKg === null;

  /* ================= HANDLERS ================= */
  const handleClick = () => {
    if (!hasSelection) return;
    if (typeof onAddToCart === "function") {
      onAddToCart();
    }
  };

  return (
    <div
      className="
        flex flex-col w-full
        items-center text-center          /* Mobile: Center */
        tablet:items-start tablet:text-left /* Desktop: Left align */
      "
      style={{
        marginTop: 40,
        fontFamily: "Montserrat, sans-serif",
        color: "#262626",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      }}
    >
      {/* TOTAL WEIGHT (Тепер показує загальну вагу з урахуванням кошика) */}
      <div style={{ fontSize: "var(--body-font-size)", fontWeight: 400, marginBottom: 56 }}>
        Загальний обʼєм{" "}
        <span style={{ fontSize: "var(--h3-font-size)", fontWeight: 600 }}>
          {formattedKg} кг
        </span>
      </div>

      {/* BREAKPOINT BAR */}
      <DiscountProgressBar totalKg={totalKg} maxWidth={400} marginBottom={24} />

      {/* DISCOUNT MESSAGE */}
      <div style={{ fontSize: "var(--body-font-size)", fontWeight: 400, marginBottom: 48, minHeight: "1.5em" }}>
        {isMaxDiscount ? (
          <>Максимальну знижку <span style={{ fontWeight: 600 }}>{maxDiscount}%</span> досягнуто</>
        ) : (
          <>До знижки <span style={{ fontWeight: 600 }}>{currentDiscount + discountPerBreakpoint}%</span> залишилось <span style={{ fontWeight: 600 }}>{remainingKg} кг</span></>
        )}
      </div>

      {/* TOTAL PRICE (Показує ціну тільки за те, що додається зараз) */}
      <div style={{ fontSize: "var(--body-font-size)", fontWeight: 400, marginBottom: 32 }}>
        Сума додання{" "}
        <span style={{ fontSize: "var(--h3-font-size)", fontWeight: 600 }}>
          {formattedPrice} ₴
        </span>
      </div>

      {/* ADD TO CART BUTTON */}
      <ActionArrowButton
        onClick={handleClick}
        label="ДОДАТИ В КОШИК"
        disabled={!hasSelection}
        ringOffsetClassName="focus-visible:ring-offset-brand-beige"
      />
    </div>
  );
}