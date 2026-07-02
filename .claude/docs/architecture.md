# Архітектура Aquaculture — пам'ять проєкту

Технічна вікі. Звичайний Markdown із `[[wiki-links]]` — можна відкрити папку
`.claude/` як Obsidian-сховище. Тримай це актуальним: тут «чому», а не лише «що».

## Огляд
SPA на React 19 + Vite. Преміальний магазин ікри, кураторський каталог. Дані —
статичні в `src/data/`, кошик — у Zustand, email — через Vercel Serverless (`api/`).
Хостинг — Vercel. Зображення — WebP 1x/2x через Sharp.

> `src/server.jsx` — мертвий файл, залишився з початкової версії. Не використовується.
> Реальний бекенд — `api/subscribe.js`, `api/wholesale.js`, `api/checkout.js`.

## Потік даних
```
data/catalogData ─▶ Catalog ─▶ CatalogSection ─▶ ProductCard
data/caviarPackages ─▶ Product (пакування, калькулятор, знижки)
components/discount ─▶ OrderSummary / Cart (логіка знижок)
store/cartStore (Zustand) ─▶ Cart, Header (лічильник)
data/seoConfig ─▶ components/SEO (helmet) ─▶ кожна сторінка
api/subscribe.js ─▶ Resend contacts (newsletter)
api/wholesale.js ─▶ Resend emails (owner + user confirmation)
api/checkout.js ─▶ Resend email (owner, зі складом кошика)
```

## Сторінки
| Маршрут | Файл | Що |
|---|---|---|
| `/` | `pages/Home` | герой, фічі, відгуки, партнери |
| `/catalog` | `pages/Catalog` | 3 секції: червона / чорна / біла ікра |
| `/product/:id` | `pages/Product` | пакування, калькулятор, знижки |
| `/cart` | `pages/Cart` | підсумок, знижки, checkout (2-колонки) |
| `*` | `pages/NotFound` | 404 |

## Продукти (12 SKU)
- **Червона:** Форель, Горбуша, Кета, Кіжуч, Нерка, Чавича
- **Чорна:** Белуга, Осетр
- **Біла:** Щука
- **Набори:** set1, set2, set3 — поки порожні (`packages: []`)

## Знижки (незмінна логіка → `components/discount.jsx`)
| Об'єм | Знижка |
|---|---|
| від 3 кг | 7% |
| від 6 кг | 14% |
| від 12 кг | 21% |
| від 24 кг | 28% |

## Стан готовності (орієнтир ~75%)
UI/дизайн 95% · архітектура 95% · SEO/доступність 85% · контент продуктів 45% ·
бекенд/інтеграції 80% · checkout 90% (форма є, платіжний шлюз — ні).

## Що зроблено (сесія 2026-07)

### Newsletter (`api/subscribe.js`)
- `resend.contacts.create({ email })` → Resend Audience
- IP rate limit: 3 підписки за 10 хв (in-memory Map, скидається при cold start)
- Клієнтський захист: localStorage `newsletter_submitted` (блокує повторну форму)
- **Honeypot прибраний** — Edge автозаповнював приховане поле, блокував реальних юзерів
- Footer: зелений ring + текст при успіху, форма залишається видимою

### WholesaleForm (`api/wholesale.js`)
- Два листи: власнику (повна анкета) + користувачу (підтвердження)
- IP rate limit: 3 заявки за 60 хв
- localStorage 24h block: `wholesale_submitted_at` — ініціалізується при mount,
  одразу показує "Заявку отримано" без повторного заповнення
- **Лист користувачу не приходить** без верифікованого домену Resend (тільки на зареєстровану пошту акаунту)

### Checkout (`api/checkout.js` + `pages/Cart.jsx`)
- `pages/Cart.jsx` — два стани: кошик (`showForm=false`) і checkout (`showForm=true`)
- Checkout: двоколоночний layout (tablet+): ліво — підсумок замовлення, право — форма
- Форма: ім'я, телефон, email, місто (SelectField з пошуком), коментар (maxLength 500)
- Breadcrumb динамічно: `Кошик` → `Оформлення`; "Кошик" в breadcrumb — `onClick` (не link),
  бо та сама сторінка `/cart` і React Router не тригерить ре-рендер
- `api/checkout.js`: лист власнику зі складом кошика, цінами, знижкою

