import { motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Briefcase,
  CheckCircle,
  Clock,
  Code,
  DollarSign,
  Eye,
  FileText,
  Layers,
  MapPin,
  Megaphone,
  Menu,
  Palette,
  Rocket,
  Search,
  Shield,
  Star,
  Target,
  User,
  Users,
  Video,
  Zap,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

function ProfessionalBiddingPlatform() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    {
      id: 1,
      name: 'البرمجة والتطوير',
      icon: <Code className="h-5 w-5" />,
      count: 2847,
      color: '#3D74B6',
    },
    {
      id: 2,
      name: 'التصميم والإبداع',
      icon: <Palette className="h-5 w-5" />,
      count: 1923,
      color: '#EAC8A6',
    },
    {
      id: 3,
      name: 'الكتابة والترجمة',
      icon: <FileText className="h-5 w-5" />,
      count: 1456,
      color: '#3D74B6',
    },
    {
      id: 4,
      name: 'التسويق الرقمي',
      icon: <Megaphone className="h-5 w-5" />,
      count: 1789,
      color: '#EAC8A6',
    },
    {
      id: 5,
      name: 'الفيديو والصوتيات',
      icon: <Video className="h-5 w-5" />,
      count: 983,
      color: '#3D74B6',
    },
    {
      id: 6,
      name: 'الأعمال والاستشارات',
      icon: <Briefcase className="h-5 w-5" />,
      count: 1234,
      color: '#EAC8A6',
    },
  ];

  const competitions = [
    {
      id: 1,
      title: 'تطوير منصة تجارة إلكترونية متكاملة مع نظام إدارة محتوى',
      category: 'البرمجة والتطوير',
      owner: 'شركة التقنية المتقدمة',
      verified: true,
      rating: 4.9,
      reviews: 156,
      description:
        'نبحث عن فريق محترف لتطوير منصة تجارة إلكترونية شاملة تتضمن نظام إدارة محتوى متقدم، تكامل مع بوابات الدفع، ونظام إدارة المخزون.',
      budget: { min: 80000, max: 150000 },
      duration: '4-6 أشهر',
      bids: 23,
      avgBid: 112000,
      timeLeft: '5 أيام',
      status: 'open',
      skills: ['React', 'Node.js', 'MongoDB', 'AWS', 'Payment Integration'],
      featured: true,
      urgent: false,
      views: 1247,
    },
    {
      id: 2,
      title: 'تصميم هوية بصرية كاملة لشركة ناشئة في مجال التقنية',
      category: 'التصميم والإبداع',
      owner: 'StartupHub Arabia',
      verified: true,
      rating: 5.0,
      reviews: 89,
      description:
        'مطلوب مصمم محترف لإنشاء هوية بصرية متكاملة تشمل الشعار، الألوان، الخطوط، ودليل الاستخدام البصري للعلامة التجارية.',
      budget: { min: 25000, max: 45000 },
      duration: '6-8 أسابيع',
      bids: 47,
      avgBid: 32000,
      timeLeft: '3 أيام',
      status: 'open',
      skills: ['Adobe Illustrator', 'Branding', 'UI/UX', 'Typography'],
      featured: true,
      urgent: true,
      views: 2134,
    },
    {
      id: 3,
      title: 'كتابة محتوى تسويقي احترافي لموقع خدمات مالية',
      category: 'الكتابة والترجمة',
      owner: 'Financial Solutions Co.',
      verified: false,
      rating: 4.7,
      reviews: 124,
      description:
        'نحتاج كاتب محتوى متخصص في المجال المالي لإنتاج محتوى تسويقي عالي الجودة يتضمن مقالات، صفحات هبوط، ومحتوى السوشيال ميديا.',
      budget: { min: 15000, max: 28000 },
      duration: '2-3 أشهر',
      bids: 61,
      avgBid: 21000,
      timeLeft: '7 أيام',
      status: 'open',
      skills: ['Content Writing', 'SEO', 'Marketing Copy', 'Arabic'],
      featured: false,
      urgent: false,
      views: 876,
    },
    {
      id: 4,
      title: 'حملة تسويقية متكاملة على منصات التواصل الاجتماعي',
      category: 'التسويق الرقمي',
      owner: 'Digital Marketing Pro',
      verified: true,
      rating: 4.8,
      reviews: 203,
      description:
        'نبحث عن خبير تسويق رقمي لإدارة حملة تسويقية شاملة تتضمن إنشاء المحتوى، إدارة الإعلانات، وتحليل الأداء على جميع المنصات.',
      budget: { min: 35000, max: 60000 },
      duration: '3 أشهر',
      bids: 38,
      avgBid: 47000,
      timeLeft: '2 أيام',
      status: 'open',
      skills: ['Social Media', 'Google Ads', 'Analytics', 'Content Strategy'],
      featured: true,
      urgent: true,
      views: 1567,
    },
    {
      id: 5,
      title: 'إنتاج فيديوهات ترويجية احترافية للمنتجات',
      category: 'الفيديو والصوتيات',
      owner: 'Media Production House',
      verified: true,
      rating: 4.95,
      reviews: 167,
      description:
        'مطلوب فريق إنتاج فيديو محترف لإنشاء سلسلة من الفيديوهات الترويجية عالية الجودة للمنتجات والخدمات مع موشن جرافيكس.',
      budget: { min: 45000, max: 85000 },
      duration: '6-10 أسابيع',
      bids: 29,
      avgBid: 62000,
      timeLeft: '4 أيام',
      status: 'open',
      skills: ['Video Production', 'After Effects', 'Motion Graphics', 'Editing'],
      featured: false,
      urgent: false,
      views: 1023,
    },
    {
      id: 6,
      title: 'استشارات استراتيجية لتطوير خطة عمل متكاملة',
      category: 'الأعمال والاستشارات',
      owner: 'Business Consulting Group',
      verified: true,
      rating: 4.85,
      reviews: 142,
      description:
        'شركة ناشئة تبحث عن استشاري أعمال محترف لوضع خطة استراتيجية شاملة تتضمن دراسة السوق، التحليل المالي، وخطة النمو.',
      budget: { min: 55000, max: 95000 },
      duration: '8-12 أسبوع',
      bids: 19,
      avgBid: 72000,
      timeLeft: '6 أيام',
      status: 'open',
      skills: ['Business Strategy', 'Market Analysis', 'Financial Planning', 'Consulting'],
      featured: false,
      urgent: false,
      views: 734,
    },
  ];

  const topProviders = [
    {
      id: 1,
      name: 'محمد الأحمدي',
      title: 'مطور Full Stack محترف',
      rating: 4.98,
      reviews: 287,
      completedProjects: 543,
      successRate: 99,
      hourlyRate: 450,
      skills: ['React', 'Node.js', 'Python', 'AWS'],
      verified: true,
      topRated: true,
      responseTime: '1 ساعة',
      location: 'الرياض، السعودية',
    },
    {
      id: 2,
      name: 'سارة العتيبي',
      title: 'مصممة UI/UX إبداعية',
      rating: 5.0,
      reviews: 234,
      completedProjects: 412,
      successRate: 100,
      hourlyRate: 380,
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
      verified: true,
      topRated: true,
      responseTime: '30 دقيقة',
      location: 'جدة، السعودية',
    },
    {
      id: 3,
      name: 'خالد السعيد',
      title: 'خبير تسويق رقمي',
      rating: 4.92,
      reviews: 198,
      completedProjects: 367,
      successRate: 97,
      hourlyRate: 350,
      skills: ['SEO', 'Google Ads', 'Social Media', 'Analytics'],
      verified: true,
      topRated: false,
      responseTime: '2 ساعات',
      location: 'الدمام، السعودية',
    },
    {
      id: 4,
      name: 'نورة القحطاني',
      title: 'كاتبة محتوى ومترجمة',
      rating: 4.89,
      reviews: 176,
      completedProjects: 489,
      successRate: 96,
      hourlyRate: 280,
      skills: ['Content Writing', 'Translation', 'SEO', 'Copywriting'],
      verified: true,
      topRated: false,
      responseTime: '1 ساعة',
      location: 'الرياض، السعودية',
    },
  ];

  const stats = [
    {
      label: 'المشاريع النشطة',
      value: '12,847',
      icon: <Layers className="h-6 w-6" />,
      change: '+18%',
    },
    {
      label: 'المحترفون الموثوقون',
      value: '8,234',
      icon: <Users className="h-6 w-6" />,
      change: '+24%',
    },
    {
      label: 'إجمالي المدفوعات',
      value: '247M SAR',
      icon: <DollarSign className="h-6 w-6" />,
      change: '+35%',
    },
    { label: 'معدل الرضا', value: '4.9/5', icon: <Star className="h-6 w-6" />, change: '+0.2' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Clean & Professional */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-lg' : 'bg-white'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#3D74B6] to-[#2E5A8F] shadow-md">
                <Target className="h-6 w-6 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#1A2A4F]">منصة المنافسات</h1>
                <p className="text-xs font-medium text-[#5F6368]">للمشاريع الاحترافية</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden items-center gap-1 lg:flex">
              {['الرئيسية', 'المنافسات', 'المحترفون', 'كيف تعمل', 'المساعدة'].map((item, i) => (
                <button
                  key={i}
                  className="rounded-lg px-5 py-2 text-sm font-semibold text-[#1A2A4F] transition-all hover:bg-[#FBF5DE] hover:text-[#3D74B6]"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button className="hidden items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold text-[#1A2A4F] transition-all hover:bg-[#FBF5DE] sm:flex">
                <User className="h-4 w-4" />
                تسجيل الدخول
              </button>
              <button className="rounded-lg bg-[#3D74B6] px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#2E5A8F]">
                انشر مشروعك
              </button>
              <button className="rounded-lg p-2 hover:bg-[#FBF5DE] lg:hidden">
                <Menu className="h-6 w-6 text-[#1A2A4F]" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section - Clean & Focused */}
      <section className="bg-gradient-to-b from-[#FBF5DE] to-white pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#EAC8A6] bg-white px-4 py-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-[#0F9D58]"></div>
                <span className="text-sm font-semibold text-[#1A2A4F]">+2,847 مشروع نشط الآن</span>
              </div>

              <h1 className="mb-6 text-5xl leading-tight font-bold text-[#1A2A4F] lg:text-6xl">
                احصل على أفضل العروض
                <br />
                <span className="text-[#3D74B6]">من محترفين موثوقين</span>
              </h1>

              <p className="mb-8 text-xl leading-relaxed font-medium text-[#5F6368]">
                انشر مشروعك واستقبل عروضاً تنافسية من آلاف المحترفين المتخصصين في مختلف المجالات
              </p>

              {/* Search */}
              <div className="relative mb-8">
                <div className="flex items-stretch overflow-hidden rounded-xl border-2 border-[#EAC8A6] bg-white shadow-lg">
                  <div className="flex flex-1 items-center gap-3 px-5 py-4">
                    <Search className="h-5 w-5 text-[#3D74B6]" strokeWidth={2} />
                    <input
                      type="text"
                      placeholder="ابحث عن مشاريع، مهارات، أو خدمات..."
                      className="w-full bg-transparent font-medium text-[#1A2A4F] placeholder-[#9AA0A6] outline-none"
                    />
                  </div>
                  <button className="bg-[#3D74B6] px-8 py-4 font-bold text-white transition-all hover:bg-[#2E5A8F]">
                    بحث
                  </button>
                </div>

                {/* Popular Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-sm font-semibold text-[#5F6368]">شائع:</span>
                  {['تطوير مواقع', 'تصميم شعارات', 'كتابة محتوى', 'تسويق رقمي'].map((tag, i) => (
                    <button
                      key={i}
                      className="rounded-lg border border-[#EAC8A6] bg-white px-3 py-1 text-xs font-semibold text-[#3D74B6] transition-all hover:bg-[#FBF5DE]"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#0F9D58]" />
                  <span className="text-sm font-semibold text-[#1A2A4F]">دفع آمن 100%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-[#3D74B6]" />
                  <span className="text-sm font-semibold text-[#1A2A4F]">ضمان الجودة</span>
                </div>
              </div>
            </motion.div>

            {/* Right - Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="rounded-2xl border-2 border-[#EAC8A6] bg-white p-8 shadow-xl">
                <div className="mb-6 flex items-center justify-between border-b-2 border-[#FBF5DE] pb-6">
                  <div>
                    <h3 className="mb-1 text-2xl font-bold text-[#1A2A4F]">مشروع مميز</h3>
                    <p className="text-sm font-medium text-[#5F6368]">منذ ساعتين</p>
                  </div>
                  <div className="rounded-lg bg-[#3D74B6] px-4 py-2 text-xs font-bold text-white">
                    جديد
                  </div>
                </div>

                <h4 className="mb-4 text-xl leading-snug font-bold text-[#1A2A4F]">
                  تطوير تطبيق ويب متقدم بتقنيات حديثة
                </h4>

                <p className="mb-6 leading-relaxed font-medium text-[#5F6368]">
                  نبحث عن مطور محترف لبناء منصة SaaS شاملة باستخدام أحدث التقنيات...
                </p>

                <div className="mb-6 grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-[#FBF5DE] p-4">
                    <p className="mb-1 text-sm font-semibold text-[#5F6368]">الميزانية</p>
                    <p className="text-2xl font-black text-[#1A2A4F]">120K</p>
                    <p className="text-xs font-medium text-[#9AA0A6]">ريال سعودي</p>
                  </div>
                  <div className="rounded-xl bg-[#FBF5DE] p-4">
                    <p className="mb-1 text-sm font-semibold text-[#5F6368]">العروض</p>
                    <p className="text-2xl font-black text-[#1A2A4F]">23</p>
                    <p className="text-xs font-medium text-[#9AA0A6]">عرض مقدم</p>
                  </div>
                </div>

                <div className="mb-6 flex flex-wrap gap-2">
                  {['React', 'Node.js', 'AWS'].map((skill, i) => (
                    <span
                      key={i}
                      className="rounded-lg border border-[#EAC8A6] bg-white px-3 py-1 text-xs font-bold text-[#3D74B6]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <button className="w-full rounded-xl bg-[#3D74B6] py-3 font-bold text-white transition-all hover:bg-[#2E5A8F]">
                  عرض التفاصيل
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-[#E0E0E0] bg-white py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center lg:text-right"
              >
                <div className="mb-3 flex items-center justify-center gap-3 lg:justify-start">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FBF5DE]">
                    {React.cloneElement(stat.icon, { className: 'text-[#3D74B6]', strokeWidth: 2 })}
                  </div>
                  <div className="rounded-lg bg-[#E8F5E9] px-3 py-1 text-xs font-bold text-[#0F9D58]">
                    {stat.change}
                  </div>
                </div>
                <p className="mb-2 text-3xl font-black text-[#1A2A4F] lg:text-4xl">{stat.value}</p>
                <p className="text-sm font-semibold text-[#5F6368]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-[#FBF5DE] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#EAC8A6] bg-white px-4 py-2">
              <Layers className="h-4 w-4 text-[#3D74B6]" />
              <span className="text-sm font-bold text-[#1A2A4F]">التصنيفات</span>
            </div>
            <h2 className="mb-4 text-4xl font-bold text-[#1A2A4F]">استكشف المجالات المتاحة</h2>
            <p className="text-lg font-medium text-[#5F6368]">آلاف المشاريع في مختلف التخصصات</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedCategory(cat.id)}
                className="group cursor-pointer"
              >
                <div
                  className={`rounded-xl border-2 bg-white p-6 transition-all ${
                    selectedCategory === cat.id
                      ? 'border-[#3D74B6] shadow-lg'
                      : 'border-[#EAC8A6] hover:border-[#3D74B6] hover:shadow-md'
                  }`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FBF5DE] transition-all group-hover:bg-[#3D74B6]">
                      {React.cloneElement(cat.icon, {
                        className: `text-[#3D74B6] group-hover:text-white transition-all`,
                        strokeWidth: 2,
                      })}
                    </div>
                    <ArrowRight
                      className="h-5 w-5 text-[#EAC8A6] transition-all group-hover:text-[#3D74B6]"
                      strokeWidth={2}
                    />
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-[#1A2A4F]">{cat.name}</h3>

                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-black text-[#3D74B6]">
                      {cat.count.toLocaleString()}
                    </p>
                    <p className="text-sm font-semibold text-[#5F6368]">مشروع</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitions */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#EAC8A6] bg-[#FBF5DE] px-4 py-2">
                <Target className="h-4 w-4 text-[#3D74B6]" />
                <span className="text-sm font-bold text-[#1A2A4F]">المنافسات المميزة</span>
              </div>
              <h2 className="mb-2 text-4xl font-bold text-[#1A2A4F]">أحدث المشاريع</h2>
              <p className="text-lg font-medium text-[#5F6368]">
                اختر المشروع المناسب وقدم عرضك الآن
              </p>
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              {[
                { id: 'all', label: 'الكل', icon: <Layers /> },
                { id: 'featured', label: 'مميز', icon: <Star /> },
                { id: 'urgent', label: 'عاجل', icon: <Zap /> },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveTab(filter.id)}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                    activeTab === filter.id
                      ? 'bg-[#3D74B6] text-white shadow-md'
                      : 'border border-[#EAC8A6] bg-white text-[#1A2A4F] hover:bg-[#FBF5DE]'
                  }`}
                >
                  {React.cloneElement(filter.icon, { className: 'w-4 h-4', strokeWidth: 2 })}
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {competitions.map((comp, index) => (
              <motion.div
                key={comp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -2 }}
                className="group"
              >
                <div className="rounded-xl border-2 border-[#EAC8A6] bg-white p-6 transition-all hover:border-[#3D74B6] hover:shadow-lg lg:p-8">
                  <div className="mb-6 flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
                    {/* Left Info */}
                    <div className="flex-1">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FBF5DE]">
                          <Briefcase className="h-5 w-5 text-[#3D74B6]" strokeWidth={2} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-[#1A2A4F]">{comp.owner}</h4>
                            {comp.verified && <BadgeCheck className="h-4 w-4 text-[#3D74B6]" />}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-[#F4B400] text-[#F4B400]" />
                              <span className="font-semibold text-[#1A2A4F]">{comp.rating}</span>
                            </div>
                            <span className="text-[#9AA0A6]">({comp.reviews} تقييم)</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          {comp.featured && (
                            <div className="rounded-lg bg-[#3D74B6] px-3 py-1 text-xs font-bold text-white">
                              مميز
                            </div>
                          )}
                          {comp.urgent && (
                            <div className="flex items-center gap-1 rounded-lg bg-[#DB4437] px-3 py-1 text-xs font-bold text-white">
                              <Zap className="h-3 w-3" fill="white" />
                              عاجل
                            </div>
                          )}
                        </div>
                      </div>

                      <h3 className="mb-3 text-2xl leading-snug font-bold text-[#1A2A4F] transition-colors group-hover:text-[#3D74B6]">
                        {comp.title}
                      </h3>

                      <p className="mb-4 leading-relaxed font-medium text-[#5F6368]">
                        {comp.description}
                      </p>

                      <div className="mb-4 flex flex-wrap gap-2">
                        {comp.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="rounded-lg bg-[#FBF5DE] px-3 py-1 text-sm font-semibold text-[#3D74B6]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-2 font-medium text-[#5F6368]">
                          <Clock className="h-4 w-4" strokeWidth={2} />
                          <span>{comp.duration}</span>
                        </div>
                        <div className="h-4 w-px bg-[#E0E0E0]"></div>
                        <div className="flex items-center gap-2 font-medium text-[#5F6368]">
                          <Users className="h-4 w-4" strokeWidth={2} />
                          <span>{comp.bids} عرض</span>
                        </div>
                        <div className="h-4 w-px bg-[#E0E0E0]"></div>
                        <div className="flex items-center gap-2 font-medium text-[#5F6368]">
                          <Eye className="h-4 w-4" strokeWidth={2} />
                          <span>{comp.views.toLocaleString()} مشاهدة</span>
                        </div>
                        <div className="h-4 w-px bg-[#E0E0E0]"></div>
                        <div className="flex items-center gap-2 font-semibold text-[#DB4437]">
                          <Clock className="h-4 w-4" strokeWidth={2} />
                          <span>متبقي {comp.timeLeft}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Info */}
                    <div className="flex flex-col items-start gap-4 lg:items-end">
                      <div className="text-left lg:text-right">
                        <p className="mb-1 text-sm font-semibold text-[#5F6368]">الميزانية</p>
                        <p className="text-3xl font-black text-[#1A2A4F]">
                          {comp.budget.min.toLocaleString()}-{comp.budget.max.toLocaleString()}
                        </p>
                        <p className="text-sm font-medium text-[#9AA0A6]">ريال سعودي</p>
                      </div>

                      <div className="text-left lg:text-right">
                        <p className="mb-1 text-sm font-semibold text-[#5F6368]">متوسط العروض</p>
                        <p className="text-2xl font-black text-[#3D74B6]">
                          {comp.avgBid.toLocaleString()}
                        </p>
                        <p className="text-xs font-medium text-[#9AA0A6]">ريال سعودي</p>
                      </div>

                      <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3D74B6] px-8 py-3 font-bold text-white shadow-md transition-all hover:bg-[#2E5A8F] lg:w-auto">
                        <span>قدّم عرضك</span>
                        <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="rounded-xl border-2 border-[#3D74B6] px-8 py-3 font-bold text-[#3D74B6] transition-all hover:bg-[#3D74B6] hover:text-white">
              عرض المزيد من المشاريع
            </button>
          </div>
        </div>
      </section>

      {/* Top Providers */}
      <section className="bg-[#FBF5DE] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#EAC8A6] bg-white px-4 py-2">
              <Award className="h-4 w-4 text-[#3D74B6]" />
              <span className="text-sm font-bold text-[#1A2A4F]">المحترفون الموثوقون</span>
            </div>
            <h2 className="mb-4 text-4xl font-bold text-[#1A2A4F]">أفضل مقدمي الخدمات</h2>
            <p className="text-lg font-medium text-[#5F6368]">
              تواصل مع محترفين ذوي سجل حافل بالنجاح
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {topProviders.map((provider, index) => (
              <motion.div
                key={provider.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group"
              >
                <div className="overflow-hidden rounded-xl border-2 border-[#EAC8A6] bg-white transition-all hover:border-[#3D74B6] hover:shadow-lg">
                  {/* Header */}
                  <div className="relative h-24 bg-gradient-to-br from-[#3D74B6] to-[#2E5A8F]">
                    {provider.topRated && (
                      <div className="absolute top-3 right-3 rounded-lg bg-white/90 px-3 py-1 backdrop-blur-sm">
                        <span className="text-xs font-black text-[#3D74B6]">Top Rated</span>
                      </div>
                    )}
                  </div>

                  <div className="px-6 pb-6">
                    {/* Avatar */}
                    <div className="relative -mt-12 mb-4">
                      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-xl border-4 border-white bg-gradient-to-br from-[#EAC8A6] to-[#D4A97A] shadow-lg">
                        <span className="text-3xl font-black text-white">
                          {provider.name.charAt(0)}
                        </span>
                      </div>
                      {provider.verified && (
                        <div className="absolute -bottom-1 left-1/2 flex h-6 w-6 -translate-x-1/2 transform items-center justify-center rounded-full border-2 border-white bg-[#0F9D58]">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="mb-4 text-center">
                      <h3 className="mb-1 text-lg font-bold text-[#1A2A4F]">{provider.name}</h3>
                      <p className="mb-2 text-sm font-semibold text-[#5F6368]">{provider.title}</p>
                      <div className="mb-1 flex items-center justify-center gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-[#F4B400] text-[#F4B400]" />
                          <span className="font-bold text-[#1A2A4F]">{provider.rating}</span>
                        </div>
                        <span className="text-[#9AA0A6]">({provider.reviews})</span>
                      </div>
                      <p className="flex items-center justify-center gap-1 text-xs font-medium text-[#9AA0A6]">
                        <MapPin className="h-3 w-3" />
                        {provider.location}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="mb-4 grid grid-cols-2 gap-3">
                      <div className="rounded-lg bg-[#FBF5DE] p-3 text-center">
                        <p className="text-xl font-black text-[#3D74B6]">
                          {provider.completedProjects}
                        </p>
                        <p className="text-xs font-semibold text-[#5F6368]">مشروع</p>
                      </div>
                      <div className="rounded-lg bg-[#FBF5DE] p-3 text-center">
                        <p className="text-xl font-black text-[#3D74B6]">{provider.hourlyRate}</p>
                        <p className="text-xs font-semibold text-[#5F6368]">ر.س/ساعة</p>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-4 flex flex-wrap justify-center gap-1">
                      {provider.skills.slice(0, 3).map((skill, i) => (
                        <span
                          key={i}
                          className="rounded border border-[#EAC8A6] bg-white px-2 py-1 text-xs font-semibold text-[#3D74B6]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <button className="w-full rounded-lg bg-[#3D74B6] py-2.5 text-sm font-bold text-white transition-all hover:bg-[#2E5A8F]">
                      عرض الملف
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#3D74B6] to-[#2E5A8F] py-20">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
            <Rocket className="h-10 w-10 text-white" strokeWidth={2} />
          </div>

          <h2 className="mb-6 text-5xl font-bold text-white">هل أنت مستعد للبدء؟</h2>
          <p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed font-medium text-white/90">
            انضم إلى آلاف الشركات والمحترفين الذين يستخدمون منصتنا لتحقيق أهدافهم
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button className="rounded-xl bg-white px-10 py-4 font-bold text-[#3D74B6] shadow-xl transition-all hover:bg-[#FBF5DE]">
              انشر مشروعك الآن
            </button>
            <button className="rounded-xl border-2 border-white px-10 py-4 font-bold text-white transition-all hover:bg-white hover:text-[#3D74B6]">
              ابدأ كمحترف
            </button>
          </div>

          {/* Trust */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 border-t border-white/20 pt-12">
            {[
              { icon: <Shield />, label: 'دفع آمن' },
              { icon: <CheckCircle />, label: 'ضمان الجودة' },
              { icon: <Users />, label: 'دعم 24/7' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
                  {React.cloneElement(item.icon, {
                    className: 'w-5 h-5 text-white',
                    strokeWidth: 2,
                  })}
                </div>
                <span className="font-semibold text-white">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-[#FBF5DE] bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#3D74B6] to-[#2E5A8F]">
                  <Target className="h-6 w-6 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1A2A4F]">منصة المنافسات</h3>
                  <p className="text-xs font-medium text-[#5F6368]">للمشاريع الاحترافية</p>
                </div>
              </div>
              <p className="mb-6 leading-relaxed font-medium text-[#5F6368]">
                نربط أفضل المواهب بأهم الفرص في الوطن العربي
              </p>
            </div>

            {/* Links */}
            {[
              { title: 'الشركة', links: ['من نحن', 'المدونة', 'الوظائف', 'الأخبار'] },
              { title: 'الخدمات', links: ['للشركات', 'للمحترفين', 'الباقات', 'API'] },
              { title: 'الدعم', links: ['المساعدة', 'تواصل معنا', 'الشروط', 'الخصوصية'] },
            ].map((column, i) => (
              <div key={i}>
                <h4 className="mb-4 text-sm font-bold text-[#1A2A4F] uppercase">{column.title}</h4>
                <ul className="space-y-3">
                  {column.links.map((link, j) => (
                    <li key={j}>
                      <a
                        href="#"
                        className="text-sm font-medium text-[#5F6368] transition-colors hover:text-[#3D74B6]"
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
          <div className="flex flex-col items-center justify-between gap-4 border-t border-[#E0E0E0] pt-8 md:flex-row">
            <p className="text-sm font-medium text-[#5F6368]">
              © 2025 منصة المنافسات. جميع الحقوق محفوظة.
            </p>
            <div className="flex gap-4">
              {['الخصوصية', 'الشروط', 'ملفات تعريف الارتباط'].map((link, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-sm font-medium text-[#5F6368] transition-colors hover:text-[#3D74B6]"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ProfessionalBiddingPlatform;
