import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Environment } from '@react-three/drei';
import { MagnetSystem } from './components/Magnets';
import { Rotor } from './components/Rotor';
import { Circuit } from './components/Circuit';
import { FieldLines } from './components/FieldLines';
import { Controls } from './components/Controls';
import { COLORS } from './constants';

const SceneContent: React.FC<{ speed: number; showField: boolean }> = ({ speed, showField }) => {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight 
        position={[10, 20, 15]} 
        intensity={1.2} 
        castShadow 
        shadow-mapSize={[2048, 2048]} 
      />
      <directionalLight position={[-10, 10, -10]} intensity={0.5} />

      <MagnetSystem />
      <Rotor speed={speed * 0.05} />
      <Circuit />
      
      {showField && <FieldLines />}
      
      {/* Ground plane for shadows */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial opacity={0.2} />
      </mesh>
    </>
  );
};

export default function App() {
  const [speed, setSpeed] = useState<number>(2); // Default matches HTML value
  const [showField, setShowField] = useState<boolean>(true);

  return (
    <div className="relative w-full h-screen bg-sky-300 overflow-hidden">
        {/* 3D Scene */}
        <Canvas
            shadows
            camera={{ position: [0, 10, 25], fov: 45 }}
            style={{ background: COLORS.background }}
        >
            <Suspense fallback={null}>
                <SceneContent speed={speed} showField={showField} />
                <OrbitControls 
                    enableDamping 
                    minDistance={10} 
                    maxDistance={50} 
                    target={[0,0,5]} // Look slightly towards center of motor
                />
                <Environment preset="city" />
            </Suspense>
        </Canvas>

        {/* Loading Overlay (Suspense handle usually, but simple text for now if needed) */}
        
        {/* UI Overlay */}
        <Controls 
            speed={speed} 
            setSpeed={setSpeed} 
            showField={showField} 
            setShowField={setShowField} 
        />

        <div className="absolute top-4 left-4 text-white/80 pointer-events-none">
            <h1 className="text-2xl font-bold tracking-tight">DC Motor Simulation</h1>
            <p className="text-sm">React + Three.js</p>
        </div>
    </div>
  );
}