import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef } from "react";
import shoe from "@/assets/hero-shoe.png";

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  const rotateY = useTransform(p, [0, 1], [-25, 340]);
  const rotateX = useTransform(p, [0, 0.5, 1], [18, -10, 25]);
  const rotateZ = useTransform(p, [0, 0.5, 1], [-12, 6, -20]);
  const scale = useTransform(p, [0, 0.5, 1], [1, 1.25, 0.6]);
  const y = useTransform(p, [0, 1], ["0%", "18%"]);
  const titleY = useTransform(p, [0, 1], ["0%", "-60%"]);
  const titleOpacity = useTransform(p, [0, 0.35], [1, 0]);
  const word2 = useTransform(p, [0.4, 0.7], [0, 1]);
  const word2Y = useTransform(p, [0.4, 0.7], [60, 0]);
  const shadowScale = useTransform(p, [0, 0.5, 1], [1, 0.7, 0.5]);

  const mx = useMotionValue(0), my = useMotionValue(0);
  const tx = useSpring(useTransform(mx, [-1, 1], [-12, 12]), { stiffness: 60, damping: 15 });
  const ty = useSpring(useTransform(my, [-1, 1], [10, -10]), { stiffness: 60, damping: 15 });

  return (
    <section ref={ref} className="relative h-[300vh]" onMouseMove={(e) => { mx.set((e.clientX / window.innerWidth) * 2 - 1); my.set((e.clientY / window.innerHeight) * 2 - 1); }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-vignette">
        <motion.div style={{ y: titleY, opacity: titleOpacity }} className="pointer-events-none absolute inset-x-0 top-[16%] text-center">
          <motion.p initial={{ opacity: 0, letterSpacing: "1em" }} animate={{ opacity: 1, letterSpacing: "0.35em" }} transition={{ duration: 2 }} className="kicker mb-6">Series VII · 350 Pairs Worldwide</motion.p>
          <h1 className="font-serif text-[16vw] leading-[0.85] md:text-[11vw]">
            {"Sovereign".split("").map((c, i) => (
              <motion.span key={i} className="inline-block" initial={{ opacity: 0, y: 80, rotateX: -90 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: 0.3 + i * 0.06, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>{c}</motion.span>
            ))}
          </h1>
          <p className="mt-2 font-serif text-2xl italic text-muted-foreground md:text-3xl">quietly, since 1924</p>
        </motion.div>

        <motion.div style={{ opacity: word2, y: word2Y }} className="pointer-events-none absolute inset-x-0 bottom-[12%] text-center">
          <p className="kicker mb-3">Tuscan calfskin · Hand-burnished · Gum sole</p>
          <p className="font-serif text-4xl md:text-6xl">Made <em className="text-gold">by hand</em>, never in haste.</p>
        </motion.div>

        <div style={{ perspective: 1400 }} className="relative mt-40 w-[80vw] max-w-2xl">
          <motion.div style={{ rotateX: ty, rotateY: tx }} className="preserve-3d">
            <motion.img
              src={shoe} alt="Aurelia Sovereign sneaker in ivory calfskin" width={1536} height={1024}
              initial={{ opacity: 0, x: 300, rotate: 25 }} animate={{ opacity: 1, x: 0, rotate: 0 }} transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              style={{ rotateY, rotateX, rotateZ, scale, y }}
              className="relative z-10 w-full drop-shadow-[0_40px_40px_hsl(var(--background))]"
            />
          </motion.div>
          <motion.div style={{ scaleX: shadowScale }} className="mx-auto -mt-10 h-8 w-2/3 rounded-[50%] bg-primary/20 blur-2xl" />
        </div>

        <motion.div style={{ opacity: titleOpacity }} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
          <span className="kicker text-muted-foreground">Scroll to turn</span>
          <motion.div animate={{ scaleY: [0, 1, 0], originY: 0 }} transition={{ repeat: Infinity, duration: 2 }} className="mx-auto mt-3 h-10 w-px bg-primary" />
        </motion.div>
      </div>
    </section>
  );
};
export default Hero;
