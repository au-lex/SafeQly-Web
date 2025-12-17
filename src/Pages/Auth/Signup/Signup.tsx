import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../../Layout/AuthLayout';
import TextInput from '../../../Components/ui/TextInput';
import PasswordInput from '../../../Components/ui/PasswordInput';
import PrimaryButton from '../../../Components/ui/Button';
import PhoneInput from '../../../Components/ui/PhoneInput';
import { useSignup } from '../../../Hooks/useAuth';
import type { SignupData } from '../../../types';

export default function Signup() {
  const [formData, setFormData] = useState<SignupData>({
    full_name: '',
    email: '',
    phone: '',
    password: '',
  });

  const { mutate: signup, isPending } = useSignup();

  const handleInputChange = (field: keyof SignupData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.full_name || !formData.email || !formData.phone || !formData.password) {
      alert('Please fill in all fields');
      return;
    }

    signup(formData);
  };

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

      <form onSubmit={handleSubmit}>
        <TextInput 
          id="full_name" 
          label="Full Name / Business Name" 
          placeholder="e.g. Hydro Logistics Ltd"
          value={formData.full_name}
          onChange={(e) => handleInputChange('full_name', e.target.value)}
        />
        
        <TextInput 
          id="email" 
          label="Email Address" 
          placeholder="name@company.com" 
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
        />
        
        <PhoneInput 
          value={formData.phone}
          onChange={(value) => handleInputChange('phone', value)}
        />
        
        <PasswordInput 
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
        />

        <div className="mt-6 text-sm text-gray-500 leading-relaxed">
          By creating an account, you agree to our{' '}
          <a href="#" className="text-gray-900 font-semibold hover:underline">Privacy Policy</a>
          {' '}and{' '}
          <a href="#" className="text-gray-900 font-semibold hover:underline">Terms of use</a>.
        </div>

        <div className="mt-8">
          <PrimaryButton type="submit" disabled={isPending}>
            {isPending ? 'Creating Account...' : 'Create Account'}
          </PrimaryButton>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-[#053014] font-semibold hover:underline">Log in</Link>
        </div>
      </form>
    </AuthLayout>
  );
}