import React from 'react';
import { Timer as TimerIcon } from 'lucide-react';
import { TimerProps } from '../types/quiz';

// This component renders the timer with different colors according to time left and handles when time run out

const Timer: React.FC<TimerProps> = ({ timeLeft, onTimeUp }) => {
  React.useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
    }
  }, [timeLeft, onTimeUp]);

  const getTimerColor = () => {
    if (timeLeft > 15) return 'text-green-600';
    if (timeLeft > 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className={`flex items-center gap-2 text-lg font-semibold ${getTimerColor()} transition-colors duration-300`}>
      <TimerIcon className="w-5 h-5" />
      <span>{timeLeft}s</span>
    </div>
  );
};

export default React.memo(Timer);