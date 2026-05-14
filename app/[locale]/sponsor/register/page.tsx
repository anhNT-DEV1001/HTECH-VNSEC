"use client"

import { useTranslations, useLocale } from "next-intl"
import { Check, Star, Crown, Award, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  standard: Award,
  silver: Award,
  gold: Star,
  diamond: Crown,
}

const colors: Record<string, string> = {
  standard: "border-border",
  silver: "border-gray-400",
  gold: "border-yellow-500",
  diamond: "border-primary",
}

export default function SponsorRegistrationPage() {
  const t = useTranslations("sponsor.register")
  const locale = useLocale()

  const packages = t.raw("packages") as Record<string, {
    name: string
    size: string
    popular_label?: string
    features: string[]
  }>

  const benefits = t.raw("benefits.items") as string[]

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
            <p className="mb-8 text-pretty text-lg leading-relaxed text-muted-foreground">
              {t("page_description")}
            </p>
            <div className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              {t("promo_badge")}
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-4">
            {Object.entries(packages).map(([key, pkg]) => {
              const Icon = icons[key] || Award
              const isHighlight = key === "gold" || key === "diamond"
              return (
                <div
                  key={key}
                  className={`relative rounded-2xl border-2 bg-card p-6 ${colors[key]} ${key === "gold" ? "shadow-xl" : ""}`}
                >
                  {pkg.popular_label && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                        {pkg.popular_label}
                      </span>
                    </div>
                  )}
                  <div className="mb-4 flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${key === "diamond" ? "bg-primary text-primary-foreground" : key === "gold" ? "bg-yellow-500 text-white" : "bg-muted text-muted-foreground"}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-card-foreground">{pkg.name}</h3>
                      <p className="text-xs text-muted-foreground">{pkg.size}</p>
                    </div>
                  </div>
                  <ul className="mb-6 space-y-2">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className={`w-full ${isHighlight ? "bg-primary hover:bg-primary/90" : ""}`}
                    variant={isHighlight ? "default" : "outline"}
                  >
                    <Link href={`/${locale}/contact`}>{t("package_cta")}</Link>
                  </Button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground sm:text-3xl">
              {t("benefits.title")}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
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
            {t("cta.title")}
          </h2>
          <p className="mb-6 text-muted-foreground">
            {t("cta.description")}
          </p>
          <Button asChild size="lg" className="group bg-primary hover:bg-primary/90">
            <Link href={`/${locale}/contact`}>
              {t("cta.button")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
