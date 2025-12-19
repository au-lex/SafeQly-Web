import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosInstance from '../Config/axios';
import { API_ENDPOINTS } from '../Config/Api';
import type {
  SearchUserResponse,
  CreateEscrowRequest,
  CreateEscrowResponse,
  EscrowActionResponse,
  MyEscrowsResponse,
  EscrowResponse,
  RecentUsersResponse,
} from '../types';

// ============= UTILITY FUNCTIONS =============

const handleApiError = (error: any) => {
  const message = error.response?.data?.error || error.message || 'Something went wrong';
  toast.error(message);
};

// ============= QUERY KEYS =============

export const ESCROW_QUERY_KEYS = {
  all: ['escrow'] as const,
  lists: () => [...ESCROW_QUERY_KEYS.all, 'list'] as const,
  list: (role?: 'buyer' | 'seller') => [...ESCROW_QUERY_KEYS.lists(), { role }] as const,
  details: () => [...ESCROW_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...ESCROW_QUERY_KEYS.details(), id] as const,
  recentUsers: () => [...ESCROW_QUERY_KEYS.all, 'recent-users'] as const,
};

// ============= HOOKS =============

// Search User by Tag
export function useSearchUser() {
  return useMutation({
    mutationFn: async (userTag: string): Promise<SearchUserResponse> => {
      const response = await axiosInstance.post<SearchUserResponse>(
        API_ENDPOINTS.ESCROW.SEARCH_USER,
        { user_tag: userTag }
      );
      return response.data;
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}

// Create Escrow
export function useCreateEscrow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateEscrowRequest): Promise<CreateEscrowResponse> => {
      const formData = new FormData();
      formData.append('seller_tag', data.seller_tag);
      formData.append('items', data.items);
      formData.append('amount', data.amount.toString());
      formData.append('delivery_date', data.delivery_date);
      
      if (data.file) {
        formData.append('file', data.file);
      }

      const promise = axiosInstance.post<CreateEscrowResponse>(
        API_ENDPOINTS.ESCROW.CREATE,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      toast.promise(promise, {
        loading: 'Creating escrow...',
        success: 'Escrow created successfully!',
        error: (err) => err.response?.data?.error || 'Failed to create escrow',
      });

      const response = await promise;
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ESCROW_QUERY_KEYS.lists() });
      // Also invalidate wallet balance if you have it
      queryClient.invalidateQueries({ queryKey: ['wallet', 'balance'] });
    },
  });
}

// Accept Escrow (Seller)
export function useAcceptEscrow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (escrowId: string): Promise<EscrowActionResponse> => {
      const response = await axiosInstance.post<EscrowActionResponse>(
        API_ENDPOINTS.ESCROW.ACCEPT(escrowId)
      );
      return response.data;
    },
    onSuccess: (data, escrowId) => {
      queryClient.invalidateQueries({ queryKey: ESCROW_QUERY_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: ESCROW_QUERY_KEYS.detail(escrowId) });
      toast.success(data.message || 'Escrow accepted successfully!');
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}

// Reject Escrow (Seller)
export function useRejectEscrow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      escrowId, 
      reason 
    }: { 
      escrowId: string; 
      reason: string 
    }): Promise<EscrowActionResponse> => {
      const response = await axiosInstance.post<EscrowActionResponse>(
        API_ENDPOINTS.ESCROW.REJECT(escrowId),
        { reason }
      );
      return response.data;
    },
    onSuccess: (data, { escrowId }) => {
      queryClient.invalidateQueries({ queryKey: ESCROW_QUERY_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: ESCROW_QUERY_KEYS.detail(escrowId) });
      toast.success(data.message || 'Escrow rejected successfully!');
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}

// Complete Escrow (Seller marks delivery as done)
export function useCompleteEscrow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (escrowId: string): Promise<EscrowActionResponse> => {
      const response = await axiosInstance.post<EscrowActionResponse>(
        API_ENDPOINTS.ESCROW.COMPLETE(escrowId)
      );
      return response.data;
    },
    onSuccess: (data, escrowId) => {
      queryClient.invalidateQueries({ queryKey: ESCROW_QUERY_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: ESCROW_QUERY_KEYS.detail(escrowId) });
      toast.success(data.message || 'Delivery marked as completed!');
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}

// Release Funds (Buyer confirms and releases payment)
export function useReleaseEscrow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (escrowId: string): Promise<EscrowActionResponse> => {
      const response = await axiosInstance.post<EscrowActionResponse>(
        API_ENDPOINTS.ESCROW.RELEASE(escrowId)
      );
      return response.data;
    },
    onSuccess: (data, escrowId) => {
      queryClient.invalidateQueries({ queryKey: ESCROW_QUERY_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: ESCROW_QUERY_KEYS.detail(escrowId) });
      queryClient.invalidateQueries({ queryKey: ['wallet', 'balance'] });
      toast.success(data.message || 'Funds released successfully!');
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}

// Get My Escrows
export function useGetMyEscrows(role?: 'buyer' | 'seller') {
  return useQuery({
    queryKey: ESCROW_QUERY_KEYS.list(role),
    queryFn: async (): Promise<MyEscrowsResponse> => {
      const params = role ? { role } : {};
      const response = await axiosInstance.get<MyEscrowsResponse>(
        API_ENDPOINTS.ESCROW.MY_ESCROWS,
        { params }
      );
      return response.data;
    },
    staleTime: 30 * 1000, // 30 seconds
    retry: 1,
  });
}

// Get Escrow by ID
export function useGetEscrowById(escrowId: string) {
  return useQuery({
    queryKey: ESCROW_QUERY_KEYS.detail(escrowId),
    queryFn: async (): Promise<EscrowResponse> => {
      const response = await axiosInstance.get<EscrowResponse>(
        API_ENDPOINTS.ESCROW.BY_ID(escrowId)
      );
      return response.data;
    },
    enabled: !!escrowId,
    staleTime: 30 * 1000,
    retry: 1,
  });
}

// Get Recent Escrow Users
export function useGetRecentEscrowUsers() {
  return useQuery({
    queryKey: ESCROW_QUERY_KEYS.recentUsers(),
    queryFn: async (): Promise<RecentUsersResponse> => {
      const response = await axiosInstance.get<RecentUsersResponse>(
        API_ENDPOINTS.ESCROW.RECENT_USERS
      );
      return response.data;
    },
    staleTime: 60 * 1000, // 1 minute
    retry: 1,
  });
}