import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { 
  Clock, MapPin, Ticket, Camera, Wifi, Coffee, 
  ShieldCheck, Accessibility, Phone, Info
} from "lucide-react"

const openingHours = [
  { day: "Ngày 1 - 15/10", hours: "08:00 - 18:00", note: "Lễ khai mạc 08:00" },
  { day: "Ngày 2 - 16/10", hours: "09:00 - 18:00", note: "" },
  { day: "Ngày 3 - 17/10", hours: "09:00 - 18:00", note: "Gala Dinner 18:00" },
  { day: "Ngày 4 - 18/10", hours: "09:00 - 14:00", note: "Lễ bế mạc 12:00" },
]

const facilities = [
  { icon: Wifi, title: "Wifi miễn phí", description: "Wifi tốc độ cao toàn khu vực triển lãm" },
  { icon: Coffee, title: "Khu ẩm thực", description: "Nhiều lựa chọn ẩm thực tại Food Court" },
  { icon: Accessibility, title: "Hỗ trợ khuyết tật", description: "Xe lăn và lối đi thuận tiện" },
  { icon: Camera, title: "Photo booth", description: "Khu vực chụp ảnh lưu niệm" },
]

const rules = [
  "Mang theo thẻ đăng ký hoặc vé điện tử khi vào cửa",
  "Trang phục lịch sự, phù hợp môi trường kinh doanh",
  "Không mang đồ ăn thức uống vào khu vực triển lãm",
  "Xin phép trước khi chụp ảnh sản phẩm tại các gian hàng",
  "Tuân thủ hướng dẫn của nhân viên an ninh",
  "Không hút thuốc trong khu vực triển lãm",
]

const tips = [
  { title: "Đăng ký trước", description: "Đăng ký online để tiết kiệm thời gian check-in" },
  { title: "Đến sớm", description: "Đến trước 30 phút để có thời gian xem sơ đồ và lên kế hoạch" },
  { title: "Mang name card", description: "Chuẩn bị đủ name card để trao đổi với đối tác" },
  { title: "Lên lịch B2B", description: "Đặt lịch hẹn B2B trước với các exhibitor quan tâm" },
  { title: "Tải app", description: "Tải ứng dụng VN Security để cập nhật lịch trình realtime" },
  { title: "Thoải mái đi bộ", description: "Mang giày thoải mái vì triển lãm rất rộng" },
]

export default function VisitorGuidePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                Hướng dẫn
              </span>
              <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-secondary-foreground sm:text-5xl">
                Hướng dẫn Tham quan
              </h1>
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                Thông tin cần thiết để có trải nghiệm tốt nhất tại VN Security 2026
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="bg-background py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              {/* Opening Hours */}
              <div className="mb-16">
                <div className="mb-6 flex items-center gap-3">
                  <Clock className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">Giờ mở cửa</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {openingHours.map((item) => (
                    <div
                      key={item.day}
                      className="rounded-xl border border-border bg-card p-4"
                    >
                      <div className="mb-1 font-semibold text-card-foreground">{item.day}</div>
                      <div className="text-2xl font-bold text-primary">{item.hours}</div>
                      {item.note && (
                        <div className="mt-1 text-sm text-muted-foreground">{item.note}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* How to get badge */}
              <div className="mb-16">
                <div className="mb-6 flex items-center gap-3">
                  <Ticket className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">Nhận thẻ tham quan</h2>
                </div>
                <div className="rounded-xl border border-border bg-card p-6">
                  <ol className="space-y-4">
                    <li className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                        1
                      </span>
                      <div>
                        <div className="font-semibold text-card-foreground">Đăng ký trực tuyến</div>
                        <div className="text-sm text-muted-foreground">
                          Điền form đăng ký tại website và nhận mã QR qua email
                        </div>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                        2
                      </span>
                      <div>
                        <div className="font-semibold text-card-foreground">Check-in tại sự kiện</div>
                        <div className="text-sm text-muted-foreground">
                          Xuất trình mã QR hoặc CMND/CCCD tại quầy đăng ký
                        </div>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                        3
                      </span>
                      <div>
                        <div className="font-semibold text-card-foreground">Nhận thẻ & tài liệu</div>
                        <div className="text-sm text-muted-foreground">
                          Nhận thẻ đeo, túi tài liệu và sơ đồ triển lãm
                        </div>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>

              {/* Facilities */}
              <div className="mb-16">
                <div className="mb-6 flex items-center gap-3">
                  <Info className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">Tiện ích</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {facilities.map((facility) => (
                    <div
                      key={facility.title}
                      className="flex items-start gap-4 rounded-xl border border-border bg-card p-4"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <facility.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-card-foreground">{facility.title}</div>
                        <div className="text-sm text-muted-foreground">{facility.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rules */}
              <div className="mb-16">
                <div className="mb-6 flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">Nội quy tham quan</h2>
                </div>
                <div className="rounded-xl border border-border bg-card p-6">
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {rules.map((rule, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tips */}
              <div className="mb-16">
                <h2 className="mb-6 text-2xl font-bold text-foreground">Mẹo tham quan hiệu quả</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {tips.map((tip) => (
                    <div
                      key={tip.title}
                      className="rounded-xl border border-border bg-card p-4"
                    >
                      <div className="mb-1 font-semibold text-card-foreground">{tip.title}</div>
                      <div className="text-sm text-muted-foreground">{tip.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
                <div className="flex items-center gap-3">
                  <Phone className="h-6 w-6 text-primary" />
                  <div>
                    <div className="font-semibold text-foreground">Hotline hỗ trợ</div>
                    <div className="text-lg font-bold text-primary">1900 1234 56</div>
                  </div>
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
