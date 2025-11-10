export interface SavedSearch {
  id: string;
  userId: string;
  searchName: string;
  filters: Record<string, unknown>; // JSON
  notifyOnMatch: boolean;
  lastNotifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
