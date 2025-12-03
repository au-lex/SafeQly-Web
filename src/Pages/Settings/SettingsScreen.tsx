// SettingsScreen.tsx
import React, { useState } from 'react';
import { Building2, Lock, Key, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import Layout from '../../Layout/Layout';
import SettingsItem from './SettingsItem';
import type { SettingsOption, UserProfile } from '../../types';

const SettingsScreen: React.FC = () => {
  const [userProfile] = useState<UserProfile>({
    name: 'My Profile',
    avatar: 'https://i.pravatar.cc/150?img=68'
  });

  const handleMyProfile = (): void => {
    console.log('Navigate to My Profile');
    alert('Navigate to My Profile');
  };

  const handleAccountSettings = (): void => {
    console.log('Navigate to Account Settings');
    alert('Navigate to Account Settings');
  };

  const handleChangePassword = (): void => {
    console.log('Navigate to Change Password');
    alert('Navigate to Change Password');
  };

  const handleChangePin = (): void => {
    console.log('Navigate to Change Pin');
    alert('Navigate to Change Pin');
  };

  const handleHelpSupport = (): void => {
    console.log('Navigate to Help & Support');
    alert('Navigate to Help & Support');
  };

  const handleLogout = (): void => {
    console.log('Logout');
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (confirmed) {
      alert('Logging out...');
    }
  };

  const settingsOptions: SettingsOption[] = [
    {
      id: 'account-settings',
      title: 'Account Settings',
      description: 'Add/remove account details',
      icon: <Building2 size={20} className="text-pri" />,
      iconBgColor: 'bg-pri/10',
      action: handleAccountSettings
    },
    {
      id: 'change-password',
      title: 'Change Password',
      description: 'Change your password',
      icon: <Lock size={20} className="text-pri" />,
      iconBgColor: 'bg-pri/10',
      action: handleChangePassword
    },
    {
      id: 'change-pin',
      title: 'Change Pin',
      description: 'Change your pin',
      icon: <Key size={20} className="text-pri" />,
      iconBgColor: 'bg-pri/10',
      action: handleChangePin
    },
    {
      id: 'help-support',
      title: 'Help & Support',
      description: 'Contact help & support',
      icon: <HelpCircle size={20} className="text-pri" />,
      iconBgColor: 'bg-pri/10',
      action: handleHelpSupport
    },
    {
      id: 'logout',
      title: 'Log Out',
      description: 'Log out of your account',
      icon: <LogOut size={20} className="text-red-500" />,
      iconBgColor: 'bg-red-100',
      action: handleLogout,
      showArrow: false
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto bg-white min-h-screen">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 z-10">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          </div>

          {/* Content */}
          <div className="py-4">
            {/* My Profile - Special Card */}
            <button
              onClick={handleMyProfile}
              className="w-full flex items-center justify-between py-4 px-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
            >
              <div className="flex items-center flex-1">
                <img
                  src={userProfile.avatar}
                  alt="Profile"
                  className="w-11 h-11 rounded-full mr-3 border-2 border-gray-200"
                />
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-900 mb-0.5">
                    {userProfile.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    View your profile
                  </p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400 ml-3" />
            </button>

            {/* Settings Options */}
            <div className="divide-y divide-gray-100">
              {settingsOptions.map((option) => (
                <SettingsItem key={option.id} option={option} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsScreen;