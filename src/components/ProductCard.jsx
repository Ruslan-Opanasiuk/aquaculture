import { Link } from "react-router-dom";

// src/components/ProductCard.jsx
function ArrowIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      {...props}
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

export default function ProductCard({
  title = "Назва продукту",
  price = "від 0 ₴",
  imageSrc,
  imageAlt = "",
  onAction,
}) {
  return (
    <div
      className="
        bg-[#FEFAF3]
        rounded-[20px]
        shadow-[-10px_-10px_22px_rgba(254,250,243,0.75),10px_10px_22px_rgba(0,0,0,0.18)]
        w-full
        h-full
        font-['Montserrat']
        p-[30px]
        flex
        flex-col
      "
    >
      <div
        className="
          h-[60px]
          flex
          items-start
        "
      >
        <h3
          className="
            font-semibold
            leading-[1.05]
          "
          style={{
            fontSize: "var(--h3-font-size)",
          }}
        >
          {title}
        </h3>
      </div>

      <div
        className="
          flex-1
          min-h-0
          w-full
        "
      >
        <div
          className="
            w-full
            h-full
            overflow-hidden
            rounded-[16px]
          "
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={imageAlt}
              className="
                w-full
                h-full
                object-cover
              "
              draggable="false"
            />
          ) : null}
        </div>
      </div>

      <div
        className="
          h-[60px]
          flex
          items-end
          justify-between
        "
      >
        <p
          className="
            font-normal
            leading-none
            text-caviar-text
            whitespace-pre-line
          "
          style={{
            fontSize: "var(--body-font-size)",
          }}
        >
          {price}
        </p>

        <Link
          to="/product"
          aria-label="Відкрити товар"
        >
          <button
            type="button"
            className="
              w-[36px]
              h-[36px]
              rounded-full
              flex
              items-center
              justify-center
              bg-black
              text-white
              hover:bg-black/90
              active:scale-[0.98]
              transition
            "
          >
            <ArrowIcon
              className="
                w-5
                h-5
              "
            />
          </button>
        </Link>
      </div>
    </div>
  );
}
