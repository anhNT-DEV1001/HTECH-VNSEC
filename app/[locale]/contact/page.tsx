"use client"

import { useTranslations, useLocale } from "next-intl"
import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send, Facebook, Linkedin, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContactPage() {
  const t = useTranslations("contact")
  const locale = useLocale()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    department: "",
    message: "",
  })

  const departments = t.raw("form.departments") as string[]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    alert(t("form.success_alert"))
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
              {t("page_badge")}
            </span>
            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-secondary-foreground sm:text-5xl">
              {t("page_title")}
            </h1>
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
              {t("page_description")}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-5">
              {/* Contact Info */}
              <div className="lg:col-span-2">
                <h2 className="mb-6 text-xl font-bold text-foreground">{t("info.title")}</h2>
                <div className="space-y-6">
                  {[
                    { icon: MapPin, label: t("info.address.label"), value: t("info.address.value") },
                    { icon: Phone, label: t("info.phone.label"), value: t("info.phone.value"), sub: t("info.phone.hotline") },
                    { icon: Mail, label: t("info.email.label"), value: t("info.email.value"), sub: t("info.email.sales") },
                    { icon: Clock, label: t("info.hours.label"), value: t("info.hours.weekday"), sub: t("info.hours.saturday") },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{item.value}</div>
                        {item.sub && (
                          <div className="text-sm text-muted-foreground">{item.sub}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="mt-8">
                  <h3 className="mb-4 font-semibold text-foreground">{t("social_label")}</h3>
                  <div className="flex gap-3">
                    {[
                      { icon: Facebook, label: "Facebook" },
                      { icon: Linkedin, label: "LinkedIn" },
                      { icon: Youtube, label: "Youtube" },
                    ].map((s) => (
                      <a
                        key={s.label}
                        href="#"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                      >
                        <s.icon className="h-5 w-5" />
                        <span className="sr-only">{s.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-3">
                <div className="rounded-2xl border border-border bg-card p-8">
                  <h2 className="mb-6 text-xl font-bold text-card-foreground">{t("form.title")}</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="name">{t("form.name_label")}</Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">{t("form.email_label")}</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="phone">{t("form.phone_label")}</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="company">{t("form.company_label")}</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="department">{t("form.department_label")}</Label>
                      <Select
                        value={formData.department}
                        onValueChange={(value) => setFormData({ ...formData, department: value })}
                      >
                        <SelectTrigger className="mt-1.5">
                          <SelectValue placeholder={t("form.department_placeholder")} />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="message">{t("form.message_label")}</Label>
                      <Textarea
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="mt-1.5"
                        placeholder={t("form.message_placeholder")}
                      />
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                      <Send className="mr-2 h-4 w-4" />
                      {t("form.submit_button")}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
