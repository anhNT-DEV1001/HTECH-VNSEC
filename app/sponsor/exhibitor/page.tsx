"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useState } from "react"
import { Search, Filter, MapPin, Globe, ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const categories = [
  "Tất cả",
  "Camera & Giám sát",
  "Kiểm soát Truy cập",
  "Sinh trắc học",
  "An ninh Mạng",
  "Phòng cháy",
]

const exhibitors = [
  { name: "SecurityTech Global", country: "Hoa Kỳ", category: "Camera & Giám sát", booth: "A101", tier: "diamond" },
  { name: "SafeGuard Systems", country: "Đức", category: "Kiểm soát Truy cập", booth: "A102", tier: "diamond" },
  { name: "Hikvision", country: "Trung Quốc", category: "Camera & Giám sát", booth: "B101", tier: "gold" },
  { name: "Dahua Technology", country: "Trung Quốc", category: "Camera & Giám sát", booth: "B102", tier: "gold" },
  { name: "Axis Communications", country: "Thụy Điển", category: "Camera & Giám sát", booth: "B103", tier: "gold" },
  { name: "HID Global", country: "Hoa Kỳ", category: "Kiểm soát Truy cập", booth: "B201", tier: "gold" },
  { name: "ZKTeco", country: "Trung Quốc", category: "Sinh trắc học", booth: "C101", tier: "silver" },
  { name: "Suprema", country: "Hàn Quốc", category: "Sinh trắc học", booth: "C102", tier: "silver" },
  { name: "Bosch Security", country: "Đức", category: "Camera & Giám sát", booth: "C103", tier: "silver" },
  { name: "Honeywell", country: "Hoa Kỳ", category: "Phòng cháy", booth: "C201", tier: "silver" },
  { name: "Kaspersky", country: "Nga", category: "An ninh Mạng", booth: "D101", tier: "silver" },
  { name: "Fortinet", country: "Hoa Kỳ", category: "An ninh Mạng", booth: "D102", tier: "silver" },
  { name: "VN Security Co.", country: "Việt Nam", category: "Camera & Giám sát", booth: "E101", tier: "standard" },
  { name: "An Ninh Việt", country: "Việt Nam", category: "Kiểm soát Truy cập", booth: "E102", tier: "standard" },
  { name: "SafeVN", country: "Việt Nam", category: "Phòng cháy", booth: "E103", tier: "standard" },
]

const tierColors = {
  diamond: "border-l-primary",
  gold: "border-l-yellow-500",
  silver: "border-l-gray-400",
  standard: "border-l-border",
}

export default function ExhibitorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("Tất cả")

  const filteredExhibitors = exhibitors.filter((exhibitor) => {
    const matchesSearch = exhibitor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exhibitor.country.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "Tất cả" || exhibitor.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                Nhà triển lãm
              </span>
              <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-secondary-foreground sm:text-5xl">
                Danh sách Exhibitor
              </h1>
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                Hơn 500 nhà triển lãm từ 50+ quốc gia trên toàn cầu
              </p>
            </div>
          </div>
        </section>

        {/* Exhibitors List */}
        <section className="bg-background py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              {/* Search & Filter */}
              <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Tìm kiếm theo tên hoặc quốc gia..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={cn(
                        "rounded-full px-4 py-2 text-sm font-medium transition-all",
                        activeCategory === category
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      )}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="mb-8 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Hiển thị <span className="font-semibold text-foreground">{filteredExhibitors.length}</span> nhà triển lãm
                </p>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1">
                    <span className="h-3 w-3 rounded-full bg-primary" /> Kim cương
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-3 w-3 rounded-full bg-yellow-500" /> Vàng
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-3 w-3 rounded-full bg-gray-400" /> Bạc
                  </span>
                </div>
              </div>

              {/* Exhibitors Grid */}
              <div className="grid gap-4 md:grid-cols-2">
                {filteredExhibitors.map((exhibitor) => (
                  <div
                    key={exhibitor.name}
                    className={cn(
                      "group rounded-xl border-l-4 border border-border bg-card p-6 transition-all hover:shadow-md",
                      tierColors[exhibitor.tier as keyof typeof tierColors]
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="mb-1 text-lg font-semibold text-card-foreground group-hover:text-primary">
                          {exhibitor.name}
                        </h3>
                        <div className="mb-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Globe className="h-4 w-4" />
                            {exhibitor.country}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            Gian hàng {exhibitor.booth}
                          </span>
                        </div>
                        <span className="inline-block rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                          {exhibitor.category}
                        </span>
                      </div>
                      <Button size="sm" variant="ghost" className="shrink-0">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredExhibitors.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">Không tìm thấy nhà triển lãm phù hợp</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
