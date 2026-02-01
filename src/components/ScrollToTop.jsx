import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // при зміні сторінки — завжди миттєво і без smooth
    document.documentElement.classList.remove("smooth-scroll");
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
