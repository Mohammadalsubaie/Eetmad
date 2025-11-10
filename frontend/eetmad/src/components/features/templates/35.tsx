import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  AlertCircle,
  Bell,
  Bookmark,
  Building2,
  CheckCircle2,
  ChevronDown,
  DollarSign,
  Grid,
  List,
  MapPin,
  Menu,
  Search,
  Share2,
  Shield,
  SlidersHorizontal,
  Target,
  TrendingUp,
  User,
} from 'lucide-react';
import { useState } from 'react';

function ModernBiddingPlatform() {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [savedItems, setSavedItems] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const filters = [
    { id: 'all', name: 'الكل', count: 287 },
    { id: 'urgent', name: 'عاجل', count: 12 },
    { id: 'high', name: 'أولوية عالية', count: 45 },
    { id: 'tech', name: 'تقنية', count: 98 },
    { id: 'design', name: 'تصميم', count: 76 },
  ];

  const projects = [
    {
      id: 1,
      title: 'تطوير منظومة الخدمات الحكومية الإلكترونية الشاملة',
      entity: 'وزارة التحول الرقمي',
      budget: '4.2M - 7.8M ر.س',
      deadline: '23 يوماً',
      bids: 142,
      views: 8947,
      status: 'urgent',
      verified: true,
      category: 'tech',
      location: 'الرياض',
      publishedDate: 'منذ 3 أيام',
      rating: 5.0,
      description:
        'مشروع استراتيجي وطني لبناء منظومة متكاملة للخدمات الحكومية الإلكترونية بأعلى معايير الأمان',
      skills: ['Cloud Architecture', 'Microservices', 'Cybersecurity', 'DevOps'],
    },
    {
      id: 2,
      title: 'تصميم الهوية البصرية الشاملة لمبادرة وطنية',
      entity: 'الهيئة العامة للترفيه',
      budget: '850K - 1.5M ر.س',
      deadline: '17 يوماً',
      bids: 89,
      views: 5621,
      status: 'high',
      verified: true,
      category: 'design',
      location: 'جدة',
      publishedDate: 'منذ 5 أيام',
      rating: 4.9,
      description: 'تطوير هوية بصرية متكاملة ومبتكرة لمبادرة وطنية كبرى تشمل كافة العناصر البصرية',
      skills: ['Brand Design', 'Motion Graphics', 'UI/UX', '3D Design'],
    },
    {
      id: 3,
      title: 'حملة تسويقية وطنية متعددة القنوات',
      entity: 'صندوق التنمية الوطني',
      budget: '2.1M - 3.9M ر.س',
      deadline: '9 أيام',
      bids: 201,
      views: 11234,
      status: 'urgent',
      verified: true,
      category: 'marketing',
      location: 'الرياض',
      publishedDate: 'منذ يومين',
      rating: 4.8,
      description: 'تخطيط وتنفيذ حملة تسويقية وطنية شاملة عبر جميع القنوات الرقمية والتقليدية',
      skills: ['Digital Marketing', 'Brand Strategy', 'Social Media', 'SEO/SEM'],
    },
    {
      id: 4,
      title: 'استشارات التحول الرقمي والابتكار المؤسسي',
      entity: 'وزارة الاتصالات وتقنية المعلومات',
      budget: '3.2M - 5.8M ر.س',
      deadline: '28 يوماً',
      bids: 67,
      views: 4892,
      status: 'normal',
      verified: true,
      category: 'business',
      location: 'الرياض',
      publishedDate: 'منذ أسبوع',
      rating: 4.9,
      description: 'تقديم استشارات استراتيجية شاملة في التحول الرقمي وإعداد خارطة طريق تفصيلية',
      skills: ['Digital Transformation', 'Change Management', 'Strategic Planning'],
    },
  ];

  const stats = [
    { label: 'المشاريع النشطة', value: '287', icon: Activity, change: '+32' },
    { label: 'القيمة الإجمالية', value: '2.4B ر.س', icon: DollarSign, change: '+18%' },
    { label: 'الجهات الحكومية', value: '124', icon: Building2, change: '+15' },
    { label: 'معدل التنفيذ', value: '96%', icon: TrendingUp, change: '+4%' },
  ];

  const toggleSave = (id) => {
    setSavedItems((prev) => {
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
    <div className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Minimalist Header */}
      <header
        className="sticky top-0 z-50 border-b backdrop-blur-md"
        style={{ backgroundColor: 'rgba(34, 40, 49, 0.98)', borderColor: 'rgba(57, 62, 70, 0.3)' }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-12">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: '#00ADB5' }}
                >
                  <Shield className="h-6 w-6" style={{ color: '#FFFFFF' }} />
                </div>
                <div>
                  <h1 className="text-lg font-bold" style={{ color: '#EEEEEE' }}>
                    المنصة الوطنية
                  </h1>
                  <p className="text-xs" style={{ color: '#00ADB5' }}>
                    للمنافسات الحكومية
                  </p>
                </div>
              </div>

              <nav className="hidden items-center gap-1 lg:flex">
                {['الرئيسية', 'المنافسات', 'الجهات', 'الموارد'].map((item, idx) => (
                  <button
                    key={item}
                    className="rounded-lg px-4 py-2 text-sm font-semibold transition-all"
                    style={{
                      color: idx === 0 ? '#00ADB5' : '#EEEEEE',
                      backgroundColor: idx === 0 ? 'rgba(0, 173, 181, 0.15)' : 'transparent',
                    }}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <button
                className="relative rounded-lg p-2 transition-all"
                style={{ backgroundColor: 'rgba(238, 238, 238, 0.1)' }}
              >
                <Bell className="h-5 w-5" style={{ color: '#EEEEEE' }} />
                <span
                  className="absolute top-1 right-1 h-2 w-2 rounded-full"
                  style={{ backgroundColor: '#00ADB5' }}
                ></span>
              </button>

              <button
                className="flex items-center gap-2 rounded-lg px-4 py-2 font-semibold"
                style={{ backgroundColor: '#00ADB5', color: '#FFFFFF' }}
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">حسابي</span>
              </button>

              <button
                className="rounded-lg p-2 lg:hidden"
                style={{ backgroundColor: 'rgba(238, 238, 238, 0.1)' }}
              >
                <Menu className="h-5 w-5" style={{ color: '#EEEEEE' }} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Clean Hero */}
      <section
        className="border-b py-20"
        style={{ backgroundColor: '#222831', borderColor: 'rgba(57, 62, 70, 0.3)' }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2"
                style={{
                  backgroundColor: 'rgba(0, 173, 181, 0.15)',
                  border: '1px solid rgba(0, 173, 181, 0.3)',
                }}
              >
                <Activity className="h-4 w-4" style={{ color: '#00ADB5' }} />
                <span className="text-sm font-semibold" style={{ color: '#00ADB5' }}>
                  287 منافسة متاحة
                </span>
              </div>

              <h1
                className="mb-6 text-5xl leading-tight font-bold lg:text-6xl"
                style={{ color: '#EEEEEE' }}
              >
                منصة المنافسات
                <br />
                الحكومية الموحدة
              </h1>

              <p
                className="mb-10 text-xl leading-relaxed"
                style={{ color: '#EEEEEE', opacity: 0.8 }}
              >
                شفافية كاملة. إجراءات مبسطة. فرص متساوية للجميع.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  className="rounded-lg px-8 py-4 text-lg font-bold transition-all"
                  style={{ backgroundColor: '#00ADB5', color: '#FFFFFF' }}
                >
                  تصفح المنافسات
                </button>
                <button
                  className="rounded-lg border-2 px-8 py-4 text-lg font-bold transition-all"
                  style={{ borderColor: '#EEEEEE', color: '#EEEEEE' }}
                >
                  دليل الاستخدام
                </button>
              </div>
            </motion.div>
          </div>

          {/* Minimal Stats */}
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-xl border p-6"
                style={{ backgroundColor: '#393E46', borderColor: 'rgba(0, 173, 181, 0.2)' }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <stat.icon className="h-6 w-6" style={{ color: '#00ADB5' }} />
                  <span className="text-sm font-semibold" style={{ color: '#00C853' }}>
                    {stat.change}
                  </span>
                </div>
                <div className="mb-1 text-3xl font-bold" style={{ color: '#EEEEEE' }}>
                  {stat.value}
                </div>
                <div className="text-sm" style={{ color: '#EEEEEE', opacity: 0.7 }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section
        className="border-b py-12"
        style={{ backgroundColor: '#EEEEEE', borderColor: 'rgba(57, 62, 70, 0.1)' }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="relative flex-1">
              <Search
                className="absolute top-1/2 right-5 h-5 w-5 -translate-y-1/2"
                style={{ color: '#393E46' }}
              />
              <input
                type="text"
                placeholder="ابحث عن منافسات أو جهات حكومية..."
                className="h-14 w-full rounded-xl border-2 pr-14 pl-6 text-base font-semibold transition-all outline-none"
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#222831',
                  borderColor: 'rgba(57, 62, 70, 0.2)',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#00ADB5')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(57, 62, 70, 0.2)')}
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-3 rounded-xl border-2 px-6 py-4 font-bold transition-all lg:w-auto"
              style={{ borderColor: '#393E46', color: '#222831', backgroundColor: '#FFFFFF' }}
            >
              <SlidersHorizontal className="h-5 w-5" />
              <span>تصفية</span>
            </button>

            <div className="flex gap-3">
              <button
                onClick={() => setViewMode('grid')}
                className="rounded-xl border-2 p-4 transition-all"
                style={{
                  borderColor: viewMode === 'grid' ? '#00ADB5' : '#393E46',
                  backgroundColor: viewMode === 'grid' ? 'rgba(0, 173, 181, 0.1)' : '#FFFFFF',
                  color: viewMode === 'grid' ? '#00ADB5' : '#393E46',
                }}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className="rounded-xl border-2 p-4 transition-all"
                style={{
                  borderColor: viewMode === 'list' ? '#00ADB5' : '#393E46',
                  backgroundColor: viewMode === 'list' ? 'rgba(0, 173, 181, 0.1)' : '#FFFFFF',
                  color: viewMode === 'list' ? '#00ADB5' : '#393E46',
                }}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 flex flex-wrap gap-3"
              >
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className="flex items-center gap-2 rounded-lg border px-5 py-3 font-semibold transition-all"
                    style={{
                      backgroundColor: selectedFilter === filter.id ? '#00ADB5' : '#FFFFFF',
                      borderColor: selectedFilter === filter.id ? '#00ADB5' : '#393E46',
                      color: selectedFilter === filter.id ? '#FFFFFF' : '#222831',
                    }}
                  >
                    <span>{filter.name}</span>
                    <span
                      className="rounded px-2 py-0.5 text-xs font-bold"
                      style={{
                        backgroundColor:
                          selectedFilter === filter.id ? 'rgba(255, 255, 255, 0.2)' : '#EEEEEE',
                        color: selectedFilter === filter.id ? '#FFFFFF' : '#222831',
                      }}
                    >
                      {filter.count}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-4xl font-bold" style={{ color: '#222831' }}>
                المنافسات المتاحة
              </h2>
              <p className="text-lg" style={{ color: '#393E46' }}>
                {projects.length} منافسة متاحة للتقديم
              </p>
            </div>

            <select
              className="rounded-lg border px-5 py-3 font-semibold outline-none"
              style={{ borderColor: '#393E46', color: '#222831', backgroundColor: '#FFFFFF' }}
            >
              <option>الأحدث</option>
              <option>الأعلى قيمة</option>
              <option>الأقرب موعداً</option>
            </select>
          </div>

          <div className={viewMode === 'grid' ? 'grid gap-6 lg:grid-cols-2' : 'space-y-6'}>
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="cursor-pointer overflow-hidden rounded-xl border-2 transition-all hover:shadow-xl"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor:
                    project.status === 'urgent'
                      ? '#D32F2F'
                      : project.status === 'high'
                        ? '#FFB300'
                        : 'rgba(57, 62, 70, 0.1)',
                }}
              >
                <div className="p-8">
                  {/* Header */}
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex flex-1 items-center gap-4">
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-xl"
                        style={{ backgroundColor: '#222831' }}
                      >
                        <Building2 className="h-7 w-7" style={{ color: '#00ADB5' }} />
                      </div>
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <span className="font-bold" style={{ color: '#222831' }}>
                            {project.entity}
                          </span>
                          {project.verified && (
                            <CheckCircle2 className="h-5 w-5" style={{ color: '#00ADB5' }} />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4" style={{ color: '#393E46' }} />
                          <span style={{ color: '#393E46' }}>{project.location}</span>
                        </div>
                      </div>
                    </div>

                    {project.status === 'urgent' && (
                      <div
                        className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold"
                        style={{ backgroundColor: '#D32F2F', color: '#FFFFFF' }}
                      >
                        <AlertCircle className="h-4 w-4" />
                        عاجل
                      </div>
                    )}
                    {project.status === 'high' && (
                      <div
                        className="rounded-lg px-3 py-1.5 text-xs font-bold"
                        style={{ backgroundColor: '#FFB300', color: '#222831' }}
                      >
                        أولوية عالية
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="mb-4 text-2xl leading-snug font-bold" style={{ color: '#222831' }}>
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="mb-5 line-clamp-2 text-base leading-relaxed"
                    style={{ color: '#393E46' }}
                  >
                    {project.description}
                  </p>

                  {/* Skills */}
                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg px-3 py-1.5 text-sm font-semibold"
                        style={{ backgroundColor: '#EEEEEE', color: '#222831' }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div
                    className="mb-6 grid grid-cols-3 gap-4 rounded-xl p-5"
                    style={{ backgroundColor: '#EEEEEE' }}
                  >
                    <div>
                      <div className="mb-1 text-sm" style={{ color: '#393E46' }}>
                        الميزانية
                      </div>
                      <div className="font-bold" style={{ color: '#222831' }}>
                        {project.budget}
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 text-sm" style={{ color: '#393E46' }}>
                        العروض
                      </div>
                      <div className="font-bold" style={{ color: '#222831' }}>
                        {project.bids}
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 text-sm" style={{ color: '#393E46' }}>
                        الموعد
                      </div>
                      <div className="font-bold" style={{ color: '#222831' }}>
                        {project.deadline}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      className="flex-1 rounded-lg py-3 font-bold transition-all"
                      style={{ backgroundColor: '#00ADB5', color: '#FFFFFF' }}
                    >
                      تقديم عرض
                    </button>
                    <button
                      onClick={() => toggleSave(project.id)}
                      className="flex h-12 w-12 items-center justify-center rounded-lg border-2 transition-all"
                      style={{
                        borderColor: savedItems.has(project.id) ? '#00ADB5' : '#393E46',
                        backgroundColor: savedItems.has(project.id)
                          ? 'rgba(0, 173, 181, 0.1)'
                          : '#FFFFFF',
                      }}
                    >
                      <Bookmark
                        className="h-5 w-5"
                        style={{ color: savedItems.has(project.id) ? '#00ADB5' : '#393E46' }}
                        fill={savedItems.has(project.id) ? '#00ADB5' : 'none'}
                      />
                    </button>
                    <button
                      className="flex h-12 w-12 items-center justify-center rounded-lg border-2 transition-all"
                      style={{ borderColor: '#393E46', backgroundColor: '#FFFFFF' }}
                    >
                      <Share2 className="h-5 w-5" style={{ color: '#393E46' }} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              className="inline-flex items-center gap-3 rounded-lg border-2 px-10 py-4 font-bold transition-all"
              style={{ backgroundColor: '#FFFFFF', color: '#222831', borderColor: '#393E46' }}
            >
              عرض المزيد
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="border-t py-20"
        style={{ backgroundColor: '#222831', borderColor: 'rgba(57, 62, 70, 0.3)' }}
      >
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div
            className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl"
            style={{ backgroundColor: '#00ADB5' }}
          >
            <Target className="h-10 w-10" style={{ color: '#FFFFFF' }} />
          </div>
          <h2 className="mb-6 text-5xl font-bold" style={{ color: '#EEEEEE' }}>
            ابدأ رحلتك اليوم
          </h2>
          <p className="mb-10 text-2xl leading-relaxed" style={{ color: '#EEEEEE', opacity: 0.8 }}>
            انضم إلى آلاف المتقدمين واحصل على فرصك في المنافسات الحكومية
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              className="rounded-lg px-10 py-4 text-xl font-bold transition-all"
              style={{ backgroundColor: '#00ADB5', color: '#FFFFFF' }}
            >
              ابدأ الآن
            </button>
            <button
              className="rounded-lg border-2 px-10 py-4 text-xl font-bold transition-all"
              style={{ borderColor: '#EEEEEE', color: '#EEEEEE' }}
            >
              المزيد من المعلومات
            </button>
          </div>
        </div>
      </section>

      {/* Minimalist Footer */}
      <footer className="pt-16 pb-8" style={{ backgroundColor: '#393E46' }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 grid gap-12 md:grid-cols-4">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: '#00ADB5' }}
                >
                  <Shield className="h-6 w-6" style={{ color: '#FFFFFF' }} />
                </div>
                <h3 className="text-xl font-bold" style={{ color: '#EEEEEE' }}>
                  المنصة الوطنية
                </h3>
              </div>
              <p className="mb-6 leading-relaxed" style={{ color: '#EEEEEE', opacity: 0.7 }}>
                منصة موحدة للمنافسات الحكومية في المملكة
              </p>
            </div>

            {[
              { title: 'روابط سريعة', links: ['المنافسات', 'الجهات', 'الدليل', 'الدعم'] },
              { title: 'قانوني', links: ['الشروط', 'الخصوصية', 'الأمان', 'FAQ'] },
              { title: 'تواصل معنا', links: ['البريد', 'الهاتف', 'الموقع', 'وسائل التواصل'] },
            ].map((section, idx) => (
              <div key={idx}>
                <h4 className="mb-5 text-lg font-bold" style={{ color: '#EEEEEE' }}>
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="transition-all"
                        style={{ color: '#EEEEEE', opacity: 0.7 }}
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
            style={{ borderColor: 'rgba(238, 238, 238, 0.1)' }}
          >
            <p style={{ color: '#EEEEEE', opacity: 0.7 }}>
              © 2025 المنصة الوطنية. جميع الحقوق محفوظة
            </p>
            <div className="flex gap-6">
              <a href="#" style={{ color: '#EEEEEE', opacity: 0.7 }}>
                الشروط
              </a>
              <a href="#" style={{ color: '#EEEEEE', opacity: 0.7 }}>
                الخصوصية
              </a>
              <a href="#" style={{ color: '#EEEEEE', opacity: 0.7 }}>
                الأمان
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ModernBiddingPlatform;
