
import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { COLORS, GEOMETRY_CONFIG } from '../constants.js';
import { html } from '../utils.js';

const CommutatorSegment = ({ rotationZ }) => {
  const geometry = useMemo(() => {
    const rOuter = 0.8;
    const rInner = 0.6;
    const height = 1.5;
    const angle = Math.PI - 0.4;

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

  return html`
    <mesh geometry=${geometry} position=${[0, 0, 5.5]} rotation=${[0, 0, rotationZ]}>
      <meshStandardMaterial color=${COLORS.commutator} metalness=${0.6} roughness=${0.3} />
    </mesh>
  `;
};

const RectCoil = () => {
  const { radius: r, width: w, length: l } = GEOMETRY_CONFIG.coil;
  const matProps = { color: COLORS.coil, metalness: 0.6, roughness: 0.3 };

  return html`
    <group>
      {/* Side 1 (Left/Negative X initially) */}
      <mesh position=${[-w, 0, 0]} rotation=${[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args=${[r, r, l * 2, 16]} />
        <meshStandardMaterial ...${matProps} />
      </mesh>

      {/* Side 2 (Right/Positive X initially) */}
      <mesh position=${[w, 0, 0]} rotation=${[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args=${[r, r, l * 2, 16]} />
        <meshStandardMaterial ...${matProps} />
      </mesh>

      {/* Frame connections */}
      <mesh position=${[0, 0, -l]} rotation=${[0, 0, Math.PI / 2]}>
        <cylinderGeometry args=${[r, r, w * 2, 16]} />
        <meshStandardMaterial ...${matProps} />
      </mesh>
      <mesh position=${[-w / 2 - 0.4, 0, l]} rotation=${[0, 0, Math.PI / 2]}>
        <cylinderGeometry args=${[r, r, w - 0.5, 16]} />
        <meshStandardMaterial ...${matProps} />
      </mesh>
      <mesh position=${[w / 2 + 0.4, 0, l]} rotation=${[0, 0, Math.PI / 2]}>
        <cylinderGeometry args=${[r, r, w - 0.5, 16]} />
        <meshStandardMaterial ...${matProps} />
      </mesh>
      <mesh position=${[-0.8, 0, l + 0.5]} rotation=${[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args=${[r, r, 1, 16]} />
        <meshStandardMaterial ...${matProps} />
      </mesh>
      <mesh position=${[0.8, 0, l + 0.5]} rotation=${[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args=${[r, r, 1, 16]} />
        <meshStandardMaterial ...${matProps} />
      </mesh>
    </group>
  `;
};

export const Rotor = ({ speed, isRunning }) => {
  const rotorRef = useRef(null);
  const arrow1Ref = useRef(null);
  const arrow2Ref = useRef(null);
  
  const { width: w } = GEOMETRY_CONFIG.coil;

  useFrame((state, delta) => {
    // 1. Update Rotor Rotation
    if (rotorRef.current && isRunning) {
        rotorRef.current.rotation.z += speed * delta * 2.0; 
    }

    // 2. Update Arrows based on snippet logic
    if (rotorRef.current && arrow1Ref.current && arrow2Ref.current) {
        const currentRotation = rotorRef.current.rotation.z;
        const axisZ = new THREE.Vector3(0, 0, 1);

        // --- Calculate Positions ---
        // Side 1 Local: (-w, 0, 0)
        const side1PosLocal = new THREE.Vector3(-w, 0, 0);
        // Side 2 Local: (w, 0, 0)
        const side2PosLocal = new THREE.Vector3(w, 0, 0);

        // Convert to World Space based on current rotation
        const side1PosWorld = side1PosLocal.clone().applyAxisAngle(axisZ, currentRotation);
        const side2PosWorld = side2PosLocal.clone().applyAxisAngle(axisZ, currentRotation);

        arrow1Ref.current.position.copy(side1PosWorld);
        arrow2Ref.current.position.copy(side2PosWorld);

        // --- Calculate Direction & Visibility ---
        
        // Normalize angle to 0..2PI
        let normAngle = currentRotation % (Math.PI * 2);
        if (normAngle < 0) normAngle += Math.PI * 2;

        // Gap Check (Vertical positions)
        // Snippet: Math.abs(normAngle - Math.PI / 2) < 0.2 ...
        const isGap = Math.abs(normAngle - Math.PI / 2) < 0.2 || Math.abs(normAngle - 3 * Math.PI / 2) < 0.2;

        if (isGap) {
            arrow1Ref.current.visible = false;
            arrow2Ref.current.visible = false;
        } else {
            arrow1Ref.current.visible = true;
            arrow2Ref.current.visible = true;

            // Direction Logic from snippet
            let currentSide1 = 1; // +Z (Right)
            
            // If angle is between 90 and 270 degrees (Left side)
            if (normAngle > Math.PI / 2 && normAngle < 3 * Math.PI / 2) {
                currentSide1 = -1;
            }

            let currentSide2 = -currentSide1;

            // Arrow 1 Direction (Side 1)
            const f1 = -currentSide1; 
            arrow1Ref.current.setDirection(new THREE.Vector3(0, f1, 0).normalize());

            // Arrow 2 Direction (Side 2)
            const f2 = -currentSide2;
            arrow2Ref.current.setDirection(new THREE.Vector3(0, f2, 0).normalize());
        }
    }
  });

  return html`
    <group>
      {/* Rotating Components */}
      <group ref=${rotorRef}>
        <${RectCoil} />
        <${CommutatorSegment} rotationZ=${0} />
        <${CommutatorSegment} rotationZ=${Math.PI} />
      </group>
      
      {/* 
          Force Arrows (Helpers)
          Placed as siblings to the rotor so they don't rotate automatically.
          Their position is updated manually in useFrame.
          args: [dir, origin, length, color, headLength, headWidth]
      */}
      <arrowHelper 
        ref=${arrow1Ref} 
        args=${[new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 3, COLORS.forceArrow, 1, 0.5]} 
      />
      <arrowHelper 
        ref=${arrow2Ref} 
        args=${[new THREE.Vector3(0, -1, 0), new THREE.Vector3(0, 0, 0), 3, COLORS.forceArrow, 1, 0.5]} 
      />
    </group>
  `;
};
