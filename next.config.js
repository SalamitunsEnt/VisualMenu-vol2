const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
      },
      {
        protocol: 'https',
        hostname: 'zuajrsvhimnoefuzklry.supabase.co',
        pathname: '/storage/v1/object/public/**',
      }
    ],
    domains: [
      'zuajrsvhimnoefuzklry.supabase.co',
      'restaurantocr.cognitiveservices.azure.com',
      'your-supabase-project.supabase.co'
    ],
  },
  webpack: (config, { dev, isServer }) => {
    // Reduce cache warnings
    config.infrastructureLogging = {
      level: 'error',
    };
    
    return config;
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_AZURE_FORM_ENDPOINT: process.env.NEXT_PUBLIC_AZURE_FORM_ENDPOINT,
    NEXT_PUBLIC_AZURE_FORM_KEY: process.env.NEXT_PUBLIC_AZURE_FORM_KEY,
    NEXT_PUBLIC_AZURE_CV_KEY: process.env.NEXT_PUBLIC_AZURE_CV_KEY,
    NEXT_PUBLIC_AZURE_CV_ENDPOINT: process.env.NEXT_PUBLIC_AZURE_CV_ENDPOINT,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  }
}

module.exports = withBundleAnalyzer(nextConfig) 