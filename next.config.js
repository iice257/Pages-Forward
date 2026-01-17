/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ignore the pf-html folder (legacy HTML files)
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wzxfyikhamojmsykbyqj.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

module.exports = nextConfig
