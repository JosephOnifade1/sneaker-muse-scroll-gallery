const words = ["Hand-stitched in Milano", "Vegetable-tanned leather", "Numbered editions", "Resoled for life", "Est. MCMXXIV"];

const Marquee = () => (
  <div className="overflow-hidden border-y py-6">
    <div className="flex w-max" style={{ animation: "marquee 40s linear infinite" }}>
      {[...words, ...words, ...words, ...words].map((w, i) => (
        <span key={i} className="flex items-center whitespace-nowrap font-serif text-3xl italic text-muted-foreground md:text-4xl">
          {w}<span className="mx-10 text-primary">✦</span>
        </span>
      ))}
    </div>
  </div>
);
export default Marquee;
