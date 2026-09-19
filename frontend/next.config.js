/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://nginx/api/:path*',   // ← внутри Docker
      },
    ];
  },
}

module.exports = nextConfig