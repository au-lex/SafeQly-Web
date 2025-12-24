// src/pages/Admin/Withdrawals.tsx
import { useState } from 'react';
import {
  useGetPendingWithdrawals,
  useGetWithdrawalStats,
  useCompleteWithdrawal,
  useFailWithdrawal,
 type  WithdrawalTransaction,
} from '../../../Hooks/useAdmin';
import {
  Wallet,
  CheckCircle,
  XCircle,
  Clock,


  AlertCircle,
  FileText,
  Search,
} from 'lucide-react';
import { Eye } from 'iconsax-react';
import AdminLayout from '../../../Layout/adminLayout';

const AdminWithdrawals = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<WithdrawalTransaction | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);
  const [notes, setNotes] = useState('');
  const [failReason, setFailReason] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const limit = 20;

  const { data: withdrawalsData, isLoading: loadingWithdrawals } = useGetPendingWithdrawals(
    currentPage,
    limit
  );
  const { data: statsData, isLoading: loadingStats } = useGetWithdrawalStats();

  const completeMutation = useCompleteWithdrawal();
  const failMutation = useFailWithdrawal();

  const handleComplete = async () => {
    if (!selectedWithdrawal) return;

    try {
      await completeMutation.mutateAsync({
        withdrawalId: selectedWithdrawal.id.toString(),
        data: notes ? { notes } : undefined,
      });
      setShowCompleteModal(false);
      setSelectedWithdrawal(null);
      setNotes('');
    } catch (error) {
      console.error('Failed to complete withdrawal:', error);
    }
  };

  const handleFail = async () => {
    if (!selectedWithdrawal || !failReason.trim()) return;

    try {
      await failMutation.mutateAsync({
        withdrawalId: selectedWithdrawal.id.toString(),
        reason: failReason,
      });
      setShowFailModal(false);
      setSelectedWithdrawal(null);
      setFailReason('');
    } catch (error) {
      console.error('Failed to fail withdrawal:', error);
    }
  };

  const filteredWithdrawals = withdrawalsData?.pending_withdrawals.filter((w) =>
    w.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.user?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.account_number?.includes(searchTerm)
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const stats = statsData?.stats;

  return (
    <AdminLayout>


    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Withdrawal Management</h1>
          <p className="mt-2 text-gray-600">
            Process and manage user withdrawal requests manually
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Withdrawals"
            value={stats?.total_withdrawals || 0}
            icon={Wallet}
            color="bg-blue-500"
            loading={loadingStats}
          />
          <StatCard
            title="Pending"
            value={stats?.pending_withdrawals || 0}
            subtitle={formatCurrency(stats?.pending_amount || 0)}
            icon={Clock}
            color="bg-yellow-500"
            loading={loadingStats}
          />
          <StatCard
            title="Completed"
            value={stats?.completed_withdrawals || 0}
            subtitle={formatCurrency(stats?.completed_amount || 0)}
            icon={CheckCircle}
            color="bg-green-500"
            loading={loadingStats}
          />
          <StatCard
            title="Failed"
            value={stats?.failed_withdrawals || 0}
            icon={XCircle}
            color="bg-red-500"
            loading={loadingStats}
          />
        </div>

        {/* Search and Summary */}
        <div className="bg-white rounded-lg s p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by reference, user name, or account..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="bg-blue-50 px-4 py-2 rounded-lg">
                <span className="text-gray-600">Total Pending:</span>
                <span className="ml-2 font-semibold text-blue-600">
                  {withdrawalsData?.summary.total_count || 0}
                </span>
              </div>
              <div className="bg-green-50 px-4 py-2 rounded-lg">
                <span className="text-gray-600">Amount:</span>
                <span className="ml-2 font-semibold text-green-600">
                  {formatCurrency(withdrawalsData?.summary.total_amount || 0)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Withdrawals Table */}
        <div className="bg-white rounded-lg s overflow-hidden">
          <div className="overflow-x-auto">
            {loadingWithdrawals ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : filteredWithdrawals && filteredWithdrawals.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reference
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bank Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredWithdrawals.map((withdrawal) => (
                    <tr key={withdrawal.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm font-medium text-gray-900">
                            {withdrawal.reference}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {withdrawal.user?.full_name || 'N/A'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {withdrawal.user?.email || 'N/A'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          {formatCurrency(withdrawal.amount)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          <div>{withdrawal.account_name}</div>
                          <div className="text-gray-500">
                            {withdrawal.account_number} - {withdrawal.bank_name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(withdrawal.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <Clock className="h-3 w-3 mr-1" />
                          {withdrawal.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedWithdrawal(withdrawal);
                              setShowDetailsModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                            title="View Details"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedWithdrawal(withdrawal);
                              setShowCompleteModal(true);
                            }}
                            className="text-green-600 hover:text-green-900"
                            title="Mark as Completed"
                          >
                            <CheckCircle className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedWithdrawal(withdrawal);
                              setShowFailModal(true);
                            }}
                            className="text-red-600 hover:text-red-900"
                            title="Mark as Failed"
                          >
                            <XCircle className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-12">
                <Wallet className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No pending withdrawals</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm
                    ? 'No withdrawals match your search criteria.'
                    : 'All withdrawal requests have been processed.'}
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {withdrawalsData && withdrawalsData.pagination.total > limit && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage((p) => p + 1)}
                  disabled={
                    currentPage >= Math.ceil(withdrawalsData.pagination.total / limit)
                  }
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{' '}
                    <span className="font-medium">
                      {(currentPage - 1) * limit + 1}
                    </span>{' '}
                    to{' '}
                    <span className="font-medium">
                      {Math.min(currentPage * limit, withdrawalsData.pagination.total)}
                    </span>{' '}
                    of{' '}
                    <span className="font-medium">
                      {withdrawalsData.pagination.total}
                    </span>{' '}
                    results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md s -space-x-px">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage((p) => p + 1)}
                      disabled={
                        currentPage >= Math.ceil(withdrawalsData.pagination.total / limit)
                      }
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Note about manual processing */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-blue-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Manual Processing Required</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  Process these withdrawals manually via your bank, then mark them as completed or
                  failed in the system. Users will be refunded automatically if marked as failed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedWithdrawal && (
        <Modal
          title="Withdrawal Details"
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedWithdrawal(null);
          }}
        >
          <div className="space-y-4">
            <DetailRow label="Reference" value={selectedWithdrawal.reference} />
            <DetailRow
              label="Amount"
              value={formatCurrency(selectedWithdrawal.amount)}
              valueClass="text-lg font-semibold text-green-600"
            />
            <DetailRow
              label="User"
              value={selectedWithdrawal.user?.full_name || 'N/A'}
            />
            <DetailRow
              label="Email"
              value={selectedWithdrawal.user?.email || 'N/A'}
            />
            <DetailRow
              label="Phone"
              value={selectedWithdrawal.user?.phone || 'N/A'}
            />
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Bank Details</h4>
              <DetailRow
                label="Account Name"
                value={selectedWithdrawal.account_name || 'N/A'}
              />
              <DetailRow
                label="Account Number"
                value={selectedWithdrawal.account_number || 'N/A'}
              />
              <DetailRow
                label="Bank Name"
                value={selectedWithdrawal.bank_name || 'N/A'}
              />
            </div>
            <div className="border-t pt-4">
              <DetailRow
                label="Status"
                value={
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {selectedWithdrawal.status}
                  </span>
                }
              />
              <DetailRow
                label="Created At"
                value={formatDate(selectedWithdrawal.created_at)}
              />
              {selectedWithdrawal.description && (
                <DetailRow
                  label="Description"
                  value={selectedWithdrawal.description}
                />
              )}
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => setShowDetailsModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Close
            </button>
            <button
              onClick={() => {
                setShowDetailsModal(false);
                setShowCompleteModal(true);
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700"
            >
              Mark as Completed
            </button>
            <button
              onClick={() => {
                setShowDetailsModal(false);
                setShowFailModal(true);
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
            >
              Mark as Failed
            </button>
          </div>
        </Modal>
      )}

      {/* Complete Modal */}
      {showCompleteModal && selectedWithdrawal && (
        <Modal
          title="Complete Withdrawal"
          onClose={() => {
            setShowCompleteModal(false);
            setSelectedWithdrawal(null);
            setNotes('');
          }}
        >
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    Confirm Completion
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>
                      You are about to mark this withdrawal as completed. Make sure you have
                      successfully transferred{' '}
                      <span className="font-semibold">
                        {formatCurrency(selectedWithdrawal.amount)}
                      </span>{' '}
                      to the user's bank account.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Add any notes about this transaction..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="border-t pt-4">
              <DetailRow label="Reference" value={selectedWithdrawal.reference} />
              <DetailRow
                label="Amount"
                value={formatCurrency(selectedWithdrawal.amount)}
              />
              <DetailRow
                label="Account"
                value={`${selectedWithdrawal.account_number} - ${selectedWithdrawal.bank_name}`}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => {
                setShowCompleteModal(false);
                setNotes('');
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              disabled={completeMutation.isPending}
            >
              Cancel
            </button>
            <button
              onClick={handleComplete}
              disabled={completeMutation.isPending}
              className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {completeMutation.isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Confirm Completion
                </>
              )}
            </button>
          </div>
        </Modal>
      )}

      {/* Fail Modal */}
      {showFailModal && selectedWithdrawal && (
        <Modal
          title="Fail Withdrawal"
          onClose={() => {
            setShowFailModal(false);
            setSelectedWithdrawal(null);
            setFailReason('');
          }}
        >
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <XCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Confirm Failure & Refund
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>
                      This withdrawal will be marked as failed and{' '}
                      <span className="font-semibold">
                        {formatCurrency(selectedWithdrawal.amount)}
                      </span>{' '}
                      will be automatically refunded to the user's wallet.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Failure Reason <span className="text-red-500">*</span>
              </label>
              <textarea
                value={failReason}
                onChange={(e) => setFailReason(e.target.value)}
                rows={3}
                placeholder="Explain why this withdrawal failed..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                This reason will be visible to the user
              </p>
            </div>

            <div className="border-t pt-4">
              <DetailRow label="Reference" value={selectedWithdrawal.reference} />
              <DetailRow
                label="Amount to Refund"
                value={formatCurrency(selectedWithdrawal.amount)}
                valueClass="font-semibold text-red-600"
              />
              <DetailRow
                label="User"
                value={selectedWithdrawal.user?.full_name || 'N/A'}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => {
                setShowFailModal(false);
                setFailReason('');
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              disabled={failMutation.isPending}
            >
              Cancel
            </button>
            <button
              onClick={handleFail}
              disabled={!failReason.trim() || failMutation.isPending}
              className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {failMutation.isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4" />
                  Confirm Failure & Refund
                </>
              )}
            </button>
          </div>
        </Modal>
      )}
    </div>
    </AdminLayout>
  );
};

// Reusable Components
interface StatCardProps {
  title: string;
  value: number;
  subtitle?: string;
  icon: React.ElementType;
  color: string;
  loading?: boolean;
}

const StatCard = ({ title, value, subtitle, icon: Icon, color, loading }: StatCardProps) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg s p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg s p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {value.toLocaleString()}
          </p>
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>
        <div className={`${color} p-3 rounded-lg`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
};

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ title, children, onClose }: ModalProps) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XCircle className="h-6 w-6" />
            </button>
          </div>
          <div className="px-6 py-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

interface DetailRowProps {
  label: string;
  value: React.ReactNode;
  valueClass?: string;
}

const DetailRow = ({ label, value, valueClass = '' }: DetailRowProps) => {
  return (
    <div className="flex justify-between py-2">
      <span className="text-sm text-gray-500">{label}:</span>
      <span className={`text-sm font-medium text-gray-900 ${valueClass}`}>
        {value}
      </span>
    </div>
  );
};

export default AdminWithdrawals;