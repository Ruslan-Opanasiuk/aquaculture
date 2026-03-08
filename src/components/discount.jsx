export function calculateDiscount(totalGrams) {
  const breakpoints = [3, 6, 12, 24];
  const discountPerBreakpoint = 7;

  const totalKg = totalGrams / 1000;

  const achieved = breakpoints.filter(
    (bp) => totalKg >= bp
  ).length;

  const percent = achieved * discountPerBreakpoint;

  return percent;
}