// TransactionInfoItem.tsx
import React from 'react';
import type { TransactionInfoItemProps } from '../../../types';

const EscrowInfoItem: React.FC<TransactionInfoItemProps> = ({
  icon,
  label,
  value,
  iconBgColor = 'bg-blue-100'
}) => {
  return (
    <div className="flex items-center py-3">
      <div className={`w-9 h-9 rounded-full ${iconBgColor} flex items-center justify-center mr-3 flex-shrink-0`}>
        {icon}
      </div>
      <span className="flex-1 text-sm text-gray-500">{label}</span>
      <span className="text-sm font-semibold text-gray-900">{value}</span>
    </div>
  );
};

export default EscrowInfoItem;