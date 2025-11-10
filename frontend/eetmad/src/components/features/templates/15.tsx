'use client';

import { AnimatePresence, motion, useScroll } from 'framer-motion';
import {
  ArrowRight,
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
  FileText,
  Globe,
  Headphones,
  Instagram,
  Layers,
  Lightbulb,
  Linkedin,
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
  X,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';

function ModernFreelanceHub() {
  const [scrollY, setScrollY] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('recommended');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 4);
    }, 6000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  const categories = [
    {
      id: 'all',
      name: 'الكل',
      icon: <Globe className="h-5 w-5" />,
      count: 45623,
      color: '#354259',
    },
    {
      id: 'tech',
      name: 'التقنية',
      icon: <Code className="h-5 w-5" />,
      count: 18942,
      color: '#C2DED1',
    },
    {
      id: 'design',
      name: 'التصميم',
      icon: <Palette className="h-5 w-5" />,
      count: 12765,
      color: '#ECE5C7',
    },
    {
      id: 'marketing',
      name: 'التسويق',
      icon: <Megaphone className="h-5 w-5" />,
      count: 9834,
      color: '#CDC2AE',
    },
    {
      id: 'writing',
      name: 'المحتوى',
      icon: <FileText className="h-5 w-5" />,
      count: 7621,
      color: '#354259',
    },
    {
      id: 'business',
      name: 'الأعمال',
      icon: <Briefcase className="h-5 w-5" />,
      count: 5543,
      color: '#C2DED1',
    },
  ];

  const featuredProjects = [
    {
      id: 1,
      title: 'تطوير تطبيق جوال متكامل لإدارة المشاريع والفرق',
      category: 'التقنية',
      budget: '180,000 - 250,000 ر.س',
      duration: '4-6 أشهر',
      description:
        'نحتاج لفريق محترف لتطوير تطبيق جوال شامل يدعم iOS و Android مع لوحة تحكم ويب، يتضمن ميزات متقدمة لإدارة المشاريع والتعاون بين الفرق',
      client: {
        name: 'شركة التطوير الذكي',
        avatar: '🏢',
        rating: 4.9,
        projects: 87,
        verified: true,
        location: 'الرياض',
        memberSince: '2019',
        spending: '3.2M+',
      },
      skills: ['React Native', 'Node.js', 'MongoDB', 'Firebase', 'AWS', 'TypeScript'],
      applicants: 42,
      views: 1834,
      postedTime: 'منذ 5 ساعات',
      type: 'ثابت',
      level: 'خبير',
      featured: true,
      urgent: false,
    },
    {
      id: 2,
      title: 'تصميم هوية بصرية شاملة لشركة ناشئة في مجال التكنولوجيا',
      category: 'التصميم',
      budget: '85,000 - 120,000 ر.س',
      duration: '2-3 أشهر',
      description:
        'مطلوب مصمم جرافيك محترف لإنشاء هوية بصرية كاملة تشمل الشعار، الألوان، الخطوط، دليل الهوية، قوالب التصميم، والمواد التسويقية',
      client: {
        name: 'تك فيجن للابتكار',
        avatar: '💡',
        rating: 5.0,
        projects: 34,
        verified: true,
        location: 'دبي',
        memberSince: '2020',
        spending: '1.8M+',
      },
      skills: ['Illustrator', 'Photoshop', 'Brand Design', 'Typography', 'Figma'],
      applicants: 67,
      views: 2145,
      postedTime: 'منذ يوم واحد',
      type: 'ثابت',
      level: 'متقدم',
      featured: true,
      urgent: true,
    },
    {
      id: 3,
      title: 'إدارة حملات إعلانية رقمية متكاملة عبر جميع المنصات',
      category: 'التسويق',
      budget: '150,000 ر.س/شهرياً',
      duration: '6 أشهر قابلة للتجديد',
      description:
        'نبحث عن خبير تسويق رقمي لإدارة حملات شاملة على Google Ads، Meta Ads، LinkedIn، مع تحليل متقدم للبيانات وتحسين مستمر للأداء',
      client: {
        name: 'مجموعة النمو الرقمي',
        avatar: '📊',
        rating: 4.8,
        projects: 156,
        verified: true,
        location: 'جدة',
        memberSince: '2018',
        spending: '5.6M+',
      },
      skills: ['Google Ads', 'Facebook Ads', 'SEO/SEM', 'Analytics', 'Content Strategy'],
      applicants: 38,
      views: 1567,
      postedTime: 'منذ 3 ساعات',
      type: 'شهري',
      level: 'خبير',
      featured: false,
      urgent: true,
    },
    {
      id: 4,
      title: 'كتابة محتوى تسويقي احترافي لموقع وتطبيق تجارة إلكترونية',
      category: 'المحتوى',
      budget: '45,000 - 60,000 ر.س',
      duration: '1-2 شهر',
      description:
        'مطلوب كاتب محتوى محترف لإنشاء محتوى تسويقي جذاب لموقع تجارة إلكترونية يشمل أوصاف المنتجات، مقالات المدونة، والمحتوى الترويجي',
      client: {
        name: 'متجر التميز الإلكتروني',
        avatar: '🛍️',
        rating: 4.7,
        projects: 45,
        verified: true,
        location: 'الكويت',
        memberSince: '2021',
        spending: '980K+',
      },
      skills: [
        'Copywriting',
        'SEO Writing',
        'Content Strategy',
        'Arabic Content',
        'Product Description',
      ],
      applicants: 89,
      views: 2876,
      postedTime: 'منذ 2 يوم',
      type: 'ثابت',
      level: 'متوسط',
      featured: false,
      urgent: false,
    },
  ];

  const topExperts = [
    {
      name: 'محمد الأحمد',
      title: 'مهندس برمجيات متقدم',
      specialty: 'Full Stack & Cloud Architecture',
      avatar: '👨‍💻',
      rating: 5.0,
      reviews: 324,
      completedProjects: 487,
      hourlyRate: 650,
      totalEarnings: '4.8M',
      skills: ['React', 'Node.js', 'AWS', 'Python', 'Docker', 'Kubernetes'],
      available: true,
      verified: true,
      topRated: true,
      responseTime: '< 1 ساعة',
      languages: ['العربية', 'English'],
      location: 'الرياض',
      successRate: 99,
      badges: ['top-rated', 'verified', 'expert', 'fast-response'],
    },
    {
      name: 'نورة السالم',
      title: 'مصممة UI/UX متخصصة',
      specialty: 'Product Design & User Experience',
      avatar: '👩‍🎨',
      rating: 5.0,
      reviews: 278,
      completedProjects: 412,
      hourlyRate: 580,
      totalEarnings: '3.9M',
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
      available: true,
      verified: true,
      topRated: true,
      responseTime: '< 30 دقيقة',
      languages: ['العربية', 'English', 'Français'],
      location: 'دبي',
      successRate: 100,
      badges: ['top-rated', 'verified', 'rising-star'],
    },
    {
      name: 'عبدالله الزهراني',
      title: 'خبير تسويق رقمي',
      specialty: 'Growth Marketing & Analytics',
      avatar: '📈',
      rating: 4.9,
      reviews: 256,
      completedProjects: 534,
      hourlyRate: 520,
      totalEarnings: '3.4M',
      skills: ['Growth Hacking', 'SEO', 'PPC', 'Social Media', 'Data Analysis'],
      available: false,
      verified: true,
      topRated: true,
      responseTime: '< 2 ساعة',
      languages: ['العربية', 'English'],
      location: 'جدة',
      successRate: 98,
      badges: ['verified', 'specialist'],
    },
    {
      name: 'لينا حسن',
      title: 'كاتبة محتوى إبداعي',
      specialty: 'Content Writing & Storytelling',
      avatar: '✍️',
      rating: 5.0,
      reviews: 198,
      completedProjects: 623,
      hourlyRate: 420,
      totalEarnings: '2.6M',
      skills: ['Creative Writing', 'SEO Content', 'Copywriting', 'Translation', 'Editing'],
      available: true,
      verified: true,
      topRated: true,
      responseTime: '< 1 ساعة',
      languages: ['العربية', 'English'],
      location: 'القاهرة',
      successRate: 100,
      badges: ['top-rated', 'verified', 'quality'],
    },
    {
      name: 'فيصل المطيري',
      title: 'مطور موبايل محترف',
      specialty: 'iOS & Android Development',
      avatar: '📱',
      rating: 4.9,
      reviews: 234,
      completedProjects: 378,
      hourlyRate: 590,
      totalEarnings: '3.1M',
      skills: ['Swift', 'Kotlin', 'React Native', 'Flutter', 'Firebase'],
      available: true,
      verified: true,
      topRated: true,
      responseTime: '< 1 ساعة',
      languages: ['العربية', 'English'],
      location: 'الكويت',
      successRate: 99,
      badges: ['top-rated', 'verified', 'mobile-expert'],
    },
    {
      name: 'رهام العتيبي',
      title: 'مديرة مشاريع معتمدة',
      specialty: 'Agile Project Management',
      avatar: '👩‍💼',
      rating: 5.0,
      reviews: 189,
      completedProjects: 298,
      hourlyRate: 480,
      totalEarnings: '2.3M',
      skills: ['Scrum', 'Agile', 'Jira', 'Team Management', 'Risk Management'],
      available: true,
      verified: true,
      topRated: true,
      responseTime: '< 2 ساعة',
      languages: ['العربية', 'English'],
      location: 'أبوظبي',
      successRate: 100,
      badges: ['verified', 'pmp-certified'],
    },
  ];

  const platformStats = [
    { label: 'مستقل نشط', value: '250K+', icon: <Users className="h-7 w-7" />, growth: '+32%' },
    {
      label: 'مشروع مكتمل',
      value: '180K+',
      icon: <CheckCircle className="h-7 w-7" />,
      growth: '+48%',
    },
    {
      label: 'قيمة المشاريع',
      value: '4.2B ر.س',
      icon: <DollarSign className="h-7 w-7" />,
      growth: '+64%',
    },
    { label: 'معدل الرضا', value: '4.9/5', icon: <Star className="h-7 w-7" />, growth: '+12%' },
  ];

  const testimonials = [
    {
      text: 'منصة رائعة ساعدتني في إيجاد أفضل المطورين لمشروعي. الجودة عالية والاحترافية واضحة في كل تفاصيل العمل.',
      author: 'أحمد السعيد',
      role: 'مدير تقني',
      company: 'شركة الابتكار الرقمي',
      rating: 5,
      avatar: '👨‍💼',
      projects: 12,
      spending: '850K',
    },
    {
      text: 'كمستقلة، وجدت بيئة عمل مثالية تحترم الوقت والجهد. العملاء محترمون والمشاريع متنوعة ومثيرة للاهتمام.',
      author: 'سارة الدوسري',
      role: 'مصممة UI/UX',
      company: 'مستقلة',
      rating: 5,
      avatar: '👩‍💻',
      projects: 47,
      spending: '1.2M',
    },
    {
      text: 'التجربة الأفضل في مجال العمل الحر. النظام سلس، الدعم ممتاز، والنتائج تفوق التوقعات بكثير.',
      author: 'خالد المنصور',
      role: 'مدير تسويق',
      company: 'مجموعة التميز',
      rating: 5,
      avatar: '📊',
      projects: 23,
      spending: '620K',
    },
    {
      text: 'منصة احترافية بكل المقاييس. وجدت فيها فرص عمل حقيقية وعملاء جادين يقدرون العمل الجيد.',
      author: 'منى الشمري',
      role: 'كاتبة محتوى',
      company: 'مستقلة',
      rating: 5,
      avatar: '✍️',
      projects: 56,
      spending: '780K',
    },
  ];

  const platformFeatures = [
    {
      icon: <Shield className="h-12 w-12" />,
      title: 'حماية كاملة للمدفوعات',
      description: 'نظام دفع آمن 100% مع ضمان استرجاع الأموال في حالة عدم الرضا عن العمل المنجز',
    },
    {
      icon: <BadgeCheck className="h-12 w-12" />,
      title: 'مستقلون معتمدون',
      description: 'جميع المستقلين تم التحقق من هوياتهم ومهاراتهم وخبراتهم بدقة متناهية',
    },
    {
      icon: <Zap className="h-12 w-12" />,
      title: 'سرعة في الإنجاز',
      description: 'معدل تسليم أسرع بنسبة 40% من المنافسين مع الحفاظ على معايير الجودة العالية',
    },
    {
      icon: <Headphones className="h-12 w-12" />,
      title: 'دعم فني مستمر',
      description: 'فريق دعم محترف متاح على مدار الساعة لمساعدتك في أي استفسار أو مشكلة',
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#ECE5C7] font-sans">
      <motion.div
        className="pointer-events-none fixed z-50 hidden h-6 w-6 rounded-full bg-[#354259]/20 mix-blend-difference lg:block"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
      />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 right-0 left-0 z-50 h-1 origin-left bg-gradient-to-r from-[#354259] via-[#C2DED1] to-[#354259]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 right-0 left-0 z-40 transition-all duration-500 ${
          scrollY > 50 ? 'bg-white/90 shadow-2xl backdrop-blur-2xl' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="group flex cursor-pointer items-center gap-4"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#354259] to-[#C2DED1] shadow-xl"
                >
                  <Layers className="h-7 w-7 text-white" />
                </motion.div>
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#C2DED1]"
                />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-[#354259]">المنصة</h1>
                <p className="text-xs font-bold text-[#354259]/60">احترافية بلا حدود</p>
              </div>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden items-center gap-2 lg:flex">
              {[
                { label: 'استكشف المشاريع', icon: <Search className="h-4 w-4" /> },
                { label: 'المستقلون', icon: <Users className="h-4 w-4" /> },
                { label: 'كيف نعمل', icon: <Lightbulb className="h-4 w-4" /> },
                { label: 'الأسعار', icon: <DollarSign className="h-4 w-4" /> },
              ].map((item, index) => (
                <motion.a
                  key={index}
                  whileHover={{ y: -2 }}
                  href="#"
                  className="group relative rounded-xl px-5 py-2.5 text-sm font-bold text-[#354259] transition-all hover:text-[#C2DED1]"
                >
                  <span className="flex items-center gap-2">
                    {item.icon}
                    {item.label}
                  </span>
                  <motion.div className="absolute right-0 bottom-0 left-0 h-1 origin-left scale-x-0 rounded-full bg-[#C2DED1] transition-transform group-hover:scale-x-100" />
                </motion.a>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden items-center gap-3 lg:flex">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-xl px-6 py-3 text-sm font-bold text-[#354259] transition-all hover:bg-[#C2DED1]/20"
              >
                تسجيل الدخول
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(53, 66, 89, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="rounded-xl bg-[#354259] px-8 py-3 text-sm font-bold text-white shadow-xl transition-all hover:shadow-2xl"
              >
                ابدأ الآن
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-xl p-3 text-[#354259] transition-colors hover:bg-[#C2DED1]/20 lg:hidden"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
              className="border-t border-[#CDC2AE]/30 bg-white/95 backdrop-blur-2xl lg:hidden"
            >
              <div className="space-y-3 px-4 py-6">
                {[
                  { label: 'استكشف المشاريع', icon: <Search className="h-5 w-5" /> },
                  { label: 'المستقلون', icon: <Users className="h-5 w-5" /> },
                  { label: 'كيف نعمل', icon: <Lightbulb className="h-5 w-5" /> },
                  { label: 'الأسعار', icon: <DollarSign className="h-5 w-5" /> },
                ].map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 font-bold text-[#354259] transition-colors hover:bg-[#C2DED1]/20"
                  >
                    {item.icon}
                    {item.label}
                  </a>
                ))}
                <div className="space-y-3 pt-4">
                  <button className="w-full rounded-xl border-2 border-[#354259] px-6 py-3 font-bold text-[#354259] transition-colors hover:bg-[#C2DED1]/20">
                    تسجيل الدخول
                  </button>
                  <button className="w-full rounded-xl bg-[#354259] px-6 py-3 font-bold text-white shadow-xl">
                    ابدأ الآن
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-36 pb-28">
        {/* Geometric Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#ECE5C7] via-[#C2DED1]/30 to-[#ECE5C7]" />

          {/* Animated Shapes */}
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute top-20 right-10 h-96 w-96 rounded-full border-4 border-[#354259]/10"
          />
          <motion.div
            animate={{
              rotate: [360, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-20 left-10 h-80 w-80 rounded-full border-4 border-[#C2DED1]/20"
          />
          <motion.div
            animate={{
              y: [0, -30, 0],
              rotate: [0, 45, 0],
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-1/2 left-1/4 h-64 w-64 -rotate-12 transform rounded-3xl bg-[#CDC2AE]/10"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-8 inline-flex items-center gap-3 rounded-2xl border border-[#CDC2AE]/30 bg-white/80 px-5 py-3 shadow-lg backdrop-blur-sm"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="h-5 w-5 text-[#354259]" />
                </motion.div>
                <span className="text-sm font-black text-[#354259]">
                  منصة العمل الحر الأكثر ابتكاراً
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8 text-5xl leading-tight font-black text-[#354259] sm:text-6xl lg:text-7xl"
              >
                اكتشف المواهب
                <span className="mt-3 block bg-gradient-to-r from-[#C2DED1] to-[#354259] bg-clip-text text-transparent">
                  حقق أحلامك
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-12 max-w-xl text-xl leading-relaxed text-[#354259]/70"
              >
                تواصل مع أكثر من <span className="font-black text-[#354259]">250 ألف</span> محترف في
                جميع المجالات
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center gap-3 rounded-2xl bg-[#354259] px-10 py-4 text-lg font-black text-white shadow-2xl transition-all hover:shadow-[0_20px_50px_rgba(53,66,89,0.4)]"
                >
                  ابدأ كعميل
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-2xl border-2 border-[#354259]/20 bg-white px-10 py-4 text-lg font-black text-[#354259] shadow-xl transition-all hover:shadow-2xl"
                >
                  ابدأ كمستقل
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-3 gap-6"
              >
                {[
                  { value: '250K+', label: 'مستقل' },
                  { value: '180K+', label: 'مشروع' },
                  { value: '4.9/5', label: 'تقييم' },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <h3 className="mb-1 text-3xl font-black text-[#354259]">{stat.value}</h3>
                    <p className="text-sm font-bold text-[#354259]/60">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Content - Floating Cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative h-[600px] w-full">
                {/* Card 1 */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    rotate: [-2, 2, -2],
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="absolute top-0 right-0 w-80 rounded-3xl border border-[#CDC2AE]/30 bg-white p-6 shadow-2xl"
                >
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#354259] to-[#C2DED1] text-2xl">
                      👨‍💻
                    </div>
                    <div className="flex-1">
                      <h4 className="font-black text-[#354259]">محمد الأحمد</h4>
                      <p className="text-xs font-semibold text-[#354259]/60">مطور Full Stack</p>
                    </div>
                    <BadgeCheck className="h-6 w-6 text-[#C2DED1]" />
                  </div>
                  <div className="mb-3 flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#C2DED1] text-[#C2DED1]" />
                    ))}
                    <span className="text-sm font-black text-[#354259]">5.0</span>
                  </div>
                  <p className="mb-4 text-sm text-[#354259]/70">487 مشروع مكتمل</p>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Node.js', 'AWS'].map((skill, i) => (
                      <span
                        key={i}
                        className="rounded-lg bg-[#C2DED1]/20 px-3 py-1 text-xs font-bold text-[#354259]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Card 2 */}
                <motion.div
                  animate={{
                    y: [0, 20, 0],
                    rotate: [2, -2, 2],
                  }}
                  transition={{ duration: 7, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-0 left-0 w-80 rounded-3xl border border-[#CDC2AE]/30 bg-white p-6 shadow-2xl"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h4 className="mb-1 font-black text-[#354259]">تطوير تطبيق جوال</h4>
                      <p className="text-xs font-semibold text-[#354259]/60">مشروع جديد</p>
                    </div>
                    <span className="rounded-lg bg-[#C2DED1] px-3 py-1 text-xs font-black text-white">
                      عاجل
                    </span>
                  </div>
                  <p className="mb-4 text-sm text-[#354259]/70">الميزانية: 180,000 ر.س</p>
                  <div className="flex items-center gap-3 text-xs font-semibold text-[#354259]/60">
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      1,834
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      42 عرض
                    </span>
                  </div>
                </motion.div>

                {/* Floating Badge */}
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-2xl bg-gradient-to-r from-[#354259] to-[#C2DED1] px-6 py-4 text-white shadow-2xl"
                >
                  <div className="text-center">
                    <p className="mb-1 text-3xl font-black">4.2B</p>
                    <p className="text-xs font-bold opacity-90">ريال تم دفعه</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#354259] to-[#C2DED1] opacity-10 blur-xl" />

            <div className="relative rounded-3xl border border-[#CDC2AE]/30 bg-white p-3 shadow-2xl">
              <div className="flex flex-col items-center gap-3 sm:flex-row">
                <div className="flex w-full flex-1 items-center gap-4 px-6">
                  <Search className="h-6 w-6 text-[#354259]/40" />
                  <input
                    type="text"
                    placeholder="ابحث عن مشروع، خدمة، أو مستقل..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-lg font-bold text-[#354259] outline-none placeholder:text-[#354259]/40"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full rounded-2xl bg-gradient-to-r from-[#354259] to-[#C2DED1] px-10 py-4 font-black text-white shadow-xl sm:w-auto"
                >
                  بحث
                </motion.button>
              </div>
            </div>

            {/* Popular Searches */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-3"
            >
              <span className="text-sm font-bold text-[#354259]/60">رائج:</span>
              {['تطوير مواقع', 'تصميم UI/UX', 'تسويق رقمي', 'كتابة محتوى', 'SEO'].map(
                (term, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="rounded-xl bg-[#C2DED1]/20 px-4 py-2 text-sm font-bold text-[#354259] transition-all hover:bg-[#C2DED1]"
                  >
                    {term}
                  </motion.button>
                )
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gradient-to-r from-[#354259] to-[#C2DED1] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {platformStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center"
              >
                <div className="mb-4 inline-flex rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                  <div className="text-white">{stat.icon}</div>
                </div>
                <h3 className="mb-2 text-4xl font-black text-white">{stat.value}</h3>
                <p className="mb-2 font-bold text-white/80">{stat.label}</p>
                <div className="flex items-center justify-center gap-1 text-sm text-white/70">
                  <TrendingUp className="h-4 w-4" />
                  <span className="font-bold">{stat.growth}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-[#ECE5C7] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 text-5xl font-black text-[#354259]"
            >
              تصفح حسب التخصص
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg font-semibold text-[#354259]/60"
            >
              اختر المجال المناسب لك من بين آلاف الفرص
            </motion.p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => setActiveCategory(category.id)}
                className={`group relative overflow-hidden rounded-2xl p-6 text-sm font-bold transition-all ${
                  activeCategory === category.id
                    ? 'bg-[#354259] text-white shadow-2xl'
                    : 'border border-[#CDC2AE]/30 bg-white text-[#354259] hover:shadow-xl'
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-[#C2DED1]/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100 ${
                    activeCategory === category.id ? 'opacity-100' : ''
                  }`}
                />

                <div className="relative z-10 text-center">
                  <div
                    className={`mb-3 inline-flex rounded-xl p-3 ${
                      activeCategory === category.id ? 'bg-white/20' : 'bg-[#C2DED1]/20'
                    }`}
                  >
                    {category.icon}
                  </div>
                  <p className="mb-2 font-black">{category.name}</p>
                  <p
                    className={`text-xs font-bold ${
                      activeCategory === category.id ? 'text-white/70' : 'text-[#354259]/50'
                    }`}
                  >
                    {category.count.toLocaleString()}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-2 text-5xl font-black text-[#354259]"
              >
                المشاريع المميزة
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-lg font-semibold text-[#354259]/60"
              >
                فرص حصرية من عملاء موثوقين
              </motion.p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {['recommended', 'latest', 'highest', 'urgent'].map((filter) => (
                <motion.button
                  key={filter}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedFilter(filter)}
                  className={`rounded-xl px-6 py-3 text-sm font-bold transition-all ${
                    selectedFilter === filter
                      ? 'bg-[#354259] text-white shadow-xl'
                      : 'bg-[#ECE5C7] text-[#354259] hover:shadow-lg'
                  }`}
                >
                  {filter === 'recommended' && '⭐ موصى بها'}
                  {filter === 'latest' && '🆕 الأحدث'}
                  {filter === 'highest' && '💰 الأعلى'}
                  {filter === 'urgent' && '⚡ عاجلة'}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-3xl border-2 border-[#CDC2AE]/30 bg-[#ECE5C7]/30 p-8 transition-all hover:border-[#C2DED1]"
              >
                <motion.div className="absolute inset-0 bg-gradient-to-br from-[#C2DED1]/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-4 flex flex-wrap items-center gap-2">
                        {project.featured && (
                          <span className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#C2DED1] to-[#354259] px-4 py-2 text-xs font-black text-white">
                            <Star className="h-4 w-4 fill-white" />
                            مميز
                          </span>
                        )}
                        {project.urgent && (
                          <motion.span
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-xs font-black text-white"
                          >
                            <Zap className="h-4 w-4" />
                            عاجل
                          </motion.span>
                        )}
                        <span className="rounded-xl border border-[#CDC2AE]/30 bg-white px-4 py-2 text-xs font-black text-[#354259]">
                          {project.category}
                        </span>
                      </div>

                      <h3 className="mb-4 text-2xl leading-tight font-black text-[#354259]">
                        {project.title}
                      </h3>

                      <p className="mb-6 leading-relaxed font-medium text-[#354259]/70">
                        {project.description}
                      </p>

                      {/* Skills */}
                      <div className="mb-6 flex flex-wrap items-center gap-2">
                        {project.skills.map((skill, i) => (
                          <motion.span
                            key={i}
                            whileHover={{ scale: 1.1 }}
                            className="rounded-lg border border-[#CDC2AE]/30 bg-white px-3 py-2 text-xs font-bold text-[#354259]"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 15 }}
                      className="rounded-xl border border-[#CDC2AE]/30 bg-white p-3 text-[#354259] transition-all hover:bg-[#C2DED1] hover:text-white"
                    >
                      <Bookmark className="h-5 w-5" />
                    </motion.button>
                  </div>

                  {/* Client Info */}
                  <div className="mb-6 flex items-center gap-4 rounded-2xl border border-[#CDC2AE]/30 bg-white p-5">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#354259] to-[#C2DED1] text-3xl shadow-lg">
                      {project.client.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <h4 className="font-black text-[#354259]">{project.client.name}</h4>
                        {project.client.verified && (
                          <BadgeCheck className="h-5 w-5 text-[#C2DED1]" />
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs font-bold text-[#354259]/60">
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-[#C2DED1] text-[#C2DED1]" />
                          {project.client.rating}
                        </span>
                        <span>•</span>
                        <span>{project.client.projects} مشروع</span>
                        <span>•</span>
                        <span>{project.client.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <div className="rounded-xl border border-[#CDC2AE]/30 bg-white p-4 text-center">
                      <p className="mb-1 text-xl font-black text-[#354259]">{project.budget}</p>
                      <p className="text-xs font-bold text-[#354259]/60">الميزانية</p>
                    </div>
                    <div className="rounded-xl border border-[#CDC2AE]/30 bg-white p-4 text-center">
                      <p className="mb-1 text-lg font-black text-[#354259]">{project.duration}</p>
                      <p className="text-xs font-bold text-[#354259]/60">المدة</p>
                    </div>
                    <div className="rounded-xl border border-[#CDC2AE]/30 bg-white p-4 text-center">
                      <p className="mb-1 text-xl font-black text-[#354259]">{project.applicants}</p>
                      <p className="text-xs font-bold text-[#354259]/60">عرض</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t border-[#CDC2AE]/30 pt-6">
                    <div className="flex items-center gap-4 text-sm font-bold text-[#354259]/60">
                      <span className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        {project.views}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {project.postedTime}
                      </span>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 rounded-xl bg-[#354259] px-8 py-3 font-black text-white shadow-xl"
                    >
                      تقديم عرض
                      <Send className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              className="rounded-2xl border-2 border-[#354259] bg-white px-12 py-4 text-lg font-black text-[#354259] shadow-xl transition-all hover:shadow-2xl"
            >
              عرض جميع المشاريع
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Top Experts */}
      <section className="bg-[#ECE5C7] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 text-5xl font-black text-[#354259]"
            >
              نخبة المستقلين
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg font-semibold text-[#354259]/60"
            >
              تعرف على الخبراء الأعلى تقييماً والأكثر احترافية
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {topExperts.map((expert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative overflow-hidden rounded-3xl border-2 border-[#CDC2AE]/30 bg-white p-8 transition-all hover:border-[#C2DED1]"
              >
                <motion.div className="absolute inset-0 bg-gradient-to-br from-[#C2DED1]/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {expert.topRated && (
                        <span className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-[#C2DED1] to-[#354259] px-3 py-1.5 text-xs font-black text-white">
                          <Crown className="h-3 w-3" />
                          TOP
                        </span>
                      )}
                    </div>
                    <motion.div
                      animate={{
                        scale: expert.available ? [1, 1.2, 1] : 1,
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`h-3 w-3 rounded-full ${expert.available ? 'bg-green-500' : 'bg-gray-400'}`}
                    />
                  </div>

                  {/* Avatar */}
                  <div className="relative mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="mx-auto flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-[#354259] to-[#C2DED1] text-6xl shadow-2xl"
                    >
                      {expert.avatar}
                    </motion.div>
                    {expert.verified && (
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform">
                        <div className="rounded-full border-2 border-[#C2DED1] bg-white p-2 shadow-xl">
                          <BadgeCheck className="h-6 w-6 text-[#C2DED1]" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="mb-6 text-center">
                    <h3 className="mb-1 text-xl font-black text-[#354259]">{expert.name}</h3>
                    <p className="mb-1 text-sm font-bold text-[#354259]/60">{expert.title}</p>
                    <p className="mb-4 text-xs font-semibold text-[#354259]/50">
                      {expert.specialty}
                    </p>

                    {/* Rating */}
                    <div className="mb-6 flex items-center justify-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-[#C2DED1] text-[#C2DED1]" />
                        ))}
                      </div>
                      <span className="text-sm font-black text-[#354259]">{expert.rating}</span>
                      <span className="text-xs font-bold text-[#354259]/60">
                        ({expert.reviews})
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="mb-6 grid grid-cols-2 gap-4">
                    <div className="rounded-xl border border-[#CDC2AE]/30 bg-[#ECE5C7]/50 p-4 text-center">
                      <p className="text-2xl font-black text-[#354259]">
                        {expert.completedProjects}
                      </p>
                      <p className="text-xs font-bold text-[#354259]/60">مشروع</p>
                    </div>
                    <div className="rounded-xl border border-[#CDC2AE]/30 bg-[#ECE5C7]/50 p-4 text-center">
                      <p className="text-2xl font-black text-[#354259]">{expert.successRate}%</p>
                      <p className="text-xs font-bold text-[#354259]/60">نجاح</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-6 flex flex-wrap items-center gap-2">
                    {expert.skills.slice(0, 4).map((skill, i) => (
                      <span
                        key={i}
                        className="rounded-lg bg-[#C2DED1]/20 px-3 py-1.5 text-xs font-bold text-[#354259]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Rate */}
                  <div className="mb-6 flex items-center justify-between rounded-xl border border-[#CDC2AE]/30 bg-gradient-to-r from-[#ECE5C7] to-[#C2DED1]/20 p-4">
                    <span className="text-xs font-bold text-[#354259]/60">السعر/ساعة</span>
                    <span className="text-2xl font-black text-[#354259]">
                      {expert.hourlyRate} ر.س
                    </span>
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full rounded-xl bg-[#354259] py-4 font-black text-white shadow-xl transition-all hover:shadow-2xl"
                  >
                    عرض الملف الشخصي
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 text-5xl font-black text-[#354259]"
            >
              لماذا المنصة؟
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg font-semibold text-[#354259]/60"
            >
              تجربة عمل حر استثنائية بمعايير عالمية
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {platformFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative rounded-3xl border-2 border-[#CDC2AE]/30 bg-[#ECE5C7]/30 p-8 transition-all hover:border-[#C2DED1]"
              >
                <motion.div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#C2DED1]/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="mb-6 inline-flex rounded-2xl border border-[#CDC2AE]/30 bg-white p-5 text-[#354259] shadow-lg">
                    {feature.icon}
                  </div>

                  <h3 className="mb-4 text-xl font-black text-[#354259]">{feature.title}</h3>
                  <p className="leading-relaxed font-medium text-[#354259]/70">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-br from-[#354259] to-[#C2DED1] px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 text-5xl font-black text-white"
            >
              ماذا يقول عملاؤنا
            </motion.h2>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="rounded-3xl border-2 border-white/20 bg-white/10 p-12 backdrop-blur-2xl"
              >
                <div className="mb-8 inline-flex rounded-2xl bg-white/10 p-5">
                  <MessageCircle className="h-10 w-10 text-white" />
                </div>

                <div className="mb-8 flex items-center gap-2">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-7 w-7 fill-white text-white" />
                  ))}
                </div>

                <p className="mb-10 text-2xl leading-relaxed font-semibold text-white">
                  "{testimonials[currentTestimonial].text}"
                </p>

                <div className="flex items-center gap-5">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 text-3xl text-white backdrop-blur-sm">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-1 text-xl font-black text-white">
                      {testimonials[currentTestimonial].author}
                    </h4>
                    <p className="mb-1 text-sm font-semibold text-white/80">
                      {testimonials[currentTestimonial].role}
                    </p>
                    <p className="text-xs font-semibold text-white/60">
                      {testimonials[currentTestimonial].company}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-black text-white">
                      {testimonials[currentTestimonial].projects}
                    </p>
                    <p className="text-xs font-bold text-white/70">مشروع</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex items-center justify-center gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`rounded-full transition-all ${
                    currentTestimonial === index ? 'h-4 w-16 bg-white' : 'h-4 w-4 bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#ECE5C7] px-4 py-28">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-10 inline-flex rounded-3xl bg-gradient-to-br from-[#354259] to-[#C2DED1] p-8 shadow-2xl">
              <Rocket className="h-20 w-20 text-white" />
            </div>

            <h2 className="mb-8 text-5xl leading-tight font-black text-[#354259] sm:text-6xl lg:text-7xl">
              ابدأ رحلة النجاح
            </h2>

            <p className="mx-auto mb-14 max-w-2xl text-xl font-semibold text-[#354259]/70">
              انضم إلى <span className="font-black text-[#354259]">250 ألف</span> محترف واكتشف
              عالماً من الفرص
            </p>

            <div className="mb-14 flex flex-col items-center justify-center gap-5 sm:flex-row">
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                className="w-full rounded-2xl bg-[#354259] px-14 py-5 text-xl font-black text-white shadow-2xl transition-all hover:shadow-[0_25px_60px_rgba(53,66,89,0.4)] sm:w-auto"
              >
                ابدأ كعميل
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                className="w-full rounded-2xl border-2 border-[#354259] bg-white px-14 py-5 text-xl font-black text-[#354259] shadow-xl transition-all hover:shadow-2xl sm:w-auto"
              >
                ابدأ كمستقل
              </motion.button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-10">
              {[
                { icon: <CheckCircle className="h-6 w-6" />, text: 'تسجيل مجاني' },
                { icon: <Shield className="h-6 w-6" />, text: 'دفع آمن 100%' },
                { icon: <Headphones className="h-6 w-6" />, text: 'دعم 24/7' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-lg font-black text-[#354259]"
                >
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-[#CDC2AE]/30 bg-white px-4 pt-20 pb-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#354259] to-[#C2DED1] shadow-xl">
                  <Layers className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-[#354259]">المنصة</h3>
                  <p className="text-xs font-bold text-[#354259]/60">احترافية بلا حدود</p>
                </div>
              </div>

              <p className="mb-10 max-w-md leading-relaxed font-medium text-[#354259]/70">
                منصة العمل الحر الأكثر ابتكاراً في المنطقة، تربط المواهب بالفرص وتحقق الأحلام
              </p>

              <div className="flex items-center gap-4">
                {[Twitter, Instagram, Linkedin, Facebook].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#CDC2AE]/30 bg-[#ECE5C7] text-[#354259] shadow-lg transition-all hover:bg-gradient-to-br hover:from-[#354259] hover:to-[#C2DED1] hover:text-white hover:shadow-xl"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {[
              { title: 'عن المنصة', links: ['من نحن', 'كيف نعمل', 'المدونة', 'الوظائف'] },
              { title: 'الخدمات', links: ['للعملاء', 'للمستقلين', 'التسعير', 'الشركات'] },
              { title: 'الدعم', links: ['مركز المساعدة', 'الأسئلة الشائعة', 'اتصل بنا', 'الشروط'] },
            ].map((column, index) => (
              <div key={index}>
                <h4 className="mb-6 text-lg font-black text-[#354259]">{column.title}</h4>
                <ul className="space-y-4">
                  {column.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="font-semibold text-[#354259]/60 transition-colors hover:text-[#354259]"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t-2 border-[#CDC2AE]/30 pt-10">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="font-bold text-[#354259]/60">© 2025 المنصة. جميع الحقوق محفوظة.</p>
              <div className="flex items-center gap-8">
                <a
                  href="#"
                  className="font-bold text-[#354259]/60 transition-colors hover:text-[#354259]"
                >
                  الشروط والأحكام
                </a>
                <a
                  href="#"
                  className="font-bold text-[#354259]/60 transition-colors hover:text-[#354259]"
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

export default ModernFreelanceHub;
