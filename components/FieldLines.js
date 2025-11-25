
import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { COLORS } from '../constants.js';
import { html } from '../utils.js';

const FluxArrow = ({ position }) => {
  const ref = useRef();
  // Field flows from N (Right, +X) to S (Left, -X)
  const speed = 4; 

  useFrame((state, delta) => {
    if (ref.current) {
        // Move towards negative X (Left)
        ref.current.position.x -= speed * delta;
        // Wrap around when it passes the South magnet
        if (ref.current.position.x < -3.5) {
            ref.current.position.x = 3.5;
        }
    }
  });

  return html`
    <mesh ref=${ref} position=${position} rotation=${[0, 0, Math.PI / 2]}>
      <coneGeometry args=${[0.12, 0.4, 8]} />
      <meshBasicMaterial color="white" opacity=${0.8} transparent />
    </mesh>
  `;
};

export const FieldLines = () => {
  const { linesData, arrowPositions } = useMemo(() => {
    const lines = [];
    const arrows = [];
    
    // Generate 5x5 grid of lines
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        const y = (i - 2) * 1.2;
        const z = (j - 2) * 1.5;
        
        const start = new THREE.Vector3(-3.5, y, z);
        const end = new THREE.Vector3(3.5, y, z);
        
        const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
        lines.push({ id: `field-${i}-${j}`, geometry });

        // Add animated arrow to this line
        // Randomize start X so they don't all move in perfect unison
        const randomX = (Math.random() * 7) - 3.5;
        arrows.push(new THREE.Vector3(randomX, y, z));
      }
    }
    return { linesData: lines, arrowPositions: arrows };
  }, []);

  return html`
    <group>
      ${linesData.map(({ id, geometry }) => html`
        <lineSegments key=${id} geometry=${geometry}>
          <lineBasicMaterial 
            color=${COLORS.fieldLine} 
            opacity=${0.2} 
            transparent 
          />
        <//>
      `)}
      
      ${arrowPositions.map((pos, idx) => html`
        <${FluxArrow} key=${`arrow-${idx}`} position=${pos} />
      `)}
    </group>
  `;
};
