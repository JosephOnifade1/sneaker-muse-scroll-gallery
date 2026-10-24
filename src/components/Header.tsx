import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";

const links = [["Maison", "#maison"], ["Anatomy", "#anatomy"], ["The Vault", "#vault"], ["Salon", "#salon"]];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${scrolled ? "bg-background/80 backdrop-blur-md border-b" : ""}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <nav className="hidden gap-8 md:flex">
          {links.map(([l, h]) => (
            <a key={l} href={h} className="kicker text-muted-foreground transition-colors hover:text-primary">{l}</a>
          ))}
        </nav>
        <a href="#" className="text-center leading-none">
          <span className="block font-serif text-2xl tracking-[0.3em]">AURELIA</span>
          <span className="kicker text-[0.55rem]">Milano · MCMXXIV</span>
        </a>
        <div className="flex items-center gap-6">
          <span className="kicker hidden text-muted-foreground md:inline">EUR €</span>
          <button aria-label="Bag" className="text-foreground hover:text-primary transition-colors"><ShoppingBag className="h-5 w-5" strokeWidth={1.2} /></button>
        </div>
      </div>
    </header>
  );
};
export default Header;
