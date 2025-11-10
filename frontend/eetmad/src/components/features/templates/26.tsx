import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Clock,
  Code,
  Eye,
  Facebook,
  FileText,
  Instagram,
  Layers,
  Linkedin,
  MapPin,
  Megaphone,
  Menu,
  Palette,
  Rocket,
  Search,
  Star,
  Twitter,
  Users,
  Video,
  Wallet,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

function MinimalistFreelancePlatform() {
  const [scrollY, setScrollY] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { id: 1, name: 'تطوير البرمجيات', icon: <Code />, count: 12450, tag: 'dev' },
    { id: 2, name: 'التصميم الإبداعي', icon: <Palette />, count: 8720, tag: 'design' },
    { id: 3, name: 'كتابة المحتوى', icon: <FileText />, count: 6890, tag: 'content' },
    { id: 4, name: 'التسويق الرقمي', icon: <Megaphone />, count: 9540, tag: 'marketing' },
    { id: 5, name: 'إنتاج الفيديو', icon: <Video />, count: 4320, tag: 'video' },
    { id: 6, name: 'استشارات الأعمال', icon: <Briefcase />, count: 5670, tag: 'business' },
  ];

  const projects = [
    {
      id: 1,
      title: 'تطوير نظام إدارة متكامل للمؤسسات',
      client: 'شركة التقنية المتقدمة',
      verified: true,
      budget: { min: 95000, max: 150000, type: 'fixed' },
      duration: '4-6 أشهر',
      level: 'Expert',
      category: 'تطوير',
      tags: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
      proposals: 18,
      posted: '3 ساعات',
      views: 247,
      saves: 42,
      urgent: true,
      featured: true,
    },
    {
      id: 2,
      title: 'حملة تسويقية شاملة عبر منصات التواصل',
      client: 'مجموعة التسويق الرقمي',
      verified: true,
      budget: { min: 180, max: 280, type: 'hourly' },
      duration: '3 أشهر',
      level: 'Intermediate',
      category: 'تسويق',
      tags: ['Social Media', 'Google Ads', 'Analytics', 'SEO'],
      proposals: 56,
      posted: '1 يوم',
      views: 892,
      saves: 123,
      urgent: false,
      featured: false,
    },
    {
      id: 3,
      title: 'تصميم هوية بصرية متكاملة لشركة ناشئة',
      client: 'استوديو الإبداع',
      verified: false,
      budget: { min: 35000, max: 55000, type: 'fixed' },
      duration: '6-8 أسابيع',
      level: 'Expert',
      category: 'تصميم',
      tags: ['Branding', 'Logo', 'UI/UX', 'Illustration'],
      proposals: 73,
      posted: '5 ساعات',
      views: 534,
      saves: 89,
      urgent: true,
      featured: true,
    },
    {
      id: 4,
      title: 'كتابة محتوى تقني متخصص للمدونة',
      client: 'منصة المحتوى التقني',
      verified: true,
      budget: { min: 120, max: 200, type: 'hourly' },
      duration: '2-3 أشهر',
      level: 'Intermediate',
      category: 'كتابة',
      tags: ['Technical Writing', 'SEO', 'Research'],
      proposals: 94,
      posted: '2 أيام',
      views: 678,
      saves: 156,
      urgent: false,
      featured: false,
    },
    {
      id: 5,
      title: 'إنتاج فيديوهات ترويجية احترافية',
      client: 'وكالة الإنتاج الإبداعي',
      verified: true,
      budget: { min: 45000, max: 75000, type: 'fixed' },
      duration: '4-5 أسابيع',
      level: 'Expert',
      category: 'فيديو',
      tags: ['Video Editing', 'Motion Graphics', 'After Effects'],
      proposals: 34,
      posted: '12 ساعة',
      views: 421,
      saves: 67,
      urgent: true,
      featured: true,
    },
    {
      id: 6,
      title: 'استشارات استراتيجية للنمو والتوسع',
      client: 'شركة الاستشارات الإدارية',
      verified: true,
      budget: { min: 250, max: 400, type: 'hourly' },
      duration: '6 أشهر',
      level: 'Expert',
      category: 'استشارات',
      tags: ['Strategy', 'Business Planning', 'Analytics'],
      proposals: 27,
      posted: '1 يوم',
      views: 312,
      saves: 54,
      urgent: false,
      featured: false,
    },
  ];

  const talents = [
    {
      id: 1,
      name: 'أحمد المهندس',
      title: 'مطور Full Stack',
      avatar: '🧑‍💻',
      rating: 4.95,
      reviews: 342,
      rate: 750,
      completed: 456,
      skills: ['React', 'Node.js', 'Python', 'AWS'],
      availability: 'available',
      location: 'الرياض',
      responseTime: '15 دقيقة',
      badge: 'Top Rated',
    },
    {
      id: 2,
      name: 'سارة الفنانة',
      title: 'مصممة UI/UX',
      avatar: '👩‍🎨',
      rating: 5.0,
      reviews: 289,
      rate: 680,
      completed: 523,
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
      availability: 'available',
      location: 'دبي',
      responseTime: '20 دقيقة',
      badge: 'Top Rated Plus',
    },
    {
      id: 3,
      name: 'خالد المسوق',
      title: 'خبير تسويق رقمي',
      avatar: '📊',
      rating: 4.9,
      reviews: 267,
      rate: 590,
      completed: 398,
      skills: ['SEO', 'SEM', 'Social Media', 'Analytics'],
      availability: 'busy',
      location: 'جدة',
      responseTime: '1 ساعة',
      badge: 'Top Rated',
    },
    {
      id: 4,
      name: 'ليلى الكاتبة',
      title: 'كاتبة محتوى',
      avatar: '✍️',
      rating: 4.85,
      reviews: 198,
      rate: 380,
      completed: 312,
      skills: ['Copywriting', 'SEO Writing', 'Translation'],
      availability: 'available',
      location: 'القاهرة',
      responseTime: '30 دقيقة',
      badge: 'Rising Talent',
    },
  ];

  const stats = [
    { label: 'مشروع نشط', value: '342K+', icon: <Layers />, trend: '+34%' },
    { label: 'محترف موثوق', value: '156K+', icon: <Users />, trend: '+28%' },
    { label: 'مدفوعات', value: '$42M', icon: <Wallet />, trend: '+52%' },
    { label: 'تقييم', value: '4.8/5', icon: <Star />, trend: '+0.3' },
  ];

  return (
    <div className="min-h-screen bg-[#EEEEEE]">
      {/* Ultra Minimal Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          scrollY > 50 ? 'bg-white/80 shadow-lg backdrop-blur-2xl' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-[1600px] px-8 lg:px-16">
          <div className="flex h-20 items-center justify-between">
            {/* Minimalist Logo */}
            <div className="group flex cursor-pointer items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-[#777C6D] transition-all duration-500 group-hover:rounded-xl">
                <div className="h-6 w-6 rounded-sm border-2 border-white"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-light tracking-tight text-[#777C6D]">FREELANCE</span>
                <span className="text-[10px] font-bold tracking-[0.25em] text-[#B7B89F] uppercase">
                  MARKETPLACE
                </span>
              </div>
            </div>

            {/* Minimal Menu */}
            <div className="hidden items-center gap-1 lg:flex">
              {['استكشف', 'مشاريع', 'محترفون', 'وظائف', 'موارد'].map((item, i) => (
                <button
                  key={i}
                  className="group relative px-6 py-3 text-sm font-normal text-[#777C6D] transition-colors hover:text-[#B7B89F]"
                >
                  <span>{item}</span>
                  <div className="absolute right-0 bottom-0 left-0 h-0.5 origin-left scale-x-0 bg-[#777C6D] transition-transform group-hover:scale-x-100"></div>
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button className="hidden rounded-sm px-6 py-3 font-normal text-[#777C6D] transition-all hover:bg-[#CBCBCB]/30 sm:block">
                دخول
              </button>
              <button className="rounded-sm bg-[#777C6D] px-8 py-3 font-normal text-white transition-all hover:bg-[#B7B89F]">
                ابدأ
              </button>
              <button className="p-3 text-[#777C6D] lg:hidden">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero - Brutalist Minimal */}
      <section className="relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(#777C6D 1px, transparent 1px),
              linear-gradient(90deg, #777C6D 1px, transparent 1px)
            `,
              backgroundSize: '50px 50px',
            }}
          ></div>
        </div>

        <div className="relative mx-auto max-w-[1600px] px-8 lg:px-16">
          <div className="grid items-center gap-20 lg:grid-cols-2">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Status Line */}
              <div className="mb-12 flex items-center gap-4">
                <div className="h-2 w-2 animate-pulse rounded-full bg-[#777C6D]"></div>
                <span className="text-sm font-normal tracking-wide text-[#B7B89F]">
                  156,000+ محترف متصل الآن
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="mb-12 text-7xl leading-[0.9] font-extralight text-[#777C6D] sm:text-8xl lg:text-9xl">
                العمل
                <br />
                <span className="font-light">الحر</span>
                <br />
                <span className="font-normal italic">المستقبلي</span>
              </h1>

              {/* Description */}
              <p className="mb-16 max-w-xl text-xl leading-relaxed font-light text-[#B7B89F] sm:text-2xl">
                منصة حديثة تربط أفضل المواهب بأهم الفرص. بسيطة، فعّالة، وموثوقة.
              </p>

              {/* Minimal Search */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="group relative"
              >
                <div
                  className={`relative flex items-stretch border-2 transition-all duration-500 ${
                    isSearchFocused
                      ? 'border-[#777C6D] bg-white shadow-2xl'
                      : 'border-[#CBCBCB] bg-white hover:border-[#B7B89F]'
                  }`}
                >
                  <div className="flex flex-1 items-center gap-4 px-8 py-6">
                    <Search className="h-6 w-6 text-[#B7B89F]" strokeWidth={1.5} />
                    <input
                      type="text"
                      placeholder="ابحث عن مشاريع، مهارات، أو محترفين..."
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                      className="w-full bg-transparent text-lg font-light text-[#777C6D] placeholder-[#CBCBCB] outline-none"
                    />
                  </div>

                  <button className="bg-[#777C6D] px-10 font-normal text-white transition-all hover:bg-[#B7B89F]">
                    بحث
                  </button>
                </div>

                {/* Quick Filters */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="text-sm font-light text-[#B7B89F]">شائع:</span>
                  {['React', 'UI/UX', 'AI', 'Mobile'].map((tag, i) => (
                    <button
                      key={i}
                      className="border border-[#CBCBCB] px-4 py-2 text-sm font-light text-[#777C6D] transition-all hover:border-[#777C6D] hover:bg-[#777C6D] hover:text-white"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right - Geometric Cards */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden lg:block"
            >
              {/* Main Card Stack */}
              <div className="relative">
                {/* Card 1 */}
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, -1, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute top-0 right-0 h-[280px] w-[400px] border-2 border-[#CBCBCB] bg-white p-8 shadow-xl"
                >
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center bg-[#777C6D]">
                      <Code className="h-6 w-6 text-white" strokeWidth={1.5} />
                    </div>
                    <div className="bg-[#777C6D] px-3 py-1 text-xs font-normal text-white">
                      URGENT
                    </div>
                  </div>

                  <h3 className="mb-4 text-2xl leading-tight font-light text-[#777C6D]">
                    تطوير تطبيق ويب متقدم
                  </h3>

                  <p className="mb-6 text-sm leading-relaxed font-light text-[#B7B89F]">
                    نبحث عن مطور محترف لبناء منصة SaaS شاملة...
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-light text-[#777C6D]">95K</p>
                      <p className="text-xs font-light tracking-wider text-[#B7B89F] uppercase">
                        ريال سعودي
                      </p>
                    </div>

                    <div className="flex gap-2">
                      {['React', 'Node'].map((skill, i) => (
                        <span
                          key={i}
                          className="bg-[#EEEEEE] px-3 py-1 text-xs font-light text-[#777C6D]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Card 2 - Behind */}
                <motion.div
                  animate={{
                    y: [0, 8, 0],
                    rotate: [0, 1, 0],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute top-12 right-12 h-[280px] w-[400px] border-2 border-[#B7B89F] bg-[#CBCBCB]"
                ></motion.div>

                {/* Card 3 - Behind */}
                <motion.div
                  animate={{
                    y: [0, -4, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute top-24 right-24 h-[280px] w-[400px] border-2 border-[#CBCBCB] bg-[#EEEEEE]"
                ></motion.div>
              </div>

              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-8 -left-8 w-48 bg-[#777C6D] p-6 text-white"
              >
                <p className="mb-2 text-5xl font-light">342K+</p>
                <p className="text-xs font-normal tracking-widest uppercase">مشروع نشط</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute -top-8 -left-16 w-48 border-2 border-[#777C6D] bg-white p-6"
              >
                <div className="mb-2 flex items-center gap-2">
                  <Star className="h-5 w-5 fill-[#777C6D] text-[#777C6D]" />
                  <p className="text-4xl font-light text-[#777C6D]">4.9</p>
                </div>
                <p className="text-xs font-normal tracking-widest text-[#B7B89F] uppercase">
                  تقييم العملاء
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar - Minimal */}
      <section className="border-y-2 border-[#CBCBCB] bg-white py-16">
        <div className="mx-auto max-w-[1600px] px-8 lg:px-16">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group text-center lg:text-left"
              >
                <div className="mb-4 flex items-center justify-center gap-4 lg:justify-start">
                  <div className="flex h-10 w-10 items-center justify-center border-2 border-[#CBCBCB] transition-colors group-hover:border-[#777C6D]">
                    {React.cloneElement(stat.icon, {
                      className:
                        'w-5 h-5 text-[#B7B89F] group-hover:text-[#777C6D] transition-colors',
                      strokeWidth: 1.5,
                    })}
                  </div>
                  <div className="bg-[#EEEEEE] px-3 py-1 text-xs font-light text-[#777C6D]">
                    {stat.trend}
                  </div>
                </div>
                <p className="mb-3 text-5xl font-extralight text-[#777C6D] lg:text-6xl">
                  {stat.value}
                </p>
                <p className="text-sm font-light tracking-wider text-[#B7B89F] uppercase">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories - Grid Layout */}
      <section className="bg-[#EEEEEE] py-24">
        <div className="mx-auto max-w-[1600px] px-8 lg:px-16">
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-8 flex items-center gap-4"
            >
              <div className="h-0.5 w-16 bg-[#777C6D]"></div>
              <span className="text-sm font-light tracking-[0.3em] text-[#B7B89F] uppercase">
                التصنيفات
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl font-extralight text-[#777C6D] lg:text-8xl"
            >
              اختر مجالك
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group cursor-pointer"
              >
                <div className="border-2 border-[#CBCBCB] bg-white p-10 transition-all duration-300 hover:border-[#777C6D] hover:shadow-2xl">
                  <div className="mb-8 flex items-start justify-between">
                    <div className="flex h-16 w-16 items-center justify-center border-2 border-[#CBCBCB] transition-colors group-hover:border-[#777C6D]">
                      {React.cloneElement(cat.icon, {
                        className:
                          'w-8 h-8 text-[#B7B89F] group-hover:text-[#777C6D] transition-colors',
                        strokeWidth: 1.5,
                      })}
                    </div>
                    <div className="bg-[#EEEEEE] px-3 py-1 text-xs font-light tracking-wider text-[#777C6D] uppercase">
                      {cat.tag}
                    </div>
                  </div>

                  <h3 className="mb-6 text-2xl font-light text-[#777C6D]">{cat.name}</h3>

                  <div className="mb-8 flex items-baseline gap-3">
                    <p className="text-5xl font-extralight text-[#777C6D]">
                      {(cat.count / 1000).toFixed(1)}K
                    </p>
                    <p className="text-sm font-light tracking-wider text-[#B7B89F] uppercase">
                      مشروع
                    </p>
                  </div>

                  <div className="mb-6 h-px bg-[#CBCBCB] transition-colors group-hover:bg-[#777C6D]"></div>

                  <div className="flex items-center gap-3 font-light text-[#777C6D] transition-all group-hover:gap-5">
                    <span>استكشف</span>
                    <ArrowRight className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects - Minimal Cards */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1600px] px-8 lg:px-16">
          <div className="mb-20 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-8 flex items-center gap-4"
              >
                <div className="h-0.5 w-16 bg-[#777C6D]"></div>
                <span className="text-sm font-light tracking-[0.3em] text-[#B7B89F] uppercase">
                  المشاريع
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-6xl font-extralight text-[#777C6D] lg:text-8xl"
              >
                فرص مميزة
              </motion.h2>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              {['all', 'urgent', 'featured', 'new'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-3 text-sm font-light transition-all ${
                    activeFilter === filter
                      ? 'bg-[#777C6D] text-white'
                      : 'bg-[#EEEEEE] text-[#B7B89F] hover:text-[#777C6D]'
                  }`}
                >
                  {filter === 'all'
                    ? 'الكل'
                    : filter === 'urgent'
                      ? 'عاجل'
                      : filter === 'featured'
                        ? 'مميز'
                        : 'جديد'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group"
              >
                <div
                  className={`border-2 bg-[#EEEEEE] transition-all duration-500 ${
                    hoveredProject === project.id
                      ? 'border-[#777C6D] shadow-2xl'
                      : 'border-transparent hover:border-[#CBCBCB]'
                  }`}
                >
                  <div className="p-8 lg:p-10">
                    <div className="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                      {/* Left Info */}
                      <div className="flex-1">
                        <div className="mb-4 flex items-center gap-4">
                          <h3 className="text-sm font-light tracking-wider text-[#B7B89F] uppercase">
                            {project.client}
                          </h3>
                          {project.verified && (
                            <BadgeCheck className="h-5 w-5 text-[#777C6D]" strokeWidth={1.5} />
                          )}
                        </div>

                        <h2 className="mb-4 text-3xl leading-tight font-light text-[#777C6D] lg:text-4xl">
                          {project.title}
                        </h2>

                        <div className="flex flex-wrap items-center gap-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-[#B7B89F]" strokeWidth={1.5} />
                            <span className="text-sm font-light text-[#B7B89F]">
                              {project.category}
                            </span>
                          </div>

                          <div className="h-4 w-px bg-[#CBCBCB]"></div>

                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-[#B7B89F]" strokeWidth={1.5} />
                            <span className="text-sm font-light text-[#B7B89F]">
                              {project.duration}
                            </span>
                          </div>

                          <div className="h-4 w-px bg-[#CBCBCB]"></div>

                          <div className="flex items-center gap-2">
                            <Eye className="h-4 w-4 text-[#B7B89F]" strokeWidth={1.5} />
                            <span className="text-sm font-light text-[#B7B89F]">
                              {project.views}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Info */}
                      <div className="flex flex-col items-start gap-4 lg:items-end">
                        <div className="flex items-center gap-3">
                          {project.urgent && (
                            <div className="bg-[#777C6D] px-4 py-2 text-xs font-light tracking-wider text-white uppercase">
                              URGENT
                            </div>
                          )}
                          {project.featured && (
                            <div className="border-2 border-[#777C6D] px-4 py-2 text-xs font-light tracking-wider text-[#777C6D] uppercase">
                              FEATURED
                            </div>
                          )}
                        </div>

                        <div className="text-left lg:text-right">
                          <p className="mb-1 text-4xl font-light text-[#777C6D]">
                            {project.budget.type === 'fixed'
                              ? `${project.budget.min.toLocaleString()}`
                              : `${project.budget.min}-${project.budget.max}`}
                          </p>
                          <p className="text-xs font-light tracking-wider text-[#B7B89F] uppercase">
                            {project.budget.type === 'fixed' ? 'ريال سعودي' : 'ر.س/ساعة'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="mb-8 flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="border border-[#CBCBCB] bg-white px-4 py-2 text-sm font-light text-[#777C6D] transition-colors hover:border-[#777C6D]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between border-t border-[#CBCBCB] pt-8">
                      <div className="flex items-center gap-6 text-sm font-light text-[#B7B89F]">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" strokeWidth={1.5} />
                          <span>{project.proposals} عرض</span>
                        </div>
                        <div className="h-4 w-px bg-[#CBCBCB]"></div>
                        <span>منذ {project.posted}</span>
                      </div>

                      <button
                        className={`border-2 px-8 py-3 font-light transition-all ${
                          hoveredProject === project.id
                            ? 'border-[#777C6D] bg-[#777C6D] text-white'
                            : 'border-[#CBCBCB] bg-white text-[#777C6D] hover:border-[#777C6D]'
                        }`}
                      >
                        قدّم عرضك
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <button className="border-2 border-[#777C6D] px-12 py-4 font-light text-[#777C6D] transition-all hover:bg-[#777C6D] hover:text-white">
              عرض المزيد
            </button>
          </motion.div>
        </div>
      </section>

      {/* Talents - Minimal Grid */}
      <section className="bg-[#EEEEEE] py-24">
        <div className="mx-auto max-w-[1600px] px-8 lg:px-16">
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-8 flex items-center gap-4"
            >
              <div className="h-0.5 w-16 bg-[#777C6D]"></div>
              <span className="text-sm font-light tracking-[0.3em] text-[#B7B89F] uppercase">
                المحترفون
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl font-extralight text-[#777C6D] lg:text-8xl"
            >
              أفضل المواهب
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {talents.map((talent, index) => (
              <motion.div
                key={talent.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="border-2 border-[#CBCBCB] bg-white p-8 transition-all duration-500 hover:border-[#777C6D] hover:shadow-2xl">
                  {/* Avatar */}
                  <div className="relative mb-8">
                    <div className="mx-auto flex h-32 w-32 items-center justify-center border-2 border-[#CBCBCB] bg-[#EEEEEE] text-6xl transition-colors group-hover:border-[#777C6D]">
                      {talent.avatar}
                    </div>

                    <div
                      className={`absolute -bottom-3 left-1/2 -translate-x-1/2 transform px-4 py-1 text-xs font-light tracking-wider uppercase ${
                        talent.availability === 'available'
                          ? 'bg-[#777C6D] text-white'
                          : 'bg-[#CBCBCB] text-[#777C6D]'
                      }`}
                    >
                      {talent.availability === 'available' ? 'متاح' : 'مشغول'}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="mb-8 text-center">
                    <h3 className="mb-2 text-2xl font-light text-[#777C6D]">{talent.name}</h3>
                    <p className="mb-1 text-sm font-light text-[#B7B89F]">{talent.title}</p>
                    <p className="text-xs font-light text-[#CBCBCB]">{talent.location}</p>
                  </div>

                  {/* Rating */}
                  <div className="mb-8 flex items-center justify-center gap-3 border-b border-[#CBCBCB] pb-8">
                    <Star className="h-5 w-5 fill-[#777C6D] text-[#777C6D]" strokeWidth={1.5} />
                    <span className="text-xl font-light text-[#777C6D]">{talent.rating}</span>
                    <span className="text-sm font-light text-[#B7B89F]">({talent.reviews})</span>
                  </div>

                  {/* Stats */}
                  <div className="mb-8 grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="mb-1 text-3xl font-light text-[#777C6D]">{talent.completed}</p>
                      <p className="text-xs font-light tracking-wider text-[#B7B89F] uppercase">
                        مشروع
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="mb-1 text-3xl font-light text-[#777C6D]">{talent.rate}</p>
                      <p className="text-xs font-light tracking-wider text-[#B7B89F] uppercase">
                        ر.س/س
                      </p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-8 flex flex-wrap justify-center gap-2">
                    {talent.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-[#EEEEEE] px-3 py-1 text-xs font-light text-[#777C6D]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <button className="w-full border-2 border-[#CBCBCB] py-3 font-light text-[#777C6D] transition-all hover:border-[#777C6D] hover:bg-[#777C6D] hover:text-white">
                    عرض الملف
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Minimal */}
      <section className="relative overflow-hidden bg-[#777C6D] py-32">
        {/* Minimal Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(white 2px, transparent 2px),
              linear-gradient(90deg, white 2px, transparent 2px)
            `,
              backgroundSize: '100px 100px',
            }}
          ></div>
        </div>

        <div className="relative mx-auto max-w-[1200px] px-8 text-center lg:px-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mx-auto mb-16 flex h-32 w-32 items-center justify-center border-4 border-white/20"
          >
            <Rocket className="h-16 w-16 text-white" strokeWidth={1} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-7xl leading-[0.9] font-extralight text-white lg:text-9xl"
          >
            ابدأ اليوم
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mb-16 max-w-3xl text-2xl leading-relaxed font-light text-white/80 lg:text-3xl"
          >
            انضم إلى آلاف المحترفين والشركات واصنع مستقبلك المهني
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col justify-center gap-4 sm:flex-row"
          >
            <button className="bg-white px-16 py-5 text-lg font-light text-[#777C6D] transition-all hover:bg-[#EEEEEE]">
              تسجيل محترف
            </button>
            <button className="border-2 border-white px-16 py-5 text-lg font-light text-white transition-all hover:bg-white hover:text-[#777C6D]">
              تسجيل عميل
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer - Ultra Minimal */}
      <footer className="border-t-2 border-[#CBCBCB] bg-white py-20">
        <div className="mx-auto max-w-[1600px] px-8 lg:px-16">
          <div className="mb-20 grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-5">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center bg-[#777C6D]">
                  <div className="h-6 w-6 border-2 border-white"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-light tracking-tight text-[#777C6D]">
                    FREELANCE
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.25em] text-[#B7B89F] uppercase">
                    MARKETPLACE
                  </span>
                </div>
              </div>

              <p className="mb-8 max-w-md leading-relaxed font-light text-[#B7B89F]">
                منصة العمل الحر الأولى في الوطن العربي. نربط أفضل المواهب بأهم الفرص العالمية.
              </p>

              <div className="flex gap-3">
                {[Twitter, Instagram, Linkedin, Facebook].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex h-12 w-12 items-center justify-center border-2 border-[#CBCBCB] text-[#B7B89F] transition-all hover:border-[#777C6D] hover:text-[#777C6D]"
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              { title: 'الشركة', links: ['من نحن', 'المدونة', 'الوظائف', 'الأخبار'] },
              { title: 'الخدمات', links: ['للمحترفين', 'للشركات', 'الباقات', 'API'] },
              { title: 'الدعم', links: ['المساعدة', 'تواصل', 'الشروط', 'الخصوصية'] },
            ].map((column, i) => (
              <div key={i}>
                <h4 className="mb-6 text-sm font-light tracking-[0.2em] text-[#777C6D] uppercase">
                  {column.title}
                </h4>
                <ul className="space-y-4">
                  {column.links.map((link, j) => (
                    <li key={j}>
                      <a
                        href="#"
                        className="font-light text-[#B7B89F] transition-colors hover:text-[#777C6D]"
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
          <div className="flex flex-col items-center justify-between gap-6 border-t border-[#CBCBCB] pt-8 md:flex-row">
            <p className="text-sm font-light text-[#B7B89F]">
              © 2025 FREELANCE MARKETPLACE. جميع الحقوق محفوظة.
            </p>

            <div className="flex gap-8 text-sm">
              <a
                href="#"
                className="font-light text-[#B7B89F] transition-colors hover:text-[#777C6D]"
              >
                الخصوصية
              </a>
              <a
                href="#"
                className="font-light text-[#B7B89F] transition-colors hover:text-[#777C6D]"
              >
                الشروط
              </a>
              <a
                href="#"
                className="font-light text-[#B7B89F] transition-colors hover:text-[#777C6D]"
              >
                ملفات تعريف الارتباط
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MinimalistFreelancePlatform;
