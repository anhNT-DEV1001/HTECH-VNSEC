"use client"

import { useTranslations, useLocale } from "next-intl"
import { Shield, Target, Eye, Handshake, CheckCircle } from "lucide-react"

const icons = [Shield, Target, Eye, Handshake]

export default function AboutPage() {
  const t = useTranslations("about.general_info")

  const objectives = t.raw("objectives") as string[]
  const highlights = t.raw("highlights") as Array<{ title: string; description: string }>

  return (
    <>
      {/* Hero Section */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
              {t("page_badge")}
            </span>
            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-secondary-foreground sm:text-5xl lg:text-6xl">
              {t("page_title")}
            </h1>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12">
              <h2 className="mb-6 text-2xl font-bold text-foreground sm:text-3xl">
                {t("section_about.title")}
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">{t("section_about.p1")}</p>
                <p className="leading-relaxed">{t("section_about.p2")}</p>
                <p className="leading-relaxed">{t("section_about.p3")}</p>
              </div>
            </div>

            {/* Objectives */}
            <div className="mb-12">
              <h2 className="mb-6 text-2xl font-bold text-foreground sm:text-3xl">
                {t("section_objectives.title")}
              </h2>
              <ul className="space-y-3">
                {objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Highlights Grid */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-foreground sm:text-3xl">
                {t("section_highlights.title")}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {highlights.map((highlight, index) => {
                  const Icon = icons[index]
                  return (
                    <div
                      key={index}
                      className="rounded-xl border border-border bg-card p-6"
                    >
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                        {highlight.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {highlight.description}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
