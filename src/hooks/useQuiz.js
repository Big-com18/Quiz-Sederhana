import { useState, useEffect } from 'react';
import { fetchQuestions } from '../services/api';

const QUIZ_DURATION = 10;

export const useQuiz = () => {
  const [gameState, setGameState] = useState('login'); 
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('quiz-state');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.timeLeft > 0 && parsed.gameState === 'playing') {
        setQuestions(parsed.questions);
        setCurrentIndex(parsed.currentIndex);
        setScore(parsed.score);
        setTimeLeft(parsed.timeLeft);
        setUserName(parsed.userName);
        setGameState('playing');
      }
    }
  }, []);

  // 2. Timer
  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          saveProgress({ timeLeft: newTime });
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      finishQuiz();
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const saveProgress = (updates = {}) => {
    const currentState = { gameState, questions, currentIndex, score, timeLeft, userName, ...updates };
    localStorage.setItem('quiz-state', JSON.stringify(currentState));
  };

  const startQuiz = async (name) => {
    setLoading(true);
    try {
      const qs = await fetchQuestions();
      setQuestions(qs);
      setUserName(name);
      setGameState('playing');
      setTimeLeft(QUIZ_DURATION);
      setCurrentIndex(0);
      setScore(0);
      
      localStorage.setItem('quiz-state', JSON.stringify({
        gameState: 'playing', questions: qs, currentIndex: 0, 
        score: 0, timeLeft: QUIZ_DURATION, userName: name
      }));
    } catch (err) {
      alert("Gagal ambil soal. Coba lagi sebentar lagi (Rate Limit).");
      setGameState('login');
    }
    setLoading(false);
  };

  const handleAnswer = (ans) => {
    const isCorrect = ans === questions[currentIndex].correct_answer;
    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);

    if (currentIndex + 1 < questions.length) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      saveProgress({ currentIndex: nextIdx, score: newScore });
    } else {
      finishQuiz(newScore);
    }
  };

  const finishQuiz = (finalScore = score) => {
    setGameState('finished');
    setScore(finalScore);
    localStorage.removeItem('quiz-state');
  };

  const resetQuiz = () => {
    setGameState('login');
    setUserName('');
    localStorage.removeItem('quiz-state');
  };

  return { gameState, questions, currentIndex, score, timeLeft, loading, startQuiz, handleAnswer, resetQuiz };
};