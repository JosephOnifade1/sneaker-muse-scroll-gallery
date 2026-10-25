import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Check, ShieldCheck, Sparkles, Copy, ArrowRight, Clock, Award } from "lucide-react";
import { toast } from "sonner";
import type { Edition } from "@/data/editions";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  edition: Edition;
  selectedSize: number | null;
}

export const ReservationModal = ({
  isOpen,
  onClose,
  edition,
  selectedSize,
}: ReservationModalProps) => {
  const [step, setStep] = useState<"form" | "confirmed">("form");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [monogram, setMonogram] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [certificateId, setCertificateId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSize) {
      toast.error("Please select an atelier size before requesting allocation.");
      return;
    }
    if (!fullName || !email) {
      toast.error("Please provide your name and private email address.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedCert = `AUR-${edition.slug.slice(4, 7).toUpperCase()}-${edition.currentPiece.toString().padStart(3, "0")}-${Math.floor(1000 + Math.random() * 9000)}`;
      setCertificateId(generatedCert);
      setIsSubmitting(false);
      setStep("confirmed");
      toast.success("Allocation Request Registered with the Brera Concierge.");
    }, 900);
  };

  const handleCopyCert = () => {
    navigator.clipboard.writeText(certificateId);
    toast.success("Certificate reference copied to clipboard.");
  };

  const handleResetAndClose = () => {
    setStep("form");
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleResetAndClose()}>
      <DialogContent className="max-w-xl bg-card border-border text-foreground max-h-[92vh] overflow-y-auto p-6 sm:p-8">
        {step === "form" ? (
          <div>
            <DialogHeader className="border-b border-border pb-4">
              <div className="flex items-center justify-between">
                <span className="kicker">{edition.editionNumber}</span>
                <span className="font-serif text-xl text-primary">{edition.price}</span>
              </div>
              <DialogTitle className="font-serif text-3xl font-normal mt-1">
                Request Numbered Allocation
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-xs font-sans mt-1">
                No immediate payment required. Your personal concierge will confirm your allocation and arrange bespoke fitting within 24 hours.
              </DialogDescription>
            </DialogHeader>

            {/* Summary Card */}
            <div className="my-5 rounded-2xl border border-border/50 bg-secondary/30 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={edition.heroImage}
                  alt={edition.name}
                  className="h-12 w-12 object-contain rounded-xl bg-background/50 border border-border/40 p-1"
                />
                <div>
                  <p className="font-semibold text-sm text-foreground">{edition.name}</p>
                  <p className="text-muted-foreground text-xs">{edition.sub}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="kicker block mb-0.5">Size reserved</span>
                <span className="font-bold text-lg text-primary">
                  {selectedSize ? `EU ${selectedSize}` : "Not selected"}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="kicker block mb-1.5">Full name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-xl bg-background border border-border/60 px-4 py-2.5 text-sm text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="kicker block mb-1.5">Email address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full rounded-xl bg-background border border-border/60 px-4 py-2.5 text-sm text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="kicker block mb-1.5">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 212 000 0000"
                    className="w-full rounded-xl bg-background border border-border/60 px-4 py-2.5 text-sm text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="kicker block mb-1.5">City & country</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Tokyo, Paris, Lagos..."
                    className="w-full rounded-xl bg-background border border-border/60 px-4 py-2.5 text-sm text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="rounded-xl border border-border/50 bg-background/50 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    <label className="kicker text-primary">Complimentary insole monogram</label>
                  </div>
                  <span className="text-[0.65rem] text-muted-foreground">Optional · 24kt gold foil</span>
                </div>
                <input
                  type="text"
                  maxLength={4}
                  value={monogram}
                  onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                  placeholder="e.g. J.O. or M.K."
                  className="w-full rounded-xl bg-card border border-border/60 px-4 py-2.5 text-sm tracking-widest text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none text-center uppercase"
                />
                <p className="text-[0.68rem] text-muted-foreground mt-2">
                  Up to three characters hand-stamped onto the natural veg-tan insole.
                </p>
              </div>

              <div>
                <label className="kicker block mb-1.5">Notes or fitting instructions</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Foot width, preferred delivery window, or any special requests..."
                  className="w-full rounded-xl bg-background border border-border/60 px-4 py-2.5 text-sm text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all resize-none"
                />
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-[0.68rem] text-muted-foreground border-t border-border">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span>Numbered Archive Certificate</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span>Concierge Reply in &lt; 24h</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 rounded-2xl bg-primary text-primary-foreground py-4 px-6 font-semibold text-sm hover:shadow-gold hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
              >
                {isSubmitting ? (
                  <span>Confirming allocation...</span>
                ) : (
                  <>
                    <span>Submit allocation request</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="text-center py-4 space-y-6">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
              <Award className="h-7 w-7 text-primary" />
            </div>

            <div>
              <p className="kicker text-primary mb-2">Allocation confirmed</p>
              <h3 className="font-display text-2xl font-black text-foreground">
                You're in, {fullName.split(" ")[0]}.
              </h3>
              <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto leading-relaxed">
                Your allocation for{" "}
                <span className="text-foreground font-semibold">{edition.name}</span> in size{" "}
                <span className="text-foreground font-semibold">EU {selectedSize}</span> is confirmed. Our team will email you within 24 hours.
              </p>
            </div>

            <div className="rounded-2xl border border-primary/30 bg-secondary/30 p-5 text-left relative overflow-hidden">
              <div className="absolute right-3 top-3 opacity-8 font-display text-5xl font-black text-primary pointer-events-none select-none">
                KI
              </div>
              <div className="flex justify-between items-center text-xs text-muted-foreground border-b border-border/40 pb-3 mb-3">
                <span className="font-medium">Certificate of provision</span>
                <span className="text-primary font-medium">{edition.editionNumber}</span>
              </div>
              <div className="space-y-1.5 text-xs">
                <p className="text-muted-foreground">
                  Reference:{" "}
                  <code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded text-sm select-all">
                    {certificateId}
                  </code>
                </p>
                <p className="text-muted-foreground">
                  Cordwainer:{" "}
                  <span className="text-foreground font-medium">{edition.provenance.cordwainer}</span>
                </p>
                {monogram && (
                  <p className="text-muted-foreground">
                    Monogram:{" "}
                    <span className="text-primary font-bold tracking-widest">
                      "{monogram}"
                    </span>
                  </p>
                )}
              </div>

              <button
                onClick={handleCopyCert}
                className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-border/60 px-3 py-1.5 text-xs text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
              >
                <Copy className="h-3 w-3" />
                <span>Copy reference</span>
              </button>
            </div>

            <div className="text-left text-xs text-muted-foreground space-y-2 border-t border-border pt-4">
              <p className="font-medium text-foreground">What happens next?</p>
              <ol className="list-decimal list-inside space-y-1.5 text-[0.78rem]">
                <li>A dedicated private concierge will review your allocation details.</li>
                <li>You will receive an email at <span className="text-foreground font-mono">{email}</span> within 24 hours confirming exact sole delivery timeline.</li>
                <li>No payment is captured until your sizing consultation is verified.</li>
              </ol>
            </div>

            <button
              onClick={handleResetAndClose}
              className="w-full rounded-2xl border border-border/50 py-3 text-sm font-medium hover:border-primary/50 text-muted-foreground hover:text-foreground transition-all"
            >
              Close
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
