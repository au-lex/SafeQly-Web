// SettingsItem.tsx
import React from 'react';
import { ChevronRight } from 'lucide-react';
import type { SettingsItemProps } from '../../types';

const SettingsItem: React.FC<SettingsItemProps> = ({ option }) => {
  return (
    <button
      onClick={option.action}
      className="w-full flex items-center justify-between py-4 px-4 hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center flex-1">
        <div className={`w-11 h-11 rounded-full ${option.iconBgColor} flex items-center justify-center mr-3 flex-shrink-0`}>
          {option.icon}
        </div>
        <div className="text-left">
          <p className="text-sm font-semibold text-gray-900 mb-0.5">
            {option.title}
          </p>
          <p className="text-xs text-gray-500">
            {option.description}
          </p>
        </div>
      </div>
      
      {option.showArrow !== false && (
        <ChevronRight size={20} className="text-gray-400 ml-3" />
      )}
    </button>
  );
};

export default SettingsItem;