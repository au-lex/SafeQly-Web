// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../../Layout/Layout';
import ConfirmUserModal from './ConfirmUserModal';
import TransactionSummaryModal from './TransactionSummaryModal';
import EnterTagScreen from './EnterTagScreen';
import CreateEscrowScreen from './CreateEscrowScreen';
import { useSearchUser, useCreateEscrow } from '../../../Hooks/useEscrow';
import type { UserInfo, EscrowStep } from '../../../types';

const NewEscrow: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Step management
  const [currentStep, setCurrentStep] = useState<EscrowStep>('enterTag');
  
  // Enter Tag Screen state
  const [userTag, setUserTag] = useState<string>('');
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  // Create Escrow Screen state
  const [items, setItems] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [deliveryDate, setDeliveryDate] = useState<string>('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);

  // Hooks
  const { mutate: searchUser, isPending: isSearching } = useSearchUser();
  const { mutate: createEscrow, isPending: isCreating } = useCreateEscrow();

  // Handle pre-filled tag from Quick Transfer
  useEffect(() => {
    const state = location.state as { sellerTag?: string } | null;
    if (state?.sellerTag) {
      setUserTag(state.sellerTag);
      // Auto-search the user
      searchUser(state.sellerTag, {
        onSuccess: (data) => {
          setUserInfo({
            name: data.user.name,
            tag: data.user.tag,
            avatar: data.user.avatar,
          });
          setShowConfirmModal(true);
        },
      });
  
      window.history.replaceState({}, document.title);
    }
  }, [location.state, searchUser]);

  const handleSearchUser = (): void => {
    if (userTag.trim()) {
      searchUser(userTag, {
        onSuccess: (data) => {
          setUserInfo({
            name: data.user.name,
            tag: data.user.tag,
            avatar: data.user.avatar,
          });
          setShowConfirmModal(true);
        },
      });
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
      
      if (file.size > 10 * 1024 * 1024) { // 10MB as per backend
        alert('File size must be less than 10MB');
        return;
      }
      
      setAttachedFile(file);
    }
  };

  const handleConfirmTransaction = (): void => {
    // Validate inputs before showing summary
    if (!items.trim()) {
      alert('Please enter the items');
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    if (!deliveryDate.trim()) {
      alert('Please enter the delivery date');
      return;
    }
    setShowSummaryModal(true);
  };

  const handleFinalConfirm = (): void => {
    if (!userInfo) return;

    createEscrow(
      {
        seller_tag: userInfo.tag,
        items: items.trim(),
        amount: parseFloat(amount),
        delivery_date: deliveryDate.trim(),
        file: attachedFile || undefined,
      },
      {
        onSuccess: () => {
          setShowSummaryModal(false);
          
          // Reset all state
          setCurrentStep('enterTag');
          setUserTag('');
          setUserInfo(null);
          setItems('');
          setAmount('');
          setDeliveryDate('');
          setAttachedFile(null);
  
          navigate('/escrows');
        },
      }
    );
  };

  const handleBack = (): void => {
    if (currentStep === 'createEscrow') {
      setCurrentStep('enterTag');
      setUserInfo(null);
      setItems('');
      setAmount('');
      setDeliveryDate('');
      setAttachedFile(null);
    } else {
      navigate(-1);
    }
  };

  return (
    <Layout>
      <section className="min-h-screen bg-gray-50 flex items-dcenter justify-center">
        <section className="w-full max-w-6xl bg-white rounded-2xl overflow-hidden">
          {/* Header */}
          <section className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-gray-100">
            <button
              onClick={handleBack}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft size={24} className="text-gray-900" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">New Escrow</h1>
            <section className="w-6" />
          </section>

          {/* Content Area */}
          <section className="max-h-[calc(100vh-200px)] overflow-y-auto">
            {currentStep === 'enterTag' ? (
              <EnterTagScreen
                userTag={userTag}
                isLoading={isSearching}
                onUserTagChange={setUserTag}
                onSearchUser={handleSearchUser}
              />
            ) : (
              <CreateEscrowScreen
                userInfo={userInfo}
                items={items}
                amount={amount}
                deliveryDate={deliveryDate}
                attachedFile={attachedFile?.name || null}
                onItemsChange={setItems}
                onAmountChange={setAmount}
                onDeliveryDateChange={setDeliveryDate}
                onFileSelect={handlePickDocument}
                onConfirmTransaction={handleConfirmTransaction}
              />
            )}
          </section>

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
            isLoading={isCreating}
          />
        </section>

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
      </section>
    </Layout>
  );
};

export default NewEscrow;