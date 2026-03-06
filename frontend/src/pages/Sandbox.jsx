// src/pages/Sandbox.jsx
import CredibilityBadge from '../components/CredibilityBadge';
import PoliceFIR from '../components/PoliceFIR';
import GlitchNote from '../components/GlitchNote';
import PolaroidFrame from '../components/PolaroidFrame';
import TerminalPrintout from '../components/TerminalPrintout';
import AutopsyReport from '../components/AutopsyReport';

export default function Sandbox() {
  return (
    <div className="min-h-screen bg-[#1a0505] flex flex-wrap items-center justify-center p-20 gap-20 overflow-hidden">
      
      {/* Question 1: Slight tilt right */}
      <PoliceFIR 
        rotation={2} 
        caseId="Q-01" 
        officer="Deckard" 
        subject="The First Bug" 
        content="The victim's code failed at midnight. Trace the logic..." 
      />

      {/* Question 2: Messy tilt left */}
      <PoliceFIR 
        rotation={-3} 
        caseId="Q-02" 
        officer="Miller" 
        subject="Memory Leak" 
        content="Evidence suggests a pointer was left dangling. Clean the crime scene." 
      />

      {/* Question 3: Extreme tilt for a frantic vibe */}
      <PoliceFIR 
        rotation={5} 
        caseId="Q-03" 
        officer="K" 
        subject="Syntax Murder" 
        content="A missing semicolon caused a total system collapse. Find the killer."
      />

      <CredibilityBadge
      />

      <div>
        <GlitchNote rotation={-8} text="Remember: Two Pointers approach works best here. Don't overcomplicate it." />
      </div>

      <div>
        <PolaroidFrame
          rotation={8}
          caption="Exhibit A: The Burner Phone"
          imageSrc="https://images.pexels.com/photos/2882550/pexels-photo-2882550.jpeg"
        />
      </div>

      <TerminalPrintout
        rotation={3}
        logDate="OCT 24, 2025"
        user="ADMIN"
        content={`> ACCESSING ARCHIVE...
          > FILE: "MURDER_WPN.DAT"
          > STATUS: ENCRYPTED
          
          INPUT:
          String s = "A man, a plan, a canal: Panama"
          
          OUTPUT:
          true
          
          CONSTRAINTS:
          - 1 <= s.length <= 2 * 10^5
          - s consists only of printable ASCII characters.`}
      />

      <AutopsyReport
        rotation={-1}
        subjectId="DOE, J."
        tod="02:45 AM"
        cause="Logic Fracture"
        notes="Fracture detected on cranial parietal bone. Evidence of struggle."
      />
    </div>
  );
}