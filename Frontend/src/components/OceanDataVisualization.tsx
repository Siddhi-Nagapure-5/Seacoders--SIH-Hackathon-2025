import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Thermometer, Droplets, Navigation, TrendingUp } from 'lucide-react';

const OceanDataVisualization = () => {
  // Mock ARGO float data
  const argoData = [
    { id: 'AF001', lat: 23.5, lon: 68.2, temp: 28.5, salinity: 35.2, depth: 150 },
    { id: 'AF002', lat: 19.8, lon: 72.1, temp: 26.8, salinity: 35.8, depth: 200 },
    { id: 'AF003', lat: 15.2, lon: 74.5, temp: 25.1, salinity: 36.1, depth: 300 },
    { id: 'AF004', lat: 12.1, lon: 75.8, temp: 23.8, salinity: 36.3, depth: 450 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Live Ocean Map */}
      <Card className="bg-surface-gradient border-0 shadow-ocean">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Navigation className="h-5 w-5 text-primary" />
            <span>ARGO Float Network - Indian Ocean</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-64 bg-deep-gradient rounded-lg overflow-hidden">
            {/* Ocean Map Background */}
            <div className="absolute inset-0 bg-glow-gradient opacity-30"></div>
            
            {/* ARGO Float Markers */}
            {argoData.map((float, index) => (
              <div
                key={float.id}
                className="absolute animate-float"
                style={{
                  left: `${20 + index * 15}%`,
                  top: `${30 + index * 10}%`,
                  animationDelay: `${index * 0.5}s`
                }}
              >
                <div className="relative">
                  <div className="h-4 w-4 bg-accent rounded-full shadow-glow animate-pulse-slow"></div>
                  <div className="absolute -top-8 -left-8 bg-card/90 backdrop-blur-sm rounded-md px-2 py-1 text-xs opacity-0 hover:opacity-100 transition-opacity">
                    {float.id}
                    <br />
                    {float.temp}°C
                  </div>
                </div>
              </div>
            ))}

            {/* Ocean Current Lines */}
            <svg className="absolute inset-0 w-full h-full">
              <path
                d="M 20 150 Q 120 100 200 120 Q 280 140 350 110"
                stroke="hsl(var(--primary-light))"
                strokeWidth="2"
                fill="none"
                opacity="0.6"
                className="animate-shimmer"
              />
              <path
                d="M 50 180 Q 150 160 250 170 Q 300 175 380 160"
                stroke="hsl(var(--accent))"
                strokeWidth="1.5"
                fill="none"
                opacity="0.4"
                className="animate-shimmer"
                style={{ animationDelay: '1s' }}
              />
            </svg>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <Badge variant="outline" className="mb-2">Active Floats</Badge>
              <p className="text-2xl font-bold text-primary">{argoData.length}</p>
            </div>
            <div>
              <Badge variant="outline" className="mb-2">Data Points</Badge>
              <p className="text-2xl font-bold text-accent">12,847</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Temperature Profile */}
      <Card className="bg-card border-0 shadow-ocean">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Thermometer className="h-5 w-5 text-data-warm" />
            <span>Temperature Profile</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {argoData.map((data, index) => (
              <div key={data.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-data-warm rounded-full"></div>
                  <span className="font-mono text-sm">{data.id}</span>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Depth</p>
                    <p className="font-semibold">{data.depth}m</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Temp</p>
                    <p className="font-semibold text-data-warm">{data.temp}°C</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Salinity</p>
                    <p className="font-semibold text-data-cool">{data.salinity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Data Stream */}
      <Card className="lg:col-span-2 bg-card border-0 shadow-ocean">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>Real-time Data Stream</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-surface-gradient p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Thermometer className="h-5 w-5 text-data-warm" />
                <Badge variant="outline">Live</Badge>
              </div>
              <p className="text-2xl font-bold text-data-warm">26.8°C</p>
              <p className="text-sm text-muted-foreground">Avg. Surface Temp</p>
            </div>

            <div className="bg-surface-gradient p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Droplets className="h-5 w-5 text-data-cool" />
                <Badge variant="outline">Live</Badge>
              </div>
              <p className="text-2xl font-bold text-data-cool">35.7</p>
              <p className="text-sm text-muted-foreground">Avg. Salinity</p>
            </div>

            <div className="bg-surface-gradient p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Navigation className="h-5 w-5 text-accent" />
                <Badge variant="outline">Live</Badge>
              </div>
              <p className="text-2xl font-bold text-accent">847</p>
              <p className="text-sm text-muted-foreground">Active Sensors</p>
            </div>

            <div className="bg-surface-gradient p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <Badge variant="outline">Live</Badge>
              </div>
              <p className="text-2xl font-bold text-primary">99.2%</p>
              <p className="text-sm text-muted-foreground">Data Accuracy</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OceanDataVisualization;