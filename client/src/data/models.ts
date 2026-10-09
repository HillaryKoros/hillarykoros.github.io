/**
 * Hydrological and flood-forecasting models Hillary runs pipelines for.
 *
 * This list has changed twice while the site was being built, and it is quoted
 * in several places, so it is written down once here. Add a model and every
 * sentence that lists them picks it up.
 *
 * Note this is deliberately broader than the Nile multi-model ensemble, which
 * combines four of them — that narrower claim stays stated on the Flood Watch
 * project itself rather than being derived from this list.
 */
export const hydroModels = [
  'FloodPROOFS',
  'WRF-Hydro',
  'HYPE',
  'GeoSFM',
  'MIKE Hydro',
  'GEOGloWS',
  'Google Flood Hub',
] as const;

/** "a, b and c" — Oxford-comma-free, for running prose. */
export function sentenceList(items: readonly string[]): string {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

export const hydroModelList = sentenceList(hydroModels);
