import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Thermometer, Droplets, TrendingDown, TrendingUp } from 'lucide-react';

const TemperatureProfiles: React.FC = () => {
  // Depth vs Temperature data for different locations around India
  const depthProfiles = useMemo(() => ({
    'Arabian Sea': [
      { depth: 0, temperature: 28.5, salinity: 36.2 },
      { depth: 50, temperature: 26.8, salinity: 36.1 },
      { depth: 100, temperature: 24.2, salinity: 35.9 },
      { depth: 200, temperature: 20.5, salinity: 35.7 },
      { depth: 300, temperature: 17.8, salinity: 35.5 },
      { depth: 500, temperature: 12.4, salinity: 35.2 },
      { depth: 1000, temperature: 6.2, salinity: 34.9 },
      { depth: 1500, temperature: 4.1, salinity: 34.7 },
      { depth: 2000, temperature: 2.8, salinity: 34.6 },
    ],
    'Bay of Bengal': [
      { depth: 0, temperature: 29.2, salinity: 34.8 },
      { depth: 50, temperature: 27.5, salinity: 34.9 },
      { depth: 100, temperature: 25.1, salinity: 35.1 },
      { depth: 200, temperature: 21.8, salinity: 35.3 },
      { depth: 300, temperature: 18.9, salinity: 35.4 },
      { depth: 500, temperature: 13.7, salinity: 35.1 },
      { depth: 1000, temperature: 7.1, salinity: 34.8 },
      { depth: 1500, temperature: 4.8, salinity: 34.6 },
      { depth: 2000, temperature: 3.2, salinity: 34.5 },
    ],
    'Indian Ocean': [
      { depth: 0, temperature: 28.8, salinity: 35.4 },
      { depth: 50, temperature: 27.1, salinity: 35.6 },
      { depth: 100, temperature: 24.8, salinity: 35.8 },
      { depth: 200, temperature: 21.2, salinity: 35.9 },
      { depth: 300, temperature: 18.4, salinity: 35.7 },
      { depth: 500, temperature: 13.1, salinity: 35.3 },
      { depth: 1000, temperature: 6.8, salinity: 34.9 },
      { depth: 1500, temperature: 4.5, salinity: 34.7 },
      { depth: 2000, temperature: 3.0, salinity: 34.6 },
    ],
  }), []);

  // Recent temperature measurements from ARGO floats
  const recentData = useMemo(() => [
    { location: 'Mumbai Coast', depth: 0, temp: 28.5, salinity: 36.2, date: '2024-01-15' },
    { location: 'Chennai Coast', depth: 0, temp: 29.1, salinity: 34.8, date: '2024-01-15' },
    { location: 'Kochi Coast', depth: 0, temp: 28.9, salinity: 35.1, date: '2024-01-15' },
    { location: 'Kolkata Coast', depth: 0, temp: 27.8, salinity: 34.6, date: '2024-01-15' },
    { location: 'Arabian Sea-1', depth: 200, temp: 20.5, salinity: 35.7, date: '2024-01-15' },
    { location: 'Bay of Bengal-1', depth: 180, temp: 21.8, salinity: 35.3, date: '2024-01-15' },
    { location: 'Indian Ocean-1', depth: 300, temp: 18.4, salinity: 35.7, date: '2024-01-15' },
  ], []);

  const [selectedRegion, setSelectedRegion] = React.useState<keyof typeof depthProfiles>('Arabian Sea');

  return (
    <div className="space-y-6">
      {/* Region Selection */}
      <div className="flex gap-2 mb-4">
        {Object.keys(depthProfiles).map((region) => (
          <button
            key={region}
            onClick={() => setSelectedRegion(region as keyof typeof depthProfiles)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedRegion === region
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80 text-muted-foreground'
            }`}
          >
            {region}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Temperature vs Depth Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Thermometer className="h-5 w-5 text-orange-500" />
              <span>Temperature Depth Profile - {selectedRegion}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={depthProfiles[selectedRegion]} margin={{ left: 20, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="temperature" 
                  stroke="#9CA3AF"
                  label={{ value: 'Temperature (°C)', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  dataKey="depth" 
                  reversed 
                  stroke="#9CA3AF"
                  label={{ value: 'Depth (m)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                  formatter={(value, name) => [
                    `${value}${name === 'temperature' ? '°C' : 'm'}`,
                    name === 'temperature' ? 'Temperature' : 'Depth'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="temperature" 
                  stroke="#F97316" 
                  strokeWidth={3}
                  dot={{ fill: '#F97316', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#F97316', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Salinity vs Depth Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Droplets className="h-5 w-5 text-blue-500" />
              <span>Salinity Depth Profile - {selectedRegion}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={depthProfiles[selectedRegion]} margin={{ left: 20, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="salinity" 
                  stroke="#9CA3AF"
                  label={{ value: 'Salinity (PSU)', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  dataKey="depth" 
                  reversed 
                  stroke="#9CA3AF"
                  label={{ value: 'Depth (m)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                  formatter={(value, name) => [
                    `${value}${name === 'salinity' ? ' PSU' : 'm'}`,
                    name === 'salinity' ? 'Salinity' : 'Depth'
                  ]}
                />
                <Area 
                  type="monotone" 
                  dataKey="salinity" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  fill="url(#salinityGradient)"
                />
                <defs>
                  <linearGradient id="salinityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Measurements Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Recent ARGO Float Measurements</span>
            <Badge variant="secondary">Live Data</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {recentData.map((data, index) => (
              <div key={index} className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">{data.location}</h4>
                  <Badge variant="outline" className="text-xs">{data.depth}m</Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-1">
                      <Thermometer className="h-3 w-3 text-orange-500" />
                      <span>Temp</span>
                    </span>
                    <span className="font-medium text-orange-600">{data.temp}°C</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-1">
                      <Droplets className="h-3 w-3 text-blue-500" />
                      <span>Salinity</span>
                    </span>
                    <span className="font-medium text-blue-600">{data.salinity} PSU</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <TrendingDown className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold text-orange-600">-15°C</p>
                <p className="text-xs text-muted-foreground">Temperature drop from surface to 1000m</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-blue-600">35.8 PSU</p>
                <p className="text-xs text-muted-foreground">Peak salinity at 200m depth</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Thermometer className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-green-600">29.1°C</p>
                <p className="text-xs text-muted-foreground">Highest surface temperature (Bay of Bengal)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TemperatureProfiles;

