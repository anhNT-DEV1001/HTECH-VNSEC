"use client"

import type { CSSProperties, PointerEvent } from "react"
import { Award, Globe, Shield, Users, type LucideIcon } from "lucide-react"

type FeatureIcon = "shield" | "globe" | "users" | "award"

type AboutFeatureCardProps = {
  title: string
  description: string
  icon: FeatureIcon
}

const icons: Record<FeatureIcon, LucideIcon> = {
  shield: Shield,
  globe: Globe,
  users: Users,
  award: Award,
}

const glowStyle: CSSProperties = {
  background:
    "radial-gradient(260px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(239, 68, 68, 0.16), transparent 72%)",
}

export function AboutFeatureCard({ title, description, icon }: AboutFeatureCardProps) {
  const Icon = icons[icon]

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()

    event.currentTarget.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`)
  }

  return (
    <div className="group relative h-full" onPointerMove={handlePointerMove}>
      <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/40 via-primary/20 to-accent/30 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex h-full min-h-[255px] flex-col overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/5">
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={glowStyle}
        />
        <div className="relative z-10">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-card-foreground">{title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  )
}
