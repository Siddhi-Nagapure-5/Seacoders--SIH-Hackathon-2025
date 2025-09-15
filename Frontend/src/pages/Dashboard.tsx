import React, { useState, useEffect, useCallback } from 'react';
import AquaIntelHeader from '@/components/AquaIntelHeader';
import OceanBackground from '@/components/OceanBackground';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Waves, Thermometer, Droplets, Navigation, Activity, Wifi, WifiOff, AlertTriangle, CheckCircle } from 'lucide-react';

// Animated Counter Hook
const useAnimatedCounter = (target: number, duration = 2000) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * target));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);
  
  return count;
};

// Live Data Simulation Hook
const useLiveData = () => {
  const [liveData, setLiveData] = useState({
    activeFloats: 3847,
    dataPoints: 24891,
    coverage: 89.3,
    quality: 98.7,
    systemHealth: {
      dataProcessing: 95,
      networkConnectivity: 89,
      storageCapacity: 67,
      apiUptime: 99.9
    },
    isConnected: true,
    lastUpdate: new Date()
  });
  
  const [floatDeployments, setFloatDeployments] = useState([
    { id: 'WMO4902915', location: 'North Atlantic', status: 'Active', time: new Date(Date.now() - 2 * 60 * 60 * 1000), temp: 18.5, depth: 1250 },
    { id: 'WMO4902916', location: 'Pacific Ocean', status: 'Deployed', time: new Date(Date.now() - 5 * 60 * 60 * 1000), temp: 22.3, depth: 890 },
    { id: 'WMO4902917', location: 'Southern Ocean', status: 'Active', time: new Date(Date.now() - 24 * 60 * 60 * 1000), temp: 4.2, depth: 2100 },
    { id: 'WMO4902918', location: 'Indian Ocean', status: 'Calibrating', time: new Date(Date.now() - 30 * 60 * 1000), temp: 26.8, depth: 450 },
  ]);
  
  const [recentAlerts, setRecentAlerts] = useState([
    { id: 1, type: 'info', message: 'New float deployed in Arabian Sea', time: new Date(Date.now() - 15 * 60 * 1000) },
    { id: 2, type: 'warning', message: 'Connectivity issues with WMO4902910', time: new Date(Date.now() - 45 * 60 * 1000) },
    { id: 3, type: 'success', message: 'Data quality check completed successfully', time: new Date(Date.now() - 2 * 60 * 60 * 1000) }
  ]);
  
  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        ...prev,
        activeFloats: prev.activeFloats + Math.floor(Math.random() * 3) - 1, // Small random changes
        dataPoints: prev.dataPoints + Math.floor(Math.random() * 50) + 10,
        coverage: Math.max(85, Math.min(95, prev.coverage + (Math.random() - 0.5) * 0.1)),
        quality: Math.max(95, Math.min(99.9, prev.quality + (Math.random() - 0.5) * 0.1)),
        systemHealth: {
          dataProcessing: Math.max(90, Math.min(99, prev.systemHealth.dataProcessing + (Math.random() - 0.5) * 2)),
          networkConnectivity: Math.max(80, Math.min(98, prev.systemHealth.networkConnectivity + (Math.random() - 0.5) * 3)),
          storageCapacity: Math.max(60, Math.min(80, prev.systemHealth.storageCapacity + (Math.random() - 0.5) * 1)),
          apiUptime: Math.max(99.5, Math.min(100, prev.systemHealth.apiUptime + (Math.random() - 0.5) * 0.1))
        },
        isConnected: Math.random() > 0.05, // 95% uptime simulation
        lastUpdate: new Date()
      }));
      
      // Occasionally add new float deployments
      if (Math.random() < 0.1) {
        const locations = ['Arabian Sea', 'Bay of Bengal', 'Mediterranean Sea', 'North Pacific', 'South Atlantic'];
        const statuses = ['Active', 'Deployed', 'Calibrating', 'Testing'];
        const newFloat = {
          id: `WMO490${Math.floor(Math.random() * 9000) + 1000}`,
          location: locations[Math.floor(Math.random() * locations.length)],
          status: statuses[Math.floor(Math.random() * statuses.length)],
          time: new Date(),
          temp: Math.random() * 25 + 5,
          depth: Math.floor(Math.random() * 2000) + 100
        };
        
        setFloatDeployments(prev => [newFloat, ...prev.slice(0, 4)]);
        
        // Add corresponding alert
        const newAlert = {
          id: Date.now(),
          type: 'info' as const,
          message: `New float ${newFloat.id} deployed in ${newFloat.location}`,
          time: new Date()
        };
        setRecentAlerts(prev => [newAlert, ...prev.slice(0, 2)]);
      }
    }, 3000); // Update every 3 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  return { liveData, floatDeployments, recentAlerts };
};

