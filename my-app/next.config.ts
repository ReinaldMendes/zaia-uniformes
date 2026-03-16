/** @type {import('next').NextConfig} */
const nextConfig = {
  // In monorepos or workspaces with multiple lockfiles, Next.js may infer the wrong root.
  // Setting outputFileTracingRoot ensures it uses this directory as the root for tracing.
  outputFileTracingRoot: __dirname,
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons'],
  },
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
  },
  eslint: {
    dirs: ['pages', 'components', 'app', 'src'],
  },
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
}

module.exports = nextConfig