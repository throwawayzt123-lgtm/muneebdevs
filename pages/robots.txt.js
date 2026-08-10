import { SITE_URL } from '../lib/siteConfig';

function generateRobotsTxt() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(generateRobotsTxt());
  res.end();
  return { props: {} };
}

export default function Robots() {
  return null;
}
