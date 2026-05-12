/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.0.105', '192.168.0.105:3000'],
  images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "i.pravatar.cc",
    },
  ],
},
};

export default nextConfig;
