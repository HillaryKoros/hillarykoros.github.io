export interface Tutorial {
  id: string;
  title: string;
  description: string;
  type: 'notebook' | 'video' | 'guide' | 'workshop';
  url?: string;
  duration?: string;
}

export interface Project {
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
  status: 'operational' | 'ongoing' | 'completed' | 'planned';
  // Enhanced details
  problem?: string;
  solution?: string;
  results?: string[];
  metrics?: { label: string; value: string }[];
  features?: string[];
  duration?: string;
  role?: string;
  tutorials?: Tutorial[];
}

export const projects: Project[] = [
  // OPERATIONAL
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
    codeLink: "https://github.com/HillaryKoros/hillarykoros.github.io",
    status: "operational",
    problem: "Professional visibility in the geospatial and software development space requires a tailored digital presence that effectively communicates technical expertise while maintaining modern design standards.",
    solution: "Architected and developed a custom portfolio application using the React ecosystem with TypeScript, implementing component-based architecture, responsive design patterns, performant animations with Framer Motion, and CI/CD automation via GitHub Actions.",
    results: [
      "Created a fast, responsive portfolio site",
      "Achieved perfect Lighthouse accessibility score",
      "Automated deployment with GitHub Actions",
      "Showcased projects with detailed case studies"
    ],
    metrics: [
      { label: "Lighthouse Score", value: "95+" },
      { label: "Load Time", value: "<2 sec" },
      { label: "Bundle Size", value: "~500KB" },
      { label: "Components", value: "15+" }
    ],
    features: [
      "Responsive design",
      "Dark/Light mode",
      "Smooth animations",
      "Project showcases",
      "Contact integration"
    ],
    duration: "2024 - Present",
    role: "Frontend Developer"
  },

  // ONGOING
  {
    id: "icpac-flood-system",
    title: "IGAD-ICPAC Flood Watcher",
    description: "Leading the development of IGAD-ICPAC's operational Flood Watcher platform. Utilizing ICPAC's templates and packages to integrate multiple hydrological models and WRF weather forecasts for comprehensive early warning across the Greater Horn of Africa.",
    imageSrc: "/assets/ARCGIS-PRO.png",
    gradient: "from-blue-500 to-cyan-400",
    categories: ["gis", "data", "web"],
    displayCategories: ["ICPAC", "Full Stack", "Hydrology"],
    technologies: "Python, FastAPI, Next.js, PostGIS, GDAL, NetCDF, GeoManager, WRF, Docker",
    projectLink: "https://www.icpac.net/",
    codeLink: "https://github.com/icpac-igad",
    organization: "icpac",
    status: "ongoing",
    problem: "The Greater Horn of Africa—home to over 300 million people across 11 countries—faces escalating flood disasters driven by climate variability, displacing communities, devastating livelihoods, and claiming lives annually. National meteorological services lack unified access to hydrological forecasts, with model outputs fragmented across disparate systems. An initial MVP was developed for single-model visualization, but scaling to multi-model operational capacity required a robust, production-grade architecture.",
    solution: "Expanding the initial MVP into a production-ready operational system by leveraging ICPAC's enterprise templates and packages. The platform consolidates multi-model outputs (FLOODPROOFS, MIKE Hydro, GeoSFM, HYPE, ~~Google AI Flood~~, ~~WRF~~) into a unified visualization interface, delivering actionable 7-day forecasts at specific river gauges provided by member states to national disaster management agencies.",
    results: [
      "Providing early warnings to national disaster agencies across 11 countries",
      "Enabling 7-day lead time for evacuation and preparedness planning",
      "Supporting regional meteorologists with unified forecast visualization",
      "Automating daily forecast delivery to decision-makers"
    ],
    metrics: [
      { label: "Countries Served", value: "11" },
      { label: "Models Integrated", value: "6+" },
      { label: "River Basins (Level 6)", value: "800+" },
      { label: "Forecast Days", value: "7" }
    ],
    features: [
      "Real-time flood monitoring dashboard",
      "Multi-model ensemble visualization",
      "WRF and hydrological model integration",
      "Automated daily forecast pipelines"
    ],
    duration: "2025 - Present",
    role: "Full Stack Developer / DevOps"
  },
  {
    id: "lis-bomet",
    title: "Bomet Land Information System",
    description: "Comprehensive web-based land registry digitization system for Bomet County. Features interactive parcel visualization, ownership management, spatial queries, and an online digitization portal for streamlined land administration.",
    imageSrc: "/assets/ARCGIS-PRO.png",
    gradient: "from-violet-500 to-purple-400",
    categories: ["gis", "web"],
    displayCategories: ["Web GIS", "Database"],
    technologies: "JavaScript, React, PostgreSQL, PostGIS, Leaflet, Node.js, QGIS",
    projectLink: "https://hillarykoros.github.io/LIS_Bomet_Case_Study/",
    codeLink: "https://github.com/HillaryKoros/LIS_Bomet_Case_Study",
    status: "ongoing",
    problem: "Bomet County's paper-based land registry system resulted in prolonged transaction times, susceptibility to fraud, frequent boundary disputes, and limited transparency. Field officers lacked tools for on-site digitization, requiring manual data entry back at the office—creating delays and transcription errors.",
    solution: "Engineered a web-based Land Information System with PostGIS spatial backend and interactive Leaflet mapping. Currently developing an online interactive digitization form enabling field officers to capture parcel boundaries, ownership details, and supporting documents directly from the field, with real-time validation and synchronization to the central database.",
    results: [
      "Digitized over 50,000 land parcels",
      "All scanned maps and documents available online",
      "Reduced land search time from days to minutes",
      "Improved transparency in land transactions",
      "Enabled online parcel verification",
      "Developing interactive online digitization forms"
    ],
    metrics: [
      { label: "Parcels Digitized", value: "50,000+" },
      { label: "Scanned Documents", value: "Online" },
      { label: "Search Time Reduction", value: "95%" },
      { label: "Daily Queries", value: "200+" }
    ],
    features: [
      "Interactive parcel map viewer",
      "Online scanned maps and documents",
      "Ownership search and verification",
      "Spatial query builder",
      "Online digitization forms (in development)",
      "Field data capture interface",
      "Print-ready parcel reports"
    ],
    duration: "2022 - Present",
    role: "GIS Developer"
  },
  {
    id: "etl-utility-package",
    title: "ETL Utility Package",
    description: "Production-ready Python utility package for Extract-Transform-Load (ETL) workflows. Provides battle-tested, reusable components for automated data ingestion from FTP, SFTP, HTTPS, and REST APIs with configurable transformation pipelines and robust error handling.",
    imageSrc: "/assets/gdal.png",
    gradient: "from-rose-500 to-pink-400",
    categories: ["data", "gis"],
    displayCategories: ["Python Package", "ETL"],
    technologies: "Python, Paramiko, httpx, xarray, Rasterio, GDAL, Celery, Redis, Pydantic, Click",
    projectLink: "https://github.com/HillaryKoros",
    codeLink: "https://github.com/HillaryKoros",
    status: "ongoing",
    problem: "Data pipelines for climate and geospatial applications require connecting to multiple protocols (FTP, SFTP, HTTPS, REST APIs), parsing diverse formats (NetCDF, GeoTIFF, HDF5, GRIB), and ensuring production reliability through retry mechanisms, connection pooling, and automated scheduling. Without standardized utilities, development teams repeatedly implement similar functionality, resulting in code duplication and maintenance overhead.",
    solution: "Architecting a modular Python ETL package with four distinct layers: [EXTRACT] Scrapes and retrieves data from remote sources (FTP, SFTP, HTTP, APIs) with authentication, retry logic, and connection pooling; [TRANSFORM] Parses formats, reprojects coordinates, resamples resolution, merges with spatial datasets, and applies quality filters; [LOAD] Writes processed data to target destinations (NetCDF, COG, Zarr, PostGIS, S3/GCS); [ORCHESTRATE] Schedules pipeline execution via Celery workers, manages task queues, and provides CLI monitoring.",
    results: [
      "Unified protocol connectors with built-in reliability",
      "Format-agnostic parsing and transformation",
      "Production-ready task scheduling",
      "70%+ reduction in boilerplate code"
    ],
    metrics: [
      { label: "Protocols", value: "FTP, SFTP, HTTP, API" },
      { label: "Input Formats", value: "NetCDF, GeoTIFF, HDF5, GRIB" },
      { label: "Output Formats", value: "COG, Zarr, PostGIS" },
      { label: "Code Reduction", value: "70%+" }
    ],
    features: [
      "Multi-protocol extraction with retry and pooling",
      "Spatial transformation and format conversion",
      "Multiple output targets (cloud and database)",
      "Celery task orchestration with CLI"
    ],
    duration: "2024 - Present",
    role: "Data Engineer"
  },

  // PLANNED
  {
    id: "predictive-modeling",
    title: "Predictive Modeling & Analytics",
    description: "Comprehensive predictive analytics encompassing geospatial modeling, statistical analysis, and machine learning. Covers GLMs, spatial regression, ensemble methods, and uncertainty quantification for data-driven decision making.",
    imageSrc: "/assets/gdal.png",
    gradient: "from-indigo-500 to-blue-400",
    categories: ["data"],
    displayCategories: ["Data Science", "Predictive Analytics"],
    technologies: "Python, R, scikit-learn, statsmodels, XGBoost, GeoPandas, Stan",
    projectLink: "https://github.com/HillaryKoros",
    codeLink: "https://github.com/HillaryKoros",
    status: "planned",
    problem: "Organizations require robust predictive capabilities spanning statistical modeling (GLMs, GAMs), spatial analysis, and machine learning, yet integrating these approaches with geospatial data presents significant technical challenges.",
    solution: "Will develop a comprehensive predictive modeling toolkit covering Generalized Linear Models (GLMs), spatial regression, ensemble machine learning (Random Forest, XGBoost, LightGBM), Bayesian inference, and geospatial prediction with proper uncertainty quantification.",
    results: [
      "Will provide unified interface for statistical and ML models",
      "Will integrate GLMs with spatial predictors",
      "Will generate prediction maps with uncertainty bounds",
      "Will enable reproducible analytical workflows"
    ],
    metrics: [
      { label: "Model Types", value: "GLM, GAM, ML, Bayesian" },
      { label: "Spatial Methods", value: "5+" },
      { label: "Output Formats", value: "Maps, Reports, APIs" },
      { label: "Validation Methods", value: "CV, Bootstrap" }
    ],
    features: [
      "Generalized Linear Models (GLMs)",
      "Spatial regression and kriging",
      "Ensemble machine learning",
      "Bayesian inference with Stan",
      "Geospatial prediction mapping"
    ],
    duration: "2025",
    role: "Data Scientist"
  },
  {
    id: "gis-tutorials",
    title: "GIS Training Materials",
    description: "Modern educational resources covering the latest geospatial technologies including Google Earth Engine, Python automation, cloud-based processing, and modern web mapping frameworks to help professionals master cutting-edge GIS workflows.",
    imageSrc: "/assets/books.png",
    gradient: "from-amber-600 to-yellow-400",
    categories: ["gis"],
    displayCategories: ["Education", "Training"],
    technologies: "Google Earth Engine, Python, GeoPandas, Leaflet, PostGIS, QGIS",
    projectLink: "https://github.com/HillaryKoros/gis-training",
    codeLink: "https://github.com/HillaryKoros/gis-training",
    status: "ongoing",
    problem: "GIS professionals require practical training on modern geospatial technologies, yet traditional curricula often lack coverage of cloud computing, automation workflows, and emerging tools transforming the industry.",
    solution: "Developing a comprehensive GitHub-hosted training repository featuring documentation, Jupyter notebooks, production-ready code examples, and structured guides covering modern GIS technologies—enabling professionals to adopt and implement cutting-edge tools effectively.",
    results: [
      "Providing open-source training materials on GitHub",
      "Creating interactive Jupyter notebooks with examples",
      "Covering modern cloud-based geospatial workflows",
      "Helping professionals transition to cutting-edge technologies"
    ],
    metrics: [
      { label: "Training Modules", value: "12+" },
      { label: "Jupyter Notebooks", value: "30+" },
      { label: "Code Examples", value: "100+" },
      { label: "Technologies Covered", value: "8+" }
    ],
    features: [
      "Google Earth Engine tutorials",
      "Python geospatial automation",
      "Cloud-native GIS workflows",
      "Modern web mapping (Leaflet, Mapbox)",
      "Spatial database with PostGIS"
    ],
    duration: "2024 - Present",
    role: "GIS Trainer & Developer",
    tutorials: [
      {
        id: "tut-gee-complete",
        title: "Google Earth Engine Masterclass",
        description: "Complete guide to cloud-based remote sensing with GEE",
        type: "notebook",
        url: "https://github.com/HillaryKoros/gis-training/tree/main/google-earth-engine"
      },
      {
        id: "tut-python-geo",
        title: "Python Geospatial Stack",
        description: "GeoPandas, Rasterio, Shapely, and modern Python GIS",
        type: "notebook",
        url: "https://github.com/HillaryKoros/gis-training/tree/main/python-geospatial"
      },
      {
        id: "tut-postgis-advanced",
        title: "PostGIS & Spatial SQL",
        description: "Spatial databases, queries, and optimization",
        type: "guide",
        url: "https://github.com/HillaryKoros/gis-training/tree/main/postgis"
      },
      {
        id: "tut-webmapping-modern",
        title: "Modern Web Mapping",
        description: "Leaflet, Mapbox GL JS, and deck.gl for web maps",
        type: "guide",
        url: "https://github.com/HillaryKoros/gis-training/tree/main/web-mapping"
      },
      {
        id: "tut-cloud-gis",
        title: "Cloud-Native GIS",
        description: "AWS, GCP, and cloud geospatial infrastructure",
        type: "workshop",
        url: "https://github.com/HillaryKoros/gis-training/tree/main/cloud-gis"
      },
      {
        id: "tut-automation",
        title: "GIS Workflow Automation",
        description: "Automating repetitive GIS tasks with Python scripts",
        type: "notebook",
        url: "https://github.com/HillaryKoros/gis-training/tree/main/automation"
      }
    ]
  }
];
