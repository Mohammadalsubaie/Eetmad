export interface Category {
  id: string;
  nameAr: string;
  nameEn: string;
  parentId: string | null;
  icon: string;
  description: string;
  isActive: boolean;
  sortOrder: number;
  suppliersCount: number;
  createdAt: string;
  requestsCount: number;
  slug: string;
  updatedAt: string;
  // Optional nested data
  parent?: Category;
  children?: Category[];
}

export interface CategoryTree extends Category {
  subcategories?: Category[];
  // Statistics (optional, may be added by API)
  supplierCount?: number;
  requestCount?: number;
}

export interface CreateCategoryInput {
  nameAr: string;
  nameEn: string;
  parentId?: string | null;
  icon: string;
  description: string;
  sortOrder?: number;
  isActive?: boolean;
}

export interface UpdateCategoryInput {
  nameAr?: string;
  nameEn?: string;
  parentId?: string | null;
  icon?: string;
  description?: string;
  sortOrder?: number;
  isActive?: boolean;
}
