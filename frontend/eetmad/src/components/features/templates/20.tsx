'use client';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  BadgeCheck,
  Bookmark,
  CheckCircle,
  ChevronLeft,
  Clock,
  Code,
  Crown,
  DollarSign,
  Eye,
  Facebook,
  Github,
  Globe,
  Grid,
  Instagram,
  Layers,
  Linkedin,
  List,
  LogIn,
  MapPin,
  Menu,
  MessageCircle,
  Palette,
  PenTool,
  Rocket,
  Search,
  Send,
  Shield,
  SlidersHorizontal,
  Star,
  TrendingUp,
  Twitter,
  User,
  UserPlus,
  Users,
  Video,
  Zap,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

function CreativeFreelancePlatform() {
  const [scrollY, setScrollY] = useState(0);
  const [activeView, setActiveView] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const [hoveredCard, setHoveredCard] = useState(null);

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
      projects: 1247,
      budget: '2.4M',
      gradient: 'from-[#075B5E] to-[#1E93AB]',
      featured: true,
    },
    {
      id: 2,
      name: 'التصميم الجرافيكي',
      icon: <Palette />,
      projects: 892,
      budget: '1.8M',
      gradient: 'from-[#1E93AB] to-[#075B5E]',
      featured: false,
    },
    {
      id: 3,
      name: 'كتابة المحتوى',
      icon: <PenTool />,
      projects: 654,
      budget: '980K',
      gradient: 'from-[#075B5E] to-[#1E93AB]',
      featured: true,
    },
    {
      id: 4,
      name: 'التسويق الرقمي',
      icon: <TrendingUp />,
      projects: 743,
      budget: '1.5M',
      gradient: 'from-[#1E93AB] to-[#075B5E]',
      featured: false,
    },
    {
      id: 5,
      name: 'الترجمة',
      icon: <Globe />,
      projects: 421,
      budget: '650K',
      gradient: 'from-[#075B5E] to-[#1E93AB]',
      featured: false,
    },
    {
      id: 6,
      name: 'صناعة الفيديو',
      icon: <Video />,
      projects: 567,
      budget: '1.2M',
      gradient: 'from-[#1E93AB] to-[#075B5E]',
      featured: true,
    },
  ];

  const projects = [
    {
      id: 1,
      title: 'تطوير تطبيق ويب متقدم بتقنية React و Node.js',
      client: 'شركة التقنية الحديثة',
      category: 'البرمجة والتطوير',
      description:
        'نبحث عن مطور متمرس لبناء تطبيق ويب كامل مع لوحة تحكم إدارية متطورة، نظام مصادقة آمن، وواجهة مستخدم احترافية تدعم اللغة العربية بالكامل',
      budget: { min: 35000, max: 55000, type: 'ثابت' },
      duration: '3-4 أشهر',
      skills: ['React.js', 'Node.js', 'MongoDB', 'Redux', 'RESTful API', 'Authentication'],
      bids: 28,
      level: 'خبير',
      timePosted: 'منذ ساعة',
      verified: true,
      premium: true,
      urgent: false,
      featured: true,
      views: 342,
      saved: 89,
    },
    {
      id: 2,
      title: 'تصميم هوية بصرية متكاملة لمشروع تجاري ناشئ',
      client: 'مؤسسة الابتكار العربي',
      category: 'التصميم الجرافيكي',
      description:
        'مطلوب مصمم إبداعي لتطوير هوية بصرية شاملة تتضمن: الشعار، دليل الهوية، تصاميم السوشيال ميديا، والمطبوعات الترويجية بأسلوب عصري وجذاب',
      budget: { min: 12000, max: 22000, type: 'ثابت' },
      duration: '3-5 أسابيع',
      skills: ['Adobe Illustrator', 'Photoshop', 'Brand Identity', 'Typography', 'Color Theory'],
      bids: 45,
      level: 'متقدم',
      timePosted: 'منذ 3 ساعات',
      verified: true,
      premium: false,
      urgent: true,
      featured: false,
      views: 567,
      saved: 134,
    },
    {
      id: 3,
      title: 'كتابة محتوى تسويقي وإبداعي لموقع إلكتروني',
      client: 'وكالة المحتوى الرقمي',
      category: 'كتابة المحتوى',
      description:
        'نحتاج كاتب محتوى محترف لصياغة نصوص تسويقية جذابة، مقالات SEO، ومحتوى إبداعي للمدونة والسوشيال ميديا بأسلوب متميز يناسب الجمهور العربي',
      budget: { min: 8000, max: 15000, type: 'ثابت' },
      duration: '4-6 أسابيع',
      skills: ['Copywriting', 'SEO Writing', 'Content Strategy', 'Creative Writing', 'Arabic'],
      bids: 67,
      level: 'متوسط',
      timePosted: 'منذ 5 ساعات',
      verified: false,
      premium: false,
      urgent: false,
      featured: false,
      views: 423,
      saved: 98,
    },
    {
      id: 4,
      title: 'إدارة حملات إعلانية على منصات التواصل الاجتماعي',
      client: 'شركة التسويق الذكي',
      category: 'التسويق الرقمي',
      description:
        'مطلوب خبير تسويق رقمي لتخطيط وتنفيذ حملات إعلانية مدفوعة على فيسبوك، إنستجرام، وتويتر مع تحليل البيانات وتحسين الأداء بشكل مستمر',
      budget: { min: 18000, max: 32000, type: 'شهري' },
      duration: '2-3 أشهر',
      skills: [
        'Facebook Ads',
        'Instagram Marketing',
        'Google Analytics',
        'A/B Testing',
        'ROI Analysis',
      ],
      bids: 39,
      level: 'متقدم',
      timePosted: 'منذ يوم',
      verified: true,
      premium: true,
      urgent: false,
      featured: true,
      views: 789,
      saved: 201,
    },
    {
      id: 5,
      title: 'ترجمة احترافية من الإنجليزية إلى العربية',
      client: 'مكتب الترجمة المعتمد',
      category: 'الترجمة',
      description:
        'نبحث عن مترجم محترف لترجمة وثائق تقنية ومحتوى تسويقي بدقة عالية مع مراعاة السياق الثقافي والمصطلحات المتخصصة في المجال التقني',
      budget: { min: 5000, max: 9000, type: 'ثابت' },
      duration: '2-3 أسابيع',
      skills: ['English to Arabic', 'Technical Translation', 'Proofreading', 'Localization'],
      bids: 52,
      level: 'متقدم',
      timePosted: 'منذ يومين',
      verified: true,
      premium: false,
      urgent: true,
      featured: false,
      views: 256,
      saved: 67,
    },
    {
      id: 6,
      title: 'إنتاج فيديوهات ترويجية قصيرة عالية الجودة',
      client: 'استوديو الإبداع المرئي',
      category: 'صناعة الفيديو',
      description:
        'مطلوب منتج فيديو محترف لإنشاء مقاطع ترويجية جذابة للسوشيال ميديا ويوتيوب، مع مونتاج احترافي، موشن جرافيكس، ومعالجة صوتية متقنة',
      budget: { min: 15000, max: 28000, type: 'ثابت' },
      duration: '4-5 أسابيع',
      skills: ['Video Editing', 'After Effects', 'Premiere Pro', 'Motion Graphics', 'Sound Design'],
      bids: 34,
      level: 'خبير',
      timePosted: 'منذ 4 ساعات',
      verified: true,
      premium: true,
      urgent: false,
      featured: true,
      views: 445,
      saved: 112,
    },
  ];

  const topFreelancers = [
    {
      id: 1,
      name: 'محمد العمري',
      title: 'مطور Full Stack - خبير في React & Node.js',
      avatar: '👨‍💻',
      rating: 5.0,
      reviews: 247,
      hourlyRate: 480,
      completedJobs: 189,
      successRate: 99,
      location: 'الرياض، السعودية',
      verified: true,
      topRated: true,
      skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
      availability: 'متاح الآن',
      responseTime: '< 30 دقيقة',
      languages: ['العربية', 'الإنجليزية'],
    },
    {
      id: 2,
      name: 'ليلى الحسيني',
      title: 'مصممة UI/UX - متخصصة في تجربة المستخدم',
      avatar: '👩‍🎨',
      rating: 4.9,
      reviews: 198,
      hourlyRate: 420,
      completedJobs: 156,
      successRate: 98,
      location: 'دبي، الإمارات',
      verified: true,
      topRated: true,
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
      availability: 'متاح خلال أسبوع',
      responseTime: '< 1 ساعة',
      languages: ['العربية', 'الإنجليزية', 'الفرنسية'],
    },
    {
      id: 3,
      name: 'أحمد الزهراني',
      title: 'خبير تسويق رقمي - SEO & SEM Specialist',
      avatar: '📊',
      rating: 4.8,
      reviews: 223,
      hourlyRate: 450,
      completedJobs: 201,
      successRate: 97,
      location: 'جدة، السعودية',
      verified: true,
      topRated: false,
      skills: ['SEO', 'Google Ads', 'Analytics', 'Social Media'],
      availability: 'متاح الآن',
      responseTime: '< 45 دقيقة',
      languages: ['العربية', 'الإنجليزية'],
    },
    {
      id: 4,
      name: 'فاطمة المنصوري',
      title: 'كاتبة محتوى إبداعي - متخصصة في التسويق',
      avatar: '✍️',
      rating: 5.0,
      reviews: 167,
      hourlyRate: 350,
      completedJobs: 143,
      successRate: 100,
      location: 'الدوحة، قطر',
      verified: true,
      topRated: true,
      skills: ['Copywriting', 'SEO', 'Content Strategy', 'Blogging'],
      availability: 'مشغول حتى 15/12',
      responseTime: '< 2 ساعة',
      languages: ['العربية', 'الإنجليزية'],
    },
  ];

  const stats = [
    {
      label: 'مشروع مكتمل',
      value: '47,892',
      icon: <CheckCircle />,
      change: '+23%',
      color: '#075B5E',
    },
    {
      label: 'محترف نشط',
      value: '12,547',
      icon: <Users />,
      change: '+18%',
      color: '#1E93AB',
    },
    {
      label: 'مليون ريال قيمة',
      value: '3.2',
      icon: <DollarSign />,
      change: '+41%',
      color: '#075B5E',
    },
    {
      label: 'معدل الرضا',
      value: '97.8%',
      icon: <Star />,
      change: '+3%',
      color: '#1E93AB',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F3F2EC]">
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          scrollY > 20
            ? 'border-b border-[#DCDCDC] bg-white/80 shadow-xl backdrop-blur-2xl'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <div className="flex h-24 items-center justify-between">
            <div className="flex items-center gap-6">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="relative cursor-pointer"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#075B5E] to-[#1E93AB] opacity-50 blur-xl"></div>
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#075B5E] to-[#1E93AB] shadow-2xl">
                  <Layers className="h-8 w-8 text-white" strokeWidth={2.5} />
                </div>
              </motion.div>

              <div className="hidden lg:block">
                <h1 className="bg-gradient-to-r from-[#075B5E] to-[#1E93AB] bg-clip-text text-3xl font-black tracking-tight text-transparent">
                  TALENT<span className="font-light">BRIDGE</span>
                </h1>
                <p className="mt-0.5 text-xs font-bold tracking-widest text-[#075B5E]">
                  WHERE EXCELLENCE MEETS OPPORTUNITY
                </p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden items-center gap-2 xl:flex">
              {['اكتشف المشاريع', 'ابحث عن مواهب', 'كيف نعمل', 'التسعير', 'الموارد'].map(
                (item, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ y: -2 }}
                    className="group relative px-6 py-3 text-sm font-bold text-[#075B5E]"
                  >
                    <span className="relative z-10">{item}</span>
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-[#DCDCDC] opacity-0 transition-opacity group-hover:opacity-100"
                      layoutId="navHover"
                    />
                  </motion.button>
                )
              )}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button className="hidden items-center gap-2 rounded-xl px-6 py-3 font-bold text-[#075B5E] transition-all hover:bg-[#DCDCDC] lg:flex">
                <LogIn className="h-4 w-4" />
                تسجيل دخول
              </button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-[#075B5E] to-[#1E93AB] px-8 py-3 font-black text-white"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  انضم الآن
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#1E93AB] to-[#075B5E]"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <button className="rounded-xl p-3 text-[#075B5E] transition-all hover:bg-[#DCDCDC] xl:hidden">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section - Split Design */}
      <section className="relative overflow-hidden px-6 pt-40 pb-32">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 30, repeat: Infinity }}
            className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-[#075B5E]/10 to-[#1E93AB]/10 blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#1E93AB]/10 to-[#075B5E]/10 blur-3xl"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[1600px]">
          <div className="grid items-center gap-20 lg:grid-cols-2">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10 inline-flex items-center gap-3 rounded-full border border-[#DCDCDC] bg-white px-5 py-3 shadow-lg"
              >
                <div className="h-2 w-2 animate-pulse rounded-full bg-[#1E93AB]"></div>
                <span className="text-sm font-bold text-[#075B5E]">
                  منصة رقم 1 في المنطقة العربية
                </span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#1E93AB] text-[#1E93AB]" />
                  ))}
                </div>
              </motion.div>

              {/* Main Heading */}
              <h1 className="mb-8 text-7xl leading-[0.9] font-black lg:text-8xl">
                <motion.span
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="block text-[#075B5E]"
                >
                  وظّف
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="block bg-gradient-to-r from-[#1E93AB] to-[#075B5E] bg-clip-text text-transparent"
                >
                  المواهب
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="block text-[#075B5E]"
                >
                  المثالية
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-12 max-w-xl text-2xl leading-relaxed font-medium text-[#075B5E]/70"
              >
                اكتشف آلاف المحترفين المتميزين، وظّف بثقة، وحقق مشاريعك بجودة استثنائية
              </motion.p>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className={`rounded-2xl border-2 bg-white p-3 shadow-2xl transition-all ${
                  isSearchFocused ? 'border-[#1E93AB] shadow-[#1E93AB]/20' : 'border-[#DCDCDC]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex flex-1 items-center gap-3 px-4">
                    <Search className="h-6 w-6 text-[#1E93AB]" />
                    <input
                      type="text"
                      placeholder="ابحث عن مشاريع، خدمات، أو محترفين..."
                      className="w-full bg-transparent text-lg font-semibold text-[#075B5E] placeholder-[#075B5E]/40 outline-none"
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                    />
                  </div>
                  <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#075B5E] to-[#1E93AB] px-10 py-4 font-black text-white transition-all hover:shadow-xl">
                    بحث
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-12 flex items-center gap-12"
              >
                {[
                  { icon: <Shield />, label: 'دفع آمن 100%' },
                  { icon: <Zap />, label: 'تنفيذ سريع' },
                  { icon: <Award />, label: 'جودة مضمونة' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#075B5E]/10 to-[#1E93AB]/10">
                      {React.cloneElement(item.icon, { className: 'w-6 h-6 text-[#075B5E]' })}
                    </div>
                    <span className="font-bold text-[#075B5E]">{item.label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Stats Grid */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden grid-cols-2 gap-6 lg:grid"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.03 }}
                  className="group relative cursor-pointer overflow-hidden rounded-3xl border border-[#DCDCDC] bg-white p-8 shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#075B5E]/5 to-[#1E93AB]/5 opacity-0 transition-opacity group-hover:opacity-100" />

                  <div className="relative z-10">
                    <div className="mb-6 flex items-start justify-between">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg ${
                          index % 2 === 0
                            ? 'from-[#075B5E] to-[#1E93AB]'
                            : 'from-[#1E93AB] to-[#075B5E]'
                        }`}
                      >
                        {React.cloneElement(stat.icon, { className: 'w-7 h-7 text-white' })}
                      </div>
                      <span className="rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-black text-green-600">
                        {stat.change}
                      </span>
                    </div>

                    <div className="mb-3 text-5xl font-black" style={{ color: stat.color }}>
                      {stat.value}
                    </div>

                    <div className="text-sm font-bold text-[#075B5E]/70">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Carousel */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-3 text-sm font-black tracking-widest text-[#1E93AB]"
              >
                EXPLORE CATEGORIES
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-6xl font-black text-[#075B5E]"
              >
                استكشف التخصصات
              </motion.h2>
            </div>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="hidden items-center gap-3 rounded-xl bg-[#F3F2EC] px-8 py-4 font-bold text-[#075B5E] transition-all hover:bg-[#DCDCDC] lg:flex"
            >
              عرض جميع التخصصات
              <ArrowLeft className="h-5 w-5" />
            </motion.button>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group relative cursor-pointer overflow-hidden rounded-3xl border-2 border-[#DCDCDC] bg-gradient-to-br from-white to-[#F3F2EC] p-8 hover:border-[#1E93AB]"
              >
                {/* Featured Badge */}
                {category.featured && (
                  <div className="absolute top-6 left-6">
                    <span className="rounded-full bg-gradient-to-r from-[#075B5E] to-[#1E93AB] px-4 py-2 text-xs font-black text-white shadow-lg">
                      مميز
                    </span>
                  </div>
                )}

                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 transition-all duration-500 group-hover:opacity-5`}
                />

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className={`h-20 w-20 bg-gradient-to-br ${category.gradient} relative z-10 mb-8 flex items-center justify-center rounded-2xl shadow-xl`}
                >
                  {React.cloneElement(category.icon, { className: 'w-10 h-10 text-white' })}
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="mb-4 text-2xl font-black text-[#075B5E]">{category.name}</h3>

                  <div className="mb-6 space-y-3">
                    <div className="flex items-center justify-between border-b border-[#DCDCDC] py-3">
                      <span className="font-semibold text-[#075B5E]/70">المشاريع النشطة</span>
                      <span className="text-2xl font-black text-[#1E93AB]">
                        {category.projects}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-3">
                      <span className="font-semibold text-[#075B5E]/70">إجمالي الميزانيات</span>
                      <span className="text-2xl font-black text-[#075B5E]">{category.budget}</span>
                    </div>
                  </div>

                  <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#075B5E] to-[#1E93AB] py-4 font-black text-white transition-all group-hover:shadow-xl">
                    استكشف المشاريع
                    <ArrowUpRight className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - Advanced Layout */}
      <section className="bg-[#F3F2EC] px-6 py-24">
        <div className="mx-auto max-w-[1600px]">
          {/* Section Header */}
          <div className="mb-16 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-3 text-sm font-black tracking-widest text-[#1E93AB]"
              >
                LATEST OPPORTUNITIES
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-6xl font-black text-[#075B5E]"
              >
                المشاريع المتاحة الآن
              </motion.h2>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-xl border border-[#DCDCDC] bg-white p-2">
                <button
                  onClick={() => setActiveView('grid')}
                  className={`rounded-lg p-3 transition-all ${
                    activeView === 'grid'
                      ? 'bg-gradient-to-r from-[#075B5E] to-[#1E93AB] text-white'
                      : 'text-[#075B5E] hover:bg-[#F3F2EC]'
                  }`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setActiveView('list')}
                  className={`rounded-lg p-3 transition-all ${
                    activeView === 'list'
                      ? 'bg-gradient-to-r from-[#075B5E] to-[#1E93AB] text-white'
                      : 'text-[#075B5E] hover:bg-[#F3F2EC]'
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>

              <button className="flex items-center gap-3 rounded-xl border border-[#DCDCDC] bg-white px-6 py-3 font-bold text-[#075B5E] transition-all hover:border-[#1E93AB]">
                <SlidersHorizontal className="h-5 w-5" />
                تصفية
              </button>
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
                onHoverStart={() => setHoveredCard(project.id)}
                onHoverEnd={() => setHoveredCard(null)}
                className="group overflow-hidden rounded-3xl border-2 border-[#DCDCDC] bg-white transition-all hover:border-[#1E93AB] hover:shadow-2xl"
              >
                {/* Header Strip */}
                <div
                  className={`h-2 bg-gradient-to-r ${
                    project.featured ? 'from-[#075B5E] to-[#1E93AB]' : 'from-[#DCDCDC] to-[#F3F2EC]'
                  }`}
                />

                <div className="p-8">
                  {/* Top Section */}
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-3 flex items-center gap-3">
                        <h3 className="text-lg font-bold text-[#075B5E]">{project.client}</h3>
                        {project.verified && <BadgeCheck className="h-5 w-5 text-[#1E93AB]" />}
                        {project.premium && <Crown className="h-5 w-5 text-[#1E93AB]" />}
                      </div>

                      <h4 className="mb-3 text-2xl leading-tight font-black text-[#075B5E] transition-colors group-hover:text-[#1E93AB]">
                        {project.title}
                      </h4>

                      <span className="inline-block rounded-lg border border-[#DCDCDC] bg-[#F3F2EC] px-4 py-2 text-sm font-bold text-[#075B5E]">
                        {project.category}
                      </span>
                    </div>

                    {project.urgent && (
                      <div className="flex-shrink-0">
                        <span className="flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-black text-red-600">
                          <Zap className="h-4 w-4" />
                          عاجل
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="mb-6 line-clamp-3 leading-relaxed text-[#075B5E]/70">
                    {project.description}
                  </p>

                  {/* Skills */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.skills.slice(0, 4).map((skill, i) => (
                        <span
                          key={i}
                          className="rounded-lg bg-gradient-to-r from-[#075B5E]/10 to-[#1E93AB]/10 px-4 py-2 text-sm font-semibold text-[#075B5E]"
                        >
                          {skill}
                        </span>
                      ))}
                      {project.skills.length > 4 && (
                        <span className="rounded-lg bg-[#DCDCDC] px-4 py-2 text-sm font-semibold text-[#075B5E]">
                          +{project.skills.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="mb-6 grid grid-cols-3 gap-4 rounded-2xl border border-[#DCDCDC] bg-gradient-to-br from-[#F3F2EC] to-white p-6">
                    <div className="text-center">
                      <DollarSign className="mx-auto mb-2 h-6 w-6 text-[#1E93AB]" />
                      <p className="mb-1 text-xs font-semibold text-[#075B5E]/60">الميزانية</p>
                      <p className="text-xl font-black text-[#075B5E]">
                        {project.budget.min.toLocaleString()}
                      </p>
                      <p className="mt-1 text-xs font-bold text-[#1E93AB]">{project.budget.type}</p>
                    </div>

                    <div className="border-x border-[#DCDCDC] text-center">
                      <Clock className="mx-auto mb-2 h-6 w-6 text-[#1E93AB]" />
                      <p className="mb-1 text-xs font-semibold text-[#075B5E]/60">المدة</p>
                      <p className="text-xl font-black text-[#075B5E]">{project.duration}</p>
                    </div>

                    <div className="text-center">
                      <Users className="mx-auto mb-2 h-6 w-6 text-[#1E93AB]" />
                      <p className="mb-1 text-xs font-semibold text-[#075B5E]/60">العروض</p>
                      <p className="text-xl font-black text-[#075B5E]">{project.bids}</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t border-[#DCDCDC] pt-6">
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2 text-[#075B5E]/70">
                        <Eye className="h-4 w-4" />
                        <span className="font-semibold">{project.views}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#075B5E]/70">
                        <Bookmark className="h-4 w-4" />
                        <span className="font-semibold">{project.saved}</span>
                      </div>
                      <span className="font-semibold text-[#075B5E]/60">{project.timePosted}</span>
                    </div>

                    <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#075B5E] to-[#1E93AB] px-8 py-3 font-black text-white transition-all hover:scale-105 hover:shadow-xl">
                      تقديم عرض
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-16 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-xl border-2 border-[#075B5E] bg-white px-20 py-5 text-lg font-black text-[#075B5E] transition-all hover:bg-[#075B5E] hover:text-white"
            >
              عرض المزيد من المشاريع
            </motion.button>
          </div>
        </div>
      </section>

      {/* Top Freelancers Section */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-20 text-center">
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 text-sm font-black tracking-widest text-[#1E93AB]"
            >
              TOP TALENT
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 text-6xl font-black text-[#075B5E]"
            >
              المحترفون المميزون
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-2xl text-xl text-[#075B5E]/70"
            >
              خبراء معتمدون بسجل حافل ومهارات استثنائية
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {topFreelancers.map((freelancer, index) => (
              <motion.div
                key={freelancer.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -15, scale: 1.02 }}
                className="group relative overflow-hidden rounded-3xl border-2 border-[#DCDCDC] bg-gradient-to-br from-[#F3F2EC] to-white p-8 transition-all hover:border-[#1E93AB] hover:shadow-2xl"
              >
                {/* Top Rated Badge */}
                {freelancer.topRated && (
                  <div className="absolute top-6 right-6 z-20">
                    <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-[#075B5E] to-[#1E93AB] px-3 py-2 text-xs font-black text-white shadow-lg">
                      <Crown className="h-3 w-3" />
                      TOP RATED
                    </div>
                  </div>
                )}

                {/* Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#075B5E]/5 to-[#1E93AB]/5 opacity-0 transition-all duration-500 group-hover:opacity-100" />

                {/* Avatar */}
                <div className="relative mb-8">
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.05 }}
                    className="relative z-10 mx-auto flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-to-br from-[#075B5E] to-[#1E93AB] text-6xl shadow-2xl"
                  >
                    {freelancer.avatar}
                  </motion.div>

                  {/* Verified Badge */}
                  {freelancer.verified && (
                    <div className="absolute -bottom-4 left-1/2 z-20 -translate-x-1/2 transform">
                      <div className="rounded-full border-2 border-[#1E93AB] bg-white p-3 shadow-xl">
                        <BadgeCheck className="h-7 w-7 text-[#1E93AB]" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="relative z-10 text-center">
                  <h3 className="mb-2 text-2xl font-black text-[#075B5E]">{freelancer.name}</h3>
                  <p className="mb-6 text-sm leading-relaxed font-bold text-[#1E93AB]">
                    {freelancer.title}
                  </p>

                  {/* Rating */}
                  <div className="mb-6 flex items-center justify-center gap-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-[#1E93AB] text-[#1E93AB]" />
                      ))}
                    </div>
                    <span className="text-lg font-black text-[#075B5E]">{freelancer.rating}</span>
                    <span className="text-sm text-[#075B5E]/60">({freelancer.reviews})</span>
                  </div>

                  {/* Location */}
                  <p className="mb-6 flex items-center justify-center gap-2 text-sm text-[#075B5E]/60">
                    <MapPin className="h-4 w-4" />
                    {freelancer.location}
                  </p>

                  {/* Stats Grid */}
                  <div className="mb-6 grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-[#DCDCDC] bg-white p-4">
                      <p className="mb-1 text-3xl font-black text-[#075B5E]">
                        {freelancer.completedJobs}
                      </p>
                      <p className="text-xs font-semibold text-[#1E93AB]">مشروع مكتمل</p>
                    </div>
                    <div className="rounded-2xl border border-[#DCDCDC] bg-white p-4">
                      <p className="mb-1 text-3xl font-black text-[#1E93AB]">
                        {freelancer.successRate}%
                      </p>
                      <p className="text-xs font-semibold text-[#075B5E]">نسبة النجاح</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-6">
                    <div className="flex flex-wrap justify-center gap-2">
                      {freelancer.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="rounded-lg bg-gradient-to-r from-[#075B5E]/10 to-[#1E93AB]/10 px-3 py-2 text-xs font-bold text-[#075B5E]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="mb-6 rounded-xl border border-[#DCDCDC] bg-white p-4">
                    <div className="mb-2 flex items-center justify-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full ${
                          freelancer.availability === 'متاح الآن' ? 'bg-green-500' : 'bg-orange-500'
                        } animate-pulse`}
                      />
                      <span className="text-sm font-bold text-[#075B5E]">
                        {freelancer.availability}
                      </span>
                    </div>
                    <p className="text-xs text-[#075B5E]/60">{freelancer.responseTime}</p>
                  </div>

                  {/* Hourly Rate */}
                  <div className="mb-6 rounded-2xl bg-gradient-to-br from-[#075B5E]/10 to-[#1E93AB]/10 p-6">
                    <p className="mb-2 text-sm font-semibold text-[#075B5E]/70">معدل الساعة</p>
                    <p className="bg-gradient-to-r from-[#075B5E] to-[#1E93AB] bg-clip-text text-4xl font-black text-transparent">
                      {freelancer.hourlyRate} ر.س
                    </p>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#075B5E] to-[#1E93AB] py-4 font-black text-white transition-all hover:scale-105 hover:shadow-xl">
                      <User className="h-5 w-5" />
                      عرض الملف الشخصي
                    </button>
                    <button className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#075B5E] bg-white py-4 font-black text-[#075B5E] transition-all hover:bg-[#075B5E] hover:text-white">
                      <MessageCircle className="h-5 w-5" />
                      مراسلة
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Bold & Modern */}
      <section className="relative overflow-hidden px-6 py-40">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#075B5E] via-[#1E93AB] to-[#075B5E]" />

        {/* Animated Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -50, 0],
                x: [0, 30, 0],
                rotate: [0, 180, 360],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 10 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              className="absolute h-32 w-32 rounded-3xl border-2 border-white/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mx-auto mb-12 flex h-32 w-32 items-center justify-center rounded-full bg-white/10 shadow-2xl backdrop-blur-sm"
          >
            <Rocket className="h-16 w-16 text-white" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 text-7xl leading-tight font-black text-white lg:text-8xl"
          >
            هل أنت جاهز
            <br />
            <span className="text-[#F3F2EC]">لتحقيق النجاح؟</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mb-16 max-w-3xl text-2xl leading-relaxed text-white/90"
          >
            انضم إلى آلاف الشركات والمحترفين الذين يحققون أهدافهم من خلال منصتنا المتطورة
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
              className="flex items-center justify-center gap-3 rounded-xl bg-white px-16 py-6 text-xl font-black text-[#075B5E] shadow-2xl transition-all hover:bg-[#F3F2EC]"
            >
              ابدأ مشروعك الآن
              <ArrowLeft className="h-6 w-6" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-xl border-2 border-white bg-transparent px-16 py-6 text-xl font-black text-white transition-all hover:bg-white hover:text-[#075B5E]"
            >
              انضم كمحترف
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer - Sleek & Modern */}
      <footer className="bg-[#075B5E] px-6 pt-24 pb-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-20 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1E93AB] to-white shadow-xl">
                  <Layers className="h-8 w-8 text-[#075B5E]" />
                </div>
                <div>
                  <h3 className="text-3xl font-black tracking-tight text-white">
                    TALENT<span className="font-light">BRIDGE</span>
                  </h3>
                  <p className="text-xs font-bold tracking-widest text-[#DCDCDC]">
                    EXCELLENCE MEETS OPPORTUNITY
                  </p>
                </div>
              </div>

              <p className="mb-10 text-lg leading-relaxed text-[#DCDCDC]">
                نربط أفضل المواهب في العالم العربي بأهم الفرص لتحقيق النجاح المشترك
              </p>

              <div className="flex gap-4">
                {[Twitter, Instagram, Linkedin, Facebook, Github].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1E93AB] text-white shadow-lg transition-all hover:bg-white hover:text-[#075B5E]"
                  >
                    <Icon className="h-6 w-6" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {[
              {
                title: 'المنصة',
                links: ['عن TalentBridge', 'كيف نعمل', 'المدونة', 'الشركاء', 'الوظائف'],
              },
              {
                title: 'الخدمات',
                links: ['للشركات', 'للمحترفين', 'الأسعار', 'API للمطورين', 'Enterprise'],
              },
              {
                title: 'المساعدة',
                links: ['مركز الدعم', 'اتصل بنا', 'الشروط', 'الخصوصية', 'الأمان'],
              },
            ].map((column, index) => (
              <div key={index}>
                <h4 className="mb-6 text-lg font-black tracking-wide text-white">{column.title}</h4>
                <ul className="space-y-4">
                  {column.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="group flex items-center gap-2 text-sm font-semibold text-[#DCDCDC] transition-colors hover:text-white"
                      >
                        <ChevronLeft className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="border-t-2 border-[#1E93AB]/30 pt-8">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <p className="text-center font-semibold text-[#DCDCDC] md:text-right">
                © 2025 TalentBridge. جميع الحقوق محفوظة.
              </p>

              <div className="flex items-center gap-8">
                <a href="#" className="text-sm font-semibold text-[#DCDCDC] hover:text-white">
                  سياسة الخصوصية
                </a>
                <a href="#" className="text-sm font-semibold text-[#DCDCDC] hover:text-white">
                  شروط الاستخدام
                </a>
                <a href="#" className="text-sm font-semibold text-[#DCDCDC] hover:text-white">
                  ملفات تعريف الارتباط
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default CreativeFreelancePlatform;
