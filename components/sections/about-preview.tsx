import Link from "next/link"
import { ArrowRight, Shield, Globe, Users, Award } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: Shield,
    title: "Công nghệ An ninh",
    description: "Trưng bày các giải pháp an ninh tiên tiến nhất từ các nhà sản xuất hàng đầu thế giới.",
  },
  {
    icon: Globe,
    title: "Quy mô Quốc tế",
    description: "Kết nối doanh nghiệp Việt Nam với đối tác từ hơn 50 quốc gia trên toàn cầu.",
  },
  {
    icon: Users,
    title: "Hội nghị Chuyên đề",
    description: "Các buổi hội thảo chuyên sâu với sự tham gia của chuyên gia hàng đầu.",
  },
  {
    icon: Award,
    title: "Cơ hội Kinh doanh",
    description: "Tạo cầu nối giữa nhà cung cấp và khách hàng trong ngành an ninh.",
  },
]

export function AboutPreview() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            Giới thiệu
          </span>
          <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Triển lãm An ninh Quốc tế tại Việt Nam
          </h2>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            VN Security 2026 là sự kiện quy tụ các nhà sản xuất, phân phối và chuyên gia hàng đầu trong lĩnh vực công nghiệp an ninh, tạo nên diễn đàn giao thương quốc tế lớn nhất khu vực.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
              {/* Hover Accent */}
              <div className="absolute -bottom-1 -right-1 h-20 w-20 rounded-full bg-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="group">
            <Link href="/about/general-info">
              Xem chi tiết về sự kiện
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
