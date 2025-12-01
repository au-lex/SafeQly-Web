
import { ChevronLeft } from 'lucide-react';
import AuthLayout from '../../../Layout/AuthLayout';
import TextInput from '../../../Components/ui/TextInput';
import PrimaryButton from '../../../Components/ui/Button';

export default function ForgotPassword() {
  return (
    <AuthLayout 
      marketingProps={{
        title: (
          <>
            Recover Your <br />
            Account Access
          </>
        ),
        subtitle: "Don't worry, it happens to the best of us. We'll help you get back to your secure payments in no time."
      }}
    >
      <div className="mb-2">
        <a href="#" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-6">
           <ChevronLeft size={16} className="mr-1" /> Back to log in
        </a>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Forgot password?</h2>
        <p className="text-gray-500 text-sm md:text-base">
          No worries, we'll send you reset instructions.
        </p>
      </div>

      <div className="mt-8">
        <TextInput 
          id="email" 
          label="Email Address" 
          placeholder="Enter your email" 
          type="email"
        />
        
        <PrimaryButton>Reset Password</PrimaryButton>
      </div>
    </AuthLayout>
  );
}