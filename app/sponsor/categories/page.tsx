"use client"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Shield, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { ExhibitionCategory, exhibitionService } from "@/services/exhibition.service"

export function ExhibitionCategories() {
  const [categories, setCategories] = useState<ExhibitionCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    exhibitionService.getCategories()
      .then(setCategories)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <section className="bg-secondary py-20 lg:py-28">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-4xl text-center">
                <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                  Lĩnh vực trưng bày
                </span>
                <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-secondary-foreground sm:text-5xl">
                  Các Lĩnh vực Triển lãm
                </h1>
                <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                  VN Security 2026 bao gồm các lĩnh vực chính với nhiều nhà triển lãm
                </p>
              </div>
            </div>
          </section>
          <section className="bg-background py-16 lg:py-24">
            <div className="container mx-auto px-4">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-52 animate-pulse rounded-2xl bg-muted" />
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                Lĩnh vực trưng bày
              </span>
              <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-secondary-foreground sm:text-5xl">
                Các Lĩnh vực Triển lãm
              </h1>
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                VN Security 2026 bao gồm {categories.length} lĩnh vực chính với nhiều nhà triển lãm
              </p>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="bg-background py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary">
                      {category.logo || <Shield className="h-7 w-7" />}
                    </div>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                      +
                    </span>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                    {category.name_vn}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.sumary_vn}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-16 text-center">
              <p className="mb-4 text-muted-foreground">
                Quan tâm tham gia triển lãm trong các lĩnh vực trên?
              </p>
              <Button asChild size="lg" className="group bg-primary hover:bg-primary/90">
                <Link href="/sponsor/register">
                  Đăng ký gian hàng
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default function CategoriesPage() {
  return <ExhibitionCategories />;
}
