import Layout from "../../Layout/Layout";
import React, { useState } from "react";
import { Eye, EyeSlash, Copy, Add, ArrowRight, Import } from "iconsax-react";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetWalletBalance,
  useFundAccount,
  useGetTransactionHistory,
} from "../../Hooks/useWallet";
import { useGetRecentEscrowUsers } from "../../Hooks/useEscrow";
import type { Transaction as ApiTransaction } from "../../types";
import toast from "react-hot-toast";
import FundWalletModal from "../Wallet/FundWalletModal";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(true);
  const [showFundModal, setShowFundModal] = useState(false);

  // API Hooks
  const { data: walletData, isLoading: balanceLoading } = useGetWalletBalance();
  const { data: transactionsData, isLoading: transactionsLoading } =
    useGetTransactionHistory();
  const { data: recentUsersData, isLoading: recentUsersLoading } = 
    useGetRecentEscrowUsers();
  const fundAccountMutation = useFundAccount();

  // Extract data from responses
  const transactions = transactionsData?.transactions || [];
  const recentUsers = recentUsersData?.recent_users || [];

  console.log("Transactions Data:", transactionsData);
  console.log("Transactions Array:", transactions);
  console.log("Recent Users:", recentUsers);

  const handleFundWallet = () => {
    setShowFundModal(true);
  };

  const handleFundSubmit = (amount: number) => {
    fundAccountMutation.mutate({
      amount,
      payment_method: "card",
      payment_provider: "paystack",
    });
  };

  const handleCopyTag = () => {
    if (walletData?.user?.user_tag) {
      navigator.clipboard.writeText(walletData.user.user_tag);
      toast.success("Tag copied to clipboard!");
    }
  };

  const handleQuickTransfer = (userTag: string) => {

    navigate('/new-escrow', { state: { sellerTag: userTag } });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "failed":
        return "bg-red-100 text-red-700";
      case "active":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getTransactionDirection = (type: string): "in" | "out" => {
    const incomingTypes = ["wallet_funded", "escrow_received", "deposit"];
    return incomingTypes.includes(type.toLowerCase()) ? "in" : "out";
  };

  // Get first name from full name
  const getFirstName = (fullName: string) => {
    return fullName.split(' ')[0];
  };

  return (
    <Layout>
      <div className="min-h-screen md:bg-gray-50">
        {/* Fund Wallet Modal */}
        <FundWalletModal
          isOpen={showFundModal}
          onClose={() => setShowFundModal(false)}
          onSubmit={handleFundSubmit}
          isLoading={fundAccountMutation.isPending}
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* === LEFT COLUMN (Profile, Balance, Actions) === */}
          <div className="md:col-span-4 space-y-6">
            {/* 1. Balance Card */}
            <div className="bg-white p-6 space-y-6 md:rounded-xl md:border md:border-gray-100">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">
                    Total Balance
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <h1 className="text-4xl font-bold font-mono text-gray-800 flex items-center gap-3">
                    {showBalance
                      ? balanceLoading
                        ? "Loading..."
                        : formatAmount(walletData?.available_balance || 0)
                      : "•••••••"}
                    <button
                      onClick={() => setShowBalance(!showBalance)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {showBalance ? (
                        <Eye size="24"  color="currentColor"/>
                      ) : (
                        <EyeSlash color="currentColor" size="24" />
                      )}
                    </button>
                  </h1>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={handleFundWallet}
                    className="flex-1 bg-pri hover:bg-blue-700 text-white py-3.5 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <Add size="20" color="#fff" />
                    Fund Wallet
                  </button>
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3.5 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors">
                    <Import
                      size="20"
                      color="currentColor"
                      className="rotate-90 text-pri"
                    />
                    Withdraw
                  </button>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-pri font-bold text-sm">
                    {walletData?.user?.user_tag || "Loading..."}
                  </span>
                  <button
                    onClick={handleCopyTag}
                    className="flex items-center gap-1 text-pri font-semibold text-xs hover:text-blue-700"
                  >
                    Copy Tag <Copy size="14" />
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Quick Actions / New Escrow */}
            <div className="px-6 md:px-0">
              <Link
                to="/new-escrow"
                className="w-full border bg-white border-pri text-pri hover:bg-blue-50 py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
              >
                New Escrow Transaction{" "}
                <ArrowRight
                  size="16"
                  color="currentColor"
                  className="text-pri"
                />
              </Link>
            </div>

            {/* 3. Quick Transfer */}
            <div className="px-6 md:px-2 bg-white md:p-6 md:rounded-xl md:border md:border-gray-100">
              <h3 className="font-bold text-lg text-gray-900 mb-4">
                Quick Transfer
              </h3>
              
              {recentUsersLoading ? (
                <div className="text-center py-4 text-gray-500 text-sm">
                  Loading...
                </div>
              ) : recentUsers.length > 0 ? (
                <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {recentUsers.slice(0, 5).map((user) => (
                    <div
                      key={user.id}
                      onClick={() => handleQuickTransfer(user.user_tag)}
                      className="flex flex-col items-center gap-2 min-w-[60px] cursor-pointer group"
                    >
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-pri group-hover:border-blue-500 transition-all">
                        <img
                          src={user.avatar || 'https://i.pravatar.cc/150'}
                          alt={user.full_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-900 truncate max-w-[60px]">
                        {getFirstName(user.full_name)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500 text-sm mb-2">No recent users yet</p>
                  <Link
                    to="/new-escrow"
                    className="text-pri text-xs font-semibold hover:underline"
                  >
                    Create your first escrow
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* === RIGHT COLUMN (Transaction History) === */}
          <div className="md:col-span-8 bg-white md:rounded-xl md:border md:border-gray-100 md:p-6 h-full">
            <div className="px-6 md:px-0 mt-4 md:mt-0">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-xl text-gray-900">
                  Transaction History
                </h3>
                <button className="text-pri font-semibold text-sm hover:text-blue-700">
                  View All
                </button>
              </div>
            </div>

            {/* List Header (Desktop Only) */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-3 pb-3 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              <div className="col-span-5">Transaction Type</div>
              <div className="col-span-3">Date & Time</div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-2 text-right">Amount</div>
            </div>

            {/* Transaction List */}
            <div className="px-6 md:px-0 py-2 space-y-4 pb-20 md:pb-0">
              {transactionsLoading ? (
                <div className="text-center py-8 text-gray-500">
                  Loading transactions...
                </div>
              ) : transactions && transactions.length > 0 ? (
                transactions.slice(0, 5).map((tx: ApiTransaction) => {
                  const direction = getTransactionDirection(tx.type);
                  const isDeposit = direction === "in";

                  return (
                    <div
                      key={tx.id}
                      className="group cursor-pointer hover:bg-gray-50 md:p-3 md:-mx-3 md:rounded-xl transition-colors border-b md:border-b-0 border-gray-50 last:border-0 pb-4 md:pb-0"
                    >
                      <div className="grid grid-cols-12 gap-2 md:gap-4 items-center">
                        {/* 1. Transaction Type with Arrow */}
                        <div className="col-span-7 md:col-span-5 flex items-center gap-3">
                          <div
                            className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                              isDeposit ? "bg-green-100" : "bg-red-100"
                            }`}
                          >
                            <svg
                              className={`w-5 h-5 md:w-6 md:h-6 ${
                                isDeposit
                                  ? "text-pri rotate-[145deg]"
                                  : "text-red-600 rotate-[-45deg]"
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </div>
                          <div className="overflow-hidden">
                            <h4 className="font-bold text-gray-900 text-sm truncate">
                              {tx.type
                                .replace(/_/g, " ")
                                .replace(/\b\w/g, (l) => l.toUpperCase())}
                            </h4>
                            <p className="text-xs text-gray-400 truncate">
                              {tx.description || "Transaction"}
                            </p>
                          </div>
                        </div>

                        {/* 2. Date & Time */}
                        <div className="col-span-5 md:col-span-3 text-right md:text-left">
                          <p className="text-xs font-medium text-gray-600">
                            {formatDate(tx.created_at)}
                          </p>
                          <p className="text-[10px] text-gray-400">
                            {formatTime(tx.created_at)}
                          </p>
                        </div>

                        {/* 3. Status */}
                        <div className="col-span-6 md:col-span-2 mt-2 md:mt-0 flex md:justify-center">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${getStatusColor(
                              tx.status
                            )}`}
                          >
                            {tx.status}
                          </span>
                        </div>

                        {/* 4. Amount */}
                        <div className="col-span-6 md:col-span-2 mt-2 md:mt-0 text-right">
                          <span
                            className={`block font-bold text-sm ${
                              isDeposit ? "text-pri" : "text-red-600"
                            }`}
                          >
                            {isDeposit ? "+" : "-"}
                            {formatAmount(tx.amount)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No transactions yet
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;