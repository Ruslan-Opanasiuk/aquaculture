import { breakpoints } from "./discount";

// Шкала прогресу до знижок за обʼємом. Один компонент для кошика й картки товару.
// Стилі-відмінності між викликами — через пропси (ширина, нижній відступ, колір «дірки» точки).
export default function DiscountProgressBar({
  totalKg,
  maxWidth,
  marginBottom = 18,
  dotColor = "var(--color-brand-beige)",
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
    <div style={{ width: "100%", maxWidth, position: "relative", marginBottom }}>
      <div
        style={{
          height: 8,
          width: "100%",
          backgroundColor: "var(--color-brand-sand)",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progressPercent}%`,
            backgroundColor: "var(--color-brand-gold)",
            transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </div>

      {breakpoints.map((kg, index) => {
        const isCompleted = totalKg >= kg;
        const isActive = isCompleted || nextLegendKg === kg;
        const position = ((index + 1) / segmentCount) * 100;

        return (
          <div key={kg}>
            <div
              style={{
                position: "absolute",
                bottom: 18,
                left: `${position}%`,
                transform: "translateX(-50%)",
                fontSize: "var(--body-font-size)",
                fontWeight: 600,
                whiteSpace: "nowrap",
                color: isActive
                  ? "var(--color-brand-dark)"
                  : "var(--color-brand-gray)",
                transition: "color 0.3s ease",
              }}
            >
              {kg} кг
            </div>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: `${position}%`,
                transform: "translate(-50%, -50%)",
                width: 18,
                height: 18,
                borderRadius: "50%",
                backgroundColor: dotColor,
                border: `4px solid ${
                  isCompleted
                    ? "var(--color-brand-gold)"
                    : "var(--color-brand-sand)"
                }`,
                transition: "all 0.3s ease",
                zIndex: 2,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
