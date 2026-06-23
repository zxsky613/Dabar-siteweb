import type { LocalizedText } from "@/lib/i18n/localized";
import galleryManifest from "./project-gallery-manifest.json";

export type ProjectCategory = "conveyors" | "racking" | "electrical";

export type ProjectHighlight = {
  value: string;
  label: LocalizedText;
};

export type ProjectClient = {
  name: string;
  logo: string;
};

export type Project = {
  slug: string;
  category: ProjectCategory;
  title: LocalizedText;
  description: LocalizedText;
  sector: LocalizedText;
  location: LocalizedText;
  year?: string;
  image?: string;
  images?: string[];
  highlights?: ProjectHighlight[];
  clients?: ProjectClient[];
  published: boolean;
};

export const projects: Project[] = [
  {
    slug: "gofo-pays-bas",
    category: "conveyors",
    image: "/projects/gofo-pays-bas.jpg",
    published: true,
    title: {
      fr: "Convoyeurs double étage",
      en: "Dual-level cross-belt system",
      zh: "双层交叉带分拣项目",
    },
    sector: {
      fr: "Installation mécanique & électrique",
      en: "Mechanical & electrical installation",
      zh: "机械电气安装",
    },
    location: { fr: "Amsterdam, Pays-Bas", en: "Amsterdam, Netherlands", zh: "荷兰阿姆斯特丹" },
    description: {
      fr: "Installation et mise en service d'un système de tri double étage avec convoyeurs à bande, incluant plateformes métalliques et ligne de tri haute cadence.",
      en: "Installation and commissioning of a dual-level sorting system with belt conveyors, including steel platforms and a high-throughput sortation line.",
      zh: "双层交叉带及皮带输送线安装交付，含钢平台与高产能分拣系统。",
    },
    highlights: [
      { value: "712", label: { fr: "Chariots cross-belt", en: "Cross-belt carriers", zh: "交叉带分拣小车" } },
      { value: "390 m", label: { fr: "Convoyeurs à bande", en: "Belt conveyors", zh: "配套皮带机" } },
      { value: "950 m²", label: { fr: "Plateformes acier", en: "Steel platforms", zh: "钢平台面积" } },
      { value: "18 000", label: { fr: "PPH (colis/h)", en: "PPH (parcels/h)", zh: "小时分拣量" } },
    ],
  },
  {
    slug: "cirro-france",
    category: "conveyors",
    image: "/projects/cirro-france.jpg",
    published: true,
    title: {
      fr: "Convoyeurs double étage",
      en: "Dual-level cross-belt system",
      zh: "双层交叉带分拣项目",
    },
    sector: {
      fr: "Installation mécanique & électrique",
      en: "Mechanical & electrical installation",
      zh: "机械电气安装",
    },
    location: { fr: "France", en: "France", zh: "法国" },
    description: {
      fr: "Projet de tri automatique double étage en France : cross-belts, convoyeurs et plateformes pour un débit élevé.",
      en: "Dual-level automated sorting project in France: cross-belts, conveyors and platforms for high throughput.",
      zh: "法国双层交叉带及皮带输送线项目，满足高产能分拣需求。",
    },
    highlights: [
      { value: "804", label: { fr: "Chariots cross-belt", en: "Cross-belt carriers", zh: "交叉带分拣小车" } },
      { value: "386 m", label: { fr: "Convoyeurs à bande", en: "Belt conveyors", zh: "配套皮带机" } },
      { value: "600 m²", label: { fr: "Plateformes acier", en: "Steel platforms", zh: "钢平台面积" } },
      { value: "20 000", label: { fr: "PPH (colis/h)", en: "PPH (parcels/h)", zh: "小时分拣量" } },
    ],
  },
  {
    slug: "jd-allemagne",
    category: "conveyors",
    image: "/projects/jd-allemagne.jpg",
    published: true,
    title: {
      fr: "Convoyeurs & elevateurs",
      en: "Conveyors & lifts",
      zh: "输送线及提升机项目",
    },
    sector: {
      fr: "Installation mécanique & électrique",
      en: "Mechanical & electrical installation",
      zh: "机械电气安装",
    },
    location: { fr: "Allemagne", en: "Germany", zh: "德国" },
    description: {
      fr: "Installation de convoyeurs rouleaux, elevateurs à caisses et spirale d'élévation pour un hub logistique en Allemagne.",
      en: "Installation of roller conveyors, bin lifts and a spiral elevator for a logistics hub in Germany.",
      zh: "德国物流枢纽：辊筒输送线、料箱提升机及螺旋升降机安装交付。",
    },
    highlights: [
      { value: "16", label: { fr: "Elevateurs à caisses", en: "Bin lifts", zh: "料箱提升机" } },
      { value: "2 200 m", label: { fr: "Convoyeurs rouleaux", en: "Roller conveyors", zh: "辊筒输送机" } },
      { value: "12 m", label: { fr: "Spirale d'élévation", en: "Spiral elevator height", zh: "螺旋升降机高度" } },
      { value: "5 000", label: { fr: "PPH (colis/h)", en: "PPH (parcels/h)", zh: "小时分拣量" } },
    ],
  },
  {
    slug: "faxing-france",
    category: "conveyors",
    image: "/projects/faxing-france.jpg",
    published: true,
    title: {
      fr: "Tri cross-belt simple étage",
      en: "Single-level cross-belt sorter",
      zh: "单层交叉带分拣项目",
    },
    sector: {
      fr: "Installation mécanique & électrique",
      en: "Mechanical & electrical installation",
      zh: "机械电气安装",
    },
    location: { fr: "France", en: "France", zh: "法国" },
    description: {
      fr: "Mise en place d'un trieur cross-belt mono-étage avec convoyeurs et plateformes pour un centre de distribution en France.",
      en: "Single-level cross-belt sorter with conveyors and platforms for a distribution center in France.",
      zh: "法国单层交叉带分拣机及配套输送线安装项目。",
    },
    highlights: [
      { value: "401", label: { fr: "Chariots cross-belt", en: "Cross-belt carriers", zh: "交叉带分拣小车" } },
      { value: "210 m", label: { fr: "Convoyeurs à bande", en: "Belt conveyors", zh: "配套皮带机" } },
      { value: "280 m²", label: { fr: "Plateformes acier", en: "Steel platforms", zh: "钢平台面积" } },
      { value: "8 000", label: { fr: "PPH (colis/h)", en: "PPH (parcels/h)", zh: "小时分拣量" } },
    ],
  },
  {
    slug: "racking-uk",
    category: "racking",
    image: "/projects/racking-uk.jpg",
    published: true,
    title: {
      fr: "Rack dense « Smart Wolf »",
      en: "Smart Wolf dense racking",
      zh: "智狼密集库货架安装",
    },
    sector: {
      fr: "Rayonnages & stockage",
      en: "Racking & storage",
      zh: "货架安装",
    },
    location: { fr: "Royaume-Uni", en: "United Kingdom", zh: "英国" },
    description: {
      fr: "Installation d'un entrepôt dense à très grand nombre d'emplacements pour un site e-commerce au Royaume-Uni.",
      en: "Installation of a high-density warehouse with a very large number of storage locations for an e-commerce site in the UK.",
      zh: "英国大型电商密集库货架安装，货位规模领先。",
    },
    highlights: [
      { value: "200 000", label: { fr: "Emplacements", en: "Storage locations", zh: "立体库货位" } },
      { value: "3 900", label: { fr: "Jours-homme", en: "Man-days", zh: "总人天数" } },
    ],
  },
  {
    slug: "rotterdam-220k",
    category: "racking",
    image: "/projects/rotterdam-220k.jpg",
    published: true,
    title: {
      fr: "Entrepôt dense portuaire",
      en: "Port dense warehouse",
      zh: "港口密集库",
    },
    sector: {
      fr: "Rayonnages & stockage",
      en: "Racking & storage",
      zh: "货架安装",
    },
    location: { fr: "Rotterdam, Pays-Bas", en: "Rotterdam, Netherlands", zh: "荷兰鹿特丹" },
    description: {
      fr: "Installation de rayonnages pour un entrepôt dense de grande envergure au port de Rotterdam.",
      en: "Racking installation for a large-scale dense warehouse at the Port of Rotterdam.",
      zh: "鹿特丹大型密集库货架安装项目。",
    },
    highlights: [
      { value: "220 000", label: { fr: "Emplacements", en: "Storage locations", zh: "立体库货位" } },
      { value: "3 400", label: { fr: "Jours-homme", en: "Man-days", zh: "总人天数" } },
    ],
  },
  {
    slug: "rotterdam-17k",
    category: "racking",
    image: "/projects/rotterdam-17k.jpg",
    published: true,
    title: {
      fr: "Extension entrepôt dense",
      en: "Dense warehouse extension",
      zh: "园区密集库",
    },
    sector: {
      fr: "Rayonnages & stockage",
      en: "Racking & storage",
      zh: "货架安装",
    },
    location: { fr: "Rotterdam, Pays-Bas", en: "Rotterdam, Netherlands", zh: "荷兰鹿特丹" },
    description: {
      fr: "Projet d'installation de stockage dense complémentaire pour un site logistique à Rotterdam.",
      en: "Complementary dense storage installation for a logistics site in Rotterdam.",
      zh: "鹿特丹物流园区补充密集库货架安装。",
    },
    highlights: [
      { value: "17 000", label: { fr: "Emplacements", en: "Storage locations", zh: "立体库货位" } },
      { value: "3 200", label: { fr: "Jours-homme", en: "Man-days", zh: "总人天数" } },
    ],
  },
  {
    slug: "gu-cang-allemagne",
    category: "racking",
    image: "/projects/gu-cang-allemagne.jpg",
    published: true,
    title: {
      fr: "Entrepôt dense",
      en: "Dense warehouse",
      zh: "密集库",
    },
    sector: {
      fr: "Rayonnages & stockage",
      en: "Racking & storage",
      zh: "货架安装",
    },
    location: { fr: "Allemagne", en: "Germany", zh: "德国" },
    description: {
      fr: "Installation de rayonnages pour un entrepôt dense en Allemagne, livré dans les délais avec une équipe expérimentée.",
      en: "Racking installation for a dense warehouse in Germany, delivered on schedule by an experienced team.",
      zh: "德国密集库货架安装与交付。",
    },
    highlights: [
      { value: "47 500", label: { fr: "Emplacements", en: "Storage locations", zh: "立体库货位" } },
      { value: "520", label: { fr: "Jours-homme", en: "Man-days", zh: "总人天数" } },
    ],
  },
  {
    slug: "heng-ai",
    category: "racking",
    image: "/projects/heng-ai.jpg",
    published: true,
    title: {
      fr: "Entrepôt stacker",
      en: "Stacker crane AS/RS",
      zh: "堆垛机立体库",
    },
    sector: {
      fr: "Rayonnages & stockage",
      en: "Racking & storage",
      zh: "货架安装",
    },
    location: { fr: "Jiangsu, Chine", en: "Jiangsu, China", zh: "中国江苏" },
    description: {
      fr: "Entrepôt automatisé avec stackers : conception optimisée réduisant les équipements et la main-d'œuvre.",
      en: "Automated stacker crane warehouse: optimized design reducing equipment count and labor.",
      zh: "堆垛机立体库项目，弯轨设计减少设备与人力投入。",
    },
    highlights: [
      { value: "5 571", label: { fr: "Emplacements", en: "Storage locations", zh: "立体库货位" } },
      { value: "50 %", label: { fr: "Gain de main-d'œuvre", en: "Labor savings", zh: "人力节省" } },
      { value: "50 %", label: { fr: "Réduction d'équipements", en: "Equipment reduction", zh: "设备减少" } },
    ],
  },
  {
    slug: "wanbang",
    category: "racking",
    image: "/projects/wanbang.jpg",
    published: true,
    title: {
      fr: "Navette 4 directions — pharmaceutique",
      en: "4-way shuttle AS/RS — pharmaceutical",
      zh: "医药四向车密集库",
    },
    sector: {
      fr: "Rayonnages & stockage",
      en: "Racking & storage",
      zh: "货架安装",
    },
    location: { fr: "Xingtai, Chine", en: "Xingtai, China", zh: "中国邢台" },
    description: {
      fr: "Entrepôt pharmaceutique avec navettes 4 directions, AGV et bras robotisés pour un flux entièrement automatisé.",
      en: "Pharmaceutical warehouse with 4-way shuttles, AGVs and robotic arms for a fully automated flow.",
      zh: "四向车、AGV与机械手融合调度的医药密集库。",
    },
    highlights: [
      { value: "5 210", label: { fr: "Emplacements", en: "Storage locations", zh: "立体库货位" } },
      { value: "90 %", label: { fr: "Gain de main-d'œuvre", en: "Labor savings", zh: "人力节省" } },
    ],
  },
  {
    slug: "jd-france-77",
    category: "electrical",
    image: "/projects/jd-france-77.jpg",
    published: true,
    title: {
      fr: "Courants forts & faibles",
      en: "Electrical & ICT",
      zh: "新仓强弱电",
    },
    sector: {
      fr: "Courant faible & réseaux",
      en: "ICT & low current",
      zh: "强弱电安装",
    },
    location: { fr: "Seine-et-Marne, France", en: "Seine-et-Marne, France", zh: "法国77区" },
    description: {
      fr: "Déploiement complet Wi-Fi, vidéosurveillance et rénovation électrique 600 kW pour un nouvel entrepôt en Île-de-France.",
      en: "Full Wi-Fi, CCTV deployment and 600 kW electrical upgrade for a new warehouse in Île-de-France.",
      zh: "法国新仓：63个AP、153路监控及600kW强电改造。",
    },
    highlights: [
      { value: "62 000 m²", label: { fr: "Surface entrepôt", en: "Warehouse area", zh: "占地面积" } },
      { value: "63", label: { fr: "Points d'accès Wi-Fi", en: "Wi-Fi access points", zh: "AP接入点" } },
      { value: "153", label: { fr: "Caméras", en: "Cameras", zh: "监控摄像头" } },
      { value: "600 kW", label: { fr: "Rénovation électrique", en: "Electrical upgrade", zh: "强电改造" } },
    ],
  },
  {
    slug: "cainiao-lyon",
    category: "electrical",
    image: "/projects/cainiao-lyon.jpg",
    published: true,
    title: {
      fr: "Courants forts & faibles",
      en: "Electrical & ICT infrastructure",
      zh: "强弱电及综合系统",
    },
    sector: {
      fr: "Courant fort, faible & sécurité",
      en: "Electrical, ICT & security",
      zh: "强弱电及安防系统",
    },
    location: { fr: "Lyon, France", en: "Lyon, France", zh: "法国里昂" },
    description: {
      fr: "Modernisation complète de l'entrepôt de Lyon : réseau Wi-Fi, vidéosurveillance, contrôle d'accès, baie serveur et distribution électrique.",
      en: "Full upgrade of the Lyon warehouse: Wi-Fi, CCTV, access control, server room and power distribution.",
      zh: "里昂菜鸟仓综合改造：Wi-Fi覆盖、视频监控、门禁系统、机房机柜及强电配电。",
    },
    highlights: [
      { value: "9 000 m²", label: { fr: "Surface", en: "Area", zh: "占地面积" } },
      { value: "23", label: { fr: "Points d'accès Wi-Fi", en: "Wi-Fi access points", zh: "AP接入点" } },
      { value: "31", label: { fr: "Caméras", en: "Cameras", zh: "监控摄像头" } },
      { value: "8", label: { fr: "Lecteurs d'accès", en: "Access readers", zh: "门禁读卡器" } },
      { value: "42U", label: { fr: "Baie serveur 19\"", en: "19\" server rack", zh: "标准机房机柜" } },
    ],
  },
];

