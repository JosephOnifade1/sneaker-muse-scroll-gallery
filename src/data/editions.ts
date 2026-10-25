import heroShoe from "@/assets/hero-shoe.png";
import shoeGreen from "@/assets/shoe-green.png";
import shoeBurgundy from "@/assets/shoe-burgundy.png";
import atelier from "@/assets/atelier.jpg";
import detailSole from "@/assets/detail-sole.jpg";
import detailStamp from "@/assets/detail-stamp.jpg";

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  aspect?: string;
}

export interface MaterialDetail {
  title: string;
  origin: string;
  tannery?: string;
  description: string;
  badge?: string;
}

export interface SizeOption {
  eu: number;
  us: number;
  uk: number;
  cm: number;
  inches: number;
  stock: number; // remaining allocation for this size
}

export interface Edition {
  id: string;
  slug: string;
  name: string;
  sub: string;
  price: string;
  priceRaw: number;
  editionNumber: string;
  currentPiece: number;
  totalPieces: number;
  series: string;
  vintage: string;
  status: "Allocating" | "Few Remaining" | "Reserve Only";
  colorway: string;
  headline: string;
  overview: string;
  story: string[];
  heroImage: string;
  gallery: GalleryItem[];
  materials: {
    upper: MaterialDetail;
    lining: MaterialDetail;
    sole: MaterialDetail;
    hardware: MaterialDetail;
    packaging: MaterialDetail;
  };
  specifications: { label: string; value: string }[];
  sizing: {
    fitAdvice: string;
    width: string;
    sizes: SizeOption[];
  };
  provenance: {
    cordwainer: string;
    benchLocation: string;
    productionHours: number;
    serialCertificate: string;
  };
}

