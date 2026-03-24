import { Helmet } from "react-helmet-async";

export default function SEO({
  title,
  description,
  canonical,
  image,
  type = "website",
}) {
  const site = "Aquaculture";
  const fullTitle = title ? `${title} | ${site}` : site;

  return (
    <Helmet>
      <title>{fullTitle}</title>

      {description && (
        <meta name="description" content={description} />
      )}

      {canonical && (
        <link rel="canonical" href={canonical} />
      )}

      {/* OpenGraph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />

      {description && (
        <meta property="og:description" content={description} />
      )}

      {image && (
        <meta property="og:image" content={image} />
      )}

      {canonical && (
        <meta property="og:url" content={canonical} />
      )}
    </Helmet>
  );
}