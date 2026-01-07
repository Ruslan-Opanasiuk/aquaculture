import express from "express";
import { Resend } from "resend";

const app = express();
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/api/wholesale", async (req, res) => {
  try {
    const values = req.body;

    // 1) ВАЖЛИВО: повторна валідація на бекенді (мінімум)
    if (!values?.email || !values?.name) {
      return res.status(400).json({ ok: false, message: "Некоректні дані форми." });
    }

    // 2) Лист користувачу (на вказану адресу)
    await resend.emails.send({
      from: "Caviar <no-reply@yourdomain.com>", // має бути домен, який ти підтвердив у провайдера
      to: values.email,
      subject: "Ваш запит на гуртовий прайс отримано",
      text:
        `Вітаємо, ${values.name}!\n\n` +
        `Ми отримали ваш запит на індивідуальний гуртовий прайс.\n` +
        `Параметри:\n` +
        `Місто: ${values.city || "-"}\n` +
        `Тип ікри: ${values.caviarType || "-"}\n` +
        `Об'єми: ${values.caviarVolume || "-"}\n` +
        `Формат роботи: ${values.workFormat || "-"}\n` +
        `Формат оплати: ${values.paymentFormat || "-"}\n\n` +
        `Ми підготуємо пропозицію та надішлемо вам найближчим часом.`,
    });

    // (Опційно) лист менеджеру/внутрішній inbox — дуже рекомендую
    // await resend.emails.send({
    //   from: "Caviar <no-reply@yourdomain.com>",
    //   to: "sales@yourdomain.com",
    //   subject: "Нова гуртова заявка",
    //   text: JSON.stringify(values, null, 2),
    // });

    return res.json({ ok: true });
  } catch (e) {
    return res.status(500).json({ ok: false, message: "Помилка сервера при відправці листа." });
  }
});

app.listen(3001, () => console.log("Server running on :3001"));
