/*
  Single source of truth for site-wide SEO values (name, domain, contact,
  social links). Pulling every meta tag, the sitemap, robots.txt and the
  JSON-LD structured data from here means a domain change or detail update
  only happens in one place.
*/

export const SITE_URL = 'https://muneebdevs.vercel.app';

export const SITE_NAME = 'Muneeb Ur Rehman';

export const SITE_TITLE = 'Muneeb Ur Rehman | Full Stack Developer (MERN) in Lahore';

/* Kept under ~155 chars so Google shows it in full without truncating. */
export const SITE_DESCRIPTION =
  'Full Stack Web Developer (MERN) in Lahore, Pakistan. Building fast business websites, ecommerce stores, custom CRMs and AI automations with Next JS.';

export const SITE_KEYWORDS = [
  'Muneeb Ur Rehman',
  'Full Stack Web Developer Lahore',
  'MERN Stack Developer Pakistan',
  'Next JS Developer Pakistan',
  'WordPress Developer Lahore',
  'Ecommerce Website Developer Pakistan',
  'Business Website Developer Lahore',
  'React JS Developer Pakistan',
  'N8N Automation Expert',
  'AI Automation Developer',
  'Custom CRM Developer',
  'Freelance Web Developer Lahore',
  'Hire MERN Developer',
  'Hire Next JS Developer Pakistan',
];

export const AUTHOR_NAME = 'Muneeb Ur Rehman';
export const AUTHOR_EMAIL = 'muneebdevs07@gmail.com';
export const AUTHOR_PHONE = '+92 332-8863805';
export const AUTHOR_PHONE_E164 = '+923328863805';

export const LOCATION = {
  locality: 'Lahore',
  region: 'Punjab',
  country: 'Pakistan',
  countryCode: 'PK',
};

export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/muneebdevs07/',
  github: 'https://github.com/Muneeb-ur-Rehman11',
};

export const OG_IMAGE = `${SITE_URL}/og-image.png`;

/*
  Absolute canonical URL helper — pass a path like "/portfolio/wordpress".
  next.config.js sets trailingSlash: true, so every real route is served
  with a trailing slash; canonical/OG/sitemap URLs must match exactly or
  they point at a URL that immediately redirects, which search engines
  treat as a soft signal that the canonical is wrong.
*/
export const absoluteUrl = (path = '/') => {
  const withSlash = path === '' || path.endsWith('/') ? (path || '/') : `${path}/`;
  return `${SITE_URL}${withSlash}`;
};
