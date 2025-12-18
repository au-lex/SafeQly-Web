import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';
import axiosInstance from '../Config/axios';
import { API_ENDPOINTS } from '../Config/Api';
import type {
  UserProfileData,
  UpdateProfileData,
  ChangePasswordData,
  ProfileResponse,
  AvatarResponse,
  MessageResponse,
} from '../types';




const updateStorageUser = (user: UserProfileData): void => {
  const userData = localStorage.getItem('userData');
  if (userData) {
    const currentUser = JSON.parse(userData);
    localStorage.setItem('userData', JSON.stringify({ ...currentUser, ...user }));
  }
};

const handleApiError = (error: any) => {
  const message = error.response?.data?.error || error.message || 'Something went wrong';
  toast.error(message);
};

// --- QUERY KEYS ---
export const PROFILE_QUERY_KEYS = {
  profile: ['user', 'profile'] as const,
};

// --- HOOKS ---

// Get User Profile Hook
export function useGetUserProfile() {
  return useQuery({
    queryKey: PROFILE_QUERY_KEYS.profile,
    queryFn: async (): Promise<UserProfileData> => {
      const response = await axiosInstance.get<ProfileResponse>(
        API_ENDPOINTS.USER.PROFILE
      );
      return response.data.user;
    },
    staleTime: 5 * 60 * 1000, 
    retry: 1,
  });
}

// Update User Profile Hook
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileData: UpdateProfileData): Promise<ProfileResponse> => {
      const response = await axiosInstance.put<ProfileResponse>(
        API_ENDPOINTS.USER.PROFILE,
        profileData
      );
      return response.data;
    },
    onSuccess: (data) => {
      updateStorageUser(data.user);
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEYS.profile });
      toast.success(data.message || 'Profile updated successfully!');
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}

// Change Password Hook
export function useChangePassword() {
  

  return useMutation({
    mutationFn: async (passwordData: ChangePasswordData): Promise<MessageResponse> => {
      const response = await axiosInstance.post<MessageResponse>(
        API_ENDPOINTS.USER.CHANGE_PASSWORD,
        passwordData
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Password changed successfully!');
      // Optionally redirect to login or stay on profile page
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}

// Upload Avatar Hook
export function useUploadAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File): Promise<AvatarResponse> => {
      const formData = new FormData();
      formData.append('avatar', file);

      const promise = axiosInstance.post<AvatarResponse>(
        API_ENDPOINTS.USER.AVATAR,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      toast.promise(promise, {
        loading: 'Uploading avatar...',
        success: 'Avatar uploaded!',
        error: (err) => err.response?.data?.error || 'Upload failed',
      });

      const response = await promise;
      return response.data;
    },
    onSuccess: (data) => {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const currentUser = JSON.parse(userData);
        currentUser.avatar = data.avatar;
        currentUser.avatar_public_id = data.public_id;
        localStorage.setItem('userData', JSON.stringify(currentUser));
      }
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEYS.profile });
    },
  });
}

// Delete Avatar Hook
export function useDeleteAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<MessageResponse> => {
      const response = await axiosInstance.delete<MessageResponse>(
        API_ENDPOINTS.USER.AVATAR
      );
      return response.data;
    },
    onSuccess: (data) => {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const currentUser = JSON.parse(userData);
        currentUser.avatar = '';
        currentUser.avatar_public_id = '';
        localStorage.setItem('userData', JSON.stringify(currentUser));
      }
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEYS.profile });
      toast.success(data.message || 'Avatar deleted successfully!');
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}