import Head from 'next/head';
import {
  SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION, SITE_KEYWORDS,
  AUTHOR_NAME, AUTHOR_EMAIL, AUTHOR_PHONE_E164, LOCATION, SOCIAL_LINKS,
  OG_IMAGE, absoluteUrl,
} from '../lib/siteConfig';

/**
 * Shared <head> block for every page: title, description, canonical,
 * Open Graph, Twitter Card, and JSON-LD structured data. Each page passes
 * only what differs from the site defaults (title/description/path).
 *
 * @param {{
 *   title?: string,
 *   description?: string,
 *   path?: string,
 *   image?: string,
 *   type?: string,
 *   breadcrumbs?: { name: string, path: string }[],
 *   noindex?: boolean,
 * }} props
 */
export default function Seo({
  title = SITE_TITLE,
  description = SITE_DESCRIPTION,
  path = '/',
  image = OG_IMAGE,
  type = 'website',
  breadcrumbs = undefined,
  noindex = false,
}) {
  const url = absoluteUrl(path);

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: AUTHOR_NAME,
    url: SITE_URL,
    image: OG_IMAGE,
    jobTitle: 'Full Stack Web Developer',
    description: SITE_DESCRIPTION,
    email: `mailto:${AUTHOR_EMAIL}`,
    telephone: AUTHOR_PHONE_E164,
    address: {
      '@type': 'PostalAddress',
      addressLocality: LOCATION.locality,
      addressRegion: LOCATION.region,
      addressCountry: LOCATION.countryCode,
    },
    sameAs: Object.values(SOCIAL_LINKS),
    knowsAbout: [
      'Next JS', 'React JS', 'Node JS', 'MongoDB', 'Express JS',
      'WordPress', 'N8N Automation', 'Tailwind CSS', 'Ecommerce Development',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Web Bridge Consulting',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    author: { '@type': 'Person', name: AUTHOR_NAME },
  };

  const breadcrumbSchema = breadcrumbs && {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: b.name,
      item: absoluteUrl(b.path),
    })),
  };

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={SITE_KEYWORDS.join(', ')} />
      <meta name="author" content={AUTHOR_NAME} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <link rel="icon" href="/logo.png" />
      <link rel="apple-touch-icon" href="/logo.png" />

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
    </Head>
  );
}
