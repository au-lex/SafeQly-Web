import React, { useState } from 'react';
import { Search, Filter, UserPlus, Trash2, Edit, Ban, CheckCircle, Loader2 } from 'lucide-react';
import AdminLayout from '../../../Layout/adminLayout';
import { 
  useGetAllUsers, 
  useSuspendUser, 
  useUnsuspendUser, 
  useDeleteUser,
  type User 
} from '../../../Hooks/useAdmin'; 

const UsersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit] = useState(20);

  // Fetch users with pagination
  const { data, isLoading, isError, error } = useGetAllUsers(currentPage, pageLimit);

  // Mutations
  const { mutate: suspendUser, isPending: isSuspending } = useSuspendUser();
  const { mutate: unsuspendUser, isPending: isUnsuspending } = useUnsuspendUser();
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

  // Filter logic
  const filteredUsers = data?.users.filter(user => 
    user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.user_tag.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const getStatusColor = (isSuspended: boolean) => {
    return isSuspended 
      ? 'bg-red-100 text-red-800' 
      : 'bg-green-100 text-green-800';
  };

  const getStatusText = (isSuspended: boolean) => {
    return isSuspended ? 'Suspended' : 'Active';
  };

  const handleSuspend = (userId: number) => {
    const reason = prompt('Enter reason for suspension:');
    if (reason && reason.trim()) {
      suspendUser({ userId: userId.toString(), reason });
    }
  };

  const handleUnsuspend = (userId: number) => {
    if (confirm('Are you sure you want to unsuspend this user?')) {
      unsuspendUser(userId.toString());
    }
  };

  const handleDelete = (userId: number, userName: string) => {
    if (confirm(`Are you sure you want to delete ${userName}? This action cannot be undone.`)) {
      deleteUser(userId.toString());
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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
            <p className="text-gray-600">Loading users...</p>
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
            <h3 className="text-red-800 font-semibold mb-2">Error Loading Users</h3>
            <p className="text-red-600 text-sm">
              {(error as any)?.response?.data?.error || error?.message || 'Failed to load users'}
            </p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Users</h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage user access and details. Total: {data?.pagination.total || 0}
            </p>
          </div>
          <button className="flex items-center gap-2 bg-pri text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
            <UserPlus size={18} />
            <span className="text-white">Add User</span>
          </button>
        </div>

        {/* Toolbar */}
        <div className="bg-white p-4 rounded-lg f-sm border border-gray-200 mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name, email or tag..."
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
        <div className="bg-white rounded-lg f-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">User</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Tag</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Balance</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Verified</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user: User) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                            {user.full_name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{user.full_name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                          @{user.user_tag}
                        </code>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          user.role === 'admin' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        ₦{user.balance.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.is_suspended)}`}>
                          {getStatusText(user.is_suspended)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {user.is_email_verified ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <span className="text-xs text-gray-400">Not verified</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition"
                            title="Edit user"
                          >
                            <Edit size={18} />
                          </button>
                          
                          {user.is_suspended ? (
                            <button 
                              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition disabled:opacity-50"
                              title="Unsuspend user"
                              onClick={() => handleUnsuspend(user.id)}
                              disabled={isUnsuspending}
                            >
                              <CheckCircle size={18} />
                            </button>
                          ) : (
                            <button 
                              className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-full transition disabled:opacity-50"
                              title="Suspend user"
                              onClick={() => handleSuspend(user.id)}
                              disabled={isSuspending}
                            >
                              <Ban size={18} />
                            </button>
                          )}
                          
                          <button 
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition disabled:opacity-50"
                            title="Delete user"
                            onClick={() => handleDelete(user.id, user.full_name)}
                            disabled={isDeleting}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500">
            <span>
              Showing {((currentPage - 1) * pageLimit) + 1} to{' '}
              {Math.min(currentPage * pageLimit, data?.pagination.total || 0)} of{' '}
              {data?.pagination.total || 0} results
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
      </div>
    </AdminLayout>
  );
};

export default UsersPage;