
import AuthLayout from '../../../Layout/AuthLayout';
import TextInput from '../../../Components/ui/TextInput';
import PasswordInput from '../../../Components/ui/PasswordInput';
import PrimaryButton from '../../../Components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
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

      <form onSubmit={(e) => e.preventDefault()}>
        <TextInput 
          id="email" 
          label="Email address" 
          placeholder="name@company.com" 
          type="email"
        />
        
        <PasswordInput 
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
          <PrimaryButton onClick={() => navigate('/dashboard')} >Log in</PrimaryButton>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#053014] font-semibold hover:underline">Sign up</Link>
        </div>
      </form>
    </AuthLayout>
  );
}