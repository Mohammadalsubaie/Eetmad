'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Award,
  BadgeCheck,
  Briefcase,
  CheckCircle,
  Clock,
  Code,
  Crown,
  DollarSign,
  Facebook,
  FileText,
  Headphones,
  Instagram,
  Layers,
  Linkedin,
  MapPin,
  Menu,
  Palette,
  Rocket,
  Search,
  Shield,
  Star,
  TrendingUp,
  Twitter,
  Users,
  X,
  Zap,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

function ProfessionalFreelancePlatform() {
  const [scrollY, setScrollY] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('featured');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3);
    }, 6000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const categories = [
    { id: 'all', name: 'جميع التخصصات', icon: <Layers />, count: 52847 },
    { id: 'development', name: 'التطوير والبرمجة', icon: <Code />, count: 23456 },
    { id: 'design', name: 'التصميم والإبداع', icon: <Palette />, count: 18234 },
    { id: 'marketing', name: 'التسويق الرقمي', icon: <TrendingUp />, count: 15678 },
    { id: 'writing', name: 'الكتابة والترجمة', icon: <FileText />, count: 12456 },
    { id: 'business', name: 'الأعمال والإدارة', icon: <Briefcase />, count: 9876 },
  ];

  const projects = [
    {
      id: 1,
      title: 'تطوير نظام إدارة مشاريع متكامل بتقنيات حديثة',
      company: 'شركة التقنية المتقدمة',
      companyLogo: '🏢',
      description:
        'نبحث عن مطور Full Stack محترف لبناء نظام إدارة مشاريع متكامل يتضمن لوحات تحكم تفاعلية، نظام مهام متقدم، وتكامل مع أدوات خارجية',
      budget: { min: 180000, max: 280000 },
      duration: '4-6 أشهر',
      level: 'خبير',
      type: 'مشروع كامل',
      skills: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'TypeScript'],
      proposals: 43,
      postedTime: 'منذ 3 ساعات',
      verified: true,
      featured: true,
      location: 'الرياض، السعودية',
    },
    {
      id: 2,
      title: 'تصميم هوية بصرية كاملة لعلامة تجارية فاخرة',
      company: 'مجموعة الفخامة',
      companyLogo: '💎',
      description:
        'مطلوب مصمم هوية بصرية محترف لإنشاء علامة تجارية فاخرة تشمل الشعار، دليل الهوية، والتطبيقات المختلفة',
      budget: { min: 95000, max: 150000 },
      duration: '2-3 أشهر',
      level: 'متقدم',
      type: 'عقد محدد',
      skills: ['Brand Identity', 'Adobe Illustrator', 'Photoshop', 'InDesign'],
      proposals: 67,
      postedTime: 'منذ 5 ساعات',
      verified: true,
      featured: true,
      location: 'دبي، الإمارات',
    },
    {
      id: 3,
      title: 'إدارة حملة إعلانية شاملة عبر منصات التواصل',
      company: 'وكالة النمو الرقمي',
      companyLogo: '📊',
      description:
        'نحتاج خبير تسويق رقمي لإدارة حملة إعلانية متكاملة تشمل استراتيجية المحتوى، الإعلانات المدفوعة، والتحليلات',
      budget: { min: 120000, max: 200000 },
      duration: '3-5 أشهر',
      level: 'متقدم',
      type: 'عقد شهري',
      skills: ['Google Ads', 'Facebook Ads', 'Analytics', 'SEO', 'Content Strategy'],
      proposals: 54,
      postedTime: 'منذ يوم واحد',
      verified: true,
      featured: false,
      location: 'جدة، السعودية',
    },
    {
      id: 4,
      title: 'كتابة محتوى تقني متخصص لمنصة تعليمية',
      company: 'أكاديمية التعلم الذكي',
      companyLogo: '📚',
      description:
        'مطلوب كاتب محتوى تقني محترف لإنشاء مواد تعليمية عالية الجودة في مجال البرمجة والتقنية',
      budget: { min: 60000, max: 95000 },
      duration: '2-4 أشهر',
      level: 'متوسط',
      type: 'مشروع كامل',
      skills: ['Technical Writing', 'Content Creation', 'SEO', 'Research'],
      proposals: 89,
      postedTime: 'منذ 6 ساعات',
      verified: false,
      featured: false,
      location: 'القاهرة، مصر',
    },
  ];

  const freelancers = [
    {
      id: 1,
      name: 'عمر السالم',
      title: 'مهندس برمجيات أول',
      avatar: '👨‍💻',
      rating: 4.98,
      reviews: 234,
      completedProjects: 567,
      hourlyRate: 850,
      skills: ['React', 'Python', 'AWS', 'Machine Learning'],
      availability: 'متاح للعمل فوراً',
      location: 'الرياض',
      verified: true,
      topRated: true,
      responseTime: '< 1 ساعة',
      bio: 'مهندس برمجيات بخبرة 10 سنوات في تطوير الحلول التقنية المتقدمة',
    },
    {
      id: 2,
      name: 'ليلى محمد',
      title: 'مصممة UI/UX متخصصة',
      avatar: '👩‍🎨',
      rating: 5.0,
      reviews: 187,
      completedProjects: 423,
      hourlyRate: 720,
      skills: ['Figma', 'UI Design', 'UX Research', 'Prototyping'],
      availability: 'متاح جزئياً',
      location: 'دبي',
      verified: true,
      topRated: true,
      responseTime: '< 30 دقيقة',
      bio: 'مصممة متخصصة في خلق تجارب مستخدم استثنائية ومبتكرة',
    },
    {
      id: 3,
      name: 'خالد العتيبي',
      title: 'استراتيجي تسويق رقمي',
      avatar: '📈',
      rating: 4.95,
      reviews: 156,
      completedProjects: 389,
      hourlyRate: 680,
      skills: ['Digital Strategy', 'Analytics', 'Growth Marketing'],
      availability: 'متاح للعمل فوراً',
      location: 'الكويت',
      verified: true,
      topRated: true,
      responseTime: '< 2 ساعة',
      bio: 'خبير في بناء استراتيجيات النمو الرقمي وتحقيق نتائج ملموسة',
    },
    {
      id: 4,
      name: 'سارة الأحمد',
      title: 'كاتبة محتوى إبداعية',
      avatar: '✍️',
      rating: 4.92,
      reviews: 203,
      completedProjects: 612,
      hourlyRate: 550,
      skills: ['Copywriting', 'SEO Content', 'Creative Writing'],
      availability: 'متاح للعمل فوراً',
      location: 'بيروت',
      verified: true,
      topRated: false,
      responseTime: '< 3 ساعات',
      bio: 'كاتبة محترفة متخصصة في صناعة المحتوى المؤثر والجذاب',
    },
  ];

  const testimonials = [
    {
      quote:
        'المنصة غيرت طريقة عملنا بالكامل. وجدنا أفضل المواهب التقنية في وقت قياسي والنتائج تجاوزت كل توقعاتنا. احترافية عالية وجودة استثنائية',
      author: 'أحمد الراشد',
      position: 'المدير التنفيذي',
      company: 'شركة الابتكار التقني',
      rating: 5,
    },
    {
      quote:
        'كمستقلة، هذه المنصة فتحت لي آفاقاً جديدة. المشاريع متنوعة ومثيرة، والعملاء محترفون وملتزمون. بيئة عمل مثالية للمحترفين',
      author: 'نورة العنزي',
      position: 'مصممة UI/UX',
      company: 'مستقلة',
      rating: 5,
    },
    {
      quote:
        'أفضل استثمار قمنا به هو التعاقد عبر هذه المنصة. الجودة والاحترافية والالتزام بالمواعيد كانت استثنائية. نوصي بها بشدة',
      author: 'فيصل المطيري',
      position: 'مدير العمليات',
      company: 'مجموعة النجاح',
      rating: 5,
    },
  ];

  const stats = [
    { value: '280K+', label: 'محترف نشط', icon: <Users /> },
    { value: '195K+', label: 'مشروع مكتمل', icon: <CheckCircle /> },
    { value: '5.8B', label: 'قيمة المعاملات', unit: 'ر.س', icon: <DollarSign /> },
    { value: '98.5%', label: 'معدل الرضا', icon: <Star /> },
  ];

  return (
    <div className="min-h-screen bg-[#DCD7C9]">
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrollY > 50 ? 'bg-[#2C3930] shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#A27B5C]">
                <Layers className="h-6 w-6 text-[#DCD7C9]" />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight text-[#DCD7C9]">MAWHIBATI</h1>
                <p className="text-xs font-semibold text-[#A27B5C]">Professional Network</p>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-8 lg:flex">
              <button className="font-semibold text-[#DCD7C9] transition-colors hover:text-[#A27B5C]">
                استكشف المشاريع
              </button>
              <button className="font-semibold text-[#DCD7C9] transition-colors hover:text-[#A27B5C]">
                المحترفون
              </button>
              <button className="font-semibold text-[#DCD7C9] transition-colors hover:text-[#A27B5C]">
                من نحن
              </button>
              <button className="font-semibold text-[#DCD7C9] transition-colors hover:text-[#A27B5C]">
                الأسعار
              </button>
            </nav>

            {/* Auth Buttons */}
            <div className="hidden items-center gap-4 lg:flex">
              <button className="px-6 py-2.5 font-semibold text-[#DCD7C9] transition-colors hover:text-[#A27B5C]">
                تسجيل الدخول
              </button>
              <button className="rounded-lg bg-[#A27B5C] px-6 py-2.5 font-bold text-[#2C3930] transition-all hover:bg-[#3F4F44] hover:text-[#DCD7C9]">
                ابدأ الآن
              </button>
            </div>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-[#DCD7C9] lg:hidden"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-[#A27B5C]/20 bg-[#3F4F44] lg:hidden"
            >
              <div className="space-y-4 px-4 py-6">
                <button className="w-full py-2 text-right font-semibold text-[#DCD7C9]">
                  استكشف المشاريع
                </button>
                <button className="w-full py-2 text-right font-semibold text-[#DCD7C9]">
                  المحترفون
                </button>
                <button className="w-full py-2 text-right font-semibold text-[#DCD7C9]">
                  من نحن
                </button>
                <button className="w-full py-2 text-right font-semibold text-[#DCD7C9]">
                  الأسعار
                </button>
                <div className="space-y-3 border-t border-[#A27B5C]/20 pt-4">
                  <button className="w-full rounded-lg border-2 border-[#A27B5C] px-6 py-3 font-semibold text-[#DCD7C9]">
                    تسجيل الدخول
                  </button>
                  <button className="w-full rounded-lg bg-[#A27B5C] px-6 py-3 font-bold text-[#2C3930]">
                    ابدأ الآن
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="bg-[#2C3930] px-4 pt-32 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left Content */}
            <div>
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#A27B5C]/30 bg-[#3F4F44] px-4 py-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-[#A27B5C]" />
                <span className="text-sm font-semibold text-[#DCD7C9]">
                  منصة العمل الحر الاحترافية
                </span>
              </div>

              <h1 className="mb-8 text-5xl leading-tight font-black sm:text-6xl lg:text-7xl">
                <span className="text-[#DCD7C9]">احصل على</span>
                <br />
                <span className="text-[#A27B5C]">أفضل المواهب</span>
                <br />
                <span className="text-[#DCD7C9]">للمشاريع الكبرى</span>
              </h1>

              <p className="mb-10 max-w-xl text-xl leading-relaxed text-[#DCD7C9]/80">
                منصة احترافية تربط بين الشركات والمحترفين المستقلين لتنفيذ مشاريع استثنائية بأعلى
                معايير الجودة
              </p>

              {/* Search Bar */}
              <div className="mb-10 rounded-xl border border-[#A27B5C]/20 bg-[#3F4F44] p-2">
                <div className="flex items-center gap-3">
                  <div className="flex flex-1 items-center gap-3 px-4">
                    <Search className="h-5 w-5 text-[#A27B5C]" />
                    <input
                      type="text"
                      placeholder="ابحث عن مشاريع، مهارات، أو محترفين..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-transparent font-medium text-[#DCD7C9] placeholder-[#DCD7C9]/50 outline-none"
                    />
                  </div>
                  <button className="rounded-lg bg-[#A27B5C] px-8 py-3 font-bold text-[#2C3930] transition-colors hover:bg-[#DCD7C9]">
                    بحث
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <Shield className="mx-auto mb-2 h-8 w-8 text-[#A27B5C]" />
                  <p className="text-sm font-semibold text-[#DCD7C9]">دفع آمن</p>
                </div>
                <div className="text-center">
                  <CheckCircle className="mx-auto mb-2 h-8 w-8 text-[#A27B5C]" />
                  <p className="text-sm font-semibold text-[#DCD7C9]">جودة مضمونة</p>
                </div>
                <div className="text-center">
                  <Headphones className="mx-auto mb-2 h-8 w-8 text-[#A27B5C]" />
                  <p className="text-sm font-semibold text-[#DCD7C9]">دعم 24/7</p>
                </div>
              </div>
            </div>

            {/* Right Content - Stats Cards */}
            <div className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-2xl border border-[#A27B5C]/20 bg-[#3F4F44] p-8"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#A27B5C]/20">
                        {React.cloneElement(stat.icon, { className: 'w-6 h-6 text-[#A27B5C]' })}
                      </div>
                    </div>
                    <div className="mb-2 text-4xl font-black text-[#DCD7C9]">
                      {stat.value}
                      {stat.unit && <span className="text-2xl text-[#A27B5C]"> {stat.unit}</span>}
                    </div>
                    <p className="font-semibold text-[#DCD7C9]/70">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-[#DCD7C9] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-black text-[#2C3930]">تصفح حسب التخصص</h2>
            <p className="text-lg text-[#3F4F44]">
              اختر المجال المناسب لمشروعك من بين آلاف الفرص المتاحة
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-xl p-6 text-right transition-all ${
                  activeCategory === category.id
                    ? 'border-2 border-[#A27B5C] bg-[#2C3930] text-[#DCD7C9]'
                    : 'border-2 border-transparent bg-white text-[#2C3930] hover:border-[#A27B5C]'
                }`}
              >
                <div className="mb-4 flex items-start justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                      activeCategory === category.id ? 'bg-[#A27B5C]' : 'bg-[#DCD7C9]'
                    }`}
                  >
                    {React.cloneElement(category.icon, {
                      className: `w-6 h-6 ${activeCategory === category.id ? 'text-[#2C3930]' : 'text-[#3F4F44]'}`,
                    })}
                  </div>
                </div>
                <h3 className="mb-2 text-lg font-bold">{category.name}</h3>
                <p className="text-2xl font-black text-[#A27B5C]">
                  {category.count.toLocaleString()}
                </p>
                <p
                  className={`mt-1 text-sm font-semibold ${
                    activeCategory === category.id ? 'text-[#DCD7C9]/70' : 'text-[#3F4F44]/70'
                  }`}
                >
                  فرصة متاحة
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <h2 className="mb-2 text-4xl font-black text-[#2C3930]">المشاريع المميزة</h2>
              <p className="text-lg text-[#3F4F44]">فرص استثنائية من شركات رائدة</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedTab('featured')}
                className={`rounded-lg px-6 py-2.5 font-semibold transition-all ${
                  selectedTab === 'featured'
                    ? 'bg-[#2C3930] text-[#DCD7C9]'
                    : 'bg-[#DCD7C9] text-[#2C3930] hover:bg-[#3F4F44] hover:text-[#DCD7C9]'
                }`}
              >
                مميزة
              </button>
              <button
                onClick={() => setSelectedTab('recent')}
                className={`rounded-lg px-6 py-2.5 font-semibold transition-all ${
                  selectedTab === 'recent'
                    ? 'bg-[#2C3930] text-[#DCD7C9]'
                    : 'bg-[#DCD7C9] text-[#2C3930] hover:bg-[#3F4F44] hover:text-[#DCD7C9]'
                }`}
              >
                الأحدث
              </button>
              <button
                onClick={() => setSelectedTab('highest')}
                className={`rounded-lg px-6 py-2.5 font-semibold transition-all ${
                  selectedTab === 'highest'
                    ? 'bg-[#2C3930] text-[#DCD7C9]'
                    : 'bg-[#DCD7C9] text-[#2C3930] hover:bg-[#3F4F44] hover:text-[#DCD7C9]'
                }`}
              >
                الأعلى قيمة
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border-2 border-transparent bg-[#DCD7C9] p-8 transition-all hover:border-[#A27B5C]"
              >
                {/* Header */}
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#2C3930] text-2xl">
                      {project.companyLogo}
                    </div>
                    <div>
                      <h3 className="flex items-center gap-2 font-bold text-[#2C3930]">
                        {project.company}
                        {project.verified && <BadgeCheck className="h-4 w-4 text-[#A27B5C]" />}
                      </h3>
                      <p className="text-sm text-[#3F4F44]">{project.location}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {project.featured && (
                      <span className="rounded-full bg-[#A27B5C] px-3 py-1 text-xs font-bold text-[#DCD7C9]">
                        مميز
                      </span>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h4 className="mb-4 text-xl leading-tight font-black text-[#2C3930]">
                  {project.title}
                </h4>

                {/* Description */}
                <p className="mb-6 leading-relaxed text-[#3F4F44]">{project.description}</p>

                {/* Skills */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {project.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="rounded-lg border border-[#3F4F44]/20 bg-white px-3 py-1.5 text-sm font-semibold text-[#2C3930]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Meta Info */}
                <div className="mb-6 grid grid-cols-3 gap-4 rounded-xl bg-white p-4">
                  <div className="text-center">
                    <p className="mb-1 text-sm font-semibold text-[#3F4F44]">الميزانية</p>
                    <p className="text-lg font-black text-[#2C3930]">
                      {project.budget.min.toLocaleString()}-{project.budget.max.toLocaleString()}
                    </p>
                    <p className="text-xs font-bold text-[#A27B5C]">ريال</p>
                  </div>
                  <div className="border-x border-[#DCD7C9] text-center">
                    <p className="mb-1 text-sm font-semibold text-[#3F4F44]">المدة</p>
                    <p className="text-lg font-black text-[#2C3930]">{project.duration}</p>
                  </div>
                  <div className="text-center">
                    <p className="mb-1 text-sm font-semibold text-[#3F4F44]">المستوى</p>
                    <p className="text-lg font-black text-[#2C3930]">{project.level}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t-2 border-[#3F4F44]/20 pt-6">
                  <div className="flex items-center gap-4 text-sm text-[#3F4F44]">
                    <span className="flex items-center gap-1 font-semibold">
                      <Users className="h-4 w-4" />
                      {project.proposals} عرض
                    </span>
                    <span className="flex items-center gap-1 font-semibold">
                      <Clock className="h-4 w-4" />
                      {project.postedTime}
                    </span>
                  </div>

                  <button className="rounded-lg bg-[#2C3930] px-6 py-2.5 font-bold text-[#DCD7C9] transition-all hover:bg-[#A27B5C] hover:text-[#2C3930]">
                    تقديم عرض
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="rounded-xl bg-[#2C3930] px-12 py-4 text-lg font-bold text-[#DCD7C9] transition-all hover:bg-[#3F4F44]">
              عرض جميع المشاريع
            </button>
          </div>
        </div>
      </section>

      {/* Top Freelancers */}
      <section className="bg-[#DCD7C9] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-black text-[#2C3930]">المحترفون الأعلى تقييماً</h2>
            <p className="text-lg text-[#3F4F44]">تواصل مع نخبة المستقلين المحترفين</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {freelancers.map((freelancer) => (
              <motion.div
                key={freelancer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border-2 border-transparent bg-white p-6 transition-all hover:border-[#A27B5C]"
              >
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                  {freelancer.topRated && (
                    <span className="flex items-center gap-1 rounded-full bg-[#A27B5C] px-3 py-1 text-xs font-bold text-[#DCD7C9]">
                      <Crown className="h-3 w-3" />
                      TOP
                    </span>
                  )}
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                </div>

                {/* Avatar */}
                <div className="relative mb-6">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-[#2C3930] text-4xl">
                    {freelancer.avatar}
                  </div>
                  {freelancer.verified && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform">
                      <div className="rounded-full border-2 border-[#A27B5C] bg-white p-1.5">
                        <BadgeCheck className="h-5 w-5 text-[#A27B5C]" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="mb-6 text-center">
                  <h3 className="mb-1 text-lg font-black text-[#2C3930]">{freelancer.name}</h3>
                  <p className="mb-2 text-sm font-semibold text-[#3F4F44]">{freelancer.title}</p>
                  <p className="mb-3 text-xs text-[#3F4F44]/70">{freelancer.bio}</p>
                  <div className="mb-2 flex items-center justify-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[#A27B5C] text-[#A27B5C]" />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-[#2C3930]">{freelancer.rating}</span>
                    <span className="text-xs text-[#3F4F44]">({freelancer.reviews})</span>
                  </div>
                  <p className="flex items-center justify-center gap-1 text-xs font-semibold text-[#3F4F44]">
                    <MapPin className="h-3 w-3" />
                    {freelancer.location}
                  </p>
                </div>

                {/* Stats */}
                <div className="mb-6 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-[#DCD7C9] p-3 text-center">
                    <p className="text-xl font-black text-[#2C3930]">
                      {freelancer.completedProjects}
                    </p>
                    <p className="text-xs font-semibold text-[#3F4F44]">مشروع</p>
                  </div>
                  <div className="rounded-xl bg-[#DCD7C9] p-3 text-center">
                    <p className="text-xl font-black text-[#A27B5C]">{freelancer.hourlyRate}</p>
                    <p className="text-xs font-semibold text-[#3F4F44]">ر.س/ساعة</p>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {freelancer.skills.slice(0, 3).map((skill, i) => (
                    <span
                      key={i}
                      className="rounded-lg bg-[#DCD7C9] px-3 py-1 text-xs font-semibold text-[#2C3930]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Availability */}
                <div className="mb-6 rounded-lg bg-[#DCD7C9] p-3 text-center">
                  <p className="text-xs font-bold text-[#2C3930]">{freelancer.availability}</p>
                  <p className="text-xs font-semibold text-[#3F4F44]">
                    وقت الاستجابة: {freelancer.responseTime}
                  </p>
                </div>

                {/* CTA */}
                <button className="w-full rounded-lg bg-[#2C3930] py-3 font-bold text-[#DCD7C9] transition-all hover:bg-[#A27B5C] hover:text-[#2C3930]">
                  عرض الملف الشخصي
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-black text-[#2C3930]">لماذا تختار منصتنا؟</h2>
            <p className="text-lg text-[#3F4F44]">مزايا احترافية تضمن نجاح مشاريعك</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Shield />,
                title: 'دفع آمن ومضمون',
                description: 'نظام دفع محمي بالكامل مع ضمان استرداد الأموال',
              },
              {
                icon: <Zap />,
                title: 'سرعة في التنفيذ',
                description: 'ابدأ مشروعك خلال 48 ساعة مع أفضل المحترفين',
              },
              {
                icon: <Award />,
                title: 'جودة معتمدة',
                description: 'جميع المحترفين خضعوا لاختبارات صارمة',
              },
              {
                icon: <Headphones />,
                title: 'دعم فني متواصل',
                description: 'فريق دعم محترف متاح على مدار الساعة',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl bg-[#DCD7C9] p-8 text-center"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-[#2C3930]">
                  {React.cloneElement(feature.icon, { className: 'w-8 h-8 text-[#A27B5C]' })}
                </div>
                <h3 className="mb-3 text-xl font-black text-[#2C3930]">{feature.title}</h3>
                <p className="text-[#3F4F44]">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#2C3930] px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-black text-[#DCD7C9]">ماذا يقول عملاؤنا</h2>
          </div>

          <div className="rounded-2xl border-2 border-[#A27B5C]/30 bg-[#3F4F44] p-10">
            <div className="mb-6 flex gap-2">
              {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-[#A27B5C] text-[#A27B5C]" />
              ))}
            </div>

            <p className="mb-8 text-2xl leading-relaxed font-medium text-[#DCD7C9]">
              "{testimonials[currentTestimonial].quote}"
            </p>

            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#A27B5C] text-2xl">
                {testimonials[currentTestimonial].author.charAt(0)}
              </div>
              <div>
                <h4 className="text-xl font-bold text-[#DCD7C9]">
                  {testimonials[currentTestimonial].author}
                </h4>
                <p className="text-sm font-semibold text-[#DCD7C9]/70">
                  {testimonials[currentTestimonial].position} -{' '}
                  {testimonials[currentTestimonial].company}
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
                  currentTestimonial === index ? 'h-3 w-12 bg-[#A27B5C]' : 'h-3 w-3 bg-[#A27B5C]/40'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#DCD7C9] px-4 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#A27B5C]">
            <Rocket className="h-10 w-10 text-[#DCD7C9]" />
          </div>

          <h2 className="mb-6 text-5xl font-black text-[#2C3930]">ابدأ مشروعك القادم اليوم</h2>

          <p className="mx-auto mb-12 max-w-2xl text-xl text-[#3F4F44]">
            انضم إلى 280 ألف محترف وشركة رائدة في تحقيق النجاح الرقمي
          </p>

          <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
            <button className="rounded-xl bg-[#2C3930] px-12 py-4 text-lg font-bold text-[#DCD7C9] transition-all hover:bg-[#3F4F44]">
              أنشئ مشروعك الآن
            </button>
            <button className="rounded-xl border-2 border-[#2C3930] bg-white px-12 py-4 text-lg font-bold text-[#2C3930] transition-all hover:bg-[#2C3930] hover:text-[#DCD7C9]">
              انضم كمحترف
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-12">
            <div className="flex items-center gap-2 font-semibold text-[#3F4F44]">
              <CheckCircle className="h-5 w-5 text-[#A27B5C]" />
              <span>تسجيل مجاني</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-[#3F4F44]">
              <Shield className="h-5 w-5 text-[#A27B5C]" />
              <span>دفع آمن</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-[#3F4F44]">
              <Star className="h-5 w-5 text-[#A27B5C]" />
              <span>جودة مضمونة</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2C3930] px-4 pt-16 pb-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#A27B5C]">
                  <Layers className="h-6 w-6 text-[#DCD7C9]" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#DCD7C9]">MAWHIBATI</h3>
                  <p className="text-xs font-semibold text-[#A27B5C]">Professional Network</p>
                </div>
              </div>

              <p className="mb-8 leading-relaxed text-[#DCD7C9]/70">
                منصة احترافية تربط الشركات بأفضل المستقلين لتحقيق نجاح استثنائي
              </p>

              <div className="flex gap-3">
                {[Twitter, Instagram, Linkedin, Facebook].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3F4F44] text-[#DCD7C9] transition-all hover:bg-[#A27B5C]"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {[
              { title: 'الشركة', links: ['من نحن', 'كيف نعمل', 'المدونة', 'الوظائف'] },
              { title: 'الخدمات', links: ['للشركات', 'للمستقلين', 'الأسعار', 'الشراكات'] },
              { title: 'الدعم', links: ['المساعدة', 'الأسئلة الشائعة', 'اتصل بنا', 'الشروط'] },
            ].map((column, index) => (
              <div key={index}>
                <h4 className="mb-6 text-lg font-bold text-[#DCD7C9]">{column.title}</h4>
                <ul className="space-y-4">
                  {column.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="font-medium text-[#DCD7C9]/70 transition-colors hover:text-[#A27B5C]"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-[#3F4F44] pt-8 text-center">
            <p className="font-medium text-[#DCD7C9]/70">© 2025 MAWHIBATI. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ProfessionalFreelancePlatform;
