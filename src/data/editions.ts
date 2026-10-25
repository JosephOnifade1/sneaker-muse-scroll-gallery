import heroShoe from "@/assets/hero-shoe.png";
import shoeGreen from "@/assets/shoe-green.png";
import shoeBurgundy from "@/assets/shoe-burgundy.png";
import atelier from "@/assets/atelier.jpg";
import detailSole from "@/assets/detail-sole.jpg";
import detailStamp from "@/assets/detail-stamp.jpg";
import type { SneakerVariant } from "@/components/Sneaker3DCanvas";

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
  stock: number;
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
  variant: "noir" | "dune" | "slate";
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
    id: "proto-01-noir",
    slug: "proto-01-noir",
    name: "PROTO-01 // NOIR",
    sub: "Stealth Carbon & Ballistic Mesh",
    price: "$ 680",
    priceRaw: 680,
    editionNumber: "SPECIMEN // 041 OF 250",
    currentPiece: 41,
    totalPieces: 250,
    series: "Series I · Parametric Footwear Lab",
    vintage: "DROP 01 // AUTUMN CYBER MATRIX",
    status: "Allocating",
    colorway: "Matte Carbon · Technical Mesh · Decoupled Rubber",
    variant: "noir",
    headline: "Engineered stealth architecture designed for low-drag urban kinetic movement.",
    overview:
      "A study in aerodynamic load distribution. The PROTO-01 Noir pairs a high-modulus thermo-molded outer cage with three-dimensional spacer mesh to maximize torsional rigidity while shaving tare weight to 385 grams.",
    story: [
      "Engineered through computational generative algorithms, the Noir chassis eliminates unnecessary material volume, placing reinforcement ribs exclusively along high-strain muscular vectors.",
      "The ballistic mesh core permits 360-degree cross-laminar airflow, maintaining optimal thermal equilibrium under prolonged high-cadence walking.",
      "Underneath, the decoupled dual-compound outsole features multi-directional siping for razor-sharp mechanical grip on wet asphalt, polished granite, and urban surfaces."
    ],
    heroImage: heroShoe,
    gallery: [
      {
        id: "hero-profile",
        title: "Chassis Lateral Profile",
        subtitle: "Parametric composite lattice with tapered forefoot",
        src: heroShoe
      },
      {
        id: "heel-stamp",
        title: "Heel Stabilizer & Telemetry",
        subtitle: "Integrated external TPU heel cage with laser-etched serial",
        src: detailStamp
      },
      {
        id: "sole-stitch",
        title: "Decoupled Traction Matrix",
        subtitle: "Dual-density high-abrasion rubber with siped flex channels",
        src: detailSole
      },
      {
        id: "atelier-bench",
        title: "Computational Laboratory",
        subtitle: "Precision bonded and hand-finished in our engineering atelier",
        src: atelier
      }
    ],
    materials: {
      upper: {
        title: "Carbon Lattice & Ballistic Mesh",
        origin: "Toray Composites, Japan",
        tannery: "Spec Tech Lab R&D",
        badge: "High-Tensile Lattice",
        description:
          "Reinforced multi-filament ballistic spacer mesh encapsulated within a flexible thermo-molded polyurethane skeleton."
      },
      lining: {
        title: "Micro-Porous Bio-Synthetic Membrane",
        origin: "Zurich, Switzerland",
        tannery: "Swiss Performance Fabrics",
        badge: "Moisture-Wicking",
        description:
          "Seamless inner bootie construction that contours naturally to foot geometry while expelling heat and sweat instantly."
      },
      sole: {
        title: "Decoupled Dual-Density Outsole",
        origin: "Vibram / Civitanova Lab, Italy",
        tannery: "Kinetic Rubber Systems",
        badge: "Multi-Axis Flex",
        description:
          "High-abrasion vulcanized compound with energy return forefoot pucks and decoupled heel strike zones."
      },
      hardware: {
        title: "Aviation-Grade Tension Eyelets",
        origin: "Nagoya, Japan",
        badge: "Zero-Friction",
        description:
          "Anodized matte alloy speed-lace loops engineered to resist tension fatigue over 500,000 stride cycles."
      },
      packaging: {
        title: "Technical Flight Case Suite",
        origin: "Milano, Italy",
        badge: "Specimen Certified",
        description:
          "Delivered in a military-spec hermetic pelican case with serialized aluminum chassis tag, micro-fiber travel sleeves, and calibration certificate."
      }
    },
    specifications: [
      { label: "Specimen Reference", value: "KIN-PR1-NOIR-041/250" },
      { label: "Chassis Construction", value: "Generative Lattice & Inner Bootie" },
      { label: "Outsole Compound", value: "Decoupled Dual-Density Rubber" },
      { label: "Tare Weight (Size 42)", value: "385 grams per chassis" },
      { label: "Heel-to-Toe Drop", value: "8.0 mm Anatomical Offset" },
      { label: "Computational Resolution", value: "13,540 Polygon Surfaces" }
    ],
    sizing: {
      fitAdvice:
        "Engineered true to athletic performance footwear sizing. Accommodates standard D and E foot volumes with adaptive midfoot lockdown. If between sizes, select the larger size.",
      width: "Ergonomic anatomical last with accommodating toe box.",
      sizes: [
        { eu: 39, us: 6.5, uk: 5.5, cm: 25.2, inches: 9.9, stock: 3 },
        { eu: 40, us: 7.5, uk: 6.5, cm: 25.8, inches: 10.1, stock: 4 },
        { eu: 41, us: 8.5, uk: 7.5, cm: 26.5, inches: 10.4, stock: 2 },
        { eu: 42, us: 9.0, uk: 8.0, cm: 27.2, inches: 10.7, stock: 2 },
        { eu: 43, us: 10.0, uk: 9.0, cm: 27.8, inches: 10.9, stock: 1 },
        { eu: 44, us: 11.0, uk: 10.0, cm: 28.5, inches: 11.2, stock: 3 },
        { eu: 45, us: 12.0, uk: 11.0, cm: 29.2, inches: 11.5, stock: 2 },
        { eu: 46, us: 13.0, uk: 12.0, cm: 29.8, inches: 11.7, stock: 1 }
      ]
    },
    provenance: {
      cordwainer: "Lead Systems Architect K. Vance",
      benchLocation: "KINESIS Lab 04, Brera, Milano",
      productionHours: 28,
      serialCertificate: "KINESIS-PR1-041-NOIR"
    }
  },
  {
    id: "proto-01-dune",
    slug: "proto-01-dune",
    name: "PROTO-01 // DUNE",
    sub: "Sandstone Nubuck & Raw Composite",
    price: "$ 720",
    priceRaw: 720,
    editionNumber: "SPECIMEN // 112 OF 180",
    currentPiece: 112,
    totalPieces: 180,
    series: "Series I · Parametric Footwear Lab",
    vintage: "DROP 01 // TERRA DESERT EXPEDITION",
    status: "Few Remaining",
    colorway: "Dune Sandstone · Desert Bone · Amber Pod Sole",
    variant: "dune",
    headline: "Organic mineral tactility synthesized with high-tensile structural architecture.",
    overview:
      "Engineered for desert expeditions and high-temperature urban navigation. Combines mineral-washed split nubuck with heat-dissipating ripstop nylon and a translucent amber rubber traction outsole.",
    story: [
      "Inspired by the shifting dunes of the Erg Chebbi and modern brutalist desert architecture, Dune bridges the boundary between earth-toned organic textiles and space-age composites.",
      "The upper features dual-zone ventilation channels that draw air across the arch on every impact phase, expelling vapor through exhaust vents at the heel counter.",
      "Finished with hand-burnished edge bevels and sealed with hydrophobic fluorine-free silicone for weather repellency."
    ],
    heroImage: shoeGreen,
    gallery: [
      {
        id: "hero-profile",
        title: "Dune Lateral Architecture",
        subtitle: "Sandstone nubuck with bone structural ribs",
        src: shoeGreen
      },
      {
        id: "heel-stamp",
        title: "Chassis Stabilization Cradle",
        subtitle: "Reinforced heel counter with serialized designation",
        src: detailStamp
      },
      {
        id: "sole-stitch",
        title: "Translucent Amber Compound",
        subtitle: "Multi-density kinetic tread pods with anti-debris channels",
        src: detailSole
      },
      {
        id: "atelier-bench",
        title: "Hand Lasting & Calibration",
        subtitle: "Precision assembled on anatomical biomechanical lasts",
        src: atelier
      }
    ],
    materials: {
      upper: {
        title: "Sandstone Mineral Nubuck & Cordura",
        origin: "Tuscany / Biella, Italy",
        tannery: "Conceria Stefania Suede Reserve",
        badge: "Hydrophobic Coated",
        description:
          "Reverse split suede treated with natural pine waxes paired with high-abrasion 500D Cordura nylon panels."
      },
      lining: {
        title: "Glove-Soft Bio-Ceramic Knit",
        origin: "Veneto, Italy",
        badge: "Thermal-Regulating",
        description:
          "Continuous-loop knit that reflects body heat while venting humidity away from contact zones."
      },
      sole: {
        title: "Translucent Amber Hevea Pods",
        origin: "Civitanova Marche, Italy",
        badge: "Shock-Dissipating",
        description:
          "Vulcanized natural gum rubber pods calibrated to 55-Shore durometer for pillowy impact dampening."
      },
      hardware: {
        title: "Para-Cord Tensile Laces",
        origin: "Kyoto / Milano",
        badge: "Mil-Spec Braid",
        description:
          "High-tensile aramid core with tight nylon exterior weave to resist fraying and knot slippage."
      },
      packaging: {
        title: "Expedition Flight Kit",
        origin: "Milano, Italy",
        badge: "Numbered 112/180",
        description:
          "Includes vacuum-sealed travel pouch, cleaning suede crepe, serialized brass token, and technical dossier."
      }
    },
    specifications: [
      { label: "Specimen Reference", value: "KIN-PR1-DUNE-112/180" },
      { label: "Chassis Construction", value: "Hybrid Nubuck & Ripstop Shell" },
      { label: "Outsole Compound", value: "Amber Gum Multi-Pod System" },
      { label: "Tare Weight (Size 42)", value: "398 grams per chassis" },
      { label: "Heel-to-Toe Drop", value: "8.5 mm Ergonomic Offset" },
      { label: "Computational Resolution", value: "13,540 Polygon Surfaces" }
    ],
    sizing: {
      fitAdvice:
        "True to size. Soft nubuck and flexible cordura bootie adapt to foot width after 2 hours of wear. Take your regular sneaker size.",
      width: "Relaxed ergonomic volume with secure heel cup.",
      sizes: [
        { eu: 39, us: 6.5, uk: 5.5, cm: 25.2, inches: 9.9, stock: 1 },
        { eu: 40, us: 7.5, uk: 6.5, cm: 25.8, inches: 10.1, stock: 2 },
        { eu: 41, us: 8.5, uk: 7.5, cm: 26.5, inches: 10.4, stock: 2 },
        { eu: 42, us: 9.0, uk: 8.0, cm: 27.2, inches: 10.7, stock: 1 },
        { eu: 43, us: 10.0, uk: 9.0, cm: 27.8, inches: 10.9, stock: 0 },
        { eu: 44, us: 11.0, uk: 10.0, cm: 28.5, inches: 11.2, stock: 2 },
        { eu: 45, us: 12.0, uk: 11.0, cm: 29.2, inches: 11.5, stock: 1 },
        { eu: 46, us: 13.0, uk: 12.0, cm: 29.8, inches: 11.7, stock: 1 }
      ]
    },
    provenance: {
      cordwainer: "Senior Material Engineer D. Rossi",
      benchLocation: "KINESIS Lab 04, Brera, Milano",
      productionHours: 32,
      serialCertificate: "KINESIS-PR1-112-DUNE"
    }
  },
  {
    id: "proto-01-slate",
    slug: "proto-01-slate",
    name: "PROTO-01 // SLATE",
    sub: "Industrial Titanium & Cyber Amber Matrix",
    price: "$ 750",
    priceRaw: 750,
    editionNumber: "SPECIMEN // 007 OF 120",
    currentPiece: 7,
    totalPieces: 120,
    series: "Series I · Parametric Footwear Lab",
    vintage: "DROP 01 // TITANIUM MONOLITH",
    status: "Reserve Only",
    colorway: "Industrial Slate · Cyber White · High-Tension Black",
    variant: "slate",
    headline: "High-contrast architectural monolith engineered for extreme torsional control.",
    overview:
      "The most technical specimen in the KINESIS registry. Featuring dual-layer lateral containment rails, high-frequency sonic welded seams, and high-contrast industrial livery inspired by aerospace prototyping.",
    story: [
      "Designed as the conceptual benchmark of the PROTO collection, the Slate was developed using dynamic gait stress simulations to engineer zero-loss energy transfer.",
      "The multi-layered upper features reflective technical micro-striping that illuminates under direct strobe light while remaining understated in ambient daytime settings.",
      "Limited to strictly 120 units worldwide, each chassis is individually inspected, weight-balanced within 1.5 grams, and certified by the lead architect."
    ],
    heroImage: shoeBurgundy,
    gallery: [
      {
        id: "hero-profile",
        title: "Slate Kinetic Profile",
        subtitle: "Titanium grey panels with high-frequency structural welds",
        src: shoeBurgundy
      },
      {
        id: "heel-stamp",
        title: "Chassis Number Calibration",
        subtitle: "Serial No. 007 / 120 hot-stamped on outer heel rail",
        src: detailStamp
      },
      {
        id: "sole-stitch",
        title: "Articulated Kinetic Sole",
        subtitle: "Decoupled impact zones with high-durometer lateral skid plate",
        src: detailSole
      },
      {
        id: "atelier-bench",
        title: "Final QA Inspection",
        subtitle: "Torsional stiffness and laser alignment testing",
        src: atelier
      }
    ],
    materials: {
      upper: {
        title: "Titanium Tech-Nylon & Molded TPU",
        origin: "Torino / Stuttgart",
        tannery: "Advanced Polymer R&D",
        badge: "Sonic Welded",
        description:
          "High-density ripstop weave reinforced with bonded TPU containment exoskeleton to eliminate lateral roll."
      },
      lining: {
        title: "Seamless Hydro-Phobic Mesh",
        origin: "Frankfurt, Germany",
        badge: "Anti-Friction",
        description:
          "Frictionless sockliner with antimicrobial silver-ion treatment for marathon wear."
      },
      sole: {
        title: "Multi-Density Kinetic Outsole",
        origin: "Civitanova Marche, Italy",
        badge: "Reinforced Shank",
        description:
          "Carbon-infused midfoot stabilization plate bonded to high-friction micro-siped rubber pods."
      },
      hardware: {
        title: "Aircraft Alloy Cable Lacing",
        origin: "Kyoto / Tokyo",
        badge: "Cable Tension",
        description:
          "Braided dynema fiber core with micro-toggle closure system."
      },
      packaging: {
        title: "Numbered Aluminum Archival Case",
        origin: "Milano, Italy",
        badge: "Vault Edition",
        description:
          "Milled aerospace aluminum case with custom cut EVA foam cradle and RFID certificate."
      }
    },
    specifications: [
      { label: "Specimen Reference", value: "KIN-PR1-SLATE-007/120" },
      { label: "Chassis Construction", value: "Sonic-Welded TPU & Tech Nylon" },
      { label: "Outsole Compound", value: "Carbon Shank & Dual Density Rubber" },
      { label: "Tare Weight (Size 42)", value: "392 grams per chassis" },
      { label: "Heel-to-Toe Drop", value: "8.0 mm Precision Drop" },
      { label: "Computational Resolution", value: "13,540 Polygon Surfaces" }
    ],
    sizing: {
      fitAdvice:
        "Precise ergonomic fit. Lateral containment rails hold the midfoot firmly with comfortable forefoot spread. True to size.",
      width: "Standard performance D width with anatomical arch support.",
      sizes: [
        { eu: 39, us: 6.5, uk: 5.5, cm: 25.2, inches: 9.9, stock: 1 },
        { eu: 40, us: 7.5, uk: 6.5, cm: 25.8, inches: 10.1, stock: 2 },
        { eu: 41, us: 8.5, uk: 7.5, cm: 26.5, inches: 10.4, stock: 1 },
        { eu: 42, us: 9.0, uk: 8.0, cm: 27.2, inches: 10.7, stock: 1 },
        { eu: 43, us: 10.0, uk: 9.0, cm: 27.8, inches: 10.9, stock: 1 },
        { eu: 44, us: 11.0, uk: 10.0, cm: 28.5, inches: 11.2, stock: 1 },
        { eu: 45, us: 12.0, uk: 11.0, cm: 29.2, inches: 11.5, stock: 0 },
        { eu: 46, us: 13.0, uk: 12.0, cm: 29.8, inches: 11.7, stock: 1 }
      ]
    },
    provenance: {
      cordwainer: "Chief Kinetic Architect M. Richter",
      benchLocation: "KINESIS Lab 04, Brera, Milano",
      productionHours: 36,
      serialCertificate: "KINESIS-PR1-007-SLATE"
    }
  }
];

export const getEditionBySlug = (slug: string): Edition | undefined => {
  // Aliases mapping old routes to new technical editions
  const aliasMap: Record<string, string> = {
    "the-sovereign": "proto-01-noir",
    "the-regatta": "proto-01-dune",
    "the-chancellor": "proto-01-slate",
  };
  const target = aliasMap[slug] || slug;
  return EDITIONS.find((e) => e.slug === target || e.id === target) || EDITIONS[0];
};
