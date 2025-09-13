import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Area, AreaChart, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Thermometer, Droplets, Wind, Waves } from 'lucide-react';

const TrendAnalysis: React.FC = () => {
  // Historical temperature trends over the past year
  const temperatureTrends = useMemo(() => [
    { month: 'Jan', arabianSea: 26.2, bayOfBengal: 26.8, indianOcean: 27.1, avgTemp: 26.7 },
    { month: 'Feb', arabianSea: 26.8, bayOfBengal: 27.2, indianOcean: 27.5, avgTemp: 27.2 },
    { month: 'Mar', arabianSea: 27.9, bayOfBengal: 28.1, indianOcean: 28.2, avgTemp: 28.1 },
    { month: 'Apr', arabianSea: 28.8, bayOfBengal: 29.2, indianOcean: 29.0, avgTemp: 29.0 },
    { month: 'May', arabianSea: 29.5, bayOfBengal: 30.1, indianOcean: 29.8, avgTemp: 29.8 },
    { month: 'Jun', arabianSea: 29.2, bayOfBengal: 29.8, indianOcean: 29.5, avgTemp: 29.5 },
    { month: 'Jul', arabianSea: 28.1, bayOfBengal: 28.9, indianOcean: 28.6, avgTemp: 28.5 },
    { month: 'Aug', arabianSea: 27.8, bayOfBengal: 28.6, indianOcean: 28.2, avgTemp: 28.2 },
    { month: 'Sep', arabianSea: 28.2, bayOfBengal: 28.9, indianOcean: 28.5, avgTemp: 28.5 },
    { month: 'Oct', arabianSea: 28.6, bayOfBengal: 29.1, indianOcean: 28.9, avgTemp: 28.9 },
    { month: 'Nov', arabianSea: 27.9, bayOfBengal: 28.5, indianOcean: 28.2, avgTemp: 28.2 },
    { month: 'Dec', arabianSea: 26.9, bayOfBengal: 27.3, indianOcean: 27.1, avgTemp: 27.1 },
  ], []);

  // Salinity trends over the year
  const salinityTrends = useMemo(() => [
    { month: 'Jan', arabianSea: 36.5, bayOfBengal: 34.2, indianOcean: 35.1 },
    { month: 'Feb', arabianSea: 36.4, bayOfBengal: 34.4, indianOcean: 35.2 },
    { month: 'Mar', arabianSea: 36.2, bayOfBengal: 34.6, indianOcean: 35.3 },
    { month: 'Apr', arabianSea: 36.0, bayOfBengal: 34.8, indianOcean: 35.4 },
    { month: 'May', arabianSea: 35.9, bayOfBengal: 34.9, indianOcean: 35.5 },
    { month: 'Jun', arabianSea: 35.8, bayOfBengal: 34.7, indianOcean: 35.3 },
    { month: 'Jul', arabianSea: 36.1, bayOfBengal: 34.5, indianOcean: 35.2 },
    { month: 'Aug', arabianSea: 36.2, bayOfBengal: 34.6, indianOcean: 35.3 },
    { month: 'Sep', arabianSea: 36.3, bayOfBengal: 34.8, indianOcean: 35.4 },
    { month: 'Oct', arabianSea: 36.4, bayOfBengal: 34.9, indianOcean: 35.5 },
    { month: 'Nov', arabianSea: 36.6, bayOfBengal: 34.7, indianOcean: 35.4 },
    { month: 'Dec', arabianSea: 36.7, bayOfBengal: 34.5, indianOcean: 35.2 },
  ], []);

  // Ocean current strength and wind patterns
  const environmentalTrends = useMemo(() => [
    { month: 'Jan', currentStrength: 0.45, windSpeed: 12.3, waveHeight: 1.8 },
    { month: 'Feb', currentStrength: 0.52, windSpeed: 13.1, waveHeight: 2.1 },
    { month: 'Mar', currentStrength: 0.68, windSpeed: 15.2, waveHeight: 2.5 },
    { month: 'Apr', currentStrength: 0.74, windSpeed: 16.8, waveHeight: 2.8 },
    { month: 'May', currentStrength: 0.82, windSpeed: 18.5, waveHeight: 3.2 },
    { month: 'Jun', currentStrength: 0.91, windSpeed: 22.1, waveHeight: 4.1 },
    { month: 'Jul', currentStrength: 0.96, windSpeed: 25.3, waveHeight: 4.8 },
    { month: 'Aug', currentStrength: 0.89, windSpeed: 23.7, waveHeight: 4.2 },
    { month: 'Sep', currentStrength: 0.78, windSpeed: 19.8, waveHeight: 3.5 },
    { month: 'Oct', currentStrength: 0.65, windSpeed: 16.4, waveHeight: 2.9 },
    { month: 'Nov', currentStrength: 0.58, windSpeed: 14.2, waveHeight: 2.3 },
    { month: 'Dec', currentStrength: 0.48, windSpeed: 12.8, waveHeight: 1.9 },
  ], []);

  const [selectedMetric, setSelectedMetric] = React.useState<'temperature' | 'salinity' | 'environmental'>('temperature');

  const getChangePercentage = (data: any[], key: string) => {
    const first = data[0][key];
    const last = data[data.length - 1][key];
    return ((last - first) / first * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Metric Selection */}
      <div className="flex gap-2 mb-4">
        <Button
          variant={selectedMetric === 'temperature' ? 'default' : 'outline'}
          onClick={() => setSelectedMetric('temperature')}
          className="flex items-center space-x-2"
        >
          <Thermometer className="h-4 w-4" />
          <span>Temperature</span>
        </Button>
        <Button
          variant={selectedMetric === 'salinity' ? 'default' : 'outline'}
          onClick={() => setSelectedMetric('salinity')}
          className="flex items-center space-x-2"
        >
          <Droplets className="h-4 w-4" />
          <span>Salinity</span>
        </Button>
        <Button
          variant={selectedMetric === 'environmental' ? 'default' : 'outline'}
          onClick={() => setSelectedMetric('environmental')}
          className="flex items-center space-x-2"
        >
          <Wind className="h-4 w-4" />
          <span>Environmental</span>
        </Button>
      </div>

      {/* Main Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>
            {selectedMetric === 'temperature' && '🌡️ Temperature Trends Across Indian Ocean Regions'}
            {selectedMetric === 'salinity' && '💧 Salinity Variations Throughout the Year'}
            {selectedMetric === 'environmental' && '🌊 Environmental Factors & Ocean Dynamics'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            {selectedMetric === 'temperature' && (
              <LineChart data={temperatureTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" domain={['dataMin - 1', 'dataMax + 1']} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                />
                <Line type="monotone" dataKey="arabianSea" stroke="#EF4444" strokeWidth={3} name="Arabian Sea" />
                <Line type="monotone" dataKey="bayOfBengal" stroke="#3B82F6" strokeWidth={3} name="Bay of Bengal" />
                <Line type="monotone" dataKey="indianOcean" stroke="#10B981" strokeWidth={3} name="Indian Ocean" />
                <Line type="monotone" dataKey="avgTemp" stroke="#F59E0B" strokeWidth={2} strokeDasharray="5 5" name="Average" />
              </LineChart>
            )}
            
            {selectedMetric === 'salinity' && (
              <AreaChart data={salinityTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" domain={['dataMin - 0.5', 'dataMax + 0.5']} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                />
                <Area type="monotone" dataKey="arabianSea" stackId="1" stroke="#EF4444" fill="#EF444450" name="Arabian Sea" />
                <Area type="monotone" dataKey="bayOfBengal" stackId="2" stroke="#3B82F6" fill="#3B82F650" name="Bay of Bengal" />
                <Area type="monotone" dataKey="indianOcean" stackId="3" stroke="#10B981" fill="#10B98150" name="Indian Ocean" />
              </AreaChart>
            )}
            
            {selectedMetric === 'environmental' && (
              <ComposedChart data={environmentalTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis yAxisId="left" stroke="#9CA3AF" />
                <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                />
                <Bar yAxisId="left" dataKey="currentStrength" fill="#8B5CF6" name="Current Strength (m/s)" />
                <Line yAxisId="right" type="monotone" dataKey="windSpeed" stroke="#F59E0B" strokeWidth={3} name="Wind Speed (km/h)" />
                <Line yAxisId="right" type="monotone" dataKey="waveHeight" stroke="#06B6D4" strokeWidth={3} name="Wave Height (m)" />
              </ComposedChart>
            )}
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {selectedMetric === 'temperature' && (
          <>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-8 w-8 text-red-500" />
                    <div>
                      <p className="text-2xl font-bold text-red-600">+{getChangePercentage(temperatureTrends, 'avgTemp')}%</p>
                      <p className="text-xs text-muted-foreground">Annual temperature change</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Thermometer className="h-8 w-8 text-orange-500" />
                  <div>
                    <p className="text-2xl font-bold text-orange-600">30.1°C</p>
                    <p className="text-xs text-muted-foreground">Peak temperature (May, Bay of Bengal)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <TrendingDown className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold text-blue-600">26.2°C</p>
                    <p className="text-xs text-muted-foreground">Lowest temperature (Jan, Arabian Sea)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Waves className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold text-green-600">3.9°C</p>
                    <p className="text-xs text-muted-foreground">Seasonal variation range</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {selectedMetric === 'salinity' && (
          <>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold text-blue-600">+0.5%</p>
                    <p className="text-xs text-muted-foreground">Arabian Sea salinity increase</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Droplets className="h-8 w-8 text-cyan-500" />
                  <div>
                    <p className="text-2xl font-bold text-cyan-600">36.7</p>
                    <p className="text-xs text-muted-foreground">Peak salinity (PSU)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <TrendingDown className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold text-green-600">34.2</p>
                    <p className="text-xs text-muted-foreground">Lowest salinity (Bay of Bengal)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Waves className="h-8 w-8 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold text-purple-600">2.5</p>
                    <p className="text-xs text-muted-foreground">Regional variation (PSU)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {selectedMetric === 'environmental' && (
          <>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Wind className="h-8 w-8 text-yellow-500" />
                  <div>
                    <p className="text-2xl font-bold text-yellow-600">25.3</p>
                    <p className="text-xs text-muted-foreground">Peak wind speed (km/h)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Waves className="h-8 w-8 text-cyan-500" />
                  <div>
                    <p className="text-2xl font-bold text-cyan-600">4.8m</p>
                    <p className="text-xs text-muted-foreground">Maximum wave height</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-8 w-8 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold text-purple-600">0.96</p>
                    <p className="text-xs text-muted-foreground">Strongest current (m/s)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <TrendingDown className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold text-green-600">Jun-Aug</p>
                    <p className="text-xs text-muted-foreground">Monsoon peak season</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Analysis Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>Key Insights & Trends</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-orange-600">🌡️ Temperature Patterns</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full bg-red-500" />
                  <span>Bay of Bengal shows highest seasonal temperatures</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full bg-blue-500" />
                  <span>Arabian Sea maintains more stable temperature profile</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full bg-green-500" />
                  <span>Peak warming occurs during pre-monsoon (April-May)</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-blue-600">💧 Salinity Dynamics</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full bg-cyan-500" />
                  <span>Arabian Sea consistently higher salinity due to evaporation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full bg-blue-500" />
                  <span>Bay of Bengal lower salinity from river discharge</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full bg-purple-500" />
                  <span>Monsoon season shows salinity fluctuations</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendAnalysis;

