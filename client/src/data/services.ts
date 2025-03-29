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
      title: "Geospatial Technology",
      description: "Expert in GIS mapping, remote sensing image processing, and spatial database management for location-based analytics and decision support systems.",
      icon: "🌍"
    },
    {
      title: "AI & Data Science",
      description: "Applying machine learning and AI techniques for geospatial big data analysis, predictive modeling, and automation of complex spatial analytics workflows.",
      icon: "📊"
    },
    {
      title: "Full Stack Development",
      description: "Building interactive web applications with modern JavaScript frameworks, RESTful APIs, and database integrations for location-enabled solutions.",
      icon: "💻"
    },
    {
      title: "Spatial Analysis",
      description: "Utilizing advanced GIS and remote sensing techniques to analyze and derive insights from complex geospatial datasets.",
      icon: "🔍"
    }
  ],
  creative: [
    {
      title: "Cartography and Visual Storytelling",
      description: "Using maps as dynamic tools to narrate stories of historical events, cultural landscapes, and environmental changes, enriching our understanding of the world through captivating visuals.",
      icon: "🗺️"
    },
    {
      title: "Digital Content Creation",
      description: "Generating a range of digital elements, from 3D models, graphics, animations, and videos to AI-generated content, leveraging cutting-edge tools and techniques to craft immersive and engaging experiences.",
      icon: "🎨"
    },
    {
      title: "Investing & Financial Analysis",
      description: "Exploring markets and financial instruments using data-driven approaches and fundamental analysis to identify growth opportunities and manage risk for long-term wealth building.",
      icon: "📈"
    }
  ]
};
