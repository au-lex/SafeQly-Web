import { X, Building2, CheckCircle2, AlertCircle } from 'lucide-react';
import React, { useState } from 'react';
import { useGetBankAccounts } from '../../Hooks/useWallet';
import type { BankAccount } from '../../types';
import { useNavigate } from 'react-router-dom';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number, bankAccountId: number) => void;
  isLoading?: boolean;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}) => {
  const [amount, setAmount] = useState('');
  const [selectedBankId, setSelectedBankId] = useState<number | null>(null);

  const navigate = useNavigate();


  const { data: bankAccounts, isLoading: isLoadingBanks } = useGetBankAccounts();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleSubmit = () => {
    const numAmount = parseFloat(amount);
    
    if (isNaN(numAmount) || numAmount <= 0) {
        // You can add a toast here if you like
      return;
    }
    
    if (!selectedBankId) {
      return;
    }

    onSubmit(numAmount, selectedBankId);
  };

  const handleClose = () => {
    setAmount('');
    setSelectedBankId(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size="24" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">Withdraw Funds</h2>
        <p className="text-gray-600 mb-6">Select a destination account and enter amount.</p>

        {/* 1. Amount Input */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Amount to Withdraw
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-lg">
              ₦
            </span>
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder="0.00"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
          </div>
        </div>

        {/* 2. Bank Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Select Destination Account
          </label>

          {isLoadingBanks ? (
            <div className="text-center py-4 text-gray-500 text-sm">Loading accounts...</div>
          ) : bankAccounts && bankAccounts.length > 0 ? (
            <div className="space-y-3">
              {bankAccounts.map((bank: BankAccount) => (
                <div
                  key={bank.id}
                  onClick={() => setSelectedBankId(bank.id)}
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                    selectedBankId === bank.id
                      ? 'border-pri bg-blue-50'
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                    <Building2 size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-gray-900">{bank.bank_name}</p>
                    <p className="text-xs text-gray-500">{bank.account_number} • {bank.account_name}</p>
                  </div>
                  {selectedBankId === bank.id && (
                    <CheckCircle2 size={20} className="text-pri" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500 mb-2">No bank accounts added</p>
              <button 
                onClick={() => navigate('/settings/account')} 
       
                className="text-pri text-sm font-bold hover:underline"
              >
                Add a bank account
              </button>
            </div>
          )}
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
            disabled={isLoading || !amount || !selectedBankId}
            className="flex-1 bg-pri hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {isLoading ? 'Processing...' : 'Withdraw'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawModal;