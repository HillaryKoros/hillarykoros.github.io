/**
 * What Hillary is working on and what he does — content that previously lived
 * hardcoded inside components (CurrentlyBuilding, StatsBand, the About page's
 * `capabilities` array). Keeping it here means the pages stay presentational.
 */

import { hydroModelList } from './models';

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
    title: 'Continuous Risk Monitoring & Assessment (CRMA)',
    detail: 'Bayesian-network impact-based forecasting for flood and drought risk.',
    icon: 'activity',
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
    detail: `Reproducible pipelines for ${hydroModelList}.`,
    icon: 'settings',
    state: 'shipping',
  },
];

export interface Stat {
  /** Numeric figure, or `display` when the measure is not a number. */
  value?: number;
  suffix?: string;
  display?: string;
  label: string;
  /** Who the work was for — the point is that it is not all one employer. */
  org: string;
  note: string;
}

/**
 * Impact, one entry per organisation.
 *
 * These were all ICPAC figures at first, which made nine years of work across
 * five organisations read as a single posting. Each tile now comes from a
 * different employer or body of work, and every figure is backed by a project
 * in `projects.ts` or a role in `experience.ts`. The remaining ICPAC-specific
 * numbers (basins, models in the ensemble) live on the Flood Watch project
 * page, where they belong.
 */
export const impact: Stat[] = [
  {
    value: 11,
    label: 'IGAD member states',
    org: 'ICPAC',
    note: 'under operational flood early warning via the East Africa Flood Watch System',
  },
  {
    value: 50000,
    suffix: '+',
    label: 'Land parcels digitised',
    org: 'County Government of Bomet',
    note: 'a paper land registry moved into PostGIS, with search cut from days to minutes',
  },
  {
    display: 'SSA + MENA',
    label: 'Malaria mapping coverage',
    org: 'KEMRI–Wellcome Trust',
    note: 'parasite and vector surveys harmonised with DHS, UNICEF and IPUMS data',
  },
  {
    value: 30,
    suffix: '+',
    label: 'Open notebooks & guides',
    org: 'Open source',
    note: 'training material on cloud-native geospatial workflows, free to use',
  },
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
      `Multi-model hydrological forecasting and ensemble pipelines across ${hydroModelList}.`,
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
