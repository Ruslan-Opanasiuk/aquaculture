import React, { useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import RadioGroup from "./RadioGroup";
import { questionnaireFonts } from "../theme/fontSizes";

export default function WholesaleForm() {
  const [workFormat, setWorkFormat] = useState("");
  const [paymentFormat, setPaymentFormat] = useState("");
  const [caviarType, setCaviarType] = useState("");
  const [caviarVolume, setCaviarVolume] = useState("");
  const [city, setCity] = useState("");

  return (
    <div className="w-full">

      {/* Заголовок */}
      <h1
        className="
          text-center
          font-[Cormorant_Garamond]
          text-[#000000]
          mt-[134px]
          mb-[48px]
          leading-[0.9]
          whitespace-nowrap
        "
        style={{
            fontSize: questionnaireFonts.title,
        }}
      >
        <span className="italic">індивідуальний</span> прайс<br />для гуртовиків
      </h1>

      {/* Підзаголовок */}
      <p
        className="
          leading-[1.5]
          text-center
          text-[#121212]/75
          font-[Montserrat]
          font-medium
          max-w-[400px]
          mx-auto
          mb-[60px]
        "
        style={{
            fontSize: questionnaireFonts.subtitle,
        }}
      >
        Заповніть коротку форму — ми підготуємо індивідуальну пропозицію 
        з урахуванням ваших обсягів та умов співпраці й надішлемо її 
        на email протягом кількох хвилин.
      </p>

      {/* Форма */}
      <div className="max-w-[400px] mx-auto px-[24px] md:px-0">
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
            label="Об'єми"
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

        <div className="h-[100px]"></div>
      </div>
    </div>
  );
}
