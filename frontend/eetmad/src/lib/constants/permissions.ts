/**
 * Permission constants
 */

export const PERMISSIONS = {
  // Client permissions
  CREATE_REQUEST: 'create_request',
  EDIT_REQUEST: 'edit_request',
  DELETE_REQUEST: 'delete_request',
  VIEW_REQUESTS: 'view_requests',
  ACCEPT_OFFER: 'accept_offer',

  // Supplier permissions
  CREATE_OFFER: 'create_offer',
  EDIT_OFFER: 'edit_offer',
  WITHDRAW_OFFER: 'withdraw_offer',
  VIEW_OFFERS: 'view_offers',
  MANAGE_PORTFOLIO: 'manage_portfolio',

  // Project permissions
  VIEW_PROJECT: 'view_project',
  UPDATE_PROJECT: 'update_project',
  CREATE_MILESTONE: 'create_milestone',
  REVIEW_MILESTONE: 'review_milestone',

  // Admin permissions
  MANAGE_USERS: 'manage_users',
  MANAGE_CATEGORIES: 'manage_categories',
  REVIEW_DISPUTES: 'review_disputes',
  VIEW_ANALYTICS: 'view_analytics',
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
