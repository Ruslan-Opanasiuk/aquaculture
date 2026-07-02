import { Link } from "react-router-dom";
import FadeImage from "./FadeImage";

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
  images, 
  imageAlt = ""
}) {
  const productPath = id ? `/product/${id}` : "/product";

  return (
    <div
      className="
        rounded-3xl
        w-full
        h-full
        font-['Montserrat']
        p-6 tablet:p-8 
        flex
        flex-col
        bg-brand-sand
      "
    >
      {/* h-16 = 64px. Гарантує стабільну висоту заголовка */}
      <div className="h-16 flex items-start">
        {/* Додали посилання на назву для кращого UX на мобільних */}
        <Link 
          to={productPath} 
          className="group focus-visible:outline-none rounded-md focus-visible:ring-2 focus-visible:ring-brand-gold"
        >
          <h3
            className="
              font-semibold 
              leading-[1.05]
              text-h3
              text-brand-black
              group-hover:text-brand-dark transition-colors
            "
          >
            {title}
          </h3>
        </Link>
      </div>

      <div className="flex-1 min-h-0 w-full mt-4">
        <div 
          className="
            w-full 
            aspect-square
            overflow-hidden 
            rounded-2xl 
          "
        >
          <Link to={productPath} className="block w-full h-full" tabIndex="-1" aria-hidden="true">
            {images && images.src1x ? (
              <FadeImage
                src={images.src1x}
                srcSet={`${images.src1x} 1x, ${images.src2x} 2x`}
                alt={imageAlt}
                loading="lazy"
                className="w-full h-full object-cover"
                draggable="false"
              />
            ) : null}
          </Link>
        </div>
      </div>

      <div className="h-16 flex items-end justify-between mt-4">
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
            w-11 h-11 
            rounded-full
            flex
            items-center
            justify-center
            transition 
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