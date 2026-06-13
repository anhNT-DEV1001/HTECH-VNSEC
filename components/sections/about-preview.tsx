import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import { ArrowRight } from "lucide-react"
import { Reveal, StaggerReveal } from "@/components/animations/reveal"
import { AboutFeatureCard } from "@/components/sections/about-feature-card"
import { Button } from "@/components/ui/button"

const featureIcons = ["shield", "users", "award", "globe"] as const

export function AboutPreview() {
  const t = useTranslations("home.about")
  const locale = useLocale()

  const features = t.raw("features") as Array<{ title: string; description: string }>
  const titleLines = t.raw("title_lines") as string[]

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <Reveal className="mx-auto mb-16 w-full max-w-7xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            {t("section_badge")}
          </span>
          <h2 className="homepage-section-title mx-auto mb-6 max-w-7xl text-center text-[#2c54ce]">
            {titleLines.map((line) => (
              <span key={line} className="block text-center">
                {line}
              </span>
            ))}
          </h2>
          <p className="mx-auto max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        {/* Features Grid */}
        <StaggerReveal className="mb-12 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Reveal key={index} direction="scale" inherit>
              <AboutFeatureCard
                title={feature.title}
                description={feature.description}
                icon={featureIcons[index] ?? "shield"}
              />
            </Reveal>
          ))}
        </StaggerReveal>

        {/* CTA */}
        <Reveal className="text-center" delay={0.1}>
          <Button asChild variant="outline" size="lg" className="group">
            <Link href={`/${locale}/about/general-info`}>
              {t("cta")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
