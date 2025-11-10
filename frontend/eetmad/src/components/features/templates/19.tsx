'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  BadgeCheck,
  Briefcase,
  CheckCircle,
  ChevronLeft,
  Circle,
  Clock,
  Code,
  Database,
  DollarSign,
  Facebook,
  Hexagon,
  Instagram,
  Layers,
  Linkedin,
  MapPin,
  Menu,
  Palette,
  Rocket,
  Search,
  Shield,
  Smartphone,
  Star,
  TrendingUp,
  Twitter,
  Users,
  X,
  Zap,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

function ModernFreelancePlatform() {
  const [scrollY, setScrollY] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const [selectedFilter, setSelectedFilter] = useState('featured');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { id: 'all', name: 'الكل', icon: <Layers />, count: 2847, color: '#133E87' },
    { id: 'web', name: 'تطوير الويب', icon: <Code />, count: 892, color: '#608BC1' },
    { id: 'mobile', name: 'تطبيقات الجوال', icon: <Smartphone />, count: 654, color: '#133E87' },
    { id: 'design', name: 'التصميم والإبداع', icon: <Palette />, count: 743, color: '#608BC1' },
    { id: 'marketing', name: 'التسويق الرقمي', icon: <TrendingUp />, count: 521, color: '#133E87' },
    {
      id: 'data',
      name: 'البيانات والذكاء الاصطناعي',
      icon: <Database />,
      count: 387,
      color: '#608BC1',
    },
  ];

  const projects = [
    {
      id: 1,
      title: 'تطوير منصة تجارة إلكترونية متكاملة',
      company: 'متجر الابتكار الرقمي',
      description:
        'نحتاج إلى فريق محترف لتطوير منصة تجارة إلكترونية شاملة مع نظام إدارة المخزون، بوابات الدفع المتعددة، ولوحة تحكم متقدمة',
      budget: { min: 45000, max: 75000 },
      duration: '3-5 أشهر',
      skills: ['React', 'Node.js', 'MongoDB', 'AWS', 'Payment Integration'],
      proposals: 34,
      level: 'خبير',
      posted: 'منذ ساعتين',
      verified: true,
      urgent: true,
      category: 'web',
    },
    {
      id: 2,
      title: 'تصميم هوية بصرية شاملة لشركة ناشئة',
      company: 'شركة النمو الذكي',
      description:
        'مطلوب مصمم محترف لإنشاء هوية بصرية متكاملة تشمل الشعار، الألوان، الخطوط، والمطبوعات بجودة عالمية',
      budget: { min: 15000, max: 28000 },
      duration: '4-6 أسابيع',
      skills: ['Adobe Illustrator', 'Brand Design', 'Typography', 'Creative Direction'],
      proposals: 56,
      level: 'متقدم',
      posted: 'منذ 5 ساعات',
      verified: true,
      urgent: false,
      category: 'design',
    },
    {
      id: 3,
      title: 'بناء نموذج تعلم آلي للتنبؤ بسلوك العملاء',
      company: 'مركز التحليلات الذكية',
      description:
        'نبحث عن خبير في علم البيانات لبناء نموذج ML متقدم للتنبؤ بسلوك العملاء وتحسين استراتيجيات التسويق',
      budget: { min: 35000, max: 55000 },
      duration: '2-3 أشهر',
      skills: ['Python', 'TensorFlow', 'Machine Learning', 'Data Analysis', 'Statistics'],
      proposals: 23,
      level: 'خبير',
      posted: 'منذ يوم',
      verified: true,
      urgent: false,
      category: 'data',
    },
    {
      id: 4,
      title: 'حملة تسويق رقمي متكاملة على جميع المنصات',
      company: 'وكالة التسويق الإبداعي',
      description:
        'نحتاج خبير تسويق رقمي لتخطيط وتنفيذ حملة شاملة على السوشيال ميديا، جوجل، والمحتوى التسويقي',
      budget: { min: 22000, max: 40000 },
      duration: '2-4 أشهر',
      skills: ['Social Media', 'Google Ads', 'Content Marketing', 'SEO', 'Analytics'],
      proposals: 67,
      level: 'متوسط',
      posted: 'منذ 3 ساعات',
      verified: true,
      urgent: true,
      category: 'marketing',
    },
    {
      id: 5,
      title: 'تطوير تطبيق جوال iOS و Android متقدم',
      company: 'تقنية المستقبل',
      description:
        'مطلوب مطور تطبيقات محترف لبناء تطبيق جوال متكامل مع ميزات متقدمة وتجربة مستخدم استثنائية',
      budget: { min: 55000, max: 85000 },
      duration: '4-6 أشهر',
      skills: ['React Native', 'Flutter', 'Firebase', 'API Integration', 'UI/UX'],
      proposals: 41,
      level: 'خبير',
      posted: 'منذ 4 ساعات',
      verified: true,
      urgent: false,
      category: 'mobile',
    },
    {
      id: 6,
      title: 'إنتاج محتوى فيديو احترافي لليوتيوب والسوشيال ميديا',
      company: 'استوديو الإبداع الرقمي',
      description:
        'نبحث عن منتج فيديو محترف لإنشاء محتوى بصري عالي الجودة لحملاتنا التسويقية ومنصاتنا الرقمية',
      budget: { min: 18000, max: 32000 },
      duration: '6-8 أسابيع',
      skills: ['Video Editing', 'After Effects', 'Motion Graphics', 'Storytelling'],
      proposals: 38,
      level: 'متقدم',
      posted: 'منذ 6 ساعات',
      verified: false,
      urgent: false,
      category: 'design',
    },
  ];

  const experts = [
    {
      id: 1,
      name: 'أحمد الشمري',
      title: 'مطور Full Stack متخصص',
      avatar: '🧑‍💻',
      rating: 4.9,
      reviews: 234,
      completedProjects: 156,
      hourlyRate: 450,
      skills: ['React', 'Node.js', 'Python', 'AWS'],
      verified: true,
      available: true,
      responseTime: '< 1 ساعة',
      successRate: 98,
      location: 'الرياض، السعودية',
    },
    {
      id: 2,
      name: 'سارة المطيري',
      title: 'مصممة UI/UX إبداعية',
      avatar: '👩‍🎨',
      rating: 5.0,
      reviews: 189,
      completedProjects: 143,
      hourlyRate: 380,
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
      verified: true,
      available: true,
      responseTime: '< 30 دقيقة',
      successRate: 100,
      location: 'دبي، الإمارات',
    },
    {
      id: 3,
      name: 'محمد العتيبي',
      title: 'خبير تسويق رقمي',
      avatar: '📊',
      rating: 4.8,
      reviews: 167,
      completedProjects: 198,
      hourlyRate: 420,
      skills: ['SEO', 'Google Ads', 'Social Media', 'Analytics'],
      verified: true,
      available: false,
      responseTime: '< 2 ساعة',
      successRate: 96,
      location: 'جدة، السعودية',
    },
    {
      id: 4,
      name: 'نورة الحربي',
      title: 'عالمة بيانات ومحللة',
      avatar: '🔬',
      rating: 4.9,
      reviews: 145,
      completedProjects: 112,
      hourlyRate: 520,
      skills: ['Python', 'Machine Learning', 'SQL', 'Data Visualization'],
      verified: true,
      available: true,
      responseTime: '< 1 ساعة',
      successRate: 99,
      location: 'الكويت',
    },
  ];

  const stats = [
    { label: 'مشروع نشط', value: '12,547', icon: <Briefcase />, growth: '+18%' },
    { label: 'محترف معتمد', value: '45,892', icon: <Users />, growth: '+24%' },
    { label: 'قيمة المشاريع', value: '2.4B SAR', icon: <DollarSign />, growth: '+35%' },
    { label: 'معدل الرضا', value: '98.5%', icon: <Star />, growth: '+2%' },
  ];

  return (
    <div className="min-h-screen bg-[#F3F3E0]">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrollY > 50 ? 'bg-white/95 shadow-2xl backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#133E87] to-[#608BC1] shadow-xl">
                  <Hexagon className="h-7 w-7 text-[#F3F3E0]" />
                </div>
                <div className="absolute -top-1 -right-1 h-4 w-4 animate-pulse rounded-full border-2 border-white bg-[#608BC1]" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-[#133E87]">FreelanceHub</h1>
                <p className="text-xs font-bold text-[#608BC1]">نربط المواهب بالفرص</p>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-1 lg:flex">
              {['استكشف المشاريع', 'ابحث عن محترفين', 'كيف يعمل', 'للشركات', 'الأسعار'].map(
                (item, index) => (
                  <button
                    key={index}
                    className="rounded-xl px-5 py-2.5 text-sm font-bold text-[#133E87] transition-all hover:bg-[#CBDCEB]/50 hover:text-[#608BC1]"
                  >
                    {item}
                  </button>
                )
              )}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden items-center gap-3 lg:flex">
              <button className="rounded-xl px-6 py-2.5 text-sm font-bold text-[#133E87] transition-all hover:bg-[#CBDCEB]/50">
                تسجيل الدخول
              </button>
              <button className="rounded-xl bg-gradient-to-r from-[#133E87] to-[#608BC1] px-8 py-2.5 text-sm font-black text-white transition-all hover:scale-105 hover:shadow-2xl">
                ابدأ الآن
              </button>
            </div>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-xl p-2 text-[#133E87] hover:bg-[#CBDCEB]/50 lg:hidden"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-[#CBDCEB] bg-white lg:hidden"
            >
              <div className="space-y-2 px-4 py-6">
                {['استكشف المشاريع', 'ابحث عن محترفين', 'كيف يعمل', 'للشركات', 'الأسعار'].map(
                  (item, index) => (
                    <button
                      key={index}
                      className="w-full rounded-xl px-4 py-3 text-right font-bold text-[#133E87] hover:bg-[#CBDCEB]/50"
                    >
                      {item}
                    </button>
                  )
                )}
                <div className="space-y-3 border-t border-[#CBDCEB] pt-4">
                  <button className="w-full rounded-xl border-2 border-[#133E87] px-4 py-3 font-bold text-[#133E87]">
                    تسجيل الدخول
                  </button>
                  <button className="w-full rounded-xl bg-gradient-to-r from-[#133E87] to-[#608BC1] px-4 py-3 font-black text-white">
                    ابدأ الآن
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section - Modern Asymmetric Design */}
      <section className="relative overflow-hidden px-4 pt-32 pb-24">
        {/* Geometric Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#608BC1]/20 blur-3xl"
          />
          <motion.div
            animate={{
              rotate: [360, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#133E87]/20 blur-3xl"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#CBDCEB] bg-white px-4 py-2 shadow-lg"
              >
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-[#608BC1] text-[#608BC1]" />
                  ))}
                </div>
                <span className="text-sm font-bold text-[#133E87]">
                  تقييم 4.9 من 15,000+ مستخدم
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-6 text-6xl leading-none font-black sm:text-7xl lg:text-8xl"
              >
                <span className="text-[#133E87]">وظّف</span>
                <br />
                <span className="bg-gradient-to-r from-[#608BC1] to-[#133E87] bg-clip-text text-transparent">
                  أفضل المواهب
                </span>
                <br />
                <span className="text-[#133E87]">بسهولة</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-10 max-w-xl text-xl leading-relaxed text-[#133E87]/70"
              >
                منصة متطورة تجمع أفضل المحترفين في العالم العربي لتنفيذ مشاريعك بجودة استثنائية
                وأسعار تنافسية
              </motion.p>

              {/* Search Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-10 rounded-2xl border-2 border-[#CBDCEB] bg-white p-2 shadow-2xl"
              >
                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="flex flex-1 items-center gap-3 px-4 py-2">
                    <Search className="h-5 w-5 text-[#608BC1]" />
                    <input
                      type="text"
                      placeholder="ابحث عن مشاريع، مهارات، أو محترفين..."
                      className="w-full bg-transparent font-medium text-[#133E87] placeholder-[#133E87]/40 outline-none"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <button className="rounded-xl bg-gradient-to-r from-[#133E87] to-[#608BC1] px-8 py-3.5 font-black text-white transition-all hover:shadow-xl">
                    بحث
                  </button>
                </div>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap items-center gap-8"
              >
                {[
                  { icon: <Shield />, text: 'دفع آمن 100%' },
                  { icon: <CheckCircle />, text: 'جودة مضمونة' },
                  { icon: <Zap />, text: 'توظيف سريع' },
                ].map((badge, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#CBDCEB]">
                      {React.cloneElement(badge.icon, { className: 'w-5 h-5 text-[#133E87]' })}
                    </div>
                    <span className="font-bold text-[#133E87]">{badge.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Content - Stats Cards */}
            <div className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.05 }}
                    className="relative overflow-hidden rounded-3xl border-2 border-[#CBDCEB] bg-white p-6 shadow-xl"
                  >
                    <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-gradient-to-br from-[#608BC1]/10 to-transparent" />

                    <div className="relative z-10">
                      <div className="mb-4 flex items-start justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#133E87] to-[#608BC1] shadow-lg">
                          {React.cloneElement(stat.icon, { className: 'w-6 h-6 text-white' })}
                        </div>
                        <span className="rounded-full bg-[#CBDCEB] px-3 py-1 text-xs font-black text-[#133E87]">
                          {stat.growth}
                        </span>
                      </div>

                      <div className="mb-2 text-4xl font-black text-[#133E87]">{stat.value}</div>

                      <div className="text-sm font-bold text-[#608BC1]">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section - Horizontal Scroll */}
      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-4xl font-black text-[#133E87]">التخصصات الرئيسية</h2>
              <p className="text-lg text-[#608BC1]">اختر المجال المناسب لمشروعك</p>
            </div>
            <button className="hidden items-center gap-2 rounded-xl bg-[#F3F3E0] px-6 py-3 font-bold text-[#133E87] transition-all hover:bg-[#CBDCEB] sm:flex">
              عرض الكل
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>

          <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`w-64 flex-shrink-0 rounded-2xl border-2 p-6 transition-all ${
                  activeCategory === category.id
                    ? 'border-transparent bg-gradient-to-br from-[#133E87] to-[#608BC1] text-white shadow-2xl'
                    : 'border-[#CBDCEB] bg-[#F3F3E0] text-[#133E87] hover:border-[#608BC1] hover:shadow-xl'
                }`}
              >
                <div
                  className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${
                    activeCategory === category.id ? 'bg-white/20' : 'bg-white'
                  }`}
                >
                  {React.cloneElement(category.icon, {
                    className: `w-7 h-7 ${activeCategory === category.id ? 'text-white' : 'text-[#133E87]'}`,
                  })}
                </div>

                <h3 className="mb-2 text-right text-lg font-black">{category.name}</h3>

                <div className="mt-4 flex items-center justify-between border-t border-current/20 pt-4">
                  <span className="text-sm font-semibold opacity-70">المشاريع</span>
                  <span className="text-2xl font-black">{category.count}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - Grid Layout */}
      <section className="bg-[#F3F3E0] px-4 py-24">
        <div className="mx-auto max-w-7xl">
          {/* Header with Filters */}
          <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <h2 className="mb-2 text-5xl font-black text-[#133E87]">المشاريع المتاحة</h2>
              <p className="text-xl text-[#608BC1]">اكتشف أفضل الفرص لتنمية أعمالك</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {['featured', 'recent', 'high-budget', 'urgent'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`rounded-xl px-6 py-3 text-sm font-bold transition-all ${
                    selectedFilter === filter
                      ? 'bg-gradient-to-r from-[#133E87] to-[#608BC1] text-white shadow-xl'
                      : 'border-2 border-[#CBDCEB] bg-white text-[#133E87] hover:border-[#608BC1]'
                  }`}
                >
                  {filter === 'featured' && 'المميزة'}
                  {filter === 'recent' && 'الأحدث'}
                  {filter === 'high-budget' && 'الأعلى ميزانية'}
                  {filter === 'urgent' && 'العاجلة'}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-3xl border-2 border-[#CBDCEB] bg-white p-8 transition-all hover:border-[#608BC1] hover:shadow-2xl"
              >
                {/* Decorative Element */}
                <div className="absolute top-0 right-0 h-40 w-40 rounded-bl-full bg-gradient-to-br from-[#608BC1]/10 to-transparent transition-all group-hover:scale-110" />

                {/* Header */}
                <div className="relative z-10">
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-3 flex items-center gap-2">
                        <h3 className="text-lg font-black text-[#133E87]">{project.company}</h3>
                        {project.verified && <BadgeCheck className="h-5 w-5 text-[#608BC1]" />}
                      </div>
                      <h4 className="text-2xl leading-tight font-black text-[#133E87]">
                        {project.title}
                      </h4>
                    </div>

                    {project.urgent && (
                      <span className="flex flex-shrink-0 items-center gap-1 rounded-full bg-red-500 px-4 py-2 text-xs font-black text-white shadow-lg">
                        <Zap className="h-3 w-3" />
                        عاجل
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="mb-6 leading-relaxed text-[#133E87]/70">{project.description}</p>

                  {/* Skills */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="rounded-lg border border-[#CBDCEB] bg-[#F3F3E0] px-4 py-2 text-sm font-bold text-[#133E87]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Info Grid */}
                  <div className="mb-6 grid grid-cols-3 gap-4 rounded-2xl bg-[#F3F3E0] p-5">
                    <div className="text-center">
                      <DollarSign className="mx-auto mb-2 h-5 w-5 text-[#608BC1]" />
                      <p className="mb-1 text-xs font-semibold text-[#133E87]/60">الميزانية</p>
                      <p className="text-lg font-black text-[#133E87]">
                        {project.budget.min.toLocaleString()}
                      </p>
                      <p className="text-xs font-bold text-[#608BC1]">
                        - {project.budget.max.toLocaleString()} ر.س
                      </p>
                    </div>

                    <div className="border-x border-[#CBDCEB] text-center">
                      <Clock className="mx-auto mb-2 h-5 w-5 text-[#608BC1]" />
                      <p className="mb-1 text-xs font-semibold text-[#133E87]/60">المدة</p>
                      <p className="text-lg font-black text-[#133E87]">{project.duration}</p>
                    </div>

                    <div className="text-center">
                      <Users className="mx-auto mb-2 h-5 w-5 text-[#608BC1]" />
                      <p className="mb-1 text-xs font-semibold text-[#133E87]/60">العروض</p>
                      <p className="text-lg font-black text-[#133E87]">{project.proposals}</p>
                      <p className="text-xs font-bold text-[#608BC1]">عرض</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="rounded-lg bg-[#608BC1]/10 px-3 py-1.5 font-bold text-[#608BC1]">
                        {project.level}
                      </span>
                      <span className="flex items-center gap-2 font-semibold text-[#133E87]/60">
                        <Clock className="h-4 w-4" />
                        {project.posted}
                      </span>
                    </div>

                    <button className="rounded-xl bg-gradient-to-r from-[#133E87] to-[#608BC1] px-8 py-3 font-black text-white transition-all hover:scale-105 hover:shadow-xl">
                      تقديم عرض
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-16 text-center">
            <button className="rounded-xl border-2 border-[#133E87] bg-white px-16 py-4 text-lg font-black text-[#133E87] transition-all hover:bg-[#133E87] hover:text-white">
              تحميل المزيد من المشاريع
            </button>
          </div>
        </div>
      </section>

      {/* Top Experts Section */}
      <section className="bg-white px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 text-5xl font-black text-[#133E87]"
            >
              أفضل المحترفين المعتمدين
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl text-[#608BC1]"
            >
              خبراء موثوقون بسجل حافل من النجاحات
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {experts.map((expert, index) => (
              <motion.div
                key={expert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="relative overflow-hidden rounded-3xl border-2 border-[#CBDCEB] bg-gradient-to-br from-[#F3F3E0] to-white p-8 transition-all hover:border-[#608BC1] hover:shadow-2xl"
              >
                {/* Status Indicator */}
                <div className="absolute top-6 right-6">
                  <div
                    className={`h-3 w-3 rounded-full ${
                      expert.available ? 'bg-green-500' : 'bg-gray-400'
                    } animate-pulse shadow-lg`}
                  />
                </div>

                {/* Avatar */}
                <div className="relative mb-6">
                  <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-[#133E87] to-[#608BC1] text-5xl shadow-2xl">
                    {expert.avatar}
                  </div>
                  {expert.verified && (
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 transform">
                      <div className="rounded-full border-2 border-[#608BC1] bg-white p-2 shadow-xl">
                        <BadgeCheck className="h-6 w-6 text-[#608BC1]" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="mb-6 text-center">
                  <h3 className="mb-2 text-xl font-black text-[#133E87]">{expert.name}</h3>
                  <p className="mb-4 text-sm font-bold text-[#608BC1]">{expert.title}</p>

                  {/* Rating */}
                  <div className="mb-4 flex items-center justify-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[#608BC1] text-[#608BC1]" />
                      ))}
                    </div>
                    <span className="text-sm font-black text-[#133E87]">{expert.rating}</span>
                    <span className="text-xs text-[#133E87]/60">({expert.reviews})</span>
                  </div>

                  <p className="flex items-center justify-center gap-1 text-xs text-[#133E87]/60">
                    <MapPin className="h-3 w-3" />
                    {expert.location}
                  </p>
                </div>

                {/* Stats */}
                <div className="mb-6 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-[#CBDCEB] bg-white p-3 text-center">
                    <p className="text-2xl font-black text-[#133E87]">{expert.completedProjects}</p>
                    <p className="text-xs font-semibold text-[#608BC1]">مشروع</p>
                  </div>
                  <div className="rounded-xl border border-[#CBDCEB] bg-white p-3 text-center">
                    <p className="text-2xl font-black text-[#608BC1]">{expert.successRate}%</p>
                    <p className="text-xs font-semibold text-[#608BC1]">نجاح</p>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <div className="flex flex-wrap justify-center gap-2">
                    {expert.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="rounded-lg border border-[#CBDCEB] bg-white px-3 py-1 text-xs font-semibold text-[#133E87]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Rate */}
                <div className="mb-6 rounded-xl border border-[#CBDCEB] bg-white p-4 text-center">
                  <p className="mb-1 text-sm font-semibold text-[#133E87]/60">الأجر/ساعة</p>
                  <p className="text-3xl font-black text-[#608BC1]">{expert.hourlyRate} ر.س</p>
                </div>

                {/* CTA */}
                <button className="w-full rounded-xl bg-gradient-to-r from-[#133E87] to-[#608BC1] py-3.5 font-black text-white transition-all hover:scale-105 hover:shadow-xl">
                  عرض الملف الشخصي
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#133E87] via-[#608BC1] to-[#133E87] px-4 py-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 h-full w-full">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 3 + i * 0.2,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              >
                <Circle className="h-4 w-4 text-white" />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mx-auto mb-10 flex h-24 w-24 items-center justify-center rounded-3xl bg-white/20 shadow-2xl backdrop-blur-sm"
          >
            <Rocket className="h-12 w-12 text-white" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 text-6xl font-black text-white"
          >
            جاهز لبدء مشروعك القادم؟
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-14 max-w-2xl text-2xl leading-relaxed text-white/90"
          >
            انضم إلى آلاف الشركات والمحترفين الذين يحققون أهدافهم من خلال منصتنا
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center gap-6 sm:flex-row"
          >
            <button className="rounded-xl bg-white px-16 py-5 text-xl font-black text-[#133E87] shadow-2xl transition-all hover:scale-105 hover:bg-[#F3F3E0]">
              ابدأ مشروعك الآن
            </button>
            <button className="rounded-xl border-2 border-white bg-transparent px-16 py-5 text-xl font-black text-white transition-all hover:bg-white hover:text-[#133E87]">
              تصفح المحترفين
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#133E87] px-4 pt-20 pb-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {/* Company Info */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#608BC1]">
                  <Hexagon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">FreelanceHub</h3>
                  <p className="text-xs font-bold text-[#CBDCEB]">نربط المواهب بالفرص</p>
                </div>
              </div>

              <p className="mb-8 leading-relaxed text-[#CBDCEB]">
                المنصة الرائدة في العالم العربي لربط الشركات بأفضل المحترفين
              </p>

              <div className="flex gap-3">
                {[Twitter, Instagram, Linkedin, Facebook].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#608BC1] text-white transition-all hover:bg-[#CBDCEB] hover:text-[#133E87]"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {[
              { title: 'الشركة', links: ['عن المنصة', 'المدونة', 'الوظائف', 'الشركاء'] },
              { title: 'الخدمات', links: ['للشركات', 'للمحترفين', 'الأسعار', 'API'] },
              { title: 'الدعم', links: ['مركز المساعدة', 'اتصل بنا', 'الشروط', 'الخصوصية'] },
            ].map((column, index) => (
              <div key={index}>
                <h4 className="mb-6 text-lg font-black text-white">{column.title}</h4>
                <ul className="space-y-3">
                  {column.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="font-semibold text-[#CBDCEB] transition-colors hover:text-white"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-[#608BC1]/30 pt-8">
            <p className="text-center font-semibold text-[#CBDCEB]">
              © 2025 FreelanceHub. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ModernFreelancePlatform;
