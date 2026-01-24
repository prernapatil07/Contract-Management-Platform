// src/context/ContractContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Blueprint } from '../models/Blueprint';
import { Contract } from '../models/Contract';
import { storage } from '../utils/storage';

interface ContractContextType {
  blueprints: Blueprint[];
  contracts: Contract[];
  addBlueprint: (blueprint: Blueprint) => void;
  addContract: (contract: Contract) => void;
  updateContract: (contract: Contract) => void;
  deleteContract: (id: string) => void;
}

const ContractContext = createContext<ContractContextType | undefined>(undefined);

export const ContractProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [blueprints, setBlueprints] = useState<Blueprint[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);

  useEffect(() => {
    setBlueprints(storage.getBlueprints());
    setContracts(storage.getContracts());
  }, []);

  const addBlueprint = (blueprint: Blueprint) => {
    const updated = [...blueprints, blueprint];
    setBlueprints(updated);
    storage.saveBlueprints(updated);
  };

  const addContract = (contract: Contract) => {
    const updated = [...contracts, contract];
    setContracts(updated);
    storage.saveContracts(updated);
  };

  const updateContract = (contract: Contract) => {
    const updated = contracts.map(c => (c.id === contract.id ? contract : c));
    setContracts(updated);
    storage.saveContracts(updated);
  };

  const deleteContract = (id: string) => {
    const updated = contracts.filter(c => c.id !== id);
    setContracts(updated);
    storage.saveContracts(updated);
  };

  return (
    <ContractContext.Provider
      value={{
        blueprints,
        contracts,
        addBlueprint,
        addContract,
        updateContract,
        deleteContract,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export const useContracts = (): ContractContextType => {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error('useContracts must be used within a ContractProvider');
  }
  return context;
};