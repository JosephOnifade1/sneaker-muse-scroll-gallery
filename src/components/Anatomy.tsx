import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import shoe from "@/assets/hero-shoe.png";

const steps = [
  { n: "I", t: "The Upper", d: "Full-grain Tuscan calfskin, aged for forty days and burnished by hand until it holds the light like old saddle leather.", x: "55%", y: "38%" },
  { n: "II", t: "The Heel", d: "Cognac suede counter, gold-foil stamped with the house name. Nothing louder is ever needed.", x: "12%", y: "35%" },
  { n: "III", t: "The Stitch", d: "Eleven stitches to the inch, waxed linen thread, sewn by one artisan from first cut to final lace.", x: "40%", y: "62%" },
  { n: "IV", t: "The Sole", d: "Natural gum rubber, Blake-stitched so every pair may be resoled in our atelier for a lifetime.", x: "70%", y: "80%" },
];

const Anatomy = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 70, damping: 20 });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(steps.length - 1, Math.floor(v * steps.length))));

  const rotateY = useTransform(p, [0, 0.33, 0.66, 1], [0, -35, 20, 0]);
  const rotateX = useTransform(p, [0, 0.5, 1], [10, 30, 55]);
  const scale = useTransform(p, [0, 0.5, 1], [1, 1.15, 1.05]);
  const line = useTransform(p, [0, 1], ["0%", "100%"]);

  return (
    <section id="anatomy" ref={ref} className="relative h-[400vh]">
      <div className="sticky top-0 grid h-screen items-center gap-8 overflow-hidden px-6 md:grid-cols-[1fr_1.4fr] md:px-16">
        <div className="relative z-10 max-w-md">
          <p className="kicker mb-6">The Anatomy of Craft</p>
          <div className="relative h-72">
            {steps.map((s, i) => (
              <motion.div key={s.n} className="absolute inset-0" animate={{ opacity: active === i ? 1 : 0, y: active === i ? 0 : active > i ? -40 : 40 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                <span className="font-serif text-7xl text-gold">{s.n}</span>
                <h3 className="mt-2 font-serif text-5xl">{s.t}</h3>
                <p className="mt-6 leading-relaxed text-muted-foreground">{s.d}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 h-px w-full bg-border"><motion.div style={{ width: line }} className="h-px bg-primary" /></div>
          <div className="mt-3 flex justify-between kicker text-muted-foreground">{steps.map((s, i) => <span key={s.n} className={active === i ? "text-primary" : ""}>{s.n}</span>)}</div>
        </div>

        <div style={{ perspective: 1200 }} className="relative">
          <motion.div style={{ rotateY, rotateX, scale }} className="preserve-3d relative">
            <img src={shoe} alt="Sneaker anatomy" loading="lazy" width={1536} height={1024} className="w-full" />
            {steps.map((s, i) => (
              <motion.div key={s.n} className="absolute" style={{ left: s.x, top: s.y }} animate={{ scale: active === i ? 1 : 0.6, opacity: active === i ? 1 : 0.35 }}>
                <span className="relative flex h-5 w-5 items-center justify-center">
                  {active === i && <span className="absolute h-full w-full animate-ping rounded-full bg-primary/60" />}
                  <span className="h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-primary/20" />
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default Anatomy;
