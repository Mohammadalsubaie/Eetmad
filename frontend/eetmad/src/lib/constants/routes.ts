/**
 * Route constants
 */

export const ROUTES = {
  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email',

  // Main
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  PROFILE_EDIT: '/profile/edit',
  PROFILE_SECURITY: '/profile/security',

  // Client
  REQUESTS: '/requests',
  REQUESTS_NEW: '/requests/new',
  REQUESTS_MY: '/requests/my-requests',
  PROJECTS: '/projects',

  // Supplier
  SUPPLIER_PROFILE_SETUP: '/profile/setup',
  SUPPLIER_PORTFOLIO: '/portfolio',
  SUPPLIER_OFFERS: '/offers',
  SUPPLIER_STATS: '/stats',

  // Public
  HOME: '/',
  ABOUT: '/about',
  HOW_IT_WORKS: '/how-it-works',
  CATEGORIES: '/categories',
  SUPPLIERS: '/suppliers',
  TERMS: '/terms',
  PRIVACY: '/privacy',
  FAQ: '/faq',
  CONTACT: '/contact',

  // Admin
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
  ADMIN_VERIFICATION: '/admin/verification',
  ADMIN_CATEGORIES: '/admin/categories',
  ADMIN_DISPUTES: '/admin/disputes',
  ADMIN_REPORTS: '/admin/reports',
  ADMIN_SETTINGS: '/admin/settings',
  ADMIN_ANALYTICS: '/admin/analytics',
} as const;
