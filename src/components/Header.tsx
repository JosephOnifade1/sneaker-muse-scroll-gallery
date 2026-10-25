import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { label: "Architecture", href: "/#hero" },
  { label: "Anatomy", href: "/#anatomy" },
  { label: "Specimens", href: "/#vault" },
  { label: "Lab", href: "/#lab" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-border/60 shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          {/* Desktop Navigation */}
          <nav className="hidden gap-1 lg:flex">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="px-4 py-2 rounded-full text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Brand Logo */}
          <Link to="/" className="flex flex-col items-center leading-none group">
            <span className="font-serif text-2xl font-black tracking-tight group-hover:text-primary transition-colors duration-200">
              KINESIS
            </span>
            <span className="text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase mt-0.5">
              PROTO — 01
            </span>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/#vault"
              className="hidden sm:flex items-center gap-2 rounded-full border border-border/80 bg-secondary/60 px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-200"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>3 Specimens</span>
            </Link>
            <Link
              to="/#vault"
              className="sm:hidden p-2.5 rounded-full border border-border/60 text-muted-foreground hover:text-primary transition-all"
              aria-label="View specimens"
            >
              <ShoppingBag className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[65px] z-40 bg-background/98 backdrop-blur-2xl border-b border-border/60 px-6 py-6 shadow-2xl lg:hidden"
          >
            <nav className="flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-200"
                >
                  {link.label}
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground/50" />
                </Link>
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t border-border/60 grid grid-cols-2 gap-3 text-xs text-muted-foreground">
              <div className="rounded-xl bg-secondary/60 p-3">
                <p className="font-semibold text-foreground mb-0.5">Series I</p>
                <p>3 Specimens · Limited</p>
              </div>
              <div className="rounded-xl bg-secondary/60 p-3">
                <p className="font-semibold text-foreground mb-0.5">385g Tare</p>
                <p>13,540 mesh surfaces</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Header;
