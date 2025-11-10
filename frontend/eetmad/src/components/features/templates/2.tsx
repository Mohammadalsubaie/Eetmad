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
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function ModernPlatform() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const topServices = [
    {
      name: 'برمجة مواقع',
      icon: <Code className="h-5 w-5" />,
      trend: '+32%',
      color: 'from-purple-500 to-pink-500',
    },
    {
      name: 'تصميم جرافيك',
      icon: <PenTool className="h-5 w-5" />,
      trend: '+28%',
      color: 'from-orange-500 to-red-500',
    },
    {
      name: 'كتابة محتوى',
      icon: <BookOpen className="h-5 w-5" />,
      trend: '+45%',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      name: 'تصوير فوتوغرافي',
      icon: <Camera className="h-5 w-5" />,
      trend: '+19%',
      color: 'from-green-500 to-emerald-500',
    },
    {
      name: 'إنتاج فيديو',
      icon: <Play className="h-5 w-5" />,
      trend: '+37%',
      color: 'from-pink-500 to-rose-500',
    },
    {
      name: 'استشارات أعمال',
      icon: <Briefcase className="h-5 w-5" />,
      trend: '+24%',
      color: 'from-amber-500 to-yellow-500',
    },
  ];

  const liveProjects = [
    {
      title: 'تطوير متجر إلكتروني',
      client: 'متجر الإلكترونيات',
      budget: '25,000',
      bids: 24,
      time: '5 دقائق',
      category: 'برمجة',
      urgent: true,
      gradient: 'from-purple-600 to-blue-600',
    },
    {
      title: 'تصميم شعار وهوية',
      client: 'كافيه آرت',
      budget: '3,500',
      bids: 18,
      time: '15 دقيقة',
      category: 'تصميم',
      urgent: false,
      gradient: 'from-pink-600 to-rose-600',
    },
    {
      title: 'كتابة مقالات SEO',
      client: 'وكالة تسويق',
      budget: '8,000',
      bids: 31,
      time: '22 دقيقة',
      category: 'كتابة',
      urgent: false,
      gradient: 'from-orange-600 to-amber-600',
    },
  ];

  const superpowers = [
    {
      icon: <Rocket className="h-8 w-8" />,
      title: 'انطلاقة سريعة',
      description: 'احصل على أول عرض خلال 30 دقيقة أو نعيد لك ضعف المبلغ',
      color: 'from-purple-500 to-pink-500',
      stat: '30 دقيقة',
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'حماية مطلقة',
      description: 'أموالك في أمان تام حتى تستلم العمل كاملاً وتوافق عليه',
      color: 'from-blue-500 to-indigo-500',
      stat: '100% آمن',
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: 'جودة استثنائية',
      description: 'نضمن لك جودة عالمية أو نعيد تنفيذ المشروع مجاناً',
      color: 'from-orange-500 to-red-500',
      stat: '99.8% رضا',
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'دعم 24/7',
      description: 'فريقنا جاهز لمساعدتك في أي وقت عبر الدردشة المباشرة',
      color: 'from-pink-500 to-rose-500',
      stat: 'دائماً معك',
    },
  ];

  const workProcess = [
    {
      step: '1',
      title: 'انشر مشروعك',
      desc: 'وصف واضح + ميزانية مناسبة = عروض مثالية',
      icon: <FileText className="h-6 w-6" />,
      color: 'bg-gradient-to-br from-purple-500 to-blue-500',
    },
    {
      step: '2',
      title: 'استقبل العروض',
      desc: 'عشرات المحترفين يتسابقون لخدمتك',
      icon: <Users className="h-6 w-6" />,
      color: 'bg-gradient-to-br from-pink-500 to-orange-500',
    },
    {
      step: '3',
      title: 'اختر الأفضل',
      desc: 'قارن الأسعار والخبرات واختر بحرية',
      icon: <Target className="h-6 w-6" />,
      color: 'bg-gradient-to-br from-orange-500 to-amber-500',
    },
    {
      step: '4',
      title: 'احصل على النتيجة',
      desc: 'تابع التقدم واستلم عملاً متقناً',
      icon: <CheckCircle className="h-6 w-6" />,
      color: 'bg-gradient-to-br from-green-500 to-emerald-500',
    },
  ];

  const achievements = [
    {
      number: '50K+',
      label: 'مشروع مكتمل',
      icon: <CheckCircle className="h-6 w-6" />,
      color: 'text-purple-600 bg-purple-100',
    },
    {
      number: '15K+',
      label: 'عميل سعيد',
      icon: <Heart className="h-6 w-6" />,
      color: 'text-pink-600 bg-pink-100',
    },
    {
      number: '8K+',
      label: 'محترف موثوق',
      icon: <Crown className="h-6 w-6" />,
      color: 'text-orange-600 bg-orange-100',
    },
    {
      number: '4.9/5',
      label: 'تقييم العملاء',
      icon: <Star className="h-6 w-6" />,
      color: 'text-amber-600 bg-amber-100',
    },
  ];

  const testimonials = [
    {
      name: 'أحمد العتيبي',
      role: 'مؤسس ستارت آب',
      avatar: '🚀',
      text: 'وجدت مطور رهيب نفذ لي تطبيق كامل بميزانية معقولة. النتيجة فاقت توقعاتي!',
      project: 'تطبيق جوال',
      rating: 5,
      gradient: 'from-purple-600 to-blue-600',
    },
    {
      name: 'ليلى السالم',
      role: 'مديرة تسويق',
      avatar: '💼',
      text: 'منصة رائعة! حصلت على تصاميم احترافية وحملة تسويقية متكاملة.',
      project: 'حملة تسويقية',
      rating: 5,
      gradient: 'from-pink-600 to-orange-600',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % liveProjects.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50" dir="rtl">
      <div className="animate-blob fixed top-20 left-10 h-20 w-20 rounded-full bg-purple-300 opacity-70 mix-blend-multiply blur-xl filter"></div>
      <div className="animate-blob animation-delay-2000 fixed top-40 right-10 h-20 w-20 rounded-full bg-pink-300 opacity-70 mix-blend-multiply blur-xl filter"></div>
      <div className="animate-blob animation-delay-4000 fixed bottom-40 left-40 h-20 w-20 rounded-full bg-orange-300 opacity-70 mix-blend-multiply blur-xl filter"></div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
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

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrollY > 20 ? 'bg-white/90 shadow-xl backdrop-blur-xl' : 'bg-white/70 backdrop-blur-md'
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="group relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-75 blur transition duration-1000 group-hover:opacity-100"></div>
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
              </div>
              <div>
                <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-2xl font-black text-transparent">
                  بِدّ
                </div>
                <div className="text-xs font-semibold text-gray-600">حيث تتحقق الأفكار</div>
              </div>
            </div>

            <div className="hidden items-center gap-8 lg:flex">
              {['اكتشف', 'كيف تعمل', 'الفئات', 'قصص النجاح', 'التسعير'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="group relative font-semibold text-gray-700 transition-colors hover:text-purple-600"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 h-1 w-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            <div className="hidden items-center gap-4 lg:flex">
              <button className="px-6 py-2.5 font-bold text-purple-600 transition-colors hover:text-purple-700">
                تسجيل الدخول
              </button>
              <button className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 px-6 py-2.5 font-bold text-white shadow-lg shadow-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/60">
                <span className="relative z-10">ابدأ مجاناً</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 opacity-0 transition-opacity group-hover:opacity-100"></div>
              </button>
            </div>

            <button
              className="text-purple-600 lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="mb-8 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 px-6 py-3"
              >
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                <Sparkles className="h-4 w-4 text-purple-600" />
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-sm font-bold text-transparent">
                  الآن: 847 مشروع نشط
                </span>
              </motion.div>

              <h1 className="mb-6 text-6xl leading-tight font-black text-gray-900 lg:text-7xl">
                أطلق العنان
                <span className="mt-2 block bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                  لإبداعك
                </span>
              </h1>

              <p className="mb-10 text-2xl leading-relaxed font-medium text-gray-600">
                اربط فكرتك بآلاف المحترفين المبدعين. جودة عالمية، أسعار عادلة، نتائج مبهرة.
              </p>

              <div className="mb-12 flex flex-col gap-5 sm:flex-row">
                <button className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 px-8 py-4 text-lg font-bold text-white shadow-2xl shadow-purple-500/50 transition-all hover:shadow-purple-500/70">
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    انشر مشروعك الآن
                    <Rocket className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 opacity-0 transition-opacity group-hover:opacity-100"></div>
                </button>
                <button className="group flex items-center justify-center gap-3 rounded-2xl border-2 border-purple-200 bg-white px-8 py-4 text-lg font-bold text-purple-600 shadow-lg transition-all hover:border-purple-400 hover:bg-purple-50">
                  <Play className="h-5 w-5 transition-transform group-hover:scale-110" />
                  شاهد كيف تعمل
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-8">
                <div className="flex -space-x-3">
                  {['🎨', '💻', '📱', '✨', '🚀'].map((emoji, i) => (
                    <div
                      key={i}
                      className="flex h-12 w-12 items-center justify-center rounded-full border-3 border-white bg-gradient-to-br from-purple-400 to-pink-400 text-xl shadow-lg"
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-gray-600">
                    <span className="font-black text-purple-600">15,000+</span> عميل راضٍ
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute -inset-4 animate-pulse rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 opacity-30 blur-2xl"></div>
                <div className="relative rounded-3xl border-2 border-purple-100 bg-white p-8 shadow-2xl">
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-xl font-black text-gray-900">مشاريع حية الآن</h3>
                    <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-bold text-green-600">
                      <div className="h-2 w-2 animate-ping rounded-full bg-green-500"></div>
                      Live
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeProject}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="mb-4 rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-6"
                    >
                      <div className="mb-4 flex items-start justify-between">
                        <div>
                          <h4 className="mb-2 text-lg font-bold text-gray-900">
                            {liveProjects[activeProject].title}
                          </h4>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>منذ {liveProjects[activeProject].time}</span>
                            </div>
                            <span className="rounded-full border border-purple-200 bg-white px-3 py-1 font-semibold text-purple-600">
                              {liveProjects[activeProject].category}
                            </span>
                          </div>
                        </div>
                        {liveProjects[activeProject].urgent && (
                          <div className="animate-pulse rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
                            عاجل
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between border-t-2 border-purple-200 pt-4">
                        <div>
                          <div className="mb-1 text-sm text-gray-600">الميزانية</div>
                          <div className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-2xl font-black text-transparent">
                            {liveProjects[activeProject].budget} ر.س
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-black text-purple-600">
                            {liveProjects[activeProject].bids}
                          </div>
                          <div className="text-sm text-gray-600">عرض</div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex justify-center gap-2">
                    {liveProjects.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveProject(i)}
                        className={`h-2 rounded-full transition-all ${
                          i === activeProject
                            ? 'w-8 bg-gradient-to-r from-purple-600 to-pink-600'
                            : 'w-2 bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                {topServices.slice(0, 4).map((service, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className={`bg-gradient-to-br ${service.color} group cursor-pointer rounded-2xl p-4 text-white shadow-lg transition-all hover:shadow-xl`}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      {service.icon}
                      <span className="rounded-full bg-white/20 px-2 py-1 text-xs font-bold">
                        {service.trend}
                      </span>
                    </div>
                    <div className="text-sm font-bold transition-transform group-hover:scale-105">
                      {service.name}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 px-4 py-16 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {achievements.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group text-center"
              >
                <div
                  className={`inline-flex h-16 w-16 items-center justify-center ${item.color} mb-4 rounded-2xl shadow-lg transition-transform group-hover:scale-110`}
                >
                  {item.icon}
                </div>
                <div className="mb-2 text-5xl font-black text-white">{item.number}</div>
                <div className="font-semibold text-purple-100">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Superpowers */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3"
            >
              <Zap className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-bold text-purple-600">قوى خارقة لمشروعك</span>
            </motion.div>
            <h2 className="mb-6 text-5xl font-black text-gray-900 lg:text-6xl">
              لماذا نحن
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                {' '}
                مختلفون
              </span>
              ؟
            </h2>
            <p className="mx-auto max-w-3xl text-xl font-medium text-gray-600">
              نوفر لك تجربة استثنائية تجمع بين السرعة والأمان والجودة
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {superpowers.map((power, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(null)}
                className={`relative rounded-3xl border-2 bg-white p-8 transition-all duration-300 ${
                  hoveredFeature === i
                    ? '-translate-y-2 border-purple-400 shadow-2xl shadow-purple-500/30'
                    : 'border-gray-200 shadow-lg'
                }`}
              >
                <div
                  className={`h-16 w-16 bg-gradient-to-br ${power.color} mb-6 flex items-center justify-center rounded-2xl text-white shadow-lg ${hoveredFeature === i ? 'scale-110' : ''} transition-transform`}
                >
                  {power.icon}
                </div>
                <h3 className="mb-3 text-2xl font-black text-gray-900">{power.title}</h3>
                <p className="mb-4 leading-relaxed text-gray-600">{power.description}</p>
                <div
                  className={`inline-block bg-gradient-to-r px-4 py-2 ${power.color} rounded-full text-sm font-bold text-white shadow-md`}
                >
                  {power.stat}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-5xl font-black text-gray-900">
              ابدأ في
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {' '}
                4 خطوات
              </span>
            </h2>
            <p className="text-xl font-medium text-gray-600">رحلة بسيطة نحو النجاح</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {workProcess.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative"
              >
                {i < workProcess.length - 1 && (
                  <div className="absolute top-12 left-full z-0 -ml-4 hidden h-1 w-full bg-gradient-to-r from-purple-300 to-transparent lg:block"></div>
                )}
                <div className="group relative rounded-3xl border-2 border-purple-100 bg-white p-8 shadow-xl transition-all hover:-translate-y-2 hover:border-purple-300">
                  <div
                    className={`absolute -top-6 -right-6 h-16 w-16 ${step.color} flex items-center justify-center rounded-2xl text-2xl font-black text-white shadow-xl transition-transform group-hover:scale-110`}
                  >
                    {step.step}
                  </div>
                  <div className="mt-4 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 transition-colors group-hover:bg-purple-200">
                    {step.icon}
                  </div>
                  <h3 className="mb-3 text-xl font-black text-gray-900">{step.title}</h3>
                  <p className="leading-relaxed text-gray-600">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-5xl font-black text-gray-900">
              قصص
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {' '}
                ملهمة
              </span>
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className={`relative bg-gradient-to-br ${testimonial.gradient} overflow-hidden rounded-3xl p-10 text-white shadow-2xl`}
              >
                <div className="absolute top-0 right-0 text-9xl font-black opacity-10">"</div>
                <div className="relative z-10">
                  <div className="mb-6 flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 fill-white text-white" />
                    ))}
                  </div>
                  <p className="mb-8 text-xl leading-relaxed font-medium">{testimonial.text}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl backdrop-blur-sm">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="text-lg font-black">{testimonial.name}</div>
                      <div className="text-sm text-white/80">{testimonial.role}</div>
                      <div className="mt-1 text-xs text-white/60">{testimonial.project}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 px-4 py-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 backdrop-blur-sm">
              <Rocket className="h-5 w-5 text-white" />
              <span className="font-bold text-white">انطلق الآن</span>
            </div>
            <h2 className="mb-6 text-6xl leading-tight font-black text-white">
              هل أنت جاهز لتحقيق
              <br />
              <span className="text-yellow-300">حلمك الكبير؟</span>
            </h2>
            <p className="mx-auto mb-12 max-w-3xl text-2xl font-medium text-purple-100">
              انضم لآلاف المبدعين ورواد الأعمال الذين حققوا نجاحات مذهلة معنا
            </p>
            <div className="flex flex-col justify-center gap-6 sm:flex-row">
              <button className="group hover:shadow-3xl rounded-2xl bg-white px-10 py-5 text-xl font-black text-purple-600 shadow-2xl transition-all hover:-translate-y-1">
                <span className="flex items-center justify-center gap-3">
                  ابدأ مشروعك مجاناً
                  <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
              <button className="rounded-2xl border-2 border-white/50 bg-white/10 px-10 py-5 text-xl font-black text-white backdrop-blur-sm transition-all hover:bg-white/20">
                تحدث معنا
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 grid gap-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 shadow-xl">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
                <div className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-3xl font-black text-transparent">
                  بِدّ
                </div>
              </div>
              <p className="mb-6 text-lg leading-relaxed text-gray-400">
                نربط الأفكار بالمواهب، ونحول الأحلام إلى مشاريع ناجحة. معاً نصنع المستقبل.
              </p>
              <div className="flex gap-4">
                {['𝕏', 'in', 'YT', 'IG'].map((social, i) => (
                  <button
                    key={i}
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg transition-transform hover:scale-110"
                  >
                    <span className="text-lg font-bold">{social}</span>
                  </button>
                ))}
              </div>
            </div>

            {[
              { title: 'المنصة', links: ['كيف تعمل', 'الفئات', 'التسعير', 'للمحترفين'] },
              { title: 'الدعم', links: ['مركز المساعدة', 'اتصل بنا', 'الأسئلة', 'الحالة'] },
            ].map((section, i) => (
              <div key={i}>
                <h4 className="mb-6 text-xl font-black">{section.title}</h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="inline-block text-lg font-semibold text-gray-400 transition-colors hover:translate-x-1 hover:text-white"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 md:flex-row">
            <div className="text-lg text-gray-400">
              © 2025 بِدّ. صنع بـ <Heart className="inline h-4 w-4 text-pink-500" /> في السعودية
            </div>
            <div className="flex gap-6">
              <a
                href="#"
                className="font-semibold text-gray-400 transition-colors hover:text-white"
              >
                الشروط
              </a>
              <a
                href="#"
                className="font-semibold text-gray-400 transition-colors hover:text-white"
              >
                الخصوصية
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ModernPlatform;
