
import React from 'react';

interface ProgressBarProps {
  totalSteps: number;
  currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ totalSteps, currentStep }) => {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div>
        <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-slate-600">
                진행도: {currentStep} / {totalSteps} 단계
            </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div 
                className="bg-[#449873] h-2.5 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    </div>
  );
};

export default ProgressBar;
