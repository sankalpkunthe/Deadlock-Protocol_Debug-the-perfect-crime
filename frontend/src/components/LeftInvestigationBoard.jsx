import React from 'react';

export default function LeftInvestigationBoard({ children }) {
  return (
    <section className="w-1/2 h-full flex flex-col border-r border-[#ec1313]/30 bg-[#241111] relative z-10 font-sans overflow-hidden">
      
      <style>{`
        .investigation-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .investigation-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .investigation-scroll::-webkit-scrollbar-thumb {
          background: #4a2020;
          border-radius: 4px;
        }
        .investigation-scroll::-webkit-scrollbar-thumb:hover {
          background: #ec1313;
        }
      `}</style>

      {/* 1. Minor Grid (Dense, faint lines - Opacity bumped from 20% to 40%) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#5a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#5a1a1a_1px,transparent_1px)] bg-size-[1rem_1rem]"></div>
      
      {/* 2. Major Grid (Wider lines - Opacity bumped from 30% to 60%) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 bg-[linear-gradient(to_right,#7a2020_1px,transparent_1px),linear-gradient(to_bottom,#7a2020_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>

      {/* 3. Soft Edge Vignette (Lightened the shadows so it doesn't crush the brightness) */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,#150505_120%)]"></div>

      {/* 4. Ambient Red Glow in Top Right (Increased intensity slightly) */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[#ec1313]/15 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      {/* 5. The Content Area */}
      <div className="flex-1 overflow-y-auto p-8 relative investigation-scroll flex flex-col items-center gap-12 pb-20 z-10">
        {children}
      </div>

    </section>
  );
}