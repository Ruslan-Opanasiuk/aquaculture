import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function NotFound() {
  return (
    <>
      <SEO 
        title="Сторінку не знайдено" 
        description="На жаль, такої сторінки не існує в нашому магазині."
      />
      <div 
        className="
          relative 
          py-[160px]
          tablet:py-[192px]
          desktop:py-[256px]
          flex flex-col items-center justify-center 
          bg-brand-beige font-['Montserrat'] overflow-hidden
        "
      >
        <div 
          className="
            flex 
            tablet:absolute 
            tablet:inset-0 
            items-center 
            justify-center 
            text-brand-sand 
            text-[50vw]
            tablet:text-[45vw]
            desktop:text-[35vw]
            font-bold
            leading-none 
            tracking-tighter 
            select-none 
            opacity-50 
            z-0
            px-layout-gap
            mb-6
            tablet:mb-0
          "
          aria-hidden="true"
        >
          404
        </div>

        <main className="relative z-10 text-center px-layout-gap flex flex-col items-center">
          
          <h1 className="max-w-[460px] text-h3 font-semibold text-brand-black mb-4 leading-tight">
            Упс! Сторінку не знайдено
          </h1>
          
          <p className="max-w-[460px] text-body text-brand-black mb-8 opacity-90 leading-relaxed">
            Сторінка, яку ви шукаєте, була переміщена, видалена або ніколи не існувала. Але не хвилюйтеся, вся наша ікра чекає на вас у каталозі.
          </p>

          <Link
            to="/catalog"
            className="
              inline-flex
              items-center
              justify-center
              rounded-full
              px-6
              min-h-[44px]
              text-body
              bg-brand-dark
              text-brand-light
              hover:opacity-90
              transition-opacity
              focus-visible:ring-2
              focus-visible:ring-brand-gold
              focus-visible:ring-offset-2
              focus-visible:ring-offset-brand-beige
              focus-visible:outline-none
            "
          >
            Перейти до каталогу
          </Link>
          
        </main>
      </div>
    </>
  );
}