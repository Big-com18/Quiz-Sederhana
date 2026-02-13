import React from 'react';

export default function ProgressBar({ current, max }) {
  const percentage = (current / max) * 100;
  return (
    <div style={{height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '1.5rem', overflow:'hidden'}}>
      <div style={{
        height: '100%', width: `${percentage}%`, 
        background: percentage < 20 ? '#ef4444' : '#3b82f6',
        transition: 'width 1s linear'
      }}></div>
    </div>
  );
}