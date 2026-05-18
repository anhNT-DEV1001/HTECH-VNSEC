"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, Expand } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import {
  exhibitionService,
  ExhibitionCategory,
  ExhibitionZone,
  getLocalizedZoneField,
} from "@/services/exhibition.service";
import { LucideIconByName } from "@/components/ui/lucide-icon";
import { resolveApiAssetUrl } from "@/lib/api-asset";

export function ExhibitorCategories() {
  const t = useTranslations("home.categories");
  const locale = useLocale();
  const [zones, setZones] = useState<ExhibitionZone[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<ExhibitionCategory | null>(null);
  const [selectedZoneField, setSelectedZoneField] = useState("");

  useEffect(() => {
    exhibitionService
      .getZonesWithExhibitions()
      .then(setZones)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const getCategoryImageUrl = (category?: ExhibitionCategory | null) =>
    resolveApiAssetUrl(category?.img);

  const getCategoryName = (category?: ExhibitionCategory | null) =>
    locale === "vi" ? category?.name_vn : category?.name_en || category?.name_vn || "";

  const getCategorySummary = (category?: ExhibitionCategory | null) =>
    locale === "vi" ? category?.sumary_vn : category?.sumary_en || category?.sumary_vn || "";

  const getZoneName = (zone: ExhibitionZone) =>
    locale === "vi" ? zone.name_vn : zone.name_en || zone.name_vn;

  const displayZones = zones.map((zone) => ({
    ...zone,
    exhibitions: zone.exhibitions?.filter(Boolean) || [],
  }));

  const emptyZoneText =
    locale === "vi"
      ? "Đang cập nhật lĩnh vực trưng bày"
      : "Exhibition categories are being updated";

  const detailHref = selectedCategory
    ? `/${locale}/sponsor/categories/${selectedCategory.id}`
    : `/${locale}/sponsor/categories`;

  if (loading) {
    return (
      <section className="bg-warm-surface py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-4xl lg:max-w-none">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                {t("section_badge")}
              </span>
              <h2 className="homepage-section-title mb-4 max-w-4xl text-balance text-[#2c54ce] lg:max-w-none lg:whitespace-nowrap">
                {t("title")}
              </h2>
              <p className="max-w-3xl text-pretty text-muted-foreground">{t("description")}</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-2xl bg-white/80">
                <div className="aspect-[4/3] animate-pulse bg-muted" />
                <div className="space-y-2 px-1 py-3">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                </div>
              </div>
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
          <div className="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-4xl lg:max-w-none">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                {t("section_badge")}
              </span>
              <h2 className="homepage-section-title mb-4 max-w-4xl text-balance text-[#2c54ce] lg:max-w-none lg:whitespace-nowrap">
                {t("title")}
              </h2>
              <p className="max-w-3xl text-pretty text-muted-foreground">{t("description")}</p>
            </div>
            <Button asChild variant="outline" className="shrink-0 border-primary/25 bg-white/50 text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground">
              <Link href={`/${locale}/sponsor/categories`}>
                {t("cta")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="space-y-14">
            {displayZones.map((zone) => (
              <section key={zone.id} className="space-y-6">
                <div>
                  <p className="text-sm font-semibold leading-relaxed text-primary/70">
                    {getLocalizedZoneField(zone, locale)}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold leading-snug text-foreground">
                    {getZoneName(zone)}
                  </h3>
                </div>

                {zone.exhibitions.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {zone.exhibitions.map((category) => {
                      const imageUrl = getCategoryImageUrl(category);

                      return (
                        <div
                          key={`${zone.id}-${category.id}`}
                          onClick={() => {
                            setSelectedCategory(category);
                            setSelectedZoneField(getLocalizedZoneField(zone, locale));
                          }}
                          className="group flex h-full cursor-pointer flex-col"
                        >
                          <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_16px_32px_rgba(15,23,42,0.08)] transition-transform duration-300 group-hover:-translate-y-1">
                            {imageUrl ? (
                              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                                <Image
                                  src={imageUrl}
                                  alt={getCategoryName(category) as any}
                                  fill
                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                              </div>
                            ) : (
                              <div className="flex aspect-[4/3] w-full items-center justify-center bg-gradient-to-br from-primary/10 via-white to-primary/5 text-primary">
                                <LucideIconByName name={category.logo} className="h-10 w-10" />
                              </div>
                            )}
                            <div className="absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/92 text-primary shadow-lg backdrop-blur">
                              <Expand className="h-3.5 w-3.5" />
                            </div>
                          </div>
                          <div className="flex min-h-[88px] flex-1 flex-col pt-3">
                            <h3 className="text-lg font-semibold leading-snug text-foreground">
                              {getCategoryName(category)}
                            </h3>
                            <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                              {getCategorySummary(category)}
                            </p>
                            <div className="mt-auto flex items-center pt-2 text-xs font-semibold leading-relaxed text-primary/80 transition-colors group-hover:text-primary">
                              {t("card.hover")}
                              <ArrowRight className="ml-1 h-4 w-4" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-[1.75rem] border border-primary/10 bg-white/70 p-8 text-center text-sm text-muted-foreground">
                    {emptyZoneText}
                  </div>
                )}
              </section>
            ))}

            {displayZones.length === 0 ? (
              <div className="rounded-[1.75rem] border border-primary/10 bg-white/70 p-8 text-center text-sm text-muted-foreground">
                {emptyZoneText}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <Dialog
        open={!!selectedCategory}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedCategory(null);
            setSelectedZoneField("");
          }
        }}
      >
        <DialogContent
          className="gap-0 overflow-hidden rounded-[2rem] border-0 p-0 sm:max-w-3xl"
          showCloseButton={false}
        >
          {selectedCategory ? (
            <>
              <div className="relative">
                {getCategoryImageUrl(selectedCategory) ? (
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                    <Image
                      src={getCategoryImageUrl(selectedCategory)!}
                      alt={getCategoryName(selectedCategory) as any}
                      fill
                      sizes="(max-width: 1024px) 100vw, 960px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  </div>
                ) : (
                  <div className="flex aspect-[16/9] w-full items-center justify-center bg-gradient-to-br from-primary/10 via-white to-primary/5 text-primary">
                    <LucideIconByName name={selectedCategory.logo} className="h-20 w-20" />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedZoneField("");
                  }}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-foreground shadow-lg backdrop-blur transition hover:bg-white"
                  aria-label={locale === "vi" ? "Đóng" : "Close"}
                >
                  <span className="text-lg leading-none">×</span>
                </button>
              </div>

              <div className="bg-white px-6 py-6 sm:px-8 sm:py-8">
                <DialogTitle className="sr-only">
                  {getCategoryName(selectedCategory)}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  {getCategorySummary(selectedCategory)}
                </DialogDescription>
                <div className="mb-3 flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <LucideIconByName name={selectedCategory.logo} className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold leading-relaxed text-primary/70">
                    {selectedZoneField || (locale === "vi" ? "Lĩnh vực triển lãm" : "Exhibition Category")}
                  </span>
                </div>
                <h2 className="mb-3 text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                  {getCategoryName(selectedCategory)}
                </h2>
                <p className="mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                  {getCategorySummary(selectedCategory)}
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild className="bg-primary hover:bg-primary/90">
                    <Link href={detailHref}>
                      {locale === "vi" ? "Xem chi tiết" : "View Details"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-primary/25 hover:border-primary hover:bg-primary hover:text-primary-foreground">
                    <Link href={`/${locale}/sponsor/categories`}>
                      {locale === "vi" ? "Xem tất cả lĩnh vực" : "View All Categories"}
                    </Link>
                  </Button>
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
