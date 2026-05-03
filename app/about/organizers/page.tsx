import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Building2, Users, Globe } from "lucide-react"

const organizers = [
  {
    type: "Đơn vị chủ trì",
    name: "Bộ Công an Việt Nam",
    description: "Cơ quan quản lý nhà nước về an ninh quốc gia, đảm bảo an ninh trật tự xã hội.",
    logo: "BCA",
  },
  {
    type: "Đơn vị đồng tổ chức",
    name: "Hiệp hội An ninh Việt Nam",
    description: "Tổ chức đại diện cho các doanh nghiệp hoạt động trong lĩnh vực an ninh tại Việt Nam.",
    logo: "VSA",
  },
  {
    type: "Đơn vị tổ chức",
    name: "VN Security Expo JSC",
    description: "Công ty chuyên tổ chức các sự kiện triển lãm quốc tế tại Việt Nam.",
    logo: "VSE",
  },
]

const supporters = [
  "Bộ Công Thương",
  "Bộ Khoa học và Công nghệ",
  "UBND TP. Hồ Chí Minh",
  "Phòng Thương mại và Công nghiệp Việt Nam (VCCI)",
  "Hiệp hội Doanh nghiệp Điện tử Việt Nam",
  "Hội Tự động hóa Việt Nam",
]

const internationalPartners = [
  { name: "ASIS International", country: "Hoa Kỳ" },
  { name: "Security Industry Association", country: "Hoa Kỳ" },
  { name: "Asia Pacific Security Association", country: "Singapore" },
  { name: "European Security Association", country: "Bỉ" },
  { name: "Japan Security Equipment Association", country: "Nhật Bản" },
  { name: "Korea Security Association", country: "Hàn Quốc" },
]

export default function OrganizersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                Ban tổ chức
              </span>
              <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-secondary-foreground sm:text-5xl">
                Ban Tổ chức & Đối tác
              </h1>
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                VN Security 2026 được tổ chức bởi đội ngũ chuyên nghiệp với sự hỗ trợ của 
                các cơ quan nhà nước và đối tác quốc tế uy tín.
              </p>
            </div>
          </div>
        </section>

        {/* Organizers */}
        <section className="bg-background py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <div className="mb-12 flex items-center gap-3">
                <Building2 className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Đơn vị tổ chức</h2>
              </div>
              
              <div className="mb-16 grid gap-6 md:grid-cols-3">
                {organizers.map((org) => (
                  <div
                    key={org.name}
                    className="rounded-xl border border-border bg-card p-6 text-center"
                  >
                    <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                      {org.logo}
                    </div>
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-primary">
                      {org.type}
                    </span>
                    <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                      {org.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{org.description}</p>
                  </div>
                ))}
              </div>

              {/* Supporters */}
              <div className="mb-16">
                <div className="mb-8 flex items-center gap-3">
                  <Users className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">Đơn vị bảo trợ</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {supporters.map((supporter) => (
                    <div
                      key={supporter}
                      className="rounded-lg border border-border bg-card px-4 py-3 text-center text-sm font-medium text-card-foreground"
                    >
                      {supporter}
                    </div>
                  ))}
                </div>
              </div>

              {/* International Partners */}
              <div>
                <div className="mb-8 flex items-center gap-3">
                  <Globe className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">Đối tác quốc tế</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {internationalPartners.map((partner) => (
                    <div
                      key={partner.name}
                      className="rounded-lg border border-border bg-card p-4"
                    >
                      <h3 className="font-semibold text-card-foreground">{partner.name}</h3>
                      <p className="text-sm text-muted-foreground">{partner.country}</p>
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
