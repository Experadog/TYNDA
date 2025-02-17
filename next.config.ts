import type { NextConfig } from 'next';
import withNextIntl from 'next-intl/plugin';

const nextIntlConfig = withNextIntl('./src/i18n/request.ts');

const nextConfig: NextConfig = {};
export default nextIntlConfig(nextConfig);
