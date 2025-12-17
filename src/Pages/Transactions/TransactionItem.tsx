// TransactionItem.tsx
import React from 'react';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import type { TransactionItemProps } from '../../types';

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onClick }) => {
  const isIncoming = transaction.type === 'wallet_funded' || transaction.type === 'escrow_received';
  
  const getIconConfig = () => {
    if (isIncoming) {
      return {
        icon: <ArrowDownLeft size={20} className="text-white" strokeWidth={2.5} />,
        bgColor: 'bg-pri'
      };
    }
    return {
      icon: <ArrowUpRight size={20} className="text-white" strokeWidth={2.5} />,
      bgColor: 'bg-red-500'
    };
  };

  const { icon, bgColor } = getIconConfig();

  return (
    <div
      onClick={() => onClick(transaction.idd)}
      className="flex items-center justify-between py-4 cursor-pointer hover:bg-gray-50 transition-colors rounded-lg px-3 -mx-3"
    >
      <div className="flex items-center flex-1">
        <div className={`w-11 h-11 rounded-full ${bgColor} flex items-center justify-center mr-3 flex-shrink-0`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 mb-1">
            {transaction.title}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {transaction.description}
          </p>
        </div>
      </div>

      <div className="text-right ml-3">
        <p className={`text-sm font-bold mb-1 ${isIncoming ? 'text-green-600' : 'text-gray-900'}`}>
          {isIncoming ? '+' : '-'}${transaction.amount.toFixed(2)}
        </p>
        <p className="text-xs text-gray-400">
          {transaction.timestamp}
        </p>
      </div>
    </div>
  );
};

export default TransactionItem;