### UI-компоненти
- `ActionArrowButton`: `onClick` перенесений на зовнішній `<button>`, тепер весь
  компонент (іконка + текст) клікабельний, а не тільки стрілка
- `PageHeader`: `h1` — `clamp(1.5rem, 12.8vw, var(--h2-font-size))` — 48px на 375px+,
  56px на десктопі, плавно зменшується на вужчих. Підтримка `onClick` в breadcrumbs.
- `SelectField`: новий проп `bgClass` (default `bg-brand-light`) — дозволяє кастомний
  фон тригера (checkout використовує `bg-transparent border border-brand-sand`)
- `Footer`: структура — newsletter зверху → лінія → 3-col grid → лінія → копірайт.
  Grid: `tablet:grid-cols-[2fr_1fr_1fr]`

### Env vars (Vercel Production)
- `RESEND_API_KEY` — ключ Resend
- `WHOLESALE_OWNER_EMAIL` — `opanasiukruslan2003@gmail.com` (отримує замовлення і wholesale-заявки)
- `WHOLESALE_FROM_EMAIL` — `onboarding@resend.dev` (відправник поки без домену)

## Критичні блокери перед передачею сайту

### Контент
1. **Контент продуктів** — 9 з 12 позицій мають однаковий `longDescription` та `indicators`
2. **Ціни у каталозі** — `catalogData` не містить цін для карток на `/catalog`
3. **Набори set1–3** — `packages: []`, або наповнити, або прибрати з каталогу
4. **Телефони і email у футері** — `+38 050 999 99 99` і `poshta@gmail.com` → реальні

### Юридичні сторінки
5. **`/privacy`** — посилання є (футер, форми підписки), сторінка → 404
6. **Договір публічної оферти** — згадується у копірайті → 404

### Технічна інфраструктура
7. **Resend домен** — верифікувати власний домен → листи підтвердження юзерам запрацюють автоматично
8. **Canonical URL** — `seoConfig` має `aquaculture.com` → реальний домен
9. **`src/server.jsx`** — мертвий файл → видалити перед передачею

### Бізнес
10. **Умови доставки** — ніде не описані
11. **Платіжний шлюз** — LiqPay або WayForPay; зараз тільки email-замовлення
12. **Аналітика** — Google Analytics або Plausible відсутні
13. **Favicon** — зараз дефолтний `vite.svg`
14. **`sitemap.xml`** — відсутній

## Беклог (після блокерів)
- **Зберігання замовлень у БД** — Airtable або Supabase при зростанні потоку
- **Зберігання wholesale-заявок у БД** — аналогічно
- **Double opt-in для newsletter** — підтвердження email через Resend
- **Платіжний шлюз** — LiqPay або WayForPay
- **SEO** — доопрацювати `seoConfig`/`SEO.jsx` (canonical поки заглушка), sitemap
- **Швидкість завантаження сторінок** — Lighthouse/Core Web Vitals, LCP на Home
- **Оптимізація фото на Home** — перевірити, чи всі hero/banner зображення проганяються через `optimize.js`

## Рішення (ADR-лайт)
> Дописуй сюди архітектурні рішення з датою й причиною — навіть якщо ще не закодовано.

- **2026-06:** Зображення — пайплайн WebP 1x/2x (Sharp, `optimize.js`) замість віддачі
  оригіналів. Причина: вага/LCP на преміальних фото.
- **2026-07:** Бекенд — Vercel Serverless (`api/`) замість Express (`src/server.jsx`).
  Причина: server.jsx не деплоїться на Vercel як serverless функція.
- **2026-07:** Honeypot прибраний з `api/subscribe.js` — Edge browser автозаповнює
  приховані text-inputs через controlled React inputs, що блокувало реальних юзерів.
- **2026-07:** Checkout — email-форма замість платіжного шлюзу на першому етапі.
  Власник отримує лист зі складом кошика і зв'язується з клієнтом вручну.
- **2026-07:** `ActionArrowButton` — `onClick` на зовнішньому `<button>`, а не тільки
  на іконці. Раніше клік по тексту не тригерив дію.
- **2026-07:** `PageHeader h1` — `clamp()` замість фіксованих breakpoint-класів.
  12.8vw = 48px на 375px, плавно зменшується на вужчих пристроях.

## Пов'язане
- Конвенції — [[conventions]] · Рефакторинг — [[refactoring]] · Команди — [[commands]]
- CRO — команда `/aim` ([[aim]])
