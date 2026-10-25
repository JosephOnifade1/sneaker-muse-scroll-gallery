import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Shield, Compass, Layers, Check, Hammer } from "lucide-react";
import type { Edition } from "@/data/editions";

interface MaterialsSectionProps {
  edition: Edition;
}

export const MaterialsSection = ({ edition }: MaterialsSectionProps) => {
  const [activeTab, setActiveTab] = useState<"upper" | "lining" | "sole" | "hardware" | "packaging">("upper");

  const tabs: { key: typeof activeTab; label: string; icon: typeof Sparkles }[] = [
    { key: "upper", label: "Composite Exoskeleton", icon: Sparkles },
    { key: "lining", label: "Membrane Lining", icon: Layers },
    { key: "sole", label: "Decoupled Chassis", icon: Hammer },
    { key: "hardware", label: "Tension Harness", icon: Shield },
    { key: "packaging", label: "Obsidian Case & Key", icon: Compass },
  ];

  const currentMaterial = edition.materials[activeTab];

  return (
    <section className="py-20 border-t border-border/80">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-14 max-w-2xl">
          <p className="kicker mb-3">Material architecture & specifications</p>
          <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-foreground">
            Engineered composites.{" "}
            <span className="text-gold">Extreme rigidity.</span>
          </h2>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Every composite, weave, and alloy in {edition.name} is selected to optimize strength-to-weight ratio and dynamic load dispersion.
          </p>
        </div>

        {/* Interactive Materials Explorer */}
        <div className="grid gap-10 lg:grid-cols-12 items-start">
          {/* Tabs navigation */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            <p className="kicker mb-1 text-muted-foreground/60">Select subsystem</p>
            {tabs.map((t) => {
              const Icon = t.icon;
              const isSelected = activeTab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-300 ${
                    isSelected
                      ? "border-primary bg-card ring-2 ring-primary/30 shadow-gold"
                      : "border-border/50 bg-card/30 hover:border-border hover:bg-card/60 opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="text-sm font-semibold text-foreground">{t.label}</span>
                  </div>
                  {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                </button>
              );
            })}

            {/* Clean callout card */}
            <div className="mt-6 rounded-xl border border-border/40 bg-secondary/30 p-4">
              <p className="kicker mb-2">Stress calibration promise</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                All lattice matrices and decoupled soles undergo rigorous multi-axis hydraulic compression testing rated up to 10 kN.
              </p>
            </div>
          </div>

          {/* Detailed view of active component */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl border border-border/50 bg-card p-6 sm:p-10 relative overflow-hidden"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/40 pb-6">
                  <div>
                    <span className="kicker">Component origin</span>
                    <h3 className="font-display text-3xl sm:text-4xl font-black mt-1 text-foreground">
                      {currentMaterial.title}
                    </h3>
                    <p className="text-xs text-primary font-medium mt-1">
                      {currentMaterial.origin}
                    </p>
                  </div>
                  {currentMaterial.badge && (
                    <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                      {currentMaterial.badge}
                    </span>
                  )}
                </div>

                <div className="my-8">
                  <p className="text-base sm:text-lg text-foreground/90 leading-relaxed">
                    {currentMaterial.description}
                  </p>
                  {currentMaterial.tannery && (
                    <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="kicker">Tannery reference:</span>
                      <span className="text-foreground font-medium">{currentMaterial.tannery}</span>
                    </div>
                  )}
                </div>

                {/* Specifications Grid */}
                <div className="border-t border-border/40 pt-6">
                  <p className="kicker mb-4">Specifications</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {edition.specifications.map((spec) => (
                      <div key={spec.label} className="rounded-xl p-3 bg-secondary/40 border border-border/40">
                        <span className="block kicker mb-1">{spec.label}</span>
                        <span className="font-semibold text-sm text-foreground">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Editorial Story / Craftsmanship Quote */}
        <div className="mt-16 border-t border-border pt-14 grid gap-8 md:grid-cols-3">
          {edition.story.map((paragraph, index) => (
            <div key={index} className="relative pl-6 border-l border-primary/40">
              <span className="font-serif text-4xl text-primary/40 absolute -top-3 left-0 -translate-x-1/2 bg-background px-1">
                0{index + 1}
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed pt-2">
                {paragraph}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
