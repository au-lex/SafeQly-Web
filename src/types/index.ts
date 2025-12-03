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
  id: string;
  type: TransactionType;
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