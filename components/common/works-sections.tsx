import { motion } from "framer-motion";
import {
  AnimatedContainer,
  FadeInUp,
  fadeInUpVariants,
} from "./animated-container";

export const WorksSections = () => {
  return (
    <section className="py-20 border-t border-border/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInUp whileInView className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
        </FadeInUp>
        <AnimatedContainer
          stagger
          staggerChildren={0.1}
          className="grid md:grid-cols-3 gap-8 relative"
        >
          {["Paste Your URL", "Get Short Link", "Share & Track"].map(
            (step, i) => (
              <motion.div
                key={i}
                variants={fadeInUpVariants}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step}</h3>
                <p className="text-muted-foreground">
                  {i === 0 &&
                    "Enter any long URL and we'll instantly create a short, shareable link"}
                  {i === 1 &&
                    "Copy your custom short URL and start sharing across platforms"}
                  {i === 2 &&
                    "Monitor clicks, locations, and engagement in real-time"}
                </p>
              </motion.div>
            ),
          )}
        </AnimatedContainer>
      </div>
    </section>
  );
};
