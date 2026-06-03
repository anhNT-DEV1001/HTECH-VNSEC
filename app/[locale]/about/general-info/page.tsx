"use client"

import { useTranslations, useLocale } from "next-intl"
import { useState, useEffect, useCallback } from "react"
import { CheckCircle, Plane, FileText, Globe, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AboutPage() {
  const t = useTranslations("about.general_info")
  const [activeSlide, setActiveSlide] = useState(0)

  const objectives = t.raw("objectives") as Array<{ title: string; description: string }>

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % objectives.length)
  }, [objectives.length])

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + objectives.length) % objectives.length)
  }, [objectives.length])

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [nextSlide])

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

            {/* Objectives Slideshow */}
            <div className="mb-12">
              <h2 className="mb-6 text-2xl font-bold text-foreground sm:text-3xl">
                {t("section_objectives.title")}
              </h2>

              {/* Slideshow Container */}
              <div className="relative">
                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-4 rounded-full bg-background p-2 shadow-lg ring-1 ring-border transition-all hover:scale-110 hover:shadow-xl lg:-translate-x-12"
                >
                  <ChevronLeft className="h-5 w-5 text-foreground" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-4 rounded-full bg-background p-2 shadow-lg ring-1 ring-border transition-all hover:scale-110 hover:shadow-xl lg:translate-x-12"
                >
                  <ChevronRight className="h-5 w-5 text-foreground" />
                </button>

                {/* Slides */}
                <div className="relative overflow-hidden rounded-2xl">
                  <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                  >
                    {objectives.map((objective, index) => (
                      <div
                        key={index}
                        className="group relative flex w-full flex-shrink-0 flex-col items-center justify-center rounded-2xl border border-border/50 bg-gradient-to-br from-card via-card to-primary/5 px-8 py-12 text-center transition-shadow duration-500 hover:shadow-2xl"
                      >
                        {/* Enhanced decorative blur circles */}
                        <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                        <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-gradient-to-tl from-primary/10 to-transparent blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                        {/* Subtle border glow */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                        <div className="relative z-10 flex flex-col items-center">
                          {/* Enhanced icon with multiple shadow layers */}
                          <div className="mb-6 relative">
                            <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl" />
                            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 shadow-xl ring-4 ring-primary/10 backdrop-blur-sm">
                              <CheckCircle className="h-10 w-10 text-primary drop-shadow-lg" />
                            </div>
                          </div>
                          <h3 className="mb-4 text-xl font-bold text-card-foreground sm:text-2xl">
                            {objective.title}
                          </h3>
                          <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground">
                            {objective.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dots Navigation */}
                <div className="mt-6 flex justify-center gap-2">
                  {objectives.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveSlide(index)}
                      className={cn(
                        "h-2 rounded-full transition-all duration-300",
                        activeSlide === index
                          ? "w-8 bg-primary"
                          : "w-2 bg-primary/30 hover:bg-primary/50"
                      )}
                    />
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="mt-4 h-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${((activeSlide + 1) / objectives.length) * 100}%` }}
                  />
                </div>

                {/* Slide Counter */}
                <div className="mt-3 text-center text-sm text-muted-foreground">
                  {activeSlide + 1} / {objectives.length}
                </div>
              </div>
            </div>

            {/* Notes Section */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-foreground sm:text-3xl">
                {t("section_notes.title")}
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Plane className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-1 text-base font-semibold text-card-foreground">
                      {t("notes.0.title")}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {t("notes.0.content")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-1 text-base font-semibold text-card-foreground">
                      {t("notes.1.title")}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {t("notes.1.content")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-1 text-base font-semibold text-card-foreground">
                      {t("notes.2.title")}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {t("notes.2.content")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
