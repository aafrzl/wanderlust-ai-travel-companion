import { auth } from "@/auth";
import Header from "./_components/header-landingpage";
import HeroSection from "./_components/hero-section";
import FeaturesSection from "./_components/features-section";
import TestimonialSection from "./_components/testimonial-section";
import CTASection from "./_components/call-to-action-section";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <div className="relative">
        <Header session={session} />
        <main className="container mx-auto flex overflow-hidden flex-col">
          {/* Hero section */}
          <HeroSection session={session} />
          {/* Features section */}
          <FeaturesSection />
          {/* Testimoni */}
          <TestimonialSection />
          {/* CTA section */}
          <CTASection session={session} />
        </main>
      </div>
    </>
  );
}
