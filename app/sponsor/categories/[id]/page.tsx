"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { LucideIconByName } from "@/components/ui/lucide-icon"
import { resolveApiAssetUrl } from "@/lib/api-asset"
import { exhibitionService, type ExhibitionCategory } from "@/services/exhibition.service"

const hasHtmlMarkup = (value?: string | null) => /<\/?[a-z][\s\S]*>/i.test(value || "")

function PlainTextContent({ content }: { content: string }) {
  const blocks = content
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)

  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        const lines = block.split("\n").map((line) => line.trim()).filter(Boolean)
        const listItems = lines.filter((line) => /^[\-*•]\s+/.test(line))

        if (listItems.length === lines.length) {
          return (
            <ul key={index} className="space-y-3 pl-6 text-[15px] leading-8 text-muted-foreground marker:text-primary">
              {listItems.map((item, itemIndex) => (
                <li key={itemIndex}>{item.replace(/^[\-*•]\s+/, "")}</li>
              ))}
            </ul>
          )
        }

        return (
          <p key={index} className="text-[15px] leading-8 text-muted-foreground">
            {block}
          </p>
        )
      })}
    </div>
  )
}

function RichContent({ content }: { content?: string | null }) {
  if (!content) {
    return (
      <p className="text-[15px] leading-8 text-muted-foreground">
        Nội dung đang được cập nhật.
      </p>
    )
  }

  if (hasHtmlMarkup(content)) {
    return (
      <div
        className="text-[15px] leading-8 text-muted-foreground [&_a]:font-semibold [&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline [&_h1]:mb-5 [&_h1]:mt-10 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-foreground [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:uppercase [&_h2]:tracking-tight [&_h2]:text-foreground [&_h3]:mb-4 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-foreground [&_img]:my-8 [&_img]:w-full [&_img]:rounded-[1.75rem] [&_img]:object-cover [&_ol]:my-5 [&_ol]:space-y-3 [&_ol]:pl-6 [&_p]:my-5 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:my-5 [&_ul]:space-y-3 [&_ul]:pl-6 [&_li]:pl-1"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    )
  }

  return <PlainTextContent content={content} />
}

export default function ExhibitionCategoryDetailPage() {
  const params = useParams<{ id: string }>()
  const [category, setCategory] = useState<ExhibitionCategory | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const categoryId = Number(params?.id)

    if (!Number.isFinite(categoryId)) {
      setError("Lĩnh vực triển lãm không hợp lệ.")
      setLoading(false)
      return
    }

    exhibitionService
      .getCategoryById(categoryId)
      .then((data) => {
        if (!data) {
          setError("Không tìm thấy lĩnh vực triển lãm.")
          return
        }

        setCategory(data)
        setError("")
      })
      .catch((err: unknown) => {
        console.error(err)
        setError("Không thể tải nội dung lĩnh vực triển lãm.")
      })
      .finally(() => setLoading(false))
  }, [params?.id])

  const imageUrl = useMemo(() => resolveApiAssetUrl(category?.img), [category?.img])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-secondary py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <Button asChild variant="ghost" className="mb-6 -ml-4 text-muted-foreground hover:text-foreground">
                <Link href="/sponsor/categories">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Quay lại danh mục
                </Link>
              </Button>

              {loading ? (
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_360px]">
                  <div className="space-y-4">
                    <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                    <div className="h-12 w-3/4 animate-pulse rounded bg-muted" />
                    <div className="h-24 w-full animate-pulse rounded bg-muted" />
                  </div>
                  <div className="aspect-[4/5] animate-pulse rounded-[2rem] bg-muted" />
                </div>
              ) : error ? (
                <div className="rounded-3xl border border-destructive/20 bg-destructive/5 p-8">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              ) : category ? (
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_360px] lg:items-start">
                  <div>
                    <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-primary">
                        <LucideIconByName name={category.logo} className="h-4 w-4" />
                      </span>
                      {category.title_vn || "Lĩnh vực triển lãm"}
                    </span>
                    <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-secondary-foreground sm:text-5xl">
                      {category.name_vn}
                    </h1>
                    <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
                      {category.sumary_vn}
                    </p>
                  </div>

                  <div className="lg:sticky lg:top-28">
                    <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_26px_60px_rgba(15,23,42,0.12)]">
                      {imageUrl ? (
                        <div className="relative aspect-[4/5] w-full bg-muted">
                          <Image
                            src={imageUrl}
                            alt={category.name_vn}
                            fill
                            sizes="(max-width: 1024px) 100vw, 360px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex aspect-[4/5] items-center justify-center bg-gradient-to-br from-primary/10 via-white to-primary/5 text-primary">
                          <LucideIconByName name={category.logo} className="h-24 w-24" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {category && !loading && !error ? (
          <section className="bg-background py-16 lg:py-20">
            <div className="container mx-auto px-4">
              <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1.3fr)_360px]">
                <article className="min-w-0">
                  <RichContent content={category.content_vn} />

                  <div className="mt-12 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row">
                    <Button asChild className="bg-primary hover:bg-primary/90">
                      <Link href="/sponsor/register">
                        Đăng ký gian hàng
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="border-primary/25 hover:border-primary hover:bg-primary hover:text-primary-foreground">
                      <Link href="/sponsor/exhibitor">
                        Xem danh sách exhibitor
                      </Link>
                    </Button>
                  </div>
                </article>

                <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
                  <div className="rounded-[1.75rem] border border-primary/10 bg-warm-card p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/70">
                      Thông tin nhanh
                    </p>
                    <h2 className="mt-3 text-xl font-bold text-foreground">
                      {category.name_vn}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {category.sumary_vn}
                    </p>
                  </div>
                </aside>
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  )
}
