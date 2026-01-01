export const ROUTES = {
  // Public routes
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  MARKETPLACE: "/marketplace",
  SERVICES: "/services",
  DELIVERY: "/delivery",

  // Auth flow routes
  OTP_VERIFICATION: "/verify-otp",
  SECURITY_SETUP: "/security-setup",
  CREATE_PASSWORD: "/create-password",

  // Authenticated routes
  DASHBOARD: "/dashboard",
  MY_ADS: "/my-ads",
  MY_SERVICES: "/my-services",
  BOOKINGS: "/bookings",
  DELIVERY_REQUESTS: "/delivery-requests",
  DELIVERIES: "/deliveries",
  MESSAGES: "/messages",
  WALLET: "/wallet",
  PROFILE: "/profile",
  PERSONAL_INFO: "/profile/personal-info",
  SECURITY: "/profile/security",
  PRIVACY_DATA: "/profile/privacy-data",
  PRIVACY_CENTER: "/profile/privacy-center",
  COMMUNICATION_PREFERENCES: "/profile/communication-preferences",
  USER_PROFILE: "/messages/:userId/profile",
  CREATE_LISTING: "/create-listing",

  // Dashboard Management Pages (Protected)
  DASHBOARD_MARKETPLACE: "/dashboard/marketplace",
  DASHBOARD_SERVICES: "/dashboard/services",
  DASHBOARD_DELIVERY: "/dashboard/delivery",

  // Admin routes
  ADMIN_DASHBOARD: "/admin",
  ADMIN_APPROVALS: "/admin/approvals",
  ADMIN_WALLET: "/admin/wallet",
  ADMIN_DELIVERY_REQUESTS: "/admin/delivery-requests",
  ADMIN_REPORTS: "/admin/reports",
  ADMIN_DISPUTES: "/admin/disputes",

  // Legal & Support routes
  HELP_CENTER: "/help",
  CONTACT: "/contact",
  TERMS: "/terms",
  PRIVACY: "/privacy",

  // Error routes
  NOT_FOUND: "/404",
  SERVER_ERROR: "/500",
} as const
