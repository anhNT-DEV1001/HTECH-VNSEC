"use client"

import { useTranslations } from "next-intl"
import { MapPin, Car, Train, Plane } from "lucide-react"
import { motion } from "framer-motion"
import GoogleMapComponent from "@/components/map/google-map"
import { useCountUp, formatNumber } from "@/hooks/useCountUp"

function FeatureCard({ label, value, unit, num }: { label: string; value: string; unit: string; num?: number }) {
  const count = useCountUp(num ?? 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-border bg-card p-6 text-center"
    >
      <div className="mb-1 text-3xl font-bold text-primary">
        {formatNumber(count)}{unit}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </motion.div>
  )
}

export default function VenuePage() {
  const t = useTranslations("about.venue")
  const features = (t.raw("features") as Array<{ label: string; value: string; unit: string; num?: number }> | undefined) ?? []
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
            <h1 className="mb-6 text-balance text-4xl font-bold uppercase tracking-tight text-secondary-foreground sm:text-5xl">
              {t("page_title")}
            </h1>
            <p className="mt-6 text-center text-sm leading-8 text-secondary-foreground/78">
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
            <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 pt-10">
              {features.map((f, i) => (
                <FeatureCard key={i} label={f.label} value={f.value} unit={f.unit} num={f.num} />
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
