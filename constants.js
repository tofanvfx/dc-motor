
import * as THREE from 'three';

export const COLORS = {
  background: '#87CEEB', // Sky Blue
  magnetS: '#2735F5',    // Blue
  magnetN: '#D41919',    // Red
  coil: '#B87333',       // Copper
  commutator: '#B87333', // Copper
  brush: '#333333',      // Dark Grey
  wire: '#FF4500',       // Orange/Red Wire
  batteryBody: '#222222',
  batteryPos: '#B87333',
  batteryNeg: '#AAAAAA',
  fieldLine: '#FFFFFF',
  text: '#FFFFFF',
  forceArrow: '#FF0000'  // Red (Snippet value)
};

export const GEOMETRY_CONFIG = {
  magnet: {
    width: 6,
    height: 8,
    depth: 10,
    radius: 4.5
  },
  coil: {
    radius: 0.15,
    width: 2.2,
    length: 4.5
  }
};

export const FONT_URL = 'https://unpkg.com/three@0.160.0/examples/fonts/helvetiker_bold.typeface.json';
