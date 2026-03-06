import React from 'react';
import Pin from '../components/Pin';

export default function PoliceFIR({ caseId, officer, subject, content, rotation = 0, pinTop = '12px', pinLeft = '50%' }) {
  return (
    <div 
      className="relative w-full max-w-md bg-[#e5e1d8] p-8 shadow-[8px_8px_0px_rgba(0,0,0,1)] border-2 border-black font-serif text-black overflow-hidden transition-transform hover:scale-105"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <Pin top={pinTop} left={pinLeft} />
      
      <div className="absolute top-4 -right-5 rotate-12 border-4 border-red-600 px-4 py-1 text-red-600 font-bold text-xl opacity-80 select-none">
        CONFIDENTIAL
      </div>

      <div className="border-b-2 border-black/20 pb-4 mb-6 uppercase tracking-tighter">
        <h2 className="text-2xl font-black mb-2 underline decoration-red-600/50">Incident Report</h2>
        <div className="grid grid-cols-2 text-[12px] gap-y-1">
          <span className="font-bold">Case No:</span> <span>{caseId}</span>
          <span className="font-bold">Officer:</span> <span>{officer}</span>
          <span className="font-bold">Subject:</span> <span className="truncate">{subject}</span>
        </div>
      </div>

      <div className="leading-relaxed text-sm whitespace-pre-wrap font-medium">
        {content}
      </div>

      <div className="absolute bottom-4 right-4 opacity-10">
        <div className="w-12 h-12 rounded-full border-4 border-black flex items-center justify-center font-bold">
          PD
        </div>
      </div>
    </div>
  );
}