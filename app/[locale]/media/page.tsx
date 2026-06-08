"use client"

import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"
import { Calendar, ArrowRight, Tag } from "lucide-react"

export default function NewsPage() {
  const t = useTranslations("media")
  const locale = useLocale()

  const categories = t.raw("categories") as string[]
  const newsItems = t.raw("news") as Array<{
    title: string
    excerpt: string
    date?: string
    category?: string
  }>

  const featuredNews = newsItems.slice(0, 2)
  const regularNews = newsItems.slice(2)

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
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
              {t("page_description")}
            </p>
          </div>
        </div>
      </section>

      {/* News Content */}
      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            {/* Category Filter */}
            <div className="mb-12 flex flex-wrap gap-2">
              {categories.map((category, i) => (
                <button
                  key={i}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    i === 0
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Featured News */}
            <div className="mb-12 grid gap-6 lg:grid-cols-2">
              {featuredNews.map((item, i) => (
                <article
                  key={i}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-xl"
                >
                  <div className="relative aspect-video bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                      <span className="text-6xl font-bold text-primary/30">VN</span>
                    </div>
                    <div className="absolute left-4 top-4">
                      <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                        {t("featured_badge")}
                      </span>
                    </div>
                  </div>
                    <div className="p-6">
                      <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
                        {item.date ? (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {item.date}
                          </span>
                        ) : null}
                        {item.category ? (
                          <span className="flex items-center gap-1">
                            <Tag className="h-4 w-4" />
                            {item.category}
                          </span>
                        ) : null}
                      </div>
                      <h2 className="mb-3 text-xl font-bold text-card-foreground transition-colors group-hover:text-primary">
                        <Link href={`/${locale}/media/${i + 1}`}>{item.title}</Link>
                      </h2>
                    <p className="mb-4 line-clamp-2 text-muted-foreground">
                      {item.excerpt}
                    </p>
                    <Link
                      href={`/${locale}/media/${i + 1}`}
                      className="inline-flex items-center font-medium text-primary hover:underline"
                    >
                      {t("read_more")}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Regular News */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {regularNews.map((item, i) => (
                <article
                  key={i}
                  className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
                    {item.date ? (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {item.date}
                      </span>
                    ) : null}
                    {item.category ? (
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                        {item.category}
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mb-3 line-clamp-2 text-lg font-semibold text-card-foreground transition-colors group-hover:text-primary">
                    <Link href={`/${locale}/media/${i + 3}`}>{item.title}</Link>
                  </h3>
                  <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                    {item.excerpt}
                  </p>
                  <Link
                    href={`/${locale}/media/${i + 3}`}
                    className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    {t("read_more")}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
