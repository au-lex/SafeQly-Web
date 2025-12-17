// types.ts
export interface UserInfo {
  name: string;
  tag: string;
  avatar: string;
}

export interface ConfirmUserModalProps {
  visible: boolean;
  userInfo: UserInfo | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface TransactionSummaryModalProps {
  visible: boolean;
  userInfo: UserInfo | null;
  amount: string;
  items: string;
  deliveryDate: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export type EscrowStep = 'enterTag' | 'createEscrow';



export interface TransactionRequest {
  id: string;
  tag: string;
  name: string;
  avatar: string;
  amount: number;
  items: string;
  timestamp: string;
}

export interface RecentTransaction {
  id: string;
  tag: string;
  name: string;
  avatar: string;
  amount: number;
  items: string;
  status: 'Pending' | 'Completed' | 'Declined';
  timestamp: string;
}

export interface TransactionRequestCardProps {
  request: TransactionRequest;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
  onViewInfo: (id: string) => void;
}

export interface RecentTransactionItemProps {
  transaction: RecentTransaction;
  onClick: (id: string) => void;
}



// types.ts
export interface TransactionDetails {
  id: string;
  amount: number;
  userName: string;
  userTag: string;
  userAvatar: string;
  status: 'Pending' | 'Completed' | 'Declined';
  transactionFee: number;
  estimatedDeliveryDate: string;
  items: string;
}

export interface ProgressStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
  timestamp?: string;
}

export interface TransactionInfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  iconBgColor?: string;
}

export interface ProgressStepItemProps {
  step: ProgressStep;
  isLast: boolean;
}


// types.ts
export type TransactionType = 'wallet_funded' | 'money_withdrawn' | 'escrow_payment' | 'escrow_received';

export interface Transaction {
  idd: string;
  typee: TransactionType;
  title: string;
  description: string;
  amount: number;
  timestamp: string;
  category: 'escrow' | 'wallet';
}

export interface TransactionItemProps {
  transaction: Transaction;
  onClick: (id: string) => void;
}

export type TabType = 'escrow' | 'wallet';



// types.ts
export interface SettingsOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBgColor: string;
  action: () => void;
  showArrow?: boolean;
}

export interface SettingsItemProps {
  option: SettingsOption;
}

export interface UserProfile {
  name: string;
  avatar: string;
}



// TypeScript Interfaces for Authentication
export interface SignupData {
  full_name: string;
  email: string;
  phone: string;
  password: string;
}

export interface VerifyOTPData {
  email: string;
  otp: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  email: string;
  otp: string;
  new_password: string;
}

export interface User {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  user_tag: string;
  balance: number;
  created_at: string;
}

export interface AuthResponse {
  message: string;
  token?: string;
  user?: User;
  email?: string;
}



// Wallet Types
export interface WalletBalance {
  available_balance: number;
  escrow_balance: number;
  total_balance: number;
  user: {
    id: number;
    full_name: string;
    email: string;
    user_tag: string;
  };
}

export interface FundAccountData {
  amount: number;
  payment_method: string;
  payment_provider?: string;
}

export interface FundAccountResponse {
  message: string;
  transaction: {
    id: number;
    reference: string;
    amount: number;
    status: string;
    payment_method: string;
  };
  payment_info: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface WithdrawData {
  amount: number;
  bank_account_id: number;
}

export interface AddBankAccountData {
  bank_name: string;
  account_number: string;
  account_name: string;
  bank_code: string;
}

export interface BankAccount {
  id: number;
  user_id: number;
  bank_name: string;
  account_number: string;
  account_name: string;
  bank_code: string;
  recipient_code: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: number;
  user_id: number;
  type: string;
  amount: number;
  status: string;
  reference: string;
  description: string;
  payment_method?: string;
  payment_provider?: string;
  bank_name?: string;
  account_number?: string;
  account_name?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Bank {
  id: number;
  name: string;
  slug: string;
  code: string;
  longcode: string;
  gateway: string;
  pay_with_bank: boolean;
  active: boolean;
  is_deleted: boolean;
  country: string;
  currency: string;
  type: string;
}

export interface ResolveAccountData {
  account_number: string;
  bank_code: string;
}