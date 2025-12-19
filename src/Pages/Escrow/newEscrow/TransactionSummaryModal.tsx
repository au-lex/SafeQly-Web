// TransactionSummaryModal.tsx
import React from 'react';
import { X, Clock, Package, Loader2 } from 'lucide-react';

interface TransactionSummaryModalProps {
  visible: boolean;
  userInfo: { name: string; tag: string; avatar: string } | null;
  amount: string;
  items: string;
  deliveryDate: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const TransactionSummaryModal: React.FC<TransactionSummaryModalProps> = ({ 
  visible, 
  userInfo, 
  amount, 
  items, 
  deliveryDate, 
  onConfirm, 
  onCancel,
  isLoading = false
}) => {
  if (!visible || !userInfo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-[2px] lg:p-4">
      <div className="w-full max-w-md bg-white rounded-t-xl md:rounded-2xl p-6 animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Transaction Summary
          </h2>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
          >
            <X size={24} className="text-gray-900" />
          </button>
        </div>

        <div className="text-center mb-6">
          <p className="text-sm text-gray-500 mb-1">Amount</p>
          <p className="text-3xl font-bold text-gray-900">₦{amount}</p>
        </div>

        <div className="flex items-center bg-gray-50 p-4 rounded-xl mb-5">
          <div className="flex mr-3">
            <img
              src={userInfo.avatar}
              alt={userInfo.name}
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <img
              src="https://i.pravatar.cc/150?img=68"
              alt="Current user"
              className="w-10 h-10 rounded-full border-2 border-white -ml-3"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900 mb-1">
              {userInfo.name}
            </p>
            <div className="flex items-center gap-1">
              <span className="text-xs text-amber-500 font-medium">Pending</span>
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
            </div>
          </div>
          <p className="text-sm font-bold text-gray-900">₦{amount}</p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center">
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <Clock size={20} className="text-blue-500" />
            </div>
            <span className="flex-1 text-sm text-gray-500">Est delivery date:</span>
            <span className="text-sm font-semibold text-gray-900">
              {deliveryDate || 'Not specified'}
            </span>
          </div>

          <div className="flex items-center">
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <Package size={20} className="text-blue-500" />
            </div>
            <span className="flex-1 text-sm text-gray-500">Items:</span>
            <span className="text-sm font-semibold text-gray-900 max-w-[40%] truncate">
              {items || 'Not specified'}
            </span>
          </div>
        </div>

        <button
          onClick={onConfirm}
          disabled={isLoading}
          className="w-full bg-pri text-white py-4 rounded-xl font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin mr-2" />
              Creating Escrow...
            </>
          ) : (
            'Confirm transaction'
          )}
        </button>
      </div>
    </div>
  );
};

export default TransactionSummaryModal;