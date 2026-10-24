import { useState } from "react";
import Reveal from "./Reveal";

const Newsletter = () => {
  const [sent, setSent] = useState(false);
  return (
    <section id="salon" className="border-y bg-card py-32 text-center">
      <Reveal className="mx-auto max-w-2xl px-6">
        <p className="kicker mb-6">The Private Salon</p>
        <h2 className="font-serif text-5xl leading-tight md:text-7xl">By <em className="text-gold">invitation</em> only.</h2>
        <p className="mx-auto mt-6 max-w-md text-muted-foreground">Members receive first allocation of each numbered edition, and an annual letter from the atelier.</p>
        {sent ? (
          <p className="mt-12 font-serif text-2xl italic text-primary">Thank you. Your request has been received.</p>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mx-auto mt-12 flex max-w-md border-b border-primary/50">
            <input required type="email" placeholder="Your email address" className="flex-1 bg-transparent py-4 font-serif text-xl outline-none placeholder:text-muted-foreground" />
            <button className="kicker px-2 transition-colors hover:text-foreground">Request →</button>
          </form>
        )}
      </Reveal>
    </section>
  );
};
export default Newsletter;
