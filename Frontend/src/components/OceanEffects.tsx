import React, { useEffect, useMemo, useRef, useState } from 'react';

interface ParticleSpec {
  id: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const generateParticles = (count: number): ParticleSpec[] => {
  const particles: ParticleSpec[] = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      id: `p-${i}`,
      left: Math.random() * 100,
      size: 2 + Math.random() * 3,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 10,
      driftX: -10 + Math.random() * 20,
    });
  }
  return particles;
};

const OceanEffects: React.FC = () => {
  const [trailDots, setTrailDots] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const dotId = useRef(0);
  const particles = useMemo(() => generateParticles(40), []);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const handleMove = (e: MouseEvent) => {
      dotId.current += 1;
      setTrailDots((prev) => {
        const next = [...prev, { x: e.clientX, y: e.clientY, id: dotId.current }];
        // keep last N dots for performance
        return next.slice(-18);
      });
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      {/* Flowing ocean current layers in front */}
      <div className="absolute inset-0 opacity-50 current-flow-1" />
      <div className="absolute inset-0 opacity-40 current-flow-2" />
      {/* Animated header and footer waves */}
      <div className="absolute top-0 left-0 right-0 h-20 opacity-[0.35]">
        <div className="absolute inset-0 ocean-wave" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 opacity-[0.35] rotate-180">
        <div className="absolute inset-0 ocean-wave" />
      </div>

      {/* Drifting light particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-cyan-300/20 shadow-[0_0_12px_rgba(34,211,238,0.35)] animate-drift"
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              transform: `translateX(${p.driftX}px)`
            }}
          />
        ))}
      </div>

      {/* Bioluminescent cursor trail */}
      {!prefersReducedMotion() && (
        <div className="absolute inset-0">
          {trailDots.map((d) => (
            <span
              key={d.id}
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/30 shadow-[0_0_20px_rgba(34,211,238,0.6)] animate-ripple"
              style={{ left: d.x, top: d.y, width: 12, height: 12 }}
            />)
          )}
        </div>
      )}
    </div>
  );
};

export default OceanEffects;


