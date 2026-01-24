
// src/models/Blueprint.ts
export type FieldType = 'text' | 'date' | 'signature' | 'checkbox';

export interface Field {
  id: string;
  type: FieldType;
  label: string;
  position: { x: number; y: number };
  value?: string | boolean;
}

export interface Blueprint {
  id: string;
  name: string;
  description: string;
  fields: Field[];
  createdAt: string;
}
