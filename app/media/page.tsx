import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import Link from "next/link"
import { Calendar, ArrowRight, Tag } from "lucide-react"

const newsCategories = ["Tất cả", "Thông báo", "Hợp tác", "Diễn giả", "Triển lãm"]

const newsItems = [
  {
    id: 1,
    title: "VN Security 2026 chính thức khởi động chiến dịch đăng ký nhà triển lãm",
    excerpt: "Ban tổ chức VN Security 2026 thông báo mở đăng ký gian hàng triển lãm với nhiều ưu đãi hấp dẫn cho đăng ký sớm. Các doanh nghiệp đăng ký trước ngày 31/03/2026 sẽ được giảm 15% chi phí thuê gian hàng.",
    date: "15/03/2026",
    category: "Thông báo",
    featured: true,
  },
  {
    id: 2,
    title: "Hợp tác chiến lược với Hiệp hội An ninh Châu Á - Thái Bình Dương",
    excerpt: "VN Security 2026 ký kết thỏa thuận hợp tác với APSA, mở ra cơ hội kết nối rộng lớn hơn cho các doanh nghiệp Việt Nam với thị trường khu vực.",
    date: "10/03/2026",
    category: "Hợp tác",
    featured: true,
  },
  {
    id: 3,
    title: "Công bố danh sách 10 diễn giả keynote đầu tiên",
    excerpt: "Sự kiện quy tụ các chuyên gia hàng đầu từ Mỹ, Châu Âu và Châu Á trong lĩnh vực công nghiệp an ninh.",
    date: "05/03/2026",
    category: "Diễn giả",
    featured: false,
  },
  {
    id: 4,
    title: "Hikvision xác nhận tham gia với gian hàng Diamond",
    excerpt: "Tập đoàn Hikvision - nhà sản xuất camera an ninh lớn nhất thế giới chính thức xác nhận tham gia VN Security 2026 với quy mô gian hàng Diamond.",
    date: "01/03/2026",
    category: "Triển lãm",
    featured: false,
  },
  {
    id: 5,
    title: "Chương trình B2B Matching chính thức mở đăng ký",
    excerpt: "Nền tảng B2B Matching cho phép các nhà triển lãm và khách tham quan đặt lịch hẹn trước, tối ưu hóa cơ hội kinh doanh tại sự kiện.",
    date: "25/02/2026",
    category: "Thông báo",
    featured: false,
  },
  {
    id: 6,
    title: "Workshop series: Tìm hiểu công nghệ AI trong giám sát an ninh",
    excerpt: "Chuỗi workshop chuyên sâu về ứng dụng trí tuệ nhân tạo trong hệ thống camera giám sát sẽ được tổ chức xuyên suốt 4 ngày triển lãm.",
    date: "20/02/2026",
    category: "Triển lãm",
    featured: false,
  },
]

export default function NewsPage() {
  const featuredNews = newsItems.filter((item) => item.featured)
  const regularNews = newsItems.filter((item) => !item.featured)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                Truyền thông
              </span>
              <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-secondary-foreground sm:text-5xl">
                Tin tức & Sự kiện
              </h1>
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                Cập nhật thông tin mới nhất về VN Security 2026
              </p>
            </div>
          </div>
        </section>

        {/* News Content */}
        <section className="bg-background py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              {/* Category Filter */}
              <div className="mb-12 flex flex-wrap gap-2">
                {newsCategories.map((category) => (
                  <button
                    key={category}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      category === "Tất cả"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Featured News */}
              <div className="mb-12 grid gap-6 lg:grid-cols-2">
                {featuredNews.map((item) => (
                  <article
                    key={item.id}
                    className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-xl"
                  >
                    <div className="relative aspect-video bg-muted">
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                        <span className="text-6xl font-bold text-primary/30">VN</span>
                      </div>
                      <div className="absolute left-4 top-4">
                        <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                          Nổi bật
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {item.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Tag className="h-4 w-4" />
                          {item.category}
                        </span>
                      </div>
                      <h2 className="mb-3 text-xl font-bold text-card-foreground transition-colors group-hover:text-primary">
                        <Link href={`/media/${item.id}`}>{item.title}</Link>
                      </h2>
                      <p className="mb-4 line-clamp-2 text-muted-foreground">
                        {item.excerpt}
                      </p>
                      <Link
                        href={`/media/${item.id}`}
                        className="inline-flex items-center font-medium text-primary hover:underline"
                      >
                        Đọc tiếp
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {/* Regular News */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {regularNews.map((item) => (
                  <article
                    key={item.id}
                    className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md"
                  >
                    <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {item.date}
                      </span>
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="mb-3 line-clamp-2 text-lg font-semibold text-card-foreground transition-colors group-hover:text-primary">
                      <Link href={`/media/${item.id}`}>{item.title}</Link>
                    </h3>
                    <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                      {item.excerpt}
                    </p>
                    <Link
                      href={`/media/${item.id}`}
                      className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      Đọc tiếp
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
