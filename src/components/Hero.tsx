import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import shoe from "@/assets/hero-shoe.png";
import shoeGreen from "@/assets/shoe-green.png";
import shoeBurgundy from "@/assets/shoe-burgundy.png";
import { Sneaker3DCanvas } from "@/components/Sneaker3DCanvas";
import { Box, Layers, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const heroEditions = [
  {
    id: "ivory" as const,
    slug: "the-sovereign",
    name: "Sovereign",
    sub: "Series VII · 350 Pairs Worldwide · € 890",
    tagline: "Tuscan calfskin · Hand-burnished · Amber gum sole",
    img: shoe,
    swatchHex: "#ede4d5",
    borderHex: "#c8a774",
    label: "Ivory Calf",
    number: "041 / 350",
  },
  {
    id: "green" as const,
    slug: "the-regatta",
    name: "Regatta",
    sub: "Series IV · 200 Pairs Worldwide · € 940",
    tagline: "Tuscan velour suede · Water-repellent nap · Margom sole",
    img: shoeGreen,
    swatchHex: "#224131",
    borderHex: "#3f6e54",
    label: "Racing Green",
    number: "112 / 200",
  },
  {
    id: "oxblood" as const,
    slug: "the-chancellor",
    name: "Chancellor",
    sub: "Series II · 150 Pairs Worldwide · € 980",
    tagline: "Museum box calf · Smoked rubber · Hand-sponged patina",
    img: shoeBurgundy,
    swatchHex: "#451620",
    borderHex: "#7e2a3b",
    label: "Oxblood Calf",
    number: "007 / 150",
  },
];

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  const [scrollVal, setScrollVal] = useState(0);
  const [use3D, setUse3D] = useState(true);
  const [selectedEditionId, setSelectedEditionId] = useState<"ivory" | "green" | "oxblood">("ivory");
  const [mouseCoord, setMouseCoord] = useState({ x: 0, y: 0 });

  const currentEdition = heroEditions.find((e) => e.id === selectedEditionId) || heroEditions[0];

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
        <motion.div style={{ y: titleY, opacity: titleOpacity }} className="pointer-events-none absolute inset-x-0 top-[14%] text-center z-10 px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentEdition.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5 }}
            >
              <p className="kicker mb-3">{currentEdition.sub}</p>
              <h1 className="font-serif text-[15vw] leading-[0.85] md:text-[9.5vw] tracking-tight">
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
              <p className="mt-1 font-serif text-lg italic text-muted-foreground md:text-2xl">quietly, since 1924</p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Ambient Bottom Tagline */}
        <motion.div style={{ opacity: word2, y: word2Y }} className="pointer-events-none absolute inset-x-0 bottom-[10%] text-center z-10 px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentEdition.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              <p className="kicker mb-2">{currentEdition.tagline}</p>
              <p className="font-serif text-2xl md:text-5xl">Made <em className="text-gold">by hand</em>, never in haste.</p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Central Display: 3D Canvas or 2D Archival Scan */}
        <div className="relative mt-12 w-[95vw] max-w-5xl h-[72vh] flex items-center justify-center">
          {use3D ? (
            <div className="relative h-full w-full">
              <Sneaker3DCanvas
                scrollProgress={scrollVal}
                mouseX={mouseCoord.x}
                mouseY={mouseCoord.y}
                variant={selectedEditionId}
                className="h-full w-full"
              />
            </div>
          ) : (
            <div style={{ perspective: 1400 }} className="relative w-full max-w-2xl">
              <motion.div style={{ rotateX: ty, rotateY: tx }} className="preserve-3d">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentEdition.id}
                    src={currentEdition.img}
                    alt={`Aurelia ${currentEdition.name} sneaker in ${currentEdition.label}`}
                    width={1536}
                    height={1024}
                    initial={{ opacity: 0, scale: 0.92, rotate: 10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    style={{ rotateY, rotateX, rotateZ, scale, y }}
                    className="relative z-10 w-full drop-shadow-[0_40px_40px_hsl(var(--background))]"
                  />
                </AnimatePresence>
              </motion.div>
              <motion.div style={{ scaleX: shadowScale }} className="mx-auto -mt-10 h-8 w-2/3 rounded-[50%] bg-primary/20 blur-2xl" />
            </div>
          )}

          {/* Colorway & Edition Selector Pills (Top-Left) */}
          <div className="absolute top-2 left-4 z-20 flex flex-wrap items-center gap-1.5 border border-border bg-card/85 backdrop-blur p-1 text-[0.65rem] kicker">
            <span className="text-muted-foreground px-1.5 hidden sm:inline">Edition:</span>
            {heroEditions.map((ed) => {
              const isSelected = selectedEditionId === ed.id;
              return (
                <button
                  key={ed.id}
                  onClick={() => setSelectedEditionId(ed.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 transition-all ${
                    isSelected
                      ? "bg-primary text-background font-bold shadow-gold"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                  }`}
                  aria-label={`Select ${ed.name} ${ed.label}`}
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full border"
                    style={{ backgroundColor: ed.swatchHex, borderColor: ed.borderHex }}
                  />
                  <span>{ed.label}</span>
                </button>
              );
            })}
            <Link
              to={`/editions/${currentEdition.slug}`}
              className="hidden lg:flex items-center gap-1 px-2 py-1 text-primary hover:underline border-l border-border ml-1"
            >
              <span>Explore</span>
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Mode Switcher Toggle (Top-Right) */}
          <div className="absolute top-2 right-4 z-20 flex items-center border border-border bg-card/85 backdrop-blur p-1 text-[0.65rem] kicker">
            <button
              onClick={() => setUse3D(true)}
              className={`flex items-center gap-1 px-2.5 py-1 transition-colors ${
                use3D ? "bg-primary text-background font-bold shadow-gold" : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="3D Model View"
            >
              <Box className="h-3.5 w-3.5" />
              <span>3D Model</span>
            </button>
            <button
              onClick={() => setUse3D(false)}
              className={`flex items-center gap-1 px-2.5 py-1 transition-colors ${
                !use3D ? "bg-primary text-background font-bold shadow-gold" : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="2D Scan View"
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

