// src/components/CartItem.jsx
import QuantityPicker from "./QuantityPicker";
import { Link } from "react-router-dom";

function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M6 6L18 18M6 18L18 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function CartItem({
  item,
  onIncrement,
  onDecrement,
  onChange,
  onRemove,
}) {
  const total = item.price * item.quantity;
  const productHref = item.productKey ? `/product/${item.productKey}` : null;

  // РОЗУМНА ЛОГІКА КАРТИНОК:
  // Підтримує як старі рядки (string), так і нові об'єкти { src1x, src2x }
  const imgSrc = item.image?.src1x || item.image;
  const imgSrcSet = item.image?.src2x 
    ? `${item.image.src1x} 1x, ${item.image.src2x} 2x` 
    : undefined;

  const Clickable = ({ children, className, ariaLabel }) => {
    if (!productHref) return <div className={className}>{children}</div>;
    return (
      <Link to={productHref} className={className} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  };

  return (
    <div
      className="w-full"
      style={{
        borderBottom: "2px solid var(--color-brand-sand)",
      }}
    >
      {/* ================= MOBILE ================= */}
      <div
        className="tablet:hidden w-full"
        style={{
          paddingTop: "24px",
          paddingBottom: "24px",
        }}
      >
        <div
          className="w-full grid items-start"
          style={{ gridTemplateColumns: "36px 1fr 125px" }}
        >
          <div style={{ marginTop: (100 - 36) / 2 }}>
            <button
              onClick={onRemove}
              className="w-[36px] h-[36px] rounded-full flex items-center justify-center active:scale-[0.95]"
              style={{
                backgroundColor: "var(--color-brand-sand)",
                color: "var(--color-brand-dark)",
              }}
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          </div>

          {/* CENTER: IMAGE + COUNTER */}
          <div className="flex flex-col items-center justify-start">
            <Clickable
              className={`block ${productHref ? "cursor-pointer" : ""}`}
              ariaLabel={`Відкрити товар: ${item.title}`}
            >
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: "var(--color-brand-beige)",
                  borderRadius: "16px",
                }}
              >
                <img
                  src={imgSrc}
                  srcSet={imgSrcSet}
                  alt={item.title}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "contain",
                  }}
                  draggable={false}
                />
              </div>
            </Clickable>

            <div style={{ marginTop: "24px", width: "100px" }}>
              <QuantityPicker
                value={item.quantity}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
                onChange={onChange}
                size={100}
              />
            </div>
          </div>

          {/* RIGHT: TEXT */}
          <div
            className="flex flex-col items-end text-right"
            style={{ maxWidth: "125px" }}
          >
            <Clickable className="w-full" ariaLabel={`Відкрити товар: ${item.title}`}>
              <h3
                className={`truncate w-full ${productHref ? "cursor-pointer" : ""}`}
                style={{
                  fontSize: "var(--h3-font-size)",
                  fontWeight: 600,
                  color: "var(--color-brand-dark)",
                }}
              >
                {item.title}
              </h3>
            </Clickable>

            <p
              className="w-full"
              style={{
                fontSize: "var(--body-font-size)",
                color: "var(--color-brand-dark)",
                marginTop: "6px",
              }}
            >
              Фасовка: {item.grams}г
            </p>

            <div className="flex flex-col items-end w-full" style={{ marginTop: "32px" }}>
              <span
                className="w-full"
                style={{
                  fontSize: "var(--body-font-size)",
                  color: "var(--color-brand-dark)",
                }}
              >
                {new Intl.NumberFormat("uk-UA").format(item.price)} ₴ / шт
              </span>

              <span
                className="w-full"
                style={{
                  fontSize: "var(--body-font-size)",
                  fontWeight: 600,
                  color: "var(--color-brand-dark)",
                  marginTop: "6px",
                }}
              >
                {new Intl.NumberFormat("uk-UA").format(total)} ₴
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden tablet:flex w-full items-center" style={{ height: "150px" }}>
        <button
          onClick={onRemove}
          className="w-[36px] h-[36px] rounded-full flex items-center justify-center flex-shrink-0 active:scale-[0.95]"
          style={{
            backgroundColor: "var(--color-brand-sand)",
            color: "var(--color-brand-dark)",
          }}
        >
          <CloseIcon className="w-4 h-4" />
        </button>

        <div className="w-[32px] flex-shrink-0" />

        <Clickable className="block flex-shrink-0" ariaLabel={`Відкрити товар: ${item.title}`}>
          <div
            style={{
              width: "125px",
              height: "125px",
              backgroundColor: "var(--color-brand-beige)",
              borderRadius: "16px",
            }}
          >
            <img
              src={imgSrc}
              srcSet={imgSrcSet}
              alt={item.title}
              style={{
                width: "125px",
                height: "125px",
                objectFit: "contain",
              }}
              draggable={false}
            />
          </div>
        </Clickable>

        <div className="w-[32px] flex-shrink-0" />

        <div className="flex flex-col justify-center min-w-[200px]">
          <Clickable ariaLabel={`Відкрити товар: ${item.title}`}>
            <h3
              className={productHref ? "cursor-pointer" : ""}
              style={{
                fontSize: "var(--h3-font-size)",
                fontWeight: 600,
                color: "var(--color-brand-dark)",
              }}
            >
              {item.title}
            </h3>
          </Clickable>

          <p
            style={{
              fontSize: "var(--body-font-size)",
              color: "var(--color-brand-dark)",
              marginTop: "6px",
            }}
          >
            Фасовка: {item.grams}г
          </p>
        </div>

        <div className="flex-1" />

        <div className="flex-shrink-0">
          <QuantityPicker
            value={item.quantity}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onChange={onChange}
            size={120}
          />
        </div>

        <div className="w-[32px] flex-shrink-0" />

        <div className="flex flex-col items-end flex-shrink-0 min-w-[140px]">
          <span
            style={{
              fontSize: "var(--body-font-size)",
              color: "var(--color-brand-dark)",
            }}
          >
            {new Intl.NumberFormat("uk-UA").format(item.price)} ₴ / шт
          </span>

          <span
            style={{
              fontSize: "var(--body-font-size)",
              fontWeight: 600,
              color: "var(--color-brand-dark)",
              marginTop: "6px",
            }}
          >
            {new Intl.NumberFormat("uk-UA").format(total)} ₴
          </span>
        </div>
      </div>
    </div>
  );
}