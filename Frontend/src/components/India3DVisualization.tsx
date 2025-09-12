import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment, 
  Sphere, 
  Box,
  Text,
  Html
} from '@react-three/drei';
import * as THREE from 'three';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Major Indian cities with coordinates and data
const indianCities = [
  { name: 'Mumbai', lat: 19.0760, lon: 72.8777, temp: 28.5, type: 'port' },
  { name: 'Chennai', lat: 13.0827, lon: 80.2707, temp: 30.2, type: 'port' },
  { name: 'Kochi', lat: 9.9312, lon: 76.2673, temp: 29.8, type: 'port' },
  { name: 'Kolkata', lat: 22.5726, lon: 88.3639, temp: 31.1, type: 'port' },
  { name: 'Visakhapatnam', lat: 17.6868, lon: 83.2185, temp: 29.5, type: 'port' },
  { name: 'Goa', lat: 15.2993, lon: 74.1240, temp: 28.9, type: 'coastal' },
  { name: 'New Delhi', lat: 28.7041, lon: 77.1025, temp: 25.4, type: 'capital' },
  { name: 'Bangalore', lat: 12.9716, lon: 77.5946, temp: 24.8, type: 'tech' },
];

// Ocean monitoring stations around India
const oceanStations = [
  { name: 'Arabian Sea-1', lat: 15.5, lon: 68.2, temp: 27.8, depth: 200 },
  { name: 'Bay of Bengal-1', lat: 16.8, lon: 88.1, temp: 28.9, depth: 180 },
  { name: 'Indian Ocean-1', lat: 8.2, lon: 77.5, temp: 29.1, depth: 300 },
  { name: 'Lakshadweep Sea', lat: 11.5, lon: 72.6, temp: 28.4, depth: 150 },
];

// Simplified coordinate mapping for better visibility
const latLonTo3D = (lat: number, lon: number, height = 0.3) => {
  // Map India's coordinates to a reasonable 3D space
  // India spans roughly 8°N to 37°N latitude and 68°E to 97°E longitude
  const normalizedLat = (lat - 8) / (37 - 8); // 0 to 1
  const normalizedLon = (lon - 68) / (97 - 68); // 0 to 1
  
  // Convert to 3D coordinates centered around origin
  const x = (normalizedLon - 0.5) * 3; // -1.5 to 1.5
  const z = (0.5 - normalizedLat) * 3; // -1.5 to 1.5 (inverted for correct orientation)
  const y = height;
  
  return [x, y, z];
};

// Simplified India shape vertices (approximation for visualization)
const indiaShape = [
  // North border
  { lat: 35.0, lon: 74.0 },
  { lat: 35.0, lon: 78.0 },
  { lat: 32.0, lon: 82.0 },
  { lat: 30.0, lon: 88.0 },
  { lat: 28.0, lon: 92.0 },
  
  // East border
  { lat: 26.0, lon: 94.0 },
  { lat: 24.0, lon: 93.0 },
  { lat: 22.0, lon: 92.0 },
  { lat: 20.0, lon: 88.0 },
  { lat: 18.0, lon: 84.0 },
  { lat: 15.0, lon: 82.0 },
  { lat: 13.0, lon: 80.0 },
  
  // South border
  { lat: 11.0, lon: 79.0 },
  { lat: 8.5, lon: 77.5 },
  { lat: 10.0, lon: 76.0 },
  { lat: 12.0, lon: 75.0 },
  { lat: 15.0, lon: 74.0 },
  
  // West border
  { lat: 18.0, lon: 73.0 },
  { lat: 21.0, lon: 72.0 },
  { lat: 24.0, lon: 70.0 },
  { lat: 26.0, lon: 69.0 },
  { lat: 29.0, lon: 71.0 },
  { lat: 32.0, lon: 74.0 },
];

// Hotspot component
const Hotspot: React.FC<{ position: [number, number, number]; city: any; onClick: () => void }> = ({ 
  position, 
  city, 
  onClick 
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 2;
      meshRef.current.scale.setScalar(hovered ? 1.2 : 1);
    }
  });

  const color = city.type === 'port' ? '#00bcd4' : 
               city.type === 'capital' ? '#ff6b6b' : 
               city.type === 'tech' ? '#4ecdc4' : '#feca57';

  return (
    <group position={position}>
      <Sphere
        ref={meshRef}
        args={[0.08, 8, 8]}
        onClick={onClick}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </Sphere>
      
      {hovered && (
        <Html distanceFactor={10}>
          <div className="bg-black/80 text-white p-2 rounded-md text-xs whitespace-nowrap">
            <div className="font-semibold">{city.name}</div>
            <div>Temp: {city.temp}°C</div>
            <div>Type: {city.type}</div>
          </div>
        </Html>
      )}
    </group>
  );
};

