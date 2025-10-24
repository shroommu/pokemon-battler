const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000', '*.alexakruckenberg.com'
      ]
    }
  }
};

module.exports = nextConfig;
