interface Technology {
  name: string;
  imageSrc: string;
  alt: string;
}

interface TechCategory {
  name: string;
  iconKey: string; // resolved to a Lucide icon in TechGrid
  items: Technology[];
}

const placeholder = "/assets/gdal.png";
const t = (name: string): Technology => ({ name, imageSrc: placeholder, alt: name });

export const techCategories: TechCategory[] = [
  {
    name: "GIS & Earth Observation",
    iconKey: "globe",
    items: [
      t("ArcGIS Pro"),
      t("QGIS"),
      t("Google Earth Engine"),
      t("PostGIS"),
      t("GDAL"),
      t("Leaflet"),
      t("Mapbox")
    ]
  },
  {
    name: "Cloud-Native Data",
    iconKey: "cloud",
    items: [
      t("Zarr v3"),
      t("VirtualiZarr"),
      t("Kerchunk"),
      t("Icechunk"),
      t("xarray"),
      t("Dask"),
      t("NetCDF"),
      t("GRIB"),
      t("Cloud-Optimised GeoTIFF")
    ]
  },
  {
    name: "Languages",
    iconKey: "code",
    items: [
      t("Python"),
      t("R"),
      t("JavaScript"),
      t("TypeScript"),
      t("SQL"),
      t("Bash")
    ]
  },
  {
    name: "ML & Data",
    iconKey: "brain",
    items: [
      t("scikit-learn"),
      t("TensorFlow"),
      t("XGBoost"),
      t("GeoPandas"),
      t("Rasterio"),
      t("FastAPI"),
      t("React")
    ]
  },
  {
    name: "Databases",
    iconKey: "database",
    items: [
      t("PostgreSQL / PostGIS"),
      t("Redis"),
      t("MongoDB"),
      t("SQLite")
    ]
  },
  {
    name: "DevOps & Infrastructure",
    iconKey: "settings",
    items: [
      t("Docker"),
      t("Kubernetes"),
      t("GCP"),
      t("AWS"),
      t("Linux"),
      t("Git"),
      t("GitHub Actions"),
      t("Nginx"),
      t("CI/CD")
    ]
  }
];

export const technologies: Technology[] = techCategories.flatMap(cat => cat.items);
