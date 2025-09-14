import React, { useState, useCallback, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Circle, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Thermometer, Droplets, Navigation, Waves, MapPin, Zap } from 'lucide-react';

// Fix for default marker icons in Leaflet + React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// CTD Sensor data with realistic Indian Ocean locations
const ctdSensors = [
  { id: 'CTD-001', name: 'Arabian Sea North', lat: 23.5, lon: 68.2, depth: 200, status: 'active', temp: 28.5, salinity: 35.2 },
  { id: 'CTD-002', name: 'Arabian Sea Central', lat: 19.8, lon: 66.1, depth: 150, status: 'active', temp: 27.8, salinity: 35.8 },
  { id: 'CTD-003', name: 'Arabian Sea South', lat: 15.2, lon: 70.5, depth: 300, status: 'active', temp: 29.1, salinity: 36.1 },
  { id: 'CTD-004', name: 'Bay of Bengal North', lat: 20.1, lon: 87.8, depth: 180, status: 'active', temp: 29.8, salinity: 33.5 },
  { id: 'CTD-005', name: 'Bay of Bengal Central', lat: 16.8, lon: 85.1, depth: 220, status: 'active', temp: 29.2, salinity: 34.1 },
  { id: 'CTD-006', name: 'Bay of Bengal South', lat: 13.2, lon: 82.5, depth: 250, status: 'active', temp: 28.9, salinity: 34.3 },
  { id: 'CTD-007', name: 'Indian Ocean Deep', lat: 8.2, lon: 77.5, depth: 450, status: 'active', temp: 27.1, salinity: 34.8 },
  { id: 'CTD-008', name: 'Lakshadweep Sea', lat: 11.5, lon: 72.6, depth: 120, status: 'active', temp: 29.4, salinity: 35.0 },
  { id: 'CTD-009', name: 'Andaman Sea', lat: 12.5, lon: 93.2, depth: 180, status: 'maintenance', temp: 28.7, salinity: 33.8 },
  { id: 'CTD-010', name: 'Indian Ocean West', lat: 10.0, lon: 65.0, depth: 300, status: 'active', temp: 27.9, salinity: 35.1 }
];

