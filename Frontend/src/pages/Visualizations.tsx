import React from 'react';
import FloatChatHeader from '@/components/FloatChatHeader';
import OceanDataVisualization from '@/components/OceanDataVisualization';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Map, BarChart3, TrendingUp, Globe } from 'lucide-react';

const Visualizations = () => {
  return (
    <div className="min-h-screen bg-background">
      <FloatChatHeader />
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-ocean-gradient bg-clip-text text-transparent mb-4">
            Ocean Data Visualizations
          </h1>
          <p className="text-xl text-muted-foreground">
            Interactive maps, charts, and real-time ocean monitoring
          </p>
        </div>

        {/* Visualization Controls */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button variant="default" className="bg-primary">
            <Map className="h-4 w-4 mr-2" />
            Global Map
          </Button>
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Temperature Profiles
          </Button>
          <Button variant="outline">
            <TrendingUp className="h-4 w-4 mr-2" />
            Trend Analysis
          </Button>
          <Button variant="outline">
            <Globe className="h-4 w-4 mr-2" />
            3D Ocean View
          </Button>
        </div>

        {/* Main Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Live ARGO Float Network</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="secondary">Live Data</Badge>
                    <Badge variant="outline">3,847 Floats</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <OceanDataVisualization />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
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

            <Card>
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

            <Card>
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
      </main>
    </div>
  );
};

export default Visualizations;