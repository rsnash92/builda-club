/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  // Exclude template directories from build
  experimental: {
    excludeDefaultMomentLocales: true,
  },
  // Exclude the template directory from the build
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      // Ignore the template directory
      '@/components/pages/SignIn': false,
    };
    return config;
  }
}

module.exports = nextConfig
