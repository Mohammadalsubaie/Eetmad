// src/lib/types/home.types.ts

import { Category } from './category.types';
import { FeaturedRequest } from './request.types';
import { UserType } from './user.types';

/**
 * نوع الميزانية
 */
export type BudgetType = 'fixed' | 'range' | 'negotiable';

/**
 * خطوة في آلية العمل
 */
export interface WorkflowStep {
  id: number;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  icon: string;
  forUserType: UserType | 'both';
  color: string;
}

/**
 * معلومات مختصرة عن المستخدم (للعرض)
 */
export interface UserInfo {
  id: string;
  fullName: string;
  avatar?: string;
  isVerified: boolean;
  userType: UserType;
  companyName?: string;
}

/**
 * معلومات الموقع من JSON field
 */
export interface LocationInfo {
  city: string;
  region?: string;
  country?: string;
  requiresOnSite?: boolean;
}

/**
 * مورد مميز (User + SupplierProfile)
 */
export interface TopSupplier {
  // من جدول User
  id: string;
  fullName: string;
  avatar?: string;
  companyName?: string;

  // من جدول User - الإحصائيات
  averageRating: number;
  totalReviews: number;
  completedProjects: number;

  // من جدول SupplierProfile
  responseTime: number;
  acceptanceRate: number;
  onTimeDelivery: number;
  isVerified: boolean;
  verificationDate?: string | Date;

  // الخدمات والفئات
  categories: string[]; // أسماء الفئات
  primaryCategory: string;
  serviceDescription: string;

  // إحصائيات إضافية (محسوبة)
  stats?: {
    totalEarnings?: number;
    averageProjectValue?: number;
    repeatClientRate?: number;
  };
}

/**
 * إحصائية المنصة
 */
export interface PlatformStat {
  id: string;
  labelAr: string;
  labelEn: string;
  value: number;
  icon: string;
  suffix?: string;
  prefix?: string;
  color: string;
  trend?: {
    direction: 'up' | 'down' | 'stable';
    percentage: number;
    label: string;
  };
  animationDuration?: number;
}

/**
 * شهادة للعرض في الصفحة الرئيسية
 */
export interface Testimonial {
  id: string;

  // المستخدم
  userName: string;
  userAvatar?: string;
  userType: UserType;
  companyName?: string;

  // التقييم
  rating: number;
  title: string;
  comment: string;

  // تفاصيل المشروع
  projectType?: string;
  projectCategory?: string;

  // التواريخ
  createdAt: string | Date;

  // إضافات
  isVerified: boolean;
  helpfulCount?: number;
}

/**
 * ميزة الثقة والأمان
 */
export interface TrustFeature {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  icon: string;
  color: string;
  features?: string[];
}

/**
 * سؤال شائع من جدول FAQ
 */
export interface FAQItem {
  id: string;
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
  categoryId?: string | null;
  displayOrder: number;
  isPublished: boolean;
  viewCount: number;
  helpfulCount: number;
  notHelpfulCount: number;
  createdAt: string | Date;
  updatedAt: string | Date;

  // محسوبة
  categoryName?: string;
  isPopular?: boolean;
}

/**
 * إحصائيات Hero Section
 */
export interface HeroStats {
  totalProjects: number;
  completedProjects: number;
  activeSuppliers: number;
  satisfiedClients: number;
  totalValue?: number;
  averageRating: number;
}

/**
 * بيانات الصفحة الرئيسية الكاملة
 */
export interface HomePageData {
  heroStats: HeroStats;
  categories: Category[];
  featuredRequests: FeaturedRequest[];
  topSuppliers: TopSupplier[];
  platformStats: PlatformStat[];
  testimonials: Testimonial[];
  trustFeatures: TrustFeature[];
  faqs: FAQItem[];
  workflowSteps: {
    client: WorkflowStep[];
    supplier: WorkflowStep[];
  };
}

/**
 * اقتراحات البحث
 */
export interface SearchSuggestion {
  id: string;
  text: string;
  type: 'category' | 'keyword' | 'recent';
  categoryId?: string;
  icon?: string;
}
