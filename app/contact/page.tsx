"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send, Facebook, Linkedin, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const contactInfo = [
  {
    icon: MapPin,
    title: "Địa chỉ",
    content: "Tầng 12, Tòa nhà ABC, 123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh",
  },
  {
    icon: Phone,
    title: "Điện thoại",
    content: "+84 28 1234 5678",
    subContent: "Hotline: 1900 1234 56",
  },
  {
    icon: Mail,
    title: "Email",
    content: "info@vnsecurity2026.com",
    subContent: "sales@vnsecurity2026.com",
  },
  {
    icon: Clock,
    title: "Giờ làm việc",
    content: "Thứ 2 - Thứ 6: 8:00 - 17:30",
    subContent: "Thứ 7: 8:00 - 12:00",
  },
]

const departments = [
  { value: "general", label: "Thông tin chung" },
  { value: "exhibitor", label: "Đăng ký triển lãm" },
  { value: "sponsor", label: "Tài trợ" },
  { value: "visitor", label: "Đăng ký tham quan" },
  { value: "media", label: "Truyền thông & Báo chí" },
  { value: "other", label: "Khác" },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    department: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
    alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                Liên hệ
              </span>
              <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-secondary-foreground sm:text-5xl">
                Liên hệ với Chúng tôi
              </h1>
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                Đội ngũ VN Security 2026 luôn sẵn sàng hỗ trợ bạn
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
                  <h2 className="mb-6 text-xl font-bold text-foreground">Thông tin liên hệ</h2>
                  <div className="space-y-6">
                    {contactInfo.map((item) => (
                      <div key={item.title} className="flex gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <item.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{item.title}</div>
                          <div className="text-muted-foreground">{item.content}</div>
                          {item.subContent && (
                            <div className="text-sm text-muted-foreground">{item.subContent}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div className="mt-8">
                    <h3 className="mb-4 font-semibold text-foreground">Theo dõi chúng tôi</h3>
                    <div className="flex gap-3">
                      <a
                        href="#"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                      >
                        <Facebook className="h-5 w-5" />
                      </a>
                      <a
                        href="#"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                      <a
                        href="#"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                      >
                        <Youtube className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-3">
                  <div className="rounded-2xl border border-border bg-card p-8">
                    <h2 className="mb-6 text-xl font-bold text-card-foreground">Gửi tin nhắn</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="name">Họ và tên *</Label>
                          <Input
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
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
                          <Label htmlFor="phone">Số điện thoại</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="company">Công ty</Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="mt-1.5"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="department">Bộ phận liên hệ</Label>
                        <Select
                          value={formData.department}
                          onValueChange={(value) => setFormData({ ...formData, department: value })}
                        >
                          <SelectTrigger className="mt-1.5">
                            <SelectValue placeholder="Chọn bộ phận" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map((dept) => (
                              <SelectItem key={dept.value} value={dept.value}>
                                {dept.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="message">Nội dung *</Label>
                        <Textarea
                          id="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="mt-1.5"
                          placeholder="Nhập nội dung tin nhắn của bạn..."
                        />
                      </div>
                      <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                        <Send className="mr-2 h-4 w-4" />
                        Gửi tin nhắn
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        {/* <section className="bg-muted/30">
          <div className="container mx-auto px-4 py-16">
            <div className="mx-auto max-w-6xl">
              <div className="overflow-hidden rounded-2xl border border-border">
                <div className="flex aspect-[2/1] items-center justify-center bg-muted">
                  <div className="text-center">
                    <MapPin className="mx-auto mb-4 h-12 w-12 text-primary" />
                    <h3 className="mb-2 text-xl font-semibold text-foreground">
                      Văn phòng Ban tổ chức VN Security 2026
                    </h3>
                    <p className="text-muted-foreground">
                      Tầng 12, Tòa nhà ABC, 123 Nguyễn Văn Linh, Quận 7, TP.HCM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
      </main>
      <Footer />
    </div>
  )
}
