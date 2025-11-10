export type BookmarkReferenceType = 'request' | 'offer' | 'supplier' | 'project';

export interface Bookmark {
  id: string;
  userId: string;
  referenceType: BookmarkReferenceType;
  referenceId: string;
  notes: string | null;
  createdAt: string;
}
