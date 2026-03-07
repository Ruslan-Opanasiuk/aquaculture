import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <main className="min-h-[70vh] flex items-center justify-center">
        <Link
          to="/catalog"
          className="px-8 py-4 bg-black text-white text-lg rounded-lg hover:bg-black/90 active:scale-[0.98] transition"
        >
          Каталог
        </Link>
      </main>

      <Footer />
    </>
  );
}