import React from 'react';
import {
  MapPinIcon,
  TrashIcon,
  TruckIcon,
  ShieldCheckIcon,
  CalendarDaysIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline';
import { TruckIcon as TruckIconSolid } from '@heroicons/react/24/solid';

interface Step {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  solidIcon?: React.ElementType;
  status: 'current' | 'upcoming' | 'complete';
}

interface ProgressStepperProps {
  currentStepId: string;
}

const ProgressStepper: React.FC<ProgressStepperProps> = ({ currentStepId }) => {
  const steps: Step[] = [
    {
      id: 'postcode',
      name: 'Postcode',
      description: 'Enter your delivery location',
      icon: MapPinIcon,
      status: 'complete'
    },
    {
      id: 'waste-type',
      name: 'Waste Type',
      description: 'Select your waste category',
      icon: TrashIcon,
      status: 'complete'
    },
    {
      id: 'select-skip',
      name: 'Select Skip',
      description: 'Choose your skip size',
      icon: TruckIcon,
      solidIcon: TruckIconSolid,
      status: 'current'
    },
    {
      id: 'permit-check',
      name: 'Permit Check',
      description: 'Verify your permit requirements',
      icon: ShieldCheckIcon,
      status: 'upcoming'
    },
    {
      id: 'choose-date',
      name: 'Choose Date',
      description: 'Pick your delivery date',
      icon: CalendarDaysIcon,
      status: 'upcoming'
    },
    {
      id: 'payment',
      name: 'Payment',
      description: 'Complete your payment',
      icon: CreditCardIcon,
      status: 'upcoming'
    },
  ];

  // Determine status based on currentStepId
  const updatedSteps = steps.map((step, index) => {
    const currentStepIndex = steps.findIndex(s => s.id === currentStepId);
    if (step.id === currentStepId) {
      return { ...step, status: 'current' };
    } else if (index < currentStepIndex) {
      return { ...step, status: 'complete' };
    } else {
      return { ...step, status: 'upcoming' };
    }
  });

  return (
    <div className="w-full px-4 py-8">
      <div className="relative">
        {/* Progress bar */}
        <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200">
          <div 
            className="h-full bg-dark-blue-accent transition-all duration-300"
            style={{ 
              width: `${(updatedSteps.findIndex(step => step.status === 'current') / (updatedSteps.length - 1)) * 100}%` 
            }}
          />
        </div>

        <div className="relative flex justify-between">
          {updatedSteps.map((step, index) => {
            const IconComponent = step.status === 'current' && step.solidIcon ? step.solidIcon : step.icon;
            
            return (
              <div key={step.id} className="flex flex-col items-center relative">
                {/* Step circle */}
                <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-2 
                  ${step.status === 'complete' ? 'border-dark-blue-accent bg-dark-blue-accent' :
                    step.status === 'current' ? 'border-dark-blue-accent bg-white' :
                    'border-gray-300 bg-white'}`}
                >
                  <IconComponent
                    className={`h-8 w-8 ${
                      step.status === 'complete' ? 'text-white' :
                      step.status === 'current' ? 'text-dark-blue-accent' :
                      'text-gray-400'
                    }`}
                    aria-hidden="true"
                  />
                  {step.status === 'complete' && (
                    <span className="absolute -top-1 -right-1 w-6 h-6 bg-dark-blue-accent rounded-full flex items-center justify-center text-white text-xs">
                      ✓
                    </span>
                  )}
                </div>

                {/* Step content */}
                <div className="mt-4 text-center max-w-[120px]">
                  <h3 className={`text-sm font-semibold ${
                    step.status === 'current' ? 'text-dark-text-white' :
                    step.status === 'complete' ? 'text-dark-blue-accent' :
                    'text-gray-400'
                  }`}>
                    {step.name}
                  </h3>
                  <p className={`mt-1 text-xs ${
                    step.status === 'current' ? 'text-dark-text-white' :
                    'text-gray-500'
                  }`}>
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressStepper; 