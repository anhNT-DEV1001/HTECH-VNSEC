import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

const faqCategories = [
  {
    title: "Thông tin chung",
    questions: [
      {
        q: "VN Security 2026 là gì?",
        a: "VN Security 2026 là Triển lãm và Hội nghị Quốc tế lần thứ nhất về Công nghiệp An ninh tại Việt Nam, quy tụ hơn 500 nhà triển lãm từ 50+ quốc gia, dự kiến thu hút 30,000+ khách tham quan chuyên ngành.",
      },
      {
        q: "Sự kiện diễn ra khi nào và ở đâu?",
        a: "VN Security 2026 sẽ diễn ra từ ngày 15-18 tháng 10 năm 2026 tại Trung tâm Hội chợ & Triển lãm Sài Gòn (SECC), 799 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh.",
      },
      {
        q: "Ai nên tham gia VN Security 2026?",
        a: "Sự kiện phù hợp với các nhà sản xuất, phân phối thiết bị an ninh; chuyên gia, kỹ sư trong ngành; đại diện cơ quan nhà nước; các doanh nghiệp cần giải pháp an ninh; và sinh viên, nghiên cứu sinh ngành liên quan.",
      },
    ],
  },
  {
    title: "Đăng ký tham quan",
    questions: [
      {
        q: "Làm thế nào để đăng ký tham quan?",
        a: "Bạn có thể đăng ký trực tuyến tại website chính thức hoặc đăng ký trực tiếp tại quầy đăng ký vào ngày diễn ra sự kiện. Đăng ký trước sẽ giúp bạn tiết kiệm thời gian check-in.",
      },
      {
        q: "Tham quan có mất phí không?",
        a: "Đăng ký tham quan triển lãm hoàn toàn MIỄN PHÍ. Tuy nhiên, một số workshop và hội thảo chuyên sâu có thể yêu cầu phí tham dự riêng.",
      },
      {
        q: "Tôi có thể hủy đăng ký không?",
        a: "Có, bạn có thể hủy đăng ký bất kỳ lúc nào trước ngày diễn ra sự kiện bằng cách liên hệ với Ban tổ chức qua email hoặc hotline.",
      },
    ],
  },
  {
    title: "Đăng ký triển lãm",
    questions: [
      {
        q: "Chi phí thuê gian hàng là bao nhiêu?",
        a: "Chi phí thuê gian hàng tùy thuộc vào vị trí và diện tích. Vui lòng liên hệ Ban tổ chức để nhận bảng giá chi tiết và các gói ưu đãi đăng ký sớm.",
      },
      {
        q: "Deadline đăng ký triển lãm là khi nào?",
        a: "Deadline đăng ký triển lãm là ngày 31/07/2026. Tuy nhiên, đăng ký trước ngày 31/03/2026 sẽ được hưởng ưu đãi 15% giá thuê gian hàng.",
      },
      {
        q: "Gian hàng bao gồm những gì?",
        a: "Gian hàng tiêu chuẩn bao gồm: vách ngăn, biển hiệu, bàn ghế, ổ điện, đèn chiếu sáng. Các dịch vụ bổ sung như internet, thiết bị AV có thể đặt thêm.",
      },
    ],
  },
  {
    title: "Hội thảo & Workshop",
    questions: [
      {
        q: "Làm thế nào để đăng ký tham dự hội thảo?",
        a: "Sau khi đăng ký tham quan, bạn có thể đăng ký các phiên hội thảo mong muốn thông qua hệ thống đăng ký trực tuyến. Số lượng có hạn, đăng ký sớm để đảm bảo chỗ ngồi.",
      },
      {
        q: "Tôi có thể đăng ký làm diễn giả không?",
        a: "Có, chúng tôi hoan nghênh các chuyên gia đăng ký làm diễn giả. Vui lòng gửi hồ sơ và đề xuất chủ đề qua form đăng ký diễn giả trên website.",
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                FAQ
              </span>
              <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-secondary-foreground sm:text-5xl">
                Câu hỏi Thường gặp
              </h1>
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                Giải đáp các thắc mắc thường gặp về VN Security 2026
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="bg-background py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              {faqCategories.map((category, catIndex) => (
                <div key={category.title} className="mb-12 last:mb-0">
                  <h2 className="mb-6 text-xl font-bold text-foreground">
                    {category.title}
                  </h2>
                  <Accordion type="single" collapsible className="space-y-2">
                    {category.questions.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`item-${catIndex}-${index}`}
                        className="rounded-lg border border-border bg-card px-6"
                      >
                        <AccordionTrigger className="text-left text-card-foreground hover:no-underline">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}

              {/* Contact CTA */}
              <div className="mt-16 rounded-2xl border border-border bg-muted/30 p-8 text-center">
                <h3 className="mb-2 text-xl font-bold text-foreground">
                  Không tìm thấy câu trả lời?
                </h3>
                <p className="mb-6 text-muted-foreground">
                  Liên hệ với chúng tôi để được hỗ trợ
                </p>
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <Link href="/contact">
                    <Mail className="mr-2 h-4 w-4" />
                    Liên hệ Ban tổ chức
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
