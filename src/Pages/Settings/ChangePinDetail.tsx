import React, { useState } from 'react';

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

export default ChangePinDetail;