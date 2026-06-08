import type { LocalizedList, LocalizedText } from "@/lib/i18n/localized";

export type ServiceOffering = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  image: string;
};

export type Service = {
  slug: string;
  title: LocalizedText;
  shortDescription: LocalizedText;
  description: LocalizedText;
  features: LocalizedList;
  image: string;
  offerings: ServiceOffering[];
};

export const services: Service[] = [
  {
    slug: "installation-logistique",
    image: "/services/installation-logistique-v2.jpg",
    title: {
      fr: "Installation logistique et de stockage",
      en: "Logistics and storage installation",
      zh: "物流和仓储安装",
    },
    shortDescription: {
      fr: "Installation de trieurs, rayonnages intelligents et systèmes de stockage automatisés.",
      en: "Installation of sorters, smart racking and automated storage systems.",
      zh: "分拣机、智能货架和自动化存储系统的安装。",
    },
    description: {
      fr: "Nous concevons et installons des solutions intralogistiques complètes : trieurs automatiques, rayonnages intelligents, convoyeurs et systèmes de stockage. Notre expertise couvre l'ingénierie mécanique et l'intégration des systèmes de contrôle pour optimiser vos flux logistiques.",
      en: "We design and install complete intralogistics solutions: automatic sorters, smart racking, conveyors and storage systems. Our expertise covers mechanical engineering and control system integration to optimize your logistics flows.",
      zh: "我们设计并安装完整的内部物流解决方案：自动分拣机、智能货架、输送机和存储系统。我们的专业知识涵盖机械工程和控制系统的集成，以优化您的物流流程。",
    },
    features: {
      fr: [
        "Installation de trieurs et convoyeurs",
        "Rayonnages intelligents et automatisés",
        "Intégration systèmes de contrôle",
      ],
      en: [
        "Sorter and conveyor installation",
        "Smart and automated racking",
        "Control system integration",
      ],
      zh: ["分拣机和输送机安装", "智能自动化货架", "控制系统集成"],
    },
    offerings: [
      {
        id: "trieurs-convoyeurs",
        image: "/services/offerings/installation-logistique/trieurs-convoyeurs-v2.jpg",
        title: {
          fr: "Installation de trieurs et convoyeurs",
          en: "Sorter and conveyor installation",
          zh: "分拣机和输送机安装",
        },
        description: {
          fr: "Mise en place, réglage et intégration de trieurs automatiques et convoyeurs pour fluidifier vos opérations logistiques.",
          en: "Setup, tuning and integration of automatic sorters and conveyors to streamline your logistics operations.",
          zh: "安装、调试和集成自动分拣机及输送机，优化物流运营流程。",
        },
      },
      {
        id: "rayonnages-intelligents",
        image: "/services/offerings/installation-logistique/rayonnages-intelligents-v2.jpg",
        title: {
          fr: "Rayonnages intelligents et automatisés",
          en: "Smart and automated racking",
          zh: "智能自动化货架",
        },
        description: {
          fr: "Installation de systèmes de stockage automatisés et rayonnages intelligents adaptés à vos volumes et contraintes d'entrepôt.",
          en: "Installation of automated storage systems and smart racking adapted to your warehouse volumes and constraints.",
          zh: "根据仓库规模和需求，安装自动化存储系统和智能货架。",
        },
      },
      {
        id: "systemes-controle",
        image: "/services/offerings/installation-logistique/systemes-controle.jpg",
        title: {
          fr: "Intégration des systèmes de contrôle",
          en: "Control system integration",
          zh: "控制系统集成",
        },
        description: {
          fr: "Connexion et paramétrage des automates, capteurs et logiciels de supervision pour piloter l'ensemble de vos équipements.",
          en: "Connection and configuration of PLCs, sensors and supervision software to operate all your equipment.",
          zh: "连接和配置PLC、传感器及监控软件，统一管理所有设备。",
        },
      },
    ],
  },
  {
    slug: "tic",
    image: "/services/tic.jpg",
    title: {
      fr: "Technologies de l'information et de la communication",
      en: "Information and communication technology",
      zh: "信息通信技术",
    },
    shortDescription: {
      fr: "Courant faible : réseaux, câblage structuré et systèmes de supervision pour entrepôts et bureaux.",
      en: "Weak current: networks, structured cabling and supervision systems for warehouses and offices.",
      zh: "弱电：为仓库和办公室提供网络、结构化布线和监控系统。",
    },
    description: {
      fr: "Nous déployons des infrastructures de courant faible adaptées aux environnements logistiques et industriels : réseaux informatiques, câblage structuré, télécommunications, systèmes de supervision et solutions de connectivité pour vos entrepôts et bureaux.",
      en: "We deploy weak current infrastructure adapted to logistics and industrial environments: IT networks, structured cabling, telecommunications, supervision systems and connectivity solutions for your warehouses and offices.",
      zh: "我们部署适应物流和工业环境的弱电基础设施：计算机网络、结构化布线、电信、监控系统和连接解决方案。",
    },
    features: {
      fr: [
        "Réseaux et câblage structuré",
        "Systèmes de supervision",
        "Connectivité entrepôts et bureaux",
        "Solutions IoT industrielles",
      ],
      en: [
        "Networks and structured cabling",
        "Supervision systems",
        "Warehouse and office connectivity",
        "Industrial IoT solutions",
      ],
      zh: ["网络和结构化布线", "监控系统", "仓库和办公室连接", "工业物联网解决方案"],
    },
    offerings: [
      {
        id: "securite-conception",
        image: "/services/offerings/tic/securite-conception.jpg",
        title: {
          fr: "Conception de systèmes de sécurité avec caméras de surveillance",
          en: "Security system design with surveillance cameras",
          zh: "监控摄像头安防系统设计",
        },
        description: {
          fr: "Étude et dimensionnement de vos systèmes de vidéosurveillance adaptés à vos sites logistiques et bureaux.",
          en: "Design and sizing of surveillance systems tailored to your logistics sites and offices.",
          zh: "针对物流园区和办公场所，进行视频监控系统的方案设计与规模规划。",
        },
      },
      {
        id: "wifi-ap",
        image: "/services/offerings/tic/wifi-ap.jpg",
        title: {
          fr: "Installation et configuration des points d'accès Wi-Fi (AP)",
          en: "Wi-Fi access point (AP) installation and configuration",
          zh: "Wi-Fi接入点（AP）安装与配置",
        },
        description: {
          fr: "Déploiement et paramétrage des bornes Wi-Fi pour assurer une couverture optimale de vos espaces professionnels.",
          en: "Deployment and configuration of Wi-Fi access points for optimal coverage across your workspaces.",
          zh: "部署和配置Wi-Fi接入点，确保工作区域信号全覆盖。",
        },
      },
      {
        id: "surveillance-acces",
        image: "/services/offerings/tic/surveillance-acces.jpg",
        title: {
          fr: "Installation, câblage et configuration des caméras de surveillance et systèmes de contrôle d'accès",
          en: "Installation, cabling and configuration of surveillance cameras and access control systems",
          zh: "监控摄像头及门禁系统的安装、布线与配置",
        },
        description: {
          fr: "Mise en œuvre complète des équipements de sécurité physique, lecteurs d'accès et supervision centralisée.",
          en: "Full implementation of physical security equipment, access readers and centralized monitoring.",
          zh: "物理安防设备、门禁读卡器及集中监控系统的完整实施。",
        },
      },
      {
        id: "salle-serveurs",
        image: "/services/offerings/tic/salle-serveurs.jpg",
        title: {
          fr: "Mise en place et câblage des infrastructures des salles serveurs",
          en: "Server room infrastructure setup and cabling",
          zh: "机房基础设施搭建与布线",
        },
        description: {
          fr: "Aménagement technique des salles serveurs : baies, alimentation, câblage structuré et organisation des flux réseau.",
          en: "Technical fit-out of server rooms: racks, power, structured cabling and network flow organization.",
          zh: "机房技术装修：机柜、供电、结构化布线及网络链路组织。",
        },
      },
      {
        id: "plans-reseau",
        image: "/services/offerings/tic/plans-reseau.jpg",
        title: {
          fr: "Élaboration de plans de disposition réseau global",
          en: "Global network layout planning",
          zh: "全局网络布局方案设计",
        },
        description: {
          fr: "Conception de schémas d'architecture réseau pour interconnecter l'ensemble de vos sites et zones d'activité.",
          en: "Design of network architecture diagrams to interconnect all your sites and operational areas.",
          zh: "设计网络架构方案，实现各站点及作业区域互联互通。",
        },
      },
    ],
  },
  {
    slug: "reamenagement-electrique",
    image: "/services/reamenagement-electrique.jpg",
    title: {
      fr: "Réaménagement des systèmes électriques",
      en: "Electrical system renovation",
      zh: "电气系统改造",
    },
    shortDescription: {
      fr: "Courant fort : tableaux, distribution et éclairage pour entrepôts, usines et bureaux.",
      en: "Strong current: panels, distribution and lighting for warehouses, factories and offices.",
      zh: "强电：为仓库、工厂和办公室提供配电盘、配电和照明。",
    },
    description: {
      fr: "Notre équipe d'ingénieurs électriciens réalise le réaménagement complet de vos installations de courant fort : tableaux électriques, distribution, câblage puissance, éclairage industriel, sécurité et mise aux normes pour vos sites industriels et logistiques.",
      en: "Our team of electrical engineers carries out complete renovation of your strong current installations: electrical panels, distribution, power wiring, industrial lighting, safety and compliance upgrades for your industrial and logistics sites.",
      zh: "我们的电气工程师团队对您的强电设施进行全面改造：配电盘、配电、电力布线、工业照明、安全及合规升级。",
    },
    features: {
      fr: [
        "Courant fort et distribution",
        "Tableaux électriques",
        "Éclairage industriel",
        "Mise aux normes et sécurité",
      ],
      en: [
        "Strong current and distribution",
        "Electrical panels",
        "Industrial lighting",
        "Compliance and safety upgrades",
      ],
      zh: ["强电与配电", "配电盘", "工业照明", "合规和安全升级"],
    },
    offerings: [
      {
        id: "tableaux-electriques",
        image: "/services/offerings/reamenagement-electrique/tableaux-electriques.jpg",
        title: {
          fr: "Tableaux électriques et distribution",
          en: "Electrical panels and distribution",
          zh: "配电盘与配电系统",
        },
        description: {
          fr: "Conception, installation et modernisation de tableaux généraux et armoires de distribution courant fort.",
          en: "Design, installation and modernization of main panels and strong current distribution cabinets.",
          zh: "强电总配电盘及配电柜的设计、安装与现代化改造。",
        },
      },
      {
        id: "cablage-puissance",
        image: "/services/offerings/reamenagement-electrique/cablage-puissance.jpg",
        title: {
          fr: "Câblage courant fort",
          en: "Strong current wiring",
          zh: "强电布线",
        },
        description: {
          fr: "Tirage et raccordement de câbles puissance pour alimenter machines, lignes de production et équipements industriels.",
          en: "Pulling and connecting power cables to supply machines, production lines and industrial equipment.",
          zh: "敷设和连接电力电缆，为机床、生产线及工业设备供电。",
        },
      },
      {
        id: "eclairage-industriel",
        image: "/services/offerings/reamenagement-electrique/eclairage-industriel.jpg",
        title: {
          fr: "Éclairage industriel",
          en: "Industrial lighting",
          zh: "工业照明",
        },
        description: {
          fr: "Installation d'éclairage adapté aux entrepôts, ateliers et zones de production pour sécurité et performance énergétique.",
          en: "Installation of lighting suited to warehouses, workshops and production areas for safety and energy efficiency.",
          zh: "为仓库、车间和生产区域安装照明，兼顾安全与节能。",
        },
      },
      {
        id: "mise-aux-normes",
        image: "/services/offerings/reamenagement-electrique/mise-aux-normes.jpg",
        title: {
          fr: "Mise aux normes et sécurité électrique",
          en: "Electrical compliance and safety upgrades",
          zh: "电气合规与安全升级",
        },
        description: {
          fr: "Audit, mise en conformité et sécurisation de vos installations électriques selon les normes en vigueur.",
          en: "Audit, compliance and securing of your electrical installations according to current standards.",
          zh: "依据现行标准，对电气设施进行审计、合规整改与安全加固。",
        },
      },
    ],
  },
  {
    slug: "amenagement-bureaux",
    image: "/services/amenagement-bureaux.jpg",
    title: {
      fr: "Aménagement et rénovation de bureaux",
      en: "Office fit-out and renovation",
      zh: "办公室装修与翻新",
    },
    shortDescription: {
      fr: "Aménagement professionnel d'espaces de bureaux clé en main.",
      en: "Turnkey professional office space fit-out.",
      zh: "交钥匙专业办公空间装修。",
    },
    description: {
      fr: "Nous accompagnons la rénovation et l'aménagement de vos espaces de bureaux : cloisons, électricité, réseaux, éclairage et finitions. Des solutions adaptées à vos contraintes techniques et à votre image professionnelle.",
      en: "We support the renovation and fit-out of your office spaces: partitions, electrical, networks, lighting and finishes. Solutions adapted to your technical constraints and professional image.",
      zh: "我们支持办公空间的翻新和装修：隔断、电气、网络、照明和装修。适应您的技术需求和专业形象。",
    },
    features: {
      fr: [
        "Rénovation complète de bureaux",
        "Cloisons et aménagement intérieur",
        "Réseaux et électricité",
        "Finitions professionnelles",
      ],
      en: [
        "Complete office renovation",
        "Partitions and interior fit-out",
        "Networks and electrical",
        "Professional finishes",
      ],
      zh: ["办公室全面翻新", "隔断和内部装修", "网络和电气", "专业装修"],
    },
    offerings: [
      {
        id: "renovation-bureaux",
        image: "/services/offerings/amenagement-bureaux/renovation-bureaux.jpg",
        title: {
          fr: "Rénovation complète de bureaux",
          en: "Complete office renovation",
          zh: "办公室全面翻新",
        },
        description: {
          fr: "Transformation clé en main de vos espaces de travail, de la démolition légère aux finitions finales.",
          en: "Turnkey transformation of your workspaces, from light demolition to final finishes.",
          zh: "办公空间交钥匙改造，涵盖轻拆改到最终装修全流程。",
        },
      },
      {
        id: "cloisons-amenagement",
        image: "/services/offerings/amenagement-bureaux/cloisons-amenagement.jpg",
        title: {
          fr: "Cloisons et aménagement intérieur",
          en: "Partitions and interior fit-out",
          zh: "隔断与室内装修",
        },
        description: {
          fr: "Création de cloisons, salles de réunion et espaces modulaires pour optimiser l'organisation de vos bureaux.",
          en: "Creation of partitions, meeting rooms and modular spaces to optimize your office layout.",
          zh: "搭建隔断、会议室及模块化空间，优化办公布局。",
        },
      },
      {
        id: "reseaux-electricite",
        image: "/services/offerings/amenagement-bureaux/reseaux-electricite.jpg",
        title: {
          fr: "Réseaux et électricité de bureaux",
          en: "Office networks and electrical",
          zh: "办公室网络与电气",
        },
        description: {
          fr: "Intégration des réseaux, prises, éclairage et courants faibles dans vos nouveaux aménagements.",
          en: "Integration of networks, outlets, lighting and weak current into your new fit-outs.",
          zh: "在新装修中集成网络、插座、照明及弱电系统。",
        },
      },
      {
        id: "finitions",
        image: "/services/offerings/amenagement-bureaux/finitions.jpg",
        title: {
          fr: "Finitions professionnelles",
          en: "Professional finishes",
          zh: "专业装修收尾",
        },
        description: {
          fr: "Peinture, revêtements et détails de finition pour un rendu soigné et conforme à votre image de marque.",
          en: "Painting, coverings and finishing details for a polished result aligned with your brand image.",
          zh: "涂装、饰面及细节收尾，呈现精致效果，契合品牌形象。",
        },
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
