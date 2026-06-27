/**
 * Skills Constellation — D3 force-directed graph of Hillary's tech stack.
 * Adapted from Meshack Kibet's skills-d3 (bravomesh/mPortfolio), kept lean.
 *
 * Each category becomes a "hub" placed in a hexagon ring; each tech orbits
 * its hub. Drag any node, click a hub to isolate its domain.
 */

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { techCategories } from '../data/technologies';

const CAT_PALETTE: Record<string, { color: string; short: string }> = {
  'GIS & Earth Observation': { color: '#22d3ee', short: 'GIS' },
  'Cloud-Native Data':       { color: '#a78bfa', short: 'Cloud Data' },
  'Languages':               { color: '#f59e0b', short: 'Languages' },
  'ML & Data':               { color: '#f472b6', short: 'ML' },
  'Databases':               { color: '#34d399', short: 'DBs' },
  'DevOps & Infrastructure': { color: '#f87171', short: 'DevOps' },
};

type SkillNode = d3.SimulationNodeDatum & {
  id: string;
  group: 'hub' | 'skill';
  cat?: string;
  color: string;
  short?: string;
  r: number;
};
type SkillLink = d3.SimulationLinkDatum<SkillNode>;

const HUB_R = 26;
const SKILL_R = 9;
const HEIGHT = 500;

