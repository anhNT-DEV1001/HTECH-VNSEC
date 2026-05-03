import Link from "next/link"
import { ArrowRight, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

const newsItems = [
  {
    id: 1,
    title: "VN Security 2026 chính thức khởi động chiến dịch đăng ký nhà triển lãm",
    excerpt: "Ban tổ chức VN Security 2026 thông báo mở đăng ký gian hàng triển lãm với nhiều ưu đãi hấp dẫn cho đăng ký sớm.",
    date: "15/03/2026",
    category: "Thông báo",
  },
  {
    id: 2,
    title: "Hợp tác chiến lược với Hiệp hội An ninh Châu Á - Thái Bình Dương",
    excerpt: "VN Security 2026 ký kết thỏa thuận hợp tác với APSA, mở ra cơ hội kết nối rộng lớn hơn cho các doanh nghiệp Việt Nam.",
    date: "10/03/2026",
    category: "Hợp tác",
  },
  {
    id: 3,
    title: "Công bố danh sách 10 diễn giả keynote đầu tiên",
    excerpt: "Sự kiện quy tụ các chuyên gia hàng đầu từ Mỹ, Châu Âu và Châu Á trong lĩnh vực công nghiệp an ninh.",
    date: "05/03/2026",
    category: "Diễn giả",
  },
]

export function NewsPreview() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
              Tin tức
            </span>
            <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Tin Tức & Sự Kiện
            </h2>
            <p className="text-pretty text-muted-foreground">
              Cập nhật thông tin mới nhất về VN Security 2026 và các hoạt động liên quan.
            </p>
          </div>
          <Button asChild variant="outline" className="shrink-0">
            <Link href="/media">
              Xem tất cả tin tức
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* News Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item) => (
            <article
              key={item.id}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg"
            >
              {/* Thumbnail Placeholder */}
              <div className="relative aspect-video overflow-hidden bg-muted">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                  <span className="text-4xl font-bold text-primary/30">VN</span>
                </div>
                <div className="absolute left-4 top-4">
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {item.date}
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
                  Đọc thêm
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
