'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Briefcase,
  CheckCircle,
  Clock,
  Code,
  Crown,
  DollarSign,
  Eye,
  Facebook,
  Feather,
  Instagram,
  Linkedin,
  MapPin,
  Menu,
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
  Video,
  Zap,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

function ModernFreelancePlatform() {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('projects');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    {
      id: 1,
      name: 'التصميم الإبداعي',
      icon: <Palette />,
      projects: 2847,
      color: '#9BB4C0',
      pattern: '◆',
    },
    {
      id: 2,
      name: 'التطوير البرمجي',
      icon: <Code />,
      projects: 3921,
      color: '#E1D0B3',
      pattern: '◇',
    },
    {
      id: 3,
      name: 'المحتوى والكتابة',
      icon: <Feather />,
      projects: 1654,
      color: '#A18D6D',
      pattern: '◈',
    },
    {
      id: 4,
      name: 'التسويق الرقمي',
      icon: <TrendingUp />,
      projects: 2183,
      color: '#703B3B',
      pattern: '◉',
    },
    {
      id: 5,
      name: 'الأعمال التجارية',
      icon: <Briefcase />,
      projects: 1289,
      color: '#9BB4C0',
      pattern: '◆',
    },
    {
      id: 6,
      name: 'الإنتاج المرئي',
      icon: <Video />,
      projects: 987,
      color: '#E1D0B3',
      pattern: '◇',
    },
  ];

  const projects = [
    {
      id: 1,
      title: 'تصميم تطبيق جوال فاخر للتجارة الإلكترونية',
      company: 'Luxury Mall Co.',
      logo: '💎',
      category: 'التصميم الإبداعي',
      excerpt:
        'نحتاج مصمم UI/UX محترف لإنشاء تجربة تسوق راقية وسلسة عبر تطبيق جوال يعكس الفخامة والبساطة في آن واحد',
      budget: 75000,
      budgetType: 'مشروع كامل',
      duration: '8-10 أسابيع',
      skills: ['Figma', 'Prototyping', 'iOS Design', 'Animation', 'User Research'],
      proposals: 34,
      views: 892,
      postedTime: '3 ساعات',
      level: 'Expert',
      verified: true,
      featured: true,
      rating: 4.9,
      location: 'دبي',
    },
    {
      id: 2,
      title: 'بناء منصة SaaS متكاملة للموارد البشرية',
      company: 'HR Tech Solutions',
      logo: '🚀',
      category: 'التطوير البرمجي',
      excerpt:
        'مطلوب فريق تطوير لبناء نظام إدارة موارد بشرية شامل مع لوحة تحكم تفاعلية وتقارير تحليلية متقدمة',
      budget: 145000,
      budgetType: 'مشروع كامل',
      duration: '4-6 أشهر',
      skills: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'TypeScript'],
      proposals: 67,
      views: 1543,
      postedTime: '5 ساعات',
      level: 'Expert',
      verified: true,
      featured: true,
      rating: 5.0,
      location: 'الرياض',
    },
    {
      id: 3,
      title: 'كتابة محتوى تسويقي متخصص في التقنية',
      company: 'Tech Content Hub',
      logo: '✍️',
      category: 'المحتوى والكتابة',
      excerpt:
        'نبحث عن كاتب تقني محترف لإنتاج مقالات SEO، دراسات حالة، وأدلة شاملة في مجال التكنولوجيا والذكاء الاصطناعي',
      budget: 25000,
      budgetType: 'شهري',
      duration: '3 أشهر',
      skills: ['Technical Writing', 'SEO', 'Research', 'AI Content', 'Copywriting'],
      proposals: 89,
      views: 1234,
      postedTime: '1 يوم',
      level: 'Intermediate',
      verified: true,
      featured: false,
      rating: 4.7,
      location: 'جدة',
    },
    {
      id: 4,
      title: 'إدارة حملات إعلانية شاملة على منصات التواصل',
      company: 'Digital Growth Agency',
      logo: '📊',
      category: 'التسويق الرقمي',
      excerpt:
        'مطلوب خبير تسويق رقمي لتخطيط وإدارة حملات إعلانية متعددة القنوات مع تحليل البيانات وتحسين الأداء المستمر',
      budget: 38000,
      budgetType: 'شهري',
      duration: '2-3 أشهر',
      skills: ['Facebook Ads', 'Google Ads', 'Analytics', 'Strategy', 'A/B Testing'],
      proposals: 52,
      views: 978,
      postedTime: '6 ساعات',
      level: 'Expert',
      verified: false,
      featured: false,
      rating: 4.8,
      location: 'الدوحة',
    },
    {
      id: 5,
      title: 'استشارات استراتيجية لتوسع شركة ناشئة',
      company: 'Startup Accelerator',
      logo: '💼',
      category: 'الأعمال التجارية',
      excerpt:
        'نحتاج مستشار أعمال ذو خبرة لوضع خطة توسع استراتيجية، تحليل السوق، وتطوير نموذج عمل قابل للنمو السريع',
      budget: 62000,
      budgetType: 'مشروع كامل',
      duration: '5-7 أسابيع',
      skills: ['Business Strategy', 'Market Analysis', 'Financial Planning', 'Consulting'],
      proposals: 41,
      views: 756,
      postedTime: '4 ساعات',
      level: 'Expert',
      verified: true,
      featured: true,
      rating: 5.0,
      location: 'أبوظبي',
    },
    {
      id: 6,
      title: 'إنتاج فيديوهات ترويجية احترافية',
      company: 'Creative Studios',
      logo: '🎬',
      category: 'الإنتاج المرئي',
      excerpt:
        'مطلوب مخرج ومصور محترف لإنتاج سلسلة فيديوهات ترويجية عالية الجودة تعكس هوية العلامة التجارية بإبداع',
      budget: 48000,
      budgetType: 'مشروع كامل',
      duration: '6-8 أسابيع',
      skills: ['Video Production', 'After Effects', 'Color Grading', 'Storytelling'],
      proposals: 28,
      views: 643,
      postedTime: '7 ساعات',
      level: 'Advanced',
      verified: false,
      featured: false,
      rating: 4.6,
      location: 'بيروت',
    },
  ];

  const talents = [
    {
      id: 1,
      name: 'ليلى الحارثي',
      title: 'خبيرة UI/UX Design',
      specialization: 'تصميم تجارب رقمية متميزة',
      avatar: '👩‍🎨',
      rating: 5.0,
      reviews: 287,
      rate: 520,
      completed: 234,
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'Design Systems', 'User Research'],
      availability: 'available',
      responseTime: '1 ساعة',
      verified: true,
      topRated: true,
      location: 'دبي',
      languages: ['العربية', 'English', 'Français'],
      tagline: 'أصمم تجارب لا تُنسى',
    },
    {
      id: 2,
      name: 'عمر السعيد',
      title: 'مطور Full Stack',
      specialization: 'حلول تقنية متطورة وقابلة للتوسع',
      avatar: '👨‍💻',
      rating: 4.9,
      reviews: 412,
      rate: 680,
      completed: 367,
      skills: ['React', 'Node.js', 'AWS', 'Docker', 'TypeScript'],
      availability: 'busy',
      responseTime: '2 ساعة',
      verified: true,
      topRated: true,
      location: 'الرياض',
      languages: ['العربية', 'English'],
      tagline: 'أبني منتجات تدوم',
    },
    {
      id: 3,
      name: 'سارة المنصور',
      title: 'كاتبة محتوى إبداعي',
      specialization: 'سرد القصص والمحتوى التسويقي',
      avatar: '✍️',
      rating: 5.0,
      reviews: 198,
      rate: 420,
      completed: 189,
      skills: ['Copywriting', 'SEO', 'Content Strategy', 'Storytelling'],
      availability: 'available',
      responseTime: '30 دقيقة',
      verified: true,
      topRated: false,
      location: 'الدوحة',
      languages: ['العربية', 'English'],
      tagline: 'الكلمات تصنع الفرق',
    },
    {
      id: 4,
      name: 'أحمد الزهراني',
      title: 'استراتيجي تسويق رقمي',
      specialization: 'نمو الأعمال عبر القنوات الرقمية',
      avatar: '📊',
      rating: 4.8,
      reviews: 345,
      rate: 580,
      completed: 298,
      skills: ['SEO/SEM', 'Analytics', 'Social Media', 'Growth Hacking'],
      availability: 'available',
      responseTime: '1 ساعة',
      verified: true,
      topRated: true,
      location: 'جدة',
      languages: ['العربية', 'English', 'Türkçe'],
      tagline: 'أحقق النمو المستدام',
    },
  ];

  const stats = [
    { value: '87K+', label: 'مشروع مكتمل', icon: <CheckCircle />, color: '#9BB4C0' },
    { value: '42K+', label: 'محترف موثوق', icon: <Users />, color: '#E1D0B3' },
    { value: '₪8.2B', label: 'قيمة المعاملات', icon: <TrendingUp />, color: '#A18D6D' },
    { value: '99.2%', label: 'رضا العملاء', icon: <Star />, color: '#703B3B' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="relative overflow-hidden">
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
            scrollY > 50 ? 'bg-white shadow-lg' : 'bg-transparent'
          }`}
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex h-24 items-center justify-between">
              <div className="group flex cursor-pointer items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 rotate-45 transform bg-[#9BB4C0]"></div>
                  <div className="relative flex h-14 w-14 items-center justify-center">
                    <Sparkles className="relative z-10 h-7 w-7 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-black tracking-tight text-[#703B3B]">NEXUS</h1>
                  <p className="text-xs font-bold tracking-widest text-[#A18D6D]">TALENT HUB</p>
                </div>
              </div>

              {/* Desktop Menu */}
              <div className="hidden items-center gap-2 lg:flex">
                {['استكشف', 'المواهب', 'المشاريع', 'الحلول', 'الموارد'].map((item, i) => (
                  <button
                    key={i}
                    className="group relative px-6 py-3 text-sm font-bold text-[#703B3B] transition-colors hover:text-[#9BB4C0]"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#9BB4C0] transition-all duration-300 group-hover:w-full"></span>
                  </button>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button className="hidden rounded-full px-6 py-3 font-bold text-[#703B3B] transition-all hover:bg-[#F5F5F0] lg:block">
                  تسجيل الدخول
                </button>
                <button className="rounded-full bg-[#703B3B] px-8 py-3 font-bold text-white shadow-lg transition-all hover:bg-[#9BB4C0]">
                  ابدأ الآن
                </button>
                <button className="p-3 text-[#703B3B] lg:hidden">
                  <Menu className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Hero with Diagonal Split */}
        <div className="relative pt-32 pb-24 lg:pb-32">
          {/* Background Patterns */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-full -skew-y-6 transform bg-[#9BB4C0] opacity-5"></div>
            <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-[#E1D0B3] opacity-10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#A18D6D] opacity-10 blur-3xl"></div>
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#E1D0B3] bg-white px-6 py-3 shadow-lg"
                >
                  <div className="flex -space-x-2">
                    {['👨‍💼', '👩‍💻', '👨‍🎨', '👩‍🔬'].map((emoji, i) => (
                      <div
                        key={i}
                        className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#9BB4C0] text-sm"
                      >
                        {emoji}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm font-bold text-[#703B3B]">+50,000 محترف نشط</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="mb-6 text-6xl leading-tight font-black lg:text-7xl"
                >
                  <span className="text-[#703B3B]">مستقبل</span>
                  <br />
                  <span className="text-[#9BB4C0]">العمل الحر</span>
                  <br />
                  <span className="text-[#A18D6D]">يبدأ هنا</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mb-10 max-w-xl text-xl leading-relaxed text-[#703B3B] opacity-80"
                >
                  منصة احترافية تجمع أفضل المواهب مع أهم المشاريع في العالم العربي لخلق تجارب عمل
                  استثنائية
                </motion.p>

                {/* Search */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="relative"
                >
                  <div className="flex items-center gap-3 rounded-2xl border border-[#E1D0B3] bg-white p-2 shadow-2xl">
                    <div className="flex flex-1 items-center gap-3 px-4">
                      <Search className="h-5 w-5 text-[#A18D6D]" />
                      <input
                        type="text"
                        placeholder="ابحث عن مشاريع، مهارات، أو محترفين..."
                        className="w-full bg-transparent font-semibold text-[#703B3B] placeholder-[#A18D6D] outline-none"
                      />
                    </div>
                    <button className="rounded-xl bg-[#703B3B] px-10 py-4 font-bold text-white transition-all hover:bg-[#9BB4C0]">
                      بحث
                    </button>
                  </div>

                  <div className="mt-6 flex items-center gap-4">
                    <p className="text-sm font-semibold text-[#A18D6D]">رائج الآن:</p>
                    {['UI Design', 'React', 'Content Writing', 'SEO'].map((tag, i) => (
                      <button
                        key={i}
                        className="rounded-full bg-[#F5F5F0] px-4 py-2 text-sm font-bold text-[#703B3B] transition-all hover:bg-[#E1D0B3]"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-12 grid grid-cols-3 gap-6 border-t-2 border-[#E1D0B3] pt-12"
                >
                  {[
                    { icon: <Shield />, text: 'دفع آمن', color: '#9BB4C0' },
                    { icon: <Zap />, text: 'تسليم سريع', color: '#E1D0B3' },
                    { icon: <Award />, text: 'جودة مضمونة', color: '#A18D6D' },
                  ].map((item, i) => (
                    <div key={i} className="group cursor-pointer text-center">
                      <div
                        className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform group-hover:scale-110"
                        style={{ backgroundColor: item.color }}
                      >
                        {React.cloneElement(item.icon, { className: 'w-7 h-7 text-white' })}
                      </div>
                      <span className="text-sm font-bold text-[#703B3B]">{item.text}</span>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right - 3D Cards Stack */}
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="relative hidden lg:block"
              >
                <div className="relative h-[600px] w-full">
                  {/* Floating Cards */}
                  {[
                    {
                      top: '0%',
                      left: '10%',
                      rotation: '-6deg',
                      color: '#9BB4C0',
                      icon: <Code />,
                      text: 'برمجة',
                    },
                    {
                      top: '15%',
                      left: '50%',
                      rotation: '8deg',
                      color: '#E1D0B3',
                      icon: <Palette />,
                      text: 'تصميم',
                    },
                    {
                      top: '35%',
                      left: '5%',
                      rotation: '4deg',
                      color: '#A18D6D',
                      icon: <Feather />,
                      text: 'كتابة',
                    },
                    {
                      top: '50%',
                      left: '55%',
                      rotation: '-5deg',
                      color: '#703B3B',
                      icon: <TrendingUp />,
                      text: 'تسويق',
                    },
                  ].map((card, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        rotate: card.rotation,
                        y: [0, -20, 0],
                      }}
                      transition={{
                        delay: 0.8 + i * 0.15,
                        y: {
                          duration: 3 + i,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        },
                      }}
                      className="absolute h-80 w-64 cursor-pointer rounded-3xl p-8 shadow-2xl transition-transform hover:scale-105"
                      style={{
                        top: card.top,
                        left: card.left,
                        backgroundColor: card.color,
                      }}
                    >
                      <div className="flex h-full flex-col">
                        <div className="bg-opacity-30 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white">
                          {React.cloneElement(card.icon, {
                            className: 'w-8 h-8 text-white',
                            strokeWidth: 2.5,
                          })}
                        </div>
                        <h3 className="mb-3 text-3xl font-black text-white">{card.text}</h3>
                        <p className="mb-6 text-sm font-semibold text-white opacity-80">
                          اكتشف أفضل المحترفين
                        </p>
                        <div className="mt-auto space-y-3">
                          {[1, 2, 3].map((bar, j) => (
                            <div
                              key={j}
                              className="bg-opacity-20 h-2 overflow-hidden rounded-full bg-white"
                            >
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${60 + j * 15}%` }}
                                transition={{ delay: 1 + i * 0.15 + j * 0.1, duration: 0.8 }}
                                className="h-full rounded-full bg-white"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <section className="bg-[#703B3B] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-opacity-20 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white">
                  {React.cloneElement(stat.icon, {
                    className: 'w-8 h-8 text-white',
                    strokeWidth: 2.5,
                  })}
                </div>
                <div className="mb-2 text-5xl font-black text-white">{stat.value}</div>
                <div className="text-sm font-bold tracking-wide text-white uppercase opacity-80">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories - Hexagon Grid */}
      <section className="bg-[#F5F5F0] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-20 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-opacity-10 mb-6 inline-block rounded-full bg-[#9BB4C0] px-6 py-3"
            >
              <span className="text-sm font-black tracking-wider text-[#9BB4C0] uppercase">
                التخصصات
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 text-5xl font-black text-[#703B3B] lg:text-6xl"
            >
              اكتشف عالم الإمكانيات
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mx-auto max-w-2xl text-xl text-[#A18D6D]"
            >
              اختر المجال المناسب وابدأ رحلتك مع أفضل المحترفين
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                onClick={() => setSelectedCategory(cat.id)}
                className="group relative cursor-pointer overflow-hidden rounded-3xl bg-white p-8 transition-all duration-500 hover:shadow-2xl"
              >
                {/* Background Pattern */}
                <div
                  className="pointer-events-none absolute top-0 right-0 text-9xl font-black opacity-5"
                  style={{ color: cat.color }}
                >
                  {cat.pattern}
                </div>

                {/* Icon */}
                <div
                  className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundColor: cat.color }}
                >
                  {React.cloneElement(cat.icon, {
                    className: 'w-10 h-10 text-white',
                    strokeWidth: 2.5,
                  })}
                </div>

                {/* Content */}
                <h3 className="mb-3 text-2xl font-black text-[#703B3B]">{cat.name}</h3>

                <div className="mb-6 flex items-center justify-between">
                  <span className="text-sm font-bold text-[#A18D6D]">المشاريع المتاحة</span>
                  <span className="text-3xl font-black" style={{ color: cat.color }}>
                    {cat.projects.toLocaleString()}
                  </span>
                </div>

                {/* Progress */}
                <div className="mb-4 h-2 overflow-hidden rounded-full bg-gray-200">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '75%' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 font-bold text-[#703B3B] transition-all group-hover:gap-4">
                  <span>استكشف المزيد</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects - Masonry Layout */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16 flex flex-col items-end justify-between gap-8 lg:flex-row">
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-opacity-20 mb-6 inline-block rounded-full bg-[#E1D0B3] px-6 py-3"
              >
                <span className="text-sm font-black tracking-wider text-[#A18D6D] uppercase">
                  الفرص
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl font-black text-[#703B3B] lg:text-6xl"
              >
                مشاريع متميزة
              </motion.h2>
            </div>

            {/* Tabs */}
            <div className="flex gap-3 rounded-2xl bg-[#F5F5F0] p-2">
              {['جميع المشاريع', 'مميزة', 'عاجلة'].map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-xl px-8 py-3 font-bold transition-all ${
                    activeTab === tab || i === 0
                      ? 'bg-white text-[#703B3B] shadow-lg'
                      : 'text-[#A18D6D] hover:text-[#703B3B]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredCard(project.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group overflow-hidden rounded-3xl bg-[#F5F5F0] transition-all duration-500 hover:shadow-2xl"
              >
                {/* Header */}
                <div className="relative overflow-hidden bg-white p-8 pb-6">
                  {/* Pattern */}
                  <div className="pointer-events-none absolute top-0 right-0 text-9xl font-black text-[#9BB4C0] opacity-5">
                    ◆
                  </div>

                  {/* Company Info */}
                  <div className="relative z-10 mb-6 flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#9BB4C0] text-3xl">
                        {project.logo}
                      </div>
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <h4 className="text-lg font-black text-[#703B3B]">{project.company}</h4>
                          {project.verified && (
                            <BadgeCheck className="h-5 w-5 text-[#9BB4C0]" fill="#9BB4C0" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm font-semibold text-[#A18D6D]">
                          <MapPin className="h-4 w-4" />
                          {project.location}
                        </div>
                      </div>
                    </div>

                    {project.featured && (
                      <div className="rounded-full bg-[#703B3B] px-4 py-2 text-xs font-black text-white uppercase">
                        مميز
                      </div>
                    )}
                  </div>

                  <h3 className="relative z-10 mb-4 text-2xl leading-tight font-black text-[#703B3B]">
                    {project.title}
                  </h3>

                  <div className="bg-opacity-30 inline-block rounded-full bg-[#E1D0B3] px-4 py-2 text-sm font-bold text-[#A18D6D]">
                    {project.category}
                  </div>
                </div>

                {/* Body */}
                <div className="p-8 pt-6">
                  <p className="mb-6 leading-relaxed text-[#703B3B] opacity-80">
                    {project.excerpt}
                  </p>

                  {/* Skills */}
                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-[#E1D0B3] bg-white px-4 py-2 text-sm font-bold text-[#703B3B]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Meta Grid */}
                  <div className="mb-6 grid grid-cols-3 gap-4 rounded-2xl bg-white p-6">
                    <div className="text-center">
                      <DollarSign
                        className="mx-auto mb-2 h-5 w-5 text-[#9BB4C0]"
                        strokeWidth={2.5}
                      />
                      <p className="mb-1 text-2xl font-black text-[#703B3B]">
                        {project.budget.toLocaleString()}
                      </p>
                      <p className="text-xs font-semibold text-[#A18D6D]">ر.س</p>
                    </div>

                    <div className="border-x border-[#E1D0B3] text-center">
                      <Clock className="mx-auto mb-2 h-5 w-5 text-[#E1D0B3]" strokeWidth={2.5} />
                      <p className="mb-1 text-sm font-black text-[#703B3B]">{project.duration}</p>
                      <p className="text-xs font-semibold text-[#A18D6D]">المدة</p>
                    </div>

                    <div className="text-center">
                      <Users className="mx-auto mb-2 h-5 w-5 text-[#A18D6D]" strokeWidth={2.5} />
                      <p className="mb-1 text-2xl font-black text-[#703B3B]">{project.proposals}</p>
                      <p className="text-xs font-semibold text-[#A18D6D]">عرض</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t border-[#E1D0B3] pt-6">
                    <div className="flex items-center gap-6 text-sm font-semibold text-[#A18D6D]">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        {project.views}
                      </div>
                      <span>منذ {project.postedTime}</span>
                    </div>

                    <button className="flex items-center gap-2 rounded-full bg-[#703B3B] px-8 py-3 font-bold text-white transition-all group-hover:gap-3 hover:bg-[#9BB4C0]">
                      قدّم عرضك
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Talents - Card Carousel */}
      <section className="bg-[#F5F5F0] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-opacity-10 mb-6 inline-block rounded-full bg-[#703B3B] px-6 py-3"
            >
              <span className="text-sm font-black tracking-wider text-[#703B3B] uppercase">
                المواهب
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 text-5xl font-black text-[#703B3B] lg:text-6xl"
            >
              نخبة المحترفين
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {talents.map((talent, index) => (
              <motion.div
                key={talent.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-3xl bg-white p-8 transition-all duration-500 hover:shadow-2xl"
              >
                {/* Top Badge */}
                {talent.topRated && (
                  <div className="absolute top-6 right-6 z-10">
                    <div className="flex items-center gap-2 rounded-full bg-[#703B3B] px-4 py-2 text-xs font-black text-white uppercase">
                      <Crown className="h-4 w-4" />
                      TOP
                    </div>
                  </div>
                )}

                {/* Avatar */}
                <div className="relative mb-6">
                  <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-3xl bg-[#9BB4C0] text-5xl transition-transform duration-500 group-hover:scale-110">
                    {talent.avatar}
                  </div>

                  {talent.verified && (
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 transform">
                      <div className="rounded-full bg-white p-2 shadow-lg">
                        <BadgeCheck className="h-6 w-6 text-[#9BB4C0]" fill="#9BB4C0" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="text-center">
                  <h3 className="mb-2 text-xl font-black text-[#703B3B]">{talent.name}</h3>
                  <p className="mb-2 text-sm font-bold text-[#9BB4C0]">{talent.title}</p>
                  <p className="mb-6 text-xs text-[#A18D6D]">{talent.specialization}</p>

                  {/* Quote */}
                  <div className="mb-6 rounded-2xl bg-[#F5F5F0] p-4">
                    <p className="text-sm font-semibold text-[#703B3B] italic">
                      "{talent.tagline}"
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="mb-6 flex items-center justify-center gap-2 border-b border-[#E1D0B3] pb-6">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[#9BB4C0] text-[#9BB4C0]" />
                      ))}
                    </div>
                    <span className="text-lg font-black text-[#703B3B]">{talent.rating}</span>
                    <span className="text-sm font-semibold text-[#A18D6D]">({talent.reviews})</span>
                  </div>

                  {/* Stats */}
                  <div className="mb-6 grid grid-cols-2 gap-4">
                    <div className="bg-opacity-10 rounded-2xl bg-[#9BB4C0] p-4">
                      <p className="mb-1 text-3xl font-black text-[#703B3B]">{talent.completed}</p>
                      <p className="text-xs font-bold text-[#A18D6D] uppercase">مشروع</p>
                    </div>
                    <div className="bg-opacity-20 rounded-2xl bg-[#E1D0B3] p-4">
                      <p className="mb-1 text-3xl font-black text-[#A18D6D]">{talent.rate}</p>
                      <p className="text-xs font-bold text-[#703B3B] uppercase">ر.س/ساعة</p>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="mb-6 rounded-2xl bg-[#F5F5F0] p-4">
                    <div className="mb-2 flex items-center justify-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full ${
                          talent.availability === 'available' ? 'bg-green-500' : 'bg-orange-500'
                        }`}
                      />
                      <span className="text-sm font-bold text-[#703B3B]">
                        {talent.availability === 'available' ? 'متاح الآن' : 'مشغول'}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[#A18D6D]">
                      رد خلال {talent.responseTime}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="space-y-3">
                    <button className="flex w-full items-center justify-center gap-2 rounded-full bg-[#703B3B] py-3 font-bold text-white transition-all hover:bg-[#9BB4C0]">
                      عرض الملف
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <button className="w-full rounded-full border-2 border-[#E1D0B3] bg-white py-3 font-bold text-[#703B3B] transition-all hover:border-[#703B3B]">
                      تواصل الآن
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Bold & Modern */}
      <section className="relative overflow-hidden bg-[#703B3B] py-32">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 h-96 w-96 animate-pulse rounded-full bg-[#9BB4C0] opacity-10 blur-3xl"></div>
          <div className="absolute right-0 bottom-0 h-96 w-96 animate-pulse rounded-full bg-[#E1D0B3] opacity-10 blur-3xl delay-1000"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-opacity-10 mx-auto mb-12 flex h-32 w-32 items-center justify-center rounded-3xl bg-white backdrop-blur-sm"
          >
            <Rocket className="h-16 w-16 text-white" strokeWidth={2.5} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 text-6xl leading-tight font-black text-white lg:text-7xl"
          >
            ابدأ رحلتك اليوم
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mb-12 max-w-3xl text-2xl leading-relaxed text-white opacity-90"
          >
            انضم إلى آلاف المحترفين والشركات الذين يحققون النجاح معنا كل يوم
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col justify-center gap-6 sm:flex-row"
          >
            <button className="rounded-full bg-white px-12 py-5 text-lg font-black text-[#703B3B] shadow-2xl transition-all hover:bg-[#9BB4C0] hover:text-white">
              ابدأ كمحترف
            </button>

            <button className="rounded-full border-2 border-white bg-transparent px-12 py-5 text-lg font-black text-white transition-all hover:bg-white hover:text-[#703B3B]">
              انشر مشروعك
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer - Minimal & Clean */}
      <footer className="bg-white px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="mb-6 flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 rotate-45 transform bg-[#9BB4C0]"></div>
                  <div className="relative flex h-14 w-14 items-center justify-center">
                    <Sparkles className="relative z-10 h-7 w-7 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-[#703B3B]">NEXUS</h3>
                  <p className="text-xs font-bold tracking-widest text-[#A18D6D]">TALENT HUB</p>
                </div>
              </div>

              <p className="mb-8 leading-relaxed text-[#A18D6D]">
                المنصة الاحترافية الرائدة للعمل الحر في العالم العربي
              </p>

              <div className="flex gap-3">
                {[Twitter, Instagram, Linkedin, Facebook].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F5F5F0] text-[#703B3B] transition-all hover:bg-[#703B3B] hover:text-white"
                  >
                    <Icon className="h-5 w-5" strokeWidth={2.5} />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              { title: 'المنصة', links: ['عن NEXUS', 'كيف نعمل', 'الفريق', 'الوظائف'] },
              { title: 'الخدمات', links: ['للمحترفين', 'للشركات', 'الأسعار', 'API'] },
              { title: 'الدعم', links: ['المساعدة', 'تواصل معنا', 'الشروط', 'الخصوصية'] },
            ].map((column, index) => (
              <div key={index}>
                <h4 className="mb-5 text-base font-black tracking-wide text-[#703B3B] uppercase">
                  {column.title}
                </h4>
                <ul className="space-y-3">
                  {column.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="text-sm font-semibold text-[#A18D6D] transition-colors hover:text-[#703B3B]"
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
          <div className="flex flex-col items-center justify-between gap-6 border-t border-[#E1D0B3] pt-8 md:flex-row">
            <p className="text-sm font-semibold text-[#A18D6D]">
              © 2025 NEXUS. All rights reserved.
            </p>

            <div className="flex gap-8">
              <a href="#" className="text-sm font-semibold text-[#A18D6D] hover:text-[#703B3B]">
                Privacy
              </a>
              <a href="#" className="text-sm font-semibold text-[#A18D6D] hover:text-[#703B3B]">
                Terms
              </a>
              <a href="#" className="text-sm font-semibold text-[#A18D6D] hover:text-[#703B3B]">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ModernFreelancePlatform;
