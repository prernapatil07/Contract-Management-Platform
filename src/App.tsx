import React, { useState } from 'react';
import { ContractProvider, useContracts } from './context/ContractContext';
import { Header } from './components/common/Header';
import { ContractsDashboard } from './pages/ContractsDashboard';
import { Blueprints } from './pages/Blueprints';
import { ViewContract } from './pages/ViewContract';
import { BlueprintForm } from './components/blueprint/BlueprintForm';
import { ContractForm } from './components/contract/ContractForm';
import { Contract } from './models/Contract';

type ViewType = 'dashboard' | 'blueprints' | 'create-blueprint' | 'create-contract' | 'view-contract';

function AppContent() {
  const [view, setView] = useState<ViewType>('dashboard');
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const { blueprints, contracts, addBlueprint, addContract, updateContract } = useContracts();

  const handleViewContract = (contract: Contract) => {
    setSelectedContract(contract);
    setView('view-contract');
  };

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return (
          <ContractsDashboard
            contracts={contracts}
            onCreateContract={() => setView('create-contract')}
            onViewContract={handleViewContract}
            onUpdateContract={updateContract}
          />
        );

      case 'blueprints':
        return (
          <Blueprints
            blueprints={blueprints}
            onCreateBlueprint={() => setView('create-blueprint')}
          />
        );

      case 'create-blueprint':
        return (
          <BlueprintForm
            onSave={(blueprint) => {
              addBlueprint(blueprint);
              setView('blueprints');
            }}
            onCancel={() => setView('blueprints')}
          />
        );

      case 'create-contract':
        return (
          <ContractForm
            blueprints={blueprints}
            onSave={(contract) => {
              addContract(contract);
              setView('dashboard');
            }}
            onCancel={() => setView('dashboard')}
          />
        );

      case 'view-contract':
        return selectedContract ? (
          <ViewContract
            contract={selectedContract}
            blueprint={blueprints.find(b => b.id === selectedContract.blueprintId) || null}
            onUpdate={(contract) => {
              updateContract(contract);
              setSelectedContract(contract);
            }}
            onBack={() => setView('dashboard')}
          />
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentView={view} onNavigate={(v) => setView(v as ViewType)} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderView()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ContractProvider>
      <AppContent />
    </ContractProvider>
  );
}