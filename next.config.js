/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_KEY: 'AIzaSyBEyYIZ9_WiM0eobvrggx4q9k0BW2dqbR4',
    API_BASED_URL: 'https://14c1-212-51-190-22.ngrok-free.app',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
