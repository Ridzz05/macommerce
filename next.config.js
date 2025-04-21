/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'shopee.co.id',
      },
      {
        protocol: 'https',
        hostname: 'down-id.img.susercontent.com',
      },
    ],
  },
}

module.exports = nextConfig
