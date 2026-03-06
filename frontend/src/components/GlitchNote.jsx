import { useState } from 'react';

export default function GlitchNote({ text, rotation = 0 }) {
  
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div 
      onClick={() => setIsRevealed(true)}
      className={`relative w-56 min-h-50 p-5 cursor-pointer transition-all duration-100 shadow-[6px_6px_0px_rgba(0,0,0,1)] font-mono flex flex-col items-center justify-center text-center select-none
        ${isRevealed 
          ? 'bg-[#eaff00] text-black border-2 border-black' 
          : 'bg-black text-[#ff0055] border-2 border-[#ff0055] hover:bg-[#1a0008]'
        }`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Semi-transparent Masking Tape at the top */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-white/30 backdrop-blur-md -rotate-3 border border-white/20"></div>

      {/* What to show based on the 'isRevealed' state */}
      {!isRevealed ? (
        <div className="group flex flex-col items-center">
          <span className="block text-3xl mb-2 animate-pulse">⚠️</span>
          {/* This text-shadow creates the chromatic aberration glitch effect on hover */}
          <span className="text-sm font-black tracking-widest group-hover:[text-shadow:-2px_0_cyan,2px_0_yellow]">
            REVEAL CLUE
          </span>
          <span className="block text-[10px] mt-4 opacity-60">COST: CREDIBILITY</span>
        </div>
      ) : (
        <div className="text-sm font-bold leading-relaxed w-full">
          <span className="block text-xs uppercase opacity-50 mb-2 border-b border-black pb-1">Decrypted Hint</span>
          {text}
        </div>
      )}
    </div>
  );
}