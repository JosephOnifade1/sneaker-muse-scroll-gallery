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
        <h1 className="font-display text-4xl mb-4 font-black">Edition not found</h1>
        <p className="text-muted-foreground text-sm mb-6">
          This specimen is unavailable or has been retired from the archive.
        </p>
        <Link
          to="/"
          className="btn-primary"
        >
          Back to specimens
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
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/40 pb-4">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-primary transition px-2 py-1 rounded-full hover:bg-white/5">Lab</Link>
              <span className="text-border">·</span>
              <Link to="/#vault" className="hover:text-primary transition px-2 py-1 rounded-full hover:bg-white/5">Specimens</Link>
              <span className="text-border">·</span>
              <span className="text-foreground font-medium">{edition.name}</span>
            </div>

            <Link
              to="/#vault"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition rounded-full border border-border/50 px-3 py-1.5 hover:border-primary/40"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>All specimens</span>
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
                variant={
                  edition.id === "proto-01-dune" || edition.slug === "the-regatta" || edition.slug === "proto-01-dune"
                    ? "dune"
                    : edition.id === "proto-01-slate" || edition.slug === "the-chancellor" || edition.slug === "proto-01-slate"
                    ? "slate"
                    : "noir"
                }
              />
            </div>

            {/* Right: Product Spec & Reservation Console */}
            <div className="lg:col-span-5 flex flex-col gap-6 lg:pl-4">
              {/* Top Meta */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="kicker">{edition.series}</p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full border border-border/50 bg-secondary/40 text-[0.65rem] font-medium text-muted-foreground tracking-wide">
                    {edition.status}
                  </span>
                </div>

                <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight text-foreground">
                  {edition.name}
                </h1>
                <p className="text-base text-muted-foreground mt-1">
                  {edition.sub}
                </p>

                <div className="mt-5 flex items-baseline gap-4 border-b border-border/40 pb-6">
                  <span className="font-display text-3xl sm:text-4xl text-primary font-black">
                    {edition.price}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Bespoke delivery included
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

              {/* Colorway / Edition Info */}
              <div className="rounded-xl border border-border/50 bg-card/50 p-4 flex justify-between items-center">
                <div>
                  <span className="kicker block mb-0.5">Colorway</span>
                  <span className="text-sm font-medium text-foreground">{edition.colorway}</span>
                </div>
                <div className="text-right">
                  <span className="kicker block mb-0.5">Allocation</span>
                  <span className="text-sm font-medium text-primary">{edition.editionNumber}</span>
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
                        className={`relative flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 ${
                          isSelected
                            ? "border-primary bg-primary/10 text-primary ring-2 ring-primary/30 shadow-gold"
                            : isSoldOut
                            ? "border-border/30 bg-secondary/20 opacity-40 cursor-not-allowed"
                            : "border-border/60 bg-card hover:border-primary/50 text-foreground"
                        }`}
                      >
                        <span className="font-semibold text-sm">EU {s.eu}</span>
                        <span className="text-[0.65rem] text-muted-foreground">US {s.us}</span>
                        {s.stock > 0 && s.stock <= 2 && (
                          <span className="absolute -top-2 -right-1 rounded-full bg-primary text-primary-foreground text-[0.55rem] px-1.5 py-0.5 font-bold">
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

              {/* Reservation CTA */}
              <div className="pt-2">
                <button
                  onClick={() => setIsReservationOpen(true)}
                  className="w-full group rounded-2xl bg-primary text-primary-foreground py-4 px-6 transition-all duration-300 hover:shadow-gold hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 font-semibold text-sm"
                >
                  <span>Reserve · {edition.editionNumber}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>

                {/* Guarantee Pills */}
                <div className="mt-4 grid grid-cols-3 gap-2 text-[0.68rem] text-muted-foreground text-center">
                  <div className="rounded-xl p-3 border border-border/40 bg-card/50">
                    <span className="block text-primary font-semibold mb-0.5">No prepayment</span>
                    <span>Concierge verified</span>
                  </div>
                  <div className="rounded-xl p-3 border border-border/40 bg-card/50">
                    <span className="block text-primary font-semibold mb-0.5">Insole monogram</span>
                    <span>Complimentary</span>
                  </div>
                  <div className="rounded-xl p-3 border border-border/40 bg-card/50">
                    <span className="block text-primary font-semibold mb-0.5">Archive cert.</span>
                    <span>Wax sealed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Materials Section */}
        <MaterialsSection edition={edition} />

        {/* Laboratory Certification Banner */}
        <section className="py-16 border-t border-border/40 bg-secondary/10">
          <div className="mx-auto max-w-7xl px-6">
            <div className="rounded-2xl border border-border/50 p-8 sm:p-12 relative overflow-hidden bg-card/60 backdrop-blur">
              <div className="max-w-2xl">
                <p className="kicker mb-3">Laboratory certification & quality assurance</p>
                <h3 className="font-display text-2xl sm:text-3xl text-foreground font-black">
                  Engineered in Kyoto & Milan under the supervision of {edition.provenance.cordwainer}.
                </h3>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  Every numbered specimen is laser-scanned, stress-calibrated, and hand-finished over {edition.provenance.productionHours} hours of precision assembly. Each pair ships with hardware serial{" "}
                  <code className="text-primary text-xs bg-primary/10 px-1.5 py-0.5 rounded">{edition.provenance.serialCertificate}</code>.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {[
                    { label: "Facility", val: edition.provenance.benchLocation },
                    { label: "Assembly", val: `${edition.provenance.productionHours}h robotic & hand-finished` },
                    { label: "Warranty", val: "Lifetime structural recalibration" },
                  ].map(({ label, val }) => (
                    <div key={label} className="rounded-xl border border-border/40 bg-secondary/40 px-4 py-3">
                      <span className="kicker block mb-0.5">{label}</span>
                      <span className="text-sm font-medium text-foreground">{val}</span>
                    </div>
                  ))}
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

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsSizingModalOpen(true)}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition rounded-full border border-border/60 px-3 py-2 hover:border-primary/40"
                >
                  <Ruler className="h-3 w-3" />
                  <span>Size guide</span>
                </button>
                <button
                  onClick={() => setIsReservationOpen(true)}
                  className="rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-xs font-semibold hover:shadow-gold hover:scale-[1.02] transition-all duration-200"
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
