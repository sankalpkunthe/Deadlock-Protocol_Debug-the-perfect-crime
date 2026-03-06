export default function CredibilityBadge({ status = 'green' }) {

    const config = {
        green: {
            color: 'text-emerald-500',
            glow: 'drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]',
            text: 'STATUS: CLEAR',
            animation: 'animate-pulse',
        },
        yellow: {
            color: 'text-amber-500',
            glow: 'drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]',
            text: 'STATUS: COMPROMISED',
            animation: 'animate-pulse',
        },
        red: {
            color: 'text-red-600',
            glow: 'drop-shadow-[0_0_12px_rgba(220,38,38,1)]',
            text: 'STATUS: CRITICAL',
            animation: 'animate-[pulse_0.5s_ease-in-out_infinite]',
        }
    };

    const current = config[status];

    return (
        <div className={`flex items-center justify-between bg-black/40 border border-[#331515] p-4 rounded-md ${current.color} ${current.glow}`}>
        
        <div className="flex flex-col">
            <span className="text-xs tracking-[0.2em] opacity-70">CREDIBILITY</span>
            <span className="text-sm font-bold tracking-widest">{current.text}</span>
        </div>

        <div className={`w-24 h-8 ${current.animation}`}>
            <svg viewBox="0 0 100 30" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="0,15 35,15 45,5 55,25 65,15 100,15" />
            </svg>
        </div>
        
        </div>
    );
}