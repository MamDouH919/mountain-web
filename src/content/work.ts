export const workCategories = ["designs", "logos", "websites", "apps"] as const;
export type WorkCategory = (typeof workCategories)[number];

export type Project = {
  id: string;
  category: WorkCategory;
  /** Card shape in the masonry grid. The cover is cropped to fit it. */
  aspect: "tall" | "square" | "wide";
  /** Two colours for the generated fallback art and the card's stack layers. */
  palette: [string, string];
  featured?: boolean;
  /**
   * Image paths in /public, cover first. One image gives a single card; two
   * or more give a stacked card you can scrub through on hover, and every
   * image appears in the lightbox. Leave empty to use generated cover art
   * (case studies get theirs from their phone shots).
   */
  images?: string[];
  /**
   * A full case study at /work/<id>. Projects with one open their page from
   * the card instead of the lightbox. Copy lives in messages/*.json under
   * Work.projects.<id>.study.
   */
  caseStudy?: CaseStudy;
};

export type CaseStudy = {
  /** Live site, shown as "Visit live site". */
  url: string;
  year: string;
  /** Desktop screenshots, framed in a browser window. Hero shot first. */
  screens: string[];
  /** Mobile screenshots, framed as phones. */
  phones: string[];
  /** Keys under study.features, in display order. */
  features: CaseStudyFeature[];
  /** Keys under study.stats. */
  stats: string[];
  stack: string[];
};

export const featureIcons = ["qr", "page", "dashboard", "analytics", "ads", "contact", "language", "cloud"] as const;
export type CaseStudyFeature = (typeof featureIcons)[number];

/** `/work/<id>/1.webp` … `/work/<id>/<count>.webp` */
const shots = (id: string, count: number) =>
  Array.from({ length: count }, (_, i) => `/work/${id}/${i + 1}.webp`);

// PLACEHOLDER projects and images. Replace the files in public/work/ with real
// shots (any of jpg, png, webp or avif, any size) and list them in `images`.
// Titles and types live in messages/*.json under Work.projects.
export const projects: Project[] = [
  {
    id: "qr-platform",
    category: "websites",
    aspect: "tall",
    palette: ["#1c1917", "#f97316"],
    featured: true,
    caseStudy: {
      url: "https://qr.mountain-egy.site",
      year: "2025–2026",
      screens: ["/work/qr-platform/home.jpg", "/work/qr-platform/customers.jpg"],
      phones: [
        "/work/qr-platform/phone-arab-clinic.jpg",
        "/work/qr-platform/phone-pizza-pepo.jpg",
        "/work/qr-platform/phone-dr-coffee.jpg",
        "/work/qr-platform/phone-steakburger.jpg",
      ],
      features: ["qr", "page", "contact", "dashboard", "analytics", "ads", "language", "cloud"],
      stats: ["clients", "visits", "languages"],
      stack: ["Next.js", "React", "NestJS", "MongoDB", "Material UI", "Cloudflare R2"],
    },
  },
  { id: "nile-coffee", category: "logos", aspect: "tall", palette: ["#7c2d12", "#f59e0b"], featured: true, images: shots("nile-coffee", 4) },
  { id: "zayed-clinic", category: "websites", aspect: "wide", palette: ["#0c4a6e", "#38bdf8"], featured: true, images: shots("zayed-clinic", 3) },
  { id: "oud-house", category: "designs", aspect: "square", palette: ["#3b0764", "#c084fc"], featured: true, images: shots("oud-house", 5) },
  { id: "fit-cairo", category: "apps", aspect: "tall", palette: ["#14532d", "#a3e635"], featured: true, images: shots("fit-cairo", 3) },
  { id: "sahel-resort", category: "designs", aspect: "wide", palette: ["#164e63", "#fde68a"], featured: true, images: shots("sahel-resort", 2) },
  { id: "atlas-realty", category: "logos", aspect: "square", palette: ["#1c1917", "#d6d3d1"], images: shots("atlas-realty", 1) },
  { id: "kemet-fashion", category: "websites", aspect: "tall", palette: ["#450a0a", "#fb7185"], featured: true, images: shots("kemet-fashion", 4) },
  { id: "bloom-bakery", category: "designs", aspect: "square", palette: ["#831843", "#fbcfe8"], images: shots("bloom-bakery", 3) },
  { id: "nova-pay", category: "apps", aspect: "wide", palette: ["#1e1b4b", "#818cf8"], images: shots("nova-pay", 1) },
  { id: "pharaoh-tech", category: "logos", aspect: "tall", palette: ["#422006", "#facc15"], images: shots("pharaoh-tech", 3) },
];
