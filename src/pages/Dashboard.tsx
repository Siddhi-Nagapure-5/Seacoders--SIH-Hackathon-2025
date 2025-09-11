import React from 'react';
import FloatChatHeader from '@/components/FloatChatHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Waves, Thermometer, Droplets, Navigation, Activity } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <FloatChatHeader />
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-ocean-gradient bg-clip-text text-transparent mb-4">
            Ocean Data Dashboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Real-time monitoring of global ARGO float network
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Floats</CardTitle>
              <Waves className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,847</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Data Points Today</CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24,891</div>
              <p className="text-xs text-muted-foreground">
                Temperature & salinity readings
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ocean Coverage</CardTitle>
              <Navigation className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89.3%</div>
              <p className="text-xs text-muted-foreground">
                Global ocean monitoring
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Data Quality</CardTitle>
              <Droplets className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98.7%</div>
              <p className="text-xs text-muted-foreground">
                Quality assurance score
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Float Deployments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { id: 'WMO4902915', location: 'North Atlantic', status: 'Active', time: '2 hours ago' },
                { id: 'WMO4902916', location: 'Pacific Ocean', status: 'Deployed', time: '5 hours ago' },
                { id: 'WMO4902917', location: 'Southern Ocean', status: 'Active', time: '1 day ago' },
              ].map((float) => (
                <div key={float.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">{float.id}</p>
                    <p className="text-sm text-muted-foreground">{float.location}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary">{float.status}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">{float.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Data Processing</span>
                  <span>95%</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Network Connectivity</span>
                  <span>89%</span>
                </div>
                <Progress value={89} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Storage Capacity</span>
                  <span>67%</span>
                </div>
                <Progress value={67} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>API Uptime</span>
                  <span>99.9%</span>
                </div>
                <Progress value={99.9} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;