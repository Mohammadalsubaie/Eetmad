import { motion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  Award,
  Bell,
  Bookmark,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock,
  Code,
  DollarSign,
  Facebook,
  Filter,
  Globe,
  Linkedin,
  MapPin,
  Megaphone,
  Menu,
  Package,
  Palette,
  Play,
  Search,
  Share2,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Twitter,
  User,
  Users,
  Zap,
} from 'lucide-react';
import { useState } from 'react';

function ModernBiddingPlatform() {
  const [activeTab, setActiveTab] = useState('active');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const categories = [
    { id: 'all', name: 'الكل', icon: Package, count: 312, color: '#34656D' },
    { id: 'tech', name: 'التقنية', icon: Code, count: 124, color: '#34656D' },
    { id: 'design', name: 'التصميم', icon: Palette, count: 89, color: '#34656D' },
    { id: 'marketing', name: 'التسويق', icon: Megaphone, count: 67, color: '#34656D' },
    { id: 'business', name: 'الأعمال', icon: Briefcase, count: 32, color: '#34656D' },
  ];

  const projects = [
    {
      id: 1,
      title: 'تطوير منصة حكومية متكاملة للخدمات الإلكترونية',
      organization: 'وزارة التحول الرقمي',
      category: 'tech',
      budget: { min: 520000, max: 850000 },
      duration: '12 شهر',
      deadline: '18 يوم متبقي',
      proposals: 67,
      views: 2847,
      rating: 4.9,
      verified: true,
      featured: true,
      urgent: false,
      description:
        'مشروع استراتيجي لبناء منصة حكومية شاملة توفر خدمات إلكترونية متكاملة للمواطنين والمقيمين مع أعلى معايير الأمان والأداء',
      skills: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Security'],
      location: 'الرياض، السعودية',
      engagement: 'عالي جداً',
    },
    {
      id: 2,
      title: 'تصميم هوية بصرية متكاملة لمبادرة وطنية',
      organization: 'هيئة الترفيه',
      category: 'design',
      budget: { min: 180000, max: 320000 },
      duration: '6 أشهر',
      deadline: '25 يوم متبقي',
      proposals: 43,
      views: 1926,
      rating: 4.8,
      verified: true,
      featured: false,
      urgent: false,
      description:
        'تصميم هوية بصرية شاملة ومبتكرة لمبادرة وطنية كبرى تشمل الشعار ونظام الألوان والخطوط ودليل الاستخدام الكامل',
      skills: ['Illustrator', 'Photoshop', 'Brand Design', 'UI/UX'],
      location: 'جدة، السعودية',
      engagement: 'عالي',
    },
    {
      id: 3,
      title: 'حملة تسويقية رقمية متكاملة عبر المنصات',
      organization: 'صندوق التنمية الوطني',
      category: 'marketing',
      budget: { min: 420000, max: 680000 },
      duration: '9 أشهر',
      deadline: '8 أيام متبقي',
      proposals: 89,
      views: 3254,
      rating: 5.0,
      verified: true,
      featured: true,
      urgent: true,
      description:
        'تطوير وتنفيذ استراتيجية تسويقية رقمية شاملة ومتكاملة تستهدف رواد الأعمال والمستثمرين عبر جميع القنوات الرقمية',
      skills: ['Social Media', 'SEO', 'Content Marketing', 'Analytics'],
      location: 'الرياض، السعودية',
      engagement: 'عالي جداً',
    },
    {
      id: 4,
      title: 'استشارات تحول رقمي للقطاع العام',
      organization: 'وزارة الاتصالات وتقنية المعلومات',
      category: 'business',
      budget: { min: 750000, max: 1200000 },
      duration: '18 شهر',
      deadline: '30 يوم متبقي',
      proposals: 34,
      views: 1567,
      rating: 4.7,
      verified: true,
      featured: false,
      urgent: false,
      description:
        'تقديم استشارات متخصصة في التحول الرقمي وإعداد خارطة طريق شاملة مع خطة تنفيذية تفصيلية وقابلة للتطبيق',
      skills: ['Digital Strategy', 'Change Management', 'IT Consulting'],
      location: 'الرياض، السعودية',
      engagement: 'متوسط',
    },
    {
      id: 5,
      title: 'تطوير تطبيق موبايل للخدمات الصحية',
      organization: 'وزارة الصحة',
      category: 'tech',
      budget: { min: 280000, max: 480000 },
      duration: '8 أشهر',
      deadline: '22 يوم متبقي',
      proposals: 52,
      views: 2134,
      rating: 4.9,
      verified: true,
      featured: true,
      urgent: false,
      description:
        'بناء تطبيق موبايل شامل يوفر خدمات صحية متكاملة للمواطنين مع تكامل كامل مع الأنظمة الحكومية القائمة',
      skills: ['Flutter', 'Firebase', 'Healthcare', 'API Integration'],
      location: 'الدمام، السعودية',
      engagement: 'عالي',
    },
    {
      id: 6,
      title: 'إنتاج محتوى مرئي لحملة توعوية وطنية',
      organization: 'وزارة الإعلام',
      category: 'design',
      budget: { min: 350000, max: 580000 },
      duration: '10 أشهر',
      deadline: '15 يوم متبقي',
      proposals: 41,
      views: 1789,
      rating: 4.8,
      verified: true,
      featured: false,
      urgent: false,
      description:
        'إنتاج محتوى مرئي احترافي وجذاب لحملة توعوية وطنية شاملة تستهدف جميع فئات المجتمع بأسلوب عصري ومؤثر',
      skills: ['Video Production', 'Motion Graphics', 'Storytelling'],
      location: 'الرياض، السعودية',
      engagement: 'عالي',
    },
  ];

  const stats = [
    { label: 'مشاريع نشطة', value: '312', change: '+24%', trend: 'up', icon: Activity },
    { label: 'القيمة الإجمالية', value: '186M', change: '+18%', trend: 'up', icon: DollarSign },
    { label: 'جهات حكومية', value: '84', change: '+12%', trend: 'up', icon: Building2 },
    { label: 'معدل النجاح', value: '94%', change: '+5%', trend: 'up', icon: TrendingUp },
  ];

  const filteredProjects =
    selectedFilter === 'all' ? projects : projects.filter((p) => p.category === selectedFilter);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: '#FAF8F1', fontFamily: 'IBM Plex Sans Arabic, sans-serif' }}
    >
      {/* Modern Header */}
      <header
        className="sticky top-0 z-50 border-b backdrop-blur-lg"
        style={{
          backgroundColor: 'rgba(51, 68, 67, 0.95)',
          borderColor: 'rgba(164, 197, 202, 0.2)',
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} className="relative">
                <div
                  className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #34656D 0%, #284E54 100%)' }}
                >
                  <Sparkles
                    className="absolute h-6 w-6"
                    style={{ color: '#FAEAB1', opacity: 0.3 }}
                  />
                  <Target className="relative z-10 h-6 w-6" style={{ color: '#FAF8F1' }} />
                </div>
              </motion.div>
              <div>
                <h1 className="text-xl font-bold" style={{ color: '#FAF8F1' }}>
                  منصة الفرص
                </h1>
                <p className="text-xs" style={{ color: '#A4C5CA' }}>
                  بوابة المنافسات الحكومية
                </p>
              </div>
            </div>

            <nav className="hidden items-center gap-1 lg:flex">
              {['الرئيسية', 'المشاريع', 'الجهات', 'الموارد', 'الدعم'].map((item, idx) => (
                <motion.button
                  key={item}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-xl px-5 py-2.5 font-semibold transition-all"
                  style={{
                    color: idx === 0 ? '#FAEAB1' : '#A4C5CA',
                    backgroundColor: idx === 0 ? 'rgba(250, 234, 177, 0.1)' : 'transparent',
                  }}
                >
                  {item}
                </motion.button>
              ))}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="relative rounded-xl p-3 transition-all"
                style={{ backgroundColor: 'rgba(164, 197, 202, 0.15)' }}
              >
                <Bell className="h-5 w-5" style={{ color: '#A4C5CA' }} />
                <span
                  className="absolute right-2 top-2 h-2 w-2 animate-pulse rounded-full"
                  style={{ backgroundColor: '#F3D049' }}
                ></span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 rounded-xl px-6 py-3 font-bold shadow-lg transition-all"
                style={{
                  background: 'linear-gradient(135deg, #FAEAB1 0%, #F7DD7D 100%)',
                  color: '#334443',
                }}
              >
                <User className="h-5 w-5" />
                <span>حسابي</span>
              </motion.button>
            </div>

            <button
              className="rounded-xl p-3 lg:hidden"
              style={{ backgroundColor: 'rgba(164, 197, 202, 0.15)' }}
            >
              <Menu className="h-6 w-6" style={{ color: '#A4C5CA' }} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Gradient */}
      <section
        className="relative overflow-hidden py-20"
        style={{ background: 'linear-gradient(180deg, #334443 0%, #34656D 100%)' }}
      >
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute right-20 top-20 h-96 w-96 rounded-full blur-3xl"
            style={{ background: '#FAEAB1' }}
          ></div>
          <div
            className="absolute bottom-20 left-20 h-96 w-96 rounded-full blur-3xl"
            style={{ background: '#34656D' }}
          ></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2"
                style={{
                  backgroundColor: 'rgba(250, 234, 177, 0.15)',
                  border: '1px solid rgba(250, 234, 177, 0.3)',
                }}
              >
                <Sparkles className="h-4 w-4" style={{ color: '#FAEAB1' }} />
                <span className="text-sm font-bold" style={{ color: '#FAEAB1' }}>
                  312 فرصة متاحة الآن
                </span>
              </div>

              <h1
                className="mb-6 text-5xl font-bold leading-tight lg:text-6xl xl:text-7xl"
                style={{ color: '#FAF8F1' }}
              >
                استكشف <span style={{ color: '#FAEAB1' }}>فرص استثنائية</span> في القطاع الحكومي
              </h1>

              <p className="mb-10 text-xl leading-relaxed lg:text-2xl" style={{ color: '#A4C5CA' }}>
                منصة موثوقة تربط المواهب بالفرص الحكومية. شفافية كاملة، عمليات سلسة، ونجاح مشترك
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 rounded-2xl px-10 py-4 text-lg font-bold shadow-2xl transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #FAEAB1 0%, #F7DD7D 100%)',
                    color: '#334443',
                  }}
                >
                  استكشف الفرص
                  <ArrowRight className="h-6 w-6" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 rounded-2xl border-2 px-10 py-4 text-lg font-bold transition-all"
                  style={{
                    borderColor: '#A4C5CA',
                    color: '#FAF8F1',
                    backgroundColor: 'transparent',
                  }}
                >
                  <Play className="h-6 w-6" />
                  شاهد الفيديو
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="rounded-2xl border p-6 backdrop-blur-sm"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'rgba(164, 197, 202, 0.2)',
                }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: 'rgba(250, 234, 177, 0.2)' }}
                  >
                    <stat.icon className="h-6 w-6" style={{ color: '#FAEAB1' }} />
                  </div>
                  <div
                    className="flex items-center gap-1 rounded-lg px-2.5 py-1"
                    style={{ backgroundColor: 'rgba(61, 139, 100, 0.2)' }}
                  >
                    <TrendingUp className="h-3.5 w-3.5" style={{ color: '#3D8B64' }} />
                    <span className="text-xs font-bold" style={{ color: '#3D8B64' }}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="mb-1 text-3xl font-bold" style={{ color: '#FAF8F1' }}>
                  {stat.value}
                </div>
                <div className="text-sm font-semibold" style={{ color: '#A4C5CA' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section
        className="border-b py-12"
        style={{ backgroundColor: '#FFFFFF', borderColor: '#E0DCC8' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 lg:flex-row">
            <div className="relative w-full flex-1">
              <Search
                className="absolute right-6 top-1/2 h-6 w-6 -translate-y-1/2"
                style={{ color: '#6C8B89' }}
              />
              <input
                type="text"
                placeholder="ابحث عن مشاريع، جهات، أو مهارات..."
                className="h-16 w-full rounded-2xl border-2 pl-8 pr-16 text-lg font-semibold outline-none transition-all focus:border-opacity-100"
                style={{
                  backgroundColor: '#FAF8F1',
                  color: '#334443',
                  borderColor: '#E0DCC8',
                }}
              />
            </div>

            <div className="flex flex-wrap gap-3 lg:flex-nowrap">
              <button
                className="flex items-center gap-2 rounded-2xl border-2 px-6 py-4 font-bold transition-all"
                style={{ borderColor: '#34656D', color: '#34656D', backgroundColor: '#FFFFFF' }}
              >
                <Filter className="h-5 w-5" />
                <span className="hidden sm:inline">تصفية</span>
              </button>
              <button
                className="rounded-2xl px-6 py-4 font-bold transition-all"
                style={{ backgroundColor: '#34656D', color: '#FAF8F1' }}
              >
                بحث
              </button>
            </div>
          </div>

          <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedFilter(cat.id)}
                className={`whitespace-nowrap rounded-xl border-2 px-6 py-3 font-bold transition-all ${
                  selectedFilter === cat.id ? 'shadow-lg' : ''
                }`}
                style={{
                  backgroundColor: selectedFilter === cat.id ? '#34656D' : '#F0ECDD',
                  borderColor: selectedFilter === cat.id ? '#284E54' : 'transparent',
                  color: selectedFilter === cat.id ? '#FAF8F1' : '#334443',
                }}
              >
                <div className="flex items-center gap-3">
                  <cat.icon className="h-5 w-5" />
                  <span>{cat.name}</span>
                  <span
                    className="rounded-lg px-2.5 py-1 text-xs font-bold"
                    style={{
                      backgroundColor:
                        selectedFilter === cat.id ? 'rgba(250, 234, 177, 0.2)' : '#FFFFFF',
                      color: selectedFilter === cat.id ? '#FAEAB1' : '#34656D',
                    }}
                  >
                    {cat.count}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-4xl font-bold" style={{ color: '#334443' }}>
                الفرص المتاحة
              </h2>
              <p className="text-lg" style={{ color: '#536765' }}>
                {filteredProjects.length} فرصة متاحة للتقديم
              </p>
            </div>
            <select
              className="rounded-xl border-2 px-6 py-3 font-bold outline-none"
              style={{ borderColor: '#E0DCC8', color: '#334443', backgroundColor: '#FFFFFF' }}
            >
              <option>الأحدث</option>
              <option>الأعلى ميزانية</option>
              <option>الأقرب موعداً</option>
            </select>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onHoverStart={() => setHoveredCard(project.id)}
                onHoverEnd={() => setHoveredCard(null)}
                whileHover={{ y: -8 }}
                className="relative cursor-pointer overflow-hidden rounded-3xl border-2 shadow-lg transition-all hover:shadow-2xl"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: project.featured
                    ? '#F7DD7D'
                    : project.urgent
                      ? '#C95454'
                      : '#E0DCC8',
                }}
              >
                {project.featured && (
                  <div
                    className="absolute left-0 right-0 top-0 h-1"
                    style={{ background: 'linear-gradient(90deg, #FAEAB1 0%, #F7DD7D 100%)' }}
                  ></div>
                )}

                <div className="p-8">
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex flex-1 items-center gap-4">
                      <div
                        className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl shadow-md"
                        style={{ background: 'linear-gradient(135deg, #34656D 0%, #284E54 100%)' }}
                      >
                        <Building2 className="relative z-10 h-8 w-8" style={{ color: '#FAF8F1' }} />
                        <div
                          className="absolute inset-0 opacity-20"
                          style={{ background: 'radial-gradient(circle, #FAEAB1, transparent)' }}
                        ></div>
                      </div>
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="text-sm font-bold" style={{ color: '#334443' }}>
                            {project.organization}
                          </span>
                          {project.verified && (
                            <div
                              className="flex h-5 w-5 items-center justify-center rounded-full"
                              style={{ backgroundColor: '#3D8B64' }}
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" style={{ color: '#FFFFFF' }} />
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-current" style={{ color: '#F3D049' }} />
                            <span className="text-sm font-bold" style={{ color: '#34656D' }}>
                              {project.rating}
                            </span>
                          </div>
                          <span className="text-xs" style={{ color: '#6C8B89' }}>
                            •
                          </span>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" style={{ color: '#6C8B89' }} />
                            <span className="text-xs" style={{ color: '#6C8B89' }}>
                              {project.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      {project.urgent && (
                        <div
                          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold"
                          style={{ backgroundColor: '#C95454', color: '#FFFFFF' }}
                        >
                          <Clock className="h-3.5 w-3.5" />
                          عاجل
                        </div>
                      )}
                      {project.featured && (
                        <div
                          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold"
                          style={{
                            background: 'linear-gradient(135deg, #FAEAB1 0%, #F7DD7D 100%)',
                            color: '#334443',
                          }}
                        >
                          <Award className="h-3.5 w-3.5" />
                          مميز
                        </div>
                      )}
                    </div>
                  </div>

                  <h3 className="mb-4 text-2xl font-bold leading-snug" style={{ color: '#334443' }}>
                    {project.title}
                  </h3>

                  <p
                    className="mb-6 line-clamp-2 text-base leading-relaxed"
                    style={{ color: '#536765' }}
                  >
                    {project.description}
                  </p>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg px-3 py-2 text-sm font-semibold"
                        style={{ backgroundColor: '#F0ECDD', color: '#334443' }}
                      >
                        {skill}
                      </span>
                    ))}
                    {project.skills.length > 4 && (
                      <span
                        className="rounded-lg px-3 py-2 text-sm font-bold"
                        style={{ backgroundColor: '#34656D', color: '#FAF8F1' }}
                      >
                        +{project.skills.length - 4}
                      </span>
                    )}
                  </div>

                  <div
                    className="mb-6 grid grid-cols-3 gap-4 rounded-2xl p-4"
                    style={{ backgroundColor: '#FAF8F1' }}
                  >
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <DollarSign className="h-4 w-4" style={{ color: '#F3D049' }} />
                        <span className="text-xs font-semibold" style={{ color: '#6C8B89' }}>
                          الميزانية
                        </span>
                      </div>
                      <div className="text-sm font-bold" style={{ color: '#334443' }}>
                        {(project.budget.min / 1000).toFixed(0)}K ر.س
                      </div>
                    </div>
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <Users className="h-4 w-4" style={{ color: '#34656D' }} />
                        <span className="text-xs font-semibold" style={{ color: '#6C8B89' }}>
                          العروض
                        </span>
                      </div>
                      <div className="text-sm font-bold" style={{ color: '#334443' }}>
                        {project.proposals}
                      </div>
                    </div>
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <Clock className="h-4 w-4" style={{ color: '#C95454' }} />
                        <span className="text-xs font-semibold" style={{ color: '#6C8B89' }}>
                          المدة
                        </span>
                      </div>
                      <div className="text-sm font-bold" style={{ color: '#334443' }}>
                        {project.deadline}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 rounded-xl py-3.5 font-bold shadow-md transition-all"
                      style={{ backgroundColor: '#34656D', color: '#FAF8F1' }}
                    >
                      قدم الآن
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex h-12 w-12 items-center justify-center rounded-xl border-2 transition-all"
                      style={{ borderColor: '#34656D', backgroundColor: '#FFFFFF' }}
                    >
                      <Bookmark className="h-5 w-5" style={{ color: '#34656D' }} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex h-12 w-12 items-center justify-center rounded-xl border-2 transition-all"
                      style={{ borderColor: '#34656D', backgroundColor: '#FFFFFF' }}
                    >
                      <Share2 className="h-5 w-5" style={{ color: '#34656D' }} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 rounded-2xl border-2 px-12 py-4 text-lg font-bold shadow-lg transition-all"
              style={{ backgroundColor: '#FFFFFF', color: '#34656D', borderColor: '#34656D' }}
            >
              عرض المزيد من الفرص
              <ChevronDown className="h-6 w-6" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="relative overflow-hidden py-24"
        style={{ background: 'linear-gradient(135deg, #34656D 0%, #334443 100%)' }}
      >
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute right-0 top-0 h-96 w-96 rounded-full blur-3xl"
            style={{ background: '#FAEAB1' }}
          ></div>
          <div
            className="absolute bottom-0 left-0 h-96 w-96 rounded-full blur-3xl"
            style={{ background: '#34656D' }}
          ></div>
        </div>

        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #FAEAB1 0%, #F7DD7D 100%)' }}
            >
              <Zap className="h-12 w-12" style={{ color: '#334443' }} />
            </div>
            <h2 className="mb-6 text-5xl font-bold" style={{ color: '#FAF8F1' }}>
              ابدأ رحلتك الآن
            </h2>
            <p
              className="mx-auto mb-12 max-w-3xl text-2xl leading-relaxed"
              style={{ color: '#A4C5CA' }}
            >
              انضم إلى آلاف المحترفين والشركات الذين يحققون نجاحات استثنائية عبر منصتنا
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-2xl px-12 py-5 text-xl font-bold shadow-2xl transition-all"
                style={{
                  background: 'linear-gradient(135deg, #FAEAB1 0%, #F7DD7D 100%)',
                  color: '#334443',
                }}
              >
                سجل مجاناً
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-2xl border-2 px-12 py-5 text-xl font-bold transition-all"
                style={{ borderColor: '#FAF8F1', color: '#FAF8F1', backgroundColor: 'transparent' }}
              >
                اكتشف المزيد
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pb-10 pt-20" style={{ backgroundColor: '#334443' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-xl"
                  style={{ background: 'linear-gradient(135deg, #34656D 0%, #284E54 100%)' }}
                >
                  <Target className="h-7 w-7" style={{ color: '#FAF8F1' }} />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: '#FAF8F1' }}>
                  منصة الفرص
                </h3>
              </div>
              <p className="mb-6 leading-relaxed" style={{ color: '#A4C5CA' }}>
                منصة موثوقة تربط المواهب بالفرص الحكومية بشفافية واحترافية عالية
              </p>
              <div className="flex gap-3">
                {[Linkedin, Twitter, Facebook, Globe].map((Icon, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.1 }}
                    className="flex h-11 w-11 items-center justify-center rounded-xl transition-all"
                    style={{ backgroundColor: 'rgba(164, 197, 202, 0.15)' }}
                  >
                    <Icon className="h-5 w-5" style={{ color: '#A4C5CA' }} />
                  </motion.button>
                ))}
              </div>
            </div>

            {[
              { title: 'روابط سريعة', links: ['المشاريع', 'الجهات', 'الموارد', 'التسعير'] },
              { title: 'الدعم', links: ['المساعدة', 'الأسئلة', 'التواصل', 'الشروط'] },
              { title: 'معلومات', links: ['من نحن', 'الخصوصية', 'الأمان', 'الوظائف'] },
            ].map((section, idx) => (
              <div key={idx}>
                <h4 className="mb-6 text-xl font-bold" style={{ color: '#FAF8F1' }}>
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="text-base transition-all hover:text-white"
                        style={{ color: '#A4C5CA' }}
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
            style={{ borderColor: 'rgba(164, 197, 202, 0.2)' }}
          >
            <p style={{ color: '#A4C5CA' }}>© 2025 منصة الفرص. جميع الحقوق محفوظة</p>
            <div className="flex gap-6">
              <a href="#" className="text-sm transition-all" style={{ color: '#A4C5CA' }}>
                الشروط والأحكام
              </a>
              <a href="#" className="text-sm transition-all" style={{ color: '#A4C5CA' }}>
                سياسة الخصوصية
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ModernBiddingPlatform;