// Ocean station marker
const OceanStation: React.FC<{ position: [number, number, number]; station: any }> = ({ 
  position, 
  station 
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 1.5;
      meshRef.current.rotation.z = state.clock.elapsedTime * 1.2;
    }
  });

  return (
    <group position={position}>
      <Box
        ref={meshRef}
        args={[0.06, 0.06, 0.06]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={0.2}
          transparent
          opacity={0.9}
        />
      </Box>
      
      {hovered && (
        <Html distanceFactor={10}>
          <div className="bg-green-900/90 text-white p-2 rounded-md text-xs whitespace-nowrap">
            <div className="font-semibold">{station.name}</div>
            <div>Water Temp: {station.temp}°C</div>
            <div>Depth: {station.depth}m</div>
          </div>
        </Html>
      )}
    </group>
  );
};

// Simplified India landmass component using basic geometry
const IndiaLandmass: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  // Create a simplified representation using multiple boxes to approximate India's shape
  const regions = [
    // Northern India
    { position: [0, 0.05, 1.5], size: [1.2, 0.1, 0.8], color: "#2d5a27" },
    // Central India  
    { position: [0, 0.05, 0.5], size: [1.0, 0.1, 1.0], color: "#2d5a27" },
    // Southern India (peninsula)
    { position: [0, 0.05, -0.8], size: [0.6, 0.1, 1.2], color: "#2d5a27" },
    // Western coast
    { position: [-0.6, 0.05, 0], size: [0.3, 0.1, 2.0], color: "#2d5a27" },
    // Eastern coast
    { position: [0.7, 0.05, 0.3], size: [0.3, 0.1, 1.5], color: "#2d5a27" },
  ];

  return (
    <group ref={meshRef}>
      {regions.map((region, index) => (
        <Box
          key={index}
          position={region.position as [number, number, number]}
          args={region.size as [number, number, number]}
        >
          <meshStandardMaterial 
            color={region.color}
            roughness={0.8}
            metalness={0.1}
          />
        </Box>
      ))}
      
      {/* Add some height variation */}
      <Box position={[0.2, 0.15, 1.0]} args={[0.3, 0.2, 0.3]}>
        <meshStandardMaterial color="#4a7c3a" roughness={0.9} />
      </Box>
      <Box position={[-0.3, 0.12, 0.2]} args={[0.25, 0.15, 0.25]}>
        <meshStandardMaterial color="#4a7c3a" roughness={0.9} />
      </Box>
    </group>
  );
};

// Simplified Ocean surface component
const OceanSurface: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[15, 15, 32, 32]} />
      <meshStandardMaterial 
        color="#1e40af"
        transparent
        opacity={0.7}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  );
};

// Main 3D Scene component
const Scene3D: React.FC<{ onCityClick: (city: any) => void }> = ({ onCityClick }) => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[4, 3, 4]} />
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={15}
        maxPolarAngle={Math.PI / 2.2}
      />
      
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-5, 3, -5]} color="#4fc3f7" intensity={0.8} />
      <pointLight position={[5, 2, 5]} color="#81c784" intensity={0.6} />
      
      {/* Ocean Surface */}
      <OceanSurface />
      
      {/* India Landmass */}
      <IndiaLandmass />
      
      {/* Fallback simple geometry to ensure visibility */}
      <Box position={[0, 0.1, 0]} args={[0.5, 0.1, 0.8]}>
        <meshStandardMaterial color="#22c55e" />
      </Box>
      
      {/* City Hotspots */}
      {indianCities.map((city, index) => {
        const position = latLonTo3D(city.lat, city.lon, 0.5) as [number, number, number];
        return (
          <Hotspot
            key={city.name}
            position={position}
            city={city}
            onClick={() => onCityClick(city)}
          />
        );
      })}
      
      {/* Ocean Monitoring Stations */}
      {oceanStations.map((station, index) => {
        const position = latLonTo3D(station.lat, station.lon, 0.4) as [number, number, number];
        return (
          <OceanStation
            key={station.name}
            position={position}
            station={station}
          />
        );
      })}
      
      {/* Title */}
      <Text
        position={[0, 3, 0]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        India 3D Ocean Visualization
      </Text>
      
      {/* Add some reference grid lines */}
      <gridHelper args={[10, 10]} position={[0, -0.3, 0]} />
    </>
  );
};

