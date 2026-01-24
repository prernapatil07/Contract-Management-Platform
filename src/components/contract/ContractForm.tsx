// src/components/contract/ContractForm.tsx
import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { Blueprint, Field } from '../../models/Blueprint';
import { Contract } from '../../models/Contract';
import { generateId } from '../../utils/helpers';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { FieldInput } from './FieldInput';

interface ContractFormProps {
  blueprints: Blueprint[];
  onSave: (contract: Contract) => void;
  onCancel: () => void;
}

export const ContractForm: React.FC<ContractFormProps> = ({ blueprints, onSave, onCancel }) => {
  const [selectedBlueprintId, setSelectedBlueprintId] = useState('');
  const [contractName, setContractName] = useState('');
  const [fields, setFields] = useState<Field[]>([]);

  const selectedBlueprint = blueprints.find(b => b.id === selectedBlueprintId);

  useEffect(() => {
    if (selectedBlueprint) {
      setFields(
        selectedBlueprint.fields.map(f => ({
          ...f,
          value: f.type === 'checkbox' ? false : '',
        }))
      );
    }
  }, [selectedBlueprint]);

  const updateFieldValue = (id: string, value: string | boolean) => {
    setFields(fields.map(f => (f.id === id ? { ...f, value } : f)));
  };

  const handleSave = () => {
    if (!contractName.trim()) {
      alert('Please enter a contract name');
      return;
    }
    if (!selectedBlueprintId) {
      alert('Please select a blueprint');
      return;
    }

    const contract: Contract = {
      id: generateId(),
      name: contractName,
      blueprintId: selectedBlueprintId,
      blueprintName: selectedBlueprint!.name,
      status: 'created',
      fields,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSave(contract);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Create Contract</h2>
        <div className="flex space-x-3">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Create Contract
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel */}
        <Card className="lg:col-span-1 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contract Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contract Name</label>
              <input
                type="text"
                value={contractName}
                onChange={(e) => setContractName(e.target.value)}
                placeholder="e.g., NDA with Acme Corp"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Blueprint</label>
              <select
                value={selectedBlueprintId}
                onChange={(e) => setSelectedBlueprintId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Choose a blueprint...</option>
                {blueprints.map((bp) => (
                  <option key={bp.id} value={bp.id}>
                    {bp.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Right Panel */}
        <Card className="lg:col-span-2 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Fill Contract Fields</h3>
          {!selectedBlueprint ? (
            <div className="text-center text-gray-400 py-20">
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Select a blueprint to start filling contract details</p>
            </div>
          ) : (
            <div className="space-y-4">
              {fields.map((field) => (
                <FieldInput
                  key={field.id}
                  field={field}
                  onChange={(value) => updateFieldValue(field.id, value)}
                  readOnly={false}
                />
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
