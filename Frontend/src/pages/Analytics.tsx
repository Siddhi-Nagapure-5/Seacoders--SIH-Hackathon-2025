import React from 'react';
import FloatChatHeader from '@/components/FloatChatHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Activity, Calendar } from 'lucide-react';

const Analytics = () => {
  // Sample data for charts
  const temperatureData = [
    { month: 'Jan', temp: 16.2, salinity: 35.1 },
    { month: 'Feb', temp: 15.8, salinity: 35.2 },
    { month: 'Mar', temp: 16.5, salinity: 35.0 },
    { month: 'Apr', temp: 17.1, salinity: 34.9 },
    { month: 'May', temp: 18.3, salinity: 34.8 },
    { month: 'Jun', temp: 19.7, salinity: 34.7 },
  ];

  const regionData = [
    { name: 'Pacific', value: 1247, color: '#0ea5e9' },
    { name: 'Atlantic', value: 892, color: '#3b82f6' },
    { name: 'Indian', value: 718, color: '#1d4ed8' },
    { name: 'Southern', value: 634, color: '#1e40af' },
  ];

  const deploymentData = [
    { month: 'Jan', deployed: 45, recovered: 32 },
    { month: 'Feb', deployed: 52, recovered: 28 },
    { month: 'Mar', deployed: 38, recovered: 41 },
    { month: 'Apr', deployed: 61, recovered: 35 },
    { month: 'May', deployed: 47, recovered: 39 },
    { month: 'Jun', deployed: 54, recovered: 42 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <FloatChatHeader />
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-ocean-gradient bg-clip-text text-transparent mb-4">
            Ocean Data Analytics
          </h1>
          <p className="text-xl text-muted-foreground">
            Advanced analytics and insights from global ocean observations
          </p>
        </div>

        {/* Analytics Controls */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button variant="default" className="bg-primary">
            <Calendar className="h-4 w-4 mr-2" />
            Last 6 Months
          </Button>
          <Button variant="outline">
            <Activity className="h-4 w-4 mr-2" />
            Real-time
          </Button>
          <Button variant="outline">
            <TrendingUp className="h-4 w-4 mr-2" />
            Trends
          </Button>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Temperature</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">17.3°C</div>
              <p className="text-xs text-muted-foreground">
                +2.3% from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Salinity</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">34.9 PSU</div>
              <p className="text-xs text-muted-foreground">
                -0.8% from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Data Reliability</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98.7%</div>
              <p className="text-xs text-muted-foreground">
                +1.2% from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Coverage Area</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89.3%</div>
              <p className="text-xs text-muted-foreground">
                +5.1% from last period
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Temperature & Salinity Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={temperatureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="temp" stroke="hsl(var(--primary))" strokeWidth={2} />
                  <Line type="monotone" dataKey="salinity" stroke="hsl(var(--secondary))" strokeWidth={2} />
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
                    data={regionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {regionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Float Deployment & Recovery Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deploymentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="deployed" fill="hsl(var(--primary))" />
                <Bar dataKey="recovered" fill="hsl(var(--secondary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Analytics;