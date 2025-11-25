import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Text3D, Center } from '@react-three/drei';
import { COLORS, GEOMETRY_CONFIG, FONT_URL } from '../constants';

interface MagnetProps {
  isNorth: boolean;
}

const Magnet: React.FC<MagnetProps> = ({ isNorth }) => {
  const { width, height, depth, radius } = GEOMETRY_CONFIG.magnet;

  const geometry = useMemo(() => {
    const xEdge = Math.sqrt(radius * radius - (height / 2) * (height / 2));
    const shape = new THREE.Shape();

    if (isNorth) {
      // Right Magnet Shape (N)
      shape.moveTo(xEdge, -height / 2);
      shape.lineTo(width + 2, -height / 2);
      shape.lineTo(width + 2, height / 2);
      shape.lineTo(xEdge, height / 2);
      const angleTopN = Math.atan2(height / 2, xEdge);
      const angleBottomN = Math.atan2(-height / 2, xEdge);
      shape.absarc(0, 0, radius, angleTopN, angleBottomN, true);
    } else {
      // Left Magnet Shape (S)
      shape.moveTo(-xEdge, height / 2);
      shape.lineTo(-(width + 2), height / 2);
      shape.lineTo(-(width + 2), -height / 2);
      shape.lineTo(-xEdge, -height / 2);
      const angleTopS = Math.atan2(height / 2, -xEdge);
      const angleBottomS = Math.atan2(-height / 2, -xEdge);
      shape.absarc(0, 0, radius, angleBottomS, angleTopS, true);
    }

    return new THREE.ExtrudeGeometry(shape, {
      depth: depth,
      bevelEnabled: false
    });
  }, [isNorth, width, height, depth, radius]);

  // Center geometry logic
  useMemo(() => {
    geometry.translate(0, 0, -depth / 2);
  }, [geometry, depth]);

  const labelPosition: [number, number, number] = isNorth 
    ? [5, -1.25, 5.1] 
    : [-6.5, -1.25, 5.1];

  return (
    <group>
      <mesh 
        geometry={geometry} 
        castShadow 
        receiveShadow
      >
        <meshStandardMaterial 
          color={isNorth ? COLORS.magnetN : COLORS.magnetS} 
          roughness={0.4} 
        />
      </mesh>
      
      <group position={labelPosition}>
        <Text3D 
            font={FONT_URL} 
            size={2.5} 
            height={0.1}
        >
            {isNorth ? 'N' : 'S'}
            <meshBasicMaterial color={COLORS.text} />
        </Text3D>
      </group>
    </group>
  );
};

export const MagnetSystem: React.FC = () => {
  return (
    <>
      <Magnet isNorth={true} />
      <Magnet isNorth={false} />
    </>
  );
};