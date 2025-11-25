import React from 'react';

export const Controls = ({ 
  speed, 
  setSpeed, 
  showField, 
  setShowField 
}) => {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-8 items-center border border-white/50">
      
      {/* Speed Slider */}
      <div className="flex flex-col items-center gap-2">
        <label htmlFor="speed-slider" className="text-xs font-bold text-gray-600 tracking-wider uppercase">
          Voltage / Speed
        </label>
        <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-500">-10</span>
            <input
            id="speed-slider"
            type="range"
            min="-10"
            max="10"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-48 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700 transition-all"
            />
            <span className="text-xs font-mono text-gray-500">+10</span>
        </div>
        <div className="text-xs font-medium text-blue-600">
            Current: {speed.toFixed(1)}
        </div>
      </div>

      {/* Divider (Desktop) */}
      <div className="hidden md:block w-px h-12 bg-gray-300"></div>

      {/* Toggle Field */}
      <div className="flex items-center gap-3">
        <button
            role="switch"
            aria-checked={showField}
            onClick={() => setShowField(!showField)}
            className={`
                relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2
                ${showField ? 'bg-blue-600' : 'bg-gray-300'}
            `}
        >
            <span
                aria-hidden="true"
                className={`
                    pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                    ${showField ? 'translate-x-5' : 'translate-x-0'}
                `}
            />
        </button>
        <label className="text-sm font-bold text-gray-700 cursor-pointer select-none" onClick={() => setShowField(!showField)}>
          Magnetic Field
        </label>
      </div>
    </div>
  );
};