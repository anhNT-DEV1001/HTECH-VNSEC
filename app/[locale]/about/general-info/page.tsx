"use client"

import { useTranslations } from "next-intl"
import { useState, useCallback } from "react"
import { CheckCircle, Plane, FileText, Globe, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AboutPage() {
  const t = useTranslations("about.general_info")
  const [activeSlide, setActiveSlide] = useState(0)

  const objectives = t.raw("objectives") as Array<{ title: string; description: string }>
  const notes = [
    {
      icon: Plane,
      title: t("notes.0.title"),
      content: t("notes.0.content"),
    },
    {
      icon: FileText,
      title: t("notes.1.title"),
      content: t("notes.1.content"),
    },
    {
      icon: Globe,
      title: t("notes.2.title"),
      content: t("notes.2.content"),
    },
  ]

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % objectives.length)
  }, [objectives.length])

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + objectives.length) % objectives.length)
  }, [objectives.length])

  return (
    <>
      {/* Hero Section */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
              {t("page_badge")}
            </span>
            <h1 className="mb-6 text-balance text-4xl font-bold uppercase tracking-tight text-secondary-foreground sm:text-5xl lg:text-6xl">
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
            <div className="mb-10">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                  {t("section_objectives.title")}
                </h2>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-muted-foreground">
                    {activeSlide + 1} / {objectives.length}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Previous objective"
                      onClick={prevSlide}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-all hover:border-primary/40 hover:text-primary hover:shadow-md"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next objective"
                      onClick={nextSlide}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-all hover:border-primary/40 hover:text-primary hover:shadow-md"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Slideshow Container */}
              <div className="relative">
                {/* Slides */}
                <div className="relative overflow-hidden rounded-[1.75rem] sm:rounded-[2rem]">
                  <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                  >
                    {objectives.map((objective, index) => (
                      <div
                        key={index}
                        className="group relative flex w-full flex-shrink-0 overflow-hidden rounded-[1.75rem] border border-border/60 bg-card px-5 py-6 shadow-sm transition-shadow duration-500 hover:shadow-lg sm:min-h-[210px] sm:rounded-[2rem] sm:px-8 sm:py-7 lg:px-10"
                      >
                        <div className="absolute -right-20 -top-24 h-52 w-52 rounded-full bg-primary/10 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
                        {/* Subtle border glow */}
                        <div className="absolute inset-0 rounded-[1.75rem] bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:rounded-[2rem]" />

                        <div className="relative z-10 flex w-full flex-col gap-4 text-left sm:flex-row sm:items-center sm:gap-6 lg:gap-7">
                          <div className="relative shrink-0">
                            <div className="absolute inset-0 rounded-full bg-primary/15 blur-lg" />
                            <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/15 sm:h-16 sm:w-16">
                              <CheckCircle className="h-6 w-6 sm:h-7 sm:w-7" />
                            </div>
                          </div>
                          <div className="min-w-0">
                            <h3 className="mb-2 text-base font-bold leading-[1.35] text-card-foreground sm:text-lg lg:text-[1.2rem]">
                              {objective.title}
                            </h3>
                            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-[15px] lg:text-base">
                              {objective.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dots Navigation */}
                <div className="mt-4 flex items-center justify-center gap-2">
                  {objectives.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActiveSlide(index)}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        activeSlide === index
                          ? "w-7 bg-primary"
                          : "w-1.5 bg-primary/25 hover:bg-primary/50"
                      )}
                    />
                  ))}
                </div>

                {/* Progress Bar */}
                {/* <div className="mt-3 h-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${((activeSlide + 1) / objectives.length) * 100}%` }}
                  />
                </div> */}
              </div>
            </div>

            {/* Notes Section */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-foreground sm:text-3xl">
                {t("section_notes.title")}
              </h2>
              <div className="space-y-4">
                {notes.map((note, index) => {
                  const Icon = note.icon
                  const isEven = index % 2 === 0

                  return (
                    <div
                      key={note.title}
                      className={cn(
                        "flex items-center gap-4 rounded-xl border border-border bg-card p-5",
                        isEven ? "flex-row" : "flex-row-reverse"
                      )}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className={cn("min-w-0 flex-1", isEven ? "text-left" : "text-right")}>
                        <h3
                          className="mb-1 text-base font-semibold text-card-foreground"
                        >
                          {note.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {note.content}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
