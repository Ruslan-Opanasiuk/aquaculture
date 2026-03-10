import { Routes, Route, Navigate } from "react-router-dom";

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

        {/* Якщо відкрили /product → відправляємо в каталог */}
        <Route path="/product" element={<Navigate to="/catalog" replace />} />

        {/* Кошик */}
        <Route path="/cart" element={<Cart />} />

        {/* TODO: замінити Home на справжню сторінку 404 */}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;