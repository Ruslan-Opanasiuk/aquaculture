import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const OWNER_EMAIL = process.env.WHOLESALE_OWNER_EMAIL;
const FROM_EMAIL = process.env.WHOLESALE_FROM_EMAIL || "onboarding@resend.dev";

const isValidEmail = (v) =>
  typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const REQUIRED = ["name", "phone", "email", "city", "caviarType", "caviarVolume"];

// Rate limit: max 3 заявки з одного IP за 60 хвилин.
const rateLimitMap = new Map();
const LIMIT = 3;
const WINDOW_MS = 60 * 60 * 1000;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip) || { count: 0, resetAt: now + WINDOW_MS };
  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + WINDOW_MS;
  }
  entry.count += 1;
  rateLimitMap.set(ip, entry);
  return entry.count > LIMIT;
}

// Vercel Serverless Function: POST /api/wholesale
// 1. Шле сповіщення власнику з усіма полями анкети.
// 2. Шле підтвердження на email користувача.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return res.status(429).json({
      ok: false,
      message: "Ви вже надіслали кілька заявок. Якщо маєте питання — телефонуйте нам напряму.",
    });
  }

  const body = req.body || {};
  const { name, phone, email, city, caviarType, caviarVolume, workFormat, paymentFormat } = body;

  // Базова серверна валідація
  const missing = REQUIRED.filter((f) => !body[f]?.toString().trim());
  if (missing.length > 0) {
    return res.status(400).json({ ok: false, message: "Не всі обов'язкові поля заповнені." });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ ok: false, message: "Некоректна email-адреса." });
  }

  const fieldRows = [
    ["Контактна особа", name],
    ["Телефон", phone],
    ["Email", email],
    ["Місто", city],
    ["Тип ікри", caviarType],
    ["Об'єм (кг)", caviarVolume],
    ["Формат роботи", workFormat || "—"],
    ["Формат оплати", paymentFormat || "—"],
  ];

  const tableRows = fieldRows
    .map(([label, value]) => `<tr><td style="padding:6px 12px;color:#6b7280;white-space:nowrap">${label}</td><td style="padding:6px 12px;font-weight:500">${value}</td></tr>`)
    .join("");

  const ownerHtml = `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
      <h2 style="font-size:20px;margin-bottom:16px">Нова заявка від гуртовика</h2>
      <table style="border-collapse:collapse;width:100%;background:#f9fafb;border-radius:8px;overflow:hidden">
        ${tableRows}
      </table>
    </div>`;

  const userHtml = `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
      <h2 style="font-size:20px;margin-bottom:8px">Дякуємо за заявку, ${name}!</h2>
      <p style="color:#6b7280;margin-bottom:16px">Ми отримали вашу анкету та підготуємо індивідуальну пропозицію. Очікуйте на відповідь найближчим часом.</p>
      <h3 style="font-size:15px;margin-bottom:8px">Ваші дані:</h3>
      <table style="border-collapse:collapse;width:100%;background:#f9fafb;border-radius:8px;overflow:hidden">
        ${tableRows}
      </table>
      <p style="color:#9ca3af;font-size:13px;margin-top:24px">Aquaculture — преміальна ікра</p>
    </div>`;

  try {
    const sends = [];

    if (OWNER_EMAIL) {
      sends.push(
        resend.emails.send({
          from: FROM_EMAIL,
          to: OWNER_EMAIL,
          subject: `Нова заявка: ${name} (${city})`,
          html: ownerHtml,
        })
      );
    }

    sends.push(
      resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "Aquaculture — ми отримали вашу заявку",
        html: userHtml,
      })
    );

    await Promise.all(sends);

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[wholesale] error:", err?.message);
    return res.status(500).json({ ok: false, message: "Помилка сервера. Спробуйте пізніше." });
  }
}
