'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Clock,
  Award,
  ChevronRight,
  Play,
  Menu,
  X,
  Globe,
  Briefcase,
  Code,
  Palette,
  Megaphone,
  Package,
  Sparkles,
  Target,
  BarChart3,
  MessageCircle,
  FileText,
  DollarSign,
  Rocket,
  Heart,
  Trophy,
  Coffee,
  Laptop,
  PenTool,
  Camera,
  Music,
  BookOpen,
  Lightbulb,
  Crown,
  Layers,
  Box,
  Cpu,
  Database,
  LineChart,
  PieChart,
  Activity,
  Radio,
  Wifi,
  Compass,
  Map,
  Navigation,
  Smile,
  ThumbsUp,
  Gem,
  Gift,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function EarthyPlatform() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredService, setHoveredService] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    {
      name: 'تطوير البرمجيات',
      icon: <Code className="h-6 w-6" />,
      projects: '2,847',
      color: 'from-[#C08872] to-[#8B6F47]',
      bg: 'bg-[#F5E6D3]/20',
      border: 'border-[#C08872]',
      text: 'text-[#8B6F47]',
    },
    {
      name: 'تصميم إبداعي',
      icon: <Palette className="h-6 w-6" />,
      projects: '3,921',
      color: 'from-[#C9897B] to-[#B86F5E]',
      bg: 'bg-[#C9897B]/10',
      border: 'border-[#C9897B]',
      text: 'text-[#C9897B]',
    },
    {
      name: 'تسويق رقمي',
      icon: <Megaphone className="h-6 w-6" />,
      projects: '1,653',
      color: 'from-[#D4A574] to-[#C08872]',
      bg: 'bg-[#F5E6D3]/30',
      border: 'border-[#D4A574]',
      text: 'text-[#8B6F47]',
    },
    {
      name: 'كتابة محتوى',
      icon: <FileText className="h-6 w-6" />,
      projects: '4,285',
      color: 'from-[#8B6F47] to-[#6B5638]',
      bg: 'bg-[#8B6F47]/10',
      border: 'border-[#8B6F47]',
      text: 'text-[#8B6F47]',
    },
    {
      name: 'استشارات أعمال',
      icon: <Briefcase className="h-6 w-6" />,
      projects: '987',
      color: 'from-[#C08872] to-[#D4A574]',
      bg: 'bg-[#C08872]/10',
      border: 'border-[#C08872]',
      text: 'text-[#C08872]',
    },
    {
      name: 'تحليل البيانات',
      icon: <Database className="h-6 w-6" />,
      projects: '1,432',
      color: 'from-[#C9897B] to-[#8B6F47]',
      bg: 'bg-[#C9897B]/10',
      border: 'border-[#C9897B]',
      text: 'text-[#C9897B]',
    },
  ];

  const topFreelancers = [
    {
      name: 'محمد العلي',
      specialty: 'مطور Full Stack',
      avatar: '👨‍💻',
      rating: 4.9,
      projects: 247,
      hourlyRate: 350,
      color: 'from-[#C9897B] to-[#B86F5E]',
      badge: 'نجم صاعد',
    },
    {
      name: 'سارة أحمد',
      specialty: 'مصممة UI/UX',
      avatar: '👩‍🎨',
      rating: 5.0,
      projects: 189,
      hourlyRate: 280,
      color: 'from-[#D4A574] to-[#C08872]',
      badge: 'محترف معتمد',
    },
    {
      name: 'خالد الشمري',
      specialty: 'مسوق رقمي',
      avatar: '👨‍💼',
      rating: 4.8,
      projects: 156,
      hourlyRate: 220,
      color: 'from-[#C08872] to-[#8B6F47]',
      badge: 'خبير تسويق',
    },
  ];

  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'حماية الدفع',
      description: 'لا تدفع حتى تستلم العمل المكتمل وتراجعه بالكامل',
      gradient: 'from-[#C9897B] to-[#B86F5E]',
      iconBg: 'bg-[#C9897B]/10',
      iconColor: 'text-[#C9897B]',
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'محترفون موثوقون',
      description: 'جميع المستقلين تم التحقق منهم ومراجعة أعمالهم السابقة',
      gradient: 'from-[#F5E6D3] to-[#D4A574]',
      iconBg: 'bg-[#F5E6D3]/50',
      iconColor: 'text-[#8B6F47]',
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: 'تسليم سريع',
      description: 'احصل على عروض خلال دقائق وابدأ العمل فوراً',
      gradient: 'from-[#C08872] to-[#8B6F47]',
      iconBg: 'bg-[#C08872]/10',
      iconColor: 'text-[#C08872]',
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'ضمان الجودة',
      description: 'مراجعات حقيقية ونظام تقييم شفاف لضمان أفضل النتائج',
      gradient: 'from-[#8B6F47] to-[#6B5638]',
      iconBg: 'bg-[#8B6F47]/10',
      iconColor: 'text-[#8B6F47]',
    },
  ];

  const howItWorks = [
    {
      number: '01',
      title: 'صف مشروعك',
      description: 'اكتب تفاصيل واضحة عن المشروع والمتطلبات',
      icon: <FileText className="h-7 w-7" />,
      color: 'from-[#C9897B] to-[#B86F5E]',
    },
    {
      number: '02',
      title: 'استقبل العروض',
      description: 'المحترفون يتنافسون لتقديم أفضل عرض لك',
      icon: <Users className="h-7 w-7" />,
      color: 'from-[#F5E6D3] to-[#D4A574]',
    },
    {
      number: '03',
      title: 'اختر المناسب',
      description: 'قارن الملفات والأسعار واختر الأنسب',
      icon: <Target className="h-7 w-7" />,
      color: 'from-[#C08872] to-[#8B6F47]',
    },
    {
      number: '04',
      title: 'استلم العمل',
      description: 'راجع النتائج وأطلق الدفع عند رضاك التام',
      icon: <CheckCircle className="h-7 w-7" />,
      color: 'from-[#8B6F47] to-[#6B5638]',
    },
  ];

  const stats = [
    {
      value: '50K+',
      label: 'مشروع منجز',
      icon: <CheckCircle className="h-5 w-5" />,
      color: 'text-[#C9897B]',
    },
    {
      value: '15K+',
      label: 'عميل راضٍ',
      icon: <Heart className="h-5 w-5" />,
      color: 'text-[#C08872]',
    },
    {
      value: '8K+',
      label: 'محترف نشط',
      icon: <Users className="h-5 w-5" />,
      color: 'text-[#D4A574]',
    },
    {
      value: '99%',
      label: 'معدل النجاح',
      icon: <TrendingUp className="h-5 w-5" />,
      color: 'text-[#8B6F47]',
    },
  ];

  const testimonials = [
    {
      name: 'أحمد البلوشي',
      role: 'مدير منتج',
      company: 'تقنية السحاب',
      avatar: '🧑‍💼',
      content: 'تجربة رائعة! وجدت مطوراً ممتازاً أنجز مشروعي في الوقت المحدد بجودة عالية.',
      rating: 5,
      project: 'تطبيق جوال',
      color: 'from-[#C9897B] to-[#B86F5E]',
    },
    {
      name: 'نورة القحطاني',
      role: 'مديرة تسويق',
      company: 'براند ستوديو',
      avatar: '👩‍💼',
      content:
        'المنصة سهلة الاستخدام والمحترفون على مستوى عالٍ. حصلت على تصاميم إبداعية فاقت توقعاتي.',
      rating: 5,
      project: 'هوية بصرية',
      color: 'from-[#D4A574] to-[#C08872]',
    },
    {
      name: 'عبدالله السعيد',
      role: 'رائد أعمال',
      company: 'ستارت آب',
      avatar: '🚀',
      content: 'منصة موثوقة وفرت علي الكثير من الوقت والجهد. الأسعار منافسة والجودة ممتازة.',
      rating: 5,
      project: 'موقع إلكتروني',
      color: 'from-[#C08872] to-[#8B6F47]',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5E6D3]" dir="rtl">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 h-96 w-96 animate-pulse rounded-full bg-[#C9897B]/20 mix-blend-multiply blur-3xl filter"></div>
        <div
          className="absolute right-1/4 bottom-0 h-96 w-96 animate-pulse rounded-full bg-[#C08872]/20 mix-blend-multiply blur-3xl filter"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 h-96 w-96 animate-pulse rounded-full bg-[#D4A574]/20 mix-blend-multiply blur-3xl filter"
          style={{ animationDelay: '4s' }}
        ></div>
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrollY > 20 ? 'bg-white/95 shadow-lg backdrop-blur-sm' : 'bg-white/80 backdrop-blur-md'
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#C9897B] to-[#B86F5E] shadow-lg">
                  <Layers className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-[#C08872]"></div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#8B6F47]">منصة العمل</div>
                <div className="text-xs text-[#C08872]">احترافية بلا حدود</div>
              </div>
            </div>

            <div className="hidden items-center gap-8 lg:flex">
              {['الرئيسية', 'الفئات', 'المحترفون', 'كيف تعمل', 'المدونة'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="group relative font-medium text-[#8B6F47] transition-colors hover:text-[#C9897B]"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#C9897B] transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            <div className="hidden items-center gap-4 lg:flex">
              <button className="px-5 py-2 font-medium text-[#8B6F47] transition-colors hover:text-[#C9897B]">
                تسجيل الدخول
              </button>
              <button className="rounded-lg bg-gradient-to-r from-[#C9897B] to-[#B86F5E] px-6 py-2.5 font-medium text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg">
                إنشاء حساب
              </button>
            </div>

            <button
              className="text-[#8B6F47] lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="relative px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C08872]/20 bg-white px-4 py-2 shadow-md"
              >
                <div className="h-2 w-2 animate-pulse rounded-full bg-[#C08872]"></div>
                <Activity className="h-4 w-4 text-[#C9897B]" />
                <span className="text-sm font-semibold text-[#8B6F47]">632 مشروع نشط الآن</span>
              </motion.div>

              <h1 className="mb-6 text-5xl leading-tight font-bold text-[#8B6F47] lg:text-6xl">
                ابحث عن أفضل
                <span className="mt-2 block bg-gradient-to-r from-[#C9897B] via-[#C08872] to-[#8B6F47] bg-clip-text text-transparent">
                  المحترفين المستقلين
                </span>
              </h1>

              <p className="mb-8 text-xl leading-relaxed text-[#8B6F47]/80">
                تواصل مع آلاف المحترفين الموهوبين. انجز مشاريعك بجودة عالية وأسعار تنافسية.
              </p>

              <div className="mb-10 flex flex-col gap-4 sm:flex-row">
                <button className="group flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#C9897B] to-[#B86F5E] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
                  ابدأ مشروعك الآن
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                <button className="flex items-center justify-center gap-2 rounded-lg border-2 border-[#C08872]/30 bg-white px-8 py-4 text-lg font-semibold text-[#8B6F47] shadow-md transition-all hover:border-[#C9897B]">
                  <Play className="h-5 w-5" />
                  شاهد الفيديو
                </button>
              </div>

              <div className="flex items-center gap-8">
                <div className="flex -space-x-2">
                  {['🧑‍💻', '👩‍🎨', '👨‍💼', '👩‍💻', '🧑‍🎨'].map((emoji, i) => (
                    <div
                      key={i}
                      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-[#F5E6D3] to-[#D4A574] shadow-md"
                    >
                      <span className="text-lg">{emoji}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-[#D4A574] text-[#D4A574]" />
                    ))}
                  </div>
                  <p className="text-sm text-[#8B6F47]/70">
                    تقييم <span className="font-bold text-[#8B6F47]">4.9/5</span> من 15,000+ عميل
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl border border-[#C08872]/20 bg-white p-6 shadow-2xl">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#8B6F47]">أفضل المحترفين</h3>
                  <button className="text-sm font-semibold text-[#C9897B] hover:text-[#C08872]">
                    عرض الكل
                  </button>
                </div>

                <div className="space-y-4">
                  {topFreelancers.map((freelancer, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="group cursor-pointer rounded-xl border border-[#C08872]/20 bg-[#F5E6D3]/30 p-4 transition-all hover:border-[#C9897B] hover:shadow-md"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`relative h-14 w-14 bg-gradient-to-br ${freelancer.color} flex items-center justify-center rounded-xl text-2xl shadow-md transition-transform group-hover:scale-105`}
                        >
                          {freelancer.avatar}
                          <div className="absolute -right-1 -bottom-1 h-4 w-4 rounded-full border-2 border-white bg-[#C08872]"></div>
                        </div>
                        <div className="flex-1">
                          <div className="mb-1 flex items-center justify-between">
                            <h4 className="font-bold text-[#8B6F47]">{freelancer.name}</h4>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-[#D4A574] text-[#D4A574]" />
                              <span className="text-sm font-semibold text-[#8B6F47]">
                                {freelancer.rating}
                              </span>
                            </div>
                          </div>
                          <p className="mb-2 text-sm text-[#8B6F47]/70">{freelancer.specialty}</p>
                          <div className="flex items-center justify-between">
                            <span className="rounded-full border border-[#C08872]/30 bg-white px-2 py-1 text-xs font-medium text-[#8B6F47]">
                              {freelancer.badge}
                            </span>
                            <div className="text-sm">
                              <span className="font-bold text-[#8B6F47]">
                                {freelancer.hourlyRate} ر.س
                              </span>
                              <span className="text-[#8B6F47]/60">/ساعة</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <button className="mt-4 w-full rounded-lg bg-gradient-to-r from-[#C9897B] to-[#B86F5E] py-3 font-semibold text-white transition-all hover:shadow-lg">
                  تصفح المزيد من المحترفين
                </button>
              </div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: 'spring' }}
                className="absolute -right-4 -bottom-4 rounded-xl border border-[#C08872]/20 bg-white p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#C08872] to-[#8B6F47]">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#8B6F47]">50K+</div>
                    <div className="text-sm text-[#8B6F47]/70">مشروع مكتمل</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-[#C08872]/20 bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group text-center"
              >
                <div
                  className={`mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#F5E6D3]/50 transition-transform group-hover:scale-110 ${stat.color}`}
                >
                  {stat.icon}
                </div>
                <div className="mb-1 text-4xl font-bold text-[#8B6F47]">{stat.value}</div>
                <div className="text-[#8B6F47]/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C08872]/20 bg-white px-4 py-2 shadow-md"
            >
              <Compass className="h-4 w-4 text-[#C9897B]" />
              <span className="text-sm font-semibold text-[#8B6F47]">استكشف الفئات</span>
            </motion.div>
            <h2 className="mb-4 text-4xl font-bold text-[#8B6F47]">
              ابحث في كل{' '}
              <span className="bg-gradient-to-r from-[#C9897B] to-[#C08872] bg-clip-text text-transparent">
                التخصصات
              </span>
            </h2>
            <p className="text-xl text-[#8B6F47]/70">آلاف المحترفين جاهزون لمساعدتك في أي مجال</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setHoveredService(i)}
                onMouseLeave={() => setHoveredService(null)}
                className={`cursor-pointer rounded-xl border-2 bg-white p-6 transition-all ${
                  hoveredService === i
                    ? `${category.border} -translate-y-1 shadow-xl`
                    : 'border-[#C08872]/20 shadow-md'
                }`}
              >
                <div
                  className={`h-14 w-14 bg-gradient-to-br ${category.color} mb-4 flex items-center justify-center rounded-xl text-white shadow-md ${hoveredService === i ? 'scale-110' : ''} transition-transform`}
                >
                  {category.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold text-[#8B6F47]">{category.name}</h3>
                <p className="mb-4 text-[#8B6F47]/70">{category.projects} مشروع متاح</p>
                <button
                  className={`flex items-center gap-2 ${category.text} font-semibold transition-all hover:gap-3`}
                >
                  استكشف المزيد
                  <ChevronRight className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gradient-to-br from-[#F5E6D3] to-[#F5E6D3]/50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-[#8B6F47]">
              لماذا تختار{' '}
              <span className="bg-gradient-to-r from-[#C9897B] to-[#C08872] bg-clip-text text-transparent">
                منصتنا
              </span>
              ؟
            </h2>
            <p className="text-xl text-[#8B6F47]/70">نوفر لك تجربة استثنائية وآمنة</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="rounded-xl border border-[#C08872]/20 bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className={`h-16 w-16 ${feature.iconBg} mb-4 flex items-center justify-center rounded-xl ${feature.iconColor}`}
                >
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-[#8B6F47]">{feature.title}</h3>
                <p className="leading-relaxed text-[#8B6F47]/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-[#8B6F47]">
              كيف{' '}
              <span className="bg-gradient-to-r from-[#C9897B] to-[#C08872] bg-clip-text text-transparent">
                تعمل المنصة
              </span>
              ؟
            </h2>
            <p className="text-xl text-[#8B6F47]/70">أربع خطوات بسيطة لإنجاز مشروعك</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative"
              >
                {i < howItWorks.length - 1 && (
                  <div className="absolute top-16 left-full z-0 -ml-4 hidden h-0.5 w-full bg-gradient-to-r from-[#C08872]/30 to-transparent lg:block"></div>
                )}
                <div className="group relative rounded-xl border-2 border-[#C08872]/20 bg-[#F5E6D3]/30 p-6 transition-all hover:border-[#C9897B] hover:shadow-lg">
                  <div
                    className={`absolute -top-4 -right-4 h-12 w-12 bg-gradient-to-br ${step.color} flex items-center justify-center rounded-lg text-xl font-bold text-white shadow-lg transition-transform group-hover:scale-110`}
                  >
                    {step.number}
                  </div>
                  <div className="mt-4 mb-4 flex h-14 w-14 items-center justify-center rounded-lg border-2 border-[#C08872]/20 bg-white text-[#8B6F47] shadow-sm">
                    {step.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-[#8B6F47]">{step.title}</h3>
                  <p className="leading-relaxed text-[#8B6F47]/70">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-br from-[#F5E6D3] to-[#F5E6D3]/50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-[#8B6F47]">
              ماذا يقول{' '}
              <span className="bg-gradient-to-r from-[#C9897B] to-[#C08872] bg-clip-text text-transparent">
                عملاؤنا
              </span>
            </h2>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className={`bg-gradient-to-br ${testimonials[currentTestimonial].color} rounded-2xl p-10 text-white shadow-2xl`}
              >
                <div className="mb-6 flex gap-1">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-white text-white" />
                  ))}
                </div>
                <p className="mb-8 text-xl leading-relaxed">
                  {testimonials[currentTestimonial].content}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/20 text-3xl backdrop-blur-sm">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <div>
                    <div className="text-lg font-bold">{testimonials[currentTestimonial].name}</div>
                    <div className="text-sm text-white/90">
                      {testimonials[currentTestimonial].role}
                    </div>
                    <div className="text-xs text-white/70">
                      {testimonials[currentTestimonial].company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex justify-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === currentTestimonial
                      ? 'w-8 bg-[#C9897B]'
                      : 'w-2 bg-[#C08872]/30 hover:bg-[#C08872]/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#C9897B] via-[#C08872] to-[#8B6F47] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-5xl font-bold text-white">جاهز لبدء مشروعك؟</h2>
            <p className="mb-10 text-xl text-white/90">
              انضم لآلاف العملاء الراضين واحصل على أفضل النتائج
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button className="rounded-lg bg-white px-10 py-4 text-lg font-bold text-[#8B6F47] shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl">
                ابدأ الآن مجاناً
              </button>
              <button className="rounded-lg border-2 border-white/50 bg-white/10 px-10 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20">
                تواصل معنا
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#8B6F47] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#C9897B] to-[#B86F5E]">
                  <Layers className="h-5 w-5 text-white" />
                </div>
                <div className="text-xl font-bold">منصة العمل</div>
              </div>
              <p className="mb-6 leading-relaxed text-white/80">
                نربط المواهب بالفرص، ونساعد الأعمال على النمو من خلال توفير أفضل المحترفين
                المستقلين.
              </p>
              <div className="flex gap-3">
                {['X', 'in', 'YT', 'IG'].map((social, i) => (
                  <button
                    key={i}
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-[#C9897B]"
                  >
                    <span className="text-sm font-bold">{social}</span>
                  </button>
                ))}
              </div>
            </div>

            {[
              { title: 'الشركة', links: ['عن المنصة', 'المدونة', 'الوظائف', 'اتصل بنا'] },
              { title: 'الدعم', links: ['مركز المساعدة', 'الشروط', 'الخصوصية', 'الأمان'] },
            ].map((section, i) => (
              <div key={i}>
                <h4 className="mb-4 font-bold">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-white/80 transition-colors hover:text-white">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/20 pt-8 md:flex-row">
            <div className="text-white/80">© 2025 منصة العمل. جميع الحقوق محفوظة</div>
            <div className="flex gap-6">
              <a href="#" className="text-white/80 transition-colors hover:text-white">
                الشروط
              </a>
              <a href="#" className="text-white/80 transition-colors hover:text-white">
                الخصوصية
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default EarthyPlatform;
