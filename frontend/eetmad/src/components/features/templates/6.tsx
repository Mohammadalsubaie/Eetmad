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
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function ModernFreelancePlatform() {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('all');
  const [activeService, setActiveService] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['الرئيسية', 'الخدمات', 'المشاريع', 'الأسعار', 'المدونة', 'تواصل معنا'];

  const services = [
    {
      icon: <Code className="h-7 w-7" />,
      title: 'تطوير البرمجيات',
      desc: 'حلول برمجية متطورة',
      projects: '2,431',
      gradient: 'from-[#2C3E50] to-[#34495E]',
      bg: 'bg-[#2C3E50]/5',
      textColor: 'text-[#2C3E50]',
      price: 'من 500 ر.س',
      tags: ['React', 'Node.js', 'Python'],
    },
    {
      icon: <Palette className="h-7 w-7" />,
      title: 'التصميم الإبداعي',
      desc: 'تصاميم احترافية مبتكرة',
      projects: '1,876',
      gradient: 'from-[#5D7A8C] to-[#4A6273]',
      bg: 'bg-[#5D7A8C]/10',
      textColor: 'text-[#5D7A8C]',
      price: 'من 350 ر.س',
      tags: ['Figma', 'Photoshop', 'Illustrator'],
    },
    {
      icon: <Megaphone className="h-7 w-7" />,
      title: 'التسويق الرقمي',
      desc: 'استراتيجيات تسويقية فعالة',
      projects: '1,542',
      gradient: 'from-[#A4BFCE] to-[#8DA9B8]',
      bg: 'bg-[#A4BFCE]/10',
      textColor: 'text-[#2C3E50]',
      price: 'من 400 ر.س',
      tags: ['SEO', 'Social Media', 'Analytics'],
    },
    {
      icon: <FileText className="h-7 w-7" />,
      title: 'كتابة المحتوى',
      desc: 'محتوى جذاب ومميز',
      projects: '2,198',
      gradient: 'from-[#F0ECC1] to-[#E3DDA8]',
      bg: 'bg-[#F0ECC1]/20',
      textColor: 'text-[#2C3E50]',
      price: 'من 250 ر.س',
      tags: ['مقالات', 'SEO', 'تسويق'],
    },
  ];

  const projects = [
    {
      title: 'تطبيق توصيل طعام',
      category: 'تطوير تطبيقات',
      image: '📱',
      client: 'شركة فود تك',
      duration: '3 أشهر',
      budget: '50,000 ر.س',
      rating: 5.0,
      color: 'from-[#2C3E50] to-[#34495E]',
      stats: { users: '10K+', downloads: '50K+', rating: '4.8' },
    },
    {
      title: 'هوية بصرية متكاملة',
      category: 'تصميم وبراندنج',
      image: '🎨',
      client: 'شركة تقنية',
      duration: '2 شهر',
      budget: '25,000 ر.س',
      rating: 5.0,
      color: 'from-[#5D7A8C] to-[#4A6273]',
      stats: { designs: '50+', revisions: '3', satisfaction: '100%' },
    },
    {
      title: 'حملة تسويقية شاملة',
      category: 'تسويق رقمي',
      image: '📊',
      client: 'متجر إلكتروني',
      duration: '4 أشهر',
      budget: '40,000 ر.س',
      rating: 4.9,
      color: 'from-[#A4BFCE] to-[#8DA9B8]',
      stats: { reach: '500K+', engagement: '15%', roi: '350%' },
    },
  ];

  const testimonials = [
    {
      name: 'محمد الشمري',
      role: 'المدير التنفيذي',
      company: 'شركة الابتكار التقني',
      avatar: '👨‍💼',
      rating: 5,
      text: 'تجربة رائعة ونتائج تفوق التوقعات. الفريق محترف جداً والتسليم في الوقت المحدد دائماً.',
      project: 'تطوير نظام إدارة',
      color: 'from-[#2C3E50] to-[#34495E]',
    },
    {
      name: 'سارة العتيبي',
      role: 'مديرة التسويق',
      company: 'براند كريتف',
      avatar: '👩‍💼',
      rating: 5,
      text: 'مستوى احترافي عالي وإبداع لا محدود. ساعدونا في تحقيق أهدافنا التسويقية بشكل ممتاز.',
      project: 'استراتيجية تسويقية',
      color: 'from-[#5D7A8C] to-[#4A6273]',
    },
    {
      name: 'خالد البلوي',
      role: 'رائد أعمال',
      company: 'ستارت آب السعودية',
      avatar: '🚀',
      rating: 5,
      text: 'استثمار يستحق كل ريال. فريق متعاون ويفهم احتياجات العمل بشكل دقيق.',
      project: 'تطبيق جوال',
      color: 'from-[#A4BFCE] to-[#8DA9B8]',
    },
  ];

  const stats = [
    {
      value: '45K+',
      label: 'مشروع منجز',
      icon: <CheckCircle className="h-6 w-6" />,
      color: '#2C3E50',
    },
    { value: '12K+', label: 'عميل سعيد', icon: <Smile className="h-6 w-6" />, color: '#5D7A8C' },
    { value: '7K+', label: 'محترف معتمد', icon: <Award className="h-6 w-6" />, color: '#A4BFCE' },
    {
      value: '98%',
      label: 'رضا العملاء',
      icon: <ThumbsUp className="h-6 w-6" />,
      color: '#F0ECC1',
    },
  ];

  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'أمان متقدم',
      desc: 'نظام حماية متعدد المستويات لحماية بياناتك ومعاملاتك',
      gradient: 'from-[#2C3E50] to-[#34495E]',
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'محترفون معتمدون',
      desc: 'شبكة من أفضل المحترفين تم التحقق منهم بعناية',
      gradient: 'from-[#5D7A8C] to-[#4A6273]',
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'تسليم سريع',
      desc: 'نضمن تسليم مشاريعك في الوقت المحدد بجودة عالية',
      gradient: 'from-[#A4BFCE] to-[#8DA9B8]',
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'جودة مضمونة',
      desc: 'ضمان الرضا الكامل مع إمكانية التعديل حتى الإتقان',
      gradient: 'from-[#F0ECC1] to-[#E3DDA8]',
    },
  ];

  const pricingPlans = [
    {
      name: 'الباقة الأساسية',
      price: '99',
      period: 'شهرياً',
      features: ['5 مشاريع شهرياً', 'دعم فني 24/7', 'عمولة 10%', 'تقارير شهرية'],
      color: 'from-[#5D7A8C] to-[#4A6273]',
      popular: false,
    },
    {
      name: 'الباقة الاحترافية',
      price: '299',
      period: 'شهرياً',
      features: [
        'مشاريع غير محدودة',
        'دعم فني متقدم',
        'عمولة 5%',
        'تقارير تفصيلية',
        'مدير حساب مخصص',
      ],
      color: 'from-[#2C3E50] to-[#34495E]',
      popular: true,
    },
    {
      name: 'الباقة المؤسسية',
      price: '799',
      period: 'شهرياً',
      features: [
        'حلول مخصصة',
        'دعم VIP',
        'بدون عمولة',
        'تقارير مباشرة',
        'استشارات استراتيجية',
        'أولوية في التنفيذ',
      ],
      color: 'from-[#A4BFCE] to-[#8DA9B8]',
      popular: false,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F4F8] to-[#F5F9FA]" dir="rtl">
      <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-30">
        <div className="animate-blob absolute top-0 left-1/4 h-96 w-96 rounded-full bg-[#2C3E50] opacity-10 mix-blend-multiply blur-3xl filter"></div>
        <div className="animate-blob animation-delay-2000 absolute top-1/3 right-1/4 h-96 w-96 rounded-full bg-[#5D7A8C] opacity-10 mix-blend-multiply blur-3xl filter"></div>
        <div className="animate-blob animation-delay-4000 absolute bottom-1/4 left-1/3 h-96 w-96 rounded-full bg-[#A4BFCE] opacity-10 mix-blend-multiply blur-3xl filter"></div>
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrollY > 50 ? 'bg-white/95 shadow-2xl backdrop-blur-xl' : 'bg-white/80 backdrop-blur-lg'
        }`}
      >
        <nav className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="group relative cursor-pointer">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2C3E50] to-[#5D7A8C] shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                  <Rocket className="h-7 w-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-[#F0ECC1]"></div>
              </div>
              <div>
                <h1 className="bg-gradient-to-r from-[#2C3E50] to-[#5D7A8C] bg-clip-text text-2xl font-bold text-transparent">
                  فريلانس برو
                </h1>
                <p className="text-xs text-[#5D7A8C]/70">منصة العمل الحر الاحترافية</p>
              </div>
            </div>

            <div className="hidden items-center gap-8 lg:flex">
              {navItems.map((item, i) => (
                <a
                  key={i}
                  href="#"
                  className="group relative py-2 font-medium text-[#2C3E50] transition-all hover:text-[#5D7A8C]"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[#2C3E50] to-[#5D7A8C] transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            <div className="hidden items-center gap-4 lg:flex">
              <button className="group relative px-6 py-2.5 font-medium text-[#2C3E50] transition-all hover:text-[#5D7A8C]">
                تسجيل دخول
                <span className="absolute inset-0 rounded-xl border-2 border-[#2C3E50]/10 transition-all group-hover:border-[#5D7A8C]/30"></span>
              </button>
              <button className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-[#2C3E50] to-[#5D7A8C] px-7 py-2.5 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl">
                <span className="relative z-10 flex items-center gap-2">
                  انضم الآن
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </div>

            <button className="p-2 text-[#2C3E50] lg:hidden">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-32 pb-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#2C3E50]/10 bg-white px-5 py-2.5 shadow-lg"
              >
                <div className="relative">
                  <div className="h-2 w-2 rounded-full bg-[#2C3E50]"></div>
                  <div className="absolute h-2 w-2 animate-ping rounded-full bg-[#2C3E50]"></div>
                </div>
                <Sparkles className="h-4 w-4 text-[#5D7A8C]" />
                <span className="text-sm font-semibold text-[#2C3E50]">
                  أكثر من 500 مشروع نشط الآن
                </span>
              </motion.div>

              <h1 className="mb-6 text-6xl leading-tight font-bold lg:text-7xl">
                <span className="text-[#2C3E50]">ابدأ مشروعك</span>
                <span className="mt-2 block bg-gradient-to-r from-[#2C3E50] via-[#5D7A8C] to-[#A4BFCE] bg-clip-text text-transparent">
                  مع الأفضل
                </span>
              </h1>

              <p className="mb-10 max-w-xl text-xl leading-relaxed text-[#5D7A8C]">
                نربط رواد الأعمال بأفضل المحترفين في الوطن العربي. احصل على خدمات استثنائية بجودة
                عالمية.
              </p>

              <div className="mb-12 flex flex-col gap-5 sm:flex-row">
                <button className="group relative rounded-xl bg-gradient-to-r from-[#2C3E50] to-[#5D7A8C] px-8 py-4 text-lg font-bold text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    ابدأ مشروعك المجاني
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
                <button className="group flex items-center justify-center gap-3 rounded-xl border-2 border-[#2C3E50]/20 bg-white px-8 py-4 text-lg font-bold text-[#2C3E50] shadow-lg transition-all hover:border-[#5D7A8C]/40 hover:shadow-xl">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2C3E50]/5 transition-all group-hover:bg-[#2C3E50]/10">
                    <Play className="h-5 w-5" />
                  </div>
                  شاهد الفيديو
                </button>
              </div>

              <div className="flex items-center gap-10">
                <div className="flex -space-x-4">
                  {['👨‍💻', '👩‍🎨', '👨‍💼', '👩‍💻', '🧑‍🎨'].map((emoji, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6 + i * 0.1, type: 'spring' }}
                      className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-4 border-white bg-white text-2xl shadow-lg transition-transform hover:scale-110"
                    >
                      {emoji}
                    </motion.div>
                  ))}
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-5 w-5 fill-[#F0ECC1] text-[#F0ECC1]" />
                    ))}
                  </div>
                  <p className="text-sm font-medium text-[#5D7A8C]">
                    تقييم <span className="font-bold text-[#2C3E50]">4.9/5</span> من 12,000+ عميل
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
              <div className="relative">
                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br from-[#2C3E50]/20 to-[#5D7A8C]/20 blur-3xl"></div>
                <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-gradient-to-br from-[#A4BFCE]/20 to-[#F0ECC1]/20 blur-3xl"></div>

                <div className="relative rounded-3xl border border-[#2C3E50]/10 bg-white p-8 shadow-2xl">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h3 className="mb-1 text-2xl font-bold text-[#2C3E50]">المشاريع المميزة</h3>
                      <p className="text-sm text-[#5D7A8C]/70">مشاريع حديثة ومتنوعة</p>
                    </div>
                    <button className="flex items-center gap-1 text-sm font-semibold text-[#2C3E50] transition-colors hover:text-[#5D7A8C]">
                      المزيد
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="space-y-5">
                    {projects.slice(0, 3).map((project, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + i * 0.15 }}
                        className="group cursor-pointer rounded-2xl border border-[#2C3E50]/10 bg-gradient-to-br from-[#F5F9FA] to-white p-5 transition-all hover:border-[#5D7A8C]/30 hover:shadow-xl"
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`h-16 w-16 bg-gradient-to-br ${project.color} flex items-center justify-center rounded-2xl text-3xl shadow-lg transition-transform group-hover:scale-110`}
                          >
                            {project.image}
                          </div>
                          <div className="flex-1">
                            <h4 className="mb-1 text-lg font-bold text-[#2C3E50]">
                              {project.title}
                            </h4>
                            <p className="mb-3 text-sm text-[#5D7A8C]/70">{project.category}</p>
                            <div className="flex items-center justify-between">
                              <span className="rounded-full bg-[#2C3E50]/5 px-3 py-1.5 text-xs font-semibold text-[#2C3E50]">
                                {project.client}
                              </span>
                              <div className="text-right">
                                <div className="text-lg font-bold text-[#2C3E50]">
                                  {project.budget}
                                </div>
                                <div className="text-xs text-[#5D7A8C]/60">{project.duration}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: 'spring' }}
                className="absolute -right-8 -bottom-8 rounded-2xl border border-[#2C3E50]/10 bg-white p-6 shadow-2xl"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[#F0ECC1] to-[#E3DDA8] shadow-lg">
                    <Trophy className="h-8 w-8 text-[#2C3E50]" />
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-[#2C3E50]">45K+</div>
                    <div className="text-sm text-[#5D7A8C]/70">مشروع ناجح</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-[#2C3E50]/10 bg-white/60 px-6 py-16 backdrop-blur-sm lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group text-center"
              >
                <div
                  className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg transition-transform group-hover:scale-110"
                  style={{ color: stat.color }}
                >
                  {stat.icon}
                </div>
                <div className="mb-2 text-5xl font-bold text-[#2C3E50]">{stat.value}</div>
                <div className="font-medium text-[#5D7A8C]/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#2C3E50]/10 bg-white px-5 py-2.5 shadow-lg"
            >
              <Layers className="h-5 w-5 text-[#5D7A8C]" />
              <span className="text-sm font-semibold text-[#2C3E50]">خدماتنا الاحترافية</span>
            </motion.div>
            <h2 className="mb-5 text-5xl font-bold text-[#2C3E50]">
              استكشف{' '}
              <span className="bg-gradient-to-r from-[#2C3E50] to-[#5D7A8C] bg-clip-text text-transparent">
                خدماتنا
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-[#5D7A8C]/80">
              مجموعة متنوعة من الخدمات الاحترافية لتلبية جميع احتياجات عملك
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group relative cursor-pointer overflow-hidden rounded-3xl border-2 border-[#2C3E50]/10 bg-white p-8 shadow-lg transition-all hover:-translate-y-2 hover:border-[#5D7A8C]/30 hover:shadow-2xl"
              >
                <div
                  className={`absolute top-0 right-0 h-32 w-32 bg-gradient-to-br ${service.gradient} -mt-16 -mr-16 rounded-full opacity-5 transition-transform duration-500 group-hover:scale-150`}
                ></div>

                <div
                  className={`relative h-16 w-16 bg-gradient-to-br ${service.gradient} mb-6 flex items-center justify-center rounded-2xl text-white shadow-xl transition-all group-hover:scale-110 group-hover:rotate-6`}
                >
                  {service.icon}
                </div>

                <h3 className="mb-2 text-2xl font-bold text-[#2C3E50]">{service.title}</h3>
                <p className="mb-4 text-[#5D7A8C]/70">{service.desc}</p>

                <div className="mb-4 flex flex-wrap gap-2">
                  {service.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="rounded-full bg-[#2C3E50]/5 px-3 py-1 text-xs font-medium text-[#2C3E50]/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-[#2C3E50]/10 pt-4">
                  <div>
                    <div className="mb-1 text-sm text-[#5D7A8C]/70">{service.projects} مشروع</div>
                    <div className="text-lg font-bold text-[#2C3E50]">{service.price}</div>
                  </div>
                  <button className="flex items-center gap-2 font-semibold text-[#2C3E50] transition-all group-hover:gap-3">
                    تصفح
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gradient-to-br from-white/80 to-[#F5F9FA]/80 px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-5 text-5xl font-bold text-[#2C3E50]">
              لماذا{' '}
              <span className="bg-gradient-to-r from-[#2C3E50] to-[#5D7A8C] bg-clip-text text-transparent">
                نحن الأفضل
              </span>
              ؟
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-[#5D7A8C]/80">
              مميزات فريدة تجعلنا الخيار الأول للشركات ورواد الأعمال
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
                className="group rounded-3xl border border-[#2C3E50]/10 bg-white p-8 shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl"
              >
                <div
                  className={`h-16 w-16 bg-gradient-to-br ${feature.gradient} mb-6 flex items-center justify-center rounded-2xl text-white shadow-xl transition-transform group-hover:scale-110`}
                >
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-[#2C3E50]">{feature.title}</h3>
                <p className="leading-relaxed text-[#5D7A8C]/70">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-5 text-5xl font-bold text-[#2C3E50]">
              اختر{' '}
              <span className="bg-gradient-to-r from-[#2C3E50] to-[#5D7A8C] bg-clip-text text-transparent">
                الباقة المناسبة
              </span>
            </h2>
            <p className="text-xl text-[#5D7A8C]/80">خطط تسعير مرنة تناسب جميع الاحتياجات</p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`relative rounded-3xl border-2 bg-white p-8 shadow-xl transition-all hover:shadow-2xl ${
                  plan.popular
                    ? 'z-10 scale-105 border-[#2C3E50]/30'
                    : 'border-[#2C3E50]/10 hover:scale-105'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#2C3E50] to-[#5D7A8C] px-6 py-2 text-sm font-bold text-white shadow-lg">
                    الأكثر شعبية
                  </div>
                )}

                <div className="mt-2 mb-8 text-center">
                  <h3 className="mb-4 text-2xl font-bold text-[#2C3E50]">{plan.name}</h3>
                  <div className="mb-2 flex items-end justify-center gap-2">
                    <span className="text-5xl font-bold text-[#2C3E50]">{plan.price}</span>
                    <span className="mb-2 text-[#5D7A8C]/70">ر.س</span>
                  </div>
                  <p className="text-[#5D7A8C]/70">{plan.period}</p>
                </div>

                <div className="mb-8 space-y-4">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 flex-shrink-0 text-[#2C3E50]" />
                      <span className="text-[#5D7A8C]">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full rounded-xl py-4 font-bold transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-[#2C3E50] to-[#5D7A8C] text-white shadow-lg hover:scale-105 hover:shadow-xl'
                      : 'bg-[#2C3E50]/5 text-[#2C3E50] hover:bg-[#2C3E50]/10'
                  }`}
                >
                  اختر الباقة
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-br from-white/80 to-[#F5F9FA]/80 px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-5 text-5xl font-bold text-[#2C3E50]">
              آراء{' '}
              <span className="bg-gradient-to-r from-[#2C3E50] to-[#5D7A8C] bg-clip-text text-transparent">
                العملاء
              </span>
            </h2>
            <p className="text-xl text-[#5D7A8C]/80">قصص نجاح حقيقية من عملائنا</p>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className={`bg-gradient-to-br ${testimonials[currentSlide].color} rounded-3xl p-12 text-white shadow-2xl`}
              >
                <div className="mb-6 flex gap-2">
                  {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-white text-white" />
                  ))}
                </div>

                <p className="mb-10 text-2xl leading-relaxed font-light">
                  "{testimonials[currentSlide].text}"
                </p>

                <div className="flex items-center gap-5">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 text-4xl">
                    {testimonials[currentSlide].avatar}
                  </div>
                  <div>
                    <div className="mb-1 text-xl font-bold">{testimonials[currentSlide].name}</div>
                    <div className="text-white/90">{testimonials[currentSlide].role}</div>
                    <div className="text-sm text-white/70">
                      {testimonials[currentSlide].company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex justify-center gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    i === currentSlide ? 'w-12 bg-[#2C3E50]' : 'w-2.5 bg-[#2C3E50]/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden px-6 py-24 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2C3E50] via-[#34495E] to-[#5D7A8C]"></div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-5xl font-bold text-white lg:text-6xl">
              ابدأ مشروعك المجاني الآن
            </h2>
            <p className="mb-12 text-2xl text-white/90">
              انضم إلى آلاف العملاء السعداء وحقق أهدافك مع أفضل المحترفين
            </p>
            <div className="flex flex-col justify-center gap-5 sm:flex-row">
              <button className="hover:shadow-3xl rounded-xl bg-white px-12 py-5 text-lg font-bold text-[#2C3E50] shadow-2xl transition-all hover:scale-105">
                ابدأ مجاناً
              </button>
              <button className="rounded-xl border-2 border-white/30 bg-white/10 px-12 py-5 text-lg font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20">
                تحدث مع فريق المبيعات
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2C3E50] px-6 py-20 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 grid gap-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                  <Rocket className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">فريلانس برو</span>
              </div>
              <p className="mb-8 max-w-md leading-relaxed text-white/70">
                منصة العمل الحر الاحترافية التي تربط أفضل المواهب بأصحاب المشاريع الطموحة
              </p>
              <div className="flex gap-4">
                {['فيسبوك', 'تويتر', 'لينكدإن', 'إنستغرام'].map((social, i) => (
                  <button
                    key={i}
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 transition-all hover:bg-white/20"
                  >
                    <span className="text-sm">{social[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {[
              { title: 'الشركة', links: ['عن المنصة', 'الوظائف', 'المدونة', 'الشركاء'] },
              { title: 'الدعم', links: ['مركز المساعدة', 'الشروط', 'الخصوصية', 'تواصل معنا'] },
            ].map((section, i) => (
              <div key={i}>
                <h4 className="mb-6 text-lg font-bold">{section.title}</h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-white/70 transition-colors hover:text-white">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-10 text-center text-white/70">
            © 2025 فريلانس برو. جميع الحقوق محفوظة
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
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default ModernFreelancePlatform;
