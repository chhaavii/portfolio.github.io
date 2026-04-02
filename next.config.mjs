/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio.github.io' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio.github.io' : '',
  output: 'export',
  trailingSlash: true,
}

export default nextConfig
