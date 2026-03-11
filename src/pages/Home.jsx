import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main
      className="min-h-[70vh] flex items-center justify-center"
      style={{ backgroundColor: "var(--color-brand-beige)" }}
    >
      <Link
        to="/catalog"
        className="px-8 py-4 bg-black text-white text-lg rounded-lg hover:bg-black/90 active:scale-[0.98] transition"
      >
        Каталог
      </Link>
    </main>
  );
}