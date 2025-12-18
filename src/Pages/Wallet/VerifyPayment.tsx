import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useVerifyPayment } from '../../Hooks/useWallet';

import { CheckCircle, HandCoins, Loader2, XCircle } from 'lucide-react';


const PaymentCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const verifyPayment = useVerifyPayment();
  const [status, setStatus] = useState<'verifying' | 'success' | 'failed'>('verifying');

  useEffect(() => {
    const reference = searchParams.get('reference');
    
    if (!reference) {
      setStatus('failed');
      return;
    }


    verifyPayment.mutate(reference, {
      onSuccess: (data) => {
        console.log(data);
        setStatus('success');

        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      },
      onError: () => {
        setStatus('failed');
      }
    });
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 ">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
        {status === 'verifying' && (
          <>
            <div className="w-20 h-20 mx-auto mb-6  flex items-center justify-center border-2 rounded-full border-pri">

              <HandCoins size="40"  className="text-pri a" />
            </div>
            <h2 className="text-2xl font-bold text-pri mb-2">Verifying Payment</h2>
            <p className="text-gray-600 mb-6">Please wait while we confirm your payment...</p>
            <div className="flex justify-center">
              <div className="animate-spin ">
                <Loader2 size="32" className="text-pri" />
              </div>
            </div>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-20 h-20 mx-auto mb-6 bg-pri/5 rounded-full flex items-center justify-center">
              <CheckCircle size="40" className="text-pri" />
            </div>
            <h2 className="text-2xl font-bold text-pri mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">
              Your wallet has been credited successfully. You will be redirected to your dashboard shortly.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-pri hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors"
            >
              Go to Dashboard
            </button>
          </>
        )}

        {status === 'failed' && (
          <>
            <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle size="40" className="text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-pri mb-2">Payment Failed</h2>
            <p className="text-gray-600 mb-6">
              We couldn't verify your payment. If money was deducted, please contact support.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold transition-colors"
              >
                Go Back
              </button>
              <button
                onClick={() => window.location.reload()}
                className="flex-1 bg-pri hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors"
              >
                Try Again
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentCallback;