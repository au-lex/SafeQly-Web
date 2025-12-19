// TransactionsScreen.tsx
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import Layout from '../../Layout/Layout';
import TransactionItem from './TransactionItem';
import { useGetTransactionHistory } from '../../Hooks/useWallet';
import { useGetMyEscrows } from '../../Hooks/useEscrow';
import { useGetUserProfile } from '../../Hooks/useProfile';
import type { Transaction as ApiTransaction, TabType } from '../../types';

const TransactionsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('wallet');

  // Get current user
  const { data: currentUser } = useGetUserProfile();
  const currentUserId = currentUser?.id;

  // Fetch wallet transactions
  const { data: walletData, isLoading: walletLoading } = useGetTransactionHistory();
  const walletTransactions = walletData?.transactions || [];

  // Fetch escrow transactions (both as buyer and seller)
  const { data: buyerEscrows, isLoading: buyerLoading } = useGetMyEscrows('buyer');
  const { data: sellerEscrows, isLoading: sellerLoading } = useGetMyEscrows('seller');

  // Combine all escrows
  const allEscrows = [
    ...(buyerEscrows?.escrows || []),
    ...(sellerEscrows?.escrows || [])
  ];

  const isLoading = activeTab === 'wallet' ? walletLoading : (buyerLoading || sellerLoading);

  // Transform escrow data to match Transaction interface
  const escrowTransactions: ApiTransaction[] = allEscrows.map(escrow => {
    const isBuyer = escrow.buyer_id === currentUserId;
    const otherParty = isBuyer ? escrow.seller : escrow.buyer;
    
    return {
      id: escrow.id.toString(),
      type: (isBuyer ? 'escrow_payment' : 'escrow_received') as ApiTransaction['type'],
      amount: escrow.amount,
      status: escrow.status,
      description: escrow.items,
      created_at: escrow.created_at,
      category: 'escrow' as const,
      metadata: {
        otherParty: {
          name: otherParty?.full_name || 'Unknown',
          tag: otherParty?.user_tag || '',
          avatar: otherParty?.avatar || 'https://i.pravatar.cc/150'
        }
      }
    };
  });

  // Get filtered transactions based on active tab
  const displayTransactions = activeTab === 'wallet' 
    ? walletTransactions 
    : escrowTransactions;

  // Sort by created_at (most recent first)
  const sortedTransactions = [...displayTransactions].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const handleTransactionClick = (id: string): void => {
    if (activeTab === 'escrow') {
      // Navigate to escrow detail page
      window.location.href = `/escrow/${id}`;
    } else {
      // For wallet transactions, you might want to show a detail modal
      console.log('Wallet transaction clicked:', id);
    }
  };

  return (
    <Layout>
      <section className="min-h-screen bg-gray-50">
        <section className="max-w-7xl mx-auto bg-white min-h-screen">
          {/* Header */}
          <section className="sticky top-0 bg-white border-b border-gray-100 px-4 pt-4 z-10">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Transactions</h1>
            
            {/* Tabs */}
            <section className="flex gap-6">
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
                  <section className="absolute bottom-0 left-0 right-0 h-0.5 bg-pri"></section>
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
                  <section className="absolute bottom-0 left-0 right-0 h-0.5 bg-pri"></section>
                )}
              </button>
            </section>
          </section>

          {/* Transactions List */}
          <section className="px-4 py-2">
            {isLoading ? (
              <section className="flex items-center justify-center py-20">
                <Loader2 size={32} className="animate-spin text-pri" />
              </section>
            ) : sortedTransactions.length > 0 ? (
              <section className="sectionide-y sectionide-gray-100">
                {sortedTransactions.map((transaction) => (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    onClick={handleTransactionClick}
                  />
                ))}
              </section>
            ) : (
              <section className="text-center py-12">
                <p className="text-gray-400 text-sm">
                  No {activeTab === 'wallet' ? 'wallet' : 'escrow'} transactions found
                </p>
                {activeTab === 'escrow' && (
                  <button
                    onClick={() => window.location.href = '/new-escrow'}
                    className="mt-4 text-pri font-semibold hover:underline"
                  >
                    Create your first escrow
                  </button>
                )}
              </section>
            )}
          </section>
        </section>
      </section>
    </Layout>
  );
};

export default TransactionsScreen;