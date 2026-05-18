"use client"

import Image from "next/image"
import Link from "next/link"
import { Building2 } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import { useEffect, useState } from "react"
import { resolveApiAssetUrl } from "@/lib/api-asset"
import { cn } from "@/lib/utils"
import { Exhibitor } from "@/types/sponsor"
import { groupSponsorsByTier } from "@/lib/sponsor.helpers"
import { sponsorService } from "@/services/sponsor.service"

export function Sponsors() {
  const t = useTranslations("home")
  const locale = useLocale()
  const [tiers, setTiers] = useState<ReturnType<typeof groupSponsorsByTier>>([])

  useEffect(() => {
    sponsorService.getPublicExhibitors()
      .then(groupSponsorsByTier)
      .then(setTiers)
      .catch(console.error)
  }, [])

  if (tiers.length === 0) return null

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-5xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            {t("sponsors.section_badge")}
          </span>
          <h2 className="homepage-section-title mx-auto mb-6 max-w-5xl text-balance text-[#2c54ce]">
            {t("sponsors.title")}
          </h2>
          <p className="mx-auto max-w-3xl text-pretty text-lg text-muted-foreground">
            {t("sponsors.description")}
          </p>
        </div>

        {tiers.map((tier) => (
          <div key={tier.key} className="mb-12 last:mb-0">
            <h3 className="mb-6 text-center text-lg font-semibold uppercase tracking-wider text-muted-foreground">
              {tier.label}
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {tier.sponsors.map((exhibitor) => (
                <SponsorCard
                  key={exhibitor.id}
                  exhibitor={exhibitor}
                  tier={tier.key}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}


export function SponsorCard({ exhibitor, tier }: { exhibitor: Exhibitor; tier: string }) {
  const imageUrl = resolveApiAssetUrl(exhibitor.img)

  const sizeClasses = {
    diamond: "w-full max-w-lg min-h-24",
    vàng: "w-full max-w-md min-h-22",
    bạc: "w-full max-w-sm min-h-20",
  }

  return (
    <Link
      href="/sponsor/exhibitor"
      className={cn(
        "flex items-center gap-4 rounded-xl border border-border",
        "bg-card px-4 py-3 transition-all duration-200",
        "hover:border-primary/50 hover:shadow-lg hover:-translate-y-1",
        sizeClasses[tier as keyof typeof sizeClasses] || "w-full max-w-sm min-h-20"
      )}
    >
      {imageUrl ? (
        <div className="flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden sm:h-16 sm:w-24">
          <Image
            src={imageUrl}
            alt={exhibitor.name}
            width={96}
            height={96}
            className="h-full w-full object-contain"
          />
        </div>
      ) : (
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-muted sm:h-16 sm:w-16">
          <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary">
            <Building2 className="h-6 w-6" />
          </div>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <span className="line-clamp-2 text-left text-sm font-semibold text-card-foreground sm:text-base">
          {exhibitor.name}
        </span>
      </div>
    </Link>
  )
}
