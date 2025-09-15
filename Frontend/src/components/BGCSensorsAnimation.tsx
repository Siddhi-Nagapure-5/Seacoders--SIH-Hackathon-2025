import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Waves, 
  Satellite,
  Thermometer,
  Droplets,
  Zap,
  Radio,
  ArrowDown,
  ArrowUp,
  Activity
} from 'lucide-react';

interface AnimationPhase {
  id: string;
  name: string;
  description: string;
  duration: number;
  depth?: number;
}

const BGCSensorsAnimation: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [floatDepth, setFloatDepth] = useState(0);
  const [collectedData, setCollectedData] = useState({
    temperature: 0,
    salinity: 0,
    oxygen: 0,
    chlorophyll: 0,
    ph: 0
  });

  const phases: AnimationPhase[] = [
    { id: 'deployment', name: 'Deployment', description: 'ARGO float deployed from research vessel', duration: 3, depth: 0 },
    { id: 'drift', name: 'Initial Drift', description: 'Float drifts at surface for initial calibration', duration: 2, depth: 10 },
    { id: 'descent', name: 'Deep Descent', description: 'Descending to 2000m depth collecting data', duration: 8, depth: 2000 },
    { id: 'collection', name: 'Data Collection', description: 'BGC sensors collect biogeochemical measurements', duration: 4, depth: 2000 },
    { id: 'ascent', name: 'Ascent & Profiling', description: 'Ascending to surface collecting continuous profiles', duration: 8, depth: 0 },
    { id: 'surface', name: 'Surface Communication', description: 'Transmitting data to satellites via GPS/Argos', duration: 3, depth: 0 },
    { id: 'cycle', name: 'Cycle Complete', description: 'Ready for next 10-day cycle', duration: 2, depth: 0 }
  ];

  const totalDuration = phases.reduce((sum, phase) => sum + phase.duration, 0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + (100 / (totalDuration * 10)); // Update every 100ms
          
          if (newProgress >= 100) {
            setIsPlaying(false);
            return 100;
          }
          
          // Calculate current phase based on progress
          let cumulativeDuration = 0;
          let phaseIndex = 0;
          
          for (let i = 0; i < phases.length; i++) {
            cumulativeDuration += (phases[i].duration / totalDuration) * 100;
            if (newProgress <= cumulativeDuration) {
              phaseIndex = i;
              break;
            }
          }
          
          setCurrentPhase(phaseIndex);
          
          // Update float depth based on phase
          const phase = phases[phaseIndex];
          if (phase.depth !== undefined) {
            setFloatDepth(phase.depth);
          }
          
          // Simulate data collection
          if (phase.id === 'descent' || phase.id === 'collection' || phase.id === 'ascent') {
            setCollectedData(prev => ({
              temperature: Math.min(100, prev.temperature + Math.random() * 2),
              salinity: Math.min(100, prev.salinity + Math.random() * 1.5),
              oxygen: Math.min(100, prev.oxygen + Math.random() * 1.8),
              chlorophyll: Math.min(100, prev.chlorophyll + Math.random() * 1.2),
              ph: Math.min(100, prev.ph + Math.random() * 1)
            }));
          }
          
          return newProgress;
        });
      }, 100);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, totalDuration]);

  // Auto-loop when finished
  useEffect(() => {
    if (!isPlaying && progress === 100) {
      const timeout = setTimeout(() => {
        setProgress(0);
        setCurrentPhase(0);
        setFloatDepth(0);
        setCollectedData({ temperature: 0, salinity: 0, oxygen: 0, chlorophyll: 0, ph: 0 });
        setIsPlaying(true);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [isPlaying, progress]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentPhase(0);
    setFloatDepth(0);
    setCollectedData({
      temperature: 0,
      salinity: 0,
      oxygen: 0,
      chlorophyll: 0,
      ph: 0
    });
  };

  const getFloatPosition = () => {
    const maxDepth = 400; // Visual max depth in pixels
    const actualDepth = floatDepth;
    const visualDepth = Math.min((actualDepth / 2000) * maxDepth, maxDepth);
    return visualDepth;
  };

  const getCurrentPhaseInfo = () => phases[currentPhase];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Animation Display */}
      <div className="lg:col-span-2">
        <Card className="bg-gradient-to-b from-sky-50 to-blue-900 border-0 shadow-ocean min-h-[600px]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2 text-blue-900">
                <Waves className="h-6 w-6" />
                <span>BGC-Argo Float Operation Cycle</span>
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant={isPlaying ? "secondary" : "default"}
                  onClick={handlePlayPause}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button size="sm" variant="outline" onClick={handleReset}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative h-[500px] overflow-hidden">
            {/* Ocean Surface */}
            <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-blue-200 to-blue-400 border-b-2 border-blue-500">
              <div className="absolute inset-0 opacity-30">
                {/* Animated waves */}
                <div className="wave-animation"></div>
              </div>
              
              {/* Satellite */}
              <div className="absolute -top-8 right-10">
                <div className="flex items-center space-x-2">
                  <Satellite className="h-8 w-8 text-gray-600" />
                  {currentPhase === 5 && (
                    <div className="animate-pulse">
                      <Radio className="h-4 w-4 text-green-500" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Ocean Depth Gradient */}
            <div className="absolute top-12 left-0 right-0 bottom-0 bg-gradient-to-b from-blue-400 via-blue-600 via-blue-800 to-blue-950">
              {/* Depth Markers */}
              <div className="absolute left-2 top-0 text-white text-xs space-y-8 opacity-60">
                <div>0m</div>
                <div style={{ marginTop: '80px' }}>500m</div>
                <div style={{ marginTop: '80px' }}>1000m</div>
                <div style={{ marginTop: '80px' }}>1500m</div>
                <div style={{ marginTop: '80px' }}>2000m</div>
              </div>

              {/* ARGO Float */}
              <div 
                className="absolute left-1/2 transform -translate-x-1/2 transition-all duration-1000 ease-in-out"
                style={{ top: `${12 + getFloatPosition()}px` }}
              >
                <div className="relative">
                  {/* Float Body */}
                  <div className="w-4 h-16 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full shadow-lg">
                    {/* Sensors */}
                    <div className="absolute -left-1 top-2 w-2 h-2 bg-green-400 rounded-full"></div>
                    <div className="absolute -right-1 top-4 w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="absolute -left-1 top-6 w-2 h-2 bg-red-400 rounded-full"></div>
                    
                    {/* Antenna (when at surface) */}
                    {floatDepth < 50 && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-gray-600"></div>
                    )}
                  </div>

                  {/* Data Collection Animation */}
                  {(getCurrentPhaseInfo().id === 'descent' || getCurrentPhaseInfo().id === 'collection' || getCurrentPhaseInfo().id === 'ascent') && (
                    <div className="absolute -right-8 top-0 space-y-1">
                      <div className="animate-ping w-2 h-2 bg-green-400 rounded-full"></div>
                      <div className="animate-ping w-2 h-2 bg-blue-400 rounded-full" style={{ animationDelay: '0.5s' }}></div>
                      <div className="animate-ping w-2 h-2 bg-red-400 rounded-full" style={{ animationDelay: '1s' }}></div>
                    </div>
                  )}

                  {/* Movement Indicators */}
                  {getCurrentPhaseInfo().id === 'descent' && (
                    <ArrowDown className="absolute -right-6 top-8 h-4 w-4 text-red-400 animate-bounce" />
                  )}
                  {getCurrentPhaseInfo().id === 'ascent' && (
                    <ArrowUp className="absolute -right-6 top-8 h-4 w-4 text-green-400 animate-bounce" />
                  )}

                  {/* Data Transmission Waves */}
                  {getCurrentPhaseInfo().id === 'surface' && floatDepth < 50 && (
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                      <div className="animate-ping w-8 h-8 border-2 border-green-400 rounded-full opacity-75"></div>
                      <div className="animate-ping w-12 h-12 border-2 border-green-400 rounded-full opacity-50 absolute -top-2 -left-2" style={{ animationDelay: '0.5s' }}></div>
                      <div className="animate-ping w-16 h-16 border-2 border-green-400 rounded-full opacity-25 absolute -top-4 -left-4" style={{ animationDelay: '1s' }}></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Ocean Life (Fish, Plankton) */}
              <div className="absolute right-10 top-32 animate-pulse">
                <div className="w-2 h-1 bg-yellow-300 rounded-full"></div>
              </div>
              <div className="absolute left-8 top-64 animate-pulse" style={{ animationDelay: '2s' }}>
                <div className="w-3 h-2 bg-green-300 rounded-full"></div>
              </div>
              <div className="absolute right-16 bottom-20 animate-pulse" style={{ animationDelay: '4s' }}>
                <div className="w-1 h-1 bg-pink-300 rounded-full"></div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-4 left-4 right-4">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-xs text-white mt-1">
                <span>Phase: {getCurrentPhaseInfo().name}</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Information Panel */}
      <div className="space-y-6">
        {/* Current Phase */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Current Phase</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Badge variant="secondary" className="w-full justify-center py-2">
                {getCurrentPhaseInfo().name}
              </Badge>
              <p className="text-sm text-muted-foreground">
                {getCurrentPhaseInfo().description}
              </p>
              <div className="flex items-center space-x-2 text-sm">
                <Activity className="h-4 w-4 text-blue-500" />
                <span>Depth: {floatDepth}m</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* BGC Sensors Data */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              <span>BGC Sensors</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="h-3 w-3 text-orange-500" />
                    <span>Temperature</span>
                  </div>
                  <span>{collectedData.temperature.toFixed(0)}%</span>
                </div>
                <Progress value={collectedData.temperature} className="h-1" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Droplets className="h-3 w-3 text-blue-500" />
                    <span>Salinity</span>
                  </div>
                  <span>{collectedData.salinity.toFixed(0)}%</span>
                </div>
                <Progress value={collectedData.salinity} className="h-1" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Oxygen</span>
                  </div>
                  <span>{collectedData.oxygen.toFixed(0)}%</span>
                </div>
                <Progress value={collectedData.oxygen} className="h-1" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span>Chlorophyll</span>
                  </div>
                  <span>{collectedData.chlorophyll.toFixed(0)}%</span>
                </div>
                <Progress value={collectedData.chlorophyll} className="h-1" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span>pH Level</span>
                  </div>
                  <span>{collectedData.ph.toFixed(0)}%</span>
                </div>
                <Progress value={collectedData.ph} className="h-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cycle Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cycle Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Cycle Duration:</span>
                <span className="font-medium">10 days</span>
              </div>
              <div className="flex justify-between">
                <span>Profile Depth:</span>
                <span className="font-medium">2000m</span>
              </div>
              <div className="flex justify-between">
                <span>Data Parameters:</span>
                <span className="font-medium">5+ BGC</span>
              </div>
              <div className="flex justify-between">
                <span>Float Lifetime:</span>
                <span className="font-medium">5-7 years</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        .wave-animation {
          background: linear-gradient(45deg, transparent 33%, rgba(255,255,255,0.3) 33%, rgba(255,255,255,0.3) 66%, transparent 66%);
          background-size: 20px 20px;
          animation: wave-move 2s linear infinite;
        }
        
        @keyframes wave-move {
          0% { background-position: 0 0; }
          100% { background-position: 20px 0; }
        }
      `}</style>
    </div>
  );
};

export default BGCSensorsAnimation;
