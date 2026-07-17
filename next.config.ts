import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable React strict mode for better development warnings
  reactStrictMode: true,

  // Image optimization — allow external domains
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' }, // Google OAuth avatars
      { protocol: 'https', hostname: 'res.cloudinary.com' }, // Cloudinary storage
      { protocol: 'https', hostname: 'ui-avatars.com' }, // Fallback avatars
    ],
  },

  // Custom headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },

  // Experimental features
  experimental: {
    // optimizePackageImports: improves tree-shaking for large icon/component libs
    optimizePackageImports: ['lucide-react', 'recharts', 'framer-motion'],
  },
}

export default nextConfig
