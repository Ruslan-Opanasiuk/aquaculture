// Єдине джерело правди для логіки знижок за обʼємом.
// Пороги: від 3кг → 7%, 6кг → 14%, 12кг → 21%, 24кг → 28%.
export const breakpoints = [3, 6, 12, 24];
export const discountPerBreakpoint = 7;

// Знижка у відсотках за сумарною вагою (у грамах).
export function calculateDiscount(totalGrams) {
  const totalKg = totalGrams / 1000;
  const achieved = breakpoints.filter((bp) => totalKg >= bp).length;
  return achieved * discountPerBreakpoint;
}
