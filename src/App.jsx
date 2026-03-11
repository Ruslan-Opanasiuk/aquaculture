import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Product from "./pages/Product";
import Cart from "./pages/Cart";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/product" element={<Navigate to="/catalog" replace />} />
        <Route path="/cart" element={<Cart />} />

        {/* TODO: замінити Home на справжню сторінку 404 */}
        <Route path="*" element={<Home />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;