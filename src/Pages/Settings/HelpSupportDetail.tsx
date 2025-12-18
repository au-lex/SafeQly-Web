import React from 'react';

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

export default HelpSupportDetail;