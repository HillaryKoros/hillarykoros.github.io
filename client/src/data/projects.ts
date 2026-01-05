interface Project {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  gradient?: string;
  categories: string[];
  displayCategories: string[];
  technologies: string;
  projectLink?: string;
  codeLink?: string;
  organization?: string;
}

export const projects: Project[] = [
  {
    id: "icpac-flood-watch",
    title: "ICPAC Flood Watch System",
    description: "Led the development of visualization components, backend services, API endpoints, and data management for ICPAC's operational Flood Watch early warning system serving Eastern Africa.",
    imageSrc: "/assets/ARCGIS-PRO.png",
    gradient: "from-blue-500 to-cyan-400",
    categories: ["gis", "data", "web"],
    displayCategories: ["ICPAC", "Full Stack"],
    technologies: "Python, FastAPI, React, PostGIS, Google Earth Engine",
    projectLink: "https://www.icpac.net/",
    codeLink: "https://github.com/icpac-igad",
    organization: "icpac"
  },
  {
    id: "icpac-floodproofs",
    title: "FLOODPROOFS Model Support",
    description: "Provided technical support for the transfer and implementation of FLOODPROOFS hydrological modeling system at ICPAC, contributing to regional flood forecasting capabilities across the Greater Horn of Africa.",
    imageSrc: "/assets/gdal.png",
    gradient: "from-emerald-500 to-teal-400",
    categories: ["gis", "data"],
    displayCategories: ["ICPAC", "Hydrology"],
    technologies: "Python, GDAL, NetCDF, HEC-HMS",
    projectLink: "https://www.icpac.net/",
    codeLink: "https://github.com/icpac-igad",
    organization: "icpac"
  },
  {
    id: "lis-bomet",
    title: "Bomet Land Information System",
    description: "Comprehensive web-based land registry digitization system for Bomet County. Features interactive parcel visualization, ownership management, and spatial queries with PostGIS backend.",
    imageSrc: "/assets/ARCGIS-PRO.png",
    gradient: "from-violet-500 to-purple-400",
    categories: ["gis", "web"],
    displayCategories: ["Web GIS", "Database"],
    technologies: "JavaScript, PostgreSQL, PostGIS, Leaflet, QGIS",
    projectLink: "https://hillarykoros.github.io/LIS_Bomet_Case_Study/",
    codeLink: "https://github.com/HillaryKoros/LIS_Bomet_Case_Study"
  },
  {
    id: "spatial-routing",
    title: "Spatial Routing Application",
    description: "Network analysis application implementing pgRouting algorithms for optimal path finding, service area analysis, and logistics route optimization with interactive web mapping.",
    imageSrc: "/assets/gdal.png",
    gradient: "from-orange-500 to-amber-400",
    categories: ["gis", "web"],
    displayCategories: ["Network Analysis", "Web App"],
    technologies: "Python, pgRouting, Leaflet, FastAPI, PostgreSQL",
    projectLink: "https://github.com/HillaryKoros",
    codeLink: "https://github.com/HillaryKoros"
  },
  {
    id: "rs-ml-pipeline",
    title: "Remote Sensing ML Pipeline",
    description: "Machine learning pipeline for satellite imagery analysis. Implements land cover classification, NDVI time-series analysis, and change detection using Sentinel-2 and Landsat data.",
    imageSrc: "/assets/gdal.png",
    gradient: "from-rose-500 to-pink-400",
    categories: ["data", "gis"],
    displayCategories: ["Remote Sensing", "Machine Learning"],
    technologies: "Python, TensorFlow, Rasterio, GDAL, Google Earth Engine",
    projectLink: "https://github.com/HillaryKoros",
    codeLink: "https://github.com/HillaryKoros"
  },
  {
    id: "geospatial-ml",
    title: "Geospatial Predictive Modeling",
    description: "End-to-end spatial prediction framework with automated feature engineering from raster and vector data, ensemble model training, and uncertainty-aware prediction mapping.",
    imageSrc: "/assets/gdal.png",
    gradient: "from-indigo-500 to-blue-400",
    categories: ["data"],
    displayCategories: ["Data Science", "Spatial ML"],
    technologies: "Python, scikit-learn, XGBoost, GeoPandas, Rasterio",
    projectLink: "https://github.com/HillaryKoros",
    codeLink: "https://github.com/HillaryKoros"
  },
  {
    id: "portfolio-site",
    title: "Personal Portfolio",
    description: "Modern developer portfolio built with React and TypeScript. Features responsive design, smooth Framer Motion animations, dark mode, and GitHub Actions CI/CD deployment.",
    imageSrc: "/assets/avatar.jpg",
    gradient: "from-slate-600 to-slate-400",
    categories: ["web"],
    displayCategories: ["Frontend", "React"],
    technologies: "React, TypeScript, Tailwind CSS, Framer Motion, Vite",
    projectLink: "https://hillarykoros.github.io/",
    codeLink: "https://github.com/HillaryKoros/hillarykoros.github.io"
  },
  {
    id: "gis-tutorials",
    title: "GIS Training Materials",
    description: "Comprehensive educational resources covering spatial analysis workflows, cartographic design principles, geodatabase management, and Python/R automation for GIS professionals.",
    imageSrc: "/assets/books.png",
    gradient: "from-amber-600 to-yellow-400",
    categories: ["gis"],
    displayCategories: ["Education", "Training"],
    technologies: "QGIS, ArcGIS Pro, Python, R, PostGIS",
    projectLink: "https://github.com/HillaryKoros",
    codeLink: "https://github.com/HillaryKoros"
  }
];
