import React, { useState } from 'react';
import { Building2, Lock, Key, HelpCircle, LogOut, ChevronRight, User, Mail, Phone, MapPin, Save, Eye, EyeOff } from 'lucide-react';
import Layout from '../../Layout/Layout';

// Types
interface UserProfile {
  name: string;
  avatar: string;
  email: string;
  phone: string;
  address: string;
}

interface SettingsOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBgColor: string;
  action: () => void;
  showArrow?: boolean;
}

// Profile Detail Component
const ProfileDetail: React.FC<{ profile: UserProfile; onUpdate: (profile: UserProfile) => void }> = ({ profile, onUpdate }) => {
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    onUpdate(editedProfile);
    alert('Profile updated successfully!');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h2>
      
      <div className="flex flex-col items-center mb-8">
        <img
          src={profile.avatar}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-gray-200 mb-4"
        />
        <button className="text-sm text-pri hover:text-pri font-medium">
          Change Photo
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User size={16} className="inline mr-2" />
            Full Name
          </label>
          <input
            type="text"
            value={editedProfile.name}
            onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Mail size={16} className="inline mr-2" />
            Email
          </label>
          <input
            type="email"
            value={editedProfile.email}
            onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Phone size={16} className="inline mr-2" />
            Phone Number
          </label>
          <input
            type="tel"
            value={editedProfile.phone}
            onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin size={16} className="inline mr-2" />
            Address
          </label>
          <textarea
            value={editedProfile.address}
            onChange={(e) => setEditedProfile({ ...editedProfile, address: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-pri text-white py-3 rounded-lg hover:bg-pri transition-colors font-medium flex items-center justify-center gap-2"
        >
          <Save size={18} />
          Save Changes
        </button>
      </div>
    </div>
  );
};

// Change Password Component
const ChangePasswordDetail: React.FC = () => {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSubmit = () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    alert('Password changed successfully!');
    setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Change Password</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showOld ? "text" : "password"}
              value={passwords.oldPassword}
              onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
            />
            <button
              onClick={() => setShowOld(!showOld)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              value={passwords.newPassword}
              onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
            />
            <button
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              value={passwords.confirmPassword}
              onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
            />
            <button
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-pri text-white py-3 rounded-lg hover:bg-pri transition-colors font-medium"
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

// Change PIN Component
const ChangePinDetail: React.FC = () => {
  const [pins, setPins] = useState({
    oldPin: '',
    newPin: '',
    confirmPin: ''
  });

  const handleSubmit = () => {
    if (pins.newPin !== pins.confirmPin) {
      alert('New PINs do not match!');
      return;
    }
    if (pins.newPin.length !== 4) {
      alert('PIN must be 4 digits!');
      return;
    }
    alert('PIN changed successfully!');
    setPins({ oldPin: '', newPin: '', confirmPin: '' });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Change PIN</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current PIN
          </label>
          <input
            type="password"
            maxLength={4}
            value={pins.oldPin}
            onChange={(e) => setPins({ ...pins, oldPin: e.target.value.replace(/\D/g, '') })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest"
            placeholder="••••"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New PIN
          </label>
          <input
            type="password"
            maxLength={4}
            value={pins.newPin}
            onChange={(e) => setPins({ ...pins, newPin: e.target.value.replace(/\D/g, '') })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest"
            placeholder="••••"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm New PIN
          </label>
          <input
            type="password"
            maxLength={4}
            value={pins.confirmPin}
            onChange={(e) => setPins({ ...pins, confirmPin: e.target.value.replace(/\D/g, '') })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest"
            placeholder="••••"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-pri text-white py-3 rounded-lg hover:bg-pri transition-colors font-medium"
        >
          Update PIN
        </button>
      </div>
    </div>
  );
};

// Account Settings Component
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

// Help & Support Component
const HelpSupportDetail: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Help & Support</h2>
      
      <div className="space-y-4">
        <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer transition-colors">
          <h3 className="font-semibold text-gray-900 mb-1">FAQs</h3>
          <p className="text-sm text-gray-600">Find answers to common questions</p>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer transition-colors">
          <h3 className="font-semibold text-gray-900 mb-1">Contact Support</h3>
          <p className="text-sm text-gray-600">Get in touch with our support team</p>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer transition-colors">
          <h3 className="font-semibold text-gray-900 mb-1">Report a Problem</h3>
          <p className="text-sm text-gray-600">Let us know if something isn't working</p>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-1">App Version</h3>
          <p className="text-sm text-gray-600">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
};

// Main Settings Screen Component
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

  
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar - Hidden on mobile when detail is shown */}
      <div className={`w-full md:w-96 bg-white border-r border-gray-200 flex flex-col ${
        selectedSection && 'hidden md:flex'
      }`}>
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 z-10">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* My Profile */}
          <button
            onClick={() => setSelectedSection('profile')}
            className={`w-full flex items-center justify-between py-4 px-4 hover:bg-gray-50 transition-colors border-b border-gray-100 ${
              selectedSection === 'profile' ? 'bg-blue-50' : ''
            }`}
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
              <button
                key={option.id}
                onClick={option.action}
                className={`w-full flex items-center justify-between py-4 px-4 hover:bg-gray-50 transition-colors ${
                  selectedSection === option.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center flex-1">
                  <div className={`w-11 h-11 rounded-full ${option.iconBgColor} flex items-center justify-center mr-3 flex-shrink-0`}>
                    {option.icon}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900 mb-0.5">
                      {option.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {option.description}
                    </p>
                  </div>
                </div>
                
                {option.showArrow !== false && (
                  <ChevronRight size={20} className="text-gray-400 ml-3" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Detail Panel - Full screen on mobile */}
      {selectedSection && (
        <div className="w-full md:flex-1 bg-white overflow-y-auto">
          {/* Mobile Back Button */}
          <div className="md:hidden sticky top-0 bg-white border-b border-gray-100 px-4 py-3 z-10 flex items-center">
            <button
              onClick={() => setSelectedSection('')}
              className="flex items-center text-pri hover:text-pri"
            >
              <ChevronRight size={20} className="transform rotate-180 mr-2" />
              <span className="font-medium">Back</span>
            </button>
          </div>
          {renderDetailSection()}
        </div>
      )}
    </div>
    </Layout>
  );
};

export default SettingsScreen;