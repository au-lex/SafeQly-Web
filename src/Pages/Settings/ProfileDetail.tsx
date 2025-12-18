import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Save } from 'lucide-react';

interface UserProfile {
  name: string;
  avatar: string;
  email: string;
  phone: string;
  address: string;
}

interface ProfileDetailProps {
  profile: UserProfile;
  onUpdate: (profile: UserProfile) => void;
}

const ProfileDetail: React.FC<ProfileDetailProps> = ({ profile, onUpdate }) => {
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

export default ProfileDetail;