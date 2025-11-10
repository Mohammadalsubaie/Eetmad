import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Bell,
  Bookmark,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock,
  Database,
  DollarSign,
  Filter,
  Info,
  MapPin,
  Megaphone,
  Menu,
  Palette,
  Search,
  Share2,
  Shield,
  Target,
  Terminal,
  TrendingUp,
  User,
  Users,
} from 'lucide-react';
import { useState } from 'react';

function SteelBluePlatform() {
  const [activeTab, setActiveTab] = useState('featured');
  const [savedProjects, setSavedProjects] = useState(new Set([1, 3]));
  const [showNotifications, setShowNotifications] = useState(false);

  const categories = [
    { id: 'tech', name: 'التقنية', icon: Terminal, count: 98, color: '#394867' },
    { id: 'design', name: 'التصميم', icon: Palette, count: 76, color: '#394867' },
    { id: 'business', name: 'الأعمال', icon: Briefcase, count: 59, color: '#394867' },
    { id: 'marketing', name: 'التسويق', icon: Megaphone, count: 54, color: '#394867' },
  ];

  const tenders = [
    {
      id: 1,
      title: 'تطوير منظومة الخدمات الحكومية الإلكترونية الشاملة',
      entity: 'وزارة التحول الرقمي',
      category: 'tech',
      budget: '4.2M - 7.8M',
      currency: 'ر.س',
      deadline: '23 يوماً',
      proposals: 142,
      views: 8947,
      verified: true,
      priority: 'urgent',
      location: 'الرياض',
      publishedDate: '3 أيام',
      rating: 5.0,
      description:
        'مشروع استراتيجي وطني لبناء منظومة متكاملة للخدمات الحكومية الإلكترونية بأعلى معايير الأمان والكفاءة',
      tags: ['Cloud Architecture', 'Microservices', 'Cybersecurity', 'DevOps', 'AI/ML'],
    },
    {
      id: 2,
      title: 'تصميم الهوية البصرية الشاملة لمبادرة وطنية استراتيجية',
      entity: 'الهيئة العامة للترفيه',
      category: 'design',
      budget: '850K - 1.5M',
      currency: 'ر.س',
      deadline: '17 يوماً',
      proposals: 89,
      views: 5621,
      verified: true,
      priority: 'high',
      location: 'جدة',
      publishedDate: '5 أيام',
      rating: 4.9,
      description: 'تطوير هوية بصرية متكاملة ومبتكرة لمبادرة وطنية كبرى تشمل كافة العناصر البصرية',
      tags: ['Brand Design', 'Motion Graphics', 'UI/UX', '3D Design'],
    },
    {
      id: 3,
      title: 'حملة تسويقية وطنية متعددة القنوات والمنصات',
      entity: 'صندوق التنمية الوطني',
      category: 'marketing',
      budget: '2.1M - 3.9M',
      currency: 'ر.س',
      deadline: '9 أيام',
      proposals: 201,
      views: 11234,
      verified: true,
      priority: 'urgent',
      location: 'الرياض',
      publishedDate: '2 يوم',
      rating: 4.8,
      description: 'تخطيط وتنفيذ حملة تسويقية وطنية شاملة عبر جميع القنوات الرقمية والتقليدية',
      tags: ['Digital Marketing', 'Brand Strategy', 'Social Media', 'SEO/SEM'],
    },
    {
      id: 4,
      title: 'استشارات التحول الرقمي والابتكار المؤسسي المتقدم',
      entity: 'وزارة الاتصالات وتقنية المعلومات',
      category: 'business',
      budget: '3.2M - 5.8M',
      currency: 'ر.س',
      deadline: '28 يوماً',
      proposals: 67,
      views: 4892,
      verified: true,
      priority: 'normal',
      location: 'الرياض',
      publishedDate: '7 أيام',
      rating: 4.9,
      description: 'تقديم استشارات استراتيجية شاملة في التحول الرقمي وإعداد خارطة طريق تفصيلية',
      tags: ['Digital Transformation', 'Change Management', 'Innovation'],
    },
  ];

  const stats = [
    { label: 'المنافسات النشطة', value: '287', icon: Activity, trend: '+32', color: '#394867' },
    {
      label: 'القيمة الإجمالية',
      value: '2.4B ر.س',
      icon: DollarSign,
      trend: '+18%',
      color: '#394867',
    },
    { label: 'الجهات الحكومية', value: '124', icon: Building2, trend: '+15', color: '#394867' },
    { label: 'معدل التنفيذ', value: '96%', icon: TrendingUp, trend: '+4%', color: '#2D7A5F' },
  ];

  const toggleSave = (id) => {
    setSavedProjects((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: '#F1F6F9', fontFamily: 'IBM Plex Sans Arabic, sans-serif' }}
    >
      {/* Sophisticated Header */}
      <header
        className="sticky top-0 z-50 border-b backdrop-blur-xl"
        style={{ backgroundColor: 'rgba(33, 42, 62, 0.95)', borderColor: 'rgba(57, 72, 103, 0.2)' }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-8">
              <motion.div whileHover={{ scale: 1.03 }} className="flex items-center gap-3">
                <div className="relative">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ background: 'linear-gradient(135deg, #394867 0%, #212A3E 100%)' }}
                  >
                    <Shield className="h-6 w-6" style={{ color: '#F1F6F9' }} />
                  </div>
                  <div
                    className="absolute -top-1 -right-1 h-4 w-4 rounded-full"
                    style={{ backgroundColor: '#2D7A5F' }}
                  ></div>
                </div>
                <div>
                  <h1 className="text-xl font-bold" style={{ color: '#F1F6F9' }}>
                    المنصة الوطنية
                  </h1>
                  <p className="text-xs font-semibold" style={{ color: '#9BA4B5' }}>
                    للمنافسات الحكومية
                  </p>
                </div>
              </motion.div>

              <nav className="hidden items-center gap-1 lg:flex">
                {['الرئيسية', 'المنافسات', 'الجهات', 'التقارير', 'الدعم'].map((item, idx) => (
                  <button
                    key={item}
                    className="relative rounded-lg px-4 py-2 text-sm font-semibold transition-all"
                    style={{
                      color: idx === 0 ? '#F1F6F9' : '#9BA4B5',
                      backgroundColor: idx === 0 ? 'rgba(57, 72, 103, 0.4)' : 'transparent',
                    }}
                  >
                    {item}
                    {idx === 0 && (
                      <div
                        className="absolute right-2 bottom-0 left-2 h-0.5 rounded-full"
                        style={{ backgroundColor: '#394867' }}
                      ></div>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative rounded-lg p-2.5 transition-all"
                  style={{ backgroundColor: 'rgba(155, 164, 181, 0.15)' }}
                >
                  <Bell className="h-5 w-5" style={{ color: '#F1F6F9' }} />
                  <span
                    className="absolute top-1.5 right-1.5 h-2 w-2 animate-pulse rounded-full"
                    style={{ backgroundColor: '#D4A149' }}
                  ></span>
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 mt-2 w-80 overflow-hidden rounded-xl border shadow-2xl"
                      style={{ backgroundColor: '#FFFFFF', borderColor: '#D5DAE3' }}
                    >
                      <div
                        className="border-b p-4"
                        style={{ backgroundColor: '#F1F6F9', borderColor: '#E8EFF4' }}
                      >
                        <h3 className="font-bold" style={{ color: '#212A3E' }}>
                          الإشعارات
                        </h3>
                      </div>
                      <div className="divide-y" style={{ borderColor: '#E8EFF4' }}>
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="hover:bg-opacity-50 p-4 transition-all"
                            style={{ backgroundColor: i === 1 ? '#EBF2F8' : 'transparent' }}
                          >
                            <div className="flex gap-3">
                              <div
                                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
                                style={{ backgroundColor: '#394867' }}
                              >
                                <Info className="h-5 w-5" style={{ color: '#F1F6F9' }} />
                              </div>
                              <div className="flex-1">
                                <p
                                  className="mb-1 text-sm font-semibold"
                                  style={{ color: '#212A3E' }}
                                >
                                  إشعار جديد من المنصة
                                </p>
                                <p className="text-xs" style={{ color: '#9BA4B5' }}>
                                  منذ {i * 2} ساعات
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                className="flex items-center gap-2 rounded-lg px-4 py-2.5 font-semibold"
                style={{
                  background: 'linear-gradient(135deg, #394867 0%, #2A3650 100%)',
                  color: '#F1F6F9',
                }}
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">حسابي</span>
              </button>

              <button
                className="rounded-lg p-2.5 lg:hidden"
                style={{ backgroundColor: 'rgba(155, 164, 181, 0.15)' }}
              >
                <Menu className="h-5 w-5" style={{ color: '#F1F6F9' }} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Premium Hero */}
      <section
        className="relative overflow-hidden border-b py-24"
        style={{ backgroundColor: '#212A3E', borderColor: 'rgba(57, 72, 103, 0.2)' }}
      >
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute top-0 left-1/4 h-96 w-96 rounded-full blur-3xl"
            style={{ background: '#394867' }}
          ></div>
          <div
            className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full blur-3xl"
            style={{ background: '#9BA4B5' }}
          ></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div
                className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2"
                style={{
                  backgroundColor: 'rgba(57, 72, 103, 0.2)',
                  borderColor: 'rgba(155, 164, 181, 0.3)',
                }}
              >
                <Database className="h-4 w-4" style={{ color: '#9BA4B5' }} />
                <span className="text-sm font-bold" style={{ color: '#9BA4B5' }}>
                  287 منافسة حكومية نشطة
                </span>
              </div>

              <h1
                className="mb-6 text-5xl leading-tight font-bold lg:text-6xl"
                style={{ color: '#F1F6F9' }}
              >
                منصة المنافسات
                <br />
                <span style={{ color: '#9BA4B5' }}>الحكومية الموحدة</span>
              </h1>

              <p className="mb-10 text-xl leading-relaxed" style={{ color: '#A5B4C9' }}>
                نظام متكامل يضمن الشفافية المطلقة والعدالة الكاملة في جميع المنافسات والمشتريات
                الحكومية
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  className="flex items-center gap-3 rounded-xl px-8 py-4 text-lg font-bold transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #394867 0%, #2A3650 100%)',
                    color: '#F1F6F9',
                  }}
                >
                  <span>استكشف المنافسات</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button
                  className="rounded-xl border-2 px-8 py-4 text-lg font-bold transition-all"
                  style={{
                    borderColor: '#9BA4B5',
                    color: '#F1F6F9',
                    backgroundColor: 'rgba(155, 164, 181, 0.1)',
                  }}
                >
                  دليل الاستخدام
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.15 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border p-6 backdrop-blur-sm"
                  style={{
                    backgroundColor: 'rgba(57, 72, 103, 0.3)',
                    borderColor: 'rgba(155, 164, 181, 0.2)',
                  }}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{ backgroundColor: 'rgba(155, 164, 181, 0.2)' }}
                    >
                      <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
                    </div>
                    <span
                      className="rounded px-2 py-1 text-sm font-bold"
                      style={{ backgroundColor: 'rgba(45, 122, 95, 0.2)', color: '#2D7A5F' }}
                    >
                      {stat.trend}
                    </span>
                  </div>
                  <div className="mb-2 text-3xl font-bold" style={{ color: '#F1F6F9' }}>
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold" style={{ color: '#9BA4B5' }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advanced Search */}
      <section
        className="border-b py-12"
        style={{ backgroundColor: '#FFFFFF', borderColor: '#E8EFF4' }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row">
            <div className="relative flex-1">
              <Search
                className="absolute top-1/2 right-5 h-5 w-5 -translate-y-1/2"
                style={{ color: '#9BA4B5' }}
              />
              <input
                type="text"
                placeholder="ابحث في المنافسات، الجهات الحكومية، أو التخصصات..."
                className="h-14 w-full rounded-xl border-2 pr-14 pl-6 text-base font-semibold transition-all outline-none"
                style={{
                  backgroundColor: '#F1F6F9',
                  color: '#212A3E',
                  borderColor: '#D5DAE3',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#394867')}
                onBlur={(e) => (e.target.style.borderColor = '#D5DAE3')}
              />
            </div>

            <div className="flex gap-3">
              <button
                className="flex items-center gap-2 rounded-xl border-2 px-6 py-4 font-bold transition-all"
                style={{ borderColor: '#394867', color: '#394867', backgroundColor: '#FFFFFF' }}
              >
                <Filter className="h-5 w-5" />
                <span className="hidden sm:inline">تصفية</span>
              </button>
              <button
                className="rounded-xl px-8 py-4 font-bold transition-all"
                style={{
                  background: 'linear-gradient(135deg, #394867 0%, #2A3650 100%)',
                  color: '#F1F6F9',
                }}
              >
                بحث
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-4">
            <button
              className="rounded-xl border-2 px-6 py-3 font-semibold whitespace-nowrap transition-all"
              style={{ backgroundColor: '#394867', borderColor: '#394867', color: '#F1F6F9' }}
            >
              الكل{' '}
              <span
                className="mr-2 rounded px-2 py-0.5 text-xs"
                style={{ backgroundColor: 'rgba(241, 246, 249, 0.2)' }}
              >
                287
              </span>
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className="flex items-center gap-2 rounded-xl border-2 px-6 py-3 font-semibold whitespace-nowrap transition-all"
                style={{ backgroundColor: '#FFFFFF', borderColor: '#D5DAE3', color: '#394867' }}
              >
                <cat.icon className="h-5 w-5" />
                <span>{cat.name}</span>
                <span
                  className="rounded px-2 py-0.5 text-xs"
                  style={{ backgroundColor: '#DFE8EF', color: '#394867' }}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tenders Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-4xl font-bold" style={{ color: '#212A3E' }}>
                المنافسات المتاحة
              </h2>
              <p className="text-lg font-semibold" style={{ color: '#9BA4B5' }}>
                {tenders.length} منافسة متاحة للتقديم الآن
              </p>
            </div>

            <select
              className="rounded-xl border-2 px-5 py-3 font-semibold transition-all outline-none"
              style={{ borderColor: '#D5DAE3', color: '#212A3E', backgroundColor: '#FFFFFF' }}
            >
              <option>الأحدث نشراً</option>
              <option>الأعلى قيمة</option>
              <option>الأقرب موعداً</option>
              <option>الأكثر مشاهدة</option>
            </select>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {tenders.map((tender, idx) => (
              <motion.div
                key={tender.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="cursor-pointer overflow-hidden rounded-2xl border-2 transition-all"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor:
                    tender.priority === 'urgent'
                      ? '#C84B4B'
                      : tender.priority === 'high'
                        ? '#D4A149'
                        : '#D5DAE3',
                }}
              >
                <div className="p-8">
                  {/* Header */}
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex flex-1 items-center gap-4">
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-xl"
                        style={{ background: 'linear-gradient(135deg, #394867 0%, #212A3E 100%)' }}
                      >
                        <Building2 className="h-7 w-7" style={{ color: '#F1F6F9' }} />
                      </div>
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-base font-bold" style={{ color: '#212A3E' }}>
                            {tender.entity}
                          </span>
                          {tender.verified && (
                            <CheckCircle2 className="h-5 w-5" style={{ color: '#2D7A5F' }} />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4" style={{ color: '#9BA4B5' }} />
                          <span style={{ color: '#9BA4B5' }}>{tender.location}</span>
                          <span style={{ color: '#D5DAE3' }}>•</span>
                          <span style={{ color: '#9BA4B5' }}>منذ {tender.publishedDate}</span>
                        </div>
                      </div>
                    </div>

                    {tender.priority === 'urgent' && (
                      <div
                        className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold"
                        style={{ backgroundColor: '#C84B4B', color: '#FFFFFF' }}
                      >
                        <AlertCircle className="h-4 w-4" />
                        عاجل
                      </div>
                    )}
                    {tender.priority === 'high' && (
                      <div
                        className="rounded-lg px-3 py-1.5 text-xs font-bold"
                        style={{ backgroundColor: '#D4A149', color: '#212A3E' }}
                      >
                        أولوية عالية
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="mb-4 text-2xl leading-snug font-bold" style={{ color: '#212A3E' }}>
                    {tender.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="mb-5 line-clamp-2 text-base leading-relaxed"
                    style={{ color: '#394867' }}
                  >
                    {tender.description}
                  </p>

                  {/* Tags */}
                  <div className="mb-6 flex flex-wrap gap-2">
                    {tender.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border px-3 py-1.5 text-sm font-semibold"
                        style={{
                          backgroundColor: '#F1F6F9',
                          color: '#394867',
                          borderColor: '#E8EFF4',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                    {tender.tags.length > 4 && (
                      <span
                        className="rounded-lg px-3 py-1.5 text-sm font-bold"
                        style={{ backgroundColor: '#9BA4B5', color: '#F1F6F9' }}
                      >
                        +{tender.tags.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Stats Grid */}
                  <div
                    className="mb-6 grid grid-cols-3 gap-4 rounded-xl p-5"
                    style={{ backgroundColor: '#F1F6F9' }}
                  >
                    <div>
                      <div className="mb-1 flex items-center gap-1.5">
                        <DollarSign className="h-4 w-4" style={{ color: '#394867' }} />
                        <span className="text-xs font-semibold" style={{ color: '#9BA4B5' }}>
                          الميزانية
                        </span>
                      </div>
                      <div className="text-sm font-bold" style={{ color: '#212A3E' }}>
                        {tender.budget}
                      </div>
                      <div className="text-xs" style={{ color: '#9BA4B5' }}>
                        {tender.currency}
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 flex items-center gap-1.5">
                        <Users className="h-4 w-4" style={{ color: '#394867' }} />
                        <span className="text-xs font-semibold" style={{ color: '#9BA4B5' }}>
                          العروض
                        </span>
                      </div>
                      <div className="text-sm font-bold" style={{ color: '#212A3E' }}>
                        {tender.proposals}
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 flex items-center gap-1.5">
                        <Clock className="h-4 w-4" style={{ color: '#C84B4B' }} />
                        <span className="text-xs font-semibold" style={{ color: '#9BA4B5' }}>
                          الموعد
                        </span>
                      </div>
                      <div className="text-sm font-bold" style={{ color: '#212A3E' }}>
                        {tender.deadline}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      className="flex-1 rounded-xl py-3.5 font-bold transition-all"
                      style={{
                        background: 'linear-gradient(135deg, #394867 0%, #2A3650 100%)',
                        color: '#F1F6F9',
                      }}
                    >
                      تقديم عرض
                    </button>
                    <button
                      onClick={() => toggleSave(tender.id)}
                      className="flex h-12 w-12 items-center justify-center rounded-xl border-2 transition-all"
                      style={{
                        borderColor: savedProjects.has(tender.id) ? '#394867' : '#D5DAE3',
                        backgroundColor: savedProjects.has(tender.id) ? '#DFE8EF' : '#FFFFFF',
                      }}
                    >
                      <Bookmark
                        className="h-5 w-5"
                        style={{ color: savedProjects.has(tender.id) ? '#394867' : '#9BA4B5' }}
                        fill={savedProjects.has(tender.id) ? '#394867' : 'none'}
                      />
                    </button>
                    <button
                      className="flex h-12 w-12 items-center justify-center rounded-xl border-2 transition-all"
                      style={{ borderColor: '#D5DAE3', backgroundColor: '#FFFFFF' }}
                    >
                      <Share2 className="h-5 w-5" style={{ color: '#9BA4B5' }} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              className="inline-flex items-center gap-3 rounded-xl border-2 px-10 py-4 font-bold transition-all"
              style={{ backgroundColor: '#FFFFFF', color: '#394867', borderColor: '#394867' }}
            >
              عرض المزيد من المنافسات
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative overflow-hidden border-t py-24"
        style={{ backgroundColor: '#212A3E', borderColor: 'rgba(57, 72, 103, 0.2)' }}
      >
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{ background: '#394867' }}
          ></div>
        </div>

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div
            className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl"
            style={{ background: 'linear-gradient(135deg, #394867 0%, #2A3650 100%)' }}
          >
            <Target className="h-10 w-10" style={{ color: '#F1F6F9' }} />
          </div>
          <h2 className="mb-6 text-5xl font-bold" style={{ color: '#F1F6F9' }}>
            انضم إلى منصتنا الآن
          </h2>
          <p className="mb-10 text-2xl leading-relaxed" style={{ color: '#9BA4B5' }}>
            كن جزءاً من أكبر منصة وطنية للمنافسات الحكومية واحصل على فرصك المثالية
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              className="rounded-xl px-10 py-4 text-xl font-bold transition-all"
              style={{
                background: 'linear-gradient(135deg, #394867 0%, #2A3650 100%)',
                color: '#F1F6F9',
              }}
            >
              ابدأ الآن مجاناً
            </button>
            <button
              className="rounded-xl border-2 px-10 py-4 text-xl font-bold transition-all"
              style={{
                borderColor: '#9BA4B5',
                color: '#F1F6F9',
                backgroundColor: 'rgba(155, 164, 181, 0.1)',
              }}
            >
              اعرف المزيد
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-20 pb-10" style={{ backgroundColor: '#212A3E' }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 grid gap-12 md:grid-cols-4">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: 'linear-gradient(135deg, #394867 0%, #2A3650 100%)' }}
                >
                  <Shield className="h-6 w-6" style={{ color: '#F1F6F9' }} />
                </div>
                <h3 className="text-xl font-bold" style={{ color: '#F1F6F9' }}>
                  المنصة الوطنية
                </h3>
              </div>
              <p className="mb-6 leading-relaxed" style={{ color: '#9BA4B5' }}>
                البوابة الرسمية للمنافسات الحكومية في المملكة العربية السعودية
              </p>
            </div>

            {[
              {
                title: 'روابط سريعة',
                links: [
                  'المنافسات النشطة',
                  'الجهات الحكومية',
                  'الدليل الإرشادي',
                  'الأسئلة الشائعة',
                ],
              },
              {
                title: 'الدعم',
                links: ['مركز المساعدة', 'تواصل معنا', 'الشروط والأحكام', 'الخصوصية'],
              },
              { title: 'عن المنصة', links: ['من نحن', 'الأمان', 'التقارير', 'الوظائف'] },
            ].map((section, idx) => (
              <div key={idx}>
                <h4 className="mb-6 text-lg font-bold" style={{ color: '#F1F6F9' }}>
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="transition-all hover:text-white"
                        style={{ color: '#9BA4B5' }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            className="flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row"
            style={{ borderColor: 'rgba(155, 164, 181, 0.2)' }}
          >
            <p style={{ color: '#9BA4B5' }}>
              © 2025 المنصة الوطنية للمنافسات الحكومية. جميع الحقوق محفوظة
            </p>
            <div className="flex gap-6">
              <a href="#" style={{ color: '#9BA4B5' }}>
                الشروط
              </a>
              <a href="#" style={{ color: '#9BA4B5' }}>
                الخصوصية
              </a>
              <a href="#" style={{ color: '#9BA4B5' }}>
                الأمان
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SteelBluePlatform;
