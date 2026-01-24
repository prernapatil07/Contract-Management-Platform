// src/components/common/StatusBadge.tsx
import React from 'react';
import { ContractStatus } from '../../models/Contract';
import { getStatusColor } from '../../utils/lifecycle';

interface StatusBadgeProps {
  status: ContractStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(status)}`}>
      {status.toUpperCase()}
    </span>
  );
};