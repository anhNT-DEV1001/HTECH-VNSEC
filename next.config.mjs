/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: "/dang-ky", destination: "/register", permanent: true },
      { source: "/gioi-thieu", destination: "/about/general-info", permanent: true },
      { source: "/gioi-thieu/thong-tin-chung", destination: "/about/general-info", permanent: true },
      { source: "/gioi-thieu/ban-to-chuc", destination: "/about/organizers", permanent: true },
      { source: "/gioi-thieu/dia-diem", destination: "/about/venue", permanent: true },
      { source: "/gioi-thieu/agenda", destination: "/about/agenda", permanent: true },
      { source: "/gioi-thieu/huong-dan", destination: "/about/visitor-guide", permanent: true },
      { source: "/gioi-thieu/faq", destination: "/about/faq", permanent: true },
      { source: "/lien-he", destination: "/contact", permanent: true },
      { source: "/truyen-thong", destination: "/media", permanent: true },
      { source: "/sponsor/dang-ky", destination: "/sponsor/register", permanent: true },
      { source: "/sponsor/linh-vuc", destination: "/sponsor/categories", permanent: true },
    ]
  },
}

export default nextConfig
