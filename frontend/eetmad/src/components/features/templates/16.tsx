'use client';

import {
  BadgeCheck,
  Briefcase,
  CheckCircle,
  Clock,
  Code,
  Eye,
  Facebook,
  FileText,
  Globe,
  Headphones,
  Instagram,
  Linkedin,
  Megaphone,
  Menu,
  Palette,
  Rocket,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Twitter,
  Users,
  X,
  Zap,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

function ModernFreelancePlatform() {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3);
    }, 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const categories = [
    { id: 'all', name: 'الكل', icon: <Globe />, count: '52K+', color: '#94B49F' },
    { id: 'design', name: 'التصميم', icon: <Palette />, count: '18K+', color: '#ECB390' },
    { id: 'tech', name: 'البرمجة', icon: <Code />, count: '23K+', color: '#CEE5D0' },
    { id: 'marketing', name: 'التسويق', icon: <Megaphone />, count: '15K+', color: '#FCF8E8' },
    { id: 'content', name: 'المحتوى', icon: <FileText />, count: '12K+', color: '#94B49F' },
    { id: 'business', name: 'الأعمال', icon: <Briefcase />, count: '9K+', color: '#ECB390' },
  ];

  const featuredProjects = [
    {
      id: 1,
      title: 'تصميم وتطوير منصة تعليمية تفاعلية متكاملة',
      description:
        'نبحث عن فريق متميز لإنشاء منصة تعليمية حديثة تتضمن نظام إدارة محتوى وبث مباشر واختبارات تفاعلية',
      category: 'البرمجة',
      budget: '200,000 - 350,000',
      duration: '5-7 أشهر',
      client: {
        name: 'مؤسسة المستقبل التعليمية',
        avatar: '🎓',
        rating: 5.0,
        verified: true,
        projects: 124,
      },
      skills: ['React', 'Node.js', 'MongoDB', 'WebRTC', 'AWS'],
      proposals: 67,
      views: 3421,
      posted: 'منذ ساعتين',
      featured: true,
      urgent: true,
    },
    {
      id: 2,
      title: 'حملة تسويق رقمي شاملة لعلامة تجارية فاخرة',
      description: 'مطلوب استراتيجي تسويق رقمي محترف لإطلاق وإدارة حملة تسويقية متعددة القنوات',
      category: 'التسويق',
      budget: '120,000 - 180,000',
      duration: '4 أشهر',
      client: {
        name: 'مجموعة الرفاهية الذهبية',
        avatar: '💎',
        rating: 4.9,
        verified: true,
        projects: 89,
      },
      skills: ['Digital Marketing', 'Social Media', 'Content Strategy'],
      proposals: 92,
      views: 4156,
      posted: 'منذ 5 ساعات',
      featured: true,
      urgent: false,
    },
    {
      id: 3,
      title: 'تطوير هوية بصرية ومواد تسويقية لشركة ناشئة',
      description: 'نحتاج مصمم جرافيك موهوب لخلق هوية بصرية فريدة تشمل الشعار والألوان والخطوط',
      category: 'التصميم',
      budget: '75,000 - 110,000',
      duration: '2-3 أشهر',
      client: {
        name: 'تك إنوفيشن ستارت اب',
        avatar: '🚀',
        rating: 4.8,
        verified: true,
        projects: 34,
      },
      skills: ['Brand Identity', 'Logo Design', 'Illustrator'],
      proposals: 124,
      views: 5234,
      posted: 'منذ يوم واحد',
      featured: false,
      urgent: true,
    },
    {
      id: 4,
      title: 'كتابة محتوى تسويقي ومقالات متخصصة',
      description: 'نبحث عن كاتب محتوى محترف لإنشاء مقالات تسويقية ومحتوى جذاب لموقعنا الإلكتروني',
      category: 'المحتوى',
      budget: '45,000 - 70,000',
      duration: '3 أشهر',
      client: {
        name: 'شركة التسويق الإبداعي',
        avatar: '✍️',
        rating: 4.9,
        verified: true,
        projects: 56,
      },
      skills: ['Copywriting', 'SEO Writing', 'Content Strategy'],
      proposals: 78,
      views: 2890,
      posted: 'منذ 3 ساعات',
      featured: false,
      urgent: false,
    },
  ];

  const topFreelancers = [
    {
      name: 'أحمد المهندس',
      title: 'مطور Full Stack',
      specialty: 'تطوير الويب والموبايل',
      avatar: '👨‍💻',
      rating: 5.0,
      reviews: 456,
      jobs: 623,
      rate: 720,
      skills: ['React', 'Node.js', 'Python'],
      available: true,
      verified: true,
    },
    {
      name: 'سارة الإبداعية',
      title: 'مصممة UI/UX',
      specialty: 'تصميم تجربة المستخدم',
      avatar: '👩‍🎨',
      rating: 5.0,
      reviews: 389,
      jobs: 542,
      rate: 650,
      skills: ['Figma', 'Adobe XD', 'Sketch'],
      available: true,
      verified: true,
    },
    {
      name: 'محمد الكاتب',
      title: 'كاتب محتوى',
      specialty: 'المحتوى التسويقي',
      avatar: '✍️',
      rating: 4.9,
      reviews: 312,
      jobs: 734,
      rate: 480,
      skills: ['Copywriting', 'SEO'],
      available: false,
      verified: true,
    },
    {
      name: 'فاطمة المسوقة',
      title: 'خبيرة تسويق رقمي',
      specialty: 'استراتيجيات النمو',
      avatar: '📊',
      rating: 5.0,
      reviews: 278,
      jobs: 467,
      rate: 590,
      skills: ['Growth', 'Analytics'],
      available: true,
      verified: true,
    },
  ];

  const testimonials = [
    {
      content:
        'تجربة رائعة ومختلفة تماماً. وجدت أفضل المواهب لمشاريعي وتم إنجاز كل شيء بجودة عالية واحترافية مذهلة',
      author: 'عبدالله الشمري',
      role: 'مدير مشاريع تقنية',
      avatar: '👨‍💼',
      rating: 5,
    },
    {
      content:
        'كمستقلة، المنصة فتحت لي أبواباً كثيرة. العملاء محترمون والمشاريع متنوعة ومثيرة والأجور عادلة جداً',
      author: 'نورا العتيبي',
      role: 'مصممة UI/UX',
      avatar: '👩‍💻',
      rating: 5,
    },
    {
      content:
        'أفضل منصة عمل حر في المنطقة بلا منافس. النظام سلس، الدعم ممتاز، والنتائج تفوق كل التوقعات',
      author: 'خالد البراك',
      role: 'رائد أعمال',
      avatar: '🚀',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <nav
        className={`fixed top-0 right-0 left-0 z-50 transition-all ${
          scrollY > 50 ? 'bg-white shadow-lg' : 'bg-white'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#94B49F]">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-[#94B49F]">موهبتي</h1>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden items-center gap-8 lg:flex">
              <button className="font-bold text-[#94B49F] transition-colors hover:text-[#ECB390]">
                تصفح المشاريع
              </button>
              <button className="font-bold text-[#94B49F] transition-colors hover:text-[#ECB390]">
                أفضل المواهب
              </button>
              <button className="font-bold text-[#94B49F] transition-colors hover:text-[#ECB390]">
                كيف نعمل
              </button>
              <button className="font-bold text-[#94B49F] transition-colors hover:text-[#ECB390]">
                التسعير
              </button>
            </div>

            {/* Auth Buttons */}
            <div className="hidden items-center gap-4 lg:flex">
              <button className="rounded-xl px-6 py-2.5 font-bold text-[#94B49F] transition-colors hover:bg-[#FCF8E8]">
                تسجيل الدخول
              </button>
              <button className="rounded-xl bg-[#94B49F] px-6 py-2.5 font-bold text-white transition-colors hover:bg-[#ECB390]">
                ابدأ الآن
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-[#94B49F] lg:hidden"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-[#CEE5D0] bg-white lg:hidden">
            <div className="space-y-4 px-4 py-6">
              <button className="w-full py-2 text-right font-bold text-[#94B49F]">
                تصفح المشاريع
              </button>
              <button className="w-full py-2 text-right font-bold text-[#94B49F]">
                أفضل المواهب
              </button>
              <button className="w-full py-2 text-right font-bold text-[#94B49F]">كيف نعمل</button>
              <button className="w-full py-2 text-right font-bold text-[#94B49F]">التسعير</button>
              <div className="space-y-3 pt-4">
                <button className="w-full rounded-xl border-2 border-[#94B49F] px-6 py-3 font-bold text-[#94B49F]">
                  تسجيل الدخول
                </button>
                <button className="w-full rounded-xl bg-[#94B49F] px-6 py-3 font-bold text-white">
                  ابدأ الآن
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-[#FCF8E8] px-4 pt-32 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left Content */}
            <div>
              <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-[#CEE5D0] px-4 py-2">
                <Sparkles className="h-4 w-4 text-[#94B49F]" />
                <span className="text-sm font-bold text-[#94B49F]">
                  المنصة الأكثر ابتكاراً في 2025
                </span>
              </div>

              <h1 className="mb-6 text-5xl leading-tight font-black text-[#94B49F] sm:text-6xl lg:text-7xl">
                اكتشف المواهب الاستثنائية
              </h1>

              <p className="mb-8 text-xl leading-relaxed text-[#94B49F]">
                انضم إلى 280 ألف محترف وعميل في رحلة نجاح لا تنتهي
              </p>

              <div className="mb-12 flex flex-col gap-4 sm:flex-row">
                <button className="rounded-xl bg-[#94B49F] px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-[#ECB390]">
                  ابدأ كعميل
                </button>
                <button className="rounded-xl border-2 border-[#94B49F] bg-white px-8 py-4 text-lg font-bold text-[#94B49F] transition-colors hover:bg-[#FCF8E8]">
                  ابدأ كمستقل
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-8">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-[#94B49F]" />
                  <span className="font-bold text-[#94B49F]">دفع آمن 100%</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#94B49F]" />
                  <span className="font-bold text-[#94B49F]">بدون عمولات خفية</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-[#ECB390]" />
                  <span className="font-bold text-[#94B49F]">تقييم 4.9/5</span>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="rounded-2xl border-2 border-[#CEE5D0] bg-white p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#94B49F] text-2xl">
                      👨‍💻
                    </div>
                    <h3 className="mb-2 font-bold text-[#94B49F]">مطورون محترفون</h3>
                    <p className="text-sm text-[#94B49F]">23,000+ مطور</p>
                  </div>
                  <div className="rounded-2xl border-2 border-[#CEE5D0] bg-white p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#ECB390] text-2xl">
                      🎨
                    </div>
                    <h3 className="mb-2 font-bold text-[#94B49F]">مصممون مبدعون</h3>
                    <p className="text-sm text-[#94B49F]">18,000+ مصمم</p>
                  </div>
                </div>
                <div className="mt-12 space-y-6">
                  <div className="rounded-2xl border-2 border-[#CEE5D0] bg-white p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#CEE5D0] text-2xl">
                      📊
                    </div>
                    <h3 className="mb-2 font-bold text-[#94B49F]">مسوقون خبراء</h3>
                    <p className="text-sm text-[#94B49F]">15,000+ مسوق</p>
                  </div>
                  <div className="rounded-2xl bg-[#94B49F] p-6 text-white">
                    <div className="mb-2 text-4xl font-black">5.8B</div>
                    <p className="text-sm">ريال قيمة المعاملات</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#94B49F] px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {[
              { label: 'مستقل نشط', value: '280K+', icon: <Users /> },
              { label: 'مشروع منجز', value: '195K+', icon: <CheckCircle /> },
              { label: 'قيمة المعاملات', value: '5.8B ر.س', icon: <TrendingUp /> },
              { label: 'معدل الرضا', value: '98%', icon: <Star /> },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-opacity-20 mb-4 inline-flex rounded-2xl bg-white p-4">
                  {React.cloneElement(stat.icon, { className: 'w-8 h-8 text-white' })}
                </div>
                <h3 className="mb-2 text-4xl font-black text-white">{stat.value}</h3>
                <p className="font-bold text-white">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-5xl font-black text-[#94B49F]">استكشف التخصصات</h2>
            <p className="text-xl text-[#94B49F]">اختر المجال الذي يناسبك من آلاف الفرص المتاحة</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`rounded-2xl border-2 p-8 transition-all ${
                  selectedCategory === category.id
                    ? 'border-[#94B49F] bg-[#94B49F] text-white'
                    : 'border-[#CEE5D0] bg-[#FCF8E8] text-[#94B49F] hover:border-[#94B49F]'
                }`}
              >
                <div
                  className={`mb-4 inline-flex rounded-xl p-4 ${
                    selectedCategory === category.id ? 'bg-opacity-20 bg-white' : 'bg-white'
                  }`}
                >
                  {React.cloneElement(category.icon, { className: 'w-8 h-8' })}
                </div>
                <h3 className="mb-2 text-xl font-black">{category.name}</h3>
                <p className="text-2xl font-black">{category.count}</p>
                <p className="mt-1 text-sm font-bold opacity-80">فرصة متاحة</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="bg-[#FCF8E8] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <h2 className="mb-2 text-5xl font-black text-[#94B49F]">المشاريع المميزة</h2>
              <p className="text-xl text-[#94B49F]">أفضل الفرص من عملاء موثوقين</p>
            </div>

            <div className="flex gap-3">
              <button className="rounded-xl bg-[#94B49F] px-6 py-2.5 font-bold text-white">
                الكل
              </button>
              <button className="rounded-xl bg-white px-6 py-2.5 font-bold text-[#94B49F]">
                الأحدث
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-2xl border-2 border-[#CEE5D0] bg-white p-8 transition-all hover:border-[#94B49F]"
              >
                {/* Badges */}
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  {project.featured && (
                    <span className="rounded-full bg-[#94B49F] px-4 py-1.5 text-xs font-bold text-white">
                      مميز
                    </span>
                  )}
                  {project.urgent && (
                    <span className="rounded-full bg-[#ECB390] px-4 py-1.5 text-xs font-bold text-white">
                      عاجل
                    </span>
                  )}
                  <span className="rounded-full bg-[#CEE5D0] px-4 py-1.5 text-xs font-bold text-[#94B49F]">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mb-4 text-2xl font-black text-[#94B49F]">{project.title}</h3>

                {/* Description */}
                <p className="mb-6 text-[#94B49F]">{project.description}</p>

                {/* Skills */}
                <div className="mb-6 flex flex-wrap items-center gap-2">
                  {project.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="rounded-lg border border-[#CEE5D0] bg-[#FCF8E8] px-3 py-1.5 text-sm font-bold text-[#94B49F]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Client */}
                <div className="mb-6 flex items-center gap-4 rounded-xl bg-[#FCF8E8] p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#94B49F] text-2xl">
                    {project.client.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-[#94B49F]">{project.client.name}</h4>
                      {project.client.verified && <BadgeCheck className="h-4 w-4 text-[#ECB390]" />}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#94B49F]">
                      <Star className="h-4 w-4 text-[#ECB390]" />
                      <span>{project.client.rating}</span>
                      <span>•</span>
                      <span>{project.client.projects} مشروع</span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <div className="rounded-xl bg-[#FCF8E8] p-3 text-center">
                    <p className="text-lg font-black text-[#94B49F]">{project.budget}</p>
                    <p className="text-xs font-bold text-[#94B49F]">ريال</p>
                  </div>
                  <div className="rounded-xl bg-[#FCF8E8] p-3 text-center">
                    <p className="text-lg font-black text-[#ECB390]">{project.duration}</p>
                    <p className="text-xs font-bold text-[#94B49F]">المدة</p>
                  </div>
                  <div className="rounded-xl bg-[#FCF8E8] p-3 text-center">
                    <p className="text-lg font-black text-[#94B49F]">{project.proposals}</p>
                    <p className="text-xs font-bold text-[#94B49F]">عرض</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t-2 border-[#CEE5D0] pt-6">
                  <div className="flex items-center gap-4 text-sm text-[#94B49F]">
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {project.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {project.posted}
                    </span>
                  </div>

                  <button className="rounded-xl bg-[#94B49F] px-6 py-2.5 font-bold text-white transition-colors hover:bg-[#ECB390]">
                    تقديم عرض
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="rounded-xl border-2 border-[#94B49F] bg-white px-12 py-4 text-lg font-bold text-[#94B49F] transition-colors hover:bg-[#FCF8E8]">
              استكشف جميع المشاريع
            </button>
          </div>
        </div>
      </section>

      {/* Top Freelancers */}
      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-5xl font-black text-[#94B49F]">أفضل المحترفين</h2>
            <p className="text-xl text-[#94B49F]">تواصل مع نخبة المواهب الأعلى تقييماً</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {topFreelancers.map((freelancer, index) => (
              <div
                key={index}
                className="rounded-2xl border-2 border-[#CEE5D0] bg-[#FCF8E8] p-6 transition-all hover:border-[#94B49F]"
              >
                {/* Status */}
                <div className="mb-6 flex items-center justify-between">
                  <span className="rounded-full bg-[#ECB390] px-3 py-1 text-xs font-bold text-white">
                    TOP
                  </span>
                  <div
                    className={`h-3 w-3 rounded-full ${freelancer.available ? 'bg-green-500' : 'bg-gray-400'}`}
                  />
                </div>

                {/* Avatar */}
                <div className="relative mb-6">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-[#94B49F] text-4xl">
                    {freelancer.avatar}
                  </div>
                  {freelancer.verified && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform">
                      <div className="rounded-full border-2 border-[#ECB390] bg-white p-1.5">
                        <BadgeCheck className="h-5 w-5 text-[#ECB390]" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="mb-6 text-center">
                  <h3 className="mb-1 text-lg font-black text-[#94B49F]">{freelancer.name}</h3>
                  <p className="mb-1 text-sm font-bold text-[#94B49F]">{freelancer.title}</p>
                  <p className="text-xs text-[#94B49F]">{freelancer.specialty}</p>
                </div>

                {/* Rating */}
                <div className="mb-6 flex items-center justify-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#ECB390] text-[#ECB390]" />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-[#94B49F]">{freelancer.rating}</span>
                  <span className="text-xs text-[#94B49F]">({freelancer.reviews})</span>
                </div>

                {/* Stats */}
                <div className="mb-6 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white p-3 text-center">
                    <p className="text-xl font-black text-[#94B49F]">{freelancer.jobs}</p>
                    <p className="text-xs font-bold text-[#94B49F]">مشروع</p>
                  </div>
                  <div className="rounded-xl bg-white p-3 text-center">
                    <p className="text-xl font-black text-[#ECB390]">{freelancer.rate}</p>
                    <p className="text-xs font-bold text-[#94B49F]">ر.س/ساعة</p>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {freelancer.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="rounded-lg bg-white px-3 py-1 text-xs font-bold text-[#94B49F]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button className="w-full rounded-xl bg-[#94B49F] py-3 font-bold text-white transition-colors hover:bg-[#ECB390]">
                  عرض الملف
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#FCF8E8] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-5xl font-black text-[#94B49F]">لماذا موهبتي؟</h2>
            <p className="text-xl text-[#94B49F]">منصة مصممة لتحقيق النجاح للجميع</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Shield />,
                title: 'أمان مطلق',
                desc: 'حماية كاملة للمدفوعات',
                color: '#94B49F',
              },
              {
                icon: <Zap />,
                title: 'سرعة في التنفيذ',
                desc: 'بدء المشاريع خلال 48 ساعة',
                color: '#ECB390',
              },
              {
                icon: <BadgeCheck />,
                title: 'مواهب معتمدة',
                desc: 'تحقق صارم من جميع المستقلين',
                color: '#CEE5D0',
              },
              {
                icon: <Headphones />,
                title: 'دعم متواصل',
                desc: 'فريق دعم متاح 24/7',
                color: '#94B49F',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="rounded-2xl border-2 border-[#CEE5D0] bg-white p-8 text-center transition-all hover:border-[#94B49F]"
              >
                <div
                  className="mb-6 inline-flex rounded-2xl bg-[#FCF8E8] p-6"
                  style={{ color: feature.color }}
                >
                  {React.cloneElement(feature.icon, { className: 'w-12 h-12' })}
                </div>
                <h3 className="mb-3 text-xl font-black text-[#94B49F]">{feature.title}</h3>
                <p className="text-[#94B49F]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#94B49F] px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-5xl font-black text-white">آراء عملائنا</h2>
          </div>

          <div className="bg-opacity-10 border-opacity-20 rounded-2xl border-2 border-white bg-white p-10 backdrop-blur-sm">
            <div className="mb-8 flex gap-2">
              {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-white text-white" />
              ))}
            </div>

            <p className="mb-8 text-2xl leading-relaxed text-white">
              "{testimonials[currentTestimonial].content}"
            </p>

            <div className="flex items-center gap-4">
              <div className="bg-opacity-20 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl">
                {testimonials[currentTestimonial].avatar}
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">
                  {testimonials[currentTestimonial].author}
                </h4>
                <p className="text-sm text-white opacity-80">
                  {testimonials[currentTestimonial].role}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`rounded-full transition-all ${
                  currentTestimonial === index
                    ? 'h-3 w-12 bg-white'
                    : 'bg-opacity-40 h-3 w-3 bg-white'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white px-4 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex rounded-full bg-[#94B49F] p-8">
            <Rocket className="h-16 w-16 text-white" />
          </div>

          <h2 className="mb-6 text-5xl font-black text-[#94B49F] sm:text-6xl">ابدأ رحلتك الآن</h2>

          <p className="mb-12 text-xl text-[#94B49F]">
            انضم إلى 280 ألف محترف واكتشف عالماً من الفرص اللامحدودة
          </p>

          <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
            <button className="rounded-xl bg-[#94B49F] px-12 py-4 text-lg font-bold text-white transition-colors hover:bg-[#ECB390]">
              ابدأ كعميل
            </button>
            <button className="rounded-xl border-2 border-[#94B49F] bg-white px-12 py-4 text-lg font-bold text-[#94B49F] transition-colors hover:bg-[#FCF8E8]">
              ابدأ كمستقل
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-12">
            {[
              { icon: <CheckCircle />, text: 'تسجيل مجاني' },
              { icon: <Shield />, text: 'ضمان الأمان' },
              { icon: <Headphones />, text: 'دعم مستمر' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 font-bold text-[#94B49F]">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FCF8E8]">
                  {React.cloneElement(item.icon, { className: 'w-5 h-5' })}
                </div>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-[#CEE5D0] bg-[#FCF8E8] px-4 pt-16 pb-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#94B49F]">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-black text-[#94B49F]">موهبتي</h3>
              </div>

              <p className="mb-8 text-[#94B49F]">
                منصتك المثالية للوصول إلى أفضل المواهب وأكثر المشاريع تميزاً
              </p>

              <div className="flex gap-3">
                {[Twitter, Instagram, Linkedin, Facebook].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#CEE5D0] text-[#94B49F] transition-colors hover:bg-[#94B49F] hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {[
              { title: 'عن المنصة', links: ['من نحن', 'كيف نعمل', 'المدونة', 'الوظائف'] },
              { title: 'الخدمات', links: ['للعملاء', 'للمستقلين', 'التسعير', 'الشركات'] },
              { title: 'الدعم', links: ['مركز المساعدة', 'الأسئلة الشائعة', 'اتصل بنا', 'الشروط'] },
            ].map((column, index) => (
              <div key={index}>
                <h4 className="mb-4 text-lg font-black text-[#94B49F]">{column.title}</h4>
                <ul className="space-y-3">
                  {column.links.map((link, i) => (
                    <li key={i}>
                      <a href="#" className="text-[#94B49F] transition-colors hover:text-[#ECB390]">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t-2 border-[#CEE5D0] pt-8 text-center">
            <p className="text-[#94B49F]">© 2025 موهبتي. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ModernFreelancePlatform;
