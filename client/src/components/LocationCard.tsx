import { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { site } from '../data/site';

const { tz, tzLabel, city, country, lat, lon, openTo, workingHours } = site.location;

/**
 * UTC offset of an IANA zone at a given instant, in hours.
 *
 * Derived from the zone rather than hardcoded, so this stays correct if Kenya
 * ever adopts DST and is correct today for visitors whose own zone does.
 */
function offsetHours(timeZone: string, at: Date): number {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone,
      hourCycle: 'h23',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
      .formatToParts(at)
      .map((p) => [p.type, p.value]),
  );
  const asUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
  );
  // Compare against the same instant truncated to the minute.
  const instant = Math.floor(at.getTime() / 60000) * 60000;
  return Math.round(((asUtc - instant) / 3600000) * 60) / 60;
}

function formatDelta(hours: number): string {
  if (Math.abs(hours) < 0.01) return 'the same time as you';
  const abs = Math.abs(hours);
  const whole = Math.floor(abs);
  const mins = Math.round((abs - whole) * 60);
  const amount = mins ? `${whole}h ${mins}m` : `${whole} hour${whole === 1 ? '' : 's'}`;
  return `${amount} ${hours > 0 ? 'ahead of' : 'behind'} you`;
}

const dms = (deg: number, pos: string, neg: string) => {
  const hemi = deg >= 0 ? pos : neg;
  return `${Math.abs(deg).toFixed(4)}° ${hemi}`;
};

export default function LocationCard() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    // Tick on the minute boundary rather than every second.
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  const time = new Intl.DateTimeFormat('en-GB', {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(now);

  const day = new Intl.DateTimeFormat('en-GB', { timeZone: tz, weekday: 'long' }).format(now);

  const localHour = Number(
    new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', hourCycle: 'h23' }).format(now),
  );
  const isWeekend = ['Saturday', 'Sunday'].includes(day);
  const reachable = !isWeekend && localHour >= workingHours[0] && localHour < workingHours[1];

  const delta = offsetHours(tz, now) - offsetHours(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    now,
  );

  return (
    <div className="rounded-lg border border-border bg-surface">
      <div className="flex flex-wrap items-start justify-between gap-6 p-7">
        <div>
          <div className="flex items-center gap-2.5">
            <MapPin className="h-4 w-4 text-primary" strokeWidth={1.75} aria-hidden />
            <p className="text-[1.15rem] font-semibold">
              {city}, {country}
            </p>
          </div>
          <p className="mt-2 font-mono text-[0.8rem] text-faint-foreground">
            {dms(lat, 'N', 'S')}, {dms(lon, 'E', 'W')}
          </p>
        </div>

        {/* Local clock — the thing someone on this page actually needs to know. */}
        <div className="text-right">
          <p className="font-mono text-[1.5rem] font-semibold leading-none tabular-nums">
            {time}
          </p>
          <p className="mt-2 font-mono text-[0.78rem] uppercase tracking-[0.1em] text-faint-foreground">
            {day} · {tzLabel}
          </p>
        </div>
      </div>

      <div className="border-t border-border px-7 py-4">
        <p className="flex items-center gap-2 text-sm">
          <span
            aria-hidden
            className={`h-1.5 w-1.5 rounded-full ${
              reachable ? 'bg-status-operational' : 'bg-faint-foreground'
            }`}
          />
          <span className={reachable ? 'text-status-operational' : 'text-muted-foreground'}>
            {reachable ? 'Within working hours right now' : 'Outside working hours right now'}
          </span>
          <span className="text-faint-foreground">·</span>
          <span className="text-muted-foreground">{formatDelta(delta)}</span>
        </p>
      </div>

      <div className="border-t border-border px-7 py-5">
        <p className="label">Open to</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {openTo.map((item) => (
            <li
              key={item}
              className="rounded-sm border border-border bg-surface-sunken px-2.5 py-1 font-mono text-[0.78rem] text-muted-foreground"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
