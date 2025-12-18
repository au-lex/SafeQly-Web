import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useChangePassword } from '../../Hooks/useProfile'; 

const ChangePasswordDetail: React.FC = () => {
  const { mutate: changePassword, isPending } = useChangePassword();

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const [formData, setFormData] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const { current_password, new_password, new_password_confirmation } = formData;

    // Basic Validation
    if (!current_password || !new_password || !new_password_confirmation) {
      toast.error('All fields are required');
      return;
    }

    if (new_password !== new_password_confirmation) {
      toast.error('New passwords do not match');
      return;
    }

    if (new_password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    // Call Mutation
    changePassword(
      {
        current_password,
        new_password,
        new_password_confirmation
      },
      {
        onSuccess: () => {
          // Clear form on success
          setFormData({
            current_password: '',
            new_password: '',
            new_password_confirmation: ''
          });
        }
      }
    );
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Change Password</h2>
      <p className="text-gray-500 text-sm mb-8">Ensure your account is using a long, random password to stay secure.</p>
      
      <div className="space-y-5">
        {/* Current Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showOld ? "text" : "password"}
              name="current_password"
              value={formData.current_password}
              onChange={handleChange}
              placeholder="Enter current password"
              className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-pri outline-none transition-all"
            />
            <button
              onClick={() => setShowOld(!showOld)}
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showNew ? "text" : "password"}
              name="new_password"
              value={formData.new_password}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-pri outline-none transition-all"
            />
            <button
              onClick={() => setShowNew(!showNew)}
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Confirm New Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm New Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showConfirm ? "text" : "password"}
              name="new_password_confirmation"
              value={formData.new_password_confirmation}
              onChange={handleChange}
              placeholder="Confirm new password"
              className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-pri outline-none transition-all"
            />
            <button
              onClick={() => setShowConfirm(!showConfirm)}
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="w-full bg-pri text-white py-3.5 rounded-xl hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Updating Password...
            </>
          ) : (
            'Update Password'
          )}
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordDetail;