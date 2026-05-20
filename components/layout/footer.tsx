import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Youtube, Linkedin } from "lucide-react"
import { useTranslations } from "next-intl"
import { useLocale } from "next-intl"

export function Footer() {
  const t = useTranslations("footer")
  const locale = useLocale()

  const quickLinks = t.raw("quick_links.items") as Array<{ key: string; label: string; href: string }>
  const exhibitorLinks = t.raw("exhibitor_links.items") as Array<{ key: string; label: string; href: string }>
  const legalLinks = t.raw("legal") as Array<{ key: string; label: string; href: string }>
  const brandYear = t("brand.year")

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
                  {t("brand.name")}
                </span>
                {brandYear ? (
                  <span className="text-sm text-secondary-foreground/70">{brandYear}</span>
                ) : null}
              </div>
            </div>
            <p className="text-sm leading-relaxed text-secondary-foreground/78">
              {t("brand.description")}
            </p>
            {/* <div className="flex gap-3">
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-foreground/10 transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">{t("social.facebook")}</span>
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-foreground/10 transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">{t("social.youtube")}</span>
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-foreground/10 transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">{t("social.linkedin")}</span>
              </Link>
            </div> */}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-base font-bold uppercase tracking-wider text-secondary-foreground">
              {t("quick_links.title")}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-secondary-foreground/78 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Exhibitor Links */}
          <div>
            <h3 className="mb-5 text-base font-bold uppercase tracking-wider text-secondary-foreground">
              {t("exhibitor_links.title")}
            </h3>
            <ul className="space-y-2">
              {exhibitorLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-secondary-foreground/78 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-5 text-base font-bold uppercase tracking-wider text-secondary-foreground">
              {t("contact.title")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm leading-relaxed text-secondary-foreground/78">
                  {t("contact.address")}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm text-secondary-foreground/78">{t("contact.phone")}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm text-secondary-foreground/78">{t("contact.email")}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary-foreground/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row">
          <p className="text-center text-sm text-secondary-foreground/68">
            {t("copyright")}
          </p>
          <div className="flex gap-6 text-sm text-secondary-foreground/68">
            {legalLinks.map((link) => (
              <Link key={link.href} href={`/${locale}${link.href}`} className="hover:text-primary">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
