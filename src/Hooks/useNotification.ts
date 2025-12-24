import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosInstance from '../Config/axios';
import { API_ENDPOINTS } from '../Config/Api';

// --- TYPES ---
export interface Notification {
  id: number;
  user_id: number;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  read_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface NotificationsResponse {
  notifications: Notification[];
  count: number;
  unread_count: number;
}

export interface UnreadCountResponse {
  unread_count: number;
}

export interface NotificationActionResponse {
  message: string;
  notification?: Notification;
}

export interface GetNotificationsParams {
  limit?: number;
  offset?: number;
  unread_only?: boolean;
}

// --- ERROR HANDLER ---
const handleApiError = (error: any) => {
  const message = error.response?.data?.error || error.message || 'Something went wrong';
  toast.error(message);
};

// --- QUERY KEYS ---
export const NOTIFICATION_QUERY_KEYS = {
  all: ['notifications'] as const,
  list: (params?: GetNotificationsParams) => ['notifications', 'list', params] as const,
  unreadCount: ['notifications', 'unread-count'] as const,
};

// --- HOOKS ---

// Get Notifications Hook
export function useGetNotifications(params?: GetNotificationsParams) {
  return useQuery({
    queryKey: NOTIFICATION_QUERY_KEYS.list(params),
    queryFn: async (): Promise<NotificationsResponse> => {
      const queryParams = new URLSearchParams();
      
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.offset) queryParams.append('offset', params.offset.toString());
      if (params?.unread_only) queryParams.append('unread_only', params.unread_only.toString());

      const response = await axiosInstance.get<NotificationsResponse>(
        `${API_ENDPOINTS.NOTIFICATIONS.LIST}?${queryParams.toString()}`
      );
      return response.data;
    },
    staleTime: 30 * 1000, // 30 seconds
    retry: 1,
  });
}

// Get Unread Count Hook
export function useGetUnreadCount() {
  return useQuery({
    queryKey: NOTIFICATION_QUERY_KEYS.unreadCount,
    queryFn: async (): Promise<number> => {
      const response = await axiosInstance.get<UnreadCountResponse>(
        API_ENDPOINTS.NOTIFICATIONS.UNREAD_COUNT
      );
      return response.data.unread_count;
    },
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // Refetch every minute
    retry: 1,
  });
}

// Mark Notification as Read Hook
export function useMarkAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: string): Promise<NotificationActionResponse> => {
      const response = await axiosInstance.put<NotificationActionResponse>(
        API_ENDPOINTS.NOTIFICATIONS.MARK_AS_READ(notificationId)
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEYS.all });
      toast.success(data.message || 'Notification marked as read');
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}

// Mark All as Read Hook
export function useMarkAllAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<NotificationActionResponse> => {
      const response = await axiosInstance.put<NotificationActionResponse>(
        API_ENDPOINTS.NOTIFICATIONS.MARK_ALL_AS_READ
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEYS.all });
      toast.success(data.message || 'All notifications marked as read');
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}

// Delete Notification Hook
export function useDeleteNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: string): Promise<NotificationActionResponse> => {
      const response = await axiosInstance.delete<NotificationActionResponse>(
        API_ENDPOINTS.NOTIFICATIONS.DELETE(notificationId)
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEYS.all });
      toast.success(data.message || 'Notification deleted successfully');
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}

// Delete All Read Notifications Hook
export function useDeleteAllRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<NotificationActionResponse> => {
      const response = await axiosInstance.delete<NotificationActionResponse>(
        API_ENDPOINTS.NOTIFICATIONS.DELETE_ALL_READ
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEYS.all });
      toast.success(data.message || 'All read notifications deleted successfully');
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}