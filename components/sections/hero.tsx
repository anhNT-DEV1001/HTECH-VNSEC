"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, ArrowRight } from "lucide-react"

const EVENT_START = new Date("2026-10-06T00:00:00+07:00")
const EVENT_END = new Date("2026-10-08T23:59:59+07:00")

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const startTime = performance.now()

      const animate = (now: number) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - (1 - progress) * (1 - progress)
        setCount(Math.floor(eased * target))
        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setCount(target)
        }
      }
      requestAnimationFrame(animate)
    }, 300)

    return () => clearTimeout(timeout)
  }, [target, duration])

  return count
}

function formatNumber(n: number): string {
  return n.toLocaleString("vi-VN")
}

function StatItem({ target, label }: { target: number; label: string }) {
  const count = useCountUp(target)
  return (
    <div className="text-center">
      <div className="text-5xl font-bold text-primary">{formatNumber(count)}+</div>
      <div className="text-xl text-muted-foreground">{label}</div>
    </div>
  )
}

type CountdownStatus =
  | { type: "countdown"; days: number }
  | { type: "ongoing" }
  | { type: "ended" }

function getCountdownStatus(): CountdownStatus {
  const now = new Date()

  if (now > EVENT_END) {
    return { type: "ended" }
  }

  if (now >= EVENT_START && now <= EVENT_END) {
    return { type: "ongoing" }
  }

  const diffMs = EVENT_START.getTime() - now.getTime()
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24))
  return { type: "countdown", days }
}

export function Hero() {
  const t = useTranslations("home")
  const locale = useLocale()
  const [status, setStatus] = useState<CountdownStatus>(getCountdownStatus)

  useEffect(() => {
    setStatus(getCountdownStatus())

    const interval = setInterval(() => {
      setStatus(getCountdownStatus())
    }, 60_000)

    return () => clearInterval(interval)
  }, [])

  const stats = t.raw("hero.stats") as Record<string, string>

  const renderCountdown = () => {
    switch (status.type) {
      case "countdown":
        return (
          <>
            <div className="text-7xl font-bold text-primary">{status.days}</div>
            <div className="text-xl font-medium tracking-widest text-foreground">
              {t("hero.countdown.days")}
            </div>
          </>
        )
      case "ongoing":
        return (
          <>
            <div className="text-lg font-bold leading-tight text-primary">{t("hero.countdown.onGoing")}</div>
            <div className="mt-1 h-1 w-8 mx-auto animate-pulse rounded-full bg-primary/60" />
          </>
        )
      case "ended":
        return (
          <>
            <div className="text-lg font-bold leading-tight text-muted-foreground">{t("hero.countdown.ended")}</div>
          </>
        )
    }
  }

  return (
    <section className="bg-warm-surface-strong relative min-h-[90vh] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(234,88,12,0.18),transparent_42%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_22%,rgba(251,146,60,0.12),transparent_36%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_78%,rgba(234,88,12,0.09),transparent_42%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>

      {/* Grid Pattern */}
      <div className="hero-grid-light absolute inset-0" />

      <div className="container relative mx-auto px-4 py-20 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Content */}
          <div className="flex flex-col justify-center">
            <div className="animate-fade-in mb-6">
              <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-primary" />
                {t("hero.badge")}
              </span>
            </div>

            <h1 className="animate-fade-in mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl" style={{ animationDelay: "0.1s" }}>
              {t("hero.title")}
            </h1>

            <p className="animate-fade-in mb-8 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground" style={{ animationDelay: "0.2s" }}>
              {t("hero.description")}
            </p>

            {/* Event Info */}
            <div className="animate-fade-in mb-8 flex flex-col gap-4 sm:flex-row" style={{ animationDelay: "0.3s" }}>
              <div className="bg-warm-card flex items-center gap-3 rounded-lg border border-primary/10 px-4 py-3 shadow-[0_14px_40px_rgba(15,23,42,0.04)] backdrop-blur-sm">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">{t("hero.eventTime.label")}</p>
                  <p className="font-semibold text-foreground">{t("hero.eventTime.value")}</p>
                </div>
              </div>
              <div className="bg-warm-card flex items-center gap-3 rounded-lg border border-primary/10 px-4 py-3 shadow-[0_14px_40px_rgba(15,23,42,0.04)] backdrop-blur-sm">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">{t("hero.eventLocation.label")}</p>
                  <p className="font-semibold text-foreground">{t("hero.eventLocation.value")}</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="animate-fade-in flex flex-col gap-4 sm:flex-row" style={{ animationDelay: "0.4s" }}>
              <Button asChild size="lg" className="group animate-pulse-glow bg-primary hover:bg-primary/90">
                <Link href={`/${locale}/register`}>
                  {t("hero.cta.register")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary/15 bg-white/50 text-foreground hover:bg-white/80">
                <Link href={`/${locale}/about/general-info`}>{t("hero.cta.learn")}</Link>
              </Button>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative hidden items-center justify-center lg:flex">
            <div className="relative">
              <div className="relative h-[500px] w-[500px]">
                <div className="absolute inset-0 animate-spin rounded-full border border-primary/18" style={{ animationDuration: "30s" }} />
                <div className="absolute inset-8 animate-spin rounded-full border-2 border-primary/24" style={{ animationDuration: "20s", animationDirection: "reverse" }} />
                <div className="absolute inset-16 animate-spin rounded-full border border-dashed border-primary/30" style={{ animationDuration: "15s" }} />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex h-48 w-48 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 via-primary/8 to-white/40 shadow-[0_30px_80px_rgba(234,88,12,0.12)] backdrop-blur-sm">
                    <div className="bg-warm-card-strong absolute inset-2 rounded-full border border-white/70" />
                    <div className="relative z-10 text-center">
                      {renderCountdown()}
                    </div>
                  </div>
                </div>

                <div className="absolute left-0 top-1/4 h-3 w-3 rounded-full bg-primary animate-pulse" />
                <div className="absolute right-8 top-1/3 h-2 w-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: "0.5s" }} />
                <div className="absolute bottom-1/4 left-8 h-2 w-2 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: "1s" }} />
                <div className="absolute bottom-1/3 right-0 h-3 w-3 rounded-full bg-accent/60 animate-pulse" style={{ animationDelay: "1.5s" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-primary/10 bg-[rgba(255,250,245,0.8)] backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatItem target={200} label={stats.organizers} />
            <StatItem target={50} label={stats.countries} />
            <StatItem target={15000} label={stats.visitors} />
            <StatItem target={300} label={stats.booths} />
          </div>
        </div>
      </div>
    </section>
  )
}
