// TransactionsScreen.tsx
import React, { useState } from 'react';
import Layout from '../../Layout/Layout';
import TransactionItem from './TransactionItem';
import type { Transaction, TabType } from '../../types';

const TransactionsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('wallet');

  const [allTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'wallet_funded',
      title: 'Wallet Funded',
      description: 'Your wallet has been fu...',
      amount: 25.00,
      timestamp: '07:15 AM',
      category: 'wallet'
    },
    {
      id: '2',
      type: 'money_withdrawn',
      title: 'Money Withdrawn',
      description: 'Money has been withd...',
      amount: 89.00,
      timestamp: '07:15 AM',
      category: 'wallet'
    },
    {
      id: '3',
      type: 'wallet_funded',
      title: 'Wallet Funded',
      description: 'Your wallet has been fu...',
      amount: 49.00,
      timestamp: '07:15 AM',
      category: 'wallet'
    },
    {
      id: '4',
      type: 'money_withdrawn',
      title: 'Money Withdrawn',
      description: 'Money has been withd...',
      amount: 10.00,
      timestamp: '07:15 AM',
      category: 'wallet'
    },
    {
      id: '5',
      type: 'wallet_funded',
      title: 'Wallet Funded',
      description: 'Your wallet has been fu...',
      amount: 25.00,
      timestamp: '07:15 AM',
      category: 'wallet'
    },
    {
      id: '6',
      type: 'money_withdrawn',
      title: 'Money Withdrawn',
      description: 'Money has been withd...',
      amount: 89.00,
      timestamp: '07:15 AM',
      category: 'wallet'
    },
    {
      id: '7',
      type: 'wallet_funded',
      title: 'Wallet Funded',
      description: 'Your wallet has been fu...',
      amount: 49.00,
      timestamp: '07:15 AM',
      category: 'wallet'
    },
    {
      id: '8',
      type: 'money_withdrawn',
      title: 'Money Withdrawn',
      description: 'Money has been withd...',
      amount: 10.00,
      timestamp: '07:15 AM',
      category: 'wallet'
    },
    {
      id: '9',
      type: 'escrow_payment',
      title: 'Escrow Payment',
      description: 'Payment sent via escrow',
      amount: 590.00,
      timestamp: '07:15 AM',
      category: 'escrow'
    },
    {
      id: '10',
      type: 'escrow_received',
      title: 'Escrow Received',
      description: 'Payment received via escrow',
      amount: 120.00,
      timestamp: '06:30 AM',
      category: 'escrow'
    }
  ]);

  const filteredTransactions = allTransactions.filter(
    transaction => transaction.category === activeTab
  );

  const handleTransactionClick = (id: string): void => {
    console.log('Transaction clicked:', id);
    alert(`View transaction details: ${id}`);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        
        <div className="max-w-7xl mx-auto bg-white min-h-screen">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-100 px-4 pt-4 z-10">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Transactions</h1>
            
            {/* Tabs */}
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab('escrow')}
                className={`pb-3 text-sm font-medium transition-colors relative ${
                  activeTab === 'escrow'
                    ? 'text-pri'
                    : 'text-gray-400'
                }`}
              >
                Escrow Transactions
                {activeTab === 'escrow' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pri"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('wallet')}
                className={`pb-3 text-sm font-medium transition-colors relative ${
                  activeTab === 'wallet'
                    ? 'text-pri'
                    : 'text-gray-400'
                }`}
              >
                Wallet Transactions
                {activeTab === 'wallet' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pri"></div>
                )}
              </button>
            </div>
          </div>

          {/* Transactions List */}
          <div className="px-4 py-2">
            {filteredTransactions.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {filteredTransactions.map((transaction) => (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    onClick={handleTransactionClick}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-sm">No transactions found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TransactionsScreen;