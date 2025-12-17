import { useState, useRef, useEffect, type ChangeEvent, type KeyboardEvent, type ClipboardEvent } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import AuthLayout from '../../../Layout/AuthLayout';
import PrimaryButton from '../../../Components/ui/Button';
import { useVerifySignupOTP, useResendSignupOTP } from '../../../Hooks/useAuth';
import type { VerifyOTPData } from '../../../types';

export default function VerifyOTP() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const email = searchParams.get('email') || '';

  
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { mutate: verifyOTP, isPending: isVerifying } = useVerifySignupOTP();
  const { mutate: resendOTP, isPending: isResending } = useResendSignupOTP();

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
    
    if (pastedData.every(char => !isNaN(Number(char)))) {
      const newOtp = [...otp];
      pastedData.forEach((val, i) => {
        if (i < 6) newOtp[i] = val;
      });
      setOtp(newOtp);
      
      const focusIndex = Math.min(pastedData.length, 5);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      alert('Please enter the complete 6-digit code');
      return;
    }

    if (!email) {
      alert('Email not found. Please go back and try again.');
      return;
    }

    const verifyData: VerifyOTPData = {
      email,
      otp: otpCode,
    };

    verifyOTP(verifyData);
  };

  const handleResend = () => {
    if (!email) {
      alert('Email not found. Please go back and try again.');
      return;
    }

    resendOTP(email);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <AuthLayout 
      marketingProps={{
        title: (
          <>
            Verify Your <br />
            Identity
          </>
        ),
        subtitle: "We've sent a 6-digit verification code to your email. Please enter the code below to continue."
      }}
    >
      <div className="mb-2">
        <button 
          onClick={handleBack}
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-6 bg-transparent border-none cursor-pointer"
        >
           <ChevronLeft size={16} className="mr-1" /> Back
        </button>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Enter OTP</h2>
        <p className="text-gray-500 text-sm md:text-base">
          Code sent to <span className="font-medium text-gray-900">{email || 'user@example.com'}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mt-8">
          <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secure Code
              </label>
              <div className="flex gap-2 sm:gap-4 justify-between" onPaste={handlePaste}>
              {otp.map((data, index) => (
                  <input
                      key={index}
                      ref={(el) => { inputRefs.current[index] = el }}
                      type="text"
                      maxLength={1}
                      className="w-10 h-10 sm:w-12 sm:h-12 border border-gray-300 rounded-lg text-center text-xl font-semibold text-gray-900 focus:ring-2 focus:ring-pri focus:border-pri outline-none transition-all"
                      value={data}
                      onChange={(e) => handleChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      autoComplete="off"
                      disabled={isVerifying}
                  />
              ))}
              </div>
          </div>
          
          <PrimaryButton type="submit" disabled={isVerifying}>
            {isVerifying ? 'Verifying...' : 'Verify Account'}
          </PrimaryButton>

          <div className="mt-6 text-center text-sm">
              <p className="text-gray-500">
                  Didn't receive the code?{' '}
                  <button 
                    type="button" 
                    onClick={handleResend}
                    disabled={isResending}
                    className="text-blue-600 font-semibold hover:underline bg-transparent border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                      {isResending ? 'Sending...' : 'Click to resend'}
                  </button>
              </p>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
}