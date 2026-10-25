import { useState } from "react";
import Reveal from "./Reveal";
import { Send, CheckCircle2 } from "lucide-react";

const Newsletter = () => {
  const [sent, setSent] = useState(false);
  return (
    <section id="lab" className="border-y border-border/40 bg-card/40 py-32 text-center relative overflow-hidden">
      {/* Subtle dot grid */}
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-50" />

      <Reveal className="mx-auto max-w-2xl px-6 relative z-10">
        {/* Clean pill label */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-4 py-1.5 text-xs text-primary font-semibold tracking-wide mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-slow" />
          Series II · Early Access
        </div>

        <h2 className="font-display text-4xl sm:text-6xl font-black tracking-tight text-foreground">
          Get first access.{" "}
          <span className="text-gold">No waiting lists.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
          Drop your email and we'll notify you directly when the next prototype batch opens — before the public.
        </p>

        {sent ? (
          <div className="mt-12 inline-flex items-center gap-3 rounded-2xl border border-primary/40 bg-primary/10 px-6 py-4 text-sm text-primary font-medium">
            <CheckCircle2 className="h-4 w-4" />
            You're on the list. We'll be in touch.
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="mx-auto mt-10 flex max-w-md gap-2"
          >
            <input
              required
              type="email"
              placeholder="your@email.com"
              className="flex-1 rounded-full border border-border/60 bg-secondary/60 px-5 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <button
              type="submit"
              className="btn-primary gap-2 flex-shrink-0"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Notify me</span>
            </button>
          </form>
        )}

        <p className="mt-5 text-[0.7rem] text-muted-foreground/50 tracking-wide">
          No spam. One email per drop. Unsubscribe anytime.
        </p>
      </Reveal>
    </section>
  );
};
export default Newsletter;
