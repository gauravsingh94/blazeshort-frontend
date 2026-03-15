"use client";
import {
  FadeInUp
} from "@/components/common/animated-container";
import { CtaSection } from "@/components/common/cta-section";
import { FeatureSection } from "@/components/common/feature-section";
import { Footer } from "@/components/common/footer-card";
import { HeroSection } from "@/components/common/hero-section";
import { NavigationSection } from "@/components/common/navigation-section";
import { PricingSection } from "@/components/common/pricing-card";
import { StatsSection } from "@/components/common/stats-section";
import { WorksSections } from "@/components/common/works-sections";

export default function LandingPage() {
  return (
    <main className="overflow-hidden bg-background">
      {/* Navigation */}
      <NavigationSection/>
      {/* Hero Section */}
      <HeroSection />
      {/* Features Grid */}
      <FeatureSection/>
      {/* How It Works */}
      <WorksSections />
      {/* Stats Section */}
      <StatsSection />
      {/* Pricing */}
      <PricingSection />
      {/* CTA Section */}
      <CtaSection/>
      {/* Footer */}
      <Footer />
    </main>
  );
}
FadeInUp;
