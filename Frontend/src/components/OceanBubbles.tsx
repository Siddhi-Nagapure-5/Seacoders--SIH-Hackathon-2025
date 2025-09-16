import React, { useMemo } from 'react';

type Bubble = {
  id: string;
  left: number; // 0-100 vw
  size: number; // px
  duration: number; // s
  delay: number; // s
  opacity: number; // 0-1
  driftX: number; // px
  dark: boolean;
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function createBubbles(count: number): Bubble[] {
  const bubbles: Bubble[] = [];
  for (let i = 0; i < count; i++) {
    const size = 8 + Math.random() * 24; // 8-32px
    const dark = Math.random() < 0.35; // a few darker bubbles
    bubbles.push({
      id: `b-${i}`,
      left: Math.random() * 100,
      size,
      duration: 18 + Math.random() * 28, // 18-46s
      delay: Math.random() * 12,
      opacity: dark ? 0.28 + Math.random() * 0.22 : 0.18 + Math.random() * 0.22,
      driftX: -20 + Math.random() * 40,
      dark,
    });
  }
  return bubbles;
}

interface OceanBubblesProps {
  density?: 'low' | 'medium' | 'high';
  layer?: 'back' | 'front';
  tone?: 'soft' | 'dark';
}

const OceanBubbles: React.FC<OceanBubblesProps> = ({ density = 'medium', layer = 'back', tone = 'dark' }) => {
  const count = density === 'high' ? 100 : density === 'low' ? 40 : 70;
  const bubbles = useMemo(() => createBubbles(count), [count]);

  if (prefersReducedMotion()) {
    return null;
  }

  return (
    <div className={`pointer-events-none fixed inset-0 ${layer === 'front' ? 'z-10' : '-z-10'}`}>
      {/* Soft white-to-aqua subtle background to keep content readable on white */}
      <div className="absolute inset-0" style={{
        background: tone === 'dark'
          ? 'radial-gradient(120% 70% at 50% -10%, rgba(30,64,175,0.22), transparent 50%), radial-gradient(100% 60% at 100% 100%, rgba(29,78,216,0.14), transparent 60%)'
          : 'radial-gradient(120% 70% at 50% -10%, rgba(186,230,253,0.25), transparent 50%), radial-gradient(100% 60% at 100% 100%, rgba(59,130,246,0.06), transparent 60%)'
      }} />

      {/* Bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        {bubbles.map(b => (
          <span
            key={b.id}
            className="absolute rounded-full animate-bubble"
            style={{
              left: `${b.left}%`,
              width: b.size,
              height: b.size,
              opacity: Math.min(0.65, b.opacity + 0.15),
              background: b.dark
                ? 'radial-gradient(circle at 35% 35%, rgba(203,213,225,0.7), rgba(96,165,250,0.6) 45%, rgba(30,58,138,0.7))'
                : 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(186,230,253,0.75) 50%, rgba(59,130,246,0.4))',
              boxShadow: b.dark
                ? '0 0 10px rgba(37,99,235,0.35), inset 0 0 8px rgba(148,163,184,0.6)'
                : '0 0 8px rgba(186,230,253,0.6), inset 0 0 6px rgba(255,255,255,0.8)',
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
              transform: `translateX(${b.driftX}px)`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default OceanBubbles;


