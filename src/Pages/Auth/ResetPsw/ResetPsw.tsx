
import { CheckCircle2 } from 'lucide-react';
import AuthLayout from '../../../Layout/AuthLayout';
import PasswordInput from '../../../Components/ui/PasswordInput';
import PrimaryButton from '../../../Components/ui/Button';

export default function ResetPassword() {
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

      <form onSubmit={(e) => e.preventDefault()}>
        
        <PasswordInput 
          id="password" 
          label="New Password" 
          placeholder="Enter new password"
        />
        
        <PasswordInput 
          id="confirm_password" 
          label="Confirm Password" 
          placeholder="Confirm new password"
        />

        {/* Password Requirements Hint */}
        <div className="mb-8 text-sm text-gray-500">
           <p className="mb-2">Password must contain:</p>
           <ul className="space-y-1 pl-1">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-green-600"/> 
                At least 8 characters
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-green-600"/> 
                At least 1 number
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-gray-400"/> 
                Both upper and lower case letters
              </li>
           </ul>
        </div>

        <div className="mb-6">
          <PrimaryButton>Reset Password</PrimaryButton>
        </div>

        <div className="text-center text-sm text-gray-600">
          <a href="#" className="flex items-center justify-center gap-2 text-gray-500 hover:text-gray-900">
            Back to log in
          </a>
        </div>

      </form>
    </AuthLayout>
  );
}