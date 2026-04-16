import { useEffect, useState } from 'react';
import TopNavigation from '../components/TopNavigation';
import LeftInvestigationBoard from '../components/LeftInvestigationBoard';
import RightCodeEditor from '../components/RightCodeEditor';
import PoliceFIR from '../components/PoliceFIR';
import PolaroidFrame from '../components/PolaroidFrame';
import AutopsyReport from '../components/AutopsyReport';
import TerminalPrintout from '../components/TerminalPrintout';
import GlitchNote from '../components/GlitchNote';
import { useSearchParams } from "react-router-dom";
import cases from "../data/cases";
import { useNavigate } from 'react-router-dom';


export default function SamplePage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  const [params] = useSearchParams();
  const [progress, setProgress] = useState(null);

  const chapter = Number(params.get("chapter")) || 1;
  const question = Number(params.get("question")) || 1;

  const caseData = cases[chapter]?.questions[question];
  const chapterData = cases[chapter];


  useEffect(() => {
    const fetchProgress = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/progress", {
        headers: { Authorization: token }
      });

      const data = await res.json();
      console.log("PROGRESS:", data); 

      setProgress(data);
    };

    fetchProgress();
  }, []);


  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/me", {
        headers: { Authorization: token }
      });

      const data = await res.json();
      setUser(data);
    };

    fetchUser();
  }, []);


  useEffect(() => {
    if (!progress) return;

    if (
      chapter > progress.chapter ||
      (chapter === progress.chapter && question > progress.question)
    ) {
      navigate(
        `/sample?chapter=${progress.chapter}&question=${progress.question}`,
      );
    }
  }, [chapter, question, progress]);

  if (!progress) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading investigation...
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading case...
      </div>
    );
  }
  const today = new Date().toDateString();
  return (
    <div className="h-screen w-screen bg-[#0a0202] flex flex-col overflow-hidden font-sans">
      <div className="w-full shrink-0 z-50">
        <TopNavigation
          user={user} 
          currentChapter={chapter} 
          chapterName={chapterData?.title} 
          currentQuestion={question} 
          totalQuestions={10}
          credibility='green'
          progress={progress}
        />
      </div>

      <div className="flex-1 w-full flex overflow-hidden">
        <LeftInvestigationBoard>
          
          {/* TITLE SECTION ONLY */}
          <div className="w-full mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-green-950/50 border border-green-900/50 text-green-400 text-xs uppercase tracking-wider font-bold mb-3">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Entry
            </div>
            <h2 className="text-3xl text-white font-bold mb-2">{caseData?.subject}</h2>
            <div className="h-1 w-20 bg-[#ec1313] rounded-full mb-4"></div>
          </div>

          {/* ASSETS SECTION */}
          <div className="flex flex-wrap justify-center items-start gap-12 w-full px-4">
            <PoliceFIR 
              rotation={-2}
              scale={.9}
              caseId={caseData?.caseId}
              officer="Sankalp" 
              subject={caseData?.subject} 
              content={caseData?.police}
            />
            <PolaroidFrame
              rotation={4}
              caption="Exhibit A"
              imageSrc={caseData?.image}
            />

            <AutopsyReport scale={.8}
            subjectId={caseData?.autopsy?.subjectId}
            tod={caseData?.autopsy?.tod}
            cause={caseData?.autopsy?.cause}
            notes={caseData?.autopsy?.notes}/>
            
            <TerminalPrintout
                      rotation={3}
                      scale={.8}
                      logDate={today}
                      user="ADMIN"
                      content={caseData?.terminal}
                    />

            <GlitchNote text={caseData?.glitch} rotation={4}/>
          </div>

        </LeftInvestigationBoard>

        <RightCodeEditor
          key={`${chapter}-${question}`}
          chapter={chapter} 
          question={question}
          setProgress={setProgress}
        />
      </div>
    </div>
  );
}