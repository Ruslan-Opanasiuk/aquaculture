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
  imageAlt = ""
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
        bg-brand-sand
      "
    >
      <div className="h-[60px] flex items-start">
        <h3
          className="
            font-semibold 
            leading-[1.05]
            text-h3
            text-brand-black
          "
        >
          {title}
        </h3>
      </div>

      <div className="flex-1 min-h-0 w-full mt-4">
        <div 
          className="
            w-full 
            aspect-square
            overflow-hidden 
            rounded-[16px] 
            bg-brand-sand 
          " 
        >
          <Link to={productPath} className="block w-full h-full" tabIndex="-1" aria-hidden="true">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={imageAlt}
                loading="lazy"
                className="w-full h-full object-cover"
                draggable="false"
              />
            ) : null}
          </Link>
        </div>
      </div>

      <div className="h-[60px] flex items-end justify-between mt-4">
        <p
          className="
            font-normal 
            leading-none 
            whitespace-pre-line
            text-body
            text-brand-black
          "
        >
          {price}
        </p>

        <Link 
          to={productPath} 
          aria-label={`Відкрити товар: ${title}`}
          className="
            w-[44px]
            h-[44px]
            rounded-full
            flex
            items-center
            justify-center
            transition-all
            active:scale-[0.92]
            bg-brand-dark
            text-brand-light
            hover:opacity-90
            focus-visible:ring-2
            focus-visible:ring-brand-gold
            focus-visible:ring-offset-2
            focus-visible:ring-offset-brand-sand
            focus-visible:outline-none
          "
        >
          <ArrowIcon className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}