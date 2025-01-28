import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface FeedbackProps {
  isCorrect: boolean;
  correctAnswer: string;
  onContinue: () => void;
}

const Feedback: React.FC<FeedbackProps> = ({ isCorrect, correctAnswer, onContinue }) => {
  return (
    <div className="text-center py-8 animate-fade-in">
      {isCorrect ? (
        <div className="space-y-6">
          <div className="bg-green-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-green-500 mb-2">Correct!</h3>
            <p className="text-green-600">Well done! Keep up the great work!</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-red-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
            <XCircle className="w-16 h-16 text-red-500" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-red-500 mb-2">Incorrect</h3>
            <p className="text-gray-600 mb-2">Don't worry, learning is a journey!</p>
            <div className="bg-gray-50 p-4 rounded-lg inline-block">
              <p className="text-sm text-gray-500 mb-1">The correct answer was:</p>
              <p className="text-lg font-semibold text-gray-900">{correctAnswer}</p>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={onContinue}
        className="mt-8 bg-indigo-600 text-white py-4 px-8 rounded-xl font-semibold hover:bg-indigo-700 transform transition-all hover:scale-105 focus:ring-4 focus:ring-indigo-200"
      >
        Continue
      </button>
    </div>
  );
};

export default Feedback;