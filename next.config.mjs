/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
          },
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
          }
        ],
      },
      webpack: (config) => {
        config.externals.push('pino-pretty');
        return config;
      },
};

export default nextConfig;
