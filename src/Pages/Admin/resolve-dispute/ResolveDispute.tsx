import { useState } from 'react';

import { 
  Search, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
 
  ArrowUpRight,
  ArrowDownLeft,
  X,
  FileText,
  User,

  Package,

  Eye,
} from 'lucide-react';
import AdminLayout from '../../../Layout/adminLayout';
import { useGetAllDisputes, useResolveDispute, type Dispute } from '../../../Hooks/useAdmin';
import toast from 'react-hot-toast';



const DisputeListPage = () => {
  const [filter, setFilter] = useState<'all' | 'active' | 'resolved'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resolution, setResolution] = useState('');
  const [winner, setWinner] = useState<'buyer' | 'seller'>('buyer');

  // Fetch disputes
  const { data: disputesData, isLoading, refetch } = useGetAllDisputes(1, 100);
  const resolveDisputeMutation = useResolveDispute();

  // Filtering Logic
  const filteredDisputes = disputesData?.disputes?.filter(dispute => {
    const matchesSearch = 
      dispute.id.toString().includes(searchTerm) ||
      dispute.escrow_id.toString().includes(searchTerm) ||
      dispute.reason.toLowerCase().includes(searchTerm.toLowerCase());

    if (filter === 'active') return matchesSearch && dispute.status !== 'resolved';
    if (filter === 'resolved') return matchesSearch && dispute.status === 'resolved';
    return matchesSearch;
  }) || [];

  // Calculate stats
  const activeDisputes = disputesData?.disputes?.filter(d => d.status !== 'resolved').length || 0;
  const resolvedDisputes = disputesData?.disputes?.filter(d => d.status === 'resolved').length || 0;
  const totalDisputed = disputesData?.disputes?.reduce((sum, d) => sum + d.escrow.amount, 0) || 0;

  // Helper: Status Colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-50 text-red-700 border-red-200';
      case 'in_review': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'resolved': return 'bg-green-50 text-green-700 border-green-200';
      case 'rejected': return 'bg-gray-100 text-gray-600 border-gray-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const formatStatus = (status: string) => {
    switch (status) {
      case 'open': return 'Action Required';
      case 'in_review': return 'Under Review';
      case 'resolved': return 'Resolved';
      case 'rejected': return 'Rejected';
      default: return status;
    }
  };

  const formatReason = (reason: string) => {
    return reason.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleViewDetails = (dispute: Dispute) => {
    setSelectedDispute(dispute);
    setIsModalOpen(true);
  };

  const handleResolveDispute = async () => {
    if (!selectedDispute || !resolution.trim()) {
      toast.error('Please provide a resolution');
      return;
    }

    try {
      await resolveDisputeMutation.mutateAsync({
        disputeId: selectedDispute.id.toString(),
        data: { resolution, winner }
      });
      setIsModalOpen(false);
      setResolution('');
      refetch();
    } catch (error) {
console.log(error);

    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dispute Center</h1>
              <p className="text-sm text-gray-500 mt-1">Manage and resolve transaction issues</p>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Disputes</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{activeDisputes}</p>
              </div>
              <div className="w-10 h-10 bg-red-50 rounded-full border border-red-100 flex items-center justify-center text-red-600">
                <AlertCircle className="w-5 h-5" />
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Disputed</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">₦{totalDisputed.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 bg-blue-50 rounded-full border border-blue-100 flex items-center justify-center text-pri">
                <Clock className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Resolved (Lifetime)</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{resolvedDisputes}</p>
              </div>
              <div className="w-10 h-10 bg-green-50 rounded-full border border-green-100 flex items-center justify-center text-green-600">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Controls & Table Container */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            
            {/* Toolbar */}
            <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* Tabs */}
              <div className="flex bg-gray-100 p-1 rounded-lg w-full sm:w-auto">
                {(['all', 'active', 'resolved'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`
                      flex-1 sm:flex-none px-4 py-1.5 rounded-md text-sm font-medium transition-all capitalize
                      ${filter === tab ? 'bg-white text-gray-900 border border-gray-200' : 'text-gray-500 hover:text-gray-700'}
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
                  placeholder="Search ID, reason..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-gray-500 mt-4">Loading disputes...</p>
                </div>
              ) : (
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
                    {filteredDisputes.map((dispute) => {
                      const isBuyer = dispute.raised_by === dispute.escrow.buyer_id;
                      return (
                        <tr 
                          key={dispute.id} 
                          className="group hover:bg-gray-50 transition-colors"
                        >
                          {/* Details Column */}
                          <td className="px-6 py-4">
                            <div className="flex items-start gap-3">
                              <div className={`mt-1 p-2 rounded-lg border ${isBuyer ? 'bg-blue-50 border-blue-100 text-pri' : 'bg-purple-50 border-purple-100 text-purple-600'}`}>
                                {isBuyer ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-semibold text-gray-900">
                                    DSP-{dispute.id}
                                  </span>
                                  <span className="text-xs text-gray-400 font-mono px-1.5 py-0.5 bg-gray-100 rounded border border-gray-200">
                                    ESC-{dispute.escrow_id}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1 font-medium">
                                  {formatReason(dispute.reason)}
                                </p>
                                <p className="text-xs text-gray-400 mt-0.5">
                                  Raised by: {isBuyer ? dispute.escrow.buyer.full_name : dispute.escrow.seller.full_name}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Amount */}
                          <td className="px-6 py-4 whitespace-nowrap align-top pt-5">
                            <span className="text-sm font-bold text-gray-900">
                              ₦{dispute.escrow.amount.toLocaleString()}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="px-6 py-4 whitespace-nowrap align-top pt-5">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(dispute.status)}`}>
                              {dispute.status === 'open' && <AlertCircle className="w-3 h-3 mr-1.5" />}
                              {formatStatus(dispute.status)}
                            </span>
                          </td>

                          {/* Last Update */}
                          <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell align-top pt-5">
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                              {formatDate(dispute.updated_at)}
                            </div>
                          </td>

                          {/* Action Button */}
                          <td className="px-6 py-4 text-right align-middle">
                            <button 
                              onClick={() => handleViewDetails(dispute)}
                              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-pri hover:bg-blue-50 border border-blue-200 rounded-lg transition-all"
                            >
                              <Eye className="w-4 h-4" />
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}

              {/* Empty State */}
              {!isLoading && filteredDisputes.length === 0 && (
                <div className="text-center py-12">
                  <div className="bg-gray-50 border border-gray-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">No disputes found</h3>
                  <p className="text-gray-500 mt-1">Try adjusting your filters or search terms.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dispute Details Modal */}
      {isModalOpen && selectedDispute && (
        <div className="fixed inset-0 bg-black/5  backdrop-blur-[4px] flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Dispute Details</h2>
                <p className="text-sm text-gray-500">DSP-{selectedDispute.id} • Escrow #{selectedDispute.escrow_id}</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Status Banner */}
              <div className={`p-4 rounded-lg border ${getStatusColor(selectedDispute.status)}`}>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-semibold">Status: {formatStatus(selectedDispute.status)}</span>
                </div>
              </div>

              {/* Escrow Details */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Escrow Details
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Items</p>
                    <p className="font-medium text-gray-900">{selectedDispute.escrow.items}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Amount</p>
                    <p className="font-medium text-gray-900">₦{selectedDispute.escrow.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Delivery Date</p>
                    <p className="font-medium text-gray-900">{new Date(selectedDispute.escrow.delivery_date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Escrow Status</p>
                    <p className="font-medium text-gray-900">{selectedDispute.escrow.status}</p>
                  </div>
                </div>
              </div>

              {/* Parties Involved */}
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-3">
                    <User className="w-4 h-4" />
                    Buyer
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-500">Name:</span> <span className="font-medium">{selectedDispute.escrow.buyer.full_name}</span></p>
                    <p><span className="text-gray-500">Email:</span> <span className="font-medium">{selectedDispute.escrow.buyer.email}</span></p>
                    <p><span className="text-gray-500">Phone:</span> <span className="font-medium">{selectedDispute.escrow.buyer.phone}</span></p>
                    <p><span className="text-gray-500">Tag:</span> <span className="font-medium">@{selectedDispute.escrow.buyer.user_tag}</span></p>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-3">
                    <User className="w-4 h-4" />
                    Seller
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-500">Name:</span> <span className="font-medium">{selectedDispute.escrow.seller.full_name}</span></p>
                    <p><span className="text-gray-500">Email:</span> <span className="font-medium">{selectedDispute.escrow.seller.email}</span></p>
                    <p><span className="text-gray-500">Phone:</span> <span className="font-medium">{selectedDispute.escrow.seller.phone}</span></p>
                    <p><span className="text-gray-500">Tag:</span> <span className="font-medium">@{selectedDispute.escrow.seller.user_tag}</span></p>
                  </div>
                </div>
              </div>

              {/* Dispute Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Dispute Information
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Reason</p>
                    <p className="font-medium text-gray-900">{formatReason(selectedDispute.reason)}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Description</p>
                    <p className="text-gray-900 leading-relaxed">{selectedDispute.description}</p>
                  </div>

                  {selectedDispute.evidence && (
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Evidence</p>
                      <a 
                        href={selectedDispute.evidence} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-pri hover:text-blue-700 text-sm"
                      >
                        <FileText className="w-4 h-4" />
                        {selectedDispute.evidence_file_name}
                      </a>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <p className="text-sm text-gray-500">Raised By</p>
                      <p className="font-medium text-gray-900">
                        {selectedDispute.raised_by === selectedDispute.escrow.buyer_id 
                          ? selectedDispute.escrow.buyer.full_name 
                          : selectedDispute.escrow.seller.full_name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Created</p>
                      <p className="font-medium text-gray-900">{formatDate(selectedDispute.created_at)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resolution Section (only if not resolved) */}
              {selectedDispute.status !== 'resolved' && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Resolve Dispute</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Winner
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="radio" 
                            name="winner" 
                            value="buyer"
                            checked={winner === 'buyer'}
                            onChange={(e) => setWinner(e.target.value as 'buyer' | 'seller')}
                            className="w-4 h-4 text-pri"
                          />
                          <span className="text-sm">Buyer</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="radio" 
                            name="winner" 
                            value="seller"
                            checked={winner === 'seller'}
                            onChange={(e) => setWinner(e.target.value as 'buyer' | 'seller')}
                            className="w-4 h-4 text-pri"
                          />
                          <span className="text-sm">Seller</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Resolution Details
                      </label>
                      <textarea 
                        value={resolution}
                        onChange={(e) => setResolution(e.target.value)}
                        placeholder="Provide detailed resolution and reasoning..."
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      />
                    </div>

                    <div className="flex gap-3 justify-end">
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleResolveDispute}
                        disabled={resolveDisputeMutation.isPending}
                        className="px-4 py-2 bg-pri text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {resolveDisputeMutation.isPending ? 'Resolving...' : 'Resolve Dispute'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Resolution Info (if already resolved) */}
              {selectedDispute.status === 'resolved' && selectedDispute.resolution && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Resolution</h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm text-pri">{selectedDispute.resolution}</p>
                    {selectedDispute.winner && (
                      <p className="text-sm text-green-700 mt-2">
                        <span className="font-semibold">Winner:</span> {selectedDispute.winner}
                      </p>
                    )}
                    {selectedDispute.resolved_at && (
                      <p className="text-xs text-green-600 mt-2">
                        Resolved {formatDate(selectedDispute.resolved_at)}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default DisputeListPage;