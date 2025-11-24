'use client';

import { cssVars } from '@/styles/theme';
import {
  CheckCircle2,
  Eye,
  FileText,
  Globe,
  Palette,
  Play,
  Settings,
  Sparkles,
  User,
  X,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import ManualReviewNavigator from './ManualReviewNavigator';

type TestSuiteType = 'theme' | 'language' | 'ux' | 'feature' | 'accessibility' | 'performance';

interface TestSuite {
  id: string;
  name: string;
  type: TestSuiteType;
  description: string;
  pages: string[];
  checklist: string[];
  completed: boolean;
}

interface TestSuiteTemplate {
  type: TestSuiteType;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  defaultPages: string[];
  defaultChecklist: string[];
}

const TEST_SUITE_TEMPLATES: TestSuiteTemplate[] = [
  {
    type: 'theme',
    name: 'اختبار الثيم',
    description: 'اختبار جميع الثيمات المتاحة والتأكد من عملها بشكل صحيح',
    icon: Palette,
    color: cssVars.status.info,
    defaultPages: ['', 'dashboard', 'profile', 'contracts', 'projects', 'admin/dashboard'],
    defaultChecklist: [
      'جميع الثيمات تعمل بشكل صحيح',
      'الألوان متناسقة في جميع الصفحات',
      'التبديل بين الثيمات سلس',
      'لا توجد عناصر مكسورة عند تغيير الثيم',
      'النصوص واضحة في جميع الثيمات',
    ],
  },
  {
    type: 'language',
    name: 'اختبار اللغة',
    description: 'اختبار الترجمة والتبديل بين اللغات',
    icon: Globe,
    color: cssVars.primary.DEFAULT,
    defaultPages: [
      '',
      'about',
      'how-it-works',
      'dashboard',
      'profile',
      'contracts',
      'admin/dashboard',
    ],
    defaultChecklist: [
      'جميع النصوص مترجمة بشكل صحيح',
      'التبديل بين اللغات يعمل بسلاسة',
      'الاتجاه (RTL/LTR) يتغير بشكل صحيح',
      'لا توجد نصوص مفقودة أو غير مترجمة',
      'التواريخ والأرقام تظهر بالشكل الصحيح',
      'الأيقونات والرموز في المكان الصحيح',
    ],
  },
  {
    type: 'ux',
    name: 'اختبار تجربة المستخدم',
    description: 'اختبار سهولة الاستخدام والتنقل في التطبيق',
    icon: User,
    color: cssVars.status.success,
    defaultPages: [
      '',
      'dashboard',
      'profile',
      'profile/edit',
      'contracts',
      'contracts/new',
      'projects',
      'messages',
    ],
    defaultChecklist: [
      'التنقل بين الصفحات سلس وسريع',
      'الأزرار والروابط واضحة وسهلة الوصول',
      'النماذج سهلة الاستخدام',
      'رسائل الخطأ والنجاح واضحة',
      'التحميل والانتظار واضح للمستخدم',
      'التصميم متجاوب على جميع الأجهزة',
      'الوصول إلى الميزات الرئيسية سهل',
    ],
  },
  {
    type: 'feature',
    name: 'اختبار الميزات',
    description: 'اختبار ميزة معينة أو مجموعة ميزات',
    icon: Sparkles,
    color: cssVars.status.warning,
    defaultPages: [],
    defaultChecklist: [
      'الميزة تعمل كما هو متوقع',
      'جميع الحالات الحدية تم اختبارها',
      'التفاعلات مع الميزات الأخرى صحيحة',
      'الأداء مقبول',
      'لا توجد أخطاء في وحدة التحكم',
    ],
  },
  {
    type: 'accessibility',
    name: 'اختبار إمكانية الوصول',
    description: 'اختبار إمكانية الوصول للمستخدمين ذوي الاحتياجات الخاصة',
    icon: Eye,
    color: cssVars.accent.primary,
    defaultPages: ['', 'dashboard', 'profile', 'contracts', 'projects'],
    defaultChecklist: [
      'جميع العناصر قابلة للوصول بلوحة المفاتيح',
      'الألوان لها تباين كافٍ',
      'النصوص قابلة للقراءة',
      'الأيقونات لها نصوص بديلة',
      'التنقل بالكيبورد منطقي',
      'القارئ الشاشي يعمل بشكل صحيح',
    ],
  },
  {
    type: 'performance',
    name: 'اختبار الأداء',
    description: 'اختبار سرعة التطبيق ووقت التحميل',
    icon: Zap,
    color: cssVars.status.error,
    defaultPages: ['', 'dashboard', 'browse-suppliers', 'contracts', 'projects', 'admin/dashboard'],
    defaultChecklist: [
      'الصفحات تحمل بسرعة',
      'لا توجد تأخيرات ملحوظة',
      'الصور والموارد محسّنة',
      'التفاعلات سريعة ومستجيبة',
      'لا توجد مشاكل في الذاكرة',
      'الأداء جيد على الأجهزة الضعيفة',
    ],
  },
];

const STORAGE_KEY = 'focused-test-suites';

export default function FocusedTestSuite() {
  const [isOpen, setIsOpen] = useState(false);
  const [testSuites, setTestSuites] = useState<TestSuite[]>([]);
  const [selectedSuite, setSelectedSuite] = useState<TestSuite | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newSuiteType, setNewSuiteType] = useState<TestSuiteType | null>(null);
  const [newSuiteName, setNewSuiteName] = useState('');
  const [newSuiteDescription, setNewSuiteDescription] = useState('');
  const [showNavigator, setShowNavigator] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTimeout(() => {
          setTestSuites(parsed);
        }, 0);
      } catch (e) {
        console.error('Failed to load test suites:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (testSuites.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(testSuites));
    }
  }, [testSuites]);

  const createTestSuite = (type: TestSuiteType, name: string, description: string) => {
    const template = TEST_SUITE_TEMPLATES.find((t) => t.type === type);
    if (!template) return;

    const suite: TestSuite = {
      id: `suite-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: name || template.name,
      type,
      description: description || template.description,
      pages: [...template.defaultPages],
      checklist: [...template.defaultChecklist],
      completed: false,
    };

    setTestSuites((prev) => [...prev, suite]);
    setSelectedSuite(suite);
    setShowCreateModal(false);
    setNewSuiteType(null);
    setNewSuiteName('');
    setNewSuiteDescription('');
  };

  const deleteTestSuite = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه السلسلة؟')) {
      setTestSuites((prev) => prev.filter((s) => s.id !== id));
      if (selectedSuite?.id === id) {
        setSelectedSuite(null);
      }
    }
  };

  const startTestSuite = (suite: TestSuite) => {
    setSelectedSuite(suite);
    setShowNavigator(true);

    // Create a session in ManualReviewNavigator with the suite info
    const sessionName = `${suite.name} - ${new Date().toLocaleDateString('ar-SA')}`;
    const testerName = prompt('اسم المختبر:') || '';
    const testReason = `${suite.description}\n\nنوع الاختبار: ${suite.name}\nالصفحات المستهدفة: ${suite.pages.length} صفحة`;

    // Store suite info to be used by ManualReviewNavigator
    const suiteInfo = {
      suiteId: suite.id,
      suiteName: suite.name,
      suiteType: suite.type,
      pages: suite.pages,
      checklist: suite.checklist,
    };

    // Store in sessionStorage for ManualReviewNavigator to pick up
    sessionStorage.setItem('focused-test-suite-info', JSON.stringify(suiteInfo));
    sessionStorage.setItem('focused-test-session-name', sessionName);
    sessionStorage.setItem('focused-test-tester-name', testerName);
    sessionStorage.setItem('focused-test-reason', testReason);

    // Trigger a custom event to notify ManualReviewNavigator
    window.dispatchEvent(
      new CustomEvent('start-focused-test-suite', {
        detail: {
          sessionName,
          testerName,
          testReason,
          scenarios: [
            {
              name: suite.name,
              description: suite.description,
              type: suite.type,
              pages: suite.pages,
            },
          ],
        },
      })
    );
  };

  const getTemplateIcon = (type: TestSuiteType) => {
    const template = TEST_SUITE_TEMPLATES.find((t) => t.type === type);
    return template?.icon || FileText;
  };

  const getTemplateColor = (type: TestSuiteType) => {
    const template = TEST_SUITE_TEMPLATES.find((t) => t.type === type);
    return template?.color || cssVars.neutral.textSecondary;
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-2 z-50 flex h-12 w-12 touch-manipulation items-center justify-center rounded-full shadow-lg transition-all hover:scale-110 sm:bottom-32 sm:right-4"
        style={{
          backgroundColor: cssVars.secondary.DEFAULT,
          color: cssVars.neutral.bg,
        }}
        title="سلسلة اختبارات مخصصة"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Settings className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div
          className="fixed right-0 top-0 z-50 flex h-screen w-full flex-col rounded-none border-0 shadow-2xl sm:right-4 sm:top-4 sm:h-[calc(100vh-2rem)] sm:w-96 sm:rounded-2xl sm:border-2"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <div
            className="flex items-center justify-between border-b-2 p-4"
            style={{ borderColor: cssVars.neutral.border }}
          >
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5" style={{ color: cssVars.secondary.DEFAULT }} />
              <h2 className="text-lg font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                سلسلة اختبارات مخصصة
              </h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded-lg p-1 transition-colors hover:opacity-80"
              style={{ color: cssVars.neutral.textSecondary }}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {!showCreateModal ? (
              <>
                <div className="mb-4">
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="min-h-[44px] w-full touch-manipulation rounded-lg border-2 border-dashed px-4 py-3 text-sm font-medium transition-colors hover:opacity-80"
                    style={{
                      borderColor: cssVars.neutral.border,
                      color: cssVars.primary.DEFAULT,
                    }}
                  >
                    + إنشاء سلسلة اختبار جديدة
                  </button>
                </div>

                <div className="space-y-3">
                  {testSuites.length === 0 ? (
                    <div
                      className="py-8 text-center text-sm"
                      style={{ color: cssVars.neutral.textSecondary }}
                    >
                      لا توجد سلاسل اختبار. أنشئ واحدة جديدة للبدء.
                    </div>
                  ) : (
                    testSuites.map((suite) => {
                      const Icon = getTemplateIcon(suite.type);
                      const color = getTemplateColor(suite.type);

                      return (
                        <div
                          key={suite.id}
                          className="rounded-lg border-2 p-3"
                          style={{
                            backgroundColor:
                              selectedSuite?.id === suite.id
                                ? `color-mix(in srgb, ${color} 10%, transparent)`
                                : 'transparent',
                            borderColor:
                              selectedSuite?.id === suite.id ? color : cssVars.neutral.border,
                          }}
                        >
                          <div className="mb-2 flex items-start justify-between">
                            <div className="flex flex-1 items-start gap-2">
                              <Icon className="mt-0.5 h-5 w-5" style={{ color }} />
                              <div className="flex-1">
                                <h3
                                  className="text-sm font-semibold"
                                  style={{ color: cssVars.neutral.DEFAULT }}
                                >
                                  {suite.name}
                                </h3>
                                <p
                                  className="mt-1 text-xs"
                                  style={{ color: cssVars.neutral.textMuted }}
                                >
                                  {suite.description}
                                </p>
                                <div className="mt-2 flex items-center gap-2 text-xs">
                                  <span style={{ color: cssVars.neutral.textMuted }}>
                                    {suite.pages.length} صفحة
                                  </span>
                                  <span style={{ color: cssVars.neutral.textMuted }}>•</span>
                                  <span style={{ color: cssVars.neutral.textMuted }}>
                                    {suite.checklist.length} عنصر
                                  </span>
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => deleteTestSuite(suite.id)}
                              className="ml-2 flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded p-1 transition-colors hover:opacity-80"
                              style={{ color: cssVars.neutral.textSecondary }}
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="mt-3 flex gap-2">
                            <button
                              onClick={() => startTestSuite(suite)}
                              className="flex min-h-[44px] flex-1 touch-manipulation items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors hover:opacity-80"
                              style={{
                                backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`,
                                color,
                              }}
                            >
                              <Play className="h-3 w-3" />
                              بدء الاختبار
                            </button>
                            <button
                              onClick={() => setSelectedSuite(suite)}
                              className="min-h-[44px] min-w-[44px] touch-manipulation rounded-lg px-3 py-2 text-xs transition-colors hover:opacity-80"
                              style={{
                                backgroundColor: `color-mix(in srgb, ${cssVars.neutral.border} 20%, transparent)`,
                                color: cssVars.neutral.DEFAULT,
                              }}
                            >
                              <FileText className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3
                    className="mb-3 text-sm font-semibold"
                    style={{ color: cssVars.neutral.DEFAULT }}
                  >
                    اختر نوع الاختبار
                  </h3>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {TEST_SUITE_TEMPLATES.map((template) => {
                      const Icon = template.icon;
                      return (
                        <button
                          key={template.type}
                          onClick={() => {
                            setNewSuiteType(template.type);
                            setNewSuiteName(template.name);
                            setNewSuiteDescription(template.description);
                          }}
                          className={`min-h-[44px] touch-manipulation rounded-lg border-2 p-3 text-left transition-colors ${
                            newSuiteType === template.type ? 'ring-2' : ''
                          }`}
                          style={{
                            backgroundColor:
                              newSuiteType === template.type
                                ? `color-mix(in srgb, ${template.color} 10%, transparent)`
                                : 'transparent',
                            borderColor:
                              newSuiteType === template.type
                                ? template.color
                                : cssVars.neutral.border,
                          }}
                        >
                          <div style={{ color: template.color }}>
                            <Icon className="mb-1 h-5 w-5" />
                          </div>
                          <div
                            className="text-xs font-medium"
                            style={{ color: cssVars.neutral.DEFAULT }}
                          >
                            {template.name}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {newSuiteType && (
                  <>
                    <div>
                      <label
                        className="mb-1 block text-xs font-medium"
                        style={{ color: cssVars.neutral.DEFAULT }}
                      >
                        اسم السلسلة
                      </label>
                      <input
                        type="text"
                        value={newSuiteName}
                        onChange={(e) => setNewSuiteName(e.target.value)}
                        placeholder="اسم السلسلة..."
                        className="w-full touch-manipulation rounded border-2 px-3 py-2 text-sm focus:outline-none focus:ring-2"
                        style={{
                          backgroundColor: cssVars.neutral.bg,
                          borderColor: cssVars.neutral.border,
                          color: cssVars.neutral.DEFAULT,
                        }}
                      />
                    </div>
                    <div>
                      <label
                        className="mb-1 block text-xs font-medium"
                        style={{ color: cssVars.neutral.DEFAULT }}
                      >
                        الوصف (اختياري)
                      </label>
                      <textarea
                        value={newSuiteDescription}
                        onChange={(e) => setNewSuiteDescription(e.target.value)}
                        placeholder="وصف السلسلة..."
                        className="w-full touch-manipulation rounded border-2 px-3 py-2 text-sm focus:outline-none focus:ring-2"
                        style={{
                          backgroundColor: cssVars.neutral.bg,
                          borderColor: cssVars.neutral.border,
                          color: cssVars.neutral.DEFAULT,
                        }}
                        rows={3}
                      />
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <button
                        onClick={() => {
                          if (newSuiteType && newSuiteName) {
                            createTestSuite(newSuiteType, newSuiteName, newSuiteDescription);
                          }
                        }}
                        className="min-h-[44px] flex-1 touch-manipulation rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:opacity-80"
                        style={{
                          backgroundColor: cssVars.primary.DEFAULT,
                          color: cssVars.neutral.bg,
                        }}
                      >
                        إنشاء
                      </button>
                      <button
                        onClick={() => {
                          setShowCreateModal(false);
                          setNewSuiteType(null);
                          setNewSuiteName('');
                          setNewSuiteDescription('');
                        }}
                        className="min-h-[44px] flex-1 touch-manipulation rounded-lg border-2 px-4 py-2 text-sm font-medium transition-colors hover:opacity-80"
                        style={{
                          borderColor: cssVars.neutral.border,
                          color: cssVars.neutral.DEFAULT,
                        }}
                      >
                        إلغاء
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {selectedSuite && !showCreateModal && (
            <div
              className="border-t-2 p-4"
              style={{
                borderColor: cssVars.neutral.border,
                backgroundColor: `color-mix(in srgb, ${cssVars.neutral.border} 5%, transparent)`,
              }}
            >
              <h3 className="mb-2 text-sm font-semibold" style={{ color: cssVars.neutral.DEFAULT }}>
                قائمة التحقق
              </h3>
              <div className="max-h-32 space-y-1 overflow-y-auto text-xs">
                {selectedSuite.checklist.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 flex-shrink-0"
                      style={{ color: cssVars.neutral.textMuted }}
                    />
                    <span style={{ color: cssVars.neutral.textSecondary }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {showNavigator && <ManualReviewNavigator />}
    </>
  );
}
