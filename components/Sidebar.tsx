
import React from 'react';
import { NavLink } from 'react-router-dom';
import { CALCULATORS_CONFIG } from '../constants.ts';
import { CalculatorIcon, XIcon } from './icons.tsx';
import Button from './ui/Button.tsx';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const activeLinkClass = 'bg-primary text-primary-foreground';
  const inactiveLinkClass = 'text-muted-foreground hover:bg-muted/DEFAULT hover:text-foreground';

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/60 z-30 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-card border-r border-muted/DEFAULT flex-col
                   transition-transform duration-300 ease-in-out
                   ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                   md:relative md:translate-x-0 md:flex`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-muted/DEFAULT shrink-0">
          <div className="flex items-center">
            <CalculatorIcon className="h-6 w-6 text-primary" />
            <h1 className="ml-2 text-xl font-bold text-foreground">FinCalc Pro</h1>
          </div>
          <Button variant="outline" size="icon" className="md:hidden" onClick={onClose} aria-label="Close menu">
            <XIcon className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {CALCULATORS_CONFIG.map((calculator) => (
            <NavLink
              key={calculator.id}
              to={`/calculator/${calculator.id}`}
              onClick={handleLinkClick}
              className={({ isActive }) => 
                `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${isActive ? activeLinkClass : inactiveLinkClass}`
              }
            >
              {calculator.type}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-muted/DEFAULT mt-auto">
          <p className="text-xs text-muted-foreground text-center">&copy; 2024 Financial Calculators</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;