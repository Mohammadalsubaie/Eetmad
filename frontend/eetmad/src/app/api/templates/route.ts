import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'components', 'features', 'templates');

async function ensureTemplatesDirExists(): Promise<void> {
	// Ensure the templates directory exists
	try {
		await fs.mkdir(TEMPLATES_DIR, { recursive: true });
	} catch {
		// Best-effort; if it fails, subsequent operations will surface errors
	}
}

async function readTemplateIds(): Promise<number[]> {
	await ensureTemplatesDirExists();
	const files = await fs.readdir(TEMPLATES_DIR);
	const ids = files
		.filter((f) => f.endsWith('.tsx'))
		.map((f) => parseInt(f.replace('.tsx', ''), 10))
		.filter((n) => Number.isFinite(n))
		.sort((a, b) => a - b);
	return ids;
}

export async function GET() {
	try {
		const ids = await readTemplateIds();
		return NextResponse.json({
			templates: ids,
			count: ids.length,
			maxId: ids[ids.length - 1] ?? 0,
		});
	} catch (error: any) {
		return NextResponse.json(
			{ error: 'Failed to read templates', details: String(error?.message ?? error) },
			{ status: 500 }
		);
	}
}

export async function POST(request: Request) {
	try {
		const contentType = request.headers.get('content-type') || '';
		if (!contentType.includes('application/json')) {
			return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
		}

		const body = await request.json().catch(() => ({}));
		const code: string | undefined = body?.code;

		if (!code || typeof code !== 'string' || code.trim().length < 1) {
			return NextResponse.json({ error: 'Code is required' }, { status: 400 });
		}

		const ids = await readTemplateIds();
		const nextId = (ids[ids.length - 1] ?? 0) + 1;
		const filename = `${nextId}.tsx`;
		const filePath = path.join(TEMPLATES_DIR, filename);

		// Basic safety: avoid writing overly large files (e.g., > 500KB)
		const MAX_SIZE_BYTES = 500 * 1024;
		if (Buffer.byteLength(code, 'utf8') > MAX_SIZE_BYTES) {
			return NextResponse.json({ error: 'Code is too large' }, { status: 413 });
		}

		// Write the file
		await fs.writeFile(filePath, code, { encoding: 'utf8', flag: 'wx' }).catch(async (err) => {
			// If file exists (race condition), try next id once
			if ((err as any)?.code === 'EEXIST') {
				const fallbackId = nextId + 1;
				const fallbackPath = path.join(TEMPLATES_DIR, `${fallbackId}.tsx`);
				await fs.writeFile(fallbackPath, code, { encoding: 'utf8', flag: 'wx' });
				return;
			}
			throw err;
		});

		return NextResponse.json({ ok: true, newId: nextId });
	} catch (error: any) {
		return NextResponse.json(
			{ error: 'Failed to create template', details: String(error?.message ?? error) },
			{ status: 500 }
		);
	}
}


