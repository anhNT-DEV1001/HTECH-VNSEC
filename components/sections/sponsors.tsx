import Image from "next/image"
import { resolveApiAssetUrl } from "@/lib/api-asset"
import { cn } from "@/lib/utils"
import { Exhibitor } from "@/types/sponsor"
import { groupSponsorsByTier } from "@/lib/sponsor.helpers"
import { sponsorService } from "@/services/sponsor.service"

async function getExhibitors(): Promise<Exhibitor[]> {
  return sponsorService.getPublicExhibitors()
}

export async function Sponsors() {
  const exhibitors = await getExhibitors()
  const tiers = groupSponsorsByTier(exhibitors)

  if (tiers.length === 0) return null

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            Nhà tài trợ
          </span>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Đơn vị đồng hành
          </h2>
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

  // Size theo hạng
  const sizeClasses = {
    diamond: "w-52 h-36",
    vàng: "w-40 h-28",
    bạc: "w-32 h-24",
  }

  return (
    <a
      href={exhibitor.web?.url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-center justify-center border border-border rounded-xl",
        "bg-card p-4 transition-all duration-200",
        "hover:border-primary/50 hover:shadow-lg hover:-translate-y-1",
        sizeClasses[tier as keyof typeof sizeClasses] || "w-40 h-28"
      )}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={exhibitor.name}
          width={180}
          height={100}
          className="object-contain w-full h-full"
        />
      ) : (
        <span className="text-sm text-muted-foreground font-medium">
          {exhibitor.name}
        </span>
      )}
    </a>
  )
}
