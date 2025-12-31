import { Award, Truck, Shield, Headphones } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "Only authentic, top-tier sneakers from trusted brands",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Complimentary worldwide shipping on orders over $150",
  },
  {
    icon: Shield,
    title: "Secure Purchase",
    description: "100% secure payments with money-back guarantee",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Expert assistance available around the clock",
  },
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Our Story
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-2 mb-6">
              Crafting Excellence
              <span className="block text-accent-foreground">Since 2019</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              STRIDE was born from a simple belief: everyone deserves access to 
              premium footwear that combines exceptional quality with cutting-edge 
              design. We partner with the world's leading brands to bring you an 
              unparalleled selection of sneakers.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From limited-edition collaborations to timeless classics, our 
              curated collection represents the pinnacle of sneaker culture. 
              Every pair tells a story of innovation, craftsmanship, and style.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-accent/20 to-muted overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl font-bold text-foreground/10">STRIDE</div>
                </div>
              </div>
            </div>
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-2xl shadow-xl">
              <div className="text-3xl font-bold text-foreground">6+</div>
              <div className="text-sm text-muted-foreground">Years of Excellence</div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="text-center p-6 rounded-2xl bg-card hover:shadow-lg transition-shadow duration-300"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 text-accent-foreground mb-4">
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
