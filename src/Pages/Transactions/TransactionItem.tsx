// TransactionItem.tsx
import React from 'react';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import type { TransactionItemProps } from '../../types';

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onClick }) => {

  const incomingTypes = ['wallet_funded', 'escrow_received', 'deposit'];
  const isIncoming = incomingTypes.includes(transaction.type.toLowerCase());
  
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

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'released':
        return 'text-green-600';
      case 'pending':
      case 'accepted':
        return 'text-amber-500';
      case 'failed':
      case 'rejected':
      case 'cancelled':
        return 'text-red-600';
      case 'disputed':
        return 'text-orange-500';
      default:
        return 'text-gray-500';
    }
  };

  // Get transaction title
  const getTitle = () => {
    if (transaction.category === 'escrow' && transaction.metadata?.otherParty) {
      return transaction.metadata.otherParty.name;
    }
    return transaction.type
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };


  const getDescription = () => {
    if (transaction.category === 'escrow' && transaction.metadata?.otherParty) {
      return `${transaction.metadata.otherParty.tag} • ${transaction.description || 'Escrow transaction'}`;
    }
    return transaction.description || 'Transaction';
  };

  return (
    <section
      onClick={() => onClick(transaction.id)}
      className="flex items-center justify-between py-4 cursor-pointer hover:bg-gray-50 transition-colors rounded-lg px-3 -mx-3"
    >
      <section className="flex items-center flex-1 min-w-0">
        {/* Avatar or Icon */}
        {transaction.category === 'escrow' && transaction.metadata?.otherParty?.avatar ? (
          <img
            src={transaction.metadata.otherParty.avatar}
            alt={transaction.metadata.otherParty.name}
            className="w-11 h-11 rounded-full border-2 border-pri flex-shrink-0 object-cover mr-3"
          />
        ) : (
          <section className={`w-11 h-11 rounded-full ${bgColor} flex items-center justify-center mr-3 flex-shrink-0`}>
            {icon}
          </section>
        )}
        
        <section className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 mb-1 truncate">
            {getTitle()}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {getDescription()}
          </p>
        </section>
      </section>

      <section className="text-right ml-3 flex-shrink-0">
        <p className={`text-sm font-bold mb-1 ${isIncoming ? 'text-pri' : 'text-red-600'}`}>
          {isIncoming ? '+' : '-'}{formatAmount(transaction.amount)}
        </p>
        <section className="flex items-center justify-end gap-2">
          <p className="text-xs text-gray-400">
            {formatDate(transaction.created_at)}
          </p>
          {transaction.status && (
            <span className={`text-xs font-medium ${getStatusColor(transaction.status)}`}>
              • {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
            </span>
          )}
        </section>
      </section>
    </section>
  );
};

export default TransactionItem;