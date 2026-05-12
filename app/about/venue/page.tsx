"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { MapPin, Car, Train, Plane, Hotel, Coffee, Utensils } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import {motion} from "framer-motion"
import GoogleMapComponent from "@/components/map/google-map"

const venueFeatures = [
  { label: "Diện tích triển lãm", value: "20,000+ ", unit: "m²", num: 20000 },
  { label: "Số gian hàng", value: "500", unit: "", num: 500 },
  { label: "Phòng hội thảo", value: "15", unit: "", num: 15 },
  { label: "Sức chứa hội trường", value: "3,000", unit: "", num: 3000 },
]

function FeatureCard({label, value, unit, num}: typeof venueFeatures[0]){
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if(entry.isIntersecting){
        setInView(true)
        observer.disconnect()
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(()=>{
    if(!inView) return
    const duration = 2000
    const start = performance.now()
    const animate = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1-t,3)
      setCount(Math.floor(eased*num))
      if(t<1) requestAnimationFrame(animate)
    }
  requestAnimationFrame(animate)
  }, [inView, num])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-border bg-card p-6 text-center"
    >
      <div className="mb-1 text-3xl font-bold text-primary">
        {count.toLocaleString()}{unit}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </motion.div>
  )
}


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
              <GoogleMapComponent height="400px"/>

              {/* Venue Features */}
              <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {venueFeatures.map((f) => (
                  <FeatureCard key={f.label} {...f}/>
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
              {/* <div className="mb-16">
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
              </div> */}

              {/* Nearby Services */}
              {/* <div>
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
              </div> */}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
