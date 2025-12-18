import React from 'react';

const AccountSettingsDetail: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
      
      <div className="space-y-4">
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Notifications</h3>
          <label className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Email Notifications</span>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </label>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Privacy</h3>
          <label className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">Profile Visibility</span>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Show Online Status</span>
            <input type="checkbox" className="w-5 h-5" />
          </label>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Security</h3>
          <label className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Two-Factor Authentication</span>
            <input type="checkbox" className="w-5 h-5" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsDetail;