'use client';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  BarChart3,
  Briefcase,
  CheckCircle,
  Code,
  Edit,
  FileText,
  Headphones,
  Layers,
  Megaphone,
  Menu,
  Palette,
  Play,
  Rocket,
  Shield,
  Star,
  TrendingUp,
  Users,
  Video,
  X,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';

function PremiumFreelancePlatform() {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredService, setHoveredService] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      icon: <Code className="h-10 w-10" />,
      title: 'تطوير البرمجيات',
      description: 'تطبيقات ويب وموبايل متقدمة بأحدث التقنيات',
      projects: '4,892',
      bgGradient: 'from-[#E8E3DB]/30 to-[#E8E3DB]/10',
      iconBg: 'bg-[#163F5C]',
      borderColor: 'border-[#163F5C]/20',
      tags: ['React', 'Node.js', 'Python', 'Flutter'],
      rating: 4.9,
      startingPrice: '5,000 ر.س',
    },
    {
      icon: <Palette className="h-10 w-10" />,
      title: 'التصميم الإبداعي',
      description: 'هويات بصرية وتصاميم UI/UX احترافية',
      projects: '3,654',
      bgGradient: 'from-[#C8BCAE]/30 to-[#C8BCAE]/10',
      iconBg: 'bg-[#0A0A0A]',
      borderColor: 'border-[#C8BCAE]/30',
      tags: ['Figma', 'Illustrator', 'Photoshop', 'XD'],
      rating: 5.0,
      startingPrice: '3,500 ر.س',
    },
    {
      icon: <Megaphone className="h-10 w-10" />,
      title: 'التسويق الرقمي',
      description: 'حملات تسويقية شاملة ونتائج مضمونة',
      projects: '2,847',
      bgGradient: 'from-[#163F5C]/20 to-[#163F5C]/5',
      iconBg: 'bg-[#C8BCAE]',
      borderColor: 'border-[#163F5C]/20',
      tags: ['SEO', 'SEM', 'Social Media', 'Analytics'],
      rating: 4.8,
      startingPrice: '4,200 ر.س',
    },
    {
      icon: <Video className="h-10 w-10" />,
      title: 'المحتوى المرئي',
      description: 'إنتاج فيديو وموشن جرافيك عالي الجودة',
      projects: '1,965',
      bgGradient: 'from-[#0A0A0A]/10 to-[#0A0A0A]/5',
      iconBg: 'bg-[#163F5C]',
      borderColor: 'border-[#0A0A0A]/20',
      tags: ['After Effects', 'Premiere', '3D', 'Animation'],
      rating: 4.9,
      startingPrice: '6,500 ر.س',
    },
    {
      icon: <FileText className="h-10 w-10" />,
      title: 'الكتابة والترجمة',
      description: 'محتوى إبداعي وترجمة احترافية دقيقة',
      projects: '2,341',
      bgGradient: 'from-[#C8BCAE]/20 to-[#C8BCAE]/5',
      iconBg: 'bg-[#0A0A0A]',
      borderColor: 'border-[#C8BCAE]/30',
      tags: ['SEO Writing', 'Translation', 'Copywriting'],
      rating: 4.7,
      startingPrice: '1,800 ر.س',
    },
    {
      icon: <Briefcase className="h-10 w-10" />,
      title: 'الاستشارات',
      description: 'استشارات استراتيجية وحلول أعمال متكاملة',
      projects: '1,523',
      bgGradient: 'from-[#163F5C]/15 to-[#163F5C]/5',
      iconBg: 'bg-[#C8BCAE]',
      borderColor: 'border-[#163F5C]/20',
      tags: ['Strategy', 'Business', 'Finance', 'HR'],
      rating: 5.0,
      startingPrice: '7,500 ر.س',
    },
  ];

  const portfolioItems = [
    {
      title: 'منصة تجارة إلكترونية متكاملة',
      category: 'تطوير ويب',
      image: '🛒',
      gradient: 'from-[#163F5C] via-[#1F5278] to-[#163F5C]',
      freelancer: 'أحمد السعيد',
      avatar: '👨‍💻',
      duration: '3 أشهر',
      budget: '45,000 ر.س',
      rating: 5.0,
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
      views: '12.5K',
      likes: '1.2K',
    },
    {
      title: 'هوية بصرية فاخرة لعلامة تجارية',
      category: 'تصميم وبراندنج',
      image: '✨',
      gradient: 'from-[#C8BCAE] via-[#D4C8BB] to-[#C8BCAE]',
      freelancer: 'سارة المالكي',
      avatar: '👩‍🎨',
      duration: '6 أسابيع',
      budget: '28,000 ر.س',
      rating: 5.0,
      technologies: ['Illustrator', 'Photoshop', 'InDesign'],
      views: '18.3K',
      likes: '2.1K',
    },
    {
      title: 'حملة تسويقية متعددة القنوات',
      category: 'تسويق رقمي',
      image: '📱',
      gradient: 'from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A]',
      freelancer: 'خالد العمري',
      avatar: '📊',
      duration: '4 أشهر',
      budget: '65,000 ر.س',
      rating: 4.9,
      technologies: ['Google Ads', 'Facebook', 'SEO', 'Analytics'],
      views: '25.7K',
      likes: '3.4K',
    },
    {
      title: 'تطبيق موبايل للصحة واللياقة',
      category: 'تطبيقات موبايل',
      image: '💪',
      gradient: 'from-[#163F5C] via-[#2A5A7A] to-[#163F5C]',
      freelancer: 'نورة الشهري',
      avatar: '👩‍💼',
      duration: '5 أشهر',
      budget: '85,000 ر.س',
      rating: 5.0,
      technologies: ['Flutter', 'Firebase', 'AI/ML'],
      views: '31.2K',
      likes: '4.8K',
    },
  ];

  const testimonials = [
    {
      name: 'فهد الدوسري',
      role: 'الرئيس التنفيذي',
      company: 'شركة الابتكار التقني',
      avatar: '👔',
      rating: 5,
      text: 'تجربة استثنائية بكل المقاييس. المنصة سهلة الاستخدام والمحترفون على أعلى مستوى. أنجزنا مشروعاً بقيمة 150 ألف ريال بجودة فاقت كل التوقعات.',
      gradient: 'from-[#163F5C] to-[#2A5A7A]',
      projectType: 'تطوير نظام ERP',
      teamSize: '8 محترفين',
      duration: '6 أشهر',
    },
    {
      name: 'مها القحطاني',
      role: 'مديرة التسويق',
      company: 'براند ستوديو',
      avatar: '👩‍💼',
      rating: 5,
      text: 'احترافية عالية وسرعة في التنفيذ. حققنا زيادة 300% في المبيعات بفضل الحملات التسويقية المبتكرة التي قدمها فريق المحترفين المذهل.',
      gradient: 'from-[#C8BCAE] to-[#D4C8BB]',
      projectType: 'حملة تسويق شاملة',
      teamSize: '5 محترفين',
      duration: '4 أشهر',
    },
    {
      name: 'عبدالله السالم',
      role: 'مؤسس',
      company: 'تك ستارت آب',
      avatar: '🚀',
      rating: 5,
      text: 'المنصة غيرت طريقة عملنا تماماً. وجدنا أفضل المواهب وأنجزنا مشاريع معقدة بميزانيات معقولة. الدعم الفني ممتاز والنتائج مبهرة.',
      gradient: 'from-[#0A0A0A] to-[#2A2A2A]',
      projectType: 'تطوير MVP',
      teamSize: '12 محترف',
      duration: '8 أشهر',
    },
  ];

  const stats = [
    {
      value: '127K+',
      label: 'مشروع مكتمل',
      icon: <CheckCircle className="h-8 w-8" />,
      color: 'from-[#163F5C] to-[#2A5A7A]',
      change: '+23%',
    },
    {
      value: '45K+',
      label: 'عميل راضٍ',
      icon: <Users className="h-8 w-8" />,
      color: 'from-[#C8BCAE] to-[#D4C8BB]',
      change: '+18%',
    },
    {
      value: '18K+',
      label: 'محترف معتمد',
      icon: <Award className="h-8 w-8" />,
      color: 'from-[#0A0A0A] to-[#2A2A2A]',
      change: '+31%',
    },
    {
      value: '98.7%',
      label: 'معدل النجاح',
      icon: <TrendingUp className="h-8 w-8" />,
      color: 'from-[#163F5C] to-[#2A5A7A]',
      change: '+5%',
    },
  ];

  const features = [
    {
      icon: <Shield className="h-12 w-12" />,
      title: 'حماية كاملة للأموال',
      description: 'نظام دفع آمن 100% مع ضمان استرجاع كامل في حالة عدم الرضا',
      gradient: 'from-[#163F5C]/10 to-[#163F5C]/5',
      iconColor: 'text-[#163F5C]',
      benefit: 'أموالك محمية',
      stats: '100% آمن',
    },
    {
      icon: <Zap className="h-12 w-12" />,
      title: 'سرعة في التنفيذ',
      description: 'ابدأ مشروعك خلال دقائق واحصل على عروض من محترفين معتمدين فوراً',
      gradient: 'from-[#C8BCAE]/20 to-[#C8BCAE]/5',
      iconColor: 'text-[#C8BCAE]',
      benefit: 'بدء فوري',
      stats: 'خلال دقائق',
    },
    {
      icon: <Award className="h-12 w-12" />,
      title: 'جودة معتمدة',
      description: 'محترفون تم فحصهم بدقة مع تقييمات حقيقية وسجل أعمال موثق',
      gradient: 'from-[#0A0A0A]/10 to-[#0A0A0A]/5',
      iconColor: 'text-[#0A0A0A]',
      benefit: 'ثقة مضمونة',
      stats: '99% رضا',
    },
    {
      icon: <Headphones className="h-12 w-12" />,
      title: 'دعم فني متميز',
      description: 'فريق دعم محترف متاح 24/7 لمساعدتك في كل خطوة من مشروعك',
      gradient: 'from-[#163F5C]/10 to-[#163F5C]/5',
      iconColor: 'text-[#163F5C]',
      benefit: 'دائماً معك',
      stats: '24/7 دعم',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'أنشئ مشروعك',
      description: 'حدد متطلباتك بوضوح واكتب وصفاً تفصيلياً لمشروعك مع الميزانية والمدة',
      icon: <Edit className="h-8 w-8" />,
      color: 'from-[#163F5C] to-[#2A5A7A]',
      image: '📝',
    },
    {
      number: '02',
      title: 'قارن العروض',
      description: 'استقبل عروضاً تنافسية من محترفين معتمدين وقارن بين الخبرات والأسعار',
      icon: <BarChart3 className="h-8 w-8" />,
      color: 'from-[#C8BCAE] to-[#D4C8BB]',
      image: '📊',
    },
    {
      number: '03',
      title: 'اختر الأفضل',
      description: 'راجع الملفات الشخصية والتقييمات واختر المحترف الأنسب لاحتياجاتك',
      icon: <Star className="h-8 w-8" />,
      color: 'from-[#0A0A0A] to-[#2A2A2A]',
      image: '⭐',
    },
    {
      number: '04',
      title: 'تابع وتسلّم',
      description: 'راقب تقدم العمل بشكل لحظي واستلم مشروعك المكتمل بجودة استثنائية',
      icon: <Rocket className="h-8 w-8" />,
      color: 'from-[#163F5C] to-[#2A5A7A]',
      image: '🚀',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#E8E3DB]" dir="rtl">
      <div className="pointer-events-none fixed inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(30deg, #C8BCAE 12%, transparent 12.5%, transparent 87%, #C8BCAE 87.5%, #C8BCAE),
            linear-gradient(150deg, #C8BCAE 12%, transparent 12.5%, transparent 87%, #C8BCAE 87.5%, #C8BCAE),
            linear-gradient(30deg, #C8BCAE 12%, transparent 12.5%, transparent 87%, #C8BCAE 87.5%, #C8BCAE),
            linear-gradient(150deg, #C8BCAE 12%, transparent 12.5%, transparent 87%, #C8BCAE 87.5%, #C8BCAE)
          `,
            backgroundSize: '80px 140px',
            backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px',
            opacity: 0.03,
          }}
        ></div>
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          scrollY > 20
            ? 'border-b-2 border-[#163F5C]/10 bg-white/98 shadow-xl backdrop-blur-2xl'
            : 'bg-white/90 backdrop-blur-xl'
        }`}
      >
        <nav className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="group relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#163F5C] to-[#0A0A0A] opacity-30 blur transition-opacity group-hover:opacity-50"></div>
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#163F5C] to-[#0A0A0A] shadow-lg">
                  <Briefcase className="h-7 w-7 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-black text-[#0A0A0A]">بروفيشنال هب</h1>
                <p className="text-xs font-bold text-[#C8BCAE]">منصة المحترفين</p>
              </div>
            </div>

            <div className="hidden items-center gap-8 lg:flex">
              {['الرئيسية', 'الخدمات', 'المحترفون', 'الأعمال', 'المدونة'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="group relative text-sm font-bold text-[#0A0A0A] transition-colors hover:text-[#163F5C]"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#163F5C] transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <button className="rounded-xl px-6 py-2.5 font-bold text-[#163F5C] transition-all hover:bg-[#163F5C]/5">
                تسجيل الدخول
              </button>
              <button className="rounded-xl bg-gradient-to-r from-[#163F5C] to-[#0A0A0A] px-6 py-2.5 font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl">
                ابدأ الآن
              </button>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-lg p-2 text-[#0A0A0A] transition-all hover:bg-[#163F5C]/5 lg:hidden"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
              transition={{ duration: 0.7 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#163F5C]/10 bg-white/80 px-5 py-2 shadow-lg backdrop-blur-sm"
              >
                <div className="h-2 w-2 animate-pulse rounded-full bg-[#163F5C]"></div>
                <span className="text-sm font-bold text-[#0A0A0A]">أكثر من 890 مشروع نشط الآن</span>
              </motion.div>

              <h1 className="mb-6 text-6xl leading-tight font-black lg:text-7xl">
                <span className="text-[#0A0A0A]">وظّف أفضل</span>
                <br />
                <span className="text-[#0A0A0A]">المحترفين في</span>
                <br />
                <span className="bg-gradient-to-r from-[#163F5C] via-[#2A5A7A] to-[#163F5C] bg-clip-text text-transparent">
                  العالم العربي
                </span>
              </h1>

              <p className="mb-10 max-w-xl text-xl leading-relaxed text-[#0A0A0A]/70">
                اربط مشروعك بآلاف الخبراء المعتمدين.{' '}
                <span className="font-bold text-[#163F5C]">جودة استثنائية</span> وأسعار تنافسية مع
                ضمان كامل.
              </p>

              <div className="mb-12 flex flex-col gap-4 sm:flex-row">
                <button className="group flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#163F5C] to-[#0A0A0A] px-8 py-4 text-lg font-bold text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl">
                  <span>ابدأ مشروعك مجاناً</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                <button className="flex items-center justify-center gap-3 rounded-xl border-2 border-[#163F5C]/20 bg-white px-8 py-4 text-lg font-bold text-[#0A0A0A] shadow-lg transition-all hover:border-[#163F5C]/40 hover:shadow-xl">
                  <Play className="h-5 w-5" />
                  شاهد الفيديو
                </button>
              </div>

              <div className="flex items-center gap-8">
                <div className="flex -space-x-3">
                  {['👨‍💻', '👩‍🎨', '👨‍💼', '👩‍💻'].map((emoji, i) => (
                    <div
                      key={i}
                      className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-3 border-[#E8E3DB] bg-white text-lg shadow-lg transition-transform hover:scale-110"
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="mb-1 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#163F5C] text-[#163F5C]" />
                    ))}
                  </div>
                  <p className="text-sm font-bold text-[#0A0A0A]/60">
                    <span className="font-black text-[#163F5C]">4.9/5</span> • 18,500+ تقييم
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl border-2 border-[#163F5C]/10 bg-white p-8 shadow-2xl">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="mb-1 text-2xl font-black text-[#0A0A0A]">أحدث المشاريع</h3>
                    <p className="text-sm font-semibold text-[#0A0A0A]/60">
                      اختر من بين آلاف الفرص
                    </p>
                  </div>
                  <button className="rounded-lg bg-[#163F5C] px-4 py-2 text-sm font-bold text-white transition-all hover:bg-[#0A0A0A]">
                    عرض الكل
                  </button>
                </div>

                <div className="space-y-4">
                  {portfolioItems.slice(0, 3).map((project, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="group cursor-pointer rounded-2xl border border-[#163F5C]/10 bg-gradient-to-br from-white to-[#E8E3DB]/30 p-5 transition-all hover:border-[#163F5C]/30 hover:shadow-lg"
                    >
                      <div className="flex gap-4">
                        <div
                          className={`h-16 w-16 bg-gradient-to-br ${project.gradient} flex items-center justify-center rounded-xl text-3xl shadow-md transition-transform group-hover:scale-110`}
                        >
                          {project.image}
                        </div>
                        <div className="flex-1">
                          <h4 className="mb-1 font-black text-[#0A0A0A] transition-colors group-hover:text-[#163F5C]">
                            {project.title}
                          </h4>
                          <p className="mb-2 text-sm font-semibold text-[#0A0A0A]/60">
                            {project.category}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="text-xl">{project.avatar}</div>
                              <div className="text-xs">
                                <div className="font-bold text-[#0A0A0A]">{project.freelancer}</div>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-[#163F5C] text-[#163F5C]" />
                                  <span className="font-black text-[#163F5C]">
                                    {project.rating}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-black text-[#163F5C]">
                                {project.budget}
                              </div>
                              <div className="text-xs font-semibold text-[#0A0A0A]/60">
                                {project.duration}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: 'spring' }}
                className="absolute -right-8 -bottom-8 rounded-2xl border-2 border-[#C8BCAE]/30 bg-white p-6 shadow-2xl"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[#163F5C] to-[#0A0A0A] shadow-lg">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-black text-[#0A0A0A]">127K+</div>
                    <div className="text-sm font-bold text-[#0A0A0A]/60">مشروع ناجح</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y-2 border-[#163F5C]/10 bg-white px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div
                  className={`inline-flex h-16 w-16 items-center justify-center bg-gradient-to-br ${stat.color} mb-4 rounded-2xl shadow-lg`}
                >
                  <div className="text-white">{stat.icon}</div>
                </div>
                <div className="mb-2 text-5xl font-black text-[#0A0A0A]">{stat.value}</div>
                <div className="mb-2 font-bold text-[#0A0A0A]/60">{stat.label}</div>
                <div className="inline-flex items-center gap-1 rounded-full bg-[#163F5C]/5 px-3 py-1">
                  <TrendingUp className="h-3 w-3 text-[#163F5C]" />
                  <span className="text-xs font-black text-[#163F5C]">{stat.change}</span>
                </div>
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
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#163F5C]/10 bg-white px-5 py-2 shadow-lg"
            >
              <Layers className="h-4 w-4 text-[#163F5C]" />
              <span className="text-sm font-black text-[#0A0A0A]">تصفح الخدمات</span>
            </motion.div>
            <h2 className="mb-4 text-5xl font-black text-[#0A0A0A]">
              خدمات{' '}
              <span className="bg-gradient-to-r from-[#163F5C] to-[#0A0A0A] bg-clip-text text-transparent">
                احترافية
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-[#0A0A0A]/60">
              اكتشف آلاف المحترفين المعتمدين في جميع المجالات
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setHoveredService(i)}
                onMouseLeave={() => setHoveredService(null)}
                className={`group relative cursor-pointer rounded-2xl border-2 bg-white p-8 transition-all duration-300 ${
                  hoveredService === i
                    ? '-translate-y-2 border-[#163F5C] shadow-2xl'
                    : 'border-[#163F5C]/10 shadow-lg'
                }`}
              >
                <div
                  className={`absolute top-0 right-0 h-32 w-32 bg-gradient-to-br ${service.bgGradient} -mt-16 -mr-16 rounded-full transition-transform ${hoveredService === i ? 'scale-150' : 'scale-100'}`}
                ></div>

                <div
                  className={`relative h-16 w-16 ${service.iconBg} mb-5 flex items-center justify-center rounded-xl text-white shadow-md ${hoveredService === i ? 'scale-110 rotate-6' : ''} transition-all`}
                >
                  {service.icon}
                </div>

                <h3 className="mb-3 text-2xl font-black text-[#0A0A0A]">{service.title}</h3>
                <p className="mb-4 text-[#0A0A0A]/60">{service.description}</p>

                <div className="mb-5 flex flex-wrap gap-2">
                  {service.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg bg-[#E8E3DB] px-3 py-1 text-xs font-bold text-[#0A0A0A]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-[#163F5C]/10 pt-5">
                  <div>
                    <div className="mb-1 text-sm font-bold text-[#0A0A0A]/60">يبدأ من</div>
                    <div className="text-xl font-black text-[#163F5C]">{service.startingPrice}</div>
                  </div>
                  <button className="flex items-center gap-2 font-bold text-[#163F5C] transition-all hover:gap-3">
                    استكشف
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-5xl font-black text-[#0A0A0A]">
              لماذا{' '}
              <span className="bg-gradient-to-r from-[#163F5C] to-[#0A0A0A] bg-clip-text text-transparent">
                بروفيشنال هب
              </span>
              ؟
            </h2>
            <p className="text-xl text-[#0A0A0A]/60">مميزات فريدة تجعلنا الخيار الأمثل</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border-2 border-[#163F5C]/10 bg-gradient-to-br from-white to-[#E8E3DB]/20 p-8 transition-all hover:border-[#163F5C]/30 hover:shadow-xl"
              >
                <div
                  className={`h-16 w-16 bg-gradient-to-br ${feature.gradient} mb-6 flex items-center justify-center rounded-xl shadow-md`}
                >
                  <div className={feature.iconColor}>{feature.icon}</div>
                </div>
                <h3 className="mb-3 text-xl font-black text-[#0A0A0A]">{feature.title}</h3>
                <p className="mb-4 leading-relaxed text-[#0A0A0A]/60">{feature.description}</p>
                <div className="inline-flex items-center gap-2 rounded-lg bg-[#163F5C]/5 px-3 py-1.5">
                  <CheckCircle className="h-4 w-4 text-[#163F5C]" />
                  <span className="text-sm font-black text-[#163F5C]">{feature.stats}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-5xl font-black text-[#0A0A0A]">
              كيف{' '}
              <span className="bg-gradient-to-r from-[#163F5C] to-[#0A0A0A] bg-clip-text text-transparent">
                نعمل
              </span>
              ؟
            </h2>
            <p className="text-xl text-[#0A0A0A]/60">أربع خطوات بسيطة نحو النجاح</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                {i < steps.length - 1 && (
                  <div className="absolute top-16 left-full z-0 hidden h-0.5 w-full bg-gradient-to-r from-[#163F5C]/30 to-transparent lg:block"></div>
                )}
                <div className="relative rounded-2xl border-2 border-[#163F5C]/10 bg-white p-8 transition-all hover:border-[#163F5C]/30 hover:shadow-xl">
                  <div
                    className={`absolute -top-6 -right-6 h-14 w-14 bg-gradient-to-br ${step.color} flex items-center justify-center rounded-xl text-xl font-black text-white shadow-lg`}
                  >
                    {step.number}
                  </div>
                  <div className="mt-4 mb-6 text-5xl">{step.image}</div>
                  <h3 className="mb-3 text-xl font-black text-[#0A0A0A]">{step.title}</h3>
                  <p className="leading-relaxed text-[#0A0A0A]/60">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-5xl font-black text-[#0A0A0A]">
              آراء{' '}
              <span className="bg-gradient-to-r from-[#163F5C] to-[#0A0A0A] bg-clip-text text-transparent">
                العملاء
              </span>
            </h2>
            <p className="text-xl text-[#0A0A0A]/60">تجارب حقيقية من شركائنا</p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`bg-gradient-to-br ${testimonials[currentSlide].gradient} rounded-3xl p-12 text-white shadow-2xl`}
            >
              <div className="mb-6 flex gap-1">
                {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-white text-white" />
                ))}
              </div>

              <p className="mb-10 text-2xl leading-relaxed">"{testimonials[currentSlide].text}"</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl backdrop-blur-sm">
                    {testimonials[currentSlide].avatar}
                  </div>
                  <div>
                    <div className="text-xl font-black">{testimonials[currentSlide].name}</div>
                    <div className="text-white/80">{testimonials[currentSlide].role}</div>
                    <div className="text-sm text-white/60">
                      {testimonials[currentSlide].company}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="mb-1 text-sm text-white/80">
                    {testimonials[currentSlide].projectType}
                  </div>
                  <div className="font-bold">{testimonials[currentSlide].teamSize}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-center gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all ${
                  i === currentSlide ? 'w-12 bg-[#163F5C]' : 'w-2 bg-[#C8BCAE]'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden px-6 py-28 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-[#163F5C] via-[#0A0A0A] to-[#163F5C]"></div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-6xl font-black text-white">ابدأ مشروعك اليوم</h2>
            <p className="mx-auto mb-12 max-w-2xl text-2xl text-white/90">
              انضم لأكثر من 45,000 عميل راضٍ وحقق نجاحك مع أفضل المحترفين
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button className="hover:shadow-3xl rounded-xl bg-white px-10 py-5 text-lg font-black text-[#0A0A0A] shadow-2xl transition-all hover:scale-105">
                ابدأ مشروعك مجاناً
              </button>
              <button className="rounded-xl border-2 border-white/30 bg-white/10 px-10 py-5 text-lg font-black text-white backdrop-blur-sm transition-all hover:bg-white/20">
                تواصل معنا
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] px-6 py-20 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-12 md:grid-cols-4">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-black">بروفيشنال هب</div>
              </div>
              <p className="mb-6 text-white/70">منصة الحلول الاحترافية للشركات والأفراد</p>
              <div className="flex gap-3">
                {['📘', '🐦', '💼', '📷'].map((icon, i) => (
                  <button
                    key={i}
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-xl transition-all hover:bg-white/20"
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {[
              { title: 'الشركة', links: ['عن المنصة', 'كيف نعمل', 'الأسعار', 'المدونة'] },
              { title: 'الخدمات', links: ['تطوير', 'تصميم', 'تسويق', 'استشارات'] },
              { title: 'الدعم', links: ['المساعدة', 'الشروط', 'الخصوصية', 'اتصل بنا'] },
            ].map((section, i) => (
              <div key={i}>
                <h4 className="mb-6 font-black">{section.title}</h4>
                <ul className="space-y-3">
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

          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
            <div className="text-white/60">© 2025 بروفيشنال هب. جميع الحقوق محفوظة</div>
            <div className="flex gap-6">
              <a href="#" className="text-white/60 transition-colors hover:text-white">
                الشروط
              </a>
              <a href="#" className="text-white/60 transition-colors hover:text-white">
                الخصوصية
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PremiumFreelancePlatform;
