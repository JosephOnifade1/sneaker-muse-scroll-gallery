import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { EDITIONS } from "@/data/editions";

interface RelatedEditionsProps {
  currentId: string;
}

export const RelatedEditions = ({ currentId }: RelatedEditionsProps) => {
  const others = EDITIONS.filter((e) => e.id !== currentId);

  return (
    <section className="py-20 border-t border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <p className="kicker mb-2 font-mono text-primary text-[0.65rem] tracking-[0.25em]">[SPECIMEN ARCHIVE]</p>
            <h2 className="font-mono text-2xl sm:text-3xl font-bold uppercase tracking-tight text-foreground">Companion Allocations</h2>
          </div>
          <Link
            to="/#vault"
            className="kicker mt-4 sm:mt-0 text-muted-foreground hover:text-primary transition flex items-center gap-1 font-mono text-xs"
          >
            <span>View All Specimens</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {others.map((item) => (
            <Link
              key={item.id}
              to={`/editions/${item.slug}`}
              className="group border border-border bg-card p-6 transition-all duration-500 hover:border-primary/60 hover:shadow-gold"
            >
              <div className="flex justify-between kicker text-muted-foreground text-[0.65rem]">
                <span>{item.editionNumber}</span>
                <span className="text-primary">{item.price}</span>
              </div>

              <div className="my-6 aspect-square max-h-56 w-full flex items-center justify-center overflow-hidden">
                <img
                  src={item.heroImage}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-105 group-hover:-rotate-3"
                />
              </div>

              <div className="flex items-end justify-between border-t border-border pt-4">
                <div>
                  <h3 className="font-serif text-2xl group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                </div>
                <span className="kicker text-[0.68rem] text-muted-foreground group-hover:text-primary transition flex items-center gap-1">
                  <span>Explore</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
