import React, { useMemo } from 'react';
import * as THREE from 'three';
import { COLORS } from '../constants';

export const FieldLines: React.FC = () => {
  const lines = useMemo(() => {
    const tempLines: React.ReactElement[] = [];
    
    // Generate 5x5 grid of lines
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        const y = (i - 2) * 1.2;
        const z = (j - 2) * 1.5;
        
        const points = [
          new THREE.Vector3(-3.5, y, z), 
          new THREE.Vector3(3.5, y, z)
        ];
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        
        tempLines.push(
          <lineSegments key={`field-${i}-${j}`} geometry={geometry}>
            <lineBasicMaterial 
              color={COLORS.fieldLine} 
              opacity={0.3} 
              transparent 
            />
          </lineSegments>
        );
      }
    }
    return tempLines;
  }, []);

  return <group>{lines}</group>;
};