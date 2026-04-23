// Імпортуємо всі іконки (1x та 2x)
// Brand Features
import origin1x from "../assets/images/home_grid/feature-origin-256.webp";
import origin2x from "../assets/images/home_grid/feature-origin-512.webp";
import texture1x from "../assets/images/home_grid/feature-texture-256.webp";
import texture2x from "../assets/images/home_grid/feature-texture-512.webp";
import selection1x from "../assets/images/home_grid/feature-selection-256.webp";
import selection2x from "../assets/images/home_grid/feature-selection-512.webp";
import traceability1x from "../assets/images/home_grid/feature-traceability-256.webp";
import traceability2x from "../assets/images/home_grid/feature-traceability-512.webp";
import quality1x from "../assets/images/home_grid/feature-quality-256.webp";
import quality2x from "../assets/images/home_grid/feature-quality-512.webp";
import delivery1x from "../assets/images/home_grid/feature-delivery-256.webp";
import delivery2x from "../assets/images/home_grid/feature-delivery-512.webp";

// Collaboration Features
import horeca1x from "../assets/images/home_grid/collab-horeca-256.webp";
import horeca2x from "../assets/images/home_grid/collab-horeca-512.webp";
import wholesale1x from "../assets/images/home_grid/collab-wholesale-256.webp";
import wholesale2x from "../assets/images/home_grid/collab-wholesale-512.webp";
import personal1x from "../assets/images/home_grid/collab-personal-256.webp";
import personal2x from "../assets/images/home_grid/collab-personal-512.webp";
import request1x from "../assets/images/home_grid/collab-request-256.webp";
import request2x from "../assets/images/home_grid/collab-request-512.webp";
import formation1x from "../assets/images/home_grid/collab-formation-256.webp";
import formation2x from "../assets/images/home_grid/collab-formation-512.webp";
import collabDelivery1x from "../assets/images/home_grid/collab-delivery-256.webp";
import collabDelivery2x from "../assets/images/home_grid/collab-delivery-512.webp";

export const brandFeatures = [
  {
    id: "feature-origin",
    images: { src1x: origin1x, src2x: origin2x },
    title: "Натуральне походження",
    description: "Смак, сформований природою"
  },
  {
    id: "feature-texture",
    images: { src1x: texture1x, src2x: texture2x },
    title: "Автентична текстура",
    description: "Без втручання і зайвої обробки"
  },
  {
    id: "feature-selection",
    images: { src1x: selection1x, src2x: selection2x },
    title: "Відбір як мистецтво",
    description: "Кожне зерно — результат відбору"
  },
  {
    id: "feature-traceability",
    images: { src1x: traceability1x, src2x: traceability2x },
    title: "Прозоре походження",
    description: "Ми знаємо походження кожного зерна"
  },
  {
    id: "feature-quality",
    images: { src1x: quality1x, src2x: quality2x },
    title: "Гарантія якості",
    description: "Якість, за яку ми відповідаємо"
  },
  {
    id: "feature-delivery",
    images: { src1x: delivery1x, src2x: delivery2x },
    title: "Швидкість і точність",
    description: "Свіжість без затримок"
  }
];

export const collaborationFeatures = [
  {
    id: "collab-horeca",
    images: { src1x: horeca1x, src2x: horeca2x },
    title: "HoReCa",
    description: "Для кухні, де важлива кожна деталь"
  },
  {
    id: "collab-wholesale",
    images: { src1x: wholesale1x, src2x: wholesale2x },
    title: "Гуртові клієнти",
    description: "Для бізнесу, що обирає стабільність"
  },
  {
    id: "collab-personal",
    images: { src1x: personal1x, src2x: personal2x },
    title: "Особистий вибір",
    description: "Для тих, хто цінує справжнє"
  },
  {
    id: "collab-request",
    images: { src1x: request1x, src2x: request2x },
    title: "Запит",
    description: "Ви формуєте запит — ми пропонуємо рішення"
  },
  {
    id: "collab-formation",
    images: { src1x: formation1x, src2x: formation2x },
    title: "Формування",
    description: "Підбираємо продукт під вашу задачу"
  },
  {
    id: "collab-delivery",
    images: { src1x: collabDelivery1x, src2x: collabDelivery2x },
    title: "Доставка",
    description: "Доставляємо швидко та з дотриманням умов"
  }
];

export const reviews = [
  {
    id: 1,
    title: "Неймовірний смак",
    text: "Це найкраща ікра, яку ми коли-небудь їли за цю ціну! Не можна повірити глибині смаку. Ця ікра є зіркою, їсти її прямо з банки – це досвід, який варто отримати!",
    author: "Олександр М.",
  },
  {
    id: 2,
    title: "Ідеально для свята",
    text: "Замовляли чорну ікру на ювілей. Якість пакування і швидкість доставки приємно вразили. Смак дуже ніжний, ікринки одна до одної. Гості були в захваті.",
    author: "Олена К.",
  },
  {
    id: 3,
    title: "Справжній преміум",
    text: "Довго шукав надійного постачальника. Ця ікра дійсно без компромісів. Чудова текстура і той самий автентичний післясмак. Рекомендую всім поціновувачам.",
    author: "Дмитро В.",
  },
];