import React from 'react';

export default function Result({ score, total, onRetry }) {
  return (
    <div className="glass-card" style={{textAlign:'center'}}>
      <h1>Selesai! 🏆</h1>
      <div style={{fontSize:'4rem', fontWeight:'bold', margin:'1rem 0', color:'#4ade80'}}>{score}</div>
      <p style={{color:'#94a3b8'}}>Dari {total} soal</p>
      <button className="btn-primary" onClick={onRetry}>Main Lagi</button>
    </div>
  );
}