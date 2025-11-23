'use client';

import { cssVars } from '@/styles/theme';
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Download,
  FileText,
  FolderOpen,
  Plus,
  Search,
  Trash2,
  X,
  XCircle,
} from 'lucide-react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface PageRoute {
  path: string;
  label: string;
  group?: string;
  isDynamic?: boolean;
}

type ReviewStatus = 'pending' | 'reviewed' | 'issues';

interface PageReview {
  status: ReviewStatus;
  notes?: string;
  reviewedAt?: string;
}

interface TestScenario {
  id: string;
  name: string;
  description: string;
  type: 'theme' | 'language' | 'ux' | 'feature' | 'accessibility' | 'performance' | 'other';
  pages?: string[]; // Optional: specific pages to test for this scenario
}

interface TestSession {
  id: string;
  name: string;
  testerName?: string;
  testReason?: string;
  scenarios: TestScenario[];
  createdAt: string;
  updatedAt: string;
  reviews: Record<string, PageReview>;
}

// All pages in the project (same as PageNavigator)
const ALL_PAGES: PageRoute[] = [
  // Public pages
  { path: '', label: 'Home', group: 'Public' },
  { path: 'about', label: 'About', group: 'Public' },
  { path: 'how-it-works', label: 'How It Works', group: 'Public' },
  { path: 'categories', label: 'Categories', group: 'Public' },
  { path: 'categories/[slug]', label: 'Category Detail', group: 'Public', isDynamic: true },
  { path: 'browse-suppliers', label: 'Browse Suppliers', group: 'Public' },
  { path: 'browse-suppliers/[id]', label: 'Supplier Detail', group: 'Public', isDynamic: true },
  { path: 'contact', label: 'Contact', group: 'Public' },
  { path: 'faq', label: 'FAQ', group: 'Public' },
  { path: 'terms', label: 'Terms', group: 'Public' },
  { path: 'privacy', label: 'Privacy', group: 'Public' },

  // Auth pages
  { path: 'login', label: 'Login', group: 'Auth' },
  { path: 'register', label: 'Register', group: 'Auth' },
  { path: 'forgot-password', label: 'Forgot Password', group: 'Auth' },
  { path: 'reset-password', label: 'Reset Password', group: 'Auth' },
  { path: 'verify-email', label: 'Verify Email', group: 'Auth' },

  // Main pages
  { path: 'dashboard', label: 'Dashboard', group: 'Main' },

  // Client pages
  { path: 'profile', label: 'Profile', group: 'Client' },
  { path: 'profile/edit', label: 'Edit Profile', group: 'Client' },
  { path: 'profile/settings', label: 'Profile Settings', group: 'Client' },

  { path: 'contracts', label: 'Contracts', group: 'Client' },
  { path: 'contracts/new', label: 'New Contract', group: 'Client' },
  { path: 'contracts/[id]', label: 'Contract Detail', group: 'Client', isDynamic: true },
  { path: 'contracts/[id]/edit', label: 'Edit Contract', group: 'Client', isDynamic: true },
  { path: 'contracts/[id]/sign', label: 'Sign Contract', group: 'Client', isDynamic: true },
  { path: 'contracts/[id]/versions', label: 'Contract Versions', group: 'Client', isDynamic: true },
  { path: 'contracts/[id]/clauses', label: 'Contract Clauses', group: 'Client', isDynamic: true },

  { path: 'disputes', label: 'Disputes', group: 'Client' },
  { path: 'disputes/new', label: 'New Dispute', group: 'Client' },
  { path: 'disputes/[id]', label: 'Dispute Detail', group: 'Client', isDynamic: true },

  { path: 'messages', label: 'Messages', group: 'Client' },
  { path: 'messages/new', label: 'New Message', group: 'Client' },
  { path: 'messages/[id]', label: 'Conversation', group: 'Client', isDynamic: true },
  { path: 'messages/settings', label: 'Message Settings', group: 'Client' },

  { path: 'notifications', label: 'Notifications', group: 'Client' },
  { path: 'notifications/[id]', label: 'Notification Detail', group: 'Client', isDynamic: true },
  { path: 'notifications/settings', label: 'Notification Settings', group: 'Client' },

  { path: 'payments', label: 'Payments', group: 'Client' },
  { path: 'payments/initiate', label: 'Initiate Payment', group: 'Client' },
  { path: 'payments/wallet', label: 'Wallet', group: 'Client' },
  { path: 'payments/history', label: 'Payment History', group: 'Client' },
  { path: 'payments/[id]', label: 'Payment Detail', group: 'Client', isDynamic: true },

  { path: 'projects', label: 'Projects', group: 'Client' },
  { path: 'projects/[id]', label: 'Project Detail', group: 'Client', isDynamic: true },
  { path: 'projects/[id]/start', label: 'Start Project', group: 'Client', isDynamic: true },
  { path: 'projects/[id]/complete', label: 'Complete Project', group: 'Client', isDynamic: true },
  { path: 'projects/[id]/cancel', label: 'Cancel Project', group: 'Client', isDynamic: true },
  { path: 'projects/[id]/delivery', label: 'Delivery Proof', group: 'Client', isDynamic: true },
  {
    path: 'projects/[id]/milestones',
    label: 'Project Milestones',
    group: 'Client',
    isDynamic: true,
  },

  { path: 'milestones', label: 'Milestones', group: 'Client' },
  { path: 'milestones/new', label: 'New Milestone', group: 'Client' },
  { path: 'milestones/[id]', label: 'Milestone Detail', group: 'Client', isDynamic: true },
  { path: 'milestones/[id]/edit', label: 'Edit Milestone', group: 'Client', isDynamic: true },

  { path: 'requests', label: 'Requests', group: 'Client' },
  { path: 'requests/new', label: 'New Request', group: 'Client' },
  { path: 'requests/my-requests', label: 'My Requests', group: 'Client' },
  { path: 'requests/[id]', label: 'Request Detail', group: 'Client', isDynamic: true },
  { path: 'requests/[id]/edit', label: 'Edit Request', group: 'Client', isDynamic: true },
  { path: 'requests/[id]/offers', label: 'Request Offers', group: 'Client', isDynamic: true },

  { path: 'reviews', label: 'Reviews', group: 'Client' },
  { path: 'reviews/new', label: 'New Review', group: 'Client' },
  { path: 'reviews/[id]', label: 'Review Detail', group: 'Client', isDynamic: true },

  { path: 'suppliers', label: 'Suppliers', group: 'Client' },
  { path: 'suppliers/me', label: 'My Supplier Profile', group: 'Client' },
  { path: 'suppliers/me/edit', label: 'Edit My Supplier Profile', group: 'Client' },
  { path: 'suppliers/[id]', label: 'Supplier Detail', group: 'Client', isDynamic: true },
  {
    path: 'suppliers/[id]/portfolio',
    label: 'Supplier Portfolio',
    group: 'Client',
    isDynamic: true,
  },

  { path: 'users/[id]', label: 'User Profile', group: 'Client', isDynamic: true },

  // Supplier pages
  { path: 'offers', label: 'My Offers', group: 'Supplier' },
  { path: 'offers/new', label: 'New Offer', group: 'Supplier' },
  { path: 'offers/[id]', label: 'Offer Detail', group: 'Supplier', isDynamic: true },
  { path: 'offers/[id]/edit', label: 'Edit Offer', group: 'Supplier', isDynamic: true },
  { path: 'portfolio', label: 'My Portfolio', group: 'Supplier' },
  { path: 'stats', label: 'My Stats', group: 'Supplier' },
  { path: 'supplier-profile/setup', label: 'Profile Setup', group: 'Supplier' },
  { path: 'supplier-profile/edit', label: 'Edit Supplier Profile', group: 'Supplier' },
  { path: 'supplier-projects/[id]', label: 'Supplier Project', group: 'Supplier', isDynamic: true },

  // Admin pages
  { path: 'admin/dashboard', label: 'Admin Dashboard', group: 'Admin' },
  { path: 'admin/users', label: 'Users', group: 'Admin' },
  { path: 'admin/users/[id]', label: 'User Detail', group: 'Admin', isDynamic: true },
  { path: 'admin/categories', label: 'Categories', group: 'Admin' },
  { path: 'admin/categories/new', label: 'New Category', group: 'Admin' },
  { path: 'admin/categories/[id]', label: 'Category Detail', group: 'Admin', isDynamic: true },
  { path: 'admin/categories/[id]/edit', label: 'Edit Category', group: 'Admin', isDynamic: true },
  { path: 'admin/requests', label: 'Requests', group: 'Admin' },
  { path: 'admin/offers', label: 'Offers', group: 'Admin' },
  { path: 'admin/projects', label: 'Projects', group: 'Admin' },
  { path: 'admin/disputes', label: 'Disputes', group: 'Admin' },
  { path: 'admin/disputes/[id]', label: 'Dispute Detail', group: 'Admin', isDynamic: true },
  { path: 'admin/payments', label: 'Payments', group: 'Admin' },
  { path: 'admin/payments/[id]', label: 'Payment Detail', group: 'Admin', isDynamic: true },
  { path: 'admin/reviews', label: 'Reviews', group: 'Admin' },
  { path: 'admin/reviews/new', label: 'New Review', group: 'Admin' },
  { path: 'admin/reviews/[id]', label: 'Review Detail', group: 'Admin', isDynamic: true },
  { path: 'admin/reviews/[id]/edit', label: 'Edit Review', group: 'Admin', isDynamic: true },
  { path: 'admin/reports', label: 'Reports', group: 'Admin' },
  { path: 'admin/analytics', label: 'Analytics', group: 'Admin' },
  { path: 'admin/verification', label: 'Verification', group: 'Admin' },
  { path: 'admin/suppliers', label: 'Suppliers', group: 'Admin' },
  { path: 'admin/settings', label: 'Settings', group: 'Admin' },
];

