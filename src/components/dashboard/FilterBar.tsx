// src/components/dashboard/FilterBar.tsx
import React from 'react';
import { Filter } from 'lucide-react';
import { Card } from '../common/Card';

interface FilterBarProps {
  filterStatus: string;
  onFilterChange: (status: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filterStatus, onFilterChange }) => {
  const filters = ['all', 'active', 'pending', 'signed', 'revoked'];

  return (
    <Card className="p-4">
      <div className="flex items-center space-x-2">
        <Filter className="w-5 h-5 text-gray-400" />
        <span className="text-sm font-medium text-gray-700">Filter:</span>
        {filters.map((status) => (
          <button
            key={status}
            onClick={() => onFilterChange(status)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition ${
              filterStatus === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>
    </Card>
  );
};