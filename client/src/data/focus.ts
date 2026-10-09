/**
 * What Hillary is working on and what he does — content that previously lived
 * hardcoded inside components (CurrentlyBuilding, StatsBand, the About page's
 * `capabilities` array). Keeping it here means the pages stay presentational.
 */

export type IconKey =
  | 'waves' | 'cloud' | 'brain' | 'satellite' | 'database' | 'settings' | 'activity' | 'globe';

export interface NowItem {
  title: string;
  detail: string;
  icon: IconKey;
  /** `active` = current focus; `shipping` = in flight. */
  state: 'active' | 'shipping';
}

export const nowBuilding: NowItem[] = [
  {
    title: 'East Africa Flood Watch v3',
    detail: 'Multi-model ensemble, finer admin units, faster publication.',
    icon: 'waves',
    state: 'active',
  },
  {
    title: 'Icechunk-backed ARCO stores',
    detail: 'Transactional Zarr for IMERG, CHIRPS and ERA5.',
    icon: 'cloud',
    state: 'shipping',
  },
  {
    title: 'RAG over climate knowledge',
    detail: 'Retrieval-augmented assistants for bulletins, sitreps and briefs.',
    icon: 'brain',
    state: 'shipping',
  },
  {
    title: 'DevOps for hydrological models',
    detail: 'Reproducible pipelines for WRF-Hydro, HYPE and GeoSFM.',
    icon: 'settings',
    state: 'shipping',
  },
];

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
  note: string;
}

/** Figures shown on the home page. Each one is backed by a project in `projects.ts`. */
export const impact: Stat[] = [
  { value: 11,  label: 'IGAD member states',  note: 'served by the East Africa Flood Watch System' },
  { value: 800, suffix: '+', label: 'River basins', note: 'level-6 basins under operational forecast' },
  { value: 5,   suffix: '+', label: 'Platforms shipped', note: 'operational and ongoing, see Work' },
  { value: 4,   label: 'Hydrological models', note: 'unified in the Nile multi-model ensemble' },
];

export interface Capability {
  title: string;
  description: string;
  icon: IconKey;
}

export const capabilities: Capability[] = [
  {
    title: 'Flood early warning systems',
    description:
      'Operational regional early-warning infrastructure — gauge networks, alerting, and forecaster-facing decision tools.',
    icon: 'waves',
  },
  {
    title: 'Flood hydroinformatics',
    description:
      'Multi-model hydrological forecasting and ensemble pipelines: FloodPROOFS, GeoSFM, MIKE Hydro, HYPE, GEOGloWS and Google Flood Hub.',
    icon: 'activity',
  },
  {
    title: 'AI/ML for hydroclimatic forecasting',
    description:
      'ML pipelines for forecast skill enhancement, AIFS-class inference at regional scale, and explainable models for decision support.',
    icon: 'brain',
  },
  {
    title: 'Cloud-native geospatial',
    description:
      'Zarr v3 with VirtualiZarr, Kerchunk and Icechunk over GRIB and NetCDF — lazy reads of global NWP archives straight from object storage.',
    icon: 'cloud',
  },
  {
    title: 'Satellite Earth observation',
    description:
      'Sentinel, Landsat and Google Earth Engine workflows for flood mapping, vegetation monitoring and environmental covariates.',
    icon: 'satellite',
  },
  {
    title: 'Spatial data infrastructure & DevOps',
    description:
      'PostGIS, FastAPI, Docker and GCP — productionising spatial pipelines with reproducible deployments and CI/CD.',
    icon: 'database',
  },
];
