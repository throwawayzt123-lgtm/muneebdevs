/*
  Single source of truth for every project on the site.

  Each entry carries:
    order        position within a grid (1 first); edit these to re-arrange
    tag          the short label printed on the card
    category     the bucket the /portfolio filter groups it under
    collections  which grids it appears in: 'home', 'fullstack',
                 'wordpress', 'elite'

  The portfolio pages and the homepage preview all read from here, so a
  project's wording, link or image only ever has to be changed in one place.
*/

export const CATEGORIES = ['Business Web', 'Ecommerce', 'CRM & Systems', '3D & Interactive'];

export const PROJECTS = [
  {
    order: 1,
    title: "Velvet Drip",
    tag: "3D / WebGL",
    category: "3D & Interactive",
    description: "Cinematic 3D coffee brand experience",
    url: "https://velvetdrip-lilac.vercel.app/",
    image: "/images/portfolio/elitework/aurelia-cafewebsite.webp",
    collections: ["elite"],
  },
  {
    order: 2,
    title: "Velox Elite",
    tag: "React JS",
    category: "3D & Interactive",
    description: "Luxury car rental platform with live booking",
    url: "https://velox-omega-weld.vercel.app/",
    image: "/images/portfolio/elitework/veloxelite.webp",
    collections: ["fullstack", "elite", "home"],
  },
  {
    order: 3,
    title: "Web Bridge CRM",
    tag: "CRM",
    category: "CRM & Systems",
    description: "Enterprise management platform with role-based access",
    url: "https://webbridgecrm.vercel.app/login",
    image: "/images/portfolio/fullstack/webbridgecrm.webp",
    collections: ["fullstack", "elite", "home"],
  },
  {
    order: 4,
    title: "Chandup CRM",
    tag: "CRM",
    category: "CRM & Systems",
    description: "Repair management platform for admin and staff",
    url: "https://chandups.vercel.app/",
    image: "/images/portfolio/fullstack/chandupscrm.webp",
    collections: ["fullstack", "elite", "home"],
  },
  {
    order: 5,
    title: "Web Bridge Consulting",
    tag: "Next JS",
    category: "Business Web",
    description: "Full-spectrum BPO and telecom agency site",
    url: "https://www.webbridgeconsulting.com/",
    image: "/images/portfolio/fullstack/Webbridge.webp",
    collections: ["fullstack", "home"],
  },
  {
    order: 6,
    title: "Webcraft Consulting",
    tag: "Next JS",
    category: "Business Web",
    description: "Business consulting site with custom animations",
    url: "https://webcraftcons.com/",
    image: "/images/portfolio/fullstack/webcraftconsulting.webp",
    collections: ["fullstack", "home"],
  },
  {
    order: 7,
    title: "Vemoosc",
    tag: "React JS",
    category: "Business Web",
    description: "Oil and industrial services company platform",
    url: "https://vemoosc.com/",
    image: "/images/portfolio/fullstack/vemooscUAE-industrialServices.webp",
    collections: ["fullstack", "home"],
  },
  {
    order: 8,
    title: "AutoLab",
    tag: "React JS",
    category: "Business Web",
    description: "Premium car detailing and studio booking site",
    url: "https://autolab-six.vercel.app/",
    image: "/images/portfolio/fullstack/autolabcardetailing.webp",
    collections: ["fullstack", "home"],
  },
  {
    order: 9,
    title: "Viista",
    tag: "Marketing Agency",
    category: "Business Web",
    description: "Digital marketing agency site with bold motion design",
    url: "",
    image: "/images/portfolio/wordpress/viista.webp",
    collections: ["wordpress"],
  },
  {
    order: 10,
    title: "Shayona Creation",
    tag: "Ecommerce",
    category: "Ecommerce",
    description: "Women ethnic wear online store",
    url: "https://shayonacreation.com/",
    image: "/images/portfolio/wordpress/ShayonaCreation-womenClothing.webp",
    collections: ["wordpress"],
  },
  {
    order: 11,
    title: "Mena",
    tag: "Ecommerce",
    category: "Ecommerce",
    description: "Women clothing and fashion collection",
    url: "https://mena.pk/",
    image: "/images/portfolio/wordpress/MenaClothingwoman.webp",
    collections: ["wordpress"],
  },
  {
    order: 12,
    title: "SQ Laptops",
    tag: "Ecommerce",
    category: "Ecommerce",
    description: "Laptops and computer accessories store",
    url: "https://sqlaptops.com/",
    image: "/images/portfolio/wordpress/sqlaptops.webp",
    collections: ["wordpress"],
  },
  {
    order: 13,
    title: "Naqshdar",
    tag: "Clothing Brand",
    category: "Ecommerce",
    description: "Pakistani clothing brand with B2B wholesale",
    url: "https://naqshdar.com.pk/",
    image: "/images/portfolio/wordpress/NaqshdarClothingBrand.webp",
    collections: ["wordpress"],
  },
  {
    order: 14,
    title: "UAQ Parts",
    tag: "Auto Parts",
    category: "Ecommerce",
    description: "Auto parts, service and repairs",
    url: "https://uaq-parts.com/",
    image: "/images/portfolio/wordpress/uaq-parts.webp",
    collections: ["wordpress"],
  },
  {
    order: 15,
    title: "Stellr Solar",
    tag: "Solar Energy",
    category: "Business Web",
    description: "Canadian residential solar energy provider",
    url: "https://stellrsolar.ca/",
    image: "/images/portfolio/wordpress/StellrSolar-Canada.webp",
    collections: ["wordpress"],
  },
  {
    order: 16,
    title: "Solar Switch",
    tag: "Solar Energy",
    category: "Business Web",
    description: "Solar panel supplier and installer",
    url: "https://solarswitch.pk/",
    image: "/images/portfolio/wordpress/solarSwitch.webp",
    collections: ["wordpress"],
  },
  {
    order: 17,
    title: "Lucky Homes",
    tag: "Home Builders",
    category: "Business Web",
    description: "Australian custom home building company",
    url: "https://luckyhomes.com.au/",
    image: "/images/portfolio/wordpress/LuckyHomesAustraliaHomebuilders.webp",
    collections: ["wordpress"],
  },
  {
    order: 18,
    title: "KNZ Homes",
    tag: "Home Builders",
    category: "Business Web",
    description: "New construction and renovation specialists",
    url: "https://knzhomes.com/",
    image: "/images/portfolio/wordpress/knzhomesUKhomebuilders.webp",
    collections: ["wordpress"],
  },
  {
    order: 19,
    title: "GBox Logistics",
    tag: "Logistics",
    category: "Business Web",
    description: "Global container shipping and tracking",
    url: "https://gboxsg.com/",
    image: "/images/portfolio/wordpress/Gbox-logistics.webp",
    collections: ["wordpress"],
  },
  {
    order: 20,
    title: "Emperor Fortune",
    tag: "Logistics",
    category: "Business Web",
    description: "International freight and logistics services",
    url: "https://emperorfortune.com/",
    image: "/images/portfolio/wordpress/Emperorfortune-logistics.webp",
    collections: ["wordpress"],
  },
  {
    order: 21,
    title: "Highlinks International",
    tag: "Consultancy",
    category: "Business Web",
    description: "Global education and immigration consultancy",
    url: "https://highlinksinternational.com/",
    image: "/images/portfolio/wordpress/HighlinksinternationalConsultancy.webp",
    collections: ["wordpress"],
  },
  {
    order: 22,
    title: "HnF Holidays",
    tag: "Travel",
    category: "Business Web",
    description: "Travel and holiday booking consultancy",
    url: "https://hnfholidays.com/",
    image: "/images/portfolio/wordpress/HnFConsultancy.webp",
    collections: ["wordpress"],
  },
];

/* Projects belonging to one grid, already in `order` sequence. */
export function projectsIn(collection) {
  return PROJECTS
    .filter((p) => p.collections.includes(collection))
    .sort((a, b) => a.order - b.order);
}

/* Every project, ordered — used by the filterable /portfolio page. */
export function allProjects() {
  return [...PROJECTS].sort((a, b) => a.order - b.order);
}
