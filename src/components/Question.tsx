import React from 'react';
import { QuestionProps } from '../types/quiz';

// This component renders different types of questions and handles answer submission

const QuestionComponent: React.FC<QuestionProps> = ({ question, onAnswer, answer, setAnswer }) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnswer(answer);
    setAnswer('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto animate-fade-in">
      <div className="bg-indigo-50 p-6 rounded-xl mb-8">
        <h2 className="text-2xl font-bold text-indigo-900 mb-2">{question.question}</h2>
        <p className="text-indigo-600 text-sm uppercase tracking-wide">
          {question.type === 'multiple-choice' ? 'Choose one answer' : 
           question.type === 'true-false' ? 'True or False' : 
           'Type your answer'}
        </p>
      </div>

      {question.type === 'multiple-choice' && (
        <div className="space-y-4">
          {question.options?.map((option) => (
            <label 
              key={option} 
              className="answer-option block cursor-pointer"
            >
              <div className={`
                flex items-center p-4 rounded-xl border-2 transition-all
                ${answer === option 
                  ? 'border-indigo-600 bg-indigo-50' 
                  : 'border-gray-200 hover:border-indigo-200'}
              `}>
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={answer === option}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-4 text-lg">{option}</span>
              </div>
            </label>
          ))}
        </div>
      )}

      {question.type === 'true-false' && (
        <div className="grid grid-cols-2 gap-4">
          {['true', 'false'].map((option) => (
            <label 
              key={option} 
              className="answer-option cursor-pointer"
            >
              <div className={`
                flex items-center justify-center p-6 rounded-xl border-2 transition-all
                ${answer === option 
                  ? 'border-indigo-600 bg-indigo-50' 
                  : 'border-gray-200 hover:border-indigo-200'}
              `}>
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={answer === option}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-4 text-lg capitalize">{option}</span>
              </div>
            </label>
          ))}
        </div>
      )}

      {question.type === 'text-input' && (
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here..."
          className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
        />
      )}

      <button
        type="submit"
        disabled={!answer}
        className="mt-8 w-full bg-indigo-600 text-white py-4 px-8 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-105 focus:ring-4 focus:ring-indigo-200"
      >
        Submit Answer
      </button>
    </form>
  );
};

export default QuestionComponent;