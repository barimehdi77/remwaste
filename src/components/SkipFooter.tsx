import React from 'react';
import { Skip } from '../types/skip';

interface SkipFooterProps {
  selectedSkip: Skip | null;
  onBack: () => void;
  onContinue: (skip: Skip) => void;
}

const SkipFooter: React.FC<SkipFooterProps> = ({ selectedSkip, onBack, onContinue }) => {
  if (!selectedSkip) {
    return null;
  }

  const totalPrice = selectedSkip.price_before_vat + (selectedSkip.price_before_vat * selectedSkip.vat) / 100;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-dark-card text-dark-text-white p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between shadow-lg z-50 border-t border-gray-700">
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 mb-4 sm:mb-0">
        <p className="text-xl font-bold text-dark-blue-accent">Selected Skip:</p>
        <p className="text-2xl font-extrabold">{selectedSkip.size} Yard Skip</p>
        <p className="text-3xl font-extrabold text-dark-blue-accent">
          £{totalPrice.toFixed(2)}
        </p>
        <p className="text-lg text-dark-text-gray">({selectedSkip.hire_period_days} day hire)</p>
      </div>
      <div className="flex space-x-4">
        <button
          className="px-8 py-3 border border-transparent text-lg font-medium rounded-md shadow-sm text-dark-text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-blue-accent transition-colors duration-200"
          onClick={onBack}
        >
          Back
        </button>
        <button
          className="inline-flex items-center px-8 py-3 border border-transparent text-lg font-medium rounded-md shadow-sm text-dark-text-white bg-dark-blue-accent hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-blue-accent transition-colors duration-200"
          onClick={() => onContinue(selectedSkip)}
        >
          Continue <span className="ml-2 text-xl">&rarr;</span>
        </button>
      </div>
    </div>
  );
};

export default SkipFooter; 