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
  url?: string;
  /** Store listings of a mobile app, shown as download badges. */
  stores?: { appStore?: string; googlePlay?: string };
  year: string;
  /**
   * Desktop screenshots, framed in a browser window. Hero shot first. Leave
   * empty for an app: its phones take the hero instead. A shot from another
   * address than `url`, such as a dashboard, names its own.
   */
  screens: (string | { src: string; url: string })[];
  /** Mobile screenshots, framed as phones. */
  phones: string[];
  /** Keys under study.features, in display order. */
  features: CaseStudyFeature[];
  /** Keys under study.stats. */
  stats: string[];
  stack: string[];
  /** Features that only come with the full plan, tagged on their cards. */
  fullOnly?: CaseStudyFeature[];
  /** A product sold in two plans gets a side-by-side comparison. */
  plans?: PlanComparison;
  /** Who uses the product, as cards: keys under study.audiences. */
  audiences?: { key: string; icon: CaseStudyFeature }[];
  /** The main flow, step by step: keys under study.journey.steps. */
  journey?: string[];
};

/** Copy lives under study.plans: catalog/full cards, rows.<key> and the upgrade note. */
export type PlanComparison = {
  /** Keys under study.plans.rows, in table order. The full plan has every row. */
  rows: string[];
  /** The rows the catalog plan also has. */
  catalog: string[];
  /** Live stores on each plan, linked under its card. */
  examples: { catalog: string[]; full: string[] };
};

export const featureIcons = [
  "qr", "page", "dashboard", "analytics", "ads", "contact", "language", "cloud",
  "storefront", "search", "whatsapp", "branding", "orders", "coupons", "inventory", "finance", "roles", "tenants",
  "rider", "owner", "driver", "booking", "map", "kyc", "handover", "payments", "reviews", "notifications", "fleet", "reports",
  "tryon", "lens", "prescription", "doctors", "delivery",
] as const;
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
  {
    id: "product-preview",
    category: "websites",
    aspect: "wide",
    palette: ["#1c1410", "#c9a26b"],
    featured: true,
    caseStudy: {
      url: "https://gravity.novaslash.com",
      year: "2026",
      screens: ["/work/product-preview/home.jpg", "/work/product-preview/category.jpg"],
      phones: [
        "/work/product-preview/phone-gravity-home.jpg",
        "/work/product-preview/phone-ranosh-home.jpg",
        "/work/product-preview/phone-gravity-product.jpg",
        "/work/product-preview/phone-ranosh-product.jpg",
      ],
      features: [
        "storefront", "search", "whatsapp", "branding", "language", "dashboard", "roles", "tenants",
        "orders", "coupons", "inventory", "finance",
      ],
      fullOnly: ["orders", "coupons", "inventory", "finance"],
      stats: ["plans", "stores", "languages"],
      stack: ["Next.js", "React", "NestJS", "MongoDB", "Material UI", "Redux Toolkit", "Cloudflare R2"],
      plans: {
        rows: ["website", "whatsapp", "dashboard", "cart", "accounts", "coupons", "tracking", "returns", "inventory", "finance", "couriers"],
        catalog: ["website", "whatsapp", "dashboard"],
        examples: {
          catalog: ["https://gravity.novaslash.com", "https://ranosh.novaslash.com"],
          full: [],
        },
      },
    },
  },
  {
    id: "ala-elsare3",
    category: "apps",
    aspect: "tall",
    palette: ["#2a0505", "#c81e1e"],
    featured: true,
    caseStudy: {
      stores: {
        appStore: "https://apps.apple.com/eg/app/3ala-el-sare3/id6758057778",
        googlePlay: "https://play.google.com/store/apps/details?id=com.alaaelsare3.app",
      },
      year: "2026",
      screens: [],
      phones: [
        "/work/ala-elsare3/phone-home.jpg",
        "/work/ala-elsare3/phone-account-type.jpg",
        "/work/ala-elsare3/phone-map.jpg",
      ],
      audiences: [
        { key: "rider", icon: "rider" },
        { key: "owner", icon: "owner" },
        { key: "driver", icon: "driver" },
        { key: "admin", icon: "dashboard" },
      ],
      journey: ["request", "approve", "handover", "onRent", "inspection", "complete"],
      features: [
        "booking", "map", "fleet", "kyc", "handover", "payments",
        "reviews", "notifications", "dashboard", "reports", "roles", "language",
      ],
      stats: ["platforms", "accounts", "brands"],
      stack: ["NestJS", "PostgreSQL", "Prisma", "Redis", "BullMQ", "Socket.IO", "Next.js", "Material UI"],
    },
  },
  {
    id: "osa-optics",
    category: "websites",
    aspect: "tall",
    palette: ["#062823", "#1f9e88"],
    featured: true,
    caseStudy: {
      url: "https://osaoptics.com/eg-ar",
      stores: {
        appStore: "https://apps.apple.com/eg/app/osa-optics/id6760480660",
        googlePlay: "https://play.google.com/store/apps/details?id=com.optical.app.optical",
      },
      year: "2025–2026",
      screens: [
        "/work/osa-optics/home.jpg",
        "/work/osa-optics/product.jpg",
        "/work/osa-optics/lenses.jpg",
        { src: "/work/osa-optics/dashboard-products.jpg", url: "https://dashboard.osaoptics.com" },
      ],
      phones: [
        "/work/osa-optics/phone-app-home.jpg",
        "/work/osa-optics/phone-app-product.jpg",
        "/work/osa-optics/phone-tryon.jpg",
        "/work/osa-optics/phone-prescription.jpg",
      ],
      journey: ["frame", "tryon", "prescription", "lens", "checkout", "delivery"],
      features: [
        "tryon", "lens", "prescription", "storefront", "payments", "delivery",
        "doctors", "notifications", "dashboard", "roles", "page", "language",
      ],
      stats: ["products", "platforms", "languages"],
      stack: ["Next.js", "React", "GraphQL", "Apollo Client", "Material UI", "Redux Toolkit", "Pusher", "Firebase"],
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
