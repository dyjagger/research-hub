import React, { useMemo } from 'react';

const MOON_PHASES = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];
const TOTAL_ESTIMATED_MINUTES = 75;

export default function ProgressTracker({ visitedSections = [], totalSections = 1 }) {
  const pct = Math.min(100, Math.round((visitedSections.length / totalSections) * 100));
  const moonIdx = Math.min(MOON_PHASES.length - 1, Math.floor((pct / 100) * MOON_PHASES.length));
  const moon = MOON_PHASES[moonIdx];

  const minutesRemaining = Math.max(0, Math.round(TOTAL_ESTIMATED_MINUTES * (1 - pct / 100)));

  const orbitAngle = (pct / 100) * 360;

  const starField = useMemo(() => {
    const stars = [];
    for (let i = 0; i < 30; i++) {
      stars.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        delay: Math.random() * 3,
      });
    }
    return stars;
  }, []);

  return (
    <div className="relative bg-gray-950 border border-gray-800/50 rounded-2xl p-4 overflow-hidden">
      {/* Star field background */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {starField.map((s, i) => (
          <circle
            key={i}
            cx={`${s.x}%`}
            cy={`${s.y}%`}
            r={s.size}
            fill="white"
            opacity={s.opacity}
          >
            <animate
              attributeName="opacity"
              values={`${s.opacity};${s.opacity * 0.3};${s.opacity}`}
              dur={`${2 + s.delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>

      <div className="relative z-10 flex items-center gap-4">
        {/* Orbital diagram */}
        <div className="relative w-20 h-20 flex-shrink-0">
          {/* Orbit ring */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="30" fill="none" stroke="#374151" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
            {/* Progress arc */}
            <circle
              cx="40" cy="40" r="30"
              fill="none"
              stroke="url(#progressGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={`${(pct / 100) * 188.5} 188.5`}
              transform="rotate(-90 40 40)"
              className="transition-all duration-700 ease-out"
            />
            <defs>
              <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center planet */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl" style={{ filter: 'drop-shadow(0 0 6px rgba(59,130,246,0.5))' }}>🌍</span>
          </div>

          {/* Orbiting moon */}
          <div
            className="absolute w-6 h-6 flex items-center justify-center transition-all duration-700 ease-out"
            style={{
              left: `${40 + 30 * Math.cos((orbitAngle - 90) * Math.PI / 180) - 12}px`,
              top: `${40 + 30 * Math.sin((orbitAngle - 90) * Math.PI / 180) - 12}px`,
            }}
          >
            <span className="text-lg" style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.3))' }}>{moon}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white tabular-nums">{pct}%</span>
            <span className="text-[10px] text-gray-500">explored</span>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-700 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>

          <div className="flex items-center justify-end text-[10px]">
            <span className="text-gray-500">
              ~{minutesRemaining} min remaining
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[9px] text-gray-600">
            <span>{moon}</span>
            <span>
              {pct === 0 && 'New Moon — your journey begins!'}
              {pct > 0 && pct < 25 && 'Waxing Crescent — just getting started!'}
              {pct >= 25 && pct < 50 && 'First Quarter — nice progress!'}
              {pct >= 50 && pct < 75 && 'Waxing Gibbous — more than halfway!'}
              {pct >= 75 && pct < 100 && 'Almost Full — you are a space expert!'}
              {pct >= 100 && 'Full Moon — mission complete! 🎉'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
