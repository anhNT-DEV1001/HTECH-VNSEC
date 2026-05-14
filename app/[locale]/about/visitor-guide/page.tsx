"use client"

import { useTranslations, useLocale } from "next-intl"
import { Clock, ShieldCheck } from "lucide-react"

export default function VisitorGuidePage() {
  const t = useTranslations("about.visitor_guide")
  const locale = useLocale()

  const hours = t.raw("hours.data") as Array<{ day: string; hours: string; note: string }>
  const rules = t.raw("rules.items") as string[]
  const badgeSteps = t.raw("badge.steps") as Array<{ title: string; description: string }>

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

      {/* Content */}
      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            {/* Opening Hours */}
            <div className="mb-16">
              <div className="mb-6 flex items-center gap-3">
                <Clock className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">{t("hours.title")}</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {hours.map((item, i) => (
                  <div
                    key={i}
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
                <h2 className="text-2xl font-bold text-foreground">{t("badge.title")}</h2>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <ol className="space-y-4">
                  {badgeSteps.map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                        {i + 1}
                      </span>
                      <div>
                        <div className="font-semibold text-card-foreground">{step.title}</div>
                        <div className="text-sm text-muted-foreground">{step.description}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Rules */}
            <div className="mb-16">
              <div className="mb-6 flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">{t("rules.title")}</h2>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {rules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
