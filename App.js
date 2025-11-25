
import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { MagnetSystem } from './components/Magnets.js';
import { Rotor } from './components/Rotor.js';
import { Circuit } from './components/Circuit.js';
import { FieldLines } from './components/FieldLines.js';
import { Controls } from './components/Controls.js';
import { COLORS } from './constants.js';
import { html } from './utils.js';

const SceneContent = ({ speed, showField, isRunning }) => {
  return html`
    <ambientLight intensity=${0.6} />
    <directionalLight 
      position=${[10, 20, 15]} 
      intensity=${1.2} 
    />
    <directionalLight position=${[-10, 10, -10]} intensity=${0.5} />

    <${MagnetSystem} />
    <${Rotor} speed=${speed * 0.5} isRunning=${isRunning} />
    <${Circuit} />
    
    ${showField && html`<${FieldLines} />`}
  `;
};

export default function App() {
  const [speed, setSpeed] = useState(2);
  const [showField, setShowField] = useState(true);
  const [isRunning, setIsRunning] = useState(true);

  return html`
    <div className="relative w-full h-screen bg-sky-300 overflow-hidden">
        <${Canvas}
            camera=${{ position: [0, 10, 25], fov: 45 }}
            style=${{ background: COLORS.background }}
        >
            <${Suspense} fallback=${null}>
                <${SceneContent} speed=${speed} showField=${showField} isRunning=${isRunning} />
                <${OrbitControls} 
                    enableDamping 
                    minDistance=${10} 
                    maxDistance=${50} 
                    target=${[0,0,5]} 
                />
                <${Environment} preset="city" />
            <//>
        <//>

        <${Controls} 
            speed=${speed} 
            setSpeed=${setSpeed} 
            showField=${showField} 
            setShowField=${setShowField}
            isRunning=${isRunning}
            setIsRunning=${setIsRunning}
        />

        <div className="absolute top-4 left-4 text-white/80 pointer-events-none">
            <h1 className="text-2xl font-bold tracking-tight">DC Motor Simulation</h1>
            <p className="text-sm">React + Three.js</p>
        </div>
    </div>
  `;
}
