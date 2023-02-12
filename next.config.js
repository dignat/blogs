/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracing: true,
  experimental: { 
    nftTracing: true 
  }
}

module.exports = nextConfig
