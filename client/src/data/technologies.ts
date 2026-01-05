interface Technology {
  name: string;
  imageSrc: string;
  alt: string;
}

interface TechCategory {
  name: string;
  icon: string;
  items: Technology[];
}

export const techCategories: TechCategory[] = [
  {
    name: "GIS & Mapping",
    icon: "🗺️",
    items: [
      { name: "ArcGIS Pro", imageSrc: "/assets/ARCGIS-PRO.png", alt: "ArcGIS Pro" },
      { name: "QGIS", imageSrc: "/assets/gdal.png", alt: "QGIS" },
      { name: "PostGIS", imageSrc: "/assets/gdal.png", alt: "PostGIS" },
      { name: "GDAL", imageSrc: "/assets/gdal.png", alt: "GDAL" },
      { name: "Leaflet", imageSrc: "/assets/gdal.png", alt: "Leaflet" },
      { name: "Google Earth Engine", imageSrc: "/assets/gdal.png", alt: "GEE" },
      { name: "Mapbox", imageSrc: "/assets/gdal.png", alt: "Mapbox" }
    ]
  },
  {
    name: "Programming",
    icon: "💻",
    items: [
      { name: "Python", imageSrc: "/assets/gdal.png", alt: "Python" },
      { name: "R", imageSrc: "/assets/gdal.png", alt: "R" },
      { name: "JavaScript", imageSrc: "/assets/gdal.png", alt: "JavaScript" },
      { name: "TypeScript", imageSrc: "/assets/gdal.png", alt: "TypeScript" },
      { name: "SQL", imageSrc: "/assets/gdal.png", alt: "SQL" },
      { name: "Bash", imageSrc: "/assets/gdal.png", alt: "Bash" }
    ]
  },
  {
    name: "Frameworks & Libraries",
    icon: "⚛️",
    items: [
      { name: "React", imageSrc: "/assets/gdal.png", alt: "React" },
      { name: "FastAPI", imageSrc: "/assets/gdal.png", alt: "FastAPI" },
      { name: "Wagtail", imageSrc: "/assets/gdal.png", alt: "Wagtail" },
      { name: "Node.js", imageSrc: "/assets/gdal.png", alt: "Node.js" },
      { name: "Tailwind CSS", imageSrc: "/assets/gdal.png", alt: "Tailwind CSS" },
      { name: "TensorFlow", imageSrc: "/assets/gdal.png", alt: "TensorFlow" },
      { name: "scikit-learn", imageSrc: "/assets/gdal.png", alt: "scikit-learn" },
      { name: "GeoPandas", imageSrc: "/assets/gdal.png", alt: "GeoPandas" },
      { name: "Pytest", imageSrc: "/assets/gdal.png", alt: "Pytest" },
      { name: "Coiled", imageSrc: "/assets/gdal.png", alt: "Coiled" }
    ]
  },
  {
    name: "Databases",
    icon: "🗄️",
    items: [
      { name: "PostgreSQL", imageSrc: "/assets/gdal.png", alt: "PostgreSQL" },
      { name: "MongoDB", imageSrc: "/assets/gdal.png", alt: "MongoDB" },
      { name: "Redis", imageSrc: "/assets/gdal.png", alt: "Redis" },
      { name: "SQLite", imageSrc: "/assets/gdal.png", alt: "SQLite" }
    ]
  },
  {
    name: "DevOps & Infrastructure",
    icon: "🔧",
    items: [
      { name: "Linux", imageSrc: "/assets/gdal.png", alt: "Linux" },
      { name: "Windows Server", imageSrc: "/assets/gdal.png", alt: "Windows Server" },
      { name: "Docker", imageSrc: "/assets/gdal.png", alt: "Docker" },
      { name: "Kubernetes", imageSrc: "/assets/gdal.png", alt: "Kubernetes" },
      { name: "Git", imageSrc: "/assets/gdal.png", alt: "Git" },
      { name: "GitHub Actions", imageSrc: "/assets/gdal.png", alt: "GitHub Actions" },
      { name: "AWS", imageSrc: "/assets/gdal.png", alt: "AWS" },
      { name: "GCP", imageSrc: "/assets/gdal.png", alt: "Google Cloud Platform" },
      { name: "Virtual Machines", imageSrc: "/assets/gdal.png", alt: "Virtual Machines" },
      { name: "Nginx", imageSrc: "/assets/gdal.png", alt: "Nginx" }
    ]
  }
];

// Flat list for backward compatibility
export const technologies: Technology[] = techCategories.flatMap(cat => cat.items);
