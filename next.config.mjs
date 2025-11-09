/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          // Match *all* routes (pages, API, static assets, everything)
          source: '/:path*',
          headers: [
            { key: 'Access-Control-Allow-Origin', value: '*' },
            { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
            { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
            { key: 'Access-Control-Allow-Credentials', value: 'true' },
          ],
        },
      ]
    },
  }
  
  export default nextConfig
  