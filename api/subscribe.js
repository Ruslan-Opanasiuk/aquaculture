import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const isValidEmail = (v) =>
  typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// Vercel Serverless Function: POST /api/subscribe
// Кладе email у список контактів Resend (для майбутніх розсилок).
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  const { email } = req.body || {};

  if (!isValidEmail(email)) {
    return res
      .status(400)
      .json({ ok: false, message: "Некоректна email-адреса." });
  }

  try {
    const { error } = await resend.contacts.create({ email });

    // Уже підписаний — теж вважаємо успіхом.
    if (error && !/already|exist/i.test(error.message || "")) {
      return res
        .status(502)
        .json({ ok: false, message: "Не вдалося підписатися. Спробуйте пізніше." });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[subscribe] error:", err?.message);
    return res
      .status(500)
      .json({ ok: false, message: "Помилка сервера. Спробуйте пізніше." });
  }
}
