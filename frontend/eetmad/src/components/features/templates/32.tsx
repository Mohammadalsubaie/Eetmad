import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  Bell,
  Bookmark,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Clock,
  Code,
  DollarSign,
  Download,
  Eye,
  FileText,
  Filter,
  Globe,
  Heart,
  Megaphone,
  Menu,
  MessageCircle,
  Package,
  Palette,
  PlayCircle,
  Search,
  Send,
  Shield,
  Star,
  Target,
  TrendingUp,
  User,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { useState } from 'react';

function ProfessionalBiddingPlatform() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const categories = [
    { id: 'all', name: 'جميع المشاريع', icon: Package, count: 248 },
    { id: 'tech', name: 'التقنية', icon: Code, count: 89 },
    { id: 'design', name: 'التصميم', icon: Palette, count: 67 },
    { id: 'marketing', name: 'التسويق', icon: Megaphone, count: 54 },
    { id: 'consulting', name: 'الاستشارات', icon: Briefcase, count: 38 },
  ];

  const projects = [
    {
      id: 1,
      title: 'تطوير منصة حكومية متكاملة للخدمات الإلكترونية',
      entity: 'وزارة الموارد البشرية والتنمية الاجتماعية',
      category: 'tech',
      budget: { min: 450000, max: 750000 },
      deadline: '15 يوم',
      proposals: 42,
      views: 1847,
      status: 'urgent',
      verified: true,
      rating: 5.0,
      description:
        'مشروع استراتيجي لتطوير منصة حكومية شاملة توفر خدمات إلكترونية متكاملة للمواطنين والمقيمين مع أنظمة أمان متقدمة وتكامل مع الأنظمة الحكومية',
      requirements: [
        'خبرة لا تقل عن 5 سنوات',
        'شهادات أمان معتمدة',
        'فريق عمل متكامل',
        'سجل أعمال حكومية',
      ],
      deliverables: ['تطبيق ويب', 'تطبيق موبايل', 'لوحة إدارية', 'وثائق فنية'],
      tags: ['React', 'Node.js', 'AWS', 'Security'],
    },
    {
      id: 2,
      title: 'تصميم هوية بصرية لمبادرة وطنية كبرى',
      entity: 'هيئة تطوير المحميات الملكية',
      category: 'design',
      budget: { min: 280000, max: 450000 },
      deadline: '20 يوم',
      proposals: 28,
      views: 1342,
      status: 'featured',
      verified: true,
      rating: 4.9,
      description:
        'تصميم هوية بصرية متكاملة ومميزة لمبادرة وطنية طموحة تشمل جميع عناصر الهوية البصرية من شعار ونظام ألوان وخطوط ودليل استخدام شامل',
      requirements: [
        'محفظة أعمال متميزة',
        'خبرة في الهويات الوطنية',
        'فريق إبداعي',
        'التزام بالمواعيد',
      ],
      deliverables: ['دليل هوية', 'ملفات تصميم', 'قوالب جاهزة', 'عروض تقديمية'],
      tags: ['Branding', 'Illustrator', 'Identity'],
    },
    {
      id: 3,
      title: 'حملة تسويقية رقمية متكاملة لبرنامج حكومي',
      entity: 'الهيئة العامة للمنشآت الصغيرة والمتوسطة',
      category: 'marketing',
      budget: { min: 520000, max: 850000 },
      deadline: '10 أيام',
      proposals: 56,
      views: 2134,
      status: 'urgent',
      verified: true,
      rating: 4.8,
      description:
        'تطوير وتنفيذ استراتيجية تسويقية رقمية شاملة ومتكاملة تستهدف رواد الأعمال والمنشآت الصغيرة عبر جميع المنصات الرقمية',
      requirements: [
        'خبرة في التسويق الحكومي',
        'سجل حملات ناجحة',
        'فريق متخصص',
        'أدوات تحليل متقدمة',
      ],
      deliverables: ['استراتيجية تسويقية', 'محتوى إبداعي', 'تقارير أداء', 'إدارة حملات'],
      tags: ['Social Media', 'SEO', 'Content'],
    },
    {
      id: 4,
      title: 'استشارات تحول رقمي للقطاع الحكومي',
      entity: 'وزارة الاتصالات وتقنية المعلومات',
      category: 'consulting',
      budget: { min: 650000, max: 1200000 },
      deadline: '30 يوم',
      proposals: 23,
      views: 987,
      status: 'new',
      verified: true,
      rating: 5.0,
      description:
        'تقديم استشارات متخصصة في التحول الرقمي وتطوير خارطة طريق شاملة للتحول الرقمي مع خطة تنفيذية تفصيلية وقابلة للتطبيق',
      requirements: [
        'شهادات دولية معتمدة',
        'خبرة 10 سنوات فأكثر',
        'مشاريع حكومية سابقة',
        'فريق استشاري',
      ],
      deliverables: ['تقرير تحليلي', 'خارطة طريق', 'خطة تنفيذية', 'متابعة ميدانية'],
      tags: ['Digital Transformation', 'Strategy'],
    },
    {
      id: 5,
      title: 'تطوير نظام إدارة موارد بشرية متقدم',
      entity: 'الهيئة السعودية للمدن الطبية',
      category: 'tech',
      budget: { min: 380000, max: 620000 },
      deadline: '25 يوم',
      proposals: 34,
      views: 1456,
      status: 'featured',
      verified: true,
      rating: 4.9,
      description:
        'بناء نظام متكامل لإدارة الموارد البشرية يشمل التوظيف والتدريب والأداء والرواتب مع تكامل كامل مع الأنظمة الحكومية',
      requirements: ['خبرة في أنظمة HR', 'تكامل مع مقيم', 'أمان البيانات', 'دعم فني مستمر'],
      deliverables: ['نظام ويب', 'تطبيق موبايل', 'تدريب', 'دعم فني'],
      tags: ['HRMS', 'Vue.js', 'Laravel'],
    },
    {
      id: 6,
      title: 'إنتاج محتوى مرئي لحملة توعوية وطنية',
      entity: 'وزارة الصحة',
      category: 'design',
      budget: { min: 320000, max: 550000 },
      deadline: '18 يوم',
      proposals: 31,
      views: 1678,
      status: 'new',
      verified: true,
      rating: 4.7,
      description:
        'إنتاج محتوى مرئي احترافي وجذاب لحملة توعوية صحية وطنية تستهدف جميع فئات المجتمع بأسلوب عصري ومؤثر',
      requirements: [
        'معدات إنتاج احترافية',
        'فريق إبداعي متكامل',
        'خبرة في الإنتاج الطبي',
        'سجل أعمال',
      ],
      deliverables: ['فيديوهات توعوية', 'رسوم متحركة', 'تصاميم رقمية', 'محتوى سوشيال'],
      tags: ['Video Production', 'Animation'],
    },
  ];

  const stats = [
    { label: 'مشاريع نشطة', value: '248', change: '+18%', icon: Package, color: '#27548A' },
    { label: 'قيمة المشاريع', value: '124M', change: '+24%', icon: DollarSign, color: '#DDA853' },
    { label: 'جهات حكومية', value: '67', change: '+12%', icon: Shield, color: '#27548A' },
    { label: 'معدل النجاح', value: '96%', change: '+3%', icon: TrendingUp, color: '#3B8A5A' },
  ];

  const filteredProjects =
    activeCategory === 'all' ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: '#F3F3E0', fontFamily: 'IBM Plex Sans Arabic, sans-serif' }}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 shadow-md" style={{ backgroundColor: '#183B4E' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-xl shadow-lg"
                  style={{ backgroundColor: '#27548A' }}
                >
                  <Shield className="h-8 w-8" style={{ color: '#F3F3E0' }} />
                </div>
                <div
                  className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-lg shadow-sm"
                  style={{ backgroundColor: '#DDA853' }}
                >
                  <BadgeCheck className="h-4 w-4" style={{ color: '#183B4E' }} />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold" style={{ color: '#F3F3E0' }}>
                  منصة المنافسات الحكومية
                </h1>
                <p className="text-sm" style={{ color: '#8BAED1' }}>
                  البوابة الرسمية للمشتريات والعطاءات
                </p>
              </div>
            </div>

            <nav className="hidden items-center gap-2 lg:flex">
              {['الرئيسية', 'المشاريع', 'الجهات الحكومية', 'التقارير', 'الدعم'].map((item, idx) => (
                <button
                  key={item}
                  className="rounded-lg px-5 py-2.5 font-semibold transition-all"
                  style={{
                    color: idx === 0 ? '#DDA853' : '#8BAED1',
                    backgroundColor: idx === 0 ? 'rgba(221, 168, 83, 0.15)' : 'transparent',
                  }}
                >
                  {item}
                </button>
              ))}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <button
                className="relative rounded-lg p-3 transition-all"
                style={{ backgroundColor: 'rgba(139, 174, 209, 0.15)' }}
              >
                <Bell className="h-5 w-5" style={{ color: '#8BAED1' }} />
                <span
                  className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: '#DDA853' }}
                ></span>
              </button>

              <button
                className="flex items-center gap-3 rounded-lg px-5 py-2.5 font-semibold shadow-md transition-all"
                style={{ backgroundColor: '#27548A', color: '#F3F3E0' }}
              >
                <User className="h-5 w-5" />
                <span>حسابي</span>
              </button>
            </div>

            <button
              className="rounded-lg p-3 lg:hidden"
              style={{ backgroundColor: 'rgba(139, 174, 209, 0.15)' }}
            >
              <Menu className="h-6 w-6" style={{ color: '#8BAED1' }} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #183B4E 0%, #27548A 100%)' }}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-0 right-0 h-96 w-96 rounded-full"
            style={{ background: 'radial-gradient(circle, #DDA853, transparent)' }}
          ></div>
          <div
            className="absolute bottom-0 left-0 h-96 w-96 rounded-full"
            style={{ background: 'radial-gradient(circle, #27548A, transparent)' }}
          ></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2"
                style={{
                  backgroundColor: 'rgba(221, 168, 83, 0.2)',
                  border: '1px solid rgba(221, 168, 83, 0.3)',
                }}
              >
                <Zap className="h-4 w-4" style={{ color: '#DDA853' }} />
                <span className="text-sm font-bold" style={{ color: '#DDA853' }}>
                  248 مشروع متاح الآن
                </span>
              </div>

              <h1
                className="mb-6 text-4xl leading-tight font-bold lg:text-5xl xl:text-6xl"
                style={{ color: '#F3F3E0' }}
              >
                فرص حكومية <span style={{ color: '#DDA853' }}>استثنائية</span> بانتظارك
              </h1>

              <p className="mb-8 text-lg leading-relaxed lg:text-xl" style={{ color: '#8BAED1' }}>
                منصة موثوقة وآمنة تربط الجهات الحكومية بأفضل مقدمي الخدمات والحلول. شفافية كاملة،
                عمليات سلسة، ونجاح مضمون.
              </p>

              <div className="relative mb-8">
                <div
                  className="flex gap-3 rounded-2xl p-2 shadow-xl"
                  style={{ backgroundColor: '#FFFFFF' }}
                >
                  <div className="relative flex-1">
                    <Search
                      className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2"
                      style={{ color: '#5A7A8F' }}
                    />
                    <input
                      type="text"
                      placeholder="ابحث عن مشاريع، جهات، أو تخصصات..."
                      className="h-14 w-full rounded-xl pr-12 pl-6 text-base outline-none"
                      style={{ backgroundColor: '#F3F3E0', color: '#183B4E' }}
                    />
                  </div>
                  <button
                    className="flex h-14 items-center gap-2 rounded-xl px-8 font-bold shadow-lg transition-all"
                    style={{ backgroundColor: '#27548A', color: '#F3F3E0' }}
                  >
                    بحث
                    <ArrowUpRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  className="flex items-center gap-2 rounded-lg px-6 py-3 font-semibold shadow-md transition-all"
                  style={{ backgroundColor: '#DDA853', color: '#183B4E' }}
                >
                  <Target className="h-5 w-5" />
                  ابدأ الآن
                </button>
                <button
                  className="flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all"
                  style={{
                    backgroundColor: 'transparent',
                    border: '2px solid #8BAED1',
                    color: '#F3F3E0',
                  }}
                >
                  <PlayCircle className="h-5 w-5" />
                  شاهد الفيديو
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="rounded-2xl border-2 p-6 shadow-xl"
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderColor: idx === 1 ? '#DDA853' : '#27548A',
                    }}
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl"
                        style={{ backgroundColor: idx === 1 ? '#FBF4E8' : '#EBF2F8' }}
                      >
                        <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
                      </div>
                      <span
                        className="rounded-lg px-2.5 py-1 text-xs font-bold"
                        style={{ backgroundColor: '#E8F4ED', color: '#3B8A5A' }}
                      >
                        {stat.change}
                      </span>
                    </div>
                    <div className="mb-1 text-3xl font-bold" style={{ color: '#183B4E' }}>
                      {stat.value}
                    </div>
                    <div className="text-sm font-semibold" style={{ color: '#2A5670' }}>
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section
        className="py-12"
        style={{ backgroundColor: '#FFFFFF', borderBottom: '2px solid #D5D6C0' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-2xl font-bold" style={{ color: '#183B4E' }}>
                التصنيفات
              </h2>
              <p className="text-sm" style={{ color: '#2A5670' }}>
                تصفح المشاريع حسب المجال
              </p>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 rounded-lg border-2 px-5 py-3 font-semibold transition-all"
              style={{ borderColor: '#27548A', color: '#27548A', backgroundColor: '#FFFFFF' }}
            >
              <Filter className="h-5 w-5" />
              <span className="hidden sm:inline">تصفية متقدمة</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-xl border-2 px-6 py-3 font-semibold shadow-md transition-all ${
                  activeCategory === cat.id ? 'shadow-lg' : ''
                }`}
                style={{
                  backgroundColor: activeCategory === cat.id ? '#27548A' : '#F3F3E0',
                  borderColor: activeCategory === cat.id ? '#1D3F6A' : '#D5D6C0',
                  color: activeCategory === cat.id ? '#F3F3E0' : '#183B4E',
                }}
              >
                <div className="flex items-center gap-3">
                  <cat.icon className="h-5 w-5" />
                  <span>{cat.name}</span>
                  <span
                    className="rounded-lg px-2.5 py-1 text-xs font-bold"
                    style={{
                      backgroundColor:
                        activeCategory === cat.id ? 'rgba(243, 243, 224, 0.2)' : '#FFFFFF',
                      color: activeCategory === cat.id ? '#DDA853' : '#27548A',
                    }}
                  >
                    {cat.count}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold" style={{ color: '#183B4E' }}>
                المشاريع المتاحة
              </h2>
              <p className="text-lg" style={{ color: '#2A5670' }}>
                {filteredProjects.length} مشروع متاح للمنافسة
              </p>
            </div>
            <div className="hidden items-center gap-3 md:flex">
              <select
                className="rounded-lg border-2 px-4 py-2.5 font-semibold outline-none"
                style={{ borderColor: '#D5D6C0', color: '#183B4E', backgroundColor: '#FFFFFF' }}
              >
                <option>الأحدث</option>
                <option>الأعلى ميزانية</option>
                <option>الأقرب موعداً</option>
              </select>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedProject(project)}
                className="cursor-pointer overflow-hidden rounded-2xl border-2 shadow-lg transition-all hover:shadow-2xl"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: project.status === 'featured' ? '#DDA853' : '#D5D6C0',
                }}
              >
                <div
                  className="border-b p-6"
                  style={{
                    borderColor: '#EEEFD5',
                    background: 'linear-gradient(180deg, #F3F3E0 0%, #FFFFFF 100%)',
                  }}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-xl shadow-md"
                        style={{
                          backgroundColor:
                            project.status === 'urgent'
                              ? '#FDEAEA'
                              : project.status === 'featured'
                                ? '#FBF4E8'
                                : '#EBF2F8',
                        }}
                      >
                        <Shield
                          className="h-7 w-7"
                          style={{
                            color:
                              project.status === 'urgent'
                                ? '#C74444'
                                : project.status === 'featured'
                                  ? '#DDA853'
                                  : '#27548A',
                          }}
                        />
                      </div>
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-sm font-bold" style={{ color: '#183B4E' }}>
                            {project.entity}
                          </span>
                          {project.verified && (
                            <BadgeCheck className="h-5 w-5" style={{ color: '#3B8A5A' }} />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 fill-current" style={{ color: '#DDA853' }} />
                          <span className="text-sm font-bold" style={{ color: '#27548A' }}>
                            {project.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    {project.status === 'urgent' && (
                      <div
                        className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold"
                        style={{ backgroundColor: '#C74444', color: '#FFFFFF' }}
                      >
                        <Clock className="h-3.5 w-3.5" />
                        عاجل
                      </div>
                    )}
                    {project.status === 'featured' && (
                      <div
                        className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold"
                        style={{ backgroundColor: '#DDA853', color: '#183B4E' }}
                      >
                        <Award className="h-3.5 w-3.5" />
                        مميز
                      </div>
                    )}
                  </div>

                  <h3 className="mb-3 text-xl leading-snug font-bold" style={{ color: '#183B4E' }}>
                    {project.title}
                  </h3>

                  <p
                    className="mb-4 line-clamp-2 text-sm leading-relaxed"
                    style={{ color: '#2A5670' }}
                  >
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg px-3 py-1.5 text-xs font-semibold"
                        style={{ backgroundColor: '#E8EACA', color: '#183B4E' }}
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span
                        className="rounded-lg px-3 py-1.5 text-xs font-bold"
                        style={{ backgroundColor: '#27548A', color: '#F3F3E0' }}
                      >
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 p-6">
                  <div>
                    <div className="mb-2 flex items-center gap-1.5">
                      <DollarSign className="h-4 w-4" style={{ color: '#DDA853' }} />
                      <span className="text-xs font-semibold" style={{ color: '#5A7A8F' }}>
                        الميزانية
                      </span>
                    </div>
                    <div className="text-sm font-bold" style={{ color: '#183B4E' }}>
                      {(project.budget.min / 1000).toFixed(0)}K ر.س
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center gap-1.5">
                      <Users className="h-4 w-4" style={{ color: '#4A7BA7' }} />
                      <span className="text-xs font-semibold" style={{ color: '#5A7A8F' }}>
                        العروض
                      </span>
                    </div>
                    <div className="text-sm font-bold" style={{ color: '#183B4E' }}>
                      {project.proposals}
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center gap-1.5">
                      <Clock className="h-4 w-4" style={{ color: '#C74444' }} />
                      <span className="text-xs font-semibold" style={{ color: '#5A7A8F' }}>
                        المدة
                      </span>
                    </div>
                    <div className="text-sm font-bold" style={{ color: '#183B4E' }}>
                      {project.deadline}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 p-6 pt-0">
                  <button
                    className="flex-1 rounded-xl py-3 font-bold shadow-md transition-all"
                    style={{ backgroundColor: '#27548A', color: '#F3F3E0' }}
                  >
                    عرض التفاصيل
                  </button>
                  <button
                    className="flex h-12 w-12 items-center justify-center rounded-xl border-2 transition-all"
                    style={{ borderColor: '#27548A', backgroundColor: '#FFFFFF' }}
                  >
                    <Bookmark className="h-5 w-5" style={{ color: '#27548A' }} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              className="inline-flex items-center gap-3 rounded-xl border-2 px-10 py-4 font-bold shadow-lg transition-all"
              style={{ backgroundColor: '#FFFFFF', color: '#27548A', borderColor: '#27548A' }}
            >
              عرض جميع المشاريع ({filteredProjects.length})
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20"
        style={{ background: 'linear-gradient(135deg, #27548A 0%, #183B4E 100%)' }}
      >
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl shadow-xl"
            style={{ backgroundColor: '#DDA853' }}
          >
            <Target className="h-10 w-10" style={{ color: '#183B4E' }} />
          </div>
          <h2 className="mb-6 text-4xl font-bold" style={{ color: '#F3F3E0' }}>
            ابدأ رحلتك مع المنافسات الحكومية
          </h2>
          <p className="mb-10 text-xl leading-relaxed" style={{ color: '#8BAED1' }}>
            انضم إلى آلاف الشركات والأفراد الذين يحصلون على فرص استثنائية عبر منصتنا الموثوقة
            والآمنة
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              className="rounded-xl px-10 py-4 text-lg font-bold shadow-xl transition-all"
              style={{ backgroundColor: '#DDA853', color: '#183B4E' }}
            >
              سجل الآن مجاناً
            </button>
            <button
              className="rounded-xl border-2 px-10 py-4 text-lg font-bold transition-all"
              style={{ borderColor: '#F3F3E0', color: '#F3F3E0', backgroundColor: 'transparent' }}
            >
              تعرف على المزيد
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-16 pb-8" style={{ backgroundColor: '#183B4E' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl shadow-lg"
                  style={{ backgroundColor: '#27548A' }}
                >
                  <Shield className="h-7 w-7" style={{ color: '#F3F3E0' }} />
                </div>
                <h3 className="text-xl font-bold" style={{ color: '#F3F3E0' }}>
                  منصة المنافسات
                </h3>
              </div>
              <p className="mb-6 leading-relaxed" style={{ color: '#8BAED1' }}>
                المنصة الرسمية للمنافسات والمشتريات الحكومية في المملكة
              </p>
              <div className="flex gap-3">
                {[Globe, MessageCircle, Send].map((Icon, i) => (
                  <button
                    key={i}
                    className="flex h-10 w-10 items-center justify-center rounded-lg transition-all"
                    style={{ backgroundColor: 'rgba(139, 174, 209, 0.15)' }}
                  >
                    <Icon className="h-5 w-5" style={{ color: '#8BAED1' }} />
                  </button>
                ))}
              </div>
            </div>

            {[
              { title: 'روابط سريعة', links: ['المشاريع', 'الجهات', 'التقارير', 'الأسعار'] },
              {
                title: 'الدعم',
                links: ['مركز المساعدة', 'الأسئلة الشائعة', 'تواصل معنا', 'الشروط'],
              },
              { title: 'معلومات', links: ['من نحن', 'الخصوصية', 'الأمان', 'الوظائف'] },
            ].map((section, idx) => (
              <div key={idx}>
                <h4 className="mb-6 text-lg font-bold" style={{ color: '#F3F3E0' }}>
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="transition-all hover:text-white"
                        style={{ color: '#8BAED1' }}
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
            className="border-t pt-8 text-center"
            style={{ borderColor: 'rgba(139, 174, 209, 0.2)', color: '#8BAED1' }}
          >
            <p>© 2025 منصة المنافسات الحكومية. جميع الحقوق محفوظة</p>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(24, 59, 78, 0.95)' }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl border-2 shadow-2xl"
              style={{ backgroundColor: '#F3F3E0', borderColor: '#27548A' }}
            >
              <div
                className="sticky top-0 z-10 flex items-center justify-between border-b p-6"
                style={{ backgroundColor: '#FFFFFF', borderColor: '#D5D6C0' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-xl shadow-md"
                    style={{ backgroundColor: '#EBF2F8' }}
                  >
                    <FileText className="h-7 w-7" style={{ color: '#27548A' }} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold" style={{ color: '#183B4E' }}>
                      تفاصيل المشروع
                    </h3>
                    <p className="text-sm" style={{ color: '#5A7A8F' }}>
                      رقم المشروع: #{selectedProject.id}2025
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="flex h-12 w-12 items-center justify-center rounded-xl transition-all"
                  style={{ backgroundColor: '#E8EACA' }}
                >
                  <X className="h-6 w-6" style={{ color: '#183B4E' }} />
                </button>
              </div>

              <div className="p-8">
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex flex-1 items-center gap-3">
                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-xl shadow-md"
                      style={{ backgroundColor: '#EBF2F8' }}
                    >
                      <Shield className="h-8 w-8" style={{ color: '#27548A' }} />
                    </div>
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-lg font-bold" style={{ color: '#183B4E' }}>
                          {selectedProject.entity}
                        </span>
                        <BadgeCheck className="h-6 w-6" style={{ color: '#3B8A5A' }} />
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-5 w-5 fill-current" style={{ color: '#DDA853' }} />
                          <span className="font-bold" style={{ color: '#27548A' }}>
                            {selectedProject.rating}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-5 w-5" style={{ color: '#5A7A8F' }} />
                          <span className="text-sm" style={{ color: '#5A7A8F' }}>
                            {selectedProject.views}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedProject.status === 'featured' && (
                    <div
                      className="flex items-center gap-2 rounded-xl px-4 py-2 font-bold shadow-md"
                      style={{ backgroundColor: '#DDA853', color: '#183B4E' }}
                    >
                      <Award className="h-5 w-5" />
                      مميز
                    </div>
                  )}
                </div>

                <h2 className="mb-4 text-3xl font-bold" style={{ color: '#183B4E' }}>
                  {selectedProject.title}
                </h2>
                <p className="mb-8 text-lg leading-relaxed" style={{ color: '#2A5670' }}>
                  {selectedProject.description}
                </p>

                <div className="mb-8 grid gap-4 sm:grid-cols-3">
                  {[
                    {
                      label: 'الميزانية',
                      value: `${(selectedProject.budget.min / 1000).toFixed(0)}K - ${(selectedProject.budget.max / 1000).toFixed(0)}K ر.س`,
                      icon: DollarSign,
                      bg: '#FBF4E8',
                    },
                    {
                      label: 'العروض المقدمة',
                      value: `${selectedProject.proposals} عرض`,
                      icon: Users,
                      bg: '#EBF2F8',
                    },
                    {
                      label: 'الموعد النهائي',
                      value: selectedProject.deadline,
                      icon: Clock,
                      bg: '#FDEAEA',
                    },
                  ].map((item, i) => (
                    <div key={i} className="rounded-xl p-4" style={{ backgroundColor: item.bg }}>
                      <div className="mb-2 flex items-center gap-2">
                        <item.icon className="h-5 w-5" style={{ color: '#27548A' }} />
                        <span className="text-sm font-semibold" style={{ color: '#5A7A8F' }}>
                          {item.label}
                        </span>
                      </div>
                      <div className="text-xl font-bold" style={{ color: '#183B4E' }}>
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-8">
                  <h4 className="mb-4 text-xl font-bold" style={{ color: '#183B4E' }}>
                    المتطلبات
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2
                          className="mt-0.5 h-5 w-5 flex-shrink-0"
                          style={{ color: '#3B8A5A' }}
                        />
                        <span style={{ color: '#2A5670' }}>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-8">
                  <h4 className="mb-4 text-xl font-bold" style={{ color: '#183B4E' }}>
                    المخرجات المطلوبة
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.deliverables.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg px-4 py-2 font-semibold"
                        style={{ backgroundColor: '#E8EACA', color: '#183B4E' }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    className="flex-1 rounded-xl py-4 font-bold shadow-lg transition-all"
                    style={{ backgroundColor: '#27548A', color: '#F3F3E0' }}
                  >
                    قدم عرضك الآن
                  </button>
                  <button
                    className="rounded-xl border-2 px-6 py-4 font-bold transition-all"
                    style={{ borderColor: '#27548A', color: '#27548A', backgroundColor: '#FFFFFF' }}
                  >
                    <Download className="h-5 w-5" />
                  </button>
                  <button
                    className="rounded-xl border-2 px-6 py-4 font-bold transition-all"
                    style={{ borderColor: '#27548A', color: '#27548A', backgroundColor: '#FFFFFF' }}
                  >
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProfessionalBiddingPlatform;
