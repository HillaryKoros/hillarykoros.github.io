interface Service {
  title: string;
  description: string;
  icon: string;
  symbol: string; // Scientific symbol/formula
  color: string;
}

export const services: {
  primary: Service[];
  creative: Service[];
} = {
  primary: [
    {
      title: "GIS & Spatial Analysis",
      description: "Working with ArcGIS Pro, QGIS, and Google Earth Engine for mapping, spatial analysis, and building location-based applications.",
      icon: "🌍",
      symbol: "φ λ", // Latitude longitude
      color: "#3b82f6"
    },
    {
      title: "Remote Sensing",
      description: "Processing satellite imagery from Sentinel and Landsat for land cover mapping, vegetation monitoring, and environmental analysis.",
      icon: "🛰️",
      symbol: "ρ = Δλ", // Reflectance
      color: "#8b5cf6"
    },
    {
      title: "Web Development",
      description: "Building web applications using React, Python (FastAPI), and integrating mapping libraries like Leaflet and Mapbox.",
      icon: "💻",
      symbol: "</>",
      color: "#06b6d4"
    },
    {
      title: "Data Science",
      description: "Data analysis and machine learning with Python, R, and SQL for spatial predictions and pattern recognition.",
      icon: "📈",
      symbol: "∑ Σ μ",
      color: "#22c55e"
    },
    {
      title: "Spatial Databases",
      description: "Managing geospatial data with PostgreSQL/PostGIS, writing spatial queries, and designing database schemas.",
      icon: "🗄️",
      symbol: "SQL∩",
      color: "#f97316"
    },
    {
      title: "Hydrology & Early Warning",
      description: "Contributing to flood monitoring systems and working with hydrological models for disaster risk assessment.",
      icon: "💧",
      symbol: "Q = VA",
      color: "#0ea5e9"
    }
  ],
  creative: [
    {
      title: "Cartography",
      description: "Designing maps that clearly communicate spatial information with attention to layout and visual hierarchy.",
      icon: "🗺️",
      symbol: "∠ ⊿",
      color: "#ec4899"
    },
    {
      title: "Data Visualization",
      description: "Creating charts, dashboards, and interactive visualizations to present complex data clearly.",
      icon: "📊",
      symbol: "∫ dx",
      color: "#f59e0b"
    },
    {
      title: "Documentation",
      description: "Writing technical documentation, tutorials, and guides for GIS workflows and software tools.",
      icon: "📝",
      symbol: "≡ §",
      color: "#6366f1"
    }
  ]
};
