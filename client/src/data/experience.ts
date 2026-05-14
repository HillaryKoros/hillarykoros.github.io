export interface ExperienceRole {
  id: string;
  title: string;
  organization: string;
  location?: string;
  start: string;
  end: string;
  current?: boolean;
  summary: string;
  bullets: string[];
}

// Newest first.
export const experience: ExperienceRole[] = [
  {
    id: "icpac",
    title: "GIS Researcher & Engineer (Consultant)",
    organization: "IGAD Climate Prediction and Applications Centre (ICPAC)",
    location: "Nairobi, Kenya",
    start: "2025",
    end: "Present",
    current: true,
    summary: "Initial work supported the operational transfer of FloodPROOFS East Africa from CIMA into ICPAC; now lead engineering on the East Africa Flood Watch System and contribute across ICPAC's wider early-warning portfolio.",
    bullets: [
      "Initial ICPAC mandate: supported the operational transfer of CIMA's FloodPROOFS East Africa flood forecasting system into ICPAC — building automated data processing workflows and ensuring operational continuity and reproducibility.",
      "Lead development of the East Africa Flood Watch System — regional early-warning platform integrating hydrological models, satellite Earth observation, and geospatial analytics for the 11 IGAD member states.",
      "Contribute to the broader early-warning portfolio (East Africa Hazards Watch, Drought Watch, Agriculture Watch, Flood Watcher) and to AMHEWAS reporting to the African Union Commission.",
      "Built cloud-native infrastructure for real-time access to global NWP archives (ECMWF IFS, NOAA GEFS) — no full-file downloads, no re-encoding.",
      "Integrated multiple regional flood forecasting systems into a unified operational workflow for anticipatory action.",
      "Developed geospatial dashboards and decision-support tools for climate-services stakeholders across the Greater Horn of Africa."
    ]
  },
  {
    id: "kemri",
    title: "Assistant Research Officer, GIS",
    organization: "KEMRI–Wellcome Trust Research Programme (KWTRP)",
    location: "Nairobi, Kenya",
    start: "July 2023",
    end: "June 2024",
    summary: "Spatial epidemiology and dataset harmonisation for malaria mapping across Sub-Saharan Africa and MENA.",
    bullets: [
      "Assembled and harmonised parasite and vector survey datasets across SSA and MENA, integrating satellite-derived environmental covariates with household survey data (DHS, UNICEF, IPUMS).",
      "Managed large geospatial datasets for public health research and ran spatial analyses across national and sub-national boundaries.",
      "Contributed to scientific communication via conference presentations, seminars, and journal clubs within KEMRI–Wellcome."
    ]
  },
  {
    id: "gri",
    title: "Spatial Data Scientist — Machine Learning & AI",
    organization: "Geospatial Research International",
    location: "Nairobi, Kenya",
    start: "April 2023",
    end: "June 2023",
    summary: "Built and deployed ML models for spatial analysis on geospatial and remote-sensing datasets.",
    bullets: [
      "Developed classification, clustering, and predictive ML models over geospatial and remote-sensing inputs.",
      "Collaborated with GIS specialists and domain experts to integrate spatial analytics into environmental intelligence workflows."
    ]
  },
  {
    id: "bomet",
    title: "GIS Lab Technician",
    organization: "County Government of Bomet",
    location: "Bomet, Kenya",
    start: "May 2018",
    end: "April 2023",
    summary: "Produced geospatial data products and supported county-level planning, infrastructure, and environmental monitoring.",
    bullets: [
      "Produced geospatial data products, thematic maps, and spatial analyses supporting county planning and environmental management.",
      "Managed GIS databases and spatial data infrastructure across planning, infrastructure, and environmental applications.",
      "Foundation of the Bomet Land Information System case study."
    ]
  },
  {
    id: "esri",
    title: "Technical Attaché",
    organization: "Esri Eastern Africa",
    location: "Nairobi, Kenya",
    start: "July 2017",
    end: "October 2017",
    summary: "GIS solution development and spatial data management using Esri technologies.",
    bullets: [
      "Assisted in GIS solution development, spatial data management, and geospatial system support using Esri technologies."
    ]
  }
];
