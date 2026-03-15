import { motion } from "framer-motion";
import { AnimatedContainer, FadeInUp } from "./animated-container";

import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative pt-20 pb-32 sm:pt-32 sm:pb-40 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedContainer
          stagger
          staggerDelay={0.2}
          staggerChildren={0.1}
          className="text-center space-y-8"
        >
          <FadeInUp>
            <h1 className="text-5xl sm:text-7xl font-bold text-balance leading-tight">
              <span className="gradient-primary bg-clip-text text-white">
                Shorten URLs.
              </span>
              <br />
              <span className="text-foreground">Track Everything.</span>
            </h1>
          </FadeInUp>

          <FadeInUp>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              BlazeShort gives you blazing-fast URL shortening with powerful
              analytics. Understand your audience with real-time click tracking
              and insights.
            </p>
          </FadeInUp>

          <FadeInUp>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 h-12 px-8"
                >
                  Start Free <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 bg-transparent"
              >
                View Demo
              </Button>
            </div>
          </FadeInUp>
        </AnimatedContainer>

        {/* Hero Demo Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 rounded-2xl border border-primary/30 p-8 gradient-card backdrop-blur-sm"
        >
          <div className="space-y-4">
            <label className="text-sm font-medium text-muted-foreground">
              Paste your long URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://example.com/very-long-url..."
                className="flex-1 px-4 py-3 rounded-lg bg-input border border-border/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button className="bg-primary hover:bg-primary/90">
                Shorten
              </Button>
            </div>
            <div className="pt-4 p-4 rounded-lg bg-background/50 border border-accent/20">
              <p className="text-sm text-muted-foreground">Short URL:</p>
              <p className="text-lg font-mono text-primary">blaze.io/abc123</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
