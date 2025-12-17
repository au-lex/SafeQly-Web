import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import AuthLayout from '../../../Layout/AuthLayout';
import PasswordInput from '../../../Components/ui/PasswordInput';
import PrimaryButton from '../../../Components/ui/Button';
import { useResetPassword } from '../../../Hooks/useAuth';
import type { ResetPasswordData } from '../../../types';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  
  const [formData, setFormData] = useState({
    otp: '',
    new_password: '',
    confirm_password: '',
  });

  const { mutate: resetPassword, isPending } = useResetPassword();

  // Password validation
  const hasMinLength = formData.new_password.length >= 8;
  const hasNumber = /\d/.test(formData.new_password);
  const hasUpperAndLower = /[a-z]/.test(formData.new_password) && /[A-Z]/.test(formData.new_password);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!email) {
      alert('Email not found. Please go back and try again.');
      return;
    }

    if (!formData.otp) {
      alert('Please enter the OTP sent to your email');
      return;
    }

    if (!formData.new_password || !formData.confirm_password) {
      alert('Please fill in all password fields');
      return;
    }

    if (formData.new_password !== formData.confirm_password) {
      alert('Passwords do not match');
      return;
    }

    if (!hasMinLength || !hasNumber) {
      alert('Password must be at least 8 characters and contain at least 1 number');
      return;
    }

    const resetData: ResetPasswordData = {
      email,
      otp: formData.otp,
      new_password: formData.new_password,
    };

    resetPassword(resetData);
  };

  return (
    <AuthLayout 
      marketingProps={{
        title: (
          <>
            Secure Your <br />
            Future
          </>
        ),
        subtitle: "Choose a strong password to keep your escrow transactions safe and sound."
      }}
    >
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Set new password</h2>
        <p className="text-gray-500 text-sm md:text-base">
          Your new password must be different to previously used passwords.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* OTP Input */}
        <div className="mb-5">
          <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
            Verification Code
          </label>
          <input
            type="text"
            id="otp"
            placeholder="Enter 6-digit code"
            value={formData.otp}
            onChange={(e) => handleInputChange('otp', e.target.value)}
            maxLength={6}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-700 focus:ring-1 focus:ring-green-700 outline-none transition-all placeholder-gray-400 text-gray-800"
          />
          <p className="text-xs text-gray-500 mt-1">
            Code sent to <span className="font-medium text-gray-900">{email || 'your email'}</span>
          </p>
        </div>
        
        <PasswordInput 
          id="new_password" 
          label="New Password" 
          placeholder="Enter new password"
          value={formData.new_password}
          onChange={(e) => handleInputChange('new_password', e.target.value)}
        />
        
        <PasswordInput 
          id="confirm_password" 
          label="Confirm Password" 
          placeholder="Confirm new password"
          value={formData.confirm_password}
          onChange={(e) => handleInputChange('confirm_password', e.target.value)}
        />

        {/* Password Requirements Hint */}
        <div className="mb-8 text-sm text-gray-500">
           <p className="mb-2">Password must contain:</p>
           <ul className="space-y-1 pl-1">
              <li className="flex items-center gap-2">
                <CheckCircle2 
                  size={14} 
                  className={hasMinLength ? "text-green-600" : "text-gray-400"}
                /> 
                At least 8 characters
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 
                  size={14} 
                  className={hasNumber ? "text-green-600" : "text-gray-400"}
                /> 
                At least 1 number
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 
                  size={14} 
                  className={hasUpperAndLower ? "text-green-600" : "text-gray-400"}
                /> 
                Both upper and lower case letters
              </li>
           </ul>
        </div>

        <div className="mb-6">
          <PrimaryButton type="submit" disabled={isPending}>
            {isPending ? 'Resetting Password...' : 'Reset Password'}
          </PrimaryButton>
        </div>

        <div className="text-center text-sm text-gray-600">
          <Link 
            to="/login" 
            className="flex items-center justify-center gap-2 text-gray-500 hover:text-gray-900"
          >
            Back to log in
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}