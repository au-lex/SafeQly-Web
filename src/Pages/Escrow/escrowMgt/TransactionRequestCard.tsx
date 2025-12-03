// TransactionRequestCard.tsx
import React from 'react';
import {type  TransactionRequestCardProps } from '../../../types';

const TransactionRequestCard: React.FC<TransactionRequestCardProps> = ({
  request,
  onAccept,
  onDecline,
  onViewInfo
}) => {
  return (
    <div className="bg-white rounded-xl p-4  border border-gray-100 mb-4">
      {/* Tag Header */}
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-pri flex items-center justify-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm font-semibold text-gray-900">{request.tag}</p>
          <p className="text-xs text-gray-500">{request.timestamp}</p>
        </div>
      </div>

      {/* User Info */}
      <div className="flex items-start mb-4">
        <img
          src={request.avatar}
          alt={request.name}
          className="w-12 h-12 rounded-full border-2 border-amber-500"
        />
        <div className="ml-3 flex-1">
          <p className="text-base font-semibold text-gray-900 mb-1">
            {request.name}
          </p>
          <p className="text-sm font-semibold text-gray-900 mb-1">
            Amount: ${request.amount}
          </p>
          <p className="text-xs text-gray-500 line-clamp-1">
            Items: {request.items}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onAccept(request.id)}
          className="flex-1 bg-pri text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-600 transition-colors"
        >
          Accept
        </button>
        <button
          onClick={() => onDecline(request.id)}
          className="flex-1 bg-red-500 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-red-600 transition-colors"
        >
          Decline
        </button>
        <button
          onClick={() => onViewInfo(request.id)}
          className="px-4 bg-gray-100 text-gray-700 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors whitespace-nowrap"
        >
          View Info
        </button>
      </div>
    </div>
  );
};

export default TransactionRequestCard;