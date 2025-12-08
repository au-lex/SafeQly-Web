import React, { useState } from 'react';
import { Search, Filter,  UserPlus, Trash2, Edit } from 'lucide-react';
import AdminLayout from '../../../Layout/adminLayout';

// Mock Data Type
interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'User' | 'Editor';
  status: 'Active' | 'Inactive' | 'Banned';
  lastActive: string;
}

// Mock Data
const initialUsers: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active', lastActive: '2 mins ago' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'Inactive', lastActive: '2 days ago' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'Banned', lastActive: '1 week ago' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Editor', status: 'Active', lastActive: '5 hours ago' },
];

const UsersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>(initialUsers);
  console.log(setUsers);
  

  // Filter logic
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Banned': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout>


    <div className=" bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-500 text-sm mt-1">Manage user access and details.</p>
        </div>
        <button className="flex items-center gap-2  bg-pri text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
          <UserPlus size={18} />
          <span className='text-white'>Add User</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-lg  s-sm border border-gray-200 mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search users..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 border border-gray-300 rounded-lg bg-white">
          <Filter size={18} />
          <span>Filters</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg  s-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">User</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Role</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Last Active</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.role}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.lastActive}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Mock */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500">
          <span>Showing 1 to {filteredUsers.length} of {users.length} results</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
    </AdminLayout>
  );
};

export default UsersPage;