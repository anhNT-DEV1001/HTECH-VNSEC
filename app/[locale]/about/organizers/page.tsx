"use client"

import { useTranslations } from "next-intl"
import { Building2, Shield, Users, Globe } from "lucide-react"

export default function OrganizersPage() {
  const t = useTranslations("about.organizers")

  const directiveList = t.raw("directive_list") as string[]
  const implementationList = t.raw("implementation_list") as string[]
  const coOrganizerList = t.raw("co_organizer_list") as string[]
  const accompanyingLeftList = t.raw("accompanying_left_list") as string[]
  const accompanyingRightList = t.raw("accompanying_right_list") as string[]
  const organizerMain = t("organizer_main")

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
          </div>
        </div>
      </section>

      {/* Organizational Structure */}
      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold text-foreground mb-16 text-center">
            {t("page_description")}
          </h2>
          {/* Title */}
          {/* <div className="mb-12 flex items-center justify-center gap-3">
            <Building2 className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">{t("section.title")}</h2>
          </div> */}

          {/* Tree Structure */}
          <div className="flex flex-col items-center gap-8">
            {/* Level 1: Directing Authorities */}
            <div className="w-full max-w-xl text-center">
              <div className="mb-4 flex items-center justify-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-primary">{t("directive.title")}</h3>
              </div>
              <div className="space-y-2 rounded-xl border-2 border-primary/40 bg-primary/5 p-4">
                {directiveList.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-lg bg-background/80 px-4 py-2 text-center"
                  >
                    <span className="font-semibold text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Level 2: Implementation Directors */}
            <div className="w-full max-w-xl text-center">
              <div className="mb-4 flex items-center justify-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-primary">{t("implementation.title")}</h3>
              </div>
              <div className="space-y-2 rounded-xl border-2 border-primary/40 bg-primary/5 p-4">
                {implementationList.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-lg bg-background/80 px-4 py-2 text-center"
                  >
                    <span className="font-semibold text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Level 3: Organizer & Co-Organizers */}
            <div className="grid w-full gap-8 lg:grid-cols-2">
              {/* Left: Main Organizer */}
              <div className="text-center">
                <div className="mb-4 flex items-center justify-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-primary">{t("organizer.title")}</h3>
                </div>
                <div className="rounded-xl border-2 border-primary/40 bg-primary/5 p-6">
                  <span className="text-2xl font-bold text-black">{organizerMain}</span>
                </div>
              </div>

              {/* Right: Co-Organizers */}
              <div className="text-center">
                <div className="mb-4 flex items-center justify-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-primary">{t("co_organizer.title")}</h3>
                </div>
                <div className="space-y-2 rounded-xl border-2 border-primary/40 bg-primary/5 p-4">
                  {coOrganizerList.map((item, i) => (
                    <div
                      key={i}
                      className="rounded-lg bg-background/80 px-4 py-2 text-center"
                    >
                      <span className="font-medium text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Level 4: Accompanying Units */}
            <div className="grid w-full gap-8 lg:grid-cols-2">
              {/* Left: Accompanying Units */}
              <div className="text-center">
                <div className="mb-4 flex items-center justify-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-primary">{t("accompanying_left.title")}</h3>
                </div>
                <div className="space-y-2 rounded-xl border-2 border-primary/40 bg-primary/5 p-4">
                  {accompanyingLeftList.map((item, i) => (
                    <div
                      key={i}
                      className="rounded-lg bg-background/80 px-4 py-2 text-center text-sm"
                    >
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Accompanying Units */}
              <div className="text-center">
                <div className="mb-4 flex items-center justify-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-primary">{t("accompanying_right.title")}</h3>
                </div>
                <div className="space-y-2 rounded-xl border-2 border-primary/40 bg-primary/5 p-4">
                  {accompanyingRightList.map((item, i) => (
                    <div
                      key={i}
                      className="rounded-lg bg-background/80 px-4 py-2 text-center text-sm"
                    >
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
