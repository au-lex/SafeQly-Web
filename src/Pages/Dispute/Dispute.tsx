import { useState, useMemo } from 'react';
import { 
  Search, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 

  ArrowUpRight,
  ArrowDownLeft,
  Loader2,
  X,
  ShieldAlert,
  FileText,
  ExternalLink,
  Package,
  DollarSign,
  Calendar,
  AlertTriangle,
  Eye
} from 'lucide-react';
import Layout from '../../Layout/Layout';
import { useGetMyDisputes } from '../../Hooks/useDispute';
import { useGetUserProfile } from '../../Hooks/useProfile';
import type { Dispute } from '../../Hooks/useDispute';

// --- Internal Modal Component ---
interface DisputeDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  dispute: Dispute | null;
}

const DisputeDetailsModal = ({ isOpen, onClose, dispute }: DisputeDetailsModalProps) => {
  if (!isOpen || !dispute) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const getReasonLabel = (reason: string) => {
    return reason.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-50 text-red-700 border-red-200';
      case 'in_progress': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'resolved': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-600" />
              Dispute Details
            </h2>
            <p className="text-sm text-gray-500">ID: DSP-{dispute.id} • Ref: ESC-{dispute.escrow_id}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-white border border-gray-200 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-8">

          {/* Status Banner */}
          <div className={`flex items-start gap-3 p-4 rounded-xl border ${getStatusColor(dispute.status)}`}>
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wide mb-1">Status: {dispute.status.replace('_', ' ')}</h3>
              <p className="text-sm opacity-90">
                Created on {formatDate(dispute.created_at)}
              </p>
            </div>
          </div>

          {/* The Issue Section */}
          <section>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
              Dispute Information
            </h3>
            
            <div className="grid gap-6">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Reason</label>
                <p className="font-medium text-gray-900 mt-1">{getReasonLabel(dispute.reason)}</p>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Description</label>
                <div className="mt-2 p-4 bg-gray-50 rounded-lg text-sm text-gray-700 leading-relaxed whitespace-pre-wrap border border-gray-100">
                  {dispute.description}
                </div>
              </div>

              {/* Evidence */}
              {dispute.evidence && (
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-2 mb-2">
                    <FileText className="w-3.5 h-3.5" /> Provided Evidence
                  </label>
                  <a 
                    href={dispute.evidence} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative block w-full sm:w-64 aspect-video rounded-lg overflow-hidden border border-gray-200 bg-gray-100"
                  >
                    <img 
                      src={dispute.evidence} 
                      alt="Dispute Evidence" 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <ExternalLink className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 drop-shadow-md transition-opacity" />
                    </div>
                  </a>
                  <p className="text-xs text-gray-400 mt-1 truncate">{dispute.evidence_file_name}</p>
                </div>
              )}
            </div>
          </section>

          {/* Related Transaction Section */}
          <section>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
              Transaction Context
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <Package className="w-4 h-4" />
                  <span className="text-xs font-medium uppercase">Item(s)</span>
                </div>
                <p className="font-medium text-gray-900 truncate">{dispute.escrow.items}</p>
              </div>

              <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-xs font-medium uppercase">Amount</span>
                </div>
                <p className="font-medium text-gray-900">₦{dispute.escrow.amount.toLocaleString()}</p>
              </div>

              <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs font-medium uppercase">Delivery Date</span>
                </div>
                <p className="font-medium text-gray-900">{formatDate(dispute.escrow.delivery_date)}</p>
              </div>
            </div>
          </section>

          {/* Parties Section */}
          <section>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
              Involved Parties
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
               {/* Raised By */}
               <div className="flex-1 flex items-center gap-3 p-3 rounded-lg border border-orange-100 bg-orange-50/30">
                  <img src={dispute.user.avatar} alt="Raised By" className="w-10 h-10 rounded-full object-cover border border-orange-200" />
                  <div>
                    <p className="text-xs font-bold text-orange-700 uppercase mb-0.5">Raised By</p>
                    <p className="text-sm font-semibold text-gray-900">{dispute.user.full_name}</p>
                    <p className="text-xs text-gray-500">@{dispute.user.user_tag}</p>
                  </div>
               </div>
               
               {/* Logic: If Raised By Buyer, show Seller. If Raised By Seller, show Buyer */}
               {(() => {
                 const isRaiserBuyer = dispute.raised_by === dispute.escrow.buyer_id;
                 const target = isRaiserBuyer ? dispute.escrow.seller : dispute.escrow.buyer;
                 const label = isRaiserBuyer ? 'Seller (Defendant)' : 'Buyer (Defendant)';
                 
                 return (
                   <div className="flex-1 flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-white">
                      <img src={target.avatar} alt="Target" className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase mb-0.5">{label}</p>
                        <p className="text-sm font-semibold text-gray-900">{target.full_name}</p>
                        <p className="text-xs text-gray-500">@{target.user_tag}</p>
                      </div>
                   </div>
                 );
               })()}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};


// --- Main Page Component ---
const DisputeListPage = () => {
  const [filter, setFilter] = useState<'all' | 'active' | 'resolved'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal State
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch disputes and current user
  const { data: disputesData, isLoading } = useGetMyDisputes();
  const { data: currentUser } = useGetUserProfile();

  // --- Modal Handlers ---
  const handleViewDetails = (dispute: Dispute) => {
    setSelectedDispute(dispute);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDispute(null);
  };

  // --- Filtering Logic ---
  const filteredDisputes = useMemo(() => {
    if (!disputesData?.disputes) return [];

    return disputesData.disputes.filter((dispute: Dispute) => {
      const matchesSearch = 
        dispute.id.toString().includes(searchTerm.toLowerCase()) ||
        dispute.escrow_id.toString().includes(searchTerm.toLowerCase()) ||
        dispute.escrow?.buyer?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dispute.escrow?.seller?.full_name?.toLowerCase().includes(searchTerm.toLowerCase());

      if (filter === 'active') {
        return matchesSearch && (dispute.status === 'open' || dispute.status === 'in_progress');
      }
      if (filter === 'resolved') {
        return matchesSearch && (dispute.status === 'resolved' || dispute.status === 'closed');
      }
      return matchesSearch;
    });
  }, [disputesData?.disputes, filter, searchTerm]);

  // --- Calculate Stats ---
  const stats = useMemo(() => {
    if (!disputesData?.disputes) return { active: 0, totalAmount: 0, resolved: 0 };

    const active = disputesData.disputes.filter(
      (d: Dispute) => d.status === 'open' || d.status === 'in_progress'
    ).length;

    const totalAmount = disputesData.disputes
      .filter((d: Dispute) => d.status === 'open' || d.status === 'in_progress')
      .reduce((sum: number, d: Dispute) => sum + (d.escrow?.amount || 0), 0);

    const resolved = disputesData.disputes.filter(
      (d: Dispute) => d.status === 'resolved' || d.status === 'closed'
    ).length;

    return { active, totalAmount, resolved };
  }, [disputesData?.disputes]);

  // --- Helpers ---
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-700 border-red-200';
      case 'in_progress': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'resolved': return 'bg-green-100 text-green-700 border-green-200';
      case 'closed': return 'bg-gray-100 text-gray-600 border-gray-200';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'Open';
      case 'in_progress': return 'In Progress';
      case 'resolved': return 'Resolved';
      case 'closed': return 'Closed';
      default: return status;
    }
  };

  const getReasonText = (reason: string) => {
    return reason.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const getUserRole = (dispute: Dispute): 'buyer' | 'seller' => {
    return dispute.escrow?.buyer_id === currentUser?.id ? 'buyer' : 'seller';
  };

  const getCounterparty = (dispute: Dispute) => {
    const role = getUserRole(dispute);
    return role === 'buyer' 
      ? dispute.escrow?.seller?.full_name || 'Unknown Seller'
      : dispute.escrow?.buyer?.full_name || 'Unknown Buyer';
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
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
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
            <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition">
              Read Dispute Rules
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Disputes</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : stats.active}
                </p>
              </div>
              <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-600">
                <AlertCircle className="w-5 h-5" />
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Disputed</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    `₦${stats.totalAmount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}`
                  )}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                <Clock className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Resolved (Lifetime)</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : stats.resolved}
                </p>
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
                    ${filter === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}
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
          <div className="bg-white border border-gray-200 rounded-b-xl overflow-hidden shadow-sm">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : (
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
                    {filteredDisputes.map((dispute: Dispute) => {
                      const role = getUserRole(dispute);
                      const counterparty = getCounterparty(dispute);
                      
                      return (
                        <tr 
                          key={dispute.id} 
                          onClick={() => handleViewDetails(dispute)}
                          className="group hover:bg-blue-50/30 transition-colors cursor-pointer"
                        >
                          {/* Details Column */}
                          <td className="px-6 py-4">
                            <div className="block">
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${role === 'buyer' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                                  {role === 'buyer' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                                </div>
                                <div>
                                  <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                    DSP-{dispute.id}
                                  </span>
                                  <span className="text-gray-400 mx-2 text-xs">•</span>
                                  <span className="text-xs text-gray-500 font-mono">ESC-{dispute.escrow_id}</span>
                                  <p className="text-sm text-gray-600 mt-0.5 max-w-xs truncate">
                                    {getReasonText(dispute.reason)}
                                  </p>
                                  <p className="text-xs text-gray-400 mt-1">vs {counterparty}</p>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Amount Column */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-bold text-gray-900">
                              ₦{dispute.escrow?.amount?.toLocaleString('en-NG', { minimumFractionDigits: 2 }) || '0.00'}
                            </span>
                          </td>

                          {/* Status Column */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(dispute.status)}`}>
                              {dispute.status === 'open' && <AlertCircle className="w-3 h-3 mr-1.5" />}
                              {getStatusText(dispute.status)}
                            </span>
                          </td>

                          {/* Last Update Column */}
                          <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="w-3.5 h-3.5 mr-1.5" />
                              {formatDate(dispute.updated_at)}
                            </div>
                          </td>

                          {/* Action Arrow */}
                          <td className="px-6 py-4 text-right">
                             <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewDetails(dispute);
                                }}
                                className="text-gray-400 hover:text-blue-600 transition-colors p-2 hover:bg-white rounded-full"
                              >
                                <Eye className="w-5 h-5" />
                              </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
            
            {/* Empty State */}
            {!isLoading && filteredDisputes.length === 0 && (
              <div className="text-center py-16">
                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No disputes found</h3>
                <p className="text-gray-500 mt-1">
                  {searchTerm ? 'Try adjusting your search or filters.' : 'You have no disputes at the moment.'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Rendered Here */}
        <DisputeDetailsModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          dispute={selectedDispute} 
        />
      </div>
    </Layout>
  );
};

export default DisputeListPage;