import { Routes, Route } from "react-router-dom";
import Catalog from "./pages/Catalog";
import Product from "./pages/Product";
import ScrollToTop from "./components/ScrollToTop"; // 1. Імпортуємо

function App() {
  return (
    <>
      <ScrollToTop /> {/* 2. Вставляємо тут, щоб він працював на всіх сторінках */}
      
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </>
  );
}

export default App;