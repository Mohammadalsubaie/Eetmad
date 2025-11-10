'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  BarChart3,
  Briefcase,
  CheckCircle,
  ChevronRight,
  Clock,
  Code,
  DollarSign,
  FileText,
  Globe,
  Megaphone,
  Menu,
  MessageCircle,
  Package,
  Palette,
  Play,
  Shield,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';

function ProfessionalHomepage() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    {
      name: 'تطوير البرمجيات',
      icon: <Code className="h-7 w-7" />,
      count: '245+',
      projects: '1,234',
      color: 'from-teal-600 to-teal-700',
    },
    {
      name: 'التصميم والإبداع',
      icon: <Palette className="h-7 w-7" />,
      count: '189+',
      projects: '892',
      color: 'from-emerald-600 to-emerald-700',
    },
    {
      name: 'التسويق الرقمي',
      icon: <Megaphone className="h-7 w-7" />,
      count: '156+',
      projects: '756',
      color: 'from-cyan-600 to-cyan-700',
    },
    {
      name: 'الأعمال والإدارة',
      icon: <Briefcase className="h-7 w-7" />,
      count: '134+',
      projects: '634',
      color: 'from-teal-700 to-teal-800',
    },
    {
      name: 'التوريد والخدمات',
      icon: <Package className="h-7 w-7" />,
      count: '312+',
      projects: '1,567',
      color: 'from-emerald-700 to-emerald-800',
    },
    {
      name: 'الاستشارات المهنية',
      icon: <Globe className="h-7 w-7" />,
      count: '98+',
      projects: '445',
      color: 'from-cyan-700 to-cyan-800',
    },
  ];

  const stats = [
    {
      number: '15,847',
      label: 'مشروع منجز',
      icon: <CheckCircle className="h-6 w-6" />,
      trend: '+12%',
    },
    { number: '8,432', label: 'عميل نشط', icon: <Users className="h-6 w-6" />, trend: '+18%' },
    { number: '3,245', label: 'مقدم خدمة', icon: <Star className="h-6 w-6" />, trend: '+25%' },
    { number: '99.2%', label: 'معدل الرضا', icon: <Award className="h-6 w-6" />, trend: '+2%' },
  ];

  const features = [
    {
      icon: <Shield className="h-7 w-7" />,
      title: 'حماية متقدمة',
      description: 'نظام ضمان شامل يحمي حقوقك المالية مع إمكانية استرجاع كامل المبلغ',
      highlight: 'ضمان 100%',
    },
    {
      icon: <Zap className="h-7 w-7" />,
      title: 'استجابة فورية',
      description: 'احصل على عروض احترافية من خبراء مؤهلين في أقل من 60 دقيقة',
      highlight: 'خلال ساعة',
    },
    {
      icon: <Target className="h-7 w-7" />,
      title: 'دقة عالية',
      description: 'نظام ذكي لمطابقة مشروعك مع أفضل المختصين في مجالك',
      highlight: 'AI مدعوم',
    },
    {
      icon: <BarChart3 className="h-7 w-7" />,
      title: 'تتبع شامل',
      description: 'لوحة تحكم متقدمة لمتابعة كل تفاصيل مشروعك لحظة بلحظة',
      highlight: 'تحديثات مباشرة',
    },
  ];

  const testimonials = [
    {
      name: 'عبدالله المالكي',
      role: 'مدير تقني - شركة نماء',
      image: '👨‍💼',
      text: 'تجربة استثنائية حقاً! حصلت على 12 عرض احترافي خلال 3 ساعات فقط. النظام سهل والأسعار تنافسية للغاية. أنصح بها بشدة لكل من يبحث عن جودة عالية.',
      rating: 5,
      project: 'تطوير منصة إلكترونية',
      value: '45,000 ريال',
    },
    {
      name: 'سارة الخالدي',
      role: 'مؤسسة - متجر فاشن لاين',
      image: '👩‍💼',
      text: 'المنصة وفرت علي شهور من البحث. وجدت مصمم محترف نفذ لي هوية متكاملة بجودة عالمية وبسعر معقول. الدعم الفني ممتاز والتواصل سلس جداً.',
      rating: 5,
      project: 'تصميم هوية تجارية',
      value: '12,000 ريال',
    },
    {
      name: 'محمد الشهري',
      role: 'مطور مستقل',
      image: '👨‍💻',
      text: 'كمقدم خدمة، المنصة غيرت مسار عملي تماماً. حصلت على مشاريع بقيمة تجاوزت 200 ألف ريال في 6 أشهر. النظام عادل والعمولة منطقية.',
      rating: 5,
      project: 'مقدم خدمات برمجية',
      value: '200,000+ ريال',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'صف مشروعك بدقة',
      description:
        'اكتب تفاصيل مشروعك، حدد الميزانية، المدة المتوقعة، والمتطلبات الخاصة. كلما كانت التفاصيل أوضح، كانت العروض أفضل.',
      icon: <FileText className="h-6 w-6" />,
      time: 'دقيقتان',
    },
    {
      number: '02',
      title: 'استقبل عروض احترافية',
      description:
        'يتنافس مقدمو الخدمات المؤهلون لتقديم أفضل العروض. راجع ملفاتهم الشخصية، معرض الأعمال، والتقييمات.',
      icon: <MessageCircle className="h-6 w-6" />,
      time: '1-24 ساعة',
    },
    {
      number: '03',
      title: 'اختر الأفضل',
      description:
        'قارن العروض بناءً على السعر، الخبرة، معرض الأعمال، والتقييمات. تواصل مع المقدمين قبل اتخاذ القرار.',
      icon: <Target className="h-6 w-6" />,
      time: 'حسب رغبتك',
    },
    {
      number: '04',
      title: 'أكمل المشروع بأمان',
      description:
        'تابع التقدم عبر لوحة التحكم، المدفوعات محمية حتى اكتمال العمل بنجاح. راحتك وأمانك أولويتنا.',
      icon: <DollarSign className="h-6 w-6" />,
      time: 'حسب الاتفاق',
    },
  ];

  const howItWorksTabs = [
    {
      title: 'لأصحاب المشاريع',
      content:
        'انشر مشروعك مجاناً واحصل على عروض من مئات المحترفين المؤهلين. اختر الأنسب وابدأ العمل بثقة تامة.',
    },
    {
      title: 'لمقدمي الخدمات',
      content:
        'ابحث عن مشاريع تناسب خبراتك، قدم عروضك الاحترافية، واحصل على فرص عمل مستمرة مع عملاء موثوقين.',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white" dir="rtl">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrollY > 20
            ? 'bg-white/95 shadow-lg shadow-teal-900/5 backdrop-blur-xl'
            : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-700 to-cyan-800 shadow-lg shadow-teal-900/20">
                  <span className="text-2xl font-bold text-white">ب</span>
                </div>
                <div className="absolute -top-1 -right-1 h-3 w-3 animate-pulse rounded-full bg-emerald-400"></div>
              </div>
              <div>
                <div className="bg-gradient-to-r from-teal-700 to-cyan-800 bg-clip-text text-2xl font-bold text-transparent">
                  بِدّ
                </div>
                <div className="-mt-1 text-xs font-medium text-teal-700">
                  منصة العروض الاحترافية
                </div>
              </div>
            </div>

            <div className="hidden items-center gap-8 lg:flex">
              {['الرئيسية', 'الفئات', 'كيف تعمل', 'الأسعار', 'قصص النجاح'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="group relative font-medium text-slate-700 transition-colors hover:text-teal-700"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-teal-700 to-cyan-800 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            <div className="hidden items-center gap-4 lg:flex">
              <button className="rounded-lg border border-teal-200 px-6 py-2.5 font-medium text-teal-700 transition-colors hover:bg-teal-50 hover:text-teal-800">
                تسجيل الدخول
              </button>
              <button className="rounded-lg bg-gradient-to-r from-teal-700 to-cyan-800 px-6 py-2.5 font-medium text-white shadow-lg shadow-teal-900/20 transition-all hover:from-teal-800 hover:to-cyan-900 hover:shadow-xl hover:shadow-teal-900/30">
                ابدأ الآن
              </button>
            </div>

            <button
              className="text-teal-700 lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-teal-100 bg-white lg:hidden"
            >
              <div className="space-y-4 px-4 py-6">
                {['الرئيسية', 'الفئات', 'كيف تعمل', 'الأسعار', 'قصص النجاح'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block py-2 font-medium text-slate-700 hover:text-teal-700"
                  >
                    {item}
                  </a>
                ))}
                <button className="mt-4 w-full rounded-lg bg-gradient-to-r from-teal-700 to-cyan-800 px-6 py-3 font-medium text-white shadow-lg shadow-teal-900/20">
                  ابدأ الآن
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-32 pb-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 opacity-70"></div>
        <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-gradient-to-br from-teal-400/20 to-transparent blur-3xl"></div>
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-400/20 to-transparent blur-3xl"></div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white px-5 py-2.5 shadow-lg shadow-teal-900/10">
                <Sparkles className="h-4 w-4 text-teal-700" />
                <span className="text-sm font-semibold text-teal-700">
                  منصة موثوقة من +8,000 عميل
                </span>
              </div>

              <h1 className="mb-6 text-5xl leading-tight font-bold text-slate-900 lg:text-6xl xl:text-7xl">
                نجاح مشروعك
                <span className="mt-2 block bg-gradient-to-r from-teal-700 via-cyan-700 to-emerald-700 bg-clip-text text-transparent">
                  يبدأ هنا
                </span>
              </h1>

              <p className="mb-10 text-xl leading-relaxed text-slate-600 lg:text-2xl">
                تواصل مع أفضل المحترفين في مجالك. احصل على عروض تنافسية وجودة عالمية بأسعار منطقية.
              </p>

              <div className="mb-12 flex flex-col gap-5 sm:flex-row">
                <button className="group flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-teal-700 to-cyan-800 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-teal-900/30 transition-all hover:from-teal-800 hover:to-cyan-900 hover:shadow-2xl hover:shadow-teal-900/40">
                  انشر مشروعك مجاناً
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                <button className="group flex items-center justify-center gap-3 rounded-xl border-2 border-teal-200 bg-white px-8 py-4 text-lg font-semibold text-teal-700 shadow-lg shadow-teal-900/10 transition-all hover:border-teal-700 hover:bg-teal-50">
                  <Play className="h-5 w-5 transition-transform group-hover:scale-110" />
                  شاهد الفيديو التعريفي
                </button>
              </div>

              <div className="flex items-center gap-10 border-t border-teal-100 pt-8">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="flex h-12 w-12 items-center justify-center rounded-full border-3 border-white bg-gradient-to-br from-teal-400 to-cyan-600 text-sm font-bold text-white shadow-lg"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-3 border-white bg-gradient-to-br from-slate-100 to-slate-200 text-xs font-bold text-teal-700 shadow-lg">
                    +5K
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="text-sm font-medium text-slate-600">
                    <span className="font-bold text-teal-700">8,432</span> عميل راضٍ عن خدماتنا
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl border border-teal-100 bg-white p-8 shadow-2xl shadow-teal-900/20">
                <div className="absolute -top-6 -right-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-xl shadow-teal-900/30">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>

                <div className="mb-6">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">المشاريع النشطة الآن</h3>
                    <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                      <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></div>
                      مباشر
                    </span>
                  </div>
                </div>

                <div className="mb-6 space-y-4">
                  {[
                    {
                      icon: Code,
                      title: 'تطوير تطبيق iOS',
                      time: '3 دقائق',
                      offers: 8,
                      budget: '15,000',
                      color: 'from-teal-600 to-teal-700',
                    },
                    {
                      icon: Palette,
                      title: 'تصميم هوية بصرية',
                      time: '12 دقيقة',
                      offers: 15,
                      budget: '8,500',
                      color: 'from-emerald-600 to-emerald-700',
                    },
                    {
                      icon: Megaphone,
                      title: 'حملة إعلانية رقمية',
                      time: '28 دقيقة',
                      offers: 22,
                      budget: '12,000',
                      color: 'from-cyan-600 to-cyan-700',
                    },
                  ].map((project, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="group cursor-pointer rounded-xl border border-teal-100/50 bg-gradient-to-br from-slate-50 to-teal-50/30 p-5 transition-all hover:border-teal-300 hover:shadow-lg"
                    >
                      <div className="mb-3 flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-11 w-11 rounded-lg bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg`}
                          >
                            <project.icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 transition-colors group-hover:text-teal-700">
                              {project.title}
                            </div>
                            <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                              <Clock className="h-3 w-3" />
                              منذ {project.time}
                            </div>
                          </div>
                        </div>
                        <div className="text-left">
                          <div className="text-lg font-bold text-teal-700">{project.offers}</div>
                          <div className="text-xs text-slate-500">عرض</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t border-teal-100 pt-3">
                        <div className="text-sm text-slate-600">
                          الميزانية:{' '}
                          <span className="font-bold text-teal-700">{project.budget} ريال</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-teal-600 transition-transform group-hover:translate-x-1" />
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="-mx-8 -mb-8 flex items-center justify-center gap-2 rounded-b-3xl border-t border-teal-100 bg-teal-50/30 py-4 pt-5 text-sm text-slate-500">
                  <TrendingUp className="h-4 w-4 text-teal-600" />
                  <span>
                    متوسط استلام العروض: <strong className="text-teal-700">4 ساعات</strong>
                  </span>
                </div>
              </div>

              <div className="absolute -bottom-8 -left-8 -z-10 h-40 w-40 rounded-3xl bg-gradient-to-br from-teal-200/40 to-cyan-200/40 blur-2xl"></div>
              <div className="absolute -top-8 -left-8 -z-10 h-32 w-32 rounded-3xl bg-gradient-to-br from-emerald-200/40 to-teal-200/40 blur-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-teal-700 via-cyan-800 to-emerald-700 px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group text-center"
              >
                <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-white shadow-lg shadow-teal-900/20 backdrop-blur-sm transition-all group-hover:scale-110 group-hover:bg-white/20">
                  {stat.icon}
                </div>
                <div className="mb-2 text-5xl font-bold text-white transition-transform group-hover:scale-110">
                  {stat.number}
                </div>
                <div className="mb-2 text-lg text-teal-100">{stat.label}</div>
                <div className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-emerald-300">
                  <TrendingUp className="h-4 w-4" />
                  {stat.trend} هذا الشهر
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-teal-50 px-5 py-2"
            >
              <Sparkles className="h-4 w-4 text-teal-700" />
              <span className="text-sm font-semibold text-teal-700">استكشف الفئات</span>
            </motion.div>
            <h2 className="mb-4 text-4xl font-bold text-slate-900 lg:text-5xl">
              مئات التخصصات في
              <span className="bg-gradient-to-r from-teal-700 to-cyan-800 bg-clip-text text-transparent">
                {' '}
                مكان واحد
              </span>
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-slate-600">
              اختر من بين أكثر من 200 تخصص مختلف واحصل على عروض من خبراء متخصصين
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-teal-100 bg-white p-7 transition-all hover:border-teal-300 hover:shadow-2xl hover:shadow-teal-900/10"
              >
                <div className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-gradient-to-br from-teal-50 to-transparent transition-transform group-hover:scale-150"></div>

                <div className="relative">
                  <div
                    className={`inline-flex h-16 w-16 items-center justify-center bg-gradient-to-br ${category.color} mb-5 rounded-xl text-white shadow-lg shadow-teal-900/20 transition-transform group-hover:scale-110`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-slate-900 transition-colors group-hover:text-teal-700">
                    {category.name}
                  </h3>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-medium text-slate-600">{category.count} خدمة متاحة</span>
                    <span className="font-bold text-teal-700">{category.projects}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-teal-100 pt-4">
                    <span className="text-sm text-slate-500">اكتشف المزيد</span>
                    <ChevronRight className="h-5 w-5 text-teal-600 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="rounded-xl bg-gradient-to-r from-teal-700 to-cyan-800 px-8 py-4 font-semibold text-white shadow-xl shadow-teal-900/30 transition-all hover:from-teal-800 hover:to-cyan-900 hover:shadow-2xl hover:shadow-teal-900/40">
              عرض جميع الفئات
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-b from-slate-50 to-teal-50/30 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 shadow-lg shadow-teal-900/10"
            >
              <Target className="h-4 w-4 text-teal-700" />
              <span className="text-sm font-semibold text-teal-700">عملية بسيطة</span>
            </motion.div>
            <h2 className="mb-4 text-4xl font-bold text-slate-900 lg:text-5xl">كيف تبدأ مشروعك؟</h2>
            <p className="mx-auto max-w-3xl text-xl text-slate-600">
              أربع خطوات فقط تفصلك عن تحقيق أهدافك
            </p>
          </div>

          <div className="mb-12 flex justify-center gap-4">
            {howItWorksTabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`rounded-xl px-8 py-3 font-semibold transition-all ${
                  activeTab === i
                    ? 'bg-gradient-to-r from-teal-700 to-cyan-800 text-white shadow-lg shadow-teal-900/30'
                    : 'border border-teal-200 bg-white text-slate-700 hover:bg-teal-50'
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>

          <div className="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                {i < steps.length - 1 && (
                  <div className="absolute top-16 left-full -ml-4 hidden h-1 w-full bg-gradient-to-r from-teal-300 to-transparent lg:block">
                    <div className="absolute top-1/2 left-0 h-3 w-3 -translate-y-1/2 animate-pulse rounded-full bg-teal-600"></div>
                  </div>
                )}
                <div className="group relative rounded-2xl border-2 border-teal-100 bg-white p-7 transition-all hover:border-teal-300 hover:shadow-xl hover:shadow-teal-900/10">
                  <div className="absolute -top-5 -right-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-teal-700 to-cyan-800 text-xl font-bold text-white shadow-xl shadow-teal-900/30 transition-transform group-hover:scale-110">
                    {step.number}
                  </div>
                  <div className="mt-6 mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                    {step.icon}
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-slate-900">{step.title}</h3>
                  <p className="mb-4 leading-relaxed text-slate-600">{step.description}</p>
                  <div className="flex items-center gap-2 rounded-lg bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700">
                    <Clock className="h-4 w-4" />
                    {step.time}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-teal-50 px-5 py-2"
            >
              <Shield className="h-4 w-4 text-teal-700" />
              <span className="text-sm font-semibold text-teal-700">مميزات استثنائية</span>
            </motion.div>
            <h2 className="mb-4 text-4xl font-bold text-slate-900 lg:text-5xl">
              لماذا تختار
              <span className="bg-gradient-to-r from-teal-700 to-cyan-800 bg-clip-text text-transparent">
                {' '}
                بِدّ
              </span>
              ؟
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-slate-600">
              تقنيات متقدمة وخدمات احترافية تضمن نجاح مشروعك
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border-2 border-teal-100 bg-gradient-to-br from-white to-teal-50/30 p-8 text-center transition-all hover:border-teal-300 hover:shadow-2xl hover:shadow-teal-900/10"
              >
                <div className="absolute top-0 right-0 rounded-bl-xl bg-gradient-to-r from-teal-700 to-cyan-800 px-4 py-1 text-xs font-bold text-white">
                  {feature.highlight}
                </div>
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-700 to-cyan-800 text-white shadow-xl shadow-teal-900/30 transition-transform group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">{feature.title}</h3>
                <p className="leading-relaxed text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-b from-slate-50 to-teal-50/30 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 shadow-lg shadow-teal-900/10"
            >
              <Star className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-semibold text-teal-700">قصص نجاح حقيقية</span>
            </motion.div>
            <h2 className="mb-4 text-4xl font-bold text-slate-900 lg:text-5xl">
              ماذا يقول عملاؤنا؟
            </h2>
            <p className="text-xl text-slate-600">تجارب ملهمة من مستخدمين حققوا أهدافهم</p>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl border-2 border-teal-100 bg-white p-10 shadow-2xl shadow-teal-900/10 lg:p-14"
              >
                <div className="mb-8 flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-7 w-7 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mb-10 text-2xl leading-relaxed font-medium text-slate-700">
                  "{testimonials[activeTestimonial].text}"
                </p>
                <div className="flex items-center justify-between border-t-2 border-teal-100 pt-8">
                  <div className="flex items-center gap-5">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-600 text-4xl shadow-lg shadow-teal-900/30">
                      {testimonials[activeTestimonial].image}
                    </div>
                    <div>
                      <div className="mb-1 text-xl font-bold text-slate-900">
                        {testimonials[activeTestimonial].name}
                      </div>
                      <div className="mb-2 text-slate-600">
                        {testimonials[activeTestimonial].role}
                      </div>
                      <div className="text-sm font-semibold text-teal-700">
                        {testimonials[activeTestimonial].project}
                      </div>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="mb-1 text-sm text-slate-500">قيمة المشروع</div>
                    <div className="bg-gradient-to-r from-teal-700 to-cyan-800 bg-clip-text text-2xl font-bold text-transparent">
                      {testimonials[activeTestimonial].value}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex justify-center gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`h-3 rounded-full transition-all ${
                    i === activeTestimonial
                      ? 'w-12 bg-gradient-to-r from-teal-700 to-cyan-800'
                      : 'w-3 bg-teal-200 hover:bg-teal-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-teal-700 via-cyan-800 to-emerald-700 px-4 py-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute right-10 bottom-10 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl"></div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-white" />
              <span className="text-sm font-semibold text-white">ابدأ رحلتك اليوم</span>
            </div>
            <h2 className="mb-6 text-5xl leading-tight font-bold text-white lg:text-6xl">
              جاهز لتحويل فكرتك
              <br />
              إلى واقع؟
            </h2>
            <p className="mx-auto mb-12 max-w-3xl text-2xl leading-relaxed text-teal-100">
              انضم لأكثر من 8,000 عميل راضٍ وابدأ مشروعك القادم بثقة
            </p>
            <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
              <button className="group hover:shadow-3xl flex items-center gap-3 rounded-xl bg-white px-10 py-5 text-lg font-bold text-teal-700 shadow-2xl shadow-teal-900/30 transition-all hover:bg-teal-50">
                ابدأ مشروعك الآن مجاناً
                <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="flex items-center gap-3 rounded-xl border-2 border-white/30 bg-white/10 px-10 py-5 text-lg font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20">
                <MessageCircle className="h-6 w-6" />
                تحدث مع فريق المبيعات
              </button>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>بدون بطاقة ائتمان</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>دعم مجاني</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>إلغاء في أي وقت</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 grid gap-12 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-cyan-700 shadow-xl shadow-teal-900/50">
                  <span className="text-2xl font-bold text-white">ب</span>
                </div>
                <div>
                  <div className="text-3xl font-bold">بِدّ</div>
                  <div className="text-sm text-teal-400">منصة العروض الاحترافية</div>
                </div>
              </div>
              <p className="mb-6 text-lg leading-relaxed text-slate-400">
                نربط بين أصحاب المشاريع والمحترفين المتميزين لتحقيق أفضل النتائج بأعلى معايير الجودة
                والاحترافية.
              </p>
              <div className="flex items-center gap-4">
                <button className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-800/50 transition-colors hover:bg-teal-700">
                  <span className="text-xl">𝕏</span>
                </button>
                <button className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-800/50 transition-colors hover:bg-teal-700">
                  <span className="text-xl">in</span>
                </button>
                <button className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-800/50 transition-colors hover:bg-teal-700">
                  <span className="text-xl">IG</span>
                </button>
              </div>
            </div>

            {[
              {
                title: 'المنتج',
                links: ['الفئات', 'كيف تعمل', 'الأسعار', 'الأسئلة الشائعة', 'قصص النجاح'],
              },
              { title: 'الشركة', links: ['من نحن', 'الوظائف', 'المدونة', 'اتصل بنا', 'الشركاء'] },
              {
                title: 'الدعم',
                links: ['مركز المساعدة', 'الشروط', 'الخصوصية', 'الأمان', 'حالة النظام'],
              },
            ].map((section, i) => (
              <div key={i}>
                <h4 className="mb-6 text-xl font-bold text-teal-400">{section.title}</h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="inline-block text-lg text-slate-400 transition-colors hover:translate-x-1 hover:text-white"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-between gap-6 border-t border-slate-800 pt-10 md:flex-row">
            <div className="text-lg text-slate-400">© 2025 بِدّ. جميع الحقوق محفوظة.</div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 animate-pulse rounded-full bg-emerald-500"></div>
              <span className="text-slate-400">جميع الأنظمة تعمل بكفاءة</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ProfessionalHomepage;
