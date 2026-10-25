const footerLinks = ["Specimens", "Anatomy", "Lab", "Contact"];

const Footer = () => (
  <footer className="px-6 py-16 border-t border-border/40 bg-background">
    <div className="mx-auto max-w-7xl">
      {/* Big watermark wordmark */}
      <p className="text-center font-display text-[16vw] font-black leading-none tracking-tight text-secondary/20 md:text-[11vw] uppercase select-none">
        KINESIS
      </p>

      <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 md:flex-row text-xs text-muted-foreground">
        <span className="text-muted-foreground/60">Kyoto 35.01° N · Milano 45.46° N</span>

        <nav className="flex flex-wrap justify-center gap-1">
          {footerLinks.map((l) => (
            <a
              key={l}
              href="#"
              className="px-3 py-1.5 rounded-full hover:bg-white/5 hover:text-primary transition-all duration-200 font-medium tracking-wide"
            >
              {l}
            </a>
          ))}
        </nav>

        <span className="text-muted-foreground/50">© 2026 Kinesis Labs · Proto-01</span>
      </div>
    </div>
  </footer>
);
export default Footer;
