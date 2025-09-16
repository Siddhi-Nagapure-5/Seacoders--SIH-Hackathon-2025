import React, { useState } from 'react';
import AquaIntelHeader from '@/components/AquaIntelHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  Settings as SettingsIcon, 
  Waves, 
  Bell, 
  Database, 
  Map, 
  Thermometer, 
  Wifi, 
  Eye,
  Download,
  Shield,
  Clock,
  Globe,
  Palette,
  Volume2,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    // Data & Monitoring Settings
    dataRefreshRate: 5, // seconds
    autoRefresh: true,
    realTimeUpdates: true,
    qualityThreshold: 95,
    
    // Alert Settings
    enableAlerts: true,
    temperatureAlerts: true,
    connectivityAlerts: true,
    qualityAlerts: false,
    alertSound: true,
    emailNotifications: false,
    
    // Visualization Settings
    show3DEffects: true,
    animatedCharts: true,
    darkMode: true,
    colorblindMode: false,
    
    // Data Export Settings
    exportFormat: 'JSON',
    includeMetadata: true,
    compressData: false,
    
    // System Settings
    language: 'en',
    timezone: 'UTC',
    units: 'metric',
    precision: 2,
    
    // Performance Settings
    maxDataPoints: 10000,
    cacheDuration: 30, // minutes
    preloadData: true
  });

  const [savedSettings, setSavedSettings] = useState(false);

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setSavedSettings(false);
  };

  const saveSettings = () => {
    // Here you would normally save to localStorage or API
    localStorage.setItem('aquaIntel_settings', JSON.stringify(settings));
    setSavedSettings(true);
    setTimeout(() => setSavedSettings(false), 2000);
  };

  const resetSettings = () => {
    const defaultSettings = {
      dataRefreshRate: 5,
      autoRefresh: true,
      realTimeUpdates: true,
      qualityThreshold: 95,
      enableAlerts: true,
      temperatureAlerts: true,
      connectivityAlerts: true,
      qualityAlerts: false,
      alertSound: true,
      emailNotifications: false,
      show3DEffects: true,
      animatedCharts: true,
      darkMode: true,
      colorblindMode: false,
      exportFormat: 'JSON',
      includeMetadata: true,
      compressData: false,
      language: 'en',
      timezone: 'UTC',
      units: 'metric',
      precision: 2,
      maxDataPoints: 10000,
      cacheDuration: 30,
      preloadData: true
    };
    setSettings(defaultSettings);
  };

  return (
    <div className="min-h-screen bg-background">
      <AquaIntelHeader />
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-blue-900 dark:text-blue-200 mb-4">
                System Settings
              </h1>
              <p className="text-xl text-muted-foreground">
                Configure your AquaIntel ocean monitoring experience
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button onClick={resetSettings} variant="outline">
                Reset to Defaults
              </Button>
              <Button onClick={saveSettings} className="bg-primary">
                {savedSettings ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Saved!
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Save Settings
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Data & Monitoring Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-primary" />
                <span>Data & Monitoring</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="autoRefresh">Auto-refresh Data</Label>
                  <Switch
                    id="autoRefresh"
                    checked={settings.autoRefresh}
                    onCheckedChange={(value) => updateSetting('autoRefresh', value)}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Automatically update ocean data in real-time
                </p>
              </div>

              <div>
                <Label>Refresh Rate: {settings.dataRefreshRate} seconds</Label>
                <Slider
                  value={[settings.dataRefreshRate]}
                  onValueChange={(value) => updateSetting('dataRefreshRate', value[0])}
                  max={60}
                  min={1}
                  step={1}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1s (High load)</span>
                  <span>60s (Low load)</span>
                </div>
              </div>

              <div>
                <Label>Data Quality Threshold: {settings.qualityThreshold}%</Label>
                <Slider
                  value={[settings.qualityThreshold]}
                  onValueChange={(value) => updateSetting('qualityThreshold', value[0])}
                  max={100}
                  min={50}
                  step={1}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Minimum quality score to accept ARGO float data
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="realTimeUpdates">Real-time Updates</Label>
                  <Switch
                    id="realTimeUpdates"
                    checked={settings.realTimeUpdates}
                    onCheckedChange={(value) => updateSetting('realTimeUpdates', value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alert & Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-orange-500" />
                <span>Alerts & Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="enableAlerts">Enable Alerts</Label>
                  <Switch
                    id="enableAlerts"
                    checked={settings.enableAlerts}
                    onCheckedChange={(value) => updateSetting('enableAlerts', value)}
                  />
                </div>
              </div>

              <Separator />

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="tempAlerts">Temperature Anomalies</Label>
                  <Switch
                    id="tempAlerts"
                    checked={settings.temperatureAlerts}
                    onCheckedChange={(value) => updateSetting('temperatureAlerts', value)}
                    disabled={!settings.enableAlerts}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Alert when ocean temperatures exceed normal ranges
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="connectivityAlerts">Connectivity Issues</Label>
                  <Switch
                    id="connectivityAlerts"
                    checked={settings.connectivityAlerts}
                    onCheckedChange={(value) => updateSetting('connectivityAlerts', value)}
                    disabled={!settings.enableAlerts}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Alert when ARGO floats lose connection
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="qualityAlerts">Data Quality Issues</Label>
                  <Switch
                    id="qualityAlerts"
                    checked={settings.qualityAlerts}
                    onCheckedChange={(value) => updateSetting('qualityAlerts', value)}
                    disabled={!settings.enableAlerts}
                  />
                </div>
              </div>

              <Separator />

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="alertSound">Sound Alerts</Label>
                  <Switch
                    id="alertSound"
                    checked={settings.alertSound}
                    onCheckedChange={(value) => updateSetting('alertSound', value)}
                    disabled={!settings.enableAlerts}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <Switch
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(value) => updateSetting('emailNotifications', value)}
                    disabled={!settings.enableAlerts}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Visualization Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-blue-500" />
                <span>Visualization</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show3DEffects">3D Effects</Label>
                  <Switch
                    id="show3DEffects"
                    checked={settings.show3DEffects}
                    onCheckedChange={(value) => updateSetting('show3DEffects', value)}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Enable 3D ocean visualization and animations
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="animatedCharts">Animated Charts</Label>
                  <Switch
                    id="animatedCharts"
                    checked={settings.animatedCharts}
                    onCheckedChange={(value) => updateSetting('animatedCharts', value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="darkMode">Dark Mode</Label>
                  <Switch
                    id="darkMode"
                    checked={settings.darkMode}
                    onCheckedChange={(value) => updateSetting('darkMode', value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="colorblindMode">Colorblind-friendly</Label>
                  <Switch
                    id="colorblindMode"
                    checked={settings.colorblindMode}
                    onCheckedChange={(value) => updateSetting('colorblindMode', value)}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Use colorblind-friendly palette for charts
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Export Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Download className="h-5 w-5 text-green-500" />
                <span>Data Export</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="exportFormat">Default Export Format</Label>
                <Select value={settings.exportFormat} onValueChange={(value) => updateSetting('exportFormat', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="JSON">JSON</SelectItem>
                    <SelectItem value="CSV">CSV</SelectItem>
                    <SelectItem value="XML">XML</SelectItem>
                    <SelectItem value="NetCDF">NetCDF</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="includeMetadata">Include Metadata</Label>
                  <Switch
                    id="includeMetadata"
                    checked={settings.includeMetadata}
                    onCheckedChange={(value) => updateSetting('includeMetadata', value)}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Include ARGO float metadata in exports
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="compressData">Compress Data</Label>
                  <Switch
                    id="compressData"
                    checked={settings.compressData}
                    onCheckedChange={(value) => updateSetting('compressData', value)}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Automatically compress exported files
                </p>
              </div>
            </CardContent>
          </Card>

          {/* System Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <SettingsIcon className="h-5 w-5 text-purple-500" />
                <span>System</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="language">Language</Label>
                <Select value={settings.language} onValueChange={(value) => updateSetting('language', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Select value={settings.timezone} onValueChange={(value) => updateSetting('timezone', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="EST">Eastern Time</SelectItem>
                    <SelectItem value="PST">Pacific Time</SelectItem>
                    <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="units">Measurement Units</Label>
                <Select value={settings.units} onValueChange={(value) => updateSetting('units', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metric">Metric (°C, m, km/h)</SelectItem>
                    <SelectItem value="imperial">Imperial (°F, ft, mph)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Decimal Precision: {settings.precision} digits</Label>
                <Slider
                  value={[settings.precision]}
                  onValueChange={(value) => updateSetting('precision', value[0])}
                  max={5}
                  min={0}
                  step={1}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Performance Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Wifi className="h-5 w-5 text-yellow-500" />
                <span>Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Max Data Points: {settings.maxDataPoints.toLocaleString()}</Label>
                <Slider
                  value={[settings.maxDataPoints]}
                  onValueChange={(value) => updateSetting('maxDataPoints', value[0])}
                  max={50000}
                  min={1000}
                  step={1000}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Maximum data points to load in visualizations
                </p>
              </div>

              <div>
                <Label>Cache Duration: {settings.cacheDuration} minutes</Label>
                <Slider
                  value={[settings.cacheDuration]}
                  onValueChange={(value) => updateSetting('cacheDuration', value[0])}
                  max={120}
                  min={5}
                  step={5}
                  className="mt-2"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="preloadData">Preload Chart Data</Label>
                  <Switch
                    id="preloadData"
                    checked={settings.preloadData}
                    onCheckedChange={(value) => updateSetting('preloadData', value)}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Preload data for faster chart rendering
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Information */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-500" />
              <span>System Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <div className="text-lg font-bold text-green-600">Online</div>
                <div className="text-xs text-muted-foreground">Connection Status</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <div className="text-lg font-bold text-blue-600">3,847</div>
                <div className="text-xs text-muted-foreground">Active Floats</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <div className="text-lg font-bold text-orange-600">24.8 MB</div>
                <div className="text-xs text-muted-foreground">Cache Size</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <div className="text-lg font-bold text-purple-600">v2.1.4</div>
                <div className="text-xs text-muted-foreground">System Version</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Settings;

