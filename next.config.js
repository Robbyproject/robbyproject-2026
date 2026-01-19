// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // -------------------------------------------------------------------------
  // 1. HAPUS "output: export". 
  //    Agar fitur Image Optimization (compress gambar otomatis) & ISR jalan.
  //    Vercel support mode ini secara native (Serverless), jadi lebih cepat.
  // -------------------------------------------------------------------------

  images: {
    // 2. HAPUS "unoptimized: true".
    //    Kita ingin Next.js mengompres gambar agar Website NGEBUT.

    // 3. Daftarkan Domain Supabase Anda di sini:
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cnjncaybcpnzwookgsgq.supabase.co', // Hostname dari URL gambar Supabase Anda
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

module.exports = nextConfig;