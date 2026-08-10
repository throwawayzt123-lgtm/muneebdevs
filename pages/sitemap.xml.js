import { SITE_URL } from '../lib/siteConfig';

/*
  Dynamic sitemap.xml. Next's pages router can't serve a static XML file from
  /public through this path pattern reliably alongside trailingSlash:true, so
  it's generated server-side via getServerSideProps and written directly to
  the response. Keeping the URL list here means it always matches the real
  routes in pages/ instead of drifting out of sync with a hand-maintained file.
*/

const routes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/portfolio/full-stack/', changefreq: 'monthly', priority: '0.9' },
  { path: '/portfolio/wordpress/', changefreq: 'monthly', priority: '0.9' },
];

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  const urls = routes.map((r) => `
  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;
}

export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(generateSitemap());
  res.end();
  return { props: {} };
}

export default function Sitemap() {
  return null;
}
