import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../../Layout/AuthLayout';
import TextInput from '../../../Components/ui/TextInput';
import PrimaryButton from '../../../Components/ui/Button';
import { useForgotPassword } from '../../../Hooks/useAuth';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email) {
      alert('Please enter your email address');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    forgotPassword(email);
  };

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
        <Link 
          to="/login" 
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-6"
        >
           <ChevronLeft size={16} className="mr-1" /> Back to log in
        </Link>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Forgot password?</h2>
        <p className="text-gray-500 text-sm md:text-base">
          No worries, we'll send you reset instructions.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mt-8">
          <TextInput 
            id="email" 
            label="Email Address" 
            placeholder="Enter your email" 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <PrimaryButton type="submit" disabled={isPending}>
            {isPending ? 'Sending...' : 'Reset Password'}
          </PrimaryButton>
        </div>
      </form>
    </AuthLayout>
  );
}