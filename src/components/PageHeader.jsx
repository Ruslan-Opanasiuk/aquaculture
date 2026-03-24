import { Link } from "react-router-dom"; 

export default function PageHeader({ title, breadcrumbs }) {
  return (
    <section
      className="
        w-full 
        flex 
        items-center 
        h-[192px] 
        bg-brand-sand 
        font-['Montserrat']
      "
    >
      <div className="max-w-[1200px] mx-auto text-center w-full px-layout-gap">
        
        <h1
          className="
            text-h2 
            font-semibold 
            mb-2
            text-brand-black
          "
        >
          {title}
        </h1>

        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap justify-center gap-2 text-brand-black text-body">
            {breadcrumbs.map((item, i) => {
              const isLast = i === breadcrumbs.length - 1;

              return (
                <li key={item.label} className="flex items-center gap-2">
                  {item.link ? (
                    <Link
                      to={item.link}
                      className="
                        min-h-[44px]
                        flex 
                        items-center 
                        hover:opacity-70 
                        transition-opacity
                        focus-visible:ring-2 
                        focus-visible:ring-brand-gold 
                        focus-visible:outline-none 
                        rounded-sm
                      "
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span 
                      className={isLast ? "text-brand-black" : ""}
                      aria-current={isLast ? "page" : undefined}
                    >
                      {item.label}
                    </span>
                  )}

                  {!isLast && (
                    <span className="text-brand-black select-none" aria-hidden="true">
                      /
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

      </div>
    </section>
  );
}