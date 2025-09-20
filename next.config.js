/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    unoptimized: true, // This helps with static file serving on Vercel
  },
  // Ensure static files are properly served
  trailingSlash: false,
}

module.exports = nextConfig
