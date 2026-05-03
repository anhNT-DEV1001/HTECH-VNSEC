import Link from "next/link"
import { ArrowRight, Camera, Lock, Radio, Fingerprint, Shield, Server } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = [
  {
    icon: Camera,
    title: "Camera & Giám sát",
    description: "Hệ thống camera an ninh, CCTV, video analytics",
    count: "120+",
  },
  {
    icon: Lock,
    title: "Kiểm soát Truy cập",
    description: "Khóa điện tử, cổng từ, hệ thống access control",
    count: "85+",
  },
  {
    icon: Radio,
    title: "Hệ thống Báo động",
    description: "Báo cháy, báo trộm, hệ thống cảnh báo sớm",
    count: "95+",
  },
  {
    icon: Fingerprint,
    title: "Sinh trắc học",
    description: "Nhận diện khuôn mặt, vân tay, mống mắt",
    count: "60+",
  },
  {
    icon: Shield,
    title: "An ninh Mạng",
    description: "Firewall, bảo mật dữ liệu, phòng chống tấn công",
    count: "75+",
  },
  {
    icon: Server,
    title: "Trung tâm Điều khiển",
    description: "Phần mềm quản lý, tích hợp hệ thống",
    count: "50+",
  },
]

export function ExhibitorCategories() {
  return (
    <section className="bg-warm-surface py-20 lg:py-28">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
              Lĩnh vực trưng bày
            </span>
            <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Khám phá Các Danh mục Triển lãm
            </h2>
            <p className="text-pretty text-muted-foreground">
              VN Security 2026 quy tụ đa dạng các lĩnh vực trong ngành công nghiệp an ninh, từ thiết bị phần cứng đến giải pháp phần mềm.
            </p>
          </div>
          <Button asChild variant="outline" className="shrink-0 border-primary/15 bg-white/50 text-foreground hover:bg-white/80">
            <Link href="/sponsor/categories">
              Xem tất cả
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.title}
              href="/sponsor/categories"
              className="bg-warm-card group relative overflow-hidden rounded-xl border border-primary/10 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.04)] transition-all duration-300 hover:border-primary/40 hover:bg-white/80"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <category.icon className="h-7 w-7" />
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                  {category.count}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {category.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {category.description}
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Khám phá
                <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
