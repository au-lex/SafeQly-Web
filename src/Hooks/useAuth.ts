import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
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
  keys.forEach(key => localStorage.removeItem(key));
};

const showAlert = (title: string, message: string): void => {
  alert(`${title}: ${message}`);
};

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
      showAlert('Success', data.message);
      navigate(`/verify-otp?email=${encodeURIComponent(data.email!)}&type=signup`);
    },
    onError: (error: Error) => {
      showAlert('Signup Failed', error.message);
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
        console.log('User data:', data.user);
        console.log('Token:', data.token);
      }

      showAlert('Success', data.message);
      navigate('/dashboard');
    },
    onError: (error: Error) => {
      showAlert('Verification Failed', error.message);
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
      showAlert('Success', data.message);
    },
    onError: (error: Error) => {
      showAlert('Error', error.message);
    },
  });
}

// Login Hook
export function useLogin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials): Promise<AuthResponse> => {
      const response = await axiosInstance.post<AuthResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.token && data.user) {
        setStorageItem('authToken', data.token);
        setStorageItem('userData', JSON.stringify(data.user));
        console.log('User data:', data.user);
        console.log('Token:', data.token);
      }

      showAlert('Success', data.message);
      navigate('/dashboard');
    },
    onError: (error: Error) => {
      showAlert('Login Failed', error.message);
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
      showAlert('Success', data.message);
      navigate(`/reset-password?email=${encodeURIComponent(email)}&type=password-reset`);
    },
    onError: (error: Error) => {
      showAlert('Error', error.message);
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
    onSuccess: (data) => {
      showAlert('Success', data.message + ' Please login with your new password.');
      navigate('/login');
    },
    onError: (error: Error) => {
      showAlert('Password Reset Failed', error.message);
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
      navigate('/login');
    },
    onError: (error: Error) => {
      showAlert('Logout Error', error.message);
    },
  });
}