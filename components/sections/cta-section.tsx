import Link from "next/link"
import { ArrowRight, Calendar, Users, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const ctaOptions = [
  {
    icon: Building2,
    title: "Nhà triển lãm",
    description: "Giới thiệu sản phẩm và giải pháp của bạn đến hàng nghìn khách hàng tiềm năng.",
    cta: "Đăng ký gian hàng",
    href: "/register?type=exhibitor",
  },
  {
    icon: Calendar,
    title: "Diễn giả",
    description: "Chia sẻ kiến thức và kinh nghiệm tại các phiên hội thảo chuyên đề.",
    cta: "Đăng ký diễn giả",
    href: "/register?type=speaker",
  },
  {
    icon: Users,
    title: "Khách tham quan",
    description: "Đăng ký miễn phí để tham quan triển lãm và tham dự các hội thảo chuyên đề.",
    cta: "Đăng ký tham quan",
    href: "/register?type=visitor",
  },
]

export function CTASection() {
  return (
    <section className="bg-warm-surface relative overflow-hidden py-20 lg:py-28">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(234,88,12,0.18),transparent_48%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_80%,rgba(251,146,60,0.08),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(234,88,12,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(234,88,12,0.035)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            Tham gia ngay
          </span>
          <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Hãy Trở Thành Một Phần của{" "}
            <span className="text-primary">VN Security 2026</span>
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Dù bạn là khách tham quan, nhà triển lãm hay diễn giả, VN Security 2026 đều có chương trình phù hợp dành cho bạn.
          </p>
        </div>

        {/* CTA Cards */}
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {ctaOptions.map((option) => (
            <div
              key={option.title}
              className="bg-warm-card group relative overflow-hidden rounded-2xl border border-primary/10 p-8 shadow-[0_18px_40px_rgba(15,23,42,0.04)] transition-all duration-300 hover:border-primary/45 hover:bg-white/80"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <option.icon className="h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">
                {option.title}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                {option.description}
              </p>
              <Button asChild className="group/btn w-full bg-primary hover:bg-primary/90">
                <Link href={option.href}>
                  {option.cta}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            Có câu hỏi?{" "}
            <Link href="/contact" className="font-medium text-primary hover:underline">
              Liên hệ với chúng tôi
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
