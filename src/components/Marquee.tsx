const words = [
  "Parametric Exoskeleton",
  "Dual-Density Chassis",
  "385g Tare Weight",
  "13,540 Mesh Surfaces",
  "Kevlar Tension Lacing",
  "TPU Heel Stabilizer",
  "Computational Dampening",
  "Series I · Limited",
];

const Marquee = () => (
  <div className="overflow-hidden border-y border-border/50 bg-card/30 py-5">
    <div className="flex w-max" style={{ animation: "marquee 40s linear infinite" }}>
      {[...words, ...words, ...words].map((w, i) => (
        <span
          key={i}
          className="flex items-center whitespace-nowrap text-xs sm:text-sm font-medium tracking-[0.12em] text-muted-foreground/70 hover:text-primary transition-colors"
        >
          {w}
          <span className="mx-8 inline-block h-1 w-1 rounded-full bg-primary/50 align-middle" />
        </span>
      ))}
    </div>
  </div>
);
export default Marquee;
