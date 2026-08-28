/**
 * AutoSmart brand "growth" mark shown right after the hero headline word.
 *
 * It reads like an uptrend chart rather than an icon: a smooth line that
 * settles briefly, then climbs, ending in a clean chevron head. A blue -> cyan
 * gradient runs along its length (brand palette, see globals.css) and a soft
 * glow sits under it. The line and head draw themselves on once as the page
 * loads (see .tg-* in globals.css), then rest - no looping.
 *
 * Purely decorative (aria-hidden); the surrounding text carries the meaning.
 */
export default function TrendArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 52 40"
      fill="none"
      className={`inline-block ${className}`}
    >
      <defs>
        <linearGradient
          id="tg-stroke"
          x1="2"
          y1="38"
          x2="48"
          y2="4"
          gradientUnits="userSpaceOnUse"
        >
          {/* --brand-blue / --brand-cyan */}
          <stop offset="0" stopColor="#2b93c9" />
          <stop offset="1" stopColor="#6ec9e8" />
        </linearGradient>
        <filter
          id="tg-glow"
          x="-35%"
          y="-35%"
          width="170%"
          height="170%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="1.7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g
        stroke="url(#tg-stroke)"
        strokeWidth={3.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#tg-glow)"
      >
        <path
          className="tg-line"
          pathLength={1}
          d="M2.5 33.5C11 31.2 14.5 32.4 21 24.5 27 17.2 33 9.5 45.5 5"
        />
        <path className="tg-head" pathLength={1} d="M45.5 5 35 6.6M45.5 5 44.8 16" />
      </g>
    </svg>
  );
}
