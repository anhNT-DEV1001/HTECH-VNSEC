"use client"

import { useState } from "react"
import { User, Building2, Mic, Check, ArrowRight } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

const registrationTypes = [
  {
    id: "visitor",
    icon: User,
    title: "Khách tham quan",
    description: "Đăng ký miễn phí tham quan triển lãm và tham dự các hội thảo",
    benefits: ["Tham quan triển lãm miễn phí", "Tham dự hội thảo công khai", "Tài liệu sự kiện", "B2B Matching cơ bản"],
  },
  {
    id: "exhibitor",
    icon: Building2,
    title: "Nhà triển lãm",
    description: "Đăng ký gian hàng để trưng bày sản phẩm và giải pháp",
    benefits: ["Gian hàng triển lãm", "Quảng bá thương hiệu", "B2B Matching ưu tiên", "Cơ hội speaking"],
  },
  {
    id: "speaker",
    icon: Mic,
    title: "Diễn giả",
    description: "Đăng ký trở thành diễn giả tại các phiên hội thảo",
    benefits: ["Slot speaking riêng", "Quảng bá cá nhân", "VIP access", "Networking events"],
  },
] as const

const industries = [
  "Camera & Giám sát",
  "Kiểm soát truy cập",
  "An ninh mạng",
  "Phòng cháy chữa cháy",
  "Sinh trắc học",
  "Smart Building",
  "Khác",
]

type RegistrationType = (typeof registrationTypes)[number]["id"]

function normalizeRegistrationType(type?: string): RegistrationType {
  if (type === "exhibitor" || type === "speaker") {
    return type
  }

  return "visitor"
}

export function RegistrationPage({ initialType }: { initialType?: string }) {
  const [selectedType, setSelectedType] = useState<RegistrationType>(normalizeRegistrationType(initialType))
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    industry: "",
    interests: "",
    agreeTerms: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ type: selectedType, ...formData })
    alert("Đăng ký thành công! Chúng tôi sẽ gửi email xác nhận trong thời gian sớm nhất.")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-secondary py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                Đăng ký
              </span>
              <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-secondary-foreground sm:text-5xl">
                Đăng ký Tham gia VN Security 2026
              </h1>
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                Chọn hình thức tham gia phù hợp với bạn
              </p>
            </div>
          </div>
        </section>

        <section className="bg-background py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="mb-12">
                <h2 className="mb-6 text-xl font-bold text-foreground">Chọn hình thức tham gia</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  {registrationTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={cn(
                        "relative rounded-xl border-2 p-6 text-left transition-all",
                        selectedType === type.id
                          ? "border-primary bg-primary/5"
                          : "border-border bg-card hover:border-primary/50"
                      )}
                    >
                      {selectedType === type.id && (
                        <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                      <div
                        className={cn(
                          "mb-4 flex h-12 w-12 items-center justify-center rounded-lg",
                          selectedType === type.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        <type.icon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 font-semibold text-foreground">{type.title}</h3>
                      <p className="mb-4 text-sm text-muted-foreground">{type.description}</p>
                      <ul className="space-y-1">
                        {type.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Check className="h-3 w-3 text-primary" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-8">
                <h2 className="mb-6 text-xl font-bold text-card-foreground">Thông tin đăng ký</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="firstName">Họ *</Label>
                      <Input
                        id="firstName"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Tên *</Label>
                      <Input
                        id="lastName"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
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
                    <div>
                      <Label htmlFor="phone">Số điện thoại *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="company">Công ty / Tổ chức</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="jobTitle">Chức vụ</Label>
                      <Input
                        id="jobTitle"
                        value={formData.jobTitle}
                        onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="industry">Lĩnh vực quan tâm</Label>
                    <Select
                      value={formData.industry}
                      onValueChange={(value) => setFormData({ ...formData, industry: value })}
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Chọn lĩnh vực" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedType === "speaker" && (
                    <div>
                      <Label htmlFor="interests">Chủ đề bạn muốn trình bày</Label>
                      <Textarea
                        id="interests"
                        rows={4}
                        value={formData.interests}
                        onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                        className="mt-1.5"
                        placeholder="Mô tả ngắn gọn về chủ đề bạn muốn trình bày..."
                      />
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="agreeTerms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
                    />
                    <Label htmlFor="agreeTerms" className="text-sm text-muted-foreground">
                      Tôi đồng ý với{" "}
                      <a href="#" className="text-primary hover:underline">
                        Điều khoản sử dụng
                      </a>{" "}
                      và{" "}
                      <a href="#" className="text-primary hover:underline">
                        Chính sách bảo mật
                      </a>{" "}
                      của VN Security 2026
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    disabled={!formData.agreeTerms}
                    className="group w-full bg-primary hover:bg-primary/90"
                  >
                    Hoàn tất đăng ký
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
