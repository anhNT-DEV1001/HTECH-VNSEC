"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { exhibitionService, ExhibitionCategory } from "@/services/exhibition.service";
import { LucideIconByName } from "@/components/ui/lucide-icon";

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
              <div
                key={i}
                className="h-44 animate-pulse rounded-xl bg-muted"
              />
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
                  {category.name_vn}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {category.sumary_vn}
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Khám phá
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
              <h2 className="text-2xl font-bold text-foreground mb-3">
                {selectedCategory.name_vn}
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {selectedCategory.sumary_vn}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild className="flex-1 bg-primary hover:bg-primary/90">
                  <Link href="/sponsor/register">
                    Đăng ký gian hàng
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" className="flex-1 border-primary/25 hover:border-primary hover:bg-primary hover:text-primary-foreground">
                  Liên hệ tư vấn
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
