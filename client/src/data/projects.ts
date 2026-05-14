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
  iconKey?: 'waves' | 'cloud' | 'workflow' | 'map' | 'book' | 'swap' | 'health' | 'chart';
  gradient?: string;
  categories: string[];
  displayCategories: string[];
  technologies: string;
  projectLink?: string;
  codeLink?: string;
  organization?: string;
  status: 'operational' | 'ongoing' | 'completed' | 'planned';
  problem?: string;
  solution?: string;
  results?: string[];
  metrics?: { label: string; value: string }[];
  features?: string[];
  duration?: string;
  role?: string;
  tutorials?: Tutorial[];
}

// Ordered so operational ICPAC work leads, then ongoing engineering and prior
// research/operational projects from the CV (CIMA, KEMRI, Bomet), then training.
export const projects: Project[] = [
  // ─── OPERATIONAL ─────────────────────────────────────────────────────────
  {
    id: "east-africa-flood-watch",
    title: "East Africa Flood Watch System",
    description: "Regional flood early-warning platform serving the 11 IGAD member states. Integrates multiple hydrological forecasting systems, satellite Earth observation, and geospatial analytics into a unified operational workflow that supports anticipatory action across the Greater Horn of Africa. Sits inside ICPAC's broader early-warning portfolio that also feeds AMHEWAS reporting to the African Union Commission.",
    imageSrc: "/assets/ARCGIS-PRO.png",
    iconKey: "waves",
    gradient: "from-blue-500 to-cyan-400",
    categories: ["gis", "data", "web"],
    displayCategories: ["ICPAC", "Early Warning", "Full Stack"],
    technologies: "Python, FastAPI, Next.js, PostGIS, GDAL, NetCDF/GRIB, Xarray, Docker, GCP, cloud-optimised geospatial formats",
    projectLink: "https://www.icpac.net/",
    codeLink: "https://github.com/icpac-igad",
    organization: "icpac",
    status: "operational",
    problem: "The Greater Horn of Africa — over 300 million people across 11 countries — faces escalating flood disasters. Forecast outputs from FloodPROOFS, GeoSFM, MIKE Hydro and HYPE lived in different silos; national disaster management agencies had no unified view, and the broader early-warning portfolio (Hazards Watch, Drought Watch, Agriculture Watch) needed a coherent operational spine.",
    solution: "A production-grade platform built on cloud-native infrastructure. A Nile multi-model ensemble pipeline ingests outputs from multiple hydrological systems, normalises them onto a common grid and gauge set, and exposes ensemble forecasts plus disagreement signals to a forecaster-facing viewer. The same backbone supports the wider portfolio (East Africa Hazards Watch, Drought Watch, Agriculture Watch) and feeds AMHEWAS reporting.",
    results: [
      "Operational early warning across 11 IGAD member states",
      "Nile multi-model ensemble unifies FloodPROOFS, GeoSFM, MIKE Hydro, HYPE",
      "Decision-support dashboards used by national disaster management agencies",
      "Backbone reused across ICPAC's wider Hazards/Drought/Agriculture Watch portfolio",
      "Feeds AMHEWAS progress reporting to the African Union Commission"
    ],
    metrics: [
      { label: "Countries Served", value: "11" },
      { label: "Models in Nile Ensemble", value: "4+" },
      { label: "River Basins (Level 6)", value: "800+" },
      { label: "Forecast Horizon", value: "7 days" }
    ],
    features: [
      "Nile multi-model flood ensemble (FloodPROOFS, GeoSFM, MIKE Hydro, HYPE)",
      "Real-time flood monitoring dashboard for forecasters",
      "Satellite EO integration for hazard context",
      "Automated daily forecast pipeline on cloud-native infrastructure",
      "Shared backbone with Hazards Watch, Drought Watch, Agriculture Watch"
    ],
    duration: "March 2025 - Present",
    role: "Lead Developer (GIS Researcher & Engineer)"
  },
  {
    id: "grib-index-kerchunk",
    title: "grib-index-kerchunk — VirtualiZarr for Global NWP",
    description: "Open-source tool for cloud-native indexing of global weather forecast archives — ECMWF IFS and NOAA GEFS. Custom VirtualiZarr parsers emit Zarr v3 reference layers backed by Icechunk so researchers and operational teams can subset specific members, variables, and timesteps on demand, without downloading full archive files. Co-developed with Development Seed; subject of my EGU 2026 ESSI2.3 talk.",
    imageSrc: "/assets/gdal.png",
    iconKey: "cloud",
    gradient: "from-emerald-500 to-teal-400",
    categories: ["data", "gis"],
    displayCategories: ["ICPAC", "Open Source", "Cloud-Native"],
    technologies: "Python, VirtualiZarr, Icechunk, Zarr v3, GRIB2, xarray, Dask, fsspec, GCP",
    projectLink: "https://github.com/icpac-igad/grib-index-kerchunk",
    codeLink: "https://github.com/icpac-igad/grib-index-kerchunk",
    organization: "icpac",
    status: "operational",
    problem: "Global ensemble prediction archives (ECMWF IFS, NOAA GEFS) are massive, monolithic, and slow to query. Pulling a single member, variable, or timestep traditionally meant downloading whole files or maintaining a separately-encoded Zarr copy. Neither scales for an operational regional centre running multiple models on shared cloud infrastructure.",
    solution: "Custom VirtualiZarr parsers that piggy-back on existing GRIB metadata to produce Zarr v3 reference manifests, with Icechunk providing transactional storage on cloud object stores. The source archive stays untouched, and consumers read only the chunks they need via the standard xarray + Dask interface.",
    results: [
      "Random-access reads on ECMWF IFS and NOAA GEFS archives without full downloads",
      "Reuse of existing GRIB indexes — no second source of truth",
      "Drop-in xarray + Zarr v3 interface for downstream pipelines",
      "Foundation for ICPAC's multi-model flood and subseasonal forecast stack",
      "Presented at EGU General Assembly 2026 (ESSI2.3)"
    ],
    metrics: [
      { label: "Sources", value: "ECMWF IFS, NOAA GEFS" },
      { label: "Reference Format", value: "Zarr v3 / VirtualiZarr" },
      { label: "Storage Engine", value: "Icechunk" },
      { label: "Consumer Stack", value: "xarray + Dask" }
    ],
    features: [
      "VirtualiZarr custom parsers for GRIB",
      "Icechunk-backed transactional Zarr v3 storage",
      "Reuse of operational GRIB index files",
      "Member/variable/timestep-level lazy reads",
      "Object-store native (GCP, S3, fsspec)"
    ],
    duration: "2025 - Present",
    role: "Co-developer (ICPAC × Development Seed) · Presenting Author, EGU 2026"
  },

  // ─── ONGOING ─────────────────────────────────────────────────────────────
  {
    id: "etl-utility-package",
    title: "ETL Utility Package",
    description: "Reusable Python toolkit for geospatial and climate ETL workflows. Battle-tested connectors (FTP/SFTP/HTTPS/REST), format-aware transformations (NetCDF/GeoTIFF/HDF5/GRIB), and Celery-based orchestration so teams stop reinventing the same pipeline scaffolding.",
    imageSrc: "/assets/gdal.png",
    iconKey: "workflow",
    gradient: "from-rose-500 to-pink-400",
    categories: ["data", "gis"],
    displayCategories: ["Python Package", "ETL"],
    technologies: "Python, Paramiko, httpx, xarray, Rasterio, GDAL, Celery, Redis, Pydantic, Click",
    projectLink: "https://github.com/HillaryKoros",
    codeLink: "https://github.com/HillaryKoros",
    status: "ongoing",
    problem: "Climate and geospatial pipelines repeatedly need to connect to many protocols, parse diverse formats, and run reliably in production with retries, pooling, and scheduling. Without shared utilities every team rebuilds the same scaffolding, with the same bugs.",
    solution: "A modular package layered as Extract (remote protocols with retry/pooling) → Transform (parse, reproject, resample, filter) → Load (NetCDF, COG, Zarr, PostGIS, S3/GCS) → Orchestrate (Celery workers + CLI). Each layer is usable standalone.",
    results: [
      "Unified protocol connectors with built-in reliability",
      "Format-agnostic parsing and transformation",
      "Production-ready task scheduling",
      "~70% reduction in boilerplate across new pipelines"
    ],
    metrics: [
      { label: "Protocols", value: "FTP, SFTP, HTTP, API" },
      { label: "Input Formats", value: "NetCDF, GeoTIFF, HDF5, GRIB" },
      { label: "Output Formats", value: "COG, Zarr, PostGIS" },
      { label: "Code Reduction", value: "~70%" }
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
  {
    id: "lis-bomet",
    title: "Bomet Land Information System",
    description: "Web-based land registry digitisation for Bomet County. Interactive parcel viewer, ownership management, spatial queries, and an online digitisation portal so field officers can capture parcels directly instead of round-tripping paper.",
    imageSrc: "/assets/ARCGIS-PRO.png",
    iconKey: "map",
    gradient: "from-violet-500 to-purple-400",
    categories: ["gis", "web"],
    displayCategories: ["Web GIS", "Database"],
    technologies: "JavaScript, React, PostgreSQL, PostGIS, Leaflet, Node.js, QGIS",
    projectLink: "https://hillarykoros.github.io/LIS_Bomet_Case_Study/",
    codeLink: "https://github.com/HillaryKoros/LIS_Bomet_Case_Study",
    status: "ongoing",
    problem: "Bomet County's paper-based land registry produced slow transactions, fraud exposure, boundary disputes, and limited transparency. Field officers had no on-site digitisation tool — everything had to be re-keyed at the office, creating delays and transcription errors.",
    solution: "A PostGIS-backed Land Information System with interactive Leaflet mapping, originating from work at the County Government of Bomet (2018–2023) and maintained as a case study with an in-progress online digitisation portal for field capture.",
    results: [
      "Over 50,000 land parcels digitised",
      "Scanned maps and documents available online",
      "Search time reduced from days to minutes",
      "Improved transparency in land transactions",
      "Field digitisation portal in active development"
    ],
    metrics: [
      { label: "Parcels Digitised", value: "50,000+" },
      { label: "Scanned Documents", value: "Online" },
      { label: "Search Time Reduction", value: "95%" },
      { label: "Daily Queries", value: "200+" }
    ],
    features: [
      "Interactive parcel map viewer",
      "Online scanned maps and documents",
      "Ownership search and verification",
      "Spatial query builder",
      "Online digitisation forms (in development)",
      "Field data capture interface",
      "Print-ready parcel reports"
    ],
    duration: "2018 - Present",
    role: "GIS Developer"
  },
  {
    id: "gis-tutorials",
    title: "GIS Training Materials",
    description: "Open educational resources covering modern geospatial workflows — Google Earth Engine, Python automation, cloud-native processing, PostGIS, and modern web mapping — aimed at practitioners moving past desktop-only GIS.",
    imageSrc: "/assets/books.png",
    iconKey: "book",
    gradient: "from-amber-600 to-yellow-400",
    categories: ["gis"],
    displayCategories: ["Education", "Training"],
    technologies: "Google Earth Engine, Python, GeoPandas, Leaflet, PostGIS, QGIS",
    projectLink: "https://github.com/HillaryKoros/gis-training",
    codeLink: "https://github.com/HillaryKoros/gis-training",
    status: "ongoing",
    problem: "Traditional GIS curricula under-cover cloud computing, automation, and the modern stack practitioners actually ship with. Self-learners need structured, runnable material.",
    solution: "A GitHub-hosted training repository with notebooks, runnable examples, and guides covering cloud-native and Python-first geospatial workflows.",
    results: [
      "Open-source training materials on GitHub",
      "Interactive Jupyter notebooks with examples",
      "Coverage of cloud-based geospatial workflows",
      "Helps practitioners transition off desktop-only GIS"
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
  },

  // ─── COMPLETED (prior roles, still meaningful for the portfolio) ─────────
  {
    id: "floodproofs-transfer",
    title: "FloodPROOFS East Africa — Operational Intake at ICPAC",
    description: "Supported the operational transfer of CIMA Research Foundation's FloodPROOFS East Africa flood forecasting system into ICPAC. This was my initial mandate at ICPAC — building reproducible pipelines and automated data processing workflows so the system could keep forecasting on schedule under new ownership, and laying the groundwork for what became the East Africa Flood Watch System.",
    imageSrc: "/assets/gdal.png",
    iconKey: "swap",
    gradient: "from-sky-500 to-blue-400",
    categories: ["data", "gis"],
    displayCategories: ["ICPAC", "Hydrology", "Operations"],
    technologies: "Python, Docker, CI/CD, FloodPROOFS, NetCDF/GRIB, cloud-optimised geospatial formats",
    organization: "icpac",
    status: "completed",
    problem: "FloodPROOFS East Africa had been developed and operated at CIMA Research Foundation. For long-term regional ownership it needed to land at ICPAC as the operational host — without losing reproducibility, scheduling guarantees, or the ability to keep forecasting on the same cadence during the handover.",
    solution: "As initial ICPAC work, designed and implemented automated data processing workflows for regional flood monitoring and forecasting, hardened the deployment in ICPAC's environment, and contributed to the design of the wider Flood Watch System into which FloodPROOFS now feeds.",
    results: [
      "Operational continuity preserved through the CIMA → ICPAC handover",
      "Automated pipelines for routine regional flood forecasting",
      "FloodPROOFS now feeds the East Africa Flood Watch System as one of its hydrological models",
      "Reproducible deployment in ICPAC's environment",
      "Foundation for subsequent leadership of the Flood Watch System"
    ],
    metrics: [
      { label: "Host", value: "ICPAC" },
      { label: "Source System", value: "CIMA FloodPROOFS" },
      { label: "Outcome", value: "Operational continuity" },
      { label: "Successor", value: "Flood Watch System" }
    ],
    features: [
      "Automated data processing workflows",
      "Reproducible operational deployment in ICPAC's environment",
      "Integration design into the regional Flood Watch System"
    ],
    duration: "Initial ICPAC mandate, 2025",
    role: "GIS Researcher & Engineer, ICPAC"
  },
  {
    id: "kemri-malaria-spatial",
    title: "Malaria Spatial Epidemiology — SSA & MENA",
    description: "Spatial analysis and dataset harmonisation for malaria disease mapping across Sub-Saharan Africa and the Middle East and North Africa. Assembled and harmonised parasite and vector survey datasets and integrated satellite-derived environmental covariates with household survey data (DHS, UNICEF, IPUMS) for spatial epidemiology.",
    imageSrc: "/assets/gdal.png",
    iconKey: "health",
    gradient: "from-fuchsia-500 to-purple-400",
    categories: ["gis", "data"],
    displayCategories: ["KEMRI–Wellcome", "Spatial Epi", "Research"],
    technologies: "ArcGIS Pro, R, Python, Google Earth Engine, household survey data (DHS, UNICEF, IPUMS)",
    organization: "kemri",
    status: "completed",
    problem: "Malaria disease mapping across SSA and MENA requires bringing together parasite/vector surveys from heterogeneous national programmes and aligning them with satellite environmental covariates and household survey data at consistent administrative units.",
    solution: "Assembled and harmonised parasite and vector survey datasets across SSA and MENA, integrated satellite-derived environmental covariates, and ran spatial analyses across national and subnational boundaries to support disease mapping at the KEMRI–Wellcome Trust Research Programme.",
    results: [
      "Harmonised parasite and vector datasets across SSA and MENA",
      "Integration of satellite environmental covariates with household surveys",
      "Spatial analyses supporting malaria disease mapping",
      "Scientific communication via KEMRI–Wellcome seminars and journal clubs"
    ],
    metrics: [
      { label: "Regions", value: "SSA + MENA" },
      { label: "Survey Sources", value: "DHS, UNICEF, IPUMS" },
      { label: "Duration", value: "Jul 2023 – Jun 2024" },
      { label: "Host", value: "KEMRI–Wellcome Trust" }
    ],
    features: [
      "Cross-regional parasite/vector dataset harmonisation",
      "Satellite environmental covariate integration",
      "National and subnational spatial analysis",
      "Public health research workflow management"
    ],
    duration: "July 2023 – June 2024",
    role: "Assistant Research Officer, GIS"
  },

  // ─── PLANNED ─────────────────────────────────────────────────────────────
  {
    id: "predictive-modeling",
    title: "Predictive Modeling & Analytics",
    description: "Predictive analytics toolkit spanning geospatial modeling, statistical inference, and machine learning — GLMs, spatial regression, ensemble methods, and uncertainty quantification for environmental decision-making.",
    imageSrc: "/assets/gdal.png",
    iconKey: "chart",
    gradient: "from-indigo-500 to-blue-400",
    categories: ["data"],
    displayCategories: ["Data Science", "Predictive Analytics"],
    technologies: "Python, R, scikit-learn, statsmodels, XGBoost, GeoPandas, Stan",
    projectLink: "https://github.com/HillaryKoros",
    codeLink: "https://github.com/HillaryKoros",
    status: "planned",
    problem: "Environmental decisions need predictive capability that spans statistical modeling, spatial analysis, and ML — yet integrating these cleanly over geospatial inputs is non-trivial.",
    solution: "A toolkit covering GLMs/GAMs, spatial regression, ensemble ML (RF, XGBoost, LightGBM), Bayesian inference, and geospatial prediction with proper uncertainty quantification.",
    results: [
      "Unified interface across statistical and ML models",
      "Integration of GLMs with spatial predictors",
      "Prediction maps with uncertainty bounds",
      "Reproducible analytical workflows"
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
  }
];
