import fs from "fs";
import path from "path";
import esbuild from "esbuild";

// Prerender мета-тегів для краулерів.
//
// Проблема: сайт — SPA, теги ставить react-helmet-async вже в браузері.
// Googlebot виконує JS і їх бачить, а Telegram, Facebook, Viber і LinkedIn —
// ні: вони роблять звичайний GET, отримують порожній index.html і показують
// посилання без картки. Тому весь head для кожного маршруту треба покласти
// у HTML ще на етапі збірки.
//
// Ми не рендеримо React у HTML (це вимагало б SSR і повного рефакторингу) —
// у <body> лишається той самий <div id="root">, застосунок працює як раніше.
// Дописуємо тільки <head>, бо саме його читають краулери соцмереж.
//
// Запускається автоматично після vite build (див. package.json).

const DIST = "dist";
const TMP = "node_modules/.cache/prerender-data.mjs";

// Зображення імпортуються модулями даних через Vite (import ... from "*.webp").
// Node такий імпорт не виконає, тому підміняємо їх порожнім рядком: для
// мета-тегів вони не потрібні (OG-картинки лежать у public/og зі стабільними
// іменами і вказані в даних як звичайні шляхи).
const stubAssets = {
  name: "stub-assets",
  setup(build) {
    build.onResolve({ filter: /\.(webp|png|jpe?g|svg|gif|avif)$/ }, (args) => ({
      path: args.path,
      namespace: "asset-stub",
    }));
    build.onLoad({ filter: /.*/, namespace: "asset-stub" }, () => ({
      contents: "export default '';",
      loader: "js",
    }));
  },
};

async function loadData() {
  fs.mkdirSync(path.dirname(TMP), { recursive: true });
  await esbuild.build({
    entryPoints: ["scripts/prerender-entry.js"],
    bundle: true,
    format: "esm",
    platform: "node",
    outfile: TMP,
    plugins: [stubAssets],
    logLevel: "silent",
  });
  return import(path.resolve(TMP) + `?t=${Date.now()}`);
}

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Кожен prerendered тег помічаємо data-prerender, і main.jsx видаляє їх перед
// монтуванням React. Інакше після гідратації в head залишалося б по два
// <title>, canonical і og:image: Helmet не замінює чужі теги, а додає свої
// поруч. Краулери соцмереж це не зачіпає (вони не виконують JS і бачать рівно
// один набір), але Googlebot рендерить сторінку й побачив би дублікати.
const RH = 'data-prerender';

function buildHead({ SITE_URL, SITE_NAME }, route) {
  const { title, description, canonical, image, imageAlt, type = "website", noindex, jsonLd } = route;
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const img = image ? (image.startsWith("http") ? image : SITE_URL + image) : null;

  const tags = [
    `<title ${RH}>${esc(fullTitle)}</title>`,
    description && `<meta ${RH} name="description" content="${esc(description)}" />`,
    noindex && `<meta ${RH} name="robots" content="noindex, follow" />`,
    canonical && `<link ${RH} rel="canonical" href="${esc(canonical)}" />`,
    `<meta ${RH} property="og:type" content="${esc(type)}" />`,
    `<meta ${RH} property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta ${RH} property="og:locale" content="uk_UA" />`,
    `<meta ${RH} property="og:title" content="${esc(fullTitle)}" />`,
    description && `<meta ${RH} property="og:description" content="${esc(description)}" />`,
    canonical && `<meta ${RH} property="og:url" content="${esc(canonical)}" />`,
    img && `<meta ${RH} property="og:image" content="${esc(img)}" />`,
    img && `<meta ${RH} property="og:image:width" content="1200" />`,
    img && `<meta ${RH} property="og:image:height" content="630" />`,
    img && `<meta ${RH} property="og:image:alt" content="${esc(imageAlt || fullTitle)}" />`,
    `<meta ${RH} name="twitter:card" content="${img ? "summary_large_image" : "summary"}" />`,
    `<meta ${RH} name="twitter:title" content="${esc(fullTitle)}" />`,
    description && `<meta ${RH} name="twitter:description" content="${esc(description)}" />`,
    img && `<meta ${RH} name="twitter:image" content="${esc(img)}" />`,
    jsonLd &&
      `<script ${RH} type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>`,
  ].filter(Boolean);

  return tags.join("\n  ");
}

async function run() {
  const indexPath = path.join(DIST, "index.html");
  if (!fs.existsSync(indexPath)) {
    console.error(`prerender: немає ${indexPath} — спочатку vite build`);
    process.exit(1);
  }

  const data = await loadData();
  const shell = fs.readFileSync(indexPath, "utf-8");
  const routes = data.getRoutes();

  for (const route of routes) {
    const head = buildHead(data.site, route);
    const html = shell.replace("</head>", `  ${head}\n</head>`);

    // "/" лишається dist/index.html, решта — dist/<path>/index.html,
    // щоб статичний хостинг віддавав їх напряму за чистим URL.
    const outPath =
      route.path === "/"
        ? indexPath
        : path.join(DIST, route.path.replace(/^\//, ""), "index.html");

    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html);
  }

  console.log(`prerender: ${routes.length} сторінок з мета-тегами`);
}

run().catch((err) => {
  console.error("prerender:", err);
  process.exit(1);
});
