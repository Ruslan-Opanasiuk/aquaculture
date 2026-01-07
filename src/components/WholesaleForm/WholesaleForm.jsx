import React, { useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import RadioGroup from "./RadioGroup";
import { validateWholesale } from "./validateWholesale";

export default function WholesaleForm() {
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    caviarType: "",
    caviarVolume: "",
    workFormat: "",
    paymentFormat: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));

    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });

    if (isSubmitted) setIsSubmitted(false);
    if (submitError) setSubmitError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = validateWholesale(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/wholesale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        throw new Error(data?.message || "Не вдалося надіслати заявку. Спробуйте ще раз.");
      }

      setIsSubmitted(true);

      // За бажанням: очистити форму після успіху
      setValues({
        name: "",
        phone: "",
        email: "",
        city: "",
        caviarType: "",
        caviarVolume: "",
        workFormat: "",
        paymentFormat: "",
      });
      setErrors({});
    } catch (err) {
      setSubmitError(err?.message || "Помилка відправки. Спробуйте ще раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <h1
        className="
          text-center
          font-['Montserrat']
          text-[28px]
          font-semibold
          mt-[48px]
          mb-[48px]
          leading-[0.9]
        "
      >
        Індивідуальний прайс для гуртовиків
      </h1>

      <p
        className="
          leading-[1.5]
          text-center
          text-[17px]
          text-[#121212]/75
          font-[Montserrat]
          font-medium
          max-w-[400px]
          mx-auto
          mb-[60px]
        "
      >
        Заповніть коротку форму — ми підготуємо індивідуальну пропозицію з
        урахуванням ваших обсягів та умов співпраці й надішлемо її на email
        протягом кількох хвилин.
      </p>

      <form
        onSubmit={handleSubmit}
        className="max-w-[400px] mx-auto px-[24px] md:px-0"
        noValidate
      >
        <InputField
          label="Контактна особа"
          value={values.name}
          onChange={(v) => handleChange("name", v)}
          error={errors.name}
        />

        <InputField
          label="Номер телефона"
          value={values.phone}
          onChange={(v) => handleChange("phone", v)}
          error={errors.phone}
        />

        <InputField
          label="Електронна пошта"
          value={values.email}
          onChange={(v) => handleChange("email", v)}
          error={errors.email}
          type="email"
        />

        <SelectField
          label="Місто"
          options={["Київ", "Житомир", "Львів", "Харків"]}
          value={values.city}
          onChange={(v) => handleChange("city", v)}
          error={errors.city}
        />

        <div className="flex flex-row gap-[12px]">
          <SelectField
            label="Тип ікри"
            options={["Форель", "Осетер", "Лосось", "Ікра щуки"]}
            value={values.caviarType}
            onChange={(v) => handleChange("caviarType", v)}
            error={errors.caviarType}
          />
          <SelectField
            label="Об'єми"
            options={["1-10", "10-25", "25-100", "100+"]}
            value={values.caviarVolume}
            onChange={(v) => handleChange("caviarVolume", v)}
            error={errors.caviarVolume}
          />
        </div>

        <div className="flex flex-row gap-[12px]">
          <RadioGroup
            label="Формат роботи"
            options={["Інтернет магазин", "Торгова точка", "Власна мережа клієнтів"]}
            selected={values.workFormat}
            onChange={(v) => handleChange("workFormat", v)}
            error={errors.workFormat}
          />
          <RadioGroup
            label="Формат оплати"
            options={["Договір", "По факту доставки"]}
            selected={values.paymentFormat}
            onChange={(v) => handleChange("paymentFormat", v)}
            error={errors.paymentFormat}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            mt-[28px]
            w-full
            h-[52px]
            rounded-[10px]
            bg-black
            text-white
            font-[Montserrat]
            text-[16px]
            font-semibold
            transition-opacity
            hover:opacity-90
            disabled:opacity-50
            disabled:cursor-not-allowed
          `}
        >
          {isSubmitting ? "Надсилаємо..." : "Надіслати заявку"}
        </button>

        {submitError && (
          <p className="mt-[10px] font-[Montserrat] text-[14px] text-[#b00020] text-center">
            {submitError}
          </p>
        )}

        {isSubmitted && (
          <p className="mt-[10px] font-[Montserrat] text-[14px] text-center text-[#121212]/75">
            Дякуємо. Ми надіслали лист на вашу пошту.
          </p>
        )}

        <div className="h-[100px]" />
      </form>
    </div>
  );
}
