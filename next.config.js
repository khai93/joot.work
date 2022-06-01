const { config } = require('@swc/core/spack')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
    domains: ['media-exp1.licdn.com', 'media-exp2.licdn.com'],
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  }
}

module.exports = nextConfig
