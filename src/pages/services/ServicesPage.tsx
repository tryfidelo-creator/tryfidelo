import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { HeroSection } from "./components/HeroSection"
import { BenefitsSection } from "./components/BenefitsSection"
import { HowItWorksSection } from "./components/HowItWorksSection"
import { SellerTypesSection } from "./components/SellerTypesSection"
import { CTASection } from "./components/CTASection"

export function ServicesPage() {
  const scrollToDetails = () => {
    const detailsSection = document.getElementById("seller-benefits")
    if (detailsSection) {
      detailsSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/30 to-white">
      <Header />

      <HeroSection onLearnMore={scrollToDetails} />

      <section id="seller-benefits">
        <BenefitsSection />
      </section>

      <HowItWorksSection />

      <SellerTypesSection />

      <CTASection />

      <Footer />
    </div>
  )
}
