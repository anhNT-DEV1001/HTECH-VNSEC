"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { exhibitionService, ExhibitionCategory } from "@/services/exhibition.service";
import { LucideIconByName } from "@/components/ui/lucide-icon";

export function ExhibitorCategories() {
  const t = useTranslations("home.categories");
  const locale = useLocale();
  const [categories, setCategories] = useState<ExhibitionCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<ExhibitionCategory | null>(null);

  useEffect(() => {
    exhibitionService.getCategories()
      .then(setCategories)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="bg-warm-surface py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                {t("section_badge")}
              </span>
              <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {t("title")}
              </h2>
              <p className="text-pretty text-muted-foreground">
                {t("description")}
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-44 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-warm-surface py-20 lg:py-28">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                {t("section_badge")}
              </span>
              <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {t("title")}
              </h2>
              <p className="text-pretty text-muted-foreground">
                {t("description")}
              </p>
            </div>
            <Button asChild variant="outline" className="shrink-0 border-primary/15 bg-white/50 text-foreground hover:bg-white/80">
              <Link href={`/${locale}/sponsor/categories`}>
                {t("cta")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Categories Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => setSelectedCategory(category)}
                className="bg-warm-card group relative cursor-pointer overflow-hidden rounded-xl border border-primary/10 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.04)] transition-all duration-300 hover:border-primary/40 hover:bg-white/80"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary">
                    <LucideIconByName name={category.logo} className="h-7 w-7" />
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                    +
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {locale === "vi" ? category.name_vn : category.name_en}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {locale === "vi" ? category.sumary_vn : category.sumary_en}
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  {t("card.hover")}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Detail Modal */}
      <Dialog open={!!selectedCategory} onOpenChange={(open) => !open && setSelectedCategory(null)}>
        <DialogContent className="sm:max-w-lg p-0 gap-0 overflow-hidden rounded-2xl">
          {selectedCategory && (
            <div className="p-6 pb-0">
              <div className="flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary">
                  <LucideIconByName name={selectedCategory.logo} className="h-7 w-7" />
                </div>
              </div>
            </div>
          )}
          {selectedCategory && (
            <div className="p-6 pt-4">
              <DialogTitle className="text-2xl font-bold text-foreground mb-3">
                {locale === "vi" ? selectedCategory.name_vn : selectedCategory.name_en}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground mb-6 leading-relaxed">
                {locale === "vi" ? selectedCategory.sumary_vn : selectedCategory.sumary_en}
              </DialogDescription>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild className="flex-1 bg-primary hover:bg-primary/90">
                  <Link href={`/${locale}/sponsor/register`}>
                    {t("modal.register")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" className="flex-1 border-primary/15">
                  {t("modal.consult")}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
