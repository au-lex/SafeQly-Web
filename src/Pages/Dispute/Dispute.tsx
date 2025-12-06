import  { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 

  AlertCircle, 
  CheckCircle2, 
  Clock, 

  ChevronRight,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react';
import Layout from '../../Layout/Layout';

// --- Types ---
type DisputeStatus = 'Action Required' | 'In Negotiation' | 'Under Review' | 'Resolved';

interface DisputeSummary {
  id: string;
  transactionId: string;
  title: string;
  counterparty: string;
  amount: string;
  status: DisputeStatus;
  lastUpdate: string;
  isUserTurn: boolean; // Vital for "Action Required" logic
  role: 'buyer' | 'seller';
}

// --- Mock Data ---
const disputesData: DisputeSummary[] = [
  {
    id: 'DSP-882',
    transactionId: 'TX-9921',
    title: 'Product not as described - Mobile App',
    counterparty: 'TechSolutions Inc.',
    amount: '$4,500.00',
    status: 'Action Required',
    lastUpdate: '2 hours ago',
    isUserTurn: true,
    role: 'buyer'
  },
  {
    id: 'DSP-845',
    transactionId: 'TX-3320',
    title: 'Non-delivery of physical goods',
    counterparty: 'Global Logistics Ltd',
    amount: '$1,200.00',
    status: 'In Negotiation',
    lastUpdate: '1 day ago',
    isUserTurn: false,
    role: 'buyer'
  },
  {
    id: 'DSP-721',
    transactionId: 'TX-1102',
    title: 'Client refused milestone approval',
    counterparty: 'Creative Agency',
    amount: '$850.00',
    status: 'Under Review', // Escalated to admin
    lastUpdate: '3 days ago',
    isUserTurn: false,
    role: 'seller'
  },
  {
    id: 'DSP-655',
    transactionId: 'TX-0092',
    title: 'Refund request processed',
    counterparty: 'John Doe Designs',
    amount: '$300.00',
    status: 'Resolved',
    lastUpdate: 'Oct 12, 2024',
    isUserTurn: false,
    role: 'seller'
  }
];

const DisputeListPage = () => {
  const [filter, setFilter] = useState<'all' | 'active' | 'resolved'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // --- Filtering Logic ---
  const filteredDisputes = disputesData.filter(dispute => {
    const matchesSearch = 
      dispute.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.counterparty.toLowerCase().includes(searchTerm.toLowerCase());

    if (filter === 'active') return matchesSearch && dispute.status !== 'Resolved';
    if (filter === 'resolved') return matchesSearch && dispute.status === 'Resolved';
    return matchesSearch;
  });

  // --- Helpers ---
  const getStatusColor = (status: DisputeStatus) => {
    switch (status) {
      case 'Action Required': return 'bg-red-100 text-red-700 border-red-200';
      case 'In Negotiation': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Under Review': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Resolved': return 'bg-gray-100 text-gray-600 border-gray-200';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <Layout>

  
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header & Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dispute Center</h1>
            <p className="text-sm text-gray-500 mt-1">Manage and resolve transaction issues</p>
          </div>
          <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition s">
            Read Dispute Rules
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-gray-200 s flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Disputes</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">3</p>
            </div>
            <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-600">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-xl border border-gray-200 s flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Disputed</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">$6,550.00</p>
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 s flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Resolved (Lifetime)</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
            </div>
            <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-t-xl border border-gray-200 border-b-0 flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Tabs */}
          <div className="flex bg-gray-100 p-1 rounded-lg w-full sm:w-auto">
            {(['all', 'active', 'resolved'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`
                  flex-1 sm:flex-none px-4 py-1.5 rounded-md text-sm font-medium transition-all capitalize
                  ${filter === tab ? 'bg-white text-gray-900 s' : 'text-gray-500 hover:text-gray-700'}
                `}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by ID or Counterparty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Dispute List Table */}
        <div className="bg-white border border-gray-200 rounded-b-xl overflow-hidden s">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Dispute Details</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Last Update</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredDisputes.map((dispute) => (
                  <tr 
                    key={dispute.id} 
                    className="group hover:bg-blue-50/30 transition-colors cursor-pointer"
                  >
                    {/* Details Column */}
                    <td className="px-6 py-4">
                      {/* Navigate to the Detail Page */}
                      <Link to={`/disputes/${dispute.id}`} className="block">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${dispute.role === 'buyer' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                            {dispute.role === 'buyer' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {dispute.id}
                            </span>
                            <span className="text-gray-400 mx-2 text-xs">•</span>
                            <span className="text-xs text-gray-500 font-mono">{dispute.transactionId}</span>
                            <p className="text-sm text-gray-600 mt-0.5 max-w-xs truncate">{dispute.title}</p>
                            <p className="text-xs text-gray-400 mt-1">vs {dispute.counterparty}</p>
                          </div>
                        </div>
                      </Link>
                    </td>

                    {/* Amount Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-gray-900">{dispute.amount}</span>
                    </td>

                    {/* Status Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(dispute.status)}`}>
                        {dispute.status === 'Action Required' && <AlertCircle className="w-3 h-3 mr-1.5" />}
                        {dispute.status}
                      </span>
                    </td>

                    {/* Last Update Column */}
                    <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-3.5 h-3.5 mr-1.5" />
                        {dispute.lastUpdate}
                      </div>
                    </td>

                    {/* Action Arrow */}
                    <td className="px-6 py-4 text-right">
                      <Link to={`/disputes/${dispute.id}`}>
                        <button className="text-gray-400 hover:text-blue-600 transition-colors p-2 hover:bg-white rounded-full">
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Empty State */}
          {filteredDisputes.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No disputes found</h3>
              <p className="text-gray-500 mt-1">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default DisputeListPage;