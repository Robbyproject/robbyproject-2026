/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        // 👇 GANTI DENGAN PROJECT ID SUPABASE ANDA
        // Cek URL public yang tadi Anda copy. 
        // Misal: abcdefghijklm.supabase.co
        hostname: 'https://cnjncaybcpnzwookgsgq.supabase.co/', 
        port: '',
      },
    ],
  },
};

export default nextConfig;