import ivory from "@/assets/hero-shoe.png";
import green from "@/assets/shoe-green.png";
import burgundy from "@/assets/shoe-burgundy.png";
import sovereignStitch from "@/assets/sovereign-stitch.jpg";
import sovereignHeel from "@/assets/sovereign-heel.jpg";
import regattaSuede from "@/assets/regatta-suede.jpg";
import regattaHeel from "@/assets/regatta-heel.jpg";
import chancellorLeather from "@/assets/chancellor-leather.jpg";
import chancellorLace from "@/assets/chancellor-lace.jpg";

export type GalleryImage = { src: string; alt: string; caption: string; fit: "contain" | "cover" };

export type Edition = {
  slug: string;
  name: string;
  sub: string;
  price: string;
  ed: string;
  story: string;
  img: string;
  gallery: GalleryImage[];
  materials: { label: string; value: string }[];
};

export const sizingChart: [string, string, string, string][] = [
  ["40", "6", "7", "25.0"],
  ["41", "7", "8", "25.7"],
  ["42", "8", "9", "26.4"],
  ["43", "8.5", "9.5", "27.0"],
  ["44", "9.5", "10.5", "27.7"],
  ["45", "10.5", "11.5", "28.4"],
  ["46", "11", "12", "29.0"],
];

export const sizingNote =
  "Every pair is hand-lasted, so each runs roughly half a size large. If you stand between two sizes, take the smaller. The atelier confirms every size by hand before closing the pair.";

export const editions: Edition[] = [
  {
    slug: "the-sovereign",
    name: "The Sovereign",
    sub: "Ivory calf · Gum",
    price: "€ 890",
    ed: "No. 041 / 350",
    story:
      "The house sneaker, and the pair every other pair is measured against. Full-grain Tuscan calfskin, aged forty days and burnished by hand until it holds the light like old saddle leather, laid over a natural gum sole and closed with a hand-stitched welt. Thirty-eight hours at the bench. Each pair is numbered by the artisan who closed it.",
    img: ivory,
    gallery: [
      { src: ivory, alt: "Aurelia Sovereign sneaker in ivory calfskin, side profile", caption: "Side profile — ivory Tuscan calfskin", fit: "contain" },
      { src: sovereignStitch, alt: "Close-up of the hand-stitched welt and gum sole", caption: "The hand-stitched welt and gum sole", fit: "cover" },
      { src: sovereignHeel, alt: "Heel tab in brown suede with gold foil stamp", caption: "Suede heel tab, gold foil stamp", fit: "cover" },
    ],
    materials: [
      { label: "Upper", value: "Full-grain Tuscan calfskin, vegetable-tanned, hand-burnished" },
      { label: "Lining", value: "Vegetable-tanned calf, unlined quarter panels" },
      { label: "Sole", value: "Natural gum rubber, hand-stitched welt" },
      { label: "Laces", value: "Waxed cotton, ivory" },
      { label: "At the bench", value: "38 hours · one artisan per pair · numbered edition of 350" },
    ],
  },
  {
    slug: "the-regatta",
    name: "The Regatta",
    sub: "Racing green suede",
    price: "€ 940",
    ed: "No. 112 / 200",
    story:
      "First cut for the regatta season, and never quite retired since. Racing green calf suede is panelled against cream box calf, perforated by hand at the toe, and finished on an off-white micro rubber sole. Suede this dense takes the dye slowly and wears in slowly — it is meant to be kept, not replaced.",
    img: green,
    gallery: [
      { src: green, alt: "Aurelia Regatta sneaker in racing green suede and cream leather", caption: "Racing green suede, cream box calf panels", fit: "contain" },
      { src: regattaSuede, alt: "Close-up of green suede and perforated toe", caption: "Hand-perforated toe, dense calf suede", fit: "cover" },
      { src: regattaHeel, alt: "Cream leather heel counter and off-white sole", caption: "Cream heel counter, off-white sole", fit: "cover" },
    ],
    materials: [
      { label: "Upper", value: "Racing green calf suede, cream box calf panelling" },
      { label: "Lining", value: "Vegetable-tanned calf" },
      { label: "Sole", value: "Off-white micro rubber, stitched edge" },
      { label: "Laces", value: "Waxed cotton, cream" },
      { label: "At the bench", value: "36 hours · one artisan per pair · numbered edition of 200" },
    ],
  },
  {
    slug: "the-chancellor",
    name: "The Chancellor",
    sub: "Oxblood box calf",
    price: "€ 980",
    ed: "No. 007 / 150",
    story:
      "The most formal pair in the vault. Oxblood polished box calf, burnished by hand over several days until the colour deepens and the surface takes a glass-like finish, mounted on a tonal vulcanised sole. It darkens with wear the way a good briefcase does — the pair you will still be wearing in ten years.",
    img: burgundy,
    gallery: [
      { src: burgundy, alt: "Aurelia Chancellor sneaker in oxblood box calf", caption: "Oxblood polished box calf, tonal sole", fit: "contain" },
      { src: chancellorLeather, alt: "Close-up of hand-burnished oxblood leather", caption: "Hand-burnished patina, glass finish", fit: "cover" },
      { src: chancellorLace, alt: "Lacing detail with waxed laces and tonal stitching", caption: "Waxed laces, tonal stitching", fit: "cover" },
    ],
    materials: [
      { label: "Upper", value: "Oxblood polished box calf, hand-burnished patina" },
      { label: "Lining", value: "Vegetable-tanned calf" },
      { label: "Sole", value: "Tonal vulcanised rubber, stitched edge" },
      { label: "Laces", value: "Waxed cotton, oxblood" },
      { label: "At the bench", value: "40 hours · one artisan per pair · numbered edition of 150" },
    ],
  },
];
