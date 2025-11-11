const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "*.alexakruckenberg.com"],
    },
    viewTransition: true,
  },
};

module.exports = nextConfig;
