import React from 'react';
import { 
  Users, DollarSign, AlertCircle, TrendingUp, 
  ArrowUpRight, ArrowDownRight, Calendar 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import AdminLayout from '../../../Layout/adminLayout';


const revenueData = [
  { name: 'Jan', revenue: 65000, expense: 45000 },
  { name: 'Feb', revenue: 45000, expense: 38000 },
  { name: 'Mar', revenue: 75000, expense: 48000 },
  { name: 'Apr', revenue: 55000, expense: 40000 },
  { name: 'May', revenue: 85000, expense: 55000 },
  { name: 'Jun', revenue: 95000, expense: 60000 },
  { name: 'Jul', revenue: 70000, expense: 50000 },
  { name: 'Aug', revenue: 60000, expense: 45000 },
  { name: 'Sep', revenue: 50000, expense: 35000 },
  { name: 'Oct', revenue: 65000, expense: 42000 },
  { name: 'Nov', revenue: 80000, expense: 58000 },
  { name: 'Dec', revenue: 75000, expense: 52000 },
];

const transactions = [
  { id: 'TRX-9821', user: 'Sarah Jenkins', amount: '$1,240.00', status: 'Completed', date: 'Oct 24, 2023' },
  { id: 'TRX-9822', user: 'Marcus Thorne', amount: '$85.50', status: 'Pending', date: 'Oct 24, 2023' },
  { id: 'TRX-9823', user: 'Elena Rodriguez', amount: '$350.00', status: 'Completed', date: 'Oct 23, 2023' },
  { id: 'TRX-9824', user: 'David Kim', amount: '$120.00', status: 'Failed', date: 'Oct 23, 2023' },
];

const AdminDashboard: React.FC = () => {
  return (
    <AdminLayout>   
      <div className=" space-y-6 bg-gray-50 min-h-screen">
        
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
            title="Total Revenue" 
            value="$128,430" 
            trend="+12.5%" 
            trendUp={true} 
            icon={<DollarSign size={24} className="text-white" />} 
            color="bg-indigo-600"
          />
          <StatCard 
            title="Active Users" 
            value="24,592" 
            trend="+5.2%" 
            trendUp={true} 
            icon={<Users size={24} className="text-white" />} 
            color="bg-blue-500"
          />
          <StatCard 
            title="Pending Disputes" 
            value="14" 
            trend="Requires Action" 
            trendUp={false}
            isWarning={true}
            icon={<AlertCircle size={24} className="text-white" />} 
            color="bg-orange-500"
          />
          <StatCard 
            title="Growth Rate" 
            value="8.4%" 
            trend="-2.1%" 
            trendUp={false} 
            icon={<TrendingUp size={24} className="text-white" />} 
            color="bg-emerald-500"
          />
        </div>

        {/* Main Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Chart & Transactions */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Revenue Chart (Real Recharts Implementation) */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-900">Revenue Analytics</h3>
                <div className="flex gap-4">
                   <div className="flex items-center gap-2 text-xs text-gray-500">
                     <div className="w-2 h-2 rounded-full bg-indigo-600"></div>Income
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
                      tickFormatter={(value) => `$${value/1000}k`} 
                    />
                    <Tooltip 
                      cursor={{ fill: '#F3F4F6' }}
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', boxShadow: 'none' }}
                      itemStyle={{ color: '#111827', fontWeight: 600 }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                    />
                    <Bar 
                      dataKey="revenue" 
                      fill=" #053014" 
                      radius={[4, 4, 0, 0]} 
                      barSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-bold text-gray-900">Recent Transactions</h3>
                <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-3 font-medium">Transaction ID</th>
                      <th className="px-6 py-3 font-medium">User</th>
                      <th className="px-6 py-3 font-medium">Date</th>
                      <th className="px-6 py-3 font-medium">Amount</th>
                      <th className="px-6 py-3 font-medium text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {transactions.map((trx) => (
                      <tr key={trx.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-500 font-mono text-xs">{trx.id}</td>
                        <td className="px-6 py-4 font-medium text-gray-900">{trx.user}</td>
                        <td className="px-6 py-4 text-gray-500">{trx.date}</td>
                        <td className="px-6 py-4 text-gray-900 font-medium">{trx.amount}</td>
                        <td className="px-6 py-4 text-right">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${trx.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                              trx.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'}`}>
                            {trx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Activity Feed */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Quick Actions - Flat Design */}
            <div className="bg-white rounded-xl p-6 text border  border-gray-200">
               <h3 className="font-bold text-lg mb-1">Quick Actions</h3>
               <p className=" text-sm mb-6">Shortcuts to manage your platform.</p>
               <div className="space-y-3">
                 <button className="w-full bg-pri hover:bg-white/20 border border-white/20 py-2.5 text-white rounded-lg text-sm font-medium transition flex items-center justify-center gap-2">
                   Resolve Disputes
                 </button>
                 <button className="w-full bg-white border-pri  border text-pri py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-50 transition flex items-center justify-center gap-2">
                   Create Invoice
                 </button>
               </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 h-fit">
              <h3 className="font-bold text-gray-900 mb-6">Real-time Activity</h3>
              <div className="space-y-6 relative">
                {/* Vertical Line */}
                <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-gray-100"></div>

                {/* Item 1 */}
                <div className="flex gap-4 relative">
                  <div className="w-5 h-5 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center z-10 shrink-0">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">New Registration</p>
                    <p className="text-xs text-gray-500 mt-0.5"><span className="font-medium text-gray-700">Priya Patel</span> joined the platform.</p>
                    <p className="text-xs text-gray-400 mt-1">2 mins ago</p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex gap-4 relative">
                  <div className="w-5 h-5 rounded-full bg-green-100 border-2 border-white flex items-center justify-center z-10 shrink-0">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Payment Received</p>
                    <p className="text-xs text-gray-500 mt-0.5"><span className="font-medium text-gray-700">Michael Okpara</span> paid invoice #992.</p>
                    <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                  </div>
                </div>

                 {/* Item 3 */}
                 <div className="flex gap-4 relative">
                  <div className="w-5 h-5 rounded-full bg-red-100 border-2 border-white flex items-center justify-center z-10 shrink-0">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">System Alert</p>
                    <p className="text-xs text-gray-500 mt-0.5">High server load detected on US-East.</p>
                    <p className="text-xs text-gray-400 mt-1">3 hours ago</p>
                  </div>
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
    // Removed shadow-sm and hover:shadow-md
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