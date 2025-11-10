/**
 * App constants
 */

export const APP_NAME = 'Service Platform';
export const APP_VERSION = '0.1.0';

export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  USERS: '/api/users',
  SUPPLIERS: '/api/suppliers',
  REQUESTS: '/api/requests',
  OFFERS: '/api/offers',
  PROJECTS: '/api/projects',
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
} as const;
