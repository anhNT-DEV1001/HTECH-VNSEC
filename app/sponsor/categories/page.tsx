import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { 
  Camera, Lock, Radio, Fingerprint, Shield, Server,
  Eye, Flame, Bell, Car, Building2, Laptop
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const categories = [
  {
    icon: Camera,
    title: "Camera & Giám sát",
    description: "Hệ thống camera an ninh IP, CCTV, PTZ, camera nhiệt, video analytics, NVR/DVR, phần mềm VMS",
    products: ["Camera IP/CCTV", "Camera PTZ", "Camera nhiệt", "Video Analytics", "NVR/DVR", "Phần mềm VMS"],
    count: "120+",
  },
  {
    icon: Lock,
    title: "Kiểm soát Truy cập",
    description: "Khóa điện tử, cổng từ, barrier, đầu đọc thẻ, hệ thống access control tích hợp",
    products: ["Khóa điện tử", "Cổng từ/Barrier", "Đầu đọc thẻ", "Controller", "Phần mềm quản lý"],
    count: "85+",
  },
  {
    icon: Fingerprint,
    title: "Sinh trắc học",
    description: "Công nghệ nhận diện khuôn mặt, vân tay, mống mắt, giọng nói và các giải pháp biometric",
    products: ["Nhận diện khuôn mặt", "Vân tay", "Mống mắt", "Giọng nói", "Đa sinh trắc học"],
    count: "60+",
  },
  {
    icon: Flame,
    title: "Phòng cháy Chữa cháy",
    description: "Hệ thống báo cháy, chữa cháy tự động, thiết bị PCCC, hệ thống sprinkler",
    products: ["Đầu báo khói/nhiệt", "Trung tâm báo cháy", "Chữa cháy tự động", "Sprinkler", "Bình chữa cháy"],
    count: "75+",
  },
  {
    icon: Bell,
    title: "Hệ thống Báo động",
    description: "Báo trộm, báo xâm nhập, hệ thống cảnh báo sớm, panic button, sensors",
    products: ["Trung tâm báo động", "Sensors", "Panic button", "Còi/đèn báo", "GSM/GPRS module"],
    count: "65+",
  },
  {
    icon: Shield,
    title: "An ninh Mạng",
    description: "Firewall, bảo mật dữ liệu, phòng chống tấn công mạng, mã hóa, VPN",
    products: ["Firewall", "Antivirus/Antimalware", "SIEM", "Mã hóa dữ liệu", "Penetration testing"],
    count: "50+",
  },
  {
    icon: Server,
    title: "Trung tâm Điều khiển",
    description: "Phần mềm quản lý tích hợp, PSIM, command center, video wall",
    products: ["PSIM", "Video wall", "Command center", "Phần mềm tích hợp", "Workstation"],
    count: "40+",
  },
  {
    icon: Car,
    title: "An ninh Giao thông",
    description: "Hệ thống quản lý bãi đỗ xe, LPR, gương cầu, barrier giao thông, đèn tín hiệu",
    products: ["LPR/ANPR", "Quản lý bãi xe", "Barrier tự động", "Gương cầu", "Đèn tín hiệu"],
    count: "45+",
  },
  {
    icon: Eye,
    title: "Giám sát Drone",
    description: "Drone an ninh, hệ thống anti-drone, giám sát từ trên cao",
    products: ["Drone tuần tra", "Anti-drone system", "Hệ thống tracking", "Camera drone"],
    count: "25+",
  },
  {
    icon: Building2,
    title: "An ninh Tòa nhà",
    description: "BMS tích hợp an ninh, smart building, intercom, hệ thống PA",
    products: ["BMS", "Intercom", "PA system", "Smart lock", "Elevator control"],
    count: "55+",
  },
  {
    icon: Laptop,
    title: "Phần mềm & AI",
    description: "AI analytics, machine learning, phần mềm quản lý an ninh, cloud solutions",
    products: ["AI Analytics", "Cloud platform", "Mobile app", "Data management", "Integration API"],
    count: "35+",
  },
  {
    icon: Radio,
    title: "Thiết bị Liên lạc",
    description: "Bộ đàm, hệ thống liên lạc nội bộ, radio trunking, thiết bị khẩn cấp",
    products: ["Bộ đàm kỹ thuật số", "Radio trunking", "IP intercom", "Emergency phone"],
    count: "30+",
  },
]

export default function CategoriesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                Lĩnh vực trưng bày
              </span>
              <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-secondary-foreground sm:text-5xl">
                Các Lĩnh vực Triển lãm
              </h1>
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                VN Security 2026 bao gồm 12 lĩnh vực chính với hơn 500 nhà triển lãm
              </p>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="bg-background py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <div
                  key={category.title}
                  className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <category.icon className="h-7 w-7" />
                    </div>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                      {category.count}
                    </span>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                    {category.title}
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {category.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {category.products.slice(0, 4).map((product) => (
                      <span
                        key={product}
                        className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground"
                      >
                        {product}
                      </span>
                    ))}
                    {category.products.length > 4 && (
                      <span className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                        +{category.products.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-16 text-center">
              <p className="mb-4 text-muted-foreground">
                Quan tâm tham gia triển lãm trong các lĩnh vực trên?
              </p>
              <Button asChild size="lg" className="group bg-primary hover:bg-primary/90">
                <Link href="/sponsor/register">
                  Đăng ký gian hàng
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
