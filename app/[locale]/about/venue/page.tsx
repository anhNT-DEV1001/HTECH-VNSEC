"use client"

import { useTranslations } from "next-intl"
import { MapPin, Car, Train, Plane } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import GoogleMapComponent from "@/components/map/google-map"

const venueFeatures = [
  { label: "Diện tích triển lãm", value: "20,000+ ", unit: "m²", num: 20000 },
  { label: "Số gian hàng", value: "500", unit: "", num: 500 },
  { label: "Phòng hội thảo", value: "15", unit: "", num: 15 },
  { label: "Sức chứa hội trường", value: "3,000", unit: "", num: 3000 },
]

function FeatureCard({ label, value, unit, num }: typeof venueFeatures[0]) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.disconnect()
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const start = performance.now()
    const animate = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setCount(Math.floor(eased * num))
      if (t < 1) requestAnimationFrame(animate)
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

export default function VenuePage() {
  const t = useTranslations("about.venue")
  const features = t.raw("features") as Array<{ label: string; value: string }>
  const aboutVec = t.raw("about_vec") as { title: string; p1: string; p2: string }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
              {t("page_badge")}
            </span>
            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-secondary-foreground sm:text-5xl">
              {t("page_title")}
            </h1>
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
              {t("page_description")}
            </p>
          </div>
        </div>
      </section>

      {/* Venue Info */}
      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            {/* Map */}
            <GoogleMapComponent height="400px" />

            {/* Venue Features */}
            <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((f, i) => (
                <FeatureCard key={i} label={f.label} value={f.value} unit="" num={20000} />
              ))}
            </div>

            {/* About VEC */}
            <div className="mb-16">
              <h2 className="mb-6 text-2xl font-bold text-foreground">{aboutVec.title}</h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">{aboutVec.p1}</p>
                <p className="leading-relaxed">{aboutVec.p2}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
