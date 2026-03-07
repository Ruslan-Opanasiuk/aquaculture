export default function PageHeader({ title, breadcrumbs }) {
  return (
    <section
      className="w-full flex items-center"
      style={{
        height: "192px",
        backgroundColor: "var(--color-brand-sand)",
        fontFamily: "Montserrat, sans-serif",
      }}
    >
      <div className="max-w-[1200px] mx-auto text-center w-full">

        <h1
          style={{
            fontSize: "var(--h2-font-size)",
            fontWeight: 600,
            marginBottom: "8px",
          }}
        >
          {title}
        </h1>

        <div className="flex justify-center gap-2 text-[#262626]">
          {breadcrumbs.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-2"
              style={{
                fontSize: "var(--body-font-size)",
                fontWeight: 400,
              }}
            >
              {item.link ? (
                <a
                  href={item.link}
                  className="hover:opacity-70 transition"
                >
                  {item.label}
                </a>
              ) : (
                <span>{item.label}</span>
              )}

              {i < breadcrumbs.length - 1 && <span>/</span>}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}