import {
  Activity, BookOpen, BrainCircuit, Cloud, Database, Globe2, HeartPulse, LineChart,
  Map, Repeat, Satellite, Settings2, Waves, Workflow, type LucideIcon,
} from 'lucide-react';

/**
 * Data files refer to icons by string key so they stay free of component
 * imports. This is the one place a key becomes a component.
 */
export const icons: Record<string, LucideIcon> = {
  activity: Activity,
  book: BookOpen,
  brain: BrainCircuit,
  chart: LineChart,
  cloud: Cloud,
  database: Database,
  globe: Globe2,
  health: HeartPulse,
  map: Map,
  satellite: Satellite,
  settings: Settings2,
  swap: Repeat,
  waves: Waves,
  workflow: Workflow,
};

export function icon(key: string | undefined): LucideIcon {
  return (key && icons[key]) || Workflow;
}
