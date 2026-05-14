import { Hero } from "@/components/sections/hero"
import { AboutPreview } from "@/components/sections/about-preview"
import { ExhibitorCategories } from "@/components/sections/exhibitor-categories"
import { AgendaPreview } from "@/components/sections/agenda-preview"
import { Sponsors } from "@/components/sections/sponsors"
import { NewsPreview } from "@/components/sections/news-preview"
import { CTASection } from "@/components/sections/cta-section"

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ExhibitorCategories />
      <AgendaPreview />
      <Sponsors />
      {/* <NewsPreview /> */}
      <CTASection />
    </>
  )
}
