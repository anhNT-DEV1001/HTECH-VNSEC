"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { Building2, Shield, Users, Globe } from "lucide-react"

type OrganizerItem = {
  name: string
  logo: string | null
}

type OrganizerMain = {
  name: string
  logo: string | null
}

function OrganizerCard({ item }: { item: OrganizerItem }) {
  return (
    <div className="group relative h-24 overflow-hidden rounded-xl border border-[#EF5941]/15 bg-white shadow-sm transition-all duration-300 hover:shadow-[0_10px_30px_rgba(239,89,65,0.10)] md:h-28 lg:h-32">
      {/* Logo Layer */}
      <div className="flex h-full w-full items-center justify-center p-4 transition-opacity duration-300 group-hover:opacity-30">
        {item.logo ? (
          <Image
            src={item.logo}
            alt={item.name}
            width={140}
            height={60}
            className="max-h-16 w-auto object-contain"
          />
        ) : (
          <span className="text-center text-sm font-semibold text-foreground leading-tight">
            {item.name}
          </span>
        )}
      </div>

      {/* Text Layer - appears on hover */}
      <div className="absolute inset-0 flex items-center justify-center p-2 opacity-0 transition-all duration-300 group-hover:opacity-100 delay-100">
        <span className="text-center text-xs font-semibold text-foreground leading-tight">
          {item.name}
        </span>
      </div>
    </div>
  )
}

function OrganizerCardSingle({ item }: { item: OrganizerMain }) {
  return (
    <div className="group relative mx-auto h-24 overflow-hidden rounded-xl border border-[#EF5941]/15 bg-white shadow-sm transition-all duration-300 hover:shadow-[0_10px_30px_rgba(239,89,65,0.10)] md:h-28 lg:h-32 w-full max-w-xs">
      {/* Logo Layer */}
      <div className="flex h-full w-full items-center justify-center p-4 transition-opacity duration-300 group-hover:opacity-50">
        {item.logo ? (
          <Image
            src={item.logo}
            alt={item.name}
            width={160}
            height={70}
            className="max-h-20 w-auto object-contain"
          />
        ) : (
          <span className="text-center text-xl font-bold text-foreground">
            {item.name}
          </span>
        )}
      </div>

      {/* Text Layer - appears on hover */}
      <div className="absolute inset-0 flex items-center justify-center bg-white/95 p-2 opacity-0 transition-all duration-300 group-hover:opacity-100 delay-300">
        <span className="text-center text-sm font-semibold text-foreground leading-tight">
          {item.name}
        </span>
      </div>
    </div>
  )
}

export default function OrganizersPage() {
  const t = useTranslations("about.organizers")

  const directiveList = t.raw("directive_list") as OrganizerItem[]
  const implementationList = t.raw("implementation_list") as OrganizerItem[]
  const coOrganizerList = t.raw("co_organizer_list") as OrganizerItem[]
  const accompanyingLeftList = t.raw("accompanying_left_list") as OrganizerItem[]
  const accompanyingRightList = t.raw("accompanying_right_list") as OrganizerItem[]
  const organizerMain = t.raw("organizer_main") as OrganizerMain

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
            <p className="mt-6 text-center text-sm leading-8 text-secondary-foreground/78">
              {t("page_description")}
            </p>
          </div>
        </div>
      </section>

      {/* Organizational Structure */}
      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          {/* Tree Structure */}
          <div className="flex flex-col items-center gap-8">
            {/* Level 1: Directing Authorities - Horizontal Layout */}
            <div className="w-full text-center">
              <div className="mb-4 flex items-center justify-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-primary">{t("directive.title")}</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
                {directiveList.map((item, i) => (
                  <OrganizerCard key={i} item={item} />
                ))}
              </div>
            </div>

            {/* Level 2: Implementation Directors - Horizontal Layout */}
            <div className="w-full text-center">
              <div className="mb-4 flex items-center justify-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-primary">{t("implementation.title")}</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
                {implementationList.map((item, i) => (
                  <OrganizerCard key={i} item={item} />
                ))}
              </div>
            </div>

            {/* Level 3: Organizer & Co-Organizers */}
            <div className="grid w-full gap-8 lg:grid-cols-2">
              {/* Left: Main Organizer - Centered */}
              <div className="text-center">
                <div className="mb-4 flex items-center justify-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-primary">{t("organizer.title")}</h3>
                </div>
                <OrganizerCardSingle item={organizerMain} />
              </div>

              {/* Right: Co-Organizers - Grid 2x2 */}
              <div className="text-center">
                <div className="mb-4 flex items-center justify-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-primary">{t("co_organizer.title")}</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {coOrganizerList.map((item, i) => (
                    <OrganizerCard key={i} item={item} />
                  ))}
                  {/* Empty slot to maintain grid layout */}
                  {coOrganizerList.length === 3 && (
                    <div className="hidden md:block" />
                  )}
                </div>
              </div>
            </div>

            {/* Level 4: Accompanying Units - Grid 2x2 for each side */}
            <div className="grid w-full gap-8 lg:grid-cols-2">
              {/* Left: Accompanying Units - Grid 2x2 */}
              <div className="text-center">
                <div className="mb-4 flex items-center justify-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-primary">{t("accompanying_left.title")}</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {accompanyingLeftList.map((item, i) => (
                    <OrganizerCard key={i} item={item} />
                  ))}
                </div>
              </div>

              {/* Right: Accompanying Units - Grid 2x2 */}
              <div className="text-center">
                <div className="mb-4 flex items-center justify-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-primary">{t("accompanying_right.title")}</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {accompanyingRightList.map((item, i) => (
                    <OrganizerCard key={i} item={item} />
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
