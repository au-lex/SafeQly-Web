import React, { useState } from 'react';
import { 
  Search, Filter, Download, ArrowUpRight, ArrowDownLeft, 
  MoreHorizontal, X, CreditCard, Calendar, CheckCircle, XCircle, Clock 
} from 'lucide-react';
import AdminLayout from '../../../Layout/adminLayout';

// --- Types ---
interface Transaction {
  id: string;
  user: string;
  type: 'Deposit' | 'Withdrawal' | 'Payment';
  amount: number;
  currency: string;
  status: 'Success' | 'Pending' | 'Failed';
  date: string;
  method: string; // e.g., Visa, PayPal
}

// --- Mock Data ---
const mockTransactions: Transaction[] = [
  { id: 'TRX-9871', user: 'Alice Johnson', type: 'Payment', amount: 120.50, currency: 'USD', status: 'Success', date: '2023-10-25 14:30', method: 'Visa •••• 4242' },
  { id: 'TRX-9872', user: 'Bob Smith', type: 'Withdrawal', amount: 500.00, currency: 'USD', status: 'Pending', date: '2023-10-25 12:15', method: 'Bank Transfer' },
  { id: 'TRX-9873', user: 'Charlie Brown', type: 'Deposit', amount: 1000.00, currency: 'USD', status: 'Success', date: '2023-10-24 09:45', method: 'MasterCard •••• 8821' },
  { id: 'TRX-9874', user: 'Diana Prince', type: 'Payment', amount: 49.99, currency: 'USD', status: 'Failed', date: '2023-10-24 08:20', method: 'PayPal' },
  { id: 'TRX-9875', user: 'Evan Wright', type: 'Payment', amount: 200.00, currency: 'USD', status: 'Success', date: '2023-10-23 16:00', method: 'Visa •••• 1234' },
];

// --- Components ---

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    Success: 'bg-green-100 text-green-800',
    Pending: 'bg-yellow-100 text-yellow-800',
    Failed: 'bg-red-100 text-red-800',
  };
  const icons = {
    Success: <CheckCircle size={14} />,
    Pending: <Clock size={14} />,
    Failed: <XCircle size={14} />,
  };
  
  return (
    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium w-fit ${styles[status as keyof typeof styles]}`}>
      {icons[status as keyof typeof icons]}
      {status}
    </span>
  );
};

const TransactionModal = ({ txn, onClose }: { txn: Transaction | null, onClose: () => void }) => {
  if (!txn) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl  s-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
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
              {txn.type === 'Withdrawal' ? '-' : '+'}${txn.amount.toFixed(2)}
            </div>
            <div className="mt-2 inline-block">
              <StatusBadge status={txn.status} />
            </div>
          </div>

          <div className="space-y-4 border rounded-lg p-4 border-gray-100 bg-gray-50/50">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Transaction ID</span>
              <span className="text-sm font-medium text-gray-900 font-mono">{txn.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Date & Time</span>
              <span className="text-sm font-medium text-gray-900">{txn.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Payment Method</span>
              <span className="text-sm font-medium text-gray-900 flex items-center gap-2">
                <CreditCard size={14} /> {txn.method}
              </span>
            </div>
             <div className="flex justify-between">
              <span className="text-sm text-gray-500">Customer</span>
              <span className="text-sm font-medium text-gray-900">{txn.user}</span>
            </div>
          </div>
          
          <div className="flex gap-3">
             <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium text-sm hover:bg-gray-50">
               Download Receipt
             </button>
             {txn.status === 'Pending' && (
                <button className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg font-medium text-sm hover:bg-indigo-700">
                  Approve
                </button>
             )}
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

  // Filter Logic
  const filteredTransactions = mockTransactions.filter(t => 
    t.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>

 
    <div className=" bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-500 text-sm mt-1">Monitor real-time financial activity.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
            <Calendar size={16} />
            <span>Select Dates</span>
          </button>
          <button className="flex items-center gap-2 bg-pri text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm font-medium">
            <Download size={16} />
            <span className='text-white'>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl  s-sm border border-gray-200">
          <div className="text-gray-500 text-sm font-medium mb-1">Total Volume (30d)</div>
          <div className="text-2xl font-bold text-gray-900">$48,290.00</div>
          <div className="text-green-600 text-xs font-medium flex items-center mt-1">
            <ArrowUpRight size={12} className="mr-1" /> +12.5% from last month
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl  s-sm border border-gray-200">
          <div className="text-gray-500 text-sm font-medium mb-1">Pending Requests</div>
          <div className="text-2xl font-bold text-gray-900">14</div>
          <div className="text-yellow-600 text-xs font-medium flex items-center mt-1">
             Requires attention
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl  s-sm border border-gray-200">
          <div className="text-gray-500 text-sm font-medium mb-1">Failed Rate</div>
          <div className="text-2xl font-bold text-gray-900">1.2%</div>
          <div className="text-green-600 text-xs font-medium flex items-center mt-1">
             <ArrowDownLeft size={12} className="mr-1" /> -0.4% from last month
          </div>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-white rounded-xl  s-sm border border-gray-200 overflow-hidden">
        
        {/* Table Toolbar */}
        <div className="p-4 border-b border-gray-200 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by ID or User..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter size={18} />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase">Transaction ID</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase">User</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase">Type</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase">Date</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase">Amount</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-50 transition group cursor-pointer" onClick={() => setSelectedTxn(txn)}>
                  <td className="px-6 py-4 text-sm font-mono text-gray-600">{txn.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{txn.user}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                       {txn.type === 'Deposit' ? <ArrowDownLeft size={16} className="text-green-500" /> : 
                        txn.type === 'Withdrawal' ? <ArrowUpRight size={16} className="text-gray-500" /> :
                        <CreditCard size={16} className="text-indigo-500" />
                       }
                       {txn.type}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{txn.date}</td>
                  <td className={`px-6 py-4 text-sm font-medium ${txn.type === 'Deposit' ? 'text-green-600' : 'text-gray-900'}`}>
                    {txn.type === 'Withdrawal' ? '-' : '+'}${txn.amount.toFixed(2)}
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
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
           <span>Showing 1 to 5 of 120 entries</span>
           <div className="flex gap-2">
             <button className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
             <button className="px-3 py-1 border rounded hover:bg-gray-50">Next</button>
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