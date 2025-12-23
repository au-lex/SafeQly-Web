import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useGoogleCallback } from '../../../Hooks/useAuth';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

export default function GoogleCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { mutate: completeGoogleLogin, } = useGoogleCallback();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const hasAttemptedRef = useRef(false); 
  useEffect(() => {
    // Prevent multiple executions using ref
    if (hasAttemptedRef.current) {
      console.log('Google callback already attempted, skipping...');
      return;
    }

    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');
    const storedState = localStorage.getItem('google_oauth_state');

    // Handle error from Google
    if (error) {
      const errorDescription = searchParams.get('error_description') || 'Google authentication was cancelled or failed';
      setErrorMessage(errorDescription);
      toast.error(errorDescription);
      hasAttemptedRef.current = true;
      setTimeout(() => navigate('/login'), 3000);
      return;
    }

    // If no code, redirect to login
    if (!code) {
      setErrorMessage('No authorization code received');
      toast.error('No authorization code received');
      hasAttemptedRef.current = true;
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    // Validate state to prevent CSRF attacks (optional check)
    if (storedState && state && state !== storedState) {
      setErrorMessage('Invalid authentication state. Please try again.');
      toast.error('Invalid authentication state. Please try again.');
      hasAttemptedRef.current = true;
      setTimeout(() => navigate('/login'), 3000);
      return;
    }

    // Mark as attempted and complete the Google login
    hasAttemptedRef.current = true;
    console.log('Completing Google login with code:', code.substring(0, 20) + '...');
    completeGoogleLogin({ code, state: state || '' });
  }, []); // Empty deps to run only once

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md px-4">
        {errorMessage ? (
          <>
            {/* Error Icon */}
            <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Authentication Failed
            </h2>
            <p className="text-gray-600 mb-4">{errorMessage}</p>
            <p className="text-sm text-gray-500">Redirecting to login...</p>
          </>
        ) : (
          <>
            {/* Loading Spinner */}
            <div className="inline-block  ">
              <Loader2 className="animate-spin text-pri  h-12 w-12" />
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Completing Google Sign In...
            </h2>
            <p className="text-gray-600">
              Please wait while we authenticate your account
            </p>
          </>
        )}
      </div>
    </div>
  );
}