// RejectEscrowModal.tsx
import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';

interface RejectEscrowModalProps {
  visible: boolean;
  onConfirm: (reason: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const RejectEscrowModal: React.FC<RejectEscrowModalProps> = ({
  visible,
  onConfirm,
  onCancel,
  isLoading = false
}) => {
  const [reason, setReason] = useState('');

  // Reset reason when modal closes
  useEffect(() => {
    if (!visible) {
      setReason('');
    }
  }, [visible]);

  if (!visible) return null;

  const handleConfirm = () => {
    if (reason.trim()) {
      onConfirm(reason.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-4">
      <div className="w-full max-w-md bg-white rounded-xl md:rounded-2xl p-6 animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Reject Escrow
          </h2>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
          >
            <X size={24} className="text-gray-900" />
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reason for rejection
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Please provide a reason for rejecting this escrow transaction..."
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900 placeholder-gray-400 outline-none focus:border-pri focus:ring-2 focus:ring-pri transition-all resize-none"
            rows={4}
            disabled={isLoading}
          />
          <p className="text-xs text-gray-500 mt-2">
            The buyer will be notified with your reason
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 bg-gray-100 text-gray-700 py-3.5 rounded-xl font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!reason.trim() || isLoading}
            className="flex-1 bg-red-500 text-white py-3.5 rounded-xl font-semibold hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin mr-2" />
                Rejecting...
              </>
            ) : (
              'Reject Escrow'
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default RejectEscrowModal;