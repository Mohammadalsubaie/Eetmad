'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Bookmark,
  Briefcase,
  Camera,
  CheckCircle,
  ChevronRight,
  Clock,
  Code,
  Crown,
  DollarSign,
  Eye,
  Facebook,
  FileText,
  Github,
  Globe,
  Instagram,
  Layers,
  Linkedin,
  MapPin,
  Megaphone,
  Menu,
  MessageCircle,
  Palette,
  Rocket,
  Search,
  Send,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Twitter,
  Users,
  Verified,
  X,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';

function EliteFreelancePlatform() {
  const [scrollY, setScrollY] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('featured');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const premiumProjects = [
    {
      id: 1,
      title: 'تطوير تطبيق موبايل للتجارة الإلكترونية',
      category: 'تطوير التطبيقات',
      budget: '180,000',
      duration: '5 أشهر',
      description:
        'نبحث عن فريق تطوير متخصص لبناء تطبيق تجارة إلكترونية متكامل بتقنيات حديثة ونظام دفع آمن',
      client: {
        name: 'مجموعة الابتكار التجاري',
        rating: 4.9,
        completedProjects: 68,
        verified: true,
        memberSince: '2019',
        country: 'السعودية',
      },
      skills: ['React Native', 'Node.js', 'PostgreSQL', 'AWS', 'Payment Gateway'],
      proposals: 42,
      views: 1847,
      featured: true,
      urgent: true,
      postedTime: 'منذ ساعتين',
      status: 'نشط',
      experienceLevel: 'خبير',
      projectType: 'ثابت السعر',
    },
    {
      id: 2,
      title: 'تصميم هوية بصرية متكاملة لشركة تقنية',
      category: 'التصميم الجرافيكي',
      budget: '65,000',
      duration: '3 أشهر',
      description:
        'مطلوب مصمم محترف لإنشاء هوية بصرية شاملة تتضمن الشعار، الألوان، الخطوط، ودليل الهوية البصرية',
      client: {
        name: 'تك فيوتشر',
        rating: 5.0,
        completedProjects: 34,
        verified: true,
        memberSince: '2020',
        country: 'الإمارات',
      },
      skills: ['Illustrator', 'Photoshop', 'Brand Identity', 'Typography', 'UI/UX'],
      proposals: 67,
      views: 2341,
      featured: true,
      urgent: false,
      postedTime: 'منذ 5 ساعات',
      status: 'نشط',
      experienceLevel: 'متوسط',
      projectType: 'ثابت السعر',
    },
    {
      id: 3,
      title: 'حملة تسويق رقمي شاملة عبر منصات التواصل',
      category: 'التسويق الرقمي',
      budget: '95,000',
      duration: '4 أشهر',
      description:
        'إدارة وتنفيذ حملة تسويقية متكاملة تشمل جميع منصات التواصل الاجتماعي مع تحليل النتائج',
      client: {
        name: 'براند ميديا',
        rating: 4.8,
        completedProjects: 91,
        verified: true,
        memberSince: '2018',
        country: 'مصر',
      },
      skills: ['Social Media Marketing', 'Google Ads', 'SEO', 'Analytics', 'Content Strategy'],
      proposals: 38,
      views: 1562,
      featured: true,
      urgent: true,
      postedTime: 'منذ يوم واحد',
      status: 'نشط',
      experienceLevel: 'خبير',
      projectType: 'شهري',
    },
    {
      id: 4,
      title: 'كتابة محتوى تقني لموقع تكنولوجيا',
      category: 'الكتابة والمحتوى',
      budget: '28,000',
      duration: '2 شهر',
      description: 'نحتاج كاتب محتوى متخصص في المجال التقني لإنشاء مقالات وأدلة استخدام احترافية',
      client: {
        name: 'تك رايتر',
        rating: 4.7,
        completedProjects: 45,
        verified: true,
        memberSince: '2021',
        country: 'الأردن',
      },
      skills: ['Technical Writing', 'SEO Writing', 'Arabic Content', 'Research', 'Editing'],
      proposals: 89,
      views: 3012,
      featured: false,
      urgent: false,
      postedTime: 'منذ 3 أيام',
      status: 'نشط',
      experienceLevel: 'متوسط',
      projectType: 'ثابت السعر',
    },
    {
      id: 5,
      title: 'تطوير موقع ووردبريس متعدد اللغات',
      category: 'تطوير المواقع',
      budget: '42,000',
      duration: '6 أسابيع',
      description:
        'بناء موقع ووردبريس احترافي متعدد اللغات مع تكامل WooCommerce ونظام إدارة محتوى متقدم',
      client: {
        name: 'ديجيتال سوليوشنز',
        rating: 4.9,
        completedProjects: 56,
        verified: true,
        memberSince: '2019',
        country: 'الكويت',
      },
      skills: ['WordPress', 'PHP', 'WooCommerce', 'Multilingual', 'Custom Themes'],
      proposals: 52,
      views: 1923,
      featured: false,
      urgent: true,
      postedTime: 'منذ 12 ساعة',
      status: 'نشط',
      experienceLevel: 'متوسط',
      projectType: 'ثابت السعر',
    },
    {
      id: 6,
      title: 'إنتاج فيديو موشن جرافيك احترافي',
      category: 'الفيديو والأنيميشن',
      budget: '55,000',
      duration: '5 أسابيع',
      description: 'إنتاج فيديو موشن جرافيك بجودة عالية لشرح خدمات الشركة بأسلوب جذاب ومبتكر',
      client: {
        name: 'كريتيف ستوديو',
        rating: 5.0,
        completedProjects: 78,
        verified: true,
        memberSince: '2017',
        country: 'لبنان',
      },
      skills: ['After Effects', 'Motion Graphics', 'Animation', 'Video Editing', 'Storytelling'],
      proposals: 45,
      views: 2156,
      featured: true,
      urgent: false,
      postedTime: 'منذ يومين',
      status: 'نشط',
      experienceLevel: 'خبير',
      projectType: 'ثابت السعر',
    },
  ];

  const categories = [
    { id: 'all', name: 'الكل', icon: <Globe className="h-5 w-5" />, count: 24567 },
    { id: 'dev', name: 'البرمجة', icon: <Code className="h-5 w-5" />, count: 8934 },
    { id: 'design', name: 'التصميم', icon: <Palette className="h-5 w-5" />, count: 6723 },
    { id: 'marketing', name: 'التسويق', icon: <Megaphone className="h-5 w-5" />, count: 5412 },
    { id: 'writing', name: 'الكتابة', icon: <FileText className="h-5 w-5" />, count: 4589 },
    { id: 'video', name: 'الفيديو', icon: <Camera className="h-5 w-5" />, count: 3267 },
  ];

  const topFreelancers = [
    {
      name: 'أحمد محمود',
      title: 'مطور Full Stack متخصص',
      avatar: '👨‍💻',
      rating: 5.0,
      reviews: 342,
      projects: 456,
      hourlyRate: '450',
      earnings: '3.2M',
      skills: ['React', 'Node.js', 'Python', 'AWS'],
      available: true,
      verified: true,
      topRated: true,
      successRate: 98,
      responseTime: '1 ساعة',
    },
    {
      name: 'فاطمة العلي',
      title: 'مصممة UI/UX كبيرة',
      avatar: '👩‍🎨',
      rating: 5.0,
      reviews: 289,
      projects: 378,
      hourlyRate: '380',
      earnings: '2.7M',
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
      available: true,
      verified: true,
      topRated: true,
      successRate: 99,
      responseTime: '30 دقيقة',
    },
    {
      name: 'خالد السعيد',
      title: 'خبير تسويق رقمي',
      avatar: '📱',
      rating: 4.9,
      reviews: 267,
      projects: 412,
      hourlyRate: '320',
      earnings: '2.4M',
      skills: ['SEO', 'Google Ads', 'Social Media', 'Analytics'],
      available: false,
      verified: true,
      topRated: true,
      successRate: 97,
      responseTime: '2 ساعة',
    },
    {
      name: 'مريم حسن',
      title: 'كاتبة محتوى إبداعي',
      avatar: '✍️',
      rating: 5.0,
      reviews: 198,
      projects: 534,
      hourlyRate: '280',
      earnings: '1.9M',
      skills: ['Copywriting', 'SEO Writing', 'Arabic Content', 'Storytelling'],
      available: true,
      verified: true,
      topRated: true,
      successRate: 100,
      responseTime: '45 دقيقة',
    },
  ];

  const stats = [
    { icon: <Users className="h-8 w-8" />, value: '150K+', label: 'مستقل محترف', growth: '+23%' },
    {
      icon: <Briefcase className="h-8 w-8" />,
      value: '89K+',
      label: 'مشروع مكتمل',
      growth: '+35%',
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      value: '2.4B',
      label: 'ريال تم دفعه',
      growth: '+42%',
    },
    { icon: <Star className="h-8 w-8" />, value: '4.9', label: 'تقييم المنصة', growth: '+5%' },
  ];

  const testimonials = [
    {
      text: 'منصة احترافية بكل المقاييس. وجدت أفضل المطورين لمشروعي وتم التسليم في الوقت المحدد بجودة استثنائية.',
      author: 'سعيد الغامدي',
      role: 'مدير تقني',
      company: 'شركة النخبة التقنية',
      rating: 5,
    },
    {
      text: 'تجربة رائعة في التعامل مع مستقلين محترفين. النظام سهل والدعم ممتاز. حققت نتائج فاقت توقعاتي.',
      author: 'نورة العتيبي',
      role: 'مديرة تسويق',
      company: 'براند ماسترز',
      rating: 5,
    },
    {
      text: 'كمستقل، هذه المنصة غيرت حياتي المهنية. عملاء محترمون ومشاريع متنوعة ونظام دفع آمن وسريع.',
      author: 'محمد الشمري',
      role: 'مصمم جرافيك',
      company: 'مستقل',
      rating: 5,
    },
  ];

  const features = [
    {
      icon: <Shield className="h-12 w-12" />,
      title: 'حماية الدفع',
      description: 'نظام دفع آمن يضمن حقوق الطرفين مع ضمان استرداد الأموال',
      color: 'from-[#0C2B4E] to-[#1A3D64]',
    },
    {
      icon: <Verified className="h-12 w-12" />,
      title: 'مستقلون موثوقون',
      description: 'جميع المستقلين تم التحقق منهم وتقييمهم من قبل عملاء حقيقيين',
      color: 'from-[#1A3D64] to-[#1D546C]',
    },
    {
      icon: <Zap className="h-12 w-12" />,
      title: 'إنجاز سريع',
      description: 'متوسط وقت التسليم أقل من المتوقع بنسبة 40% مع جودة عالية',
      color: 'from-[#1D546C] to-[#0C2B4E]',
    },
    {
      icon: <Award className="h-12 w-12" />,
      title: 'جودة مضمونة',
      description: 'معدل رضا العملاء 98% مع ضمان المراجعات المجانية',
      color: 'from-[#0C2B4E] to-[#1D546C]',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF9EE] via-[#F8FAFC] to-[#F4F4F4] font-sans">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          scrollY > 50
            ? 'bg-white/95 shadow-2xl shadow-[#0C2B4E]/5 backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex cursor-pointer items-center gap-3"
            >
              <div className="relative">
                <div className="flex h-12 w-12 rotate-6 transform items-center justify-center rounded-2xl bg-gradient-to-br from-[#0C2B4E] to-[#1D546C] shadow-lg shadow-[#0C2B4E]/30">
                  <Sparkles className="h-7 w-7 text-[#FAF9EE]" />
                </div>
                <div className="absolute -top-1 -right-1 h-4 w-4 animate-pulse rounded-full bg-gradient-to-br from-[#1D546C] to-[#0C2B4E]"></div>
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-[#0C2B4E]">النخبة</h1>
                <p className="text-xs font-medium text-[#1A3D64]">منصة المحترفين</p>
              </div>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden items-center gap-8 lg:flex">
              {['استكشف المشاريع', 'ابحث عن مستقل', 'كيف تعمل', 'الأسعار'].map((item, index) => (
                <motion.a
                  key={index}
                  whileHover={{ y: -2 }}
                  href="#"
                  className="group relative text-sm font-semibold text-[#0C2B4E] transition-colors hover:text-[#1D546C]"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[#1D546C] to-[#0C2B4E] transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden items-center gap-4 lg:flex">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 text-sm font-bold text-[#0C2B4E] transition-colors hover:text-[#1D546C]"
              >
                تسجيل الدخول
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(12, 43, 78, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="rounded-xl bg-gradient-to-r from-[#0C2B4E] via-[#1A3D64] to-[#1D546C] px-8 py-3 text-sm font-bold text-white shadow-lg shadow-[#0C2B4E]/30 transition-all duration-300 hover:shadow-2xl"
              >
                ابدأ الآن
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-lg p-2 text-[#0C2B4E] transition-colors hover:bg-[#EEEEEE] lg:hidden"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-[#EEEEEE] bg-white shadow-2xl lg:hidden"
            >
              <div className="space-y-4 px-4 py-6">
                {['استكشف المشاريع', 'ابحث عن مستقل', 'كيف تعمل', 'الأسعار'].map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block py-2 font-semibold text-[#0C2B4E] transition-colors hover:text-[#1D546C]"
                  >
                    {item}
                  </a>
                ))}
                <div className="space-y-3 pt-4">
                  <button className="w-full rounded-xl border-2 border-[#0C2B4E] px-6 py-3 font-bold text-[#0C2B4E] transition-colors hover:bg-[#EEEEEE]">
                    تسجيل الدخول
                  </button>
                  <button className="w-full rounded-xl bg-gradient-to-r from-[#0C2B4E] to-[#1D546C] px-6 py-3 font-bold text-white shadow-lg">
                    ابدأ الآن
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-32 pb-24">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-gradient-to-br from-[#1D546C]/10 to-transparent blur-3xl"
          />
          <motion.div
            animate={{
              rotate: [360, 0],
              scale: [1.2, 1, 1.2],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-1/4 -left-1/4 h-1/2 w-1/2 rounded-full bg-gradient-to-tr from-[#0C2B4E]/10 to-transparent blur-3xl"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#1A3D64]/20 bg-gradient-to-r from-[#0C2B4E]/10 to-[#1D546C]/10 px-6 py-3"
            >
              <Crown className="h-5 w-5 text-[#1D546C]" />
              <span className="text-sm font-bold text-[#0C2B4E]">منصة النخبة للمحترفين</span>
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#1D546C]"></div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 text-5xl leading-tight font-black text-[#0C2B4E] sm:text-6xl lg:text-7xl"
            >
              اعثر على أفضل
              <span className="mt-2 block bg-gradient-to-r from-[#1D546C] via-[#1A3D64] to-[#0C2B4E] bg-clip-text text-transparent">
                المحترفين العرب
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed font-medium text-[#1A3D64]"
            >
              تواصل مع أكثر من 150 ألف مستقل محترف في مختلف المجالات. احصل على مشروعك بجودة عالية
              وفي الوقت المحدد.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mx-auto mb-12 max-w-3xl"
            >
              <div className="group relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#0C2B4E] via-[#1A3D64] to-[#1D546C] opacity-20 blur-xl transition-opacity group-hover:opacity-30"></div>
                <div className="relative flex items-center gap-2 rounded-2xl bg-white p-2 shadow-2xl shadow-[#0C2B4E]/20">
                  <div className="flex flex-1 items-center gap-3 px-4">
                    <Search className="h-6 w-6 text-[#1A3D64]" />
                    <input
                      type="text"
                      placeholder="ابحث عن خدمة، مستقل، أو مشروع..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 bg-transparent text-lg font-medium text-[#0C2B4E] outline-none placeholder:text-[#1A3D64]/50"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#0C2B4E] via-[#1A3D64] to-[#1D546C] px-8 py-4 font-bold text-white shadow-lg shadow-[#0C2B4E]/30 transition-all duration-300 hover:shadow-2xl"
                  >
                    <span>ابحث</span>
                    <ArrowRight className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>

              {/* Popular Searches */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <span className="text-sm font-medium text-[#1A3D64]">بحث شائع:</span>
                {['تطوير تطبيقات', 'تصميم UI/UX', 'تسويق رقمي', 'كتابة محتوى', 'موشن جرافيك'].map(
                  (term, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="rounded-lg bg-[#EEEEEE] px-4 py-2 text-sm font-semibold text-[#0C2B4E] transition-all duration-300 hover:bg-gradient-to-r hover:from-[#0C2B4E] hover:to-[#1D546C] hover:text-white"
                    >
                      {term}
                    </motion.button>
                  )
                )}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 gap-6 lg:grid-cols-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="rounded-2xl bg-white p-6 shadow-xl shadow-[#0C2B4E]/10 transition-all duration-300 hover:shadow-2xl"
                >
                  <div className="mb-3 flex items-center justify-center">
                    <div className="rounded-xl bg-gradient-to-br from-[#0C2B4E]/10 to-[#1D546C]/10 p-3 text-[#1D546C]">
                      {stat.icon}
                    </div>
                  </div>
                  <h3 className="mb-1 text-3xl font-black text-[#0C2B4E]">{stat.value}</h3>
                  <p className="mb-2 text-sm font-semibold text-[#1A3D64]">{stat.label}</p>
                  <div className="flex items-center justify-center gap-1 text-green-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-xs font-bold">{stat.growth}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0C2B4E]/10 to-[#1D546C]/10 px-5 py-2"
            >
              <Layers className="h-5 w-5 text-[#1D546C]" />
              <span className="text-sm font-bold text-[#0C2B4E]">التصنيفات</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 text-4xl font-black text-[#0C2B4E] sm:text-5xl"
            >
              استكشف المجالات
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mx-auto max-w-2xl text-xl text-[#1A3D64]"
            >
              اختر من بين أكثر المجالات طلباً واعثر على المستقل المثالي لمشروعك
            </motion.p>
          </div>

          {/* Categories Grid */}
          <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -3 }}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-3 rounded-xl px-6 py-4 text-sm font-bold shadow-lg transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-[#0C2B4E] via-[#1A3D64] to-[#1D546C] text-white shadow-[#0C2B4E]/30'
                    : 'bg-white text-[#0C2B4E] shadow-[#0C2B4E]/10 hover:bg-[#F4F4F4]'
                }`}
              >
                {category.icon}
                <span>{category.name}</span>
                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    activeCategory === category.id ? 'bg-white/20' : 'bg-[#EEEEEE]'
                  }`}
                >
                  {category.count.toLocaleString()}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="bg-gradient-to-br from-[#FAF9EE] to-[#F8FAFC] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="mb-12 flex items-center justify-between">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0C2B4E]/10 to-[#1D546C]/10 px-5 py-2"
              >
                <Sparkles className="h-5 w-5 text-[#1D546C]" />
                <span className="text-sm font-bold text-[#0C2B4E]">المشاريع المميزة</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-black text-[#0C2B4E]"
              >
                مشاريع بانتظارك
              </motion.h2>
            </div>

            {/* Filters */}
            <div className="hidden items-center gap-3 sm:flex">
              {['featured', 'urgent', 'highest-paid'].map((filter) => (
                <motion.button
                  key={filter}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedFilter(filter)}
                  className={`rounded-lg px-5 py-2.5 text-sm font-bold transition-all ${
                    selectedFilter === filter
                      ? 'bg-gradient-to-r from-[#0C2B4E] to-[#1D546C] text-white shadow-lg shadow-[#0C2B4E]/30'
                      : 'bg-white text-[#0C2B4E] hover:bg-[#F4F4F4]'
                  }`}
                >
                  {filter === 'featured' && 'مميزة'}
                  {filter === 'urgent' && 'عاجلة'}
                  {filter === 'highest-paid' && 'الأعلى أجراً'}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {premiumProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onMouseEnter={() => setHoveredCard(project.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative overflow-hidden rounded-3xl border border-transparent bg-white p-8 shadow-xl shadow-[#0C2B4E]/10 transition-all duration-500 hover:border-[#1D546C]/20 hover:shadow-2xl hover:shadow-[#0C2B4E]/20"
              >
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1D546C]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex-1">
                      {/* Badges */}
                      <div className="mb-4 flex flex-wrap items-center gap-2">
                        {project.featured && (
                          <span className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#1D546C] to-[#0C2B4E] px-3 py-1.5 text-xs font-bold text-white shadow-lg shadow-[#0C2B4E]/30">
                            <Star className="h-3.5 w-3.5" />
                            مميز
                          </span>
                        )}
                        {project.urgent && (
                          <span className="flex animate-pulse items-center gap-1.5 rounded-full bg-gradient-to-r from-red-500 to-red-600 px-3 py-1.5 text-xs font-bold text-white">
                            <Zap className="h-3.5 w-3.5" />
                            عاجل
                          </span>
                        )}
                        {project.premium && (
                          <span className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-3 py-1.5 text-xs font-bold text-white">
                            <Crown className="h-3.5 w-3.5" />
                            بريميوم
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="mb-3 text-2xl leading-tight font-black text-[#0C2B4E] transition-colors group-hover:text-[#1D546C]">
                        {project.title}
                      </h3>

                      {/* Category */}
                      <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#1A3D64]">
                        <Briefcase className="h-4 w-4" />
                        {project.category}
                      </p>

                      {/* Description */}
                      <p className="mb-6 leading-relaxed text-[#1A3D64]">{project.description}</p>

                      {/* Skills */}
                      <div className="mb-6 flex flex-wrap items-center gap-2">
                        {project.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="cursor-default rounded-lg bg-[#F4F4F4] px-3 py-1.5 text-xs font-semibold text-[#0C2B4E] transition-all duration-300 hover:bg-gradient-to-r hover:from-[#0C2B4E] hover:to-[#1D546C] hover:text-white"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bookmark */}
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 15 }}
                      whileTap={{ scale: 0.9 }}
                      className="rounded-xl bg-[#F4F4F4] p-3 text-[#1A3D64] transition-all duration-300 hover:bg-gradient-to-br hover:from-[#0C2B4E] hover:to-[#1D546C] hover:text-white"
                    >
                      <Bookmark className="h-5 w-5" />
                    </motion.button>
                  </div>

                  {/* Client Info */}
                  <div className="mb-6 flex items-center gap-4 rounded-2xl border border-[#EEEEEE] bg-gradient-to-r from-[#FAF9EE] to-[#F8FAFC] p-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0C2B4E] to-[#1D546C] text-2xl shadow-lg">
                      {project.client.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <h4 className="font-bold text-[#0C2B4E]">{project.client.name}</h4>
                        {project.client.verified && (
                          <BadgeCheck className="h-4 w-4 text-[#1D546C]" />
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-[#1A3D64]">
                        <span className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-bold">{project.client.rating}</span>
                        </span>
                        <span>•</span>
                        <span>{project.client.completedProjects} مشروع مكتمل</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {project.client.country}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <div className="rounded-xl bg-gradient-to-br from-[#F4F4F4] to-[#EEEEEE] p-4 text-center">
                      <div className="mb-2 flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-[#1D546C]" />
                      </div>
                      <p className="mb-1 text-2xl font-black text-[#0C2B4E]">{project.budget}</p>
                      <p className="text-xs font-semibold text-[#1A3D64]">الميزانية (ريال)</p>
                    </div>

                    <div className="rounded-xl bg-gradient-to-br from-[#F4F4F4] to-[#EEEEEE] p-4 text-center">
                      <div className="mb-2 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-[#1D546C]" />
                      </div>
                      <p className="mb-1 text-xl font-black text-[#0C2B4E]">{project.duration}</p>
                      <p className="text-xs font-semibold text-[#1A3D64]">المدة المتوقعة</p>
                    </div>

                    <div className="rounded-xl bg-gradient-to-br from-[#F4F4F4] to-[#EEEEEE] p-4 text-center">
                      <div className="mb-2 flex items-center justify-center">
                        <Users className="h-5 w-5 text-[#1D546C]" />
                      </div>
                      <p className="mb-1 text-2xl font-black text-[#0C2B4E]">{project.proposals}</p>
                      <p className="text-xs font-semibold text-[#1A3D64]">عرض مقدم</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t-2 border-[#EEEEEE] pt-4">
                    <div className="flex items-center gap-4 text-sm text-[#1A3D64]">
                      <span className="flex items-center gap-1.5">
                        <Eye className="h-4 w-4" />
                        <span className="font-semibold">{project.views} مشاهدة</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        <span className="font-semibold">{project.postedTime}</span>
                      </span>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05, x: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#0C2B4E] via-[#1A3D64] to-[#1D546C] px-6 py-3 font-bold text-white shadow-lg shadow-[#0C2B4E]/30 transition-all duration-300 hover:shadow-2xl"
                    >
                      <span>تقديم عرض</span>
                      <Send className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Hover Effect Line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredCard === project.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-0 bottom-0 left-0 h-1 origin-left bg-gradient-to-r from-[#0C2B4E] via-[#1A3D64] to-[#1D546C]"
                />
              </motion.div>
            ))}
          </div>

          {/* View More */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="mx-auto flex items-center gap-3 rounded-xl border-2 border-[#0C2B4E] bg-white px-12 py-4 font-bold text-[#0C2B4E] shadow-xl shadow-[#0C2B4E]/10 transition-all duration-300 hover:shadow-2xl"
            >
              <span>عرض جميع المشاريع</span>
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Top Freelancers */}
      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0C2B4E]/10 to-[#1D546C]/10 px-5 py-2"
            >
              <Award className="h-5 w-5 text-[#1D546C]" />
              <span className="text-sm font-bold text-[#0C2B4E]">النخبة</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 text-4xl font-black text-[#0C2B4E] sm:text-5xl"
            >
              أفضل المستقلين
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mx-auto max-w-2xl text-xl text-[#1A3D64]"
            >
              تعرف على المحترفين الأعلى تقييماً والأكثر نجاحاً على المنصة
            </motion.p>
          </div>

          {/* Freelancers Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {topFreelancers.map((freelancer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.03 }}
                className="group relative overflow-hidden rounded-3xl border border-[#EEEEEE] bg-gradient-to-br from-white to-[#FAF9EE] p-6 shadow-xl shadow-[#0C2B4E]/10 transition-all duration-500 hover:border-[#1D546C]/30 hover:shadow-2xl hover:shadow-[#0C2B4E]/20"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1D546C]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Badges */}
                  <div className="mb-4 flex items-center justify-between">
                    {freelancer.topRated && (
                      <span className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 px-2.5 py-1 text-xs font-bold text-white shadow-lg">
                        <Crown className="h-3.5 w-3.5" />
                        TOP
                      </span>
                    )}
                    <div
                      className={`h-3 w-3 rounded-full ${freelancer.available ? 'animate-pulse bg-green-500' : 'bg-gray-400'}`}
                    ></div>
                  </div>

                  {/* Avatar */}
                  <div className="relative mb-4">
                    <div className="mx-auto flex h-24 w-24 transform items-center justify-center rounded-3xl bg-gradient-to-br from-[#0C2B4E] to-[#1D546C] text-5xl shadow-2xl shadow-[#0C2B4E]/40 transition-transform duration-500 group-hover:scale-110">
                      {freelancer.avatar}
                    </div>
                    {freelancer.verified && (
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform">
                        <div className="rounded-full bg-white p-1.5 shadow-lg">
                          <BadgeCheck className="h-5 w-5 text-[#1D546C]" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="mb-4 text-center">
                    <h3 className="mb-1 text-xl font-black text-[#0C2B4E]">{freelancer.name}</h3>
                    <p className="mb-3 text-sm font-semibold text-[#1A3D64]">{freelancer.title}</p>

                    {/* Rating */}
                    <div className="mb-3 flex items-center justify-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-sm font-bold text-[#0C2B4E]">{freelancer.rating}</span>
                      <span className="text-xs text-[#1A3D64]">({freelancer.reviews})</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="mb-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-[#F4F4F4] p-3 text-center">
                      <p className="text-lg font-black text-[#0C2B4E]">{freelancer.projects}</p>
                      <p className="text-xs font-semibold text-[#1A3D64]">مشروع</p>
                    </div>
                    <div className="rounded-xl bg-[#F4F4F4] p-3 text-center">
                      <p className="text-lg font-black text-[#0C2B4E]">{freelancer.successRate}%</p>
                      <p className="text-xs font-semibold text-[#1A3D64]">نجاح</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    {freelancer.skills.slice(0, 3).map((skill, i) => (
                      <span
                        key={i}
                        className="rounded-lg bg-gradient-to-r from-[#0C2B4E]/10 to-[#1D546C]/10 px-2.5 py-1 text-xs font-semibold text-[#0C2B4E]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Hourly Rate */}
                  <div className="mb-4 flex items-center justify-between rounded-xl border border-[#EEEEEE] bg-gradient-to-r from-[#FAF9EE] to-[#F8FAFC] p-3">
                    <span className="text-xs font-semibold text-[#1A3D64]">السعر/ساعة</span>
                    <span className="text-lg font-black text-[#0C2B4E]">
                      {freelancer.hourlyRate} ريال
                    </span>
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0C2B4E] via-[#1A3D64] to-[#1D546C] py-3 font-bold text-white shadow-lg shadow-[#0C2B4E]/30 transition-all duration-300 hover:shadow-2xl"
                  >
                    <span>عرض الملف</span>
                    <ChevronRight className="h-4 w-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0C2B4E] via-[#1A3D64] to-[#1D546C] px-4 py-20">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 right-0 h-96 w-96 rounded-full bg-white/5 blur-3xl"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-white/5 blur-3xl"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 backdrop-blur-xl"
            >
              <Zap className="h-5 w-5 text-[#FAF9EE]" />
              <span className="text-sm font-bold text-[#FAF9EE]">لماذا نحن</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 text-4xl font-black text-white sm:text-5xl"
            >
              مميزات تجعلنا الأفضل
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mx-auto max-w-2xl text-xl text-white/80"
            >
              نوفر لك بيئة عمل آمنة ومحترفة مع ضمان حقوق الجميع
            </motion.p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl transition-all duration-500 hover:border-white/40"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div
                    className={`inline-flex bg-gradient-to-br p-4 ${feature.color} rounded-2xl text-white shadow-2xl shadow-black/30 transition-transform duration-500 group-hover:scale-110`}
                  >
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="mb-3 text-2xl font-black text-white">{feature.title}</h3>
                <p className="leading-relaxed text-white/80">{feature.description}</p>

                {/* Arrow */}
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  className="mt-4 inline-flex text-white/60 transition-colors group-hover:text-white"
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-5xl">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0C2B4E]/10 to-[#1D546C]/10 px-5 py-2"
            >
              <MessageCircle className="h-5 w-5 text-[#1D546C]" />
              <span className="text-sm font-bold text-[#0C2B4E]">آراء العملاء</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 text-4xl font-black text-[#0C2B4E] sm:text-5xl"
            >
              ماذا يقول عملاؤنا
            </motion.h2>
          </div>

          {/* Testimonials Slider */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl border border-[#EEEEEE] bg-gradient-to-br from-[#FAF9EE] to-[#F8FAFC] p-12 shadow-2xl shadow-[#0C2B4E]/10"
              >
                {/* Quote Icon */}
                <div className="mb-8">
                  <div className="inline-flex rounded-2xl bg-gradient-to-br from-[#0C2B4E] to-[#1D546C] p-4 shadow-xl">
                    <MessageCircle className="h-8 w-8 text-white" />
                  </div>
                </div>

                {/* Stars */}
                <div className="mb-6 flex items-center gap-1">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Text */}
                <p className="mb-8 text-2xl leading-relaxed font-medium text-[#0C2B4E]">
                  "{testimonials[activeTestimonial].text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0C2B4E] to-[#1D546C] text-2xl font-black text-white shadow-lg">
                    {testimonials[activeTestimonial].author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-[#0C2B4E]">
                      {testimonials[activeTestimonial].author}
                    </h4>
                    <p className="text-sm font-semibold text-[#1A3D64]">
                      {testimonials[activeTestimonial].role}
                    </p>
                    <p className="text-xs text-[#1A3D64]">
                      {testimonials[activeTestimonial].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="mt-8 flex items-center justify-center gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`rounded-full transition-all duration-300 ${
                    activeTestimonial === index
                      ? 'h-3 w-12 bg-gradient-to-r from-[#0C2B4E] to-[#1D546C]'
                      : 'h-3 w-3 bg-[#EEEEEE] hover:bg-[#1A3D64]/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0C2B4E] via-[#1A3D64] to-[#1D546C] px-4 py-24">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-white/5 blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-white/5 blur-3xl"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Icon */}
            <div className="mb-8">
              <div className="inline-flex rounded-3xl bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
                <Rocket className="h-16 w-16 text-white" />
              </div>
            </div>

            {/* Heading */}
            <h2 className="mb-6 text-4xl leading-tight font-black text-white sm:text-6xl">
              جاهز لبدء رحلتك؟
            </h2>

            {/* Description */}
            <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-white/80">
              انضم إلى أكثر من 150 ألف محترف وابدأ في تحقيق أهدافك اليوم. التسجيل مجاني والبدء سهل.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 rounded-2xl bg-white px-12 py-5 text-lg font-black text-[#0C2B4E] shadow-2xl shadow-black/30 transition-all duration-300 hover:shadow-black/50"
              >
                <span>ابدأ كعميل</span>
                <ChevronRight className="h-6 w-6" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 rounded-2xl border-2 border-white bg-white/10 px-12 py-5 text-lg font-black text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/20"
              >
                <span>ابدأ كمستقل</span>
                <ChevronRight className="h-6 w-6" />
              </motion.button>
            </div>

            {/* Trust Badge */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
              <div className="flex items-center gap-2 text-white/80">
                <CheckCircle className="h-5 w-5" />
                <span className="font-semibold">بدون رسوم مقدمة</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <CheckCircle className="h-5 w-5" />
                <span className="font-semibold">دعم 24/7</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <CheckCircle className="h-5 w-5" />
                <span className="font-semibold">ضمان استرداد الأموال</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#EEEEEE] bg-gradient-to-br from-[#FAF9EE] to-[#F4F4F4] px-4 pt-20 pb-8">
        <div className="mx-auto max-w-7xl">
          {/* Main Footer */}
          <div className="mb-12 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0C2B4E] to-[#1D546C] shadow-lg">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-[#0C2B4E]">النخبة</h3>
                  <p className="text-xs font-medium text-[#1A3D64]">منصة المحترفين</p>
                </div>
              </div>
              <p className="mb-6 leading-relaxed text-[#1A3D64]">
                المنصة الرائدة في العالم العربي التي تربط أصحاب المشاريع بأفضل المستقلين المحترفين.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {[
                  { icon: <Twitter className="h-5 w-5" />, href: '#' },
                  { icon: <Instagram className="h-5 w-5" />, href: '#' },
                  { icon: <Linkedin className="h-5 w-5" />, href: '#' },
                  { icon: <Facebook className="h-5 w-5" />, href: '#' },
                  { icon: <Github className="h-5 w-5" />, href: '#' },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#1A3D64] shadow-lg transition-all duration-300 hover:bg-gradient-to-br hover:from-[#0C2B4E] hover:to-[#1D546C] hover:text-white hover:shadow-2xl"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            {[
              {
                title: 'المنصة',
                links: ['كيف تعمل', 'الأسعار', 'المدونة', 'من نحن', 'اتصل بنا'],
              },
              {
                title: 'الخدمات',
                links: ['البرمجة', 'التصميم', 'التسويق', 'الكتابة', 'الفيديو'],
              },
              {
                title: 'الدعم',
                links: ['مركز المساعدة', 'الأسئلة الشائعة', 'الشروط', 'الخصوصية', 'التقارير'],
              },
            ].map((column, index) => (
              <div key={index}>
                <h4 className="mb-4 text-lg font-black text-[#0C2B4E]">{column.title}</h4>
                <ul className="space-y-3">
                  {column.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="group flex items-center gap-2 font-semibold text-[#1A3D64] transition-colors hover:text-[#0C2B4E]"
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

          {/* Bottom Footer */}
          <div className="border-t-2 border-[#EEEEEE] pt-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-center font-semibold text-[#1A3D64] sm:text-right">
                © 2025 النخبة. جميع الحقوق محفوظة.
              </p>
              <div className="flex items-center gap-6">
                <a
                  href="#"
                  className="font-semibold text-[#1A3D64] transition-colors hover:text-[#0C2B4E]"
                >
                  الشروط والأحكام
                </a>
                <a
                  href="#"
                  className="font-semibold text-[#1A3D64] transition-colors hover:text-[#0C2B4E]"
                >
                  سياسة الخصوصية
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default EliteFreelancePlatform;
