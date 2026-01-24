
// src/pages/Blueprints.tsx
import React from 'react';
import { Plus, FileText } from 'lucide-react';
import { Blueprint } from '../models/Blueprint';
import { BlueprintCard } from '../components/blueprint/BlueprintCard';
import { Button } from '../components/common/Button';

interface BlueprintsProps {
  blueprints: Blueprint[];
  onCreateBlueprint: () => void;
}

export const Blueprints: React.FC<BlueprintsProps> = ({ blueprints, onCreateBlueprint }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Contract Blueprints</h2>
        <Button variant="primary" onClick={onCreateBlueprint}>
          <div className="flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>New Blueprint</span>
          </div>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blueprints.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white border border-gray-200 rounded-lg">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No blueprints yet. Create your first template to get started.</p>
            <Button variant="primary" onClick={onCreateBlueprint}>
              <div className="flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Create Blueprint</span>
              </div>
            </Button>
          </div>
        ) : (
          blueprints.map((blueprint) => <BlueprintCard key={blueprint.id} blueprint={blueprint} />)
        )}
      </div>
    </div>
  );
};