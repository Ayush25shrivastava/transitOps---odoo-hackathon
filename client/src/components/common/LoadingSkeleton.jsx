export default function LoadingSkeleton({ rows = 3, className = '' }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="animate-pulse flex gap-4 items-center">
          <div className="h-10 bg-[#374151] rounded-lg flex-1" />
          <div className="h-10 bg-[#374151] rounded-lg w-24" />
          <div className="h-10 bg-[#374151] rounded-lg w-20" />
        </div>
      ))}
    </div>
  );
}
