interface Service {
  title: string;
  description: string;
  icon: string;
}

export const services: {
  primary: Service[];
  creative: Service[];
} = {
  primary: [
    {
      title: "GIS & Spatial Analysis",
      description: "Working with ArcGIS Pro, QGIS, and Google Earth Engine for mapping, spatial analysis, and building location-based applications.",
      icon: "🌍"
    },
    {
      title: "Remote Sensing",
      description: "Processing satellite imagery from Sentinel and Landsat for land cover mapping, vegetation monitoring, and environmental analysis.",
      icon: "🛰️"
    },
    {
      title: "Web Development",
      description: "Building web applications using React, Python (FastAPI), and integrating mapping libraries like Leaflet and Mapbox.",
      icon: "💻"
    },
    {
      title: "Data Science",
      description: "Data analysis and machine learning with Python, R, and SQL for spatial predictions and pattern recognition.",
      icon: "📈"
    },
    {
      title: "Spatial Databases",
      description: "Managing geospatial data with PostgreSQL/PostGIS, writing spatial queries, and designing database schemas.",
      icon: "🗄️"
    },
    {
      title: "Hydrology & Early Warning",
      description: "Contributing to flood monitoring systems and working with hydrological models for disaster risk assessment.",
      icon: "💧"
    }
  ],
  creative: [
    {
      title: "Cartography",
      description: "Designing maps that clearly communicate spatial information with attention to layout and visual hierarchy.",
      icon: "🗺️"
    },
    {
      title: "Data Visualization",
      description: "Creating charts, dashboards, and interactive visualizations to present complex data clearly.",
      icon: "📊"
    },
    {
      title: "Documentation",
      description: "Writing technical documentation, tutorials, and guides for GIS workflows and software tools.",
      icon: "📝"
    }
  ]
};
