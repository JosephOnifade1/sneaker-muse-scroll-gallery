import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import atelier from "@/assets/atelier.jpg";
import Reveal from "./Reveal";

const stats = [["1924", "Founded in Brera"], ["11", "Artisans, no machines"], ["38", "Hours per pair"]];

const Heritage = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const clip = useTransform(scrollYProgress, [0, 0.45], ["inset(30% 30% 30% 30%)", "inset(0% 0% 0% 0%)"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.4, 1]);
  const rotX = useTransform(scrollYProgress, [0, 0.45], [25, 0]);
  return (
    <section id="maison" ref={ref} className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div style={{ perspective: 1500 }}>
          <motion.div style={{ clipPath: clip, rotateX: rotX }} className="relative h-[70vh] overflow-hidden">
            <motion.img style={{ scale: imgScale }} src={atelier} alt="Artisan hand-stitching a sneaker in the Milan atelier" loading="lazy" width={1536} height={1024} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <p className="absolute bottom-8 left-8 font-serif text-xl italic text-ivory">Via Fiori Chiari, Milano — the workshop, unchanged.</p>
          </motion.div>
        </div>
        <div className="mt-24 grid gap-16 md:grid-cols-2">
          <Reveal>
            <p className="kicker mb-4">La Maison</p>
            <h2 className="font-serif text-5xl leading-tight md:text-6xl">Four generations. <em className="text-gold">One bench.</em></h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg leading-relaxed text-muted-foreground">Aurelia began as a cobbler's bench for the gentlemen of Brera. A century later, the same families cut, last and stitch every pair by hand. We do not advertise, we do not discount, and we never make more than we can make well.</p>
          </Reveal>
        </div>
        <div className="mt-20 grid grid-cols-3 border-t">
          {stats.map(([n, l], i) => (
            <Reveal key={n} delay={i * 0.15} className="border-r py-10 text-center last:border-r-0">
              <p className="font-serif text-5xl text-gold md:text-7xl">{n}</p>
              <p className="kicker mt-3 text-muted-foreground">{l}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Heritage;
