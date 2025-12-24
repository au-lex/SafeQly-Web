import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { SettingsOption, UserProfileData } from '../../types';

interface SettingsSidebarProps {
  userProfile: UserProfileData;
  settingsOptions: SettingsOption[];
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({
  userProfile,
  settingsOptions
}) => {
  // Find the logout option to reuse its action and title
  const logoutOption = settingsOptions.find(opt => opt.id === 'logout');

  const allSections = [
    { id: 'profile', title: 'My Profile', path: '/settings/profile' },
    { id: 'account-settings', title: 'Account Settings', path: '/settings/account' },
    { id: 'change-password', title: 'Change Password', path: '/settings/password' },
    // { id: 'change-pin', title: 'Change PIN', path: '/settings/pin' },
    { id: 'help-support', title: 'Help & Support', path: '/settings/help' },
  ];

  return (
    <>
      {/* Mobile Horizontal Tabs */}
      <div className="md:hidden sticky top-0 bg-white border-b border-gray-200 z-20">
        <div className="flex overflow-x-auto scrollbar-hide px-2 py-3 gap-2">
          {allSections.map((section) => (
            <NavLink
              key={section.id}
              to={section.path}
              className={({ isActive }) =>
                `flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-pri text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`
              }
            >
              {section.title}
            </NavLink>
          ))}
          
          {/* Mobile Logout Button */}
          {logoutOption && (
            <button
              type="button"
              onClick={logoutOption.action}
              className="flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap bg-red-50 text-red-600 hover:bg-red-100"
            >
              {logoutOption.title}
            </button>
          )}
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
          <NavLink
            to="/settings/profile"
            className={({ isActive }) =>
              `w-full flex items-center justify-between py-4 px-4 hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                isActive ? 'bg-blue-50' : ''
              }`
            }
          >
            <div className="flex items-center flex-1">
              <img
                src={userProfile.avatar || "https://i.pravatar.cc/150?img=68"}
                alt="Profile"
                className="w-11 h-11 rounded-full mr-3 border-2 border-gray-200 object-cover"
              />
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900 mb-0.5">
                  {userProfile.full_name}
                </p>
                <p className="text-xs text-gray-500">
                  View your profile
                </p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400 ml-3" />
          </NavLink>

          {/* Settings Options */}
          <div className="divide-y divide-gray-100">
            {settingsOptions.map((option) => (
              <NavLink
                key={option.id}
                to={`/settings/${option.id === 'account-settings' ? 'account' : option.id === 'change-password' ? 'password' : option.id === 'change-pin' ? 'pin' : option.id === 'help-support' ? 'help' : option.id}`}
                className={({ isActive }) =>
                  `w-full flex items-center justify-between py-4 px-4 hover:bg-gray-50 transition-colors ${
                    isActive ? 'bg-blue-50' : ''
                  }`
                }
                onClick={(e) => {
                  if (option.id === 'logout') {
                    e.preventDefault();
                    option.action();
                  }
                }}
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
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsSidebar;