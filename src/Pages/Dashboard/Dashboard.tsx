import Layout from '../../Layout/Layout';
import React, { useState } from 'react';
import {
  Eye,
  EyeSlash,
  Copy,
  Add,
  ArrowRight,
  Import,

} from 'iconsax-react';


interface Transaction {
  id: string;
  fullName: string;       
  phoneNumber: string;   
  amount: number;
  dateTime: string;      
  status: 'completed' | 'pending' | 'failed' | 'active'; 
  direction: 'in' | 'out';
  image?: string;
}

interface RecentUser {
  id: string;
  name: string;
  image: string;
}

const Dashboard: React.FC = () => {
  const [showBalance, setShowBalance] = useState(true);


  const transactions: Transaction[] = [
    { 
      id: '1', 
      fullName: 'Michael Johnson', 
      phoneNumber: '+234 801 234 5678', 
      amount: 25.00, 
      dateTime: 'Oct 24, 2025 • 07:15 AM', 
      status: 'pending', 
      direction: 'out', 
      image: 'https://i.pravatar.cc/150?img=11' 
    },
    { 
      id: '2', 
      fullName: 'Sarah Connor', 
      phoneNumber: '+234 812 999 8888', 
      amount: 89.00, 
      dateTime: 'Oct 23, 2025 • 02:30 PM', 
      status: 'completed', 
      direction: 'in', 
      image: 'https://i.pravatar.cc/150?img=12' 
    },
    { 
      id: '3', 
      fullName: 'David Smith', 
      phoneNumber: '+234 703 555 1212', 
      amount: 2000.00, 
      dateTime: 'Oct 22, 2025 • 10:00 AM', 
      status: 'completed', 
      direction: 'in', 
      image: 'https://i.pravatar.cc/150?img=3' 
    },
    { 
      id: '4', 
      fullName: 'Jessica Williams', 
      phoneNumber: '+234 909 000 1111', 
      amount: 49.00, 
      dateTime: 'Oct 21, 2025 • 09:15 AM', 
      status: 'failed', 
      direction: 'out', 
      image: 'https://i.pravatar.cc/150?img=4' 
    },
    { 
      id: '5', 
      fullName: 'Daniel Brown', 
      phoneNumber: '+234 802 333 4444', 
      amount: 49.00, 
      dateTime: 'Oct 20, 2025 • 06:45 PM', 
      status: 'active', 
      direction: 'out', 
      image: 'https://i.pravatar.cc/150?img=5' 
    },
  ];


  const recentUsers: RecentUser[] = [
    { id: 'u1', name: 'Michael', image: 'https://i.pravatar.cc/150?img=60' },
    { id: 'u2', name: 'Sarah', image: 'https://i.pravatar.cc/150?img=44' },
    { id: 'u3', name: 'David', image: 'https://i.pravatar.cc/150?img=12' },
    { id: 'u4', name: 'Jessica', image: 'https://i.pravatar.cc/150?img=5' },
    { id: 'u5', name: 'Daniel', image: 'https://i.pravatar.cc/150?img=33' },
  ];


  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'failed': return 'bg-red-100 text-red-700';
      case 'active': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Layout>
      <div className=" min-h-screen md:bg-gray-50 ">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* === LEFT COLUMN (Profile, Balance, Actions) === */}
          <div className="md:col-span-4 space-y-6">
            
            {/* 1. Balance Card */}
            <div className="bg-white p-6 space-y-6 md:rounded-xl md:border md:border-gray-100">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Total Balance</span>
                </div>

                <div className="flex items-center justify-between">
                  <h1 className="text-4xl font-extrabold text-gray-900 flex items-center gap-3">
                    {showBalance ? '$22,060.00' : '•••••••'}
                    <button onClick={() => setShowBalance(!showBalance)} className="text-gray-400 hover:text-gray-600">
                      {showBalance ? <Eye size="24"/> : <EyeSlash size="24"/>}
                    </button>
                  </h1>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button className="flex-1 bg-pri hover:bg-blue-700 text-white py-3.5 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors">
                      <Add size="20" color='#fff'/>
                      Fund Wallet
                    </button>
                    <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3.5 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors">
                      <Import size="20" color='currentColor' className="rotate-9j0 text-pri"/>
                      Withdraw
                    </button>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-pri font-bold text-sm">Tag32Gb6</span>
                  <button className="flex items-center gap-1 text-pri font-semibold text-xs hover:text-blue-700">
                      Copy Tag <Copy size="14"/>
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Quick Actions / New Escrow */}
            <div className="px-6 md:px-0">
              <button className="w-full border bg-white border-pri text-pri hover:bg-blue-50 py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all">
                  New Escrow Transaction <ArrowRight size="16" color='currentColor' className='text-pri'/>
              </button>
            </div>

            {/* 3. Quick Transfer */}
            <div className="px-6 md:px-2 bg-white md:p-6 md:rounded-xl md:border md:border-gray-100">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Quick Transfer</h3>
              <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex flex-col items-center gap-2 min-w-[60px] cursor-pointer group">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-pri group-hover:border-blue-500 transition-all">
                      <img src={user.image} alt={user.name} className="w-full h-full object-cover"/>
                    </div>
                    <span className="text-xs font-medium text-gray-900">{user.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* === RIGHT COLUMN (Transaction History) === */}
          <div className="md:col-span-8 bg-white md:rounded-xl md:border md:border-gray-100 md:p-6 h-full">
            
            <div className="px-6 md:px-0 mt-4 md:mt-0">
              <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-xl text-gray-900">Transaction History</h3>
                  <button className="text-pri font-semibold text-sm hover:text-blue-700">View All</button>
              </div>
            </div>

            {/* List Header (Desktop Only) */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-3 pb-3 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <div className="col-span-4">User Details</div>
                <div className="col-span-3">Date & Time</div>
                <div className="col-span-2 text-center">Status</div>
                <div className="col-span-3 text-right">Amount</div>
            </div>

            {/* Transaction List */}
            <div className="px-6 md:px-0 py-2 space-y-4 pb-20 md:pb-0">
              {transactions.map((tx) => (
                <div key={tx.id} className="group cursor-pointer hover:bg-gray-50 md:p-3 md:-mx-3 md:rounded-xl transition-colors border-b md:border-b-0 border-gray-50 last:border-0 pb-4 md:pb-0">
                    
                    <div className="grid grid-cols-12 gap-2 md:gap-4 items-center">
                        
                        {/* 1. Image & Name & Phone */}
                        <div className="col-span-8 md:col-span-4 flex items-center gap-3">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-gray-100 flex-shrink-0">
                                <img src={tx.image} alt="User" className="w-full h-full object-cover"/>
                            </div>
                            <div className="overflow-hidden">
                                <h4 className="font-bold text-gray-900 text-sm truncate">{tx.fullName}</h4>
                                <p className="text-xs text-gray-400 truncate">{tx.phoneNumber}</p>
                            </div>
                        </div>

                        {/* 2. Date & Time */}
                        <div className="col-span-4 md:col-span-3 text-right md:text-left">
                            <p className="text-xs font-medium text-gray-600">{tx.dateTime.split('•')[0]}</p>
                            <p className="text-[10px] text-gray-400">{tx.dateTime.split('•')[1]}</p>
                        </div>

                        {/* 3. Status (Moved to next row on mobile or kept inline) */}
                        <div className="col-span-6 md:col-span-2 mt-2 md:mt-0 flex md:justify-center">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${getStatusColor(tx.status)}`}>
                                {tx.status}
                            </span>
                        </div>

                        {/* 4. Amount */}
                        <div className="col-span-6 md:col-span-3 mt-2 md:mt-0 text-right">
                            <span className={`block font-bold text-sm ${tx.direction === 'in' ? 'text-green-600' : 'text-gray-900'}`}>
                                {tx.direction === 'in' ? '+' : '-'}${tx.amount.toFixed(2)}
                            </span>
                        </div>

                    </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>

      </div>
    </Layout>
  );
};

export default Dashboard;