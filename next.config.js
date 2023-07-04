/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    domains: ['cdn.galaxy.eco', 'cdn1.p12.games', 'cdn.p12.games'],
  },
  reactStrictMode: false,
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: [{ key: 'X-Frame-Options', value: 'SAMEORIGIN' }],
      },
    ];
  },
};
