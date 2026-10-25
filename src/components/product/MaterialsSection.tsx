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
    { key: "upper", label: "Upper Leather", icon: Sparkles },
    { key: "lining", label: "Glove Lining", icon: Layers },
    { key: "sole", label: "Blake Welt Sole", icon: Hammer },
    { key: "hardware", label: "Hardware & Lacing", icon: Shield },
    { key: "packaging", label: "Suite & Cedar", icon: Compass },
  ];

  const currentMaterial = edition.materials[activeTab];

  return (
    <section className="py-20 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-14 max-w-2xl">
          <p className="kicker mb-3">Atelier Metallurgy & Tanning</p>
          <h2 className="font-serif text-4xl sm:text-5xl leading-tight">
            Materials chosen for a <em className="text-gold">lifetime of patina</em>.
          </h2>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Every component in {edition.name} is selected from heritage tanneries across Europe with verified full-grain provenance and zero synthetic finishes.
          </p>
        </div>

        {/* Interactive Materials Explorer */}
        <div className="grid gap-10 lg:grid-cols-12 items-start">
          {/* Tabs navigation */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            <p className="kicker text-[0.65rem] text-muted-foreground mb-1 uppercase tracking-widest">
              Select Component
            </p>
            {tabs.map((t) => {
              const Icon = t.icon;
              const isSelected = activeTab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`flex items-center justify-between p-4 border text-left transition-all duration-300 ${
                    isSelected
                      ? "border-primary bg-card ring-1 ring-primary/40 shadow-gold"
                      : "border-border/70 bg-card/40 hover:border-border hover:bg-card/70 opacity-75 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="font-serif text-lg tracking-wide">{t.label}</span>
                  </div>
                  {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                </button>
              );
            })}

            {/* Quick summary box */}
            <div className="mt-6 border border-border/70 p-4 bg-secondary/20 text-xs text-muted-foreground">
              <span className="kicker block text-[0.65rem] text-primary mb-1">Traceability Promise</span>
              <p className="leading-relaxed">
                Raw skins undergo botanical vegetable retanning using mimosa, chestnut, and tara powders without heavy metal salts.
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
                className="border border-border bg-card p-6 sm:p-10 relative overflow-hidden"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-6">
                  <div>
                    <span className="kicker text-[0.65rem] text-muted-foreground">
                      Component Origin
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl mt-1 text-foreground">
                      {currentMaterial.title}
                    </h3>
                    <p className="text-xs text-primary font-mono mt-1">
                      {currentMaterial.origin}
                    </p>
                  </div>
                  {currentMaterial.badge && (
                    <span className="border border-primary/50 bg-primary/10 px-3 py-1 font-serif text-sm text-primary">
                      {currentMaterial.badge}
                    </span>
                  )}
                </div>

                <div className="my-8">
                  <p className="text-base sm:text-lg text-foreground/90 font-serif leading-relaxed">
                    {currentMaterial.description}
                  </p>
                  {currentMaterial.tannery && (
                    <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="kicker text-[0.65rem]">Tannery Reference:</span>
                      <span className="font-mono text-foreground">{currentMaterial.tannery}</span>
                    </div>
                  )}
                </div>

                {/* Technical Specifications Matrix */}
                <div className="border-t border-border/80 pt-6">
                  <p className="kicker text-[0.65rem] text-muted-foreground mb-4">
                    Master Specifications Matrix
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {edition.specifications.map((spec) => (
                      <div key={spec.label} className="p-3 bg-secondary/30 border border-border/60">
                        <span className="block text-[0.65rem] kicker text-muted-foreground mb-1">
                          {spec.label}
                        </span>
                        <span className="font-serif text-base text-foreground">
                          {spec.value}
                        </span>
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
