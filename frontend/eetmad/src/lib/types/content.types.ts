export type PageType = 'about' | 'terms' | 'privacy' | 'faq' | 'help' | 'custom';

export type PageStatus = 'draft' | 'published' | 'archived';

export interface ContentPage {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  contentAr: string;
  contentEn: string;
  pageType: PageType;
  status: PageStatus;
  metaDescription: string | null;
  metaKeywords: string | null;
  displayOrder: number;
  isPublished: boolean;
  publishedAt: string | null;
  createdBy: string;
  updatedBy: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface FAQ {
  id: string;
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
  categoryId: string | null;
  displayOrder: number;
  isPublished: boolean;
  viewCount: number;
  helpfulCount: number;
  notHelpfulCount: number;
  createdAt: string;
  updatedAt: string;
}
