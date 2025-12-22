import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosInstance from '../Config/axios';
import { API_ENDPOINTS } from '../Config/Api';

// --- TYPES ---
export interface Dispute {
  id: number;
  escrow_id: number;
  raised_by: number;
  reason: DisputeReason;
  description: string;
  evidence?: string;
  evidence_public_id?: string;
  evidence_file_name?: string;
  status: DisputeStatus;
  resolution?: string;
  resolved_by?: number;
  created_at: string;
  updated_at: string;
  resolved_at?: string;
  escrow?: any;
  user?: any; 
}

export type DisputeStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export type DisputeReason = 
  | 'item_not_received'
  | 'item_significantly_not_as_described'
  | 'item_arrived_damaged'
  | 'incorrect_item_received'
  | 'other';

export interface RaiseDisputeData {
  escrow_id: number;
  reason: DisputeReason;
  description: string;
  evidence?: File;
}

export interface ResolveDisputeData {
  resolution: string;
  winner: 'buyer' | 'seller';
}

export interface DisputeResponse {
  message: string;
  dispute: Dispute;
}

export interface DisputesListResponse {
  disputes: Dispute[];
  count: number;
}

export interface UploadEvidenceResponse {
  message: string;
  file_url: string;
  public_id: string;
  filename: string;
}

// --- UTILITY FUNCTIONS ---
const handleApiError = (error: any) => {
  const message = error.response?.data?.error || error.message || 'Something went wrong';
  toast.error(message);
};

// --- QUERY KEYS ---
export const DISPUTE_QUERY_KEYS = {
  all: ['disputes'] as const,
  lists: () => [...DISPUTE_QUERY_KEYS.all, 'list'] as const,
  list: (filters?: string) => [...DISPUTE_QUERY_KEYS.lists(), filters] as const,
  details: () => [...DISPUTE_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...DISPUTE_QUERY_KEYS.details(), id] as const,
};

// --- HOOKS ---

// Get All Disputes for Current User
export function useGetMyDisputes() {
  return useQuery({
    queryKey: DISPUTE_QUERY_KEYS.lists(),
    queryFn: async (): Promise<DisputesListResponse> => {
      const response = await axiosInstance.get<DisputesListResponse>(
        API_ENDPOINTS.DISPUTES.MY_DISPUTES
      );
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 1,
  });
}

// Get Dispute by ID
export function useGetDisputeById(id: string) {
  return useQuery({
    queryKey: DISPUTE_QUERY_KEYS.detail(id),
    queryFn: async (): Promise<Dispute> => {
      const response = await axiosInstance.get<{ dispute: Dispute }>(
        API_ENDPOINTS.DISPUTES.BY_ID(id)
      );
      return response.data.dispute;
    },
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
    retry: 1,
  });
}

// Raise Dispute Hook
export function useRaiseDispute() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (disputeData: RaiseDisputeData): Promise<DisputeResponse> => {
      const formData = new FormData();
      formData.append('escrow_id', disputeData.escrow_id.toString());
      formData.append('reason', disputeData.reason);
      formData.append('description', disputeData.description);
      
      if (disputeData.evidence) {
        formData.append('evidence', disputeData.evidence);
      }

      const response = await axiosInstance.post<DisputeResponse>(
        API_ENDPOINTS.DISPUTES.RAISE,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: DISPUTE_QUERY_KEYS.lists() });
      // Also invalidate escrows since escrow status changes
      queryClient.invalidateQueries({ queryKey: ['escrows'] });
      toast.success(data.message || 'Dispute raised successfully!');
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}

// Upload Dispute Evidence Hook (separate upload)
export function useUploadDisputeEvidence() {
  return useMutation({
    mutationFn: async (file: File): Promise<UploadEvidenceResponse> => {
      const formData = new FormData();
      formData.append('evidence', file);

      const promise = axiosInstance.post<UploadEvidenceResponse>(
        API_ENDPOINTS.DISPUTES.UPLOAD_EVIDENCE,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      toast.promise(promise, {
        loading: 'Uploading evidence...',
        success: 'Evidence uploaded!',
        error: (err) => err.response?.data?.error || 'Upload failed',
      });

      const response = await promise;
      return response.data;
    },
  });
}

// Resolve Dispute Hook (Admin only)
export function useResolveDispute(disputeId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (resolveData: ResolveDisputeData): Promise<DisputeResponse> => {
      const response = await axiosInstance.post<DisputeResponse>(
        API_ENDPOINTS.ADMIN.RESOLVE_DISPUTE(disputeId),
        resolveData
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: DISPUTE_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: ['escrows'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'disputes'] });
      toast.success(data.message || 'Dispute resolved successfully!');
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}

// Get All Disputes (Admin)
export function useGetAllDisputes() {
  return useQuery({
    queryKey: ['admin', 'disputes'],
    queryFn: async (): Promise<DisputesListResponse> => {
      const response = await axiosInstance.get<DisputesListResponse>(
        API_ENDPOINTS.ADMIN.DISPUTES
      );
      return response.data;
    },
    staleTime: 2 * 60 * 1000,
    retry: 1,
  });
}

// Get Dispute by ID (Admin)
export function useGetAdminDisputeById(id: string) {
  return useQuery({
    queryKey: ['admin', 'disputes', id],
    queryFn: async (): Promise<Dispute> => {
      const response = await axiosInstance.get<{ dispute: Dispute }>(
        API_ENDPOINTS.ADMIN.DISPUTE_BY_ID(id)
      );
      return response.data.dispute;
    },
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
    retry: 1,
  });
}