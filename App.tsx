
import React, { useState, useMemo } from 'react';
import { WORKSHOP_STEPS } from './constants';
import type { WorkshopStep as WorkshopStepType } from './types';
import DvdnBoard from './components/DvdnBoard';
import WorkshopStep from './components/WorkshopStep';
import ProgressBar from './components/ProgressBar';
import { ArrowLeftIcon, ArrowRightIcon, HomeIcon } from './components/Icons';

export default function App(): React.ReactElement {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handleNext = () => {
    setCurrentStepIndex((prev) => Math.min(prev + 1, WORKSHOP_STEPS.length - 1));
  };

  const handlePrev = () => {
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const goToStart = () => {
    setCurrentStepIndex(0);
  };

  const currentStep: WorkshopStepType = useMemo(() => WORKSHOP_STEPS[currentStepIndex], [currentStepIndex]);

  return (
    <div className="bg-emerald-50/50 min-h-screen text-slate-800 flex flex-col justify-center items-center p-4 lg:p-8 font-sans">
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-2xl shadow-slate-300/30 overflow-hidden flex flex-col h-[90vh]">
        <header className="p-4 border-b border-slate-200 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src="https://folio.itt.link/attachfiles/upload/board/SITE_000000000000001/323/BBSMSTR_000003234647/FILE_000000005988802_1" alt="G-DEAL Logo" className="h-10" />
            <div>
              <h1 className="text-xl font-bold text-slate-800">G-DEAL 커뮤니티 워크숍: DVDM 프레임</h1>
              <p className="text-sm text-slate-500">G-DEAL 내 소그룹 커뮤니티 활성화를 위한 실행계획 수립</p>
            </div>
          </div>
           <button onClick={goToStart} className="p-2 rounded-full hover:bg-slate-100 transition-colors duration-200" aria-label="처음으로">
              <HomeIcon className="w-6 h-6 text-slate-500" />
            </button>
        </header>
        
        <div className="p-4">
          <ProgressBar totalSteps={WORKSHOP_STEPS.length} currentStep={currentStepIndex + 1} />
        </div>

        <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8 overflow-y-auto">
          <div className="flex items-center justify-center rounded-lg">
            <DvdnBoard activeStep={currentStep.shortTitle} />
          </div>
          <div className="flex flex-col">
            <WorkshopStep step={currentStep} />
          </div>
        </main>
        
        <footer className="p-4 border-t border-slate-200 flex justify-between items-center gap-4 bg-slate-50/50">
          <div className="text-xs text-slate-500">
            <p>DVDM은 KOOFA에서 등록된 질문 프레임 도구입니다.</p>
            <p>쿠퍼실리테이션그룹 구기욱 대표가 개발하였으며, 사용 시 출처 표기가 필요합니다.</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handlePrev} 
              disabled={currentStepIndex === 0}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              이전
            </button>
            <button 
              onClick={handleNext} 
              disabled={currentStepIndex === WORKSHOP_STEPS.length - 1}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#449873] rounded-lg shadow-sm hover:bg-[#3a8a65] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              다음
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}