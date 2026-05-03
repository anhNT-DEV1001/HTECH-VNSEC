import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { MapPin, Car, Train, Plane, Hotel, Coffee, Utensils } from "lucide-react"

const venueFeatures = [
  { label: "Diện tích triển lãm", value: "20,000+ m²" },
  { label: "Số gian hàng", value: "500+" },
  { label: "Phòng hội thảo", value: "15 phòng" },
  { label: "Sức chứa hội trường", value: "3,000 người" },
]

const transportation = [
  {
    icon: Plane,
    title: "Sân bay",
    description: "Cách sân bay Tân Sơn Nhất 15km (khoảng 30 phút di chuyển)",
  },
  {
    icon: Car,
    title: "Ô tô",
    description: "Bãi đỗ xe rộng rãi với sức chứa 2,000 xe",
  },
  {
    icon: Train,
    title: "Metro",
    description: "Ga Metro Phú Mỹ Hưng (tuyến số 4 - sắp hoàn thành)",
  },
]

const nearbyServices = [
  {
    icon: Hotel,
    title: "Khách sạn",
    items: ["Grand Hyatt Saigon", "Pullman Saigon Centre", "Nikko Saigon", "Melia Saigon"],
  },
  {
    icon: Utensils,
    title: "Nhà hàng",
    items: ["Crescent Mall", "SC VivoCity", "Saigon Centre", "Các nhà hàng nội khu SECC"],
  },
  {
    icon: Coffee,
    title: "Tiện ích",
    items: ["ATM/Ngân hàng", "Cửa hàng tiện lợi", "Dịch vụ y tế", "Văn phòng du lịch"],
  },
]

export default function VenuePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                Địa điểm
              </span>
              <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-secondary-foreground sm:text-5xl">
                Địa điểm Tổ chức
              </h1>
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                Trung tâm Hội chợ & Triển lãm Sài Gòn (SECC) - Trung tâm triển lãm lớn nhất Việt Nam
              </p>
            </div>
          </div>
        </section>

        {/* Venue Info */}
        <section className="bg-background py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              {/* Map Placeholder */}
              <div className="mb-12 overflow-hidden rounded-2xl border border-border">
                <div className="aspect-[2/1] bg-muted">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <MapPin className="mx-auto mb-4 h-12 w-12 text-primary" />
                      <h3 className="mb-2 text-xl font-semibold text-foreground">
                        Trung tâm Hội chợ & Triển lãm Sài Gòn (SECC)
                      </h3>
                      <p className="text-muted-foreground">
                        799 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Venue Features */}
              <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {venueFeatures.map((feature) => (
                  <div
                    key={feature.label}
                    className="rounded-xl border border-border bg-card p-6 text-center"
                  >
                    <div className="mb-1 text-3xl font-bold text-primary">{feature.value}</div>
                    <div className="text-sm text-muted-foreground">{feature.label}</div>
                  </div>
                ))}
              </div>

              {/* About SECC */}
              <div className="mb-16">
                <h2 className="mb-6 text-2xl font-bold text-foreground">Về SECC</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p className="leading-relaxed">
                    Trung tâm Hội chợ & Triển lãm Sài Gòn (SECC) là trung tâm triển lãm quốc tế lớn nhất Việt Nam, 
                    tọa lạc tại khu đô thị Phú Mỹ Hưng, Quận 7, TP. Hồ Chí Minh.
                  </p>
                  <p className="leading-relaxed">
                    Với diện tích tổng thể hơn 100,000m2, SECC được trang bị đầy đủ các tiện nghi hiện đại, 
                    đáp ứng tiêu chuẩn quốc tế cho các sự kiện triển lãm và hội nghị quy mô lớn.
                  </p>
                </div>
              </div>

              {/* Transportation */}
              <div className="mb-16">
                <h2 className="mb-6 text-2xl font-bold text-foreground">Di chuyển</h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {transportation.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-xl border border-border bg-card p-6"
                    >
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 font-semibold text-card-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nearby Services */}
              <div>
                <h2 className="mb-6 text-2xl font-bold text-foreground">Tiện ích lân cận</h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {nearbyServices.map((service) => (
                    <div
                      key={service.title}
                      className="rounded-xl border border-border bg-card p-6"
                    >
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <service.icon className="h-5 w-5" />
                        </div>
                        <h3 className="font-semibold text-card-foreground">{service.title}</h3>
                      </div>
                      <ul className="space-y-1">
                        {service.items.map((item) => (
                          <li key={item} className="text-sm text-muted-foreground">
                            • {item}
                          </li>
                        ))}
                      </ul>
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
