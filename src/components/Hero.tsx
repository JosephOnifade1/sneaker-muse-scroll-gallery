import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import shoe from "@/assets/hero-shoe.png";
import { Sneaker3DCanvas } from "@/components/Sneaker3DCanvas";
import { Box, Layers } from "lucide-react";

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  const [scrollVal, setScrollVal] = useState(0);
  const [use3D, setUse3D] = useState(true);
  const [mouseCoord, setMouseCoord] = useState({ x: 0, y: 0 });

  // Bind spring-smoothed scroll value
  useMotionValueEvent(p, "change", (latest) => {
    setScrollVal(latest);
  });

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
  const tx = useSpring(useTransform(mx, [-1, 1], [-15, 15]), { stiffness: 70, damping: 15 });
  const ty = useSpring(useTransform(my, [-1, 1], [12, -12]), { stiffness: 70, damping: 15 });

  // Update mouse springs smoothly
  useMotionValueEvent(tx, "change", (latestTx) => {
    // latestTx is between -15 and 15
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
    <section ref={ref} className="relative h-[300vh]" onMouseMove={handleMouseMove}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-vignette">
        {/* Ambient Top Title */}
        <motion.div style={{ y: titleY, opacity: titleOpacity }} className="pointer-events-none absolute inset-x-0 top-[14%] text-center z-10">
          <motion.p initial={{ opacity: 0, letterSpacing: "1em" }} animate={{ opacity: 1, letterSpacing: "0.35em" }} transition={{ duration: 2 }} className="kicker mb-4">Series VII · 350 Pairs Worldwide</motion.p>
          <h1 className="font-serif text-[15vw] leading-[0.85] md:text-[10vw]">
            {"Sovereign".split("").map((c, i) => (
              <motion.span key={i} className="inline-block" initial={{ opacity: 0, y: 80, rotateX: -90 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: 0.3 + i * 0.06, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>{c}</motion.span>
            ))}
          </h1>
          <p className="mt-1 font-serif text-xl italic text-muted-foreground md:text-2xl">quietly, since 1924</p>
        </motion.div>

        {/* Ambient Bottom Tagline */}
        <motion.div style={{ opacity: word2, y: word2Y }} className="pointer-events-none absolute inset-x-0 bottom-[10%] text-center z-10">
          <p className="kicker mb-2">Tuscan calfskin · Hand-burnished · Gum sole</p>
          <p className="font-serif text-3xl md:text-5xl">Made <em className="text-gold">by hand</em>, never in haste.</p>
        </motion.div>

        {/* Central Display: 3D Canvas or 2D Archival Scan (Prominently enlarged) */}
        <div className="relative mt-12 w-[95vw] max-w-5xl h-[72vh] flex items-center justify-center">
          {use3D ? (
            <div className="relative h-full w-full">
              <Sneaker3DCanvas
                scrollProgress={scrollVal}
                mouseX={mouseCoord.x}
                mouseY={mouseCoord.y}
                className="h-full w-full"
              />
            </div>
          ) : (
            <div style={{ perspective: 1400 }} className="relative w-full max-w-2xl">
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
          )}

          {/* Mode Switcher Toggle */}
          <div className="absolute top-2 right-4 z-20 flex items-center border border-border bg-card/85 backdrop-blur p-1 text-[0.65rem] kicker">
            <button
              onClick={() => setUse3D(true)}
              className={`flex items-center gap-1 px-2.5 py-1 transition-colors ${
                use3D ? "bg-primary text-background font-bold shadow-gold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Box className="h-3.5 w-3.5" />
              <span>3D Model</span>
            </button>
            <button
              onClick={() => setUse3D(false)}
              className={`flex items-center gap-1 px-2.5 py-1 transition-colors ${
                !use3D ? "bg-primary text-background font-bold shadow-gold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>2D Scan</span>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div style={{ opacity: titleOpacity }} className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10">
          <span className="kicker text-[0.65rem] text-muted-foreground">Scroll to rotate 360°</span>
          <motion.div animate={{ scaleY: [0, 1, 0], originY: 0 }} transition={{ repeat: Infinity, duration: 2 }} className="mx-auto mt-2 h-8 w-px bg-primary" />
        </motion.div>
      </div>
    </section>
  );
};
export default Hero;

