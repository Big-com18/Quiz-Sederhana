import React from 'react';
import { useQuiz } from './hooks/useQuiz';
import LoginForm from './components/LoginForm.jsx';
import QuestionCard from './components/QuestionCard.jsx';
import Result from './components/Result.jsx';

function App() {
  const { gameState, questions, currentIndex, score, timeLeft, loading, startQuiz, handleAnswer, resetQuiz } = useQuiz();

  if (loading) return <div style={{color:'white'}}>Loading Soal... ⏳</div>;

  return (
    <>
      {gameState === 'login' && <LoginForm onStart={startQuiz} />}
      
      {gameState === 'playing' && questions.length > 0 && (
        <QuestionCard 
          question={questions[currentIndex]} 
          currentIndex={currentIndex}
          totalQuestions={questions.length}
          timeLeft={timeLeft}
          onAnswer={handleAnswer}
        />
      )}
      
      {gameState === 'finished' && <Result score={score} total={questions.length} onRetry={resetQuiz} />}
    </>
  );
}

export default App;