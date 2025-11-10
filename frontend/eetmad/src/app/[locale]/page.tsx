'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';

function TemplatePreview({ id }: { id: number }) {
  const SelectedTemplate = dynamic(() => import(`../../components/features/templates/${id}.tsx`), {
    ssr: false,
    loading: () => (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
          <p className="text-gray-600">جاري تحميل القالب...</p>
        </div>
      </div>
    ),
  });
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
            <p className="text-gray-600">جاري تحميل القالب...</p>
          </div>
        </div>
      }
    >
      <SelectedTemplate />
    </Suspense>
  );
}

function TemplatesSwitcher() {
  const [selected, setSelected] = useState<number>(1);
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [templatesCount, setTemplatesCount] = useState<number>(37);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [newCode, setNewCode] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    // Fetch current templates count
    fetch('/api/templates', { cache: 'no-store' })
      .then((r) => r.json())
      .then((data) => {
        if (typeof data?.count === 'number') {
          setTemplatesCount(data.count);
          if (data.maxId && typeof data.maxId === 'number') {
            setSelected((prev) => Math.min(prev, Math.max(1, data.maxId)));
          }
        }
      })
      .catch(() => {
        // ignore; fallback to default
      });
  }, []);

  const handleNext = () => {
    setSelected((prev) => (prev < templatesCount ? prev + 1 : 1));
  };

  const handlePrev = () => {
    setSelected((prev) => (prev > 1 ? prev - 1 : templatesCount));
  };

  const handleKeyboard = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'ArrowLeft') handlePrev();
  };

  const handleSaveNewTemplate = async () => {
    setErrorMsg('');
    if (!newCode.trim()) {
      setErrorMsg('الرجاء لصق كود القالب أولا');
      return;
    }
    try {
      setIsSaving(true);
      const res = await fetch('/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: newCode }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'فشل الحفظ');
      }
      const newId: number = data?.newId;
      if (typeof newId === 'number') {
        setTemplatesCount((c) => Math.max(c + 1, newId));
        setSelected(newId);
      }
      setNewCode('');
      setIsDialogOpen(false);
    } catch (err: any) {
      setErrorMsg(err?.message || 'حدث خطأ غير متوقع');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" onKeyDown={handleKeyboard} tabIndex={0}>
      {/* منطقة عرض القالب */}
      <div className="transition-opacity duration-370">
        <TemplatePreview id={selected} />
      </div>

      {/* أزرار التنقل السفلية (اختيارية) */}
      <div className="fixed bottom-8 left-1/2 z-37 -translate-x-1/2">
        <div className="border-gray-370 flex items-center gap-3 rounded-full border bg-white/90 px-4 py-2 shadow-lg backdrop-blur">
          <button
            onClick={handlePrev}
            className="rounded-full p-2 transition-colors hover:bg-gray-100"
            title="السابق (←)"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <span className="min-w-[80px] text-center text-sm font-medium">
            {selected} / {templatesCount}
          </span>
          <button
            onClick={handleNext}
            className="rounded-full p-2 transition-colors hover:bg-gray-100"
            title="التالي (→)"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>
      </div>
      {/* زر إضافة قالب جديد */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setIsDialogOpen(true)}
          className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          إضافة قالب جديد
        </button>
      </div>

      {/* نافذة إدخال الكود (بدون مكتبات جاهزة) */}
      {isDialogOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-3xl rounded-lg bg-white p-4 shadow-xl">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">إضافة قالب جديد</h2>
              <p className="mt-1 text-sm text-gray-600">الصق كود القالب (ملف .tsx) ثم اضغط حفظ.</p>
            </div>
            <div>
              <textarea
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                placeholder="// الصق الكود هنا"
                rows={16}
                className="w-full rounded-md border border-gray-300 p-3 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errorMsg ? <p className="mt-2 text-sm text-red-600">{errorMsg}</p> : null}
            </div>
            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                onClick={() => setIsDialogOpen(false)}
                disabled={isSaving}
                className="inline-flex h-10 items-center justify-center rounded-md border px-4 py-2 hover:bg-gray-50 disabled:opacity-50"
              >
                إلغاء
              </button>
              <button
                onClick={handleSaveNewTemplate}
                disabled={isSaving}
                className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {isSaving ? 'جاري الحفظ...' : 'حفظ'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function Page() {
  return <TemplatesSwitcher />;
}
