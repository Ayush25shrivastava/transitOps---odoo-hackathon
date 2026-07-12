export default function EmptyState({ icon: Icon, title, description, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {Icon && (
        <div className="p-4 rounded-2xl bg-[#374151]/50 mb-4">
          <Icon size={32} className="text-[#9CA3AF]" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-[#F9FAFB] mb-2">{title}</h3>
      {description && <p className="text-[#9CA3AF] text-sm mb-6 max-w-sm">{description}</p>}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-black font-semibold rounded-lg transition-colors text-sm"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
