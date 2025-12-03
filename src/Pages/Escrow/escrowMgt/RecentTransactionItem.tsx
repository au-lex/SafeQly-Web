// RecentTransactionItem.tsx
import React from 'react';
import {type  RecentTransactionItemProps } from '../../../types';


const RecentTransactionItem: React.FC<RecentTransactionItemProps> = ({
  transaction,
  onClick
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'text-amber-500';
      case 'Completed':
        return 'text-green-500';
      case 'Declined':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div
      onClick={() => onClick(transaction.id)}
      className="flex items-center justify-between py-3 cursor-pointer  hover:bg-gray-50 transition-colors rounded-lg px-2 -mx-2"
    >
      <div className="flex items-center flex-1">
        <img
          src={transaction.avatar}
          alt={transaction.name}
          className="w-11 h-11 rounded-full border-2 border-amber-500"
        />
        <div className="ml-3">
          <p className="text-sm font-semibold text-gray-900 mb-0.5">
            {transaction.tag}
          </p>
          <p className="text-xs text-gray-500 line-clamp-1">
            {transaction.items}
          </p>
        </div>
      </div>

      <div className="text-right">
        <p className="text-sm font-bold text-gray-900 mb-0.5">
          ${transaction.amount.toFixed(2)}
        </p>
        <p className={`text-xs font-medium ${getStatusColor(transaction.status)}`}>
          {transaction.status}
        </p>
      </div>
    </div>
  );
};

export default RecentTransactionItem;