import React, { useState } from 'react';
import { Building2, Lock, Key, HelpCircle, LogOut } from 'lucide-react';
import Layout from '../../Layout/Layout';
import SettingsSidebar from './SettingsSidebar';
import ProfileDetail from './ProfileDetail';
import ChangePasswordDetail from './ChangePasswordDetail';
import ChangePinDetail from './ChangePinDetail';
import AccountSettingsDetail from './AccountSettingsDetail';
import HelpSupportDetail from './HelpSupportDetail';
import type { SettingsOption } from '../../types';

interface UserProfile {
  name: string;
  avatar: string;
  email: string;
  phone: string;
  address: string;
}

const SettingsScreen: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=68',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    address: '123 Main Street, New York, NY 10001'
  });

  const [selectedSection, setSelectedSection] = useState<string>('profile');

  const settingsOptions: SettingsOption[] = [
    {
      id: 'account-settings',
      title: 'Account Settings',
      description: 'Add/remove account details',
      icon: <Building2 size={20} className="text-pri" />,
      iconBgColor: 'bg-blue-100',
      action: () => setSelectedSection('account-settings')
    },
    {
      id: 'change-password',
      title: 'Change Password',
      description: 'Change your password',
      icon: <Lock size={20} className="text-pri" />,
      iconBgColor: 'bg-blue-100',
      action: () => setSelectedSection('change-password')
    },
    {
      id: 'change-pin',
      title: 'Change Pin',
      description: 'Change your pin',
      icon: <Key size={20} className="text-pri" />,
      iconBgColor: 'bg-blue-100',
      action: () => setSelectedSection('change-pin')
    },
    {
      id: 'help-support',
      title: 'Help & Support',
      description: 'Contact help & support',
      icon: <HelpCircle size={20} className="text-pri" />,
      iconBgColor: 'bg-blue-100',
      action: () => setSelectedSection('help-support')
    },
    {
      id: 'logout',
      title: 'Log Out',
      description: 'Log out of your account',
      icon: <LogOut size={20} className="text-red-500" />,
      iconBgColor: 'bg-red-100',
      action: () => {
        const confirmed = window.confirm('Are you sure you want to log out?');
        if (confirmed) {
          alert('Logging out...');
        }
      },
      showArrow: false
    }
  ];

  const renderDetailSection = () => {
    switch (selectedSection) {
      case 'profile':
        return <ProfileDetail profile={userProfile} onUpdate={setUserProfile} />;
      case 'change-password':
        return <ChangePasswordDetail />;
      case 'change-pin':
        return <ChangePinDetail />;
      case 'account-settings':
        return <AccountSettingsDetail />;
      case 'help-support':
        return <HelpSupportDetail />;
      default:
        return <ProfileDetail profile={userProfile} onUpdate={setUserProfile} />;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
        {/* Sidebar (Desktop) / Top Tabs (Mobile) */}
        <SettingsSidebar
          userProfile={userProfile}
          selectedSection={selectedSection}
          settingsOptions={settingsOptions}
          onSelectSection={setSelectedSection}
        />

        {/* Detail Panel */}
        <div className="flex-1 bg-white overflow-y-auto">
          {renderDetailSection()}
        </div>
      </div>
    </Layout>
  );
};

export default SettingsScreen;