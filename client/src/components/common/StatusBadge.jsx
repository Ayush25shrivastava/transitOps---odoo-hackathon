export default function StatusBadge({ status }) {
  const styles = {
    Available: 'bg-green-500/20 text-green-400 border-green-500/30',
    'On Trip': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'In Shop': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    Retired: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    Suspended: 'bg-red-500/20 text-red-400 border-red-500/30',
    Draft: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    Dispatched: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    Completed: 'bg-green-500/20 text-green-400 border-green-500/30',
    Cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
    Active: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    Closed: 'bg-green-500/20 text-green-400 border-green-500/30',
    'Off Duty': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  };

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
        styles[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      }`}
    >
      {status}
    </span>
  );
}
