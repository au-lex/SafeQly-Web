import React, { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { 
  Building2, 
  Trash2, 
  CheckCircle2, 
  Plus, 
  Loader2, 
  X,
  AlertCircle 
} from 'lucide-react';
import toast from 'react-hot-toast';


import { 
  useGetBanks, 
  useGetBankAccounts, 
  useAddBankAccount, 
  useResolveAccountNumber, 
  useSetDefaultBankAccount, 
  useDeleteBankAccount 
} from '../../Hooks/useWallet'; 

const AccountSettingsDetail: React.FC = () => {
  const queryClient = useQueryClient();
  const [showAddModal, setShowAddModal] = useState(false);

  // --- Hooks ---
  const { data: bankAccounts, isLoading: isLoadingAccounts } = useGetBankAccounts();
  const { mutate: setDefault, isPending: isSettingDefault } = useSetDefaultBankAccount();
  const { mutate: deleteBank, isPending: isDeleting } = useDeleteBankAccount();

  // --- Handlers ---
  const handleSetDefault = (id: number) => {
    setDefault(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      }
    });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to remove this bank account?')) {
      deleteBank(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
        }
      });
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Bank Accounts</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your withdrawal accounts</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-pri hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-colors"
        >
          <Plus size={18} />
          Add Bank Account
        </button>
      </div>

      {/* --- Account List --- */}
      <div className="space-y-4">
        {isLoadingAccounts ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-pri" />
          </div>
        ) : bankAccounts && bankAccounts.length > 0 ? (
          bankAccounts.map((account) => (
            <div 
              key={account.id} 
              className={`border rounded-xl p-5 transition-all ${
                account.is_default 
                  ? 'border-pri bg-blue-50/30' 
                  : 'border-gray-200 hover:border-blue-200 bg-white'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${account.is_default ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    <Building2 size={24} className={account.is_default ? 'text-pri' : 'text-gray-500'} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{account.bank_name}</h3>
                    <p className="text-gray-600 font-medium font-mono tracking-wide mt-1">
                      {account.account_number}
                    </p>
                    <p className="text-sm text-gray-500 uppercase mt-0.5">
                      {account.account_name}
                    </p>
                    {account.is_default && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-pri bg-blue-100 px-2 py-1 rounded-full mt-2">
                        <CheckCircle2 size={12} /> Default Account
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {!account.is_default && (
                    <button
                      onClick={() => handleSetDefault(account.id)}
                      disabled={isSettingDefault}
                      className="text-sm text-gray-500 hover:text-pri font-medium px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors text-left"
                    >
                      Make Default
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(account.id)}
                    disabled={isDeleting}
                    className="text-sm text-red-500 hover:text-red-700 font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors text-left flex items-center gap-2"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <Building2 className="text-gray-400" />
            </div>
            <h3 className="text-gray-900 font-medium">No bank accounts added</h3>
            <p className="text-gray-500 text-sm mt-1">Add a bank account to withdraw funds</p>
          </div>
        )}
      </div>

      {/* --- Add Bank Modal --- */}
      {showAddModal && (
        <AddBankModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
};

// ============================================================================
// SUB-COMPONENT: ADD BANK MODAL
// ============================================================================

interface AddBankModalProps {
  onClose: () => void;
}

const AddBankModal: React.FC<AddBankModalProps> = ({ onClose }) => {
  const queryClient = useQueryClient();
  
  // State
  const [bankCode, setBankCode] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [resolvedName, setResolvedName] = useState('');

  // Hooks
  const { data: banks, isLoading: isLoadingBanks } = useGetBanks();
  const { mutate: resolveAccount, isPending: isResolving } = useResolveAccountNumber();
  const { mutate: addBankAccount, isPending: isAdding } = useAddBankAccount();

  // Effect: Trigger resolution when inputs are valid
  useEffect(() => {
    if (bankCode && accountNumber.length === 10) {
      resolveAccount(
        { account_number: accountNumber, bank_code: bankCode },
        {
          onSuccess: (data: any) => {
  
            setResolvedName(data.account_name || data.data?.account_name || '');
            toast.success('Account verified');
          },
          onError: () => {
            setResolvedName('');
          }
        }
      );
    } else {
      setResolvedName('');
    }
  }, [bankCode, accountNumber, resolveAccount]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bankCode || !accountNumber || !resolvedName) return;

    // Find bank name for the payload
    const selectedBank = banks?.find(b => b.code === bankCode);

    addBankAccount(
      {
        bank_name: selectedBank?.name || '',
        account_number: accountNumber,
        account_name: resolvedName,
        bank_code: bankCode
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
          onClose();
        }
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <h3 className="font-bold text-gray-900 text-lg">Add Bank Account</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Bank Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Bank</label>
            <div className="relative">
              <select
                value={bankCode}
                onChange={(e) => setBankCode(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-pri outline-none appearance-none bg-white transition-all disabled:bg-gray-50"
                disabled={isLoadingBanks}
              >
                <option value="">Select a bank</option>
                {banks?.map((bank) => (
                  <option key={bank.id} value={bank.code}>
                    {bank.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                {isLoadingBanks ? <Loader2 size={16} className="animate-spin" /> : '▼'}
              </div>
            </div>
          </div>

          {/* Account Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
            <input
              type="text"
              maxLength={10}
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))} // Only numbers
              placeholder="0123456789"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-pri outline-none transition-all font-mono"
            />
          </div>

          {/* Account Name (Read Only / Resolved) */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
              Account Name
            </label>
            <div className="flex items-center gap-2 min-h-[24px]">
              {isResolving ? (
                <span className="text-sm text-pri flex items-center gap-2">
                  <Loader2 size={14} className="animate-spin" /> Verifying account...
                </span>
              ) : resolvedName ? (
                <span className="text-sm font-bold text-green-600 flex items-center gap-1">
                   <CheckCircle2 size={14} /> {resolvedName}
                </span>
              ) : (
                <span className="text-sm text-gray-400 italic">
                  {accountNumber.length === 10 && bankCode ? 'Could not resolve name' : 'Enter details to verify'}
                </span>
              )}
            </div>
          </div>

          {/* Info Note */}
          <div className="flex gap-2 p-3 bg-blue-50 text-blue-700 rounded-lg text-xs">
            <AlertCircle size={16} className="flex-shrink-0" />
            <p>Please ensure the account name matches your registered profile name to avoid withdrawal delays.</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!resolvedName || isAdding}
              className="flex-1 px-4 py-3 bg-pri hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isAdding ? <Loader2 size={18} className="animate-spin" /> : 'Save Account'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AccountSettingsDetail;