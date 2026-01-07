// validateWholesale.jsx

export function validateWholesale(values) {
  const errors = {};

  const name = (values.name ?? "").trim();
  const phoneRaw = (values.phone ?? "").trim();
  const email = (values.email ?? "").trim();

  // 1) Контактна особа
  if (!name) {
    errors.name = "Вкажіть контактну особу";
  } else if (name.length < 2) {
    errors.name = "Ім’я занадто коротке";
  }

  // 2) Телефон
  if (!phoneRaw) {
    errors.phone = "Вкажіть номер телефону";
  } else {
    // дозволяємо: цифри, пробіли, +, (), -
    const allowed = /^[0-9+\s()-]+$/;
    if (!allowed.test(phoneRaw)) {
      errors.phone = "Некоректний формат номера";
    } else {
      const digitsCount = phoneRaw.replace(/\D/g, "").length;
      if (digitsCount < 10) {
        errors.phone = "Номер телефону занадто короткий";
      }
    }
  }

  // 3) Email
  if (!email) {
    errors.email = "Вкажіть електронну пошту";
  } else {
    // базова перевірка: щось@щось.домен
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailOk.test(email)) {
      errors.email = "Некоректна електронна пошта";
    }
  }

  // 4) Місто
  if (!values.city) {
    errors.city = "Оберіть місто";
  }

  // 5) Тип ікри
  if (!values.caviarType) {
    errors.caviarType = "Оберіть тип ікри";
  }

  // 6) Об'єми
  if (!values.caviarVolume) {
    errors.caviarVolume = "Оберіть об’єми";
  }

  // 7) Формат роботи
  if (!values.workFormat) {
    errors.workFormat = "Оберіть формат роботи";
  }

  // 8) Формат оплати
  if (!values.paymentFormat) {
    errors.paymentFormat = "Оберіть формат оплати";
  }

  return errors;
}
