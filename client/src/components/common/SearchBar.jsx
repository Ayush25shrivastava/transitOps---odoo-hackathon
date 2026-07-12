import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div className="relative">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-9 pr-4 py-2.5 bg-[#0B0F19] border border-[#374151] rounded-lg text-[#F9FAFB] placeholder-[#9CA3AF] focus:border-[#F59E0B] focus:outline-none focus:ring-1 focus:ring-[#F59E0B] text-sm w-full"
      />
    </div>
  );
}
