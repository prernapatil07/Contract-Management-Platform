// src/components/blueprint/BlueprintForm.tsx
import { useState } from 'react';
import { Plus, XCircle, Edit2, Calendar, Check, FileText } from 'lucide-react';
import type { Blueprint, Field, FieldType } from '../../models/Blueprint';
import { generateId } from '../../utils/helpers';
import { Button } from '../common/Button';
import { Card } from '../common/Card';

interface BlueprintFormProps {
  onSave: (blueprint: Blueprint) => void;
  onCancel: () => void;
}

export const BlueprintForm: React.FC<BlueprintFormProps> = ({ onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [fields, setFields] = useState<Field[]>([]);

  const fieldTypes: { type: FieldType; label: string; icon: any }[] = [
    { type: 'text', label: 'Text Field', icon: Edit2 },
    { type: 'date', label: 'Date Field', icon: Calendar },
    { type: 'signature', label: 'Signature', icon: Edit2 },
    { type: 'checkbox', label: 'Checkbox', icon: Check },
  ];

  const addField = (type: FieldType) => {
    const newField: Field = {
      id: generateId(),
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      position: { x: 50, y: 50 + fields.length * 60 },
    };
    setFields([...fields, newField]);
  };

  const updateFieldLabel = (id: string, label: string) => {
    setFields(fields.map(f => (f.id === id ? { ...f, label } : f)));
  };

  const removeField = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert('Please enter a blueprint name');
      return;
    }
    if (fields.length === 0) {
      alert('Please add at least one field');
      return;
    }

    const blueprint: Blueprint = {
      id: generateId(),
      name,
      description,
      fields,
      createdAt: new Date().toISOString(),
    };

    onSave(blueprint);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Create Blueprint</h2>
        <div className="flex space-x-3">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Blueprint
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Blueprint Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Blueprint Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., NDA Template"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Fields</h3>
            <div className="space-y-2">
              {fieldTypes.map(({ type, label, icon: Icon }) => (
                <button
                  key={type}
                  onClick={() => addField(type)}
                  className="w-full flex items-center space-x-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  <Icon className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">{label}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Panel - Canvas */}
        <div className="lg:col-span-2">
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8 min-h-[600px]">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Blueprint Canvas</h3>
            {fields.length === 0 ? (
              <div className="text-center text-gray-400 py-20">
                <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Add fields from the left panel to start building your blueprint</p>
              </div>
            ) : (
              <div className="space-y-4">
                {fields.map((field) => (
                  <div
                    key={field.id}
                    className="flex items-center space-x-3 p-4 bg-gray-50 border border-gray-200 rounded-lg"
                  >
                    <div className="flex-1">
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) => updateFieldLabel(field.id, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-1">Type: {field.type}</p>
                    </div>
                    <button
                      onClick={() => removeField(field.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};