'use server';

import { pageExists } from '@/lib/utils/page-exists';

/**
 * Server Action to check if a page exists
 * @param path - The route path (e.g., '/admin', '/admin/users')
 * @param locale - The locale (e.g., 'ar', 'en')
 * @returns boolean indicating if the page exists
 */
export async function checkPageExists(path: string, locale: string = 'ar'): Promise<boolean> {
  return pageExists(path, locale);
}
