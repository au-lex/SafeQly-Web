import type { ReactNode } from 'react';

interface PrimaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const PrimaryButton = ({ 
  children, 
  onClick, 
  type = 'button',
  disabled = false
}: PrimaryButtonProps) => (
  <button 
    type={type}
    onClick={onClick}
    disabled={disabled}
    className="w-full bg-[#053014] text-white font-semibold py-4 rounded-lg hover:bg-green-900 transition-colors shadow-lg active:scale-[0.99] transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#053014] disabled:active:scale-100"
  >
    {children}
  </button>
);

export default PrimaryButton;