// src/components/dashboard/ContractsTable.tsx
import React from 'react';
import { Eye, ChevronRight } from 'lucide-react';
import { Contract } from '../../models/Contract';
import { formatDate } from '../../utils/helpers';
import { getNextStatus } from '../../utils/lifecycle';
import { StatusBadge } from '../common/StatusBadge';
import { Card } from '../common/Card';

interface ContractsTableProps {
  contracts: Contract[];
  onViewContract: (contract: Contract) => void;
  onUpdateContract: (contract: Contract) => void;
}

export const ContractsTable: React.FC<ContractsTableProps> = ({
  contracts,
  onViewContract,
  onUpdateContract,
}) => {
  const handleStatusChange = (contract: Contract) => {
    const next = getNextStatus(contract.status);
    if (next) {
      onUpdateContract({
        ...contract,
        status: next,
        updatedAt: new Date().toISOString(),
      });
    }
  };

  return (
    <Card className="overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contract
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Blueprint
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {contracts.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                No contracts yet. Create your first contract to get started.
              </td>
            </tr>
          ) : (
            contracts.map((contract) => (
              <tr key={contract.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{contract.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {contract.blueprintName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={contract.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(contract.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                  <button
                    onClick={() => onViewContract(contract)}
                    className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </button>
                  {getNextStatus(contract.status) && (
                    <button
                      onClick={() => handleStatusChange(contract)}
                      className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition"
                    >
                      <ChevronRight className="w-4 h-4 mr-1" />
                      {getNextStatus(contract.status)?.toUpperCase()}
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Card>
  );
};