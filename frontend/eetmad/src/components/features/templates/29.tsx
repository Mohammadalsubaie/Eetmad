import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Briefcase,
  CheckCircle,
  Clock,
  Code,
  DollarSign,
  Eye,
  FileText,
  Layers,
  MapPin,
  Megaphone,
  Menu,
  Palette,
  Rocket,
  Search,
  Shield,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  User,
  Users,
  Video,
  X,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';

function ModernBiddingPlatform() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    {
      id: 1,
      name: 'البرمجة والتطوير',
      icon: Code,
      count: 3421,
      gradient: 'from-[#004225] to-[#006837]',
    },
    {
      id: 2,
      name: 'التصميم الإبداعي',
      icon: Palette,
      count: 2156,
      gradient: 'from-[#FFB000] to-[#FFCC4D]',
    },
    {
      id: 3,
      name: 'الكتابة والمحتوى',
      icon: FileText,
      count: 1834,
      gradient: 'from-[#004225] to-[#006837]',
    },
    {
      id: 4,
      name: 'التسويق الرقمي',
      icon: Megaphone,
      count: 2678,
      gradient: 'from-[#FFB000] to-[#FFCC4D]',
    },
    {
      id: 5,
      name: 'الفيديو والموشن',
      icon: Video,
      count: 1245,
      gradient: 'from-[#004225] to-[#006837]',
    },
    {
      id: 6,
      name: 'الاستشارات',
      icon: Briefcase,
      count: 1567,
      gradient: 'from-[#FFB000] to-[#FFCC4D]',
    },
  ];

  const competitions = [
    {
      id: 1,
      title: 'تطوير منصة تعليمية تفاعلية متكاملة بتقنيات الذكاء الاصطناعي',
      owner: 'وزارة التعليم',
      verified: true,
      rating: 4.95,
      reviews: 342,
      description:
        'نبحث عن فريق تطوير محترف لبناء منصة تعليمية متقدمة تستخدم الذكاء الاصطناعي لتخصيص تجربة التعلم، مع نظام إدارة محتوى شامل وتحليلات متقدمة للأداء.',
      budget: { min: 250000, max: 450000 },
      duration: '6-9 أشهر',
      bids: 47,
      avgBid: 340000,
      timeLeft: '4 أيام',
      category: 'البرمجة والتطوير',
      skills: ['React', 'Python', 'TensorFlow', 'AWS', 'PostgreSQL'],
      featured: true,
      urgent: true,
      views: 3247,
      publishedDate: 'منذ يومين',
    },
    {
      id: 2,
      title: 'تصميم هوية بصرية متكاملة لمشروع سياحي وطني كبير',
      owner: 'الهيئة العامة للسياحة',
      verified: true,
      rating: 4.88,
      reviews: 256,
      description:
        'مطلوب مصمم هوية بصرية محترف لإنشاء علامة تجارية شاملة لمشروع سياحي استراتيجي، تشمل الشعار، دليل الهوية، التطبيقات المختلفة، والمواد التسويقية.',
      budget: { min: 120000, max: 200000 },
      duration: '3-5 أشهر',
      bids: 89,
      avgBid: 155000,
      timeLeft: '6 أيام',
      category: 'التصميم الإبداعي',
      skills: ['Adobe Illustrator', 'Brand Identity', 'UI/UX', 'Print Design'],
      featured: true,
      urgent: false,
      views: 5124,
      publishedDate: 'منذ 3 أيام',
    },
    {
      id: 3,
      title: 'كتابة محتوى شامل لبوابة حكومية إلكترونية',
      owner: 'وزارة الاتصالات',
      verified: true,
      rating: 4.92,
      reviews: 189,
      description:
        'نحتاج فريق كتابة محتوى متخصص لإنتاج محتوى عالي الجودة للبوابة الحكومية الجديدة، يشمل صفحات الخدمات، الأدلة الإرشادية، الأسئلة الشائعة، والمحتوى التوعوي.',
      budget: { min: 80000, max: 140000 },
      duration: '4-6 أشهر',
      bids: 62,
      avgBid: 108000,
      timeLeft: '8 أيام',
      category: 'الكتابة والمحتوى',
      skills: ['Content Writing', 'SEO', 'Arabic', 'Government Communication'],
      featured: true,
      urgent: false,
      views: 2456,
      publishedDate: 'منذ 5 أيام',
    },
    {
      id: 4,
      title: 'حملة تسويق رقمي متكاملة لمنتج تقني جديد',
      owner: 'شركة التقنية المتقدمة',
      verified: true,
      rating: 4.85,
      reviews: 298,
      description:
        'مطلوب وكالة أو فريق تسويق رقمي محترف لإطلاق حملة تسويقية شاملة لمنتج تقني جديد، تشمل استراتيجية المحتوى، إدارة الإعلانات، والتحليلات.',
      budget: { min: 150000, max: 280000 },
      duration: '5-7 أشهر',
      bids: 71,
      avgBid: 210000,
      timeLeft: '3 أيام',
      category: 'التسويق الرقمي',
      skills: ['Digital Marketing', 'Google Ads', 'Social Media', 'Analytics', 'Content Strategy'],
      featured: false,
      urgent: true,
      views: 4567,
      publishedDate: 'منذ يوم واحد',
    },
    {
      id: 5,
      title: 'إنتاج سلسلة فيديوهات ترويجية احترافية بتقنية 4K',
      owner: 'مؤسسة الإنتاج الإعلامي',
      verified: true,
      rating: 4.9,
      reviews: 234,
      description:
        'نبحث عن شركة إنتاج فيديو متخصصة لإنتاج سلسلة من الفيديوهات الترويجية عالية الجودة بتقنية 4K، تشمل التصوير، المونتاج، الموشن جرافيكس، والتعليق الصوتي.',
      budget: { min: 180000, max: 320000 },
      duration: '4-6 أشهر',
      bids: 38,
      avgBid: 245000,
      timeLeft: '7 أيام',
      category: 'الفيديو والموشن',
      skills: [
        'Video Production',
        '4K Filming',
        'Motion Graphics',
        'After Effects',
        'Color Grading',
      ],
      featured: false,
      urgent: false,
      views: 2890,
      publishedDate: 'منذ 4 أيام',
    },
    {
      id: 6,
      title: 'استشارات تحول رقمي شاملة لمؤسسة كبرى',
      owner: 'المؤسسة الوطنية للتنمية',
      verified: true,
      rating: 4.93,
      reviews: 412,
      description:
        'مطلوب شركة استشارات متخصصة في التحول الرقمي لوضع استراتيجية شاملة وخطة تنفيذية للتحول الرقمي لمؤسسة حكومية كبرى، تشمل التقييم، التخطيط، والإشراف.',
      budget: { min: 300000, max: 550000 },
      duration: '8-12 شهر',
      bids: 29,
      avgBid: 420000,
      timeLeft: '10 أيام',
      category: 'الاستشارات',
      skills: [
        'Digital Transformation',
        'Strategy Consulting',
        'Change Management',
        'Technology Assessment',
      ],
      featured: true,
      urgent: false,
      views: 3678,
      publishedDate: 'منذ أسبوع',
    },
  ];

  const topProviders = [
    {
      id: 1,
      name: 'أحمد المطيري',
      title: 'خبير تطوير Full Stack',
      rating: 4.98,
      reviews: 456,
      completed: 789,
      successRate: 99,
      hourlyRate: 520,
      skills: ['React', 'Python', 'AWS'],
      verified: true,
      topRated: true,
      responseTime: '30 دقيقة',
      location: 'الرياض',
    },
    {
      id: 2,
      name: 'نورة السليمان',
      title: 'مصممة UI/UX متخصصة',
      rating: 5.0,
      reviews: 389,
      completed: 623,
      successRate: 100,
      hourlyRate: 450,
      skills: ['Figma', 'Adobe XD', 'Prototyping'],
      verified: true,
      topRated: true,
      responseTime: '15 دقيقة',
      location: 'جدة',
    },
    {
      id: 3,
      name: 'فهد العنزي',
      title: 'استشاري تسويق رقمي',
      rating: 4.95,
      reviews: 298,
      completed: 534,
      successRate: 98,
      hourlyRate: 420,
      skills: ['SEO', 'Google Ads', 'Analytics'],
      verified: true,
      topRated: true,
      responseTime: '45 دقيقة',
      location: 'الدمام',
    },
    {
      id: 4,
      name: 'سارة القحطاني',
      title: 'كاتبة محتوى محترفة',
      rating: 4.92,
      reviews: 267,
      completed: 712,
      successRate: 97,
      hourlyRate: 350,
      skills: ['Content', 'SEO', 'Copywriting'],
      verified: true,
      topRated: false,
      responseTime: '1 ساعة',
      location: 'الرياض',
    },
  ];

  const stats = [
    {
      label: 'مشروع نشط',
      value: '18,542',
      icon: Layers,
      change: '+24%',
      color: 'from-[#004225] to-[#006837]',
    },
    {
      label: 'محترف موثوق',
      value: '12,389',
      icon: Users,
      change: '+18%',
      color: 'from-[#FFB000] to-[#FFCC4D]',
    },
    {
      label: 'إجمالي المدفوعات',
      value: '342M',
      icon: DollarSign,
      change: '+41%',
      color: 'from-[#004225] to-[#006837]',
    },
    {
      label: 'معدل النجاح',
      value: '98.5%',
      icon: Award,
      change: '+2.3%',
      color: 'from-[#FFB000] to-[#FFCC4D]',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Ultra Modern */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b-2 border-[#FFCF9D] bg-white/95 shadow-lg backdrop-blur-lg'
            : 'border-b border-[#E0E0E0] bg-white'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo - Modern Design */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#004225] to-[#006837] shadow-xl">
                  <Target className="h-7 w-7 text-white" strokeWidth={2.5} />
                </div>
                <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-[#FFB000]"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#00200F]">منصة التنافس</h1>
                <p className="text-xs font-semibold text-[#4A4A4A]">للمشاريع الاحترافية</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden items-center gap-2 lg:flex">
              {['الرئيسية', 'المشاريع', 'المحترفون', 'الأقسام', 'المساعدة'].map((item, i) => (
                <button
                  key={i}
                  className="rounded-xl px-5 py-2.5 text-sm font-bold text-[#00200F] transition-all hover:bg-[#F5F5DC] hover:text-[#004225]"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button className="hidden items-center gap-2 rounded-xl border-2 border-transparent px-5 py-2.5 text-sm font-bold text-[#004225] transition-all hover:border-[#FFCF9D] hover:bg-[#F5F5DC] sm:flex">
                <User className="h-4 w-4" strokeWidth={2.5} />
                دخول
              </button>
              <button className="rounded-xl bg-gradient-to-r from-[#FFB000] to-[#CC8C00] px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:from-[#CC8C00] hover:to-[#996900]">
                انشر مشروعك
              </button>
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="rounded-xl p-2.5 transition-all hover:bg-[#F5F5DC] lg:hidden"
              >
                {showMobileMenu ? (
                  <X className="h-6 w-6 text-[#00200F]" />
                ) : (
                  <Menu className="h-6 w-6 text-[#00200F]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t-2 border-[#FFCF9D] bg-white lg:hidden"
            >
              <div className="space-y-2 px-4 py-4">
                {['الرئيسية', 'المشاريع', 'المحترفون', 'الأقسام', 'المساعدة'].map((item, i) => (
                  <button
                    key={i}
                    className="w-full rounded-xl px-4 py-3 text-right text-sm font-bold text-[#00200F] transition-all hover:bg-[#F5F5DC]"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section - Bold & Modern */}
      <section className="bg-gradient-to-br from-[#F5F5DC] via-white to-[#FFCF9D]/20 pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Status Badge */}
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border-2 border-[#FFB000] bg-white px-5 py-2 shadow-md">
                <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#006837]"></div>
                <span className="text-sm font-black text-[#00200F]">+3,421 مشروع نشط حالياً</span>
                <TrendingUp className="h-4 w-4 text-[#FFB000]" strokeWidth={3} />
              </div>

              <h1 className="mb-6 text-5xl leading-tight font-black text-[#00200F] lg:text-6xl xl:text-7xl">
                احصل على أفضل
                <br />
                <span className="bg-gradient-to-r from-[#004225] to-[#006837] bg-clip-text text-transparent">
                  العروض التنافسية
                </span>
              </h1>

              <p className="mb-10 text-xl leading-relaxed font-semibold text-[#4A4A4A] lg:text-2xl">
                انشر مشروعك واستقبل عروضاً من آلاف المحترفين الموثوقين في دقائق
              </p>

              {/* Enhanced Search */}
              <div className="relative mb-10">
                <div className="hover:shadow-3xl flex items-stretch overflow-hidden rounded-2xl border-2 border-[#FFCF9D] bg-white shadow-2xl transition-all">
                  <div className="flex flex-1 items-center gap-4 px-6 py-5">
                    <Search className="h-6 w-6 text-[#004225]" strokeWidth={2.5} />
                    <input
                      type="text"
                      placeholder="ابحث عن مشاريع، مهارات، أو خدمات متخصصة..."
                      className="w-full bg-transparent text-lg font-semibold text-[#00200F] placeholder-[#757575] outline-none"
                    />
                  </div>
                  <button className="bg-gradient-to-r from-[#004225] to-[#006837] px-10 py-5 text-lg font-black text-white transition-all hover:from-[#003119] hover:to-[#004225]">
                    بحث
                  </button>
                </div>

                {/* Trending Tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="flex items-center gap-1 text-sm font-bold text-[#4A4A4A]">
                    <Sparkles className="h-4 w-4 text-[#FFB000]" />
                    رائج:
                  </span>
                  {['تطوير تطبيقات', 'تصميم UI/UX', 'كتابة تقنية', 'تسويق SEO'].map((tag, i) => (
                    <button
                      key={i}
                      className="rounded-xl border-2 border-[#FFCF9D] bg-white px-4 py-2 text-sm font-bold text-[#004225] shadow-sm transition-all hover:border-[#FFB000] hover:bg-[#FFCF9D]"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#004225] to-[#006837] shadow-lg">
                    <Shield className="h-5 w-5 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-[#00200F]">دفع آمن 100%</p>
                    <p className="text-xs font-semibold text-[#757575]">محمي بالكامل</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFB000] to-[#CC8C00] shadow-lg">
                    <CheckCircle className="h-5 w-5 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-[#00200F]">ضمان الجودة</p>
                    <p className="text-xs font-semibold text-[#757575]">مراجعة دقيقة</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Featured Card */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                {/* Decorative Elements */}
                <div className="absolute -top-8 -right-8 h-32 w-32 rounded-3xl bg-gradient-to-br from-[#FFB000] to-[#FFCC4D] opacity-20 blur-2xl"></div>
                <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-3xl bg-gradient-to-br from-[#004225] to-[#006837] opacity-15 blur-2xl"></div>

                <div className="relative rounded-3xl border-2 border-[#FFCF9D] bg-white p-8 shadow-2xl">
                  <div className="mb-8 flex items-center justify-between border-b-2 border-[#F5F5DC] pb-6">
                    <div>
                      <h3 className="mb-2 text-2xl font-black text-[#00200F]">مشروع مميز</h3>
                      <p className="flex items-center gap-2 text-sm font-semibold text-[#757575]">
                        <Clock className="h-4 w-4" />
                        نُشر منذ ساعتين
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <div className="rounded-xl bg-gradient-to-r from-[#004225] to-[#006837] px-4 py-2 text-xs font-black text-white shadow-lg">
                        جديد
                      </div>
                      <div className="flex items-center gap-1 rounded-xl bg-gradient-to-r from-[#FFB000] to-[#CC8C00] px-4 py-2 text-xs font-black text-white shadow-lg">
                        <Zap className="h-3 w-3" fill="white" strokeWidth={2} />
                        عاجل
                      </div>
                    </div>
                  </div>

                  <h4 className="mb-4 text-2xl leading-tight font-black text-[#00200F]">
                    تطوير منصة SaaS متقدمة
                  </h4>

                  <p className="mb-6 leading-relaxed font-semibold text-[#4A4A4A]">
                    نبحث عن فريق تطوير محترف لبناء منصة SaaS شاملة بأحدث التقنيات...
                  </p>

                  <div className="mb-6 grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border-2 border-[#FFCF9D] bg-gradient-to-br from-[#F5F5DC] to-[#FFCF9D]/30 p-5">
                      <p className="mb-2 text-sm font-bold text-[#4A4A4A]">الميزانية</p>
                      <p className="text-3xl font-black text-[#004225]">180K</p>
                      <p className="text-xs font-semibold text-[#757575]">ريال سعودي</p>
                    </div>
                    <div className="rounded-2xl border-2 border-[#FFCF9D] bg-gradient-to-br from-[#F5F5DC] to-[#FFCF9D]/30 p-5">
                      <p className="mb-2 text-sm font-bold text-[#4A4A4A]">العروض</p>
                      <p className="text-3xl font-black text-[#FFB000]">47</p>
                      <p className="text-xs font-semibold text-[#757575]">عرض مقدم</p>
                    </div>
                  </div>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {['React', 'Node.js', 'AWS'].map((skill, i) => (
                      <span
                        key={i}
                        className="rounded-xl border-2 border-[#004225] bg-white px-4 py-2 text-sm font-black text-[#004225]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#004225] to-[#006837] py-4 font-black text-white shadow-xl transition-all hover:from-[#003119] hover:to-[#004225]">
                    <span>عرض التفاصيل الكاملة</span>
                    <ArrowRight className="h-5 w-5" strokeWidth={3} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats - Modern Cards */}
      <section className="border-y-2 border-[#FFCF9D] bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="rounded-2xl border-2 border-[#FFCF9D] bg-gradient-to-br from-white to-[#F5F5DC] p-6 transition-all hover:border-[#FFB000] hover:shadow-2xl">
                  <div className="mb-4 flex items-center justify-between">
                    <div
                      className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                    >
                      <stat.icon className="h-7 w-7 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="flex items-center gap-1 rounded-lg bg-[#E8F5E9] px-3 py-1.5 text-xs font-black text-[#004225]">
                      <TrendingUp className="h-3 w-3" />
                      {stat.change}
                    </div>
                  </div>
                  <p className="mb-2 text-4xl font-black text-[#00200F]">{stat.value}</p>
                  <p className="text-sm font-bold text-[#4A4A4A]">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories - Creative Grid */}
      <section className="bg-gradient-to-b from-white to-[#F5F5DC] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-[#FFB000] bg-white px-6 py-3 shadow-lg">
              <Layers className="h-5 w-5 text-[#004225]" strokeWidth={2.5} />
              <span className="text-sm font-black text-[#00200F]">التصنيفات الرئيسية</span>
            </div>
            <h2 className="mb-6 text-5xl font-black text-[#00200F]">استكشف المجالات</h2>
            <p className="mx-auto max-w-2xl text-xl font-semibold text-[#4A4A4A]">
              آلاف المشاريع المتنوعة في مختلف التخصصات تنتظرك
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ scale: 1.03, y: -8 }}
                onClick={() => setSelectedCategory(cat.id)}
                className="group cursor-pointer"
              >
                <div
                  className={`relative overflow-hidden rounded-3xl border-2 bg-white p-8 transition-all ${
                    selectedCategory === cat.id
                      ? 'border-[#004225] shadow-2xl'
                      : 'border-[#FFCF9D] hover:border-[#FFB000] hover:shadow-xl'
                  }`}
                >
                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 transition-opacity group-hover:opacity-5`}
                  ></div>

                  <div className="relative">
                    <div className="mb-6 flex items-center justify-between">
                      <div
                        className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center shadow-xl transition-transform group-hover:scale-110`}
                      >
                        <cat.icon className="h-8 w-8 text-white" strokeWidth={2.5} />
                      </div>
                      <ArrowRight
                        className="h-6 w-6 text-[#FFCF9D] transition-all group-hover:translate-x-1 group-hover:text-[#FFB000]"
                        strokeWidth={3}
                      />
                    </div>

                    <h3 className="mb-4 text-xl font-black text-[#00200F]">{cat.name}</h3>

                    <div className="flex items-baseline gap-2">
                      <p className="text-4xl font-black text-[#004225]">
                        {cat.count.toLocaleString()}
                      </p>
                      <p className="text-sm font-bold text-[#757575]">مشروع متاح</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitions - Enhanced Cards */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-[#FFCF9D] bg-[#F5F5DC] px-6 py-3">
                <Target className="h-5 w-5 text-[#FFB000]" strokeWidth={2.5} />
                <span className="text-sm font-black text-[#00200F]">المنافسات المميزة</span>
              </div>
              <h2 className="mb-4 text-5xl font-black text-[#00200F]">أحدث المشاريع</h2>
              <p className="text-xl font-semibold text-[#4A4A4A]">
                اختر المشروع المناسب وقدم عرضك المتميز
              </p>
            </div>

            {/* Filters */}
            <div className="flex gap-3">
              {[
                { id: 'all', label: 'الكل', icon: Layers },
                { id: 'featured', label: 'مميز', icon: Star },
                { id: 'urgent', label: 'عاجل', icon: Zap },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-black shadow-md transition-all ${
                    activeFilter === filter.id
                      ? 'scale-105 bg-gradient-to-r from-[#004225] to-[#006837] text-white'
                      : 'border-2 border-[#FFCF9D] bg-white text-[#00200F] hover:border-[#FFB000]'
                  }`}
                >
                  <filter.icon className="h-5 w-5" strokeWidth={2.5} />
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {competitions.map((comp, index) => (
              <motion.div
                key={comp.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="group"
              >
                <div className="rounded-3xl border-2 border-[#FFCF9D] bg-gradient-to-br from-white to-[#F5F5DC]/30 p-8 transition-all hover:border-[#004225] hover:shadow-2xl lg:p-10">
                  <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-start">
                    {/* Left Info */}
                    <div className="flex-1">
                      <div className="mb-6 flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#004225] to-[#006837] shadow-lg">
                          <Briefcase className="h-6 w-6 text-white" strokeWidth={2.5} />
                        </div>
                        <div className="flex-1">
                          <div className="mb-1 flex items-center gap-2">
                            <h4 className="text-lg font-black text-[#00200F]">{comp.owner}</h4>
                            {comp.verified && (
                              <BadgeCheck className="h-5 w-5 text-[#004225]" fill="#004225" />
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-[#FFB000] text-[#FFB000]" />
                              <span className="font-black text-[#00200F]">{comp.rating}</span>
                            </div>
                            <span className="font-semibold text-[#757575]">
                              ({comp.reviews} تقييم)
                            </span>
                            <span className="font-semibold text-[#757575]">•</span>
                            <span className="font-semibold text-[#757575]">
                              {comp.publishedDate}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          {comp.featured && (
                            <div className="rounded-xl bg-gradient-to-r from-[#004225] to-[#006837] px-4 py-2 text-xs font-black text-white shadow-lg">
                              مميز
                            </div>
                          )}
                          {comp.urgent && (
                            <div className="flex items-center gap-1 rounded-xl bg-gradient-to-r from-[#FFB000] to-[#CC8C00] px-4 py-2 text-xs font-black text-white shadow-lg">
                              <Zap className="h-4 w-4" fill="white" strokeWidth={2} />
                              عاجل
                            </div>
                          )}
                        </div>
                      </div>

                      <h3 className="mb-4 text-2xl leading-tight font-black text-[#00200F] transition-colors group-hover:text-[#004225] lg:text-3xl">
                        {comp.title}
                      </h3>

                      <p className="mb-6 text-lg leading-relaxed font-semibold text-[#4A4A4A]">
                        {comp.description}
                      </p>

                      <div className="mb-6 flex flex-wrap gap-2">
                        {comp.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="rounded-xl border-2 border-[#FFCF9D] bg-white px-4 py-2 text-sm font-black text-[#004225] transition-all hover:border-[#FFB000] hover:bg-[#FFCF9D]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-6 text-sm">
                        <div className="flex items-center gap-2 font-bold text-[#4A4A4A]">
                          <Clock className="h-5 w-5 text-[#004225]" strokeWidth={2.5} />
                          <span>{comp.duration}</span>
                        </div>
                        <div className="h-5 w-px bg-[#E0E0E0]"></div>
                        <div className="flex items-center gap-2 font-bold text-[#4A4A4A]">
                          <Users className="h-5 w-5 text-[#004225]" strokeWidth={2.5} />
                          <span>{comp.bids} عرض</span>
                        </div>
                        <div className="h-5 w-px bg-[#E0E0E0]"></div>
                        <div className="flex items-center gap-2 font-bold text-[#4A4A4A]">
                          <Eye className="h-5 w-5 text-[#004225]" strokeWidth={2.5} />
                          <span>{comp.views.toLocaleString()} مشاهدة</span>
                        </div>
                        <div className="h-5 w-px bg-[#E0E0E0]"></div>
                        <div className="flex items-center gap-2 font-black text-[#C62828]">
                          <Clock className="h-5 w-5" strokeWidth={2.5} />
                          <span>متبقي {comp.timeLeft}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Info */}
                    <div className="flex flex-col items-start gap-6 lg:min-w-64 lg:items-end">
                      <div className="w-full text-left lg:text-right">
                        <p className="mb-2 text-sm font-bold text-[#757575]">الميزانية المقترحة</p>
                        <p className="mb-1 text-4xl font-black text-[#00200F]">
                          {comp.budget.min.toLocaleString()}-{comp.budget.max.toLocaleString()}
                        </p>
                        <p className="text-sm font-semibold text-[#757575]">ريال سعودي</p>
                      </div>

                      <div className="w-full text-left lg:text-right">
                        <p className="mb-2 text-sm font-bold text-[#757575]">
                          متوسط العروض المقدمة
                        </p>
                        <p className="mb-1 text-3xl font-black text-[#FFB000]">
                          {comp.avgBid.toLocaleString()}
                        </p>
                        <p className="text-xs font-semibold text-[#757575]">ريال سعودي</p>
                      </div>

                      <button className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#FFB000] to-[#CC8C00] px-8 py-4 font-black text-white shadow-xl transition-all hover:from-[#CC8C00] hover:to-[#996900]">
                        <span className="text-lg">قدّم عرضك الآن</span>
                        <ArrowRight
                          className="h-6 w-6 transition-transform group-hover:translate-x-1"
                          strokeWidth={3}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button className="rounded-2xl border-2 border-[#004225] px-10 py-4 text-lg font-black text-[#004225] shadow-lg transition-all hover:bg-[#004225] hover:text-white">
              عرض جميع المشاريع المتاحة
            </button>
          </div>
        </div>
      </section>

      {/* Top Providers - Premium Cards */}
      <section className="bg-gradient-to-b from-[#F5F5DC] to-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-[#FFB000] bg-white px-6 py-3 shadow-lg">
              <Award className="h-5 w-5 text-[#004225]" strokeWidth={2.5} />
              <span className="text-sm font-black text-[#00200F]">المحترفون المميزون</span>
            </div>
            <h2 className="mb-6 text-5xl font-black text-[#00200F]">أفضل المحترفين</h2>
            <p className="mx-auto max-w-2xl text-xl font-semibold text-[#4A4A4A]">
              تواصل مع نخبة المحترفين ذوي الخبرة الواسعة والتقييمات العالية
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {topProviders.map((provider, index) => (
              <motion.div
                key={provider.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <div className="overflow-hidden rounded-3xl border-2 border-[#FFCF9D] bg-white transition-all hover:border-[#004225] hover:shadow-2xl">
                  {/* Header with Gradient */}
                  <div
                    className={`h-32 bg-gradient-to-br ${
                      provider.topRated
                        ? 'from-[#FFB000] to-[#CC8C00]'
                        : 'from-[#004225] to-[#006837]'
                    } relative`}
                  >
                    {provider.topRated && (
                      <div className="absolute top-4 right-4 rounded-xl bg-white/95 px-4 py-2 shadow-lg backdrop-blur-sm">
                        <span className="flex items-center gap-1 text-xs font-black text-[#FFB000]">
                          <Star className="h-3 w-3 fill-[#FFB000]" />
                          Top Rated
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="px-6 pb-6">
                    {/* Avatar */}
                    <div className="relative -mt-16 mb-6">
                      <div
                        className={`mx-auto h-32 w-32 rounded-3xl border-4 border-white bg-gradient-to-br shadow-2xl ${
                          provider.topRated
                            ? 'from-[#FFB000] to-[#CC8C00]'
                            : 'from-[#004225] to-[#006837]'
                        } flex items-center justify-center transition-transform group-hover:scale-110`}
                      >
                        <span className="text-5xl font-black text-white">
                          {provider.name.charAt(0)}
                        </span>
                      </div>
                      {provider.verified && (
                        <div className="absolute bottom-0 left-1/2 flex h-8 w-8 -translate-x-1/2 transform items-center justify-center rounded-full border-4 border-white bg-[#004225] shadow-lg">
                          <CheckCircle className="h-5 w-5 text-white" strokeWidth={3} />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="mb-6 text-center">
                      <h3 className="mb-2 text-xl font-black text-[#00200F]">{provider.name}</h3>
                      <p className="mb-3 text-sm font-bold text-[#4A4A4A]">{provider.title}</p>
                      <div className="mb-2 flex items-center justify-center gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-5 w-5 fill-[#FFB000] text-[#FFB000]" />
                          <span className="text-lg font-black text-[#00200F]">
                            {provider.rating}
                          </span>
                        </div>
                        <span className="font-semibold text-[#757575]">({provider.reviews})</span>
                      </div>
                      <p className="flex items-center justify-center gap-1 text-xs font-semibold text-[#757575]">
                        <MapPin className="h-3 w-3" />
                        {provider.location}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="mb-6 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl border-2 border-[#FFCF9D] bg-gradient-to-br from-[#F5F5DC] to-[#FFCF9D]/30 p-4 text-center">
                        <p className="text-2xl font-black text-[#004225]">{provider.completed}</p>
                        <p className="text-xs font-bold text-[#4A4A4A]">مشروع</p>
                      </div>
                      <div className="rounded-2xl border-2 border-[#FFCF9D] bg-gradient-to-br from-[#F5F5DC] to-[#FFCF9D]/30 p-4 text-center">
                        <p className="text-2xl font-black text-[#FFB000]">{provider.hourlyRate}</p>
                        <p className="text-xs font-bold text-[#4A4A4A]">ر.س/ساعة</p>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-6 flex flex-wrap justify-center gap-2">
                      {provider.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="rounded-lg border-2 border-[#004225] bg-white px-3 py-1.5 text-xs font-black text-[#004225]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <button className="w-full rounded-2xl bg-gradient-to-r from-[#004225] to-[#006837] py-3 text-sm font-black text-white shadow-lg transition-all hover:from-[#003119] hover:to-[#004225]">
                      عرض الملف الشخصي
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#004225] via-[#006837] to-[#004225] py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>

        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 flex h-24 w-24 items-center justify-center rounded-3xl bg-white/10 shadow-2xl backdrop-blur-sm">
            <Rocket className="h-12 w-12 text-white" strokeWidth={2.5} />
          </div>

          <h2 className="mb-8 text-5xl leading-tight font-black text-white lg:text-6xl">
            ابدأ مشروعك التالي اليوم
          </h2>
          <p className="mx-auto mb-14 max-w-3xl text-2xl leading-relaxed font-semibold text-white/90">
            انضم إلى آلاف الشركات والمحترفين الذين يحققون أهدافهم عبر منصتنا
          </p>

          <div className="mb-16 flex flex-col justify-center gap-6 sm:flex-row">
            <button className="rounded-2xl bg-white px-12 py-5 text-lg font-black text-[#004225] shadow-2xl transition-all hover:bg-[#FFCF9D]">
              انشر مشروعك مجاناً
            </button>
            <button className="rounded-2xl bg-gradient-to-r from-[#FFB000] to-[#CC8C00] px-12 py-5 text-lg font-black text-white shadow-2xl transition-all hover:from-[#CC8C00] hover:to-[#996900]">
              ابدأ كمحترف
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-12 border-t-2 border-white/20 pt-16">
            {[
              { icon: Shield, label: 'دفع آمن ومحمي' },
              { icon: CheckCircle, label: 'ضمان الجودة' },
              { icon: Users, label: 'دعم فني 24/7' },
              { icon: Award, label: 'خدمة احترافية' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                  <item.icon className="h-6 w-6 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-lg font-black text-white">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-[#FFCF9D] bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#004225] to-[#006837] shadow-xl">
                  <Target className="h-7 w-7 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#00200F]">منصة التنافس</h3>
                  <p className="text-xs font-semibold text-[#757575]">للمشاريع الاحترافية</p>
                </div>
              </div>
              <p className="mb-6 leading-relaxed font-semibold text-[#4A4A4A]">
                نربط أفضل المواهب بأهم الفرص في المنطقة العربية لبناء مستقبل رقمي مزدهر
              </p>
            </div>

            {/* Links Columns */}
            {[
              { title: 'الشركة', links: ['من نحن', 'المدونة', 'الوظائف', 'الأخبار'] },
              { title: 'الخدمات', links: ['للشركات', 'للمحترفين', 'الباقات', 'API'] },
              { title: 'الدعم', links: ['المساعدة', 'تواصل معنا', 'الشروط', 'الخصوصية'] },
            ].map((column, i) => (
              <div key={i}>
                <h4 className="mb-6 text-sm font-black tracking-wide text-[#00200F] uppercase">
                  {column.title}
                </h4>
                <ul className="space-y-4">
                  {column.links.map((link, j) => (
                    <li key={j}>
                      <a
                        href="#"
                        className="text-sm font-semibold text-[#4A4A4A] transition-colors hover:text-[#004225]"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="flex flex-col items-center justify-between gap-6 border-t-2 border-[#F5F5DC] pt-10 md:flex-row">
            <p className="text-sm font-semibold text-[#4A4A4A]">
              © 2025 منصة التنافس. جميع الحقوق محفوظة.
            </p>
            <div className="flex gap-6">
              {['الخصوصية', 'الشروط', 'ملفات تعريف الارتباط'].map((link, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-sm font-semibold text-[#4A4A4A] transition-colors hover:text-[#004225]"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ModernBiddingPlatform;
