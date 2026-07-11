// src/components/CartItem.jsx
import QuantityPicker from "./QuantityPicker";
import FadeImage from "./FadeImage";
import { Link } from "react-router-dom";
import { caviarCatalog } from "../data/caviarPackages";

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

// Винесено за межі CartItem: визначення компонента всередині рендеру створювало
// нову ідентичність на кожен ре-рендер (напр. зміна кількості) — React
// перемонтовував усе всередині, скидаючи стан FadeImage (фото фейдилось знову).
function Clickable({ productHref, children, className, ariaLabel }) {
  if (!productHref) return <div className={className}>{children}</div>;
  return (
    <Link to={productHref} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
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

  // Кошик зберігається в localStorage (Zustand persist) — item.image, якщо
  // покладатись лише на нього, "заморожує" build-час URL на диску назавжди:
  // будь-яке перейменування/переміщення файлів (як у оптимізації зображень)
  // ламає фото в кошиках, які вже лежать у браузерах користувачів. Тому
  // завжди пробуємо спершу живе фото з поточних даних товару за productKey,
  // і лише як резерв — те, що збереглось у кошику.
  const liveImage = caviarCatalog[item.productKey]?.images?.jar;
  const image = liveImage || item.image;
  const imgSrc = image?.src1x || image;
  const imgSrcSet = image?.src2x
    ? `${image.src1x} 1x, ${image.src2x} 2x`
    : undefined;

  return (
    <div className="w-full border-b-2 border-brand-sand">
      {/* ================= MOBILE ================= */}
      <div className="tablet:hidden w-full py-6">
        <div className="w-full grid items-start grid-cols-[36px_1fr_125px]">
          <div className="mt-8">
            <button
              onClick={onRemove}
              className="w-[36px] h-[36px] rounded-full flex items-center justify-center active:scale-[0.95] bg-brand-sand text-brand-dark"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          </div>

          {/* CENTER: IMAGE + COUNTER */}
          <div className="flex flex-col items-center justify-start">
            <Clickable
              productHref={productHref}
              className={`block ${productHref ? "cursor-pointer" : ""}`}
              ariaLabel={`Відкрити товар: ${item.title}`}
            >
              <div className="w-[100px] h-[100px] bg-brand-beige rounded-2xl">
                <FadeImage
                  src={imgSrc}
                  srcSet={imgSrcSet}
                  alt={item.title}
                  className="w-[100px] h-[100px] object-contain"
                  draggable={false}
                />
              </div>
            </Clickable>

            <div className="mt-6 w-[100px]">
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
          <div className="flex flex-col items-end text-right max-w-[125px]">
            <Clickable productHref={productHref} className="w-full" ariaLabel={`Відкрити товар: ${item.title}`}>
              <h3
                className={`truncate w-full text-h3 font-semibold text-brand-dark ${productHref ? "cursor-pointer" : ""}`}
              >
                {item.title}
              </h3>
            </Clickable>

            <p className="w-full text-body text-brand-dark mt-1.5">
              Фасовка: {item.grams}г
            </p>

            <div className="flex flex-col items-end w-full mt-8">
              <span className="w-full text-body text-brand-dark">
                {new Intl.NumberFormat("uk-UA").format(item.price)} ₴ / шт
              </span>

              <span className="w-full text-body font-semibold text-brand-dark mt-1.5">
                {new Intl.NumberFormat("uk-UA").format(total)} ₴
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden tablet:flex w-full items-center h-[150px]">
        <button
          onClick={onRemove}
          className="w-[36px] h-[36px] rounded-full flex items-center justify-center flex-shrink-0 active:scale-[0.95] bg-brand-sand text-brand-dark"
        >
          <CloseIcon className="w-4 h-4" />
        </button>

        <div className="w-[32px] flex-shrink-0" />

        <Clickable productHref={productHref} className="block flex-shrink-0" ariaLabel={`Відкрити товар: ${item.title}`}>
          <div className="w-[125px] h-[125px] bg-brand-beige rounded-2xl">
            <FadeImage
              src={imgSrc}
              srcSet={imgSrcSet}
              alt={item.title}
              className="w-[125px] h-[125px] object-contain"
              draggable={false}
            />
          </div>
        </Clickable>

        <div className="w-[32px] flex-shrink-0" />

        <div className="flex flex-col justify-center min-w-[200px]">
          <Clickable productHref={productHref} ariaLabel={`Відкрити товар: ${item.title}`}>
            <h3
              className={`text-h3 font-semibold text-brand-dark ${productHref ? "cursor-pointer" : ""}`}
            >
              {item.title}
            </h3>
          </Clickable>

          <p className="text-body text-brand-dark mt-1.5">
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
          <span className="text-body text-brand-dark">
            {new Intl.NumberFormat("uk-UA").format(item.price)} ₴ / шт
          </span>

          <span className="text-body font-semibold text-brand-dark mt-1.5">
            {new Intl.NumberFormat("uk-UA").format(total)} ₴
          </span>
        </div>
      </div>
    </div>
  );
}