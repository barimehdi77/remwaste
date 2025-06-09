import React from 'react';
import { Skip } from '../types/skip';
import { CheckIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

interface SkipCardProps {
  skip: Skip;
  isSelected: boolean;
  onSelect: (skip: Skip) => void;
}

interface FeatureIndicatorProps {
  isEnabled: boolean;
  label: string;
}

const FALLBACK_IMAGE = 'https://static.wixstatic.com/media/0b01b5_47639dd428cf41a7a5436adedc07b993~mv2.png/v1/fill/w_560,h_358,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0b01b5_47639dd428cf41a7a5436adedc07b993~mv2.png';

const getSkipImage = (size: number): string => {
  return `https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${size}-yarder-skip.jpg`;
};

const FeatureIndicator: React.FC<FeatureIndicatorProps> = ({ isEnabled, label }) => (
  <div className="flex items-center justify-center text-base mt-1">
    {isEnabled ? (
      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
    ) : (
      <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
    )}
    <p className="text-dark-text-gray">{label}</p>
  </div>
);

const SkipCard: React.FC<SkipCardProps> = ({ skip, isSelected, onSelect }) => {
  const totalPrice = skip.price_before_vat + (skip.price_before_vat * skip.vat) / 100;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null; // Prevent infinite loop
    target.src = FALLBACK_IMAGE;
  };

  return (
    <div
      className={`relative bg-dark-card rounded-xl shadow-lg p-6 flex flex-col items-center justify-between transition-all duration-300 transform hover:scale-105 border-2 ${
        isSelected
          ? 'border-dark-blue-accent ring-2 ring-dark-blue-accent'
          : 'border-gray-700 hover:border-gray-500'
      }`}
      onClick={() => onSelect(skip)}
    >
      {isSelected && (
        <div className="absolute -top-3 -right-3 p-1 bg-dark-blue-accent rounded-full z-10 shadow-md">
          <CheckIcon className="h-7 w-7 text-dark-text-white" />
        </div>
      )}
      
      <div className="text-center flex-grow">
        <img 
          src={getSkipImage(skip.size)}
          alt={`${skip.size} Yard Skip`}
          className="mx-auto h-40 w-auto mb-6 object-contain filter drop-shadow-md"
          onError={handleImageError}
        />
        <h3 className="text-2xl font-bold text-dark-text-white mb-2">
          {skip.size} Yard Skip
        </h3>
        
        <FeatureIndicator
          isEnabled={skip.allowed_on_road}
          label={skip.allowed_on_road ? 'On-road compatible' : 'Off-road only'}
        />
        <FeatureIndicator
          isEnabled={skip.allows_heavy_waste}
          label={skip.allows_heavy_waste ? 'Heavy waste permitted' : 'Light waste only'}
        />
      </div>
      
      <div className="mt-8 w-full">
        <div className="text-center">
          <span className="text-4xl font-extrabold text-dark-blue-accent block leading-none">
            £{totalPrice.toFixed(2)}
          </span>
          <p className="text-sm text-dark-text-gray mt-1">
            {skip.hire_period_days} day hire
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkipCard; 