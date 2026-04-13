import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="relative z-50 h-16 border-b border-[#ec1313]/30 bg-[#2a1515]/90 backdrop-blur-md flex items-center justify-between px-8 shadow-lg shadow-black/20 font-sans">
      
      <div className="flex items-center gap-4 w-1/3 justify-start">
        <span className="text-[#ec1313] font-bold text-2xl tracking-tighter">DEADLOCK_PROTOCOL</span>
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

            return (
              <React.Fragment key={index}>
                {index !== 0 && (
                  <div className={`w-4 h-0.5 ${isSolved || isCurrent ? 'bg-[#ec1313]' : 'bg-gray-800'}`}></div>
                )}

                <div className="relative flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <button 
                    className={`
                      relative flex items-center justify-center transition-all duration-300 ring-2 ring-[#221010] z-10
                      ${isCurrent ? 'w-10 h-10 rounded-2xl' : 'w-8 h-8 rounded-xl'}
                      ${isSolved ? 'bg-[#ec1313] text-white' : ''}
                      ${isCurrent ? 'bg-[#221010] border-2 border-[#ec1313] text-[#ec1313]' : ''}
                      ${isLocked ? 'bg-[#2a1515] border border-gray-700 text-gray-600 cursor-not-allowed' : ''}
                      ${isCurrent ? 'shadow-[0_0_15px_rgba(236,19,19,0.5)]' : ''}
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
        
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowProfileMenu((previousValue) => !previousValue)}
            className="relative rounded-full focus:outline-none focus:ring-2 focus:ring-[#ec1313]/50"
          >
            <div className={`w-10 h-10 rounded-full bg-linear-to-br from-gray-700 to-black p-0.5 transition ${showProfileMenu ? 'ring-2 ring-[#ec1313]/45' : ''}`}>
              <img 
                alt="Detective Profile Avatar" 
                className="rounded-full w-full h-full object-cover border border-[#2a1515]" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLr_Chj0YdyIQvTcKmkw7UZ2eWw6cOPWIPsbNppT0tDrgQxjbxaYiK9iCHQrqTk-1K5keMGCmk3fZ8W4uYUmKPbQHuYG25mLdiLzerjdoBCy--Dsy7AfwecuwYsf65KdosNy66X5ioxoNrmtXWQbriSsopbEbBWI5_7h71eIQFtCEvYl-fHx2drLqHiO_rcz1A7RAxLOr44x2bC5EkyNQ5RYjE0Py5Rbk2kr50ZyowMhVc2tckHPyrz_Wn6JWqXVhkk4Ee_FeyMPf1"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#221010]"></div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-[#ec1313]/25 bg-[#120707]/95 backdrop-blur-sm shadow-[0_12px_30px_rgba(0,0,0,0.55)] p-3">
              <p className="text-xs uppercase tracking-widest text-gray-500">Detective</p>
              <p className="text-sm font-semibold text-white mt-1">Rahul Javalagi</p>
              <p className="text-xs text-gray-400 mt-0.5">ID: 002384</p>

              <div className="mt-3 flex flex-col gap-2">
                <Link
                  to="/home"
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full text-left px-3 py-2 rounded-lg border border-gray-700 text-gray-200 hover:text-white hover:border-[#ec1313]/50 hover:bg-[#1a0d0d] transition text-sm"
                >
                  Go to Home
                </Link>
                <Link
                  to="/"
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full text-left px-3 py-2 rounded-lg border border-[#ec1313]/40 text-[#fca5a5] hover:text-white hover:bg-[#ec1313]/20 transition text-sm"
                >
                  Logout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

    </header>
  );
}