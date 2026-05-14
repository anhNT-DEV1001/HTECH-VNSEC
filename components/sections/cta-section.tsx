import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import { ArrowRight, Calendar, Users, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  exhibitors: Building2,
  speakers: Users,
  visitors: Calendar,
}

export function CTASection() {
  const t = useTranslations("home.cta")
  const locale = useLocale()

  const options = t.raw("options") as Array<{
    title: string
    description: string
    cta: string
  }>

  const optionKeys = ["exhibitors", "speakers", "visitors"] as const

  return (
    <section className="bg-warm-surface relative overflow-hidden py-20 lg:py-28">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(234,88,12,0.18),transparent_48%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_80%,rgba(251,146,60,0.08),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(234,88,12,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(234,88,12,0.035)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-5xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            {t("section_badge")}
          </span>
          <h2 className="homepage-section-title mx-auto mb-6 max-w-5xl text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-3xl text-pretty text-lg text-muted-foreground">
            {t("description")}
          </p>
        </div>

        {/* CTA Cards */}
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {options.map((option, index) => {
            const Icon = icons[optionKeys[index]]
            return (
              <div
                key={index}
                className="bg-warm-card group relative overflow-hidden rounded-2xl border border-primary/10 p-8 shadow-[0_18px_40px_rgba(15,23,42,0.04)] transition-all duration-300 hover:border-primary/45 hover:bg-white/80"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  {option.title}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  {option.description}
                </p>
                <Button asChild className="group/btn w-full bg-primary hover:bg-primary/90">
                  <Link href={`/${locale}/register?type=${optionKeys[index] === "exhibitors" ? "exhibitor" : optionKeys[index] === "speakers" ? "speaker" : "visitor"}`}>
                    {option.cta}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </div>
            )
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            {t("contact_question")}{" "}
            <Link href={`/${locale}/contact`} className="font-medium text-primary hover:underline">
              {t("contact_link")}
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
