import { Helmet } from "react-helmet-async";
import { SITE_URL, SITE_NAME } from "../data/seoConfig";

// Зображення в проєкті імпортуються Vite і дають шлях виду /assets/foo-hash.webp.
// Соцмережі вимагають абсолютний URL, інакше картка залишиться без картинки.
const absolute = (url) =>
  !url ? null : url.startsWith("http") ? url : `${SITE_URL}${url}`;

export default function SEO({
  title,
  description,
  canonical,
  image,
  imageAlt,
  type = "website",
  noindex = false,
  jsonLd,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const imageUrl = absolute(image);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {noindex && <meta name="robots" content="noindex, follow" />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* OpenGraph — Facebook, Telegram, Viber, LinkedIn, WhatsApp, Slack */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="uk_UA" />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      {canonical && <meta property="og:url" content={canonical} />}
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      {imageUrl && <meta property="og:image:alt" content={imageAlt || fullTitle} />}

      {/* Twitter/X читає власні теги, а не OpenGraph */}
      <meta name="twitter:card" content={imageUrl ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}

      {/* Structured data — саме з неї Google будує rich snippets
          (ціна й наявність у видачі, хлібні крихти замість голого URL) */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
