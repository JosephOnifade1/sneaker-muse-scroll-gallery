import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroSneaker from "@/assets/hero-sneaker.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[var(--gradient-hero)]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-primary-foreground blur-3xl" />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent-foreground text-sm font-medium mb-6 animate-fade-in">
              New Collection 2025
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6">
              Step Into
              <span className="block text-accent">Excellence</span>
            </h1>
            <p className="text-lg text-primary-foreground/70 max-w-md mx-auto lg:mx-0 mb-8">
              Discover our curated collection of premium sneakers. Engineered for 
              performance, designed for style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="xl">
                Shop Collection
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="heroOutline" size="xl">
                Explore
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12 justify-center lg:justify-start">
              {[
                { value: "50K+", label: "Customers" },
                { value: "200+", label: "Models" },
                { value: "15+", label: "Brands" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-primary-foreground/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Sneaker Image */}
          <div className="relative order-1 lg:order-2 flex justify-center">
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full scale-75" />
              <img
                src={heroSneaker}
                alt="Premium Sneaker"
                className="relative z-10 w-full max-w-lg lg:max-w-xl transform hover:scale-105 transition-transform duration-700 drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary-foreground/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
