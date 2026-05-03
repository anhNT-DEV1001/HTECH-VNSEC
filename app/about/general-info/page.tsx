import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Shield, Target, Eye, Handshake, CheckCircle } from "lucide-react"

const objectives = [
  "Tạo diễn đàn giao thương quốc tế cho ngành công nghiệp an ninh tại Việt Nam",
  "Giới thiệu công nghệ an ninh tiên tiến nhất từ các nhà sản xuất hàng đầu thế giới",
  "Thúc đẩy hợp tác giữa doanh nghiệp trong nước và quốc tế",
  "Cập nhật xu hướng và giải pháp mới trong lĩnh vực an ninh",
  "Tạo cơ hội networking cho các chuyên gia và doanh nghiệp",
]

const highlights = [
  {
    icon: Shield,
    title: "Quy mô Quốc tế",
    description: "Hơn 500 nhà triển lãm từ 50+ quốc gia tham gia trưng bày sản phẩm và giải pháp.",
  },
  {
    icon: Target,
    title: "Chuyên nghiệp",
    description: "Được tổ chức bởi đội ngũ có kinh nghiệm trong lĩnh vực tổ chức sự kiện quốc tế.",
  },
  {
    icon: Eye,
    title: "Đa dạng Nội dung",
    description: "Kết hợp triển lãm, hội nghị chuyên đề, workshop và hoạt động networking.",
  },
  {
    icon: Handshake,
    title: "Cơ hội Kinh doanh",
    description: "Chương trình B2B Matching kết nối trực tiếp nhà cung cấp và khách hàng.",
  },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                Giới thiệu
              </span>
              <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-secondary-foreground sm:text-5xl lg:text-6xl">
                Thông tin chung về{" "}
                <span className="text-primary">VN Security 2026</span>
              </h1>
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                Triển lãm và Hội nghị Quốc tế lần thứ nhất về Công nghiệp An ninh tại Việt Nam - 
                Sự kiện quy mô lớn nhất khu vực Đông Nam Á trong lĩnh vực an ninh.
              </p>
            </div>
          </div>
        </section>

        {/* About Content */}
        <section className="bg-background py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="mb-12">
                <h2 className="mb-6 text-2xl font-bold text-foreground sm:text-3xl">
                  Về VN Security 2026
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p className="leading-relaxed">
                    VN Security 2026 là triển lãm và hội nghị quốc tế đầu tiên về công nghiệp an ninh được tổ chức tại Việt Nam, 
                    đánh dấu bước phát triển quan trọng của ngành an ninh Việt Nam trên bản đồ quốc tế.
                  </p>
                  <p className="leading-relaxed">
                    Sự kiện quy tụ các nhà sản xuất, phân phối, và chuyên gia hàng đầu trong lĩnh vực công nghệ an ninh từ khắp nơi trên thế giới, 
                    tạo nên diễn đàn giao thương và chia sẻ kiến thức chuyên ngành lớn nhất khu vực.
                  </p>
                  <p className="leading-relaxed">
                    Với diện tích trưng bày hơn 20,000m2 tại Trung tâm Hội chợ & Triển lãm Sài Gòn (SECC), 
                    VN Security 2026 hứa hẹn mang đến trải nghiệm toàn diện về công nghệ an ninh hiện đại cho hơn 30,000 khách tham quan.
                  </p>
                </div>
              </div>

              {/* Objectives */}
              <div className="mb-12">
                <h2 className="mb-6 text-2xl font-bold text-foreground sm:text-3xl">
                  Mục tiêu Sự kiện
                </h2>
                <ul className="space-y-3">
                  {objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-muted-foreground">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Highlights Grid */}
              <div>
                <h2 className="mb-6 text-2xl font-bold text-foreground sm:text-3xl">
                  Điểm nổi bật
                </h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  {highlights.map((highlight) => (
                    <div
                      key={highlight.title}
                      className="rounded-xl border border-border bg-card p-6"
                    >
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <highlight.icon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                        {highlight.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {highlight.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
