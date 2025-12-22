import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosInstance from '../Config/axios';
import { API_ENDPOINTS } from '../Config/Api';

// ============= TYPES =============

export interface AdminLoginRequest {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  message: string;
  token: string;
  user: {
    id: number;
    full_name: string;
    email: string;
    role: string;
    user_tag: string;
  };
}

export interface CreateAdminRequest {
  full_name: string;
  email: string;
  phone: string;
  password: string;
}

export interface InitializeAdminRequest extends CreateAdminRequest {
  setup_key: string;
}

export interface AdminResponse {
  message?: string;
  admin: {
    id: number;
    full_name: string;
    email: string;
    phone?: string;
    user_tag: string;
    role: string;
    is_email_verified?: boolean;
    created_at?: string;
  };
}

export interface AdminProfileResponse {
  admin: {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    user_tag: string;
    role: string;
    is_email_verified: boolean;
    created_at: string;
  };
}

export interface User {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  user_tag: string;
  role: string;
  balance: number;
  escrow_balance: number;
  is_email_verified: boolean;
  is_suspended: boolean;
  suspended_at?: string;
  suspend_reason?: string;
  created_at: string;
  updated_at: string;
}

export interface UsersResponse {
  users: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface UserResponse {
  user: User;
}

export interface UpdateUserRequest {
  email?: string;
  phone_number?: string;
  is_verified?: boolean;
}

export interface SuspendUserRequest {
  reason: string;
}

export interface Transaction {
  id: number;
  user_id: number;
  escrow_id?: number;
  type: string;
  amount: number;
  status: string;
  reference: string;
  description?: string;
  payment_method?: string;
  payment_provider?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
  user?: User;
  Escrow?: any;

}

export interface TransactionsResponse {
  transactions: Transaction[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface Dispute {
  id: number;
  escrow_id: number;
  raised_by: number;
  reason: string;
  status: string;
  resolution?: string;
  winner?: string;
  resolved_at?: string;
  resolved_by?: number;
  created_at: string;
  Escrow?: any;
}

export interface DisputesResponse {
  disputes: Dispute[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface DisputeResponse {
  dispute: Dispute;
}

export interface ResolveDisputeRequest {
  resolution: string;
  winner: 'buyer' | 'seller';
}

export interface DashboardStats {
  stats: {
    total_users: number;
    active_users: number;
    suspended_users: number;
    total_escrows: number;
    active_escrows: number;
    completed_escrows: number;
    total_disputes: number;
    pending_disputes: number;
    resolved_disputes: number;
    total_transactions: number;
  };
}

// ============= UTILITY FUNCTIONS =============

interface ApiError {
  response?: {
    data?: {
      error?: string;
    };
  };
  message?: string;
}

const handleApiError = (error: unknown) => {
  const apiError = error as ApiError;
  const message = apiError.response?.data?.error || apiError.message || 'Something went wrong';
  toast.error(message);
};

// ============= QUERY KEYS =============

export const ADMIN_QUERY_KEYS = {
  all: ['admin'] as const,
  profile: () => [...ADMIN_QUERY_KEYS.all, 'profile'] as const,
  dashboard: () => [...ADMIN_QUERY_KEYS.all, 'dashboard'] as const,
  users: () => [...ADMIN_QUERY_KEYS.all, 'users'] as const,
  usersList: (page?: number, limit?: number) => 
    [...ADMIN_QUERY_KEYS.users(), 'list', { page, limit }] as const,
  userDetail: (id: string) => [...ADMIN_QUERY_KEYS.users(), 'detail', id] as const,
  transactions: () => [...ADMIN_QUERY_KEYS.all, 'transactions'] as const,
  transactionsList: (page?: number, limit?: number, status?: string, type?: string) => 
    [...ADMIN_QUERY_KEYS.transactions(), 'list', { page, limit, status, type }] as const,
  disputes: () => [...ADMIN_QUERY_KEYS.all, 'disputes'] as const,
  disputesList: (page?: number, limit?: number, status?: string) => 
    [...ADMIN_QUERY_KEYS.disputes(), 'list', { page, limit, status }] as const,
  disputeDetail: (id: string) => [...ADMIN_QUERY_KEYS.disputes(), 'detail', id] as const,
};

// ============= AUTH HOOKS =============

// Admin Login
export function useAdminLogin() {
  return useMutation({
    mutationFn: async (data: AdminLoginRequest): Promise<AdminLoginResponse> => {
      const response = await axiosInstance.post<AdminLoginResponse>(
        API_ENDPOINTS.ADMIN.AUTH.LOGIN,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Login successful!');
      // Store token in localStorage with correct key
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}

// Initialize First Admin
export function useInitializeAdmin() {
  return useMutation({
    mutationFn: async (data: InitializeAdminRequest): Promise<AdminResponse> => {
      const response = await axiosInstance.post<AdminResponse>(
        API_ENDPOINTS.ADMIN.AUTH.INITIALIZE,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Admin account initialized successfully!');
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}

// Create Admin
export function useCreateAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateAdminRequest): Promise<AdminResponse> => {
      const response = await axiosInstance.post<AdminResponse>(
        API_ENDPOINTS.ADMIN.CREATE,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.users() });
      toast.success(data.message || 'Admin created successfully!');
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}

// ============= PROFILE HOOKS =============

// Get Admin Profile
export function useGetAdminProfile() {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.profile(),
    queryFn: async (): Promise<AdminProfileResponse> => {
      const response = await axiosInstance.get<AdminProfileResponse>(
        API_ENDPOINTS.ADMIN.PROFILE
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}

// ============= DASHBOARD HOOKS =============

// Get Dashboard Stats
export function useGetDashboardStats() {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.dashboard(),
    queryFn: async (): Promise<DashboardStats> => {
      const response = await axiosInstance.get<DashboardStats>(
        API_ENDPOINTS.ADMIN.DASHBOARD
      );
      return response.data;
    },
    staleTime: 30 * 1000, // 30 seconds
    retry: 1,
  });
}

// ============= USER MANAGEMENT HOOKS =============

// Get All Users
export function useGetAllUsers(page = 1, limit = 20) {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.usersList(page, limit),
    queryFn: async (): Promise<UsersResponse> => {
      const response = await axiosInstance.get<UsersResponse>(
        API_ENDPOINTS.ADMIN.USERS,
        { params: { page, limit } }
      );
      return response.data;
    },
    staleTime: 30 * 1000,
    retry: 1,
  });
}

// Get User by ID
export function useGetUserById(userId: string) {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.userDetail(userId),
    queryFn: async (): Promise<UserResponse> => {
      const response = await axiosInstance.get<UserResponse>(
        API_ENDPOINTS.ADMIN.USER_BY_ID(userId)
      );
      return response.data;
    },
    enabled: !!userId,
    staleTime: 30 * 1000,
    retry: 1,
  });
}

// Update User
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      userId, 
      data 
    }: { 
      userId: string; 
      data: UpdateUserRequest 
    }): Promise<UserResponse> => {
      const response = await axiosInstance.put<UserResponse>(
        API_ENDPOINTS.ADMIN.UPDATE_USER(userId),
        data
      );
      return response.data;
    },
    onSuccess: (data, { userId }) => {
      console.log(data);
      
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.users() });
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.userDetail(userId) });
      toast.success('User updated successfully!');
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}

// Suspend User
export function useSuspendUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      userId, 
      reason 
    }: { 
      userId: string; 
      reason: string 
    }): Promise<{ message: string }> => {
      const response = await axiosInstance.post<{ message: string }>(
        API_ENDPOINTS.ADMIN.SUSPEND_USER(userId),
        { reason }
      );
      return response.data;
    },
    onSuccess: (data, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.users() });
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.userDetail(userId) });
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.dashboard() });
      toast.success(data.message || 'User suspended successfully!');
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}