const STORAGE_KEY = 'manual-review-sessions';
const CURRENT_SESSION_KEY = 'manual-review-current-session';

// Mock data IDs for dynamic routes
const MOCK_IDS: Record<string, string> = {
  '[slug]': 'tech-solutions',
  '[id]': '1',
  'notifications/[id]': 'notif-1',
  'messages/[id]': 'conv-1',
  'contracts/[id]': 'contract-1',
  'projects/[id]': '1',
  'milestones/[id]': 'milestone-1',
  'reviews/[id]': 'review-1',
  'disputes/[id]': 'dispute-1',
  'payments/[id]': 'payment-1',
  'requests/[id]': '1',
  'offers/[id]': 'offer-1',
  'suppliers/[id]': '1',
  'users/[id]': '1',
  'admin/categories/[id]': '1',
  'admin/users/[id]': '1',
  'admin/disputes/[id]': 'dispute-1',
  'admin/payments/[id]': 'payment-1',
  'admin/reviews/[id]': 'review-1',
};

const STATUS_OPTIONS: {
  value: ReviewStatus;
  label: string;
  color: string;
  icon: React.ComponentType<{ className?: string }> | null;
}[] = [
  { value: 'pending', label: 'معلق', color: cssVars.neutral.textMuted, icon: null },
  { value: 'reviewed', label: 'مكتمل', color: cssVars.status.success, icon: CheckCircle2 },
  { value: 'issues', label: 'لديه مشاكل', color: cssVars.status.warning, icon: AlertCircle },
];

const resolveDynamicRoute = (path: string): string => {
  let resolvedPath = path;

  if (resolvedPath.includes('[slug]')) {
    resolvedPath = resolvedPath.replace('[slug]', MOCK_IDS['[slug]']);
  }

  if (resolvedPath.includes('[id]')) {
    const specificId = MOCK_IDS[path] || MOCK_IDS['[id]'];
    resolvedPath = resolvedPath.replace('[id]', specificId);
  }

  return resolvedPath;
};

