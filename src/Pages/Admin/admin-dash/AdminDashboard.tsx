import React from 'react';
import { 
  Users,  AlertCircle, TrendingUp, 
  ArrowUpRight, ArrowDownRight, Calendar, Loader2,
  ShieldCheck, FileText
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import AdminLayout from '../../../Layout/adminLayout';
import { useGetDashboardStats, useGetAllTransactions } from '../../../Hooks/useAdmin'; 

const AdminDashboard: React.FC = () => {
  // Fetch dashboard stats
  const { data: statsData, isLoading: statsLoading, isError: statsError } = useGetDashboardStats();
  
  // Fetch recent transactions (first page, limit 5)
  const { data: transactionsData, isLoading: transactionsLoading } = useGetAllTransactions(1, 5);

  // Mock revenue data for chart (you can replace with real data if available)
  const revenueData = [
    { name: 'Jan', revenue: 65000 },
    { name: 'Feb', revenue: 45000 },
    { name: 'Mar', revenue: 75000 },
    { name: 'Apr', revenue: 55000 },
    { name: 'May', revenue: 85000 },
    { name: 'Jun', revenue: 95000 },
    { name: 'Jul', revenue: 70000 },
    { name: 'Aug', revenue: 60000 },
    { name: 'Sep', revenue: 50000 },
    { name: 'Oct', revenue: 65000 },
    { name: 'Nov', revenue: 80000 },
    { name: 'Dec', revenue: 75000 },
  ];

  // Calculate growth rates
  const calculateGrowth = (current: number, total: number) => {
    if (total === 0) return '0%';
    return `${((current / total) * 100).toFixed(1)}%`;
  };

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
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get transaction status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Loading state
  if (statsLoading) {
    return (
      <AdminLayout>
        <div className="bg-gray-50 min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // Error state
  if (statsError) {
    return (
      <AdminLayout>
        <div className="bg-gray-50 min-h-screen flex items-center justify-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <h3 className="text-red-800 font-semibold mb-2">Error Loading Dashboard</h3>
            <p className="text-red-600 text-sm">Failed to load dashboard statistics</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const stats = statsData?.stats;

  return (
    <AdminLayout>   
      <div className="space-y-6 bg-gray-50 min-h-screen">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-500 text-sm mt-1">Welcome back, here is what's happening today.</p>
          </div>
          <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
            <Calendar size={16} />
            <span>Last 30 Days</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Users" 
            value={stats?.total_users.toLocaleString() || '0'} 
            trend={`${stats?.active_users || 0} Active`}
            trendUp={true} 
            icon={<Users size={24} className="text-white" />} 
            color="bg-indigo-600"
          />
          <StatCard 
            title="Active Escrows" 
            value={stats?.active_escrows.toLocaleString() || '0'} 
            trend={`${calculateGrowth(stats?.active_escrows || 0, stats?.total_escrows || 1)} of Total`}
            trendUp={true} 
            icon={<ShieldCheck size={24} className="text-white" />} 
            color="bg-blue-500"
          />
          <StatCard 
            title="Pending Disputes" 
            value={stats?.pending_disputes.toString() || '0'} 
            trend={stats?.pending_disputes ? "Requires Action" : "All Clear"}
            trendUp={false}
            isWarning={!!stats?.pending_disputes}
            icon={<AlertCircle size={24} className="text-white" />} 
            color="bg-orange-500"
          />
          <StatCard 
            title="Total Transactions" 
            value={stats?.total_transactions.toLocaleString() || '0'} 
            trend={`${stats?.completed_escrows || 0} Completed`}
            trendUp={true} 
            icon={<FileText size={24} className="text-white" />} 
            color="bg-emerald-500"
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Completed Escrows</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-2">
                  {stats?.completed_escrows.toLocaleString() || '0'}
                </h3>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="text-green-600" size={24} />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              {calculateGrowth(stats?.completed_escrows || 0, stats?.total_escrows || 1)} success rate
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Suspended Users</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-2">
                  {stats?.suspended_users.toLocaleString() || '0'}
                </h3>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertCircle className="text-red-600" size={24} />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              {calculateGrowth(stats?.suspended_users || 0, stats?.total_users || 1)} of total users
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Resolved Disputes</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-2">
                  {stats?.resolved_disputes.toLocaleString() || '0'}
                </h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <ShieldCheck className="text-blue-600" size={24} />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              {stats?.total_disputes || 0} total disputes filed
            </p>
          </div>
        </div>

        {/* Main Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Chart & Transactions */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Revenue Chart */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-900">Platform Activity</h3>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-2 h-2 rounded-full bg-indigo-600"></div>Activity
                  </div>
                </div>
              </div>
              
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#9CA3AF', fontSize: 12 }} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#9CA3AF', fontSize: 12 }}
                      tickFormatter={(value) => `${value/1000}k`} 
                    />
                    <Tooltip 
                      cursor={{ fill: '#F3F4F6' }}
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', boxf: 'none' }}
                      itemStyle={{ color: '#111827', fontWeight: 600 }}
                      formatter={(value: number) => [value.toLocaleString(), 'Activity']}
                    />
                    <Bar 
                      dataKey="revenue" 
                      fill="#053014" 
                      radius={[4, 4, 0, 0]} 
                      barSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Transactions Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-bold text-gray-900">Recent Transactions</h3>
                <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                  View All
                </button>
              </div>
              
              {transactionsLoading ? (
                <div className="p-8 flex justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
                      <tr>
                        <th className="px-6 py-3 font-medium">Reference</th>
                        <th className="px-6 py-3 font-medium">Type</th>
                        <th className="px-6 py-3 font-medium">Date</th>
                        <th className="px-6 py-3 font-medium">Amount</th>
                        <th className="px-6 py-3 font-medium text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {transactionsData?.transactions && transactionsData.transactions.length > 0 ? (
                        transactionsData.transactions.map((trx) => (
                          <tr key={trx.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-gray-500 font-mono text-xs">
                              {trx.reference.slice(0, 16)}...
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                                {trx.type}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-gray-500">
                              {formatDate(trx.created_at)}
                            </td>
                            <td className="px-6 py-4 text-gray-900 font-medium">
                              {formatCurrency(trx.amount)}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(trx.status)}`}>
                                {trx.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                            No transactions yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Quick Actions & Stats */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-lg mb-1">Quick Actions</h3>
              <p className="text-sm text-gray-500 mb-6">Shortcuts to manage your platform.</p>
              <div className="space-y-3">
                <button className="w-full bg-pri hover:bg-indigo-700 py-2.5 text-white rounded-lg text-sm font-medium transition flex items-center justify-center gap-2">
                  <AlertCircle size={16} />
                  Resolve Disputes
                </button>
                <button className="w-full bg-white border-pri border text-pri py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-50 transition flex items-center justify-center gap-2">
                  <Users size={16} />
                  Manage Users
                </button>
              </div>
            </div>

            {/* System Stats */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-6">System Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Escrows</span>
                  <span className="text-sm font-bold text-gray-900">
                    {stats?.total_escrows.toLocaleString() || '0'}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full" 
                    style={{ 
                      width: `${((stats?.completed_escrows || 0) / (stats?.total_escrows || 1)) * 100}%` 
                    }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm text-gray-600">Active Users</span>
                  <span className="text-sm font-bold text-gray-900">
                    {stats?.active_users.toLocaleString() || '0'}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ 
                      width: `${((stats?.active_users || 0) / (stats?.total_users || 1)) * 100}%` 
                    }}
                  ></div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm text-gray-600">Dispute Resolution Rate</span>
                  <span className="text-sm font-bold text-gray-900">
                    {calculateGrowth(stats?.resolved_disputes || 0, stats?.total_disputes || 1)}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ 
                      width: `${((stats?.resolved_disputes || 0) / (stats?.total_disputes || 1)) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

// --- Sub Component: Stat Card ---
interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  isWarning?: boolean;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, trendUp, isWarning, icon, color }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-2">{value}</h3>
        <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${isWarning ? 'text-orange-600' : trendUp ? 'text-green-600' : 'text-red-600'}`}>
          {isWarning ? (
            <AlertCircle size={14} /> 
          ) : trendUp ? (
            <ArrowUpRight size={14} />
          ) : (
            <ArrowDownRight size={14} />
          )}
          <span>{trend}</span>
        </div>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        {icon}
      </div>
    </div>
  );
};

export default AdminDashboard;