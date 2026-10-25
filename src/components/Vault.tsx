import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import noir from "@/assets/proto-01-noir.png";
import dune from "@/assets/proto-01-dune.png";
import slate from "@/assets/proto-01-slate.png";
import Reveal from "./Reveal";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const items = [
  {
    name: "Proto-01 Noir",
    slug: "proto-01-noir",
    sub: "Carbon lattice · Ballistic mesh · Decoupled chassis",
    price: "$680",
    img: noir,
    ed: "018 / 150",
    badge: "150 pairs",
  },
  {
    name: "Proto-01 Dune",
    slug: "proto-01-dune",
    sub: "Nubuck overlay · Kinetic tendon lacing · Desert composite",
    price: "$720",
    img: dune,
    ed: "064 / 200",
    badge: "200 pairs",
  },
  {
    name: "Proto-01 Slate",
    slug: "proto-01-slate",
    sub: "White membrane · Cyan structural weld · 385g tare",
    price: "$750",
    img: slate,
    ed: "009 / 100",
    badge: "100 pairs",
  },
];

const Card = ({ it, i }: { it: (typeof items)[0]; i: number }) => {
  const mx = useMotionValue(0.5), my = useMotionValue(0.5);
  const rX = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 150, damping: 18 });
  const rY = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 150, damping: 18 });
  const imgX = useTransform(mx, [0, 1], [-16, 16]);
  return (
    <motion.article
      initial={{ opacity: 0, y: 100, rotateX: 30 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.2, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
      className="group"
    >
      <Link to={`/editions/${it.slug}`} className="block">
        <motion.div
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            mx.set((e.clientX - r.left) / r.width);
            my.set((e.clientY - r.top) / r.height);
          }}
          onMouseLeave={() => {
            mx.set(0.5);
            my.set(0.5);
          }}
          style={{ rotateX: rX, rotateY: rY }}
          className="preserve-3d relative rounded-2xl border border-border/60 bg-card p-7 transition-all duration-500 hover:shadow-gold hover:border-primary/50 cursor-pointer"
        >
          {/* Header Row */}
          <div className="flex items-center justify-between mb-6">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[0.65rem] font-semibold tracking-wide">
              {it.badge}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors font-medium">
              <span>Explore</span>
              <ArrowUpRight className="h-3 w-3" />
            </span>
          </div>

          {/* Edition Number */}
          <p className="text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground/60 font-medium mb-2">
            Specimen {it.ed}
          </p>

          <motion.img
            style={{ x: imgX, translateZ: 80 }}
            src={it.img}
            alt={it.name}
            loading="lazy"
            width={1024}
            height={1024}
            className="my-5 aspect-square w-full object-contain transition-transform duration-700 group-hover:-rotate-6 group-hover:scale-110 drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)]"
          />

          <div style={{ transform: "translateZ(40px)" }} className="flex items-end justify-between border-t border-border/40 pt-5">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold group-hover:text-primary transition-colors">
                {it.name}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground leading-snug">{it.sub}</p>
            </div>
            <span className="font-display text-xl sm:text-2xl text-primary font-bold">{it.price}</span>
          </div>
        </motion.div>
      </Link>
    </motion.article>
  );
};

const Vault = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"]);
  return (
    <section id="vault" ref={ref} className="relative overflow-hidden py-32 bg-vignette">
      {/* Parallax decorative watermark */}
      <motion.p
        style={{ x }}
        className="pointer-events-none absolute top-10 whitespace-nowrap font-display text-[16vw] font-black uppercase leading-none text-secondary/20 select-none"
      >
        Specimens · Archive · Specimens · Archive
      </motion.p>

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="mb-20 max-w-xl">
          <p className="kicker mb-3">Series I Allocations</p>
          <h2 className="font-display text-4xl sm:text-6xl font-black tracking-tight text-foreground">
            Three specimens.{" "}
            <span className="text-gold">Zero restocks.</span>
          </h2>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Every prototype pair is manufactured to order from our high-precision titanium tooling jigs in strictly bounded quantities.
          </p>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-3">
          {items.map((it, i) => (
            <Card key={it.name} it={it} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default Vault;
