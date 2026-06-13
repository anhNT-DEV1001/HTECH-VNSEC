"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Orbit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { LucideIconByName } from "@/components/ui/lucide-icon";
import { resolveApiAssetUrl } from "@/lib/api-asset";
import {
  type ExhibitionCategory,
  type ExhibitionZone,
  exhibitionService,
  getLocalizedZoneDescription,
  getLocalizedZoneField,
} from "@/services/exhibition.service";

export function ExhibitorCategories() {
  const t = useTranslations("home.categories");
  const locale = useLocale();
  const [zones, setZones] = useState<ExhibitionZone[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedZone, setSelectedZone] = useState<ExhibitionZone | null>(null);

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

  const categoryCountLabel = (count: number) =>
    locale === "vi"
      ? `${count} lĩnh vực trưng bày`
      : `${count} exhibition categories`;

  if (loading) {
    return (
      <section className="bg-warm-surface py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-5xl lg:max-w-none">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.14em] text-[#ee3d23]">
                {t("section_badge")}
              </span>
              <h2 className="homepage-section-title mb-4 max-w-5xl text-balance text-[#3558d1] lg:max-w-none">
                {t("title")}
              </h2>
              <p className="max-w-3xl text-pretty text-lg leading-9 text-[#6d5b58]">
                {t("description")}
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-56 rounded-[1.6rem] border border-[#f6c9bf] bg-white/80 shadow-[0_18px_45px_rgba(239,82,34,0.08)]"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="overflow-hidden bg-warm-surface py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mb-16 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-5xl lg:max-w-none">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.14em] text-[#ee3d23]">
                {t("section_badge")}
              </span>
              <h2 className="homepage-section-title mb-4 max-w-5xl text-balance text-[#3558d1] lg:max-w-none">
                {t("title")}
              </h2>
              <p className="max-w-3xl text-pretty text-lg leading-9 text-[#6d5b58]">
                {t("description")}
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="shrink-0 rounded-xl border-[#f1b3a6] bg-white/80 text-foreground shadow-[0_10px_30px_rgba(239,82,34,0.08)] hover:border-[#ee3d23] hover:bg-[#ee3d23] hover:text-white"
            >
              <Link href={`/${locale}/sponsor/categories`}>
                {t("cta")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {displayZones.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {displayZones.map((zone) => (
                <button
                  key={zone.id}
                  type="button"
                  onClick={() => setSelectedZone(zone)}
                  className="group flex min-h-[205px] flex-col rounded-[1.6rem] border border-[#f6c9bf] bg-white/95 p-5 text-left shadow-[0_18px_40px_rgba(239,82,34,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#ee3d23]/40 hover:shadow-[0_26px_55px_rgba(239,82,34,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ee3d23] focus-visible:ring-offset-2"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#fff0ea] text-[#ee3d23] transition-colors group-hover:bg-[#ee3d23] group-hover:text-white">
                      <Orbit className="h-5 w-5" />
                    </span>
                    <span className="inline-flex rounded-full bg-[#fff5f1] px-3 py-1 text-xs font-bold text-[#ee3d23]">
                      {zone.exhibitions.length}
                    </span>
                  </div>

                  <h3 className="text-xl font-black leading-tight text-foreground">
                    {getZoneName(zone)}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-sm font-semibold leading-6 text-[#ee3d23]">
                    {getLocalizedZoneField(zone, locale)}
                  </p>
                  <div className="pt-5">
                    <span className="inline-flex items-center text-sm font-bold text-[#ee3d23]">
                      {locale === "vi" ? "Xem danh sách" : "View categories"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="rounded-[1.75rem] border border-primary/10 bg-white/70 p-8 text-center text-medium font-semibold text-muted-foreground">
              {emptyZoneText}
            </div>
          )}
        </div>
      </section>

      <Dialog open={!!selectedZone} onOpenChange={(open) => !open && setSelectedZone(null)}>
        <DialogContent
          className="max-h-[90vh] gap-0 overflow-hidden rounded-[2rem] border-0 p-0 sm:max-w-6xl"
          showCloseButton={false}
        >
          {selectedZone ? (
            <>
              <div className="relative overflow-hidden bg-[linear-gradient(135deg,#a91515,#d72626_58%,#ef4444)] px-6 py-5 text-white sm:px-8 sm:py-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),rgba(255,255,255,0)_44%)]" />
                <button
                  type="button"
                  onClick={() => setSelectedZone(null)}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/16 text-white shadow-lg backdrop-blur transition hover:bg-white/26"
                  aria-label={locale === "vi" ? "Đóng" : "Close"}
                >
                  <span className="text-lg leading-none">×</span>
                </button>

                <DialogTitle className="relative pr-12 text-2xl font-black leading-tight sm:text-3xl">
                  {getZoneName(selectedZone)}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  {getLocalizedZoneDescription(selectedZone, locale) ||
                    getLocalizedZoneField(selectedZone, locale)}
                </DialogDescription>

                <div className="relative mt-3 flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center rounded-full border border-white/22 bg-white/12 px-4 py-2 text-sm font-semibold text-white/92">
                    {getLocalizedZoneField(selectedZone, locale)}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-white/22 bg-white/12 px-4 py-2 text-sm font-semibold text-white/92">
                    {categoryCountLabel(selectedZone.exhibitions?.length || 0)}
                  </span>
                  <Button
                    asChild
                    variant="secondary"
                    className="h-auto rounded-full border border-white/40 bg-white/92 px-4 py-2 text-sm font-semibold text-[#b44125] shadow-[0_8px_22px_rgba(122,48,24,0.12)] transition-all hover:-translate-y-0.5 hover:border-white hover:bg-[#fff4ef] hover:text-[#912f18] hover:shadow-[0_14px_30px_rgba(122,48,24,0.20)]"
                  >
                    <Link href={`/${locale}/sponsor/categories`}>
                      {locale === "vi" ? "Xem tất cả zone" : "View all zones"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                {getLocalizedZoneDescription(selectedZone, locale) ? (
                  <p className="relative mt-3 max-w-3xl text-sm leading-6 text-white/86">
                    {getLocalizedZoneDescription(selectedZone, locale)}
                  </p>
                ) : null}
              </div>

              <div className="max-h-[58vh] overflow-y-auto bg-[#fff7f3] px-6 py-6 sm:px-8 sm:py-8">
                {selectedZone.exhibitions && selectedZone.exhibitions.length > 0 ? (
                  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {selectedZone.exhibitions.map((category) => {
                      const imageUrl = getCategoryImageUrl(category);

                      return (
                        <article
                          key={`${selectedZone.id}-${category.id}`}
                          className="flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[#f5c8bc] bg-white shadow-[0_18px_45px_rgba(239,82,34,0.08)]"
                        >
                          <div className="relative">
                            {imageUrl ? (
                              <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                                <Image
                                  src={imageUrl}
                                  alt={getCategoryName(category) as any}
                                  fill
                                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                  className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                              </div>
                            ) : (
                              <div className="flex aspect-[16/10] w-full items-center justify-center bg-gradient-to-br from-[#fff1ea] via-white to-[#fff7f3] text-[#ee3d23]">
                                <LucideIconByName name={category.logo} className="h-12 w-12" />
                              </div>
                            )}
                          </div>

                          <div className="flex flex-1 flex-col px-5 py-5">
                            <h3 className="text-xl font-bold leading-tight text-foreground">
                              {getCategoryName(category)}
                            </h3>
                            <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#6d5b58]">
                              {getCategorySummary(category)}
                            </p>

                            <div className="mt-5 pt-2">
                              <Button asChild className="bg-[#ee3d23] hover:bg-[#d7351e]">
                                <Link href={`/${locale}/sponsor/categories/${category.id}`}>
                                  {locale === "vi" ? "Xem chi tiết" : "View Details"}
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-[1.5rem] border border-dashed border-primary/20 bg-white/80 p-8 text-center text-sm font-semibold text-muted-foreground">
                    {emptyZoneText}
                  </div>
                )}
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
