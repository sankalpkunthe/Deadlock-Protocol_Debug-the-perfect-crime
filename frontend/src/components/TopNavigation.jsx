import React from 'react';
import CredibilityBadge from './CredibilityBadge';

export default function TopNavigation({ 
  currentChapter = 1, 
  chapterName = "The First Cut", 
  currentQuestion = 6, 
  totalQuestions = 10,
  credibility = "green"
}) {
  const activeQ = Number(currentQuestion);
  const totalQ = Number(totalQuestions);

  return (
    <header className="relative z-50 h-16 border-b border-[#ec1313]/30 bg-[#2a1515]/90 backdrop-blur-md flex items-center justify-between px-8 shadow-lg shadow-black/20 font-sans">
      
      <div className="flex items-center gap-4 w-1/3 justify-start">
        <span className="text-[#ec1313] font-bold text-2xl tracking-tighter">Deadlock Protocol</span>
        <div className="h-6 w-px bg-[#ec1313]/30"></div>
        <div>
          <h1 className="text-sm text-gray-400 uppercase tracking-widest leading-none mb-1">
            Chapter {currentChapter}
          </h1>
          <p className="font-bold text-white leading-none">
            {chapterName}
          </p>
        </div>
      </div>

      <div className="w-1/3 flex justify-center">
        <div className="flex items-center gap-1 relative">
          {[...Array(totalQ)].map((_, index) => {
            const qNum = index + 1;
            const isSolved = qNum < activeQ;
            const isCurrent = qNum === activeQ;
            const isLocked = qNum > activeQ;
            const isBoss = qNum === totalQ;

            return (
              <React.Fragment key={index}>
                {index !== 0 && (
                  <div className={`w-4 h-0.5 ${isSolved || isCurrent ? 'bg-[#ec1313]' : 'bg-gray-800'}`}></div>
                )}

                <div className="relative flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  {isBoss && (
                    <div className={`absolute -inset-1.25 border-[1.5px] rounded-2xl pointer-events-none ${isCurrent || isSolved ? 'border-[#ec1313] shadow-[0_0_10px_rgba(236,19,19,0.5)]' : 'border-gray-800'}`}></div>
                  )}

                  <button 
                    className={`
                      relative flex items-center justify-center transition-all duration-300 ring-2 ring-[#221010] z-10
                      ${isCurrent || isBoss ? 'w-10 h-10 rounded-2xl' : 'w-8 h-8 rounded-xl'}
                      ${isSolved ? 'bg-[#ec1313] text-white' : ''}
                      ${isCurrent ? 'bg-[#221010] border-2 border-[#ec1313] text-[#ec1313]' : ''}
                      ${isLocked ? 'bg-[#2a1515] border border-gray-700 text-gray-600 cursor-not-allowed' : ''}
                      ${(isCurrent || (isBoss && isSolved)) ? 'shadow-[0_0_15px_rgba(236,19,19,0.5)]' : ''}
                      ${!isCurrent ? 'text-xs font-bold' : 'text-sm font-bold'}
                    `}
                  >
                    {isSolved && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    
                    {isCurrent && <span>{qNum}</span>}
                    
                    {isLocked && (
                      <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    )}

                    {isCurrent && (
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ec1313] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ec1313]"></span>
                      </span>
                    )}
                  </button>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-end gap-5 w-1/3">

        <div className='scale-75 origin-right'>
          <CredibilityBadge status={credibility}/>
        </div>

        <button className="group flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#ec1313]/40 bg-[#ec1313]/10 hover:bg-[#ec1313]/20 transition text-[#ec1313] text-sm font-medium">
          <svg className="w-4 h-4 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Case Files
        </button>
        
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-gray-700 to-black p-0.5 cursor-pointer">
            <img 
              alt="Detective Profile Avatar" 
              className="rounded-full w-full h-full object-cover border border-[#2a1515]" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLr_Chj0YdyIQvTcKmkw7UZ2eWw6cOPWIPsbNppT0tDrgQxjbxaYiK9iCHQrqTk-1K5keMGCmk3fZ8W4uYUmKPbQHuYG25mLdiLzerjdoBCy--Dsy7AfwecuwYsf65KdosNy66X5ioxoNrmtXWQbriSsopbEbBWI5_7h71eIQFtCEvYl-fHx2drLqHiO_rcz1A7RAxLOr44x2bC5EkyNQ5RYjE0Py5Rbk2kr50ZyowMhVc2tckHPyrz_Wn6JWqXVhkk4Ee_FeyMPf1"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#221010]"></div>
        </div>
      </div>

    </header>
  );
}