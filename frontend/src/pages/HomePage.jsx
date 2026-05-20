import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const TOTAL_CHAPTERS = 5;
const QUESTIONS_PER_CHAPTER = 10;
const MAX_PROGRESS_POINTER = TOTAL_CHAPTERS * QUESTIONS_PER_CHAPTER;

// Single source of truth for chapter/question progression.
// 1 -> Chapter 1 Question 1, 39 -> Chapter 4 Question 9, >50 all complete, <1 all locked.

const CHAPTERS = [
  {
    id: 1,
    name: 'The First Cut',
    summary: 'Initial witness statements and first code autopsy.',
  },
  {
    id: 2,
    name: 'Phantom Stack',
    summary: 'Follow recursive traces hidden in surveillance dumps.',
  },
  {
    id: 3,
    name: 'Memory Ransom',
    summary: 'Heap corruption links every suspect to the same exploit.',
  },
  {
    id: 4,
    name: 'Null District',
    summary: 'Interrogate broken pointers and contradictory logs.',
  },
  {
    id: 5,
    name: 'Final Verdict',
    summary: 'Assemble evidence and close the protocol breach.',
  },
];

function normalizePointer(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return 0;
  }

  return Math.trunc(numeric);
}

function deriveStoryState(pointer) {
  const normalizedPointer = normalizePointer(pointer);

  if (normalizedPointer < 1) {
    return {
      pointer: normalizedPointer,
      hasStarted: false,
      allCompleted: false,
      currentChapter: null,
      currentQuestion: null,
    };
  }

  if (normalizedPointer > MAX_PROGRESS_POINTER) {
    return {
      pointer: normalizedPointer,
      hasStarted: true,
      allCompleted: true,
      currentChapter: null,
      currentQuestion: null,
    };
  }

  return {
    pointer: normalizedPointer,
    hasStarted: true,
    allCompleted: false,
    currentChapter: Math.ceil(normalizedPointer / QUESTIONS_PER_CHAPTER),
    currentQuestion: ((normalizedPointer - 1) % QUESTIONS_PER_CHAPTER) + 1,
  };
}

function resolveChapterStatus(chapterId, storyState) {
  if (storyState.allCompleted) {
    return 'completed';
  }

  if (!storyState.hasStarted) {
    return 'locked';
  }

  if (chapterId < storyState.currentChapter) {
    return 'completed';
  }

  if (chapterId === storyState.currentChapter) {
    return 'current';
  }

  return 'locked';
}

function calculateSolvedCases(pointer) {
  const normalizedPointer = normalizePointer(pointer);

  if (normalizedPointer < 1) {
    return 0;
  }

  if (normalizedPointer > MAX_PROGRESS_POINTER) {
    return MAX_PROGRESS_POINTER;
  }

  return normalizedPointer - 1;
}

