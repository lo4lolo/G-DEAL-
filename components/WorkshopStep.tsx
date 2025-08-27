
import React from 'react';
import type { WorkshopStep as WorkshopStepType } from '../types';
import Timer from './Timer';
import { QuestionIcon, InfoIcon, CheckCircleIcon } from './Icons';

interface WorkshopStepProps {
  step: WorkshopStepType;
}

const WorkshopStep: React.FC<WorkshopStepProps> = ({ step }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-start gap-4 mb-6">
        {step.duration > 0 && <Timer duration={step.duration} />}
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#449873] uppercase tracking-wider">{`단계 ${step.shortTitle}`}</p>
          <h2 className="text-3xl font-bold text-slate-800 mt-1">{step.title}</h2>
          <p className="text-slate-600 mt-2">{step.description}</p>
        </div>
      </div>
      
      <div className="space-y-6 flex-grow">
        <div>
          <h3 className="text-lg font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <InfoIcon className="w-5 h-5 text-slate-500" />
            상세 활동
          </h3>
          <ul className="space-y-2">
            {step.details.map((detail, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span className="text-slate-600">{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <QuestionIcon className="w-5 h-5 text-slate-500" />
            촉진 질문 (예시)
          </h3>
          <div className="space-y-3">
            {step.questions.map((question, index) => (
              <div key={index} className="p-3 bg-emerald-50/70 border-l-4 border-[#449873] rounded-r-lg">
                <p className="text-emerald-800 font-medium">"{question}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopStep;
