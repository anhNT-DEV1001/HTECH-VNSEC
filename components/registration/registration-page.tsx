  "use client"

  import { useState } from "react"
  import { useTranslations } from "next-intl"
  import { AxiosError } from "axios"
  import { User, Building2, Mic, Check, ArrowRight } from "lucide-react"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import { Textarea } from "@/components/ui/textarea"
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
  import { Checkbox } from "@/components/ui/checkbox"
  import { cn } from "@/lib/utils"
  import { registerService, type RegisterType } from "@/services/register.service"

  type SubmitState = {
    type: "success" | "error"
    message: string
  } | null

  function normalizeRegistrationType(type?: string): RegisterType {
    if (type === "exhibitor" || type === "speaker") return type
    return "visitor"
  }

  export function RegistrationPage({ initialType }: { initialType?: string }) {
    const t = useTranslations("register")
    const [selectedType, setSelectedType] = useState<RegisterType>(normalizeRegistrationType(initialType))
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
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitState, setSubmitState] = useState<SubmitState>(null)

    const types = t.raw("types") as Record<string, {
      title: string
      description: string
      benefits: string[]
    }>

    const industries = t.raw("form.industries") as string[]

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setIsSubmitting(true)
      setSubmitState(null)

      try {
        await registerService.submitRegistrationForm({
          registerType: selectedType,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          position: formData.jobTitle,
          interest: selectedType === "speaker" ? formData.interests : formData.industry,
          acceptedPolicy: formData.agreeTerms,
        })

        setSubmitState({
          type: "success",
          message: t("form.success_alert"),
        })
        setFormData({
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
        setSelectedType(normalizeRegistrationType(initialType))
      } catch (error) {
        const errorMessage =
          error instanceof AxiosError
            ? ((error.response?.data as { message?: string } | undefined)?.message ?? t("form.error_alert"))
            : t("form.error_alert")

        setSubmitState({
          type: "error",
          message: errorMessage,
        })
      } finally {
        setIsSubmitting(false)
      }
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
            </div>
          </div>
        </section>

        <section className="bg-background py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              {/* Type Selection */}
              <div className="mb-12">
                <h2 className="mb-6 text-xl font-bold text-foreground">{t("type_section_title")}</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  {(["visitor", "exhibitor", "speaker"] as const).map((typeId) => {
                    const type = types[typeId]
                    const icons: Record<string, React.ComponentType<{ className?: string }>> = {
                      visitor: User,
                      exhibitor: Building2,
                      speaker: Mic,
                    }
                    const Icon = icons[typeId]
                    return (
                      <button
                        key={typeId}
                        type="button"
                        onClick={() => setSelectedType(typeId)}
                        className={cn(
                          "relative rounded-xl border-2 p-6 text-left transition-all",
                          selectedType === typeId
                            ? "border-primary bg-primary/5"
                            : "border-border bg-card hover:border-primary/50"
                        )}
                      >
                        {selectedType === typeId && (
                          <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <Check className="h-4 w-4" />
                          </div>
                        )}
                        <div
                          className={cn(
                            "mb-4 flex h-12 w-12 items-center justify-center rounded-lg",
                            selectedType === typeId
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <h3 className="mb-2 font-semibold text-foreground">{type.title}</h3>
                        <p className="mb-4 text-sm text-muted-foreground">{type.description}</p>
                        <ul className="space-y-1">
                          {type.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Check className="h-3 w-3 text-primary" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Form */}
              <div className="rounded-2xl border border-border bg-card p-8">
                <h2 className="mb-6 text-xl font-bold text-card-foreground">{t("form.title")}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="firstName">{t("form.firstName_label")}</Label>
                      <Input
                        id="firstName"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="mt-1.5"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">{t("form.lastName_label")}</Label>
                      <Input
                        id="lastName"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="mt-1.5"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="email">{t("form.email_label")}</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1.5"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">{t("form.phone_label")}</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-1.5"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="company">{t("form.company_label")}</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="mt-1.5"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="jobTitle">{t("form.position_label")}</Label>
                      <Input
                        id="jobTitle"
                        value={formData.jobTitle}
                        onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                        className="mt-1.5"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="industry">{t("form.interest_label")}</Label>
                    <Select
                      value={formData.industry}
                      onValueChange={(value) => setFormData({ ...formData, industry: value })}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder={t("form.interest_placeholder")} />
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
                      <Label htmlFor="interests">{t("form.topic_label")}</Label>
                      <Textarea
                        id="interests"
                        rows={4}
                        value={formData.interests}
                        onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                        className="mt-1.5"
                        placeholder={t("form.topic_placeholder")}
                        disabled={isSubmitting}
                      />
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="agreeTerms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
                      disabled={isSubmitting}
                    />
                    <Label htmlFor="agreeTerms" className="text-sm text-muted-foreground">
                      {t("form.terms_text")}
                    </Label>
                  </div>

                  {submitState && (
                    <div
                      className={
                        submitState.type === "success"
                          ? "rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
                          : "rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                      }
                    >
                      {submitState.message}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={!formData.agreeTerms || isSubmitting}
                    className="group w-full bg-primary hover:bg-primary/90"
                  >
                    {isSubmitting ? t("form.submitting_button") : t("form.submit_button")}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }
