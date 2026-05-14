"use client"

import { useTranslations, useLocale } from "next-intl"
import { Building2, Users, Globe } from "lucide-react"

const logos: Record<number, string> = {
  0: "BCA",
  1: "VSA",
  2: "VSE",
}

export default function OrganizersPage() {
  const t = useTranslations("about.organizers")

  const main = t.raw("main") as Array<{ type: string; name: string; description: string }>
  const supporters = t.raw("supporters_list") as string[]
  const international = t.raw("international_partners") as Array<{ name: string; country: string }>

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

      {/* Organizers */}
      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 flex items-center gap-3">
              <Building2 className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">{t("section.title")}</h2>
            </div>

            <div className="mb-16 grid gap-6 md:grid-cols-3">
              {main.map((org, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-card p-6 text-center"
                >
                  <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                    {logos[i]}
                  </div>
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-primary">
                    {org.type}
                  </span>
                  <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                    {org.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{org.description}</p>
                </div>
              ))}
            </div>

            {/* Supporters */}
            <div className="mb-16">
              <div className="mb-8 flex items-center gap-3">
                <Users className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">{t("supporters.title")}</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {supporters.map((supporter, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-border bg-card px-4 py-3 text-center text-sm font-medium text-card-foreground"
                  >
                    {supporter}
                  </div>
                ))}
              </div>
            </div>

            {/* International Partners */}
            <div>
              <div className="mb-8 flex items-center gap-3">
                <Globe className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">{t("international.title")}</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {international.map((partner, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-border bg-card p-4"
                  >
                    <h3 className="font-semibold text-card-foreground">{partner.name}</h3>
                    <p className="text-sm text-muted-foreground">{partner.country}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
