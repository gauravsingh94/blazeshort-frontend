import { ArrowRight, Zap, BarChart3, Lock, Globe, Code } from "lucide-react";
import { AnimatedContainer, FadeInUp } from "./animated-container"
import { FeatureCard } from "./feature-card"

export const FeatureSection = ()=>{
    return (
              <section className="py-20 border-t border-border/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp whileInView className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to shorten URLs and track their performance
            </p>
          </FadeInUp>

          <AnimatedContainer
            stagger
            staggerChildren={0.1}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Zap,
                title: "Instant Shortening",
                desc: "Create short URLs in milliseconds with our global CDN",
              },
              {
                icon: BarChart3,
                title: "Real-time Analytics",
                desc: "Track every click, location, and referrer instantly",
              },
              {
                icon: Globe,
                title: "Global Reach",
                desc: "Serve URLs from 200+ locations worldwide",
              },
              {
                icon: Lock,
                title: "Secure & Private",
                desc: "Enterprise-grade encryption for all data",
              },
              {
                icon: Code,
                title: "Developer API",
                desc: "REST API with full documentation",
              },
              {
                icon: ArrowRight,
                title: "Custom Domains",
                desc: "Use your own domain for branded links",
              },
            ].map((feature, i) => (
              <FeatureCard
                key={i}
                icon={feature.icon}
                title={feature.title}
                description={feature.desc}
              />
            ))}
          </AnimatedContainer>
        </div>
      </section>
    )
}