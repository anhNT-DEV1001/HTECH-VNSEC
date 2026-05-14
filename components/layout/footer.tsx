import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Youtube, Linkedin } from "lucide-react"

const quickLinks = [
  { title: "Trang chủ", href: "/" },
  { title: "Giới thiệu", href: "/about/general-info" },
  { title: "Agenda", href: "/about/agenda" },
  { title: "Exhibitor", href: "/sponsor/exhibitor" },
  { title: "Liên hệ", href: "/contact" },
]

const exhibitorLinks = [
  { title: "Lĩnh vực trưng bày", href: "/sponsor/categories" },
  { title: "Đăng ký triển lãm", href: "/sponsor/register" },
  { title: "Hướng dẫn tham quan", href: "/about/visitor-guide" },
  { title: "Câu hỏi thường gặp", href: "/about/faq" },
]

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary">
                <span className="text-2xl font-bold text-primary-foreground">VN</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold uppercase tracking-wider">
                  VN Security
                </span>
                <span className="text-sm text-secondary-foreground/70">2026</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-secondary-foreground/78">
              Triển lãm và Hội nghị Quốc tế lần thứ nhất về Công nghiệp An ninh tại Việt Nam
            </p>
            <div className="flex gap-3">
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-foreground/10 transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-foreground/10 transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">Youtube</span>
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-foreground/10 transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-base font-bold uppercase tracking-wider text-secondary-foreground">
              Liên kết nhanh
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-foreground/78 transition-colors hover:text-primary"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Exhibitor Links */}
          <div>
            <h3 className="mb-5 text-base font-bold uppercase tracking-wider text-secondary-foreground">
              Triển lãm
            </h3>
            <ul className="space-y-2">
              {exhibitorLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-foreground/78 transition-colors hover:text-primary"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-5 text-base font-bold uppercase tracking-wider text-secondary-foreground">
              Liên hệ
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm leading-relaxed text-secondary-foreground/78">
                  Vietnam Exposition Center, Cau Tu Lien Street, Dong Anh District, Hanoi
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm text-secondary-foreground/78">+84 28 1234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm text-secondary-foreground/78">info@vnsecurity2026.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary-foreground/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row">
          <p className="text-center text-sm text-secondary-foreground/68">
            © 2026 VN Security. Bản quyền thuộc về Ban tổ chức.
          </p>
          <div className="flex gap-6 text-sm text-secondary-foreground/68">
            <Link href="#" className="hover:text-primary">
              Chính sách bảo mật
            </Link>
            <Link href="#" className="hover:text-primary">
              Điều khoản sử dụng
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
