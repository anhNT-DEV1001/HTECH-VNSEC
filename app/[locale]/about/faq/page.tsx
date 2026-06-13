"use client"

import { useEffect, useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import { qaService } from "@/services/qa.service"
import type { QACategory } from "@/types/qa"

const FAQ_WEB_ID = 2

export default function FAQPage() {
  const t = useTranslations("about.faq")
  const locale = useLocale()
  const [categories, setCategories] = useState<QACategory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let isMounted = true

    const fetchFAQs = async () => {
      try {
        setIsLoading(true)
        setHasError(false)
        const data = await qaService.getPublicQAsByWebId(FAQ_WEB_ID)

        if (!isMounted) return
        setCategories(data)
      } catch {
        if (!isMounted) return
        setCategories([])
        setHasError(true)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    fetchFAQs()

    return () => {
      isMounted = false
    }
  }, [])

  const getCategoryTitle = (category: QACategory) =>
    locale === "en" ? category.name_en || category.name_vn : category.name_vn

  const getQuestion = (faq: QACategory["qas"][number]) =>
    locale === "en" ? faq.question_en || faq.question_vn : faq.question_vn

  const getAnswer = (faq: QACategory["qas"][number]) =>
    locale === "en" ? faq.ans_en || faq.ans_vn || "" : faq.ans_vn || faq.ans_en || ""

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
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            {isLoading && (
              <div className="rounded-xl border border-border bg-card p-6 text-center text-muted-foreground">
                {t("loading")}
              </div>
            )}

            {!isLoading && hasError && (
              <div className="rounded-xl border border-border bg-card p-6 text-center text-muted-foreground">
                {t("error")}
              </div>
            )}

            {!isLoading && !hasError && categories.length === 0 && (
              <div className="rounded-xl border border-border bg-card p-6 text-center text-muted-foreground">
                {t("updating")}
              </div>
            )}

            {!isLoading &&
              !hasError &&
              categories.map((category, catIndex) => (
                <div key={category.id} className="mb-12 last:mb-0">
                  <h2 className="mb-6 text-xl font-bold text-foreground">
                    {getCategoryTitle(category)}
                  </h2>
                  <Accordion type="single" collapsible className="space-y-2">
                    {category.qas.map((faq, index) => (
                      <AccordionItem
                        key={faq.id}
                        value={`item-${catIndex}-${index}`}
                        className="rounded-lg border border-border bg-card px-6"
                      >
                        <AccordionTrigger className="text-left text-card-foreground hover:no-underline">
                          {getQuestion(faq)}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {getAnswer(faq)}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}

            {/* Contact CTA */}
            <div className="mt-16 rounded-2xl border border-border bg-muted/30 p-8 text-center">
              <h3 className="mb-2 text-xl font-bold text-foreground">
                {t("cta.title")}
              </h3>
              <p className="mb-6 text-muted-foreground text-center">
                {t("cta.description")}
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href={`/${locale}/contact`}>
                  <Mail className="mr-2 h-4 w-4" />
                  {t("cta.button")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
