

import AuthLayout from '../../../Layout/AuthLayout';
import TextInput from '../../../Components/ui/TextInput';
import PasswordInput from '../../../Components/ui/PasswordInput';
import PrimaryButton from '../../../Components/ui/Button';
import PhoneInput from '../../../Components/ui/PhoneInput';
import { Link, useNavigate } from 'react-router-dom';



export default function Signup() {
  const navigate = useNavigate();
  return (
    <AuthLayout 
      marketingProps={{
        title: (
          <>
            Trustless Payments <br />
            Built for Business
          </>
        ),
        subtitle: "Create an account to start safeguarding your transactions with our secure escrow infrastructure."
      }}
    >
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Create your account</h2>
        <p className="text-gray-500 text-sm md:text-base">
          Join thousands of businesses using SafeQly for secure payments.
        </p>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <TextInput 
          id="businessName" 
          label="Full Name / Business Name" 
          placeholder="e.g. Hydro Logistics Ltd" 
        />
        
        <TextInput 
          id="email" 
          label="Email Address" 
          placeholder="name@company.com" 
          type="email"
        />
        
        <PhoneInput />
        
        <PasswordInput />

        <div className="mt-6 text-sm text-gray-500 leading-relaxed">
          By creating an account, you agree to our{' '}
          <a href="#" className="text-gray-900 font-semibold hover:underline">Privacy Policy</a>
          {' '}and{' '}
          <a href="#" className="text-gray-900 font-semibold hover:underline">Terms of use</a>.
        </div>

        <div className="mt-8">
          <PrimaryButton onClick={() => navigate('/dashboard')}>Create Account</PrimaryButton>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-[#053014] font-semibold hover:underline">Log in</Link>
        </div>
      </form>
    </AuthLayout>
  );
}