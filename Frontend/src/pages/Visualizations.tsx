import React, { useState } from 'react';
import AquaIntelHeader from '@/components/AquaIntelHeader';
import OceanDataVisualization from '@/components/OceanDataVisualization';
import India3DVisualization from '@/components/India3DVisualization';
import OceanLeafletMap from '@/components/OceanLeafletMap';
import Simple3DTest from '@/components/Simple3DTest';
import TemperatureProfiles from '@/components/TemperatureProfiles';
import TrendAnalysis from '@/components/TrendAnalysis';
import OceanBackground from '@/components/OceanBackground';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Map, BarChart3, TrendingUp, Globe } from 'lucide-react';

const Visualizations = () => {
  const [activeView, setActiveView] = useState<'global' | 'profiles' | 'trends' | '3d'>('3d');

  return (
    <div className="min-h-screen bg-background relative">
      <OceanBackground />
      <AquaIntelHeader />
      <main className="container mx-auto px-6 py-8 relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-ocean-gradient bg-clip-text text-transparent mb-4">
            Interactive Ocean Data Visualizations
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            Explore real-time ocean data through interactive maps, detailed charts, and comprehensive monitoring systems
          </p>
          {activeView === '3d' && (
            <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-blue-800 dark:text-blue-200">Interactive Ocean Map Active</span>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                🗺️ Click and drag to navigate • 📍 Click green/orange dots for CTD sensor data • 🌡️ View real-time temperature and salinity readings
              </p>
            </div>
          )}
        </div>

        {/* Visualization Controls */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button 
            variant={activeView === '3d' ? 'default' : 'outline'}
            className={activeView === '3d' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' : ''}
            onClick={() => setActiveView('3d')}
          >
            <Globe className="h-4 w-4 mr-2" />
            Interactive Ocean Map
          </Button>
          <Button 
            variant={activeView === 'global' ? 'default' : 'outline'} 
            className={activeView === 'global' ? 'bg-primary' : ''}
            onClick={() => setActiveView('global')}
          >
            <Map className="h-4 w-4 mr-2" />
            ARGO Float Network
          </Button>
          <Button 
            variant={activeView === 'profiles' ? 'default' : 'outline'}
            onClick={() => setActiveView('profiles')}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Temperature Profiles
          </Button>
          <Button 
            variant={activeView === 'trends' ? 'default' : 'outline'}
            onClick={() => setActiveView('trends')}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Trend Analysis
          </Button>
        </div>

        {/* Main Visualization - Ocean Map */}
        {activeView === '3d' ? (
          <div className="mb-8">
            <Card className="bg-gradient-to-br from-blue-900/60 to-cyan-900/60 backdrop-blur-md border-cyan-500/30 shadow-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-white text-2xl">Interactive Ocean Map</CardTitle>
                    <p className="text-cyan-100/80 text-sm">
                      Click on CTD sensors to view real-time data • Explore ocean currents and temperature zones
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-100">🗺️ Interactive Map</Badge>
                    <Badge variant="outline" className="border-cyan-400 text-cyan-300">📡 Real-time Data</Badge>
                    <Badge variant="outline" className="border-green-400 text-green-300">🌡️ CTD Sensors</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <OceanLeafletMap />
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Card className="backdrop-blur-md bg-card/80">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      {activeView === 'global' && 'Live ARGO Float Network'}
                      {activeView === 'profiles' && 'Temperature Depth Profiles'}
                      {activeView === 'trends' && 'Ocean Trend Analysis'}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="secondary">Live Data</Badge>
                      <Badge variant="outline">3,847 Floats</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {activeView === 'global' && <OceanDataVisualization />}
                  {activeView === 'profiles' && <TemperatureProfiles />}
                  {activeView === 'trends' && <TrendAnalysis />}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="backdrop-blur-md bg-card/80">
                <CardHeader>
                  <CardTitle className="text-sm">Temperature Range</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Surface</span>
                      <span className="text-sm font-medium">18.5°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">1000m</span>
                      <span className="text-sm font-medium">4.2°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">2000m</span>
                      <span className="text-sm font-medium">2.1°C</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-md bg-card/80">
                <CardHeader>
                  <CardTitle className="text-sm">Salinity Levels</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Surface</span>
                      <span className="text-sm font-medium">35.2 PSU</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">1000m</span>
                      <span className="text-sm font-medium">34.8 PSU</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">2000m</span>
                      <span className="text-sm font-medium">34.6 PSU</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-md bg-card/80">
                <CardHeader>
                  <CardTitle className="text-sm">Active Regions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { region: 'North Atlantic', count: 892 },
                      { region: 'Pacific', count: 1247 },
                      { region: 'Southern Ocean', count: 634 },
                      { region: 'Indian Ocean', count: 718 },
                    ].map((item) => (
                      <div key={item.region} className="flex justify-between items-center">
                        <span className="text-sm">{item.region}</span>
                        <Badge variant="secondary">{item.count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Visualizations;