// Format time ago
const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'Just now';
};

const Dashboard = () => {
  const { liveData, floatDeployments, recentAlerts } = useLiveData();
  
  // Animated counters for main metrics
  const animatedFloats = useAnimatedCounter(liveData.activeFloats);
  const animatedDataPoints = useAnimatedCounter(liveData.dataPoints);
  
  return (
    <div className="min-h-screen bg-background relative">
      <OceanBackground />
      <AquaIntelHeader />
      <main className="container mx-auto px-6 py-8 relative z-10">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-ocean-gradient bg-clip-text text-transparent mb-4">
                Ocean Data Dashboard
              </h1>
              <p className="text-xl text-muted-foreground">
                Real-time monitoring of global ARGO float network
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {liveData.isConnected ? (
                <>
                  <Wifi className="h-5 w-5 text-green-500" />
                  <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20">
                    Live
                  </Badge>
                </>
              ) : (
                <>
                  <WifiOff className="h-5 w-5 text-red-500" />
                  <Badge variant="secondary" className="bg-red-500/10 text-red-600 border-red-500/20">
                    Offline
                  </Badge>
                </>
              )}
              <span className="text-xs text-muted-foreground">
                Last update: {liveData.lastUpdate.toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Floats</CardTitle>
              <Waves className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {animatedFloats.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {liveData.activeFloats > 3847 ? '+' : ''}{((liveData.activeFloats - 3847) / 3847 * 100).toFixed(1)}% from baseline
              </p>
              {liveData.isConnected && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              )}
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Data Points Today</CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {animatedDataPoints.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Temperature & salinity readings
              </p>
              {liveData.isConnected && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              )}
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ocean Coverage</CardTitle>
              <Navigation className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {liveData.coverage.toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">
                Global ocean monitoring
              </p>
              <Progress value={liveData.coverage} className="h-1 mt-2" />
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Data Quality</CardTitle>
              <Droplets className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {liveData.quality.toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">
                Quality assurance score
              </p>
              <Progress value={liveData.quality} className="h-1 mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Recent Float Deployments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recent Float Activity</span>
                <Badge variant="outline" className="text-xs">
                  {floatDeployments.length} Active
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {floatDeployments.map((float) => (
                <div key={float.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium font-mono text-sm">{float.id}</p>
                    <p className="text-sm text-muted-foreground">{float.location}</p>
                    <div className="flex items-center space-x-3 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center space-x-1">
                        <Thermometer className="h-3 w-3" />
                        <span>{float.temp.toFixed(1)}°C</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Navigation className="h-3 w-3" />
                        <span>{float.depth}m</span>
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={
                      float.status === 'Active' ? 'default' : 
                      float.status === 'Deployed' ? 'secondary' : 
                      float.status === 'Calibrating' ? 'outline' : 'destructive'
                    } className="text-xs">
                      {float.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{formatTimeAgo(float.time)}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* System Health removed as requested */}

          {/* Recent Alerts & Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recent Alerts</span>
                <Badge variant="secondary" className="text-xs">
                  {recentAlerts.length} New
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="mt-0.5">
                    {alert.type === 'success' && <CheckCircle className="h-4 w-4 text-green-500" />}
                    {alert.type === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                    {alert.type === 'info' && <Activity className="h-4 w-4 text-blue-500" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{formatTimeAgo(alert.time)}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Data Stream Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-primary" />
              <span>Live Data Stream</span>
              {liveData.isConnected && (
                <div className="flex items-center space-x-1 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium">STREAMING</span>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3 rounded-lg bg-muted/50">
                <div className="text-lg font-bold text-blue-600">{(liveData.dataPoints / 1000).toFixed(1)}K</div>
                <div className="text-xs text-muted-foreground">Today's Data Points</div>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <div className="text-lg font-bold text-green-600">{Math.floor(Math.random() * 15) + 5}/min</div>
                <div className="text-xs text-muted-foreground">Incoming Rate</div>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <div className="text-lg font-bold text-orange-600">{Math.floor(Math.random() * 3) + 2}ms</div>
                <div className="text-xs text-muted-foreground">Avg Latency</div>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <div className="text-lg font-bold text-purple-600">24/7</div>
                <div className="text-xs text-muted-foreground">Monitoring</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;