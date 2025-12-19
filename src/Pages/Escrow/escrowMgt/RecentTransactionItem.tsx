// RecentTransactionItem.tsx
import React from 'react';

interface RecentTransaction {
  id: string;
  tag: string;
  name: string;
  avatar: string;
  amount: number;
  items: string;
  status: string;
  timestamp: string;
}

interface RecentTransactionItemProps {
  transaction: RecentTransaction;
  onClick: (id: string) => void;
}

const RecentTransactionItem: React.FC<RecentTransactionItemProps> = ({
  transaction,
  onClick
}) => {
  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'pending':
        return 'text-amber-500';
      case 'completed':
      case 'released':
        return 'text-green-500';
      case 'rejected':
      case 'declined':
      case 'cancelled':
        return 'text-red-500';
      case 'accepted':
        return 'text-blue-500';
      case 'disputed':
        return 'text-orange-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div
      onClick={() => onClick(transaction.id)}
      className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50 transition-colors rounded-lg px-2 -mx-2"
    >
      <div className="flex items-center flex-1 min-w-0">
        <img
          src={transaction.avatar}
          alt={transaction.name}
          className="w-11 h-11 rounded-full border-2 border-amber-500 flex-shrink-0 object-cover"
        />
        <div className="ml-3 min-w-0 flex-1">
          <p className="text-sm font-semibold text-gray-900 mb-0.5">
            {transaction.name}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {transaction.items}
          </p>
        </div>
      </div>

      <div className="text-right ml-2 flex-shrink-0">
        <p className="text-sm font-bold text-gray-900 mb-0.5">
          ₦{transaction.amount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
        </p>
        <p className={`text-xs font-medium ${getStatusColor(transaction.status)}`}>
          {transaction.status}
        </p>
      </div>
    </div>
  );
};

export default RecentTransactionItem;