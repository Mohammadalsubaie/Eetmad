'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Briefcase,
  Building2,
  CheckCircle,
  Clock,
  Code,
  Crown,
  Eye,
  Facebook,
  FileText,
  Grid,
  Headphones,
  Instagram,
  Layers,
  Linkedin,
  MapPin,
  Menu,
  Mountain,
  Palette,
  Rocket,
  Search,
  Send,
  Shield,
  Star,
  TrendingUp,
  Twitter,
  Users,
  Video,
  Wallet,
  X,
  Zap,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

function PremiumFreelancePlatform() {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('projects');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    {
      id: 1,
      name: 'البرمجة والتطوير',
      icon: <Code />,
      projects: 8420,
      growth: '+42%',
      color: '#34626C',
    },
    {
      id: 2,
      name: 'التصميم والإبداع',
      icon: <Palette />,
      projects: 6350,
      growth: '+38%',
      color: '#839B97',
    },
    {
      id: 3,
      name: 'الكتابة والترجمة',
      icon: <FileText />,
      projects: 4280,
      growth: '+29%',
      color: '#CFD3CE',
    },
    {
      id: 4,
      name: 'التسويق والمبيعات',
      icon: <TrendingUp />,
      projects: 7150,
      growth: '+51%',
      color: '#C6B497',
    },
    {
      id: 5,
      name: 'الفيديو والصوت',
      icon: <Video />,
      projects: 3920,
      growth: '+33%',
      color: '#34626C',
    },
    {
      id: 6,
      name: 'الأعمال والإدارة',
      icon: <Briefcase />,
      projects: 5480,
      growth: '+27%',
      color: '#839B97',
    },
  ];

  const featuredProjects = [
    {
      id: 1,
      title: 'تطوير منصة SaaS متقدمة للإدارة السحابية',
      company: 'CloudTech Solutions',
      verified: true,
      premium: true,
      description:
        'نبحث عن فريق تطوير متكامل لبناء منصة SaaS احترافية تشمل: لوحة تحكم تفاعلية، نظام المدفوعات، إدارة المستخدمين، تقارير تحليلية مفصلة، وتكامل API شامل',
      budget: { type: 'Fixed', amount: 180000, currency: 'SAR' },
      timeline: '4-6 أشهر',
      level: 'Expert',
      category: 'تطوير الويب',
      skills: [
        'React',
        'Node.js',
        'PostgreSQL',
        'AWS',
        'Docker',
        'Kubernetes',
        'TypeScript',
        'GraphQL',
      ],
      proposals: 23,
      location: 'السعودية',
      posted: '3 ساعات',
      urgent: true,
      clientRating: 4.9,
      clientSpent: '₪2.4M',
      hireRate: 98,
    },
    {
      id: 2,
      title: 'حملة تسويقية شاملة عبر منصات التواصل الاجتماعي',
      company: 'Digital Marketing Hub',
      verified: true,
      premium: false,
      description:
        'مطلوب خبير تسويق رقمي لقيادة حملة تسويقية متكاملة تشمل: استراتيجية المحتوى، إدارة الإعلانات المدفوعة، تحليل البيانات، والتفاعل مع الجمهور',
      budget: { type: 'Hourly', amount: 250, currency: 'SAR' },
      timeline: '3 أشهر',
      level: 'Intermediate',
      category: 'التسويق الرقمي',
      skills: ['Social Media', 'Google Ads', 'Analytics', 'Content Strategy', 'SEO'],
      proposals: 67,
      location: 'الإمارات',
      posted: '1 يوم',
      urgent: false,
      clientRating: 5.0,
      clientSpent: '₪890K',
      hireRate: 95,
    },
    {
      id: 3,
      title: 'تصميم هوية بصرية كاملة لشركة تقنية ناشئة',
      company: 'TechVenture Co.',
      verified: false,
      premium: true,
      description:
        'نحتاج مصمم جرافيك محترف لإنشاء هوية بصرية متكاملة: الشعار، الألوان، الخطوط، دليل الاستخدام، تصاميم المطبوعات، وقوالب السوشيال ميديا',
      budget: { type: 'Fixed', amount: 45000, currency: 'SAR' },
      timeline: '6-8 أسابيع',
      level: 'Expert',
      category: 'التصميم الجرافيكي',
      skills: ['Adobe Illustrator', 'Brand Identity', 'Logo Design', 'Typography', 'UI Design'],
      proposals: 89,
      location: 'قطر',
      posted: '5 ساعات',
      urgent: true,
      clientRating: 4.7,
      clientSpent: '₪320K',
      hireRate: 92,
    },
    {
      id: 4,
      title: 'كتابة محتوى تقني متخصص لمدونة تقنية',
      company: 'Tech Content Pro',
      verified: true,
      premium: false,
      description:
        'مطلوب كاتب محتوى تقني متمرس لإنتاج مقالات عالية الجودة في: الذكاء الاصطناعي، البرمجة، التقنيات الحديثة، مع تحسين SEO',
      budget: { type: 'Hourly', amount: 150, currency: 'SAR' },
      timeline: '2-3 أشهر',
      level: 'Intermediate',
      category: 'كتابة المحتوى',
      skills: ['Technical Writing', 'SEO', 'Research', 'Content Marketing', 'Copywriting'],
      proposals: 124,
      location: 'مصر',
      posted: '2 أيام',
      urgent: false,
      clientRating: 4.8,
      clientSpent: '₪560K',
      hireRate: 94,
    },
  ];

  const topTalents = [
    {
      id: 1,
      name: 'محمد الأحمدي',
      title: 'Full Stack Developer',
      specialty: 'Web & Mobile Development',
      avatar: '👨‍💻',
      rating: 5.0,
      reviews: 287,
      rate: 850,
      badge: 'Top Rated',
      verified: true,
      skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
      completed: 342,
      earnings: '₪2.8M',
      availability: 'متاح الآن',
      location: 'الرياض',
      responseTime: '15 دقيقة',
      successRate: 99,
      languages: ['العربية', 'English'],
    },
    {
      id: 2,
      name: 'لينا الشمري',
      title: 'UI/UX Designer',
      specialty: 'Product & Interface Design',
      avatar: '👩‍🎨',
      rating: 5.0,
      reviews: 412,
      rate: 720,
      badge: 'Top Rated Plus',
      verified: true,
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
      completed: 456,
      earnings: '₪3.2M',
      availability: 'متاح الآن',
      location: 'دبي',
      responseTime: '30 دقيقة',
      successRate: 100,
      languages: ['العربية', 'English', 'Français'],
    },
    {
      id: 3,
      name: 'عبدالله السعيد',
      title: 'Digital Marketing Expert',
      specialty: 'Growth & Performance Marketing',
      avatar: '📊',
      rating: 4.9,
      reviews: 324,
      rate: 680,
      badge: 'Top Rated',
      verified: true,
      skills: ['SEO/SEM', 'Google Analytics', 'Social Media', 'Email Marketing'],
      completed: 389,
      earnings: '₪2.1M',
      availability: 'غير متاح',
      location: 'جدة',
      responseTime: '1 ساعة',
      successRate: 97,
      languages: ['العربية', 'English'],
    },
    {
      id: 4,
      name: 'ريم المطيري',
      title: 'Content Writer',
      specialty: 'Creative & Technical Writing',
      avatar: '✍️',
      rating: 4.8,
      reviews: 198,
      rate: 420,
      badge: 'Rising Talent',
      verified: true,
      skills: ['Copywriting', 'SEO Writing', 'Content Strategy', 'Translation'],
      completed: 267,
      earnings: '₪980K',
      availability: 'متاح الآن',
      location: 'الدوحة',
      responseTime: '45 دقيقة',
      successRate: 96,
      languages: ['العربية', 'English'],
    },
  ];

  const stats = [
    { value: '245K+', label: 'مشروع نشط', icon: <Layers />, change: '+28%' },
    { value: '128K+', label: 'محترف موثوق', icon: <Users />, change: '+35%' },
    { value: '₪28.5B', label: 'إجمالي المدفوعات', icon: <Wallet />, change: '+42%' },
    { value: '4.9/5', label: 'تقييم العملاء', icon: <Star />, change: '+0.2' },
  ];

  return (
    <div className="min-h-screen bg-[#CFD3CE]">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrollY > 20
            ? 'border-b border-[#839B97]/20 bg-white/95 shadow-2xl backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-24 items-center justify-between">
            <div className="group flex cursor-pointer items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl bg-[#34626C] opacity-80 blur transition-all duration-500 group-hover:blur-lg"></div>
                <div className="relative flex h-16 w-16 transform items-center justify-center rounded-3xl bg-gradient-to-br from-[#34626C] to-[#839B97] transition-transform duration-500 group-hover:rotate-12">
                  <Mountain className="h-8 w-8 text-white" strokeWidth={2} />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tighter text-[#34626C]">ELEVATE</h1>
                <p className="text-xs font-bold tracking-[0.3em] text-[#839B97] uppercase">
                  PRO NETWORK
                </p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden items-center gap-2 lg:flex">
              {['اكتشف', 'المشاريع', 'المواهب', 'الوظائف', 'الموارد'].map((item, i) => (
                <button
                  key={i}
                  className="group relative px-6 py-3 text-sm font-bold text-[#34626C] transition-all hover:text-[#839B97]"
                >
                  <span className="relative z-10">{item}</span>
                  <div className="absolute inset-0 rounded-2xl bg-[#CFD3CE] opacity-0 transition-opacity group-hover:opacity-100"></div>
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button className="hidden rounded-2xl px-6 py-3 font-bold text-[#34626C] transition-all hover:bg-[#CFD3CE] sm:block">
                تسجيل الدخول
              </button>
              <button className="rounded-2xl bg-gradient-to-r from-[#34626C] to-[#839B97] px-8 py-3 font-bold text-white transition-all hover:scale-105 hover:shadow-2xl">
                ابدأ الآن
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="rounded-2xl p-3 text-[#34626C] hover:bg-[#CFD3CE] lg:hidden"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section - Asymmetric Layout */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-32">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-0 h-[600px] w-[600px] rounded-full bg-[#34626C] opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-[#839B97] opacity-20 blur-3xl"></div>
        </div>

        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#34626C" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7"
            >
              {/* Status Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#839B97]/20 bg-white px-6 py-3 shadow-xl"
              >
                <div className="flex -space-x-2">
                  {['🎯', '💼', '🚀', '⭐'].map((emoji, i) => (
                    <div
                      key={i}
                      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-[#34626C] to-[#839B97] shadow-lg"
                    >
                      <span className="text-sm">{emoji}</span>
                    </div>
                  ))}
                </div>
                <span className="font-bold text-[#34626C]">+128,000 محترف نشط</span>
                <div className="h-3 w-3 animate-pulse rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8 text-6xl leading-[0.95] font-black sm:text-7xl lg:text-8xl"
              >
                <span className="text-[#34626C]">منصة</span>
                <br />
                <span className="bg-gradient-to-r from-[#34626C] via-[#839B97] to-[#C6B497] bg-clip-text text-transparent">
                  الاحتراف
                </span>
                <br />
                <span className="text-[#839B97]">للمستقبل</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-12 max-w-2xl text-xl leading-relaxed text-[#34626C]/80 sm:text-2xl"
              >
                نربط النخبة من المواهب العربية بأفضل الفرص العالمية. ابنِ مسيرتك المهنية أو وظّف
                أفضل الخبرات بثقة تامة
              </motion.p>

              {/* Advanced Search Box */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="group relative"
              >
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#34626C] to-[#839B97] opacity-0 blur-xl transition-all duration-500 group-hover:opacity-10"></div>

                <div className="relative overflow-hidden rounded-3xl border border-[#839B97]/20 bg-white shadow-2xl">
                  <div className="flex flex-col items-stretch sm:flex-row">
                    {/* Search Input */}
                    <div className="flex flex-1 items-center gap-4 border-b border-[#839B97]/20 px-6 py-5 sm:border-r sm:border-b-0">
                      <Search className="h-6 w-6 text-[#839B97]" strokeWidth={2} />
                      <input
                        type="text"
                        placeholder="ابحث عن مشاريع، مهارات، أو محترفين..."
                        className="w-full bg-transparent text-lg font-semibold text-[#34626C] placeholder-[#839B97]/60 outline-none"
                      />
                    </div>

                    {/* Category Select */}
                    <div className="flex min-w-[200px] cursor-pointer items-center gap-4 border-b border-[#839B97]/20 px-6 py-5 transition-colors hover:bg-[#CFD3CE]/30 sm:border-r sm:border-b-0">
                      <Grid className="h-6 w-6 text-[#839B97]" strokeWidth={2} />
                      <select className="flex-1 cursor-pointer bg-transparent font-semibold text-[#34626C] outline-none">
                        <option>جميع الفئات</option>
                        <option>البرمجة</option>
                        <option>التصميم</option>
                        <option>التسويق</option>
                      </select>
                    </div>

                    {/* Search Button */}
                    <button className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#34626C] to-[#839B97] px-10 py-5 font-bold whitespace-nowrap text-white transition-all hover:shadow-2xl">
                      <span>بحث متقدم</span>
                      <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Quick Tags */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-6 flex flex-wrap items-center gap-3"
              >
                <span className="text-sm font-bold text-[#839B97]">رائج الآن:</span>
                {['React', 'UI/UX', 'AI', 'Mobile Apps', 'Blockchain'].map((tag, i) => (
                  <button
                    key={i}
                    className="rounded-full border border-[#839B97]/20 bg-white px-5 py-2 text-sm font-bold text-[#34626C] shadow-sm transition-all hover:border-transparent hover:bg-gradient-to-r hover:from-[#34626C] hover:to-[#839B97] hover:text-white hover:shadow-lg"
                  >
                    {tag}
                  </button>
                ))}
              </motion.div>
            </motion.div>

            {/* Right - Floating Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="hidden lg:col-span-5 lg:block"
            >
              <div className="relative">
                {/* Main Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 40 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="relative"
                >
                  <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-[#34626C] to-[#839B97] opacity-20 blur-2xl"></div>

                  <div className="relative rounded-[2.5rem] border border-[#839B97]/20 bg-white p-8 shadow-2xl">
                    {/* Header */}
                    <div className="mb-6 flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#34626C] to-[#839B97]">
                          <Rocket className="h-7 w-7 text-white" strokeWidth={2} />
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-[#34626C]">مشروع مميز</h3>
                          <p className="text-sm font-semibold text-[#839B97]">منذ ساعتين</p>
                        </div>
                      </div>
                      <div className="rounded-xl bg-gradient-to-r from-[#34626C] to-[#839B97] px-4 py-2 text-xs font-black text-white uppercase shadow-lg">
                        PREMIUM
                      </div>
                    </div>

                    {/* Content */}
                    <h4 className="mb-4 text-2xl leading-tight font-black text-[#34626C]">
                      تطوير تطبيق ذكاء اصطناعي متقدم
                    </h4>

                    <p className="mb-6 leading-relaxed text-[#839B97]">
                      نبحث عن خبير في التعلم الآلي لبناء نظام توصيات ذكي...
                    </p>

                    {/* Skills */}
                    <div className="mb-6 flex flex-wrap gap-2">
                      {['Python', 'TensorFlow', 'NLP', 'AWS'].map((skill, i) => (
                        <span
                          key={i}
                          className="rounded-xl bg-[#CFD3CE] px-4 py-2 text-sm font-bold text-[#34626C]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Stats Grid */}
                    <div className="mb-6 grid grid-cols-3 gap-4 rounded-2xl bg-gradient-to-br from-[#CFD3CE] to-[#C6B497]/30 p-5">
                      <div className="text-center">
                        <Wallet className="mx-auto mb-2 h-5 w-5 text-[#34626C]" strokeWidth={2} />
                        <p className="text-2xl font-black text-[#34626C]">150K</p>
                        <p className="text-xs font-semibold text-[#839B97] uppercase">ريال</p>
                      </div>
                      <div className="border-x border-[#839B97]/20 text-center">
                        <Clock className="mx-auto mb-2 h-5 w-5 text-[#839B97]" strokeWidth={2} />
                        <p className="text-2xl font-black text-[#839B97]">16</p>
                        <p className="text-xs font-semibold text-[#839B97] uppercase">أسبوع</p>
                      </div>
                      <div className="text-center">
                        <Users className="mx-auto mb-2 h-5 w-5 text-[#C6B497]" strokeWidth={2} />
                        <p className="text-2xl font-black text-[#C6B497]">42</p>
                        <p className="text-xs font-semibold text-[#839B97] uppercase">عرض</p>
                      </div>
                    </div>

                    {/* CTA */}
                    <button className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#34626C] to-[#839B97] py-4 font-bold text-white transition-all hover:shadow-2xl">
                      <span>استعرض المشروع</span>
                      <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
                    </button>
                  </div>
                </motion.div>

                {/* Floating Mini Cards */}
                {[
                  {
                    top: '-5%',
                    right: '-15%',
                    icon: <Star />,
                    text: '4.9★',
                    color: 'from-[#C6B497] to-[#839B97]',
                  },
                  {
                    bottom: '10%',
                    right: '-20%',
                    icon: <Shield />,
                    text: 'آمن',
                    color: 'from-[#34626C] to-[#839B97]',
                  },
                  {
                    top: '30%',
                    left: '-15%',
                    icon: <Zap />,
                    text: 'سريع',
                    color: 'from-[#839B97] to-[#C6B497]',
                  },
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: [0, -10, 0],
                    }}
                    transition={{
                      delay: 1.2 + i * 0.2,
                      y: {
                        duration: 2 + i,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                    }}
                    className="absolute"
                    style={{
                      top: card.top,
                      right: card.right,
                      bottom: card.bottom,
                      left: card.left,
                    }}
                  >
                    <div
                      className={`h-24 w-24 bg-gradient-to-br ${card.color} cursor-pointer rounded-2xl p-4 shadow-2xl transition-transform hover:scale-110`}
                    >
                      {React.cloneElement(card.icon, {
                        className: 'w-8 h-8 text-white mb-auto',
                        strokeWidth: 2,
                      })}
                      <p className="text-sm font-black text-white">{card.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="relative z-10 mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {[
              { icon: <Shield />, title: 'دفع آمن', desc: '100% محمي' },
              { icon: <Award />, title: 'جودة عالية', desc: 'محترفون موثوقون' },
              { icon: <Headphones />, title: 'دعم 24/7', desc: 'نساعدك دائماً' },
              { icon: <CheckCircle />, title: 'ضمان الرضا', desc: 'استرجاع مضمون' },
            ].map((item, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-[#839B97]/20 bg-white p-6 shadow-lg transition-all hover:shadow-2xl"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#34626C] to-[#839B97] transition-transform group-hover:scale-110">
                  {React.cloneElement(item.icon, {
                    className: 'w-7 h-7 text-white',
                    strokeWidth: 2,
                  })}
                </div>
                <h4 className="mb-2 text-center font-black text-[#34626C]">{item.title}</h4>
                <p className="text-center text-sm font-semibold text-[#839B97]">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Stats - Elegant Cards */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#34626C] to-[#839B97] py-20">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-white blur-3xl"></div>
          <div className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-white blur-3xl"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl transition-all hover:bg-white/20">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 transition-transform group-hover:scale-110">
                    {React.cloneElement(stat.icon, {
                      className: 'w-8 h-8 text-white',
                      strokeWidth: 2,
                    })}
                  </div>
                  <div className="mb-3 text-5xl font-black text-white">{stat.value}</div>
                  <div className="mb-3 text-sm font-bold tracking-wider text-white/80 uppercase">
                    {stat.label}
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-green-500/20 px-3 py-1.5 text-sm font-bold text-green-200">
                    <TrendingUp className="h-4 w-4" />
                    {stat.change}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories - Modern Grid */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mb-8 inline-block rounded-full bg-gradient-to-r from-[#34626C] to-[#839B97] px-8 py-4"
            >
              <span className="font-black tracking-widest text-white uppercase">التصنيفات</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 text-5xl font-black text-[#34626C] lg:text-7xl"
            >
              اختر مجالك المفضل
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mx-auto max-w-3xl text-xl leading-relaxed text-[#839B97]"
            >
              استكشف آلاف المشاريع في مختلف المجالات وابدأ رحلتك المهنية اليوم
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                onClick={() => setSelectedCategory(cat.id)}
                className={`group relative cursor-pointer ${
                  selectedCategory === cat.id ? 'scale-105' : ''
                }`}
              >
                <div
                  className={`absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#34626C] to-[#839B97] opacity-0 blur-xl transition-all duration-500 group-hover:opacity-10 ${
                    selectedCategory === cat.id ? 'opacity-20' : ''
                  }`}
                ></div>

                <div className="relative rounded-3xl border-2 border-transparent bg-[#CFD3CE] p-8 transition-all group-hover:border-[#839B97]/30">
                  {/* Icon */}
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#34626C] to-[#839B97] shadow-xl transition-all group-hover:scale-110 group-hover:rotate-6">
                    {React.cloneElement(cat.icon, {
                      className: 'w-10 h-10 text-white',
                      strokeWidth: 2,
                    })}
                  </div>

                  {/* Content */}
                  <h3 className="mb-4 text-2xl font-black text-[#34626C]">{cat.name}</h3>

                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="bg-gradient-to-r from-[#34626C] to-[#839B97] bg-clip-text text-4xl font-black text-transparent">
                        {cat.projects.toLocaleString()}
                      </p>
                      <p className="text-sm font-bold text-[#839B97] uppercase">مشروع متاح</p>
                    </div>

                    <div className="flex items-center gap-2 rounded-xl bg-green-100 px-4 py-2 font-black text-green-700 shadow-lg">
                      <TrendingUp className="h-5 w-5" />
                      <span>{cat.growth}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6 h-3 overflow-hidden rounded-full bg-white shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '75%' }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 1.5 }}
                      className="h-full rounded-full bg-gradient-to-r from-[#34626C] to-[#839B97]"
                    />
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-3 font-bold text-[#34626C] transition-all group-hover:gap-5">
                    <span>تصفح المشاريع</span>
                    <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects - Premium Cards */}
      <section className="bg-[#CFD3CE] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16 flex flex-col items-end justify-between gap-8 lg:flex-row">
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="mb-8 inline-block rounded-full bg-gradient-to-r from-[#839B97] to-[#34626C] px-8 py-4"
              >
                <span className="font-black tracking-widest text-white uppercase">
                  المشاريع المميزة
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl font-black text-[#34626C] lg:text-7xl"
              >
                فرص استثنائية
              </motion.h2>
            </div>

            {/* Tab Buttons */}
            <div className="flex gap-3">
              {['الكل', 'عاجلة', 'مميزة', 'جديدة'].map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-2xl px-8 py-4 font-bold transition-all ${
                    i === 0
                      ? 'bg-white text-[#34626C] shadow-xl'
                      : 'bg-white/50 text-[#839B97] hover:bg-white hover:text-[#34626C]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative">
                  <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-r from-[#34626C] to-[#839B97] opacity-0 blur-2xl transition-all duration-500 group-hover:opacity-10"></div>

                  <div className="relative overflow-hidden rounded-[2rem] border border-[#839B97]/20 bg-white shadow-xl transition-all group-hover:shadow-2xl">
                    {/* Header Section */}
                    <div className="border-b border-[#839B97]/20 bg-gradient-to-br from-[#CFD3CE]/50 to-white p-8">
                      <div className="mb-6 flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#34626C] to-[#839B97] shadow-xl">
                            <Building2 className="h-8 w-8 text-white" strokeWidth={2} />
                          </div>
                          <div>
                            <div className="mb-1 flex items-center gap-2">
                              <h4 className="text-xl font-black text-[#34626C]">
                                {project.company}
                              </h4>
                              {project.verified && (
                                <BadgeCheck className="h-6 w-6 text-[#839B97]" fill="#839B97" />
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1 font-semibold text-[#839B97]">
                                <MapPin className="h-4 w-4" />
                                {project.location}
                              </div>
                              <div className="flex items-center gap-1 font-semibold text-[#C6B497]">
                                <Star className="h-4 w-4 fill-[#C6B497]" />
                                {project.clientRating}
                              </div>
                            </div>
                          </div>
                        </div>

                        {project.premium && (
                          <div className="rounded-xl bg-gradient-to-r from-[#34626C] to-[#839B97] px-4 py-2 text-xs font-black text-white uppercase shadow-lg">
                            PREMIUM
                          </div>
                        )}
                      </div>

                      <h3 className="mb-4 text-2xl leading-tight font-black text-[#34626C]">
                        {project.title}
                      </h3>

                      <div className="inline-block rounded-xl bg-[#839B97]/10 px-4 py-2 font-bold text-[#839B97]">
                        {project.category}
                      </div>
                    </div>

                    {/* Body Section */}
                    <div className="p-8">
                      <p className="mb-6 leading-relaxed text-[#34626C]/70">
                        {project.description}
                      </p>

                      {/* Skills */}
                      <div className="mb-6 flex flex-wrap gap-2">
                        {project.skills.slice(0, 6).map((skill, i) => (
                          <span
                            key={i}
                            className="rounded-xl border border-[#839B97]/20 bg-[#CFD3CE] px-4 py-2 text-sm font-bold text-[#34626C]"
                          >
                            {skill}
                          </span>
                        ))}
                        {project.skills.length > 6 && (
                          <span className="rounded-xl bg-gradient-to-r from-[#34626C] to-[#839B97] px-4 py-2 text-sm font-bold text-white">
                            +{project.skills.length - 6}
                          </span>
                        )}
                      </div>

                      {/* Project Meta */}
                      <div className="mb-6 grid grid-cols-3 gap-4 rounded-2xl bg-gradient-to-br from-[#CFD3CE] to-[#C6B497]/30 p-6">
                        <div className="text-center">
                          <Wallet className="mx-auto mb-2 h-5 w-5 text-[#34626C]" strokeWidth={2} />
                          <p className="mb-1 text-2xl font-black text-[#34626C]">
                            {project.budget.amount.toLocaleString()}
                          </p>
                          <p className="text-xs font-bold text-[#839B97] uppercase">
                            {project.budget.currency}
                          </p>
                        </div>

                        <div className="border-x border-[#839B97]/20 text-center">
                          <Clock className="mx-auto mb-2 h-5 w-5 text-[#839B97]" strokeWidth={2} />
                          <p className="mb-1 text-lg font-black text-[#839B97]">
                            {project.timeline}
                          </p>
                          <p className="text-xs font-bold text-[#839B97] uppercase">المدة</p>
                        </div>

                        <div className="text-center">
                          <Users className="mx-auto mb-2 h-5 w-5 text-[#C6B497]" strokeWidth={2} />
                          <p className="mb-1 text-2xl font-black text-[#C6B497]">
                            {project.proposals}
                          </p>
                          <p className="text-xs font-bold text-[#839B97] uppercase">عرض</p>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between border-t border-[#839B97]/20 pt-6">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2 text-sm font-semibold text-[#839B97]">
                            <Eye className="h-4 w-4" />
                            <span>مشاهدات عالية</span>
                          </div>
                          <span className="text-sm font-semibold text-[#839B97]">
                            منذ {project.posted}
                          </span>
                        </div>

                        <button className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#34626C] to-[#839B97] px-8 py-3 font-bold text-white transition-all group-hover:gap-4 hover:shadow-2xl">
                          <span>قدّم عرضك</span>
                          <Send className="h-5 w-5" strokeWidth={2} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View More */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <button className="rounded-2xl border-2 border-[#839B97]/20 bg-white px-12 py-5 font-bold text-[#34626C] shadow-lg transition-all hover:border-transparent hover:bg-gradient-to-r hover:from-[#34626C] hover:to-[#839B97] hover:text-white hover:shadow-2xl">
              استعرض جميع المشاريع
            </button>
          </motion.div>
        </div>
      </section>

      {/* Top Talents - Elite Cards */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mb-8 inline-block rounded-full bg-gradient-to-r from-[#34626C] to-[#839B97] px-8 py-4"
            >
              <span className="font-black tracking-widest text-white uppercase">
                نخبة المحترفين
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 text-5xl font-black text-[#34626C] lg:text-7xl"
            >
              أفضل المواهب العربية
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {topTalents.map((talent, index) => (
              <motion.div
                key={talent.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative">
                  <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-[#34626C] to-[#839B97] opacity-0 blur-xl transition-all group-hover:opacity-10"></div>

                  <div className="relative rounded-3xl border border-[#839B97]/20 bg-[#CFD3CE] p-8 transition-all group-hover:border-[#839B97]/40">
                    {/* Badge */}
                    {talent.badge && (
                      <div className="absolute top-6 right-6 z-10">
                        <div className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#34626C] to-[#839B97] px-4 py-2 text-xs font-black text-white uppercase shadow-lg">
                          <Crown className="h-4 w-4" />
                          <span>{talent.badge}</span>
                        </div>
                      </div>
                    )}

                    {/* Avatar */}
                    <div className="relative mb-6">
                      <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-to-br from-[#34626C] to-[#839B97] text-6xl shadow-2xl transition-transform group-hover:scale-110">
                        {talent.avatar}
                      </div>

                      {/* Verification Badge */}
                      {talent.verified && (
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 transform">
                          <div className="rounded-full bg-white p-2 shadow-xl">
                            <BadgeCheck className="h-7 w-7 text-[#839B97]" fill="#839B97" />
                          </div>
                        </div>
                      )}

                      {/* Availability */}
                      <div className="absolute top-0 right-0">
                        <div
                          className={`h-5 w-5 rounded-full border-4 border-[#CFD3CE] shadow-lg ${
                            talent.availability === 'متاح الآن' ? 'bg-green-500' : 'bg-orange-500'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="mt-8 text-center">
                      <h3 className="mb-2 text-2xl font-black text-[#34626C]">{talent.name}</h3>
                      <p className="mb-1 bg-gradient-to-r from-[#34626C] to-[#839B97] bg-clip-text text-sm font-bold text-transparent">
                        {talent.title}
                      </p>
                      <p className="mb-6 text-xs font-semibold text-[#839B97] italic">
                        "{talent.specialty}"
                      </p>

                      {/* Rating */}
                      <div className="mb-6 flex items-center justify-center gap-3 border-b border-[#839B97]/20 pb-6">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-[#C6B497] text-[#C6B497]" />
                          ))}
                        </div>
                        <span className="text-xl font-black text-[#34626C]">{talent.rating}</span>
                        <span className="text-sm font-semibold text-[#839B97]">
                          ({talent.reviews})
                        </span>
                      </div>

                      {/* Stats */}
                      <div className="mb-6 grid grid-cols-2 gap-4">
                        <div className="rounded-2xl bg-white p-4 shadow-sm">
                          <p className="mb-1 text-3xl font-black text-[#34626C]">
                            {talent.completed}
                          </p>
                          <p className="text-xs font-bold text-[#839B97] uppercase">مشروع</p>
                        </div>
                        <div className="rounded-2xl bg-gradient-to-br from-[#34626C]/10 to-[#839B97]/10 p-4">
                          <p className="mb-1 text-3xl font-black text-[#839B97]">{talent.rate}</p>
                          <p className="text-xs font-bold text-[#839B97] uppercase">ر.س/س</p>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="mb-6 flex flex-wrap justify-center gap-2">
                        {talent.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-[#34626C] shadow-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* CTAs */}
                      <div className="space-y-3">
                        <button className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#34626C] to-[#839B97] py-4 font-bold text-white transition-all hover:shadow-2xl">
                          <span>عرض الملف الشخصي</span>
                          <ArrowRight className="h-5 w-5" strokeWidth={2} />
                        </button>
                        <button className="w-full rounded-2xl border-2 border-[#839B97]/30 bg-white py-4 font-bold text-[#34626C] transition-all hover:bg-[#CFD3CE]">
                          تواصل معه
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Bold & Elegant */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#34626C] via-[#839B97] to-[#C6B497] py-32">
        {/* Animated Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/3 h-96 w-96 animate-pulse rounded-full bg-white blur-3xl"></div>
          <div
            className="absolute right-1/3 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-white blur-3xl"
            style={{ animationDelay: '1s' }}
          ></div>
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mx-auto mb-12 flex h-40 w-40 items-center justify-center rounded-[2.5rem] border border-white/20 bg-white/10 backdrop-blur-xl"
          >
            <Rocket className="h-20 w-20 text-white" strokeWidth={1.5} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 text-6xl leading-tight font-black text-white sm:text-7xl lg:text-8xl"
          >
            جاهز للارتقاء؟
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mb-12 max-w-4xl text-2xl leading-relaxed font-semibold text-white/90 lg:text-3xl"
          >
            انضم إلى أكبر منصة عمل حر في الوطن العربي واصنع مستقبلك المهني معنا
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col justify-center gap-6 sm:flex-row"
          >
            <button className="rounded-2xl bg-white px-12 py-6 text-xl font-black text-[#34626C] shadow-2xl transition-all hover:bg-[#CFD3CE]">
              سجّل كمحترف
            </button>

            <button className="rounded-2xl border-4 border-white bg-transparent px-12 py-6 text-xl font-black text-white transition-all hover:bg-white hover:text-[#34626C]">
              وظّف الآن
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer - Premium & Clean */}
      <footer className="border-t border-[#839B97]/20 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[#34626C] to-[#839B97]">
                  <Mountain className="h-8 w-8 text-white" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-[#34626C]">ELEVATE</h3>
                  <p className="text-xs font-bold tracking-[0.3em] text-[#839B97] uppercase">
                    PRO NETWORK
                  </p>
                </div>
              </div>

              <p className="mb-8 leading-relaxed font-semibold text-[#839B97]">
                المنصة الأولى للعمل الحر في الوطن العربي. نربط أفضل المواهب بأهم الفرص العالمية
              </p>

              <div className="flex gap-3">
                {[Twitter, Instagram, Linkedin, Facebook].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#CFD3CE] text-[#34626C] shadow-lg transition-all hover:bg-gradient-to-br hover:from-[#34626C] hover:to-[#839B97] hover:text-white hover:shadow-2xl"
                  >
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            {[
              { title: 'الشركة', links: ['من نحن', 'المدونة', 'الوظائف', 'الأخبار'] },
              { title: 'الخدمات', links: ['للمحترفين', 'للشركات', 'الباقات', 'API'] },
              { title: 'الدعم', links: ['المساعدة', 'تواصل معنا', 'الشروط', 'الخصوصية'] },
            ].map((column, i) => (
              <div key={i}>
                <h4 className="mb-6 text-lg font-black tracking-wide text-[#34626C] uppercase">
                  {column.title}
                </h4>
                <ul className="space-y-4">
                  {column.links.map((link, j) => (
                    <li key={j}>
                      <a
                        href="#"
                        className="font-semibold text-[#839B97] transition-colors hover:text-[#34626C]"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col items-center justify-between gap-6 border-t border-[#839B97]/20 pt-8 md:flex-row">
            <p className="font-bold text-[#839B97]">
              © 2025 ELEVATE PRO NETWORK. جميع الحقوق محفوظة.
            </p>

            <div className="flex gap-8">
              <a
                href="#"
                className="font-bold text-[#839B97] transition-colors hover:text-[#34626C]"
              >
                الخصوصية
              </a>
              <a
                href="#"
                className="font-bold text-[#839B97] transition-colors hover:text-[#34626C]"
              >
                الشروط
              </a>
              <a
                href="#"
                className="font-bold text-[#839B97] transition-colors hover:text-[#34626C]"
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

export default PremiumFreelancePlatform;
