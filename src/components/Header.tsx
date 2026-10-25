import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const links = [
  ["Maison", "/#maison"],
  ["Anatomy", "/#anatomy"],
  ["The Vault", "/#vault"],
  ["Salon", "/#salon"],
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border/80 shadow-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <nav className="hidden gap-8 md:flex">
          {links.map(([label, href]) => (
            <Link
              key={label}
              to={href}
              className="kicker text-muted-foreground transition-colors hover:text-primary"
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link to="/" className="text-center leading-none group">
          <span className="block font-serif text-2xl tracking-[0.3em] group-hover:text-primary transition-colors">
            AURELIA
          </span>
          <span className="kicker text-[0.55rem]">Milano · MCMXXIV</span>
        </Link>
        <div className="flex items-center gap-6">
          <span className="kicker hidden text-muted-foreground md:inline">EUR €</span>
          <Link
            to="/#vault"
            aria-label="Vault Allocations"
            className="text-foreground hover:text-primary transition-colors flex items-center gap-2"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.2} />
          </Link>
        </div>
      </div>
    </header>
  );
};
export default Header;

