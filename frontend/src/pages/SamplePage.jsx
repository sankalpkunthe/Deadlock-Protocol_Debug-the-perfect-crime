import React from 'react';
import TopNavigation from '../components/TopNavigation';
import LeftInvestigationBoard from '../components/LeftInvestigationBoard';
import RightCodeEditor from '../components/RightCodeEditor';
import PoliceFIR from '../components/PoliceFIR';
import PolaroidFrame from '../components/PolaroidFrame';
import AutopsyReport from '../components/AutopsyReport';
import TerminalPrintout from '../components/TerminalPrintout';
import GlitchNote from '../components/GlitchNote';

export default function SamplePage() {
  return (
    <div className="h-screen w-screen bg-[#0a0202] flex flex-col overflow-hidden font-sans">
      <div className="w-full shrink-0 z-50">
        <TopNavigation 
          currentChapter={1} 
          chapterName="The First Cut" 
          currentQuestion={6} 
          totalQuestions={10}
          credibility='green'
        />
      </div>

      <div className="flex-1 w-full flex overflow-hidden">
        <LeftInvestigationBoard>
          
          {/* TITLE SECTION ONLY */}
          <div className="w-full mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-950/50 border border-red-900/50 text-red-400 text-xs uppercase tracking-wider font-bold mb-3">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              High Priority
            </div>
            <h2 className="text-3xl text-white font-bold mb-2">The Alibi Algorithm</h2>
            <div className="h-1 w-20 bg-[#ec1313] rounded-full mb-4"></div>
          </div>

          {/* ASSETS SECTION */}
          <div className="flex flex-wrap justify-center items-start gap-12 w-full px-4">
            <PoliceFIR 
              rotation={-2}
              scale={.9}
              caseId="Q-01" 
              officer="Deckard" 
              subject="The First Bug" 
              content="The victim's code failed at midnight. Trace the logic..." 
            />
            <PolaroidFrame
              rotation={4}
              caption="Exhibit A"
              imageSrc="https://images.pexels.com/photos/2882550/pexels-photo-2882550.jpeg"
            />

            <AutopsyReport scale={.8}/>

            <TerminalPrintout
                      rotation={3}
                      scale={.8}
                      logDate="OCT 24, 2025"
                      user="ADMIN"
                      content={`> ACCESSING ARCHIVE...
            > FILE: "MURDER_WPN.DAT"
            > STATUS: ENCRYPTED
            
            INPUT:
            String s = "A man"
            
            OUTPUT:
            true
            
            CONSTRAINTS:
            - 1 <= s.length <= 2 * 10^5
            - s consists only ASCII`}
                    />

            <GlitchNote text="This is the clue for this question" rotation={4}/>
          </div>

        </LeftInvestigationBoard>

        <RightCodeEditor />
      </div>
    </div>
  );
}