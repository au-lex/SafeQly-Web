import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Building2, Lock,  HelpCircle, LogOut, Loader2 } from 'lucide-react';
import Layout from '../../Layout/Layout';
import SettingsSidebar from './SettingsSidebar';
import ProfileDetail from './ProfileDetail';
import ChangePasswordDetail from './ChangePasswordDetail';
// import ChangePinDetail from './ChangePinDetail';
import AccountSettingsDetail from './AccountSettingsDetail';
import HelpSupportDetail from './HelpSupportDetail';
import type { SettingsOption } from '../../types';
import { useGetUserProfile } from '../../Hooks/useProfile'; 
import { useLogout } from '../../Hooks/useAuth'; 
const SettingsScreen: React.FC = () => {
  const { section = 'profile' } = useParams<{ section: string }>();
  

  const { data: userProfile, isLoading } = useGetUserProfile();
  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (confirmed) {
      logout();
    }
  };

  const settingsOptions: SettingsOption[] = [
    {
      id: 'account-settings',
      title: 'Account Settings',
      description: 'Add/remove account details',
      icon: <Building2 size={20} className="text-pri" />,
      iconBgColor: 'bg-blue-100',
      action: () => {}
    },
    {
      id: 'change-password',
      title: 'Change Password',
      description: 'Change your password',
      icon: <Lock size={20} className="text-pri" />,
      iconBgColor: 'bg-blue-100',
      action: () => {}
    },
    // {
    //   id: 'change-pin',
    //   title: 'Change Pin',
    //   description: 'Change your pin',
    //   icon: <Key size={20} className="text-pri" />,
    //   iconBgColor: 'bg-blue-100',
    //   action: () => {}
    // },
    {
      id: 'help-support',
      title: 'Help & Support',
      description: 'Contact help & support',
      icon: <HelpCircle size={20} className="text-pri" />,
      iconBgColor: 'bg-blue-100',
      action: () => {}
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

  const renderDetailSection = () => {
    switch (section) {
      case 'profile':
 
        return <ProfileDetail profile={userProfile} />;
      case 'password':
        return <ChangePasswordDetail />;
      // case 'pin':
      //   return <ChangePinDetail />;
      case 'account':
        return <AccountSettingsDetail />;
      case 'help':
        return <HelpSupportDetail />;
      default:
        return <Navigate to="/settings/profile" replace />;
    }
  };

  if (isLoading || !userProfile) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Loader2 className="w-8 h-8 animate-spin text-pri" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
        
        <SettingsSidebar
          userProfile={userProfile} 
          settingsOptions={settingsOptions}
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