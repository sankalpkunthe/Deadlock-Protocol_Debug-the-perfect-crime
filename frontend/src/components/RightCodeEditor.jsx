import React, { useState } from 'react';
import Editor from "@monaco-editor/react";
import { useNavigate } from "react-router-dom";


export default function RightCodeEditor({ chapter, question, setProgress }) {
  const navigate = useNavigate();
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(`//Editable

console.log("Hello javascript");`);
  const [customInput, setCustomInput] = useState(""); 
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const runCode = async () => { 
    try { 
      const res = await fetch("http://localhost:5000/run-test", { 
        method: "POST", 
        headers: { 
          "Content-Type": "application/json" 
        }, 
        body: JSON.stringify({ 
          language, 
          code,
          input: customInput
        }) 
      }); 

      const data = await res.json(); 
      setOutput(data.output); 
    } catch (err) { 
      setOutput("Error running code", err); 
    }
  };

  const submitCode = async () => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);
      const res = await fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({
          chapter: chapter,
          question: question,
          language,
          code
        })
      });

      setLoading(false);
      const data = await res.json();

      if(data.correct) {
        setOutput("All test cases passed.. Moving to solve next case!!");
        const res2 = await fetch("http://localhost:5000/progress", {
        headers: { Authorization: token }
      });

      const updatedProgress = await res2.json();
      setProgress(updatedProgress);

        setTimeout(() => {
          setCode(`//Editable

console.log("Hello javascript");`);

          setCustomInput("");
          setOutput("");
          if (question < 10) {
            navigate(`/sample?chapter=${chapter}&question=${question + 1}`);
          } else {
            navigate(`/home`, { state: { refresh: true } });
          }
        }, 1500);
      } else {
        let msg = "❌ Some test cases failed\n\n";

        data.results.forEach((r, i) => {
          msg += `Test ${i+1}: ${r.passed ? "✅" : "❌"}\n`;
          if (!r.passed) {
            msg += `Expected: ${r.expected}\n`;
            msg += `Got: ${r.output}\n\n`;
          }
        });

        setOutput(msg);
      }

    } catch (err) {
      setOutput("Submission error", err);
    }
  };


  return (
    <section className="w-1/2 h-full flex flex-col bg-[#1a0b0b] relative z-10 font-mono border-l border-[#ec1313]/20">
      
      <div className="h-10 bg-[#110808] border-b border-gray-800 flex items-center justify-between px-4 select-none shrink-0">
        <div className="flex items-center h-full gap-1">
          <div className="h-full px-4 flex items-center bg-[#1a0b0b] border-t-2 border-[#ec1313] text-gray-300 text-xs">
            solution.{language === 'cpp' ? 'cpp' : language === 'java' ? 'java' : language === 'c' ? 'c' : language === 'python' ? 'py' : 'js'}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative flex items-center">
            <svg className="w-3 h-3 text-gray-500 absolute left-2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <select 
              value={language}
              onChange={(e) => {
                const lang = e.target.value;
                setLanguage(lang);

                if (lang === "cpp") {
                  setCode(`//Editable

#include <iostream>
using namespace std;

int main() {
    cout << "Hello C++" << endl;
    return 0;
}`);
                } 

                else if(lang === "python") {
                  setCode(`#Editable

print("Hello python")`);
                }

                else if (lang === "c") {
                  setCode(`//Editable

#include <stdio.h>

int main() {
    printf("Hello C");
    return 0;
}`);
                } 
                else if (lang === "java") {
                  setCode(`//Editable

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello java");
}
}`);
                } 
                else {
                  setCode(`//Editable

console.log("Hello javascript");`);
                }
              }}
              className="appearance-none bg-[#1a0b0b] border border-gray-700 text-gray-300 text-xs py-1 pl-7 pr-6 rounded focus:outline-none focus:border-[#ec1313] cursor-pointer"
            >
              <option value="cpp">C++</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="c">C</option>
            </select>
            <svg className="w-3 h-3 text-gray-500 absolute right-2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <span className="text-xs text-gray-600 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Saved
          </span>
          <button className="text-gray-500 hover:text-white transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1"> 
        <Editor 
          height="100%" 
          theme="vs-dark"
          language={ 
            language === "cpp" ? "cpp" : 
            language === "java" ? "java" : 
            language === "c" ? "c" : 
            language === "python" ? "python" : "javascript"
            } 
          value={code} 
          onChange={(value) => setCode(value || "")} 
          options={{ fontSize: 14, minimap: { enabled: false }, 
          wordWrap: "on", scrollBeyondLastLine: false, 
          automaticLayout: true, }} 
        /> 
      </div>      

      <div className="h-14 bg-[#110808] border-t border-b border-gray-800 flex items-center justify-between px-4 shrink-0 z-20">
        <button 
          onClick={() => setShowCustomInput(!showCustomInput)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded transition-colors text-sm ${showCustomInput ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Inject Evidence
          <svg className={`w-3 h-3 transition-transform ${showCustomInput ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div className="flex items-center gap-3">
          <button 
            onClick={runCode}
            className="flex items-center gap-2 px-4 py-2 rounded bg-[#2a1515] border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 transition-colors text-sm">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Run Forensics
          </button>
          
          <button 
            onClick={submitCode}
            className="flex items-center gap-2 px-5 py-2 rounded bg-[#ec1313] hover:bg-red-600 text-white font-bold shadow-[0_0_15px_rgba(236,19,19,0.3)] hover:shadow-[0_0_20px_rgba(236,19,19,0.5)] transition-all transform hover:scale-105 active:scale-95 text-sm tracking-wider"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
            {loading ? "SUBMITTING..." : "SUBMIT VERDICT"}
          </button>
        </div>
      </div>

      {showCustomInput && (
        <div className="h-32 border-b border-gray-800 bg-[#150a0a] flex flex-col shrink-0 z-10">
          <textarea
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            spellCheck="false"
            placeholder="Enter custom input here..."
            className="flex-1 bg-transparent text-gray-300 p-4 text-sm outline-none resize-none investigation-scroll"
          />
        </div>
      )}

      <div className="h-48 bg-black flex flex-col relative shrink-0 z-10">
        <div className="h-10 bg-[#110808] flex items-center justify-between px-4 border-b border-gray-800">
          <span className="text-xs text-[#ec1313] flex items-center gap-2 font-bold tracking-wider">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            DISPATCH CONSOLE
          </span>
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
        </div>

        <div className="p-4 text-sm text-green-400 whitespace-pre-wrap overflow-y-auto flex-1">
  {output || "Run your code to see output..."}
</div>
      </div>
    </section>
  );
}