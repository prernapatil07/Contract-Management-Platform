// src/components/contract/ContractLifecycle.tsx
import React from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { Contract, ContractStatus } from '../../models/Contract';
import { getNextStatus } from '../../utils/lifecycle';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

interface ContractLifecycleProps {
  contract: Contract;
  onStatusChange: (status: ContractStatus) => void;
}

export const ContractLifecycle: React.FC<ContractLifecycleProps> = ({ contract, onStatusChange }) => {
  const statuses: ContractStatus[] = ['created', 'approved', 'sent', 'signed', 'locked'];
  const nextStatus = getNextStatus(contract.status);
  const currentIndex = statuses.indexOf(contract.status);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Contract Lifecycle</h3>
      <div className="flex items-center justify-between">
        {statuses.map((status, idx) => {
          const isActive = contract.status === status;
          const isPassed = currentIndex > idx;
          const isRevoked = contract.status === 'revoked';

          return (
            <React.Fragment key={status}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isRevoked
                      ? 'bg-red-100 text-red-600'
                      : isActive
                      ? 'bg-blue-600 text-white'
                      : isPassed
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {isPassed && !isRevoked ? <Check className="w-5 h-5" /> : idx + 1}
                </div>
                <p className={`mt-2 text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </p>
              </div>
              {idx < statuses.length - 1 && (
                <div className={`flex-1 h-1 mx-2 ${isPassed ? 'bg-green-600' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
      {contract.status === 'revoked' && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm font-medium text-red-800">This contract has been revoked</p>
        </div>
      )}
      {nextStatus && contract.status !== 'revoked' && (
        <div className="mt-6 flex justify-center">
          <Button variant="primary" onClick={() => onStatusChange(nextStatus)}>
            <div className="flex items-center space-x-2">
              <span>Move to {nextStatus.toUpperCase()}</span>
              <ChevronRight className="w-5 h-5" />
            </div>
          </Button>
        </div>
      )}
    </Card>
  );
};