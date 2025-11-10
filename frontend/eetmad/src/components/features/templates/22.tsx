'use client';

import { motion } from 'framer-motion';
import {
  ArrowLeft,
  BadgeCheck,
  Bookmark,
  Briefcase,
  CheckCircle,
  Clock,
  Code,
  Crown,
  DollarSign,
  Eye,
  Facebook,
  Feather,
  Grid,
  Instagram,
  Leaf,
  Linkedin,
  LogIn,
  MapPin,
  Menu,
  MessageCircle,
  Palette,
  Search,
  Send,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Twitter,
  User,
  Users,
  X,
  Zap,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

function ElegantFreelancePlatform() {
  const [scrollY, setScrollY] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('trending');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { id: 'all', name: 'جميع المجالات', icon: <Grid />, count: 4523, color: '#5D866C' },
    { id: 'design', name: 'التصميم والفنون', icon: <Palette />, count: 892, color: '#C2A68C' },
    { id: 'dev', name: 'البرمجة والتطوير', icon: <Code />, count: 1247, color: '#5D866C' },
    { id: 'writing', name: 'الكتابة والترجمة', icon: <Feather />, count: 654, color: '#C2A68C' },
    {
      id: 'marketing',
      name: 'التسويق والإعلان',
      icon: <TrendingUp />,
      count: 743,
      color: '#5D866C',
    },
    {
      id: 'business',
      name: 'الأعمال والاستشارات',
      icon: <Briefcase />,
      count: 421,
      color: '#C2A68C',
    },
  ];

  const projects = [
    {
      id: 1,
      title: 'تصميم موقع إلكتروني فاخر لفندق بوتيك',
      client: 'مجموعة الضيافة الراقية',
      avatar: '🏨',
      category: 'التصميم والفنون',
      description:
        'نبحث عن مصمم UI/UX متميز لتطوير موقع إلكتروني يعكس الفخامة والأناقة، مع تجربة مستخدم سلسة وتصميم بصري يأسر الزوار',
      budget: { amount: 45000, type: 'ثابت', currency: 'ر.س' },
      duration: '6-8 أسابيع',
      skills: ['Figma', 'Adobe XD', 'UI/UX', 'Prototyping', 'Animation'],
      proposals: 23,
      views: 456,
      saved: 89,
      level: 'خبير',
      timeAgo: 'منذ ساعتين',
      featured: true,
      urgent: false,
      verified: true,
      rating: 4.9,
      location: 'دبي، الإمارات',
    },
    {
      id: 2,
      title: 'تطوير تطبيق جوال للتجارة الإلكترونية',
      client: 'شركة التسوق الذكي',
      avatar: '🛍️',
      category: 'البرمجة والتطوير',
      description:
        'مطلوب مطور React Native محترف لبناء تطبيق تسوق متكامل مع واجهة عصرية، نظام دفع آمن، وتتبع الطلبات في الوقت الفعلي',
      budget: { amount: 85000, type: 'ثابت', currency: 'ر.س' },
      duration: '3-4 أشهر',
      skills: ['React Native', 'Node.js', 'MongoDB', 'Firebase', 'Stripe'],
      proposals: 41,
      views: 892,
      saved: 234,
      level: 'خبير',
      timeAgo: 'منذ 4 ساعات',
      featured: true,
      urgent: true,
      verified: true,
      rating: 5.0,
      location: 'الرياض، السعودية',
    },
    {
      id: 3,
      title: 'كتابة محتوى تسويقي إبداعي لعلامة تجارية',
      client: 'وكالة العلامات الناشئة',
      avatar: '✍️',
      category: 'الكتابة والترجمة',
      description:
        'نحتاج كاتب محتوى مبدع لصياغة قصة العلامة التجارية، محتوى السوشيال ميديا، ومقالات SEO بأسلوب جذاب يلامس المشاعر',
      budget: { amount: 18000, type: 'شهري', currency: 'ر.س' },
      duration: '3 أشهر',
      skills: ['Copywriting', 'SEO', 'Storytelling', 'Social Media', 'Arabic'],
      proposals: 67,
      views: 567,
      saved: 145,
      level: 'متقدم',
      timeAgo: 'منذ يوم',
      featured: false,
      urgent: false,
      verified: true,
      rating: 4.8,
      location: 'جدة، السعودية',
    },
    {
      id: 4,
      title: 'إدارة حملات إعلانية متعددة القنوات',
      client: 'مركز التسويق الرقمي',
      avatar: '📊',
      category: 'التسويق والإعلان',
      description:
        'مطلوب خبير تسويق رقمي لتخطيط وتنفيذ استراتيجية إعلانية شاملة عبر Google Ads، Facebook، Instagram مع تحليل بيانات دقيق',
      budget: { amount: 32000, type: 'شهري', currency: 'ر.س' },
      duration: '2-3 أشهر',
      skills: ['Google Ads', 'Facebook Ads', 'Analytics', 'A/B Testing', 'Strategy'],
      proposals: 38,
      views: 723,
      saved: 198,
      level: 'خبير',
      timeAgo: 'منذ 5 ساعات',
      featured: false,
      urgent: false,
      verified: true,
      rating: 4.7,
      location: 'الدوحة، قطر',
    },
    {
      id: 5,
      title: 'استشارات استراتيجية لتطوير الأعمال',
      client: 'مؤسسة النمو المستدام',
      avatar: '💼',
      category: 'الأعمال والاستشارات',
      description:
        'نبحث عن مستشار أعمال متمرس لوضع خطة نمو استراتيجية، تحليل السوق، وتطوير نموذج العمل لشركة ناشئة في مجال التكنولوجيا',
      budget: { amount: 55000, type: 'ثابت', currency: 'ر.س' },
      duration: '4-6 أسابيع',
      skills: ['Business Strategy', 'Market Analysis', 'Planning', 'Consulting'],
      proposals: 29,
      views: 445,
      saved: 112,
      level: 'خبير',
      timeAgo: 'منذ 3 ساعات',
      featured: true,
      urgent: false,
      verified: true,
      rating: 5.0,
      location: 'أبوظبي، الإمارات',
    },
    {
      id: 6,
      title: 'إنشاء هوية بصرية متكاملة لمقهى راقي',
      client: 'كافيه الأصالة',
      avatar: '☕',
      category: 'التصميم والفنون',
      description:
        'مطلوب مصمم جرافيك مبدع لتطوير هوية بصرية كاملة تشمل الشعار، الألوان، الخطوط، القوالب، والمطبوعات بأسلوب فني راقي',
      budget: { amount: 28000, type: 'ثابت', currency: 'ر.س' },
      duration: '4-5 أسابيع',
      skills: ['Brand Identity', 'Illustrator', 'Photoshop', 'Typography', 'Print'],
      proposals: 52,
      views: 634,
      saved: 167,
      level: 'متقدم',
      timeAgo: 'منذ 6 ساعات',
      featured: false,
      urgent: true,
      verified: false,
      rating: 4.6,
      location: 'بيروت، لبنان',
    },
  ];

  const talents = [
    {
      id: 1,
      name: 'سارة المنصوري',
      title: 'مصممة UI/UX - متخصصة في تجربة المستخدم',
      avatar: '👩‍🎨',
      bio: 'شغوفة بتصميم تجارب رقمية استثنائية تجمع بين الجمال والوظيفة',
      rating: 5.0,
      reviews: 198,
      hourlyRate: 420,
      projects: 156,
      successRate: 99,
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'Design Systems'],
      portfolio: ['🎨', '🖼️', '💎', '✨'],
      availability: 'متاح',
      responseTime: '< 30 دقيقة',
      location: 'دبي، الإمارات',
      verified: true,
      topRated: true,
      languages: ['العربية', 'الإنجليزية', 'الفرنسية'],
    },
    {
      id: 2,
      name: 'أحمد الزهراني',
      title: 'مطور Full Stack - خبير في React & Node.js',
      avatar: '👨‍💻',
      bio: 'أحول الأفكار الإبداعية إلى حلول تقنية متطورة وقابلة للتوسع',
      rating: 4.9,
      reviews: 247,
      hourlyRate: 480,
      projects: 189,
      successRate: 98,
      skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
      portfolio: ['⚡', '🚀', '💻', '🔧'],
      availability: 'متاح خلال أسبوع',
      responseTime: '< 1 ساعة',
      location: 'الرياض، السعودية',
      verified: true,
      topRated: true,
      languages: ['العربية', 'الإنجليزية'],
    },
    {
      id: 3,
      name: 'ليلى الحسيني',
      title: 'كاتبة محتوى إبداعي - متخصصة في رواية القصص',
      avatar: '✍️',
      bio: 'أنسج الكلمات لتحكي قصصاً تلامس القلوب وتبني العلامات التجارية',
      rating: 5.0,
      reviews: 167,
      hourlyRate: 350,
      projects: 143,
      successRate: 100,
      skills: ['Copywriting', 'SEO', 'Storytelling', 'Content Strategy', 'Arabic'],
      portfolio: ['📝', '📖', '✨', '💫'],
      availability: 'مشغول',
      responseTime: '< 2 ساعة',
      location: 'الدوحة، قطر',
      verified: true,
      topRated: false,
      languages: ['العربية', 'الإنجليزية'],
    },
    {
      id: 4,
      name: 'محمد العمري',
      title: 'خبير تسويق رقمي - SEO & SEM Specialist',
      avatar: '📊',
      bio: 'أساعد الشركات على النمو من خلال استراتيجيات تسويق رقمي مدروسة',
      rating: 4.8,
      reviews: 223,
      hourlyRate: 450,
      projects: 201,
      successRate: 97,
      skills: ['SEO', 'Google Ads', 'Analytics', 'Social Media', 'Strategy'],
      portfolio: ['📈', '💰', '🎯', '🔍'],
      availability: 'متاح',
      responseTime: '< 45 دقيقة',
      location: 'جدة، السعودية',
      verified: true,
      topRated: true,
      languages: ['العربية', 'الإنجليزية', 'التركية'],
    },
  ];

  const stats = [
    { label: 'مشروع مكتمل', value: '52,341', icon: <CheckCircle />, growth: '+28%' },
    { label: 'محترف نشط', value: '15,678', icon: <Users />, growth: '+15%' },
    { label: 'مليار ريال', value: '4.2', icon: <DollarSign />, growth: '+42%' },
    { label: 'معدل الرضا', value: '98.5%', icon: <Star />, growth: '+2%' },
  ];

  const testimonials = [
    {
      id: 1,
      text: 'منصة استثنائية ساعدتني في العثور على أفضل المواهب لمشروعي. الجودة والاحترافية لا مثيل لهما.',
      author: 'فيصل الشمري',
      role: 'مدير تنفيذي',
      company: 'شركة الابتكار الرقمي',
      avatar: '👨‍💼',
      rating: 5,
    },
    {
      id: 2,
      text: 'كمحترف مستقل، وجدت هنا بيئة مثالية للعمل مع عملاء محترمين ومشاريع ملهمة تطور مهاراتي.',
      author: 'نورة المطيري',
      role: 'مصممة جرافيك',
      company: 'عمل حر',
      avatar: '👩‍🎨',
      rating: 5,
    },
    {
      id: 3,
      text: 'الأمان في الدفع والشفافية في التعامل جعلتني أثق تماماً في المنصة. أنصح بها بشدة لأي صاحب مشروع.',
      author: 'خالد الدوسري',
      role: 'رائد أعمال',
      company: 'مؤسسة النمو',
      avatar: '🚀',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-700 ${
          scrollY > 50
            ? 'border-b border-[#E6D8C3] bg-white/95 shadow-lg backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-[1800px] px-8 lg:px-16">
          <div className="flex h-28 items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex cursor-pointer items-center gap-5"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-[#5D866C] opacity-30 blur-md"></div>
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5D866C] to-[#C2A68C] shadow-xl">
                  <Leaf className="h-8 w-8 text-white" strokeWidth={2} />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-light tracking-wide text-[#5D866C]">
                  <span className="font-bold">Artisan</span>Hub
                </h1>
                <p className="mt-0.5 text-[10px] font-medium tracking-[0.3em] text-[#C2A68C]">
                  CRAFT YOUR SUCCESS
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-2 lg:flex">
              {['اكتشف المشاريع', 'ابحث عن مواهب', 'كيف نعمل', 'الأسعار', 'الموارد'].map(
                (item, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ y: -2 }}
                    className="group relative px-6 py-3 text-sm font-medium text-[#5D866C] transition-all hover:text-[#C2A68C]"
                  >
                    {item}
                    <motion.div className="absolute right-0 bottom-0 left-0 h-0.5 origin-left scale-x-0 bg-[#C2A68C] transition-transform group-hover:scale-x-100" />
                  </motion.button>
                )
              )}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-5">
              <button className="hidden items-center gap-2 rounded-full px-7 py-3.5 font-medium text-[#5D866C] transition-all hover:bg-[#E6D8C3] lg:flex">
                <LogIn className="h-4 w-4" />
                دخول
              </button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-gradient-to-r from-[#5D866C] to-[#C2A68C] px-8 py-3.5 font-medium text-white shadow-lg transition-all hover:shadow-xl"
              >
                ابدأ الآن
              </motion.button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="rounded-full p-3 text-[#5D866C] transition-all hover:bg-[#E6D8C3] lg:hidden"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section - Organic & Elegant */}
      <section className="relative overflow-hidden px-8 pt-48 pb-32">
        {/* Organic Background Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-20 right-0 h-[800px] w-[800px] rounded-[40%_60%_70%_30%/60%_30%_70%_40%] bg-[#5D866C]/5 blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.1, 1, 1.1],
              rotate: [5, 0, 5],
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute bottom-0 left-0 h-[700px] w-[700px] rounded-[60%_40%_30%_70%/40%_60%_70%_30%] bg-[#C2A68C]/5 blur-3xl"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[1800px]">
          <div className="grid items-center gap-24 lg:grid-cols-2">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-12 inline-flex items-center gap-3 rounded-full border border-[#E6D8C3] bg-white/80 px-6 py-3 shadow-sm backdrop-blur-sm"
              >
                <div className="flex items-center gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#C2A68C] text-[#C2A68C]" />
                  ))}
                </div>
                <span className="text-sm font-medium text-[#5D866C]">
                  منصة موثوقة من 50,000+ محترف
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-10 text-7xl leading-[1.1] font-light text-[#5D866C] lg:text-8xl"
              >
                صِـنـاعـة
                <br />
                <span className="bg-gradient-to-r from-[#5D866C] to-[#C2A68C] bg-clip-text font-bold text-transparent">
                  الإبـداع
                </span>
                <br />
                <span className="font-light text-[#C2A68C]">بأناقة</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mb-14 max-w-xl text-xl leading-relaxed font-light text-[#5D866C]/70"
              >
                نجمع أرقى المواهب العربية مع أهم الفرص لنصنع معاً قصص نجاح استثنائية
              </motion.p>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="rounded-2xl border border-[#E6D8C3] bg-white p-2.5 shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="flex flex-1 items-center gap-4 px-5">
                    <Search className="h-5 w-5 text-[#C2A68C]" />
                    <input
                      type="text"
                      placeholder="ابحث عن مشاريع، خدمات، أو محترفين..."
                      className="w-full bg-transparent text-base font-light text-[#5D866C] placeholder-[#C2A68C]/40 outline-none"
                    />
                  </div>
                  <button className="rounded-xl bg-gradient-to-r from-[#5D866C] to-[#C2A68C] px-10 py-4 font-medium text-white transition-all hover:shadow-lg">
                    بحث
                  </button>
                </div>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-16 flex items-center gap-10"
              >
                {[
                  { icon: <Shield />, text: 'دفع آمن' },
                  { icon: <CheckCircle />, text: 'جودة مضمونة' },
                  { icon: <Zap />, text: 'دعم فوري' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E6D8C3]/30">
                      {React.cloneElement(item.icon, { className: 'w-5 h-5 text-[#5D866C]' })}
                    </div>
                    <span className="font-medium text-[#5D866C]">{item.text}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Elegant Stats */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative hidden lg:block"
            >
              {/* Decorative Circle */}
              <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E6D8C3]"></div>
              <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E6D8C3]"></div>

              <div className="relative grid grid-cols-2 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.15 }}
                    whileHover={{ y: -10, scale: 1.05 }}
                    className={`rounded-3xl border border-[#E6D8C3] bg-white p-10 shadow-lg ${
                      index % 2 === 0 ? 'mt-0' : 'mt-16'
                    }`}
                  >
                    <div className="mb-8 flex items-center justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5D866C] to-[#C2A68C]">
                        {React.cloneElement(stat.icon, { className: 'w-7 h-7 text-white' })}
                      </div>
                      <span className="rounded-full bg-green-50 px-4 py-2 text-xs font-bold text-green-700">
                        {stat.growth}
                      </span>
                    </div>
                    <div className="mb-3 text-5xl font-bold text-[#5D866C]">{stat.value}</div>
                    <div className="text-sm font-medium text-[#C2A68C]">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section - Minimal & Clean */}
      <section className="bg-white px-8 py-28">
        <div className="mx-auto max-w-[1800px]">
          <div className="mb-20 text-center">
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 text-sm font-medium tracking-[0.3em] text-[#C2A68C]"
            >
              CATEGORIES
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 text-6xl font-light text-[#5D866C]"
            >
              استكشف <span className="font-bold">المجالات</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-[#5D866C] to-[#C2A68C]"
            />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, index) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => setActiveCategory(cat.id)}
                className={`group relative rounded-3xl border-2 bg-white p-10 text-right transition-all ${
                  activeCategory === cat.id
                    ? 'border-[#5D866C] shadow-2xl'
                    : 'border-[#E6D8C3] shadow-lg hover:border-[#C2A68C]'
                }`}
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5D866C]/10 to-[#C2A68C]/10 transition-all group-hover:from-[#5D866C]/20 group-hover:to-[#C2A68C]/20"
                >
                  {React.cloneElement(cat.icon, {
                    className: 'w-8 h-8',
                    style: { color: cat.color },
                  })}
                </motion.div>

                {/* Content */}
                <h3 className="mb-3 text-2xl font-bold text-[#5D866C]">{cat.name}</h3>

                <div className="flex items-center justify-between border-t border-[#E6D8C3] py-4">
                  <span className="font-medium text-[#C2A68C]">المشاريع المتاحة</span>
                  <span className="text-3xl font-bold" style={{ color: cat.color }}>
                    {cat.count}
                  </span>
                </div>

                <div className="mt-6 flex items-center gap-2 font-medium text-[#5D866C] transition-all group-hover:gap-4">
                  <span>استكشف</span>
                  <ArrowLeft className="h-4 w-4" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - Card Based */}
      <section className="bg-[#F5F5F0] px-8 py-28">
        <div className="mx-auto max-w-[1800px]">
          {/* Header */}
          <div className="mb-20 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-4 text-sm font-medium tracking-[0.3em] text-[#C2A68C]"
              >
                OPPORTUNITIES
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-6xl font-light text-[#5D866C]"
              >
                مشاريع <span className="font-bold">مميزة</span>
              </motion.h2>
            </div>

            {/* Filters */}
            <div className="flex gap-3">
              {['trending', 'recent', 'featured'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-6 py-3 font-medium transition-all ${
                    activeFilter === filter
                      ? 'bg-gradient-to-r from-[#5D866C] to-[#C2A68C] text-white shadow-lg'
                      : 'border border-[#E6D8C3] bg-white text-[#5D866C] hover:border-[#C2A68C]'
                  }`}
                >
                  {filter === 'trending' && 'رائج'}
                  {filter === 'recent' && 'جديد'}
                  {filter === 'featured' && 'مميز'}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
                className="group overflow-hidden rounded-3xl border border-[#E6D8C3] bg-white transition-all duration-500 hover:border-[#C2A68C] hover:shadow-2xl"
              >
                {/* Project Header */}
                <div className="border-b border-[#E6D8C3] p-10 pb-8">
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-5xl">{project.avatar}</div>
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <h4 className="font-bold text-[#5D866C]">{project.client}</h4>
                          {project.verified && <BadgeCheck className="h-5 w-5 text-[#5D866C]" />}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#C2A68C]">
                          <MapPin className="h-4 w-4" />
                          <span>{project.location}</span>
                        </div>
                      </div>
                    </div>

                    {project.urgent && (
                      <span className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-bold text-red-600">
                        عاجل
                      </span>
                    )}
                  </div>

                  <h3 className="mb-4 text-2xl leading-snug font-bold text-[#5D866C] transition-colors group-hover:text-[#C2A68C]">
                    {project.title}
                  </h3>

                  <span className="inline-block rounded-full border border-[#E6D8C3] bg-[#F5F5F0] px-5 py-2 text-sm font-medium text-[#5D866C]">
                    {project.category}
                  </span>
                </div>

                {/* Project Body */}
                <div className="p-10 pt-8">
                  <p className="mb-8 line-clamp-3 leading-relaxed text-[#5D866C]/70">
                    {project.description}
                  </p>

                  {/* Skills */}
                  <div className="mb-8">
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="rounded-lg bg-gradient-to-r from-[#5D866C]/5 to-[#C2A68C]/5 px-4 py-2 text-sm font-medium text-[#5D866C]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Meta */}
                  <div className="mb-8 grid grid-cols-3 gap-6 rounded-2xl bg-[#F5F5F0] p-6">
                    <div className="text-center">
                      <DollarSign className="mx-auto mb-2 h-5 w-5 text-[#C2A68C]" />
                      <p className="mb-1 text-xs text-[#5D866C]/60">الميزانية</p>
                      <p className="text-lg font-bold text-[#5D866C]">
                        {project.budget.amount.toLocaleString()}
                      </p>
                      <p className="mt-1 text-xs text-[#C2A68C]">{project.budget.type}</p>
                    </div>

                    <div className="border-x border-[#E6D8C3] text-center">
                      <Clock className="mx-auto mb-2 h-5 w-5 text-[#C2A68C]" />
                      <p className="mb-1 text-xs text-[#5D866C]/60">المدة</p>
                      <p className="text-lg font-bold text-[#5D866C]">{project.duration}</p>
                    </div>

                    <div className="text-center">
                      <Users className="mx-auto mb-2 h-5 w-5 text-[#C2A68C]" />
                      <p className="mb-1 text-xs text-[#5D866C]/60">العروض</p>
                      <p className="text-lg font-bold text-[#5D866C]">{project.proposals}</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t border-[#E6D8C3] pt-6">
                    <div className="flex items-center gap-6 text-sm text-[#5D866C]/60">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        {project.views}
                      </div>
                      <div className="flex items-center gap-2">
                        <Bookmark className="h-4 w-4" />
                        {project.saved}
                      </div>
                      <span>{project.timeAgo}</span>
                    </div>

                    <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#5D866C] to-[#C2A68C] px-8 py-3 font-medium text-white transition-all hover:shadow-lg">
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
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full border-2 border-[#5D866C] bg-white px-16 py-5 text-lg font-medium text-[#5D866C] shadow-lg transition-all hover:bg-[#5D866C] hover:text-white"
            >
              عرض المزيد من المشاريع
            </motion.button>
          </div>
        </div>
      </section>

      {/* Talents Section - Premium Cards */}
      <section className="bg-white px-8 py-28">
        <div className="mx-auto max-w-[1800px]">
          <div className="mb-20 text-center">
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 text-sm font-medium tracking-[0.3em] text-[#C2A68C]"
            >
              TOP TALENTS
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 text-6xl font-light text-[#5D866C]"
            >
              نُخبة <span className="font-bold">المحترفين</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-[#5D866C] to-[#C2A68C]"
            />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {talents.map((talent, index) => (
              <motion.div
                key={talent.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group relative overflow-hidden rounded-3xl border border-[#E6D8C3] bg-gradient-to-br from-[#F5F5F0] to-white p-8 transition-all hover:border-[#C2A68C] hover:shadow-2xl"
              >
                {/* Top Rated Badge */}
                {talent.topRated && (
                  <div className="absolute top-6 right-6 z-10">
                    <div className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#5D866C] to-[#C2A68C] px-3 py-2 text-xs font-bold text-white shadow-lg">
                      <Crown className="h-3 w-3" />
                      TOP
                    </div>
                  </div>
                )}

                {/* Avatar */}
                <div className="relative mb-8">
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.08 }}
                    className="mx-auto flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-[#5D866C] to-[#C2A68C] text-5xl shadow-xl"
                  >
                    {talent.avatar}
                  </motion.div>

                  {talent.verified && (
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 transform">
                      <div className="rounded-full border-2 border-[#5D866C] bg-white p-2.5 shadow-lg">
                        <BadgeCheck className="h-6 w-6 text-[#5D866C]" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="text-center">
                  <h3 className="mb-2 text-xl font-bold text-[#5D866C]">{talent.name}</h3>
                  <p className="mb-4 text-sm leading-relaxed font-medium text-[#C2A68C]">
                    {talent.title}
                  </p>

                  <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-[#5D866C]/60">
                    {talent.bio}
                  </p>

                  {/* Rating */}
                  <div className="mb-6 flex items-center justify-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[#C2A68C] text-[#C2A68C]" />
                      ))}
                    </div>
                    <span className="text-base font-bold text-[#5D866C]">{talent.rating}</span>
                    <span className="text-sm text-[#5D866C]/50">({talent.reviews})</span>
                  </div>

                  {/* Location */}
                  <p className="mb-6 flex items-center justify-center gap-2 text-sm text-[#5D866C]/60">
                    <MapPin className="h-4 w-4" />
                    {talent.location}
                  </p>

                  {/* Stats */}
                  <div className="mb-6 grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-[#E6D8C3] bg-white p-4">
                      <p className="mb-1 text-2xl font-bold text-[#5D866C]">{talent.projects}</p>
                      <p className="text-xs text-[#C2A68C]">مشروع</p>
                    </div>
                    <div className="rounded-2xl border border-[#E6D8C3] bg-white p-4">
                      <p className="mb-1 text-2xl font-bold text-[#C2A68C]">
                        {talent.successRate}%
                      </p>
                      <p className="text-xs text-[#5D866C]">نجاح</p>
                    </div>
                  </div>

                  {/* Portfolio Icons */}
                  <div className="mb-6 flex justify-center gap-2">
                    {talent.portfolio.map((emoji, i) => (
                      <div
                        key={i}
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E6D8C3]/30 text-lg"
                      >
                        {emoji}
                      </div>
                    ))}
                  </div>

                  {/* Availability */}
                  <div className="mb-6 rounded-xl border border-[#E6D8C3] bg-white p-4">
                    <div className="mb-2 flex items-center justify-center gap-2">
                      <div
                        className={`h-2.5 w-2.5 rounded-full ${
                          talent.availability === 'متاح' ? 'bg-green-500' : 'bg-orange-500'
                        } animate-pulse`}
                      />
                      <span className="text-sm font-bold text-[#5D866C]">
                        {talent.availability}
                      </span>
                    </div>
                    <p className="text-xs text-[#5D866C]/60">{talent.responseTime}</p>
                  </div>

                  {/* Rate */}
                  <div className="mb-6 rounded-2xl bg-gradient-to-br from-[#5D866C]/5 to-[#C2A68C]/5 p-5">
                    <p className="mb-1 text-xs text-[#5D866C]/60">معدل الساعة</p>
                    <p className="bg-gradient-to-r from-[#5D866C] to-[#C2A68C] bg-clip-text text-3xl font-bold text-transparent">
                      {talent.hourlyRate} ر.س
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="space-y-3">
                    <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#5D866C] to-[#C2A68C] py-3.5 font-medium text-white transition-all hover:shadow-lg">
                      <User className="h-4 w-4" />
                      عرض الملف
                    </button>
                    <button className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#5D866C] bg-white py-3.5 font-medium text-[#5D866C] transition-all hover:bg-[#5D866C] hover:text-white">
                      <MessageCircle className="h-4 w-4" />
                      مراسلة
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-[#F5F5F0] px-8 py-28">
        <div className="mx-auto max-w-[1800px]">
          <div className="mb-20 text-center">
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 text-sm font-medium tracking-[0.3em] text-[#C2A68C]"
            >
              TESTIMONIALS
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 text-6xl font-light text-[#5D866C]"
            >
              آراء <span className="font-bold">العملاء</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-[#5D866C] to-[#C2A68C]"
            />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -8 }}
                className="rounded-3xl border border-[#E6D8C3] bg-white p-10 transition-all hover:border-[#C2A68C] hover:shadow-xl"
              >
                {/* Stars */}
                <div className="mb-6 flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[#C2A68C] text-[#C2A68C]" />
                  ))}
                </div>

                {/* Quote */}
                <p className="mb-8 text-lg leading-relaxed text-[#5D866C]">"{testimonial.text}"</p>

                {/* Author */}
                <div className="flex items-center gap-4 border-t border-[#E6D8C3] pt-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#5D866C] to-[#C2A68C] text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#5D866C]">{testimonial.author}</h4>
                    <p className="text-sm text-[#C2A68C]">{testimonial.role}</p>
                    <p className="text-xs text-[#5D866C]/60">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Elegant */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#5D866C] to-[#C2A68C] px-8 py-40">
        {/* Organic Shapes */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 90, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              className="absolute h-40 w-40 rounded-[40%_60%_70%_30%/60%_30%_70%_40%] border-2 border-white"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mx-auto mb-12 flex h-28 w-28 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm"
          >
            <Sparkles className="h-14 w-14 text-white" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 text-7xl leading-tight font-light text-white"
          >
            ابدأ رحلتك
            <br />
            <span className="font-bold">اليوم</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-16 text-2xl leading-relaxed text-white/90"
          >
            انضم إلى مجتمع النخبة واصنع قصة نجاحك
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col justify-center gap-5 sm:flex-row"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-white px-12 py-5 text-lg font-medium text-[#5D866C] shadow-2xl transition-all hover:bg-[#F5F5F0]"
            >
              انضم كمحترف
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full border-2 border-white bg-transparent px-12 py-5 text-lg font-medium text-white transition-all hover:bg-white hover:text-[#5D866C]"
            >
              ابدأ مشروعك
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer - Minimal & Elegant */}
      <footer className="bg-[#5D866C] px-8 pt-24 pb-12">
        <div className="mx-auto max-w-[1800px]">
          <div className="mb-20 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#C2A68C] to-white">
                  <Leaf className="h-7 w-7 text-[#5D866C]" />
                </div>
                <div>
                  <h3 className="text-2xl font-light text-white">
                    <span className="font-bold">Artisan</span>Hub
                  </h3>
                  <p className="text-[10px] tracking-[0.2em] text-[#E6D8C3]">CRAFT YOUR SUCCESS</p>
                </div>
              </div>

              <p className="mb-10 leading-relaxed text-[#E6D8C3]">
                نربط أفضل المواهب في العالم العربي بأهم الفرص لتحقيق النجاح المشترك
              </p>

              <div className="flex gap-4">
                {[Twitter, Instagram, Linkedin, Facebook].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C2A68C] text-white transition-all hover:bg-white hover:text-[#5D866C]"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              { title: 'المنصة', links: ['عن ArtisanHub', 'كيف نعمل', 'المدونة', 'الوظائف'] },
              { title: 'الخدمات', links: ['للشركات', 'للمحترفين', 'الأسعار', 'API'] },
              { title: 'المساعدة', links: ['الدعم', 'اتصل بنا', 'الشروط', 'الخصوصية'] },
            ].map((column, index) => (
              <div key={index}>
                <h4 className="mb-6 text-base font-bold text-white">{column.title}</h4>
                <ul className="space-y-3">
                  {column.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="text-sm text-[#E6D8C3] transition-colors hover:text-white"
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
          <div className="flex flex-col items-center justify-between gap-6 border-t border-[#C2A68C]/30 pt-8 md:flex-row">
            <p className="text-sm text-[#E6D8C3]">© 2025 ArtisanHub. جميع الحقوق محفوظة.</p>

            <div className="flex gap-6">
              <a href="#" className="text-sm text-[#E6D8C3] hover:text-white">
                الخصوصية
              </a>
              <a href="#" className="text-sm text-[#E6D8C3] hover:text-white">
                الشروط
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ElegantFreelancePlatform;
