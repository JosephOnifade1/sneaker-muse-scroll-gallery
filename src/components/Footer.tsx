const Footer = () => (
  <footer className="px-6 py-16">
    <div className="mx-auto max-w-7xl">
      <p className="text-center font-serif text-[18vw] leading-none tracking-[0.1em] text-secondary md:text-[12vw]">AURELIA</p>
      <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
        <span className="kicker text-muted-foreground">Via Fiori Chiari 7 · Milano</span>
        <div className="flex gap-8">{["Atelier", "Care", "Resoling", "Contact"].map((l) => <a key={l} href="#" className="kicker text-muted-foreground hover:text-primary">{l}</a>)}</div>
        <span className="kicker text-muted-foreground">© MMXXVI Aurelia</span>
      </div>
    </div>
  </footer>
);
export default Footer;
