'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  BarChart3,
  Camera,
  Check,
  CheckCircle,
  ChevronRight,
  Clock,
  Code,
  Edit,
  Facebook,
  FileText,
  Fingerprint,
  Headphones,
  Instagram,
  Layers,
  Linkedin,
  Megaphone,
  Menu,
  Music,
  Palette,
  Play,
  Rocket,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Twitter,
  Users,
  Workflow,
  X,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';

function ModernFreelanceHub() {
  const [scrollY, setScrollY] = useState(0);
  const [activeService, setActiveService] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('الكل');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroServices = [
    {
      icon: <Code className="h-6 w-6" />,
      title: 'البرمجة والتطوير',
      count: '18,540',
      growth: '+45%',
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: 'التصميم الإبداعي',
      count: '14,230',
      growth: '+38%',
    },
    {
      icon: <Megaphone className="h-6 w-6" />,
      title: 'التسويق الرقمي',
      count: '11,890',
      growth: '+52%',
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: 'المحتوى والكتابة',
      count: '9,450',
      growth: '+41%',
    },
  ];

  const topProjects = [
    {
      title: 'تطوير تطبيق موبايل لخدمات التوصيل',
      category: 'تطوير تطبيقات',
      budget: '95,000',
      currency: 'ريال',
      duration: '5 أشهر',
      proposals: 42,
      timeLeft: '4 أيام',
      skills: ['Flutter', 'Firebase', 'Maps API', 'Payment'],
      client: {
        name: 'شركة الابتكار اللوجستي',
        avatar: '🏢',
        verified: true,
        rating: 4.9,
      },
      urgency: 'high',
      featured: true,
    },
    {
      title: 'إعادة تصميم موقع شركة عقارية',
      category: 'تصميم UI/UX',
      budget: '48,000',
      currency: 'ريال',
      duration: '3 أشهر',
      proposals: 28,
      timeLeft: '6 أيام',
      skills: ['Figma', 'UI/UX', 'React', 'Responsive'],
      client: {
        name: 'مجموعة العقار المتطور',
        avatar: '🏠',
        verified: true,
        rating: 5.0,
      },
      urgency: 'medium',
      featured: true,
    },
    {
      title: 'حملة إعلانية متكاملة على السوشيال ميديا',
      category: 'تسويق رقمي',
      budget: '72,000',
      currency: 'ريال',
      duration: '4 أشهر',
      proposals: 56,
      timeLeft: '2 أيام',
      skills: ['Instagram', 'TikTok', 'Meta Ads', 'Analytics'],
      client: {
        name: 'براند ستوديو',
        avatar: '🎨',
        verified: true,
        rating: 4.8,
      },
      urgency: 'high',
      featured: true,
    },
  ];

  const categories = [
    {
      icon: <Code className="h-8 w-8" />,
      title: 'البرمجة والتطوير',
      description: 'تطبيقات ويب وموبايل احترافية',
      projects: '18,540',
      freelancers: '4,230',
      avgBudget: '75,000 ريال',
      tags: ['React', 'Node.js', 'Flutter', 'Python'],
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: 'التصميم والجرافيك',
      description: 'تصاميم إبداعية وهوية بصرية',
      projects: '14,230',
      freelancers: '3,120',
      avgBudget: '42,000 ريال',
      tags: ['Photoshop', 'Illustrator', 'Figma', 'Branding'],
    },
    {
      icon: <Megaphone className="h-8 w-8" />,
      title: 'التسويق الرقمي',
      description: 'استراتيجيات تسويقية فعالة',
      projects: '11,890',
      freelancers: '2,450',
      avgBudget: '55,000 ريال',
      tags: ['SEO', 'Social Media', 'Google Ads', 'Analytics'],
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: 'الكتابة والترجمة',
      description: 'محتوى احترافي بلغة متقنة',
      projects: '9,450',
      freelancers: '2,890',
      avgBudget: '28,000 ريال',
      tags: ['Content Writing', 'SEO', 'Translation', 'Copywriting'],
    },
    {
      icon: <Camera className="h-8 w-8" />,
      title: 'التصوير والفيديو',
      description: 'إنتاج مرئي بجودة سينمائية',
      projects: '7,820',
      freelancers: '1,680',
      avgBudget: '38,000 ريال',
      tags: ['Photography', 'Video Editing', 'Motion Graphics', '4K'],
    },
    {
      icon: <Music className="h-8 w-8" />,
      title: 'الصوتيات والموسيقى',
      description: 'تسجيلات وموسيقى أصلية',
      projects: '5,340',
      freelancers: '1,120',
      avgBudget: '32,000 ريال',
      tags: ['Voice Over', 'Audio Editing', 'Music Production', 'Sound Design'],
    },
  ];

  const platformFeatures = [
    {
      icon: <Shield className="h-10 w-10" />,
      title: 'حماية مالية شاملة',
      description: 'نظام دفع آمن 100% مع ضمان استرجاع الأموال وحماية كاملة لحقوق الطرفين',
      metric: '100% آمن',
      color: 'from-[#27374D] to-[#526D82]',
    },
    {
      icon: <Fingerprint className="h-10 w-10" />,
      title: 'محترفون موثوقون',
      description: 'فحص دقيق لكل محترف مع تقييمات موثقة وسجل أعمال كامل ومراجع قوية',
      metric: '24,000+ خبير',
      color: 'from-[#526D82] to-[#9DB2BF]',
    },
    {
      icon: <Zap className="h-10 w-10" />,
      title: 'سرعة في الإنجاز',
      description: 'ابدأ مشروعك واحصل على عروض من محترفين في دقائق واختر الأنسب لك',
      metric: 'استجابة فورية',
      color: 'from-[#27374D] to-[#526D82]',
    },
    {
      icon: <Award className="h-10 w-10" />,
      title: 'جودة مضمونة',
      description: 'معايير صارمة للجودة مع مراجعة مستمرة وتقييم دقيق لكل مشروع مكتمل',
      metric: '99.4% رضا',
      color: 'from-[#526D82] to-[#9DB2BF]',
    },
    {
      icon: <Headphones className="h-10 w-10" />,
      title: 'دعم متواصل 24/7',
      description: 'فريق دعم احترافي متاح دائماً لمساعدتك وحل أي مشكلة قد تواجهها',
      metric: 'متاح دائماً',
      color: 'from-[#27374D] to-[#526D82]',
    },
    {
      icon: <BarChart3 className="h-10 w-10" />,
      title: 'تحليلات ذكية',
      description: 'أدوات تحليل متقدمة لقياس الأداء وتتبع التقدم وتحقيق أهدافك بكفاءة',
      metric: 'رؤى عميقة',
      color: 'from-[#526D82] to-[#9DB2BF]',
    },
  ];

  const testimonials = [
    {
      name: 'م. عبدالله الشمري',
      position: 'المدير التنفيذي',
      company: 'مجموعة التقنية المتقدمة',
      avatar: '👨‍💼',
      rating: 5,
      image: '🏢',
      quote:
        'منصة استثنائية غيرت طريقة عملنا بالكامل. وجدنا أفضل المطورين لمشروع بقيمة 380 ألف ريال وتم إنجازه بجودة تفوق التوقعات في الوقت المحدد.',
      project: 'نظام إدارة متكامل',
      value: '380,000 ريال',
      duration: '7 أشهر',
      results: ['زيادة الإنتاجية 285%', 'توفير 58% من التكاليف', 'تحسين الكفاءة 190%'],
    },
    {
      name: 'أ. نورة العتيبي',
      position: 'مديرة التسويق',
      company: 'شركة الإبداع الرقمي',
      avatar: '👩‍💼',
      rating: 5,
      image: '🎯',
      quote:
        'تجربة رائعة مع محترفين على أعلى مستوى. حملتنا التسويقية حققت نتائج مذهلة وتجاوزت أهدافنا بنسبة 340%. استثمار يستحق كل ريال.',
      project: 'حملة تسويقية شاملة',
      value: '245,000 ريال',
      duration: '5 أشهر',
      results: ['نمو المبيعات 340%', 'وصول 3.2M مستخدم', 'معدل تحويل 420%'],
    },
    {
      name: 'م. خالد المالكي',
      position: 'مؤسس ومدير',
      company: 'تك سوليوشنز',
      avatar: '🚀',
      rating: 5,
      image: '💼',
      quote:
        'أفضل منصة عربية للعمل الحر بلا منازع. التعامل احترافي، الأسعار منافسة، والنتائج تتحدث عن نفسها. أنجزنا 23 مشروعاً بنجاح باهر.',
      project: 'تطوير منصة تعليمية',
      value: '520,000 ريال',
      duration: '10 أشهر',
      results: ['100K+ مستخدم نشط', 'معدل رضا 98%', 'عائد استثمار 580%'],
    },
  ];

  const stats = [
    {
      number: '214K+',
      label: 'مشروع مكتمل',
      icon: <CheckCircle className="h-8 w-8" />,
      change: '+48%',
      description: 'بنجاح تام',
    },
    {
      number: '96K+',
      label: 'عميل راضٍ',
      icon: <Users className="h-8 w-8" />,
      change: '+42%',
      description: 'يثقون بنا',
    },
    {
      number: '38K+',
      label: 'محترف معتمد',
      icon: <Award className="h-8 w-8" />,
      change: '+56%',
      description: 'في كل المجالات',
    },
    {
      number: '99.4%',
      label: 'معدل النجاح',
      icon: <TrendingUp className="h-8 w-8" />,
      change: '+7%',
      description: 'في المشاريع',
    },
  ];

  const workProcess = [
    {
      step: '01',
      title: 'أنشئ حسابك',
      description: 'سجل مجاناً في دقيقة واحدة وابدأ رحلتك مع آلاف المحترفين',
      icon: <Edit className="h-8 w-8" />,
      color: 'from-[#27374D] to-[#526D82]',
    },
    {
      step: '02',
      title: 'انشر مشروعك',
      description: 'اكتب تفاصيل مشروعك بوضوح وحدد الميزانية والمدة الزمنية',
      icon: <FileText className="h-8 w-8" />,
      color: 'from-[#526D82] to-[#9DB2BF]',
    },
    {
      step: '03',
      title: 'اختر المحترف',
      description: 'قارن العروض والملفات واختر الأنسب لمشروعك من بين محترفين موثوقين',
      icon: <Users className="h-8 w-8" />,
      color: 'from-[#27374D] to-[#526D82]',
    },
    {
      step: '04',
      title: 'استلم العمل',
      description: 'تابع التقدم خطوة بخطوة واستلم مشروعك المكتمل بأعلى جودة',
      icon: <CheckCircle className="h-8 w-8" />,
      color: 'from-[#526D82] to-[#9DB2BF]',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % heroServices.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#DDE6ED]" dir="rtl">
      <div className="pointer-events-none fixed inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #526D82 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        ></div>
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrollY > 50
            ? 'border-b border-[#9DB2BF]/20 bg-white/95 shadow-lg backdrop-blur-xl'
            : 'bg-white/90 backdrop-blur-md'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <motion.div whileHover={{ scale: 1.05, rotate: 5 }} className="group relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#27374D] to-[#526D82] opacity-50 blur-lg transition-all group-hover:blur-xl"></div>
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#27374D] to-[#526D82] shadow-xl">
                  <Workflow className="h-7 w-7 text-white" />
                </div>
              </motion.div>
              <div>
                <h1 className="text-2xl font-black text-[#27374D]">
                  فري<span className="text-[#526D82]">هَب</span>
                </h1>
                <p className="text-xs font-bold text-[#526D82]">مركز المواهب والمشاريع</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-8 lg:flex">
              {['الرئيسية', 'المشاريع', 'المحترفون', 'الخدمات', 'كيف نعمل'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="group relative text-sm font-bold text-[#27374D] transition-colors hover:text-[#526D82]"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-[#27374D] to-[#526D82] transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button className="hidden rounded-xl px-6 py-2.5 font-bold text-[#27374D] transition-all hover:bg-[#DDE6ED] lg:block">
                تسجيل الدخول
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-xl bg-gradient-to-r from-[#27374D] to-[#526D82] px-6 py-2.5 font-bold text-white shadow-lg transition-all hover:shadow-xl"
              >
                ابدأ الآن
              </motion.button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="rounded-xl p-2.5 text-[#27374D] hover:bg-[#DDE6ED] lg:hidden"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-32 pb-24 lg:px-8">
        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 h-72 w-72 rounded-full bg-[#526D82]/10 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 h-96 w-96 rounded-full bg-[#9DB2BF]/10 blur-3xl"></div>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#9DB2BF]/30 bg-white/80 px-5 py-3 shadow-lg backdrop-blur-sm"
              >
                <div className="flex -space-x-2">
                  {['👨‍💻', '👩‍🎨', '👨‍💼'].map((emoji, i) => (
                    <div
                      key={i}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-[#27374D] to-[#526D82] shadow-md"
                    >
                      <span className="text-sm">{emoji}</span>
                    </div>
                  ))}
                </div>
                <span className="text-sm font-bold text-[#27374D]">انضم لـ 96,000+ عميل نشط</span>
                <div className="h-2 w-2 animate-pulse rounded-full bg-[#526D82]"></div>
              </motion.div>

              {/* Main Heading */}
              <h1 className="mb-6 text-6xl leading-tight font-black lg:text-7xl">
                <span className="text-[#27374D]">مشاريعك</span>
                <br />
                <span className="text-[#526D82]">بأيدي</span>
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#27374D]">المحترفين</span>
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="absolute bottom-2 left-0 -z-0 h-3 bg-[#9DB2BF]"
                  ></motion.span>
                </span>
              </h1>

              <p className="mb-10 max-w-xl text-xl leading-relaxed text-[#526D82]">
                منصتك الشاملة للوصول إلى{' '}
                <span className="font-black text-[#27374D]">38,000+ محترف</span> معتمد في كافة
                المجالات
                <span className="mt-3 block font-bold text-[#27374D]">سرعة • جودة • موثوقية</span>
              </p>

              {/* CTA Buttons */}
              <div className="mb-12 flex flex-col gap-4 sm:flex-row">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#27374D] to-[#526D82] px-8 py-4 font-bold text-white shadow-xl transition-all hover:shadow-2xl"
                >
                  <span>انشر مشروعك الآن</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-3 rounded-xl border-2 border-[#9DB2BF]/40 bg-white px-8 py-4 font-bold text-[#27374D] shadow-md transition-all hover:border-[#526D82]"
                >
                  <Play className="h-5 w-5" />
                  <span>شاهد العرض</span>
                </motion.button>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-10">
                <div>
                  <div className="mb-2 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-[#526D82] text-[#526D82]" />
                    ))}
                  </div>
                  <p className="text-[#526D82]">
                    <span className="text-2xl font-black text-[#27374D]">4.9</span> من 5.0
                  </p>
                  <p className="text-sm text-[#9DB2BF]">من 42,380 تقييم</p>
                </div>
                <div className="h-16 w-px bg-[#9DB2BF]/40"></div>
                <div>
                  <p className="mb-1 text-3xl font-black text-[#27374D]">99.4%</p>
                  <p className="font-bold text-[#526D82]">معدل النجاح</p>
                  <p className="text-sm text-[#9DB2BF]">في تسليم المشاريع</p>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Animated Services */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Main Card */}
              <div className="relative rounded-3xl border border-[#9DB2BF]/20 bg-white/90 p-8 shadow-2xl backdrop-blur-md">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <h3 className="mb-1 text-2xl font-black text-[#27374D]">
                      الخدمات الأكثر طلباً
                    </h3>
                    <p className="text-sm text-[#526D82]">اختر مجالك وابدأ الآن</p>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#27374D] to-[#526D82] shadow-lg">
                    <TrendingUp className="h-7 w-7 text-white" />
                  </div>
                </div>

                <div className="space-y-4">
                  {heroServices.map((service, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className={`cursor-pointer rounded-2xl border-2 p-5 transition-all ${
                        activeService === i
                          ? 'border-[#27374D] bg-gradient-to-r from-[#27374D] to-[#526D82] shadow-xl'
                          : 'border-[#9DB2BF]/20 bg-white/50 hover:border-[#526D82]/40 hover:shadow-lg'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                              activeService === i
                                ? 'bg-white/20 text-white'
                                : 'bg-gradient-to-br from-[#27374D] to-[#526D82] text-white'
                            }`}
                          >
                            {service.icon}
                          </div>
                          <div>
                            <h4
                              className={`text-lg font-bold ${
                                activeService === i ? 'text-white' : 'text-[#27374D]'
                              }`}
                            >
                              {service.title}
                            </h4>
                            <p
                              className={`text-sm ${
                                activeService === i ? 'text-white/80' : 'text-[#526D82]'
                              }`}
                            >
                              {service.count} مشروع نشط
                            </p>
                          </div>
                        </div>
                        <div
                          className={`flex items-center gap-2 rounded-lg px-3 py-1.5 ${
                            activeService === i
                              ? 'bg-white/20 text-white'
                              : 'bg-[#9DB2BF]/20 text-[#27374D]'
                          }`}
                        >
                          <TrendingUp className="h-4 w-4" />
                          <span className="text-sm font-bold">{service.growth}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 w-full rounded-xl bg-gradient-to-r from-[#27374D] to-[#526D82] py-4 font-bold text-white transition-all hover:shadow-lg"
                >
                  استكشف جميع الخدمات
                </motion.button>
              </div>

              {/* Floating Cards */}
              <motion.div
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: 1.2, type: 'spring' }}
                className="absolute -top-6 -left-6 rounded-2xl border border-[#9DB2BF]/30 bg-white p-5 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#9DB2BF] to-[#DDE6ED]">
                    <Users className="h-6 w-6 text-[#27374D]" />
                  </div>
                  <div>
                    <p className="text-xl font-black text-[#27374D]">1,540+</p>
                    <p className="text-xs text-[#526D82]">مشروع جديد اليوم</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0, y: -20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: 1.4, type: 'spring' }}
                className="absolute -right-6 -bottom-6 rounded-2xl bg-gradient-to-br from-[#27374D] to-[#526D82] p-5 text-white shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-black">214K+</p>
                    <p className="text-xs opacity-90">مشروع ناجح</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-[#9DB2BF]/20 bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group text-center"
              >
                <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#27374D] to-[#526D82] shadow-lg transition-transform group-hover:scale-110">
                  <div className="text-white">{stat.icon}</div>
                </div>
                <p className="mb-2 text-5xl font-black text-[#27374D]">{stat.number}</p>
                <p className="mb-2 font-bold text-[#526D82]">{stat.label}</p>
                <p className="mb-3 text-sm text-[#9DB2BF]">{stat.description}</p>
                <div className="inline-flex items-center gap-2 rounded-lg bg-[#DDE6ED] px-3 py-1.5">
                  <TrendingUp className="h-4 w-4 text-[#27374D]" />
                  <span className="text-sm font-bold text-[#27374D]">{stat.change}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Projects */}
      <section className="bg-gradient-to-br from-[#DDE6ED] to-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#9DB2BF]/20 bg-white px-4 py-2 shadow-md"
              >
                <Sparkles className="h-4 w-4 text-[#526D82]" />
                <span className="text-sm font-bold text-[#27374D]">مشاريع مميزة</span>
              </motion.div>
              <h2 className="mb-3 text-5xl font-black text-[#27374D]">فرص استثنائية</h2>
              <p className="text-xl text-[#526D82]">مشاريع جديدة تضاف كل ساعة</p>
            </div>
            <div className="flex gap-3">
              {['الكل', 'تطوير', 'تصميم', 'تسويق', 'كتابة'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${
                    selectedFilter === filter
                      ? 'bg-gradient-to-r from-[#27374D] to-[#526D82] text-white shadow-lg'
                      : 'border border-[#9DB2BF]/20 bg-white text-[#27374D] hover:border-[#526D82]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {topProjects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group overflow-hidden rounded-3xl border border-[#9DB2BF]/20 bg-white shadow-lg transition-all hover:border-[#526D82]/40 hover:shadow-2xl"
              >
                {/* Header */}
                <div className="border-b border-[#9DB2BF]/10 p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#27374D] to-[#526D82] text-2xl shadow-md">
                        {project.client.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-[#27374D]">{project.client.name}</p>
                          {project.client.verified && (
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#526D82]">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="mt-1 flex items-center gap-1">
                          <Star className="h-4 w-4 fill-[#526D82] text-[#526D82]" />
                          <span className="text-sm font-bold text-[#27374D]">
                            {project.client.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    {project.urgency === 'high' && (
                      <span className="rounded-full bg-red-500 px-3 py-1.5 text-xs font-bold text-white">
                        عاجل
                      </span>
                    )}
                  </div>

                  <h3 className="mb-2 line-clamp-2 text-xl font-black text-[#27374D] transition-colors group-hover:text-[#526D82]">
                    {project.title}
                  </h3>
                  <p className="mb-4 text-sm text-[#526D82]">{project.category}</p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="rounded-lg bg-[#DDE6ED] px-3 py-1 text-xs font-semibold text-[#27374D]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <div className="mb-6 grid grid-cols-2 gap-4">
                    <div>
                      <p className="mb-1 text-xs text-[#9DB2BF]">الميزانية</p>
                      <p className="text-2xl font-black text-[#27374D]">
                        {project.budget}
                        <span className="mr-1 text-sm font-normal text-[#526D82]">
                          {project.currency}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="mb-1 text-xs text-[#9DB2BF]">المدة</p>
                      <p className="text-lg font-bold text-[#27374D]">{project.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#9DB2BF]/10 pt-6">
                    <div className="flex items-center gap-2 text-sm text-[#526D82]">
                      <Users className="h-4 w-4" />
                      <span className="font-bold">{project.proposals} عرض</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#526D82]">
                      <Clock className="h-4 w-4" />
                      <span className="font-bold">متبقي {project.timeLeft}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#27374D] to-[#526D82] py-3 font-bold text-white transition-all hover:shadow-lg"
                  >
                    <span>تقديم عرض</span>
                    <ArrowRight className="h-5 w-5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#9DB2BF]/20 bg-[#DDE6ED] px-4 py-2"
            >
              <Layers className="h-4 w-4 text-[#526D82]" />
              <span className="text-sm font-bold text-[#27374D]">استكشف المجالات</span>
            </motion.div>
            <h2 className="mb-4 text-5xl font-black text-[#27374D]">خدمات شاملة في</h2>
            <p className="mb-4 text-5xl font-black">
              <span className="text-[#526D82]">كل</span>{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#27374D]">التخصصات</span>
                <span className="absolute bottom-1 left-0 -z-0 h-3 w-full bg-[#9DB2BF]"></span>
              </span>
            </p>
            <p className="mx-auto max-w-3xl text-xl text-[#526D82]">
              آلاف المحترفين المعتمدين في انتظارك لتحقيق أهدافك
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer rounded-3xl border border-[#9DB2BF]/20 bg-gradient-to-br from-white to-[#DDE6ED] p-8 shadow-lg transition-all hover:border-[#526D82]/40 hover:shadow-2xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#27374D] to-[#526D82] text-white shadow-lg transition-all group-hover:scale-110 group-hover:rotate-6">
                  {category.icon}
                </div>

                <h3 className="mb-3 text-2xl font-black text-[#27374D] transition-colors group-hover:text-[#526D82]">
                  {category.title}
                </h3>
                <p className="mb-6 leading-relaxed text-[#526D82]">{category.description}</p>

                {/* Stats */}
                <div className="mb-6 grid grid-cols-2 gap-4 border-b border-[#9DB2BF]/20 pb-6">
                  <div>
                    <p className="mb-1 text-xs text-[#9DB2BF]">المشاريع</p>
                    <p className="text-lg font-black text-[#27374D]">{category.projects}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-[#9DB2BF]">المحترفون</p>
                    <p className="text-lg font-black text-[#27374D]">{category.freelancers}</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {category.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg border border-[#9DB2BF]/30 bg-white px-2.5 py-1 text-xs font-semibold text-[#27374D]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="mb-1 text-xs text-[#9DB2BF]">متوسط الميزانية</p>
                    <p className="font-bold text-[#27374D]">{category.avgBudget}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-[#9DB2BF] transition-all group-hover:translate-x-1 group-hover:text-[#526D82]" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="bg-gradient-to-br from-[#DDE6ED] to-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-5xl font-black text-[#27374D]">
              لماذا فري<span className="text-[#526D82]">هَب</span>؟
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-[#526D82]">
              مميزات فريدة تجعلنا الخيار الأمثل للمحترفين
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {platformFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-3xl border border-[#9DB2BF]/20 bg-white p-8 shadow-lg transition-all hover:border-[#526D82]/40 hover:shadow-2xl"
              >
                <div
                  className={`h-20 w-20 bg-gradient-to-br ${feature.color} mb-6 flex items-center justify-center rounded-2xl text-white shadow-lg transition-all group-hover:scale-110 group-hover:-rotate-6`}
                >
                  {feature.icon}
                </div>

                <h3 className="mb-4 text-2xl font-black text-[#27374D] transition-colors group-hover:text-[#526D82]">
                  {feature.title}
                </h3>
                <p className="mb-6 leading-relaxed text-[#526D82]">{feature.description}</p>

                <div className="inline-flex items-center gap-2 rounded-xl bg-[#DDE6ED] px-4 py-2">
                  <CheckCircle className="h-5 w-5 text-[#27374D]" />
                  <span className="font-bold text-[#27374D]">{feature.metric}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-5xl font-black text-[#27374D]">كيف تبدأ؟</h2>
            <p className="text-xl text-[#526D82]">أربع خطوات بسيطة للنجاح</p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-1/2 right-0 left-0 hidden h-1 bg-gradient-to-r from-[#27374D] via-[#526D82] to-[#9DB2BF] opacity-20 lg:block"></div>

            <div className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {workProcess.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="relative"
                >
                  <div className="group rounded-3xl border-2 border-[#9DB2BF]/20 bg-white p-8 shadow-lg transition-all hover:border-[#526D82]/40 hover:shadow-2xl">
                    {/* Step Number */}
                    <div
                      className={`absolute -top-6 right-8 h-14 w-14 bg-gradient-to-br ${step.color} flex items-center justify-center rounded-2xl text-xl font-black text-white shadow-xl`}
                    >
                      {step.step}
                    </div>

                    {/* Icon */}
                    <div
                      className={`h-16 w-16 bg-gradient-to-br ${step.color} mt-6 mb-6 flex items-center justify-center rounded-2xl text-white shadow-lg transition-transform group-hover:scale-110`}
                    >
                      {step.icon}
                    </div>

                    <h3 className="mb-3 text-xl font-black text-[#27374D] transition-colors group-hover:text-[#526D82]">
                      {step.title}
                    </h3>
                    <p className="leading-relaxed text-[#526D82]">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-br from-[#DDE6ED] to-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-5xl font-black text-[#27374D]">
              قصص <span className="text-[#526D82]">النجاح</span>
            </h2>
            <p className="text-xl text-[#526D82]">آراء حقيقية من عملائنا المميزين</p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl bg-gradient-to-br from-[#27374D] to-[#526D82] p-12 text-white shadow-2xl lg:p-16"
            >
              <div className="grid items-center gap-12 lg:grid-cols-2">
                {/* Left Side */}
                <div>
                  <div className="mb-6 text-7xl">{testimonials[currentTestimonial].image}</div>
                  <h3 className="mb-3 text-3xl font-black">
                    {testimonials[currentTestimonial].company}
                  </h3>
                  <p className="mb-8 text-xl text-white/90">
                    {testimonials[currentTestimonial].project}
                  </p>

                  <div className="mb-8 grid grid-cols-3 gap-4">
                    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                      <p className="mb-1 text-2xl font-black">
                        {testimonials[currentTestimonial].value}
                      </p>
                      <p className="text-sm text-white/80">القيمة</p>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                      <p className="mb-1 text-2xl font-black">
                        {testimonials[currentTestimonial].duration}
                      </p>
                      <p className="text-sm text-white/80">المدة</p>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                      <div className="mb-1 flex gap-1">
                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-white text-white" />
                        ))}
                      </div>
                      <p className="text-sm text-white/80">التقييم</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="mb-3 font-bold">النتائج:</p>
                    {testimonials[currentTestimonial].results.map((result, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 shrink-0" />
                        <p className="text-white/90">{result}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side */}
                <div>
                  <div className="mb-6 text-8xl opacity-20">"</div>
                  <p className="mb-8 text-2xl leading-relaxed font-medium">
                    {testimonials[currentTestimonial].quote}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl backdrop-blur-sm">
                      {testimonials[currentTestimonial].avatar}
                    </div>
                    <div>
                      <p className="text-xl font-black">{testimonials[currentTestimonial].name}</p>
                      <p className="text-white/90">{testimonials[currentTestimonial].position}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-3">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentTestimonial(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentTestimonial
                    ? 'w-12 bg-gradient-to-r from-[#27374D] to-[#526D82]'
                    : 'w-2 bg-[#9DB2BF]'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#27374D] via-[#526D82] to-[#27374D] px-6 py-28 lg:px-8">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-white blur-3xl"></div>
          <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-white blur-3xl"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-8 text-6xl">🚀</div>
            <h2 className="mb-6 text-6xl leading-tight font-black text-white">
              ابدأ مشروعك القادم
              <br />
              <span className="text-[#9DB2BF]">مع الأفضل اليوم</span>
            </h2>
            <p className="mx-auto mb-12 max-w-3xl text-2xl leading-relaxed text-white/90">
              انضم لـ 96,000+ عميل ناجح واحصل على أفضل المحترفين لتحقيق أهدافك
            </p>

            <div className="flex flex-col justify-center gap-5 sm:flex-row">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hover:shadow-3xl flex items-center justify-center gap-3 rounded-2xl bg-white px-10 py-5 text-xl font-black text-[#27374D] shadow-2xl transition-all"
              >
                <span>انشر مشروعك مجاناً</span>
                <Rocket className="h-6 w-6" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-2xl border-2 border-white/30 bg-white/10 px-10 py-5 text-xl font-black text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                تواصل معنا
              </motion.button>
            </div>

            <div className="mt-16 flex items-center justify-center gap-16">
              <div>
                <p className="mb-2 text-4xl font-black text-white">100%</p>
                <p className="text-white/80">ضمان شامل</p>
              </div>
              <div className="h-14 w-px bg-white/20"></div>
              <div>
                <p className="mb-2 text-4xl font-black text-white">24/7</p>
                <p className="text-white/80">دعم فني</p>
              </div>
              <div className="h-14 w-px bg-white/20"></div>
              <div>
                <p className="mb-2 text-4xl font-black text-white">99.4%</p>
                <p className="text-white/80">معدل نجاح</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#27374D] px-6 py-20 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-12 md:grid-cols-2 lg:grid-cols-5">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#526D82] to-[#9DB2BF]">
                  <Workflow className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black">
                    فري<span className="text-[#9DB2BF]">هَب</span>
                  </h3>
                  <p className="text-sm text-white/70">مركز المواهب والمشاريع</p>
                </div>
              </div>
              <p className="mb-6 max-w-md leading-relaxed text-white/70">
                نربط أصحاب المشاريع بأفضل المحترفين في الوطن العربي. جودة عالية، أسعار منافسة، وضمان
                كامل.
              </p>
              <div className="flex gap-3">
                {[<Facebook />, <Twitter />, <Linkedin />, <Instagram />].map((Icon, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition-all hover:bg-white/20"
                  >
                    {Icon}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              {
                title: 'الشركة',
                links: ['من نحن', 'كيف نعمل', 'الأسعار', 'المدونة', 'الوظائف'],
              },
              {
                title: 'الخدمات',
                links: ['تطوير', 'تصميم', 'تسويق', 'كتابة', 'استشارات'],
              },
              {
                title: 'الدعم',
                links: ['المساعدة', 'الأسئلة', 'الشروط', 'الخصوصية', 'اتصل بنا'],
              },
            ].map((section, i) => (
              <div key={i}>
                <h4 className="mb-5 text-lg font-black">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <a
                        href="#"
                        className="group flex items-center gap-2 text-white/70 transition-colors hover:text-white"
                      >
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
            <p className="text-sm text-white/60">© 2025 فريهَب. جميع الحقوق محفوظة</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-white/60 transition-colors hover:text-white">
                الشروط والأحكام
              </a>
              <a href="#" className="text-white/60 transition-colors hover:text-white">
                سياسة الخصوصية
              </a>
              <a href="#" className="text-white/60 transition-colors hover:text-white">
                ملفات تعريف الارتباط
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ModernFreelanceHub;
