import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const TEMPLATES_DIR = path.join(process.cwd(), 'src/components/features/templates');

// Helper function to get all template files
async function getTemplateFiles(): Promise<number[]> {
  try {
    const files = await fs.readdir(TEMPLATES_DIR);
    const ids = files
      .filter((file) => file.endsWith('.tsx') && /^\d+\.tsx$/.test(file))
      .map((file) => parseInt(file.replace('.tsx', ''), 10))
      .filter((id) => !isNaN(id))
      .sort((a, b) => a - b);
    return ids;
  } catch (error) {
    return [];
  }
}

// GET: Get templates count and max ID
export async function GET() {
  try {
    const ids = await getTemplateFiles();
    const count = ids.length;
    const maxId = ids.length > 0 ? Math.max(...ids) : 0;

    return NextResponse.json({
      count,
      maxId: maxId > 0 ? maxId : null,
      ids,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch templates' }, { status: 500 });
  }
}

// POST: Create a new template file
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code || typeof code !== 'string' || !code.trim()) {
      return NextResponse.json({ error: 'Template code is required' }, { status: 400 });
    }

    // Ensure templates directory exists
    try {
      await fs.access(TEMPLATES_DIR);
    } catch {
      await fs.mkdir(TEMPLATES_DIR, { recursive: true });
    }

    // Get next available ID
    const existingIds = await getTemplateFiles();
    const nextId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;

    // Write template file
    const fileName = `${nextId}.tsx`;
    const filePath = path.join(TEMPLATES_DIR, fileName);
    await fs.writeFile(filePath, code, 'utf-8');

    return NextResponse.json({
      success: true,
      newId: nextId,
      message: 'Template created successfully',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create template' }, { status: 500 });
  }
}

