import { X } from 'lucide-react';
import React, { useState } from 'react';


interface FundWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number) => void;
  isLoading?: boolean;
}

const FundWalletModal: React.FC<FundWalletModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}) => {
  const [fundAmount, setFundAmount] = useState('');
  const [selectedQuickAmount, setSelectedQuickAmount] = useState<number | null>(null);

  const quickAmounts = [1000, 2000, 5000, 10000, 20000, 50000];

  const handleQuickAmountClick = (amount: number) => {
    setSelectedQuickAmount(amount);
    setFundAmount(amount.toString());
  };

  const handleCustomAmountChange = (value: string) => {
    setFundAmount(value);
    setSelectedQuickAmount(null);
  };

  const handleSubmit = () => {
    const amount = parseFloat(fundAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    onSubmit(amount);
  };

  const handleClose = () => {
    setFundAmount('');
    setSelectedQuickAmount(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size="24" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">Fund Wallet</h2>
        <p className="text-gray-600 mb-6">Enter the amount you want to add to your wallet</p>

        {/* Quick Amount Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Quick Select</label>
          <div className="grid grid-cols-3 gap-3">
            {quickAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => handleQuickAmountClick(amount)}
                className={`py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
                  selectedQuickAmount === amount
                    ? 'bg-pri text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                ₦{amount.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Amount Input */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Or Enter Custom Amount
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-lg">
              ₦
            </span>
            <input
              type="number"
              value={fundAmount}
              onChange={(e) => handleCustomAmountChange(e.target.value)}
              placeholder="0.00"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading || !fundAmount}
            className="flex-1 bg-pri hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FundWalletModal;