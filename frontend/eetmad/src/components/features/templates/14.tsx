'use client';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
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
  Flame,
  Github,
  Globe,
  Instagram,
  Layers,
  Lightbulb,
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

function PremiumFreelancePlatform() {
  const [scrollY, setScrollY] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('featured');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();
  const scaleProgress = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
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
        badge: 'premium',
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
      engagement: 92,
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
        badge: 'verified',
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
      engagement: 88,
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
        badge: 'top',
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
      engagement: 95,
    },
  ];

  const categories = [
    {
      id: 'all',
      name: 'الكل',
      icon: <Globe className="h-5 w-5" />,
      count: 24567,
      color: 'from-[#0C2B4E] to-[#1A3D64]',
    },
    {
      id: 'dev',
      name: 'البرمجة',
      icon: <Code className="h-5 w-5" />,
      count: 8934,
      color: 'from-[#1A3D64] to-[#1D546C]',
    },
    {
      id: 'design',
      name: 'التصميم',
      icon: <Palette className="h-5 w-5" />,
      count: 6723,
      color: 'from-[#1D546C] to-[#0C2B4E]',
    },
    {
      id: 'marketing',
      name: 'التسويق',
      icon: <Megaphone className="h-5 w-5" />,
      count: 5412,
      color: 'from-[#0C2B4E] to-[#1D546C]',
    },
    {
      id: 'writing',
      name: 'الكتابة',
      icon: <FileText className="h-5 w-5" />,
      count: 4589,
      color: 'from-[#1A3D64] to-[#0C2B4E]',
    },
    {
      id: 'video',
      name: 'الفيديو',
      icon: <Camera className="h-5 w-5" />,
      count: 3267,
      color: 'from-[#1D546C] to-[#1A3D64]',
    },
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
      badges: ['top', 'verified', 'rising'],
      completionRate: 99,
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
      badges: ['top', 'verified'],
      completionRate: 100,
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
      badges: ['verified', 'specialist'],
      completionRate: 98,
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
      badges: ['top', 'verified', 'expert'],
      completionRate: 100,
    },
  ];

  const stats = [
    {
      icon: <Users className="h-8 w-8" />,
      value: '150K+',
      label: 'مستقل محترف',
      growth: '+23%',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      value: '89K+',
      label: 'مشروع مكتمل',
      growth: '+35%',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      value: '2.4B',
      label: 'ريال تم دفعه',
      growth: '+42%',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: <Star className="h-8 w-8" />,
      value: '4.9',
      label: 'تقييم المنصة',
      growth: '+5%',
      color: 'from-amber-500 to-amber-600',
    },
  ];

  const testimonials = [
    {
      text: 'منصة احترافية بكل المقاييس. وجدت أفضل المطورين لمشروعي وتم التسليم في الوقت المحدد بجودة استثنائية.',
      author: 'سعيد الغامدي',
      role: 'مدير تقني',
      company: 'شركة النخبة التقنية',
      rating: 5,
      avatar: '👨‍💼',
      projectValue: '350K',
    },
    {
      text: 'تجربة رائعة في التعامل مع مستقلين محترفين. النظام سهل والدعم ممتاز. حققت نتائج فاقت توقعاتي.',
      author: 'نورة العتيبي',
      role: 'مديرة تسويق',
      company: 'براند ماسترز',
      rating: 5,
      avatar: '👩‍💼',
      projectValue: '220K',
    },
    {
      text: 'كمستقل، هذه المنصة غيرت حياتي المهنية. عملاء محترمون ومشاريع متنوعة ونظام دفع آمن وسريع.',
      author: 'محمد الشمري',
      role: 'مصمم جرافيك',
      company: 'مستقل',
      rating: 5,
      avatar: '🎨',
      projectValue: '180K',
    },
  ];

  const features = [
    {
      icon: <Shield className="h-12 w-12" />,
      title: 'حماية الدفع',
      description: 'نظام دفع آمن يضمن حقوق الطرفين مع ضمان استرداد الأموال',
      color: 'from-[#0C2B4E] to-[#1A3D64]',
      metric: '100%',
      metricLabel: 'معدل الأمان',
    },
    {
      icon: <Verified className="h-12 w-12" />,
      title: 'مستقلون موثوقون',
      description: 'جميع المستقلين تم التحقق منهم وتقييمهم من قبل عملاء حقيقيين',
      color: 'from-[#1A3D64] to-[#1D546C]',
      metric: '98%',
      metricLabel: 'معدل الرضا',
    },
    {
      icon: <Zap className="h-12 w-12" />,
      title: 'إنجاز سريع',
      description: 'متوسط وقت التسليم أقل من المتوقع بنسبة 40% مع جودة عالية',
      color: 'from-[#1D546C] to-[#0C2B4E]',
      metric: '40%',
      metricLabel: 'أسرع في التسليم',
    },
    {
      icon: <Award className="h-12 w-12" />,
      title: 'جودة مضمونة',
      description: 'معدل رضا العملاء 98% مع ضمان المراجعات المجانية',
      color: 'from-[#0C2B4E] to-[#1D546C]',
      metric: '4.9',
      metricLabel: 'التقييم',
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FAF9EE] font-sans">
      <motion.div
        className="pointer-events-none fixed z-50 hidden h-6 w-6 rounded-full border-2 border-[#1D546C] lg:block"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 200,
          mass: 0.5,
        }}
      />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 right-0 left-0 z-50 h-1 origin-left bg-gradient-to-r from-[#0C2B4E] via-[#1A3D64] to-[#1D546C]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 right-0 left-0 z-40 transition-all duration-500 ${
          scrollY > 50
            ? 'border-b border-[#EEEEEE]/50 bg-white/80 shadow-2xl shadow-[#0C2B4E]/5 backdrop-blur-2xl'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="group flex cursor-pointer items-center gap-3"
            >
              <div className="relative">
                <motion.div
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.6 }}
                  className="flex h-12 w-12 rotate-6 transform items-center justify-center rounded-2xl bg-gradient-to-br from-[#0C2B4E] to-[#1D546C] shadow-xl shadow-[#0C2B4E]/30 group-hover:rotate-12"
                >
                  <Sparkles className="h-7 w-7 text-[#FAF9EE]" />
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gradient-to-br from-[#1D546C] to-[#0C2B4E]"
                />
              </div>
              <div>
                <h1 className="bg-gradient-to-r from-[#0C2B4E] to-[#1D546C] bg-clip-text text-2xl font-black tracking-tight text-transparent">
                  النخبة
                </h1>
                <p className="text-xs font-bold text-[#1A3D64]">منصة المحترفين</p>
              </div>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden items-center gap-1 lg:flex">
              {[
                { label: 'استكشف المشاريع', icon: <Briefcase className="h-4 w-4" /> },
                { label: 'ابحث عن مستقل', icon: <Users className="h-4 w-4" /> },
                { label: 'كيف تعمل', icon: <Lightbulb className="h-4 w-4" /> },
                { label: 'الأسعار', icon: <DollarSign className="h-4 w-4" /> },
              ].map((item, index) => (
                <motion.a
                  key={index}
                  whileHover={{ y: -2 }}
                  href="#"
                  className="group relative rounded-xl px-5 py-2.5 text-sm font-bold text-[#0C2B4E] transition-colors hover:bg-[#F4F4F4]/50 hover:text-[#1D546C]"
                >
                  <span className="flex items-center gap-2">
                    {item.icon}
                    {item.label}
                  </span>
                  <motion.span className="absolute right-0 bottom-0 left-0 h-0.5 origin-right scale-x-0 bg-gradient-to-r from-[#1D546C] to-[#0C2B4E] transition-transform group-hover:scale-x-100" />
                </motion.a>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden items-center gap-3 lg:flex">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-xl px-6 py-2.5 text-sm font-bold text-[#0C2B4E] transition-all hover:bg-[#F4F4F4]"
              >
                تسجيل الدخول
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(12, 43, 78, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-[#0C2B4E] via-[#1A3D64] to-[#1D546C] px-8 py-3 text-sm font-bold text-white shadow-xl shadow-[#0C2B4E]/30"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#1D546C] via-[#1A3D64] to-[#0C2B4E]"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  ابدأ الآن
                  <Sparkles className="h-4 w-4" />
                </span>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-xl p-2 text-[#0C2B4E] transition-colors hover:bg-[#EEEEEE] lg:hidden"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-[#EEEEEE]/50 bg-white/95 shadow-2xl backdrop-blur-2xl lg:hidden"
            >
              <div className="space-y-3 px-4 py-6">
                {[
                  { label: 'استكشف المشاريع', icon: <Briefcase className="h-5 w-5" /> },
                  { label: 'ابحث عن مستقل', icon: <Users className="h-5 w-5" /> },
                  { label: 'كيف تعمل', icon: <Lightbulb className="h-5 w-5" /> },
                  { label: 'الأسعار', icon: <DollarSign className="h-5 w-5" /> },
                ].map((item, index) => (
                  <motion.a
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    href="#"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 font-bold text-[#0C2B4E] transition-colors hover:bg-[#F4F4F4]"
                  >
                    {item.icon}
                    {item.label}
                  </motion.a>
                ))}
                <div className="space-y-3 pt-4">
                  <button className="w-full rounded-xl border-2 border-[#0C2B4E] px-6 py-3 font-bold text-[#0C2B4E] transition-colors hover:bg-[#EEEEEE]">
                    تسجيل الدخول
                  </button>
                  <button className="w-full rounded-xl bg-gradient-to-r from-[#0C2B4E] to-[#1D546C] px-6 py-3 font-bold text-white shadow-xl">
                    ابدأ الآن
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-32 pb-32">
        {/* Animated Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-1/2 -right-1/4 h-[800px] w-[800px] rounded-full bg-gradient-to-br from-[#1D546C]/20 via-[#1A3D64]/10 to-transparent blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.3, 1, 1.3],
              rotate: [360, 180, 0],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-1/2 -left-1/4 h-[800px] w-[800px] rounded-full bg-gradient-to-tr from-[#0C2B4E]/20 via-[#1A3D64]/10 to-transparent blur-3xl"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mx-auto max-w-5xl text-center">
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#EEEEEE] bg-white/80 px-6 py-3 shadow-xl shadow-[#0C2B4E]/10 backdrop-blur-xl"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="h-5 w-5 text-[#1D546C]" />
              </motion.div>
              <span className="text-sm font-black text-[#0C2B4E]">منصة النخبة للمحترفين</span>
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-2 w-2 rounded-full bg-[#1D546C]"
              />
            </motion.div>

            {/* Main Heading with Gradient Animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="mb-6 text-5xl leading-[1.1] font-black tracking-tight text-[#0C2B4E] sm:text-6xl lg:text-7xl xl:text-8xl">
                اعثر على
                <motion.span
                  className="mt-2 block bg-gradient-to-r from-[#1D546C] via-[#1A3D64] to-[#0C2B4E] bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0%', '100%', '0%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    backgroundSize: '200% auto',
                  }}
                >
                  أفضل المحترفين
                </motion.span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed font-medium text-[#1A3D64] sm:text-2xl"
            >
              تواصل مع أكثر من <span className="font-black text-[#0C2B4E]">150 ألف</span> مستقل
              محترف في مختلف المجالات
            </motion.p>

            {/* Enhanced Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mx-auto mb-16 max-w-4xl"
            >
              <div className="group relative">
                {/* Glow Effect */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#0C2B4E] via-[#1A3D64] to-[#1D546C] opacity-30 blur-2xl transition-opacity duration-500 group-hover:opacity-50" />

                <div className="relative flex items-center gap-3 rounded-2xl border border-[#EEEEEE] bg-white p-3 shadow-2xl shadow-[#0C2B4E]/20">
                  <div className="flex flex-1 items-center gap-4 px-4">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Search className="h-6 w-6 text-[#1A3D64]" />
                    </motion.div>
                    <input
                      type="text"
                      placeholder="ابحث عن خدمة، مستقل، أو مشروع..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 bg-transparent text-lg font-semibold text-[#0C2B4E] outline-none placeholder:text-[#1A3D64]/50"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-[#0C2B4E] via-[#1A3D64] to-[#1D546C] px-10 py-4 font-bold text-white shadow-xl shadow-[#0C2B4E]/30"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#1D546C] via-[#1A3D64] to-[#0C2B4E]"
                      initial={{ x: '100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      ابحث
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </motion.button>
                </div>
              </div>

              {/* Popular Searches */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 flex flex-wrap items-center justify-center gap-3"
              >
                <span className="flex items-center gap-2 text-sm font-bold text-[#1A3D64]">
                  <Flame className="h-4 w-4 text-orange-500" />
                  بحث شائع:
                </span>
                {['تطوير تطبيقات', 'تصميم UI/UX', 'تسويق رقمي', 'كتابة محتوى', 'موشن جرافيك'].map(
                  (term, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -3 }}
                      className="rounded-xl border border-[#EEEEEE] bg-white px-5 py-2 text-sm font-bold text-[#0C2B4E] shadow-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-[#0C2B4E] hover:to-[#1D546C] hover:text-white hover:shadow-xl"
                    >
                      {term}
                    </motion.button>
                  )
                )}
              </motion.div>
            </motion.div>

            {/* Enhanced Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-2 gap-6 lg:grid-cols-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="hover:shadow-3xl group relative overflow-hidden rounded-3xl border border-[#EEEEEE] bg-white p-8 shadow-2xl shadow-[#0C2B4E]/10"
                >
                  {/* Animated Background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 transition-opacity duration-500 group-hover:opacity-5`}
                  />

                  <div className="relative z-10">
                    {/* Icon with Glow */}
                    <div className="mb-4 flex items-center justify-center">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className={`bg-gradient-to-br p-4 ${stat.color} rounded-2xl text-white shadow-xl`}
                      >
                        {stat.icon}
                      </motion.div>
                    </div>

                    <motion.h3
                      className="mb-2 text-4xl font-black text-[#0C2B4E]"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {stat.value}
                    </motion.h3>

                    <p className="mb-3 text-sm font-bold text-[#1A3D64]">{stat.label}</p>

                    <div className="flex items-center justify-center gap-2 text-green-600">
                      <TrendingUp className="h-5 w-5" />
                      <span className="text-sm font-black">{stat.growth}</span>
                    </div>
                  </div>

                  {/* Border Glow on Hover */}
                  <motion.div
                    className={`absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                    style={{
                      background: `linear-gradient(to bottom right, transparent, ${stat.color})`,
                      padding: '2px',
                      WebkitMask:
                        'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-10 hidden xl:block"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-[#EEEEEE] bg-gradient-to-br from-[#0C2B4E]/20 to-[#1D546C]/20 shadow-2xl backdrop-blur-xl">
            <Code className="h-10 w-10 text-[#1D546C]" />
          </div>
        </motion.div>

        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 right-10 hidden xl:block"
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-[#EEEEEE] bg-gradient-to-br from-[#1D546C]/20 to-[#0C2B4E]/20 shadow-2xl backdrop-blur-xl">
            <Palette className="h-12 w-12 text-[#0C2B4E]" />
          </div>
        </motion.div>
      </section>

      {/* Categories with Enhanced Design */}
      <section className="bg-gradient-to-b from-white to-[#F8FAFC] px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#EEEEEE] bg-white px-6 py-3 shadow-xl"
            >
              <Layers className="h-5 w-5 text-[#1D546C]" />
              <span className="text-sm font-black text-[#0C2B4E]">التصنيفات</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 text-5xl font-black text-[#0C2B4E] sm:text-6xl"
            >
              استكشف المجالات
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mx-auto max-w-2xl text-xl font-medium text-[#1A3D64]"
            >
              اختر من بين أكثر المجالات طلباً واعثر على المستقل المثالي
            </motion.p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`group relative flex items-center gap-3 overflow-hidden rounded-2xl px-8 py-5 text-sm font-black shadow-xl transition-all duration-500 ${
                  activeCategory === category.id
                    ? 'scale-105 bg-gradient-to-r from-[#0C2B4E] via-[#1A3D64] to-[#1D546C] text-white shadow-[#0C2B4E]/30'
                    : 'border border-[#EEEEEE] bg-white text-[#0C2B4E] hover:shadow-2xl'
                }`}
              >
                {activeCategory !== category.id && (
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                  />
                )}

                <span className="relative z-10 flex items-center gap-3">
                  <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                    {category.icon}
                  </motion.div>
                  <span>{category.name}</span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-black ${
                      activeCategory === category.id
                        ? 'bg-white/20'
                        : 'bg-gradient-to-r from-[#F4F4F4] to-[#EEEEEE] text-[#0C2B4E]'
                    }`}
                  >
                    {category.count.toLocaleString()}
                  </span>
                </span>

                {activeCategory === category.id && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#0C2B4E] via-[#1A3D64] to-[#1D546C]"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Projects Section */}
      <section className="bg-[#FAF9EE] px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#EEEEEE] bg-white px-6 py-3 shadow-xl"
              >
                <Crown className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-black text-[#0C2B4E]">المشاريع المميزة</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-3 text-5xl font-black text-[#0C2B4E]"
              >
                مشاريع بانتظارك
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg font-medium text-[#1A3D64]"
              >
                اختر من بين أفضل المشاريع المتاحة الآن
              </motion.p>
            </div>

            <div className="flex items-center gap-3">
              {['featured', 'urgent', 'highest-paid'].map((filter) => (
                <motion.button
                  key={filter}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedFilter(filter)}
                  className={`rounded-xl px-6 py-3 text-sm font-black shadow-lg transition-all ${
                    selectedFilter === filter
                      ? 'bg-gradient-to-r from-[#0C2B4E] to-[#1D546C] text-white shadow-[#0C2B4E]/30'
                      : 'border border-[#EEEEEE] bg-white text-[#0C2B4E] hover:shadow-xl'
                  }`}
                >
                  {filter === 'featured' && '⭐ مميزة'}
                  {filter === 'urgent' && '⚡ عاجلة'}
                  {filter === 'highest-paid' && '💰 الأعلى أجراً'}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {premiumProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -12, scale: 1.02 }}
                onMouseEnter={() => setHoveredCard(project.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="hover:shadow-3xl group relative overflow-hidden rounded-3xl border-2 border-transparent bg-white p-8 shadow-2xl transition-all duration-700 hover:border-[#1D546C]/20"
              >
                {/* Animated Gradient Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#1D546C]/5 via-transparent to-[#0C2B4E]/5 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  animate={{
                    backgroundPosition:
                      hoveredCard === project.id ? ['0% 0%', '100% 100%'] : '0% 0%',
                  }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                  style={{ backgroundSize: '200% 200%' }}
                />

                <div className="relative z-10">
                  {/* Header with Badges */}
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-4 flex flex-wrap items-center gap-2">
                        {project.featured && (
                          <motion.span
                            whileHover={{ scale: 1.1 }}
                            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-2 text-xs font-black text-white shadow-lg"
                          >
                            <Star className="h-4 w-4 fill-white" />
                            مميز
                          </motion.span>
                        )}
                        {project.urgent && (
                          <motion.span
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 text-xs font-black text-white shadow-lg"
                          >
                            <Zap className="h-4 w-4" />
                            عاجل
                          </motion.span>
                        )}
                        <span className="rounded-lg bg-gradient-to-r from-[#F4F4F4] to-[#EEEEEE] px-3 py-1.5 text-xs font-bold text-[#0C2B4E]">
                          {project.category}
                        </span>
                      </div>

                      <h3 className="mb-3 line-clamp-2 text-2xl leading-tight font-black text-[#0C2B4E] transition-colors group-hover:text-[#1D546C]">
                        {project.title}
                      </h3>

                      <p className="mb-6 line-clamp-3 leading-relaxed text-[#1A3D64]">
                        {project.description}
                      </p>

                      {/* Skills */}
                      <div className="mb-6 flex flex-wrap items-center gap-2">
                        {project.skills.map((skill, i) => (
                          <motion.span
                            key={i}
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="cursor-default rounded-lg bg-gradient-to-r from-[#F4F4F4] to-[#EEEEEE] px-3 py-1.5 text-xs font-bold text-[#0C2B4E] transition-all duration-300 hover:from-[#0C2B4E] hover:to-[#1D546C] hover:text-white"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.15, rotate: 15 }}
                      whileTap={{ scale: 0.9 }}
                      className="rounded-xl bg-gradient-to-br from-[#F4F4F4] to-[#EEEEEE] p-3 text-[#1A3D64] shadow-lg transition-all duration-300 hover:from-[#0C2B4E] hover:to-[#1D546C] hover:text-white"
                    >
                      <Bookmark className="h-5 w-5" />
                    </motion.button>
                  </div>

                  {/* Client Info Card */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="mb-6 flex items-center gap-4 rounded-2xl border border-[#EEEEEE] bg-gradient-to-r from-[#FAF9EE] to-[#F8FAFC] p-5 shadow-lg"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0C2B4E] to-[#1D546C] text-3xl shadow-xl"
                    >
                      {project.client.name.charAt(0)}
                    </motion.div>
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <h4 className="font-black text-[#0C2B4E]">{project.client.name}</h4>
                        {project.client.verified && (
                          <BadgeCheck className="h-5 w-5 text-[#1D546C]" />
                        )}
                        {project.client.badge === 'premium' && (
                          <Crown className="h-4 w-4 text-amber-500" />
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-[#1A3D64]">
                        <span className="flex items-center gap-1 font-bold">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          {project.client.rating}
                        </span>
                        <span>•</span>
                        <span className="font-semibold">
                          {project.client.completedProjects} مشروع
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {project.client.country}
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Project Stats */}
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="rounded-xl bg-gradient-to-br from-[#F4F4F4] to-[#EEEEEE] p-4 text-center shadow-lg"
                    >
                      <DollarSign className="mx-auto mb-2 h-6 w-6 text-[#1D546C]" />
                      <p className="mb-1 text-2xl font-black text-[#0C2B4E]">{project.budget}</p>
                      <p className="text-xs font-bold text-[#1A3D64]">الميزانية</p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="rounded-xl bg-gradient-to-br from-[#F4F4F4] to-[#EEEEEE] p-4 text-center shadow-lg"
                    >
                      <Clock className="mx-auto mb-2 h-6 w-6 text-[#1D546C]" />
                      <p className="mb-1 text-xl font-black text-[#0C2B4E]">{project.duration}</p>
                      <p className="text-xs font-bold text-[#1A3D64]">المدة</p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="rounded-xl bg-gradient-to-br from-[#F4F4F4] to-[#EEEEEE] p-4 text-center shadow-lg"
                    >
                      <Users className="mx-auto mb-2 h-6 w-6 text-[#1D546C]" />
                      <p className="mb-1 text-2xl font-black text-[#0C2B4E]">{project.proposals}</p>
                      <p className="text-xs font-bold text-[#1A3D64]">عرض</p>
                    </motion.div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t-2 border-[#EEEEEE] pt-5">
                    <div className="flex items-center gap-4 text-sm text-[#1A3D64]">
                      <span className="flex items-center gap-2 font-bold">
                        <Eye className="h-5 w-5" />
                        {project.views}
                      </span>
                      <span className="flex items-center gap-2 font-bold">
                        <Clock className="h-5 w-5" />
                        {project.postedTime}
                      </span>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05, x: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-[#0C2B4E] via-[#1A3D64] to-[#1D546C] px-8 py-3 font-black text-white shadow-xl shadow-[#0C2B4E]/30"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-[#1D546C] via-[#1A3D64] to-[#0C2B4E]"
                        initial={{ x: '100%' }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="relative z-10 flex items-center gap-2">
                        تقديم عرض
                        <Send className="h-4 w-4" />
                      </span>
                    </motion.button>
                  </div>
                </div>

                {/* Animated Border */}
                <motion.div className="absolute right-0 bottom-0 left-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#0C2B4E] via-[#1A3D64] to-[#1D546C] transition-transform duration-700 group-hover:scale-x-100" />
              </motion.div>
            ))}
          </div>

          {/* View More Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="hover:shadow-3xl mx-auto flex items-center gap-3 rounded-2xl border-2 border-[#0C2B4E] bg-white px-16 py-5 text-lg font-black text-[#0C2B4E] shadow-2xl transition-all duration-300"
            >
              عرض جميع المشاريع
              <ArrowRight className="h-6 w-6" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Top Freelancers */}
      <section className="bg-gradient-to-br from-white via-[#F8FAFC] to-white px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#EEEEEE] bg-white px-6 py-3 shadow-xl"
            >
              <Crown className="h-5 w-5 text-amber-500" />
              <span className="text-sm font-black text-[#0C2B4E]">النخبة</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 text-5xl font-black text-[#0C2B4E] sm:text-6xl"
            >
              أفضل المستقلين
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mx-auto max-w-2xl text-xl font-medium text-[#1A3D64]"
            >
              تعرف على المحترفين الأعلى تقييماً والأكثر نجاحاً
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {topFreelancers.map((freelancer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -15, scale: 1.05 }}
                className="hover:shadow-3xl group relative overflow-hidden rounded-3xl border-2 border-transparent bg-white p-8 shadow-2xl transition-all duration-700 hover:border-[#1D546C]/20"
              >
                {/* Animated Background */}
                <motion.div className="absolute inset-0 bg-gradient-to-br from-[#1D546C]/5 via-transparent to-[#0C2B4E]/5 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                <div className="relative z-10">
                  {/* Top Badges */}
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {freelancer.topRated && (
                        <motion.span
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 px-3 py-1.5 text-xs font-black text-white shadow-lg"
                        >
                          <Crown className="h-3.5 w-3.5" />
                          TOP
                        </motion.span>
                      )}
                    </div>
                    <motion.div
                      animate={{
                        scale: freelancer.available ? [1, 1.2, 1] : 1,
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`h-3 w-3 rounded-full shadow-lg ${freelancer.available ? 'bg-green-500' : 'bg-gray-400'}`}
                    />
                  </div>

                  {/* Avatar */}
                  <div className="relative mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="mx-auto flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-[#0C2B4E] to-[#1D546C] text-6xl shadow-2xl shadow-[#0C2B4E]/40"
                    >
                      {freelancer.avatar}
                    </motion.div>
                    {freelancer.verified && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: 'spring' }}
                        className="absolute -bottom-3 left-1/2 -translate-x-1/2 transform"
                      >
                        <div className="rounded-full bg-white p-2 shadow-xl">
                          <BadgeCheck className="h-6 w-6 text-[#1D546C]" />
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="mb-6 text-center">
                    <h3 className="mb-2 text-xl font-black text-[#0C2B4E]">{freelancer.name}</h3>
                    <p className="mb-4 text-sm font-bold text-[#1A3D64]">{freelancer.title}</p>

                    {/* Rating */}
                    <div className="mb-4 flex items-center justify-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          </motion.div>
                        ))}
                      </div>
                      <span className="text-sm font-black text-[#0C2B4E]">{freelancer.rating}</span>
                      <span className="text-xs text-[#1A3D64]">({freelancer.reviews})</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-bold text-[#1A3D64]">معدل الإنجاز</span>
                        <span className="text-xs font-black text-[#0C2B4E]">
                          {freelancer.completionRate}%
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-[#EEEEEE]">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${freelancer.completionRate}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full rounded-full bg-gradient-to-r from-[#0C2B4E] to-[#1D546C]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="mb-6 grid grid-cols-2 gap-3">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="rounded-xl bg-gradient-to-br from-[#F4F4F4] to-[#EEEEEE] p-4 text-center shadow-lg"
                    >
                      <p className="text-xl font-black text-[#0C2B4E]">{freelancer.projects}</p>
                      <p className="text-xs font-bold text-[#1A3D64]">مشروع</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="rounded-xl bg-gradient-to-br from-[#F4F4F4] to-[#EEEEEE] p-4 text-center shadow-lg"
                    >
                      <p className="text-xl font-black text-[#0C2B4E]">{freelancer.successRate}%</p>
                      <p className="text-xs font-bold text-[#1A3D64]">نجاح</p>
                    </motion.div>
                  </div>

                  {/* Skills */}
                  <div className="mb-6 flex flex-wrap items-center gap-2">
                    {freelancer.skills.slice(0, 3).map((skill, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.1 }}
                        className="rounded-lg bg-gradient-to-r from-[#0C2B4E]/10 to-[#1D546C]/10 px-3 py-1.5 text-xs font-bold text-[#0C2B4E]"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>

                  {/* Hourly Rate */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="mb-6 flex items-center justify-between rounded-xl border border-[#EEEEEE] bg-gradient-to-r from-[#FAF9EE] to-[#F8FAFC] p-4 shadow-lg"
                  >
                    <span className="text-xs font-bold text-[#1A3D64]">السعر/ساعة</span>
                    <span className="text-xl font-black text-[#0C2B4E]">
                      {freelancer.hourlyRate} ر.س
                    </span>
                  </motion.div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group/btn relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#0C2B4E] via-[#1A3D64] to-[#1D546C] py-4 font-black text-white shadow-xl shadow-[#0C2B4E]/30"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#1D546C] via-[#1A3D64] to-[#0C2B4E]"
                      initial={{ x: '100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      عرض الملف
                      <ChevronRight className="h-5 w-5" />
                    </span>
                  </motion.button>
                </div>

                {/* Border Animation */}
                <motion.div className="absolute right-0 bottom-0 left-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#0C2B4E] via-[#1A3D64] to-[#1D546C] transition-transform duration-700 group-hover:scale-x-100" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0C2B4E] via-[#1A3D64] to-[#1D546C] px-4 py-24">
        {/* Animated Orbs */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 right-0 h-96 w-96 rounded-full bg-white/5 blur-3xl"
          />
          <motion.div
            animate={{ rotate: -360, scale: [1.2, 1, 1.2] }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-white/5 blur-3xl"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 shadow-xl backdrop-blur-2xl"
            >
              <Shield className="h-5 w-5 text-white" />
              <span className="text-sm font-black text-white">لماذا نحن</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 text-5xl font-black text-white sm:text-6xl"
            >
              مميزات تجعلنا الأفضل
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mx-auto max-w-2xl text-xl font-medium text-white/80"
            >
              نوفر لك بيئة عمل آمنة ومحترفة مع ضمان حقوق الجميع
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -15, scale: 1.05 }}
                className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-2xl transition-all duration-700 hover:border-white/40"
              >
                {/* Glow Effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity duration-700 group-hover:opacity-20`}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className={`inline-flex bg-gradient-to-br p-5 ${feature.color} rounded-2xl text-white shadow-2xl`}
                    >
                      {feature.icon}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <h3 className="mb-3 text-2xl font-black text-white">{feature.title}</h3>
                  <p className="mb-6 leading-relaxed text-white/80">{feature.description}</p>

                  {/* Metric */}
                  <div className="flex items-end justify-between border-t border-white/20 pt-4">
                    <div>
                      <p className="mb-1 text-3xl font-black text-white">{feature.metric}</p>
                      <p className="text-xs font-bold text-white/60">{feature.metricLabel}</p>
                    </div>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="text-white/60 transition-colors group-hover:text-white"
                    >
                      <ArrowRight className="h-6 w-6" />
                    </motion.div>
                  </div>
                </div>

                {/* Border Glow */}
                <motion.div className="absolute right-0 bottom-0 left-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-white via-white/50 to-white transition-transform duration-700 group-hover:scale-x-100" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#EEEEEE] bg-white px-6 py-3 shadow-xl"
            >
              <MessageCircle className="h-5 w-5 text-[#1D546C]" />
              <span className="text-sm font-black text-[#0C2B4E]">آراء العملاء</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 text-5xl font-black text-[#0C2B4E] sm:text-6xl"
            >
              ماذا يقول عملاؤنا
            </motion.h2>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 100, rotateY: 90 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -100, rotateY: -90 }}
                transition={{ duration: 0.7, type: 'spring' }}
                className="relative overflow-hidden rounded-3xl border-2 border-[#EEEEEE] bg-gradient-to-br from-[#FAF9EE] to-[#F8FAFC] p-12 shadow-2xl"
              >
                {/* Quote Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8"
                >
                  <div className="inline-flex rounded-2xl bg-gradient-to-br from-[#0C2B4E] to-[#1D546C] p-5 shadow-2xl">
                    <MessageCircle className="h-10 w-10 text-white" />
                  </div>
                </motion.div>

                {/* Stars */}
                <div className="mb-6 flex items-center gap-2">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      <Star className="h-7 w-7 fill-amber-400 text-amber-400" />
                    </motion.div>
                  ))}
                </div>

                {/* Text */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-8 text-2xl leading-relaxed font-medium text-[#0C2B4E]"
                >
                  "{testimonials[activeTestimonial].text}"
                </motion.p>

                {/* Author */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center gap-5"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0C2B4E] to-[#1D546C] text-3xl font-black text-white shadow-xl">
                    {testimonials[activeTestimonial].avatar}
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-1 text-xl font-black text-[#0C2B4E]">
                      {testimonials[activeTestimonial].author}
                    </h4>
                    <p className="mb-1 text-sm font-bold text-[#1A3D64]">
                      {testimonials[activeTestimonial].role}
                    </p>
                    <p className="text-xs text-[#1A3D64]">
                      {testimonials[activeTestimonial].company}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-[#0C2B4E]">
                      {testimonials[activeTestimonial].projectValue}
                    </p>
                    <p className="text-xs font-bold text-[#1A3D64]">قيمة المشروع</p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Enhanced Dots */}
            <div className="mt-8 flex items-center justify-center gap-3">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`rounded-full transition-all duration-500 ${
                    activeTestimonial === index
                      ? 'h-4 w-16 bg-gradient-to-r from-[#0C2B4E] to-[#1D546C] shadow-lg'
                      : 'h-4 w-4 bg-[#EEEEEE] hover:bg-[#1A3D64]/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0C2B4E] via-[#1A3D64] to-[#1D546C] px-4 py-32">
        {/* Animated Elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-white/5 blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.3, 1, 1.3],
              rotate: [360, 180, 0],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-white/5 blur-3xl"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Icon */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mb-8"
            >
              <div className="inline-flex rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-2xl">
                <Rocket className="h-20 w-20 text-white" />
              </div>
            </motion.div>

            {/* Heading */}
            <h2 className="mb-6 text-5xl leading-tight font-black text-white sm:text-7xl">
              جاهز لبدء رحلتك؟
            </h2>

            {/* Description */}
            <p className="mx-auto mb-16 max-w-3xl text-2xl leading-relaxed font-medium text-white/80">
              انضم إلى أكثر من <span className="font-black text-white">150 ألف</span> محترف وابدأ في
              تحقيق أهدافك اليوم
            </p>

            {/* Buttons */}
            <div className="mb-16 flex flex-wrap items-center justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden rounded-2xl bg-white px-16 py-6 text-xl font-black text-[#0C2B4E] shadow-2xl"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#F4F4F4] to-[#EEEEEE]"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center gap-3">
                  ابدأ كعميل
                  <Sparkles className="h-6 w-6" />
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 rounded-2xl border-2 border-white bg-white/10 px-16 py-6 text-xl font-black text-white backdrop-blur-2xl transition-all duration-300 hover:bg-white/20"
              >
                ابدأ كمستقل
                <ChevronRight className="h-6 w-6" />
              </motion.button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-8">
              {[
                { icon: <CheckCircle className="h-6 w-6" />, text: 'بدون رسوم مقدمة' },
                { icon: <CheckCircle className="h-6 w-6" />, text: 'دعم 24/7' },
                { icon: <CheckCircle className="h-6 w-6" />, text: 'ضمان استرداد الأموال' },
              ].map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 text-lg font-bold text-white/90"
                >
                  {badge.icon}
                  <span>{badge.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-[#EEEEEE] bg-gradient-to-br from-[#FAF9EE] to-[#F4F4F4] px-4 pt-24 pb-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
            {/* Brand */}
            <div className="lg:col-span-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="mb-6 flex cursor-pointer items-center gap-3"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0C2B4E] to-[#1D546C] shadow-xl">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-[#0C2B4E]">النخبة</h3>
                  <p className="text-xs font-bold text-[#1A3D64]">منصة المحترفين</p>
                </div>
              </motion.div>

              <p className="mb-8 leading-relaxed font-medium text-[#1A3D64]">
                المنصة الرائدة في العالم العربي التي تربط أصحاب المشاريع بأفضل المستقلين المحترفين
              </p>

              <div className="flex items-center gap-3">
                {[Twitter, Instagram, Linkedin, Facebook, Github].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.15, y: -5, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#EEEEEE] bg-white text-[#1A3D64] shadow-lg transition-all duration-300 hover:bg-gradient-to-br hover:from-[#0C2B4E] hover:to-[#1D546C] hover:text-white hover:shadow-2xl"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              { title: 'المنصة', links: ['كيف تعمل', 'الأسعار', 'المدونة', 'من نحن', 'اتصل بنا'] },
              { title: 'الخدمات', links: ['البرمجة', 'التصميم', 'التسويق', 'الكتابة', 'الفيديو'] },
              {
                title: 'الدعم',
                links: ['مركز المساعدة', 'الأسئلة الشائعة', 'الشروط', 'الخصوصية', 'التقارير'],
              },
            ].map((column, index) => (
              <div key={index}>
                <h4 className="mb-6 text-xl font-black text-[#0C2B4E]">{column.title}</h4>
                <ul className="space-y-4">
                  {column.links.map((link, i) => (
                    <li key={i}>
                      <motion.a
                        href="#"
                        whileHover={{ x: 5 }}
                        className="group flex items-center gap-2 font-bold text-[#1A3D64] transition-colors hover:text-[#0C2B4E]"
                      >
                        <motion.div
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          className="h-4 w-1 origin-left rounded-full bg-gradient-to-b from-[#0C2B4E] to-[#1D546C]"
                        />
                        {link}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="border-t-2 border-[#EEEEEE] pt-8">
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <p className="text-center font-bold text-[#1A3D64] sm:text-right">
                © 2025 النخبة. جميع الحقوق محفوظة.
              </p>
              <div className="flex items-center gap-6">
                <a
                  href="#"
                  className="font-bold text-[#1A3D64] transition-colors hover:text-[#0C2B4E]"
                >
                  الشروط والأحكام
                </a>
                <a
                  href="#"
                  className="font-bold text-[#1A3D64] transition-colors hover:text-[#0C2B4E]"
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

export default PremiumFreelancePlatform;
