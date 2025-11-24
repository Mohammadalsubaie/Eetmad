import { pageExists } from '@/lib/utils/page-exists';
import { NextRequest, NextResponse } from 'next/server';

/**
 * API route to check if a page exists
 * GET /api/check-page?path=/admin&locale=ar
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const path = searchParams.get('path');
    const locale = searchParams.get('locale') || 'ar';

    if (!path) {
      return NextResponse.json({ error: 'Path parameter is required' }, { status: 400 });
    }

    const exists = pageExists(path, locale);

    return NextResponse.json({ exists });
  } catch (error) {
    console.error('Error checking page existence:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
