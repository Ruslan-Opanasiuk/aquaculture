import React from "react";
import HomeHeroBanner from "../components/HomeHeroBanner"; 
import FeatureGrid from "../components/FeatureGrid";
// Тимчасові імпорти іконок для переваг. 
// Заміни на свої, коли будуть готові (наприклад SVG-іконки)
import iconOrigin from "../assets/images/grid/test-512.webp";


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
      imageSrc: iconOrigin,
      title: "Автентична текстура",
      description: "Текстура і колір без втручання"
    },
    {
      id: "selection",
      imageSrc: iconOrigin,
      title: "Відбір як мистецтво",
      description: "Кожне зерно — результат відбору"
    },
    {
      id: "traceability",
      imageSrc: iconOrigin,
      title: "Прозоре походження",
      description: "Ми знаємо походження кожного зерна"
    },
    {
      id: "quality",
      imageSrc: iconOrigin,
      title: "Гарантія якості",
      description: "Якість, за яку ми відповідаємо"
    },
    {
      id: "delivery",
      imageSrc: iconOrigin,
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
        columns={4}
        items={advantagesItems}
      />

    </main>
  );
}