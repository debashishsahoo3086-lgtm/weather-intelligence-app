import React from 'react';

export function RainOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden mix-blend-multiply dark:mix-blend-screen opacity-80">
      <div className="rain-layer-1 absolute inset-0"></div>
      <div className="rain-layer-2 absolute inset-0"></div>
    </div>
  );
}
