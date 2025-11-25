
import React from 'react';
import { COLORS } from '../constants.js';
import { html } from '../utils.js';

const Brushes = () => {
  return html`
    <mesh position=${[-1.1, 0, 5.5]}>
      <boxGeometry args=${[0.6, 0.6, 1.5]} />
      <meshStandardMaterial color=${COLORS.brush} roughness=${0.8} />
    </mesh>
    <mesh position=${[1.1, 0, 5.5]}>
      <boxGeometry args=${[0.6, 0.6, 1.5]} />
      <meshStandardMaterial color=${COLORS.brush} roughness=${0.8} />
    </mesh>
  `;
};

const Wires = () => {
  const r = 0.1;
  
  const Cylinder = ({ pos, rot = [0, 0, 0], height }) => html`
    <mesh position=${pos} rotation=${rot}>
      <cylinderGeometry args=${[r, r, height, 16]} />
      <meshStandardMaterial color=${COLORS.wire} roughness=${0.5} />
    </mesh>
  `;

  const Corner = ({ pos }) => html`
    <mesh position=${pos}>
      <sphereGeometry args=${[r * 1.5, 16, 16]} />
      <meshStandardMaterial color=${COLORS.wire} roughness=${0.5} />
    </mesh>
  `;

  return html`
    <group>
      <${Cylinder} pos=${[-2, 0, 5.5]} rot=${[0, 0, Math.PI / 2]} height=${2} />
      <${Cylinder} pos=${[-3, 0, 9.5]} rot=${[Math.PI / 2, 0, 0]} height=${8} />
      <${Cylinder} pos=${[-1.5, 0, 13.5]} rot=${[0, 0, Math.PI / 2]} height=${3} />

      <${Cylinder} pos=${[2, 0, 5.5]} rot=${[0, 0, Math.PI / 2]} height=${2} />
      <${Cylinder} pos=${[3, 0, 9.5]} rot=${[Math.PI / 2, 0, 0]} height=${8} />
      <${Cylinder} pos=${[1.5, 0, 13.5]} rot=${[0, 0, Math.PI / 2]} height=${3} />

      <${Corner} pos=${[-3, 0, 5.5]} />
      <${Corner} pos=${[-3, 0, 13.5]} />
      <${Corner} pos=${[3, 0, 5.5]} />
      <${Corner} pos=${[3, 0, 13.5]} />
    </group>
  `;
};

const Battery = () => {
  return html`
    <group position=${[0, 0, 13.5]} rotation=${[0, 0, Math.PI / 2]}>
      <mesh>
        <cylinderGeometry args=${[0.8, 0.8, 3.5, 32]} />
        <meshStandardMaterial color=${COLORS.batteryBody} roughness=${0.3} />
      </mesh>
      <mesh position=${[0, 1.95, 0]}>
        <cylinderGeometry args=${[0.3, 0.3, 0.4, 32]} />
        <meshStandardMaterial color=${COLORS.batteryPos} metalness=${0.5} roughness=${0.4} />
      </mesh>
      <mesh position=${[0, -1.85, 0]}>
        <cylinderGeometry args=${[0.6, 0.6, 0.2, 32]} />
        <meshStandardMaterial color=${COLORS.batteryNeg} metalness=${0.5} roughness=${0.4} />
      </mesh>
    </group>
  `;
};

export const Circuit = () => {
  return html`
    <group>
      <${Brushes} />
      <${Wires} />
      <${Battery} />
    </group>
  `;
};
