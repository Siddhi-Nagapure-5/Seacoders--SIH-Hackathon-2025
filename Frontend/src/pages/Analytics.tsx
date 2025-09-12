import React, { useState, useEffect, useMemo } from 'react';
import FloatChatHeader from '@/components/FloatChatHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, ComposedChart } from 'recharts';
import { TrendingUp, TrendingDown, Activity, Calendar, Thermometer, Droplets, Navigation, Wifi, AlertCircle, CheckCircle } from 'lucide-react';

// Generate real-time data simulation
const useRealTimeData = () => {
  const [realTimeData, setRealTimeData] = useState({
    currentTemp: 18.5,
    currentSalinity: 35.2,
    floatStatus: 'online',
    dataQuality: 98.7,
    lastUpdate: new Date()
  });

  const [liveMetrics, setLiveMetrics] = useState<Array<{time: string, temp: number, salinity: number, quality: number}>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        currentTemp: prev.currentTemp + (Math.random() - 0.5) * 0.2,
        currentSalinity: prev.currentSalinity + (Math.random() - 0.5) * 0.05,
        floatStatus: Math.random() > 0.05 ? 'online' : 'offline',
        dataQuality: Math.max(95, Math.min(100, prev.dataQuality + (Math.random() - 0.5) * 0.5)),
        lastUpdate: new Date()
      }));

      // Add new data point for live chart
      setLiveMetrics(prev => {
        const newPoint = {
          time: new Date().toLocaleTimeString(),
          temp: 18.5 + Math.random() * 2 - 1,
          salinity: 35.2 + Math.random() * 0.1 - 0.05,
          quality: 95 + Math.random() * 5
        };
        return [...prev.slice(-19), newPoint]; // Keep last 20 points
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return { realTimeData, liveMetrics };
};

const Analytics = () => {
  const [activeView, setActiveView] = useState<'historical' | 'realtime' | 'trends'>('historical');
  const { realTimeData, liveMetrics } = useRealTimeData();

  // Historical data for 6 months view
  const historicalData = useMemo(() => ({
    temperatureData: [
      { month: 'Jul', temp: 16.2, salinity: 35.1, quality: 98.2 },
      { month: 'Aug', temp: 15.8, salinity: 35.2, quality: 97.8 },
      { month: 'Sep', temp: 16.5, salinity: 35.0, quality: 98.5 },
      { month: 'Oct', temp: 17.1, salinity: 34.9, quality: 98.1 },
      { month: 'Nov', temp: 18.3, salinity: 34.8, quality: 98.9 },
      { month: 'Dec', temp: 19.7, salinity: 34.7, quality: 98.7 },
    ],
    regionData: [
      { name: 'Pacific', value: 1247, color: '#0ea5e9' },
      { name: 'Atlantic', value: 892, color: '#3b82f6' },
      { name: 'Indian', value: 718, color: '#1d4ed8' },
      { name: 'Southern', value: 634, color: '#1e40af' },
    ],
    deploymentData: [
      { month: 'Jul', deployed: 45, recovered: 32, active: 3815 },
      { month: 'Aug', deployed: 52, recovered: 28, active: 3839 },
      { month: 'Sep', deployed: 38, recovered: 41, active: 3836 },
      { month: 'Oct', deployed: 61, recovered: 35, active: 3862 },
      { month: 'Nov', deployed: 47, recovered: 39, active: 3870 },
      { month: 'Dec', deployed: 54, recovered: 42, active: 3882 },
    ]
  }), []);

  // Trend analysis data
  const trendData = useMemo(() => ({
    yearlyTrends: [
      { year: '2020', temp: 17.2, salinity: 35.0, co2: 415 },
      { year: '2021', temp: 17.8, salinity: 34.9, co2: 418 },
      { year: '2022', temp: 18.1, salinity: 34.8, co2: 421 },
      { year: '2023', temp: 18.4, salinity: 34.8, co2: 424 },
      { year: '2024', temp: 18.7, salinity: 34.7, co2: 427 },
    ],
    anomalies: [
      { month: 'Jul', tempAnomaly: -0.3, salinityAnomaly: 0.1 },
      { month: 'Aug', tempAnomaly: -0.7, salinityAnomaly: 0.2 },
      { month: 'Sep', tempAnomaly: -0.2, salinityAnomaly: 0.0 },
      { month: 'Oct', tempAnomaly: 0.4, salinityAnomaly: -0.1 },
      { month: 'Nov', tempAnomaly: 1.0, salinityAnomaly: -0.2 },
      { month: 'Dec', tempAnomaly: 1.8, salinityAnomaly: -0.3 },
    ]
  }), []);

  const getCurrentKPIs = () => {
    switch (activeView) {
      case 'realtime':
        return {
          mainMetric: realTimeData.currentTemp.toFixed(1),
          mainUnit: '°C',
          mainLabel: 'Current Temperature',
          mainTrend: realTimeData.currentTemp > 18.5 ? 'up' : 'down',
          secondaryMetric: realTimeData.currentSalinity.toFixed(2),
          secondaryUnit: 'PSU',
          secondaryLabel: 'Current Salinity',
          tertiaryMetric: realTimeData.dataQuality.toFixed(1),
          tertiaryUnit: '%',
          tertiaryLabel: 'Data Quality',
          quaternaryMetric: realTimeData.floatStatus === 'online' ? '98.5' : '89.2',
          quaternaryUnit: '%',
          quaternaryLabel: 'System Uptime'
        };
      case 'trends':
        return {
          mainMetric: '18.7',
          mainUnit: '°C',
          mainLabel: '5-Year Avg Temperature',
          mainTrend: 'up',
          secondaryMetric: '34.8',
          secondaryUnit: 'PSU',
          secondaryLabel: '5-Year Avg Salinity',
          tertiaryMetric: '+1.5',
          tertiaryUnit: '°C',
          tertiaryLabel: 'Temperature Increase',
          quaternaryMetric: '427',
          quaternaryUnit: 'ppm',
          quaternaryLabel: 'Atmospheric CO₂'
        };
      default:
        return {
          mainMetric: '17.3',
          mainUnit: '°C',
          mainLabel: 'Avg Temperature',
          mainTrend: 'up',
          secondaryMetric: '34.9',
          secondaryUnit: 'PSU',
          secondaryLabel: 'Avg Salinity',
          tertiaryMetric: '98.7',
          tertiaryUnit: '%',
          tertiaryLabel: 'Data Reliability',
          quaternaryMetric: '89.3',
          quaternaryUnit: '%',
          quaternaryLabel: 'Coverage Area'
        };
    }
  };

  const kpis = getCurrentKPIs();

  return (
    <div className="min-h-screen bg-background">
      <FloatChatHeader />
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-ocean-gradient bg-clip-text text-transparent mb-4">
                Ocean Data Analytics
              </h1>
              <p className="text-xl text-muted-foreground">
                Advanced analytics and insights from global ocean observations
              </p>
            </div>
            {activeView === 'realtime' && (
              <div className="flex items-center space-x-2">
                {realTimeData.floatStatus === 'online' ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
                <Badge variant={realTimeData.floatStatus === 'online' ? 'default' : 'destructive'}>
                  {realTimeData.floatStatus === 'online' ? 'Live' : 'Offline'}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Updated: {realTimeData.lastUpdate.toLocaleTimeString()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Analytics Controls */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button 
            variant={activeView === 'historical' ? "default" : "outline"}
            className={activeView === 'historical' ? "bg-primary" : ""}
            onClick={() => setActiveView('historical')}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Last 6 Months
          </Button>
          <Button 
            variant={activeView === 'realtime' ? "default" : "outline"}
            className={activeView === 'realtime' ? "bg-primary" : ""}
            onClick={() => setActiveView('realtime')}
          >
            <Activity className="h-4 w-4 mr-2" />
            Real-time
          </Button>
          <Button 
            variant={activeView === 'trends' ? "default" : "outline"}
            className={activeView === 'trends' ? "bg-primary" : ""}
            onClick={() => setActiveView('trends')}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Trends
          </Button>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="relative">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpis.mainLabel}</CardTitle>
              {kpis.mainTrend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {kpis.mainMetric}{kpis.mainUnit}
              </div>
              <p className="text-xs text-muted-foreground">
                {activeView === 'realtime' ? 'Live reading' : 'Historical average'}
              </p>
              {activeView === 'realtime' && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              )}
            </CardContent>
          </Card>

          <Card className="relative">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpis.secondaryLabel}</CardTitle>
              <Droplets className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {kpis.secondaryMetric} {kpis.secondaryUnit}
              </div>
              <p className="text-xs text-muted-foreground">
                {activeView === 'realtime' ? 'Live reading' : 'Historical average'}
              </p>
              {activeView === 'realtime' && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpis.tertiaryLabel}</CardTitle>
              <Thermometer className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {kpis.tertiaryMetric}{kpis.tertiaryUnit}
              </div>
              <p className="text-xs text-muted-foreground">
                {activeView === 'trends' ? '5-year change' : 'Current status'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpis.quaternaryLabel}</CardTitle>
              <Navigation className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {kpis.quaternaryMetric}{kpis.quaternaryUnit}
              </div>
              <p className="text-xs text-muted-foreground">
                {activeView === 'trends' ? 'Current level' : 'System performance'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Conditional Content Based on Active View */}
        {activeView === 'historical' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Temperature & Salinity Trends (6 Months)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={historicalData.temperatureData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }}
                    />
                    <Line type="monotone" dataKey="temp" stroke="#F97316" strokeWidth={3} name="Temperature (°C)" />
                    <Line type="monotone" dataKey="salinity" stroke="#3B82F6" strokeWidth={3} name="Salinity (PSU)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Float Distribution by Ocean</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={historicalData.regionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {historicalData.regionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Float Deployment & Recovery Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={historicalData.deploymentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }}
                    />
                    <Bar dataKey="deployed" fill="#10B981" name="Deployed" />
                    <Bar dataKey="recovered" fill="#F59E0B" name="Recovered" />
                    <Line type="monotone" dataKey="active" stroke="#EF4444" strokeWidth={3} name="Total Active" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {activeView === 'realtime' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-primary" />
                  <span>Live Ocean Data Stream</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={liveMetrics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }}
                    />
                    <Line type="monotone" dataKey="temp" stroke="#F97316" strokeWidth={2} dot={false} name="Temperature (°C)" />
                    <Line type="monotone" dataKey="salinity" stroke="#3B82F6" strokeWidth={2} dot={false} name="Salinity (PSU)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Status Monitor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold text-green-600">{liveMetrics.length}</div>
                    <div className="text-xs text-muted-foreground">Data Points</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold text-blue-600">{Math.floor(Math.random() * 15) + 5}/min</div>
                    <div className="text-xs text-muted-foreground">Update Rate</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold text-orange-600">{Math.floor(Math.random() * 3) + 2}ms</div>
                    <div className="text-xs text-muted-foreground">Latency</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold text-purple-600">
                      {realTimeData.floatStatus === 'online' ? '3,847' : '3,821'}
                    </div>
                    <div className="text-xs text-muted-foreground">Active Floats</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span className="text-sm font-medium">Network Status</span>
                    <Badge variant={realTimeData.floatStatus === 'online' ? 'default' : 'destructive'}>
                      {realTimeData.floatStatus === 'online' ? 'Connected' : 'Disconnected'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span className="text-sm font-medium">Data Quality</span>
                    <Badge variant="secondary">{realTimeData.dataQuality.toFixed(1)}%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span className="text-sm font-medium">Last Update</span>
                    <span className="text-sm text-muted-foreground">{realTimeData.lastUpdate.toLocaleTimeString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeView === 'trends' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>5-Year Climate Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={trendData.yearlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="year" stroke="#9CA3AF" />
                    <YAxis yAxisId="temp" stroke="#9CA3AF" />
                    <YAxis yAxisId="co2" orientation="right" stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }}
                    />
                    <Area yAxisId="temp" type="monotone" dataKey="temp" stroke="#F97316" fill="#F9731650" name="Temperature (°C)" />
                    <Line yAxisId="co2" type="monotone" dataKey="co2" stroke="#EF4444" strokeWidth={3} name="CO₂ (ppm)" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Temperature Anomalies</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={trendData.anomalies}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }}
                    />
                    <Bar dataKey="tempAnomaly" fill="#F97316" name="Temperature Anomaly (°C)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Climate Change Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 rounded-lg bg-gradient-to-br from-red-500/10 to-red-600/20 border border-red-500/20">
                    <TrendingUp className="h-8 w-8 text-red-500 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-red-600">+1.5°C</div>
                    <div className="text-sm text-muted-foreground">Ocean warming since 2020</div>
                  </div>
                  <div className="text-center p-6 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/20 border border-blue-500/20">
                    <TrendingDown className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-blue-600">-0.3 PSU</div>
                    <div className="text-sm text-muted-foreground">Average salinity decrease</div>
                  </div>
                  <div className="text-center p-6 rounded-lg bg-gradient-to-br from-orange-500/10 to-orange-600/20 border border-orange-500/20">
                    <TrendingUp className="h-8 w-8 text-orange-500 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-orange-600">12 ppm</div>
                    <div className="text-sm text-muted-foreground">CO₂ increase since 2020</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Analytics;