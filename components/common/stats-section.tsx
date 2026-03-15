import { AnimatedContainer, FadeInUp } from "./animated-container";

export const StatsSection = () => {
  return (
    <section className="py-20 border-t border-border/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedContainer
          stagger
          staggerChildren={0.1}
          className="grid md:grid-cols-4 gap-8 text-center"
        >
          {[
            { value: "10M+", label: "Links Created" },
            { value: "2.5B+", label: "Total Clicks" },
            { value: "99.99%", label: "Uptime" },
            { value: "<50ms", label: "Redirect Time" },
          ].map((stat, i) => (
            <FadeInUp key={i}>
              <div className="text-4xl font-bold gradient-primary bg-clip-text text-white">
                {stat.value}
              </div>
              <p className="text-muted-foreground mt-2">{stat.label}</p>
            </FadeInUp>
          ))}
        </AnimatedContainer>
      </div>
    </section>
  );
};
