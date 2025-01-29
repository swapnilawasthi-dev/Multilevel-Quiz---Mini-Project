export type QuestionType = 'multiple-choice' | 'true-false' | 'text-input';
export type Level = 'easy' | 'medium' | 'hard';

export interface Question {
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: string;
}

export interface QuizState {
  currentLevel: Level;
  currentQuestionIndex: number;
  score: number;
  answers: { [key: string]: boolean };
  gameStatus: 'not-started' | 'in-progress' | 'level-complete' | 'game-over';
  timeLeft: number;
}

export interface TimerProps {
  timeLeft: number;
  onTimeUp: () => void;
}

export interface QuestionProps {
  question: Question;
  onAnswer: (answer: string) => void;
  answer: string;
  setAnswer: (answer: string) => void;
}
