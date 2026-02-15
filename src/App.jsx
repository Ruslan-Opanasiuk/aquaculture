import { Routes, Route } from "react-router-dom";
import Catalog from "./pages/Catalog";
import Product from "./pages/Product";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop /> 
      
      <Routes>
        <Route path="/" element={<Catalog />} />
        
        <Route path="/product/:productId" element={<Product />} />

        {/* Запасний маршрут (якщо хтось введе просто /product, відкриється дефолтний) */}
        <Route path="/product" element={<Product />} />
      </Routes>
    </>
  );
}

export default App;