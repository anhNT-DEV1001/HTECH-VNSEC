import { useTranslations } from "next-intl"

export default function PrivacyPage() {
  const t = useTranslations("footer.legal")

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="mb-6 text-3xl font-bold text-foreground">
        {t("privacy_title")}
      </h1>
      <div className="prose prose-gray max-w-3xl text-muted-foreground">
        <p>
          Chính sách bảo mật của VN-SECURITY' 2026 sẽ được cập nhật sớm nhất.
        </p>
      </div>
    </div>
  )
}
