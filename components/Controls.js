
import React from 'react';
import { html } from '../utils.js';

export const Controls = ({ 
  speed, 
  setSpeed, 
  showField, 
  setShowField,
  isRunning,
  setIsRunning
}) => {
  return html`
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-8 items-center border border-white/50">
      
      {/* Play/Pause Control */}
      <button 
        onClick=${() => setIsRunning(!isRunning)}
        className=${`
            flex items-center justify-center w-12 h-12 rounded-full text-white shadow-lg transition-transform hover:scale-105 active:scale-95
            ${isRunning ? 'bg-amber-500 hover:bg-amber-600' : 'bg-green-500 hover:bg-green-600'}
        `}
        aria-label=${isRunning ? "Stop Simulation" : "Start Simulation"}
      >
        ${isRunning 
            ? html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>` 
            : html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`
        }
      </button>

      {/* Divider */}
      <div className="hidden md:block w-px h-12 bg-gray-300"></div>

      {/* Speed Slider */}
      <div className="flex flex-col items-center gap-2">
        <label htmlFor="speed-slider" className="text-xs font-bold text-gray-600 tracking-wider uppercase">
          Voltage / Speed
        </label>
        <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-500">-20</span>
            <input
            id="speed-slider"
            type="range"
            min="-20"
            max="20"
            step="0.5"
            value=${speed}
            onChange=${(e) => setSpeed(parseFloat(e.target.value))}
            className="w-48 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700 transition-all"
            />
            <span className="text-xs font-mono text-gray-500">+20</span>
        </div>
        <div className="text-xs font-medium text-blue-600">
            Current: ${speed.toFixed(1)}
        </div>
      </div>

      {/* Divider */}
      <div className="hidden md:block w-px h-12 bg-gray-300"></div>

      {/* Toggle Field */}
      <div className="flex items-center gap-3">
        <button
            role="switch"
            aria-checked=${showField}
            onClick=${() => setShowField(!showField)}
            className=${`
                relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2
                ${showField ? 'bg-blue-600' : 'bg-gray-300'}
            `}
        >
            <span
                aria-hidden="true"
                className=${`
                    pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                    ${showField ? 'translate-x-5' : 'translate-x-0'}
                `}
            />
        </button>
        <label className="text-sm font-bold text-gray-700 cursor-pointer select-none" onClick=${() => setShowField(!showField)}>
          Magnetic Field
        </label>
      </div>
    </div>
  `;
};
