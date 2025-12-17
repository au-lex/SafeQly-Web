import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; 
import axiosInstance from '../Config/axios';
import { API_ENDPOINTS } from '../Config/Api';
import type {
  SignupData,
  VerifyOTPData,
  LoginCredentials,
  ResetPasswordData,
  AuthResponse,
} from '../types';

// Utility functions for localStorage
const setStorageItem = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

const removeStorageItems = (keys: string[]): void => {
  keys.forEach((key) => localStorage.removeItem(key));
};


const handleApiError = (error: any) => {
  const message = error.response?.data?.message || error.message || 'Something went wrong';
  toast.error(message);
};

// --- HOOKS ---

// Signup Hook
export function useSignup() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (signupData: SignupData): Promise<AuthResponse> => {
      const response = await axiosInstance.post<AuthResponse>(
        API_ENDPOINTS.AUTH.SIGNUP,
        signupData
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Signup successful! Please verify your email.');
      navigate(`/verify-otp?email=${encodeURIComponent(data.email!)}&type=signup`);
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}

// Verify Signup OTP Hook
export function useVerifySignupOTP() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (otpData: VerifyOTPData): Promise<AuthResponse> => {
      const response = await axiosInstance.post<AuthResponse>(
        API_ENDPOINTS.AUTH.VERIFY_SIGNUP_OTP,
        otpData
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.token && data.user) {
        setStorageItem('authToken', data.token);
        setStorageItem('userData', JSON.stringify(data.user));
      }
      toast.success('Email verified! Welcome aboard.');
      navigate('/dashboard');
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}

// Resend Signup OTP Hook
export function useResendSignupOTP() {
  return useMutation({
    mutationFn: async (email: string): Promise<AuthResponse> => {
      const response = await axiosInstance.post<AuthResponse>(
        API_ENDPOINTS.AUTH.RESEND_SIGNUP_OTP,
        { email }
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || 'OTP resent successfully!');
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}

// Login Hook
export function useLogin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials): Promise<AuthResponse> => {
     
      const promise = axiosInstance.post<AuthResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
      );

      toast.promise(promise, {
        loading: 'Logging in...',
        success: 'Welcome back!',
        error: (err) => err.response?.data?.message || 'Login failed',
      });

      const response = await promise;
      return response.data;
    },
    onSuccess: (data) => {
      if (data.token && data.user) {
        setStorageItem('authToken', data.token);
        setStorageItem('userData', JSON.stringify(data.user));
      }
      navigate('/dashboard');
    },

  });
}

// Forgot Password Hook
export function useForgotPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (email: string): Promise<AuthResponse> => {
      const response = await axiosInstance.post<AuthResponse>(
        API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
        { email }
      );
      return response.data;
    },
    onSuccess: (data, email) => {
      toast.success(data.message || 'Reset link sent!');
      navigate(`/reset-psw?email=${encodeURIComponent(email)}&type=password-reset`);
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}

// Reset Password Hook
export function useResetPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (resetData: ResetPasswordData): Promise<AuthResponse> => {
      const response = await axiosInstance.post<AuthResponse>(
        API_ENDPOINTS.AUTH.RESET_PASSWORD,
        resetData
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success('Password reset successfully! Please login.');
      navigate('/login');
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}

// Logout Hook
export function useLogout() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      removeStorageItems(['authToken', 'userData']);
    },
    onSuccess: () => {
      toast.success('Logged out successfully');
      navigate('/login');
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}