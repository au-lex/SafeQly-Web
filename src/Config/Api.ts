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

  USER: {
    PROFILE: '/user/profile',
    CHANGE_PASSWORD: '/user/change-password',
    AVATAR: '/user/avatar',
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
    BANK_ACCOUNT_DELETE: (id: number) => `/wallet/bank-account/${id}`,
    TRANSACTIONS: '/wallet/transactions',
    TRANSACTION_BY_ID: (id: number) => `/wallet/transactions/${id}`,
    TRANSACTION_BY_REFERENCE: '/wallet/transactions/by-reference',
  },

  ESCROW: {
    SEARCH_USER: '/escrow/search-user',
    CREATE: '/escrow/create',
    ACCEPT: (id: string) => `/escrow/${id}/accept`,
    REJECT: (id: string) => `/escrow/${id}/reject`,
    COMPLETE: (id: string) => `/escrow/${id}/complete`,
    RELEASE: (id: string) => `/escrow/${id}/release`,
    MY_ESCROWS: '/escrow/my-escrows',
    BY_ID: (id: string) => `/escrow/${id}`,
    RECENT_USERS: '/escrow/recent-users',
  },
};