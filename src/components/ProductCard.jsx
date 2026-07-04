import { Link } from "react-router-dom";
import FadeImage from "./FadeImage";
import ActionArrowButton from "./ActionArrowButton";

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
              text-brand-dark
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
            text-brand-dark
          "
        >
          {price}
        </p>

        <ActionArrowButton
          to={productPath}
          ariaLabel={`Відкрити товар: ${title}`}
          ringOffsetClassName="focus-visible:ring-offset-brand-sand"
        />
      </div>
    </div>
  );
}