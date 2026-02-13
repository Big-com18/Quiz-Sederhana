import React from 'react';
import he from 'he';
import ProgressBar from './ProgressBar.jsx';

export default function QuestionCard({ question, currentIndex, totalQuestions, timeLeft, onAnswer }) {
  return (
    <div className="glass-card">
      <div style={{display:'flex', justifyContent:'space-between', marginBottom:'1rem', color:'#94a3b8'}}>
        <span>Soal {currentIndex + 1}/{totalQuestions}</span>
        <span>⏱️ {Math.floor(timeLeft/60)}:{(timeLeft%60).toString().padStart(2,'0')}</span>
      </div>
      
      <ProgressBar current={timeLeft} max={120} />
      
      <h2 style={{fontSize:'1.2rem', marginBottom:'1.5rem'}}>{he.decode(question.question)}</h2>
      
      <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
        {question.answers.map((ans, i) => (
          <button key={i} className="option-btn" onClick={() => onAnswer(ans)}>
            {he.decode(ans)}
          </button>
        ))}
      </div>
    </div>
  );
}