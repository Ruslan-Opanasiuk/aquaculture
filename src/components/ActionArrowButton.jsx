import { Link } from "react-router-dom";

function ArrowIcon({ direction = "right", className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`${className} ${direction === "left" ? "rotate-180" : ""}`}
    >
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const CIRCLE_SIZE = { md: "w-11 h-11", sm: "w-9 h-9" };
const ICON_SIZE = { md: "w-5 h-5", sm: "w-[18px] h-[18px]" };

function circleClasses({ size, variant, tone, disabled }) {
  const base = `${CIRCLE_SIZE[size]} rounded-full flex items-center justify-center shrink-0 transition-all duration-200 active:scale-[0.92]`;

  if (disabled) {
    return `${base} bg-transparent border border-brand-gray text-brand-gray`;
  }
  if (tone === "footer") {
    return `${base} bg-footer text-brand-beige group-hover:bg-card group-hover:text-brand-dark`;
  }
  if (variant === "outline") {
    return `${base} bg-transparent border border-brand-dark text-brand-dark group-hover:bg-brand-dark group-hover:text-brand-light`;
  }
  return `${base} bg-brand-dark text-brand-light group-hover:opacity-90`;
}

// Єдина кнопка-стрілка для всього сайту (ProductCard, OrderSummary, Cart,
// Footer). size="sm" — для контекстів з обмеженим місцем (кнопка всередині
// інпута футера), size="md" (за замовчуванням) — для самостійних кнопок.
export default function ActionArrowButton({
  label,
  ariaLabel,
  to,
  onClick,
  type = "button",
  direction = "right",
  variant = "filled", // filled | outline
  size = "md", // md | sm
  tone = "default", // default | footer
  disabled = false,
  ringOffsetClassName = "focus-visible:ring-offset-brand-beige",
  className = "",
}) {
  const circle = (
    <div className={circleClasses({ size, variant, tone, disabled })}>
      <ArrowIcon direction={direction} className={ICON_SIZE[size]} />
    </div>
  );

  const content = label ? (
    <>
      {circle}
      <span
        className={`font-semibold tracking-wider transition-colors duration-200 ${disabled ? "text-brand-gray" : "text-brand-dark"}`}
        style={{ fontSize: "var(--body-font-size)" }}
      >
        {label}
      </span>
    </>
  ) : (
    circle
  );

  const wrapperClasses = `
    group inline-flex items-center gap-4 select-none transition-all duration-300
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2
    ${ringOffsetClassName}
    ${!label ? "rounded-full" : ""}
    ${disabled ? "pointer-events-none cursor-default" : "cursor-pointer"}
    ${className}
  `;

  if (to) {
    return (
      <Link
        to={to}
        aria-label={label ? undefined : ariaLabel}
        className={wrapperClasses}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={label ? undefined : ariaLabel}
      className={wrapperClasses}
    >
      {content}
    </button>
  );
}
