import { techCategories } from '../data/technologies';
import { icon } from '../lib/icons';
import Reveal from './Reveal';
import { Tag } from './primitives';

const CATEGORY_ICON: Record<string, string> = {
  'GIS & Earth Observation': 'globe',
  'Cloud-Native Data': 'cloud',
  Languages: 'workflow',
  'ML & Data': 'brain',
  Databases: 'database',
  'DevOps & Infrastructure': 'settings',
};

/**
 * A plain, readable grid. The previous build rendered this as a force-directed
 * constellation whose labels overlapped at any realistic viewport width — a
 * stack list has to be scannable before it is interesting.
 */
export default function StackGrid() {
  return (
    <ul className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
      {techCategories.map((category, i) => {
        const Icon = icon(CATEGORY_ICON[category.name]);
        return (
          <Reveal as="li" key={category.name} index={i}>
            <div className="flex items-center gap-2.5">
              <Icon className="h-4 w-4 text-primary" strokeWidth={1.75} aria-hidden />
              <h3 className="label !text-muted-foreground">{category.name}</h3>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {category.items.map((tech) => (
                <Tag key={tech.name}>{tech.name}</Tag>
              ))}
            </div>
          </Reveal>
        );
      })}
    </ul>
  );
}
