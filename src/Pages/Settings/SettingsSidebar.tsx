import React from 'react';
import { ChevronRight } from 'lucide-react';
import SettingsItem from './SettingsItem';
import type { SettingsOption } from '../../types';

interface UserProfile {
  name: string;
  avatar: string;
  email: string;
  phone: string;
  address: string;
}

interface SettingsSidebarProps {
  userProfile: UserProfile;
  selectedSection: string;
  settingsOptions: SettingsOption[];
  onSelectSection: (section: string) => void;
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({
  userProfile,
  selectedSection,
  settingsOptions,
  onSelectSection
}) => {
  const allSections = [
    { id: 'profile', title: 'Profile', icon: userProfile.avatar },
    ...settingsOptions.filter(opt => opt.id !== 'logout')
  ];

  return (
    <>
      {/* Mobile Horizontal Tabs */}
      <div className="md:hidden sticky top-0 bg-white border-b border-gray-200 z-20">
        <div className="flex overflow-x-auto scrollbar-hide px-2 py-3 gap-2">
          {allSections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSelectSection(section.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedSection === section.id
                  ? 'bg-pri text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {section.id === 'profile' ? 'My Profile' : section.title}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-96 bg-white border-r border-gray-200 flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 z-10">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* My Profile */}
          <button
            onClick={() => onSelectSection('profile')}
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
              <div
                key={option.id}
                className={selectedSection === option.id ? 'bg-blue-50' : ''}
              >
                <SettingsItem option={option} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsSidebar;