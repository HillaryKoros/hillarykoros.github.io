export interface Talk {
  id: string;
  title: string;
  venue: string;
  location?: string;
  date: string;
  type: 'talk' | 'poster' | 'invited' | 'publication';
  role: 'presenting' | 'coauthor';
  session?: string;
  abstractUrl?: string;
  slidesUrl?: string;
  recordingUrl?: string;
  authors: string[];
  summary: string;
  featured?: boolean;
}

// Newest first. Presenting-author entries are pinned above co-authored ones via `featured`.
// TODO(hillary): confirm the EMS 2026 entry's exact title and presentation format when the
// programme is public — the abstract page is currently behind login.
export const talks: Talk[] = [
  {
    id: "egu-2026-virtualizarr-grib",
    title: "VirtualiZarr Custom Parsers for Cloud-Native GRIB Access",
    venue: "EGU General Assembly 2026",
    location: "Vienna, Austria",
    date: "4 May 2026",
    type: "talk",
    role: "presenting",
    session: "ESSI2.3 — Earth and Space Science Informatics",
    abstractUrl: "https://meetingorganizer.copernicus.org/EGU26/EGU26-18064.html",
    authors: [
      "Hillary Koros",
      "Nishadh Kalladath",
      "Max Jones",
      "Sean Harkins",
      "Jason Kinyua",
      "Mark Lelaono",
      "Ezra Limo",
      "Masilin Gudoshava",
      "Ahmed Amdihun"
    ],
    summary: "Presented a VirtualiZarr-based approach for cloud-native access to operational ensemble NWP archives stored as GRIB. Custom parsers reuse existing GRIB index files to emit Zarr v3 reference layers, so consumers can stream specific members, variables, and timesteps directly from object storage via xarray and Dask — no re-encoding of petabyte-scale archives required.",
    featured: true
  },
  {
    id: "egu-2026-crma-bayesian",
    title: "Continuous Risk Monitoring and Assessment (CRMA) for Operational Impact-Based Forecasting: A Bayesian Network Method for Flood and Drought Hazards in East Africa",
    venue: "EGU General Assembly 2026",
    location: "Vienna, Austria",
    date: "April–May 2026",
    type: "talk",
    role: "coauthor",
    session: "HS4.5",
    abstractUrl: "https://meetingorganizer.copernicus.org/EGU26/EGU26-18323.html",
    authors: [
      "Nishadh Kalladath",
      "Robert Tucci",
      "Hillary Koros",
      "Owiti Zablone",
      "Afroza Mahzabeen",
      "Masilin Gudoshava",
      "Ahmed Amdihun"
    ],
    summary: "Co-authored work on a Bayesian-network approach to continuous hydrometeorological risk assessment across East Africa, combining observations, forecasts, and expert knowledge into probabilistic flood and drought risk categories at sub-national administrative units to support operational impact-based forecasting."
  },
  {
    id: "egu-2026-aifs-east-africa",
    title: "Cost-Effective ECMWF AIFS Ensemble Inference for Subseasonal Forecasting in East Africa",
    venue: "EGU General Assembly 2026",
    location: "Vienna, Austria",
    date: "April–May 2026",
    type: "talk",
    role: "coauthor",
    session: "VPS2",
    abstractUrl: "https://meetingorganizer.copernicus.org/EGU26/EGU26-20505.html",
    authors: [
      "Eunice Koech",
      "Nishadh Kalladath",
      "Anthony Mwanthi",
      "Alex Ogelo",
      "Jason Kinyua",
      "Hillary Koros",
      "Mark Lelaono",
      "Herbert Misiani",
      "Tamirat Bekele",
      "Hussen Seid",
      "Masilin Gudoshava",
      "Ahmed Amdihun"
    ],
    summary: "Co-authored work on running ECMWF's AI Forecasting System (AIFS) ensemble inference cost-effectively on commodity infrastructure for subseasonal (2–4 week) forecasting over East Africa, with skill above climatology demonstrated for temperature at extended lead times."
  },
  {
    id: "ems-2026-820",
    title: "EMS Annual Meeting 2026 — co-authored contribution (title to be confirmed)",
    venue: "EMS Annual Meeting 2026",
    date: "2026",
    type: "talk",
    role: "coauthor",
    abstractUrl: "https://meetingorganizer.copernicus.org/EMS2026/EMS2026-820.html",
    authors: ["IGAD-ICPAC team"],
    summary: "Co-authored contribution to the EMS Annual Meeting 2026 programme — full metadata will be published when the session schedule goes public."
  },
  {
    id: "amhewas-au",
    title: "AMHEWAS Progress Report — presented to the African Union Commission",
    venue: "African Union Commission · on behalf of ICPAC",
    date: "2025",
    type: "invited",
    role: "coauthor",
    authors: ["ICPAC Disaster Risk Management Programme"],
    summary: "Co-authored progress reporting on ICPAC's Greater Horn of Africa early-warning portfolio under the AMHEWAS framework, delivered to the African Union Commission."
  }
];
