const { config } = require('@swc/core/spack')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true // required for Docker
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      child_process: false,
      net: false
    }

    return config
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: [
      'media-exp1.licdn.com', 
      'media-exp2.licdn.com', 
      'static-exp1.licdn.com',
      'd2q79iu7y748jz.cloudfront.net',
      'placehold.jp'
    ],
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  }
}

module.exports = nextConfig