// Create custom icons for CTD sensors
const createCtdIcon = (status: string) => {
  const color = status === 'active' ? '#10b981' : '#f59e0b';
  return L.divIcon({
    className: '',
    html: `<div style="background-color: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -8]
  });
};

// Function to calculate distance between two points (Haversine formula)
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in kilometers
};

// Function to find nearest CTD sensors
const findNearestSensors = (lat: number, lon: number, count: number = 3) => {
  return ctdSensors
    .map(sensor => ({
      ...sensor,
      distance: calculateDistance(lat, lon, sensor.lat, sensor.lon)
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, count);
};

// Function to interpolate ocean parameters based on location and nearby sensors
const getOceanParameters = (lat: number, lon: number) => {
  const nearestSensors = findNearestSensors(lat, lon, 3);
  
  if (nearestSensors.length === 0) {
    return {
      temperature: 26.0,
      salinity: 35.0,
      depth: 200,
      oxygenLevel: 4.5,
      ph: 8.1,
      chlorophyll: 0.3,
      turbidity: 1.2
    };
  }

  // Weighted average based on inverse distance
  let totalWeight = 0;
  let weightedTemp = 0;
  let weightedSalinity = 0;

  nearestSensors.forEach(sensor => {
    const weight = 1 / (sensor.distance + 0.1); // Adding small value to avoid division by zero
    totalWeight += weight;
    weightedTemp += sensor.temp * weight;
    weightedSalinity += sensor.salinity * weight;
  });

  const interpolatedTemp = weightedTemp / totalWeight;
  const interpolatedSalinity = weightedSalinity / totalWeight;

  // Add some realistic variation based on location
  const depthVariation = Math.abs(lat - 15) * 20 + 100; // Deeper water further from coast
  const tempVariation = interpolatedTemp + (Math.random() - 0.5) * 2;
  const salinityVariation = interpolatedSalinity + (Math.random() - 0.5) * 0.5;

  return {
    temperature: Number(tempVariation.toFixed(1)),
    salinity: Number(salinityVariation.toFixed(1)),
    depth: Math.round(depthVariation),
    oxygenLevel: Number((4.0 + Math.random() * 2).toFixed(1)),
    ph: Number((7.8 + Math.random() * 0.6).toFixed(1)),
    chlorophyll: Number((0.1 + Math.random() * 0.8).toFixed(2)),
    turbidity: Number((0.5 + Math.random() * 2).toFixed(1))
  };
};

// Location data interface
interface LocationData {
  lat: number;
  lon: number;
  parameters: ReturnType<typeof getOceanParameters>;
  nearestSensors: ReturnType<typeof findNearestSensors>;
}

// Click handler component
const ClickHandler: React.FC<{ onLocationClick: (data: LocationData) => void }> = ({ onLocationClick }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      const parameters = getOceanParameters(lat, lng);
      const nearestSensors = findNearestSensors(lat, lng, 3);
      
      onLocationClick({
        lat,
        lon: lng,
        parameters,
        nearestSensors
      });
    },
  });
  return null;
};

const OceanLeafletMap: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [clickMarker, setClickMarker] = useState<{ lat: number; lon: number } | null>(null);
  const [showSensorConnections, setShowSensorConnections] = useState(false);
  const mapRef = useRef<L.Map>(null);

  const handleLocationClick = useCallback((data: LocationData) => {
    setSelectedLocation(data);
    setClickMarker({ lat: data.lat, lon: data.lon });
  }, []);

  const handleClearSelection = () => {
    setSelectedLocation(null);
    setClickMarker(null);
  };

  // Define the ocean bounds (Indian Ocean region)
  const oceanBounds: L.LatLngBoundsExpression = [
    [-10, 50], // Southwest
    [30, 100]  // Northeast
  ];

  return (
    <div className="relative w-full h-[700px] rounded-lg overflow-hidden border">
      <MapContainer
        center={[15, 75]} // Center on Indian Ocean
        zoom={5}
        style={{ height: '100%', width: '100%' }}
        maxBounds={oceanBounds}
        maxBoundsViscosity={1.0}
        ref={mapRef}
      >
        {/* Ocean/Satellite tile layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Alternative ocean-focused tile layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}"
          opacity={0.7}
        />

        {/* CTD Sensor markers */}
        {ctdSensors.map((sensor) => (
          <Marker
            key={sensor.id}
            position={[sensor.lat, sensor.lon]}
            icon={createCtdIcon(sensor.status)}
          >
            <Popup>
              <div className="space-y-2 min-w-[200px]">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm">{sensor.name}</h3>
                  <Badge variant={sensor.status === 'active' ? 'default' : 'secondary'}>
                    {sensor.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>ID: {sensor.id}</div>
                  <div>Depth: {sensor.depth}m</div>
                  <div>Temp: {sensor.temp}°C</div>
                  <div>Salinity: {sensor.salinity}</div>
                </div>
                <div className="text-xs text-gray-600">
                  📍 {sensor.lat.toFixed(3)}, {sensor.lon.toFixed(3)}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Click marker */}
        {clickMarker && (
          <>
            <Marker position={[clickMarker.lat, clickMarker.lon]}>
              <Popup>
                <div className="text-sm">
                  <strong>Selected Location</strong><br/>
                  📍 {clickMarker.lat.toFixed(4)}, {clickMarker.lon.toFixed(4)}
                </div>
              </Popup>
            </Marker>
            
            {/* Show connections to nearest sensors */}
            {showSensorConnections && selectedLocation && (
              <>
                {selectedLocation.nearestSensors.map((sensor, index) => (
                  <React.Fragment key={sensor.id}>
                    <Polyline
                      positions={[
                        [clickMarker.lat, clickMarker.lon],
                        [sensor.lat, sensor.lon]
                      ]}
                      color={index === 0 ? '#ef4444' : index === 1 ? '#f97316' : '#eab308'}
                      weight={index === 0 ? 3 : 2}
                      opacity={0.7}
                    />
                    <Circle
                      center={[sensor.lat, sensor.lon]}
                      radius={sensor.distance * 1000} // Convert km to meters for circle
                      fillColor={index === 0 ? '#ef4444' : index === 1 ? '#f97316' : '#eab308'}
                      fillOpacity={0.1}
                      stroke={false}
                    />
                  </React.Fragment>
                ))}
              </>
            )}
          </>
        )}

        <ClickHandler onLocationClick={handleLocationClick} />
      </MapContainer>

      {/* Control Panel */}
      <div className="absolute top-4 left-4 space-y-2 z-[1000]">
        <Card className="bg-white/95 backdrop-blur-sm border shadow-lg">
          <CardContent className="p-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Ocean Map Controls</h3>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-xs">Active CTD Sensors</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-xs">Maintenance</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowSensorConnections(!showSensorConnections)}
                disabled={!selectedLocation}
                className="w-full text-xs"
              >
                {showSensorConnections ? 'Hide' : 'Show'} Sensor Network
              </Button>
              {selectedLocation && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleClearSelection}
                  className="w-full text-xs"
                >
                  Clear Selection
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Location Data Panel */}
      {selectedLocation && (
        <div className="absolute top-4 right-4 z-[1000]">
          <Card className="bg-white/95 backdrop-blur-sm border shadow-lg max-w-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span>Ocean Location Data</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Coordinates */}
              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-semibold text-sm mb-2">📍 Coordinates</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Latitude: <strong>{selectedLocation.lat.toFixed(4)}°</strong></div>
                  <div>Longitude: <strong>{selectedLocation.lon.toFixed(4)}°</strong></div>
                </div>
              </div>

              {/* Ocean Parameters */}
              <div className="bg-cyan-50 p-3 rounded-lg">
                <h4 className="font-semibold text-sm mb-3 flex items-center">
                  <Waves className="h-4 w-4 mr-1" />
                  Ocean Parameters
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-1">
                    <Thermometer className="h-3 w-3 text-red-500" />
                    <span>Temp: <strong>{selectedLocation.parameters.temperature}°C</strong></span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Droplets className="h-3 w-3 text-blue-500" />
                    <span>Salinity: <strong>{selectedLocation.parameters.salinity}</strong></span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Navigation className="h-3 w-3 text-green-500" />
                    <span>Depth: <strong>{selectedLocation.parameters.depth}m</strong></span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Zap className="h-3 w-3 text-purple-500" />
                    <span>O₂: <strong>{selectedLocation.parameters.oxygenLevel} mg/L</strong></span>
                  </div>
                  <div className="text-xs col-span-2 space-y-1">
                    <div>pH: <strong>{selectedLocation.parameters.ph}</strong></div>
                    <div>Chlorophyll-a: <strong>{selectedLocation.parameters.chlorophyll} μg/L</strong></div>
                    <div>Turbidity: <strong>{selectedLocation.parameters.turbidity} NTU</strong></div>
                  </div>
                </div>
              </div>

              {/* Nearest Sensors */}
              <div className="bg-green-50 p-3 rounded-lg">
                <h4 className="font-semibold text-sm mb-2">🔍 Nearest CTD Sensors</h4>
                <div className="space-y-2">
                  {selectedLocation.nearestSensors.map((sensor, index) => (
                    <div key={sensor.id} className="flex justify-between items-center text-xs">
                      <div>
                        <div className="font-medium">{sensor.name}</div>
                        <div className="text-gray-600">{sensor.id}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-blue-600">{sensor.distance.toFixed(1)} km</div>
                        <Badge variant={index === 0 ? 'default' : 'secondary'} className="text-xs">
                          {index === 0 ? 'Closest' : `#${index + 1}`}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Quality Assessment */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-semibold text-sm mb-2">📊 Data Quality</h4>
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span>Interpolation Confidence:</span>
                    <Badge variant={selectedLocation.nearestSensors[0].distance < 50 ? 'default' : 'secondary'}>
                      {selectedLocation.nearestSensors[0].distance < 50 ? 'High' : 'Medium'}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Sensors in Range:</span>
                    <strong>{selectedLocation.nearestSensors.filter(s => s.status === 'active').length}/3</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Data Freshness:</span>
                    <Badge variant="outline">Real-time</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 z-[1000]">
        <Card className="bg-black/70 backdrop-blur-sm border-gray-600">
          <CardContent className="p-3">
            <div className="text-white text-xs space-y-1">
              <div>🖱️ Click anywhere on the ocean to get location data</div>
              <div>📍 Click CTD sensors for detailed information</div>
              <div>🔗 Toggle sensor network to see connections</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OceanLeafletMap;
