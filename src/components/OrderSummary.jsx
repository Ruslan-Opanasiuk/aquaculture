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
        mt-10 font-['Montserrat'] text-brand-dark
      "
    >
      {/* TOTAL WEIGHT (Тепер показує загальну вагу з урахуванням кошика) */}
      <div className="text-body font-normal mb-14">
        Загальний обʼєм{" "}
        <span className="text-h3 font-semibold">
          {formattedKg} кг
        </span>
      </div>

      {/* BREAKPOINT BAR */}
      <DiscountProgressBar totalKg={totalKg} maxWidth={400} marginBottom={24} />

      {/* DISCOUNT MESSAGE */}
      <div className="text-body font-normal mb-12 min-h-[1.5em]">
        {isMaxDiscount ? (
          <>Максимальну знижку <span className="font-semibold">{maxDiscount}%</span> досягнуто</>
        ) : (
          <>До знижки <span className="font-semibold">{currentDiscount + discountPerBreakpoint}%</span> залишилось <span className="font-semibold">{remainingKg} кг</span></>
        )}
      </div>

      {/* TOTAL PRICE (Показує ціну тільки за те, що додається зараз) */}
      <div className="text-body font-normal mb-8">
        Сума додання{" "}
        <span className="text-h3 font-semibold">
          {formattedPrice} ₴
        </span>
      </div>

      {/* ADD TO CART BUTTON */}
      <ActionArrowButton
        onClick={handleClick}
        label="Додати в кошик"
        disabled={!hasSelection}
        ringOffsetClassName="focus-visible:ring-offset-brand-beige"
      />
    </div>
  );
}