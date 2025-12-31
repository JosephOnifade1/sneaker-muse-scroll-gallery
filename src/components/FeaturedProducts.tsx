import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import sneaker1 from "@/assets/sneaker-1.png";
import sneaker2 from "@/assets/sneaker-2.png";
import sneaker3 from "@/assets/sneaker-3.png";

const products = [
  {
    id: 1,
    name: "Cloud Runner Elite",
    category: "Running",
    price: 189,
    image: sneaker1,
    isNew: true,
  },
  {
    id: 2,
    name: "Shadow Stealth Pro",
    category: "Lifestyle",
    price: 219,
    image: sneaker2,
    isNew: false,
  },
  {
    id: 3,
    name: "Blaze Performance",
    category: "Training",
    price: 199,
    image: sneaker3,
    isNew: true,
  },
];

const FeaturedProducts = () => {
  return (
    <section id="new-arrivals" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            New Arrivals
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-2">
            Featured Sneakers
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto">
            The latest additions to our premium collection
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-card rounded-2xl p-6 transition-all duration-500 hover:shadow-xl"
            >
              {/* Badge */}
              {product.isNew && (
                <span className="absolute top-6 left-6 px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full z-10">
                  NEW
                </span>
              )}

              {/* Wishlist Button */}
              <button className="absolute top-6 right-6 p-2 rounded-full bg-background/80 text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-accent hover:text-accent-foreground z-10">
                <Heart className="h-4 w-4" />
              </button>

              {/* Image */}
              <div className="relative aspect-square mb-6 overflow-hidden rounded-xl bg-muted/30">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Info */}
              <div className="space-y-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  {product.category}
                </span>
                <h3 className="text-lg font-semibold text-foreground">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xl font-bold text-foreground">
                    ${product.price}
                  </span>
                  <Button variant="premium" size="sm" className="gap-2">
                    <ShoppingBag className="h-4 w-4" />
                    Add
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
