import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-2 justify-center mt-4">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="p-2 rounded-lg border border-[#374151] text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-[#374151] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map(p => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
            p === page
              ? 'bg-[#F59E0B] text-black font-bold'
              : 'border border-[#374151] text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-[#374151]'
          }`}
        >
          {p}
        </button>
      ))}

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="p-2 rounded-lg border border-[#374151] text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-[#374151] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
