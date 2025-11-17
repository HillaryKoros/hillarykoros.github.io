interface Project {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  categories: string[];
  displayCategories: string[];
  technologies: string;
  projectLink?: string;
  codeLink?: string;
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Flood Watch Development for ICPAC",
    description: "Development of a cloud-native visualization component for ICPAC's flood early warning system, enabling interactive visualization of discharge forecasts from hydrological models across Eastern Africa.",
    imageSrc: "/assets/python.svg",
    categories: ["applications", "data"],
    displayCategories: ["Cloud Computing", "Data Visualization"],
    technologies: "Python | Cloud-Native | Hydrological Models | GIS",
    projectLink: "https://hillarykoros.github.io/",
    codeLink: "https://github.com/HillaryKoros"
  },
  {
    id: "project-2",
    title: "FLOODPROOFS Hydrological Model Transfer to ICPAC",
    description: "Technical support and implementation project for transferring the FLOODPROOFS hydrological modeling system to ICPAC, enhancing regional capacity for flood forecasting and risk assessment across the Greater Horn of Africa.",
    imageSrc: "/assets/arcgis.png",
    categories: ["applications", "data"],
    displayCategories: ["Hydrological Modeling", "Capacity Building"],
    technologies: "Python | FLOODPROOFS | GIS | Remote Sensing",
    projectLink: "https://hillarykoros.github.io/",
    codeLink: "https://github.com/HillaryKoros"
  },
  {
    id: "project-3",
    title: "Digitization of Bomet Registry Maps",
    description: "A comprehensive digitization project for registry maps in Bomet County, providing interactive spatial data visualization and management.",
    imageSrc: "/assets/arcgis.png",
    categories: ["applications", "websites"],
    displayCategories: ["GIS", "Data Management"],
    technologies: "JavaScript | PostgreSQL | QGIS | ArcGIS",
    projectLink: "https://hillarykoros.github.io/LIS_Bomet_Case_Study/",
    codeLink: "https://hillarykoros.github.io/LIS_Bomet_Case_Study/"
  },
  {
    id: "project-4",
    title: "Spatial Routing Application",
    description: "An innovative application for route planning and optimization using spatial data analysis and modern mapping technologies.",
    imageSrc: "/assets/leaflet.svg",
    categories: ["websites", "designs"],
    displayCategories: ["Web Mapping", "Frontend"],
    technologies: "JavaScript | Python | Leaflet | PostgreSQL",
    projectLink: "https://hillarykoros.github.io/",
    codeLink: "https://github.com/HillaryKoros"
  },
  {
    id: "project-5",
    title: "Land Information System",
    description: "Comprehensive web-based system for managing land information and records with spatial capabilities and user-friendly interface.",
    imageSrc: "/assets/postgresql.svg",
    categories: ["applications", "designs"],
    displayCategories: ["Full Stack", "GIS Database"],
    technologies: "Python | PostgreSQL | PostGIS | JavaScript",
    projectLink: "https://hillarykoros.github.io/",
    codeLink: "https://github.com/HillaryKoros"
  },
  {
    id: "project-6",
    title: "Personal Portfolio Website",
    description: "Modern, responsive portfolio website showcasing projects and skills using contemporary web technologies.",
    imageSrc: "/assets/react.svg",
    categories: ["websites", "designs"],
    displayCategories: ["Frontend", "UI/UX"],
    technologies: "React | TypeScript | Tailwind CSS | Vite",
    projectLink: "https://hillarykoros.github.io/",
    codeLink: "https://github.com/HillaryKoros/HillaryKoros.github.io"
  },
  {
    id: "project-7",
    title: "Remote Sensing Analytics Platform",
    description: "Advanced platform for analyzing satellite imagery and extracting meaningful insights for environmental monitoring and urban planning.",
    imageSrc: "/assets/python.svg",
    categories: ["applications", "data"],
    displayCategories: ["Data Science", "Remote Sensing"],
    technologies: "Python | TensorFlow | GDAL | ArcGIS",
    projectLink: "https://hillarykoros.github.io/",
    codeLink: "https://github.com/HillaryKoros"
  },
  {
    id: "project-8",
    title: "GIS Training Materials",
    description: "Educational resources for GIS professionals and students covering various aspects of spatial data analysis and visualization.",
    imageSrc: "/assets/books.png",
    categories: ["education", "designs"],
    displayCategories: ["Education", "Documentation"],
    technologies: "QGIS | ArcGIS | Python | R",
    projectLink: "https://hillarykoros.github.io/",
    codeLink: "https://github.com/HillaryKoros"
  }
];