export const EDITIONS: Edition[] = [
  {
    id: "the-sovereign",
    slug: "the-sovereign",
    name: "The Sovereign",
    sub: "Ivory calf · Gum",
    price: "€ 890",
    priceRaw: 890,
    editionNumber: "No. 041 / 350",
    currentPiece: 41,
    totalPieces: 350,
    series: "Series VII · 350 Pairs Worldwide",
    vintage: "MCMXXIV Autumn Allocation",
    status: "Allocating",
    colorway: "Ivory Bianco · Cognac Counter · Amber Gum",
    headline: "The quiet benchmark of understated Milanese proportions.",
    overview:
      "Crafted from 1.6mm full-grain French calfskin from Tanneries d'Annonay, aged for forty days before cutting. The Sovereign balances athletic ease with the strict bespoke silhouette of a Savile Row brogue.",
    story: [
      "The Sovereign was conceived not as sportswear, but as the quiet shoe for individuals who refuse loud branding. Each skin is inspected under raking morning light in our Brera atelier; fewer than one in twelve hides meets our grain density threshold.",
      "The upper is hand-burnished using bee-propolis wax over a heated boxwood bone, giving the ivory surface a warm, parchment-like translucency that patinas with the wearer's gait.",
      "Underneath, a Civitanova Marche natural gum sole is joined to the upper via an unbroken 360-degree Blake stitch, ensuring the sneaker can be rebuilt repeatedly in our workshop over decades."
    ],
    heroImage: heroShoe,
    gallery: [
      {
        id: "hero-profile",
        title: "Lateral Profile",
        subtitle: "Sculpted arch with tapered forefoot",
        src: heroShoe
      },
      {
        id: "heel-stamp",
        title: "Heel Counter & Serial",
        subtitle: "24kt gold foil hot-stamped edition archive number",
        src: detailStamp
      },
      {
        id: "sole-stitch",
        title: "Blake Welt & Tread",
        subtitle: "Civitanova Marche natural amber gum with 11-spi wax stitch",
        src: detailSole
      },
      {
        id: "atelier-bench",
        title: "The Cobbler's Bench",
        subtitle: "Hand-lasted and finished on Via Fiori Chiari, Milano",
        src: atelier
      }
    ],
    materials: {
      upper: {
        title: "French Full-Grain Calfskin",
        origin: "Tanneries d'Annonay, Rhône-Alpes, France",
        tannery: "Annonay Box-Calf Selection A+",
        badge: "1.6mm Gauge",
        description:
          "Sourced exclusively from alpine heifers. Vegetable retanned for 40 days to retain natural tensile memory and subtle micro-pebble grain."
      },
      lining: {
        title: "Un-dyed Butter-Soft Calf Lining",
        origin: "Arzignano, Veneto, Italy",
        tannery: "Mastrotto Veg-Tan Reserve",
        badge: "Hypoallergenic",
        description:
          "Glove-grade calfskin lining that breathes naturally and contours to the unique temperature and pressure points of your foot."
      },
      sole: {
        title: "Natural Amber Gum Cupsole",
        origin: "Civitanova Marche, Italy",
        tannery: "Artisanal Rubber Mills",
        badge: "Blake Welted",
        description:
          "100% natural hevea sap vulcanized for flexible shock absorption. Blake stitched with 11 waxed linen stitches per inch."
      },
      hardware: {
        title: "Solid Antiqued Brass",
        origin: "Florence, Italy",
        badge: "Hand-Turned",
        description:
          "Solid brass eyelets cold-stamped and treated with an antiqued sulfur dip so they never chip, rust, or flake."
      },
      packaging: {
        title: "House Packaging & Cedar Trees",
        origin: "Milano, Italy",
        badge: "Complete Suite",
        description:
          "Delivered with hand-turned aromatic red cedar shoe trees, twin heavy linen travel dustbags, and a hand-signed wax-sealed certificate of allocation."
      }
    },
    specifications: [
      { label: "Edition Reference", value: "AUR-SOV-041/350" },
      { label: "Construction", value: "360° Blake Welted Cupsole" },
      { label: "Sole Material", value: "100% Natural Amber Gum" },
      { label: "Artisan Hours", value: "38 Hours Continuous Handwork" },
      { label: "Weight (Size 42)", value: "435 grams per shoe" },
      { label: "Resoling", value: "Lifetime Atelier Resoling Service" }
    ],
    sizing: {
      fitAdvice:
        "True to European dress shoe sizing. If you normally wear athletic sneakers (e.g. Nike, Adidas, New Balance), we recommend selecting one full size down. If between sizes, choose the smaller size.",
      width: "Standard European D/E width with accommodating toe box.",
      sizes: [
        { eu: 39, us: 6.5, uk: 5.5, cm: 25.2, inches: 9.9, stock: 2 },
        { eu: 40, us: 7.5, uk: 6.5, cm: 25.8, inches: 10.1, stock: 3 },
        { eu: 41, us: 8.5, uk: 7.5, cm: 26.5, inches: 10.4, stock: 4 },
        { eu: 42, us: 9.0, uk: 8.0, cm: 27.2, inches: 10.7, stock: 2 },
        { eu: 43, us: 10.0, uk: 9.0, cm: 27.8, inches: 10.9, stock: 1 },
        { eu: 44, us: 11.0, uk: 10.0, cm: 28.5, inches: 11.2, stock: 3 },
        { eu: 45, us: 12.0, uk: 11.0, cm: 29.2, inches: 11.5, stock: 2 },
        { eu: 46, us: 13.0, uk: 12.0, cm: 29.8, inches: 11.7, stock: 1 }
      ]
    },
    provenance: {
      cordwainer: "Maestro Giancarlo V.",
      benchLocation: "Via Fiori Chiari 14, Brera, Milano",
      productionHours: 38,
      serialCertificate: "AURELIA-SOV-041-MCMXXIV"
    }
  },
  {
    id: "the-regatta",
    slug: "the-regatta",
    name: "The Regatta",
    sub: "Racing green suede",
    price: "€ 940",
    priceRaw: 940,
    editionNumber: "No. 112 / 200",
    currentPiece: 112,
    totalPieces: 200,
    series: "Series IV · 200 Pairs Worldwide",
    vintage: "MCMXXIV Maritime Allocation",
    status: "Few Remaining",
    colorway: "British Racing Green · Raw Ecru · Vintage Gum",
    headline: "Deep maritime suede steeped in historical sporting aristocracy.",
    overview:
      "Crafted from thick Italian velour suede from Santa Croce sull'Arno, conditioned with natural pine-resin oils for water repellency and paired with double-waxed ecru saddle stitching.",
    story: [
      "Inspired by the historic Riva runabouts of Lake Como and vintage regatta pennants, The Regatta represents an uncompromising union of tactile richness and wet-weather resilience.",
      "The suede is treated at the dye stage with microscopic fluorocarbon-free oils, yielding a rich emerald nap that rejects ocean mist and light rain while maintaining its velvety nap.",
      "Constructed around a reinforced heel counter clad in vegetable-tanned natural vachetta leather that deepens into a warm honey glow with each mile walked."
    ],
    heroImage: shoeGreen,
    gallery: [
      {
        id: "hero-profile",
        title: "Lateral Profile",
        subtitle: "Rich racing green nap with ecru accents",
        src: shoeGreen
      },
      {
        id: "heel-stamp",
        title: "Archive Number Stamp",
        subtitle: "Serial No. 112 / 200 hand-stamped on suede collar",
        src: detailStamp
      },
      {
        id: "sole-stitch",
        title: "Blake Welted Outsole",
        subtitle: "Reinforced vulcanized rubber with channeled stitch track",
        src: detailSole
      },
      {
        id: "atelier-bench",
        title: "Artisan Lasting",
        subtitle: "Hand-shaped over vintage beechwood lasts for 72 hours",
        src: atelier
      }
    ],
    materials: {
      upper: {
        title: "Tuscan Velour Suede",
        origin: "Santa Croce sull'Arno, Tuscany, Italy",
        tannery: "Conceria Stefania Suede Reserve",
        badge: "Water-Repellent Nap",
        description:
          "Selected from premium reverse-side calf splits. Deep dyed in small wooden drums to achieve the characteristic racing green depth."
      },
      lining: {
        title: "Perforated Calfskin Arch Lining",
        origin: "Veneto, Italy",
        badge: "Climate-Regulating",
        description:
          "Micro-perforated along the arch and instep for enhanced cross-ventilation during warm Mediterranean summer afternoons."
      },
      sole: {
        title: "Civitanova Margom Cupsole",
        origin: "Marche, Italy",
        badge: "360° Sidewall Stitch",
        description:
          "Dense non-marking natural rubber compound with molded heel-strike absorption puck and ribbed anti-slip profile."
      },
      hardware: {
        title: "Waxed Braided Cotton Laces",
        origin: "Kyoto / Milano",
        badge: "Custom Weave",
        description:
          "Eight-strand tight-braid Egyptian cotton coated in organic beeswax to resist unravelling and hold knot tension."
      },
      packaging: {
        title: "Maritime Suite & Brass Horn",
        origin: "Milano, Italy",
        badge: "Hand-Numbered",
        description:
          "Includes hand-turned brass shoe horn, suede reviving crepe brush, custom cedar stretchers, and certified certificate."
      }
    },
    specifications: [
      { label: "Edition Reference", value: "AUR-REG-112/200" },
      { label: "Construction", value: "Strobel & Blake Hybrid Welt" },
      { label: "Sole Material", value: "Civitanova Margom Rubber" },
      { label: "Artisan Hours", value: "41 Hours Continuous Handwork" },
      { label: "Weight (Size 42)", value: "448 grams per shoe" },
      { label: "Resoling", value: "Full Atelier Support" }
    ],
    sizing: {
      fitAdvice:
        "Fits true to traditional luxury dress shoes. Soft suede molds quickly to foot contours within 3-4 hours of initial wear. Take your regular dress shoe size.",
      width: "Medium-relaxed D width, gentle volume through instep.",
      sizes: [
        { eu: 39, us: 6.5, uk: 5.5, cm: 25.2, inches: 9.9, stock: 1 },
        { eu: 40, us: 7.5, uk: 6.5, cm: 25.8, inches: 10.1, stock: 2 },
        { eu: 41, us: 8.5, uk: 7.5, cm: 26.5, inches: 10.4, stock: 2 },
        { eu: 42, us: 9.0, uk: 8.0, cm: 27.2, inches: 10.7, stock: 1 },
        { eu: 43, us: 10.0, uk: 9.0, cm: 27.8, inches: 10.9, stock: 0 }, // waitlist
        { eu: 44, us: 11.0, uk: 10.0, cm: 28.5, inches: 11.2, stock: 2 },
        { eu: 45, us: 12.0, uk: 11.0, cm: 29.2, inches: 11.5, stock: 1 },
        { eu: 46, us: 13.0, uk: 12.0, cm: 29.8, inches: 11.7, stock: 1 }
      ]
    },
    provenance: {
      cordwainer: "Maestra Elena R.",
      benchLocation: "Via Fiori Chiari 14, Brera, Milano",
      productionHours: 41,
      serialCertificate: "AURELIA-REG-112-MCMXXIV"
    }
  },
  {
    id: "the-chancellor",
    slug: "the-chancellor",
    name: "The Chancellor",
    sub: "Oxblood box calf",
    price: "€ 980",
    priceRaw: 980,
    editionNumber: "No. 007 / 150",
    currentPiece: 7,
    totalPieces: 150,
    series: "Series II · 150 Pairs Worldwide",
    vintage: "MCMXXIV Private Reserve",
    status: "Reserve Only",
    colorway: "Oxblood Bordeaux · Smoked Charcoal Rubber",
    headline: "Rare museum-calf patina with an authoritative formal presence.",
    overview:
      "Tanned with chestnut bark and mimosa extracts over seven weeks, then hand-sponged with natural pigments to achieve a multi-tonal smoky oxblood depth that cannot be replicated by machinery.",
    story: [
      "The rarest offering from the atelier, The Chancellor is limited to strictly 150 pairs worldwide. The museum calfskin is finished entirely by hand using antique bone burnishers and circular wax friction.",
      "The dark burgundy hue shifts under direct evening illumination from deep mahogany to fiery port wine, creating a mesmerizing optical depth reminiscent of 19th-century diplomatic armchairs.",
      "Each pair is numbered by hand with gold leaf on the inner tongue and accompanied by an authenticated archival certificate signed by the master artisan."
    ],
    heroImage: shoeBurgundy,
    gallery: [
      {
        id: "hero-profile",
        title: "Lateral Profile",
        subtitle: "Burnished oxblood museum patina",
        src: shoeBurgundy
      },
      {
        id: "heel-stamp",
        title: "Archive Number Stamp",
        subtitle: "Serial No. 007 / 150 hot-stamped in gold leaf",
        src: detailStamp
      },
      {
        id: "sole-stitch",
        title: "Stitched Dark Outsole",
        subtitle: "Smoked natural rubber with recessed wax stitch channel",
        src: detailSole
      },
      {
        id: "atelier-bench",
        title: "The Hand Finish",
        subtitle: "Artisans burnishing edges with hot carnauba wax",
        src: atelier
      }
    ],
    materials: {
      upper: {
        title: "Museum Box Calfskin",
        origin: "Ilcea Tannery, Torino, Italy",
        tannery: "Radica Museum Calf Reserve",
        badge: "Rare Marble Patina",
        description:
          "Slow vegetable tanning utilizing oak bark and chestnut liquors. Finished with hand-applied marbled dye techniques."
      },
      lining: {
        title: "Cognac Glove-Soft Calf",
        origin: "Florence, Italy",
        badge: "Zero Synthetic Backing",
        description:
          "Unadulterated aniline calfskin lining that absorbs foot moisture effortlessly and stays cool even after sixteen hours of continuous wear."
      },
      sole: {
        title: "Smoked Rubber Atelier Sole",
        origin: "Civitanova Marche, Italy",
        badge: "Blake Construction",
        description:
          "Custom tinted charcoal-smoke rubber with deep micro-siping for silent traction on wet marble and cobblestone."
      },
      hardware: {
        title: "Gunmetal Antiqued Eyelets",
        origin: "Milano, Italy",
        badge: "Cold-Forged",
        description:
          "Cold-forged iron alloy treated with dark oil quenching to prevent corrosion while complementing the deep oxblood leather."
      },
      packaging: {
        title: "Collector's Vault Presentation",
        origin: "Milano, Italy",
        badge: "Numbered 007/150",
        description:
          "Housed in a handmade dark walnut presentation chest with velvet lining, bespoke shoe trees, and private concierge key card."
      }
    },
    specifications: [
      { label: "Edition Reference", value: "AUR-CHN-007/150" },
      { label: "Construction", value: "Traditional Blake Welt" },
      { label: "Sole Material", value: "Smoked Natural Hevea Rubber" },
      { label: "Artisan Hours", value: "46 Hours Continuous Handwork" },
      { label: "Weight (Size 42)", value: "460 grams per shoe" },
      { label: "Resoling", value: "Bespoke Concierge Lifetime" }
    ],
    sizing: {
      fitAdvice:
        "Firm initial hand-fit that yields gracefully after two wears. If you have a wider forefoot (EE) or high instep, order a half size larger. Otherwise true to European formal sizing.",
      width: "Classic Italian sleek D width with structured toe box.",
      sizes: [
        { eu: 39, us: 6.5, uk: 5.5, cm: 25.2, inches: 9.9, stock: 1 },
        { eu: 40, us: 7.5, uk: 6.5, cm: 25.8, inches: 10.1, stock: 1 },
        { eu: 41, us: 8.5, uk: 7.5, cm: 26.5, inches: 10.4, stock: 2 },
        { eu: 42, us: 9.0, uk: 8.0, cm: 27.2, inches: 10.7, stock: 1 },
        { eu: 43, us: 10.0, uk: 9.0, cm: 27.8, inches: 10.9, stock: 1 },
        { eu: 44, us: 11.0, uk: 10.0, cm: 28.5, inches: 11.2, stock: 1 },
        { eu: 45, us: 12.0, uk: 11.0, cm: 29.2, inches: 11.5, stock: 1 },
        { eu: 46, us: 13.0, uk: 12.0, cm: 29.8, inches: 11.7, stock: 0 } // waitlist
      ]
    },
    provenance: {
      cordwainer: "Maestro Giancarlo V. & Master Luigi T.",
      benchLocation: "Via Fiori Chiari 14, Brera, Milano",
      productionHours: 46,
      serialCertificate: "AURELIA-CHN-007-MCMXXIV"
    }
  }
];

export function getEditionBySlug(slug: string): Edition | undefined {
  return EDITIONS.find((e) => e.slug === slug || e.id === slug);
}
