import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, AlertTriangle, CheckCircle, FileText, Loader2 } from 'lucide-react';

interface RaiseDisputeModalProps {
  isOpen: boolean;
  onClose: () => void;
  escrowId: number | string; // accept either depending on how you store it in frontend state
}

// Standard dispute reasons
const DISPUTE_REASONS = [
  { value: "", label: "Select a reason..." },
  { value: "Item not received", label: "Item not received" },
  { value: "Does not match description", label: "Item significantly not as described" },
  { value: "Damaged item", label: "Item arrived damaged" },
  { value: "Service incomplete", label: "Service not rendered completely" },
  { value: "Other", label: "Other issue" },
];

const RaiseDisputeModal: React.FC<RaiseDisputeModalProps> = ({
  isOpen,
  onClose,
  escrowId,
}) => {
  // --- State Management ---
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
  
  // UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset state whenever the modal opens
  useEffect(() => {
    if (isOpen) {
      setReason("");
      setDescription("");
      setEvidenceFile(null);
      setError(null);
      setIsSuccess(false);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  // Handle Escape key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);


  // --- Handlers ---

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side validation: 10MB limit (matching Go backend)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("File is too large. Maximum size is 10MB.");
      setEvidenceFile(null);
      // Reset the input value so the same file can be selected again if needed after error
      e.target.value = ""; 
      return;
    }

    setError(null);
    setEvidenceFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic client-side validation
    if (!reason || !description) {
      setError("Please fill in reason and description.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // --- Preparing Data for Backend ---
    // This construct matches exactly what your Fiber `c.FormValue` 
    // and `c.FormFile` expect.
    const formData = new FormData();
    formData.append('escrow_id', escrowId.toString());
    formData.append('reason', reason);
    formData.append('description', description);
    if (evidenceFile) {
      // 'evidence' matches c.FormFile("evidence")
      formData.append('evidence', evidenceFile); 
    }

    console.log("Submitting FormData payload ready for axios/fetch:", formData);

    // --- MOCK API CALL ---
    // Simulate network request delay showing loading state
    setTimeout(() => {
      // In real app: await api.post('/disputes', formData, { headers: {'Content-Type': 'multipart/form-data'}})
      console.log("API Submission Successful");
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  // If not open, render nothing
  if (!isOpen) return null;

  return (
    // Backdrop Overlay
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose} // Close when clicking outside
    >
      {/* Modal Container */}
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-auto overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside closing the modal
      >
        
        {/* ----- Success View ----- */}
        {isSuccess ? (
          <div className="p-12 flex flex-col items-center justify-center text-center space-y-6">
            <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-in bounce-in duration-500">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Dispute Raised Successfully</h2>
            <p className="text-gray-600">
              Your dispute for Escrow #{escrowId} has been submitted. Our team will review the details and evidence shortly.
            </p>
            <button
              onClick={onClose}
              className="mt-6 w-full py-3 px-4 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          /* ----- Form View ----- */
          <>
            {/* Header */}
            <div className="bg-red-50 px-6 py-4 border-b border-red-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Raise a Dispute</h2>
                  <p className="text-sm text-red-600 font-medium">Escrow ID: #{escrowId}</p>
                </div>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 hover:bg-red-100 rounded-full p-1 transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mx-6 mt-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 mb-4">
                <p className="font-medium">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Reason Select */}
              <div className="space-y-2">
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                  Reason for Dispute <span className="text-red-500">*</span>
                </label>
                <select
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors bg-white"
                  required
                >
                  {DISPUTE_REASONS.map((option) => (
                    <option key={option.value} value={option.value} disabled={option.value === ""}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description Textarea */}
              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Detailed Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please provide specific details about why you are raising this dispute..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors resize-none"
                  required
                />
              </div>

              {/* File Upload Area */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 flex justify-between">
                  <span>Supporting Evidence (Optional)</span>
                  <span className="text-xs text-gray-500">Max 10MB. Images or PDFs.</span>
                </label>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/png,image/jpeg,image/jpg,application/pdf"
                  className="hidden"
                />

                {!evidenceFile ? (
                  // Empty State - Click to upload area
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-red-400 hover:bg-red-50/30 transition-all group"
                  >
                    <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-white transition-colors">
                      <Upload className="h-6 w-6 text-gray-500 group-hover:text-red-500" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">Click to upload evidence</p>
                    <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or PDF</p>
                  </div>
                ) : (
                  // File Selected State
                  <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3 truncate">
                      <FileText className="h-8 w-8 text-blue-500 flex-shrink-0" />
                      <div className="truncate">
                        <p className="text-sm font-medium text-gray-900 truncate">{evidenceFile.name}</p>
                        <p className="text-xs text-gray-500">{(evidenceFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => { setEvidenceFile(null); if(fileInputRef.current) fileInputRef.current.value = '' }}
                      className="text-gray-400 hover:text-red-500 p-2 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !reason || !description}
                  className="px-6 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Dispute'
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default RaiseDisputeModal;