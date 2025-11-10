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
  Headphones,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function SophisticatedPlatform() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredService, setHoveredService] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeTab, setActiveTab] = useState('all');

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
      color: 'from-[#7A8A7A] to-[#5F6F5F]',
      bg: 'bg-[#7A8A7A]/5',
      border: 'border-[#7A8A7A]',
      text: 'text-[#7A8A7A]',
      description: 'تطبيقات ومواقع متطورة',
    },
    {
      name: 'تصميم إبداعي',
      icon: <Palette className="h-6 w-6" />,
      projects: '3,921',
      color: 'from-[#B5B299] to-[#9A9880]',
      bg: 'bg-[#B5B299]/10',
      border: 'border-[#B5B299]',
      text: 'text-[#7A8A7A]',
      description: 'هويات بصرية احترافية',
    },
    {
      name: 'تسويق رقمي',
      icon: <Megaphone className="h-6 w-6" />,
      projects: '1,653',
      color: 'from-[#7A8A7A] to-[#B5B299]',
      bg: 'bg-[#7A8A7A]/8',
      border: 'border-[#7A8A7A]',
      text: 'text-[#7A8A7A]',
      description: 'استراتيجيات تسويقية فعالة',
    },
    {
      name: 'كتابة محتوى',
      icon: <FileText className="h-6 w-6" />,
      projects: '4,285',
      color: 'from-[#C5C5C9] to-[#A5A5A9]',
      bg: 'bg-[#C5C5C9]/10',
      border: 'border-[#C5C5C9]',
      text: 'text-[#7A8A7A]',
      description: 'محتوى جذاب ومؤثر',
    },
    {
      name: 'استشارات أعمال',
      icon: <Briefcase className="h-6 w-6" />,
      projects: '987',
      color: 'from-[#7A8A7A] to-[#5F6F5F]',
      bg: 'bg-[#7A8A7A]/5',
      border: 'border-[#7A8A7A]',
      text: 'text-[#7A8A7A]',
      description: 'حلول استراتيجية متكاملة',
    },
    {
      name: 'تحليل البيانات',
      icon: <Database className="h-6 w-6" />,
      projects: '1,432',
      color: 'from-[#B5B299] to-[#7A8A7A]',
      bg: 'bg-[#B5B299]/8',
      border: 'border-[#B5B299]',
      text: 'text-[#7A8A7A]',
      description: 'رؤى تحليلية عميقة',
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
      color: 'from-[#7A8A7A] to-[#5F6F5F]',
      badge: 'خبير معتمد',
      available: true,
      skills: ['React', 'Node.js', 'MongoDB'],
    },
    {
      name: 'سارة أحمد',
      specialty: 'مصممة UI/UX',
      avatar: '👩‍🎨',
      rating: 5.0,
      projects: 189,
      hourlyRate: 280,
      color: 'from-[#B5B299] to-[#9A9880]',
      badge: 'نجم بلاتيني',
      available: true,
      skills: ['Figma', 'Adobe XD', 'Sketch'],
    },
    {
      name: 'خالد الشمري',
      specialty: 'مسوق رقمي',
      avatar: '👨‍💼',
      rating: 4.8,
      projects: 156,
      hourlyRate: 220,
      color: 'from-[#C5C5C9] to-[#A5A5A9]',
      badge: 'محترف معتمد',
      available: false,
      skills: ['SEO', 'SEM', 'Social Media'],
    },
  ];

  const features = [
    {
      icon: <Shield className="h-7 w-7" />,
      title: 'حماية متقدمة',
      description: 'نظام حماية متعدد الطبقات لضمان أمان معاملاتك المالية بالكامل',
      gradient: 'from-[#7A8A7A] to-[#5F6F5F]',
      iconBg: 'bg-[#7A8A7A]/10',
      iconColor: 'text-[#7A8A7A]',
    },
    {
      icon: <Users className="h-7 w-7" />,
      title: 'شبكة محترفين',
      description: 'أكثر من 15,000 محترف تم التحقق منهم بعناية في جميع المجالات',
      gradient: 'from-[#B5B299] to-[#9A9880]',
      iconBg: 'bg-[#B5B299]/10',
      iconColor: 'text-[#7A8A7A]',
    },
    {
      icon: <Zap className="h-7 w-7" />,
      title: 'سرعة التنفيذ',
      description: 'ابدأ مشروعك خلال ساعات واحصل على نتائج استثنائية في وقت قياسي',
      gradient: 'from-[#C5C5C9] to-[#A5A5A9]',
      iconBg: 'bg-[#C5C5C9]/10',
      iconColor: 'text-[#7A8A7A]',
    },
    {
      icon: <Award className="h-7 w-7" />,
      title: 'ضمان التميز',
      description: 'التزام كامل بالجودة مع إمكانية المراجعة والتعديل حتى الرضا التام',
      gradient: 'from-[#7A8A7A] to-[#B5B299]',
      iconBg: 'bg-[#7A8A7A]/8',
      iconColor: 'text-[#7A8A7A]',
    },
  ];

  const howItWorks = [
    {
      number: '01',
      title: 'حدد احتياجاتك',
      description: 'صف مشروعك بتفاصيل واضحة وحدد الميزانية والمدة الزمنية المناسبة',
      icon: <Target className="h-6 w-6" />,
      color: 'from-[#7A8A7A] to-[#5F6F5F]',
    },
    {
      number: '02',
      title: 'قارن العروض',
      description: 'استعرض مقترحات المحترفين وقارن الأسعار والخبرات السابقة',
      icon: <BarChart3 className="h-6 w-6" />,
      color: 'from-[#B5B299] to-[#9A9880]',
    },
    {
      number: '03',
      title: 'اختر الأفضل',
      description: 'اتخذ قرارك بناءً على التقييمات والملفات الشخصية المفصلة',
      icon: <CheckCircle className="h-6 w-6" />,
      color: 'from-[#C5C5C9] to-[#A5A5A9]',
    },
    {
      number: '04',
      title: 'راقب التقدم',
      description: 'تابع سير العمل خطوة بخطوة واستلم مشروعك بجودة عالية',
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'from-[#7A8A7A] to-[#B5B299]',
    },
  ];

  const stats = [
    {
      value: '50K+',
      label: 'مشروع مكتمل',
      icon: <CheckCircle className="h-5 w-5" />,
      color: 'text-[#7A8A7A]',
      bg: 'bg-[#7A8A7A]/5',
    },
    {
      value: '15K+',
      label: 'عميل سعيد',
      icon: <Smile className="h-5 w-5" />,
      color: 'text-[#7A8A7A]',
      bg: 'bg-[#B5B299]/10',
    },
    {
      value: '8K+',
      label: 'محترف نشط',
      icon: <Users className="h-5 w-5" />,
      color: 'text-[#7A8A7A]',
      bg: 'bg-[#C5C5C9]/10',
    },
    {
      value: '99%',
      label: 'رضا العملاء',
      icon: <ThumbsUp className="h-5 w-5" />,
      color: 'text-[#7A8A7A]',
      bg: 'bg-[#7A8A7A]/8',
    },
  ];

  const testimonials = [
    {
      name: 'أحمد البلوشي',
      role: 'مدير منتج',
      company: 'تقنية السحاب',
      avatar: '🧑‍💼',
      content:
        'تجربة استثنائية من البداية للنهاية. المنصة سهلة الاستخدام والمحترفون على مستوى عالمي من الاحترافية والالتزام.',
      rating: 5,
      project: 'تطبيق جوال',
      color: 'from-[#7A8A7A] to-[#5F6F5F]',
      image: '💼',
    },
    {
      name: 'نورة القحطاني',
      role: 'مديرة تسويق',
      company: 'براند ستوديو',
      avatar: '👩‍💼',
      content:
        'حصلت على تصاميم إبداعية فاقت كل توقعاتي. الجودة العالية والسرعة في التنفيذ جعلت العمل معهم تجربة ممتعة.',
      rating: 5,
      project: 'هوية بصرية',
      color: 'from-[#B5B299] to-[#9A9880]',
      image: '🎨',
    },
    {
      name: 'عبدالله السعيد',
      role: 'رائد أعمال',
      company: 'ستارت آب',
      avatar: '🚀',
      content:
        'منصة موثوقة بكل المقاييس. نظام الحماية والدفع الآمن يعطي ثقة كبيرة، والنتائج دائماً تتجاوز التوقعات.',
      rating: 5,
      project: 'موقع إلكتروني',
      color: 'from-[#C5C5C9] to-[#A5A5A9]',
      image: '🌐',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8E8EA] to-[#F0F0F2]" dir="rtl">
      <div className="pointer-events-none fixed inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #7A8A7A 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        ></div>
      </div>

      {/* Floating Elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-[#7A8A7A] mix-blend-multiply blur-3xl filter"
        ></motion.div>
        <motion.div
          animate={{
            y: [0, 20, 0],
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute right-1/4 bottom-20 h-96 w-96 rounded-full bg-[#B5B299] mix-blend-multiply blur-3xl filter"
        ></motion.div>
        <motion.div
          animate={{
            y: [0, -15, 0],
            opacity: [0.06, 0.1, 0.06],
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 4 }}
          className="absolute top-1/2 left-1/2 h-80 w-80 rounded-full bg-[#C5C5C9] mix-blend-multiply blur-3xl filter"
        ></motion.div>
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          scrollY > 20
            ? 'border-b border-[#7A8A7A]/10 bg-white/90 shadow-lg backdrop-blur-xl'
            : 'bg-white/70 backdrop-blur-md'
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="group relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7A8A7A] to-[#5F6F5F] shadow-lg transition-all duration-300 group-hover:shadow-xl">
                  <Layers className="h-7 w-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 h-3.5 w-3.5 animate-pulse rounded-full border-2 border-white bg-[#B5B299]"></div>
              </div>
              <div>
                <div className="bg-gradient-to-r from-[#7A8A7A] to-[#5F6F5F] bg-clip-text text-2xl font-bold text-transparent">
                  منصة النخبة
                </div>
                <div className="text-xs font-medium text-[#7A8A7A]/70">
                  حيث يلتقي الإبداع بالاحتراف
                </div>
              </div>
            </div>

            <div className="hidden items-center gap-10 lg:flex">
              {['الرئيسية', 'الفئات', 'المحترفون', 'المشاريع', 'المدونة'].map((item, i) => (
                <a
                  key={item}
                  href="#"
                  className="group relative py-2 font-medium text-[#7A8A7A] transition-colors hover:text-[#5F6F5F]"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[#7A8A7A] to-[#5F6F5F] transition-all duration-500 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            <div className="hidden items-center gap-4 lg:flex">
              <button className="group relative px-6 py-2.5 font-medium text-[#7A8A7A] transition-colors hover:text-[#5F6F5F]">
                تسجيل الدخول
                <span className="absolute inset-0 rounded-lg border border-[#7A8A7A]/20 transition-colors group-hover:border-[#7A8A7A]/40"></span>
              </button>
              <button className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-[#7A8A7A] to-[#5F6F5F] px-7 py-2.5 font-medium text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl">
                <span className="relative z-10">ابدأ الآن</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#5F6F5F] to-[#7A8A7A] opacity-0 transition-opacity group-hover:opacity-100"></div>
              </button>
            </div>

            <button
              className="p-2 text-[#7A8A7A] lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-36 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#7A8A7A]/10 bg-white/80 px-5 py-2.5 shadow-lg backdrop-blur-sm"
              >
                <div className="relative">
                  <div className="absolute h-2 w-2 animate-ping rounded-full bg-[#7A8A7A]"></div>
                  <div className="h-2 w-2 rounded-full bg-[#7A8A7A]"></div>
                </div>
                <Sparkles className="h-4 w-4 text-[#7A8A7A]" />
                <span className="text-sm font-semibold text-[#7A8A7A]">
                  632 مشروع نشط • 247 محترف متاح
                </span>
              </motion.div>

              <h1 className="mb-6 text-5xl leading-tight font-bold text-[#7A8A7A] lg:text-7xl">
                منصة
                <span className="mt-2 block bg-gradient-to-r from-[#7A8A7A] via-[#5F6F5F] to-[#B5B299] bg-clip-text text-transparent">
                  النخبة المحترفة
                </span>
              </h1>

              <p className="mb-10 max-w-xl text-xl leading-relaxed text-[#7A8A7A]/80">
                نربط أفضل المواهب بأصحاب الرؤى الطموحة. تجربة استثنائية تجمع بين الجودة العالية
                والثقة المطلقة.
              </p>

              <div className="mb-12 flex flex-col gap-5 sm:flex-row">
                <button className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-[#7A8A7A] to-[#5F6F5F] px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    ابدأ مشروعك الآن
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#5F6F5F] to-[#7A8A7A] opacity-0 transition-opacity group-hover:opacity-100"></div>
                </button>
                <button className="group flex items-center justify-center gap-3 rounded-xl border-2 border-[#7A8A7A]/20 bg-white px-8 py-4 text-lg font-semibold text-[#7A8A7A] shadow-lg transition-all hover:border-[#7A8A7A]/40 hover:shadow-xl">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7A8A7A]/5 transition-colors group-hover:bg-[#7A8A7A]/10">
                    <Play className="h-5 w-5" />
                  </div>
                  شاهد كيف نعمل
                </button>
              </div>

              <div className="flex items-center gap-10">
                <div className="flex -space-x-3">
                  {['🧑‍💻', '👩‍🎨', '👨‍💼', '👩‍💻', '🧑‍🎨'].map((emoji, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
                      className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-3 border-white bg-gradient-to-br from-white to-[#F0F0F2] shadow-lg transition-transform hover:scale-110"
                    >
                      <span className="text-xl">{emoji}</span>
                    </motion.div>
                  ))}
                </div>
                <div>
                  <div className="mb-1.5 flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-5 w-5 fill-[#B5B299] text-[#B5B299]" />
                    ))}
                  </div>
                  <p className="text-sm font-medium text-[#7A8A7A]/70">
                    تقييم <span className="font-bold text-[#7A8A7A]">4.9/5</span> • 15,247 مراجعة
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl border border-[#7A8A7A]/10 bg-white/80 p-8 shadow-2xl backdrop-blur-sm">
                <div className="absolute -top-4 -left-4 h-20 w-20 rounded-2xl bg-gradient-to-br from-[#7A8A7A] to-[#5F6F5F] opacity-20 blur-xl"></div>
                <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-2xl bg-gradient-to-br from-[#B5B299] to-[#9A9880] opacity-20 blur-xl"></div>

                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <h3 className="mb-1 text-xl font-bold text-[#7A8A7A]">المحترفون المميزون</h3>
                    <p className="text-sm text-[#7A8A7A]/60">متاحون للعمل الآن</p>
                  </div>
                  <button className="flex items-center gap-1 text-sm font-semibold text-[#7A8A7A] transition-colors hover:text-[#5F6F5F]">
                    عرض الكل
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  {topFreelancers.map((freelancer, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.15 }}
                      className="group relative cursor-pointer rounded-2xl border border-[#7A8A7A]/10 bg-gradient-to-br from-white to-[#F0F0F2]/50 p-5 transition-all hover:border-[#7A8A7A]/30 hover:shadow-xl"
                    >
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <div
                            className={`h-16 w-16 bg-gradient-to-br ${freelancer.color} flex items-center justify-center rounded-2xl text-3xl shadow-lg transition-transform group-hover:scale-105`}
                          >
                            {freelancer.avatar}
                          </div>
                          {freelancer.available && (
                            <div className="absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full border-3 border-white bg-[#7A8A7A]">
                              <div className="h-2 w-2 rounded-full bg-white"></div>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="mb-2 flex items-start justify-between">
                            <div>
                              <h4 className="mb-0.5 text-lg font-bold text-[#7A8A7A]">
                                {freelancer.name}
                              </h4>
                              <p className="text-sm text-[#7A8A7A]/70">{freelancer.specialty}</p>
                            </div>
                            <div className="flex items-center gap-1.5 rounded-full bg-[#7A8A7A]/5 px-3 py-1">
                              <Star className="h-4 w-4 fill-[#B5B299] text-[#B5B299]" />
                              <span className="text-sm font-bold text-[#7A8A7A]">
                                {freelancer.rating}
                              </span>
                            </div>
                          </div>
                          <div className="mb-3 flex flex-wrap gap-2">
                            {freelancer.skills.map((skill, idx) => (
                              <span
                                key={idx}
                                className="rounded-full border border-[#7A8A7A]/10 bg-white px-2.5 py-1 text-xs font-medium text-[#7A8A7A]/80"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="rounded-full border border-[#7A8A7A]/10 bg-gradient-to-r from-[#7A8A7A]/10 to-[#B5B299]/10 px-3 py-1.5 text-xs font-semibold text-[#7A8A7A]">
                              {freelancer.badge}
                            </span>
                            <div className="text-right">
                              <div className="text-lg font-bold text-[#7A8A7A]">
                                {freelancer.hourlyRate} ر.س
                              </div>
                              <div className="text-xs text-[#7A8A7A]/60">للساعة</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <button className="group relative mt-6 w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#7A8A7A] to-[#5F6F5F] py-4 font-semibold text-white transition-all hover:shadow-xl">
                  <span className="relative z-10">استكشف المزيد من المحترفين</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#5F6F5F] to-[#7A8A7A] opacity-0 transition-opacity group-hover:opacity-100"></div>
                </button>
              </div>

              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, type: 'spring' }}
                className="absolute -right-6 -bottom-6 rounded-2xl border border-[#7A8A7A]/10 bg-white p-5 shadow-2xl"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#B5B299] to-[#9A9880] shadow-lg">
                    <CheckCircle className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <div className="mb-1 text-3xl font-bold text-[#7A8A7A]">50K+</div>
                    <div className="text-sm font-medium text-[#7A8A7A]/70">مشروع منجز بنجاح</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-[#7A8A7A]/10 bg-white/60 px-4 py-20 backdrop-blur-sm sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
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
                <div
                  className={`inline-flex h-16 w-16 items-center justify-center ${stat.bg} mb-4 rounded-2xl transition-transform group-hover:scale-110 ${stat.color} shadow-lg`}
                >
                  {stat.icon}
                </div>
                <div className="mb-2 text-5xl font-bold text-[#7A8A7A]">{stat.value}</div>
                <div className="font-medium text-[#7A8A7A]/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#7A8A7A]/10 bg-white/80 px-5 py-2.5 shadow-lg backdrop-blur-sm"
            >
              <Compass className="h-5 w-5 text-[#7A8A7A]" />
              <span className="text-sm font-semibold text-[#7A8A7A]">استكشف التخصصات</span>
            </motion.div>
            <h2 className="mb-5 text-5xl font-bold text-[#7A8A7A]">
              تصفح{' '}
              <span className="bg-gradient-to-r from-[#7A8A7A] to-[#5F6F5F] bg-clip-text text-transparent">
                جميع المجالات
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-[#7A8A7A]/70">
              اكتشف آلاف المحترفين المتخصصين في مختلف المجالات والخدمات
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setHoveredService(i)}
                onMouseLeave={() => setHoveredService(null)}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl border-2 bg-white/80 p-8 backdrop-blur-sm transition-all duration-500 ${
                  hoveredService === i
                    ? `${category.border} -translate-y-2 shadow-2xl`
                    : 'border-[#7A8A7A]/10 shadow-lg hover:shadow-xl'
                }`}
              >
                <div
                  className={`absolute top-0 right-0 h-32 w-32 bg-gradient-to-br ${category.color} -mt-16 -mr-16 rounded-full opacity-5 transition-transform duration-500 group-hover:scale-150`}
                ></div>

                <div
                  className={`relative h-16 w-16 bg-gradient-to-br ${category.color} mb-5 flex items-center justify-center rounded-2xl text-white shadow-xl ${hoveredService === i ? 'scale-110 rotate-6' : ''} transition-all duration-300`}
                >
                  {category.icon}
                </div>

                <h3 className="mb-2 text-2xl font-bold text-[#7A8A7A]">{category.name}</h3>
                <p className="mb-4 text-sm text-[#7A8A7A]/60">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[#7A8A7A]/70">{category.projects} مشروع</span>
                  <button
                    className={`flex items-center gap-2 ${category.text} text-sm font-semibold transition-all group-hover:gap-3`}
                  >
                    استكشف
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gradient-to-br from-white/80 to-[#F0F0F2]/80 px-4 py-24 backdrop-blur-sm sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-5 text-5xl font-bold text-[#7A8A7A]">
              لماذا{' '}
              <span className="bg-gradient-to-r from-[#7A8A7A] to-[#5F6F5F] bg-clip-text text-transparent">
                منصة النخبة
              </span>
              ؟
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-[#7A8A7A]/70">
              نقدم تجربة استثنائية تجمع بين الأمان والجودة والسرعة
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group rounded-2xl border border-[#7A8A7A]/10 bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all hover:-translate-y-2 hover:shadow-2xl"
              >
                <div
                  className={`h-16 w-16 ${feature.iconBg} mb-6 flex items-center justify-center rounded-2xl ${feature.iconColor} shadow-md transition-transform group-hover:scale-110`}
                >
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-[#7A8A7A]">{feature.title}</h3>
                <p className="leading-relaxed text-[#7A8A7A]/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-5 text-5xl font-bold text-[#7A8A7A]">
              كيف{' '}
              <span className="bg-gradient-to-r from-[#7A8A7A] to-[#5F6F5F] bg-clip-text text-transparent">
                نعمل معاً
              </span>
              ؟
            </h2>
            <p className="text-xl text-[#7A8A7A]/70">عملية بسيطة وواضحة في أربع خطوات</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group relative"
              >
                {i < howItWorks.length - 1 && (
                  <div className="absolute top-20 left-full z-0 -ml-4 hidden h-0.5 w-full bg-gradient-to-r from-[#7A8A7A]/30 via-[#B5B299]/20 to-transparent lg:block"></div>
                )}
                <div className="relative rounded-2xl border-2 border-[#7A8A7A]/10 bg-white/80 p-8 backdrop-blur-sm transition-all group-hover:-translate-y-1 hover:border-[#7A8A7A]/30 hover:shadow-2xl">
                  <div
                    className={`absolute -top-5 -right-5 h-14 w-14 bg-gradient-to-br ${step.color} flex items-center justify-center rounded-xl text-2xl font-bold text-white shadow-xl transition-transform group-hover:scale-110`}
                  >
                    {step.number}
                  </div>
                  <div className="mt-6 mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-[#7A8A7A]/10 bg-[#7A8A7A]/5 text-[#7A8A7A] shadow-sm transition-colors group-hover:bg-[#7A8A7A]/10">
                    {step.icon}
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-[#7A8A7A]">{step.title}</h3>
                  <p className="leading-relaxed text-[#7A8A7A]/70">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-br from-white/80 to-[#F0F0F2]/80 px-4 py-24 backdrop-blur-sm sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-5 text-5xl font-bold text-[#7A8A7A]">
              قصص{' '}
              <span className="bg-gradient-to-r from-[#7A8A7A] to-[#5F6F5F] bg-clip-text text-transparent">
                النجاح
              </span>
            </h2>
            <p className="text-xl text-[#7A8A7A]/70">تجارب حقيقية من عملائنا المميزين</p>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className={`relative bg-gradient-to-br ${testimonials[currentTestimonial].color} overflow-hidden rounded-3xl p-12 text-white shadow-2xl`}
              >
                <div className="absolute top-0 right-0 -mt-32 -mr-32 h-64 w-64 rounded-full bg-white/5"></div>
                <div className="absolute bottom-0 left-0 -mb-24 -ml-24 h-48 w-48 rounded-full bg-white/5"></div>

                <div className="relative z-10">
                  <div className="mb-8 flex gap-1.5">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 fill-white text-white" />
                    ))}
                  </div>

                  <div className="mb-6 text-6xl opacity-30">"</div>
                  <p className="mb-10 text-2xl leading-relaxed font-light">
                    {testimonials[currentTestimonial].content}
                  </p>

                  <div className="flex items-center gap-5">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/20 text-4xl backdrop-blur-sm">
                      {testimonials[currentTestimonial].avatar}
                    </div>
                    <div>
                      <div className="mb-1 text-xl font-bold">
                        {testimonials[currentTestimonial].name}
                      </div>
                      <div className="mb-1 text-white/90">
                        {testimonials[currentTestimonial].role}
                      </div>
                      <div className="text-sm text-white/70">
                        {testimonials[currentTestimonial].company}
                      </div>
                    </div>
                    <div className="mr-auto">
                      <div className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium backdrop-blur-sm">
                        {testimonials[currentTestimonial].project}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex justify-center gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    i === currentTestimonial
                      ? 'w-12 bg-[#7A8A7A]'
                      : 'w-2.5 bg-[#7A8A7A]/20 hover:bg-[#7A8A7A]/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7A8A7A] via-[#5F6F5F] to-[#B5B299]"></div>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '48px 48px',
          }}
        ></div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-6 text-5xl font-bold text-white lg:text-6xl">
              انضم إلى منصة النخبة اليوم
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-2xl text-white/90">
              ابدأ رحلتك نحو النجاح مع آلاف المحترفين المتميزين
            </p>
            <div className="flex flex-col justify-center gap-5 sm:flex-row">
              <button className="group hover:shadow-3xl relative overflow-hidden rounded-xl bg-white px-12 py-5 text-lg font-bold text-[#7A8A7A] shadow-2xl transition-all hover:-translate-y-1">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  ابدأ مشروعك الآن
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
              <button className="group flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-12 py-5 text-lg font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20">
                <Phone className="h-5 w-5" />
                تحدث معنا
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative overflow-hidden bg-[#7A8A7A] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        ></div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-16 grid gap-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm">
                  <Layers className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold">منصة النخبة</div>
              </div>
              <p className="mb-8 max-w-md leading-relaxed text-white/80">
                نربط أفضل المواهب بأصحاب الرؤى الطموحة، ونساعد الأعمال على النمو من خلال توفير بيئة
                عمل احترافية وموثوقة.
              </p>
              <div className="flex gap-4">
                {['فيسبوك', 'تويتر', 'لينكدإن', 'إنستغرام'].map((social, i) => (
                  <button
                    key={i}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white/20"
                  >
                    <span className="text-xs font-medium">{social[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {[
              { title: 'الشركة', links: ['عن المنصة', 'المدونة', 'الوظائف', 'الشركاء', 'الصحافة'] },
              {
                title: 'الدعم',
                links: ['مركز المساعدة', 'الشروط والأحكام', 'سياسة الخصوصية', 'الأمان', 'التواصل'],
              },
            ].map((section, i) => (
              <div key={i}>
                <h4 className="mb-6 text-lg font-bold">{section.title}</h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link}>
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

          <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-10 md:flex-row">
            <div className="text-white/70">© 2025 منصة النخبة. جميع الحقوق محفوظة</div>
            <div className="flex gap-8">
              <a href="#" className="text-sm text-white/70 transition-colors hover:text-white">
                الشروط والأحكام
              </a>
              <a href="#" className="text-sm text-white/70 transition-colors hover:text-white">
                سياسة الخصوصية
              </a>
              <a href="#" className="text-sm text-white/70 transition-colors hover:text-white">
                سياسة الاستخدام
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SophisticatedPlatform;
