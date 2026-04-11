import React, { useState, useRef } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import RadioGroup from "./RadioGroup";
import { validateWholesale } from "./validateWholesale";

export default function WholesaleForm() {
  const [step, setStep] = useState(1);
  
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
  const [isTransitioning, setIsTransitioning] = useState(false);

  // ДОДАНО: Реф для скролу
  const formTopRef = useRef(null);

  // ДОДАНО: Функція плавного скролу
  const scrollToStep = () => {
    if (formTopRef.current) {
      // Використовуємо setTimeout, щоб дати React мілісекунду на відмальовку нового кроку
      setTimeout(() => {
        formTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  };

  const handleChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));

    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });

    if (isSubmitted) setIsSubmitted(false);
  };

  const handleNextStep = () => {
    const allErrors = validateWholesale(values);
    
    const fieldsToValidate = step === 1 
      ? ["name", "phone", "email", "city"] 
      : ["caviarType", "caviarVolume"];

    let hasErrors = false;
    const stepErrors = { ...errors };

    fieldsToValidate.forEach((field) => {
      if (allErrors[field]) {
        stepErrors[field] = allErrors[field];
        hasErrors = true;
      } else {
        delete stepErrors[field];
      }
    });

    if (hasErrors) {
      setErrors(stepErrors);
      return;
    }

    setErrors((prev) => {
      const next = { ...prev };
      if (step === 1) {
        delete next.caviarType; delete next.caviarVolume;
        delete next.workFormat; delete next.paymentFormat;
      }
      if (step === 2) {
        delete next.workFormat; delete next.paymentFormat;
      }
      return next;
    });

    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 300);

    setStep((prev) => Math.min(prev + 1, 3));
    scrollToStep(); // ДОДАНО: Скролимо наверх при успішному переході вперед
  };

  const prevStep = () => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next.workFormat; 
      delete next.paymentFormat;
      return next;
    });
    setStep((prev) => Math.max(prev - 1, 1));
    scrollToStep(); // ДОДАНО: Скролимо наверх при поверненні назад
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step < 3) {
      handleNextStep();
      return;
    }

    if (isTransitioning) return;

    const finalErrors = validateWholesale(values);
    setErrors(finalErrors);

    if (Object.keys(finalErrors).length > 0) {
      if (finalErrors.name || finalErrors.phone || finalErrors.email || finalErrors.city) {
        setStep(1);
      } else if (finalErrors.caviarType || finalErrors.caviarVolume) {
        setStep(2);
      }
      scrollToStep(); // ДОДАНО: Якщо є помилка, скролимо туди, де вона сталася
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setStep(1);
      setValues({
        name: "", phone: "", email: "", city: "",
        caviarType: "", caviarVolume: "", workFormat: "", paymentFormat: "",
      });
      setErrors({});
      scrollToStep(); // Опціонально: скролимо на початок після успішної відправки
    }, 1000);
  };

  const stepTitles = {
    1: "Контактні дані",
    2: "Асортимент і обсяги",
    3: "Модель співпраці",
  };

  return (
    <section 
      className="
        w-screen 
        relative 
        left-1/2 
        -translate-x-1/2 
        bg-brand-sand 
        py-[64px] 
        flex 
        justify-center 
        font-['Montserrat']
      "
    >
      <div className="w-full px-layout-gap max-w-[980px] mx-auto">
        <div className="flex flex-col tablet:grid tablet:grid-cols-2 gap-[40px] tablet:gap-[60px] desktop:gap-[100px] items-start">
          
          <div className="flex flex-col text-left text-brand-black">
            <h2 className="text-h2 font-semibold leading-[1.1] mb-6">
              Прайс для гуртовиків
            </h2>
            <p className="text-body opacity-90 leading-[1.6] max-w-[440px]">
              Заповніть коротку форму — ми підготуємо індивідуальну пропозицію з
              урахуванням ваших обсягів та умов співпраці й надішлемо її на email
              протягом кількох хвилин.
            </p>
          </div>

          {/* ДОДАНО ref={formTopRef} та scroll-mt-[100px] для правильного позиціонування під шапкою */}
          <div className="w-full scroll-mt-[100px]" ref={formTopRef}>
            <div className="mb-6 border-b border-brand-dark/10 pb-4">
              <p className="text-body-small opacity-60 font-semibold mb-1 tracking-wider">
                КРОК {step} з 3
              </p>
              <h3 className="text-h3 font-semibold text-brand-black">
                {stepTitles[step]}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col" noValidate>
              
              {step === 1 && (
                <div className="flex flex-col gap-[16px] animate-fadeIn">
                  <InputField
                    label="Контактна особа"
                    placeholder="Іван Іванов"
                    value={values.name}
                    onChange={(v) => handleChange("name", v)}
                    error={errors.name}
                  />
                  <InputField
                    label="Номер телефона"
                    placeholder="+380 50 000 00 00"
                    value={values.phone}
                    onChange={(v) => handleChange("phone", v)}
                    error={errors.phone}
                  />
                  <InputField
                    label="Електронна пошта"
                    placeholder="email@example.com"
                    value={values.email}
                    onChange={(v) => handleChange("email", v)}
                    error={errors.email}
                    type="email"
                  />
                  <SelectField
                    label="Місто"
                    placeholder="Оберіть або введіть місто"
                    searchable={true}
                    options={[
                      "Вінниця", "Дніпро", "Донецьк", "Житомир", "Запоріжжя", 
                      "Івано-Франківськ", "Київ", "Кропивницький", "Луганськ", "Луцьк", 
                      "Львів", "Миколаїв", "Одеса", "Полтава", "Рівне", 
                      "Сімферополь", "Суми", "Тернопіль", "Ужгород", "Харків", 
                      "Херсон", "Хмельницький", "Черкаси", "Чернівці", "Чернігів"
                    ]}
                    value={values.city}
                    onChange={(v) => handleChange("city", v)}
                    error={errors.city}
                  />
                </div>
              )}

              {step === 2 && (
                <div className="flex flex-col gap-[16px] animate-fadeIn">
                  <SelectField
                    label="Тип ікри"
                    placeholder="Оберіть тип ікри"
                    options={["Форель", "Осетер", "Лосось", "Ікра щуки"]}
                    value={values.caviarType}
                    onChange={(v) => handleChange("caviarType", v)}
                    error={errors.caviarType}
                  />
                  <SelectField
                    label="Об'єми"
                    placeholder="Оберіть об'єм (кг)"
                    options={["1-10", "10-25", "25-100", "100+"]}
                    value={values.caviarVolume}
                    onChange={(v) => handleChange("caviarVolume", v)}
                    error={errors.caviarVolume}
                  />
                </div>
              )}

              {step === 3 && (
                <div className="flex flex-col gap-[16px] animate-fadeIn">
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
              )}

              <div className="flex gap-4 mt-[24px]">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="
                      w-1/3
                      h-[44px]
                      rounded-full
                      bg-transparent
                      border border-brand-dark/20
                      text-brand-black
                      text-body
                      font-medium
                      hover:bg-brand-dark/5
                      transition-colors
                      focus-visible:ring-2
                      focus-visible:ring-brand-gold
                      focus-visible:outline-none
                    "
                  >
                    Назад
                  </button>
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="
                      flex-1
                      h-[44px]
                      rounded-full
                      bg-brand-dark
                      text-brand-light
                      text-body
                      font-medium
                      hover:opacity-90
                      transition-opacity
                      focus-visible:ring-2
                      focus-visible:ring-brand-gold
                      focus-visible:ring-offset-2
                      focus-visible:ring-offset-brand-sand
                      focus-visible:outline-none
                    "
                  >
                    Далі
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="
                      flex-1
                      h-[44px]
                      rounded-full
                      bg-brand-dark
                      text-brand-light
                      text-body
                      font-medium
                      hover:opacity-90
                      transition-opacity
                      disabled:opacity-50
                      disabled:cursor-not-allowed
                      focus-visible:ring-2
                      focus-visible:ring-brand-gold
                      focus-visible:ring-offset-2
                      focus-visible:ring-offset-brand-sand
                      focus-visible:outline-none
                    "
                  >
                    {isSubmitting ? "Надсилаємо..." : "Надіслати заявку"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}