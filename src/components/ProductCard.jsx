import { Link } from "react-router-dom";

function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function ProductCard({
  id,
  title = "Назва продукту",
  price = "від 0 ₴",
  imageSrc,
  imageAlt = "",
  onAction,
}) {
  const productPath = id ? `/product/${id}` : "/product";

  return (
    <div
      className="
        rounded-[20px]
        w-full
        h-full
        font-['Montserrat']
        p-[30px]
        flex
        flex-col
      "
      style={{ 
        backgroundColor: "var(--color-brand-sand)",
        /* Shadow commented out as requested: */
        /* boxShadow: "-10px -10px 22px rgba(254,250,243,0.75), 10px 10px 22px rgba(0,0,0,0.18)" */
      }}
    >
      <div className="h-[60px] flex items-start">
        <h3
          className="font-semibold leading-[1.05]"
          style={{ 
            fontSize: "var(--h3-font-size)",
            color: "var(--color-brand-dark)" 
          }}
        >
          {title}
        </h3>
      </div>

      <div className="flex-1 min-h-0 w-full mt-4">
        <div 
          className="w-full h-full overflow-hidden rounded-[16px]"
          style={{ backgroundColor: "var(--color-brand-sand)" }} // Легкий фон для контейнера фото
        >
          <Link to={productPath} className="block w-full h-full">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover"
                draggable="false"
              />
            ) : null}
          </Link>
        </div>
      </div>

      <div className="h-[60px] flex items-end justify-between mt-4">
        <p
          className="font-normal leading-none whitespace-pre-line"
          style={{ 
            fontSize: "var(--body-font-size)",
            color: "var(--color-brand-dark)" 
          }}
        >
          {price}
        </p>

        <Link to={productPath} aria-label="Відкрити товар">
          <button
            type="button"
            className="
              w-[36px]
              h-[36px]
              rounded-full
              flex
              items-center
              justify-center
              transition-all
              active:scale-[0.92]
            "
            style={{ 
              backgroundColor: "var(--color-brand-dark)",
              color: "var(--color-brand-light)" 
            }}
          >
            <ArrowIcon className="w-5 h-5" />
          </button>
        </Link>
      </div>
    </div>
  );
}