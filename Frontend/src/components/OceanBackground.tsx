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
    id: 'surface',
    name: 'Ocean Surface',
    background: 'linear-gradient(180deg, #87CEEB 0%, #4682B4 50%, #191970 100%)',
    waves: true,
    sunrays: true
  },
  {
    id: 'shallow',
    name: 'Shallow Waters',
    background: 'linear-gradient(180deg, #40E0D0 0%, #00CED1 40%, #4682B4 100%)',
    sunrays: true,
    particles: true
  },
  {
    id: 'mid-ocean',
    name: 'Mid Ocean',
    background: 'linear-gradient(180deg, #4682B4 0%, #191970 60%, #000080 100%)',
    marineBio: true,
    particles: true
  },
  {
    id: 'deep-ocean',
    name: 'Deep Ocean',
    background: 'linear-gradient(180deg, #191970 0%, #000080 50%, #000033 100%)',
    marineBio: true,
    bioluminescence: true
  },
  {
    id: 'abyss',
    name: 'Ocean Abyss',
    background: 'linear-gradient(180deg, #000033 0%, #000011 50%, #000000 100%)',
    bioluminescence: true
  },
  {
    id: 'coral-reef',
    name: 'Coral Reef',
    background: 'linear-gradient(180deg, #20B2AA 0%, #4682B4 70%, #191970 100%)',
    marineBio: true,
    particles: true,
    sunrays: true
  }
];

const OceanBackground: React.FC = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentScene((prev) => (prev + 1) % oceanScenes.length);
        setIsTransitioning(false);
      }, 1000); // Fade duration
      
    }, 8000); // Change scene every 8 seconds

    return () => clearInterval(interval);
  }, []);

  const scene = oceanScenes[currentScene];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main Ocean Background */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${isTransitioning ? 'opacity-70' : 'opacity-90'}`}
        style={{ background: scene.background }}
      />

      {/* Animated Waves */}
      {scene.waves && (
        <div className="absolute top-0 left-0 right-0 h-32 overflow-hidden">
          <div className="wave-animation absolute inset-0 opacity-30">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 320">
              <path 
                d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,122.7C960,149,1056,203,1152,213.3C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" 
                fill="rgba(255,255,255,0.1)"
                className="animate-wave"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Sun Rays */}
      {scene.sunrays && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${20 + i * 15}%`,
                top: '0%',
                width: '2px',
                height: '60%',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)',
                transform: `rotate(${-10 + i * 4}deg)`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: '4s'
              }}
            />
          ))}
        </div>
      )}

      {/* Floating Particles */}
      {scene.particles && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
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
                className="bg-white/20 rounded-full"
                style={{
                  width: `${2 + Math.random() * 6}px`,
                  height: `${2 + Math.random() * 6}px`
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Marine Biology */}
      {scene.marineBio && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Fish */}
          <div 
            className="absolute animate-swim-right"
            style={{
              left: '-5%',
              top: '20%',
              animationDuration: '15s'
            }}
          >
            <div className="w-6 h-3 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full opacity-60" />
          </div>
          <div 
            className="absolute animate-swim-left"
            style={{
              right: '-5%',
              top: '60%',
              animationDuration: '12s',
              animationDelay: '3s'
            }}
          >
            <div className="w-4 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-60" />
          </div>
          <div 
            className="absolute animate-swim-right"
            style={{
              left: '-3%',
              top: '80%',
              animationDuration: '18s',
              animationDelay: '6s'
            }}
          >
            <div className="w-3 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-50" />
          </div>

          {/* Jellyfish */}
          <div 
            className="absolute animate-float-slow"
            style={{
              left: '70%',
              top: '30%',
              animationDuration: '8s',
              animationDelay: '2s'
            }}
          >
            <div className="w-8 h-8 bg-gradient-to-b from-purple-300/30 to-transparent rounded-full">
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute animate-pulse"
                    style={{
                      left: `${-6 + i * 4}px`,
                      width: '1px',
                      height: '12px',
                      background: 'rgba(147, 51, 234, 0.3)',
                      animationDelay: `${i * 0.3}s`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bioluminescence */}
      {scene.bioluminescence && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            >
              <div 
                className="rounded-full"
                style={{
                  width: `${1 + Math.random() * 3}px`,
                  height: `${1 + Math.random() * 3}px`,
                  background: `rgba(${Math.random() > 0.5 ? '0, 255, 255' : '255, 0, 255'}, 0.6)`,
                  boxShadow: `0 0 ${4 + Math.random() * 8}px rgba(${Math.random() > 0.5 ? '0, 255, 255' : '255, 0, 255'}, 0.8)`
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Ocean Depth Indicator */}
      <div className="absolute bottom-4 left-4 bg-black/20 backdrop-blur-sm rounded-lg p-3 text-white/80 z-10">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <span className="text-sm font-medium">{scene.name}</span>
        </div>
      </div>

      {/* Overlay to ensure content readability */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />

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
