import React from 'react';

export default function TerminalPrintout({ logDate, user, content, rotation = 0 }) {

  const holes = [...Array(8)];

  return (
    <div 
      className="relative w-full max-w-md bg-[#f4f4ec] text-black font-mono shadow-[6px_6px_0px_rgba(0,0,0,1)] flex transition-transform hover:scale-105"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* LEFT Perforated Edge */}
      <div className="w-8 border-r-2 border-dashed border-black/20 flex flex-col justify-between items-center py-4 bg-[#ecece3]">
        {holes.map((_, i) => (
          // The background of the hole matches your app's background to look see-through
          <div key={`left-${i}`} className="w-3 h-3 rounded-full bg-[#1a0505] shadow-[inset_1px_1px_3px_rgba(0,0,0,0.8)]"></div>
        ))}
      </div>

      {/* MAIN Content Area */}
      <div className="flex-1 p-6 flex flex-col">
        
        <div className="text-center border-b-2 border-black/30 pb-3 mb-4">
          <p className="font-bold tracking-[0.2em] text-sm">*** EVIDENCE LOG ***</p>
          <p className="text-xs opacity-70 mt-1">TERMINAL 42-X</p>
        </div>

        <div className="text-xs space-y-1 uppercase mb-6 font-bold opacity-80">
          <div className="flex justify-between border-b border-black/10 pb-1">
            <span>DATE:</span> <span>{logDate}</span>
          </div>
          <div className="flex justify-between border-b border-black/10 pb-1">
            <span>USER:</span> <span>{user}</span>
          </div>
        </div>

        <div className="text-sm font-bold leading-relaxed whitespace-pre-wrap flex-1">
          {content}
        </div>

        <div className="mt-6 text-center text-[10px] opacity-50 uppercase tracking-widest">
          END OF TRANSMISSION
        </div>
      </div>

      {/* RIGHT Perforated Edge */}
      <div className="w-8 border-l-2 border-dashed border-black/20 flex flex-col justify-between items-center py-4 bg-[#ecece3]">
        {holes.map((_, i) => (
          <div key={`right-${i}`} className="w-3 h-3 rounded-full bg-[#1a0505] shadow-[inset_1px_1px_3px_rgba(0,0,0,0.8)]"></div>
        ))}
      </div>
      
    </div>
  );
}