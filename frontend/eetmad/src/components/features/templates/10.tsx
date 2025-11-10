'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  Briefcase,
  Camera,
  CheckCircle,
  Clock,
  Code,
  Facebook,
  FileText,
  Headphones,
  Instagram,
  Layers,
  Linkedin,
  Megaphone,
  Palette,
  Play,
  Rocket,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Twitter,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';

function PremiumFreelancePlatform() {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      icon: <Code className="h-7 w-7" />,
      title: 'تطوير المواقع والتطبيقات',
      description: 'حلول برمجية متكاملة من خبراء معتمدين',
      projects: '15,240',
      experts: '3,420',
      color: 'from-[#213555] to-[#4F709C]',
      accent: '#E5D283',
    },
    {
      icon: <Palette className="h-7 w-7" />,
      title: 'التصميم والجرافيك',
      description: 'تصاميم إبداعية تعكس هوية علامتك',
      projects: '12,890',
      experts: '2,840',
      color: 'from-[#4F709C] to-[#213555]',
      accent: '#E5D283',
    },
    {
      icon: <Megaphone className="h-7 w-7" />,
      title: 'التسويق الرقمي',
      description: 'استراتيجيات تسويقية ذكية لنمو أعمالك',
      projects: '9,560',
      experts: '1,920',
      color: 'from-[#213555] to-[#4F709C]',
      accent: '#E5D283',
    },
    {
      icon: <FileText className="h-7 w-7" />,
      title: 'المحتوى والكتابة',
      description: 'محتوى احترافي بلغة عربية فصيحة',
      projects: '8,340',
      experts: '1,560',
      color: 'from-[#4F709C] to-[#213555]',
      accent: '#E5D283',
    },
    {
      icon: <Camera className="h-7 w-7" />,
      title: 'التصوير والمونتاج',
      description: 'إنتاج مرئي احترافي بأعلى جودة',
      projects: '6,780',
      experts: '1,240',
      color: 'from-[#213555] to-[#4F709C]',
      accent: '#E5D283',
    },
    {
      icon: <Headphones className="h-7 w-7" />,
      title: 'الصوتيات والموسيقى',
      description: 'تسجيلات صوتية نقية وموسيقى أصلية',
      projects: '4,920',
      experts: '890',
      color: 'from-[#4F709C] to-[#213555]',
      accent: '#E5D283',
    },
  ];

  const featuredProjects = [
    {
      id: 1,
      title: 'تطوير منصة تجارة إلكترونية متكاملة',
      category: 'تطوير ويب',
      client: 'شركة النخبة للتجارة',
      budget: '125,000 ريال',
      duration: '6 أشهر',
      status: 'جاري التنفيذ',
      progress: 65,
      freelancer: {
        name: 'أحمد الشمري',
        role: 'مطور Full Stack',
        avatar: '👨‍💻',
        rating: 4.9,
        reviews: 234,
      },
      tags: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      gradient: 'from-[#213555]/90 to-[#4F709C]/90',
    },
    {
      id: 2,
      title: 'حملة تسويقية شاملة على منصات التواصل',
      category: 'تسويق رقمي',
      client: 'مجموعة الابتكار',
      budget: '85,000 ريال',
      duration: '4 أشهر',
      status: 'مكتمل',
      progress: 100,
      freelancer: {
        name: 'سارة العتيبي',
        role: 'استراتيجية تسويق',
        avatar: '👩‍💼',
        rating: 5.0,
        reviews: 189,
      },
      tags: ['Instagram', 'TikTok', 'Analytics', 'Content'],
      image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c3c9?w=800&h=600&fit=crop',
      gradient: 'from-[#4F709C]/90 to-[#213555]/90',
    },
    {
      id: 3,
      title: 'تصميم هوية بصرية كاملة لشركة ناشئة',
      category: 'تصميم جرافيك',
      client: 'تك ستارت',
      budget: '45,000 ريال',
      duration: '8 أسابيع',
      status: 'جاري التنفيذ',
      progress: 40,
      freelancer: {
        name: 'خالد المالكي',
        role: 'مصمم جرافيك',
        avatar: '🎨',
        rating: 4.8,
        reviews: 156,
      },
      tags: ['Branding', 'UI/UX', 'Print', 'Motion'],
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
      gradient: 'from-[#213555]/90 to-[#4F709C]/90',
    },
  ];

  const successStories = [
    {
      company: 'مجموعة الريادة التقنية',
      logo: '🏢',
      project: 'تطوير نظام إدارة متكامل',
      value: '450,000 ريال',
      duration: '10 أشهر',
      team: '15 محترف',
      results: [
        'زيادة الإنتاجية بنسبة 240%',
        'توفير 65% من التكاليف التشغيلية',
        'تحسين تجربة المستخدم بنسبة 95%',
      ],
      testimonial:
        'تجربة استثنائية تفوق كل التوقعات. فريق محترف وملتزم بأعلى معايير الجودة. حققنا نتائج مذهلة في وقت قياسي.',
      person: {
        name: 'م. فيصل العمري',
        position: 'المدير التنفيذي',
        avatar: '👨‍💼',
      },
    },
    {
      company: 'براند ماسترز',
      logo: '🎨',
      project: 'إعادة تصميم الهوية البصرية',
      value: '180,000 ريال',
      duration: '5 أشهر',
      team: '8 محترفين',
      results: ['نمو المبيعات بنسبة 320%', 'زيادة الوعي بالعلامة 185%', 'تحسين معدل التحويل 140%'],
      testimonial:
        'إبداع لا حدود له! المنصة ربطتنا بأفضل المصممين في الوطن العربي. النتيجة فاقت كل التوقعات وساهمت في نمو أعمالنا بشكل كبير.',
      person: {
        name: 'ريم الدوسري',
        position: 'مديرة التسويق',
        avatar: '👩‍💼',
      },
    },
    {
      company: 'ديجيتال سوليوشنز',
      logo: '💼',
      project: 'استراتيجية تسويق رقمي شاملة',
      value: '280,000 ريال',
      duration: '8 أشهر',
      team: '12 محترف',
      results: ['وصول لـ 2.5 مليون مستخدم', 'معدل تفاعل 380%', 'عائد استثمار 520%'],
      testimonial:
        'الشريك المثالي لنمو أعمالنا الرقمية. خبراء حقيقيون بفهم عميق للسوق السعودي والخليجي. استثمار يستحق كل ريال.',
      person: {
        name: 'خالد السلمان',
        position: 'المؤسس والرئيس التنفيذي',
        avatar: '🚀',
      },
    },
  ];

  const whyChooseUs = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'ضمان شامل 100%',
      description: 'حماية مالية كاملة مع إمكانية استرجاع الأموال في حالة عدم الرضا',
      stats: 'حماية مضمونة',
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'محترفون معتمدون',
      description: 'فحص دقيق لكل محترف مع تقييمات موثقة وسجل أعمال مثبت',
      stats: '12,000+ خبير',
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: 'توفير الوقت',
      description: 'احصل على عروض من محترفين مؤهلين خلال ساعات من نشر مشروعك',
      stats: 'استجابة سريعة',
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'جودة مضمونة',
      description: 'نضمن لك أعلى معايير الجودة مع مراجعات منتظمة وتقييم مستمر',
      stats: '99.3% رضا',
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: 'دعم فني متواصل',
      description: 'فريق دعم احترافي متاح على مدار الساعة لمساعدتك في كل خطوة',
      stats: 'دعم 24/7',
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'نمو مستدام',
      description: 'أدوات تحليل متقدمة لقياس الأداء وتحقيق أهدافك بكفاءة',
      stats: 'تقارير ذكية',
    },
  ];

  const stats = [
    {
      number: '184K+',
      label: 'مشروع مكتمل بنجاح',
      icon: <CheckCircle className="h-6 w-6" />,
      growth: '+42%',
    },
    {
      number: '89K+',
      label: 'عميل راضٍ',
      icon: <Users className="h-6 w-6" />,
      growth: '+38%',
    },
    {
      number: '34K+',
      label: 'محترف معتمد',
      icon: <Award className="h-6 w-6" />,
      growth: '+51%',
    },
    {
      number: '4.9/5',
      label: 'تقييم العملاء',
      icon: <Star className="h-6 w-6" />,
      growth: '+8%',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % successStories.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F0F0]" dir="rtl">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrollY > 50 ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-md'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#213555] to-[#4F709C] opacity-50 blur-lg"></div>
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#213555] to-[#4F709C]">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
              </motion.div>
              <div>
                <h1 className="text-2xl font-black text-[#213555]">
                  إليت<span className="text-[#E5D283]">وركس</span>
                </h1>
                <p className="text-xs font-semibold text-[#4F709C]">منصة المحترفين</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden items-center gap-8 lg:flex">
              {['الرئيسية', 'الخدمات', 'المحترفون', 'المشاريع', 'من نحن'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="group relative text-sm font-bold text-[#213555] transition-colors hover:text-[#4F709C]"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#E5D283] transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button className="hidden rounded-lg px-6 py-2.5 font-bold text-[#213555] transition-all hover:bg-[#F0F0F0] lg:block">
                تسجيل الدخول
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg bg-gradient-to-r from-[#213555] to-[#4F709C] px-6 py-2.5 font-bold text-white shadow-lg transition-all hover:shadow-xl"
              >
                ابدأ مجاناً
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#F0F0F0] to-white px-6 pt-32 pb-20 lg:px-8">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 h-96 w-96 rounded-full bg-[#213555] blur-3xl"></div>
          <div className="absolute bottom-20 left-20 h-96 w-96 rounded-full bg-[#4F709C] blur-3xl"></div>
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#213555]/10 bg-white px-5 py-2.5 shadow-md"
              >
                <div className="h-2 w-2 animate-pulse rounded-full bg-[#E5D283]"></div>
                <span className="text-sm font-bold text-[#213555]">
                  منصة موثوقة بـ 99.3% معدل نجاح
                </span>
              </motion.div>

              {/* Main Heading */}
              <h1 className="mb-6 text-6xl leading-tight font-black lg:text-7xl">
                <span className="text-[#213555]">وظّف</span>
                <br />
                <span className="text-[#4F709C]">أفضل</span>
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#213555]">المحترفين</span>
                  <span className="absolute bottom-2 left-0 -z-0 h-4 w-full bg-[#E5D283]"></span>
                </span>
              </h1>

              <p className="mb-10 max-w-xl text-xl leading-relaxed text-[#4F709C]">
                منصة النخبة للربط بين أصحاب المشاريع والمحترفين المعتمدين في جميع المجالات.
                <span className="mt-2 block font-bold text-[#213555]">جودة • احترافية • ثقة</span>
              </p>

              {/* CTA Buttons */}
              <div className="mb-12 flex flex-col gap-4 sm:flex-row">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#213555] to-[#4F709C] px-8 py-4 font-bold text-white shadow-xl transition-all hover:shadow-2xl"
                >
                  <span>انشر مشروعك الآن</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-3 rounded-xl border-2 border-[#213555]/20 bg-white px-8 py-4 font-bold text-[#213555] shadow-md transition-all hover:border-[#213555]/40"
                >
                  <Play className="h-5 w-5" />
                  <span>شاهد الفيديو</span>
                </motion.button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-10">
                <div>
                  <div className="mb-2 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-[#E5D283] text-[#E5D283]" />
                    ))}
                  </div>
                  <p className="text-sm text-[#4F709C]">
                    <span className="text-lg font-black text-[#213555]">4.9</span> من 5.0
                  </p>
                  <p className="text-xs text-[#4F709C]">من 34,850 تقييم</p>
                </div>
                <div className="h-14 w-px bg-[#213555]/20"></div>
                <div>
                  <p className="mb-1 text-3xl font-black text-[#213555]">89K+</p>
                  <p className="text-sm font-semibold text-[#4F709C]">عميل نشط</p>
                  <p className="text-xs text-[#4F709C]">يثقون بنا</p>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Main Card */}
              <div className="relative rounded-3xl border border-[#213555]/10 bg-white p-8 shadow-2xl">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="mb-1 text-2xl font-black text-[#213555]">مشاريع متميزة</h3>
                    <p className="text-sm text-[#4F709C]">فرص استثنائية اليوم</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#213555] to-[#4F709C]">
                    <Briefcase className="h-6 w-6 text-white" />
                  </div>
                </div>

                <div className="space-y-4">
                  {featuredProjects.slice(0, 3).map((project, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="group cursor-pointer rounded-2xl border border-[#213555]/5 bg-gradient-to-br from-[#F0F0F0] to-white p-4 transition-all hover:border-[#213555]/20 hover:shadow-lg"
                    >
                      <div className="flex gap-4">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#213555] to-[#4F709C] text-2xl transition-transform group-hover:scale-110">
                          {project.freelancer.avatar}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="mb-1 line-clamp-1 font-bold text-[#213555] transition-colors group-hover:text-[#4F709C]">
                            {project.title}
                          </h4>
                          <p className="mb-2 text-xs text-[#4F709C]">{project.category}</p>
                          <div className="flex items-center justify-between">
                            <span className="font-black text-[#213555]">{project.budget}</span>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-[#E5D283] text-[#E5D283]" />
                              <span className="text-xs font-bold text-[#213555]">
                                {project.freelancer.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <button className="mt-6 w-full rounded-xl bg-gradient-to-r from-[#213555] to-[#4F709C] py-3 font-bold text-white transition-all hover:shadow-lg">
                  عرض جميع المشاريع
                </button>
              </div>

              {/* Floating Stats */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: 'spring' }}
                className="absolute -top-6 -left-6 rounded-2xl border border-[#E5D283]/30 bg-white p-5 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#E5D283] to-[#E5D283]/80">
                    <TrendingUp className="h-6 w-6 text-[#213555]" />
                  </div>
                  <div>
                    <p className="text-xl font-black text-[#213555]">1,240+</p>
                    <p className="text-xs text-[#4F709C]">مشروع نشط</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: 'spring' }}
                className="absolute -right-6 -bottom-6 rounded-2xl bg-gradient-to-br from-[#213555] to-[#4F709C] p-5 text-white shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-black">184K+</p>
                    <p className="text-xs opacity-90">مشروع ناجح</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-[#213555]/10 bg-white py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group text-center"
              >
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#213555] to-[#4F709C] transition-transform group-hover:scale-110">
                  <div className="text-white">{stat.icon}</div>
                </div>
                <p className="mb-2 text-4xl font-black text-[#213555]">{stat.number}</p>
                <p className="mb-2 text-sm font-semibold text-[#4F709C]">{stat.label}</p>
                <div className="inline-flex items-center gap-1 rounded-full bg-[#E5D283]/20 px-3 py-1">
                  <TrendingUp className="h-3 w-3 text-[#213555]" />
                  <span className="text-xs font-bold text-[#213555]">{stat.growth}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-gradient-to-br from-[#F0F0F0] to-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#213555]/10 bg-white px-4 py-2"
            >
              <Layers className="h-4 w-4 text-[#213555]" />
              <span className="text-sm font-bold text-[#213555]">استكشف الخدمات</span>
            </motion.div>
            <h2 className="mb-4 text-5xl font-black text-[#213555]">خدمات احترافية في</h2>
            <p className="mb-4 text-5xl font-black">
              <span className="text-[#4F709C]">جميع</span>{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#213555]">المجالات</span>
                <span className="absolute bottom-1 left-0 -z-0 h-3 w-full bg-[#E5D283]"></span>
              </span>
            </p>
            <p className="mx-auto max-w-2xl text-xl text-[#4F709C]">
              آلاف المحترفين المعتمدين جاهزون لتحويل أفكارك إلى واقع
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer rounded-2xl border border-[#213555]/10 bg-white p-8 shadow-lg transition-all hover:border-[#213555]/30 hover:shadow-xl"
              >
                <div
                  className={`inline-flex h-16 w-16 items-center justify-center bg-gradient-to-br ${service.color} mb-6 rounded-2xl text-white shadow-lg transition-all group-hover:scale-110 group-hover:rotate-3`}
                >
                  {service.icon}
                </div>

                <h3 className="mb-3 text-2xl font-black text-[#213555] transition-colors group-hover:text-[#4F709C]">
                  {service.title}
                </h3>
                <p className="mb-6 leading-relaxed text-[#4F709C]">{service.description}</p>

                <div className="flex items-center justify-between border-t border-[#213555]/10 pt-6">
                  <div>
                    <p className="mb-1 text-sm text-[#4F709C]">المشاريع</p>
                    <p className="text-lg font-black text-[#213555]">{service.projects}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-[#4F709C]">المحترفون</p>
                    <p className="text-lg font-black text-[#213555]">{service.experts}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-[#4F709C] transition-all group-hover:translate-x-1 group-hover:text-[#213555]" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <h2 className="mb-2 text-4xl font-black text-[#213555]">مشاريع مميزة</h2>
              <p className="text-lg text-[#4F709C]">قصص نجاح حقيقية من عملائنا</p>
            </div>
            <div className="flex gap-2">
              {['الكل', 'تطوير', 'تصميم', 'تسويق'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-lg px-5 py-2.5 text-sm font-bold transition-all ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-[#213555] to-[#4F709C] text-white'
                      : 'bg-[#F0F0F0] text-[#213555] hover:bg-[#E5D283]/30'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                onMouseEnter={() => setHoveredProject(i)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group overflow-hidden rounded-2xl border border-[#213555]/10 bg-white shadow-lg transition-all hover:border-[#213555]/30 hover:shadow-2xl"
              >
                {/* Project Image */}
                <div className="relative h-56 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}></div>
                  <div className="absolute top-4 right-4 rounded-lg bg-white/90 px-3 py-1.5 backdrop-blur-sm">
                    <span className="text-xs font-bold text-[#213555]">{project.category}</span>
                  </div>
                  {project.status === 'مكتمل' ? (
                    <div className="absolute top-4 left-4 flex items-center gap-1 rounded-lg bg-[#E5D283] px-3 py-1.5">
                      <CheckCircle className="h-4 w-4 text-[#213555]" />
                      <span className="text-xs font-bold text-[#213555]">مكتمل</span>
                    </div>
                  ) : (
                    <div className="absolute right-4 bottom-4 left-4">
                      <div className="rounded-lg bg-white/90 p-3 backdrop-blur-sm">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs font-bold text-[#213555]">التقدم</span>
                          <span className="text-xs font-bold text-[#213555]">
                            {project.progress}%
                          </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-[#F0F0F0]">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#213555] to-[#4F709C] transition-all duration-500"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="mb-3 line-clamp-2 text-lg font-black text-[#213555] transition-colors group-hover:text-[#4F709C]">
                    {project.title}
                  </h3>
                  <p className="mb-4 text-sm text-[#4F709C]">{project.client}</p>

                  {/* Tags */}
                  <div className="mb-5 flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="rounded-lg bg-[#F0F0F0] px-2.5 py-1 text-xs font-semibold text-[#213555]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Freelancer Info */}
                  <div className="mb-5 flex items-center gap-3 border-b border-[#213555]/10 pb-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#213555] to-[#4F709C] text-xl">
                      {project.freelancer.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#213555]">{project.freelancer.name}</p>
                      <p className="text-xs text-[#4F709C]">{project.freelancer.role}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-[#E5D283] text-[#E5D283]" />
                      <span className="text-sm font-bold text-[#213555]">
                        {project.freelancer.rating}
                      </span>
                    </div>
                  </div>

                  {/* Budget & Duration */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="mb-1 text-xs text-[#4F709C]">الميزانية</p>
                      <p className="font-black text-[#213555]">{project.budget}</p>
                    </div>
                    <div className="text-left">
                      <p className="mb-1 text-xs text-[#4F709C]">المدة</p>
                      <p className="font-bold text-[#213555]">{project.duration}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gradient-to-br from-[#F0F0F0] to-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-5xl font-black text-[#213555]">
              لماذا إليت<span className="text-[#4F709C]">وركس</span>؟
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-[#4F709C]">
              مميزات استثنائية تجعلنا الخيار الأول للمحترفين
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl border border-[#213555]/10 bg-white p-8 shadow-lg transition-all hover:border-[#213555]/30 hover:shadow-xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#213555] to-[#4F709C] text-white transition-all group-hover:scale-110 group-hover:-rotate-3">
                  {item.icon}
                </div>
                <h3 className="mb-3 text-xl font-black text-[#213555] transition-colors group-hover:text-[#4F709C]">
                  {item.title}
                </h3>
                <p className="mb-5 leading-relaxed text-[#4F709C]">{item.description}</p>
                <div className="inline-flex items-center gap-2 rounded-lg bg-[#E5D283]/20 px-4 py-2">
                  <CheckCircle className="h-4 w-4 text-[#213555]" />
                  <span className="text-sm font-bold text-[#213555]">{item.stats}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Slider */}
      <section className="bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-5xl font-black text-[#213555]">
              قصص نجاح <span className="text-[#4F709C]">ملهمة</span>
            </h2>
            <p className="text-xl text-[#4F709C]">تجارب حقيقية من عملائنا المميزين</p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl bg-gradient-to-br from-[#213555] to-[#4F709C] p-12 text-white shadow-2xl lg:p-16"
            >
              <div className="grid items-center gap-12 lg:grid-cols-2">
                {/* Left Side - Company Info */}
                <div>
                  <div className="mb-6 text-7xl">{successStories[currentSlide].logo}</div>
                  <h3 className="mb-4 text-3xl font-black">
                    {successStories[currentSlide].company}
                  </h3>
                  <p className="mb-8 text-xl text-white/90">
                    {successStories[currentSlide].project}
                  </p>

                  <div className="mb-8 grid grid-cols-3 gap-4">
                    <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                      <p className="mb-1 text-2xl font-black">
                        {successStories[currentSlide].value}
                      </p>
                      <p className="text-sm text-white/80">قيمة المشروع</p>
                    </div>
                    <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                      <p className="mb-1 text-2xl font-black">
                        {successStories[currentSlide].duration}
                      </p>
                      <p className="text-sm text-white/80">المدة</p>
                    </div>
                    <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                      <p className="mb-1 text-2xl font-black">
                        {successStories[currentSlide].team}
                      </p>
                      <p className="text-sm text-white/80">الفريق</p>
                    </div>
                  </div>

                  <div className="mb-8 space-y-3">
                    <p className="mb-3 text-lg font-bold">النتائج المحققة:</p>
                    {successStories[currentSlide].results.map((result, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#E5D283]">
                          <CheckCircle className="h-4 w-4 text-[#213555]" />
                        </div>
                        <p className="text-white/90">{result}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side - Testimonial */}
                <div>
                  <div className="mb-6 text-8xl opacity-20">"</div>
                  <p className="mb-8 text-2xl leading-relaxed font-medium">
                    {successStories[currentSlide].testimonial}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl backdrop-blur-sm">
                      {successStories[currentSlide].person.avatar}
                    </div>
                    <div>
                      <p className="text-xl font-black">
                        {successStories[currentSlide].person.name}
                      </p>
                      <p className="text-white/80">
                        {successStories[currentSlide].person.position}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Dots */}
          <div className="mt-8 flex justify-center gap-3">
            {successStories.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentSlide
                    ? 'w-12 bg-gradient-to-r from-[#213555] to-[#4F709C]'
                    : 'w-2 bg-[#4F709C]/30'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#213555] via-[#4F709C] to-[#213555] px-6 py-28 lg:px-8">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-white blur-3xl"></div>
          <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-white blur-3xl"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-8 text-6xl">🚀</div>
            <h2 className="mb-6 text-6xl leading-tight font-black text-white">
              ابدأ مشروعك القادم
              <br />
              <span className="text-[#E5D283]">مع النخبة اليوم</span>
            </h2>
            <p className="mx-auto mb-12 max-w-3xl text-2xl text-white/90">
              انضم لآلاف العملاء الناجحين واحصل على أفضل المحترفين لتحويل أفكارك إلى واقع
            </p>

            <div className="flex flex-col justify-center gap-5 sm:flex-row">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hover:shadow-3xl flex items-center justify-center gap-3 rounded-xl bg-white px-10 py-5 text-xl font-black text-[#213555] shadow-2xl transition-all"
              >
                <span>انشر مشروعك مجاناً</span>
                <Rocket className="h-6 w-6" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-xl border-2 border-white/30 bg-white/10 px-10 py-5 text-xl font-black text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                تحدث مع مستشار
              </motion.button>
            </div>

            <div className="mt-16 flex items-center justify-center gap-16">
              <div>
                <p className="mb-2 text-4xl font-black text-white">100%</p>
                <p className="text-white/80">ضمان الجودة</p>
              </div>
              <div className="h-14 w-px bg-white/20"></div>
              <div>
                <p className="mb-2 text-4xl font-black text-white">24/7</p>
                <p className="text-white/80">دعم فني</p>
              </div>
              <div className="h-14 w-px bg-white/20"></div>
              <div>
                <p className="mb-2 text-4xl font-black text-white">99.3%</p>
                <p className="text-white/80">رضا العملاء</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#213555] px-6 py-20 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-12 md:grid-cols-2 lg:grid-cols-5">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#4F709C] to-[#E5D283]">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black">
                    إليت<span className="text-[#E5D283]">وركس</span>
                  </h3>
                  <p className="text-sm text-white/70">منصة المحترفين</p>
                </div>
              </div>
              <p className="mb-6 leading-relaxed text-white/70">
                نربط أصحاب المشاريع بأفضل المحترفين في الوطن العربي. جودة عالية، أسعار منافسة، وضمان
                كامل.
              </p>
              <div className="flex gap-3">
                {[<Facebook />, <Twitter />, <Linkedin />, <Instagram />].map((Icon, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 transition-all hover:bg-white/20"
                  >
                    {Icon}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              {
                title: 'الشركة',
                links: ['من نحن', 'كيف نعمل', 'الأسعار', 'المدونة', 'الوظائف'],
              },
              {
                title: 'الخدمات',
                links: ['تطوير', 'تصميم', 'تسويق', 'كتابة', 'استشارات'],
              },
              {
                title: 'الدعم',
                links: ['المساعدة', 'الأسئلة', 'الشروط', 'الخصوصية', 'اتصل بنا'],
              },
            ].map((section, i) => (
              <div key={i}>
                <h4 className="mb-5 text-lg font-black">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, j) => (
                    <li key={j}>
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
            <p className="text-sm text-white/60">© 2025 إليت وركس. جميع الحقوق محفوظة</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-white/60 transition-colors hover:text-white">
                الشروط والأحكام
              </a>
              <a href="#" className="text-white/60 transition-colors hover:text-white">
                سياسة الخصوصية
              </a>
              <a href="#" className="text-white/60 transition-colors hover:text-white">
                ملفات تعريف الارتباط
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PremiumFreelancePlatform;
