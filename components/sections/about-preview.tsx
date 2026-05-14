import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import { ArrowRight, Shield, Globe, Users, Award } from "lucide-react"
import { Button } from "@/components/ui/button"

const icons = [Shield, Globe, Users, Award]

export function AboutPreview() {
  const t = useTranslations("home.about")
  const locale = useLocale()

  const features = t.raw("features") as Array<{ title: string; description: string }>
  const titleLines = t.raw("title_lines") as string[]

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 w-full max-w-7xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            {t("section_badge")}
          </span>
          <h2 className="homepage-section-title mx-auto mb-6 max-w-7xl text-foreground">
            {titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mx-auto max-w-4xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = icons[index]
            return (
              <div key={index} className="group relative">
                <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/40 via-primary/20 to-accent/30 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                <div
                  className="relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/5"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                  <div className="absolute -bottom-1 -right-1 h-20 w-20 rounded-full bg-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="group">
            <Link href={`/${locale}/about/general-info`}>
              {t("cta")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
