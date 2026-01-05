// Full blog articles with problem/solution/verdict
export interface BlogArticle {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  problem: string;
  solution: string;
  verdict: string;
  keyPoints: string[];
  tags: string[];
}

// Simple resource links (notebooks, scripts, social posts)
export interface ResourceLink {
  id: string;
  title: string;
  description: string;
  type: 'notebook' | 'github' | 'pdf' | 'script' | 'twitter' | 'linkedin';
  url: string;
  category: string;
}

export const blogArticles: BlogArticle[] = [
  {
    id: "multi-model-flood-forecasting",
    title: "Integrating Multiple Hydrological Models for Flood Forecasting",
    description: "How we combined FLOODPROOFS, GeoSFM, MIKE, HYPE, WRF and Google AI forecasts into a unified early warning system.",
    category: "Data Science",
    date: "2025-01",
    readTime: "10 min",
    problem: "Different hydrological models have different strengths - FLOODPROOFS excels at river routing, GeoSFM handles large basins, MIKE provides detailed hydraulics, and Google AI offers global coverage. Using a single model meant missing critical flood signals in certain regions.",
    solution: "Built a multi-model ensemble system that ingests forecasts from all sources, normalizes outputs to a common format, and generates weighted ensemble predictions. Created visualization dashboards that display individual model outputs alongside ensemble forecasts, helping forecasters understand model agreement.",
    verdict: "Ensemble forecasts consistently outperform individual models. When models agree, confidence is high. When they disagree, it signals uncertainty - equally valuable information. The system now serves 11 countries with improved lead times.",
    keyPoints: [
      "Each model has unique strengths for different basin types",
      "Ensemble methods improve forecast reliability",
      "Model disagreement signals forecast uncertainty",
      "Unified data pipeline simplifies operations"
    ],
    tags: ["Hydrology", "Machine Learning", "GeoSFM", "FLOODPROOFS", "WRF"]
  },
  {
    id: "gee-at-scale",
    title: "Scaling Google Earth Engine Exports",
    description: "How to process continental-scale imagery without hitting limits.",
    category: "Remote Sensing",
    date: "2024-12",
    readTime: "7 min",
    problem: "Needed to export NDVI time series for all of East Africa - millions of square kilometers. Initial approach kept hitting GEE's memory and timeout limits. Exports would fail randomly or take days to complete.",
    solution: "Implemented a tiled export strategy: divided the region into 1-degree grid cells, exported each tile separately, and used a Python script to orchestrate exports and monitor completion. Used Cloud Storage as the destination and added retry logic for failed tiles.",
    verdict: "Processing time dropped from 'infinite failures' to 3 days for the entire region. The tiled approach also made it easy to resume after failures and parallelize across multiple GEE accounts. Always break continental-scale jobs into manageable tiles.",
    keyPoints: [
      "Divide large regions into grid tiles",
      "Export to Cloud Storage, not Drive",
      "Implement monitoring and retry logic",
      "Use multiple accounts for parallelization"
    ],
    tags: ["Google Earth Engine", "Remote Sensing", "Cloud", "Python", "Scale"]
  },
  {
    id: "postgis-for-land-parcels",
    title: "PostGIS for Land Parcel Management",
    description: "Lessons from digitizing 50,000+ land parcels in Bomet County.",
    category: "Database",
    date: "2024-11",
    readTime: "8 min",
    problem: "Paper-based land records led to disputes, fraud, and inefficient administration. Needed a robust spatial database that could handle complex polygon topologies, ownership history, and fast spatial queries for a county-wide system.",
    solution: "Designed a PostGIS schema with proper topology rules to prevent overlapping parcels. Implemented triggers for audit trails, spatial indexes for fast queries, and views for common reporting needs. Used pg_topology extension to maintain topological consistency.",
    verdict: "PostGIS handles the workload beautifully. Parcel searches that took days now take seconds. The topology rules catch digitization errors before they become disputes. Key insight: invest time in schema design upfront - it pays dividends.",
    keyPoints: [
      "Use pg_topology for parcel boundaries",
      "Implement audit triggers for ownership changes",
      "Create materialized views for reporting",
      "Spatial indexes are essential for performance"
    ],
    tags: ["PostGIS", "Land Administration", "PostgreSQL", "GIS", "Database"]
  },
  {
    id: "fastapi-geospatial-api",
    title: "Building Fast Geospatial APIs with FastAPI",
    description: "Patterns for serving spatial data at scale with Python.",
    category: "Web Development",
    date: "2024-10",
    readTime: "9 min",
    problem: "Flask-based API was struggling with concurrent requests and large GeoJSON responses. Response times exceeded 5 seconds for complex spatial queries, and the server would timeout during peak usage.",
    solution: "Migrated to FastAPI with async database queries using asyncpg. Implemented geometry simplification based on zoom level, GeoJSON streaming for large responses, and Redis caching for frequently accessed data. Added bbox as a required parameter to prevent unbounded queries.",
    verdict: "Response times dropped to under 500ms. Async queries handle 10x more concurrent users. The zoom-based simplification reduced payload sizes by 90% for overview requests. FastAPI's automatic documentation made API adoption easier for frontend developers.",
    keyPoints: [
      "Use asyncpg for non-blocking database queries",
      "Simplify geometries based on zoom level",
      "Stream large GeoJSON responses",
      "Always require spatial bounds in queries"
    ],
    tags: ["FastAPI", "API Design", "Python", "GeoJSON", "Performance"]
  }
];

export const notebookLinks: ResourceLink[] = [
  {
    id: "nb-gee-classification",
    title: "GEE Land Cover Classification",
    description: "Random Forest classification with Sentinel-2",
    type: "notebook",
    url: "https://colab.research.google.com/",
    category: "Remote Sensing"
  },
  {
    id: "nb-ndvi-timeseries",
    title: "NDVI Time Series Analysis",
    description: "Vegetation monitoring with Python",
    type: "notebook",
    url: "https://github.com/HillaryKoros",
    category: "Remote Sensing"
  },
  {
    id: "nb-postgis-queries",
    title: "PostGIS Spatial Queries",
    description: "Common spatial query patterns",
    type: "github",
    url: "https://github.com/HillaryKoros",
    category: "Database"
  },
  {
    id: "nb-leaflet-starter",
    title: "Leaflet + PostGIS Starter",
    description: "Full stack web mapping template",
    type: "github",
    url: "https://github.com/HillaryKoros",
    category: "Web Development"
  },
  {
    id: "script-gdal-batch",
    title: "GDAL Batch Processing Script",
    description: "Automate raster conversion and reprojection",
    type: "script",
    url: "https://github.com/HillaryKoros",
    category: "DevOps"
  },
  {
    id: "script-docker-gis",
    title: "Docker GIS Environment Setup",
    description: "Dockerfile for complete GIS stack",
    type: "script",
    url: "https://github.com/HillaryKoros",
    category: "DevOps"
  },
  {
    id: "tweet-gee-tips",
    title: "GEE Performance Tips Thread",
    description: "10 tips for faster Earth Engine scripts",
    type: "twitter",
    url: "https://twitter.com/HillaryKoros",
    category: "Remote Sensing"
  },
  {
    id: "linkedin-spatial-sql",
    title: "Spatial SQL Best Practices",
    description: "PostGIS query optimization techniques",
    type: "linkedin",
    url: "https://linkedin.com/in/hillarykoros",
    category: "Database"
  }
];

export const categories = ["All", "DevOps", "Database", "Web Development", "Data Science", "Remote Sensing"];
