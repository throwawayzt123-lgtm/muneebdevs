/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    // AVIF first (smallest), WebP fallback. Next resizes + re-encodes on
    // request and caches the result, so the 1-2MB portfolio PNGs are served
    // as a few hundred KB per breakpoint instead of raw.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [390, 640, 828, 1080, 1200, 1440, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000, // 1 year — portfolio screenshots don't change often
  },
  compress: true,
  poweredByHeader: false,
}

module.exports = nextConfig
