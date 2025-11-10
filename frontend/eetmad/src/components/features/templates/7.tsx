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
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function CreativePlatform() {
  const [scrollY, setScrollY] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    {
      name: 'البرمجة والتطوير',
      icon: <Code className="h-8 w-8" />,
      count: '3,245',
      color: 'from-[#D4C5A9] via-[#E8DCC4] to-[#D4C5A9]',
      bgColor: 'bg-[#D4C5A9]/10',
      borderColor: 'border-[#D4C5A9]',
      description: 'تطبيقات ومواقع متقدمة',
      popular: true,
    },
    {
      name: 'التصميم والجرافيك',
      icon: <Palette className="h-8 w-8" />,
      count: '2,891',
      color: 'from-[#B8B8B8] via-[#C8C8C8] to-[#B8B8B8]',
      bgColor: 'bg-[#B8B8B8]/10',
      borderColor: 'border-[#B8B8B8]',
      description: 'تصاميم إبداعية احترافية',
      popular: false,
    },
    {
      name: 'التسويق الرقمي',
      icon: <Megaphone className="h-8 w-8" />,
      count: '1,987',
      color: 'from-[#2C5F7C] via-[#3A7A9C] to-[#2C5F7C]',
      bgColor: 'bg-[#2C5F7C]/10',
      borderColor: 'border-[#2C5F7C]',
      description: 'حملات تسويقية ناجحة',
      popular: true,
    },
    {
      name: 'الكتابة والترجمة',
      icon: <FileText className="h-8 w-8" />,
      count: '2,456',
      color: 'from-[#E97432] via-[#FF8C50] to-[#E97432]',
      bgColor: 'bg-[#E97432]/10',
      borderColor: 'border-[#E97432]',
      description: 'محتوى متميز بجودة عالية',
      popular: false,
    },
    {
      name: 'الفيديو والموشن',
      icon: <Video className="h-8 w-8" />,
      count: '1,543',
      color: 'from-[#2C5F7C] via-[#3A7A9C] to-[#2C5F7C]',
      bgColor: 'bg-[#2C5F7C]/10',
      borderColor: 'border-[#2C5F7C]',
      description: 'محتوى مرئي احترافي',
      popular: true,
    },
    {
      name: 'الاستشارات',
      icon: <Briefcase className="h-8 w-8" />,
      count: '987',
      color: 'from-[#D4C5A9] via-[#E8DCC4] to-[#D4C5A9]',
      bgColor: 'bg-[#D4C5A9]/10',
      borderColor: 'border-[#D4C5A9]',
      description: 'حلول استراتيجية متكاملة',
      popular: false,
    },
  ];

  const featuredProjects = [
    {
      title: 'تطبيق ذكي للتجارة الإلكترونية',
      category: 'تطوير تطبيقات',
      freelancer: 'أحمد الخالدي',
      avatar: '👨‍💻',
      rating: 5.0,
      reviews: 247,
      price: '12,500 ر.س',
      duration: '45 يوم',
      image: '🛍️',
      gradient: 'from-[#2C5F7C] to-[#3A7A9C]',
      tags: ['React Native', 'Node.js', 'MongoDB'],
      status: 'جديد',
    },
    {
      title: 'حملة تسويقية متكاملة',
      category: 'تسويق رقمي',
      freelancer: 'سارة المطيري',
      avatar: '👩‍💼',
      rating: 4.9,
      reviews: 189,
      price: '8,900 ر.س',
      duration: '30 يوم',
      image: '📱',
      gradient: 'from-[#E97432] to-[#FF8C50]',
      tags: ['SEO', 'Social Media', 'Content'],
      status: 'رائج',
    },
    {
      title: 'هوية بصرية فاخرة',
      category: 'تصميم وبراندنج',
      freelancer: 'خالد العمري',
      avatar: '🎨',
      rating: 5.0,
      reviews: 312,
      price: '6,750 ر.س',
      duration: '21 يوم',
      image: '✨',
      gradient: 'from-[#D4C5A9] to-[#E8DCC4]',
      tags: ['Logo', 'Branding', 'Print'],
      status: 'مميز',
    },
    {
      title: 'فيديو موشن جرافيك احترافي',
      category: 'فيديو وموشن',
      freelancer: 'نورة السهلي',
      avatar: '🎬',
      rating: 4.8,
      reviews: 156,
      price: '4,200 ر.س',
      duration: '14 يوم',
      image: '🎥',
      gradient: 'from-[#B8B8B8] to-[#C8C8C8]',
      tags: ['After Effects', '3D', 'Animation'],
      status: 'جديد',
    },
  ];

  const topFreelancers = [
    {
      name: 'محمد العتيبي',
      specialty: 'مطور Full Stack',
      avatar: '👨‍💻',
      rating: 5.0,
      completedProjects: 342,
      hourlyRate: 450,
      responseTime: '2 ساعات',
      available: true,
      skills: ['React', 'Laravel', 'Vue.js', 'Node.js'],
      gradient: 'from-[#2C5F7C] to-[#3A7A9C]',
      verified: true,
      level: 'خبير معتمد',
    },
    {
      name: 'فاطمة الدوسري',
      specialty: 'مصممة UI/UX',
      avatar: '👩‍🎨',
      rating: 4.9,
      completedProjects: 278,
      hourlyRate: 380,
      responseTime: '1 ساعة',
      available: true,
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
      gradient: 'from-[#D4C5A9] to-[#E8DCC4]',
      verified: true,
      level: 'محترف متميز',
    },
    {
      name: 'عبدالله السالم',
      specialty: 'خبير تسويق رقمي',
      avatar: '📊',
      rating: 5.0,
      completedProjects: 421,
      hourlyRate: 520,
      responseTime: '30 دقيقة',
      available: false,
      skills: ['SEO', 'Google Ads', 'Analytics', 'Strategy'],
      gradient: 'from-[#E97432] to-[#FF8C50]',
      verified: true,
      level: 'خبير معتمد',
    },
  ];

  const stats = [
    {
      value: '85K+',
      label: 'مشروع مكتمل',
      icon: <CheckCircle className="h-7 w-7" />,
      gradient: 'from-[#2C5F7C] to-[#3A7A9C]',
      change: '+12%',
    },
    {
      value: '25K+',
      label: 'عميل نشط',
      icon: <Users className="h-7 w-7" />,
      gradient: 'from-[#E97432] to-[#FF8C50]',
      change: '+8%',
    },
    {
      value: '12K+',
      label: 'محترف معتمد',
      icon: <Award className="h-7 w-7" />,
      gradient: 'from-[#D4C5A9] to-[#E8DCC4]',
      change: '+15%',
    },
    {
      value: '99.2%',
      label: 'معدل الرضا',
      icon: <ThumbsUp className="h-7 w-7" />,
      gradient: 'from-[#B8B8B8] to-[#C8C8C8]',
      change: '+2%',
    },
  ];

  const features = [
    {
      icon: <Shield className="h-10 w-10" />,
      title: 'حماية مضمونة',
      description: 'نظام دفع آمن وحماية كاملة لحقوق الطرفين مع ضمان استرجاع الأموال',
      gradient: 'from-[#2C5F7C] to-[#3A7A9C]',
      iconBg: 'bg-[#2C5F7C]/10',
      stats: '100% آمن',
    },
    {
      icon: <Zap className="h-10 w-10" />,
      title: 'سرعة فائقة',
      description: 'ابدأ مشروعك خلال دقائق واحصل على عروض من محترفين في ساعات',
      gradient: 'from-[#E97432] to-[#FF8C50]',
      iconBg: 'bg-[#E97432]/10',
      stats: 'خلال ساعات',
    },
    {
      icon: <Award className="h-10 w-10" />,
      title: 'جودة عالمية',
      description: 'محترفون معتمدون مع سجل أعمال موثق وتقييمات حقيقية من عملاء سابقين',
      gradient: 'from-[#D4C5A9] to-[#E8DCC4]',
      iconBg: 'bg-[#D4C5A9]/10',
      stats: '4.9/5 تقييم',
    },
    {
      icon: <Headphones className="h-10 w-10" />,
      title: 'دعم مستمر',
      description: 'فريق دعم متواجد 24/7 لمساعدتك في كل خطوة من رحلة مشروعك',
      gradient: 'from-[#B8B8B8] to-[#C8C8C8]',
      iconBg: 'bg-[#B8B8B8]/10',
      stats: '24/7 متاح',
    },
  ];

  const testimonials = [
    {
      name: 'فهد الشمري',
      role: 'مدير تنفيذي',
      company: 'شركة التقنية المتقدمة',
      avatar: '🧑‍💼',
      rating: 5,
      text: 'منصة احترافية بكل المقاييس. تعاملت مع أكثر من 15 محترف وجميعهم تجاوزوا توقعاتي. النتائج ممتازة والأسعار تنافسية جداً.',
      image: '💼',
      gradient: 'from-[#2C5F7C] to-[#3A7A9C]',
      projectType: 'تطوير تطبيق',
      amount: '45,000 ر.س',
    },
    {
      name: 'ريم القحطاني',
      role: 'مديرة تسويق',
      company: 'براند كريتيف',
      avatar: '👩‍💼',
      rating: 5,
      text: 'أفضل قرار اتخذته لأعمالي. المحترفون على مستوى عالمي والمنصة سهلة الاستخدام. حققنا نتائج مذهلة في حملاتنا التسويقية.',
      image: '🎯',
      gradient: 'from-[#E97432] to-[#FF8C50]',
      projectType: 'حملة تسويقية',
      amount: '28,000 ر.س',
    },
    {
      name: 'عبدالعزيز البلوي',
      role: 'رائد أعمال',
      company: 'ستارت آب السعودية',
      avatar: '🚀',
      rating: 5,
      text: 'تجربة استثنائية من البداية للنهاية. المنصة توفر كل ما تحتاجه لإنجاح مشروعك. الدعم ممتاز والنتائج فاقت كل التوقعات.',
      image: '⚡',
      gradient: 'from-[#D4C5A9] to-[#E8DCC4]',
      projectType: 'هوية بصرية',
      amount: '18,500 ر.س',
    },
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'أنشئ مشروعك',
      description: 'حدد احتياجاتك بدقة واكتب وصفاً تفصيلياً لمشروعك مع الميزانية والمدة الزمنية',
      icon: <Edit className="h-7 w-7" />,
      gradient: 'from-[#2C5F7C] to-[#3A7A9C]',
      image: '📝',
    },
    {
      step: '02',
      title: 'استقبل العروض',
      description: 'احصل على عروض تنافسية من محترفين معتمدين خلال ساعات من نشر مشروعك',
      icon: <Mail className="h-7 w-7" />,
      gradient: 'from-[#E97432] to-[#FF8C50]',
      image: '📬',
    },
    {
      step: '03',
      title: 'اختر الأنسب',
      description:
        'قارن العروض والملفات الشخصية واختر المحترف الأنسب لمشروعك بناءً على الخبرة والتقييمات',
      icon: <CheckCircle className="h-7 w-7" />,
      gradient: 'from-[#D4C5A9] to-[#E8DCC4]',
      image: '✅',
    },
    {
      step: '04',
      title: 'تابع وتسلّم',
      description: 'راقب تقدم العمل خطوة بخطوة واستلم مشروعك المكتمل بجودة عالية في الوقت المحدد',
      icon: <TrendingUp className="h-7 w-7" />,
      gradient: 'from-[#B8B8B8] to-[#C8C8C8]',
      image: '🎉',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#FAFAF8] via-[#F5F5F3] to-[#FAFAF8]"
      dir="rtl"
    >
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="animate-blob absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-[#D4C5A9]/20 mix-blend-multiply blur-3xl filter"></div>
        <div className="animate-blob animation-delay-2000 absolute top-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-[#2C5F7C]/20 mix-blend-multiply blur-3xl filter"></div>
        <div className="animate-blob animation-delay-4000 absolute bottom-1/4 left-1/2 h-[450px] w-[450px] rounded-full bg-[#E97432]/20 mix-blend-multiply blur-3xl filter"></div>
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          scrollY > 30
            ? 'border-b border-[#2C5F7C]/10 bg-white/95 shadow-2xl backdrop-blur-2xl'
            : 'bg-white/70 backdrop-blur-xl'
        }`}
      >
        <nav className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-24 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="group relative cursor-pointer">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#2C5F7C] to-[#E97432] opacity-50 blur-lg transition-opacity group-hover:opacity-70"></div>
                <div className="relative flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[#2C5F7C] to-[#3A7A9C] shadow-2xl transition-transform group-hover:scale-105">
                  <Rocket className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 h-5 w-5 animate-pulse rounded-full border-3 border-white bg-[#E97432]"></div>
              </div>
              <div>
                <h1 className="bg-gradient-to-r from-[#2C5F7C] via-[#E97432] to-[#2C5F7C] bg-clip-text text-3xl font-black text-transparent">
                  كريتيف هب
                </h1>
                <p className="text-xs font-semibold text-[#B8B8B8]">منصة الإبداع والاحتراف</p>
              </div>
            </div>

            <div className="hidden items-center gap-10 lg:flex">
              {['الرئيسية', 'الخدمات', 'المحترفون', 'المشاريع', 'الأسعار', 'تواصل'].map(
                (item, i) => (
                  <a
                    key={i}
                    href="#"
                    className="group relative text-sm font-bold text-[#2C5F7C] transition-all hover:text-[#E97432]"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 h-1 w-0 rounded-full bg-gradient-to-r from-[#2C5F7C] to-[#E97432] transition-all duration-500 group-hover:w-full"></span>
                  </a>
                )
              )}
            </div>

            <div className="hidden items-center gap-4 lg:flex">
              <button className="group relative px-7 py-3 font-bold text-[#2C5F7C] transition-all hover:text-[#E97432]">
                دخول
                <span className="absolute inset-0 rounded-2xl border-2 border-[#2C5F7C]/20 transition-all group-hover:border-[#E97432]/40"></span>
              </button>
              <button className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#2C5F7C] to-[#E97432] px-8 py-3 font-bold text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl">
                <span className="relative z-10 flex items-center gap-2">
                  ابدأ الآن
                  <Sparkles className="h-4 w-4" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#E97432] to-[#2C5F7C] opacity-0 transition-opacity group-hover:opacity-100"></div>
              </button>
            </div>

            <button className="rounded-xl p-3 text-[#2C5F7C] transition-all hover:bg-[#2C5F7C]/10 lg:hidden">
              <Menu className="h-6 w-6" />
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
              className="relative z-10"
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                className="mb-8 inline-flex items-center gap-3 rounded-2xl border-2 border-[#E97432]/20 bg-gradient-to-r from-white to-[#F5F5F3] px-6 py-3 shadow-xl"
              >
                <div className="relative flex items-center gap-2">
                  <div className="h-3 w-3 animate-pulse rounded-full bg-[#E97432]"></div>
                  <span className="text-sm font-bold text-[#2C5F7C]">745 مشروع نشط الآن</span>
                </div>
              </motion.div>

              <h1 className="mb-7 text-7xl leading-[0.95] font-black lg:text-8xl">
                <span className="mb-3 block text-[#2C5F7C]">حوّل</span>
                <span className="mb-3 block text-[#2C5F7C]">أفكارك إلى</span>
                <span className="animate-gradient block bg-gradient-to-r from-[#E97432] via-[#FF8C50] to-[#E97432] bg-clip-text text-transparent">
                  واقع ملموس
                </span>
              </h1>

              <p className="mb-12 max-w-xl text-2xl leading-relaxed font-medium text-[#B8B8B8]">
                اربط مشروعك بآلاف المحترفين المعتمدين في جميع المجالات.{' '}
                <span className="font-bold text-[#E97432]">جودة عالمية</span> وأسعار تنافسية.
              </p>

              <div className="mb-14 flex flex-col gap-5 sm:flex-row">
                <button className="group hover:shadow-3xl relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#2C5F7C] to-[#3A7A9C] px-10 py-5 text-lg font-black text-white shadow-2xl transition-all hover:scale-105">
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <span>ابدأ مشروعك المجاني</span>
                    <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-2" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#E97432] to-[#FF8C50] opacity-0 transition-opacity group-hover:opacity-100"></div>
                </button>
                <button className="group flex items-center justify-center gap-4 rounded-2xl border-3 border-[#2C5F7C]/20 bg-white px-10 py-5 text-lg font-black text-[#2C5F7C] shadow-xl transition-all hover:scale-105 hover:border-[#E97432]/40 hover:shadow-2xl">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#E97432]/10 to-[#E97432]/5 transition-all group-hover:from-[#E97432]/20 group-hover:to-[#E97432]/10">
                    <Play className="h-6 w-6" />
                  </div>
                  شاهد العرض
                </button>
              </div>

              <div className="flex items-center gap-12">
                <div className="flex -space-x-4">
                  {['👨‍💻', '👩‍🎨', '👨‍💼', '👩‍💻', '🎨', '💼'].map((emoji, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.6 + i * 0.1, type: 'spring', stiffness: 300 }}
                      className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br from-white to-[#F5F5F3] text-2xl shadow-xl transition-transform hover:z-10 hover:scale-110"
                    >
                      {emoji}
                    </motion.div>
                  ))}
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-6 w-6 fill-[#E97432] text-[#E97432]" />
                    ))}
                  </div>
                  <p className="text-sm font-bold text-[#B8B8B8]">
                    تقييم <span className="text-lg text-[#2C5F7C]">4.9/5</span> • 25,000+ مراجعة
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-gradient-to-br from-[#E97432]/30 to-transparent blur-3xl"></div>
                <div className="absolute -bottom-12 -left-12 h-56 w-56 rounded-full bg-gradient-to-br from-[#2C5F7C]/30 to-transparent blur-3xl"></div>

                <div className="relative rounded-[3rem] border-2 border-[#2C5F7C]/10 bg-white/80 p-10 shadow-2xl backdrop-blur-xl">
                  <div className="mb-8 flex items-center justify-between">
                    <div>
                      <h3 className="mb-2 text-3xl font-black text-[#2C5F7C]">المشاريع المميزة</h3>
                      <p className="text-sm font-semibold text-[#B8B8B8]">اختيارات اليوم الحصرية</p>
                    </div>
                    <button className="rounded-xl bg-gradient-to-r from-[#E97432] to-[#FF8C50] px-5 py-2.5 text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-lg">
                      الكل
                    </button>
                  </div>

                  <div className="space-y-5">
                    {featuredProjects.slice(0, 3).map((project, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + i * 0.15 }}
                        className="group relative cursor-pointer rounded-2xl border-2 border-[#2C5F7C]/10 bg-gradient-to-br from-white to-[#FAFAF8] p-6 transition-all hover:border-[#E97432]/30 hover:shadow-2xl"
                      >
                        <div className="flex items-start gap-5">
                          <div
                            className={`h-20 w-20 bg-gradient-to-br ${project.gradient} flex items-center justify-center rounded-2xl text-4xl shadow-lg transition-all group-hover:scale-110 group-hover:rotate-6`}
                          >
                            {project.image}
                          </div>
                          <div className="flex-1">
                            <div className="mb-2 flex items-start justify-between">
                              <div>
                                <h4 className="mb-1 text-xl font-black text-[#2C5F7C] transition-colors group-hover:text-[#E97432]">
                                  {project.title}
                                </h4>
                                <p className="text-sm font-semibold text-[#B8B8B8]">
                                  {project.category}
                                </p>
                              </div>
                              <div className="rounded-full bg-[#E97432]/10 px-3 py-1.5">
                                <span className="text-xs font-black text-[#E97432]">
                                  {project.status}
                                </span>
                              </div>
                            </div>
                            <div className="mb-4 flex flex-wrap gap-2">
                              {project.tags.map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="rounded-lg border border-[#2C5F7C]/10 bg-[#2C5F7C]/5 px-3 py-1.5 text-xs font-bold text-[#2C5F7C]"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="text-2xl">{project.avatar}</div>
                                <div>
                                  <div className="text-xs font-semibold text-[#B8B8B8]">
                                    {project.freelancer}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-[#E97432] text-[#E97432]" />
                                    <span className="text-xs font-black text-[#2C5F7C]">
                                      {project.rating}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-black text-[#2C5F7C]">
                                  {project.price}
                                </div>
                                <div className="text-xs font-semibold text-[#B8B8B8]">
                                  {project.duration}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <button className="mt-6 w-full rounded-xl bg-gradient-to-r from-[#2C5F7C] to-[#3A7A9C] py-4 font-black text-white transition-all hover:scale-105 hover:shadow-2xl">
                    عرض جميع المشاريع
                  </button>
                </div>
              </div>

              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.3, type: 'spring', stiffness: 200 }}
                className="absolute -right-10 -bottom-10 rounded-3xl border-2 border-[#E97432]/20 bg-white p-8 shadow-2xl"
              >
                <div className="flex items-center gap-5">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E97432] to-[#FF8C50] shadow-xl">
                    <Trophy className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <div className="mb-1 text-5xl font-black text-[#2C5F7C]">85K+</div>
                    <div className="text-sm font-bold text-[#B8B8B8]">مشروع ناجح</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y-2 border-[#2C5F7C]/10 bg-gradient-to-r from-white/80 via-[#F5F5F3]/80 to-white/80 px-6 py-20 backdrop-blur-xl lg:px-8">
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
                  className={`inline-flex h-20 w-20 items-center justify-center bg-gradient-to-br ${stat.gradient} mb-5 rounded-3xl shadow-xl transition-transform group-hover:scale-110`}
                >
                  <div className="text-white">{stat.icon}</div>
                </div>
                <div className="mb-3 text-6xl font-black text-[#2C5F7C]">{stat.value}</div>
                <div className="mb-2 font-bold text-[#B8B8B8]">{stat.label}</div>
                <div className="inline-flex items-center gap-1 rounded-full bg-[#E97432]/10 px-3 py-1">
                  <TrendingUp className="h-3 w-3 text-[#E97432]" />
                  <span className="text-xs font-black text-[#E97432]">{stat.change}</span>
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
              className="mb-8 inline-flex items-center gap-3 rounded-2xl border-2 border-[#E97432]/20 bg-white px-6 py-3 shadow-xl"
            >
              <Layers className="h-5 w-5 text-[#E97432]" />
              <span className="text-sm font-black text-[#2C5F7C]">استكشف التخصصات</span>
            </motion.div>
            <h2 className="mb-6 text-6xl font-black text-[#2C5F7C]">
              اختر{' '}
              <span className="bg-gradient-to-r from-[#E97432] to-[#FF8C50] bg-clip-text text-transparent">
                تخصصك
              </span>
            </h2>
            <p className="mx-auto max-w-3xl text-2xl font-medium text-[#B8B8B8]">
              آلاف المحترفين المعتمدين في انتظارك عبر جميع المجالات
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setActiveCategory(i)}
                className={`group relative cursor-pointer overflow-hidden rounded-3xl border-3 bg-white p-10 transition-all duration-500 ${
                  activeCategory === i
                    ? `${category.borderColor} -translate-y-3 scale-105 shadow-2xl`
                    : 'border-[#2C5F7C]/10 shadow-lg hover:shadow-xl'
                }`}
              >
                {category.popular && (
                  <div className="absolute top-6 left-6 rounded-xl bg-gradient-to-r from-[#E97432] to-[#FF8C50] px-4 py-2 text-xs font-black text-white shadow-lg">
                    الأكثر طلباً
                  </div>
                )}

                <div
                  className={`absolute top-0 right-0 h-40 w-40 bg-gradient-to-br ${category.color} -mt-20 -mr-20 rounded-full opacity-5 transition-transform duration-500 group-hover:scale-150`}
                ></div>

                <div
                  className={`relative h-20 w-20 bg-gradient-to-br ${category.color} mb-6 flex items-center justify-center rounded-3xl text-white shadow-2xl ${activeCategory === i ? 'scale-110 rotate-6' : ''} transition-all duration-300`}
                >
                  {category.icon}
                </div>

                <h3 className="mb-3 text-3xl font-black text-[#2C5F7C]">{category.name}</h3>
                <p className="mb-5 text-lg font-medium text-[#B8B8B8]">{category.description}</p>

                <div className="flex items-center justify-between border-t-2 border-[#2C5F7C]/10 pt-5">
                  <div>
                    <div className="mb-1 text-sm font-bold text-[#B8B8B8]">مشاريع متاحة</div>
                    <div className="text-3xl font-black text-[#2C5F7C]">{category.count}</div>
                  </div>
                  <button
                    className={`flex items-center gap-2 font-black transition-all group-hover:gap-4 ${activeCategory === i ? 'text-[#E97432]' : 'text-[#2C5F7C]'}`}
                  >
                    استكشف
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gradient-to-br from-white/80 to-[#F5F5F3]/80 px-6 py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <h2 className="mb-6 text-6xl font-black text-[#2C5F7C]">
              لماذا{' '}
              <span className="bg-gradient-to-r from-[#E97432] to-[#FF8C50] bg-clip-text text-transparent">
                كريتيف هب
              </span>
              ؟
            </h2>
            <p className="mx-auto max-w-3xl text-2xl font-medium text-[#B8B8B8]">
              مميزات حصرية تجعلنا الخيار الأول للمحترفين والشركات
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
                className="group rounded-3xl border-2 border-[#2C5F7C]/10 bg-white p-10 shadow-xl transition-all hover:-translate-y-3 hover:shadow-2xl"
              >
                <div
                  className={`h-20 w-20 ${feature.iconBg} mb-8 flex items-center justify-center rounded-3xl shadow-lg transition-transform group-hover:scale-110`}
                >
                  <div
                    className={`bg-gradient-to-br ${feature.gradient} bg-clip-text text-transparent`}
                  >
                    {feature.icon}
                  </div>
                </div>
                <h3 className="mb-4 text-2xl font-black text-[#2C5F7C]">{feature.title}</h3>
                <p className="mb-5 leading-relaxed font-medium text-[#B8B8B8]">
                  {feature.description}
                </p>
                <div className="inline-flex items-center gap-2 rounded-xl bg-[#E97432]/10 px-4 py-2">
                  <CheckCircle className="h-4 w-4 text-[#E97432]" />
                  <span className="text-sm font-black text-[#E97432]">{feature.stats}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-28 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-20 text-center">
            <h2 className="mb-6 text-6xl font-black text-[#2C5F7C]">
              كيف{' '}
              <span className="bg-gradient-to-r from-[#E97432] to-[#FF8C50] bg-clip-text text-transparent">
                تبدأ
              </span>
              ؟
            </h2>
            <p className="text-2xl font-medium text-[#B8B8B8]">أربع خطوات بسيطة لإنجاز مشروعك</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group relative"
              >
                {i < howItWorks.length - 1 && (
                  <div className="absolute top-24 left-full z-0 -ml-4 hidden h-1 w-full rounded-full bg-gradient-to-r from-[#2C5F7C]/30 via-[#E97432]/20 to-transparent lg:block"></div>
                )}
                <div className="relative rounded-3xl border-3 border-[#2C5F7C]/10 bg-white p-10 transition-all group-hover:-translate-y-2 hover:border-[#E97432]/30 hover:shadow-2xl">
                  <div
                    className={`absolute -top-8 -right-8 h-20 w-20 bg-gradient-to-br ${step.gradient} flex items-center justify-center rounded-2xl text-3xl font-black text-white shadow-2xl transition-all group-hover:scale-110 group-hover:rotate-12`}
                  >
                    {step.step}
                  </div>
                  <div className="mt-10 mb-6 text-6xl">{step.image}</div>
                  <h3 className="mb-4 text-2xl font-black text-[#2C5F7C]">{step.title}</h3>
                  <p className="leading-relaxed font-medium text-[#B8B8B8]">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-br from-white/80 to-[#F5F5F3]/80 px-6 py-28 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-6xl font-black text-[#2C5F7C]">
              قصص{' '}
              <span className="bg-gradient-to-r from-[#E97432] to-[#FF8C50] bg-clip-text text-transparent">
                النجاح
              </span>
            </h2>
            <p className="text-2xl font-medium text-[#B8B8B8]">تجارب حقيقية من عملائنا المميزين</p>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className={`relative bg-gradient-to-br ${testimonials[currentTestimonial].gradient} overflow-hidden rounded-[3rem] p-14 text-white shadow-2xl`}
              >
                <div className="absolute top-0 right-0 -mt-40 -mr-40 h-80 w-80 rounded-full bg-white/5"></div>
                <div className="absolute bottom-0 left-0 -mb-32 -ml-32 h-64 w-64 rounded-full bg-white/5"></div>

                <div className="relative z-10">
                  <div className="mb-8 flex gap-2">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="h-7 w-7 fill-white text-white" />
                    ))}
                  </div>

                  <div className="mb-6 text-8xl opacity-20">"</div>
                  <p className="mb-12 text-3xl leading-relaxed font-medium">
                    {testimonials[currentTestimonial].text}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="flex h-24 w-24 items-center justify-center rounded-3xl border-2 border-white/20 bg-white/20 text-5xl shadow-xl backdrop-blur-sm">
                        {testimonials[currentTestimonial].avatar}
                      </div>
                      <div>
                        <div className="mb-2 text-2xl font-black">
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
                    <div className="text-right">
                      <div className="mb-3 rounded-2xl border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-sm">
                        <span className="text-sm font-bold opacity-80">نوع المشروع</span>
                        <div className="text-lg font-black">
                          {testimonials[currentTestimonial].projectType}
                        </div>
                      </div>
                      <div className="text-3xl font-black">
                        {testimonials[currentTestimonial].amount}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-12 flex justify-center gap-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`h-3 rounded-full transition-all duration-500 ${
                    i === currentTestimonial
                      ? 'w-16 bg-[#2C5F7C]'
                      : 'w-3 bg-[#B8B8B8]/30 hover:bg-[#B8B8B8]/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden px-6 py-32 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2C5F7C] via-[#3A7A9C] to-[#2C5F7C]"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-[#E97432]/20 blur-3xl"></div>
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-[#D4C5A9]/20 blur-3xl"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-10 inline-flex items-center gap-3 rounded-2xl border-2 border-white/20 bg-white/10 px-6 py-3 backdrop-blur-sm">
              <Sparkles className="h-5 w-5 text-white" />
              <span className="text-sm font-black text-white">ابدأ مجاناً - بدون بطاقة ائتمان</span>
            </div>
            <h2 className="mb-8 text-7xl leading-tight font-black text-white lg:text-8xl">
              جاهز لبدء مشروعك؟
            </h2>
            <p className="mx-auto mb-14 max-w-3xl text-3xl font-medium text-white/90">
              انضم لأكثر من 25,000 عميل وحقق نجاحك مع أفضل المحترفين
            </p>
            <div className="flex flex-col justify-center gap-6 sm:flex-row">
              <button className="group hover:shadow-3xl flex items-center justify-center gap-3 rounded-2xl bg-white px-14 py-6 text-xl font-black text-[#2C5F7C] shadow-2xl transition-all hover:scale-110">
                ابدأ مشروعك الآن
                <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-2" />
              </button>
              <button className="flex items-center justify-center gap-3 rounded-2xl border-3 border-white/30 bg-white/10 px-14 py-6 text-xl font-black text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/20">
                <Phone className="h-6 w-6" />
                تحدث مع الفريق
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative overflow-hidden bg-gradient-to-br from-[#2C5F7C] to-[#1F4A5F] px-6 py-24 text-white lg:px-8">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute top-0 left-0 h-full w-full"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '48px 48px',
            }}
          ></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-20 grid gap-12 md:grid-cols-5">
            <div className="md:col-span-2">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-sm">
                  <Rocket className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-black">كريتيف هب</div>
              </div>
              <p className="mb-10 max-w-md text-lg leading-relaxed font-medium text-white/80">
                منصة الإبداع والاحتراف التي تربط أفضل المواهب بأصحاب الرؤى الطموحة في العالم العربي
              </p>
              <div className="flex gap-4">
                {[
                  { icon: '📘', name: 'فيسبوك' },
                  { icon: '🐦', name: 'تويتر' },
                  { icon: '💼', name: 'لينكدإن' },
                  { icon: '📷', name: 'إنستغرام' },
                ].map((social, i) => (
                  <button
                    key={i}
                    className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-2xl backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/20"
                    title={social.name}
                  >
                    {social.icon}
                  </button>
                ))}
              </div>
            </div>

            {[
              {
                title: 'المنصة',
                links: ['عن كريتيف هب', 'كيف نعمل', 'الأسعار', 'المدونة', 'الشركاء'],
              },
              {
                title: 'الخدمات',
                links: ['تطوير البرمجيات', 'التصميم', 'التسويق', 'الكتابة', 'الاستشارات'],
              },
              {
                title: 'الدعم',
                links: ['مركز المساعدة', 'الشروط والأحكام', 'سياسة الخصوصية', 'الأمان', 'اتصل بنا'],
              },
            ].map((section, i) => (
              <div key={i}>
                <h4 className="mb-8 text-xl font-black">{section.title}</h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="group flex items-center gap-2 font-medium text-white/70 transition-colors hover:text-white"
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

          <div className="flex flex-col items-center justify-between gap-6 border-t-2 border-white/10 pt-10 md:flex-row">
            <div className="font-medium text-white/70">© 2025 كريتيف هب. جميع الحقوق محفوظة</div>
            <div className="flex gap-8">
              <a href="#" className="font-bold text-white/70 transition-colors hover:text-white">
                الشروط
              </a>
              <a href="#" className="font-bold text-white/70 transition-colors hover:text-white">
                الخصوصية
              </a>
              <a href="#" className="font-bold text-white/70 transition-colors hover:text-white">
                ملفات تعريف الارتباط
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(40px, -60px) scale(1.15);
          }
          66% {
            transform: translate(-30px, 30px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 8s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}

export default CreativePlatform;
