// ConfirmUserModal.tsx
import React from 'react';
import { X } from 'lucide-react';
import { type ConfirmUserModalProps } from '../../../types';

const ConfirmUserModal: React.FC<ConfirmUserModalProps> = ({ 
  visible, 
  userInfo, 
  onConfirm, 
  onCancel 
}) => {
  if (!visible || !userInfo) return null;

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-4">
      <section className="w-full max-w-md bg-white rounded-xl md:rounded-2xl p-6 animate-slide-up">
        <section className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Confirm User Info
          </h2>
          <button
            onClick={onCancel}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-900" />
          </button>
        </section>

        <section className="flex items-center mb-6">
          <img
            src={userInfo.avatar}
            alt={userInfo.name}
            className="w-14 h-14 rounded-full mr-3 border-2 border-amber-500"
          />
          <section>
            <p className="text-base font-semibold text-gray-900">
              {userInfo.name}
            </p>
            <p className="text-sm text-gray-500 mt-0.5">{userInfo.tag}</p>
          </section>
        </section>

        <section className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-100 text-gray-700 py-3.5 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-pri text-white py-3.5 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
          >
            Confirm
          </button>
        </section>
      </section>
    </section>
  );
};

export default ConfirmUserModal;