// TransactionSummary.tsx
import React, { useState } from 'react';
import { ChevronLeft, DollarSign, Clock, Package } from 'lucide-react';
import Layout from '../../../Layout/Layout';
import TransactionInfoItem from './EscrowInfoItem';
import ProgressStepItem from './ProgressStepItem';
import type { TransactionDetails, ProgressStep } from '../../../types';
const EscrowDetails: React.FC = () => {
  const [transaction] = useState<TransactionDetails>({
    id: '1',
    amount: 590.00,
    userName: 'Abimbola David',
    userTag: 'Tag320b56',
    userAvatar: 'https://i.pravatar.cc/150?img=33',
    status: 'Pending',
    transactionFee: 20,
    estimatedDeliveryDate: '2nd Jan 2024',
    items: 'Iphone 11 pro max, Ipad...'
  });

  const [progressSteps] = useState<ProgressStep[]>([
    {
      id: '1',
      title: 'Transaction Accepted',
      description: '1st Jan 2023 @ 11:09PM',
      status: 'completed'
    },
    {
      id: '2',
      title: 'Processing Transaction',
      description: 'Yesterday',
      status: 'current'
    },
    {
      id: '3',
      title: 'Transaction Completed',
      description: 'Not started',
      status: 'pending'
    }
  ]);

  const handleMarkComplete = (): void => {
    console.log('Mark transaction as complete');
    alert('Transaction marked as complete!');
  };

  const handleBack = (): void => {
    console.log('Navigate back');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto bg-white min-h-screen">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 z-10">
            <div className="flex items-center">
              <button
                onClick={handleBack}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors mr-3"
              >
                <ChevronLeft size={24} className="text-gray-900" />
              </button>
              <h1 className="text-lg font-semibold text-gray-900">
                Transactions summary
              </h1>
            </div>
          </div>

          {/* Content */}
          <div className="px-4 py-6">
            {/* Amount Section */}
            <div className="text-center mb-6">
              <p className="text-sm text-gray-400 mb-2">Amount</p>
              <p className="text-4xl font-bold text-gray-900">
                ${transaction.amount.toFixed(2)}
              </p>
            </div>

            {/* User Info Card */}
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl mb-6">
              <div className="flex items-center flex-1">
                <div className="flex mr-3">
                  <img
                    src={transaction.userAvatar}
                    alt={transaction.userName}
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <img
                    src="https://res.cloudinary.com/dmhvsyzch/image/upload/v1760256119/Profile_avatar_placeholder_large_smgjld.png"
                    alt="Current user"
                    className="w-10 h-10 rounded-full border-2 border-white -ml-3"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    {transaction.userName}
                  </p>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500">{transaction.userTag}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900 mb-1">
                  ${transaction.amount.toFixed(2)}
                </p>
                <div className="flex items-center gap-1 justify-end">
                  <span className="text-xs text-amber-500 font-medium">
                    {transaction.status}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                </div>
              </div>
            </div>

            {/* Transaction Details */}
            <div className="space-y-1 mb-8">
              <TransactionInfoItem
                icon={<DollarSign size={18} className="text-blue-500" />}
                label="Transaction fee:"
                value={`$${transaction.transactionFee}`}
                iconBgColor="bg-blue-100"
              />
              <TransactionInfoItem
                icon={<Clock size={18} className="text-blue-500" />}
                label="Est delivery date:"
                value={transaction.estimatedDeliveryDate}
                iconBgColor="bg-blue-100"
              />
              <TransactionInfoItem
                icon={<Package size={18} className="text-blue-500" />}
                label="Items:"
                value={transaction.items}
                iconBgColor="bg-blue-100"
              />
            </div>

            {/* Transaction Progress */}
            <div className="mb-6">
              <h2 className="text-base font-bold text-gray-900 mb-2">
                Transaction Progress
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Update the progress of this transaction to keep the other party notified of the progress.
              </p>

              <div>
                {progressSteps.map((step, index) => (
                  <ProgressStepItem
                    key={step.id}
                    step={step}
                    isLast={index === progressSteps.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Button */}
          <div className="sticky bottom-0 bg-white border-t border-gray-100 px-4 py-4">
            <button
              onClick={handleMarkComplete}
              className="w-full bg-pri text-white py-4 rounded-xl font-bold hover:bg-blue-600 transition-colors"
            >
              Mark Transaction as Complete
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EscrowDetails;