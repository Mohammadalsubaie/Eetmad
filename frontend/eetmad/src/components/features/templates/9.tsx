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
  Bell,
  Settings,
  Filter,
  Download,
  Upload,
  Share2,
  Eye,
  Lock,
  Unlock,
  ChevronDown,
  Plus,
  Minus,
  Edit,
  Trash2,
  Check,
  X as XIcon,
  TrendingDown,
  Circle,
  Square,
  Triangle,
  Send,
  Link,
  Bookmark,
  Calendar,
  Image,
  Video,
  Mic,
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  Youtube,
  Github,
  Smartphone,
  Monitor,
  Tablet,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function ModernFreelancePlatform() {
  const [scrollY, setScrollY] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('all');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    {
      name: 'التطوير والبرمجة',
      icon: <Code className="h-6 w-6" />,
      count: '12,540',
      color: 'from-[#213555] to-[#3E5879]',
      bgPattern: 'opacity-10',
    },
    {
      name: 'التصميم والإبداع',
      icon: <Palette className="h-6 w-6" />,
      count: '9,832',
      color: 'from-[#3E5879] to-[#D8C4B6]',
      bgPattern: 'opacity-10',
    },
    {
      name: 'التسويق والمبيعات',
      icon: <Megaphone className="h-6 w-6" />,
      count: '7,621',
      color: 'from-[#D8C4B6] to-[#F5EFE7]',
      bgPattern: 'opacity-10',
    },
    {
      name: 'الكتابة والترجمة',
      icon: <FileText className="h-6 w-6" />,
      count: '5,439',
      color: 'from-[#213555] to-[#3E5879]',
      bgPattern: 'opacity-10',
    },
  ];

  const projects = [
    {
      title: 'تطوير منصة تعليمية تفاعلية',
      category: 'تطوير ويب',
      budget: '75,000 ر.س',
      duration: '4 أشهر',
      freelancer: {
        name: 'محمد الأحمد',
        avatar: '👨‍💻',
        rating: 4.9,
        completedProjects: 247,
      },
      image: '🎓',
      gradient: 'from-[#213555] to-[#3E5879]',
      tags: ['React', 'Node.js', 'MongoDB', 'WebRTC'],
      applicants: 43,
      timeLeft: '5 أيام',
      isUrgent: true,
      verified: true,
    },
    {
      title: 'تصميم هوية متكاملة لمطعم فاخر',
      category: 'تصميم جرافيك',
      budget: '35,000 ر.س',
      duration: '6 أسابيع',
      freelancer: {
        name: 'ليلى السعيد',
        avatar: '👩‍🎨',
        rating: 5.0,
        completedProjects: 189,
      },
      image: '🍽️',
      gradient: 'from-[#3E5879] to-[#D8C4B6]',
      tags: ['Branding', 'UI/UX', 'Print', 'Packaging'],
      applicants: 28,
      timeLeft: '3 أيام',
      isUrgent: false,
      verified: true,
    },
    {
      title: 'حملة تسويقية شاملة على السوشيال ميديا',
      category: 'تسويق رقمي',
      budget: '50,000 ر.س',
      duration: '3 أشهر',
      freelancer: {
        name: 'عبدالرحمن خالد',
        avatar: '📱',
        rating: 4.8,
        completedProjects: 312,
      },
      image: '📊',
      gradient: 'from-[#D8C4B6] to-[#F5EFE7]',
      tags: ['Instagram', 'TikTok', 'Content', 'Analytics'],
      applicants: 56,
      timeLeft: '2 أيام',
      isUrgent: true,
      verified: true,
    },
    {
      title: 'تطوير تطبيق موبايل للتجارة الإلكترونية',
      category: 'تطبيقات موبايل',
      budget: '95,000 ر.س',
      duration: '5 أشهر',
      freelancer: {
        name: 'سارة العمري',
        avatar: '👩‍💼',
        rating: 4.9,
        completedProjects: 156,
      },
      image: '📱',
      gradient: 'from-[#213555] to-[#3E5879]',
      tags: ['Flutter', 'Firebase', 'Payment Gateway'],
      applicants: 67,
      timeLeft: '7 أيام',
      isUrgent: false,
      verified: true,
    },
    {
      title: 'إنتاج محتوى فيديو احترافي للشركات',
      category: 'إنتاج فيديو',
      budget: '42,000 ر.س',
      duration: '8 أسابيع',
      freelancer: {
        name: 'أحمد الشمري',
        avatar: '🎬',
        rating: 5.0,
        completedProjects: 203,
      },
      image: '🎥',
      gradient: 'from-[#3E5879] to-[#D8C4B6]',
      tags: ['Premiere Pro', 'After Effects', '4K'],
      applicants: 34,
      timeLeft: '4 أيام',
      isUrgent: false,
      verified: true,
    },
    {
      title: 'كتابة محتوى SEO لموقع سياحي',
      category: 'كتابة محتوى',
      budget: '18,000 ر.س',
      duration: '6 أسابيع',
      freelancer: {
        name: 'نورة المالكي',
        avatar: '✍️',
        rating: 4.9,
        completedProjects: 421,
      },
      image: '📝',
      gradient: 'from-[#D8C4B6] to-[#F5EFE7]',
      tags: ['SEO', 'Blog Writing', 'Research'],
      applicants: 89,
      timeLeft: '6 أيام',
      isUrgent: false,
      verified: true,
    },
  ];

  const testimonials = [
    {
      name: 'فيصل العتيبي',
      role: 'المدير التنفيذي',
      company: 'مجموعة الابتكار التقني',
      avatar: '👨‍💼',
      rating: 5,
      text: 'تجربة مذهلة تفوق كل التوقعات. وجدنا أفضل المطورين وأنجزنا مشروعاً بقيمة 200 ألف ريال في وقت قياسي. الجودة والاحترافية على أعلى مستوى.',
      image: '🏢',
      projectValue: '200,000 ر.س',
      projectDuration: '4 أشهر',
      teamSize: '12 محترف',
      gradient: 'from-[#213555] to-[#3E5879]',
    },
    {
      name: 'ريم الدوسري',
      role: 'مديرة التسويق',
      company: 'براند ماستر',
      avatar: '👩‍💼',
      rating: 5,
      text: 'المنصة غيرت طريقة عملنا بالكامل. حققنا نمواً 400% في المبيعات بفضل الحملات التسويقية الإبداعية. فريق محترف وخدمة ممتازة.',
      image: '📈',
      projectValue: '150,000 ر.س',
      projectDuration: '3 أشهر',
      teamSize: '8 محترفين',
      gradient: 'from-[#3E5879] to-[#D8C4B6]',
    },
    {
      name: 'خالد السلمان',
      role: 'مؤسس ومدير',
      company: 'ديجيتال سوليوشنز',
      avatar: '🚀',
      rating: 5,
      text: 'أفضل منصة عربية للعمل الحر. التعامل سلس، الأسعار منافسة، والنتائج رائعة. أنجزنا 15 مشروعاً حتى الآن وجميعها بنجاح باهر.',
      image: '💼',
      projectValue: '320,000 ر.س',
      projectDuration: '8 أشهر',
      teamSize: '20 محترف',
      gradient: 'from-[#D8C4B6] to-[#F5EFE7]',
    },
  ];

  const features = [
    {
      icon: <Shield className="h-14 w-14" />,
      title: 'حماية مالية كاملة',
      description: 'نظام دفع آمن 100% مع ضمان استرجاع الأموال وحماية حقوق الطرفين',
      color: 'from-[#213555] to-[#3E5879]',
      stats: '100% آمن',
      emoji: '🔒',
    },
    {
      icon: <Zap className="h-14 w-14" />,
      title: 'بدء سريع',
      description: 'انشر مشروعك واحصل على عروض من محترفين معتمدين في دقائق',
      color: 'from-[#3E5879] to-[#D8C4B6]',
      stats: 'خلال دقائق',
      emoji: '⚡',
    },
    {
      icon: <Award className="h-14 w-14" />,
      title: 'محترفون معتمدون',
      description: 'فحص دقيق لكل محترف مع تقييمات حقيقية وسجل أعمال موثق',
      color: 'from-[#D8C4B6] to-[#F5EFE7]',
      stats: '18,000+ محترف',
      emoji: '🏆',
    },
    {
      icon: <Headphones className="h-14 w-14" />,
      title: 'دعم فني 24/7',
      description: 'فريق دعم احترافي متاح دائماً لمساعدتك في كل خطوة',
      color: 'from-[#213555] to-[#3E5879]',
      stats: 'دعم متواصل',
      emoji: '🎧',
    },
  ];

  const stats = [
    {
      value: '156K+',
      label: 'مشروع مكتمل',
      icon: <CheckCircle className="h-10 w-10" />,
      change: '+32%',
      color: 'from-[#213555] to-[#3E5879]',
    },
    {
      value: '67K+',
      label: 'عميل نشط',
      icon: <Users className="h-10 w-10" />,
      change: '+28%',
      color: 'from-[#3E5879] to-[#D8C4B6]',
    },
    {
      value: '28K+',
      label: 'محترف معتمد',
      icon: <Award className="h-10 w-10" />,
      change: '+41%',
      color: 'from-[#D8C4B6] to-[#F5EFE7]',
    },
    {
      value: '99.2%',
      label: 'معدل الرضا',
      icon: <Star className="h-10 w-10" />,
      change: '+6%',
      color: 'from-[#213555] to-[#3E5879]',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'سجّل وأنشئ حسابك',
      description: 'انضم إلى آلاف العملاء الناجحين في دقيقة واحدة',
      icon: <Edit className="h-10 w-10" />,
      gradient: 'from-[#213555] to-[#3E5879]',
      emoji: '✨',
    },
    {
      number: '02',
      title: 'انشر مشروعك بالتفصيل',
      description: 'اكتب وصفاً واضحاً وحدد الميزانية والمدة الزمنية',
      icon: <FileText className="h-10 w-10" />,
      gradient: 'from-[#3E5879] to-[#D8C4B6]',
      emoji: '📋',
    },
    {
      number: '03',
      title: 'قارن واختر الأفضل',
      description: 'راجع العروض والملفات الشخصية واختر المحترف المناسب',
      icon: <Users className="h-10 w-10" />,
      gradient: 'from-[#D8C4B6] to-[#F5EFE7]',
      emoji: '🎯',
    },
    {
      number: '04',
      title: 'تابع واستلم بجودة',
      description: 'راقب التقدم اليومي واستلم مشروعك المكتمل بإتقان',
      icon: <Rocket className="h-10 w-10" />,
      gradient: 'from-[#213555] to-[#3E5879]',
      emoji: '🚀',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5EFE7]" dir="rtl">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 h-[800px] w-[800px] rounded-full bg-gradient-to-br from-[#213555]/5 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-[#D8C4B6]/10 to-transparent blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#3E5879]/5 to-transparent blur-3xl"></div>
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          scrollY > 30
            ? 'border-b border-[#213555]/10 bg-white/95 shadow-2xl backdrop-blur-xl'
            : 'bg-white/80 backdrop-blur-md'
        }`}
      >
        <nav className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-24 items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="group relative"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#213555] to-[#3E5879] blur-md transition-all group-hover:blur-lg"></div>
                <div className="relative flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[#213555] to-[#3E5879] shadow-xl">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
              </motion.div>
              <div>
                <h1 className="bg-gradient-to-r from-[#213555] to-[#3E5879] bg-clip-text text-3xl font-black text-transparent">
                  فريلانس بلس
                </h1>
                <p className="text-sm font-bold text-[#3E5879]">حيث يلتقي الإبداع بالاحتراف</p>
              </div>
            </div>

            <div className="hidden items-center gap-10 lg:flex">
              {['الرئيسية', 'المشاريع', 'المحترفون', 'الخدمات', 'التسعير'].map((item, i) => (
                <a
                  key={item}
                  href="#"
                  className="group relative text-base font-bold text-[#213555] transition-all hover:text-[#3E5879]"
                >
                  {item}
                  <span className="absolute -bottom-2 left-0 h-1 w-0 rounded-full bg-gradient-to-r from-[#213555] to-[#3E5879] transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            <div className="hidden items-center gap-4 lg:flex">
              <button className="rounded-2xl px-7 py-3 font-bold text-[#213555] transition-all hover:bg-[#213555]/5">
                تسجيل الدخول
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-2xl bg-gradient-to-r from-[#213555] to-[#3E5879] px-7 py-3 font-bold text-white shadow-xl transition-all hover:shadow-2xl"
              >
                ابدأ مجاناً
              </motion.button>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-xl p-3 text-[#213555] transition-all hover:bg-[#213555]/5 lg:hidden"
            >
              {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-40 pb-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-20 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#213555]/20 bg-gradient-to-r from-[#213555]/10 to-[#3E5879]/10 px-6 py-3"
              >
                <div className="flex -space-x-2">
                  {['🎨', '💻', '📱'].map((emoji, i) => (
                    <div
                      key={i}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#F5EFE7] bg-white shadow-md"
                    >
                      <span className="text-sm">{emoji}</span>
                    </div>
                  ))}
                </div>
                <span className="font-bold text-[#213555]">انضم لـ 67,000+ عميل نشط</span>
                <Sparkles className="h-5 w-5 text-[#3E5879]" />
              </motion.div>

              <h1 className="mb-8 text-7xl leading-tight font-black lg:text-8xl">
                <span className="block text-[#213555]">وظّف</span>
                <span className="block text-[#213555]">أفضل</span>
                <span className="block bg-gradient-to-r from-[#3E5879] via-[#D8C4B6] to-[#3E5879] bg-clip-text text-transparent">
                  المحترفين
                </span>
              </h1>

              <p className="mb-12 max-w-2xl text-2xl leading-relaxed text-[#3E5879]">
                منصتك المتكاملة للوصول إلى{' '}
                <span className="font-black text-[#213555]">28,000+ محترف</span> معتمد في جميع
                المجالات.
                <span className="mt-2 block font-bold text-[#D8C4B6]">جودة • سرعة • ضمان</span>
              </p>

              <div className="mb-14 flex flex-col gap-5 sm:flex-row">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 25px 50px -12px rgba(33, 53, 85, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#213555] to-[#3E5879] px-10 py-5 text-xl font-black text-white shadow-2xl transition-all"
                >
                  <span>ابدأ مشروعك الآن</span>
                  <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-2" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-3 rounded-2xl border-2 border-[#213555]/20 bg-white px-10 py-5 text-xl font-black text-[#213555] shadow-xl transition-all hover:border-[#213555]/40"
                >
                  <Play className="h-6 w-6" />
                  شاهد كيف نعمل
                </motion.button>
              </div>

              <div className="flex items-center gap-12">
                <div>
                  <div className="mb-2 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-[#213555] text-[#213555]" />
                    ))}
                  </div>
                  <p className="font-bold text-[#3E5879]">
                    <span className="text-2xl font-black text-[#213555]">4.9</span> من 5.0
                  </p>
                  <p className="text-sm text-[#D8C4B6]">من 25,640 تقييم</p>
                </div>
                <div className="h-16 w-px bg-[#213555]/20"></div>
                <div>
                  <div className="mb-1 text-3xl font-black text-[#213555]">99.2%</div>
                  <p className="font-bold text-[#3E5879]">معدل النجاح</p>
                  <p className="text-sm text-[#D8C4B6]">في المشاريع</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Main Card */}
              <div className="relative rounded-[2.5rem] border-2 border-[#213555]/10 bg-white p-10 shadow-2xl">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <h3 className="mb-2 text-3xl font-black text-[#213555]">مشاريع نشطة</h3>
                    <p className="font-semibold text-[#3E5879]">اختر مشروعك القادم</p>
                  </div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#213555] to-[#3E5879] shadow-lg">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                </div>

                <div className="space-y-5">
                  {projects.slice(0, 3).map((project, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.15 }}
                      className="group cursor-pointer rounded-2xl border-2 border-[#213555]/5 bg-gradient-to-br from-[#F5EFE7] to-white p-6 transition-all hover:border-[#213555]/20 hover:shadow-xl"
                    >
                      <div className="flex gap-5">
                        <div
                          className={`h-20 w-20 bg-gradient-to-br ${project.gradient} flex items-center justify-center rounded-2xl text-4xl shadow-lg transition-transform group-hover:scale-110`}
                        >
                          {project.image}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="mb-3 flex items-start justify-between gap-3">
                            <h4 className="line-clamp-1 text-lg font-black text-[#213555] transition-colors group-hover:text-[#3E5879]">
                              {project.title}
                            </h4>
                            {project.isUrgent && (
                              <span className="shrink-0 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
                                عاجل
                              </span>
                            )}
                          </div>
                          <p className="mb-3 text-sm font-semibold text-[#3E5879]">
                            {project.category}
                          </p>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-xl font-black text-[#213555]">
                                {project.budget}
                              </div>
                              <div className="text-xs font-semibold text-[#D8C4B6]">
                                {project.duration}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-2xl">{project.freelancer.avatar}</div>
                              <div className="text-xs">
                                <div className="font-bold text-[#213555]">
                                  {project.freelancer.name}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-[#213555] text-[#213555]" />
                                  <span className="font-black text-[#213555]">
                                    {project.freelancer.rating}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="mt-6 w-full rounded-xl bg-gradient-to-r from-[#213555] to-[#3E5879] py-4 font-bold text-white transition-all hover:shadow-lg"
                >
                  عرض جميع المشاريع
                </motion.button>
              </div>

              {/* Floating Stats Cards */}
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.2, type: 'spring' }}
                className="absolute -top-8 -left-8 rounded-2xl border-2 border-[#D8C4B6]/30 bg-white p-6 shadow-2xl"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#D8C4B6] to-[#F5EFE7] shadow-md">
                    <Users className="h-7 w-7 text-[#213555]" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-[#213555]">890+</div>
                    <div className="text-sm font-bold text-[#3E5879]">مشروع نشط</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0, rotate: 10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.4, type: 'spring' }}
                className="absolute -right-8 -bottom-8 rounded-2xl bg-gradient-to-br from-[#213555] to-[#3E5879] p-6 text-white shadow-2xl"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                    <Award className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-black">156K+</div>
                    <div className="text-sm opacity-90">مشروع ناجح</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group text-center"
              >
                <div
                  className={`inline-flex h-20 w-20 items-center justify-center bg-gradient-to-br ${stat.color} mb-5 rounded-3xl shadow-xl transition-transform group-hover:scale-110`}
                >
                  <div className="text-white">{stat.icon}</div>
                </div>
                <div className="mb-3 text-6xl font-black text-[#213555] transition-transform group-hover:scale-110">
                  {stat.value}
                </div>
                <div className="mb-3 text-lg font-bold text-[#3E5879]">{stat.label}</div>
                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#213555]/5 to-[#3E5879]/5 px-4 py-2">
                  <TrendingUp className="h-4 w-4 text-[#213555]" />
                  <span className="text-sm font-black text-[#213555]">{stat.change}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#213555]/10 bg-white px-6 py-3 shadow-xl"
            >
              <Layers className="h-5 w-5 text-[#213555]" />
              <span className="font-black text-[#213555]">استكشف التخصصات</span>
            </motion.div>
            <h2 className="mb-6 text-6xl font-black text-[#213555]">ابحث عن محترفين في</h2>
            <h3 className="mb-6 bg-gradient-to-r from-[#3E5879] via-[#D8C4B6] to-[#3E5879] bg-clip-text text-6xl font-black text-transparent">
              جميع المجالات
            </h3>
            <p className="mx-auto max-w-3xl text-2xl text-[#3E5879]">
              آلاف الخبراء المعتمدين جاهزون لتنفيذ مشاريعك باحترافية عالية
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative cursor-pointer overflow-hidden rounded-3xl border-2 border-[#213555]/10 bg-white p-8 shadow-xl transition-all hover:border-[#213555]/30 hover:shadow-2xl"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 transition-opacity group-hover:opacity-5`}
                ></div>

                <div
                  className={`relative h-20 w-20 bg-gradient-to-br ${category.color} mb-6 flex items-center justify-center rounded-2xl text-white shadow-lg transition-all group-hover:scale-110 group-hover:rotate-6`}
                >
                  {category.icon}
                </div>

                <h3 className="mb-3 text-2xl font-black text-[#213555] transition-colors group-hover:text-[#3E5879]">
                  {category.name}
                </h3>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-black text-[#213555]">{category.count}</div>
                    <div className="text-sm font-bold text-[#3E5879]">محترف متاح</div>
                  </div>
                  <ArrowRight className="h-6 w-6 text-[#D8C4B6] transition-all group-hover:translate-x-2 group-hover:text-[#213555]" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="bg-white px-6 py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <h2 className="mb-4 text-5xl font-black text-[#213555]">أحدث المشاريع</h2>
              <p className="text-xl text-[#3E5879]">فرص جديدة تضاف كل دقيقة</p>
            </div>
            <div className="flex gap-3">
              {['الكل', 'عاجل', 'تطوير', 'تصميم', 'تسويق'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`rounded-xl px-6 py-3 font-bold transition-all ${
                    selectedTab === tab
                      ? 'bg-gradient-to-r from-[#213555] to-[#3E5879] text-white shadow-lg'
                      : 'bg-[#F5EFE7] text-[#213555] hover:bg-[#D8C4B6]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group cursor-pointer rounded-3xl border-2 border-[#213555]/10 bg-gradient-to-br from-white to-[#F5EFE7]/50 p-8 shadow-lg transition-all hover:border-[#213555]/30 hover:shadow-2xl"
              >
                <div className="mb-6 flex items-start justify-between">
                  <div
                    className={`h-20 w-20 bg-gradient-to-br ${project.gradient} flex items-center justify-center rounded-2xl text-4xl shadow-lg ${hoveredCard === i ? 'scale-110 rotate-6' : ''} transition-all`}
                  >
                    {project.image}
                  </div>
                  {project.isUrgent && (
                    <span className="rounded-full bg-red-500 px-4 py-2 text-xs font-bold text-white shadow-md">
                      عاجل ⚡
                    </span>
                  )}
                </div>

                <h3 className="mb-3 line-clamp-2 text-2xl font-black text-[#213555] transition-colors group-hover:text-[#3E5879]">
                  {project.title}
                </h3>
                <p className="mb-5 font-semibold text-[#3E5879]">{project.category}</p>

                <div className="mb-6 flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg bg-[#213555]/5 px-3 py-1.5 text-xs font-bold text-[#213555]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mb-6 flex items-center gap-3 border-b border-[#213555]/10 pb-6">
                  <div className="text-3xl">{project.freelancer.avatar}</div>
                  <div className="flex-1">
                    <div className="font-black text-[#213555]">{project.freelancer.name}</div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-[#213555] text-[#213555]" />
                        <span className="font-bold text-[#213555]">
                          {project.freelancer.rating}
                        </span>
                      </div>
                      <span className="text-[#D8C4B6]">•</span>
                      <span className="text-[#3E5879]">
                        {project.freelancer.completedProjects} مشروع
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="mb-1 text-sm font-bold text-[#3E5879]">الميزانية</div>
                    <div className="text-2xl font-black text-[#213555]">{project.budget}</div>
                  </div>
                  <div className="text-right">
                    <div className="mb-1 text-sm font-bold text-[#3E5879]">المدة</div>
                    <div className="text-lg font-black text-[#213555]">{project.duration}</div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#213555] to-[#3E5879] py-4 font-bold text-white transition-all hover:shadow-lg"
                >
                  <span>تقديم عرض</span>
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <h2 className="mb-6 text-6xl font-black text-[#213555]">لماذا تختار</h2>
            <h3 className="mb-6 bg-gradient-to-r from-[#3E5879] via-[#D8C4B6] to-[#3E5879] bg-clip-text text-6xl font-black text-transparent">
              فريلانس بلس؟
            </h3>
            <p className="mx-auto max-w-3xl text-2xl text-[#3E5879]">
              مميزات استثنائية تجعلنا الخيار الأول للآلاف
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-3xl border-2 border-[#213555]/10 bg-white p-10 shadow-xl transition-all hover:border-[#213555]/30 hover:shadow-2xl"
              >
                <div
                  className={`absolute top-0 right-0 h-40 w-40 bg-gradient-to-br ${feature.color} -mt-20 -mr-20 rounded-full opacity-5`}
                ></div>

                <div className="relative">
                  <div className="mb-6 text-6xl">{feature.emoji}</div>
                  <div
                    className={`h-20 w-20 bg-gradient-to-br ${feature.color} mb-8 flex items-center justify-center rounded-2xl text-white shadow-lg transition-all group-hover:scale-110 group-hover:-rotate-6`}
                  >
                    {feature.icon}
                  </div>

                  <h3 className="mb-4 text-2xl font-black text-[#213555] transition-colors group-hover:text-[#3E5879]">
                    {feature.title}
                  </h3>
                  <p className="mb-6 leading-relaxed text-[#3E5879]">{feature.description}</p>

                  <div className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#213555]/5 to-[#3E5879]/5 px-4 py-2">
                    <CheckCircle className="h-5 w-5 text-[#213555]" />
                    <span className="font-black text-[#213555]">{feature.stats}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-br from-white via-[#F5EFE7] to-white px-6 py-28 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-20 text-center">
            <h2 className="mb-6 text-6xl font-black text-[#213555]">كيف نعمل؟</h2>
            <p className="text-2xl text-[#3E5879]">أربع خطوات بسيطة للنجاح</p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-1/2 right-0 left-0 hidden h-1 bg-gradient-to-r from-[#213555] via-[#3E5879] to-[#D8C4B6] opacity-20 lg:block"></div>

            <div className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="relative"
                >
                  <div className="group rounded-3xl border-2 border-[#213555]/10 bg-white p-8 shadow-xl transition-all hover:border-[#213555]/30 hover:shadow-2xl">
                    <div
                      className={`absolute -top-6 right-8 h-16 w-16 bg-gradient-to-br ${step.gradient} flex items-center justify-center rounded-2xl text-2xl font-black text-white shadow-xl`}
                    >
                      {step.number}
                    </div>

                    <div className="mt-8 mb-6 text-6xl transition-transform group-hover:scale-110">
                      {step.emoji}
                    </div>

                    <h3 className="mb-4 text-2xl font-black text-[#213555] transition-colors group-hover:text-[#3E5879]">
                      {step.title}
                    </h3>
                    <p className="leading-relaxed text-[#3E5879]">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white px-6 py-28 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-6xl font-black text-[#213555]">قصص نجاح</h2>
            <h3 className="mb-6 bg-gradient-to-r from-[#3E5879] via-[#D8C4B6] to-[#3E5879] bg-clip-text text-6xl font-black text-transparent">
              عملائنا
            </h3>
            <p className="text-2xl text-[#3E5879]">تجارب حقيقية ونتائج ملموسة</p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className={`relative bg-gradient-to-br ${testimonials[currentTestimonial].gradient} overflow-hidden rounded-[3rem] p-12 text-white shadow-2xl lg:p-16`}
            >
              <div className="absolute top-0 right-0 text-[20rem] leading-none font-black opacity-5">
                "
              </div>

              <div className="relative">
                <div className="mb-8 flex gap-2">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-8 w-8 fill-white text-white" />
                  ))}
                </div>

                <p className="mb-12 text-3xl leading-relaxed font-medium lg:text-4xl">
                  "{testimonials[currentTestimonial].text}"
                </p>

                <div className="grid items-end gap-8 md:grid-cols-2">
                  <div className="flex items-center gap-6">
                    <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white/20 text-5xl shadow-xl backdrop-blur-sm">
                      {testimonials[currentTestimonial].avatar}
                    </div>
                    <div>
                      <div className="mb-1 text-2xl font-black">
                        {testimonials[currentTestimonial].name}
                      </div>
                      <div className="mb-1 text-lg text-white/90">
                        {testimonials[currentTestimonial].role}
                      </div>
                      <div className="text-white/70">
                        {testimonials[currentTestimonial].company}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-2xl bg-white/10 p-4 text-center backdrop-blur-sm">
                      <div className="mb-1 text-3xl font-black">
                        {testimonials[currentTestimonial].projectValue}
                      </div>
                      <div className="text-sm text-white/80">قيمة المشروع</div>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-4 text-center backdrop-blur-sm">
                      <div className="mb-1 text-3xl font-black">
                        {testimonials[currentTestimonial].projectDuration}
                      </div>
                      <div className="text-sm text-white/80">المدة</div>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-4 text-center backdrop-blur-sm">
                      <div className="mb-1 text-3xl font-black">
                        {testimonials[currentTestimonial].teamSize}
                      </div>
                      <div className="text-sm text-white/80">الفريق</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex justify-center gap-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentTestimonial(i)}
                className={`h-3 rounded-full transition-all ${
                  i === currentTestimonial
                    ? 'w-16 bg-gradient-to-r from-[#213555] to-[#3E5879]'
                    : 'w-3 bg-[#D8C4B6]'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden px-6 py-32 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-[#213555] via-[#3E5879] to-[#213555]"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-white blur-3xl"></div>
          <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-white blur-3xl"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-8 text-7xl">🚀</div>
            <h2 className="mb-8 text-7xl leading-tight font-black text-white">
              ابدأ مشروعك
              <br />
              <span className="bg-gradient-to-r from-[#D8C4B6] to-[#F5EFE7] bg-clip-text text-transparent">
                مجاناً اليوم
              </span>
            </h2>
            <p className="mx-auto mb-14 max-w-3xl text-2xl leading-relaxed text-white/90">
              انضم لأكثر من 67,000 عميل ناجح واحصل على أفضل المحترفين لمشروعك القادم
            </p>
            <div className="flex flex-col justify-center gap-6 sm:flex-row">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 25px 50px -12px rgba(255,255,255,0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-3 rounded-2xl bg-white px-12 py-6 text-xl font-black text-[#213555] shadow-2xl transition-all"
              >
                <span>ابدأ الآن مجاناً</span>
                <Rocket className="h-6 w-6" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-2xl border-2 border-white/30 bg-white/10 px-12 py-6 text-xl font-black text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                تحدث مع خبير
              </motion.button>
            </div>

            <div className="mt-16 flex items-center justify-center gap-12">
              <div className="text-center">
                <div className="mb-2 text-4xl font-black text-white">100%</div>
                <div className="text-white/80">ضمان الجودة</div>
              </div>
              <div className="h-16 w-px bg-white/20"></div>
              <div className="text-center">
                <div className="mb-2 text-4xl font-black text-white">24/7</div>
                <div className="text-white/80">دعم فني</div>
              </div>
              <div className="h-16 w-px bg-white/20"></div>
              <div className="text-center">
                <div className="mb-2 text-4xl font-black text-white">99.2%</div>
                <div className="text-white/80">رضا العملاء</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#213555] px-6 py-24 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 grid gap-12 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3E5879] to-[#D8C4B6] shadow-xl">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-black">فريلانس بلس</div>
                  <div className="text-[#D8C4B6]">حيث يلتقي الإبداع بالاحتراف</div>
                </div>
              </div>
              <p className="mb-8 max-w-md leading-relaxed text-white/70">
                المنصة الأولى عربياً للربط بين أصحاب المشاريع والمحترفين. جودة عالية، أسعار منافسة،
                وضمان كامل.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: <Facebook className="h-5 w-5" />, label: 'Facebook' },
                  { icon: <Twitter className="h-5 w-5" />, label: 'Twitter' },
                  { icon: <Linkedin className="h-5 w-5" />, label: 'LinkedIn' },
                  { icon: <Instagram className="h-5 w-5" />, label: 'Instagram' },
                ].map((social, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 transition-all hover:bg-white/20"
                  >
                    {social.icon}
                  </motion.button>
                ))}
              </div>
            </div>

            {[
              {
                title: 'الشركة',
                links: ['من نحن', 'كيف نعمل', 'الأسعار', 'الشركاء', 'الوظائف'],
              },
              {
                title: 'الخدمات',
                links: ['تطوير', 'تصميم', 'تسويق', 'كتابة', 'استشارات'],
              },
              {
                title: 'الدعم',
                links: ['مركز المساعدة', 'الأسئلة الشائعة', 'الشروط', 'الخصوصية', 'اتصل بنا'],
              },
            ].map((section, i) => (
              <div key={i}>
                <h4 className="mb-6 text-xl font-black">{section.title}</h4>
                <ul className="space-y-4">
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

          <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-10 md:flex-row">
            <div className="text-center text-white/60 md:text-right">
              © 2025 فريلانس بلس. جميع الحقوق محفوظة
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              <a href="#" className="text-white/60 transition-colors hover:text-white">
                الشروط والأحكام
              </a>
              <a href="#" className="text-white/60 transition-colors hover:text-white">
                سياسة الخصوصية
              </a>
              <a href="#" className="text-white/60 transition-colors hover:text-white">
                سياسة الاسترجاع
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ModernFreelancePlatform;
