// EscrowHome.tsx
import React, { useState } from 'react';
import { Plus, } from 'lucide-react';
import Layout from '../../../Layout/Layout';
import TransactionRequestCard from './TransactionRequestCard';
import RecentTransactionItem from './RecentTransactionItem';
import type { TransactionRequest, RecentTransaction } from '../../../types';
import { useNavigate } from 'react-router-dom';


const EscrowHome: React.FC = () => {
  const navigate = useNavigate();
  const [transactionRequests] = useState<TransactionRequest[]>([
    {
      id: '1',
      tag: 'Tag32BG6',
      name: 'Abimbola David',
      avatar: 'https://i.pravatar.cc/150?img=33',
      amount: 95,
      items: 'Ipad, Nike shoe, Macbook pro',
      timestamp: '07:15 AM'
    },

    
  ]);

  const [recentTransactions] = useState<RecentTransaction[]>([
    {
      id: '1',
      tag: 'Tag32Gb6',
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?img=33',
      amount: 25.00,
      items: 'Nike shoe, Airpod, Wris...',
      status: 'Pending',
      timestamp: '07:15 AM'
    },
    {
      id: '2',
      tag: 'Tag32Gb6',
      name: 'Jane Smith',
      avatar: 'https://i.pravatar.cc/150?img=45',
      amount: 89.00,
      items: 'Nike shoe, Airpod, Wris...',
      status: 'Completed',
      timestamp: '07:15 AM'
    },
    {
      id: '3',
      tag: 'Tag32Gb6',
      name: 'Mike Johnson',
      avatar: 'https://i.pravatar.cc/150?img=12',
      amount: 49.00,
      items: 'Nike shoe, Airpod, Wris...',
      status: 'Completed',
      timestamp: '07:15 AM'
    },
    {
      id: '4',
      tag: 'Tag32Gb6',
      name: 'Sarah Wilson',
      avatar: 'https://i.pravatar.cc/150?img=47',
      amount: 10.00,
      items: 'Nike shoe, Airpod, Wris...',
      status: 'Pending',
      timestamp: '07:15 AM'
    }
  ]);

  const handleAccept = (id: string): void => {
    console.log('Accept transaction:', id);
    alert('Transaction accepted!');
  };

  const handleDecline = (id: string): void => {
    console.log('Decline transaction:', id);
    alert('Transaction declined!');
  };

  const handleViewInfo = (id: string): void => {
    console.log('View info for transaction:', id);
    alert('View transaction details');
  };

  const handleTransactionClick = (id: string): void => {
    console.log('Transaction clicked:', id);
    navigate('/escrow-transactions');
  
  };

  const handleNewEscrow = (): void => {
    console.log('Create new escrow');
    alert('Navigate to new escrow');
    navigate('/new-escrow');
  };



  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl  mx-auto bg-white min-h-screen">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 z-10">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Escrow</h1>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleNewEscrow}
                  className="w-9 h-9 rounded-full bg-pri flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <Plus size={20} className="text-white" />
                </button>
           
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-4 py-6 lg:grid grid-cols-2 gap-4">
            {/* Transaction Requests Section */}
            {transactionRequests.length > 0 && (
              <div className="mb-8">
                <h2 className="text-base font-bold text-gray-900 mb-4">
                  Transaction requests
                </h2>
                {transactionRequests.map((request) => (
                  <TransactionRequestCard
                    key={request.id}
                    request={request}
                    onAccept={handleAccept}
                    onDecline={handleDecline}
                    onViewInfo={handleViewInfo}
                  />
                ))}
              </div>
            )}

    
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-4">
                Recent Transactions
              </h2>
              <div className="space-y-1 border border-gray-100 p-4 rounded-xl">
                {recentTransactions.map((transaction) => (
                  <RecentTransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    onClick={handleTransactionClick}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EscrowHome;