// Unsuspend User
export function useUnsuspendUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string): Promise<{ message: string }> => {
      const response = await axiosInstance.post<{ message: string }>(
        API_ENDPOINTS.ADMIN.UNSUSPEND_USER(userId)
      );
      return response.data;
    },
    onSuccess: (data, userId) => {
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.users() });
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.userDetail(userId) });
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.dashboard() });
      toast.success(data.message || 'User unsuspended successfully!');
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}

// Delete User
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string): Promise<{ message: string }> => {
      const response = await axiosInstance.delete<{ message: string }>(
        API_ENDPOINTS.ADMIN.DELETE_USER(userId)
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.users() });
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.dashboard() });
      toast.success(data.message || 'User deleted successfully!');
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}

// ============= TRANSACTION MANAGEMENT HOOKS =============

// Get All Transactions
export function useGetAllTransactions(
  page = 1, 
  limit = 20, 
  status?: string, 
  type?: string
) {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.transactionsList(page, limit, status, type),
    queryFn: async (): Promise<TransactionsResponse> => {
      const params: Record<string, string | number> = { page, limit };
      if (status) params.status = status;
      if (type) params.type = type;

      const response = await axiosInstance.get<TransactionsResponse>(
        API_ENDPOINTS.ADMIN.TRANSACTIONS,
        { params }
      );
      return response.data;
    },
    staleTime: 30 * 1000,
    retry: 1,
  });
}

// ============= DISPUTE MANAGEMENT HOOKS =============

// Get All Disputes
export function useGetAllDisputes(page = 1, limit = 20, status?: string) {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.disputesList(page, limit, status),
    queryFn: async (): Promise<DisputesResponse> => {
      const params: Record<string, string | number> = { page, limit };
      if (status) params.status = status;

      const response = await axiosInstance.get<DisputesResponse>(
        API_ENDPOINTS.ADMIN.DISPUTES,
        { params }
      );
      return response.data;
    },
    staleTime: 30 * 1000,
    retry: 1,
  });
}

// Get Dispute by ID
export function useGetDisputeById(disputeId: string) {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.disputeDetail(disputeId),
    queryFn: async (): Promise<DisputeResponse> => {
      const response = await axiosInstance.get<DisputeResponse>(
        API_ENDPOINTS.ADMIN.DISPUTE_BY_ID(disputeId)
      );
      return response.data;
    },
    enabled: !!disputeId,
    staleTime: 30 * 1000,
    retry: 1,
  });
}

// Resolve Dispute
export function useResolveDispute() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      disputeId, 
      data 
    }: { 
      disputeId: string; 
      data: ResolveDisputeRequest 
    }): Promise<DisputeResponse> => {
      const response = await axiosInstance.post<DisputeResponse>(
        API_ENDPOINTS.ADMIN.RESOLVE_DISPUTE(disputeId),
        data
      );
      return response.data;
    },
    onSuccess: (data, { disputeId }) => {
      console.log(data);
      
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.disputes() });
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.disputeDetail(disputeId) });
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.dashboard() });
      toast.success('Dispute resolved successfully!');
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}