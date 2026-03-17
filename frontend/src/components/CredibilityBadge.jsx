export default function CredibilityBadge({ status = 'green' }) {

    const config = {
        green: {
            color: 'text-emerald-400',
            bg: 'bg-emerald-900/20',
            border: 'border-emerald-500/20',
            glow: 'drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]',
            text: 'STATUS: CLEAR',
            animation: 'animate-pulse',
        },
        yellow: {
            color: 'text-amber-400',
            bg: 'bg-amber-900/20',
            border: 'border-amber-500/20',
            glow: 'drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]',
            text: 'STATUS: COMPROMISED',
            animation: 'animate-[pulse_1.25s_ease-in-out_infinite]',
        },
        red: {
            color: 'text-red-500',
            bg: 'bg-red-900/20',
            border: 'border-red-500/20',
            glow: 'drop-shadow-[0_0_12px_rgba(239,68,68,0.6)]',
            text: 'STATUS: CRITICAL',
            animation: 'animate-[pulse_0.5s_ease-in-out_infinite]',
        }
    };

    const current = config[status];

    return (
        <div className={`flex items-center gap-4 py-1.5 px-3 rounded-lg border backdrop-blur-sm transition-colors ${current.bg} ${current.border} ${current.color} ${current.glow}`}>
        
            <div className="flex flex-col">
                <span className="text-[9px] tracking-[0.2em] opacity-70 leading-none mb-1">BADGE INTEGRITY</span>
                <span className="text-xs font-bold tracking-widest leading-none">{current.text}</span>
            </div>

            <div className={`w-14 h-5 ${current.animation}`}>
                <svg viewBox="0 0 100 30" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="0,15 35,15 45,5 55,25 65,15 100,15" />
                </svg>
            </div>
        
        </div>
    );
}