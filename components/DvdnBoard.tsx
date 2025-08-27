import React from 'react';

interface DvdnBoardProps {
  activeStep: 'Intro' | 'O' | 'D1' | 'V' | 'D2' | 'M' | 'S' | 'C';
}

interface QuadrantProps {
    title: string;
    description: string;
    isActive: boolean;
    className?: string;
}

const Quadrant: React.FC<QuadrantProps> = ({ title, description, isActive, className = '' }) => {
    const baseClasses = "rounded-xl p-6 flex flex-col items-center justify-center text-center transition-all duration-500 transform";
    const activeClasses = "bg-[#449873] text-white shadow-lg scale-105";
    const inactiveClasses = "bg-white text-slate-700 shadow-md border border-slate-200";

    return (
        <div className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} ${className}`}>
            <h3 className="text-4xl font-extrabold">{title}</h3>
            <p className={`mt-2 text-sm font-semibold ${isActive ? 'text-emerald-100' : 'text-slate-500'}`}>{description}</p>
        </div>
    );
};

const DvdnBoard: React.FC<DvdnBoardProps> = ({ activeStep }) => {
  const isActive = (step: 'D1' | 'V' | 'D2' | 'M') => activeStep === step;

  const getGridMessage = () => {
    switch(activeStep) {
        case 'Intro':
        case 'O':
            return "워크숍/\n 준비 단계";
        case 'S':
        case 'C':
            return "결과 공유\n및 마무리";
        default:
            return "DVDM 프레임\n진행";
    }
  }

  return (
    <div className="w-full max-w-md aspect-square p-4 bg-slate-100 rounded-2xl shadow-inner">
        <div className="grid grid-cols-2 grid-rows-2 gap-4 h-full relative">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-28 h-28 bg-white rounded-full shadow-lg flex items-center justify-center flex-col z-10 p-2">
                    <span className="text-xs text-slate-500">현재 단계</span>
                    <span className="font-bold text-[#449873] text-xs text-center whitespace-pre-wrap leading-tight">{getGridMessage()}</span>
                </div>
            </div>
            <Quadrant title="D" description="정의 (Definition)" isActive={isActive('D1')} />
            <Quadrant title="V" description="가치 (Value)" isActive={isActive('V')} />
            <Quadrant title="D" description="난관 (Difficulty)" isActive={isActive('D2')} />
            <Quadrant title="M" description="해법 (Method)" isActive={isActive('M')} />
        </div>
    </div>
  );
};

export default DvdnBoard;