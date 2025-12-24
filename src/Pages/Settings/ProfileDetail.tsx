import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, Phone, Save, Camera, Loader2, LogOut } from 'lucide-react';
import { useUpdateProfile, useUploadAvatar } from '../../Hooks/useProfile';
import { useLogout } from '../../Hooks/useAuth';
import type { UserProfileData } from '../../types';

interface ProfileDetailProps {
  profile: UserProfileData | undefined;
}

const ProfileDetail: React.FC<ProfileDetailProps> = ({ profile }) => {
  // Hooks
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const { mutate: uploadAvatar, isPending: isUploadingAvatar } = useUploadAvatar();
  const { mutate: logout } = useLogout(); // 2. Initialize logout hook

  // Local state for form fields
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
      });
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateProfile({
      full_name: formData.full_name,
      phone: formData.phone,
    });
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadAvatar(file);
    }
  };

  // 3. Logout Handler
  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (confirmed) {
      logout();
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">My Profile</h2>

      {/* Avatar Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative group cursor-pointer" onClick={handleImageClick}>
          {isUploadingAvatar ? (
            <div className="w-24 h-24 rounded-full border-4 border-gray-100 flex items-center justify-center bg-gray-50">
              <Loader2 className="animate-spin text-pri" size={32} />
            </div>
          ) : (
            <img
              src={profile?.avatar || 'https://res.cloudinary.com/dmhvsyzch/image/upload/v1760256119/Profile_avatar_placeholder_large_smgjld.png'}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-gray-200 object-cover"
            />
          )}

          <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="text-white" size={24} />
          </div>
        </div>

        <button
          onClick={handleImageClick}
          disabled={isUploadingAvatar}
          className="mt-4 text-sm text-pri hover:text-blue-700 font-medium disabled:opacity-50"
        >
          {isUploadingAvatar ? 'Uploading...' : 'Change Photo'}
        </button>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/jpeg,image/png,image/jpg"
          onChange={handleFileChange}
        />
      </div>

      {/* Form Section */}
      <div className="space-y-5">

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User size={16} className="inline mr-2 text-gray-400" />
            Full Name
          </label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-pri outline-none transition-all"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Mail size={16} className="inline mr-2 text-gray-400" />
            Email Address
          </label>
          <input
            type="email"
            value={profile?.email || ''}
            disabled
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
          />
          <p className="text-[10px] text-gray-400 mt-1 ml-1">Email cannot be changed</p>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Phone size={16} className="inline mr-2 text-gray-400" />
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-pri outline-none transition-all"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={isUpdating}
          className="w-full bg-pri text-white py-3.5 rounded-xl hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isUpdating ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={18} />
              Save Changes
            </>
          )}
        </button>

        {/* 4. Mobile Only Logout Button */}
        <div className="md:hidden pt-6 mt-6 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full bg-red-50 text-red-600 py-3.5 rounded-xl hover:bg-red-100 transition-colors font-semibold flex items-center justify-center gap-2"
          >
            <LogOut size={18} />
            Log Out
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProfileDetail;