import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Ruler, CheckCircle2, Info } from "lucide-react";
import type { SizeOption } from "@/data/editions";

interface SizingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  sizes: SizeOption[];
  selectedSize: number | null;
  onSelectSize: (size: number) => void;
  fitAdvice: string;
}

export const SizingGuideModal = ({
  isOpen,
  onClose,
  sizes,
  selectedSize,
  onSelectSize,
  fitAdvice,
}: SizingGuideModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl bg-card border-border text-foreground max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex items-center gap-2 text-primary kicker">
            <Ruler className="h-4 w-4" />
            <span>Atelier Sizing & Bespoke Lasts</span>
          </div>
          <DialogTitle className="font-serif text-3xl font-normal mt-1">
            MCMXXIV Sizing Guide
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm font-sans">
            Aurelia lasts are sculpted in beechwood following classical Northern Italian cobbler proportions.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Fit Advice Callout */}
          <div className="border border-primary/30 bg-primary/5 p-4 flex gap-3 items-start">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-serif text-base text-foreground font-medium">Artisan Fit Recommendation</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {fitAdvice}
              </p>
            </div>
          </div>

          {/* Sizing Table */}
          <div>
            <p className="kicker mb-3">Conversion & Insole Scale</p>
            <div className="overflow-x-auto border border-border">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-secondary/60 text-muted-foreground border-b border-border uppercase tracking-widest text-[0.65rem]">
                  <tr>
                    <th className="py-2.5 px-3">EU</th>
                    <th className="py-2.5 px-3">US Men</th>
                    <th className="py-2.5 px-3">UK</th>
                    <th className="py-2.5 px-3">Insole (cm)</th>
                    <th className="py-2.5 px-3">Insole (in)</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {sizes.map((s) => {
                    const isSelected = selectedSize === s.eu;
                    const isSoldOut = s.stock === 0;
                    return (
                      <tr
                        key={s.eu}
                        className={`transition-colors ${
                          isSelected
                            ? "bg-primary/10 text-primary font-medium"
                            : "hover:bg-secondary/40"
                        } ${isSoldOut ? "opacity-45" : ""}`}
                      >
                        <td className="py-2.5 px-3 font-serif text-sm">EU {s.eu}</td>
                        <td className="py-2.5 px-3">{s.us}</td>
                        <td className="py-2.5 px-3">{s.uk}</td>
                        <td className="py-2.5 px-3">{s.cm} cm</td>
                        <td className="py-2.5 px-3">{s.inches}"</td>
                        <td className="py-2.5 px-3 text-right">
                          {isSoldOut ? (
                            <span className="text-[0.68rem] text-muted-foreground uppercase tracking-wider">
                              Waitlist
                            </span>
                          ) : (
                            <button
                              onClick={() => {
                                onSelectSize(s.eu);
                                onClose();
                              }}
                              className={`text-[0.68rem] uppercase tracking-wider px-2 py-0.5 border ${
                                isSelected
                                  ? "border-primary bg-primary text-background font-bold"
                                  : "border-border hover:border-primary text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              {isSelected ? "Selected" : "Select"}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* How to Measure Foot Length */}
          <div className="border-t border-border pt-4">
            <p className="kicker mb-3">How to Measure for Perfection</p>
            <div className="grid gap-4 sm:grid-cols-3 text-xs text-muted-foreground">
              <div className="p-3 border border-border/70 bg-secondary/20">
                <p className="text-primary font-serif text-sm mb-1">01. Heel Against Wall</p>
                <p>Stand barefoot with your heel gently touching a flat wall on a sheet of paper.</p>
              </div>
              <div className="p-3 border border-border/70 bg-secondary/20">
                <p className="text-primary font-serif text-sm mb-1">02. Mark Longest Toe</p>
                <p>Mark the outermost tip of your longest toe with a pencil held perpendicular.</p>
              </div>
              <div className="p-3 border border-border/70 bg-secondary/20">
                <p className="text-primary font-serif text-sm mb-1">03. Add 6-8mm Ease</p>
                <p>Measure length in millimeters. Add 6-8mm ease for Italian dress-last comfort.</p>
              </div>
            </div>
          </div>

          {/* Concierge Guarantee */}
          <div className="flex items-center gap-2 pt-2 text-xs text-muted-foreground/80">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
            <span>Complimentary exchange and bespoke fit consultation included with every allocation.</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
