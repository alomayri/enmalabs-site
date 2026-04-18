"use client";
import type { SVGProps } from "react";

type SigilProps = {
  className?: string;
  size?: number;
  title?: string;
} & Omit<SVGProps<SVGSVGElement>, "className" | "children">;

function sigilBase(size: number, title: string | undefined, rest: Omit<SVGProps<SVGSVGElement>, "className" | "children">) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": title ? undefined : (true as true),
    role: title ? ("img" as const) : undefined,
    ...rest,
  };
}

// 1. Ouroboros — serpent circle biting its own tail
export function Ouroboros({ className, size = 48, title, ...rest }: SigilProps) {
  // Circle r=18, with a small gap at the bottom where the mouth meets the tail.
  // Large arc from ~200° to ~340° (the body), tail tip at bottom-left, head at bottom-right.
  // We approximate the gap: start at ~bottom-right (head), end at ~bottom-left (tail tip).
  const cx = 24;
  const cy = 24;
  const r = 18;
  const gapAngle = 20; // degrees on each side of the bottom

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  // Head is at bottom-right edge of gap; tail at bottom-left edge
  const headAngle = 90 + gapAngle; // measured from top (SVG y-down)
  const tailAngle = 90 - gapAngle;

  const headX = cx + r * Math.cos(toRad(headAngle));
  const headY = cy + r * Math.sin(toRad(headAngle));
  const tailX = cx + r * Math.cos(toRad(tailAngle));
  const tailY = cy + r * Math.sin(toRad(tailAngle));

  // Large arc from head around (going left/counter-clockwise) to tail
  const bodyPath = `M ${headX} ${headY} A ${r} ${r} 0 1 0 ${tailX} ${tailY}`;

  // Tail: a short tapered line extending inward from tailX,tailY
  const tailTipX = tailX - 3;
  const tailTipY = tailY + 1.5;

  // Head triangle (small wedge) near headX,headY pointing slightly inward
  const headTipX = headX + 1.8;
  const headTipY = headY - 1;
  const headTopX = headX - 1;
  const headTopY = headY - 3.5;
  const headBotX = headX + 2.5;
  const headBotY = headY + 1.5;

  return (
    <svg {...sigilBase(size, title, rest)} className={className}>
      {title && <title>{title}</title>}
      {/* Serpent body */}
      <path d={bodyPath} />
      {/* Tail taper */}
      <path d={`M ${tailX} ${tailY} L ${tailTipX} ${tailTipY}`} strokeWidth={0.8} />
      {/* Head wedge — triangle approximating open mouth biting tail */}
      <polygon
        points={`${headTipX},${headTipY} ${headTopX},${headTopY} ${headBotX},${headBotY}`}
        fill="currentColor"
        stroke="none"
      />
      {/* Eye dot on the head side */}
      <circle
        cx={cx + r * Math.cos(toRad(headAngle - 6))}
        cy={cy + r * Math.sin(toRad(headAngle - 6))}
        r={0.9}
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

// 2. Alembic — distillation vessel: round-bottom flask, neck, curved spout, droplets
export function Alembic({ className, size = 48, title, ...rest }: SigilProps) {
  return (
    <svg {...sigilBase(size, title, rest)} className={className}>
      {title && <title>{title}</title>}
      {/* Round bottom flask (sphere) */}
      <circle cx="20" cy="36" r="8" />
      {/* Neck rising from sphere */}
      <line x1="20" y1="28" x2="20" y2="18" />
      {/* Shoulder / cap of the alembic head */}
      <path d="M 15 18 Q 20 13 25 18" />
      {/* Spout curving right then downward */}
      <path d="M 25 18 Q 34 16 34 24 Q 34 30 30 33" />
      {/* Drip from spout tip */}
      <path d="M 30 33 Q 30 36 28.5 37.5" strokeWidth={0.8} />
      {/* Small drop */}
      <ellipse cx="28.5" cy="39" rx="1.2" ry="1.6" fill="currentColor" stroke="none" />
      {/* Second drop, smaller */}
      <ellipse cx="26.5" cy="41.5" rx="0.8" ry="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

// 3. Cucurbit — egg-shaped transformation flask with flat bottom and narrow neck
export function Cucurbit({ className, size = 48, title, ...rest }: SigilProps) {
  return (
    <svg {...sigilBase(size, title, rest)} className={className}>
      {title && <title>{title}</title>}
      {/* Egg-shaped body: wide ellipse, flat at the bottom */}
      {/* Flat bottom line */}
      <line x1="15" y1="38" x2="33" y2="38" />
      {/* Left curve of body */}
      <path d="M 15 38 Q 11 30 14 20 Q 17 12 24 11 Q 31 12 34 20 Q 37 30 33 38" />
      {/* Neck */}
      <line x1="21" y1="11" x2="21" y2="6" />
      <line x1="27" y1="11" x2="27" y2="6" />
      {/* Neck top cap */}
      <line x1="20" y1="6" x2="28" y2="6" />
      {/* Inner cross-hatch lines (subtle) */}
      <line x1="17" y1="22" x2="31" y2="22" strokeWidth={0.6} strokeDasharray="1 2" />
      <line x1="15.5" y1="28" x2="32.5" y2="28" strokeWidth={0.6} strokeDasharray="1 2" />
      <line x1="16" y1="34" x2="32" y2="34" strokeWidth={0.6} strokeDasharray="1 2" />
    </svg>
  );
}

// 4. Sol — circle with a dot at center (sun symbol)
export function Sol({ className, size = 48, title, ...rest }: SigilProps) {
  return (
    <svg {...sigilBase(size, title, rest)} className={className}>
      {title && <title>{title}</title>}
      <circle cx="24" cy="24" r="14" />
      <circle cx="24" cy="24" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

// 5. Luna — crescent moon using two arcs
export function Luna({ className, size = 48, title, ...rest }: SigilProps) {
  // Outer arc: full circle r=14 at 24,24
  // Inner arc (cut): circle r=13 offset +6 to the right at 30,24
  // We draw as a clipping path approach using a single SVG path with two arcs.
  // Crescent: outer circle minus inner circle offset.
  // Path: start at top of outer circle, arc around left, end at bottom,
  // then inner arc back (reverse) to create the crescent shape.
  // Outer circle (CCW from top to bottom going left): center 24,24 r=14
  // Points: top = (24, 10), bottom = (24, 38)
  // Inner circle (CW from bottom to top going right): center 30,24 r=13
  // Check: top intersection approx (24,11), bottom (24,37)
  return (
    <svg {...sigilBase(size, title, rest)} className={className}>
      {title && <title>{title}</title>}
      {/*
        Crescent path:
        - Start at (24, 10) — top of outer circle
        - Large arc (r=14, CCW sweep=0) around the left side to (24, 38)
        - Then inner arc (r=13, CW sweep=1) back from (24,38) up to (24,10)
        The inner arc center is at (30,24), shifted right, giving the crescent.
      */}
      <path d="M 24 10 A 14 14 0 1 0 24 38 A 13 13 0 1 1 24 10 Z" />
    </svg>
  );
}

// 6. Mercurius — circle with cross below and crescent on top
export function Mercurius({ className, size = 48, title, ...rest }: SigilProps) {
  return (
    <svg {...sigilBase(size, title, rest)} className={className}>
      {title && <title>{title}</title>}
      {/* Central circle */}
      <circle cx="24" cy="24" r="7" />
      {/* Vertical stem below circle */}
      <line x1="24" y1="31" x2="24" y2="40" />
      {/* Horizontal crossbar */}
      <line x1="19" y1="36" x2="29" y2="36" />
      {/* Crescent on top — upward-opening arc */}
      <path d="M 19 17 A 7 6 0 0 1 29 17" />
    </svg>
  );
}

// 7. Sulfur — equilateral triangle (point up) with a cross beneath
export function Sulfur({ className, size = 48, title, ...rest }: SigilProps) {
  // Triangle: apex at top, base near middle
  // Cross: vertical line down from base midpoint, horizontal bar
  return (
    <svg {...sigilBase(size, title, rest)} className={className}>
      {title && <title>{title}</title>}
      {/* Equilateral triangle, pointing up */}
      {/* Apex: 24,8  Base-left: 11,30  Base-right: 37,30 */}
      <polygon points="24,8 11,30 37,30" />
      {/* Vertical stem from base midpoint downward */}
      <line x1="24" y1="30" x2="24" y2="42" />
      {/* Horizontal crossbar */}
      <line x1="17" y1="36" x2="31" y2="36" />
    </svg>
  );
}

// 8. Salt — circle bisected by a horizontal line
export function Salt({ className, size = 48, title, ...rest }: SigilProps) {
  return (
    <svg {...sigilBase(size, title, rest)} className={className}>
      {title && <title>{title}</title>}
      <circle cx="24" cy="24" r="14" />
      <line x1="10" y1="24" x2="38" y2="24" />
    </svg>
  );
}

// 9. Rebis — two overlapping circles (Venn) with a small circle above the intersection
export function Rebis({ className, size = 48, title, ...rest }: SigilProps) {
  // Two circles overlapping horizontally, offset by 7 from center each
  // Left circle center: (20, 27), Right: (28, 27), r=10
  // Intersection top approximately at (24, 17.5)
  // Third small circle above: (24, 12), r=3.5
  return (
    <svg {...sigilBase(size, title, rest)} className={className}>
      {title && <title>{title}</title>}
      {/* Left circle */}
      <circle cx="20" cy="27" r="10" />
      {/* Right circle */}
      <circle cx="28" cy="27" r="10" />
      {/* Crown circle — above where they meet */}
      <circle cx="24" cy="12" r="3.5" />
      {/* Line from crown down to the vesica (intersection midpoint) */}
      <line x1="24" y1="15.5" x2="24" y2="19" strokeWidth={0.9} />
    </svg>
  );
}

// 10. Heptagram — 7-pointed star polygon {7/3}, connect every 3rd of 7 points on a circle
export function Heptagram({ className, size = 48, title, ...rest }: SigilProps) {
  const cx = 24;
  const cy = 24;
  const r = 19;
  const n = 7;
  const step = 3; // {7/3} star polygon

  // Generate points evenly on a circle, starting at top (−π/2)
  const pts: [number, number][] = Array.from({ length: n }, (_, i) => {
    const angle = (-Math.PI / 2) + (2 * Math.PI * i) / n;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
  });

  // Walk every `step`-th point to form the star, closing after visiting all
  const order: number[] = [];
  let current = 0;
  for (let i = 0; i < n; i++) {
    order.push(current);
    current = (current + step) % n;
  }
  order.push(order[0]); // close

  const d = order
    .map((idx, i) => `${i === 0 ? "M" : "L"} ${pts[idx][0].toFixed(3)} ${pts[idx][1].toFixed(3)}`)
    .join(" ") + " Z";

  return (
    <svg {...sigilBase(size, title, rest)} className={className}>
      {title && <title>{title}</title>}
      <path d={d} />
    </svg>
  );
}
