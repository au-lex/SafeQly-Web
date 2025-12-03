// EscrowFlow.tsx
import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import Layout from '../../../Layout/Layout';
import ConfirmUserModal from './ConfirmUserModal';
import TransactionSummaryModal from './TransactionSummaryModal';
import EnterTagScreen from './EnterTagScreen';
import CreateEscrowScreen from './CreateEscrowScreen';
import type { UserInfo, EscrowStep } from '../../../types';

const EscrowFlow: React.FC = () => {
  // Step management
  const [currentStep, setCurrentStep] = useState<EscrowStep>('enterTag');
  
  // Enter Tag Screen state
  const [userTag, setUserTag] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  // Create Escrow Screen state
  const [items, setItems] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [deliveryDate, setDeliveryDate] = useState<string>('');
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);

  const handleSearchUser = (): void => {
    if (userTag.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        setUserInfo({
          name: 'Abimbola David',
          tag: 'Tag320b56',
          avatar: 'https://i.pravatar.cc/150?img=33',
        });
        setIsLoading(false);
        setShowConfirmModal(true);
      }, 1000);
    }
  };

  const handleConfirmUser = (): void => {
    setShowConfirmModal(false);
    setCurrentStep('createEscrow');
  };

  const handleCancelUser = (): void => {
    setShowConfirmModal(false);
    setUserInfo(null);
  };

  const handlePickDocument = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const acceptedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!acceptedTypes.includes(file.type)) {
        alert('Please select a JPEG, PNG, or PDF file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      
      setAttachedFile(file.name);
    }
  };

  const handleConfirmTransaction = (): void => {
    setShowSummaryModal(true);
  };

  const handleFinalConfirm = (): void => {
    setShowSummaryModal(false);
    console.log('Transaction confirmed!');
    alert('Transaction confirmed successfully!');
    // Reset to initial state
    setCurrentStep('enterTag');
    setUserTag('');
    setUserInfo(null);
    setItems('');
    setAmount('');
    setDeliveryDate('');
    setAttachedFile(null);
  };

  const handleBack = (): void => {
    if (currentStep === 'createEscrow') {
      setCurrentStep('enterTag');
    } else {
      console.log('Navigate back');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 flex itemsg-center justify-center">
        <div className="w-full max-w-6xl bg-white rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-gray-100">
            <button
              onClick={handleBack}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft size={24} className="text-gray-900" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">New Escrow</h1>
            <div className="w-6" />
          </div>

          {/* Content Area */}
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
            {currentStep === 'enterTag' ? (
              <EnterTagScreen
                userTag={userTag}
                isLoading={isLoading}
                onUserTagChange={setUserTag}
                onSearchUser={handleSearchUser}
              />
            ) : (
              <CreateEscrowScreen
                userInfo={userInfo}
                items={items}
                amount={amount}
                deliveryDate={deliveryDate}
                attachedFile={attachedFile}
                onItemsChange={setItems}
                onAmountChange={setAmount}
                onDeliveryDateChange={setDeliveryDate}
                onFileSelect={handlePickDocument}
                onConfirmTransaction={handleConfirmTransaction}
              />
            )}
          </div>

          {/* Modals */}
          <ConfirmUserModal
            visible={showConfirmModal}
            userInfo={userInfo}
            onConfirm={handleConfirmUser}
            onCancel={handleCancelUser}
          />

          <TransactionSummaryModal
            visible={showSummaryModal}
            userInfo={userInfo}
            amount={amount}
            items={items}
            deliveryDate={deliveryDate}
            onConfirm={handleFinalConfirm}
            onCancel={() => setShowSummaryModal(false)}
          />
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
    </Layout>
  );
};

export default EscrowFlow;