// Status Dropdown Component
function StatusDropdown({
  currentStatus,
  onStatusChange,
}: {
  currentStatus: ReviewStatus;
  onStatusChange: (status: ReviewStatus) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const currentOption = STATUS_OPTIONS.find((opt) => opt.value === currentStatus);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-1 rounded-lg px-2 py-1 transition-colors hover:opacity-80"
        style={{
          backgroundColor: `color-mix(in srgb, ${currentOption?.color || cssVars.neutral.textMuted} 15%, transparent)`,
          color: currentOption?.color || cssVars.neutral.textMuted,
        }}
        title="تغيير الحالة"
      >
        {currentOption?.icon ? (
          <currentOption.icon className="h-3.5 w-3.5" />
        ) : (
          <div
            className="h-3.5 w-3.5 rounded-full border-2"
            style={{ borderColor: currentOption?.color || cssVars.neutral.textMuted }}
          />
        )}
        <span className="text-xs font-medium">{currentOption?.label}</span>
        <ChevronDown className="h-3 w-3" />
      </button>

      {isOpen && (
        <div
          className="absolute left-0 top-full z-50 mt-1 min-w-full overflow-hidden rounded-lg border-2 shadow-lg"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          {STATUS_OPTIONS.map((option) => {
            const Icon = option.icon;
            const isSelected = option.value === currentStatus;

            return (
              <button
                key={option.value}
                onClick={(e) => {
                  e.stopPropagation();
                  onStatusChange(option.value);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-xs transition-colors hover:opacity-80 ${
                  isSelected ? 'font-semibold' : ''
                }`}
                style={{
                  backgroundColor: isSelected
                    ? `color-mix(in srgb, ${option.color} 10%, transparent)`
                    : 'transparent',
                  color: option.color,
                }}
              >
                {Icon ? (
                  <Icon className="h-3.5 w-3.5" />
                ) : (
                  <div
                    className="h-3.5 w-3.5 rounded-full border-2"
                    style={{ borderColor: option.color }}
                  />
                )}
                <span>{option.label}</span>
                {isSelected && <CheckCircle2 className="ml-auto h-3 w-3" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function ManualReviewNavigator() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<ReviewStatus | 'all'>('all');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(['Public', 'Auth', 'Main', 'Client', 'Supplier', 'Admin'])
  );
  const [sessions, setSessions] = useState<TestSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Record<string, PageReview>>({});
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [notesText, setNotesText] = useState('');
  const [showSessionManager, setShowSessionManager] = useState(false);
  const [newSessionName, setNewSessionName] = useState('');
  const [newTesterName, setNewTesterName] = useState('');
  const [newTestReason, setNewTestReason] = useState('');
  const [editingSessionInfo, setEditingSessionInfo] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const createNewSession = (
    name: string = '',
    testerName: string = '',
    testReason: string = ''
  ) => {
    const sessionName =
      name ||
      `اختبار ${new Date().toLocaleDateString('ar-SA')} ${new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}`;
    const newSession: TestSession = {
      id: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: sessionName,
      testerName: testerName || undefined,
      testReason: testReason || undefined,
      scenarios: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      reviews: {},
    };

    setSessions((prev) => (Array.isArray(prev) ? [...prev, newSession] : [newSession]));
    setCurrentSessionId(newSession.id);
    setReviews({});
    localStorage.setItem(CURRENT_SESSION_KEY, newSession.id);
    setShowSessionManager(false);
    setNewSessionName('');
    setNewTesterName('');
    setNewTestReason('');
  };

  useEffect(() => {
    const savedSessions = localStorage.getItem(STORAGE_KEY);
    const savedCurrentSession = localStorage.getItem(CURRENT_SESSION_KEY);

    if (savedSessions) {
      try {
        const parsedSessions = JSON.parse(savedSessions) as TestSession[];
        setTimeout(() => {
          setSessions(parsedSessions);

          if (savedCurrentSession && parsedSessions.find((s) => s.id === savedCurrentSession)) {
            setCurrentSessionId(savedCurrentSession);
            const currentSession = parsedSessions.find((s) => s.id === savedCurrentSession);
            if (currentSession) {
              setReviews(currentSession.reviews);
            }
          } else if (parsedSessions.length > 0) {
            const mostRecent = parsedSessions.sort(
              (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            )[0];
            setCurrentSessionId(mostRecent.id);
            setReviews(mostRecent.reviews);
            localStorage.setItem(CURRENT_SESSION_KEY, mostRecent.id);
          }
        }, 0);
      } catch (e) {
        console.error('Failed to load sessions:', e);
      }
    } else {
      setTimeout(() => {
        createNewSession('اختبار أولي');
      }, 0);
    }

    // Listen for focused test suite events
    const handleFocusedTestSuite = (event: CustomEvent) => {
      const { sessionName, testerName, testReason, scenarios } = event.detail;
      const newSessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newSession: TestSession = {
        id: newSessionId,
        name: sessionName,
        testerName: testerName || undefined,
        testReason: testReason || undefined,
        scenarios:
          scenarios?.map((s: Omit<TestScenario, 'id'>) => ({
            ...s,
            id: `scenario-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          })) || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        reviews: {},
      };

      setSessions((prev) => (Array.isArray(prev) ? [...prev, newSession] : [newSession]));
      setCurrentSessionId(newSessionId);
      setReviews({});
      localStorage.setItem(CURRENT_SESSION_KEY, newSessionId);
      setShowSessionManager(false);
    };

    window.addEventListener('start-focused-test-suite', handleFocusedTestSuite as EventListener);

    return () => {
      window.removeEventListener(
        'start-focused-test-suite',
        handleFocusedTestSuite as EventListener
      );
    };
  }, []);

  const addScenario = (scenario: Omit<TestScenario, 'id'>) => {
    if (!currentSessionId) return;
    const newScenario: TestScenario = {
      ...scenario,
      id: `scenario-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    setSessions((prevSessions) => {
      if (!Array.isArray(prevSessions)) return prevSessions;
      return prevSessions.map((session) => {
        if (session.id === currentSessionId) {
          return {
            ...session,
            scenarios: [...(session.scenarios || []), newScenario],
            updatedAt: new Date().toISOString(),
          };
        }
        return session;
      });
    });
  };

  const removeScenario = (scenarioId: string) => {
    if (!currentSessionId) return;
    setSessions((prevSessions) => {
      if (!Array.isArray(prevSessions)) return prevSessions;
      return prevSessions.map((session) => {
        if (session.id === currentSessionId) {
          return {
            ...session,
            scenarios: (session.scenarios || []).filter((s) => s.id !== scenarioId),
            updatedAt: new Date().toISOString(),
          };
        }
        return session;
      });
    });
  };

  const updateSessionInfo = (testerName: string, testReason: string) => {
    if (!currentSessionId) return;
    setSessions((prevSessions) => {
      if (!Array.isArray(prevSessions)) return prevSessions;
      return prevSessions.map((session) => {
        if (session.id === currentSessionId) {
          return {
            ...session,
            testerName: testerName || undefined,
            testReason: testReason || undefined,
            updatedAt: new Date().toISOString(),
          };
        }
        return session;
      });
    });
    setEditingSessionInfo(false);
  };

  useEffect(() => {
    if (currentSessionId) {
      setTimeout(() => {
        setSessions((prevSessions) => {
          if (!Array.isArray(prevSessions) || prevSessions.length === 0) {
            return prevSessions;
          }

          const updatedSessions = prevSessions.map((session) => {
            if (session.id === currentSessionId) {
              return {
                ...session,
                reviews,
                updatedAt: new Date().toISOString(),
              };
            }
            return session;
          });

          localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSessions));
          return updatedSessions;
        });
      }, 0);
    }
  }, [reviews, currentSessionId]);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const toggleGroup = (group: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(group)) {
      newExpanded.delete(group);
    } else {
      newExpanded.add(group);
    }
    setExpandedGroups(newExpanded);
  };

  const navigateToPage = (path: string) => {
    const resolvedPath = resolveDynamicRoute(path);
    const fullPath = `/${locale}/${resolvedPath}`;
    router.push(fullPath);
  };

  const updateReviewStatus = (path: string, status: ReviewStatus) => {
    setReviews((prev) => ({
      ...prev,
      [path]: {
        ...prev[path],
        status,
        reviewedAt: status !== 'pending' ? new Date().toISOString() : undefined,
      },
    }));
  };

  const updateReviewNotes = (path: string, notes: string) => {
    setReviews((prev) => ({
      ...prev,
      [path]: {
        ...prev[path],
        notes: notes.trim() || undefined,
      },
    }));
    setEditingNotes(null);
    setNotesText('');
  };

  const switchSession = (sessionId: string) => {
    if (!Array.isArray(sessions)) return;
    const session = sessions.find((s) => s.id === sessionId);
    if (session) {
      setCurrentSessionId(sessionId);
      setReviews(session.reviews);
      localStorage.setItem(CURRENT_SESSION_KEY, sessionId);
      setShowSessionManager(false);
    }
  };

  const deleteSession = (sessionId: string) => {
    if (!Array.isArray(sessions)) return;
    if (confirm('هل أنت متأكد من حذف هذه الجلسة؟')) {
      const updatedSessions = sessions.filter((s) => s.id !== sessionId);
      setSessions(updatedSessions);

      if (currentSessionId === sessionId) {
        if (updatedSessions.length > 0) {
          switchSession(updatedSessions[0].id);
        } else {
          createNewSession('اختبار جديد');
        }
      }
    }
  };

  const exportToJSON = () => {
    if (!Array.isArray(sessions)) return;
    const currentSession = sessions.find((s) => s.id === currentSessionId);
    if (!currentSession) return;

    const exportData = {
      session: {
        id: currentSession.id,
        name: currentSession.name,
        createdAt: currentSession.createdAt,
        updatedAt: currentSession.updatedAt,
      },
      pages: ALL_PAGES.map((page) => ({
        path: page.path,
        actualPath: page.isDynamic ? resolveDynamicRoute(page.path) : page.path,
        label: page.label,
        group: page.group,
        isDynamic: page.isDynamic,
        review: currentSession.reviews[page.path] || { status: 'pending' },
      })),
      statistics: {
        total: ALL_PAGES.length,
        reviewed: Object.values(currentSession.reviews).filter((r) => r.status === 'reviewed')
          .length,
        issues: Object.values(currentSession.reviews).filter((r) => r.status === 'issues').length,
        pending:
          ALL_PAGES.length -
          Object.values(currentSession.reviews).filter((r) => r.status !== 'pending').length,
      },
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `test-review-${currentSession.name.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportToMarkdown = () => {
    if (!Array.isArray(sessions)) return;
    const currentSession = sessions.find((s) => s.id === currentSessionId);
    if (!currentSession) return;

    let markdown = `# تقرير المراجعة اليدوية\n\n`;
    markdown += `**اسم الجلسة:** ${currentSession.name}\n`;
    if (currentSession.testerName) {
      markdown += `**اسم المختبر:** ${currentSession.testerName}\n`;
    }
    if (currentSession.testReason) {
      markdown += `**سبب الاختبار:** ${currentSession.testReason}\n`;
    }
    markdown += `**تاريخ الإنشاء:** ${new Date(currentSession.createdAt).toLocaleString('ar-SA')}\n`;
    markdown += `**آخر تحديث:** ${new Date(currentSession.updatedAt).toLocaleString('ar-SA')}\n\n`;

    if (currentSession.scenarios && currentSession.scenarios.length > 0) {
      markdown += `## سيناريوهات الاختبار\n\n`;
      currentSession.scenarios.forEach((scenario, index) => {
        markdown += `### ${index + 1}. ${scenario.name}\n\n`;
        markdown += `- **النوع:** ${scenario.type}\n`;
        markdown += `- **الوصف:** ${scenario.description}\n`;
        if (scenario.pages && scenario.pages.length > 0) {
          markdown += `- **الصفحات المستهدفة:** ${scenario.pages.join(', ')}\n`;
        }
        markdown += `\n`;
      });
      markdown += `\n`;
    }

    const stats = {
      total: ALL_PAGES.length,
      reviewed: Object.values(currentSession.reviews).filter((r) => r.status === 'reviewed').length,
      issues: Object.values(currentSession.reviews).filter((r) => r.status === 'issues').length,
      pending:
        ALL_PAGES.length -
        Object.values(currentSession.reviews).filter((r) => r.status !== 'pending').length,
    };

    markdown += `## الإحصائيات\n\n`;
    markdown += `- **الإجمالي:** ${stats.total} صفحة\n`;
    markdown += `- **مكتمل:** ${stats.reviewed} صفحة\n`;
    markdown += `- **لديه مشاكل:** ${stats.issues} صفحة\n`;
    markdown += `- **معلق:** ${stats.pending} صفحة\n`;
    markdown += `- **نسبة الإكمال:** ${Math.round((stats.reviewed / stats.total) * 100)}%\n\n`;

    const groupedPages = ALL_PAGES.reduce(
      (acc, page) => {
        const group = page.group || 'Other';
        if (!acc[group]) {
          acc[group] = [];
        }
        acc[group].push(page);
        return acc;
      },
      {} as Record<string, PageRoute[]>
    );

    Object.entries(groupedPages).forEach(([group, pages]) => {
      markdown += `## ${group}\n\n`;

      pages.forEach((page) => {
        const review = currentSession.reviews[page.path];
        const status = review?.status || 'pending';
        const statusEmoji = status === 'reviewed' ? '✅' : status === 'issues' ? '⚠️' : '⏳';
        const actualPath = page.isDynamic ? resolveDynamicRoute(page.path) : page.path;

        markdown += `### ${statusEmoji} ${page.label}\n\n`;
        markdown += `- **المسار:** \`${actualPath}\`\n`;
        if (page.isDynamic) {
          markdown += `- **المسار الأصلي:** \`${page.path}\` (ديناميكي)\n`;
        }
        markdown += `- **الحالة:** ${status === 'reviewed' ? 'مكتمل' : status === 'issues' ? 'لديه مشاكل' : 'معلق'}\n`;

        if (review?.reviewedAt) {
          markdown += `- **تاريخ المراجعة:** ${new Date(review.reviewedAt).toLocaleString('ar-SA')}\n`;
        }

        if (review?.notes) {
          markdown += `- **الملاحظات:**\n\n${review.notes}\n\n`;
        }

        markdown += `\n`;
      });
    });

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `test-review-${currentSession.name.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearCurrentSession = () => {
    if (confirm('هل أنت متأكد من حذف جميع التقدم في هذه الجلسة؟')) {
      setReviews({});
    }
  };

  const getReviewStatus = (path: string): ReviewStatus => {
    return reviews[path]?.status || 'pending';
  };

  const getReviewNotes = (path: string): string => {
    return reviews[path]?.notes || '';
  };

  const filteredPages = ALL_PAGES.filter((page) => {
    const matchesSearch =
      page.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.group?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filterStatus === 'all' || getReviewStatus(page.path) === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const groupedPages = filteredPages.reduce(
    (acc, page) => {
      const group = page.group || 'Other';
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(page);
      return acc;
    },
    {} as Record<string, PageRoute[]>
  );

  const isActive = (path: string) => {
    const currentPath = pathname.replace(`/${locale}`, '').replace(/^\//, '');
    if (path === '') {
      return currentPath === '' || currentPath === locale;
    }
    if (path.includes('[')) {
      const resolvedPath = resolveDynamicRoute(path);
      return currentPath === resolvedPath || currentPath.startsWith(`${resolvedPath}/`);
    }
    return currentPath === path || currentPath.startsWith(`${path}/`);
  };

  const stats = {
    total: ALL_PAGES.length,
    reviewed: Object.values(reviews).filter((r) => r.status === 'reviewed').length,
    issues: Object.values(reviews).filter((r) => r.status === 'issues').length,
    pending: ALL_PAGES.length - Object.values(reviews).filter((r) => r.status !== 'pending').length,
  };

  const progressPercentage = stats.total > 0 ? (stats.reviewed / stats.total) * 100 : 0;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all hover:scale-110"
        style={{
          backgroundColor: cssVars.secondary.DEFAULT,
          color: cssVars.neutral.bg,
        }}
        title="مراجعة يدوية"
      >
        {isOpen ? <X className="h-6 w-6" /> : <ClipboardCheck className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div
          className="fixed right-4 top-4 z-50 flex h-[calc(100vh-2rem)] w-96 flex-col rounded-2xl border-2 shadow-2xl"
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
              <ClipboardCheck className="h-5 w-5" style={{ color: cssVars.secondary.DEFAULT }} />
              <div>
                <h2 className="text-lg font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                  مراجعة يدوية
                </h2>
                {Array.isArray(sessions) && sessions.find((s) => s.id === currentSessionId) && (
                  <>
                    <div
                      className="text-xs opacity-70"
                      style={{ color: cssVars.neutral.textMuted }}
                    >
                      {sessions.find((s) => s.id === currentSessionId)?.name}
                    </div>
                    {sessions.find((s) => s.id === currentSessionId)?.testerName && (
                      <div
                        className="text-xs opacity-60"
                        style={{ color: cssVars.neutral.textMuted }}
                      >
                        مختبر: {sessions.find((s) => s.id === currentSessionId)?.testerName}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSessionManager(!showSessionManager)}
                className="rounded-lg p-1.5 transition-colors hover:opacity-80"
                style={{ color: cssVars.neutral.textSecondary }}
                title="إدارة الجلسات"
              >
                <FolderOpen className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 transition-colors hover:opacity-80"
                style={{ color: cssVars.neutral.textSecondary }}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {showSessionManager && (
            <div
              className="max-h-64 overflow-y-auto border-b-2 p-4"
              style={{
                borderColor: cssVars.neutral.border,
                backgroundColor: `color-mix(in srgb, ${cssVars.neutral.border} 10%, transparent)`,
              }}
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold" style={{ color: cssVars.neutral.DEFAULT }}>
                  الجلسات ({Array.isArray(sessions) ? sessions.length : 0})
                </h3>
                <button
                  onClick={() => createNewSession(newSessionName, newTesterName, newTestReason)}
                  className="flex items-center gap-1 rounded px-2 py-1 text-xs transition-colors hover:opacity-80"
                  style={{
                    backgroundColor: cssVars.primary.DEFAULT,
                    color: cssVars.neutral.bg,
                  }}
                >
                  <Plus className="h-3 w-3" />
                  جديد
                </button>
              </div>
              <div className="mb-2 space-y-2">
                <input
                  type="text"
                  placeholder="اسم الجلسة الجديدة..."
                  value={newSessionName}
                  onChange={(e) => setNewSessionName(e.target.value)}
                  className="w-full rounded border-2 px-2 py-1 text-xs focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: cssVars.neutral.bg,
                    borderColor: cssVars.neutral.border,
                    color: cssVars.neutral.DEFAULT,
                  }}
                />
                <input
                  type="text"
                  placeholder="اسم المختبر (اختياري)..."
                  value={newTesterName}
                  onChange={(e) => setNewTesterName(e.target.value)}
                  className="w-full rounded border-2 px-2 py-1 text-xs focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: cssVars.neutral.bg,
                    borderColor: cssVars.neutral.border,
                    color: cssVars.neutral.DEFAULT,
                  }}
                />
                <textarea
                  placeholder="سبب الاختبار (اختياري)..."
                  value={newTestReason}
                  onChange={(e) => setNewTestReason(e.target.value)}
                  className="w-full rounded border-2 px-2 py-1 text-xs focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: cssVars.neutral.bg,
                    borderColor: cssVars.neutral.border,
                    color: cssVars.neutral.DEFAULT,
                  }}
                  rows={2}
                />
              </div>
              <div className="space-y-1">
                {Array.isArray(sessions) &&
                  sessions
                    .sort(
                      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
                    )
                    .map((session) => {
                      const isActiveSession = session.id === currentSessionId;
                      const sessionStats = {
                        reviewed: Object.values(session.reviews).filter(
                          (r) => r.status === 'reviewed'
                        ).length,
                        total: ALL_PAGES.length,
                      };
                      return (
                        <div
                          key={session.id}
                          className={`flex items-center justify-between rounded p-2 text-xs ${
                            isActiveSession ? 'ring-2' : ''
                          }`}
                          style={{
                            backgroundColor: isActiveSession
                              ? `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`
                              : 'transparent',
                            borderColor: isActiveSession ? cssVars.primary.DEFAULT : 'transparent',
                          }}
                        >
                          <button
                            onClick={() => switchSession(session.id)}
                            className="flex-1 text-left"
                          >
                            <div className="font-medium" style={{ color: cssVars.neutral.DEFAULT }}>
                              {session.name}
                            </div>
                            <div
                              className="text-xs opacity-60"
                              style={{ color: cssVars.neutral.textMuted }}
                            >
                              {Math.round((sessionStats.reviewed / sessionStats.total) * 100)}% •{' '}
                              {new Date(session.updatedAt).toLocaleDateString('ar-SA')}
                            </div>
                          </button>
                          <button
                            onClick={() => deleteSession(session.id)}
                            className="ml-2 rounded p-1 transition-colors hover:opacity-80"
                            style={{ color: cssVars.neutral.textSecondary }}
                            title="حذف الجلسة"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      );
                    })}
              </div>
            </div>
          )}

          {Array.isArray(sessions) && sessions.find((s) => s.id === currentSessionId) && (
            <div
              className="border-b-2 p-4"
              style={{
                borderColor: cssVars.neutral.border,
                backgroundColor: `color-mix(in srgb, ${cssVars.neutral.border} 5%, transparent)`,
              }}
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-semibold" style={{ color: cssVars.neutral.DEFAULT }}>
                  معلومات الجلسة
                </h3>
                <button
                  onClick={() => setEditingSessionInfo(!editingSessionInfo)}
                  className="text-xs opacity-60 hover:opacity-100"
                  style={{ color: cssVars.primary.DEFAULT }}
                >
                  {editingSessionInfo ? 'إلغاء' : 'تعديل'}
                </button>
              </div>
              {!editingSessionInfo ? (
                <div className="space-y-1 text-xs">
                  {sessions.find((s) => s.id === currentSessionId)?.testerName && (
                    <div>
                      <span style={{ color: cssVars.neutral.textMuted }}>المختبر: </span>
                      <span style={{ color: cssVars.neutral.DEFAULT }}>
                        {sessions.find((s) => s.id === currentSessionId)?.testerName}
                      </span>
                    </div>
                  )}
                  {sessions.find((s) => s.id === currentSessionId)?.testReason && (
                    <div>
                      <span style={{ color: cssVars.neutral.textMuted }}>سبب الاختبار: </span>
                      <span style={{ color: cssVars.neutral.DEFAULT }}>
                        {sessions.find((s) => s.id === currentSessionId)?.testReason}
                      </span>
                    </div>
                  )}
                  {!sessions.find((s) => s.id === currentSessionId)?.testerName &&
                    !sessions.find((s) => s.id === currentSessionId)?.testReason && (
                      <div style={{ color: cssVars.neutral.textMuted }}>لا توجد معلومات محددة</div>
                    )}
                </div>
              ) : (
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="اسم المختبر..."
                    defaultValue={sessions.find((s) => s.id === currentSessionId)?.testerName || ''}
                    onBlur={(e) => {
                      const current = sessions.find((s) => s.id === currentSessionId);
                      updateSessionInfo(e.target.value, current?.testReason || '');
                    }}
                    className="w-full rounded border-2 px-2 py-1 text-xs focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: cssVars.neutral.bg,
                      borderColor: cssVars.neutral.border,
                      color: cssVars.neutral.DEFAULT,
                    }}
                  />
                  <textarea
                    placeholder="سبب الاختبار..."
                    defaultValue={sessions.find((s) => s.id === currentSessionId)?.testReason || ''}
                    onBlur={(e) => {
                      const current = sessions.find((s) => s.id === currentSessionId);
                      updateSessionInfo(current?.testerName || '', e.target.value);
                    }}
                    className="w-full rounded border-2 px-2 py-1 text-xs focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: cssVars.neutral.bg,
                      borderColor: cssVars.neutral.border,
                      color: cssVars.neutral.DEFAULT,
                    }}
                    rows={2}
                  />
                </div>
              )}
            </div>
          )}

          {Array.isArray(sessions) && sessions.find((s) => s.id === currentSessionId) && (
            <div className="border-b-2 p-4" style={{ borderColor: cssVars.neutral.border }}>
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-semibold" style={{ color: cssVars.neutral.DEFAULT }}>
                  سيناريوهات الاختبار (
                  {sessions.find((s) => s.id === currentSessionId)?.scenarios?.length || 0})
                </h3>
                <button
                  onClick={() => {
                    const scenarioName = prompt('اسم السيناريو:');
                    if (scenarioName) {
                      const scenarioType =
                        (prompt(
                          'النوع (theme/language/ux/feature/accessibility/performance/other):'
                        ) as TestScenario['type']) || 'other';
                      const scenarioDesc = prompt('الوصف:') || '';
                      addScenario({
                        name: scenarioName,
                        description: scenarioDesc,
                        type: scenarioType,
                      });
                    }
                  }}
                  className="flex items-center gap-1 rounded px-2 py-1 text-xs transition-colors hover:opacity-80"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${cssVars.secondary.DEFAULT} 15%, transparent)`,
                    color: cssVars.secondary.DEFAULT,
                  }}
                >
                  <Plus className="h-3 w-3" />
                  إضافة
                </button>
              </div>
              <div className="max-h-32 space-y-2 overflow-y-auto">
                {sessions
                  .find((s) => s.id === currentSessionId)
                  ?.scenarios?.map((scenario) => (
                    <div
                      key={scenario.id}
                      className="flex items-start justify-between rounded border-2 p-2 text-xs"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${cssVars.neutral.border} 10%, transparent)`,
                        borderColor: cssVars.neutral.border,
                      }}
                    >
                      <div className="flex-1">
                        <div className="font-medium" style={{ color: cssVars.neutral.DEFAULT }}>
                          {scenario.name}
                        </div>
                        <div
                          className="mt-0.5 opacity-70"
                          style={{ color: cssVars.neutral.textMuted }}
                        >
                          [{scenario.type}] {scenario.description}
                        </div>
                      </div>
                      <button
                        onClick={() => removeScenario(scenario.id)}
                        className="ml-2 rounded p-1 transition-colors hover:opacity-80"
                        style={{ color: cssVars.neutral.textSecondary }}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )) || (
                  <div
                    className="py-2 text-center text-xs"
                    style={{ color: cssVars.neutral.textMuted }}
                  >
                    لا توجد سيناريوهات
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="border-b-2 p-4" style={{ borderColor: cssVars.neutral.border }}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span style={{ color: cssVars.neutral.DEFAULT }}>التقدم</span>
              <span className="font-semibold" style={{ color: cssVars.primary.DEFAULT }}>
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <div
              className="mb-3 h-2 w-full overflow-hidden rounded-full"
              style={{ backgroundColor: cssVars.neutral.border }}
            >
              <div
                className="h-full transition-all duration-300"
                style={{
                  width: `${progressPercentage}%`,
                  backgroundColor: cssVars.primary.DEFAULT,
                }}
              />
            </div>
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div className="text-center">
                <div className="font-semibold" style={{ color: cssVars.neutral.DEFAULT }}>
                  {stats.total}
                </div>
                <div style={{ color: cssVars.neutral.textMuted }}>الإجمالي</div>
              </div>
              <div className="text-center">
                <div className="font-semibold" style={{ color: cssVars.status.success }}>
                  {stats.reviewed}
                </div>
                <div style={{ color: cssVars.neutral.textMuted }}>مكتمل</div>
              </div>
              <div className="text-center">
                <div className="font-semibold" style={{ color: cssVars.status.warning }}>
                  {stats.issues}
                </div>
                <div style={{ color: cssVars.neutral.textMuted }}>مشاكل</div>
              </div>
              <div className="text-center">
                <div className="font-semibold" style={{ color: cssVars.neutral.textSecondary }}>
                  {stats.pending}
                </div>
                <div style={{ color: cssVars.neutral.textMuted }}>معلق</div>
              </div>
            </div>
          </div>

          <div className="border-b-2 p-4" style={{ borderColor: cssVars.neutral.border }}>
            <div className="relative mb-3">
              <Search
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                style={{ color: cssVars.neutral.textMuted }}
              />
              <input
                type="text"
                placeholder="بحث في الصفحات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border-2 px-10 py-2 text-sm focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: cssVars.neutral.bg,
                  borderColor: cssVars.neutral.border,
                  color: cssVars.neutral.DEFAULT,
                }}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`flex-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  filterStatus === 'all' ? 'font-semibold' : ''
                }`}
                style={{
                  backgroundColor:
                    filterStatus === 'all'
                      ? `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`
                      : 'transparent',
                  color: filterStatus === 'all' ? cssVars.primary.DEFAULT : cssVars.neutral.DEFAULT,
                }}
              >
                الكل
              </button>
              <button
                onClick={() => setFilterStatus('pending')}
                className={`flex-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  filterStatus === 'pending' ? 'font-semibold' : ''
                }`}
                style={{
                  backgroundColor:
                    filterStatus === 'pending'
                      ? `color-mix(in srgb, ${cssVars.neutral.border} 30%, transparent)`
                      : 'transparent',
                  color:
                    filterStatus === 'pending'
                      ? cssVars.neutral.DEFAULT
                      : cssVars.neutral.textSecondary,
                }}
              >
                معلق ({stats.pending})
              </button>
              <button
                onClick={() => setFilterStatus('reviewed')}
                className={`flex-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  filterStatus === 'reviewed' ? 'font-semibold' : ''
                }`}
                style={{
                  backgroundColor:
                    filterStatus === 'reviewed'
                      ? `color-mix(in srgb, ${cssVars.status.success} 15%, transparent)`
                      : 'transparent',
                  color:
                    filterStatus === 'reviewed'
                      ? cssVars.status.success
                      : cssVars.neutral.textSecondary,
                }}
              >
                مكتمل ({stats.reviewed})
              </button>
              <button
                onClick={() => setFilterStatus('issues')}
                className={`flex-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  filterStatus === 'issues' ? 'font-semibold' : ''
                }`}
                style={{
                  backgroundColor:
                    filterStatus === 'issues'
                      ? `color-mix(in srgb, ${cssVars.status.warning} 15%, transparent)`
                      : 'transparent',
                  color:
                    filterStatus === 'issues'
                      ? cssVars.status.warning
                      : cssVars.neutral.textSecondary,
                }}
              >
                مشاكل ({stats.issues})
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {Object.entries(groupedPages).map(([group, pages]) => (
              <div key={group} className="mb-4">
                <button
                  onClick={() => toggleGroup(group)}
                  className="mb-2 flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:opacity-80"
                  style={{ color: cssVars.primary.DEFAULT }}
                >
                  <span>{group}</span>
                  {expandedGroups.has(group) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>

                {expandedGroups.has(group) && (
                  <div className="space-y-1">
                    {pages.map((page) => {
                      const active = isActive(page.path);
                      const status = getReviewStatus(page.path);
                      const notes = getReviewNotes(page.path);
                      const isEditing = editingNotes === page.path;

                      return (
                        <div
                          key={page.path}
                          className={`rounded-lg border-2 p-2 transition-colors ${
                            active ? 'ring-2' : ''
                          }`}
                          style={{
                            backgroundColor: active
                              ? `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`
                              : 'transparent',
                            borderColor: active ? cssVars.primary.DEFAULT : cssVars.neutral.border,
                          }}
                        >
                          <div className="flex items-start gap-2">
                            <div className="min-w-0 flex-1">
                              <div className="mb-2 flex items-center justify-between gap-2">
                                <button
                                  onClick={() => navigateToPage(page.path)}
                                  className="flex-1 text-left"
                                >
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`text-sm ${active ? 'font-semibold' : ''}`}
                                      style={{
                                        color: active
                                          ? cssVars.primary.DEFAULT
                                          : cssVars.neutral.DEFAULT,
                                      }}
                                    >
                                      {page.label}
                                    </span>
                                    {page.isDynamic && (
                                      <span
                                        className="text-xs opacity-60"
                                        title="مسار مع mock data"
                                      >
                                        [mock]
                                      </span>
                                    )}
                                  </div>
                                  {page.path && (
                                    <div className="mt-0.5 text-xs opacity-60">
                                      {page.isDynamic ? resolveDynamicRoute(page.path) : page.path}
                                    </div>
                                  )}
                                </button>

                                <StatusDropdown
                                  currentStatus={status}
                                  onStatusChange={(newStatus) =>
                                    updateReviewStatus(page.path, newStatus)
                                  }
                                />
                              </div>

                              {notes && !isEditing && (
                                <div
                                  className="mt-2 flex items-start gap-2 rounded bg-opacity-50 p-2 text-xs"
                                  style={{
                                    backgroundColor: `color-mix(in srgb, ${cssVars.neutral.border} 20%, transparent)`,
                                  }}
                                >
                                  <FileText
                                    className="mt-0.5 h-3 w-3 flex-shrink-0"
                                    style={{ color: cssVars.neutral.textMuted }}
                                  />
                                  <span
                                    className="flex-1"
                                    style={{ color: cssVars.neutral.textSecondary }}
                                  >
                                    {notes}
                                  </span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setEditingNotes(page.path);
                                      setNotesText(notes);
                                    }}
                                    className="flex-shrink-0 text-xs opacity-60 hover:opacity-100"
                                    style={{ color: cssVars.primary.DEFAULT }}
                                  >
                                    تعديل
                                  </button>
                                </div>
                              )}

                              {isEditing && (
                                <div className="mt-2 space-y-2">
                                  <textarea
                                    value={notesText}
                                    onChange={(e) => setNotesText(e.target.value)}
                                    placeholder="ملاحظات المراجعة..."
                                    className="w-full rounded border-2 p-2 text-xs focus:outline-none focus:ring-2"
                                    style={{
                                      backgroundColor: cssVars.neutral.bg,
                                      borderColor: cssVars.neutral.border,
                                      color: cssVars.neutral.DEFAULT,
                                    }}
                                    rows={2}
                                    autoFocus
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                  <div className="flex gap-2">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        updateReviewNotes(page.path, notesText);
                                      }}
                                      className="flex-1 rounded bg-green-500 px-2 py-1 text-xs text-white hover:bg-green-600"
                                    >
                                      حفظ
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingNotes(null);
                                        setNotesText('');
                                      }}
                                      className="flex-1 rounded bg-gray-500 px-2 py-1 text-xs text-white hover:bg-gray-600"
                                    >
                                      إلغاء
                                    </button>
                                  </div>
                                </div>
                              )}

                              {!notes && !isEditing && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEditingNotes(page.path);
                                    setNotesText('');
                                  }}
                                  className="mt-1 flex items-center gap-1 text-xs opacity-60 hover:opacity-100"
                                  style={{ color: cssVars.neutral.textMuted }}
                                >
                                  <FileText className="h-3 w-3" />
                                  إضافة ملاحظات
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            {filteredPages.length === 0 && (
              <div
                className="py-8 text-center text-sm"
                style={{ color: cssVars.neutral.textSecondary }}
              >
                لم يتم العثور على صفحات
              </div>
            )}
          </div>

          <div
            className="space-y-2 border-t-2 p-3"
            style={{
              borderColor: cssVars.neutral.border,
            }}
          >
            <div className="flex items-center justify-between text-xs">
              <div style={{ color: cssVars.neutral.textMuted }}>
                {filteredPages.length} من {ALL_PAGES.length} صفحة
              </div>
              <button
                onClick={clearCurrentSession}
                className="rounded px-2 py-1 text-xs transition-colors hover:opacity-80"
                style={{
                  color: cssVars.neutral.textSecondary,
                }}
                title="حذف جميع التقدم في هذه الجلسة"
              >
                <XCircle className="mr-1 inline h-3 w-3" />
                مسح التقدم
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={exportToJSON}
                className="flex flex-1 items-center justify-center gap-1 rounded px-2 py-1.5 text-xs transition-colors hover:opacity-80"
                style={{
                  backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
                  color: cssVars.primary.DEFAULT,
                }}
                title="تصدير كـ JSON"
              >
                <Download className="h-3 w-3" />
                JSON
              </button>
              <button
                onClick={exportToMarkdown}
                className="flex flex-1 items-center justify-center gap-1 rounded px-2 py-1.5 text-xs transition-colors hover:opacity-80"
                style={{
                  backgroundColor: `color-mix(in srgb, ${cssVars.secondary.DEFAULT} 15%, transparent)`,
                  color: cssVars.secondary.DEFAULT,
                }}
                title="تصدير كـ Markdown"
              >
                <Download className="h-3 w-3" />
                Markdown
              </button>
            </div>
            <div className="text-center text-xs" style={{ color: cssVars.neutral.textMuted }}>
              وضع التطوير فقط
            </div>
          </div>
        </div>
      )}
    </>
  );
}
