import React, { useEffect, useRef } from 'react';

interface ParticleNetworkProps {
  /** Approx particle count — auto-scales by area */
  density?: number;
  /** Max distance between two particles before a link line stops drawing */
  linkDistance?: number;
  /** Base node color — defaults to Meshack-style burnt amber */
  color?: string;
  /** Class for the wrapping container (positioning, etc.) */
  className?: string;
}

/**
 * Animated constellation backdrop — port of Meshack Kibet's Shipped Work
 * particle network (bravomesh/mPortfolio · main.js → initParticles).
 *
 * Behaviour:
 *  - Mouse hover REPELS particles with a parabolic falloff (not attract)
 *  - Cursor draws "grab" lines to nearby particles (extra polish)
 *  - Click pushes 5 fresh particles at the cursor (auto-trimmed at 150)
 *  - Pauses via IntersectionObserver when offscreen
 *  - Resizes on window resize and via ResizeObserver
 */
const ParticleNetwork: React.FC<ParticleNetworkProps> = ({
  density = 75,
  linkDistance = 150,
  color = 'rgb(220, 130, 15)',  // amber that pops on dark grey
  className = '',
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const rafRef     = useRef<number | null>(null);
  const visibleRef = useRef(true);
  const mouseRef   = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  useEffect(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Parse RGB from "rgb(r,g,b)" or "#rrggbb"
    const rgb: [number, number, number] = (() => {
      const rgbMatch = color.match(/rgb\((\d+)\D+(\d+)\D+(\d+)/);
      if (rgbMatch) return [Number(rgbMatch[1]), Number(rgbMatch[2]), Number(rgbMatch[3])];
      const hex = color.match(/^#([0-9a-f]{6})$/i);
      if (hex) {
        const n = parseInt(hex[1], 16);
        return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
      }
      return [220, 130, 15];
    })();

    // ── Tuned so the constellation is clearly visible but still backdrop, not content ──
    const C = {
      speed:        0.9,
      maxDist:      linkDistance,
      grabDist:     210,
      repulseDist:  200,
      repulseForce: 80,
      nodeMin:      1.6,
      nodeMax:      3.8,
      nodeAlpha:    0.60,    // dots are present without competing with type
      lineWidth:    0.95,
      lineAlpha:    0.34,    // links visible but soft
      grabAlpha:    0.70,    // hover lines pop on cursor interaction
      clickPush:    5,
    };

    type P = { x: number; y: number; vx: number; vy: number; vx0: number; vy0: number; r: number };
    let W = 0, H = 0;
    let dpr = window.devicePixelRatio || 1;
    let particles: P[] = [];

    const mkParticle = (px?: number, py?: number): P => {
      // Small baseline drift velocity — keeps the constellation slowly breathing
      // even when the cursor is idle. Cursor pushes layer on top of this.
      const baseSpeed = 0.18;
      const vx0 = (Math.random() - 0.5) * baseSpeed * 2;
      const vy0 = (Math.random() - 0.5) * baseSpeed * 2;
      return {
        x: px ?? Math.random() * W,
        y: py ?? Math.random() * H,
        vx: vx0,
        vy: vy0,
        vx0,
        vy0,
        r: C.nodeMin + Math.random() * (C.nodeMax - C.nodeMin),
      };
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      W = Math.max(1, rect.width);
      H = Math.max(1, rect.height);
      dpr = window.devicePixelRatio || 1;
      canvas.width  = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width  = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const scaled = Math.round(density * (W * H) / (1280 * 720));
      const count = Math.min(Math.max(scaled, 40), 130);
      particles = Array.from({ length: count }, () => mkParticle());
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const io = new IntersectionObserver(
      (entries) => { visibleRef.current = entries[0]?.isIntersecting ?? true; },
      { threshold: 0 }
    );
    io.observe(wrap);

    // Track mouse on the wrapper so events fire even when the cursor is over cards on top
    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };
    const onClick = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      for (let i = 0; i < C.clickPush; i++) particles.push(mkParticle(x, y));
      if (particles.length > 150) particles.splice(0, C.clickPush);
    };

    // Wrap is pointer-events: none for content, but we still want to listen — attach on window with hit-test
    const onWindowMove = (e: MouseEvent) => onMove(e);
    window.addEventListener('mousemove', onWindowMove);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('click', onClick);

    const draw = () => {
      if (!visibleRef.current) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const [r, g, b] = rgb;

      // Cursor push layers on top of each particle's baseline drift velocity (vx0, vy0).
      // Friction decays the cursor impulse back toward baseline — particles never freeze.
      const FRICTION = 0.94;
      for (const p of particles) {
        if (mx !== null && my !== null) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const d  = Math.hypot(dx, dy) || 1;
          if (d < C.repulseDist) {
            const ratio = 1 - d / C.repulseDist;
            const force = ratio * ratio * C.repulseForce;
            const clipped = Math.min(force, 50);
            // Push as instant displacement (so the burst is felt) plus add to velocity
            p.x += (dx / d) * clipped * 0.4;
            p.y += (dy / d) * clipped * 0.4;
            p.vx += (dx / d) * clipped * 0.06;
            p.vy += (dy / d) * clipped * 0.06;
          }
        }
        // Decay velocity toward the baseline drift (vx0, vy0), not toward zero —
        // so the cursor's push fades but the slow ambient motion always remains.
        p.vx = (p.vx - p.vx0) * FRICTION + p.vx0;
        p.vy = (p.vy - p.vy0) * FRICTION + p.vy0;
        p.x += p.vx;
        p.y += p.vy;
        // Wrap edges
        if (p.x < -p.r)     p.x = W + p.r;
        else if (p.x > W + p.r) p.x = -p.r;
        if (p.y < -p.r)     p.y = H + p.r;
        else if (p.y > H + p.r) p.y = -p.r;
      }

      // Particle-to-particle edges
      ctx.lineWidth = C.lineWidth;
      const md2 = C.maxDist * C.maxDist;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const c = particles[j];
          const dx = a.x - c.x;
          const dy = a.y - c.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < md2) {
            const d = Math.sqrt(d2);
            const alpha = C.lineAlpha * (1 - d / C.maxDist);
            ctx.strokeStyle = `rgba(${r},${g},${b},${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(c.x, c.y);
            ctx.stroke();
          }
        }
      }

      // Grab lines: cursor → nearby particles (extra polish)
      if (mx !== null && my !== null) {
        ctx.lineWidth = 0.9;
        for (const p of particles) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const d = Math.hypot(dx, dy);
          if (d < C.grabDist) {
            const alpha = C.grabAlpha * (1 - d / C.grabDist);
            ctx.strokeStyle = `rgba(${r},${g},${b},${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mx, my);
            ctx.stroke();
          }
        }
      }

      // Nodes — solid amber dots
      ctx.fillStyle = `rgba(${r},${g},${b},${C.nodeAlpha})`;
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('mousemove', onWindowMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('click', onClick);
    };
  }, [density, linkDistance, color]);

  return (
    <div ref={wrapperRef} className={className} aria-hidden>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default ParticleNetwork;
