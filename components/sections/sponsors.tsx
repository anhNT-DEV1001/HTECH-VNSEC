import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const sponsors = {
  diamond: [
    { name: "SecurityTech", logo: "ST" },
    { name: "GlobalSafe", logo: "GS" },
  ],
  gold: [
    { name: "SafeGuard", logo: "SG" },
    { name: "ProtectPro", logo: "PP" },
    { name: "SecureNet", logo: "SN" },
    { name: "DefenseX", logo: "DX" },
  ],
  silver: [
    { name: "WatchDog", logo: "WD" },
    { name: "AlertSys", logo: "AS" },
    { name: "CamPro", logo: "CP" },
    { name: "LockTech", logo: "LT" },
    { name: "FireSafe", logo: "FS" },
    { name: "AccessGo", logo: "AG" },
  ],
}

export function Sponsors() {
  return (
    <section className="bg-muted/30 py-20 lg:py-28">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            Đối tác & Nhà tài trợ
          </span>
          <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Được Hỗ trợ bởi Các Thương hiệu Hàng đầu
          </h2>
          <p className="text-pretty text-muted-foreground">
            VN Security 2026 tự hào có sự đồng hành của các doanh nghiệp uy tín trong ngành công nghiệp an ninh toàn cầu.
          </p>
        </div>

        {/* Diamond Sponsors */}
        <div className="mb-12">
          <h3 className="mb-6 text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Nhà tài trợ Kim cương
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {sponsors.diamond.map((sponsor) => (
              <div
                key={sponsor.name}
                className="flex h-28 w-56 items-center justify-center rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary text-xl font-bold text-primary-foreground">
                    {sponsor.logo}
                  </div>
                  <span className="text-lg font-semibold text-card-foreground">
                    {sponsor.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gold Sponsors */}
        <div className="mb-12">
          <h3 className="mb-6 text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Nhà tài trợ Vàng
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {sponsors.gold.map((sponsor) => (
              <div
                key={sponsor.name}
                className="flex h-20 w-44 items-center justify-center rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/20 text-sm font-bold text-accent-foreground">
                    {sponsor.logo}
                  </div>
                  <span className="text-sm font-medium text-card-foreground">
                    {sponsor.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Silver Sponsors */}
        <div className="mb-12">
          <h3 className="mb-6 text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Nhà tài trợ Bạc
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {sponsors.silver.map((sponsor) => (
              <div
                key={sponsor.name}
                className="flex h-16 w-36 items-center justify-center rounded-lg border border-border bg-card p-3 transition-all hover:border-primary/30"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-muted text-xs font-semibold text-muted-foreground">
                    {sponsor.logo}
                  </div>
                  <span className="text-xs font-medium text-card-foreground">
                    {sponsor.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="mb-4 text-muted-foreground">
            Quan tâm trở thành nhà tài trợ?
          </p>
          <Button asChild variant="outline" className="group">
            <Link href="/sponsor/register">
              Đăng ký tài trợ
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
