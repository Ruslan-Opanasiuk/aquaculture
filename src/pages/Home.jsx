import React from "react";
import HomeHeroBanner from "../components/HomeHeroBanner"; 
import FeatureGrid from "../components/FeatureGrid";
// Тимчасові імпорти іконок для переваг. 
// Заміни на свої, коли будуть готові (наприклад SVG-іконки)
import iconOrigin from "../assets/images/grid/1.1.png";
import iconTexture from "../assets/images/grid/1.2.png";
import iconSelection from "../assets/images/grid/1.3.png";
import iconTraceability from "../assets/images/grid/2.1.png";
import iconQuality from "../assets/images/grid/2.2.png";
import iconDelivery from "../assets/images/grid/2.3.png";

export default function Home() {
  
  // Новий масив даних для секції переваг
  const advantagesItems = [
    {
      id: "origin",
      imageSrc: iconOrigin,
      title: "Натуральне походження",
      description: "Смак, що формується природою"
    },
    {
      id: "texture",
      imageSrc: iconTexture,
      title: "Автентична текстура",
      description: "Текстура і колір без втручання"
    },
    {
      id: "selection",
      imageSrc: iconSelection,
      title: "Відбір як мистецтво",
      description: "Кожне зерно — результат відбору"
    },
    {
      id: "traceability",
      imageSrc: iconTraceability,
      title: "Прозоре походження",
      description: "Ми знаємо походження кожного зерна"
    },
    {
      id: "quality",
      imageSrc: iconQuality,
      title: "Гарантія якості",
      description: "Якість, за яку ми відповідаємо"
    },
    {
      id: "delivery",
      imageSrc: iconDelivery,
      title: "Швидкість і точність",
      description: "Свіжість без затримок"
    }
  ];

  return (
    <main className="min-h-screen flex flex-col font-['Montserrat'] bg-brand-beige">
      
      {/* Твій Hero Banner */}
      <HomeHeroBanner />
      
      {/* Виклик сітки з новими даними */}
      <FeatureGrid 
        title="НАШІ ПЕРЕВАГИ"
        bodyText="Ікра — це більше, ніж продукт. Це походження, відбір і точність на кожному етапі. Ми працюємо так, щоб у кожній банці зберігався її природний смак — без компромісів і випадковостей."
        columns={3} // 3 колонки на десктопі (буде 2 ряди по 3 елементи)
        items={advantagesItems}
      />

    </main>
  );
}