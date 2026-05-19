"use client"

import { useTranslations, useLocale } from "next-intl"
import { Shield, Target, Eye, Handshake, CheckCircle, FileText, Plane, Globe } from "lucide-react"

const icons = [Shield, Target, Eye, Handshake]
const noteIcons = [Plane, FileText, Globe]

export default function AboutPage() {
  const t = useTranslations("about.general_info")

  const objectives = t.raw("objectives") as Array<{ title: string; description: string }>
  const highlights = t.raw("highlights") as Array<{ title: string; description: string }>
  const notes = t.raw("notes") as Array<{ title: string; content: string }>

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

            {/* Objectives */}
            <div className="mb-12">
              <h2 className="mb-6 text-2xl font-bold text-foreground sm:text-3xl">
                {t("section_objectives.title")}
              </h2>
              <div className="space-y-4">
                {objectives.map((objective, index) => (
                  <div key={index} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                    <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <h3 className="font-semibold text-card-foreground">{objective.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{objective.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights Grid */}
            {/* <div className="mb-12">
              <h2 className="mb-6 text-2xl font-bold text-foreground sm:text-3xl">
                {t("section_highlights.title")}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {highlights.map((highlight, index) => {
                  const Icon = icons[index]
                  return (
                    <div
                      key={index}
                      className="rounded-xl border border-border bg-card p-6"
                    >
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                        {highlight.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {highlight.description}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div> */}

            {/* Notes Section */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-foreground sm:text-3xl">
                {t("section_notes.title")}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {notes.map((note, index) => {
                  const NoteIcon = noteIcons[index]
                  return (
                    <div
                      key={index}
                      className="flex h-full flex-col rounded-xl border border-border bg-card p-6"
                    >
                      <div className="mb-3 flex flex-col items-center gap-3 text-center">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <NoteIcon className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg font-semibold text-card-foreground">
                          {note.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground">
                        {note.content}
                      </p>
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
