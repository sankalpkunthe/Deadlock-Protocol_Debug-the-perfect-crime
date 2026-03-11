import React from 'react';

export default function AutopsyReport({ subjectId, tod, cause, notes, rotation = 0 }) {
  return (
    <div 
      className="relative w-full max-w-2xl bg-[#0a0202] border border-red-900/50 p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)] font-mono text-red-500 transition-transform hover:scale-105 flex overflow-hidden"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#880000_1px,transparent_1px),linear-gradient(to_bottom,#880000_1px,transparent_1px)] bg-size-[1.5rem_1.5rem] pointer-events-none"></div>

      {/* LEFT COLUMN: Body Schematic */}
      <div className="w-1/3 border-r border-red-900/40 pr-6 relative flex flex-col items-center justify-center z-10">
         <div className="text-[10px] tracking-[0.3em] mb-4 opacity-50 uppercase text-center w-full border-b border-red-900/30 pb-2">
            Fig 1. Trauma Vector
         </div>
         
         <svg viewBox="0 0 100 200" className="w-24 h-48 stroke-red-800 fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="50" cy="30" r="14" /> {/* Head */}
            <line x1="50" y1="44" x2="50" y2="110" /> {/* Spine */}
            <line x1="50" y1="55" x2="20" y2="95" /> {/* Left Arm */}
            <line x1="50" y1="55" x2="80" y2="95" /> {/* Right Arm */}
            <line x1="50" y1="110" x2="25" y2="180" /> {/* Left Leg */}
            <line x1="50" y1="110" x2="75" y2="180" /> {/* Right Leg */}
            
            {/* Glowing Red Trauma Point (Placed on the head) */}
            <circle cx="50" cy="25" r="4" className="fill-red-500 stroke-none animate-[pulse_1s_ease-in-out_infinite] drop-shadow-[0_0_6px_rgba(239,68,68,1)]" />
         </svg>
      </div>

      {/* RIGHT COLUMN: Data Fields */}
      <div className="w-2/3 pl-6 flex flex-col justify-between z-10">
        <div>
          <h2 className="text-lg font-black tracking-widest text-red-600 mb-6 border-b border-red-900/50 pb-2 uppercase">
            Medical Examiner Report
          </h2>
          
          <div className="space-y-4 text-xs font-bold">
            <div className="flex justify-between border-b border-red-900/20 pb-1">
              <span className="opacity-60 tracking-wider">Subject_ID</span>
              <span className="text-gray-300">{subjectId}</span>
            </div>
            <div className="flex justify-between border-b border-red-900/20 pb-1">
              <span className="opacity-60 tracking-wider">ToD</span>
              <span className="text-gray-300">{tod}</span>
            </div>
            <div className="flex justify-between border-b border-red-900/20 pb-1">
              <span className="opacity-60 tracking-wider">Cause</span>
              <span className="text-red-500 drop-shadow-[0_0_2px_rgba(239,68,68,0.8)] uppercase">
                {cause}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-xs leading-relaxed text-gray-400 whitespace-pre-wrap">
          <span className="block text-[10px] uppercase tracking-widest text-red-800 mb-2">Analysis Notes:</span>
          {notes}
        </div>
      </div>
      
    </div>
  );
}