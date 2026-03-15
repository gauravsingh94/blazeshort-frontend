import { AnimatedContainer, FadeInUp } from "./animated-container"
import {  PricingCard } from "@/components/common/feature-card";

export const PricingSection= () => {
    return (
      <section className="py-20 border-t border-border/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp whileInView className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple Pricing</h2>
            <p className="text-muted-foreground text-lg">
              Choose the plan that's right for you
            </p>
          </FadeInUp>

          <AnimatedContainer
            stagger
            staggerChildren={0.1}
            className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto"
          >
            <PricingCard
              title="Free"
              price="Free"
              description="Perfect for getting started"
              features={[
                "10 links per month",
                "Basic analytics",
                "30-day retention",
                "Community support",
              ]}
              ctaText="Get Started"
              ctaHref="/signup"
            />
            <PricingCard
              title="Pro"
              price="$29"
              description="For serious link managers"
              features={[
                "Unlimited links",
                "Advanced analytics",
                "Custom domains",
                "API access",
                "Priority support",
              ]}
              ctaText="Get Started"
              ctaHref="/signup"
              highlighted
            />
          </AnimatedContainer>
        </div>
      </section>
    )
}