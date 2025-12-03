// ProgressStepItem.tsx
import React from 'react';
import { Check } from 'lucide-react';
import { type ProgressStepItemProps } from '../../../types';

const ProgressStepItem: React.FC<ProgressStepItemProps> = ({ step, isLast }) => {
  const getIconContent = () => {
    if (step.status === 'completed') {
      return (
        <div className="w-8 h-8 rounded-full bg-pri flex items-center justify-center">
          <Check size={16} className="text-white" strokeWidth={3} />
        </div>
      );
    }
    
    if (step.status === 'current') {
      return (
        <div className="w-8 h-8 rounded-full bg-pri flex items-center justify-center">
          <Check size={16} className="text-white" strokeWidth={3} />
        </div>
      );
    }
    
    return (
      <div className="w-8 h-8 rounded-full border-2 border-gray-300 bg-white"></div>
    );
  };

  const getTextColor = () => {
    if (step.status === 'pending') {
      return 'text-gray-400';
    }
    return 'text-gray-900';
  };

  return (
    <div className="flex">
      {/* Icon and Line Container */}
      <div className="flex flex-col items-center mr-3">
        {getIconContent()}
        {!isLast && (
          <div className={`w-0.5 h-12 mt-2 ${
            step.status === 'completed' ? 'bg-pri' : 'bg-gray-200'
          }`}></div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <p className={`text-sm font-semibold mb-1 ${getTextColor()}`}>
          {step.title}
        </p>
        <p className={`text-xs ${step.status === 'pending' ? 'text-gray-400' : 'text-gray-500'}`}>
          {step.description}
        </p>
      </div>
    </div>
  );
};

export default ProgressStepItem;