import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// 1. Динамічні імпорти (Code Splitting)
const Home = lazy(() => import("./pages/Home"));
const Catalog = lazy(() => import("./pages/Catalog"));
const Product = lazy(() => import("./pages/Product"));
const Cart = lazy(() => import("./pages/Cart"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Спільні компоненти (залишаємо статичними для миттєвої появи)
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ViewportHeightFix from "./components/ViewportHeightFix";

function App() {
  const location = useLocation();

  return (
    <>
      <a
        href="#main-content"
        className="
          sr-only focus:not-sr-only
          focus:fixed focus:top-4 focus:left-4 focus:z-[100]
          focus:rounded-full focus:bg-brand-dark focus:text-brand-beige
          focus:px-6 focus:py-3 focus:text-body
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold
        "
      >
        Перейти до основного вмісту
      </a>

      <ScrollToTop />
      <ViewportHeightFix />

      <Header />
      <Suspense fallback={<div className="min-h-screen bg-brand-beige" />}>
        {/* key={pathname} перезапускає animate-fadeIn при кожній навігації —
            плавний перехід замість миттєвого "снепу" макета */}
        <div key={location.pathname} id="main-content" tabIndex={-1} className="animate-fadeIn focus:outline-none">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/product" element={<Navigate to="/catalog" replace />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Suspense>

      <Footer />
    </>
  );
}

export default App;