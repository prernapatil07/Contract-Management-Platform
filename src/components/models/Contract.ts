// src/models/Contract.ts
import { Field } from './Blueprint';

export type ContractStatus = 'created' | 'approved' | 'sent' | 'signed' | 'locked' | 'revoked';

export interface Contract {
  id: string;
  name: string;
  blueprintId: string;
  blueprintName: string;
  status: ContractStatus;
  fields: Field[];
  createdAt: string;
  updatedAt: string;
}