function QuestionRoadmap({
  chapterId,
  chapterStatus,
  currentQuestion,
  onOpenQuestion,
  totalQuestions = QUESTIONS_PER_CHAPTER,
}) {
  const checkpointLimit =
    chapterStatus === 'completed'
      ? totalQuestions
      : chapterStatus === 'current'
        ? currentQuestion
        : 0;

  return (
    <div className="flex flex-wrap items-center gap-y-2">
      {[...Array(totalQuestions)].map((_, index) => {
        const qNum = index + 1;
        const isSolved =
          chapterStatus === 'completed' ||
          (chapterStatus === 'current' && qNum < currentQuestion);
        const isCurrent = chapterStatus === 'current' && qNum === currentQuestion;
        const isLocked =
          chapterStatus === 'locked' ||
          (chapterStatus === 'current' && qNum > currentQuestion);
        const canVisit = !isLocked;

        return (
          <React.Fragment key={qNum}>
            {index !== 0 && (
              <div
                className={`h-0.5 w-4 ${qNum <= checkpointLimit ? 'bg-[#ec1313]' : 'bg-gray-800'}`}
              ></div>
            )}

            <button
              type="button"
              onClick={() => {
                if (canVisit && onOpenQuestion) {
                  onOpenQuestion(chapterId, qNum);
                }
              }}
              disabled={!canVisit}
              title={`Question ${qNum}`}
              className={[
                'relative flex items-center justify-center transition-all duration-300 ring-2 ring-[#221010] z-10',
                'w-8 h-8 rounded-xl text-xs font-bold',
                isSolved ? 'bg-[#ec1313] text-white' : '',
                isCurrent
                  ? 'bg-[#221010] border-2 border-[#ec1313] text-[#ec1313] shadow-[0_0_15px_rgba(236,19,19,0.45)]'
                  : '',
                isLocked
                  ? 'bg-[#2a1515] border border-gray-700 text-gray-600 cursor-not-allowed'
                  : '',
                canVisit ? 'cursor-pointer hover:scale-110 hover:-translate-y-0.5' : '',
              ].join(' ')}
            >
              {isLocked && (
                <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              )}

              {isCurrent && <span>{qNum}</span>}

              {!isLocked && !isCurrent && chapterStatus !== 'completed' && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              )}

              {!isLocked && !isCurrent && chapterStatus === 'completed' && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              )}

              {isCurrent && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ec1313] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ec1313]"></span>
                </span>
              )}
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default function HomePage() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  const [progressPointer, setProgressPointer] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res1 = await fetch("http://localhost:5000/progress", {
          headers: { Authorization: token }
        });
        const data1 = await res1.json();
        const calculatedPointer = ((data1.chapter - 1) * 10) + data1.question;
        setProgressPointer(calculatedPointer);

        
        const res2 = await fetch("http://localhost:5000/me", {
          headers: { Authorization: token }
        });
        const data2 = await res2.json();
        setUser(data2);

      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    
      fetchData();
  }, [location]);

  const navigate = useNavigate();
  const storyState = deriveStoryState(progressPointer);

  const [openChapterId, setOpenChapterId] = useState(() => {
    if (storyState.currentChapter) {
      return storyState.currentChapter;
    }

    if (storyState.allCompleted) {
      return 1;
    }

    return null;
  });

  const chapterRows = useMemo(
    () =>
      CHAPTERS.map((chapter) => {
        const status = resolveChapterStatus(chapter.id, storyState);
        const currentQuestion = status === 'current' ? storyState.currentQuestion : null;

        return {
          ...chapter,
          status,
          currentQuestion,
        };
      }),
    [storyState]
  );

  const solvedCases = calculateSolvedCases(progressPointer);
  const activeCaseLabel = storyState.allCompleted
    ? 'All chapters completed'
    : storyState.hasStarted
      ? `Chapter ${storyState.currentChapter}, Question ${storyState.currentQuestion}`
      : 'No active case';

  const openQuestionFromRoadmap = (chapterId, questionNumber) => {
    navigate(`/sample?chapter=${chapterId}&question=${questionNumber}`);
  };

  return (
    <div className="min-h-screen w-screen bg-[#0a0202] font-sans text-white overflow-x-hidden">
      <main className="relative overflow-y-auto">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#5a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#5a1a1a_1px,transparent_1px)] bg-size-[1rem_1rem]"></div>
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30 bg-[linear-gradient(to_right,#7a2020_1px,transparent_1px),linear-gradient(to_bottom,#7a2020_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_15%_0%,rgba(236,19,19,0.2),transparent_45%),radial-gradient(circle_at_85%_15%,rgba(124,19,19,0.2),transparent_40%)]"></div>
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_48%,#130404_115%)]"></div>

        <div className="relative z-10 w-full pb-10">
          <header className="w-full px-5 md:px-8 pt-8 pb-6 border-b border-[#ec1313]/25 bg-[linear-gradient(120deg,rgba(26,9,9,0.95),rgba(46,12,12,0.74)_50%,rgba(21,8,8,0.95))] shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-4xl md:text-6xl leading-none font-bold tracking-tight text-[#ec1313]">
                DEADLOCK_PROTOCOL
              </h1>

              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login")
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#ec1313]/45 bg-[#ec1313]/10 text-[#fca5a5] text-sm font-semibold hover:bg-[#ec1313]/20 hover:text-white transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 17l5-5m0 0l-5-5m5 5H9" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H6a2 2 0 00-2 2v10a2 2 0 002 2h7" />
                </svg>
                Logout
              </button>
            </div>

            <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
              <p
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-400"
              >
                Detective: <span className="text-white">{user?.name || "Detective"}</span>
              </p>
              <p
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                className="text-xl md:text-3xl font-medium text-gray-400"
              >
                ID: <span className="text-white">{user?.id.slice(0, 6) || "----"}</span>
              </p>
            </div>

            <div className="mt-2 flex flex-wrap items-center justify-between gap-3 text-gray-400">
              <p style={{ fontFamily: 'Space Grotesk, sans-serif' }} className="text-lg md:text-xl text-gray-400">
                Current Progress: <span className="text-white">{solvedCases} cases solved</span>
              </p>
              <p style={{ fontFamily: 'Space Grotesk, sans-serif' }} className="text-lg md:text-xl text-gray-400">
                Active Case: <span className="text-white">{activeCaseLabel}</span>
              </p>
            </div>
          </header>

          <section className="max-w-6xl mx-auto px-5 md:px-8 space-y-4 pt-6 pb-10">

            {chapterRows.map((chapter) => {
              const isOpen = openChapterId === chapter.id && chapter.status !== 'locked';

              return (
                <article
                  key={chapter.id}
                  className={[
                    'rounded-2xl border overflow-hidden transition-all duration-300',
                    chapter.status === 'current'
                      ? 'border-[#ec1313]/55 bg-[linear-gradient(145deg,rgba(35,16,16,0.95),rgba(22,8,8,0.95))] shadow-[0_0_30px_rgba(236,19,19,0.16)]'
                      : '',
                    chapter.status === 'completed'
                      ? 'border-emerald-500/25 bg-[linear-gradient(145deg,rgba(28,16,16,0.9),rgba(16,11,11,0.9))]'
                      : '',
                    chapter.status === 'locked' ? 'border-gray-800 bg-[#110808]/80' : '',
                  ].join(' ')}
                >
                  <div className="px-5 md:px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Chapter {chapter.id}</p>
                      <h2 className="text-xl font-semibold text-white">{chapter.name}</h2>
                      <p className="text-sm text-gray-400 mt-1">{chapter.summary}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={[
                          'px-3 py-1 text-xs uppercase tracking-[0.18em] rounded-full border font-semibold',
                          chapter.status === 'current'
                            ? 'text-red-300 border-red-400/35 bg-red-900/25'
                            : '',
                          chapter.status === 'completed'
                            ? 'text-emerald-300 border-emerald-400/35 bg-emerald-900/20'
                            : '',
                          chapter.status === 'locked'
                            ? 'text-gray-400 border-gray-700 bg-gray-900/30'
                            : '',
                        ].join(' ')}
                      >
                        {chapter.status}
                      </span>

                      {chapter.status !== 'locked' && (
                        <button
                          type="button"
                          onClick={() => {
                            setOpenChapterId((previousValue) =>
                              previousValue === chapter.id ? null : chapter.id
                            );
                          }}
                          className="h-9 w-9 rounded-lg border border-[#ec1313]/35 bg-[#150909] text-gray-300 hover:text-white hover:border-[#ec1313] transition flex items-center justify-center"
                          title={isOpen ? 'Collapse chapter' : 'Expand chapter'}
                        >
                          <svg
                            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>

                  {isOpen && (
                    <div className="border-t border-[#ec1313]/20 px-5 md:px-6 py-4 bg-[#110707]/80">
                      <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
                        <QuestionRoadmap
                          chapterId={chapter.id}
                          chapterStatus={chapter.status}
                          currentQuestion={chapter.currentQuestion || QUESTIONS_PER_CHAPTER}
                          onOpenQuestion={openQuestionFromRoadmap}
                        />

                        {chapter.status === 'current' && (
                          <Link
                            to={`/sample?chapter=${chapter.id}&question=${chapter.currentQuestion}`}
                            className="inline-flex shrink-0 items-center gap-2 px-5 py-2 rounded-lg border border-[#ec1313]/55 bg-[#ec1313] text-white text-sm font-bold hover:bg-red-600 transition shadow-[0_0_15px_rgba(236,19,19,0.35)]"
                          >
                            Continue
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 12h14" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 6l6 6-6 6" />
                            </svg>
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </article>
              );
            })}

            <aside className="mt-3 rounded-xl border border-[#ec1313]/20 bg-[#120707]/80 px-4 py-3 text-sm text-gray-300">
              <p style={{ fontFamily: 'Space Grotesk, sans-serif' }} className="text-[#fca5a5] font-semibold mb-1.5">
                Game Rules
              </p>
              <p style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                The investigation contains 50 story checkpoints. Solve each question to unlock the next part of the case and move the narrative forward.
              </p>
              <p style={{ fontFamily: 'Space Grotesk, sans-serif' }} className="mt-1.5">
                Using more hints reduces your credibility. Lower credibility can influence and may change the final story outcome.
              </p>
            </aside>
          </section>
        </div>
      </main>
    </div>
  );
}
