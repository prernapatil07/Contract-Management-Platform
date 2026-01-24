// src/utils/lifecycle.ts
import { ContractStatus } from '../models/Contract';

export const getNextStatus = (current: ContractStatus): ContractStatus | null => {
  const flow: Record<ContractStatus, ContractStatus | null> = {
    created: 'approved',
    approved: 'sent',
    sent: 'signed',
    signed: 'locked',
    locked: null,
    revoked: null,
  };
  return flow[current];
};

export const canRevoke = (status: ContractStatus): boolean => {
  return ['created', 'approved', 'sent'].includes(status);
};

export const getContractCategory = (status: ContractStatus): string => {
  if (status === 'signed' || status === 'locked') return 'signed';
  if (status === 'revoked') return 'revoked';
  if (status === 'created' || status === 'approved') return 'pending';
  return 'active';
};

export const getStatusColor = (status: ContractStatus): string => {
  const colors = {
    created: 'bg-gray-100 text-gray-800',
    approved: 'bg-blue-100 text-blue-800',
    sent: 'bg-purple-100 text-purple-800',
    signed: 'bg-green-100 text-green-800',
    locked: 'bg-slate-100 text-slate-800',
    revoked: 'bg-red-100 text-red-800',
  };
  return colors[status];
};

