/** @type {import('next').NextConfig} */

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/settings.ts');

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: "/dang-ky", destination: "/vi/register", permanent: true },
      { source: "/gioi-thieu", destination: "/vi/about/general-info", permanent: true },
      { source: "/gioi-thieu/thong-tin-chung", destination: "/vi/about/general-info", permanent: true },
      { source: "/gioi-thieu/ban-to-chuc", destination: "/vi/about/organizers", permanent: true },
      { source: "/gioi-thieu/dia-diem", destination: "/vi/about/venue", permanent: true },
      { source: "/gioi-thieu/agenda", destination: "/vi/about/agenda", permanent: true },
      { source: "/gioi-thieu/huong-dan", destination: "/vi/about/visitor-guide", permanent: true },
      { source: "/gioi-thieu/faq", destination: "/vi/about/faq", permanent: true },
      { source: "/lien-he", destination: "/vi/contact", permanent: true },
      { source: "/truyen-thong", destination: "/vi/media", permanent: true },
      { source: "/sponsor/dang-ky", destination: "/vi/sponsor/register", permanent: true },
      { source: "/sponsor/linh-vuc", destination: "/vi/sponsor/categories", permanent: true },
    ]
  },
}

export default withNextIntl(nextConfig);
