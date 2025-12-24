// CreateEscrowScreen.tsx
import React from 'react';
import { PlusCircle } from 'lucide-react';
import { useGetWalletBalance } from '../../../Hooks/useWallet';
import type { UserInfo } from '../../../types';

interface CreateEscrowScreenProps {
  userInfo: UserInfo | null;
  items: string;
  amount: string;
  deliveryDate: string;
  attachedFile: string | null;
  onItemsChange: (items: string) => void;
  onAmountChange: (amount: string) => void;
  onDeliveryDateChange: (date: string) => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onConfirmTransaction: () => void;
}

const CreateEscrowScreen: React.FC<CreateEscrowScreenProps> = ({
  userInfo,
  items,
  amount,
  deliveryDate,
  attachedFile,
  onItemsChange,
  onAmountChange,
  onDeliveryDateChange,
  onFileSelect,
  onConfirmTransaction
}) => {
  const { data: walletData } = useGetWalletBalance();
  const availableBalance = walletData?.available_balance || 0;

  return (
    <>
      <section className="p-6">
        {/* User Info Card */}
        {userInfo && (
          <section className="flex items-center bg-white p-4 rounded-xl mb-6 border border-gray-200">
     <img
  src={
    userInfo?.avatar ||
    "https://res.cloudinary.com/dmhvsyzch/image/upload/v1760256119/Profile_avatar_placeholder_large_smgjld.png"
  }
  alt={userInfo?.name || "User Profile"}
  className="w-14 h-14 rounded-full mr-3 border-2 border-amber-500 object-cover"
/>
            <section>
              <p className="text-base font-semibold text-gray-900">
                {userInfo.name}
              </p>
              <p className="text-sm text-gray-500">{userInfo.tag}</p>
            </section>
          </section>
        )}

        {/* Item(s) Input */}
        <section className="mb-6">
          <label className="block text-sm font-medium text-gray-500 mb-2">
            Item(s)
          </label>
          <textarea
            value={items}
            onChange={(e) => onItemsChange(e.target.value)}
            placeholder="Ipad, Macbook, Iphone"
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 text-base text-gray-900 placeholder-gray-400 outline-none focus:border-pri focus:ring-2 focus:ring-pri transition-all resize-none"
            rows={3}
          />
        </section>

        {/* Amount Input */}
        <section className="mb-6">
          <section className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-500">Amount</label>
            <span className="text-sm font-semibold text-pri">
              Bal: ₦{availableBalance.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </section>
          <section className="flex items-center bg-white border border-gray-200 rounded-xl px-4 py-4">
            <span className="text-base font-medium text-gray-900 mr-1">₦</span>
            <input
              type="text"
              value={amount}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9.]/g, '');
                // Prevent multiple decimal points
                if ((value.match(/\./g) || []).length <= 1) {
                  onAmountChange(value);
                }
              }}
              placeholder="0.00"
              className="flex-1 text-base text-gray-900 outline-none placeholder-gray-400"
            />
          </section>
          {/* Balance warning */}
          {amount && parseFloat(amount) > availableBalance && (
            <p className="text-xs text-red-500 mt-2">
              Insufficient balance. You have ₦{availableBalance.toFixed(2)}
            </p>
          )}
        </section>

        {/* Delivery Date Input */}
        <section className="mb-6">
          <label className="block text-sm font-medium text-gray-500 mb-2">
            Delivery date
          </label>
          <input
            type="date"
            value={deliveryDate}
            onChange={(e) => onDeliveryDateChange(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 text-base text-gray-900 placeholder-gray-400 outline-none focus:border-pri focus:ring-2 focus:ring-pri transition-all"
          />
        </section>

        {/* File Upload Section */}
        <section className="mb-6">
          <label className="block text-sm font-medium text-gray-500 mb-2">
            Attach signed doc (optional)
          </label>
          <label className="block border-2 border-dashed border-pri rounded-xl p-6 bg-white cursor-pointer hover:bg-blue-50 transition-colors">
            <input
              type="file"
              accept="image/jpeg,image/png,application/pdf"
              onChange={onFileSelect}
              className="hidden"
            />
            <section className="flex flex-col items-center">
              <PlusCircle size={32} className="text-pri mb-3" />
              <p className="text-sm font-semibold text-gray-900 text-center mb-1">
                Attach a file or image for evidence
              </p>
              <p className="text-xs text-gray-500 text-center mb-0.5">
                Accepted file type: JPEG, PNG, and PDF
              </p>
              <p className="text-xs text-gray-400 text-center">Size limit: 10MB</p>
              {attachedFile && (
                <p className="text-xs text-green-600 font-medium mt-2">
                  📎 {attachedFile}
                </p>
              )}
            </section>
          </label>
        </section>
      </section>

      <section className="p-6 md:p-8 border-t border-gray-100">
        <button
          onClick={onConfirmTransaction}
          disabled={!items.trim() || !amount || parseFloat(amount) <= 0 || parseFloat(amount) > availableBalance || !deliveryDate}
          className="w-full bg-pri text-white py-4 rounded-xl font-bold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirm transaction
        </button>
      </section>
    </>
  );
};

export default CreateEscrowScreen;