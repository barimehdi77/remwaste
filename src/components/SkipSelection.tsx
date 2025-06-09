import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Skip } from '../types/skip';
import SkipCard from './SkipCard';
import SkipFooter from './SkipFooter';
import ProgressStepper from './ProgressStepper';

// Loading spinner component
const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-dark-background">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-dark-blue-accent"></div>
  </div>
);

// Error message component
const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="min-h-screen flex items-center justify-center bg-dark-background">
    <div className="text-red-600 text-center p-4 rounded-md shadow-md bg-dark-card">
      <p className="text-xl font-semibold mb-2 text-dark-text-white">Error Loading Skips</p>
      <p className="text-dark-text-gray">{message}</p>
    </div>
  </div>
);

// API configuration
const API_CONFIG = {
  baseURL: 'https://app.wewantwaste.co.uk/api',
  defaultPostcode: 'NR32',
  defaultArea: 'Lowestoft'
} as const;

const SkipSelection: React.FC = () => {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        const { baseURL, defaultPostcode, defaultArea } = API_CONFIG;
        const response = await axios.get<Skip[]>(
          `${baseURL}/skips/by-location?postcode=${defaultPostcode}&area=${defaultArea}`
        );
        setSkips(response.data);
      } catch (err) {
        setError('Failed to load skip options. Please try again later.');
        console.error('Error fetching skips:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkips();
  }, []);

  const handleSelectSkip = (skip: Skip): void => {
    setSelectedSkip(skip);
  };

  const handleBack = (): void => {
    setSelectedSkip(null);
  };

  const handleContinue = (skip: Skip): void => {
    // TODO: Implement navigation logic
    console.log('Selected skip:', skip);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen bg-dark-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <ProgressStepper currentStepId="select-skip" />
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-dark-text-white sm:text-5xl lg:text-6xl tracking-tight">
            Choose Your Ideal Skip Size
          </h1>
          <p className="mt-4 text-xl text-dark-text-gray max-w-2xl mx-auto">
            Select the perfect skip size for your waste disposal needs, ensuring efficiency and cost-effectiveness.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {skips.map((skip) => (
            <SkipCard
              key={skip.id}
              skip={skip}
              isSelected={selectedSkip?.id === skip.id}
              onSelect={handleSelectSkip}
            />
          ))}
        </div>
      </div>

      <SkipFooter
        selectedSkip={selectedSkip}
        onBack={handleBack}
        onContinue={handleContinue}
      />
    </div>
  );
};

export default SkipSelection; 