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

            {/* Selected Summary Card */}
            <div className="my-5 border border-border bg-secondary/30 p-3.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <img
                  src={edition.heroImage}
                  alt={edition.name}
                  className="h-12 w-12 object-contain bg-background/50 border border-border/80 p-1"
                />
                <div>
                  <p className="font-serif text-base text-foreground">{edition.name}</p>
                  <p className="text-muted-foreground text-[0.7rem]">{edition.sub}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="kicker block text-[0.65rem]">Reserved Size</span>
                <span className="font-serif text-lg text-primary">
                  {selectedSize ? `EU ${selectedSize}` : "Not Selected"}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="kicker block text-[0.65rem] mb-1.5 text-muted-foreground">
                    Client Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Lord / Lady / Mr. / Ms."
                    className="w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="kicker block text-[0.65rem] mb-1.5 text-muted-foreground">
                    Private Concierge Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="kicker block text-[0.65rem] mb-1.5 text-muted-foreground">
                    Telephone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+39 02 1234 5678"
                    className="w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="kicker block text-[0.65rem] mb-1.5 text-muted-foreground">
                    Destination City & Country
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Milano, Paris, London, NYC..."
                    className="w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Bespoke Personalization: Monogramming */}
              <div className="border border-border/80 p-3.5 bg-background/50">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    <label className="kicker text-[0.65rem] text-primary">
                      Complimentary Insole Monogram
                    </label>
                  </div>
                  <span className="text-[0.65rem] text-muted-foreground italic">Optional · 24kt Gold Foil</span>
                </div>
                <input
                  type="text"
                  maxLength={4}
                  value={monogram}
                  onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                  placeholder="e.g. J.O. or M.K."
                  className="w-full bg-card border border-border px-3 py-2 text-sm tracking-widest text-foreground focus:border-primary focus:outline-none font-serif text-center uppercase"
                />
                <p className="text-[0.68rem] text-muted-foreground mt-1">
                  Up to three characters hand-stamped onto the natural veg-tan insole by the master cordwainer.
                </p>
              </div>

              {/* Special Concierge Notes */}
              <div>
                <label className="kicker block text-[0.65rem] mb-1.5 text-muted-foreground">
                  Special Notes or Fitting Instructions
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Foot width notes, preferred delivery time, or private salon fitting in Brera..."
                  className="w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none transition-colors resize-none"
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
                className="w-full mt-4 flex items-center justify-center gap-2 border border-primary bg-primary text-primary-foreground py-3.5 px-6 font-sans text-xs uppercase tracking-[0.25em] font-semibold hover:bg-primary/90 transition-all shadow-gold disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>Transmitting to Milano Atelier...</span>
                ) : (
                  <>
                    <span>Submit Allocation Request</span>
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
              <p className="kicker text-primary mb-2">Bespoke Allocation Registered</p>
              <h3 className="font-serif text-3xl font-normal text-foreground">
                Maison Aurelia Milano
              </h3>
              <p className="text-muted-foreground text-xs font-sans mt-2 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-foreground font-medium">{fullName}</span>. Your provisional allocation for{" "}
                <span className="text-foreground font-medium">{edition.name}</span> in size{" "}
                <span className="text-foreground font-medium">EU {selectedSize}</span> has been logged with the atelier director.
              </p>
            </div>

            {/* Certificate Box */}
            <div className="border border-primary/40 bg-secondary/30 p-5 text-left relative overflow-hidden">
              <div className="absolute right-3 top-3 opacity-10 font-serif text-6xl text-primary pointer-events-none">
                MCMXXIV
              </div>
              <div className="flex justify-between items-center text-[0.68rem] text-muted-foreground uppercase tracking-widest border-b border-border/80 pb-2 mb-3">
                <span>Certificate of Provision</span>
                <span className="text-primary">{edition.editionNumber}</span>
              </div>
              <div className="space-y-1.5 text-xs font-sans">
                <p className="text-muted-foreground">
                  Reference:{" "}
                  <code className="text-primary font-mono text-sm select-all">
                    {certificateId}
                  </code>
                </p>
                <p className="text-muted-foreground">
                  Cordwainer Bench:{" "}
                  <span className="text-foreground">{edition.provenance.cordwainer}</span>
                </p>
                {monogram && (
                  <p className="text-muted-foreground">
                    Custom Monogram:{" "}
                    <span className="text-primary font-serif tracking-widest">
                      "{monogram}"
                    </span>
                  </p>
                )}
              </div>

              <button
                onClick={handleCopyCert}
                className="mt-4 flex items-center gap-1.5 border border-border px-2.5 py-1 text-[0.68rem] kicker text-muted-foreground hover:text-primary hover:border-primary transition"
              >
                <Copy className="h-3 w-3" />
                <span>Copy Certificate Reference</span>
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
              className="w-full border border-border py-3 text-xs kicker hover:border-primary text-foreground transition"
            >
              Return to Edition
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
