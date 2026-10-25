import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Ruler, ShieldCheck, Clock, Sparkles, Check, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getEditionBySlug, EDITIONS } from "@/data/editions";
import { ProductGallery } from "@/components/product/ProductGallery";
import { MaterialsSection } from "@/components/product/MaterialsSection";
import { SizingGuideModal } from "@/components/product/SizingGuideModal";
import { ReservationModal } from "@/components/product/ReservationModal";
import { RelatedEditions } from "@/components/product/RelatedEditions";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const edition = getEditionBySlug(slug || "the-sovereign");

  // State
  const [selectedSize, setSelectedSize] = useState<number | null>(42);
  const [isSizingModalOpen, setIsSizingModalOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    setSelectedSize(42);
  }, [slug]);

  // Monitor scroll for sticky reservation bar
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!edition) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center p-6">
        <h1 className="font-serif text-4xl mb-4">Edition Not Found</h1>
        <p className="text-muted-foreground text-sm mb-6">
          The requested archival piece is either private or unavailable.
        </p>
        <Link
          to="/"
          className="border border-primary px-6 py-2.5 kicker text-foreground hover:bg-primary/10 transition"
        >
          Return to La Maison
        </Link>
      </div>
    );
  }

  const selectedSizeObj = edition.sizing.sizes.find((s) => s.eu === selectedSize);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-20">
        {/* Breadcrumb Navigation & Back to Archive */}
        <div className="mx-auto max-w-7xl px-6 pt-6 pb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 pb-4 text-xs font-sans">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Link to="/" className="hover:text-primary transition">
                Maison
              </Link>
              <span>/</span>
              <Link to="/#vault" className="hover:text-primary transition">
                The Vault
              </Link>
              <span>/</span>
              <span className="text-foreground font-serif tracking-wide text-sm">{edition.name}</span>
            </div>

            <Link
              to="/#vault"
              className="inline-flex items-center gap-1.5 kicker text-[0.65rem] text-muted-foreground hover:text-primary transition"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>Back to Vault Archive</span>
            </Link>
          </div>
        </div>

        {/* Hero Product Detail Section */}
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            {/* Left: Interactive Image Gallery */}
            <div className="lg:col-span-7">
              <ProductGallery
                items={edition.gallery}
                shoeName={edition.name}
                editionNumber={edition.editionNumber}
              />
            </div>

            {/* Right: Product Spec & Reservation Console */}
            <div className="lg:col-span-5 flex flex-col gap-6 lg:pl-4">
              {/* Top Meta */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="kicker text-[0.68rem] text-primary">{edition.series}</span>
                  <span className="border border-border/80 bg-secondary/40 px-2 py-0.5 text-[0.65rem] font-sans text-muted-foreground tracking-widest uppercase">
                    {edition.status}
                  </span>
                </div>

                <h1 className="font-serif text-4xl sm:text-5xl mt-2 tracking-tight text-foreground">
                  {edition.name}
                </h1>
                <p className="font-serif text-lg italic text-muted-foreground mt-0.5">
                  {edition.sub}
                </p>

                <div className="mt-4 flex items-baseline gap-4 border-b border-border/80 pb-6">
                  <span className="font-serif text-3xl sm:text-4xl text-primary font-normal">
                    {edition.price}
                  </span>
                  <span className="text-[0.68rem] font-sans uppercase tracking-wider text-muted-foreground">
                    Private Bespoke Delivery Included
                  </span>
                </div>
              </div>

              {/* Headline & Overview */}
              <div>
                <p className="font-serif text-lg text-foreground/95 leading-relaxed">
                  "{edition.headline}"
                </p>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {edition.overview}
                </p>
              </div>

              {/* Colorway / Vintage */}
              <div className="border border-border/70 p-3.5 bg-card/40 flex justify-between items-center text-xs">
                <div>
                  <span className="kicker block text-[0.6rem] text-muted-foreground mb-0.5">
                    Colorway Specification
                  </span>
                  <span className="font-serif text-sm text-foreground">{edition.colorway}</span>
                </div>
                <div className="text-right">
                  <span className="kicker block text-[0.6rem] text-muted-foreground mb-0.5">
                    Batch Allocation
                  </span>
                  <span className="font-mono text-xs text-primary">{edition.editionNumber}</span>
                </div>
              </div>

              {/* Sizing Section */}
              <div className="border-t border-border/80 pt-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-baseline gap-2">
                    <span className="kicker text-[0.68rem]">Select Size</span>
                    {selectedSize && (
                      <span className="text-xs font-serif text-primary">
                        (EU {selectedSize} · US {selectedSizeObj?.us} · UK {selectedSizeObj?.uk})
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setIsSizingModalOpen(true)}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition underline underline-offset-4"
                  >
                    <Ruler className="h-3 w-3" />
                    <span>Sizing & Fit Guide</span>
                  </button>
                </div>

                {/* Sizing Grid */}
                <div className="grid grid-cols-4 gap-2">
                  {edition.sizing.sizes.map((s) => {
                    const isSelected = selectedSize === s.eu;
                    const isSoldOut = s.stock === 0;
                    return (
                      <button
                        key={s.eu}
                        disabled={isSoldOut}
                        onClick={() => setSelectedSize(s.eu)}
                        className={`relative flex flex-col items-center justify-center p-2.5 border transition-all duration-200 ${
                          isSelected
                            ? "border-primary bg-primary/10 text-primary ring-1 ring-primary shadow-gold"
                            : isSoldOut
                            ? "border-border/40 bg-secondary/20 opacity-40 cursor-not-allowed"
                            : "border-border bg-card hover:border-primary/50 text-foreground"
                        }`}
                      >
                        <span className="font-serif text-base font-medium">EU {s.eu}</span>
                        <span className="text-[0.65rem] text-muted-foreground">US {s.us}</span>
                        {s.stock > 0 && s.stock <= 2 && (
                          <span className="absolute -top-1.5 -right-1 bg-primary text-primary-foreground text-[0.55rem] px-1 py-0.2 font-sans font-bold uppercase tracking-tighter">
                            {s.stock} left
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Fit summary notification */}
                <p className="mt-3 text-[0.72rem] text-muted-foreground/90 italic">
                  * {edition.sizing.fitAdvice}
                </p>
              </div>

              {/* Reservation CTA Action */}
              <div className="pt-2">
                <button
                  onClick={() => setIsReservationOpen(true)}
                  className="w-full relative group overflow-hidden border border-primary bg-primary text-primary-foreground py-4 px-6 transition-all duration-300 hover:shadow-gold hover:bg-primary/95 flex items-center justify-center gap-3"
                >
                  <span className="font-sans text-xs uppercase tracking-[0.25em] font-semibold">
                    Request Numbered Allocation · {edition.editionNumber}
                  </span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>

                {/* Reservation Guarantees */}
                <div className="mt-4 grid grid-cols-3 gap-2 text-[0.68rem] text-muted-foreground text-center">
                  <div className="p-2 border border-border/60 bg-secondary/20">
                    <span className="block text-primary font-serif mb-0.5">Zero Prepayment</span>
                    <span>Verified by concierge</span>
                  </div>
                  <div className="p-2 border border-border/60 bg-secondary/20">
                    <span className="block text-primary font-serif mb-0.5">Gold Insole Monogram</span>
                    <span>Complimentary</span>
                  </div>
                  <div className="p-2 border border-border/60 bg-secondary/20">
                    <span className="block text-primary font-serif mb-0.5">Archive Certificate</span>
                    <span>Wax sealed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Materials Section */}
        <MaterialsSection edition={edition} />

        {/* Atelier Provenance Banner */}
        <section className="py-16 border-t border-border bg-secondary/20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="border border-primary/30 p-8 sm:p-12 relative overflow-hidden bg-card/60 backdrop-blur">
              <div className="max-w-2xl">
                <span className="kicker text-primary mb-2 block">Provenance & Cordwainer Guarantee</span>
                <h3 className="font-serif text-3xl sm:text-4xl text-foreground">
                  Bench-crafted in Brera under the supervision of {edition.provenance.cordwainer}.
                </h3>
                <p className="mt-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Every numbered shoe is shaped, welted, and hand-rubbed over {edition.provenance.productionHours} hours of focused cobbler work. Each pair comes with authenticated certificate{" "}
                  <code className="text-primary font-mono">{edition.provenance.serialCertificate}</code>.
                </p>
                <div className="mt-6 flex flex-wrap gap-6 text-xs text-muted-foreground">
                  <div>
                    <span className="kicker block text-[0.62rem]">Workshop Location</span>
                    <span className="text-foreground font-serif">{edition.provenance.benchLocation}</span>
                  </div>
                  <div>
                    <span className="kicker block text-[0.62rem]">Artisan Work</span>
                    <span className="text-foreground font-serif">{edition.provenance.productionHours} Hours Single-Artisan</span>
                  </div>
                  <div>
                    <span className="kicker block text-[0.62rem]">Atelier Service</span>
                    <span className="text-foreground font-serif">Lifetime Complimentary Resoling</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Allocations */}
        <RelatedEditions currentId={edition.id} />
      </main>

      {/* Sticky Bottom Reservation Bar on Scroll */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-md px-6 py-3.5 shadow-2xl"
          >
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={edition.heroImage}
                  alt={edition.name}
                  className="h-10 w-10 object-contain hidden sm:block border border-border p-0.5"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-base text-foreground font-medium">{edition.name}</span>
                    <span className="kicker text-[0.65rem] text-primary hidden md:inline">({edition.editionNumber})</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {edition.price} · {selectedSize ? `EU ${selectedSize}` : "Choose Size"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsSizingModalOpen(true)}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition border border-border px-3 py-2"
                >
                  <Ruler className="h-3 w-3" />
                  <span>Size Guide</span>
                </button>
                <button
                  onClick={() => setIsReservationOpen(true)}
                  className="border border-primary bg-primary text-primary-foreground px-5 py-2.5 font-sans text-xs uppercase tracking-[0.2em] font-semibold hover:bg-primary/90 transition shadow-gold"
                >
                  Reserve {edition.name}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <SizingGuideModal
        isOpen={isSizingModalOpen}
        onClose={() => setIsSizingModalOpen(false)}
        sizes={edition.sizing.sizes}
        selectedSize={selectedSize}
        onSelectSize={(size) => setSelectedSize(size)}
        fitAdvice={edition.sizing.fitAdvice}
      />

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        edition={edition}
        selectedSize={selectedSize}
      />

      <Footer />
    </div>
  );
};

export default ProductDetail;
