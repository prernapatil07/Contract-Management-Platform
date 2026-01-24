// src/components/blueprint/BlueprintCard.tsx
import React from 'react';
import { FileText } from 'lucide-react';
import { Blueprint } from '../../models/Blueprint';
import { formatDate } from '../../utils/helpers';
import { Card } from '../common/Card';

interface BlueprintCardProps {
  blueprint: Blueprint;
}

export const BlueprintCard: React.FC<BlueprintCardProps> = ({ blueprint }) => {
  return (
    <Card className="p-6 hover:shadow-lg transition">
      <div className="flex items-start justify-between mb-4">
        <FileText className="w-10 h-10 text-blue-600" />
        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
          {blueprint.fields.length} fields
        </span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{blueprint.name}</h3>
      <p className="text-sm text-gray-600 mb-4">{blueprint.description}</p>
      <div className="text-xs text-gray-500">Created {formatDate(blueprint.createdAt)}</div>
    </Card>
  );
};
