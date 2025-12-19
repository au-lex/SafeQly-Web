// EscrowHome.tsx
import React, { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../Layout/Layout';
import TransactionRequestCard from './TransactionRequestCard';
import RecentTransactionItem from './RecentTransactionItem';
import RejectEscrowModal from './RejectEscrowModal';
import { 
  useGetMyEscrows, 
  useAcceptEscrow, 
  useRejectEscrow 
} from '../../../Hooks/useEscrow';
import { useGetUserProfile } from '../../../Hooks/useProfile';

const EscrowHome: React.FC = () => {
  const navigate = useNavigate();
  
  // Get current user
  const { data: currentUser } = useGetUserProfile();
  const currentUserId = currentUser?.id;
  
  // State for reject modal
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedEscrowId, setSelectedEscrowId] = useState<string>('');

  // Fetch escrows - separate queries for different roles
  const { data: buyerEscrows, isLoading: loadingBuyer } = useGetMyEscrows('buyer');
  const { data: sellerEscrows, isLoading: loadingSeller } = useGetMyEscrows('seller');
  
  // Mutations
  const { mutate: acceptEscrow, isPending: isAccepting } = useAcceptEscrow();
  const { mutate: rejectEscrow, isPending: isRejecting } = useRejectEscrow();

  // Filter pending escrows where current user is the seller (incoming requests)
  const transactionRequests = sellerEscrows?.escrows.filter(
    (escrow) => escrow.status === 'pending'
  ) || [];

  // Get all escrows for recent transactions (both buyer and seller)
  const allEscrows = [
    ...(buyerEscrows?.escrows || []),
    ...(sellerEscrows?.escrows || [])
  ];

  // Sort by created_at and get recent ones
  const recentTransactions = allEscrows
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 10);

  const isLoading = loadingBuyer || loadingSeller;

  const handleAccept = (id: string): void => {
    acceptEscrow(id, {
      onSuccess: () => {
        // Success toast is handled in the hook
      }
    });
  };

  const handleDecline = (id: string): void => {
    setSelectedEscrowId(id);
    setShowRejectModal(true);
  };

  const handleRejectConfirm = (reason: string): void => {
    rejectEscrow(
      { escrowId: selectedEscrowId, reason },
      {
        onSuccess: () => {
          setShowRejectModal(false);
          setSelectedEscrowId('');
        }
      }
    );
  };

  const handleViewInfo = (id: string): void => {
    navigate(`/escrow/${id}`);
  };

  const handleTransactionClick = (id: string): void => {
    navigate(`/escrow/${id}`);
  };

  const handleNewEscrow = (): void => {
    navigate('/new-escrow');
  };

  const getStatusDisplay = (status: string): string => {
    const statusMap: Record<string, string> = {
      'pending': 'Pending',
      'accepted': 'Accepted',
      'rejected': 'Rejected',
      'completed': 'Completed',
      'released': 'Released',
      'disputed': 'Disputed',
      'cancelled': 'Cancelled'
    };
    return statusMap[status] || status;
  };

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto bg-white min-h-screen">
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

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={32} className="animate-spin text-pri" />
            </div>
          )}

          {/* Content */}
          {!isLoading && (
            <div className="px-4 py-6 lg:grid grid-cols-2 gap-4">
              {/* Transaction Requests Section */}
              {transactionRequests.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-base font-bold text-gray-900 mb-4">
                    Transaction requests ({transactionRequests.length})
                  </h2>
                  {transactionRequests.map((request) => (
                    <TransactionRequestCard
                      key={request.id}
                      request={{
                        id: request.id.toString(),
                        tag: request.buyer?.user_tag || '',
                        name: request.buyer?.full_name || 'Unknown',
                        avatar: request.buyer?.avatar || 'https://i.pravatar.cc/150',
                        amount: request.amount,
                        items: request.items,
                        timestamp: formatTime(request.created_at)
                      }}
                      onAccept={handleAccept}
                      onDecline={handleDecline}
                      onViewInfo={handleViewInfo}
                      isAccepting={isAccepting}
                      isRejecting={isRejecting}
                    />
                  ))}
                </div>
              )}

              {/* Recent Transactions Section */}
              <div>
                <h2 className="text-base font-bold text-gray-900 mb-4">
                  Recent Transactions ({recentTransactions.length})
                </h2>
                {recentTransactions.length > 0 ? (
                  <div className="space-y-1 border border-gray-100 p-4 rounded-xl">
                    {recentTransactions.map((transaction) => {
                      // Determine if current user is buyer or seller
                      const isBuyer = transaction.buyer_id === currentUserId;
                      const otherParty = isBuyer ? transaction.seller : transaction.buyer;

                      return (
                        <RecentTransactionItem
                          key={transaction.id}
                          transaction={{
                            id: transaction.id.toString(),
                            tag: otherParty?.user_tag || '',
                            name: otherParty?.full_name || 'Unknown',
                            avatar: otherParty?.avatar || 'https://i.pravatar.cc/150',
                            amount: transaction.amount,
                            items: transaction.items,
                            status: getStatusDisplay(transaction.status),
                            timestamp: formatTime(transaction.created_at)
                          }}
                          onClick={handleTransactionClick}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="border border-gray-100 p-8 rounded-xl text-center">
                    <p className="text-gray-500">No transactions yet</p>
                    <button
                      onClick={handleNewEscrow}
                      className="mt-4 text-pri font-semibold hover:underline"
                    >
                      Create your first escrow
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Reject Modal */}
          <RejectEscrowModal
            visible={showRejectModal}
            onConfirm={handleRejectConfirm}
            onCancel={() => {
              setShowRejectModal(false);
              setSelectedEscrowId('');
            }}
            isLoading={isRejecting}
          />
        </div>
      </div>
    </Layout>
  );
};

export default EscrowHome;