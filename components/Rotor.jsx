import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { COLORS, GEOMETRY_CONFIG } from '../constants.js';

// Sub-component for a single commutator segment
const CommutatorSegment = ({ rotationZ }) => {
  const geometry = useMemo(() => {
    const rOuter = 0.8;
    const rInner = 0.6;
    const height = 1.5;
    const angle = Math.PI - 0.4; // Gap of 0.4 radians

    const shape = new THREE.Shape();
    shape.absarc(0, 0, rOuter, -angle / 2, angle / 2, false);
    shape.absarc(0, 0, rInner, angle / 2, -angle / 2, true);

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: height,
      bevelEnabled: false,
      curveSegments: 32
    });
    geo.translate(0, 0, -height / 2);
    return geo;
  }, []);

  return (
    <mesh geometry={geometry} position={[0, 0, 5.5]} rotation={[0, 0, rotationZ]}>
      <meshStandardMaterial color={COLORS.commutator} metalness={0.6} roughness={0.3} />
    </mesh>
  );
};

// Sub-component for the rectangular coil
const RectCoil = () => {
  const { radius: r, width: w, length: l } = GEOMETRY_CONFIG.coil;
  const matProps = { color: COLORS.coil, metalness: 0.6, roughness: 0.3 };

  return (
    <group>
      {/* Side 1 (Left) */}
      <mesh position={[-w, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[r, r, l * 2, 16]} />
        <meshStandardMaterial {...matProps} />
      </mesh>

      {/* Side 2 (Right) */}
      <mesh position={[w, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[r, r, l * 2, 16]} />
        <meshStandardMaterial {...matProps} />
      </mesh>

      {/* Back */}
      <mesh position={[0, 0, -l]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[r, r, w * 2, 16]} />
        <meshStandardMaterial {...matProps} />
      </mesh>

      {/* Front (Split to commutator) */}
      <mesh position={[-w / 2 - 0.4, 0, l]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[r, r, w - 0.5, 16]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      <mesh position={[w / 2 + 0.4, 0, l]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[r, r, w - 0.5, 16]} />
        <meshStandardMaterial {...matProps} />
      </mesh>

      {/* Connect to commutator */}
      <mesh position={[-0.8, 0, l + 0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[r, r, 1, 16]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      <mesh position={[0.8, 0, l + 0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[r, r, 1, 16]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
    </group>
  );
};

export const Rotor = ({ speed }) => {
  const groupRef = useRef(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
        // Assuming speed value from slider ~ -10 to 10
        // Adjust multiplier to match desired visual speed
        groupRef.current.rotation.z += speed * delta * 2.0; 
    }
  });

  return (
    <group ref={groupRef}>
      <RectCoil />
      <CommutatorSegment rotationZ={0} />
      <CommutatorSegment rotationZ={Math.PI} />
    </group>
  );
};