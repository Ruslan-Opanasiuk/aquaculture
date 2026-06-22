# Типові команди

## Розробка
```bash
npm install        # залежності
npm run dev        # локальний сервер Vite (HMR)
npm run build      # продакшн-збірка → dist/
npm run preview    # перегляд продакшн-збірки локально
```

## Зображення (WebP 1x/2x)
```bash
node src/optimize.js   # src/assets/images/raw → src/assets/images/optimized
```
Розміри: 512px (`1x`), 1024px (`2x`). Нові оригінали клади в `raw/`.

## Якість коду
```bash
npx eslint .       # лінт (конфіг — eslint.config.js; окремого npm-скрипта нема)
```

## Бекенд / email
`src/server.jsx` — Express + Resend. Потрібен `RESEND_API_KEY` у `.env`
(не комітити). Перед запуском замінити заглушки домену/`no-reply@`.

## Деплой
Vercel (конфіг — `vercel.json`). Деплой — пуш у відповідну гілку / `vercel` CLI.

## Git (для гілок Claude)
```bash
git add -A && git commit -m "feat: …"   # коміт лише на прохання
git push -u origin <branch>             # пуш лише на прохання
```
