import { motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Briefcase,
  Building2,
  CheckCircle,
  ChevronRight,
  Clock,
  Code,
  DollarSign,
  Eye,
  Facebook,
  FileText,
  Grid,
  Headphones,
  Instagram,
  Layers,
  Linkedin,
  MapPin,
  Megaphone,
  Menu,
  Palette,
  Rocket,
  Search,
  Shield,
  Star,
  TrendingUp,
  Twitter,
  User,
  Users,
  Video,
  X,
  Zap,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

function ModernFreelancePlatform() {
  const [scrollY, setScrollY] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('trending');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    {
      id: 1,
      name: 'البرمجة والتطوير',
      icon: <Code />,
      projects: 15240,
      color: '#387478',
      gradient: 'from-[#387478] to-[#629584]',
    },
    {
      id: 2,
      name: 'التصميم والإبداع',
      icon: <Palette />,
      projects: 12890,
      color: '#629584',
      gradient: 'from-[#629584] to-[#387478]',
    },
    {
      id: 3,
      name: 'الكتابة والترجمة',
      icon: <FileText />,
      projects: 9560,
      color: '#387478',
      gradient: 'from-[#387478] to-[#243642]',
    },
    {
      id: 4,
      name: 'التسويق والمبيعات',
      icon: <Megaphone />,
      projects: 11200,
      color: '#243642',
      gradient: 'from-[#243642] to-[#387478]',
    },
    {
      id: 5,
      name: 'الفيديو والصوتيات',
      icon: <Video />,
      projects: 7890,
      color: '#629584',
      gradient: 'from-[#629584] to-[#E2F1E7]',
    },
    {
      id: 6,
      name: 'الأعمال والاستشارات',
      icon: <Briefcase />,
      projects: 8450,
      color: '#387478',
      gradient: 'from-[#387478] to-[#629584]',
    },
  ];

  const projects = [
    {
      id: 1,
      title: 'تطوير منصة تجارة إلكترونية متكاملة',
      description:
        'نبحث عن مطور محترف لبناء منصة تجارة إلكترونية شاملة مع نظام إدارة متقدم وتكامل مع بوابات الدفع.',
      client: 'شركة التجارة الذكية',
      verified: true,
      rating: 4.9,
      reviews: 234,
      budget: { type: 'fixed', amount: 125000, currency: 'SAR' },
      duration: '3-4 أشهر',
      level: 'Expert',
      skills: ['React', 'Node.js', 'MongoDB', 'AWS', 'Payment Gateway'],
      proposals: 24,
      posted: '2 ساعات',
      views: 456,
      featured: true,
      urgent: true,
      category: 'البرمجة',
      location: 'عن بُعد',
    },
    {
      id: 2,
      title: 'تصميم هوية بصرية كاملة لشركة تقنية',
      description:
        'مطلوب مصمم مبدع لإنشاء هوية بصرية متكاملة تشمل الشعار، الألوان، والدليل الإرشادي.',
      client: 'TechVision Solutions',
      verified: true,
      rating: 5.0,
      reviews: 189,
      budget: { type: 'hourly', min: 200, max: 350, currency: 'SAR' },
      duration: '6-8 أسابيع',
      level: 'Intermediate',
      skills: ['Branding', 'Illustrator', 'Figma', 'UI/UX'],
      proposals: 67,
      posted: '5 ساعات',
      views: 892,
      featured: true,
      urgent: false,
      category: 'التصميم',
      location: 'عن بُعد',
    },
    {
      id: 3,
      title: 'حملة تسويقية شاملة عبر وسائل التواصل',
      description: 'نحتاج خبير تسويق رقمي لإدارة حملة تسويقية متكاملة عبر منصات التواصل الاجتماعي.',
      client: 'Digital Marketing Hub',
      verified: false,
      rating: 4.7,
      reviews: 156,
      budget: { type: 'fixed', amount: 45000, currency: 'SAR' },
      duration: '2-3 أشهر',
      level: 'Intermediate',
      skills: ['Social Media', 'Google Ads', 'Analytics', 'Content Strategy'],
      proposals: 89,
      posted: '1 يوم',
      views: 678,
      featured: false,
      urgent: true,
      category: 'التسويق',
      location: 'هجين',
    },
    {
      id: 4,
      title: 'كتابة محتوى تقني متخصص للمدونة',
      description: 'مطلوب كاتب محتوى تقني لإنتاج مقالات عالية الجودة حول التقنية والبرمجة.',
      client: 'Tech Blog Arabia',
      verified: true,
      rating: 4.8,
      reviews: 201,
      budget: { type: 'hourly', min: 150, max: 250, currency: 'SAR' },
      duration: '3 أشهر',
      level: 'Expert',
      skills: ['Technical Writing', 'SEO', 'Research', 'Arabic'],
      proposals: 112,
      posted: '3 أيام',
      views: 534,
      featured: false,
      urgent: false,
      category: 'الكتابة',
      location: 'عن بُعد',
    },
    {
      id: 5,
      title: 'إنتاج فيديوهات تعليمية احترافية',
      description: 'نبحث عن منتج فيديو محترف لإنشاء سلسلة فيديوهات تعليمية عالية الجودة.',
      client: 'Learn Platform',
      verified: true,
      rating: 4.95,
      reviews: 178,
      budget: { type: 'fixed', amount: 68000, currency: 'SAR' },
      duration: '2 أشهر',
      level: 'Expert',
      skills: ['Video Editing', 'After Effects', 'Motion Graphics', 'Storytelling'],
      proposals: 43,
      posted: '6 ساعات',
      views: 721,
      featured: true,
      urgent: true,
      category: 'الفيديو',
      location: 'عن بُعد',
    },
    {
      id: 6,
      title: 'استشارات استراتيجية لتطوير الأعمال',
      description: 'شركة ناشئة تبحث عن استشاري أعمال لوضع استراتيجية نمو وتوسع.',
      client: 'Startup Accelerator',
      verified: true,
      rating: 4.85,
      reviews: 145,
      budget: { type: 'hourly', min: 300, max: 500, currency: 'SAR' },
      duration: '4-6 أشهر',
      level: 'Expert',
      skills: ['Business Strategy', 'Market Analysis', 'Planning', 'Consulting'],
      proposals: 31,
      posted: '1 يوم',
      views: 412,
      featured: false,
      urgent: false,
      category: 'الاستشارات',
      location: 'هجين',
    },
  ];

  const talents = [
    {
      id: 1,
      name: 'محمد العتيبي',
      title: 'مطور Full Stack متخصص',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
      rating: 4.98,
      reviews: 456,
      hourlyRate: 850,
      completedJobs: 678,
      skills: ['React', 'Node.js', 'Python', 'AWS', 'Docker'],
      availability: 'متاح',
      location: 'الرياض، السعودية',
      badge: 'Top Rated Plus',
      responseTime: '10 دقائق',
      successRate: 98,
      earnings: '2.4M+',
    },
    {
      id: 2,
      name: 'فاطمة الحربي',
      title: 'مصممة UI/UX إبداعية',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
      rating: 5.0,
      reviews: 389,
      hourlyRate: 720,
      completedJobs: 542,
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
      availability: 'متاح',
      location: 'دبي، الإمارات',
      badge: 'Top Rated Plus',
      responseTime: '15 دقيقة',
      successRate: 100,
      earnings: '1.9M+',
    },
    {
      id: 3,
      name: 'أحمد السعيد',
      title: 'خبير تسويق رقمي',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
      rating: 4.92,
      reviews: 312,
      hourlyRate: 650,
      completedJobs: 489,
      skills: ['SEO', 'Google Ads', 'Social Media', 'Analytics'],
      availability: 'مشغول',
      location: 'جدة، السعودية',
      badge: 'Top Rated',
      responseTime: '1 ساعة',
      successRate: 96,
      earnings: '1.5M+',
    },
    {
      id: 4,
      name: 'نورة القحطاني',
      title: 'كاتبة محتوى ومترجمة',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
      rating: 4.88,
      reviews: 267,
      hourlyRate: 420,
      completedJobs: 523,
      skills: ['Content Writing', 'Translation', 'SEO', 'Copywriting'],
      availability: 'متاح',
      location: 'القاهرة، مصر',
      badge: 'Rising Star',
      responseTime: '30 دقيقة',
      successRate: 94,
      earnings: '980K+',
    },
  ];

  const stats = [
    { label: 'مشروع نشط', value: '425K+', icon: <Layers />, change: '+18%', trend: 'up' },
    { label: 'محترف موثوق', value: '189K+', icon: <Users />, change: '+24%', trend: 'up' },
    { label: 'إجمالي المدفوعات', value: '$67M', icon: <DollarSign />, change: '+42%', trend: 'up' },
    { label: 'معدل الرضا', value: '4.9/5', icon: <Star />, change: '+0.2', trend: 'up' },
  ];

  return (
    <div className="min-h-screen bg-[#E2F1E7]">
      {/* Advanced Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-700 ${
          scrollY > 100
            ? 'bg-white/95 shadow-2xl backdrop-blur-xl'
            : 'bg-gradient-to-b from-[#243642]/95 to-transparent backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
          <div className="flex h-24 items-center justify-between">
            {/* Logo */}
            <div className="group flex cursor-pointer items-center gap-4">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className={`relative h-14 w-14 rounded-2xl bg-gradient-to-br ${
                  scrollY > 100 ? 'from-[#387478] to-[#629584]' : 'from-[#629584] to-[#E2F1E7]'
                } flex items-center justify-center shadow-xl`}
              >
                <Zap
                  className={`h-7 w-7 ${scrollY > 100 ? 'text-white' : 'text-[#243642]'}`}
                  strokeWidth={2.5}
                />
              </motion.div>
              <div>
                <h1
                  className={`text-2xl font-bold tracking-tight ${scrollY > 100 ? 'text-[#243642]' : 'text-white'}`}
                >
                  FreelanceHub
                </h1>
                <p
                  className={`text-xs font-medium ${scrollY > 100 ? 'text-[#387478]' : 'text-[#E2F1E7]'}`}
                >
                  منصة العمل الحر الذكية
                </p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden items-center gap-2 lg:flex">
              {['استكشف', 'مشاريع', 'محترفون', 'وظائف', 'الموارد'].map((item, i) => (
                <motion.button
                  key={i}
                  whileHover={{ y: -2 }}
                  className={`rounded-xl px-6 py-3 text-sm font-semibold transition-all ${
                    scrollY > 100
                      ? 'text-[#243642] hover:bg-[#E2F1E7]'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  {item}
                </motion.button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                className={`hidden items-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all sm:flex ${
                  scrollY > 100
                    ? 'text-[#387478] hover:bg-[#E2F1E7]'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <User className="h-5 w-5" />
                تسجيل الدخول
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-xl bg-gradient-to-r from-[#387478] to-[#629584] px-8 py-3 font-bold text-white shadow-xl transition-all hover:shadow-2xl"
              >
                ابدأ الآن
              </motion.button>
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="rounded-xl p-3 hover:bg-white/10 lg:hidden"
              >
                {showMobileMenu ? (
                  <X className="h-6 w-6 text-white" />
                ) : (
                  <Menu className="h-6 w-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section - Dynamic & Modern */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#243642] via-[#387478] to-[#243642] pt-32 pb-24 lg:pt-44 lg:pb-36">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, #629584 0%, transparent 50%),
                               radial-gradient(circle at 80% 80%, #E2F1E7 0%, transparent 50%),
                               radial-gradient(circle at 40% 20%, #387478 0%, transparent 50%)`,
              backgroundSize: '100% 100%',
            }}
          />

          {/* Floating Shapes */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/5"
              style={{
                width: Math.random() * 300 + 50,
                height: Math.random() * 300 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                x: [0, Math.random() * 100 - 50],
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-screen-2xl px-6 lg:px-12">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-xl"
              >
                <div className="h-3 w-3 animate-pulse rounded-full bg-[#629584] shadow-lg shadow-[#629584]/50"></div>
                <span className="text-sm font-semibold text-white">+189,000 محترف نشط الآن</span>
                <TrendingUp className="h-4 w-4 text-[#629584]" />
              </motion.div>

              {/* Main Heading */}
              <h1 className="mb-8 text-6xl leading-[1.1] font-black text-white sm:text-7xl lg:text-8xl">
                مستقبل
                <br />
                <span className="bg-gradient-to-r from-[#629584] via-[#E2F1E7] to-[#629584] bg-clip-text text-transparent">
                  العمل الحر
                </span>
                <br />
                يبدأ هنا
              </h1>

              {/* Description */}
              <p className="mb-12 max-w-2xl text-xl leading-relaxed font-medium text-[#E2F1E7] lg:text-2xl">
                اكتشف أفضل المشاريع، تواصل مع محترفين موثوقين، وحقق طموحاتك المهنية في منصة واحدة
                متكاملة.
              </p>

              {/* Search Bar - Advanced */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="group relative"
              >
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#629584] to-[#387478] opacity-30 blur-xl transition-all group-hover:opacity-50"></div>

                <div className="relative flex items-stretch overflow-hidden rounded-2xl bg-white shadow-2xl">
                  <div className="flex flex-1 items-center gap-4 px-6 py-5">
                    <Search className="h-6 w-6 text-[#387478]" strokeWidth={2.5} />
                    <input
                      type="text"
                      placeholder="ابحث عن مشاريع، مهارات، أو محترفين..."
                      className="w-full bg-transparent text-lg font-semibold text-[#243642] placeholder-[#629584]/60 outline-none"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gradient-to-r from-[#387478] to-[#629584] px-10 py-5 font-bold text-white transition-all hover:shadow-xl"
                  >
                    بحث
                  </motion.button>
                </div>

                {/* Popular Searches */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="text-sm font-semibold text-[#E2F1E7]">شائع:</span>
                  {['React Developer', 'UI/UX Design', 'Content Writing', 'Digital Marketing'].map(
                    (tag, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="rounded-xl border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
                      >
                        {tag}
                      </motion.button>
                    )
                  )}
                </div>
              </motion.div>
            </motion.div>

            {/* Right - 3D Cards */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative hidden h-[600px] lg:block"
            >
              {/* Featured Project Card */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotateY: [0, 5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute top-0 right-0 w-[450px] rounded-3xl bg-white p-8 shadow-2xl"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#387478] to-[#629584]">
                      <Code className="h-7 w-7 text-white" strokeWidth={2} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#243642]">مشروع عاجل</h4>
                      <p className="text-sm font-semibold text-[#629584]">منذ ساعتين</p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-gradient-to-r from-[#387478] to-[#629584] px-4 py-2 text-sm font-bold text-white">
                    URGENT
                  </div>
                </div>

                <h3 className="mb-4 text-2xl leading-tight font-bold text-[#243642]">
                  تطوير تطبيق ويب متقدم بتقنيات حديثة
                </h3>

                <p className="mb-6 leading-relaxed font-medium text-[#387478]">
                  نبحث عن مطور محترف لبناء منصة SaaS شاملة باستخدام React و Node.js...
                </p>

                <div className="mb-6 flex items-center justify-between border-b-2 border-[#E2F1E7] pb-6">
                  <div>
                    <p className="mb-1 text-4xl font-black text-[#243642]">125K</p>
                    <p className="text-sm font-bold text-[#629584]">ريال سعودي</p>
                  </div>

                  <div className="flex gap-2">
                    {['React', 'Node.js', 'AWS'].map((skill, i) => (
                      <span
                        key={i}
                        className="rounded-lg bg-[#E2F1E7] px-4 py-2 text-xs font-bold text-[#387478]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm font-semibold text-[#629584]">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>24 عرض</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      <span>456</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-xl bg-gradient-to-r from-[#387478] to-[#629584] px-6 py-3 font-bold text-white"
                  >
                    قدّم عرضك
                  </motion.button>
                </div>
              </motion.div>

              {/* Floating Stats Cards */}
              <motion.div
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, -3, 0],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute bottom-20 left-0 w-64 rounded-3xl bg-gradient-to-br from-[#629584] to-[#387478] p-6 shadow-2xl"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                    <Star className="h-6 w-6 text-white" fill="white" />
                  </div>
                  <div>
                    <p className="text-4xl font-black text-white">4.9</p>
                    <p className="text-sm font-semibold text-white/80">من 5.0</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-white/90">معدل رضا العملاء</p>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 3, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute top-20 left-16 w-56 rounded-3xl border-2 border-[#E2F1E7] bg-white p-6 shadow-2xl"
              >
                <div className="mb-3 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-[#629584]" />
                  <p className="text-sm font-bold text-[#629584] uppercase">نمو سريع</p>
                </div>
                <p className="mb-2 text-5xl font-black text-[#243642]">+42%</p>
                <p className="text-sm font-semibold text-[#387478]">زيادة في المشاريع هذا الشهر</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar - Modern */}
      <section className="bg-white py-16 shadow-2xl">
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group text-center lg:text-left"
              >
                <div className="mb-4 flex items-center justify-center gap-4 lg:justify-start">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#387478] to-[#629584] shadow-xl transition-all group-hover:shadow-2xl">
                    {React.cloneElement(stat.icon, {
                      className: 'w-8 h-8 text-white',
                      strokeWidth: 2,
                    })}
                  </div>
                  <div
                    className={`rounded-xl px-4 py-2 text-sm font-bold ${
                      stat.trend === 'up'
                        ? 'bg-[#629584]/10 text-[#387478]'
                        : 'bg-red-50 text-red-600'
                    }`}
                  >
                    {stat.change}
                  </div>
                </div>
                <p className="mb-3 text-5xl font-black text-[#243642] transition-colors group-hover:text-[#387478] lg:text-6xl">
                  {stat.value}
                </p>
                <p className="text-lg font-bold text-[#629584]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories - Interactive Cards */}
      <section className="bg-gradient-to-b from-white to-[#E2F1E7] py-24">
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="mb-6 inline-flex items-center gap-3 rounded-full border-2 border-[#387478]/20 bg-gradient-to-r from-[#387478]/10 to-[#629584]/10 px-6 py-3"
            >
              <Grid className="h-5 w-5 text-[#387478]" />
              <span className="text-sm font-bold tracking-wider text-[#387478] uppercase">
                التصنيفات
              </span>
            </motion.div>

            <h2 className="mb-6 text-5xl font-black text-[#243642] lg:text-7xl">
              اختر مجال<span className="text-[#387478]">ك</span>
            </h2>
            <p className="mx-auto max-w-3xl text-xl font-semibold text-[#629584]">
              استكشف آلاف الفرص في المجالات الأكثر طلباً في سوق العمل الحر
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                onClick={() => setActiveCategory(cat.id)}
                className="group cursor-pointer"
              >
                <div
                  className={`relative overflow-hidden rounded-3xl shadow-xl transition-all duration-500 hover:shadow-2xl ${
                    activeCategory === cat.id ? 'ring-4 ring-[#387478]' : ''
                  }`}
                >
                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-90 transition-all group-hover:opacity-100`}
                  ></div>

                  {/* Pattern Overlay */}
                  <div className="absolute inset-0 opacity-10">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px)`,
                        backgroundSize: '30px 30px',
                      }}
                    ></div>
                  </div>

                  <div className="relative p-10">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                      className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 shadow-xl backdrop-blur-sm"
                    >
                      {React.cloneElement(cat.icon, {
                        className: 'w-10 h-10 text-white',
                        strokeWidth: 2,
                      })}
                    </motion.div>

                    <h3 className="mb-4 text-3xl font-black text-white">{cat.name}</h3>

                    <div className="mb-6 flex items-baseline gap-3">
                      <p className="text-6xl font-black text-white">
                        {(cat.projects / 1000).toFixed(1)}K
                      </p>
                      <p className="text-lg font-bold text-white/80">مشروع متاح</p>
                    </div>

                    <div className="mb-6 h-1 overflow-hidden rounded-full bg-white/30">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '70%' }}
                        viewport={{ once: true }}
                        className="h-full rounded-full bg-white"
                      ></motion.div>
                    </div>

                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 font-bold text-white"
                    >
                      <span>استكشف المشاريع</span>
                      <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects - Advanced Cards */}
      <section className="bg-[#E2F1E7] py-24">
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
          <div className="mb-16 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="mb-6 inline-flex items-center gap-3 rounded-full border-2 border-[#387478]/20 bg-white px-6 py-3"
              >
                <Briefcase className="h-5 w-5 text-[#387478]" />
                <span className="text-sm font-bold tracking-wider text-[#387478] uppercase">
                  المشاريع المميزة
                </span>
              </motion.div>

              <h2 className="mb-4 text-5xl font-black text-[#243642] lg:text-7xl">أفضل الفرص</h2>
              <p className="text-xl font-semibold text-[#629584]">
                اكتشف المشاريع الأعلى قيمة والأكثر طلباً في السوق
              </p>
            </div>

            {/* Filters */}
            <div className="flex gap-3">
              {[
                { id: 'trending', label: 'الأكثر طلباً', icon: <TrendingUp /> },
                { id: 'urgent', label: 'عاجل', icon: <Zap /> },
                { id: 'featured', label: 'مميز', icon: <Star /> },
              ].map((filter) => (
                <motion.button
                  key={filter.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all ${
                    selectedFilter === filter.id
                      ? 'bg-gradient-to-r from-[#387478] to-[#629584] text-white shadow-xl'
                      : 'bg-white text-[#387478] hover:shadow-lg'
                  }`}
                >
                  {React.cloneElement(filter.icon, { className: 'w-4 h-4', strokeWidth: 2.5 })}
                  {filter.label}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-500 hover:shadow-2xl">
                  <div className="p-8 lg:p-10">
                    <div className="mb-6 flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
                      {/* Left Info */}
                      <div className="flex-1">
                        <div className="mb-4 flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#387478] to-[#629584]">
                              <Building2 className="h-6 w-6 text-white" strokeWidth={2} />
                            </div>
                            <div>
                              <h4 className="font-bold text-[#243642]">{project.client}</h4>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-[#629584] text-[#629584]" />
                                  <span className="text-sm font-bold text-[#387478]">
                                    {project.rating}
                                  </span>
                                </div>
                                <span className="text-xs font-semibold text-[#629584]">
                                  ({project.reviews} تقييم)
                                </span>
                              </div>
                            </div>
                          </div>

                          {project.verified && (
                            <div className="flex items-center gap-2 rounded-lg bg-[#629584]/10 px-3 py-1">
                              <BadgeCheck className="h-4 w-4 text-[#387478]" />
                              <span className="text-xs font-bold text-[#387478]">موثق</span>
                            </div>
                          )}
                        </div>

                        <h3 className="mb-4 text-3xl leading-tight font-black text-[#243642] transition-colors group-hover:text-[#387478] lg:text-4xl">
                          {project.title}
                        </h3>

                        <p className="mb-6 leading-relaxed font-semibold text-[#629584]">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <div className="flex items-center gap-2 font-semibold text-[#387478]">
                            <MapPin className="h-4 w-4" strokeWidth={2} />
                            <span>{project.location}</span>
                          </div>
                          <div className="h-4 w-px bg-[#E2F1E7]"></div>
                          <div className="flex items-center gap-2 font-semibold text-[#387478]">
                            <Clock className="h-4 w-4" strokeWidth={2} />
                            <span>{project.duration}</span>
                          </div>
                          <div className="h-4 w-px bg-[#E2F1E7]"></div>
                          <div className="flex items-center gap-2 font-semibold text-[#387478]">
                            <Award className="h-4 w-4" strokeWidth={2} />
                            <span>{project.level}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Info */}
                      <div className="flex flex-col items-start gap-4 lg:items-end">
                        <div className="flex gap-3">
                          {project.featured && (
                            <div className="rounded-xl bg-gradient-to-r from-[#629584] to-[#387478] px-4 py-2 text-xs font-bold text-white uppercase shadow-lg">
                              مميز
                            </div>
                          )}
                          {project.urgent && (
                            <div className="flex items-center gap-2 rounded-xl bg-[#243642] px-4 py-2 text-xs font-bold text-white uppercase shadow-lg">
                              <Zap className="h-4 w-4" fill="white" />
                              عاجل
                            </div>
                          )}
                        </div>

                        <div className="text-left lg:text-right">
                          <p className="mb-2 text-5xl font-black text-[#243642]">
                            {project.budget.type === 'fixed'
                              ? `${(project.budget.amount / 1000).toFixed(0)}K`
                              : `${project.budget.min}-${project.budget.max}`}
                          </p>
                          <p className="text-sm font-bold text-[#629584]">
                            {project.budget.type === 'fixed' ? 'ريال سعودي' : 'ر.س/ساعة'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-6 flex flex-wrap gap-2 border-b-2 border-[#E2F1E7] pb-6">
                      {project.skills.map((skill, i) => (
                        <motion.span
                          key={i}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="cursor-pointer rounded-xl bg-[#E2F1E7] px-4 py-2 text-sm font-bold text-[#387478] transition-all hover:bg-gradient-to-r hover:from-[#387478] hover:to-[#629584] hover:text-white"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 font-semibold text-[#629584]">
                          <Users className="h-5 w-5" strokeWidth={2} />
                          <span>{project.proposals} عرض</span>
                        </div>
                        <div className="flex items-center gap-2 font-semibold text-[#629584]">
                          <Eye className="h-5 w-5" strokeWidth={2} />
                          <span>{project.views} مشاهدة</span>
                        </div>
                        <div className="flex items-center gap-2 font-semibold text-[#629584]">
                          <Clock className="h-5 w-5" strokeWidth={2} />
                          <span>منذ {project.posted}</span>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#387478] to-[#629584] px-8 py-4 font-bold text-white shadow-xl transition-all hover:shadow-2xl"
                      >
                        <span>قدّم عرضك الآن</span>
                        <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-xl border-2 border-[#387478] px-12 py-4 font-bold text-[#387478] transition-all hover:bg-[#387478] hover:text-white"
            >
              عرض المزيد من المشاريع
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Talents - Premium Cards */}
      <section className="bg-gradient-to-b from-white to-[#E2F1E7] py-24">
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="mb-6 inline-flex items-center gap-3 rounded-full border-2 border-[#387478]/20 bg-gradient-to-r from-[#387478]/10 to-[#629584]/10 px-6 py-3"
            >
              <Users className="h-5 w-5 text-[#387478]" />
              <span className="text-sm font-bold tracking-wider text-[#387478] uppercase">
                المحترفون المميزون
              </span>
            </motion.div>

            <h2 className="mb-6 text-5xl font-black text-[#243642] lg:text-7xl">
              أفضل المواهب في المنطقة
            </h2>
            <p className="mx-auto max-w-3xl text-xl font-semibold text-[#629584]">
              تواصل مع محترفين موثوقين حققوا آلاف المشاريع الناجحة
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {talents.map((talent, index) => (
              <motion.div
                key={talent.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-500 hover:shadow-2xl">
                  {/* Top Gradient Bar */}
                  <div className="relative h-32 overflow-hidden bg-gradient-to-br from-[#387478] to-[#629584]">
                    <div className="absolute inset-0 opacity-20">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `radial-gradient(circle at 30% 50%, white 1px, transparent 1px)`,
                          backgroundSize: '20px 20px',
                        }}
                      ></div>
                    </div>

                    {/* Badge */}
                    <div className="absolute top-4 right-4 rounded-lg bg-white/90 px-3 py-1 backdrop-blur-sm">
                      <span className="text-xs font-black text-[#387478] uppercase">
                        {talent.badge}
                      </span>
                    </div>
                  </div>

                  <div className="relative px-6 pb-8">
                    {/* Avatar */}
                    <div className="relative -mt-16 mb-6">
                      <div className="mx-auto h-32 w-32 overflow-hidden rounded-2xl border-4 border-white bg-gradient-to-br from-[#387478] to-[#629584] shadow-xl">
                        <div className="flex h-full w-full items-center justify-center bg-white/10 text-6xl backdrop-blur-sm">
                          {talent.name.charAt(0)}
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div
                        className={`absolute -bottom-2 left-1/2 -translate-x-1/2 transform rounded-full px-4 py-1 text-xs font-bold ${
                          talent.availability === 'متاح'
                            ? 'bg-[#629584] text-white'
                            : 'bg-[#E2F1E7] text-[#387478]'
                        }`}
                      >
                        {talent.availability}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="mb-6 text-center">
                      <h3 className="mb-2 text-2xl font-black text-[#243642]">{talent.name}</h3>
                      <p className="mb-1 text-sm font-bold text-[#629584]">{talent.title}</p>
                      <p className="flex items-center justify-center gap-1 text-xs font-semibold text-[#387478]">
                        <MapPin className="h-3 w-3" />
                        {talent.location}
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="mb-6 flex items-center justify-center gap-3 border-b-2 border-[#E2F1E7] pb-6">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-[#629584] text-[#629584]" />
                        <span className="text-2xl font-black text-[#243642]">{talent.rating}</span>
                      </div>
                      <span className="text-sm font-bold text-[#629584]">
                        ({talent.reviews} تقييم)
                      </span>
                    </div>

                    {/* Stats Grid */}
                    <div className="mb-6 grid grid-cols-2 gap-4">
                      <div className="rounded-xl bg-[#E2F1E7] p-4 text-center">
                        <p className="mb-1 text-3xl font-black text-[#387478]">
                          {talent.completedJobs}
                        </p>
                        <p className="text-xs font-bold text-[#629584]">مشروع</p>
                      </div>
                      <div className="rounded-xl bg-[#E2F1E7] p-4 text-center">
                        <p className="mb-1 text-3xl font-black text-[#387478]">
                          {talent.hourlyRate}
                        </p>
                        <p className="text-xs font-bold text-[#629584]">ر.س/ساعة</p>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-6 flex flex-wrap justify-center gap-2">
                      {talent.skills.slice(0, 3).map((skill, i) => (
                        <span
                          key={i}
                          className="rounded-lg bg-[#E2F1E7] px-3 py-1 text-xs font-bold text-[#387478]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full rounded-xl bg-gradient-to-r from-[#387478] to-[#629584] py-3 font-bold text-white shadow-lg transition-all hover:shadow-xl"
                    >
                      عرض الملف الشخصي
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Bold & Modern */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#243642] via-[#387478] to-[#243642] py-32">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 50%, #629584 0%, transparent 50%),
                               radial-gradient(circle at 70% 70%, #E2F1E7 0%, transparent 50%)`,
              backgroundSize: '200% 200%',
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-screen-2xl px-6 lg:px-12">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="mx-auto mb-12 flex h-32 w-32 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-xl"
            >
              <Rocket className="h-16 w-16 text-white" strokeWidth={2} />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 text-6xl leading-tight font-black text-white lg:text-8xl"
            >
              هل أنت مستعد
              <br />
              <span className="bg-gradient-to-r from-[#629584] to-[#E2F1E7] bg-clip-text text-transparent">
                للبدء؟
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mx-auto mb-16 max-w-4xl text-2xl leading-relaxed font-semibold text-[#E2F1E7] lg:text-3xl"
            >
              انضم إلى أكبر منصة عمل حر في المنطقة واصنع مستقبلك المهني اليوم
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col justify-center gap-6 sm:flex-row"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hover:shadow-3xl rounded-xl bg-white px-12 py-5 text-lg font-black text-[#243642] shadow-2xl transition-all"
              >
                ابدأ كمحترف
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-xl border-2 border-white px-12 py-5 text-lg font-black text-white transition-all hover:bg-white hover:text-[#243642]"
              >
                ابدأ كعميل
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-16 flex flex-wrap items-center justify-center gap-8 border-t border-white/20 pt-16"
            >
              {[
                { icon: <Shield />, label: 'دفع آمن 100%' },
                { icon: <CheckCircle />, label: 'محترفون موثوقون' },
                { icon: <Headphones />, label: 'دعم 24/7' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                    {React.cloneElement(item.icon, {
                      className: 'w-6 h-6 text-white',
                      strokeWidth: 2,
                    })}
                  </div>
                  <span className="font-bold text-white">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer - Comprehensive */}
      <footer className="border-t-4 border-[#E2F1E7] bg-white py-20">
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
          <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#387478] to-[#629584] shadow-xl">
                  <Zap className="h-8 w-8 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-[#243642]">FreelanceHub</h3>
                  <p className="text-sm font-bold text-[#629584]">منصة العمل الحر الذكية</p>
                </div>
              </div>

              <p className="mb-8 max-w-md leading-relaxed font-semibold text-[#629584]">
                نربط أفضل المواهب في الوطن العربي بأهم الفرص العالمية. انضم لآلاف المحترفين والشركات
                الناجحة.
              </p>

              <div className="flex gap-3">
                {[
                  { icon: <Twitter />, color: 'from-blue-400 to-blue-600' },
                  { icon: <Instagram />, color: 'from-pink-500 to-purple-600' },
                  { icon: <Linkedin />, color: 'from-blue-600 to-blue-800' },
                  { icon: <Facebook />, color: 'from-blue-500 to-blue-700' },
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`h-12 w-12 rounded-xl bg-gradient-to-br ${social.color} flex items-center justify-center shadow-lg transition-all hover:shadow-xl`}
                  >
                    {React.cloneElement(social.icon, {
                      className: 'w-5 h-5 text-white',
                      strokeWidth: 2,
                    })}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              { title: 'الشركة', links: ['من نحن', 'المدونة', 'الوظائف', 'الأخبار', 'الشركاء'] },
              { title: 'الخدمات', links: ['للمحترفين', 'للشركات', 'الباقات', 'API', 'التطبيق'] },
              { title: 'الدعم', links: ['المساعدة', 'تواصل معنا', 'الشروط', 'الخصوصية', 'الأمان'] },
            ].map((column, i) => (
              <div key={i}>
                <h4 className="mb-6 text-lg font-black tracking-wider text-[#243642] uppercase">
                  {column.title}
                </h4>
                <ul className="space-y-4">
                  {column.links.map((link, j) => (
                    <li key={j}>
                      <motion.a
                        href="#"
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 font-semibold text-[#629584] transition-colors hover:text-[#387478]"
                      >
                        <ChevronRight className="h-4 w-4" strokeWidth={2} />
                        {link}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="flex flex-col items-center justify-between gap-6 border-t-2 border-[#E2F1E7] pt-8 md:flex-row">
            <p className="font-semibold text-[#629584]">
              © 2025 FreelanceHub. جميع الحقوق محفوظة.
            </p>

            <div className="flex gap-6">
              {['الخصوصية', 'الشروط', 'ملفات تعريف الارتباط'].map((link, i) => (
                <a
                  key={i}
                  href="#"
                  className="font-semibold text-[#629584] transition-colors hover:text-[#387478]"
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

export default ModernFreelancePlatform;
