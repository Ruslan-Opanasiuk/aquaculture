import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const isValidEmail = (v) =>
  typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// In-memory rate limit: max 3 requests per IP per 10 minutes.
// Скидається при холодному старті функції — достатньо для базового захисту.
const rateLimitMap = new Map();
const LIMIT = 3;
const WINDOW_MS = 10 * 60 * 1000;

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

// Vercel Serverless Function: POST /api/subscribe
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return res
      .status(429)
      .json({ ok: false, message: "Забагато спроб. Спробуйте пізніше." });
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
