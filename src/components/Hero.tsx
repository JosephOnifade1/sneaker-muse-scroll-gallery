import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Sneaker3DCanvas } from "@/components/Sneaker3DCanvas";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const heroEditions = [
  {
    id: "noir" as const,
    slug: "proto-01-noir",
    name: "NOIR",
    sub: "150 pairs · Series I · $680",
    tagline: "Matte carbon lattice · Ballistic mesh · Decoupled chassis",
    swatchHex: "#0c0d10",
    borderHex: "#38bdf8",
    label: "Noir",
    number: "018 / 150",
  },
  {
    id: "dune" as const,
    slug: "proto-01-dune",
    name: "DUNE",
    sub: "200 pairs · Series I · $720",
    tagline: "Sand nubuck overlay · Kinetic tendon lacing · Desert composite",
    swatchHex: "#bba882",
    borderHex: "#f59e0b",
    label: "Dune",
    number: "064 / 200",
  },
  {
    id: "slate" as const,
    slug: "proto-01-slate",
    name: "SLATE",
    sub: "100 pairs · Series I · $750",
    tagline: "White membrane · Cyan structural weld · 385g tare weight",
    swatchHex: "#e2e8f0",
    borderHex: "#00f0ff",
    label: "Slate",
    number: "009 / 100",
  },
];


const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  const [scrollVal, setScrollVal] = useState(0);
  const [selectedEditionId, setSelectedEditionId] = useState<"noir" | "dune" | "slate">("noir");
  const [mouseCoord, setMouseCoord] = useState({ x: 0, y: 0 });

  const currentEdition = heroEditions.find((e) => e.id === selectedEditionId) || heroEditions[0];

  useMotionValueEvent(p, "change", (latest) => {
    setScrollVal(latest);
  });

  const titleY = useTransform(p, [0, 1], ["0%", "-60%"]);
  const titleOpacity = useTransform(p, [0, 0.35], [1, 0]);
  const word2 = useTransform(p, [0.4, 0.7], [0, 1]);
  const word2Y = useTransform(p, [0.4, 0.7], [60, 0]);

  const mx = useMotionValue(0), my = useMotionValue(0);
  const tx = useSpring(useTransform(mx, [-1, 1], [-15, 15]), { stiffness: 70, damping: 15 });
  const ty = useSpring(useTransform(my, [-1, 1], [12, -12]), { stiffness: 70, damping: 15 });

  useMotionValueEvent(tx, "change", (latestTx) => {
    const latestTy = ty.get();
    setMouseCoord({ x: latestTx / 15, y: latestTy / 12 });
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    const normX = (e.clientX / window.innerWidth) * 2 - 1;
    const normY = (e.clientY / window.innerHeight) * 2 - 1;
    mx.set(normX);
    my.set(normY);
  };

  return (
    <section id="hero" ref={ref} className="relative h-[300vh]" onMouseMove={handleMouseMove}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-vignette dot-grid">

        {/* Top ambient info bar — clean, no slash noise */}
        <div className="pointer-events-none absolute top-20 inset-x-0 px-6 sm:px-12 flex justify-between items-center text-[0.65rem] tracking-wide text-muted-foreground z-10">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium text-[0.65rem] tracking-widest uppercase">
              R&D Specimen
            </span>
            <span className="hidden sm:inline">Kyoto · Milano · Seoul</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-muted-foreground/60">
            <span>13,540 mesh surfaces</span>
            <span className="inline-block w-1 h-1 rounded-full bg-emerald-400/80" />
            <span className="text-emerald-400/80">PBR active</span>
          </div>
        </div>

        {/* Scrolling Title Block */}
        <motion.div style={{ y: titleY, opacity: titleOpacity }} className="pointer-events-none absolute inset-x-0 top-[13%] text-center z-10 px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentEdition.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5 }}
            >
              <p className="kicker mb-3">{currentEdition.sub}</p>
              <h1 className="font-display text-[18vw] leading-[0.82] md:text-[10vw] font-black tracking-tighter text-foreground uppercase">
                {currentEdition.name.split("").map((c, i) => (
                  <motion.span
                    key={`${currentEdition.id}-${i}`}
                    className="inline-block"
                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: 0.1 + i * 0.04, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {c}
                  </motion.span>
                ))}
              </h1>
              <p className="mt-3 text-sm tracking-[0.18em] text-muted-foreground uppercase font-medium">
                Kinesis Proto — 01
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Bottom Tagline Block */}
        <motion.div style={{ opacity: word2, y: word2Y }} className="pointer-events-none absolute inset-x-0 bottom-[10%] text-center z-10 px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentEdition.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-sm text-muted-foreground mb-2">{currentEdition.tagline}</p>
              <p className="font-display font-bold text-xl md:text-3xl tracking-tight text-foreground">
                Form generated by algorithm.{" "}
                <span className="text-gold">Built for kinesis.</span>
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Central Display */}
        <div className="relative mt-12 w-[95vw] max-w-5xl h-[72vh] flex items-center justify-center">
          <div className="relative h-full w-full">
            <Sneaker3DCanvas
              scrollProgress={scrollVal}
              mouseX={mouseCoord.x}
              mouseY={mouseCoord.y}
              variant={selectedEditionId}
              className="h-full w-full"
            />
          </div>

          {/* Colorway Selector */}
          <div className="absolute top-3 left-4 z-20 flex items-center gap-1.5 rounded-2xl border border-border/60 bg-card/90 backdrop-blur-md px-2 py-2">
            <span className="hidden sm:inline px-2 text-[0.6rem] uppercase tracking-widest text-muted-foreground/50 font-medium">
              Colorway
            </span>
            {heroEditions.map((ed) => {
              const isSelected = selectedEditionId === ed.id;
              return (
                <button
                  key={ed.id}
                  onClick={() => setSelectedEditionId(ed.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.68rem] font-medium tracking-wide transition-all duration-200 ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-gold"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                  aria-label={`Select ${ed.label} colorway`}
                >
                  <span
                    className="h-2 w-2 rounded-full border flex-shrink-0"
                    style={{ backgroundColor: ed.swatchHex, borderColor: ed.borderHex }}
                  />
                  {ed.label}
                </button>
              );
            })}
            <Link
              to={`/editions/${currentEdition.slug}`}
              className="hidden lg:flex items-center gap-1 ml-1 pl-2 border-l border-border/50 text-[0.68rem] text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Inspect
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Scroll Prompt */}
        <motion.div style={{ opacity: titleOpacity }} className="absolute bottom-7 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground font-medium">
            Scroll to rotate 360°
          </span>
          <motion.div
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mx-auto mt-2 h-8 w-px bg-primary/60"
          />
        </motion.div>
      </div>
    </section>
  );
};
export default Hero;
