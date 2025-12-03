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