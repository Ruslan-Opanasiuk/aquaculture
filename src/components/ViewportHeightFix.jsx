import { useEffect } from "react";

// Telegram in-app browser (і мобільні браузери загалом) показує/ховає свій
// тулбар при зміні напрямку скролу — це міняє window.innerHeight, і CSS
// dvh/lvh перераховуються "наживо", через що full-bleed hero-секції видимо
// "смикаються". Фіксуємо --vh один раз і оновлюємо лише при реальній зміні
// ширини (поворот екрана/ресайз), ігноруючи зміну самої лише висоти.
export default function ViewportHeightFix() {
  useEffect(() => {
    let lastWidth = window.innerWidth;

    const setVh = () => {
      document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
    };

    setVh();

    const handleResize = () => {
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        setVh();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return null;
}
