// API Configuration
export const API_BASE_URL = 'http://localhost:8080/api';

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: '/auth/signup',
    VERIFY_SIGNUP_OTP: '/auth/verify-otp',
    RESEND_SIGNUP_OTP: '/auth/resend-otp',
    LOGIN: '/auth/login',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },

  WALLET: {
    BALANCE: '/wallet/balance',
    FUND: '/wallet/fund',
    WITHDRAW: '/wallet/withdraw',
    PAYSTACK_CALLBACK: '/wallet/paystack/callback',
    BANKS: '/wallet/banks',
    RESOLVE_ACCOUNT: '/wallet/resolve-account',
    BANK_ACCOUNTS: '/wallet/bank-accounts',
    BANK_ACCOUNT_DEFAULT: (id: number) => `/wallet/bank-accounts/${id}/default`,
    BANK_ACCOUNT_DELETE: (id: number) => `/wallet/bank-accounts/${id}`,
    TRANSACTIONS: '/wallet/transactions',
    TRANSACTION_BY_ID: (id: number) => `/wallet/transactions/${id}`,
    TRANSACTION_BY_REFERENCE: '/wallet/transactions/by-reference',
  },
};