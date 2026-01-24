// src/components/contract/FieldInput.tsx
import React from 'react';
import { Field } from '../../models/Blueprint';

interface FieldInputProps {
  field: Field;
  onChange: (value: string | boolean) => void;
  readOnly: boolean;
}

export const FieldInput: React.FC<FieldInputProps> = ({ field, onChange, readOnly }) => {
  const renderInput = () => {
    if (readOnly) {
      return (
        <div className="text-gray-900">
          {field.type === 'checkbox' ? (
            <span className={field.value ? 'text-green-600' : 'text-gray-400'}>
              {field.value ? '✓ Checked' : '○ Not checked'}
            </span>
          ) : field.type === 'signature' ? (
            <span className="font-serif italic">{field.value || '(Not signed)'}</span>
          ) : (
            field.value || '(Empty)'
          )}
        </div>
      );
    }

    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            value={(field.value as string) || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );
      case 'date':
        return (
          <input
            type="date"
            value={(field.value as string) || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );
      case 'signature':
        return (
          <input
            type="text"
            value={(field.value as string) || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Type your signature..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg font-serif italic focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );
      case 'checkbox':
        return (
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={(field.value as boolean) || false}
              onChange={(e) => onChange(e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">Check to confirm</span>
          </label>
        );
    }
  };

  return (
    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
      {renderInput()}
    </div>
  );
};