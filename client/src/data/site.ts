/**
 * Single source of truth for identity, contact details and outbound links.
 *
 * Nothing else in the app hardcodes an email address, phone number, profile URL
 * or CV link — import from here. If a detail changes, it changes in one place.
 */

export const site = {
  name: 'Hillary Koros',

  /*
   * Titles change as the work does — this is the only place any of them are
   * written down. `role` is the professional identity shown in the header,
   * hero, footer and all page metadata; `engagement` is how the ICPAC
   * relationship is described. Edit here and the whole site follows.
   */
  role: 'Geospatial Developer & DevOps Engineer',
  engagement: 'Consultant',

  /*
   * The hero cycles through these. `role` above stays the canonical one — it
   * is what page titles, the header and screen readers use, so the site still
   * has a single answer to "what does he do" even though the hero rotates.
   * Add, remove or reorder freely; the first entry is shown first.
   */
  roles: [
    'Geospatial Developer & DevOps Engineer',
    'DevOps Consultant',
    'Flood Hydroinformatics',
    'AI/ML for Hydroclimatic Forecasting',
    'Earth Observation · Early Warning',
    'Cloud-Native Geospatial',
  ],

  org: {
    name: 'ICPAC',
    longName: 'IGAD Climate Prediction and Applications Centre',
    url: 'https://www.icpac.net/',
  },
  location: {
    city: 'Nairobi',
    country: 'Kenya',
    countryCode: 'KE',
    /** IANA zone — the clock is derived from this, never from a fixed offset. */
    tz: 'Africa/Nairobi',
    tzLabel: 'EAT',
    lat: -1.2921,
    lon: 36.8219,
    openTo: ['Remote work', 'Travel across the Horn of Africa', 'Conference travel'],
    /** Local hours Hillary is normally reachable, in `tz`. */
    workingHours: [8, 18] as const,
  },
  url: 'https://hillarykoros.github.io',
  tagline: 'Engineering geospatial systems that turn climate data into decisions.',
  summary:
    'I work at the intersection of Earth observation, hydroinformatics, machine learning and ' +
    'cloud-native architecture — building operational platforms for governments, county ' +
    'authorities and research programmes. Currently at ICPAC, serving the 11 countries of the ' +
    'Greater Horn of Africa.',
  available: true,
  availableFor: 'Open to research positions, consulting, conference talks and collaborations.',

  email: 'koroshillary12@gmail.com',
  phone: '+254719588603',
  cvUrl: 'https://drive.google.com/file/d/191QzSUJbrNyoMm7ISvMVnwlzWGD0av1P/view',
  calendlyUrl: 'https://calendly.com/hillarykoros',

  socials: [
    { id: 'github',   label: 'GitHub',   handle: 'HillaryKoros',  url: 'https://github.com/HillaryKoros' },
    { id: 'linkedin', label: 'LinkedIn', handle: 'hillarykoros',  url: 'https://www.linkedin.com/in/hillarykoros' },
    { id: 'x',        label: 'X',        handle: '@Hill_Koros',   url: 'https://x.com/Hill_Koros' },
    { id: 'youtube',  label: 'YouTube',  handle: 'Hillary Koros', url: 'https://www.youtube.com/channel/UCBAQumFhQFt8Ty0bus5rSNg' },
  ],

  support: [
    { id: 'coffee',   label: 'Buy me a coffee', url: 'https://buymeacoffee.com/hillarykoros' },
    { id: 'sponsors', label: 'GitHub Sponsors', url: 'https://github.com/sponsors/HillaryKoros' },
  ],

  /*
   * Institutions the work has been delivered with or for, as distinct from
   * employers (those are derived from experience.ts). Every one of these is
   * backed by a project or a talk in the data.
   */
  collaborators: [
    'CIMA Research Foundation',
    'Development Seed',
    'African Union Commission',
    'IGAD member states',
    'KEMRI–Wellcome Trust',
  ],

  /** Professional statement. Prose, kept out of the components. */
  profile: [
    'I build and operate the systems that turn climate and Earth observation data into ' +
      'decisions that have to be made on a schedule — flood warnings, seasonal outlooks, ' +
      'anticipatory action.',
    'At ICPAC I lead engineering on the East Africa Flood Watch System, the regional flood ' +
      'early-warning platform serving the eleven IGAD member states. My initial mandate was the ' +
      'operational transfer of FloodPROOFS East Africa from CIMA Research Foundation, which the ' +
      'Flood Watch now builds on; the work has since extended across ICPAC\'s wider early-warning ' +
      'portfolio and into AMHEWAS reporting to the African Union Commission.',
    'The engineering underneath is cloud-native. With Development Seed I co-develop ' +
      'grib-index-kerchunk, which emits Zarr v3 reference layers over global NWP archives so ' +
      'ECMWF IFS and NOAA GEFS can be read lazily from object storage rather than downloaded ' +
      'in full. Before ICPAC I worked on malaria disease mapping across Sub-Saharan Africa and ' +
      'MENA at KEMRI–Wellcome Trust, machine learning for spatial analysis at Geospatial ' +
      'Research International, and land administration for the County Government of Bomet, ' +
      'whose registry now holds more than fifty thousand digitised parcels.',
  ],

  languages: [
    { code: 'EN',  name: 'English',   level: 'Professional working proficiency' },
    { code: 'SW',  name: 'Kiswahili', level: 'Native' },
    { code: 'KIP', name: 'Kipsigis',  level: 'Native' },
  ],
} as const;

/** Prebuilt action URLs, so no component has to assemble one. */
export const actions = {
  mailto: `mailto:${site.email}`,
  gmailCompose: `https://mail.google.com/mail/?view=cm&fs=1&to=${site.email}`,
  whatsapp: `https://wa.me/${site.phone.replace(/\D/g, '')}`,
  tel: `tel:${site.phone}`,
} as const;
