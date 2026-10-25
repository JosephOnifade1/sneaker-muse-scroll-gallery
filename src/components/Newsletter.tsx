import { useState } from "react";
import Reveal from "./Reveal";
import { supabase } from "@/integrations/supabase/client";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFailed(false);
    const { error } = await supabase.from("salon_requests").insert({ email: email.trim() });
    if (error) { setFailed(true); return; }
    setSent(true);
  };

  return (
    <section id="salon" className="border-y bg-card py-32 text-center">
      <Reveal className="mx-auto max-w-2xl px-6">
        <p className="kicker mb-6">The Private Salon</p>
        <h2 className="font-serif text-5xl leading-tight md:text-7xl">By <em className="text-gold">invitation</em> only.</h2>
        <p className="mx-auto mt-6 max-w-md text-muted-foreground">Members receive first allocation of each numbered edition, and an annual letter from the atelier.</p>
        {sent ? (
          <p className="mt-12 font-serif text-2xl italic text-primary">Thank you. Your request has been received.</p>
        ) : (
          <form onSubmit={submit} className="mx-auto mt-12 flex max-w-md border-b border-primary/50">
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" className="flex-1 bg-transparent py-4 font-serif text-xl outline-none placeholder:text-muted-foreground" />
            <button className="kicker px-2 transition-colors hover:text-foreground">Request →</button>
          </form>
        )}
        {failed && !sent && (
          <p className="mt-6 text-sm text-destructive-foreground">Something went wrong — please try again in a moment.</p>
        )}
      </Reveal>
    </section>
  );
};
export default Newsletter;
