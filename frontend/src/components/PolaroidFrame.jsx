import React from 'react';

export default function PolaroidFrame({ imageSrc, caption, rotation = 0, scale = 1 }) {
  return (
    <div 
      className="relative bg-[#f8f9fa] p-3 pb-10 shadow-[8px_8px_0px_rgba(0,0,0,1)] border-2 border-black w-52 transition-transform hover:scale-105 cursor-pointer group flex flex-col items-center"
      style={{ transform: `rotate(${rotation}deg)`, zoom: scale }}
    >
      {/* The Red Push Pin */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-600 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] z-10 group-hover:bg-red-500 transition-colors">
        <div className="absolute top-px left-px w-1.5 h-1.5 bg-white/60 rounded-full"></div>
      </div>

      {/* The Photo Container */}
      <div className="w-full aspect-square bg-black border-2 border-black overflow-hidden relative">
        {imageSrc ? (
          <img 
            src={imageSrc} 
            alt={caption} 
            className="w-full h-full object-cover grayscale contrast-[1.3] brightness-90 group-hover:contrast-100 group-hover:grayscale-0 transition-all duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-red-600 font-mono text-xs text-center p-2">
            NO SIGNAL
          </div>
        )}
        
        {/* Subtle inner shadow to make the photo look recessed */}
        <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(0,0,0,0.8)] pointer-events-none"></div>
      </div>

      <span className="mt-4 font-serif text-sm font-bold text-black text-center tracking-tighter leading-tight decoration-red-600 underline-offset-4 group-hover:underline">
        {caption}
      </span>
    </div>
  )
}