// Current visualization component
const CurrentVisualization: React.FC = () => {
  return (
    <group>
      {/* Simple current flow indicators */}
      {oceanStations.map((station, index) => {
        const position = latLonTo3D(station.lat, station.lon, 0.6) as [number, number, number];
        
        return (
          <group key={index} position={position}>
            <Box args={[0.15, 0.02, 0.02]} rotation={[0, index * 0.3, 0]}>
              <meshStandardMaterial color="#00ffaa" emissive="#00ffaa" emissiveIntensity={0.3} />
            </Box>
            {/* Arrow head */}
            <Box args={[0.05, 0.05, 0.02]} position={[0.08, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
              <meshStandardMaterial color="#00ffaa" emissive="#00ffaa" emissiveIntensity={0.5} />
            </Box>
          </group>
        );
      })}
    </group>
  );
};

// Temperature gradient overlay
const TemperatureGradient: React.FC = () => {
  const temperatureData = useMemo(() => {
    // Create simplified temperature data points
    const data = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 6; j++) {
        const lat = 10 + (i / 8) * 25; // 10°N to 35°N
        const lon = 70 + (j / 6) * 25; // 70°E to 95°E
        const temp = 32 - (lat - 10) * 0.4 + Math.sin(lon * 0.1) * 3; // Simulated temperature
        data.push({ lat, lon, temp });
      }
    }
    return data;
  }, []);

  return (
    <group>
      {temperatureData.map((point, index) => {
        const position = latLonTo3D(point.lat, point.lon, 0.35) as [number, number, number];
        const color = point.temp > 30 ? '#ff3333' : point.temp > 26 ? '#ff9933' : '#3366ff';
        
        return (
          <Sphere key={index} position={position} args={[0.04, 6, 6]}>
            <meshBasicMaterial color={color} transparent opacity={0.8} />
          </Sphere>
        );
      })}
    </group>
  );
};

// Main component
const India3DVisualization: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [showTemperature, setShowTemperature] = useState(true);
  const [showCurrents, setShowCurrents] = useState(true);
  
  return (
    <div className="relative w-full h-[600px] bg-gradient-to-b from-blue-900 to-blue-600 rounded-lg overflow-hidden">
      <Canvas 
        camera={{ position: [4, 3, 4], fov: 60 }}
        style={{ background: 'linear-gradient(to bottom, #1e3a8a, #1e40af)' }}
      >
        <Scene3D onCityClick={setSelectedCity} />
        {showCurrents && <CurrentVisualization />}
        {showTemperature && <TemperatureGradient />}
      </Canvas>
      
      {/* Controls Panel */}
      <div className="absolute top-4 left-4 space-y-2">
        <Card className="bg-black/20 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="space-y-3 text-white text-sm">
              <div className="font-semibold mb-2">Legend</div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                <span>Port Cities</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <span>Capital</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
                <span>Tech Hubs</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded"></div>
                <span>Ocean Stations</span>
              </div>
              
              <div className="border-t border-white/20 pt-3 mt-3">
                <div className="font-semibold mb-2">Data Layers</div>
                <div className="flex items-center justify-between">
                  <span>Temperature</span>
                  <button 
                    onClick={() => setShowTemperature(!showTemperature)}
                    className={`w-8 h-4 rounded-full ${showTemperature ? 'bg-red-500' : 'bg-gray-600'} relative transition-colors`}
                  >
                    <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-transform ${showTemperature ? 'translate-x-4' : 'translate-x-0.5'}`}></div>
                  </button>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span>Ocean Currents</span>
                  <button 
                    onClick={() => setShowCurrents(!showCurrents)}
                    className={`w-8 h-4 rounded-full ${showCurrents ? 'bg-green-500' : 'bg-gray-600'} relative transition-colors`}
                  >
                    <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-transform ${showCurrents ? 'translate-x-4' : 'translate-x-0.5'}`}></div>
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Info Panel */}
      {selectedCity && (
        <div className="absolute top-4 right-4">
          <Card className="bg-black/20 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="text-white">
                <h3 className="font-bold text-lg mb-2">{selectedCity.name}</h3>
                <div className="space-y-1 text-sm">
                  <div>Temperature: {selectedCity.temp}°C</div>
                  <div>Type: <Badge variant="secondary">{selectedCity.type}</Badge></div>
                  <div>Lat: {selectedCity.lat.toFixed(2)}°</div>
                  <div>Lon: {selectedCity.lon.toFixed(2)}°</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Instructions */}
      <div className="absolute bottom-4 left-4">
        <Card className="bg-black/20 backdrop-blur-sm border-white/20">
          <CardContent className="p-3">
            <div className="text-white text-xs">
              <div>🖱️ Click & drag to rotate</div>
              <div>🔍 Scroll to zoom</div>
              <div>👆 Click hotspots for info</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default India3DVisualization;
