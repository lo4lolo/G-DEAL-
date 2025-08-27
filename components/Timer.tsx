
import React, { useState, useEffect, useRef } from 'react';
import { PlayIcon, PauseIcon, ResetIcon } from './Icons';

interface TimerProps {
  duration: number; // in minutes
}

const Timer: React.FC<TimerProps> = ({ duration }) => {
  const initialTime = duration * 60;
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    setTimeLeft(duration * 60);
    setIsRunning(false);
    if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }
  }, [duration]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev > 0) return prev - 1;
          setIsRunning(false);
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 0;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const toggleTimer = () => {
    if(timeLeft > 0) {
        setIsRunning(!isRunning);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progress = initialTime > 0 ? ((initialTime - timeLeft) / initialTime) * 100 : 0;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  if (duration === 0) return null;

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full" viewBox="0 0 120 120">
          <circle
            className="text-slate-200"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
          />
          <circle
            className="text-[#449873] transition-all duration-500"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
            transform="rotate(-90 60 60)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold text-slate-700 tracking-tighter">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={toggleTimer} className="p-2 rounded-full bg-white hover:bg-slate-100 border border-slate-300 shadow-sm transition-colors" aria-label={isRunning ? 'Pause' : 'Play'}>
          {isRunning ? <PauseIcon className="w-5 h-5 text-slate-600" /> : <PlayIcon className="w-5 h-5 text-slate-600" />}
        </button>
        <button onClick={resetTimer} className="p-2 rounded-full bg-white hover:bg-slate-100 border border-slate-300 shadow-sm transition-colors" aria-label="Reset">
          <ResetIcon className="w-5 h-5 text-slate-600" />
        </button>
      </div>
    </div>
  );
};

export default Timer;
