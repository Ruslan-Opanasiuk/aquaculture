import ProductSection from "../components/ProductSection";
import forelImg from "../assets/images/forel.webp";
import InputField from "../components/InputField";
import RadioGroup from "../components/RadioGroup";
import SelectField from "../components/SelectField";
import React, { useState } from "react";


function Catalog() {
  
  const [workFormat, setWorkFormat] = useState("");
  const [paymentFormat, setPaymentFormat] = useState("");
  const [caviarType, setCaviarType] = useState("");
  const [caviarVolume, setCaviarVolume] = useState("");
  const [city, setCity] = useState("");

  const redCaviarProducts = [
    {
      name: "чавича",
      image: forelImg,
      description: "Благородна — смак гармонії\nта сили океану.",
      price: 1234,
      indicators: [
        { label: "Колір", leftLabel: "Світлий", rightLabel: "Темний", value: 5 },
        { label: "Пружність", leftLabel: "М’яка", rightLabel: "Щільна", value: 4 },
        { label: "Розмір", leftLabel: "Дрібний", rightLabel: "Великий", value: 5 },
      ],
    },
  
    {
      name: "кіжуч",
      image: forelImg,
      description: "Благородна — смак гармонії та сили океану.",
      price: 1234,
      indicators: [
        { label: "Колір", leftLabel: "Світлий", rightLabel: "Темний", value: 4 },
        { label: "Пружність", leftLabel: "М’яка", rightLabel: "Щільна", value: 5 },
        { label: "Розмір", leftLabel: "Дрібний", rightLabel: "Великий", value: 3 },
      ],
    },

    {
      name: "нерка",
      image: forelImg,
      description: "Благородна — смак гармонії та.",
      price: 1234,
      indicators: [
        { label: "Колір", leftLabel: "Світлий", rightLabel: "Темний", value: 2 },
        { label: "Пружність", leftLabel: "М’яка", rightLabel: "Щільна", value: 3 },
        { label: "Розмір", leftLabel: "Дрібний", rightLabel: "Великий", value: 4 },
      ],
    },

    {
      name: "горбуша",
      image: forelImg,
      description: "Благородна — смак гармонії та сили океану.",
      price: 1234,
      indicators: [
        { label: "Колір", leftLabel: "Світлий", rightLabel: "Темний", value: 3 },
        { label: "Пружність", leftLabel: "М’яка", rightLabel: "Щільна", value: 3 },
        { label: "Розмір", leftLabel: "Дрібний", rightLabel: "Великий", value: 3 },
      ],
    },
    {
      name: "кета",
      image: forelImg,
      description: "Благородна — смак гармонії та сили океану.",
      price: 1234,
      indicators: [
        { label: "Колір", leftLabel: "Світлий", rightLabel: "Темний", value: 4 },
        { label: "Пружність", leftLabel: "М’яка", rightLabel: "Щільна", value: 2 },
        { label: "Розмір", leftLabel: "Дрібний", rightLabel: "Великий", value: 4 },
      ],
    },
    {
      name: "форель",
      image: forelImg,
      description: "Благородна — смак гармонії та сили океану.",
      price: 1234,
      indicators: [
        { label: "Колір", leftLabel: "Світлий", rightLabel: "Темний", value: 3 },
        { label: "Пружність", leftLabel: "М’яка", rightLabel: "Щільна", value: 3 },
        { label: "Розмір", leftLabel: "Дрібний", rightLabel: "Великий", value: 2 },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-[#FEFAF3] px-[0px] py-[0px]">
      <ProductSection
        title="червона ікра"
        description="Отримана з найцінніших видів лососевих риб, червона ікра має насичений смак моря та люксу, маслянисту текстуру, її зерна пружні, блискучі."
        sectionBg="#FEFAF3"
        cardBg="#E9E5DB"
        products={redCaviarProducts}
      />

      <h1
        className="
          text-[52.5px]
          text-center
          font-[Cormorant_Garamond]
          text-[#000000]
          mt-[134px]
          mb-[48px]
          leading-[0.9]
        "
      >
        <span className="italic">індивідуальний</span> прайс<br/>для гуртовиків
      </h1>

      {/* Підзаголовок */}
      <p
        className="
          text-[15px]
          leading-[1.5]
          text-center
          text-[#121212]/75
          font-[Montserrat]
          font-medium
          max-w-[500px]
          mx-auto
          mb-[60px]
        "
      >
        Заповніть коротку форму — ми підготуємо індивідуальну пропозицію 
        з урахуванням ваших обсягів та умов співпраці й надішлемо її 
        на email протягом кількох хвилин.
      </p>

      <div className="max-w-[400px] mx-auto">
        <InputField label="Контактна особа" />
        <InputField label="Номер телефона" />
        <InputField label="Електронна пошта" />
        
          <SelectField
            label="Місто"
            options={["Київ", "Житомир", "Львів", "Харків"]}
            value={city}
            onChange={setCity}
          />

        <div className="flex flex-row gap-[12px]">
          <SelectField
            label="Тип ікри"
            options={["Форель", "Осетер", "Лосось", "Ікра щуки"]}
            value={caviarType}
            onChange={setCaviarType}
          />
          <SelectField
            label="Об'єм на місяць"
            options={["1-10", "10-25", "25-100", "100+"]}
            value={caviarVolume}
            onChange={setCaviarVolume}
          />
        </div>

        <div className="flex flex-row gap-[12px]">
          <RadioGroup
            label="Формат роботи"
            options={["Інтернет магазин", "Торгова точка", "Власна мережа клієнтів"]}
            selected={workFormat}
            onChange={setWorkFormat}
          />
          <RadioGroup
            label="Формат оплати"
            options={["Договір", "По факту доставки"]}
            selected={paymentFormat}
            onChange={setPaymentFormat}
          />
        </div>
        
           
        <main className="min-h-screen bg-[#FEFAF3] px-[0px] pt-[0px] pb-[100px]"></main>

      </div>

    </main>
  );
}

export default Catalog;