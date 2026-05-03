import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Check, Star, Crown, Award, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const packages = [
  {
    name: "Standard",
    price: "50,000,000",
    unit: "VND",
    size: "9m²",
    icon: Award,
    color: "border-border",
    features: [
      "Gian hàng tiêu chuẩn 9m²",
      "Biển hiệu tên công ty",
      "1 bàn + 2 ghế",
      "2 ổ điện 220V",
      "Đèn chiếu sáng cơ bản",
      "2 thẻ exhibitor",
      "Listing trong catalog",
    ],
  },
  {
    name: "Silver",
    price: "80,000,000",
    unit: "VND",
    size: "18m²",
    icon: Award,
    color: "border-gray-400",
    features: [
      "Gian hàng 18m²",
      "Thiết kế tùy chỉnh cơ bản",
      "Biển hiệu có logo",
      "2 bàn + 4 ghế",
      "4 ổ điện 220V",
      "Đèn spotlight",
      "4 thẻ exhibitor",
      "Quảng cáo trên website",
      "Logo trên backdrop",
    ],
  },
  {
    name: "Gold",
    price: "150,000,000",
    unit: "VND",
    size: "36m²",
    icon: Star,
    color: "border-yellow-500",
    popular: true,
    features: [
      "Gian hàng 36m²",
      "Thiết kế tùy chỉnh cao cấp",
      "Phòng họp riêng",
      "Hệ thống AV",
      "6 thẻ exhibitor + 2 VIP",
      "Quảng cáo trên catalog",
      "Logo trên banner chính",
      "1 speaking slot (15 phút)",
      "Ưu tiên vị trí",
    ],
  },
  {
    name: "Diamond",
    price: "300,000,000",
    unit: "VND",
    size: "72m²+",
    icon: Crown,
    color: "border-primary",
    features: [
      "Gian hàng 72m² trở lên",
      "Thiết kế độc quyền",
      "Phòng VIP riêng",
      "Hệ thống AV cao cấp",
      "10 thẻ exhibitor + 5 VIP",
      "Quảng cáo full page catalog",
      "Logo nổi bật mọi ấn phẩm",
      "Keynote slot (30 phút)",
      "Vị trí prime",
      "PR truyền thông",
    ],
  },
]

const benefits = [
  "Tiếp cận 30,000+ khách tham quan chuyên ngành",
  "Networking với đối tác từ 50+ quốc gia",
  "Tham gia các phiên B2B Matching",
  "Cơ hội trình diễn sản phẩm trực tiếp",
  "Quảng bá thương hiệu trong ngành",
  "Thu thập lead chất lượng cao",
]

export default function SponsorRegistrationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                Đăng ký triển lãm
              </span>
              <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-secondary-foreground sm:text-5xl">
                Gói Triển lãm & Tài trợ
              </h1>
              <p className="mb-8 text-pretty text-lg leading-relaxed text-muted-foreground">
                Lựa chọn gói phù hợp với nhu cầu và ngân sách của doanh nghiệp bạn
              </p>
              <div className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                🎉 Đăng ký trước 31/03/2026 - Giảm 15%
              </div>
            </div>
          </div>
        </section>

        {/* Packages */}
        <section className="bg-background py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-4">
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`relative rounded-2xl border-2 bg-card p-6 ${pkg.color} ${pkg.popular ? "shadow-xl" : ""}`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                        Phổ biến nhất
                      </span>
                    </div>
                  )}
                  <div className="mb-4 flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${pkg.name === "Diamond" ? "bg-primary text-primary-foreground" : pkg.name === "Gold" ? "bg-yellow-500 text-white" : "bg-muted text-muted-foreground"}`}>
                      <pkg.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-card-foreground">{pkg.name}</h3>
                      <p className="text-xs text-muted-foreground">{pkg.size}</p>
                    </div>
                  </div>
                  <div className="mb-6">
                    <span className="text-2xl font-bold text-card-foreground">{pkg.price}</span>
                    <span className="text-sm text-muted-foreground"> {pkg.unit}</span>
                  </div>
                  <ul className="mb-6 space-y-2">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    asChild 
                    className={`w-full ${pkg.name === "Diamond" || pkg.name === "Gold" ? "bg-primary hover:bg-primary/90" : ""}`}
                    variant={pkg.name === "Diamond" || pkg.name === "Gold" ? "default" : "outline"}
                  >
                    <Link href="/contact">Liên hệ tư vấn</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-muted/30 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-foreground sm:text-3xl">
                Lợi ích khi tham gia Triển lãm
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm text-card-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-secondary py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-2xl font-bold text-secondary-foreground">
              Cần tư vấn thêm?
            </h2>
            <p className="mb-6 text-muted-foreground">
              Liên hệ với đội ngũ bán hàng của chúng tôi để được hỗ trợ
            </p>
            <Button asChild size="lg" className="group bg-primary hover:bg-primary/90">
              <Link href="/contact">
                Liên hệ ngay
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
