import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/sections/hero"
import { AboutPreview } from "@/components/sections/about-preview"
import { ExhibitorCategories } from "@/components/sections/exhibitor-categories"
import { AgendaPreview } from "@/components/sections/agenda-preview"
import { Sponsors } from "@/components/sections/sponsors"
import { NewsPreview } from "@/components/sections/news-preview"
import { CTASection } from "@/components/sections/cta-section"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <AboutPreview />
        <ExhibitorCategories />
        <AgendaPreview />
        <Sponsors />
        {/* <NewsPreview /> */}
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
