import React, { useState, useEffect } from 'react';

interface OceanScene {
  id: string;
  name: string;
  background: string;
  overlay?: string;
  particles?: boolean;
  waves?: boolean;
  sunrays?: boolean;
  marineBio?: boolean;
  bioluminescence?: boolean;
}

const oceanScenes: OceanScene[] = [
  {
    id: 'dark-deep',
    name: 'Deep Blue',
    background: 'linear-gradient(180deg, #0b1a3a 0%, #0a1a3a 40%, #07142b 75%, #04101f 100%)',
    waves: false,
    sunrays: true,
    marineBio: true,
    particles: false,
    bioluminescence: false
  }
];

const OceanBackground: React.FC = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (oceanScenes.length <= 1) {
      setIsTransitioning(false);
      setCurrentScene(0);
      return;
    }

    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentScene((prev) => (prev + 1) % oceanScenes.length);
        setIsTransitioning(false);
      }, 1500);
      
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const scene = oceanScenes[currentScene];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main Ocean Background */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${isTransitioning ? 'opacity-80' : 'opacity-95'}`}
        style={{ background: scene.background }}
      />

      {/* Subtle left-side Sun Rays */}
      {scene.sunrays && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${4 + i * 4}%`,
                top: '-5%',
                width: '3px',
                height: '85%',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 35%, transparent 100%)',
                transform: `rotate(${-(8 + i * 2)}deg)`,
                filter: 'blur(0.5px)',
                opacity: 0.5,
                animation: `ray-drift ${7 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.7}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Floating Particles - disabled for dark theme */}
      {scene.particles && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            >
              <div 
                className="bg-white/10 rounded-full"
                style={{
                  width: `${2 + Math.random() * 4}px`,
                  height: `${2 + Math.random() * 4}px`
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Marine Biology - a few fish */}
      {scene.marineBio && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Small school */}
          <div 
            className="absolute animate-swim-right"
            style={{
              left: '-8%',
              top: '30%',
              animationDuration: '16s'
            }}
          >
            <div className="flex space-x-1 opacity-60">
              <div className="w-5 h-2 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full" />
              <div className="w-4 h-2 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full" />
              <div className="w-3 h-1.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" />
            </div>
          </div>

          {/* Single fish */}
          <div 
            className="absolute animate-swim-left"
            style={{
              right: '-10%',
              top: '65%',
              animationDuration: '20s',
              animationDelay: '6s'
            }}
          >
            <div className="w-10 h-5 bg-gradient-to-r from-slate-200/60 to-slate-400/60 rounded-full">
              <div className="absolute top-1 left-2 w-1.5 h-1.5 bg-white/80 rounded-full" />
            </div>
          </div>
        </div>
      )}

      {/* Depth Label */}
      <div className="absolute bottom-4 left-4 bg-black/30 backdrop-blur-sm rounded-lg p-3 text-white/80 z-10">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <span className="text-sm font-medium">{scene.name}</span>
        </div>
      </div>

      {/* Darker overlay for depth */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />

      <style jsx>{`
        @keyframes wave {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes swim-right {
          0% { transform: translateX(-100px) scaleX(1); }
          100% { transform: translateX(calc(100vw + 100px)) scaleX(1); }
        }

        @keyframes swim-left {
          0% { transform: translateX(100px) scaleX(-1); }
          100% { transform: translateX(calc(-100vw - 100px)) scaleX(-1); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes ray-drift {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 0.65; }
        }

        .animate-wave {
          animation: wave 8s ease-in-out infinite;
        }

        .animate-swim-right {
          animation: swim-right linear infinite;
        }

        .animate-swim-left {
          animation: swim-left linear infinite;
        }

        .animate-float-slow {
          animation: float-slow ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default OceanBackground;
