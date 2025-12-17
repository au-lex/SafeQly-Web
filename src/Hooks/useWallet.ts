import { useMutation, useQuery } from '@tanstack/react-query';
import axiosInstance from '../Config/axios';
import { API_ENDPOINTS } from '../Config/Api';
import type {
  WalletBalance,
  FundAccountData,
  FundAccountResponse,
  WithdrawData,
  AddBankAccountData,
  BankAccount,
  Transaction,
  Bank,
  ResolveAccountData,
} from '../types';

const showAlert = (title: string, message: string): void => {
  alert(`${title}: ${message}`);
};

// ============================================================================
// WALLET BALANCE
// ============================================================================

export function useGetWalletBalance() {
  return useQuery({
    queryKey: ['walletBalance'],
    queryFn: async (): Promise<WalletBalance> => {
      const response = await axiosInstance.get<WalletBalance>(
        API_ENDPOINTS.WALLET.BALANCE
      );
      return response.data;
    },
    retry: 1,
    staleTime: 30000, // 30 seconds
  });
}

// ============================================================================
// FUNDING / DEPOSITS
// ============================================================================

export function useFundAccount() {
  return useMutation({
    mutationFn: async (fundData: FundAccountData): Promise<FundAccountResponse> => {
      const response = await axiosInstance.post<FundAccountResponse>(
        API_ENDPOINTS.WALLET.FUND,
        fundData
      );
      return response.data;
    },
    onSuccess: (data) => {
      showAlert('Success', data.message);
      // Redirect to Paystack payment page
      if (data.payment_info?.authorization_url) {
        window.location.href = data.payment_info.authorization_url;
      }
    },
    onError: (error: Error) => {
      showAlert('Funding Failed', error.message);
    },
  });
}

export function useVerifyPayment() {
  return useMutation({
    mutationFn: async (reference: string) => {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.WALLET.PAYSTACK_CALLBACK}?reference=${reference}`
      );
      return response.data;
    },
    onSuccess: (data) => {
      showAlert('Success', data.message);
    },
    onError: (error: Error) => {
      showAlert('Verification Failed', error.message);
    },
  });
}

// ============================================================================
// BANKS
// ============================================================================

export function useGetBanks() {
  return useQuery({
    queryKey: ['banks'],
    queryFn: async (): Promise<Bank[]> => {
      const response = await axiosInstance.get<Bank[]>(
        API_ENDPOINTS.WALLET.BANKS
      );
      return response.data;
    },
    staleTime: 3600000, // 1 hour (banks don't change often)
  });
}

export function useResolveAccountNumber() {
  return useMutation({
    mutationFn: async (data: ResolveAccountData) => {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.WALLET.RESOLVE_ACCOUNT}?account_number=${data.account_number}&bank_code=${data.bank_code}`
      );
      return response.data;
    },
    onError: (error: Error) => {
      showAlert('Account Resolution Failed', error.message);
    },
  });
}

// ============================================================================
// BANK ACCOUNTS
// ============================================================================

export function useAddBankAccount() {
  return useMutation({
    mutationFn: async (bankData: AddBankAccountData) => {
      const response = await axiosInstance.post(
        API_ENDPOINTS.WALLET.BANK_ACCOUNTS,
        bankData
      );
      return response.data;
    },
    onSuccess: (data) => {
      showAlert('Success', data.message);
    },
    onError: (error: Error) => {
      showAlert('Add Bank Account Failed', error.message);
    },
  });
}

export function useGetBankAccounts() {
  return useQuery({
    queryKey: ['bankAccounts'],
    queryFn: async (): Promise<BankAccount[]> => {
      const response = await axiosInstance.get<BankAccount[]>(
        API_ENDPOINTS.WALLET.BANK_ACCOUNTS
      );
      return response.data;
    },
    staleTime: 60000, // 1 minute
  });
}

export function useSetDefaultBankAccount() {
  return useMutation({
    mutationFn: async (accountId: number) => {
      const response = await axiosInstance.put(
        API_ENDPOINTS.WALLET.BANK_ACCOUNT_DEFAULT(accountId)
      );
      return response.data;
    },
    onSuccess: (data) => {
      showAlert('Success', data.message);
    },
    onError: (error: Error) => {
      showAlert('Update Failed', error.message);
    },
  });
}

export function useDeleteBankAccount() {
  return useMutation({
    mutationFn: async (accountId: number) => {
      const response = await axiosInstance.delete(
        API_ENDPOINTS.WALLET.BANK_ACCOUNT_DELETE(accountId)
      );
      return response.data;
    },
    onSuccess: (data) => {
      showAlert('Success', data.message);
    },
    onError: (error: Error) => {
      showAlert('Delete Failed', error.message);
    },
  });
}

// ============================================================================
// WITHDRAWALS
// ============================================================================

export function useWithdrawFunds() {
  return useMutation({
    mutationFn: async (withdrawData: WithdrawData) => {
      const response = await axiosInstance.post(
        API_ENDPOINTS.WALLET.WITHDRAW,
        withdrawData
      );
      return response.data;
    },
    onSuccess: (data) => {
      showAlert('Success', data.message);
    },
    onError: (error: Error) => {
      showAlert('Withdrawal Failed', error.message);
    },
  });
}

// ============================================================================
// TRANSACTIONS
// ============================================================================

export function useGetTransactionHistory(type?: string) {
  return useQuery({
    queryKey: ['transactions', type],
    queryFn: async (): Promise<Transaction[]> => {
      const url = type 
        ? `${API_ENDPOINTS.WALLET.TRANSACTIONS}?type=${type}`
        : API_ENDPOINTS.WALLET.TRANSACTIONS;
      
      const response = await axiosInstance.get<Transaction[]>(url);
      return response.data;
    },
    staleTime: 30000, // 30 seconds
  });
}

export function useGetTransactionByID() {
  return useMutation({
    mutationFn: async (transactionId: number): Promise<Transaction> => {
      const response = await axiosInstance.get<Transaction>(
        API_ENDPOINTS.WALLET.TRANSACTION_BY_ID(transactionId)
      );
      return response.data;
    },
    onError: (error: Error) => {
      showAlert('Error', error.message);
    },
  });
}

export function useGetTransactionByReference() {
  return useMutation({
    mutationFn: async (reference: string): Promise<Transaction> => {
      const response = await axiosInstance.get<Transaction>(
        `${API_ENDPOINTS.WALLET.TRANSACTION_BY_REFERENCE}?reference=${reference}`
      );
      return response.data;
    },
    onError: (error: Error) => {
      showAlert('Error', error.message);
    },
  });
}