import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../../Layout/AuthLayout';
import TextInput from '../../../Components/ui/TextInput';
import PasswordInput from '../../../Components/ui/PasswordInput';
import PrimaryButton from '../../../Components/ui/Button';
import { useLogin } from '../../../Hooks/useAuth';
import type { LoginCredentials } from '../../../types';

export default function Login() {
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: '',
  });

  const { mutate: login, isPending } = useLogin();

  const handleInputChange = (field: keyof LoginCredentials, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      alert('Please fill in all fields');
      return;
    }

    login(formData);
  };

  return (
    <AuthLayout 
      marketingProps={{
        title: (
          <>
            Secure Escrow <br />
            Payments for Everyone
          </>
        ),
        subtitle: "SafeQly protects your funds until the job is done. Simple, transparent, and secure."
      }}
    >
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Welcome back</h2>
        <p className="text-gray-500 text-sm md:text-base">
          Enter your details to access your SafeQly account.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <TextInput 
          id="email" 
          label="Email address" 
          placeholder="name@company.com" 
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
        />
        
        <PasswordInput 
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          rightElement={
            <Link to="/forgot-psw" className="text-sm text-green-700 font-semibold hover:text-green-800 hover:underline">
              Forgot password?
            </Link>
          }
        />

        <div className="mt-4 flex items-center">
          <input
            id="remember_me"
            type="checkbox"
            className="h-4 w-4 text-green-700 focus:ring-green-700 border-gray-300 rounded cursor-pointer"
          />
          <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900 cursor-pointer">
            Remember me for 30 days
          </label>
        </div>

        <div className="mt-8">
          <PrimaryButton type="submit" disabled={isPending}>
            {isPending ? 'Logging in...' : 'Log in'}
          </PrimaryButton>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#053014] font-semibold hover:underline">Sign up</Link>
        </div>
      </form>
    </AuthLayout>
  );
}