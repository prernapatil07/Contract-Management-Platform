// src/utils/storage.ts
import { Blueprint } from '../models/Blueprint';
import { Contract } from '../models/Contract';

const STORAGE_KEYS = {
  BLUEPRINTS: 'contract_blueprints',
  CONTRACTS: 'contract_contracts',
};

export const storage = {
  getBlueprints: (): Blueprint[] => {
    const data = localStorage.getItem(STORAGE_KEYS.BLUEPRINTS);
    return data ? JSON.parse(data) : [];
  },
  saveBlueprints: (blueprints: Blueprint[]): void => {
    localStorage.setItem(STORAGE_KEYS.BLUEPRINTS, JSON.stringify(blueprints));
  },
  getContracts: (): Contract[] => {
    const data = localStorage.getItem(STORAGE_KEYS.CONTRACTS);
    return data ? JSON.parse(data) : [];
  },
  saveContracts: (contracts: Contract[]): void => {
    localStorage.setItem(STORAGE_KEYS.CONTRACTS, JSON.stringify(contracts));
  },
};