import React, { useState } from 'react';
import { 
  Search, Filter, Download, ArrowUpRight, ArrowDownLeft, 
  MoreHorizontal, X, CreditCard, Calendar, CheckCircle, XCircle, Clock, Loader2 
} from 'lucide-react';
import AdminLayout from '../../../Layout/adminLayout';
import { useGetAllTransactions, type Transaction } from '../../../Hooks/useAdmin'; 

// --- Components ---

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    success: 'bg-green-100 text-green-800',
    completed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800',
    processing: 'bg-blue-100 text-blue-800',
  };
  
  const icons: Record<string, JSX.Element> = {
    success: <CheckCircle size={14} />,
    completed: <CheckCircle size={14} />,
    pending: <Clock size={14} />,
    failed: <XCircle size={14} />,
    processing: <Clock size={14} />,
  };
  
  const normalizedStatus = status.toLowerCase();
  
  return (
    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium w-fit ${styles[normalizedStatus] || 'bg-gray-100 text-gray-800'}`}>
      {icons[normalizedStatus] || <Clock size={14} />}
      {status}
    </span>
  );
};

const TransactionModal = ({ txn, onClose }: { txn: Transaction | null, onClose: () => void }) => {
  if (!txn) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isDebit = ['withdrawal', 'escrow_funding', 'payment'].includes(txn.type.toLowerCase());

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl f-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="text-lg font-bold text-gray-900">Transaction Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200 transition">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-1">Total Amount</div>
            <div className="text-3xl font-bold text-gray-900">
              {isDebit ? '-' : '+'}{formatCurrency(txn.amount)}
            </div>
            <div className="mt-2 inline-block">
              <StatusBadge status={txn.status} />
            </div>
          </div>

          <div className="space-y-4 border rounded-lg p-4 border-gray-100 bg-gray-50/50">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Transaction ID</span>
              <span className="text-sm font-medium text-gray-900 font-mono">#{txn.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Reference</span>
              <span className="text-sm font-medium text-gray-900 font-mono text-right break-all">
                {txn.reference.slice(0, 20)}...
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Date & Time</span>
              <span className="text-sm font-medium text-gray-900">{formatDate(txn.created_at)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Type</span>
              <span className="text-sm font-medium text-gray-900 flex items-center gap-2">
                <CreditCard size={14} /> {txn.type}
              </span>
            </div>
            {txn.User && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">User</span>
                <span className="text-sm font-medium text-gray-900">{txn.User.full_name}</span>
              </div>
            )}
            {txn.description && (
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-500">Description</span>
                <span className="text-sm font-medium text-gray-900">{txn.description}</span>
              </div>
            )}
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="flex-1 bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium text-sm hover:bg-gray-50"
            >
              Close
            </button>
            <button className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg font-medium text-sm hover:bg-indigo-700">
              Download Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
const Finance: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit] = useState(20);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');

  // Fetch transactions with pagination and filters
  const { data, isLoading, isError, error } = useGetAllTransactions(
    currentPage, 
    pageLimit, 
    statusFilter, 
    typeFilter
  );

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get transaction type icon and color
  const getTypeDisplay = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('deposit') || lowerType.includes('credit') || lowerType.includes('funding')) {
      return { icon: <ArrowDownLeft size={16} className="text-green-500" />, color: 'text-green-600' };
    } else if (lowerType.includes('withdrawal') || lowerType.includes('debit')) {
      return { icon: <ArrowUpRight size={16} className="text-red-500" />, color: 'text-red-600' };
    } else {
      return { icon: <CreditCard size={16} className="text-indigo-500" />, color: 'text-gray-900' };
    }
  };

  // Calculate stats from data
  const totalVolume = data?.transactions.reduce((sum, txn) => sum + txn.amount, 0) || 0;
  const pendingCount = data?.transactions.filter(txn => txn.status.toLowerCase() === 'pending').length || 0;
  const failedCount = data?.transactions.filter(txn => txn.status.toLowerCase() === 'failed').length || 0;
  const failedRate = data?.transactions.length ? ((failedCount / data.transactions.length) * 100).toFixed(1) : '0.0';

  // Filter logic (client-side search)
  const filteredTransactions = data?.transactions.filter(t => 
    t.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.user?.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.id.toString().includes(searchTerm)
  ) || [];

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (data && currentPage * pageLimit < data.pagination.total) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <AdminLayout>
        <div className="bg-gray-50 min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
            <p className="text-gray-600">Loading transactions...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // Error State
  if (isError) {
    return (
      <AdminLayout>
        <div className="bg-gray-50 min-h-screen flex items-center justify-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <h3 className="text-red-800 font-semibold mb-2">Error Loading Transactions</h3>
            <p className="text-red-600 text-sm">
              {(error as any)?.response?.data?.error || error?.message || 'Failed to load transactions'}
            </p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="bg-gray-50 min-h-screen">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
            <p className="text-gray-500 text-sm mt-1">
              Monitor real-time financial activity. Total: {data?.pagination.total || 0}
            </p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
              <Calendar size={16} />
              <span>Select Dates</span>
            </button>
            <button className="flex items-center gap-2 bg-pri text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm font-medium">
              <Download size={16} />
              <span className="text-white">Export CSV</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl f-sm border border-gray-200">
            <div className="text-gray-500 text-sm font-medium mb-1">Total Volume</div>
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(totalVolume)}</div>
            <div className="text-green-600 text-xs font-medium flex items-center mt-1">
              <ArrowUpRight size={12} className="mr-1" /> {data?.pagination.total || 0} transactions
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl f-sm border border-gray-200">
            <div className="text-gray-500 text-sm font-medium mb-1">Pending Transactions</div>
            <div className="text-2xl font-bold text-gray-900">{pendingCount}</div>
            <div className="text-yellow-600 text-xs font-medium flex items-center mt-1">
              {pendingCount > 0 ? 'Requires attention' : 'All clear'}
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl f-sm border border-gray-200">
            <div className="text-gray-500 text-sm font-medium mb-1">Failed Rate</div>
            <div className="text-2xl font-bold text-gray-900">{failedRate}%</div>
            <div className="text-gray-600 text-xs font-medium flex items-center mt-1">
              {failedCount} failed transactions
            </div>
          </div>
        </div>

        {/* Main Table Section */}
        <div className="bg-white rounded-xl f-sm border border-gray-200 overflow-hidden">
          
          {/* Table Toolbar */}
          <div className="p-4 border-b border-gray-200 flex gap-4 flex-wrap">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search by ID, reference, type, or user..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Status Filter */}
            <select 
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="success">Success</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>

            {/* Type Filter */}
            <select 
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="deposit">Deposit</option>
              <option value="withdrawal">Withdrawal</option>
              <option value="escrow_funding">Escrow Funding</option>
              <option value="escrow_release">Escrow Release</option>
            </select>

            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter size={18} />
              <span className="hidden sm:inline">More Filters</span>
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold uppercase">ID</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase">User</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase">Type</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase">Date</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase">Amount</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      No transactions found
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((txn) => {
                    const typeDisplay = getTypeDisplay(txn.type);
                    return (
                      <tr 
                        key={txn.id} 
                        className="hover:bg-gray-50 transition group cursor-pointer" 
                        onClick={() => setSelectedTxn(txn)}
                      >
                        <td className="px-6 py-4 text-sm font-mono text-gray-600">#{txn.id}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          <div className="flex items-center gap-2">
                            {txn.user?.avatar && (
                              <img 
                                src={txn.user.avatar} 
                                alt={txn.user.full_name} 
                                className="w-8 h-8 rounded-full object-cover"
                              />
                            )}
                            <div>
                              <div>{txn.user?.full_name || 'N/A'}</div>
                              <div className="text-xs text-gray-500">@{txn.user?.user_tag}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            {typeDisplay.icon}
                            {txn.type}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{formatDate(txn.created_at)}</td>
                        <td className={`px-6 py-4 text-sm font-medium ${typeDisplay.color}`}>
                          {formatCurrency(txn.amount)}
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={txn.status} />
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-gray-400 hover:text-indigo-600 p-1">
                            <MoreHorizontal size={20} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Footer */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
            <span>
              Showing {((currentPage - 1) * pageLimit) + 1} to{' '}
              {Math.min(currentPage * pageLimit, data?.pagination.total || 0)} of{' '}
              {data?.pagination.total || 0} entries
            </span>
            <div className="flex gap-2">
              <button 
                className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" 
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button 
                className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleNextPage}
                disabled={!data || currentPage * pageLimit >= data.pagination.total}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Detail Modal Overlay */}
        {selectedTxn && <TransactionModal txn={selectedTxn} onClose={() => setSelectedTxn(null)} />}
      </div>
    </AdminLayout>
  );
};

export default Finance;