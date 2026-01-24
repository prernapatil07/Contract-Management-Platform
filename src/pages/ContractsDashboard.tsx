// src/pages/ContractsDashboard.tsx
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Contract } from '../models/Contract';
import { getContractCategory } from '../utils/lifecycle';
import { StatsCard } from '../components/dashboard/StatsCard';
import { FilterBar } from '../components/dashboard/FilterBar';
import { ContractsTable } from '../components/dashboard/ContractsTable';
import { Button } from '../components/common/Button';

interface ContractsDashboardProps {
  contracts: Contract[];
  onCreateContract: () => void;
  onViewContract: (contract: Contract) => void;
  onUpdateContract: (contract: Contract) => void;
}

export const ContractsDashboard: React.FC<ContractsDashboardProps> = ({
  contracts,
  onCreateContract,
  onViewContract,
  onUpdateContract,
}) => {
  const [filterStatus, setFilterStatus] = useState('all');

  const stats = {
    total: contracts.length,
    active: contracts.filter(c => getContractCategory(c.status) === 'active').length,
    pending: contracts.filter(c => getContractCategory(c.status) === 'pending').length,
    signed: contracts.filter(c => getContractCategory(c.status) === 'signed').length,
  };

  const filteredContracts = contracts.filter(c => {
    if (filterStatus === 'all') return true;
    return getContractCategory(c.status) === filterStatus || c.status === filterStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Contract Dashboard</h2>
        <Button variant="primary" onClick={onCreateContract}>
          <div className="flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>New Contract</span>
          </div>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard label="Total" value={stats.total} color="bg-gray-50 border-gray-200" />
        <StatsCard label="Active" value={stats.active} color="bg-purple-50 border-purple-200" />
        <StatsCard label="Pending" value={stats.pending} color="bg-blue-50 border-blue-200" />
        <StatsCard label="Signed" value={stats.signed} color="bg-green-50 border-green-200" />
      </div>

      {/* Filters */}
      <FilterBar filterStatus={filterStatus} onFilterChange={setFilterStatus} />

      {/* Contracts Table */}
      <ContractsTable
        contracts={filteredContracts}
        onViewContract={onViewContract}
        onUpdateContract={onUpdateContract}
      />
    </div>
  );
};