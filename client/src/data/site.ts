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

  org: {
    name: 'ICPAC',
    longName: 'IGAD Climate Prediction and Applications Centre',
    url: 'https://www.icpac.net/',
  },
  location: {
    city: 'Nairobi',
    country: 'Kenya',
    countryCode: 'KE',
    timezone: 'EAT (UTC+3)',
  },
  url: 'https://hillarykoros.github.io',
  tagline: 'Engineering geospatial systems that turn climate data into decisions.',
  summary:
    'I work at the intersection of Earth observation, hydroinformatics, machine learning and ' +
    'cloud-native architecture — building operational platforms for governments and partners ' +
    'across the 11 countries of the Greater Horn of Africa.',
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
