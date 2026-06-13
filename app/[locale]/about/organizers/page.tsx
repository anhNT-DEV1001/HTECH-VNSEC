"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { Building2, Shield, Users, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

type OrganizerItem = {
  name: string
  logo: string | null
}

type OrganizerMain = {
  name: string
  logo: string | null
}

const compactLogoClasses: Record<string, string> = {
  "/truyen_hinh_antv.png": "max-w-[78%]",
  "/bao_dau_tu.svg": "max-w-[80%]",
  "/bo_cong_an.png": "max-w-[72%]",
  "/bo_kh_cn.png": "max-w-[72%]",
  "/cuc_cong_nghiep_an_ninh.png": "max-w-[76%]",
  "/hoc_vien_ky_thuat_cong_nghe_an_ninh.png": "max-w-[78%]",
  "/htech.png": "max-w-[72%]",
  "/psst.JPG": "max-w-[72%]",
  "/bach_dang.JPG": "max-w-[72%]",
  "/apsa_vietnam.jpg": "max-w-[74%]",
  "/uav.png": "max-w-[72%]",
  "/via.png": "max-w-[68%]",
  "/hiep_hoi_doanh_nghiep_tre_vn.png": "max-w-[78%]",
  "/sunny_vn.png": "max-w-[72%]",
}

function OrganizerCard({ item }: { item: OrganizerItem }) {
  const hasLogo = Boolean(item.logo)

  return (
    <div className="group relative h-32 overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_14px_32px_rgba(15,23,42,0.08)] md:h-40 lg:h-44">
      <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div
        className={cn(
          "flex h-full w-full items-center justify-center p-4 transition-all duration-300",
          hasLogo && "group-hover:opacity-20"
        )}
      >
        {hasLogo && item.logo ? (
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex h-16 w-full items-center justify-center md:h-20 lg:h-24">
              <div
                className={cn(
                  "relative h-full w-full max-w-[180px]",
                  compactLogoClasses[item.logo]
                )}
              >
                <Image
                  src={item.logo}
                  alt={item.name}
                  fill
                  sizes="180px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        ) : (
          <span className="text-center text-sm font-semibold leading-tight text-foreground">
            {item.name}
          </span>
        )}
      </div>

      {hasLogo && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/92 p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className="text-center text-xs font-semibold leading-tight text-foreground">
            {item.name}
          </span>
        </div>
      )}
    </div>
  )
}

function OrganizerCardSingle({ item }: { item: OrganizerMain }) {
  const hasLogo = Boolean(item.logo)

  return (
    <div className="group relative mx-auto h-32 w-full max-w-xs overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_14px_32px_rgba(15,23,42,0.08)] md:h-40 lg:h-44">
      <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div
        className={cn(
          "flex h-full w-full items-center justify-center p-4 transition-all duration-300",
          hasLogo && "group-hover:opacity-20"
        )}
      >
        {hasLogo && item.logo ? (
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex h-[4.5rem] w-full items-center justify-center md:h-[5.5rem] lg:h-24">
              <div
                className={cn(
                  "relative h-full w-full max-w-[190px]",
                  compactLogoClasses[item.logo]
                )}
              >
                <Image
                  src={item.logo}
                  alt={item.name}
                  fill
                  sizes="190px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        ) : (
          <span className="text-center text-xl font-bold text-foreground">
            {item.name}
          </span>
        )}
      </div>

      {hasLogo && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/92 p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className="text-center text-sm font-semibold leading-tight text-foreground">
            {item.name}
          </span>
        </div>
      )}
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
            <h1 className="mb-6 text-balance text-4xl font-bold uppercase tracking-tight text-secondary-foreground sm:text-5xl">
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
