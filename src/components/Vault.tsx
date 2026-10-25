import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ivory from "@/assets/hero-shoe.png";
import green from "@/assets/shoe-green.png";
import burgundy from "@/assets/shoe-burgundy.png";
import Reveal from "./Reveal";

const items = [
  { name: "The Sovereign", sub: "Ivory calf · Gum", price: "€ 890", img: ivory, ed: "No. 041 / 350", slug: "the-sovereign" },
  { name: "The Regatta", sub: "Racing green suede", price: "€ 940", img: green, ed: "No. 112 / 200", slug: "the-regatta" },
  { name: "The Chancellor", sub: "Oxblood box calf", price: "€ 980", img: burgundy, ed: "No. 007 / 150", slug: "the-chancellor" },
];

const Card = ({ it, i }: { it: (typeof items)[0]; i: number }) => {
  const mx = motion.useMotionValue(0.5), my = motion.useMotionValue(0.5);
  const rX = motion.useSpring(motion.useTransform(my, [0, 1], [14, -14]), { stiffness: 150, damping: 15 });
  const rY = motion.useSpring(motion.useTransform(mx, [0, 1], [-14, 14]), { stiffness: 150, damping: 15 });
  const imgX = motion.useTransform(mx, [0, 1], [-20, 20]);
  return (
    <motion.article
      initial={{ opacity: 0, y: 120, rotateX: 35 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.3, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
      className="group"
    >
      <motion.div
        onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width); my.set((e.clientY - r.top) / r.height); }}
        onMouseLeave={() => { mx.set(0.5); my.set(0.5); }}
        style={{ rotateX: rX, rotateY: rY }}
        className="preserve-3d relative border bg-card p-8 transition-shadow duration-700 hover:shadow-gold"
      >
        <div className="flex justify-between kicker text-muted-foreground"><span>{it.ed}</span><span>Archive</span></div>
        <motion.img style={{ x: imgX, translateZ: 80 }} src={it.img} alt={it.name} loading="lazy" width={1024} height={1024} className="my-6 aspect-square w-full object-contain transition-transform duration-700 group-hover:-rotate-6 group-hover:scale-110" />
        <div style={{ transform: "translateZ(40px)" }} className="flex items-end justify-between border-t pt-6">
          <div><h3 className="font-serif text-3xl">{it.name}</h3><p className="mt-1 text-sm text-muted-foreground">{it.sub}</p></div>
          <span className="font-serif text-2xl text-primary">{it.price}</span>
        </div>
      </motion.div>
    </motion.article>
  );
};

const Vault = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"]);
  return (
    <section id="vault" ref={ref} className="relative overflow-hidden py-32">
      <motion.p style={{ x }} className="pointer-events-none absolute top-10 whitespace-nowrap font-serif text-[18vw] italic leading-none text-secondary">The Vault · The Vault</motion.p>
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="mb-20 max-w-xl">
          <p className="kicker mb-4">Current Allocations</p>
          <h2 className="font-serif text-5xl leading-tight md:text-7xl">Three pairs. <em className="text-gold">No restocks.</em></h2>
        </Reveal>
        <div className="grid gap-10 md:grid-cols-3">
          {items.map((it, i) => (
            <Link key={it.slug} to={`/editions/${it.slug}`} aria-label={`${it.name} — view the edition`} className="block">
              <Card it={it} i={i} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Vault;
