import { useTranslations } from "next-intl"

export default function TermsPage() {
  const t = useTranslations("footer.legal")

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="mb-6 text-3xl font-bold text-foreground">
        {t("terms_title")}
      </h1>
      <div className="prose prose-gray max-w-3xl text-muted-foreground">
        <p>
          Điều khoản sử dụng của VN Security 2026 sẽ được cập nhật sớm nhất.
        </p>
      </div>
    </div>
  )
}
