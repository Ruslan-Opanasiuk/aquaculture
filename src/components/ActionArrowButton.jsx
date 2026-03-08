import { Link } from "react-router-dom";

function ArrowIcon({ direction = "right", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ActionArrowButton({
  label,
  to,
  onClick,
  direction = "right",
  variant = "filled", // filled | outline
}) {
  const isFilled = variant === "filled";

  const circleClasses = `
    w-[36px] h-[36px]
    rounded-full
    flex items-center justify-center
    border-[1px] border-black
    transition-all duration-200
    active:scale-90
    ${
      isFilled
        ? `
          bg-black text-[#F5F1E7]
          lg:bg-transparent lg:text-black 
          lg:group-hover:bg-black lg:group-hover:text-[#F5F1E7]
        `
        : `
          bg-transparent text-black
          lg:group-hover:bg-black lg:group-hover:text-[#F5F1E7]
        `
    }
  `;

  const content = (
    <div className="flex items-center gap-4 group cursor-pointer select-none transition-all duration-300">
      <button type="button" onClick={onClick} className={circleClasses}>
        <ArrowIcon
          className={`w-6 h-6 ${
            direction === "left" ? "rotate-180" : ""
          }`}
        />
      </button>

      <span
        className="font-medium tracking-wider text-[#262626]"
        style={{ fontSize: "var(--body-font-size)" }}
      >
        {label}
      </span>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-block">
        {content}
      </Link>
    );
  }

  return content;
}