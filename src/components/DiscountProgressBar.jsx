import { breakpoints } from "./discount";

// Шкала прогресу до знижок за обʼємом. Один компонент для кошика й картки товару.
// Стилі-відмінності між викликами — через пропси (ширина, нижній відступ, колір «дірки» точки).
export default function DiscountProgressBar({
  totalKg,
  maxWidth,
  marginBottom = 18,
}) {
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

  const nextLegendKg = breakpoints.find((bp) => totalKg < bp);

  return (
    <div
      className="relative w-full max-w-[var(--dpb-max-w)] mb-[var(--dpb-mb)]"
      style={{ "--dpb-max-w": maxWidth ? `${maxWidth}px` : "none", "--dpb-mb": `${marginBottom}px` }}
    >
      <div className="h-2 w-full bg-brand-sand rounded overflow-hidden">
        <div
          className="h-full bg-brand-gold transition-[width] duration-[400ms] w-[var(--dpb-progress)]"
          style={{ "--dpb-progress": `${progressPercent}%` }}
        />
      </div>

      {breakpoints.map((kg, index) => {
        const isCompleted = totalKg >= kg;
        const isActive = isCompleted || nextLegendKg === kg;
        const position = ((index + 1) / segmentCount) * 100;

        return (
          <div key={kg}>
            <div
              className={`absolute bottom-[18px] -translate-x-1/2 text-body font-semibold whitespace-nowrap transition-colors duration-300 left-[var(--dpb-pos)] ${
                isActive ? "text-brand-dark" : "text-brand-gray"
              }`}
              style={{ "--dpb-pos": `${position}%` }}
            >
              {kg} кг
            </div>
            <div
              className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-[18px] h-[18px] rounded-full bg-brand-beige border-4 transition-all duration-300 z-[2] left-[var(--dpb-pos)] ${
                isCompleted ? "border-brand-gold" : "border-brand-sand"
              }`}
              style={{ "--dpb-pos": `${position}%` }}
            />
          </div>
        );
      })}
    </div>
  );
}
