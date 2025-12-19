// EnterTagScreen.tsx
import React from 'react';
import { Loader2 } from 'lucide-react';

interface EnterTagScreenProps {
  userTag: string;
  isLoading: boolean;
  onUserTagChange: (tag: string) => void;
  onSearchUser: () => void;
}

const EnterTagScreen: React.FC<EnterTagScreenProps> = ({
  userTag,
  isLoading,
  onUserTagChange,
  onSearchUser
}) => {
  return (
    <>
      <div className="p-6 md:p-8">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-500 mb-2">
            Enter User Tag
          </label>
          <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 py-4">
            <span className="text-base font-medium text-gray-900">Tag: </span>
            <input
              type="text"
              value={userTag}
              onChange={(e) => onUserTagChange(e.target.value)}
              placeholder="29030"
              className="flex-1 text-base text-gray-900 outline-none ml-1 placeholder-gray-400"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  onSearchUser();
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 border-t border-gray-100">
        <button
          onClick={onSearchUser}
          disabled={!userTag.trim() || isLoading}
          className={`w-full py-4 rounded-xl font-semibold transition-colors flex items-center justify-center ${
            !userTag.trim() || isLoading
              ? 'bg-pri/50 cursor-not-allowed'
              : 'bg-pri hover:bg-blue-600'
          } text-white`}
        >
          {isLoading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            'Search User'
          )}
        </button>
      </div>
    </>
  );
};

export default EnterTagScreen;