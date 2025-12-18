import toast from 'react-hot-toast';
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
      toast.success(data.message || 'Funding initiated successfully');
      
      // Redirect to Paystack payment page
      if (data.payment_info?.authorization_url) {
        window.location.href = data.payment_info.authorization_url;
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Funding failed');
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
      toast.success(data.message || 'Payment verified successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Verification failed');
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
      // 1. We tell axios the response data has a 'banks' property containing the array
      const response = await axiosInstance.get<{ banks: Bank[] }>(
        API_ENDPOINTS.WALLET.BANKS
      );
      
  
      return response.data.banks;
    },
    staleTime: 3600000, 
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
      toast.error(error.message || 'Account resolution failed');
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
      toast.success(data.message || 'Bank account added successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to add bank account');
    },
  });
}

export function useGetBankAccounts() {
  return useQuery({
    queryKey: ['bankAccounts'],
    queryFn: async (): Promise<BankAccount[]> => {
      const response = await axiosInstance.get<{bank_accounts: BankAccount[]}>(
        API_ENDPOINTS.WALLET.BANK_ACCOUNTS
      );
      console.log(response.data);
      return response.data.bank_accounts;

           // 1. We tell axios the response data has a 'banks' property containing the array
          //  const response = await axiosInstance.get<{ banks: Bank[] }>(
          //   API_ENDPOINTS.WALLET.BANKS
          // );
          
      
          // return response.data.banks;
      
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
      toast.success(data.message || 'Default bank updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update default bank');
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
      toast.success(data.message || 'Bank account deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete bank account');
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
      toast.success(data.message || 'Withdrawal successful');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Withdrawal failed');
    },
  });
}

// ============================================================================
// TRANSACTIONS
// ============================================================================
export function useGetTransactionHistory(type?: string) {
  return useQuery({
    queryKey: ['transactions', type],
    queryFn: async (): Promise<{ count: number; transactions: Transaction[] }> => {
 
      let url = API_ENDPOINTS.WALLET.TRANSACTIONS;
      

      if (type) {
        url += `?type=${type}`;
      }
      
      const response = await axiosInstance.get<{ count: number; transactions: Transaction[] }>(url);
      console.log('Transaction API Response:', response.data);
      
      return response.data;
    },
    staleTime: 30000,
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
      toast.error(error.message || 'Error fetching transaction');
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
      toast.error(error.message || 'Error fetching transaction');
    },
  });
}