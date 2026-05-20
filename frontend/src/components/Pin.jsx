export default function Pin({ top, left }) {
  return (
    <div
      className="absolute z-50 w-4 h-4 bg-red-600 rounded-full border-black shadow-[3px_3px_0px_rgba(0,0,0,1)]"
      style={{ top: top, left: left, transform: 'translateX(-50%)' }}
    >
      <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-red-400 rounded-full"></div>
    </div>
  );
}