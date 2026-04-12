import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

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

function App() {
  return (
    <>
      <ScrollToTop />

      <Header />
      <Suspense fallback={<div className="min-h-screen bg-brand-beige" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/product" element={<Navigate to="/catalog" replace />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Footer />
    </>
  );
}

export default App;