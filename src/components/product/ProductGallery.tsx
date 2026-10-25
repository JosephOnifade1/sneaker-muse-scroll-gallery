import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ChevronLeft, ChevronRight, Eye, Box, Image as ImageIcon } from "lucide-react";
import type { GalleryItem } from "@/data/editions";
import { Sneaker3DCanvas } from "@/components/Sneaker3DCanvas";

interface ProductGalleryProps {
  items: GalleryItem[];
  shoeName: string;
  editionNumber: string;
  variant?: "ivory" | "green" | "oxblood" | "noir" | "dune" | "slate";
}

export const ProductGallery = ({ items, shoeName, editionNumber, variant = "noir" }: ProductGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [is3DMode, setIs3DMode] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const current = items[activeIndex] || items[0];

  const handlePrev = () => {
    if (is3DMode) {
      setIs3DMode(false);
      setActiveIndex(items.length - 1);
      return;
    }
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (is3DMode) {
      setIs3DMode(false);
      setActiveIndex(0);
      return;
    }
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Main Feature Viewport */}
      <div className="relative aspect-square sm:aspect-[4/3] w-full overflow-hidden border border-border bg-card/60 backdrop-blur-sm group">
        {/* Subtle corner ticks for atelier blueprints feel */}
        <div className="pointer-events-none absolute left-3 top-3 h-2 w-2 border-l border-t border-primary/50" />
        <div className="pointer-events-none absolute right-3 top-3 h-2 w-2 border-r border-t border-primary/50" />
        <div className="pointer-events-none absolute bottom-3 left-3 h-2 w-2 border-b border-l border-primary/50" />
        <div className="pointer-events-none absolute bottom-3 right-3 h-2 w-2 border-b border-r border-primary/50" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-3">
          <span className="kicker bg-background/80 px-2.5 py-1 text-[0.65rem] backdrop-blur border border-border">
            {editionNumber}
          </span>
          <span className="hidden sm:inline-block font-sans text-xs text-muted-foreground/90 tracking-widest uppercase">
            {is3DMode ? "Real-time 3D View" : current.title}
          </span>
        </div>

        {/* Mode switchers & Zoom trigger */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <button
            onClick={() => setIs3DMode(!is3DMode)}
            className={`flex items-center gap-1.5 border px-2.5 py-1 text-xs backdrop-blur transition-all ${
              is3DMode
                ? "border-primary bg-primary text-background font-bold shadow-gold"
                : "border-border bg-background/80 text-muted-foreground hover:text-primary hover:border-primary/50"
            }`}
            aria-label="Toggle 3D Mode"
          >
            <Box className="h-3.5 w-3.5" />
            <span className="text-[0.68rem] uppercase tracking-wider">
              {is3DMode ? "3D Active" : "3D Orbit"}
            </span>
          </button>

          {!is3DMode && (
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="flex items-center gap-1.5 border border-border bg-background/80 px-2.5 py-1 text-xs text-muted-foreground backdrop-blur transition-colors hover:text-primary hover:border-primary/50"
              aria-label="Inspect high resolution"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline text-[0.68rem] uppercase tracking-wider">Inspect</span>
            </button>
          )}
        </div>

        {/* Active Showcase */}
        {is3DMode ? (
          <div className="h-full w-full p-4">
            <Sneaker3DCanvas
              interactive={true}
              variant={variant}
              mode="orbit"
              className="h-full w-full"
            />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full w-full items-center justify-center p-6 sm:p-12"
            >
              <img
                src={current.src}
                alt={`${shoeName} - ${current.title}`}
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)] transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          </AnimatePresence>
        )}

        {/* Bottom Caption Overlay */}
        <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between pointer-events-none">
          <div className="bg-background/85 backdrop-blur px-3 py-1.5 border border-border max-w-[85%]">
            <p className="font-serif text-sm italic text-foreground/90">
              {is3DMode ? "Interactive 3D Last" : current.title}
            </p>
            <p className="text-[0.72rem] text-muted-foreground tracking-wide font-sans">
              {is3DMode ? "Click and drag to rotate 360°" : current.subtitle}
            </p>
          </div>
          <span className="kicker text-[0.65rem] text-muted-foreground/80 hidden sm:inline">
            {is3DMode ? "3D Model" : `0${activeIndex + 1} / 0${items.length}`}
          </span>
        </div>

        {/* Navigation Arrows for Mobile & Desktop quick flip */}
        <button
          onClick={handlePrev}
          aria-label="Previous view"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/60 hover:bg-background border border-border/80 text-foreground transition opacity-0 group-hover:opacity-100 sm:opacity-80"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next view"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/60 hover:bg-background border border-border/80 text-foreground transition opacity-0 group-hover:opacity-100 sm:opacity-80"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Thumbnails Selector */}
      <div className="grid grid-cols-5 gap-3">
        {/* 3D Model thumbnail */}
        <button
          onClick={() => setIs3DMode(true)}
          className={`relative aspect-square overflow-hidden border p-2 bg-card text-left transition-all duration-300 flex flex-col items-center justify-center gap-1.5 ${
            is3DMode
              ? "border-primary ring-1 ring-primary/40 shadow-gold bg-primary/10 text-primary"
              : "border-border/70 opacity-70 hover:opacity-100 hover:border-border text-muted-foreground"
          }`}
        >
          <Box className="h-6 w-6 text-primary" />
          <span className="font-sans text-[0.6rem] uppercase tracking-widest font-bold">
            3D Orbit
          </span>
          {is3DMode && (
            <div className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-primary" />
          )}
        </button>

        {items.map((it, idx) => {
          const isActive = !is3DMode && idx === activeIndex;
          return (
            <button
              key={it.id}
              onClick={() => {
                setIs3DMode(false);
                setActiveIndex(idx);
              }}
              className={`relative aspect-square overflow-hidden border p-2 bg-card text-left transition-all duration-300 ${
                isActive
                  ? "border-primary ring-1 ring-primary/40 shadow-gold"
                  : "border-border/70 opacity-60 hover:opacity-100 hover:border-border"
              }`}
            >
              <img
                src={it.src}
                alt={it.title}
                className="h-full w-full object-contain object-center"
              />
              <div className="absolute bottom-1 left-1.5 hidden md:block">
                <span className="font-sans text-[0.6rem] uppercase tracking-wider text-muted-foreground">
                  0{idx + 1}
                </span>
              </div>
              {isActive && (
                <div className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>

      {/* Fullscreen High-Resolution Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col bg-background/95 backdrop-blur-xl p-4 sm:p-8"
          >
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <span className="kicker">{editionNumber}</span>
                <span className="text-muted-foreground">·</span>
                <span className="font-serif text-xl tracking-wide text-foreground">{shoeName}</span>
                <span className="hidden sm:inline-block text-xs text-muted-foreground italic">— {current.title}</span>
              </div>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="flex items-center gap-2 border border-border px-3 py-1 text-xs kicker hover:border-primary text-muted-foreground hover:text-foreground transition"
              >
                <span>Close</span>
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative flex flex-1 items-center justify-center overflow-hidden py-8">
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 border border-border bg-card/80 p-3 text-foreground hover:border-primary transition"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <motion.img
                key={`modal-${current.id}`}
                src={current.src}
                alt={current.title}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="max-h-[75vh] max-w-[85vw] object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
              />

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 border border-border bg-card/80 p-3 text-foreground hover:border-primary transition"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            <div className="flex items-center justify-between border-t pt-4">
              <p className="text-xs text-muted-foreground font-sans">
                {current.subtitle}
              </p>
              <div className="flex gap-2">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-1.5 transition-all ${
                      i === activeIndex ? "w-8 bg-primary" : "w-3 bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
