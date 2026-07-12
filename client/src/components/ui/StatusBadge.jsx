import React from 'react';

const StatusBadge = ({ status, className = '' }) => {
  const normalizedStatus = status?.toLowerCase() || 'default';
  
  // Define color mappings based on status string
  const colorMap = {
    available: 'bg-green-100 text-green-800 border-green-200',
    completed: 'bg-green-100 text-green-800 border-green-200',
    'on trip': 'bg-blue-100 text-blue-800 border-blue-200',
    dispatched: 'bg-blue-100 text-blue-800 border-blue-200',
    'in shop': 'bg-orange-100 text-orange-800 border-orange-200',
    maintenance: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    suspended: 'bg-orange-100 text-orange-800 border-orange-200',
    retired: 'bg-red-100 text-red-800 border-red-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
    'off duty': 'bg-gray-100 text-gray-800 border-gray-200',
    draft: 'bg-gray-100 text-gray-800 border-gray-200',
    default: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  const colors = colorMap[normalizedStatus] || colorMap['default'];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors} ${className}`}
    >
      {status}
    </span>
  );
};

export { StatusBadge };
