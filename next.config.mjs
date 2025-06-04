/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // 👈 Esto desactiva la optimización incompatible
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hgaoyfiaqtmlzcqiuumu.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
        search: '',
      },
    ],
  },
//output : "export",
};
 
export default nextConfig;
