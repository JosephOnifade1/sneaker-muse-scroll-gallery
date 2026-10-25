import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import NotFound from "@/pages/NotFound";
import { editions, sizingChart, sizingNote, type Edition } from "@/data/editions";
import { supabase } from "@/integrations/supabase/client";

const SIZE_OPTIONS = sizingChart.map(([eu]) => eu);

const ReservationForm = ({ edition }: { edition: Edition }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [size, setSize] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!size) return;
    setStatus("sending");
    const { error } = await supabase.from("reservation_requests").insert({
      edition_slug: edition.slug,
      edition_name: edition.name,
      full_name: fullName.trim(),
      email: email.trim(),
      shoe_size: size,
      notes: notes.trim() ? notes.trim() : null,
    });
    setStatus(error ? "error" : "done");
  };

  if (status === "done") {
    return (
      <div className="border bg-card p-8">
        <p className="kicker mb-4">Allocation Requested</p>
        <p className="font-serif text-2xl italic leading-snug text-primary">
          Your request for {edition.ed} has been entered.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          The atelier reviews each request by hand and answers within two working days. Nothing is charged until your pair is confirmed and set aside.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="border bg-card p-8">
      <p className="kicker mb-2">Reserve This Pair</p>
      <h3 className="font-serif text-3xl">Request an <em className="text-gold">allocation</em></h3>
      <p className="mt-3 text-sm text-muted-foreground">No payment now — we confirm the pair, the number and the size with you first.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="kicker mb-2 block text-muted-foreground">Full name</span>
          <input required value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full border-b border-primary/50 bg-transparent py-3 font-serif text-lg outline-none transition-colors focus:border-primary" />
        </label>
        <label className="block">
          <span className="kicker mb-2 block text-muted-foreground">Email</span>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border-b border-primary/50 bg-transparent py-3 font-serif text-lg outline-none transition-colors focus:border-primary" />
        </label>
      </div>

      <div className="mt-8">
        <span className="kicker mb-3 block text-muted-foreground">Size (EU)</span>
        <div className="flex flex-wrap gap-2">
          {SIZE_OPTIONS.map((s) => (
            <button key={s} type="button" onClick={() => setSize(s)} aria-pressed={size === s}
              className={`min-w-[3.25rem] border px-3 py-2 font-serif text-lg transition-colors ${size === s ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary hover:text-foreground"}`}>
              {s}
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{sizingNote}</p>
      </div>

      <label className="mt-8 block">
        <span className="kicker mb-2 block text-muted-foreground">Note to the atelier — optional</span>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} placeholder="Monogram, gifting, questions…" className="w-full resize-none border-b border-primary/50 bg-transparent py-3 font-serif text-lg outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary" />
      </label>

      {status === "error" && (
        <p className="mt-4 text-sm text-destructive-foreground">Something went wrong on our side — please try again in a moment.</p>
      )}

      <button type="submit" disabled={status === "sending" || !size}
        className="kicker mt-8 w-full border border-primary/60 bg-primary/10 py-4 tracking-[0.35em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40">
        {status === "sending" ? "Sending…" : !size ? "Choose a size to continue" : "Request allocation →"}
      </button>
    </form>
  );
};

const EditionPage = () => {
  const { slug } = useParams();
  const edition = editions.find((e) => e.slug === slug);
  const [active, setActive] = useState(0);

  if (!edition) return <NotFound />;

  const shot = edition.gallery[active];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <Link to="/#vault" className="kicker inline-flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary">
              <span aria-hidden>←</span> Back to The Vault
            </Link>
          </Reveal>

          <div className="mt-12 grid gap-16 lg:grid-cols-2">
            <Reveal>
              <div className="border bg-card">
                <div className="relative aspect-square overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={shot.src}
                      src={shot.src}
                      alt={shot.alt}
                      loading="lazy"
                      width={1024}
                      height={1024}
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className={`absolute inset-0 h-full w-full ${shot.fit === "cover" ? "object-cover" : "object-contain"}`}
                    />
                  </AnimatePresence>
                  <p className="absolute bottom-4 left-4 right-4 kicker text-muted-foreground">{shot.caption}</p>
                </div>
                <div className="grid grid-cols-3 border-t">
                  {edition.gallery.map((g, i) => (
                    <button key={g.src} onClick={() => setActive(i)} aria-label={`View: ${g.caption}`} aria-pressed={i === active}
                      className={`group relative aspect-square overflow-hidden border-r last:border-r-0 ${i === active ? "bg-primary/10" : ""}`}>
                      <img src={g.src} alt="" loading="lazy" width={340} height={340} className={`h-full w-full ${g.fit === "cover" ? "object-cover" : "object-contain"} transition-transform duration-700 group-hover:scale-105`} />
                      {i === active && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary" />}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            <div>
              <Reveal>
                <div className="flex items-center justify-between">
                  <p className="kicker">Current Allocation</p>
                  <p className="kicker text-muted-foreground">{edition.ed}</p>
                </div>
                <h1 className="mt-4 font-serif text-6xl leading-none md:text-7xl">{edition.name}</h1>
                <p className="mt-3 font-serif text-xl italic text-muted-foreground">{edition.sub}</p>
                <p className="mt-6 font-serif text-3xl text-primary">{edition.price}</p>
                <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">{edition.story}</p>
              </Reveal>

              <Reveal delay={0.1} className="mt-10">
                <p className="kicker mb-2">Materials & Construction</p>
                <dl>
                  {edition.materials.map((m) => (
                    <div key={m.label} className="flex flex-col gap-1 border-b py-4 sm:flex-row sm:gap-8">
                      <dt className="kicker w-32 shrink-0 text-muted-foreground">{m.label}</dt>
                      <dd className="text-sm leading-relaxed text-foreground/90">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal delay={0.15} className="mt-10">
                <p className="kicker mb-2">Sizing</p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="border-b">
                        {["EU", "UK", "US", "Inside length (cm)"].map((h) => (
                          <th key={h} className="kicker py-3 pr-6 text-muted-foreground">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="font-serif text-lg">
                      {sizingChart.map(([eu, uk, us, cm]) => (
                        <tr key={eu} className="border-b border-border/60">
                          <td className="py-2 pr-6 text-primary">{eu}</td>
                          <td className="py-2 pr-6">{uk}</td>
                          <td className="py-2 pr-6">{us}</td>
                          <td className="py-2 pr-6">{cm}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{sizingNote}</p>
              </Reveal>

              <Reveal delay={0.2} className="mt-12">
                <ReservationForm edition={edition} />
              </Reveal>
            </div>
          </div>

          <Reveal className="mt-24">
            <p className="kicker mb-6">Also in the Vault</p>
            <div className="grid gap-8 sm:grid-cols-2">
              {editions.filter((e) => e.slug !== edition.slug).map((other) => (
                <Link key={other.slug} to={`/editions/${other.slug}`} className="group flex items-center gap-6 border bg-card p-6 transition-shadow duration-700 hover:shadow-gold">
                  <img src={other.img} alt={other.name} loading="lazy" width={160} height={160} className="h-24 w-24 object-contain transition-transform duration-700 group-hover:-rotate-6" />
                  <div>
                    <p className="font-serif text-2xl">{other.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{other.sub} · {other.price}</p>
                    <p className="kicker mt-2">View edition →</p>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditionPage;
