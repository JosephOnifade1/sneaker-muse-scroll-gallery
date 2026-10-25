import { motion, useScroll, useTransform, useMotionValueEvent, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import detailStamp from "@/assets/detail-stamp.jpg";
import detailSole from "@/assets/detail-sole.jpg";
import { Sneaker3DCanvas } from "@/components/Sneaker3DCanvas";

const steps = [
  {
    n: "01",
    t: "Composite Exoskeleton",
    sub: "Parametric lattice & Toray ballistic mesh",
    d: "Generatively designed lattice mesh with dual-density TPU reinforcement zones. Engineered to yield maximum tensile endurance with minimal weight penalty across multi-axis loading.",
    x: "56%",
    y: "36%",
    tag: "Lattice · Carbon Matrix",
    spec: "13,540 surfaces · Poly-tensile weave",
    telemetry: { load: "4.8 kN", tare: "142g", tol: "±0.08mm" },
    macroImg: null,
    macroCaption: null,
  },
  {
    n: "02",
    t: "Kinetic Heel Stabilizer",
    sub: "Asymmetric biomechanical chassis",
    d: "Thermoplastic heel counter contoured directly to the calcaneus bone. Locks heel slip during extreme lateral torque while maintaining zero pressure along the Achilles tendon.",
    x: "16%",
    y: "34%",
    tag: "Chassis · TPU Rear-lock",
    spec: "Dynamic flex core · 0° pronation drift",
    telemetry: { load: "7.2 kN", tare: "88g", tol: "±0.05mm" },
    macroImg: detailStamp,
    macroCaption: "Calibration Stamp",
  },
  {
    n: "03",
    t: "Tension Lace Harness",
    sub: "Multi-anchor cable suspension",
    d: "Continuous synthetic tendon harness distributes downward lace force uniformly across the navicular bridge, eliminating pressure hot spots over 10,000 continuous strides.",
    x: "38%",
    y: "62%",
    tag: "Harness · Kevlar runners",
    spec: "Micro-adjust cable anchor system",
    telemetry: { load: "2.1 kN", tare: "24g", tol: "±0.02mm" },
    macroImg: detailSole,
    macroCaption: "Cable routing",
  },
  {
    n: "04",
    t: "Decoupled Outsole",
    sub: "Segmented dual-density architecture",
    d: "Split forefoot and rearfoot geometry joined by an internal carbon propulsion bridge. Allows independent natural pronation and instantaneous kinetic energy return.",
    x: "62%",
    y: "74%",
    tag: "Outsole · Split chassis",
    spec: "Dual-durometer nitrogen compound",
    telemetry: { load: "9.5 kN", tare: "131g", tol: "±0.10mm" },
    macroImg: detailSole,
    macroCaption: "Traction pods",
  },
];

const Anatomy = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 70, damping: 20 });
  const [active, setActive] = useState(0);
  const [scrollVal, setScrollVal] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setScrollVal(v);
    setActive(Math.min(steps.length - 1, Math.floor(v * steps.length)));
  });

  const rotateY = useTransform(p, [0, 0.33, 0.66, 1], [0, -32, 18, 0]);
  const rotateX = useTransform(p, [0, 0.33, 0.66, 1], [8, 14, 28, 52]);
  const scale = useTransform(p, [0, 0.33, 0.66, 1], [1, 1.15, 1.18, 1.12]);
  const x = useTransform(p, [0, 0.33, 0.66, 1], ["0%", "6%", "-4%", "0%"]);
  const y = useTransform(p, [0, 0.33, 0.66, 1], ["0%", "-2%", "-1%", "3%"]);
  const line = useTransform(p, [0, 1], ["0%", "100%"]);

  const shadowScaleX = useTransform(p, [0, 0.33, 0.66, 1], [1, 0.9, 1.05, 0.85]);
  const shadowOpacity = useTransform(p, [0, 0.33, 0.66, 1], [0.35, 0.28, 0.3, 0.2]);

  const mx = useMotionValue(0), my = useMotionValue(0);
  const tx = useSpring(useTransform(mx, [-1, 1], [-10, 10]), { stiffness: 80, damping: 18 });
  const ty = useSpring(useTransform(my, [-1, 1], [8, -8]), { stiffness: 80, damping: 18 });

  const [mouseCoord, setMouseCoord] = useState({ x: 0, y: 0 });

  useMotionValueEvent(tx, "change", (latestTx) => {
    const latestTy = ty.get();
    setMouseCoord({ x: latestTx / 10, y: latestTy / 8 });
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    const normX = (e.clientX / window.innerWidth) * 2 - 1;
    const normY = (e.clientY / window.innerHeight) * 2 - 1;
    mx.set(normX);
    my.set(normY);
  };

  const scrollToStep = (index: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const sectionStart = scrollTop + rect.top;
    const scrollDistance = ref.current.offsetHeight - window.innerHeight;
    const targetScroll = sectionStart + (index / (steps.length - 1)) * scrollDistance;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const currentStep = steps[active] || steps[0];

  return (
    <section id="anatomy" ref={ref} className="relative h-[400vh]" onMouseMove={handleMouseMove}>
      <div className="sticky top-0 grid h-screen items-center gap-8 overflow-hidden px-6 md:grid-cols-[1fr_1.4fr] md:px-16 bg-vignette dot-grid">

        {/* Left Column: Step Narrative */}
        <div className="relative z-10 max-w-md">
          {/* Section Label */}
          <div className="flex items-center gap-2 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-slow" />
            <p className="kicker">Anatomy of craft · 4 phases</p>
          </div>

          {/* Animated Step Content */}
          <div className="relative h-80">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                className="absolute inset-0"
                animate={{
                  opacity: active === i ? 1 : 0,
                  y: active === i ? 0 : active > i ? -35 : 35,
                }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-6xl font-black text-primary/70">{s.n}</span>
                  <span className="text-xs text-muted-foreground tracking-widest uppercase font-medium">
                    Phase {s.n} of {steps.length}
                  </span>
                </div>

                <h3 className="mt-2 font-display text-3xl sm:text-4xl font-black tracking-tight text-foreground">
                  {s.t}
                </h3>
                <p className="text-xs text-primary/80 tracking-wide mt-1 font-medium">
                  {s.sub}
                </p>

                <p className="mt-4 leading-relaxed text-sm text-muted-foreground">
                  {s.d}
                </p>

                {/* Metrics Card — rounded, no harsh borders */}
                <div className="mt-5 grid grid-cols-3 gap-2">
                  {[
                    { label: "Load rating", val: s.telemetry.load },
                    { label: "Weight", val: s.telemetry.tare },
                    { label: "Tolerance", val: s.telemetry.tol },
                  ].map(({ label, val }) => (
                    <div key={label} className="rounded-xl bg-secondary/80 border border-border/50 p-3">
                      <span className="block text-[0.58rem] uppercase tracking-wider text-muted-foreground mb-1">
                        {label}
                      </span>
                      <span className="text-sm font-bold text-primary">{val}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-8 h-0.5 w-full rounded-full bg-border/40">
            <motion.div style={{ width: line }} className="h-full rounded-full bg-primary" />
          </div>

          {/* Step Navigation — rounded pill tabs */}
          <div className="mt-4 flex gap-1.5">
            {steps.map((s, i) => (
              <button
                key={s.n}
                onClick={() => scrollToStep(i)}
                className={`flex-1 rounded-full px-2 py-1.5 text-[0.68rem] font-medium tracking-wide transition-all duration-200 ${
                  active === i
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/80 border border-border/50"
                }`}
                aria-label={`Jump to phase ${s.n}: ${s.t}`}
              >
                {s.n}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: 3D Display */}
        <div className="relative flex items-center justify-center h-[75vh] w-full">

          {/* 3D Canvas — always shown */}
          <div className="relative h-full w-full flex items-center justify-center">
            <Sneaker3DCanvas
              scrollProgress={scrollVal}
              mouseX={mouseCoord.x}
              mouseY={mouseCoord.y}
              variant="noir"
              mode="anatomy"
              className="h-full w-full"
            />

            {/* Clean target label */}
            <div className="pointer-events-none absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/90 border border-primary/40 backdrop-blur text-xs font-medium text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-slow" />
                {currentStep.tag}
              </span>
            </div>

            {/* Subtle corner brackets */}
            <div className="pointer-events-none absolute inset-x-8 inset-y-12 border border-border/20 rounded-2xl">
              <div className="absolute -top-1.5 -left-1.5 h-3 w-3 border-l-2 border-t-2 border-primary/60 rounded-tl" />
              <div className="absolute -top-1.5 -right-1.5 h-3 w-3 border-r-2 border-t-2 border-primary/60 rounded-tr" />
              <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 border-b-2 border-l-2 border-primary/60 rounded-bl" />
              <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3 border-b-2 border-r-2 border-primary/60 rounded-br" />
            </div>
          </div>

          {/* Floating Macro Loupe */}
          <div className="pointer-events-none absolute bottom-4 right-4 z-20 max-w-[280px]">
            <AnimatePresence mode="wait">
              {currentStep.macroImg && (
                <motion.div
                  key={currentStep.n}
                  initial={{ opacity: 0, y: 16, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.92 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="pointer-events-auto rounded-2xl border border-border/60 bg-card/90 p-3 backdrop-blur shadow-gold flex items-center gap-3"
                >
                  <img
                    src={currentStep.macroImg}
                    alt={currentStep.macroCaption || currentStep.t}
                    className="h-14 w-14 rounded-xl object-cover border border-border/50"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="block text-[0.6rem] uppercase tracking-wider text-primary font-medium">
                      Close-up · Phase {currentStep.n}
                    </span>
                    <p className="font-semibold text-xs text-foreground truncate mt-0.5">
                      {currentStep.macroCaption}
                    </p>
                    <span className="block text-[0.6rem] text-muted-foreground truncate mt-0.5">
                      {currentStep.spec}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Anatomy;
