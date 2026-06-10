/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp', 'image/png', 'image/jpeg'],
    remotePatterns: [
      {
        protocol: 'https',
        // Supabase Storage — portfolio images
        hostname: 'cnjncaybcpnzwookgsgq.supabase.co',
        port: '',
      },
      {
        protocol: 'https',
        // GitHub avatar for dashboard profile
        hostname: 'avatars.githubusercontent.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;