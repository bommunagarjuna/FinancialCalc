
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar.tsx';
import Calculator from './components/Calculator.tsx';
import { CALCULATORS_CONFIG } from './constants.ts';
import Button from './components/ui/Button.tsx';
import { MenuIcon, CalculatorIcon } from './components/icons.tsx';

const App: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getCurrentPageTitle = () => {
    const calculatorId = location.pathname.split('/').pop();
    if (!calculatorId || location.pathname === '/') return 'Financial Calculator Pro - EMI, SIP, Loan & Deposit Calculators';
    const currentCalculator = CALCULATORS_CONFIG.find(c => c.id === calculatorId);
    return currentCalculator ? `${currentCalculator.type} | Financial Calculator Pro` : 'Financial Calculator Pro';
  };

  useEffect(() => {
    document.title = getCurrentPageTitle();
  }, [location]);

  return (
    <div className="flex h-screen bg-muted/DEFAULT text-foreground font-sans antialiased overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex flex-col flex-1 w-full md:w-[calc(100%-16rem)]">
        <header className="md:hidden flex items-center justify-between h-16 px-4 border-b bg-card shrink-0">
          <div className="flex items-center font-bold">
             <CalculatorIcon className="h-6 w-6 text-primary mr-2" />
             {getCurrentPageTitle()}
          </div>
          <Button variant="outline" size="icon" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <MenuIcon className="h-5 w-5" />
          </Button>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to={`/calculator/${CALCULATORS_CONFIG[0].id}`} replace />} />
            <Route path="/calculator/:calculatorId" element={<Calculator />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;