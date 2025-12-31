import { ArrowUpRight } from "lucide-react";

const collections = [
  {
    id: 1,
    name: "Running",
    description: "Built for speed",
    count: 48,
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: 2,
    name: "Lifestyle",
    description: "Everyday comfort",
    count: 72,
    gradient: "from-zinc-700 to-zinc-900",
  },
  {
    id: 3,
    name: "Training",
    description: "Peak performance",
    count: 36,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    id: 4,
    name: "Limited Edition",
    description: "Exclusive drops",
    count: 12,
    gradient: "from-amber-400 to-orange-500",
  },
];

const Collections = () => {
  return (
    <section id="collections" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Browse By
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-2">
              Collections
            </h2>
          </div>
          <a
            href="#"
            className="text-sm font-medium text-foreground hover:text-accent-foreground transition-colors mt-4 md:mt-0 flex items-center gap-1"
          >
            View all collections
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        {/* Collections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection) => (
            <a
              key={collection.id}
              href="#"
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-card"
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${collection.gradient} opacity-90 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between text-primary-foreground">
                <div>
                  <span className="text-sm opacity-80">
                    {collection.count} products
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">{collection.name}</h3>
                  <p className="text-sm opacity-80">{collection.description}</p>
                </div>
              </div>

              {/* Hover Arrow */}
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <ArrowUpRight className="h-5 w-5 text-primary-foreground" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
