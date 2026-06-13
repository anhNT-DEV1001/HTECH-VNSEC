"use client"

import { useTranslations, useLocale } from "next-intl"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export default function FAQPage() {
  const t = useTranslations("about.faq")
  const locale = useLocale()

  const categories = t.raw("categories") as Array<{
    title: string
    questions: Array<{ q: string; a: string }>
  }>

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
            {categories.map((category, catIndex) => (
              <div key={catIndex} className="mb-12 last:mb-0">
                <h2 className="mb-6 text-xl font-bold text-foreground">
                  {category.title}
                </h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {category.questions.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${catIndex}-${index}`}
                      className="rounded-lg border border-border bg-card px-6"
                    >
                      <AccordionTrigger className="text-left text-card-foreground hover:no-underline">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.a}
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
