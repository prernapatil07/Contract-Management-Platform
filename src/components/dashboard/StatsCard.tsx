import React from 'react';
import { Card } from '../common/Card';

interface StatsCardProps {
  label: string;
  value: number;
  color: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ label, value, color }) => {
  return (
    <Card className={`${color} border p-6`}>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
    </Card>
  );
};
