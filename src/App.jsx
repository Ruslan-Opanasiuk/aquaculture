import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Product from "./pages/Product";
import Cart from "./pages/Cart";

import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* Головна сторінка */}
        <Route path="/" element={<Home />} />

        {/* Каталог */}
        <Route path="/catalog" element={<Catalog />} />

        {/* Сторінка конкретного продукту */}
        <Route path="/product/:productId" element={<Product />} />

        {/* Запасний маршрут для продукту */}
        <Route path="/product" element={<Product />} />

        {/* Кошик */}
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;