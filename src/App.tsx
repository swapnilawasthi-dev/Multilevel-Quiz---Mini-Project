import React, { useState, useEffect, useCallback } from 'react';
import { Brain, Trophy, Sparkles, Crown } from 'lucide-react';
import { quizQuestions } from './data/questions';
import { Level, Question, QuizState } from './types/quiz';
import QuestionComponent from './components/Question';
import Feedback from './components/Feedback';
import Timer from './components/Timer';

const REQUIRED_CORRECT_ANSWERS = 2;
const QUESTION_TIME_LIMIT = 30;
const QUESTIONS_PER_LEVEL = 3;
const POINTS = {
  easy: 10,
  medium: 20,
  hard: 30,
};

function App() {
  const [state, setState] = useState<QuizState>(() => {
    const savedState = localStorage.getItem('quizState');
    return savedState ? JSON.parse(savedState) : {
      currentLevel: 'easy',
      currentQuestionIndex: 0,
      score: 0,
      answers: {},
      gameStatus: 'not-started',
      timeLeft: QUESTION_TIME_LIMIT,
    };
  });

  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('highScore') || '0', 10);
  });

  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);

  const shuffleQuestions = useCallback((level: Level) => {
    const questions = [...quizQuestions[level]];
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    return questions.slice(0, QUESTIONS_PER_LEVEL);
  }, []);

  const [questions, setQuestions] = useState<{ [key in Level]: Question[] }>({
    easy: [],
    medium: [],
    hard: [],
  });

  useEffect(() => {
    setQuestions({
      easy: shuffleQuestions('easy'),
      medium: shuffleQuestions('medium'),
      hard: shuffleQuestions('hard'),
    });
  }, [shuffleQuestions]);

  useEffect(() => {
    if (state.gameStatus !== 'not-started') {
      localStorage.setItem('quizState', JSON.stringify(state));
    }
  }, [state]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (state.gameStatus === 'in-progress' && state.timeLeft > 0 && !showFeedback) {
      timer = setInterval(() => {
        setState((prev) => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [state.gameStatus, state.timeLeft, showFeedback]);

  const startGame = () => {
    setQuestions({
      easy: shuffleQuestions('easy'),
      medium: shuffleQuestions('medium'),
      hard: shuffleQuestions('hard'),
    });
    setState({
      currentLevel: 'easy',
      currentQuestionIndex: 0,
      score: 0,
      answers: {},
      gameStatus: 'in-progress',
      timeLeft: QUESTION_TIME_LIMIT,
    });
    localStorage.removeItem('quizState');
  };

  const handleAnswer = (answer: string) => {
    if (state.gameStatus !== 'in-progress') return;
    
    const currentQuestion = questions[state.currentLevel][state.currentQuestionIndex];
    if (!currentQuestion) return;

    const isCorrect = answer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
    
    if (isCorrect) {
      setState((prev) => ({
        ...prev,
        score: prev.score + POINTS[prev.currentLevel],
        answers: { ...prev.answers, [`${prev.currentLevel}-${prev.currentQuestionIndex}`]: true },
      }));
    } else {
      setState((prev) => ({
        ...prev,
        answers: { ...prev.answers, [`${prev.currentLevel}-${prev.currentQuestionIndex}`]: false },
      }));
    }

    setLastAnswerCorrect(isCorrect);
    setShowFeedback(true);
  };

  const handleTimeUp = useCallback(() => {
    if (state.gameStatus === 'in-progress' && !showFeedback) {
      handleAnswer('');
    }
  }, [state.gameStatus, showFeedback]);

  const continueQuiz = () => {
    setShowFeedback(false);
    const currentLevelQuestions = questions[state.currentLevel];
    
    if (state.currentQuestionIndex + 1 < currentLevelQuestions.length) {
      setState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        timeLeft: QUESTION_TIME_LIMIT,
      }));
    } else {
      const correctAnswers = Object.entries(state.answers)
        .filter(([key]) => key.startsWith(state.currentLevel))
        .filter(([, isCorrect]) => isCorrect).length;

      if (correctAnswers >= REQUIRED_CORRECT_ANSWERS) {
        if (state.currentLevel === 'hard') {
          const newHighScore = Math.max(state.score, highScore);
          setHighScore(newHighScore);
          localStorage.setItem('highScore', newHighScore.toString());
          setState((prev) => ({ ...prev, gameStatus: 'game-over' }));
        } else {
          const nextLevel = state.currentLevel === 'medium' ? 'hard' : 'medium';
          setState((prev) => ({
            ...prev,
            currentLevel: nextLevel,
            currentQuestionIndex: 0,
            gameStatus: 'level-complete',
            timeLeft: QUESTION_TIME_LIMIT,
          }));
        }
      } else {
        const newHighScore = Math.max(state.score, highScore);
        setHighScore(newHighScore);
        localStorage.setItem('highScore', newHighScore.toString());
        setState((prev) => ({ ...prev, gameStatus: 'game-over' }));
      }
    }
  };

  const currentQuestion = questions[state.currentLevel][state.currentQuestionIndex];
  const progressPercentage = (state.currentQuestionIndex / questions[state.currentLevel].length) * 100;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {state.gameStatus === 'not-started' && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in">
            <div className="quiz-gradient p-8 text-white text-center">
              <Brain className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 drop-shadow-lg" />
              <h1 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-4">Brain Quest</h1>
              <p className="text-base sm:text-lg opacity-90">Challenge Your Knowledge</p>
            </div>
            <div className="p-4 sm:p-8 bg-white">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-indigo-50 rounded-lg">
                  <div className="p-2 bg-indigo-100 rounded-full">
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-indigo-900">Three Difficulty Levels</h3>
                    <p className="text-sm sm:text-base text-indigo-700">Progress from Easy to Hard</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-green-50 rounded-lg">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-900">Earn Points</h3>
                    <p className="text-sm sm:text-base text-green-700">Score up to 30 points per question</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-yellow-50 rounded-lg">
                  <div className="p-2 bg-yellow-100 rounded-full">
                    <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-yellow-900">High Score: {highScore}</h3>
                    <p className="text-sm sm:text-base text-yellow-700">Can you beat it?</p>
                  </div>
                </div>
              </div>
              <button
                onClick={startGame}
                className="w-full mt-6 sm:mt-8 bg-indigo-600 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl font-semibold hover:bg-indigo-700 transform transition-all hover:scale-105 focus:ring-4 focus:ring-indigo-200"
              >
                Start Quiz
              </button>
            </div>
          </div>
        )}

        {state.gameStatus === 'in-progress' && (
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 animate-fade-in">
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold capitalize text-indigo-900">{state.currentLevel} Level</h2>
                  <p className="text-indigo-600">Question {state.currentQuestionIndex + 1} of {questions[state.currentLevel].length}</p>
                </div>
                <div className="flex items-center gap-4 sm:gap-6">
                  {!showFeedback && <Timer timeLeft={state.timeLeft} onTimeUp={handleTimeUp} />}
                  <div className="text-base sm:text-lg font-semibold bg-indigo-50 px-3 sm:px-4 py-2 rounded-lg">
                    Score: {state.score}
                  </div>
                  <div className="text-base sm:text-lg font-semibold bg-yellow-50 px-3 sm:px-4 py-2 rounded-lg">
                    High Score: {highScore}
                  </div>
                </div>
              </div>
              <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-indigo-600 progress-bar"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {showFeedback ? (
              <Feedback
                isCorrect={lastAnswerCorrect}
                correctAnswer={currentQuestion.correctAnswer}
                onContinue={continueQuiz}
              />
            ) : (
              currentQuestion && <QuestionComponent
                question={currentQuestion}
                onAnswer={handleAnswer}
              />
            )}
          </div>
        )}

        {state.gameStatus === 'level-complete' && (
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 text-center animate-fade-in">
            <div className="quiz-gradient -mx-4 sm:-mx-8 -mt-4 sm:-mt-8 p-6 sm:p-8 mb-6 sm:mb-8">
              <Trophy className="w-16 h-16 sm:w-24 sm:h-24 mx-auto text-yellow-300 drop-shadow-lg mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Level Complete!</h2>
              <p className="text-lg sm:text-xl text-white opacity-90">
                You've mastered the {state.currentLevel === 'medium' ? 'easy' : 'medium'} level
              </p>
            </div>
            <div className="mb-6 sm:mb-8">
              <p className="text-xl sm:text-2xl font-bold text-indigo-600 mb-2">Current Score: {state.score}</p>
              <p className="text-gray-600">
                Ready to tackle the {state.currentLevel} level?
              </p>
              <p className="text-lg font-semibold text-yellow-600 mt-4">High Score: {highScore}</p>
            </div>
            <button
              onClick={() => setState((prev) => ({ ...prev, gameStatus: 'in-progress' }))}
              className="bg-indigo-600 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl font-semibold hover:bg-indigo-700 transform transition-all hover:scale-105 focus:ring-4 focus:ring-indigo-200"
            >
              Continue to Next Level
            </button>
          </div>
        )}

        {state.gameStatus === 'game-over' && (
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 text-center animate-fade-in">
            <div className="quiz-gradient -mx-4 sm:-mx-8 -mt-4 sm:-mt-8 p-6 sm:p-8 mb-6 sm:mb-8">
              <Trophy className="w-16 h-16 sm:w-24 sm:h-24 mx-auto text-yellow-300 drop-shadow-lg mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Game Over!</h2>
              <p className="text-lg sm:text-xl text-white opacity-90">
                {state.currentLevel === 'hard' && state.currentQuestionIndex === questions.hard.length
                  ? "Congratulations! You've completed all levels!"
                  : `You reached the ${state.currentLevel} level`}
              </p>
            </div>
            <div className="mb-6 sm:mb-8">
              <p className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-4">Final Score: {state.score}</p>
              <p className="text-lg font-semibold text-yellow-600 mb-4">High Score: {highScore}</p>
              <p className="text-gray-600">
                Think you can do better? Give it another try!
              </p>
            </div>
            <button
              onClick={startGame}
              className="bg-indigo-600 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl font-semibold hover:bg-indigo-700 transform transition-all hover:scale-105 focus:ring-4 focus:ring-indigo-200"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;