const galleryBySlug = galleryManifest as Record<string, string[]>;

function withGallery(project: Project): Project {
  const images = galleryBySlug[project.slug];
  if (!images?.length) return project;
  return { ...project, images, image: images[0] };
}

export const PROJECT_CATEGORIES: ProjectCategory[] = ["conveyors", "racking", "electrical"];

export function getPublishedProjects(): Project[] {
  return projects.filter((p) => p.published).map(withGallery);
}

export function getPublishedProjectsByCategory(category: ProjectCategory): Project[] {
  return getPublishedProjects().filter((p) => p.category === category);
}

export function groupProjectsByCategory(projectList: Project[]): Record<ProjectCategory, Project[]> {
  const grouped = Object.fromEntries(PROJECT_CATEGORIES.map((c) => [c, [] as Project[]])) as Record<
    ProjectCategory,
    Project[]
  >;

  for (const project of projectList) {
    grouped[project.category].push(project);
  }

  return grouped;
}

export function isProjectCategory(value: string): value is ProjectCategory {
  return PROJECT_CATEGORIES.includes(value as ProjectCategory);
}

export function getCategoryIllustration(category: ProjectCategory): string {
  const illustrations: Record<ProjectCategory, string> = {
    conveyors: "/images/categories/conveyors.jpg",
    racking: "/images/categories/racking.jpg",
    electrical: "/images/categories/electrical.jpg",
  };
  return illustrations[category];
}

export function getProjectBySlug(slug: string): Project | undefined {
  const project = projects.find((p) => p.slug === slug && p.published);
  return project ? withGallery(project) : undefined;
}