const SkillsConstellation: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef  = useRef<SVGSVGElement>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 900);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (mobile) return;
    const wrap = wrapRef.current;
    const svgEl = svgRef.current;
    if (!wrap || !svgEl) return;

    const W = wrap.clientWidth;
    const H = HEIGHT;

    /* ── Build nodes + links from Hillary's data ── */
    // Sort categories by item count, then alternate heavy/light around the hexagon
    // so the visual weight stays even instead of clustering.
    const byCount = [...techCategories].sort((a, b) => b.items.length - a.items.length);
    const order: typeof techCategories = [];
    let h = 0, t = byCount.length - 1;
    while (h <= t) {
      if (h === t) order.push(byCount[h]);
      else { order.push(byCount[h]); order.push(byCount[t]); }
      h++; t--;
    }
    // order now interleaves [heaviest, lightest, 2nd-heaviest, 2nd-lightest, …]

    const hubs: SkillNode[] = order.map(c => ({
      id: c.name,
      group: 'hub',
      color: CAT_PALETTE[c.name]?.color ?? '#f59e0b',
      short: CAT_PALETTE[c.name]?.short ?? c.name,
      r: HUB_R,
    }));

    const skills: SkillNode[] = order.flatMap(c =>
      c.items.map(item => ({
        id: item.name,
        group: 'skill' as const,
        cat: c.name,
        color: CAT_PALETTE[c.name]?.color ?? '#f59e0b',
        r: SKILL_R,
      }))
    );

    const nodes: SkillNode[] = [...hubs, ...skills];
    const links: SkillLink[] = skills.map(s => ({ source: s.id, target: s.cat as string }));

    /* ── Hexagon pre-positioning, with denser hubs pushed slightly further out ── */
    const cx = W / 2;
    const cy = H / 2;
    const baseSpread = Math.min(W, H) * 0.32;
    hubs.forEach((h, i) => {
      const angle = (i / hubs.length) * Math.PI * 2 - Math.PI / 2;
      // give heavier categories a little more elbow room
      const count = order[i].items.length;
      const factor = 0.92 + Math.min(0.16, count * 0.02);
      h.x = cx + Math.cos(angle) * baseSpread * factor;
      h.y = cy + Math.sin(angle) * baseSpread * factor;
    });
    skills.forEach(s => {
      const hub = hubs.find(h => h.id === s.cat);
      if (hub) {
        // spread initial positions wider so the simulation starts balanced
        s.x = (hub.x ?? cx) + (Math.random() - 0.5) * 110;
        s.y = (hub.y ?? cy) + (Math.random() - 0.5) * 110;
      }
    });

    /* ── SVG scaffolding ── */
    const svg = d3.select(svgEl);
    svg.selectAll('*').remove();
    svg.attr('viewBox', `0 0 ${W} ${H}`).attr('width', W).attr('height', H);

    const defs = svg.append('defs');

    /* glow filters + hub radials per category */
    const palette = Object.entries(CAT_PALETTE);
    palette.forEach(([, { color }], i) => {
      const f = defs.append('filter')
        .attr('id', `skg${i}`)
        .attr('x', '-70%').attr('y', '-70%')
        .attr('width', '240%').attr('height', '240%');
      f.append('feGaussianBlur').attr('stdDeviation', 6).attr('result', 'b');
      const m = f.append('feMerge');
      m.append('feMergeNode').attr('in', 'b');
      m.append('feMergeNode').attr('in', 'SourceGraphic');

      const rg = defs.append('radialGradient')
        .attr('id', `skr${i}`).attr('cx', '40%').attr('cy', '35%').attr('r', '65%');
      // Bumped so hubs read solidly on a light-card stage (was 0.32 / 0.04)
      rg.append('stop').attr('offset', '0%')  .attr('stop-color', color).attr('stop-opacity', 0.55);
      rg.append('stop').attr('offset', '100%').attr('stop-color', color).attr('stop-opacity', 0.15);
    });
    const glowFilter = (color: string) => {
      const i = palette.findIndex(([, p]) => p.color === color);
      return i >= 0 ? `url(#skg${i})` : undefined;
    };
    const hubFill = (catName: string) => {
      const i = palette.findIndex(([n]) => n === catName);
      return i >= 0 ? `url(#skr${i})` : '#ffffff';
    };

    /* ambient blob radials in the background — one per category */
    const blobPos: Array<[number, number]> = [
      [0.14, 0.28], [0.82, 0.18], [0.55, 0.85],
      [0.30, 0.72], [0.78, 0.58], [0.50, 0.18],
    ];
    palette.forEach(([, { color }], i) => {
      const [bx, by] = blobPos[i % blobPos.length];
      const id = `amb${i}`;
      const rg = defs.append('radialGradient').attr('id', id)
        .attr('cx', `${bx * 100}%`).attr('cy', `${by * 100}%`)
        .attr('r', '28%').attr('gradientUnits', 'objectBoundingBox');
      rg.append('stop').attr('offset', '0%').attr('stop-color', color).attr('stop-opacity', 0.10);
      rg.append('stop').attr('offset', '100%').attr('stop-color', color).attr('stop-opacity', 0);
      svg.append('rect').attr('width', W).attr('height', H).attr('rx', 14)
        .attr('fill', `url(#${id})`).attr('pointer-events', 'none');
    });

    /* ── Links ── */
    const linkSel = svg.append('g')
      .attr('stroke', 'currentColor')
      .attr('stroke-opacity', 0.32)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', 1.0);

    /* ── Nodes ── */
    const nodeSel = svg.append('g')
      .selectAll<SVGGElement, SkillNode>('g')
      .data(nodes)
      .join('g')
      .style('cursor', d => (d.group === 'hub' ? 'pointer' : 'grab'));

    // Hub: large radial-gradient circle with pulsing aura ring
    const hubGroups = nodeSel.filter(d => d.group === 'hub');
    hubGroups.append('circle')
      .attr('class', 'hub-aura')
      .attr('r', d => d.r + 14)
      .attr('fill', 'none')
      .attr('stroke', d => d.color)
      .attr('stroke-width', 1.4)
      .attr('stroke-opacity', 0.22);
    hubGroups.append('circle')
      .attr('class', 'hub-body')
      .attr('r', d => d.r)
      .attr('fill', d => hubFill(d.id))
      .attr('stroke', d => d.color)
      .attr('stroke-width', 1.6)
      .attr('stroke-opacity', 0.85)
      .attr('filter', d => glowFilter(d.color) ?? null);
    hubGroups.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .attr('font-size', 11)
      .attr('font-weight', 700)
      .attr('font-family', "'JetBrains Mono', monospace")
      .attr('fill', d => d.color)
      .attr('letter-spacing', '0.04em')
      .text(d => CAT_PALETTE[d.id]?.short ?? d.id);

    // Skill: small dot + label
    const skillGroups = nodeSel.filter(d => d.group === 'skill');
    skillGroups.append('circle')
      .attr('class', 'skill-body')
      .attr('r', d => d.r)
      .attr('fill', d => d.color)
      .attr('fill-opacity', 0.32)
      .attr('stroke', d => d.color)
      .attr('stroke-width', 1.5)
      .attr('stroke-opacity', 0.85);
    skillGroups.append('text')
      .attr('class', 'skill-label')
      .attr('text-anchor', 'middle')
      .attr('dy', d => d.r + 12)
      .attr('font-size', 9.5)
      .attr('font-family', "'JetBrains Mono', monospace")
      .attr('fill', 'currentColor')
      .attr('fill-opacity', 0.85)
      .text(d => d.id);

    /* ── Force simulation ── */
    const sim = d3.forceSimulation(nodes)
      // link distance scales with hub size so dense categories spread further
      .force(
        'link',
        d3.forceLink<SkillNode, SkillLink>(links)
          .id(d => d.id)
          .distance(l => {
            const tgt = l.target as SkillNode;
            const cat = order.find(c => c.name === tgt.id);
            return 95 + Math.min(35, (cat?.items.length ?? 5) * 4);
          })
          .strength(0.5)
      )
      .force('charge', d3.forceManyBody().strength(d => ((d as SkillNode).group === 'hub' ? -560 : -110)))
      .force('center', d3.forceCenter(cx, cy).strength(0.03))
      .force('collide', d3.forceCollide<SkillNode>().radius(d => d.r + 14).strength(0.9))
      .alphaDecay(0.012)
      .velocityDecay(0.45);

    /* Soft drift so things never feel static */
    let driftT = 0;
    sim.force('drift', () => {
      driftT += 0.005;
      nodes.forEach((n, i) => {
        if (n.fx != null) return;
        n.vx = (n.vx ?? 0) + Math.sin(driftT + i * 1.3) * 0.014;
        n.vy = (n.vy ?? 0) + Math.cos(driftT + i * 0.9) * 0.014;
      });
    });

    /* Walls so nodes never escape the box — extra room for skill labels below the dot */
    sim.force('walls', () => {
      const marginX = 75;     // label widths
      const marginTop = 55;
      const marginBot = 70;   // label sits below the dot
      nodes.forEach(n => {
        if ((n.x ?? 0) < marginX)      n.vx = (n.vx ?? 0) + (marginX - (n.x ?? 0)) * 0.022;
        if ((n.x ?? 0) > W - marginX)  n.vx = (n.vx ?? 0) - ((n.x ?? 0) - (W - marginX)) * 0.022;
        if ((n.y ?? 0) < marginTop)    n.vy = (n.vy ?? 0) + (marginTop - (n.y ?? 0)) * 0.022;
        if ((n.y ?? 0) > H - marginBot) n.vy = (n.vy ?? 0) - ((n.y ?? 0) - (H - marginBot)) * 0.022;
      });
    });

    /* Mouse-gravity — nodes gently follow the cursor when hovering the svg.
     * Listen on the wrap div (not the svg root) and convert coords via getBoundingClientRect
     * so the handler fires even when the cursor is over text labels / link clips.
     */
    const cursor = { x: null as number | null, y: null as number | null };
    sim.force('cursor', () => {
      if (cursor.x === null || cursor.y === null) return;
      const RADIUS = 260;
      const STRENGTH = 0.085;
      nodes.forEach(n => {
        if (n.fx != null) return;
        const dx = (cursor.x as number) - (n.x ?? 0);
        const dy = (cursor.y as number) - (n.y ?? 0);
        const d  = Math.hypot(dx, dy);
        if (d < RADIUS && d > 1) {
          const k = STRENGTH * (1 - d / RADIUS);
          n.vx = (n.vx ?? 0) + (dx / d) * k;
          n.vy = (n.vy ?? 0) + (dy / d) * k;
        }
      });
    });

    const onMove = (e: MouseEvent) => {
      const rect = svgEl.getBoundingClientRect();
      // Scale screen pixels → svg viewBox coords (W, H) since svg can be smaller than its viewBox
      const sx = W / rect.width;
      const sy = H / rect.height;
      cursor.x = (e.clientX - rect.left) * sx;
      cursor.y = (e.clientY - rect.top)  * sy;
      sim.alphaTarget(0.18).restart();
    };
    const onLeave = () => {
      cursor.x = null;
      cursor.y = null;
      sim.alphaTarget(0);
    };
    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('mouseleave', onLeave);
    const cleanupCursor = () => {
      wrap.removeEventListener('mousemove', onMove);
      wrap.removeEventListener('mouseleave', onLeave);
    };

    sim.on('tick', () => {
      linkSel
        .attr('x1', d => (d.source as SkillNode).x ?? 0)
        .attr('y1', d => (d.source as SkillNode).y ?? 0)
        .attr('x2', d => (d.target as SkillNode).x ?? 0)
        .attr('y2', d => (d.target as SkillNode).y ?? 0);
      nodeSel.attr('transform', d => `translate(${d.x ?? 0}, ${d.y ?? 0})`);
    });

    /* Drag */
    const drag = d3.drag<SVGGElement, SkillNode>()
      .on('start', (event, d) => {
        if (!event.active) sim.alphaTarget(0.3).restart();
        d.fx = d.x; d.fy = d.y;
      })
      .on('drag', (event, d) => {
        d.fx = event.x; d.fy = event.y;
      })
      .on('end', (event, d) => {
        if (!event.active) sim.alphaTarget(0);
        d.fx = null; d.fy = null;
      });
    nodeSel.call(drag);

    /* Click a hub to focus its domain */
    hubGroups.on('click', (_, d) => {
      setFocused(prev => (prev === d.id ? null : d.id));
    });

    return () => {
      sim.stop();
      cleanupCursor();
    };
  }, [mobile]);

  /* Apply focus styling when state changes (separate effect so we don't rebuild) */
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll<SVGGElement, SkillNode>('g > g')
      .transition().duration(300)
      .style('opacity', d => {
        if (!focused) return 1;
        if (d.group === 'hub') return d.id === focused ? 1 : 0.25;
        return d.cat === focused ? 1 : 0.08;
      });
    svg.selectAll<SVGLineElement, SkillLink>('line')
      .transition().duration(300)
      .attr('stroke-opacity', l => {
        if (!focused) return 0.32;
        const t = typeof l.target === 'object' ? (l.target as SkillNode).id : l.target as string;
        const s = typeof l.source === 'object' ? (l.source as SkillNode).id : l.source as string;
        return t === focused || s === focused ? 0.70 : 0.03;
      });
  }, [focused]);

  // Mobile fallback: tell parent to show the TechGrid instead
  if (mobile) return null;

  return (
    <div className="relative">
      <div
        ref={wrapRef}
        className="relative w-full rounded-2xl border border-border/80 overflow-hidden shadow-md
                   bg-card/80 supports-[backdrop-filter]:bg-card/65 backdrop-blur-md backdrop-saturate-150"
        style={{ height: HEIGHT }}
      >
        <svg ref={svgRef} className="block w-full text-foreground/90" />

        <div className="absolute bottom-3 right-4 text-[11px] font-mono text-muted-foreground/80 pointer-events-none">
          drag · click hub to focus
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {Object.entries(CAT_PALETTE).map(([name, { color }]) => {
          const isActive = focused === name;
          return (
            <button
              key={name}
              onClick={() => setFocused(prev => (prev === name ? null : name))}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10.5px] font-mono font-semibold uppercase tracking-[0.1em] transition-colors ${
                isActive
                  ? 'border-amber-500/50 bg-amber-500/10 text-foreground'
                  : 'border-border/40 bg-secondary/40 text-muted-foreground hover:text-foreground hover:border-border/80'
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: color }} />
              {name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsConstellation;
