import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const OWNER_EMAIL = process.env.WHOLESALE_OWNER_EMAIL;
const FROM_EMAIL = process.env.WHOLESALE_FROM_EMAIL || "onboarding@resend.dev";

const isValidEmail = (v) =>
  typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// Rate limit: 3 замовлення з одного IP за 60 хвилин.
const rateLimitMap = new Map();
const LIMIT = 3;
const WINDOW_MS = 60 * 60 * 1000;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip) || { count: 0, resetAt: now + WINDOW_MS };
  if (now > entry.resetAt) { entry.count = 0; entry.resetAt = now + WINDOW_MS; }
  entry.count += 1;
  rateLimitMap.set(ip, entry);
  return entry.count > LIMIT;
}

// Vercel Serverless Function: POST /api/checkout
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return res.status(429).json({ ok: false, message: "Забагато спроб. Спробуйте пізніше." });
  }

  const { contact, items, subtotal, discount, total, discountPercent } = req.body || {};
  const { name, phone, email, city, comment } = contact || {};

  if (!name?.trim() || !phone?.trim() || !isValidEmail(email) || !city?.trim()) {
    return res.status(400).json({ ok: false, message: "Не всі обов'язкові поля заповнені." });
  }
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ ok: false, message: "Кошик порожній." });
  }

  const fmt = (n) => new Intl.NumberFormat("uk-UA").format(n);

  const itemRows = items
    .map((item) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0">${item.title} ${item.weight}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;text-align:center">${item.quantity} шт.</td>
        <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;text-align:right;white-space:nowrap">${fmt(item.price * item.quantity)} ₴</td>
      </tr>`)
    .join("");

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <h2 style="font-size:20px;margin-bottom:16px">Нове замовлення</h2>

      <h3 style="font-size:14px;color:#6b7280;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.05em">Контакт</h3>
      <table style="border-collapse:collapse;width:100%;background:#f9fafb;border-radius:8px;margin-bottom:24px">
        <tr><td style="padding:6px 12px;color:#6b7280;white-space:nowrap">Ім'я</td><td style="padding:6px 12px;font-weight:500">${name}</td></tr>
        <tr><td style="padding:6px 12px;color:#6b7280;white-space:nowrap">Телефон</td><td style="padding:6px 12px;font-weight:500">${phone}</td></tr>
        <tr><td style="padding:6px 12px;color:#6b7280;white-space:nowrap">Email</td><td style="padding:6px 12px;font-weight:500">${email}</td></tr>
        <tr><td style="padding:6px 12px;color:#6b7280;white-space:nowrap">Місто</td><td style="padding:6px 12px;font-weight:500">${city}</td></tr>
        ${comment ? `<tr><td style="padding:6px 12px;color:#6b7280;white-space:nowrap">Коментар</td><td style="padding:6px 12px">${comment}</td></tr>` : ""}
      </table>

      <h3 style="font-size:14px;color:#6b7280;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.05em">Склад замовлення</h3>
      <table style="border-collapse:collapse;width:100%;margin-bottom:16px">
        <thead>
          <tr style="background:#f9fafb">
            <th style="padding:8px 12px;text-align:left;font-size:13px;color:#6b7280">Товар</th>
            <th style="padding:8px 12px;text-align:center;font-size:13px;color:#6b7280">К-сть</th>
            <th style="padding:8px 12px;text-align:right;font-size:13px;color:#6b7280">Сума</th>
          </tr>
        </thead>
        <tbody>${itemRows}</tbody>
      </table>

      <table style="border-collapse:collapse;width:100%;max-width:300px;margin-left:auto">
        <tr><td style="padding:4px 0;color:#6b7280">Вартість</td><td style="padding:4px 0;text-align:right">${fmt(subtotal)} ₴</td></tr>
        <tr><td style="padding:4px 0;color:#6b7280">Знижка (${discountPercent}%)</td><td style="padding:4px 0;text-align:right;color:#e53e3e">− ${fmt(discount)} ₴</td></tr>
        <tr style="font-weight:600;font-size:16px"><td style="padding:8px 0;border-top:2px solid #e5e7eb">До сплати</td><td style="padding:8px 0;border-top:2px solid #e5e7eb;text-align:right">${fmt(total)} ₴</td></tr>
      </table>
    </div>`;

  try {
    if (OWNER_EMAIL) {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: OWNER_EMAIL,
        subject: `Замовлення від ${name} — ${fmt(total)} ₴`,
        html,
      });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[checkout] error:", err?.message);
    return res.status(500).json({ ok: false, message: "Помилка сервера. Спробуйте пізніше." });
  }
}
