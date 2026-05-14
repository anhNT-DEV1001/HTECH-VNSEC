"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Expand } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { exhibitionService, ExhibitionCategory } from "@/services/exhibition.service";
import { LucideIconByName } from "@/components/ui/lucide-icon";
import { resolveApiAssetUrl } from "@/lib/api-asset";

export function ExhibitorCategories() {
  const [categories, setCategories] = useState<ExhibitionCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<ExhibitionCategory | null>(null);

  useEffect(() => {
    exhibitionService.getCategories()
      .then(setCategories)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const getCategoryImageUrl = (category?: ExhibitionCategory | null) =>
    resolveApiAssetUrl(category?.img);

  if (loading) {
    return (
      <section className="bg-warm-surface py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                Lĩnh vực trưng bày
              </span>
              <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Khám phá Các Danh mục Triển lãm
              </h2>
              <p className="text-pretty text-muted-foreground">
                VN Security 2026 quy tụ đa dạng các lĩnh vực trong ngành công nghiệp an ninh, từ thiết bị phần cứng đến giải pháp phần mềm.
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-[1.75rem] bg-white/80">
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
          {/* Section Header */}
          <div className="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                Lĩnh vực trưng bày
              </span>
              <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Khám phá Các Danh mục Triển lãm
              </h2>
              <p className="text-pretty text-muted-foreground">
                VN Security 2026 quy tụ đa dạng các lĩnh vực trong ngành công nghiệp an ninh, từ thiết bị phần cứng đến giải pháp phần mềm.
              </p>
            </div>
            <Button asChild variant="outline" className="shrink-0 border-primary/25 bg-white/50 text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground">
              <Link href="/sponsor/categories">
                Xem tất cả
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Categories Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const imageUrl = getCategoryImageUrl(category);

              return (
                <div
                  key={category.id}
                  onClick={() => setSelectedCategory(category)}
                  className="group flex h-full cursor-pointer flex-col"
                >
                  <div className="relative overflow-hidden rounded-[1.75rem] bg-white shadow-[0_22px_44px_rgba(15,23,42,0.08)] transition-transform duration-300 group-hover:-translate-y-1">
                    {imageUrl ? (
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                        <Image
                          src={imageUrl}
                          alt={category.name_vn}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                      </div>
                    ) : (
                      <div className="flex aspect-[4/3] w-full items-center justify-center bg-gradient-to-br from-primary/10 via-white to-primary/5 text-primary">
                        <LucideIconByName name={category.logo} className="h-16 w-16" />
                      </div>
                    )}
                    <div className="absolute right-4 bottom-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/92 text-primary shadow-lg backdrop-blur">
                      <Expand className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="flex min-h-[104px] flex-1 flex-col pt-4">
                    <h3 className="text-xl font-bold tracking-tight text-foreground">
                      {category.name_vn}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {category.sumary_vn}
                    </p>
                    <div className="mt-auto pt-2 flex items-center text-xs font-semibold uppercase tracking-[0.18em] text-primary/80 transition-colors group-hover:text-primary">
                      Khám phá
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Category Detail Modal */}
      <Dialog open={!!selectedCategory} onOpenChange={(open) => !open && setSelectedCategory(null)}>
        <DialogContent className="gap-0 overflow-hidden rounded-[2rem] border-0 p-0 sm:max-w-3xl" showCloseButton={false}>
          {selectedCategory && (
            <>
              <div className="relative">
                {getCategoryImageUrl(selectedCategory) ? (
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                    <Image
                      src={getCategoryImageUrl(selectedCategory)!}
                      alt={selectedCategory.name_vn}
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
                  onClick={() => setSelectedCategory(null)}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-foreground shadow-lg backdrop-blur transition hover:bg-white"
                  aria-label="Đóng"
                >
                  <span className="text-lg leading-none">×</span>
                </button>
              </div>

              <div className="bg-white px-6 py-6 sm:px-8 sm:py-8">
                <div className="mb-3 flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <LucideIconByName name={selectedCategory.logo} className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/70">
                    Lĩnh vực triển lãm
                  </span>
                </div>
                <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {selectedCategory.name_vn}
                </h2>
                <p className="mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                  {selectedCategory.sumary_vn}
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild className="bg-primary hover:bg-primary/90">
                    <Link href={`/sponsor/categories/${selectedCategory.id}`}>
                      Xem chi tiết
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-primary/25 hover:border-primary hover:bg-primary hover:text-primary-foreground">
                    <Link href="/sponsor/categories">
                      Xem tất cả lĩnh vực
                    </Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
