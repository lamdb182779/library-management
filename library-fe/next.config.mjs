/** @type {import('next').NextConfig} */

const NEXT_PUBLIC_SERVER_DOMAIN = process.env.NEXT_PUBLIC_SERVER_DOMAIN

const nextConfig = {
    async redirects() {
        return [
            {
                source: '/login',
                destination: `${NEXT_PUBLIC_SERVER_DOMAIN}/auth/google`,
                permanent: false,
            },
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
};

export default nextConfig;
