/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['assets.coingecko.com'],
  },
  // --- TAMBAHKAN BAGIAN INI ---
  eslint: {
    // Warning: Ini membolehkan build sukses meski ada error linter
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: Ini membolehkan build sukses meski ada error typescript
    ignoreBuildErrors: true,
  },
  // ---------------------------
};

export default nextConfig;