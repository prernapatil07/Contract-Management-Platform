// src/pages/ViewContract.tsx
import React, { useState } from 'react';
import { ChevronRight, Edit2, XCircle } from 'lucide-react';
import { Contract, ContractStatus } from '../models/Contract';
import { Blueprint, Field } from '../models/Blueprint';
import { formatDate } from '../utils/helpers';
import { canRevoke } from '../utils/lifecycle';
import { ContractLifecycle } from '../components/contract/ContractLifecycle';
import { FieldInput } from '../components/contract/FieldInput';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

interface ViewContractProps {
  contract: Contract;
  blueprint: Blueprint | null;
  onUpdate: (contract: Contract) => void;
  onBack: () => void;
}

export const ViewContract: React.FC<ViewContractProps> = ({ contract, blueprint, onUpdate, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [fields, setFields] = useState(contract.fields);

  const updateFieldValue = (id: string, value: string | boolean) => {
    setFields(fields.map(f => (f.id === id ? { ...f, value } : f)));
  };

  const handleSave = () => {
    onUpdate({ ...contract, fields, updatedAt: new Date().toISOString() });
    setIsEditing(false);
  };

  const handleStatusChange = (newStatus: ContractStatus) => {
    onUpdate({ ...contract, status: newStatus, updatedAt: new Date().toISOString() });
  };

  const handleRevoke = () => {
    if (confirm('Are you sure you want to revoke this contract? This action cannot be undone.')) {
      onUpdate({ ...contract, status: 'revoked', updatedAt: new Date().toISOString() });
    }
  };

  const canEdit = contract.status === 'created' || contract.status === 'approved';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition">
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900">{contract.name}</h2>
        </div>
        <div className="flex items-center space-x-3">
          {canRevoke(contract.status) && (
            <Button variant="danger" onClick={handleRevoke}>
              <div className="flex items-center space-x-2">
                <XCircle className="w-5 h-5" />
                <span>Revoke</span>
              </div>
            </Button>
          )}
          {canEdit && !isEditing && (
            <Button variant="secondary" onClick={() => setIsEditing(true)}>
              <div className="flex items-center space-x-2">
                <Edit2 className="w-5 h-5" />
                <span>Edit</span>
              </div>
            </Button>
          )}
          {isEditing && (
            <>
              <Button
                variant="secondary"
                onClick={() => {
                  setFields(contract.fields);
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Save Changes
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Contract Info */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-500">Blueprint</p>
            <p className="text-lg font-semibold text-gray-900">{contract.blueprintName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Created</p>
            <p className="text-lg font-semibold text-gray-900">{formatDate(contract.createdAt)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Updated</p>
            <p className="text-lg font-semibold text-gray-900">{formatDate(contract.updatedAt)}</p>
          </div>
        </div>
      </Card>

      {/* Status Timeline */}
      <ContractLifecycle contract={contract} onStatusChange={handleStatusChange} />

      {/* Contract Fields */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Contract Details</h3>
        <div className="space-y-4">
          {fields.map((field) => (
            <FieldInput
              key={field.id}
              field={field}
              onChange={(value) => updateFieldValue(field.id, value)}
              readOnly={!isEditing}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};