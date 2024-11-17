/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: 'http',
              hostname: 'localhost',
              pathname: '/**'
          },
          {
              protocol: 'https',
              hostname: 'ik.imagekit.io',
              pathname: '/**'
          },
          {
              protocol: 'https',
              hostname: 'm.media-amazon.com',
              pathname: '/**'
          },
          {
              protocol: 'https',
              hostname: 'template.gentechtreedesign.com',
              pathname: '/**'
          }
      ],
      minimumCacheTTL: 60,
      dangerouslyAllowSVG: true,
      contentDispositionType: 'attachment',
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  output: 'standalone',
  poweredByHeader: false,
  compress: true
};

export default nextConfig;