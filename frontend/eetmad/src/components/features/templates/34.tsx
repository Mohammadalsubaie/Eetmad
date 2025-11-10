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
  Circle,
  Clock,
  Code,
  DollarSign,
  Eye,
  Filter,
  Layers,
  MapPin,
  Megaphone,
  Palette,
  Play,
  Search,
  Share2,
  Shield,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  User,
  Users,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';

function RoyalBiddingPlatform() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { id: 'all', name: 'جميع المشاريع', icon: Layers, count: 486 },
    { id: 'tech', name: 'التقنية والبرمجة', icon: Code, count: 187 },
    { id: 'design', name: 'التصميم والإبداع', icon: Palette, count: 134 },
    { id: 'marketing', name: 'التسويق والإعلان', icon: Megaphone, count: 98 },
    { id: 'consulting', name: 'الاستشارات', icon: Briefcase, count: 67 },
  ];

  const opportunities = [
    {
      id: 1,
      title: 'تطوير منصة حكومية رقمية متقدمة للخدمات الإلكترونية الشاملة',
      entity: 'وزارة التحول الرقمي والابتكار',
      category: 'tech',
      budget: { min: 850000, max: 1400000, currency: 'ريال' },
      timeline: '18 شهر',
      deadline: '12 يوم',
      proposals: 94,
      views: 4821,
      rating: 5.0,
      verified: true,
      premium: true,
      urgent: true,
      description:
        'مشروع استراتيجي وطني لبناء منصة حكومية شاملة ومتطورة توفر خدمات إلكترونية متكاملة للمواطنين والمقيمين بأعلى معايير الأمان والجودة والأداء',
      requirements: [
        'React/Next.js',
        'Microservices',
        'Cloud Infrastructure',
        'Cybersecurity',
        'AI Integration',
      ],
      location: 'الرياض',
      engagement: 'نشط جداً',
      successRate: 98,
      type: 'مفتوح للمنافسة',
    },
    {
      id: 2,
      title: 'تصميم هوية بصرية متكاملة ونظام تصميم شامل لمبادرة وطنية كبرى',
      entity: 'هيئة تطوير الترفيه الوطنية',
      category: 'design',
      budget: { min: 380000, max: 620000, currency: 'ريال' },
      timeline: '8 أشهر',
      deadline: '19 يوم',
      proposals: 76,
      views: 3542,
      rating: 4.9,
      verified: true,
      premium: true,
      urgent: false,
      description:
        'تطوير هوية بصرية شاملة ومبتكرة لمبادرة وطنية استراتيجية تشمل الشعار المؤسسي، نظام الألوان، الخطوط، ودليل الاستخدام الكامل والمعايير',
      requirements: [
        'Brand Identity',
        'UI/UX Design',
        'Design Systems',
        'Illustration',
        'Motion Graphics',
      ],
      location: 'جدة',
      engagement: 'نشط',
      successRate: 96,
      type: 'مفتوح للمنافسة',
    },
    {
      id: 3,
      title: 'استراتيجية تسويق رقمي متكاملة وحملات إعلانية شاملة عبر القنوات الرقمية',
      entity: 'صندوق التنمية الوطني السعودي',
      category: 'marketing',
      budget: { min: 680000, max: 1100000, currency: 'ريال' },
      timeline: '12 شهر',
      deadline: '6 أيام',
      proposals: 128,
      views: 5934,
      rating: 5.0,
      verified: true,
      premium: true,
      urgent: true,
      description:
        'تطوير وتنفيذ استراتيجية تسويقية رقمية شاملة ومتطورة تستهدف رواد الأعمال والمستثمرين عبر جميع القنوات والمنصات الرقمية الحديثة',
      requirements: [
        'Digital Strategy',
        'Content Marketing',
        'Social Media',
        'SEO/SEM',
        'Analytics',
      ],
      location: 'الرياض',
      engagement: 'نشط جداً',
      successRate: 99,
      type: 'عاجل - أولوية عالية',
    },
    {
      id: 4,
      title: 'استشارات تحول رقمي استراتيجي وإعداد خارطة طريق شاملة للتطوير المؤسسي',
      entity: 'وزارة الاتصالات وتقنية المعلومات',
      category: 'consulting',
      budget: { min: 1200000, max: 1900000, currency: 'ريال' },
      timeline: '24 شهر',
      deadline: '28 يوم',
      proposals: 52,
      views: 2876,
      rating: 4.8,
      verified: true,
      premium: false,
      urgent: false,
      description:
        'تقديم استشارات متخصصة ومتقدمة في التحول الرقمي المؤسسي وإعداد خارطة طريق استراتيجية شاملة مع خطة تنفيذية تفصيلية وقابلة للتطبيق الفوري',
      requirements: [
        'Digital Transformation',
        'Enterprise Architecture',
        'Change Management',
        'IT Strategy',
      ],
      location: 'الرياض',
      engagement: 'متوسط',
      successRate: 94,
      type: 'مفتوح للمنافسة',
    },
  ];

  const stats = [
    { label: 'فرص نشطة', value: '486', change: '+32%', icon: Activity, color: '#27548A' },
    {
      label: 'القيمة الإجمالية',
      value: '2.4B',
      unit: 'ريال',
      change: '+28%',
      icon: DollarSign,
      color: '#DDA853',
    },
    { label: 'جهات حكومية', value: '127', change: '+18%', icon: Building2, color: '#27548A' },
    { label: 'معدل الإنجاز', value: '97%', change: '+6%', icon: TrendingUp, color: '#2A7F62' },
  ];

  const filteredOpportunities =
    activeFilter === 'all'
      ? opportunities
      : opportunities.filter((o) => o.category === activeFilter);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: '#F5EEDC', fontFamily: 'IBM Plex Sans Arabic, sans-serif' }}
    >
      {/* Premium Header */}
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}
        style={{
          backgroundColor: isScrolled ? 'rgba(24, 59, 78, 0.98)' : '#183B4E',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        }}
      >
        {/* Top Bar */}
        <div className="border-b" style={{ borderColor: 'rgba(221, 168, 83, 0.15)' }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-12 items-center justify-between text-sm">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2" style={{ color: '#A4BDD9' }}>
                  <Shield className="h-4 w-4" style={{ color: '#DDA853' }} />
                  <span>منصة موثقة ومعتمدة رسمياً</span>
                </div>
                <div className="hidden items-center gap-2 md:flex" style={{ color: '#A4BDD9' }}>
                  <CheckCircle2 className="h-4 w-4" style={{ color: '#2A7F62' }} />
                  <span>نسبة نجاح 97%</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="transition-colors hover:text-white" style={{ color: '#A4BDD9' }}>
                  العربية
                </button>
                <span style={{ color: 'rgba(221, 168, 83, 0.3)' }}>|</span>
                <button className="transition-colors hover:text-white" style={{ color: '#A4BDD9' }}>
                  الدعم
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-5">
              <motion.div whileHover={{ scale: 1.03 }} className="flex items-center gap-4">
                <div className="relative">
                  <div
                    className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl shadow-2xl"
                    style={{ background: 'linear-gradient(135deg, #27548A 0%, #1D3F68 100%)' }}
                  >
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        background: 'radial-gradient(circle at 30% 30%, #DDA853, transparent)',
                      }}
                    ></div>
                    <Target className="relative z-10 h-7 w-7" style={{ color: '#F5EEDC' }} />
                  </div>
                  <div
                    className="absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full"
                    style={{ backgroundColor: '#DDA853', border: '2px solid #183B4E' }}
                  >
                    <Sparkles className="h-3 w-3" style={{ color: '#183B4E' }} />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-tight" style={{ color: '#F5EEDC' }}>
                    منصة الفرص الوطنية
                  </h1>
                  <p className="text-xs font-semibold" style={{ color: '#DDA853' }}>
                    بوابة المنافسات الحكومية الرسمية
                  </p>
                </div>
              </motion.div>
            </div>

            <nav className="hidden items-center gap-2 lg:flex">
              {['الرئيسية', 'الفرص', 'الجهات', 'المصادر', 'من نحن'].map((item, idx) => (
                <motion.button
                  key={item}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative overflow-hidden rounded-xl px-6 py-2.5 text-sm font-bold transition-all"
                  style={{
                    color: idx === 0 ? '#DDA853' : '#A4BDD9',
                    backgroundColor: idx === 0 ? 'rgba(221, 168, 83, 0.12)' : 'transparent',
                  }}
                >
                  {idx === 0 && (
                    <div
                      className="absolute right-0 bottom-0 left-0 h-0.5"
                      style={{ backgroundColor: '#DDA853' }}
                    ></div>
                  )}
                  <span className="relative z-10">{item}</span>
                </motion.button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="relative rounded-xl p-3 transition-all"
                style={{ backgroundColor: 'rgba(164, 189, 217, 0.12)' }}
              >
                <Bell className="h-5 w-5" style={{ color: '#A4BDD9' }} />
                <div
                  className="absolute top-2 right-2 h-2 w-2 rounded-full"
                  style={{ backgroundColor: '#DDA853' }}
                >
                  <div
                    className="h-2 w-2 animate-ping rounded-full"
                    style={{ backgroundColor: '#DDA853' }}
                  ></div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group relative flex items-center gap-3 overflow-hidden rounded-xl px-6 py-3 text-sm font-bold shadow-xl transition-all"
                style={{ background: 'linear-gradient(135deg, #DDA853 0%, #C88F3C 100%)' }}
              >
                <div className="absolute inset-0 bg-white opacity-0 transition-opacity group-hover:opacity-10"></div>
                <User className="relative z-10 h-5 w-5" style={{ color: '#183B4E' }} />
                <span className="relative z-10" style={{ color: '#183B4E' }}>
                  حسابي
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <div className="pt-32"></div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pb-16">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(165deg, #183B4E 0%, #27548A 100%)' }}
        >
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full blur-3xl"
              style={{ background: '#DDA853' }}
            ></div>
            <div
              className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full blur-3xl"
              style={{ background: '#27548A' }}
            ></div>
          </div>
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, rgba(245, 238, 220, 0.15) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          ></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-5xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div
                className="mb-8 inline-flex items-center gap-2.5 rounded-full border px-5 py-2.5"
                style={{
                  backgroundColor: 'rgba(221, 168, 83, 0.12)',
                  borderColor: 'rgba(221, 168, 83, 0.3)',
                  boxShadow: '0 8px 32px rgba(221, 168, 83, 0.15)',
                }}
              >
                <Sparkles className="h-4.5 w-4.5" style={{ color: '#DDA853' }} />
                <span className="text-sm font-bold" style={{ color: '#DDA853' }}>
                  486 فرصة حكومية متاحة الآن
                </span>
                <Circle
                  className="h-2 w-2 animate-pulse fill-current"
                  style={{ color: '#2A7F62' }}
                />
              </div>

              <h1
                className="mb-8 text-6xl leading-tight font-bold tracking-tight lg:text-7xl xl:text-8xl"
                style={{ color: '#F5EEDC' }}
              >
                استثمر في{' '}
                <span className="relative inline-block">
                  <span style={{ color: '#DDA853' }}>المستقبل</span>
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    height="12"
                    viewBox="0 0 300 12"
                    fill="none"
                  >
                    <path
                      d="M0 8 Q150 0, 300 8"
                      stroke="#DDA853"
                      strokeWidth="3"
                      fill="none"
                      opacity="0.5"
                    />
                  </svg>
                </span>
              </h1>

              <p
                className="mb-12 text-2xl leading-relaxed font-light lg:text-3xl"
                style={{ color: '#A4BDD9' }}
              >
                منصة المنافسات الحكومية الأولى. شفافية مطلقة، فرص استثنائية، ونجاح مضمون
              </p>

              <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative flex items-center gap-3 overflow-hidden rounded-2xl px-10 py-5 text-lg font-bold shadow-2xl transition-all"
                  style={{ background: 'linear-gradient(135deg, #DDA853 0%, #C88F3C 100%)' }}
                >
                  <div className="absolute inset-0 bg-white opacity-0 transition-opacity group-hover:opacity-10"></div>
                  <span className="relative z-10" style={{ color: '#183B4E' }}>
                    استكشف الفرص
                  </span>
                  <ArrowRight
                    className="relative z-10 h-6 w-6 transition-transform group-hover:translate-x-1"
                    style={{ color: '#183B4E' }}
                  />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-3 rounded-2xl border-2 px-10 py-5 text-lg font-bold backdrop-blur-sm transition-all"
                  style={{
                    borderColor: 'rgba(245, 238, 220, 0.3)',
                    color: '#F5EEDC',
                    backgroundColor: 'rgba(245, 238, 220, 0.05)',
                  }}
                >
                  <Play className="h-6 w-6 transition-transform group-hover:scale-110" />
                  <span>شاهد كيف نعمل</span>
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative overflow-hidden rounded-3xl border p-8 backdrop-blur-xl transition-all"
                style={{
                  backgroundColor: 'rgba(245, 238, 220, 0.08)',
                  borderColor: 'rgba(221, 168, 83, 0.2)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div className="absolute top-0 right-0 h-32 w-32 opacity-5 transition-opacity group-hover:opacity-10">
                  <stat.icon className="h-full w-full" style={{ color: stat.color }} />
                </div>

                <div className="relative z-10 mb-5 flex items-start justify-between">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl border backdrop-blur-sm transition-all group-hover:scale-110"
                    style={{
                      backgroundColor: `${stat.color}15`,
                      borderColor: `${stat.color}30`,
                    }}
                  >
                    <stat.icon className="h-7 w-7" style={{ color: stat.color }} />
                  </div>
                  <div
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 backdrop-blur-sm"
                    style={{ backgroundColor: 'rgba(42, 127, 98, 0.12)' }}
                  >
                    <TrendingUp className="h-4 w-4" style={{ color: '#2A7F62' }} />
                    <span className="text-xs font-bold" style={{ color: '#2A7F62' }}>
                      {stat.change}
                    </span>
                  </div>
                </div>

                <div className="relative z-10">
                  <div className="mb-2 flex items-baseline gap-2">
                    <div className="text-4xl font-bold" style={{ color: '#F5EEDC' }}>
                      {stat.value}
                    </div>
                    {stat.unit && (
                      <div className="text-lg font-semibold" style={{ color: '#DDA853' }}>
                        {stat.unit}
                      </div>
                    )}
                  </div>
                  <div className="text-sm font-semibold" style={{ color: '#A4BDD9' }}>
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section
        className="border-y py-12"
        style={{ backgroundColor: '#FFFFFF', borderColor: '#DDD2B8' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col items-center gap-6 lg:flex-row">
            <div className="relative w-full flex-1">
              <Search
                className="absolute top-1/2 right-6 h-6 w-6 -translate-y-1/2"
                style={{ color: '#4A7590' }}
              />
              <input
                type="text"
                placeholder="ابحث عن فرص، جهات حكومية، أو مجالات..."
                className="h-16 w-full rounded-2xl border-2 pr-16 pl-8 text-lg font-semibold transition-all outline-none focus:shadow-xl"
                style={{
                  backgroundColor: '#F5EEDC',
                  color: '#183B4E',
                  borderColor: '#DDD2B8',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#27548A')}
                onBlur={(e) => (e.target.style.borderColor = '#DDD2B8')}
              />
            </div>

            <div className="flex flex-wrap gap-4 lg:flex-nowrap">
              <button
                className="flex items-center gap-3 rounded-2xl border-2 px-7 py-4 font-bold transition-all hover:shadow-lg"
                style={{ borderColor: '#27548A', color: '#27548A', backgroundColor: '#FFFFFF' }}
              >
                <Filter className="h-5 w-5" />
                <span>خيارات متقدمة</span>
              </button>
              <button
                className="rounded-2xl px-8 py-4 font-bold shadow-lg transition-all hover:shadow-xl"
                style={{
                  background: 'linear-gradient(135deg, #27548A 0%, #1D3F68 100%)',
                  color: '#F5EEDC',
                }}
              >
                بحث
              </button>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-3">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveFilter(cat.id)}
                className={`rounded-2xl border-2 px-7 py-4 font-bold whitespace-nowrap shadow-md transition-all ${
                  activeFilter === cat.id ? 'shadow-xl' : ''
                }`}
                style={{
                  backgroundColor: activeFilter === cat.id ? '#27548A' : '#F5EEDC',
                  borderColor: activeFilter === cat.id ? '#1D3F68' : '#DDD2B8',
                  color: activeFilter === cat.id ? '#F5EEDC' : '#183B4E',
                }}
              >
                <div className="flex items-center gap-3">
                  <cat.icon className="h-5.5 w-5.5" />
                  <span>{cat.name}</span>
                  <span
                    className="rounded-xl px-3 py-1.5 text-xs font-bold"
                    style={{
                      backgroundColor:
                        activeFilter === cat.id ? 'rgba(221, 168, 83, 0.2)' : '#FFFFFF',
                      color: activeFilter === cat.id ? '#DDA853' : '#27548A',
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

      {/* Opportunities Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="mb-3 text-5xl font-bold" style={{ color: '#183B4E' }}>
                الفرص المتاحة
              </h2>
              <p className="text-xl font-semibold" style={{ color: '#2E5972' }}>
                {filteredOpportunities.length} فرصة استثمارية متميزة
              </p>
            </div>
            <select
              className="rounded-2xl border-2 px-7 py-4 text-lg font-bold shadow-md outline-none"
              style={{ borderColor: '#DDD2B8', color: '#183B4E', backgroundColor: '#FFFFFF' }}
            >
              <option>الأحدث</option>
              <option>الأعلى قيمة</option>
              <option>الأكثر مشاهدة</option>
              <option>الأقرب موعداً</option>
            </select>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {filteredOpportunities.map((opp, idx) => (
              <motion.div
                key={opp.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                whileHover={{ y: -12, scale: 1.01 }}
                className="group relative cursor-pointer overflow-hidden rounded-3xl border-2 shadow-xl transition-all hover:shadow-2xl"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: opp.premium ? '#DDA853' : '#E9DEBF',
                }}
              >
                {opp.premium && (
                  <div
                    className="absolute top-0 right-0 left-0 h-1.5"
                    style={{
                      background: 'linear-gradient(90deg, #DDA853 0%, #EBCF92 50%, #DDA853 100%)',
                    }}
                  ></div>
                )}

                <div className="p-10">
                  {/* Header */}
                  <div className="mb-8 flex items-start justify-between">
                    <div className="flex flex-1 items-center gap-5">
                      <div className="relative">
                        <div
                          className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl shadow-lg"
                          style={{
                            background: 'linear-gradient(135deg, #183B4E 0%, #27548A 100%)',
                          }}
                        >
                          <Building2
                            className="relative z-10 h-10 w-10"
                            style={{ color: '#F5EEDC' }}
                          />
                          <div
                            className="absolute inset-0 opacity-20"
                            style={{
                              background:
                                'radial-gradient(circle at 30% 30%, #DDA853, transparent)',
                            }}
                          ></div>
                        </div>
                        {opp.verified && (
                          <div
                            className="absolute -right-1.5 -bottom-1.5 flex h-7 w-7 items-center justify-center rounded-full shadow-md"
                            style={{ backgroundColor: '#2A7F62', border: '3px solid #FFFFFF' }}
                          >
                            <CheckCircle2 className="h-4 w-4" style={{ color: '#FFFFFF' }} />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="mb-2.5 flex items-center gap-3">
                          <span className="text-base font-bold" style={{ color: '#183B4E' }}>
                            {opp.entity}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          <div className="flex items-center gap-1.5">
                            <Star
                              className="h-4.5 w-4.5 fill-current"
                              style={{ color: '#DDA853' }}
                            />
                            <span className="text-sm font-bold" style={{ color: '#27548A' }}>
                              {opp.rating}
                            </span>
                          </div>
                          <span className="text-sm" style={{ color: '#4A7590' }}>
                            •
                          </span>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-4.5 w-4.5" style={{ color: '#4A7590' }} />
                            <span className="text-sm font-semibold" style={{ color: '#4A7590' }}>
                              {opp.location}
                            </span>
                          </div>
                          <span className="text-sm" style={{ color: '#4A7590' }}>
                            •
                          </span>
                          <span
                            className="rounded-lg px-3 py-1 text-sm font-semibold"
                            style={{ backgroundColor: '#F4E6CE', color: '#183B4E' }}
                          >
                            {opp.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2.5">
                      {opp.urgent && (
                        <div
                          className="flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold shadow-md"
                          style={{ backgroundColor: '#C84B4B', color: '#FFFFFF' }}
                        >
                          <Clock className="h-4 w-4" />
                          عاجل
                        </div>
                      )}
                      {opp.premium && (
                        <div
                          className="flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold shadow-md"
                          style={{
                            background: 'linear-gradient(135deg, #DDA853 0%, #C88F3C 100%)',
                            color: '#183B4E',
                          }}
                        >
                          <Award className="h-4 w-4" />
                          مميز
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="mb-5 line-clamp-2 text-2xl leading-snug font-bold transition-colors group-hover:text-blue-700"
                    style={{ color: '#183B4E' }}
                  >
                    {opp.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="mb-7 line-clamp-2 text-base leading-relaxed"
                    style={{ color: '#2E5972' }}
                  >
                    {opp.description}
                  </p>

                  {/* Requirements */}
                  <div className="mb-8 flex flex-wrap gap-2.5">
                    {opp.requirements.slice(0, 4).map((req) => (
                      <span
                        key={req}
                        className="rounded-xl px-4 py-2.5 text-sm font-semibold transition-all hover:shadow-md"
                        style={{ backgroundColor: '#E9DEBF', color: '#183B4E' }}
                      >
                        {req}
                      </span>
                    ))}
                    {opp.requirements.length > 4 && (
                      <span
                        className="rounded-xl px-4 py-2.5 text-sm font-bold shadow-md"
                        style={{ backgroundColor: '#27548A', color: '#F5EEDC' }}
                      >
                        +{opp.requirements.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Stats Grid */}
                  <div
                    className="mb-8 grid grid-cols-4 gap-5 rounded-2xl p-6"
                    style={{ backgroundColor: '#F5EEDC' }}
                  >
                    <div>
                      <div className="mb-2.5 flex items-center gap-2">
                        <DollarSign className="h-5 w-5" style={{ color: '#DDA853' }} />
                        <span className="text-xs font-bold" style={{ color: '#4A7590' }}>
                          الميزانية
                        </span>
                      </div>
                      <div className="text-base font-bold" style={{ color: '#183B4E' }}>
                        {(opp.budget.min / 1000).toFixed(0)}K
                      </div>
                    </div>
                    <div>
                      <div className="mb-2.5 flex items-center gap-2">
                        <Users className="h-5 w-5" style={{ color: '#27548A' }} />
                        <span className="text-xs font-bold" style={{ color: '#4A7590' }}>
                          المتقدمون
                        </span>
                      </div>
                      <div className="text-base font-bold" style={{ color: '#183B4E' }}>
                        {opp.proposals}
                      </div>
                    </div>
                    <div>
                      <div className="mb-2.5 flex items-center gap-2">
                        <Clock className="h-5 w-5" style={{ color: '#C84B4B' }} />
                        <span className="text-xs font-bold" style={{ color: '#4A7590' }}>
                          المهلة
                        </span>
                      </div>
                      <div className="text-base font-bold" style={{ color: '#183B4E' }}>
                        {opp.deadline}
                      </div>
                    </div>
                    <div>
                      <div className="mb-2.5 flex items-center gap-2">
                        <Eye className="h-5 w-5" style={{ color: '#2A7F62' }} />
                        <span className="text-xs font-bold" style={{ color: '#4A7590' }}>
                          المشاهدات
                        </span>
                      </div>
                      <div className="text-base font-bold" style={{ color: '#183B4E' }}>
                        {opp.views}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 rounded-2xl py-4 text-base font-bold shadow-lg transition-all hover:shadow-xl"
                      style={{
                        background: 'linear-gradient(135deg, #27548A 0%, #1D3F68 100%)',
                        color: '#F5EEDC',
                      }}
                    >
                      قدّم عرضك الآن
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 transition-all hover:shadow-lg"
                      style={{ borderColor: '#27548A', backgroundColor: '#FFFFFF' }}
                    >
                      <Bookmark className="h-6 w-6" style={{ color: '#27548A' }} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 transition-all hover:shadow-lg"
                      style={{ borderColor: '#27548A', backgroundColor: '#FFFFFF' }}
                    >
                      <Share2 className="h-6 w-6" style={{ color: '#27548A' }} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-4 rounded-2xl border-2 px-14 py-5 text-lg font-bold shadow-xl transition-all hover:shadow-2xl"
              style={{ backgroundColor: '#FFFFFF', color: '#27548A', borderColor: '#27548A' }}
            >
              استعراض جميع الفرص
              <ChevronDown className="h-6 w-6" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="relative overflow-hidden py-28"
        style={{ background: 'linear-gradient(135deg, #27548A 0%, #183B4E 100%)' }}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full blur-3xl"
            style={{ background: '#DDA853' }}
          ></div>
          <div
            className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full blur-3xl"
            style={{ background: '#27548A' }}
          ></div>
        </div>

        <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="relative mx-auto mb-10 flex h-28 w-28 items-center justify-center overflow-hidden rounded-3xl shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #DDA853 0%, #C88F3C 100%)' }}
            >
              <div className="absolute inset-0 bg-white opacity-0 transition-opacity hover:opacity-10"></div>
              <Zap className="relative z-10 h-14 w-14" style={{ color: '#183B4E' }} />
            </div>

            <h2 className="mb-8 text-6xl font-bold" style={{ color: '#F5EEDC' }}>
              ابدأ رحلة النجاح
            </h2>

            <p
              className="mx-auto mb-14 max-w-4xl text-2xl leading-relaxed font-light"
              style={{ color: '#A4BDD9' }}
            >
              انضم إلى آلاف الشركات والمحترفين الذين يحققون إنجازات استثنائية عبر منصتنا الوطنية
            </p>

            <div className="flex flex-col justify-center gap-6 sm:flex-row">
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden rounded-2xl px-14 py-6 text-xl font-bold shadow-2xl transition-all"
                style={{ background: 'linear-gradient(135deg, #DDA853 0%, #C88F3C 100%)' }}
              >
                <div className="absolute inset-0 bg-white opacity-0 transition-opacity group-hover:opacity-10"></div>
                <span className="relative z-10" style={{ color: '#183B4E' }}>
                  سجّل مجاناً الآن
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-2xl border-2 px-14 py-6 text-xl font-bold backdrop-blur-sm transition-all"
                style={{
                  borderColor: 'rgba(245, 238, 220, 0.4)',
                  color: '#F5EEDC',
                  backgroundColor: 'rgba(245, 238, 220, 0.08)',
                }}
              >
                اكتشف المزيد
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-24 pb-12" style={{ backgroundColor: '#183B4E' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-20 grid gap-14 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="mb-8 flex items-center gap-4">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl shadow-2xl"
                  style={{ background: 'linear-gradient(135deg, #27548A 0%, #1D3F68 100%)' }}
                >
                  <Target className="h-8 w-8" style={{ color: '#F5EEDC' }} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold" style={{ color: '#F5EEDC' }}>
                    منصة الفرص
                  </h3>
                  <p className="text-sm font-semibold" style={{ color: '#DDA853' }}>
                    الوطنية
                  </p>
                </div>
              </div>
              <p className="mb-8 text-base leading-relaxed" style={{ color: '#A4BDD9' }}>
                منصة المنافسات الحكومية الرائدة. نربط المواهب بالفرص بشفافية واحترافية مطلقة
              </p>
            </div>

            {[
              {
                title: 'روابط سريعة',
                links: ['الفرص المتاحة', 'الجهات الحكومية', 'المصادر والأدلة', 'باقات الاشتراك'],
              },
              {
                title: 'الدعم والمساعدة',
                links: ['مركز المساعدة', 'الأسئلة الشائعة', 'تواصل معنا', 'الشروط والأحكام'],
              },
              {
                title: 'عن المنصة',
                links: ['من نحن', 'سياسة الخصوصية', 'الأمان والحماية', 'الوظائف'],
              },
            ].map((section, idx) => (
              <div key={idx}>
                <h4 className="mb-7 text-xl font-bold" style={{ color: '#F5EEDC' }}>
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="inline-block text-base font-semibold transition-all hover:translate-x-2"
                        style={{ color: '#A4BDD9' }}
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
            className="flex flex-col items-center justify-between gap-6 border-t pt-10 md:flex-row"
            style={{ borderColor: 'rgba(164, 189, 217, 0.15)' }}
          >
            <p className="text-base" style={{ color: '#A4BDD9' }}>
              © 2025 منصة الفرص الوطنية. جميع الحقوق محفوظة
            </p>
            <div className="flex gap-8">
              <a
                href="#"
                className="text-sm font-semibold transition-all hover:text-white"
                style={{ color: '#A4BDD9' }}
              >
                الشروط والأحكام
              </a>
              <a
                href="#"
                className="text-sm font-semibold transition-all hover:text-white"
                style={{ color: '#A4BDD9' }}
              >
                سياسة الخصوصية
              </a>
              <a
                href="#"
                className="text-sm font-semibold transition-all hover:text-white"
                style={{ color: '#A4BDD9' }}
              >
                ملفات تعريف الارتباط
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default RoyalBiddingPlatform;
