import type { NextConfig } from 'next';
import withNextIntl from 'next-intl/plugin';

const nextIntlConfig = withNextIntl('./src/i18n/request.ts');

const nextConfig: NextConfig = {
    poweredByHeader: false,
    compress: true,
    reactStrictMode: true,
    trailingSlash: false,
    images: {
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 86400,
    },

    experimental: {
        optimizeCss: true,
        scrollRestoration: true,
        serverActions: {
            bodySizeLimit: '5mb',
        },
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },

    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    { key: 'X-Frame-Options', value: 'DENY' },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload',
                    },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com https://accounts.google.com/gsi/client; style-src 'self' 'unsafe-inline'; img-src 'self' blob: https://soyuz.kg; font-src 'self'; connect-src 'self';",
                    },

                    {
                        key: 'Permissions-Policy',
                        value: 'geolocation=(), microphone=(), camera=(), payment=()',
                    },
                    { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
                    { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
                    // { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },

                    { key: 'Access-Control-Allow-Origin', value: 'https://soyuz.kg' },
                ],
            },
        ];
    },
};

export default nextIntlConfig(nextConfig);
