"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronRight, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
const aboutItems = [
  { title: "Thông tin chung", href: "/about/general-info" },
  { title: "Ban tổ chức", href: "/about/organizers" },
  { title: "Địa điểm tổ chức", href: "/about/venue" },
  { title: "Agenda", href: "/about/agenda" },
  { title: "Hướng dẫn tham quan", href: "/about/visitor-guide" },
  { title: "Câu hỏi thường gặp", href: "/about/faq" },
]

const sponsorItems = [
  { title: "Lĩnh vực trưng bày", href: "/sponsor/categories" },
  { title: "Exhibitor", href: "/sponsor/exhibitor" },
  { title: "Đăng ký triển lãm", href: "/sponsor/register" },
]

function HeaderMenuPanel({
  items,
}: {
  items: Array<{ title: string; href: string }>
}) {
  return (
    <div className="w-[320px] rounded-2xl border border-primary/10 bg-[rgba(255,250,245,0.96)] p-3 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl">
      <ul className="grid gap-1">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-primary/6 hover:text-primary focus:bg-primary/6 focus:text-primary"
            >
              <span>{item.title}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function HoverMenu({
  label,
  items,
}: {
  label: string
  items: Array<{ title: string; href: string }>
}) {
  return (
    <div className="group relative">
      <button
        type="button"
        className="inline-flex h-10 items-center px-4 text-sm font-medium text-foreground transition-colors hover:text-primary focus:outline-none"
      >
        {label}
      </button>
      <div className="pointer-events-none absolute left-1/2 top-full z-50 w-max -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
        <HeaderMenuPanel items={items} />
      </div>
    </div>
  )
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-warm-card-strong backdrop-blur supports-[backdrop-filter]:bg-[rgba(255,250,245,0.78)]">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary shadow-[0_10px_30px_rgba(234,88,12,0.18)]">
            <span className="text-xl font-bold text-primary-foreground">VN</span>
          </div>
          <div className="hidden flex-col sm:flex">
            <span className="text-sm font-bold uppercase tracking-wider text-foreground">
              VN Security
            </span>
            <span className="text-xs text-muted-foreground">2026</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center lg:flex">
          <div className="flex items-center gap-1">
            <div>
              <Link
                href="/"
                className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary/6 hover:text-primary focus:text-primary focus:outline-none"
              >
                Trang chủ
              </Link>
            </div>

            <HoverMenu label="Giới thiệu" items={aboutItems} />

            <HoverMenu label="Sponsor & Triển lãm" items={sponsorItems} />

            <div>
              <Link
                href="/media"
                className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary/6 hover:text-primary focus:text-primary focus:outline-none"
              >
                Truyền thông
              </Link>
            </div>

            <div>
              <Link
                href="/contact"
                className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary/6 hover:text-primary focus:text-primary focus:outline-none"
              >
                Liên hệ
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="hidden items-center gap-4 lg:flex">
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/register">Đăng ký ngay</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="text-foreground">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-sm bg-warm-surface p-0">
            <div className="flex flex-col">
              <div className="flex items-center justify-between border-b border-primary/10 p-4">
                <span className="text-lg font-bold text-foreground">Menu</span>
              </div>
              <nav className="flex flex-col p-4">
                <Link
                  href="/"
                  className="py-3 text-foreground hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Trang chủ
                </Link>
                
                <div className="border-t border-primary/10 py-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Giới thiệu
                  </span>
                  {aboutItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block py-2 pl-4 text-sm text-foreground hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>

                <div className="border-t border-primary/10 py-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Sponsor & Triển lãm
                  </span>
                  {sponsorItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block py-2 pl-4 text-sm text-foreground hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>

                <Link
                  href="/media"
                  className="border-t border-primary/10 py-3 text-foreground hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Truyền thông
                </Link>

                <Link
                  href="/contact"
                  className="border-t border-primary/10 py-3 text-foreground hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Liên hệ
                </Link>

                <Button asChild className="mt-4 bg-primary hover:bg-primary/90">
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    Đăng ký ngay
                  </Link>
                </Button>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
